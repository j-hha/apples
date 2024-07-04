import {describe, expect, test} from '@jest/globals';
import { createSpan } from '../../helper/create-span';

describe('createSpan function', () => {
    test('returns empty span if no params given', () => {
        const span = createSpan();
        expect(span).toBeInstanceOf(HTMLSpanElement);
        expect(span.textContent).toBe('');
        expect(span.classList.length).toBe(0);
    });

    test('returns span with css classes and text if given as params', () => {
        const cssClasses = ['css-class-1', 'css-class-2'];
        const textContent = 'text content';
        const span = createSpan(cssClasses, textContent);
        expect(span).toBeInstanceOf(HTMLSpanElement);
        expect(span.textContent).toBe(textContent);
        expect(span.classList).toHaveLength(cssClasses.length);
        expect(span.classList[0]).toBe(cssClasses[0]);
        expect(span.classList[1]).toBe(cssClasses[1]);
    });

    test('returns span with css classes and no text, if only css classes are given as param', () => {
        const cssClasses = ['css-class-1', 'css-class-2'];
        const span = createSpan(cssClasses);
        expect(span).toBeInstanceOf(HTMLSpanElement);
        expect(span.textContent).toBe('');
        expect(span.classList).toHaveLength(cssClasses.length);
        expect(span.classList[0]).toBe(cssClasses[0]);
        expect(span.classList[1]).toBe(cssClasses[1]);
    });

    test('returns span with no css classes and a text, if empty css classes array and text as string are given as param', () => {
        const textContent = 'text content';
        const span = createSpan([], textContent);
        expect(span).toBeInstanceOf(HTMLSpanElement);
        expect(span.textContent).toBe(textContent);
        expect(span.classList).toHaveLength(0);
    });
});