# gasco-progress



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                                                                                                                                                 | Type                                                                                                                                             | Default         |
| ---------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | --------------- |
| `buffer`   | `buffer`   | If the buffer and value are smaller than 1, the buffer circles will show. The buffer should be between [0, 1].                                                                              | `number`                                                                                                                                         | `1`             |
| `color`    | `color`    | The color to use from your application's color palette. Default options are: `"primary"`, `"secondary"`, `"success"`, `"warning"` and `"danger"``.                                          | `"danger" \| "dark" \| "light" \| "medium" \| "primary" \| "secondary" \| "success" \| "tertiary" \| "warning" \| string & Record<never, never>` | `undefined`     |
| `reversed` | `reversed` | If true, reverse the progress bar direction.                                                                                                                                                | `boolean`                                                                                                                                        | `false`         |
| `type`     | `type`     | The state of the progress bar, based on if the time the process takes is known or not. Default options are: `"determinate"` (no animation), `"indeterminate"` (animate from left to right). | `"determinate" \| "indeterminate"`                                                                                                               | `'determinate'` |
| `value`    | `value`    | The value determines how much of the active bar should display when the `type` is `"determinate"`. The value should be between [0, 1].                                                      | `number`                                                                                                                                         | `0`             |


## Shadow Parts

| Part         | Description                                                                                                                                             |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `"progress"` | The progress bar that shows the current value when `type` is `"determinate"` and slides back and forth when `type` is `"indeterminate"`.                |
| `"stream"`   | The animated circles that appear while buffering. This only shows when `buffer` is set and `type` is `"determinate"`.                                   |
| `"track"`    | The track bar behind the progress bar. If the `buffer` property is set and `type` is `"determinate"` the track will be the width of the `buffer` value. |


## CSS Custom Properties

| Name                    | Description                                                            |
| ----------------------- | ---------------------------------------------------------------------- |
| `--background`          | Background of the progress track, or the buffer bar if `buffer` is set |
| `--buffer-background`   | DEPRECATED, use `--background` instead                                 |
| `--progress-background` | Background of the progress bar representing the current value          |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
