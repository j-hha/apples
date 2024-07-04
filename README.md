# Web Component Charts
## Summary
Charts as reusable web components - a practice project.
## Usage
### In HTML
```
<component-name data-json='json-file-name'>
    <span slot="caption-text">caption text</span>
    <noscript slot="no-script">noscript text</noscript>
</component-name>
```
### Available Components
- `<bar-chart>`
### Json
#### Bar chart example
- needs a key `data`
- `data` has to be an array of objects
- data object must have the following keys `name:string`, `value:number`, and `unit:enum`
- the `unit` value can be one of the following: percent, tons, kilo
- it should also have a key `color:string` for the bar representing the data set
- please make sure `color` is a valid css color name, hex value, or rbg value
- if no `color` key is present, a random color will be assigned to the bar
```
{
    "unit": "kilo",
    "data": [
        {
            "name": "item 1",
            "value": 300,
            "color": "deeppink"
        },
        {
            "name": "item 2",
            "value": 200,
            "color": "#fdb827"
        },
        {
            "name": "item 3",
            "value": 500
        },
        {
            "name": "item 4",
            "value": 100
        }
    ]
}
```

## Development
### commands
- run webpack to build js bundle: `npm run build`
- run linter to check ts or js: `npm run eslint-all`
- run tests: `npm test`
## tbc ...

