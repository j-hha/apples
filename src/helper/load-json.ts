import { DataJson, StatsData } from "./types";

export const loadJSON = (fileName:string, resolve:Function, reject:Function):void => {
    import(`../data/${fileName}.json`)
    .then((module):Array<StatsData> => {
        const data:DataJson = module.default;

        if(!Object.keys(data).includes('data')) {
            return [];
        }
        
        return data.data;
    })
    .then((data:Array<StatsData>) => { 
        resolve(data); 
    })
    .catch(error => { 
        reject(error); 
    });
};