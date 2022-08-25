# gasco-tab-button



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                  | Type                                                                                       | Default               |
| ---------- | ---------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | --------------------- |
| `disabled` | `disabled` | If `true`, the user cannot interact with the segment button. | `boolean`                                                                                  | `false`               |
| `layout`   | `layout`   | Set the layout of the text and icon in the segment.          | `"icon-bottom" \| "icon-end" \| "icon-hide" \| "icon-start" \| "icon-top" \| "label-hide"` | `'icon-top'`          |
| `type`     | `type`     | The type of the button.                                      | `"button" \| "reset" \| "submit"`                                                          | `'button'`            |
| `value`    | `value`    | The value of the segment button.                             | `string`                                                                                   | `'gasco-sb-' + ids++` |


## Shadow Parts

| Part                     | Description                                                                       |
| ------------------------ | --------------------------------------------------------------------------------- |
| `"indicator"`            | The indicator displayed on the checked segment button.                            |
| `"indicator-background"` | The background element for the indicator displayed on the checked segment button. |
| `"native"`               | The native HTML button element that wraps all child elements.                     |


## CSS Custom Properties

| Name                           | Description                                                                                                       |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| `--background`                 | Background of the segment button                                                                                  |
| `--background-checked`         | Background of the checked segment button                                                                          |
| `--background-focused`         | Background of the segment button when focused with the tab key                                                    |
| `--background-focused-opacity` | Opacity of the segment button background when focused with the tab key                                            |
| `--background-hover`           | Background of the segment button on hover                                                                         |
| `--background-hover-opacity`   | Opacity of the segment button background on hover                                                                 |
| `--border-color`               | Color of the segment button border                                                                                |
| `--border-radius`              | Radius of the segment button border                                                                               |
| `--border-style`               | Style of the segment button border                                                                                |
| `--border-width`               | Width of the segment button border                                                                                |
| `--color`                      | Color of the segment button                                                                                       |
| `--color-checked`              | Color of the checked segment button                                                                               |
| `--color-focused`              | Color of the segment button when focused with the tab key                                                         |
| `--color-hover`                | Color of the segment button on hover                                                                              |
| `--indicator-box-shadow`       | Box shadow on the indicator for the checked segment button                                                        |
| `--indicator-color`            | Color of the indicator for the checked segment button                                                             |
| `--indicator-height`           | Height of the indicator for the checked segment button                                                            |
| `--indicator-transform`        | Transform of the indicator for the checked segment button                                                         |
| `--indicator-transition`       | Transition of the indicator for the checked segment button                                                        |
| `--margin-bottom`              | Bottom margin of the segment button                                                                               |
| `--margin-end`                 | Right margin if direction is left-to-right, and left margin if direction is right-to-left of the segment button   |
| `--margin-start`               | Left margin if direction is left-to-right, and right margin if direction is right-to-left of the segment button   |
| `--margin-top`                 | Top margin of the segment button                                                                                  |
| `--padding-bottom`             | Bottom padding of the segment button                                                                              |
| `--padding-end`                | Right padding if direction is left-to-right, and left padding if direction is right-to-left of the segment button |
| `--padding-start`              | Left padding if direction is left-to-right, and right padding if direction is right-to-left of the segment button |
| `--padding-top`                | Top padding of the segment button                                                                                 |
| `--transition`                 | Transition of the segment button                                                                                  |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
