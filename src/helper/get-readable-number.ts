const roundToOneDecimal = (num:number) => {
    return Math.round(num * 10) / 10;
}

type ReadableValue = {
    value: number,
    index: number,
}

const divideByThousand = (num:number, currentIndex:number, maxNumOfRecursions:number):ReadableValue => {
    const result = num / 1000;
    const resultRounded = roundToOneDecimal(result);
    
    if (Math.abs(resultRounded) < 1000 || currentIndex === maxNumOfRecursions) {
        return {
            value: resultRounded,
            index: currentIndex,
        };
    }  

    return divideByThousand(result, currentIndex+1, maxNumOfRecursions); // recursion!
};

export const getReadableNumber = (num:number):string => {
    const roundedNum = roundToOneDecimal(num);

    if (Math.abs(roundedNum) < 1000){
        return `${roundedNum}`;
    }

    const units = ['K', 'M', 'B', 'T'];
    const {value, index} = divideByThousand(num, 0, units.length-1);

    return `${value} ${units[index]}`;
}