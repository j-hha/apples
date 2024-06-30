const changeStyle = (event) => {
    const {target: { value } } = event;
    const style = document.querySelector('#js-head-style');
    style.innerHTML = value;
}

const selectors = [
    document.querySelector('#js-select')
];

selectors.forEach(selector => {
    selector.addEventListener('change', changeStyle);
})