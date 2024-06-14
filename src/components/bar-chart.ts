import { isElementInview } from "../helper/intersection-observer";
import { StatsData } from "../helper/types";
import { loadJSON } from "../helper/load-json";

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
        const container = this._shadowRoot.querySelector('.bar-chart__containter') as HTMLElement;
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
        data.forEach((item:StatsData) => {
            const { name, value, unit } = item;
            const modifier = name.split(' ').join('-');
            //create bar
            const bar = document.createElement('span');
            bar.classList.add(`bar-chart__bar`, `bar-chart__bar--${modifier}`);
            // create screen reader text
            const srText = document.createElement('span');
            srText.classList.add('sr-only','show-on-hover');
            srText.textContent = `${name}: ${value} ${unit}`;
            //assemble bar & screen reader text
            bar.append(srText);
            container.append(bar);
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
        errorMessage.classList.add('error');
        errorMessage.textContent = error.message;
        const container = this._shadowRoot.querySelector('.bar-chart__containter') as HTMLElement;
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