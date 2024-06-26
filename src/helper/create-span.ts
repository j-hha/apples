export const createSpan = (classNames:Array<string> = [], textContent:string = ''):HTMLSpanElement => {
    const span = document.createElement('span');

    // add css classes
    classNames.forEach(className => {
        if(className.length > 0 ) {
            span.classList.add(className);
        }
    })

    // add text
    if(textContent.length > 0) {
        span.textContent = textContent;
    }

    return span;
}