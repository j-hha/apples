import { DataJson, StatsData } from "./types";

type ResolveFunction = (data:Array<StatsData>) => void;
type RejectFunction = (error:Error) => void;

export const loadJSON = (fileName:string, resolve:ResolveFunction, reject:RejectFunction):void => {
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