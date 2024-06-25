import { isElementInview } from "../helper/intersection-observer";
import { StatsData } from "../helper/types";
import { loadJSON } from "../helper/load-json";
import { getHeight, getRange } from "../helper/calculate-sizes";
import { getRandomColor } from "../helper/get-random-color";
import { createSpan } from "../helper/create-span";
class BarChart extends HTMLElement {
    private _clone:DocumentFragment;
    private _internals:ElementInternalsExtended;
    private _shadowRoot:ShadowRoot;
    static observedAttributes = ["data-json",];
    private _data:Array<StatsData> = [];

    constructor() {
        super();
        const template = document.getElementById("bar-chart") as HTMLTemplateElement;
        this._clone = template.content.cloneNode(true) as DocumentFragment;
        this._internals = this.attachInternals() as ElementInternalsExtended;
        this._shadowRoot = this.attachShadow({ mode: "open"});
        this._shadowRoot.appendChild(this._clone);
    }

    set data(data:Array<StatsData>) {
        this._data = data;
        const container = this._shadowRoot.querySelector('.bar-chart__container') as HTMLElement;
        this.createBars(container, this.data)
    };

    get data():Array<StatsData> {
        return this._data;
    };

    setIsInView = (inView:boolean):void => {
        if(inView) {
            this._internals.states.add('inview'); 
        } else {
            this._internals.states.delete('inview');
        }
    }

    getIsInView = ():boolean => {
        return this._internals.states.has('inview');
    };

    getColor = (name:string, color?:string):string => {
        let hexColor = color;

        if(typeof hexColor === 'undefined') {
            hexColor = getRandomColor();
        }

        return `:host(bar-chart) > .bar-chart__figure > .bar-chart__container > .bar-chart__bar-wrapper > .bar-chart__bar--${name} { background-color: ${hexColor}; } `;
    };

    createBars = (container:HTMLElement, data:Array<StatsData>):HTMLSpanElement => {
        const maxNum = getRange(data);
        let style:string = '';
        const styleElement = document.createElement('style');
        data.forEach((item:StatsData, index:number) => {
            const { name, value, unit, color } = item;
            const modifier = name.split(' ').join('-');
            
            //create bar elements
            const barWrapper:HTMLSpanElement = createSpan([`bar-chart__bar-wrapper`, `bar-chart__bar-wrapper--${modifier}`]);
            const barLabel:HTMLSpanElement = createSpan([`bar-chart__bar-label`], name);
            const hoverText:HTMLSpanElement = createSpan(['bar-chart__bar-value'], `${value} ${unit}`);
            const bar:HTMLSpanElement = createSpan([`bar-chart__bar`, `bar-chart__bar--${modifier}`]);

            //add eventListener
            bar.addEventListener('click', (event:MouseEvent) => {
                this.showLabel(event.target as HTMLElement)
            });

            bar.addEventListener('keyup', (event:KeyboardEvent) => {
                if (event.type === 'keyup' && (event.code === 'Enter' || event.code === 'Space')) {
                    this.showLabel(event.target as HTMLElement)
                }
            });

            //add tabIndex and aria-live settings
            bar.tabIndex = 0;
            hoverText.setAttribute('aria-live', 'polite')
            barWrapper.setAttribute('aria-atomic', 'true')

            //add styles
            style += this.addAnimationStyle(maxNum, value, name);
            style += this.getColor(name, color);

            //assemble bar & screen reader text
            barWrapper.append(barLabel);
            bar.append(hoverText);
            barWrapper.append(bar);
            container.append(barWrapper);
        });

        styleElement.textContent = style;
        this.shadowRoot.prepend(styleElement);
        return container;
    }

    showLabel = (target:HTMLElement) => {
        const baseClassValue = 'bar-chart__bar-value';
        const activeClass = `${baseClassValue}--active`;
        const barChildren = Array.from(target.children);
        const label = barChildren.find((element:HTMLElement) => {
            if(element.classList.contains(baseClassValue)) {
                return element as HTMLElement;
            }
        });

        if (label.classList.contains(activeClass)) {
            return;
        }

        const activeBar = this.shadowRoot.querySelector(`.${activeClass}`);
        if(activeBar) {
            activeBar.classList.remove(activeClass);
        }
        
        label.classList.add(activeClass);
    };

    addAnimationStyle = (maxNum:number, value:number, name:string):string => {
        let style:string = '';
        const height = getHeight(maxNum, value, 300);
        const cssClasses = '.bar-chart__figure > .bar-chart__container > .bar-chart__bar-wrapper'
        style += `:host(bar-chart) > ${cssClasses}--${name} { height: ${height}; } `;
        style += `:host(bar-chart:state(inview)) > ${cssClasses} > .bar-chart__bar--${name} { height: ${height}; } `;
        return style;
    }

    connectedCallback():void {
        isElementInview(this, this.setIsInView);
    }

    showError = (error:Error) => {
        const errorMessage:HTMLSpanElement = createSpan(['bar-chart__error'], error.message);
        const container = this._shadowRoot.querySelector('.bar-chart__container') as HTMLElement;
        container.append(errorMessage);
    }

    attributeChangedCallback(name:string, oldValue:string, newValue:string = ''):void {
        if(name === 'data-json' && newValue.length > 0) {
            const resolve = (data:Array<StatsData>) => {
                this.data = data;
            }

            const reject = (error:Error) => {
                this.showError(error);
            }

            loadJSON(newValue, resolve, reject);
        }
      }
}

export default BarChart;