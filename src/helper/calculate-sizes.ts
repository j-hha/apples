import { StatsData } from "./types/types";

export const getRange = (arr:Array<StatsData>):number => {
    const range:Array<number> = [];

    arr.forEach(item => {
        range.push(item.value);
    });

    if(range.length === 0) {
        return 0;
    }

    return Math.max(...range)
}


export const getHeight = (maxNum:number, value:number, maxHeight=100):string => {
    const factor = maxHeight / maxNum;
    const height = Math.round((value * factor)).toString();
    return `${height}px`;
}