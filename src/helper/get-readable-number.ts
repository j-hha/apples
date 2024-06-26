const roundToOneDecimal = (num:number) => {
    return Math.round(num * 10) / 10;
}

const divideByThousand = (num:number, currentIndex:number, maxNumOfRecursions:number):any => {
    const result = num / 1000;

    if (result < 1000 || currentIndex === maxNumOfRecursions){
        return {
            value: roundToOneDecimal(result),
            index: currentIndex,
        };
    }  

    return divideByThousand(result, currentIndex+1, maxNumOfRecursions); // recursion!
};

export const getReadableNumber = (num:number):string => {
    if (num < 1000){
        return `${num}`;
    }

    const units = ['K', 'M', 'B', 'T'];
    const {value, index} = divideByThousand(num, 0, units.length-1);

    return `${value}${units[index]}`;
}