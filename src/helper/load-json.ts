import { DataJson,  } from "./types";

type ResolveFunction = (data:DataJson) => void;
type RejectFunction = (error:Error) => void;

export const loadJSON = (fileName:string, resolve:ResolveFunction, reject:RejectFunction):void => {
    import(`../data/${fileName}.json`)
    .then((module):DataJson => {
        const data:DataJson = module.default;

        if(!Object.keys(data).includes('data') || !Object.keys(data).includes('unit')) {
            return { unit: '', data: [] };
        }
        
        return data;
    })
    .then((data:DataJson) => { 
        resolve(data); 
    })
    .catch(error => { 
        reject(error); 
    });
};