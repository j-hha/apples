export const createSpan = (classNames:Array<string> = [], textContent:string = ''):HTMLSpanElement => {
    const span = document.createElement('span');

    classNames.forEach(className => {
        if(className.length > 0 ) {
            span.classList.add(className);
        }
    })

    if(textContent.length > 0) {
        span.textContent = textContent;
    }

    return span;
}