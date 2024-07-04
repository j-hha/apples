import { describe, test, expect } from "@jest/globals";
import { getRandomColor } from "../../helper/get-random-color";

describe('getRandomColor function', () => {
    test('returns a string', () => {
        expect(typeof getRandomColor()).toBe('string');
    });

    test('returns a string with a # at position 0', () => {
        expect(getRandomColor().charAt(0)).toBe('#');
    });

    test('returns a string consisting only of letters and numbers between the positions 1 - 6', () => {
        const pattern = /[A-Za-z0-9]+/g;
        expect(getRandomColor().substring(1,6)).toMatch(pattern);
    });

    test('returns a string with a length of 7', () => {
        expect(getRandomColor()).toHaveLength(7);
    });
});