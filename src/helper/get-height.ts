import { StatsData } from "./types";

const getRange = (arr:Array<StatsData>):number => {
    const range:Array<number> = [];
    arr.forEach(item => {
        range.push(item.value);
    });

    return Math.max(...range)
  }

export const getHeight = (index:number, data:Array<StatsData>, baseHeight=20, maxHeight=100):string => {
    const maxNum = getRange(data);
    const factor = (maxHeight - baseHeight) / maxNum;
    let height = baseHeight.toString();
    if(index < data.length) { 
      height = (data[index].value * factor + baseHeight).toString();
    }
    return `${height}px`;
  }