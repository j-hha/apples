import { isElementInview } from "../helper/intersection-observer";
import { StatsData } from "../helper/types";
import { loadJSON } from "../helper/load-json";
import { getHeight } from "../helper/calculate-sizes";
import { getRange } from "../helper/calculate-sizes";

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
    }

    createBars = (container:HTMLElement, data:Array<StatsData>):HTMLSpanElement => {
        data.forEach((item:StatsData, index:number) => {
            const { name, value, unit } = item;
            const modifier = name.split(' ').join('-');
            
            //create bar elements
            const barWrapper = document.createElement('span');
            const barLabel = document.createElement('span');
            const hoverText = document.createElement('span');
            const bar = document.createElement('span');

            //add classes
            barWrapper.classList.add(`bar-chart__bar-wrapper`);
            barLabel.classList.add(`bar-chart__bar-label`);
            bar.classList.add(`bar-chart__bar`, `bar-chart__bar--${modifier}`);
            hoverText.classList.add('show-on-hover');

            //add height
            const maxNum = getRange(data);
            const height = getHeight(maxNum, value, 300);
            bar.style.height = height;

            // create label & hover text
            barLabel.textContent = `${name}`;
            hoverText.textContent = `${value} ${unit}`;

            //assemble bar & screen reader text
            bar.append(hoverText);
            barWrapper.append(bar);
            barWrapper.append(barLabel);
            container.append(barWrapper);
        });

        return container;
    }

    addHeights = (data:Array<StatsData>) => {
        let style:string;
        data.forEach((item:StatsData) => {
            const { name, value } = item;
            style += `:host(consumption-animation:state(inview)) > .animation > .animation__chart-bar--${name} {
                height: ${value.toString()}px;} `;
        });

        const styleElement = document.createElement('style');
        styleElement.textContent = style;
        this._clone.prepend(styleElement);
    }

    connectedCallback():void {
        isElementInview(this, this.setIsInView);
    }

    showError = (error:Error) => {
        const errorMessage:HTMLSpanElement = document.createElement('span');
        errorMessage.classList.add('bar-chart__error');
        errorMessage.textContent = error.message;
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