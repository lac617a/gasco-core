# gasco-radio



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                                                                                        | Type                                                                                                                                             | Default        |
| ---------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | -------------- |
| `color`    | `color`    | The color to use from your application's color palette. Default options are: `"primary"`, `"secondary"`, `"success"`, `"warning"`. | `"danger" \| "dark" \| "light" \| "medium" \| "primary" \| "secondary" \| "success" \| "tertiary" \| "warning" \| string & Record<never, never>` | `'primary'`    |
| `disabled` | `disabled` | If `true`, the user cannot interact with the radio.                                                                                | `boolean`                                                                                                                                        | `false`        |
| `name`     | `name`     | The name of the control, which is submitted with the form data.                                                                    | `string`                                                                                                                                         | `this.inputId` |
| `value`    | `value`    | the value of the radio.                                                                                                            | `any`                                                                                                                                            | `undefined`    |


## Events

| Event        | Description                                | Type                |
| ------------ | ------------------------------------------ | ------------------- |
| `gascoBlur`  | Emitted when the radio button loses focus. | `CustomEvent<void>` |
| `gascoFocus` | Emitted when the radio button has focus.   | `CustomEvent<void>` |


## Shadow Parts

| Part          | Description                                              |
| ------------- | -------------------------------------------------------- |
| `"container"` | The container for the radio mark.                        |
| `"mark"`      | The checkmark or dot used to indicate the checked state. |


## CSS Custom Properties

| Name                    | Description                              |
| ----------------------- | ---------------------------------------- |
| `--border-radius`       | Border radius of the radio               |
| `--color`               | Color of the radio                       |
| `--color-checked`       | Color of the checked radio               |
| `--inner-border-radius` | Border radius of the inner checked radio |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
