# gasco-accordion-group



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                                                                                  | Type                   | Default     |
| ---------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ----------- |
| `animated` | `animated` | If `true`, all accordions inside of the accordion group will animate when expanding or collapsing.                           | `boolean`              | `true`      |
| `disabled` | `disabled` | If `true`, the accordion group cannot be interacted with.                                                                    | `boolean`              | `false`     |
| `expand`   | `expand`   | Describes the expansion behavior for each accordion. Possible values are `"compact"` and `"inset"`. Defaults to `"compact"`. | `"compact" \| "inset"` | `'compact'` |
| `multiple` | `multiple` | If `true`, the accordion group can have multiple accordion components expanded at the same time.                             | `boolean`              | `undefined` |
| `readonly` | `readonly` | If `true`, the accordion group cannot be interacted with, but does not alter the opacity.                                    | `boolean`              | `false`     |
| `value`    | `value`    | The value of the accordion group.                                                                                            | `string \| string[]`   | `undefined` |


## Events

| Event         | Description                                  | Type                                                |
| ------------- | -------------------------------------------- | --------------------------------------------------- |
| `gascoChange` | Emitted when the value property has changed. | `CustomEvent<AccordionGroupChangeEventDetail<any>>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
