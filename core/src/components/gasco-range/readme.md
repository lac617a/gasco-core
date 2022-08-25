# ion-range



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute    | Description                                                                                                                                                                 | Type                                                                                                                                             | Default                                        |
| -------------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------- |
| `color`        | `color`      | The color to use from your application's color palette. Default options are: `"primary"`, `"secondary"`, `"success"`, `"warning"`, and `"danger"`.                          | `"danger" \| "dark" \| "light" \| "medium" \| "primary" \| "secondary" \| "success" \| "tertiary" \| "warning" \| string & Record<never, never>` | `'primary'`                                    |
| `debounce`     | `debounce`   | How long, in milliseconds, to wait to trigger the `gascoChange` event after each change in the range value. This also impacts form bindings such as `ngModel` or `v-model`. | `number`                                                                                                                                         | `0`                                            |
| `disabled`     | `disabled`   | If `true`, the user cannot interact with the range.                                                                                                                         | `boolean`                                                                                                                                        | `false`                                        |
| `dualKnobs`    | `dual-knobs` | Show two knobs.                                                                                                                                                             | `boolean`                                                                                                                                        | `false`                                        |
| `max`          | `max`        | Maximum integer value of the range.                                                                                                                                         | `number`                                                                                                                                         | `100`                                          |
| `min`          | `min`        | Minimum integer value of the range.                                                                                                                                         | `number`                                                                                                                                         | `0`                                            |
| `name`         | `name`       | The name of the control, which is submitted with the form data.                                                                                                             | `string`                                                                                                                                         | `''`                                           |
| `pin`          | `pin`        | If `true`, a pin with integer value is shown when the knob is pressed.                                                                                                      | `boolean`                                                                                                                                        | `false`                                        |
| `pinFormatter` | --           | A callback used to format the pin text. By default the pin text is set to `Math.round(value)`.                                                                              | `(value: number) => string \| number`                                                                                                            | `(value: number): number => Math.round(value)` |
| `snaps`        | `snaps`      | If `true`, the knob snaps to tick marks evenly spaced based on the step property value.                                                                                     | `boolean`                                                                                                                                        | `false`                                        |
| `step`         | `step`       | Specifies the value granularity.                                                                                                                                            | `number`                                                                                                                                         | `1`                                            |
| `ticks`        | `ticks`      | If `true`, tick marks are displayed based on the step value. Only applies when `snaps` is `true`.                                                                           | `boolean`                                                                                                                                        | `true`                                         |
| `value`        | `value`      | the value of the range.                                                                                                                                                     | `number \| { lower: number; upper: number; }`                                                                                                    | `0`                                            |


## Events

| Event                | Description                                                                                                               | Type                                         |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `gascoBlur`          | Emitted when the range loses focus.                                                                                       | `CustomEvent<void>`                          |
| `gascoChange`        | Emitted when the value property has changed.                                                                              | `CustomEvent<RangeChangeEventDetail>`        |
| `gascoFocus`         | Emitted when the range has focus.                                                                                         | `CustomEvent<void>`                          |
| `gascoKnobMoveEnd`   | Emitted when the user finishes moving the range knob, whether through mouse drag, touch gesture, or keyboard interaction. | `CustomEvent<RangeKnobMoveEndEventDetail>`   |
| `gascoKnobMoveStart` | Emitted when the user starts moving the range knob, whether through mouse drag, touch gesture, or keyboard interaction.   | `CustomEvent<RangeKnobMoveStartEventDetail>` |


## Slots

| Slot      | Description                                                                        |
| --------- | ---------------------------------------------------------------------------------- |
| `"end"`   | Content is placed to the right of the range slider in LTR, and to the left in RTL. |
| `"start"` | Content is placed to the left of the range slider in LTR, and to the right in RTL. |


## Shadow Parts

| Part            | Description                                |
| --------------- | ------------------------------------------ |
| `"bar"`         | The inactive part of the bar.              |
| `"bar-active"`  | The active part of the bar.                |
| `"knob"`        | The handle that is used to drag the range. |
| `"pin"`         | The counter that appears above a knob.     |
| `"tick"`        | An inactive tick mark.                     |
| `"tick-active"` | An active tick mark.                       |


## CSS Custom Properties

| Name                      | Description                                             |
| ------------------------- | ------------------------------------------------------- |
| `--bar-background`        | Background of the range bar                             |
| `--bar-background-active` | Background of the active range bar                      |
| `--bar-border-radius`     | Border radius of the range bar                          |
| `--bar-height`            | Height of the range bar                                 |
| `--height`                | Height of the range                                     |
| `--knob-background`       | Background of the range knob                            |
| `--knob-border-radius`    | Border radius of the range knob                         |
| `--knob-box-shadow`       | Box shadow of the range knob                            |
| `--knob-size`             | Size of the range knob                                  |
| `--pin-background`        | Background of the range pin (only available in MD mode) |
| `--pin-color`             | Color of the range pin (only available in MD mode)      |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
