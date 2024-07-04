import { describe, test, expect } from "@jest/globals";
import { getReadableNumber } from "../../helper/get-readable-number";

describe('getReadableNumber function', () => {
    describe('returns a string of the number it received as a parameter', () => {
        const lowerNumbers = [
            {num: 9, str: '9'}, 
            {num: 90, str: '90'}, 
            {num: 999, str: '999'},
        ];
        
        const thousands = [
            {num: 1000, str: '1 K'}, 
            {num: 10000, str: '10 K'}, 
            {num: 999999, str: '1 M'},
        ];

        const millions = [
            {num: 1000000, str: '1 M'}, 
            {num: 100000000, str: '100 M'}, 
            {num: 999999999, str: '1 B'},
        ];

        const billions = [
            {num: 1000000000, str: '1 B'}, 
            {num: 10000000000, str: '10 B'}, 
            {num: 999999999999, str: '1 T'},
        ];

        const trillions = [
            {num: 1000000000000, str: '1 T'}, 
            {num: 10000000000000, str: '10 T'}, 
            {num: 999999999999999, str: '1000 T'},
        ];

        const negativeNumbers = [
            {num: -999.99999, str: '-1 K'},
            {num: -999999, str: '-1 M'},
            {num: -999999999, str: '-1 B'},
            {num: -999999999999, str: '-1 T'},
        ];

        test.each(lowerNumbers)('does not change numbers lower than 1000', (arr) => {
            expect(getReadableNumber(arr.num)).toBe(arr.str);
        });

        test.each(thousands)('turns thousands into a ...K-string, or rounds corretly to next M', (arr) => {
            expect(getReadableNumber(arr.num)).toBe(arr.str);
        });

        test.each(millions)('turns millions into a ...M-string, or rounds corretly to next B', (arr) => {
            expect(getReadableNumber(arr.num)).toBe(arr.str);
        });

        test.each(billions)('turns billions into a ...B-string, or rounds corretly to next T', (arr) => {
            expect(getReadableNumber(arr.num)).toBe(arr.str);
        });

        test.each(trillions)('turns trillions into a ...T-string', (arr) => {
            expect(getReadableNumber(arr.num)).toBe(arr.str);
        });

        test.each(negativeNumbers)('turns negative numbers into strings following the same pattern as for positive numbers', (arr) => {
            expect(getReadableNumber(arr.num)).toBe(arr.str);
        });
    });
});