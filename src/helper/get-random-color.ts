export const getRandomColor = () => {
    return '#'+Math.floor(Math.random()*16777215).toString(16); 
    //source: https://css-tricks.com/snippets/javascript/random-hex-color/
};