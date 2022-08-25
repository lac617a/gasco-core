# gasco-tab



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute         | Description                                                                                                                                                                                                    | Type                                                                                                                                             | Default     |
| --------------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| `color`         | `color`           | The color to use from your application's color palette. Default options are: `"primary"`, `"secondary"`, `"success"`, `"warning"` and `"danger"`.                                                              | `"danger" \| "dark" \| "light" \| "medium" \| "primary" \| "secondary" \| "success" \| "tertiary" \| "warning" \| string & Record<never, never>` | `'primary'` |
| `disabled`      | `disabled`        | If `true`, the user cannot interact with the segment.                                                                                                                                                          | `boolean`                                                                                                                                        | `false`     |
| `scrollable`    | `scrollable`      | If `true`, the segment buttons will overflow and the user can swipe to see them. In addition, this will disable the gesture to drag the indicator between the buttons in order to swipe to see hidden buttons. | `boolean`                                                                                                                                        | `false`     |
| `selectOnFocus` | `select-on-focus` | If `true`, navigating to an `GASCO-TAB-button` with the keyboard will focus and select the element. If `false`, keyboard navigation will only focus the `GASCO-TAB-button` element.                            | `boolean`                                                                                                                                        | `false`     |
| `swipeGesture`  | `swipe-gesture`   | If `true`, users will be able to swipe between segment buttons to activate them.                                                                                                                               | `boolean`                                                                                                                                        | `true`      |
| `value`         | `value`           | the value of the segment.                                                                                                                                                                                      | `string`                                                                                                                                         | `undefined` |


## Events

| Event         | Description                                                                                              | Type                                    |
| ------------- | -------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| `gascoChange` | Emitted when the value property has changed and any dragging pointer has been released from `GASCO-TAB`. | `CustomEvent<SegmentChangeEventDetail>` |


## CSS Custom Properties

| Name           | Description                      |
| -------------- | -------------------------------- |
| `--background` | Background of the segment button |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
