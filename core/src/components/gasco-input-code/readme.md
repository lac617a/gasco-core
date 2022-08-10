# gasco-input-code



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute           | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Type                                                                                                                                             | Default        |
| ----------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | -------------- |
| `autofocus`       | `autofocus`         | This Boolean attributes lets you specify that a from control should have input focus when the page loads.                                                                                                                                                                                                                                                                                                                                                                         | `boolean`                                                                                                                                        | `false`        |
| `autosubmit`      | `autosubmit`        | We can make everything automatic after completing the code for default is false.                                                                                                                                                                                                                                                                                                                                                                                                  | `boolean`                                                                                                                                        | `false`        |
| `color`           | `color`             | The color to use from your application's color palette. Default options are: `primary`, `secondary`, `tertiary`, `success`, `warning`, `danger`, `light`, and `dark`.                                                                                                                                                                                                                                                                                                             | `"danger" \| "dark" \| "light" \| "medium" \| "primary" \| "secondary" \| "success" \| "tertiary" \| "warning" \| string & Record<never, never>` | `undefined`    |
| `disabled`        | `disabled`          | If `true`, the user cannot interact with the input.                                                                                                                                                                                                                                                                                                                                                                                                                               | `boolean`                                                                                                                                        | `false`        |
| `fireFocusEvents` | `fire-focus-events` |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | `boolean`                                                                                                                                        | `true`         |
| `inputmode`       | `inputmode`         | A hint to the browser for which keyboard to display. Possible values: `none`, `text`.                                                                                                                                                                                                                                                                                                                                                                                             | `"none" \| "text"`                                                                                                                               | `undefined`    |
| `maxlength`       | `maxlength`         | If the value of the type attribute is `text` or `numeric`, this attribute specifies the maximum number of characters that the user can enter. Defaulf `4`                                                                                                                                                                                                                                                                                                                         | `number`                                                                                                                                         | `4`            |
| `name`            | `name`              | The name of the control, which is submitted with the form data.                                                                                                                                                                                                                                                                                                                                                                                                                   | `string`                                                                                                                                         | `this.inputId` |
| `pattern`         | `pattern`           | A regular expression that the value is checked against. The pattern must match the entire value, not just some subset. Use the title attribute to describe the pattern to help the user. This attribute applies when the value of the type attribute is `text`, `search`, `tel`, `url`, `email`, `"date"`, or `password`, otherwise it is ignored. When the type attribute is `date`, `pattern` will only be used in browsers that do not support the `date` input type natively. | `string`                                                                                                                                         | `undefined`    |
| `secure`          | `secure`            | With secure what you are looking for is that the fields are not seen. for default is true                                                                                                                                                                                                                                                                                                                                                                                         | `boolean`                                                                                                                                        | `true`         |
| `size`            | `size`              | The Input size.                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | `"default" \| "large" \| "small"`                                                                                                                | `undefined`    |
| `type`            | `type`              | The type of control to display. The default type is `text`.                                                                                                                                                                                                                                                                                                                                                                                                                       | `"number" \| "text"`                                                                                                                             | `'text'`       |
| `value`           | `value`             | The value of the input.                                                                                                                                                                                                                                                                                                                                                                                                                                                           | `number \| string`                                                                                                                               | `''`           |


## Events

| Event           | Description                             | Type                                  |
| --------------- | --------------------------------------- | ------------------------------------- |
| `gascoBlur`     | Emitted when the input loses focus.     | `CustomEvent<FocusEvent>`             |
| `gascoChange`   | Emitted when the value has changed.     | `CustomEvent<InputChangeEventDetail>` |
| `gascoCodeDone` |                                         | `CustomEvent<any>`                    |
| `gascoFocus`    | Emitted when the input has focus.       | `CustomEvent<FocusEvent>`             |
| `gascoInput`    | Emitted when a keyboard input occurred. | `CustomEvent<InputEvent>`             |


## Methods

### `getInputElement() => Promise<HTMLInputElement>`

Returns the native `<input>` element used under the hood.

#### Returns

Type: `Promise<HTMLInputElement>`




## CSS Custom Properties

| Name                        | Description                                                                                              |
| --------------------------- | -------------------------------------------------------------------------------------------------------- |
| `--background`              | Background of the input                                                                                  |
| `--color`                   | Color of the input text                                                                                  |
| `--padding-bottom`          | Bottom padding of the input                                                                              |
| `--padding-end`             | Right padding if direction is left-to-right, and left padding if direction is right-to-left of the input |
| `--padding-start`           | Left padding if direction is left-to-right, and right padding if direction is right-to-left of the input |
| `--padding-top`             | Top padding of the input                                                                                 |
| `--placeholder-color`       | Color of the input placeholder text                                                                      |
| `--placeholder-font-style`  | Font style of the input placeholder text                                                                 |
| `--placeholder-font-weight` | Font weight of the input placeholder text                                                                |
| `--placeholder-opacity`     | Opacity of the input placeholder text                                                                    |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
