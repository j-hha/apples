export const getRandomColor = ():string => {    
    const color = Math.floor(Math.random()*16777215).toString(16); 
    //source: https://css-tricks.com/snippets/javascript/random-hex-color/
    
    if (color !== 'ffffff' && color.length === 6) {
        return '#'+color;
    } 
    
    return getRandomColor();
};