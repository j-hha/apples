import createTemplate from "./helper/create-template";
import BarChart from "./components/bar-chart/bar-chart";
import barChartHTML from "./components/bar-chart/bar-chart.html";

const body = document.querySelector('body');

// add custom bar chart element
const barChartTemplate = createTemplate(barChartHTML, {'id': 'bar-chart', 'data-json': 'example-data'})
body.prepend(barChartTemplate);
customElements.define('bar-chart', BarChart);
