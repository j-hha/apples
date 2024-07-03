import {describe, expect, test} from '@jest/globals';
import { getRange, getHeight } from '../helper/calculate-sizes';

describe('getRange function', () => {
    const data = [ 
        {
            name: 'name 1',
            value: 1,
            color: 'color 1'
        },
        {
            name: 'name 2',
            value: 2,
            color: 'color 2'
        },
        {
            name: 'name 3',
            value: 3,
            color: 'color 3'
        },
    ];

    test('returns the largest of three numbers', () => {
        expect(getRange(data)).toBe(3); // to do naming!
    });

    test('throws type error if dataSet incorrect', () => {
        expect(getRange([])).toBe(0);
    });
});

describe('getHeight function', () => {
    test('returns a string with a height in px', () => {
        expect(getHeight(300, 100)).toBe('33px');
    });
});
