const changeStyle = (event) => {
    const {target: { name, value } } = event;
    console.log(value);

    const body = document.querySelector('body');
    body.style[name] = value;
}

const selectors = [
    document.querySelector('#font-family'),
    document.querySelector('#font-color')
];

selectors.forEach(selector => {
    selector.addEventListener('change', changeStyle);
})