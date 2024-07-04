import { isElementInview } from "../../helper/intersection-observer";
import { DataJson, StatsData } from "../../helper/types/types";
import { loadJSON } from "../../helper/load-json";
import { getHeight, getRange } from "../../helper/calculate-sizes";
import { getRandomColor } from "../../helper/get-random-color";
import { createSpan } from "../../helper/create-span";
import { getReadableNumber } from "../../helper/get-readable-number";
import { ElementInternalsExtended } from '../../helper/types/extended-element-internals';
import baseStyles from './bar-chart.css';

class BarChart extends HTMLElement {
    private _clone:DocumentFragment;
    private _internals:ElementInternalsExtended;
    private _shadowRoot:ShadowRoot;
    static observedAttributes = ["data-json",];
    private _data:Array<StatsData> = [];
    private _unit:string = '';

    constructor() {
        super();
        const template = document.getElementById("bar-chart") as HTMLTemplateElement;
        this._clone = template.content.cloneNode(true) as DocumentFragment;
        this._internals = this.attachInternals() as ElementInternalsExtended;
        this._shadowRoot = this.attachShadow({ mode: "open"});
        this._shadowRoot.adoptedStyleSheets = [baseStyles];
        this._shadowRoot.appendChild(this._clone);
    }

    createStyleElement = (styles:string):HTMLStyleElement => {
        const styleElement = document.createElement('style');
        styleElement.textContent = styles;
        return styleElement;
    }

    set unit(unit:string) {
        this._unit = unit;
    }

    get unit():string {
        return this._unit;
    }

    set data(data:Array<StatsData>) {
        this._data = data;
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
        const modifier = name.split(' ').join('-');

        if(typeof hexColor === 'undefined') {
            hexColor = getRandomColor();
        }

        return `:host(bar-chart) > .bar-chart__figure > .bar-chart__container > .bar-chart__bar-wrapper > .bar-chart__bar--${modifier} { background-color: ${hexColor}; } `;
    };

    createBars = (container:HTMLElement, data:Array<StatsData>):HTMLSpanElement => {
        const maxNum = getRange(data);
        let styles:string = '';
        data.forEach((item:StatsData) => {
            const { name, value, color } = item;
            const modifier = name.split(' ').join('-');
            
            //create bar elements
            const barWrapper:HTMLSpanElement = createSpan([`bar-chart__bar-wrapper`, `bar-chart__bar-wrapper--${modifier}`]);
            const barLabel:HTMLSpanElement = createSpan([`bar-chart__bar-label`], name);
            const valueLabel:HTMLSpanElement = createSpan(['bar-chart__bar-value'], `${getReadableNumber(value)} ${this.unit}`);
            const bar:HTMLSpanElement = createSpan([`bar-chart__bar`, `bar-chart__bar--${modifier}`]);

            //add tabIndex and aria-live settings
            bar.setAttribute('aria-hidden', 'true');

            //add styles
            styles += this.addAnimationStyle(maxNum, value, name);
            styles += this.getColor(name, color);

            //assemble bar & screen reader text
            barWrapper.append(barLabel);
            barWrapper.append(valueLabel);
            barWrapper.append(bar);
            container.append(barWrapper);
        });

        this.shadowRoot.prepend(this.createStyleElement(styles));
        return container;
    }

    addAnimationStyle = (maxNum:number, value:number, name:string):string => {
        let style:string = '';
        const height = getHeight(maxNum, value, 300);
        const modifier = name.split(' ').join('-');
        const cssClasses = '.bar-chart__figure > .bar-chart__container > .bar-chart__bar-wrapper'
        style += `:host(bar-chart) > ${cssClasses}--${modifier} { height: ${height}; } `;
        style += `:host(bar-chart:state(inview)) > ${cssClasses} > .bar-chart__bar--${modifier} { height: ${height}; } `;
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
            const resolve = (data:DataJson):void => {
                this.data = data.data;
                this.unit = data.unit;
                const container = this._shadowRoot.querySelector('.bar-chart__container') as HTMLElement;
                this.createBars(container, this.data);
            }

            const reject = (error:Error):void => {
                this.showError(error);
            }

            loadJSON(newValue, resolve, reject);
        }
      }
}

export default BarChart;