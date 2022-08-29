# gasco-chip



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                                                                                                       | Type                                                                                                                                             | Default     |
| ---------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| `color`    | `color`    | The color to use from your application's color palette. Default options are: `"primary"`, `"secondary"`, `"success"`, `"warning"` and `"danger"`. | `"danger" \| "dark" \| "light" \| "medium" \| "primary" \| "secondary" \| "success" \| "tertiary" \| "warning" \| string & Record<never, never>` | `'primary'` |
| `disabled` | `disabled` | If `true`, the user cannot interact with the chip.                                                                                                | `boolean`                                                                                                                                        | `false`     |
| `size`     | `size`     | The button size.                                                                                                                                  | `"default" \| "large" \| "small"`                                                                                                                | `undefined` |


## Events

| Event         | Description                                    | Type                                      |
| ------------- | ---------------------------------------------- | ----------------------------------------- |
| `gascoBlur`   | Emitted when the chip loses focus.             | `CustomEvent<void>`                       |
| `gascoChange` | Emitted when the checked property has changed. | `CustomEvent<ChipChangeEventDetail<any>>` |
| `gascoFocus`  | Emitted when the chip has focus.               | `CustomEvent<void>`                       |


## CSS Custom Properties

| Name      | Description       |
| --------- | ----------------- |
| `--color` | Color of the chip |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
