import { describe, test, expect } from "@jest/globals";
import createTemplate from "../../helper/create-template";

describe('createTemplate function', () => {
    test('creates a HTMLTemplateElement with the content and attributes passed', () => {
        const html = '<p>hello world</p>'
        const attributes = {
            'id': 'id-string',
            'data-json': 'example-data'
        }
        const template = createTemplate(html, attributes);
        expect(template).toBeInstanceOf(HTMLTemplateElement);
        expect(template.innerHTML).toBe(html);
        expect(template.getAttribute('id')).toBe(attributes.id);
        expect(template.getAttribute('data-json')).toBe(attributes['data-json']);
    });
});