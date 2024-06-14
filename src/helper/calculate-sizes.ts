import { StatsData } from "./types";

export const getRange = (arr:Array<StatsData>):number => {
    const range:Array<number> = [];
    arr.forEach(item => {
        range.push(item.value);
    });

    return Math.max(...range)
  }


export const getHeight = (maxNum:number, value:number, maxHeight=100):string => {
    const factor = maxHeight / maxNum;
    const height = (value * factor).toString();
    return `${height}px`;
}