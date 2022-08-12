# gasco-content



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute          | Description                                                                                                                                                                                                                                                      | Type                                                                                                                                             | Default     |
| ----------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| `color`           | `color`            | The color to use from your application's color palette. Default options are: `"primary"`, `"secondary"`, `"success"`, `"warning"`, `"danger"`.                                                                                                                   | `"danger" \| "dark" \| "light" \| "medium" \| "primary" \| "secondary" \| "success" \| "tertiary" \| "warning" \| string & Record<never, never>` | `undefined` |
| `forceOverscroll` | `force-overscroll` | If `true` and the content does not cause an overflow scroll, the scroll interaction will cause a bounce. If the content exceeds the bounds of ionContent, nothing will change. Note, the does not disable the system bounce on iOS. That is an OS level setting. | `boolean`                                                                                                                                        | `undefined` |
| `fullscreen`      | `fullscreen`       | If `true`, the content will scroll behind the headers and footers. This effect can easily be seen by setting the toolbar to transparent.                                                                                                                         | `boolean`                                                                                                                                        | `false`     |
| `scrollEvents`    | `scroll-events`    | Because of performance reasons, gascoScroll events are disabled by default, in order to enable them and start listening from (gascoScroll), set this property to `true`.                                                                                         | `boolean`                                                                                                                                        | `false`     |
| `scrollX`         | `scroll-x`         | If you want to enable the content scrolling in the X axis, set this property to `true`.                                                                                                                                                                          | `boolean`                                                                                                                                        | `false`     |
| `scrollY`         | `scroll-y`         | If you want to disable the content scrolling in the Y axis, set this property to `false`.                                                                                                                                                                        | `boolean`                                                                                                                                        | `true`      |


## Events

| Event              | Description                                                                                                     | Type                            |
| ------------------ | --------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| `gascoScroll`      | Emitted while scrolling. This event is disabled by default. Set `scrollEvents` to `true` to enable.             | `CustomEvent<ScrollDetail>`     |
| `gascoScrollEnd`   | Emitted when the scroll has ended. This event is disabled by default. Set `scrollEvents` to `true` to enable.   | `CustomEvent<ScrollBaseDetail>` |
| `gascoScrollStart` | Emitted when the scroll has started. This event is disabled by default. Set `scrollEvents` to `true` to enable. | `CustomEvent<ScrollBaseDetail>` |


## Methods

### `getScrollElement() => Promise<HTMLElement>`

Get the element where the actual scrolling takes place.
This element can be used to subscribe to `scroll` events or manually modify
`scrollTop`. However, it's recommended to use the API provided by `gasco-content`:

i.e. Using `gascoScroll`, `gascoScrollStart`, `gascoScrollEnd` for scrolling events
and `scrollToPoint()` to scroll the content into a certain point.

#### Returns

Type: `Promise<HTMLElement>`



### `scrollByPoint(x: number, y: number, duration: number) => Promise<void>`

Scroll by a specified X/Y distance in the component.

#### Returns

Type: `Promise<void>`



### `scrollToBottom(duration?: number) => Promise<void>`

Scroll to the bottom of the component.

#### Returns

Type: `Promise<void>`



### `scrollToPoint(x: number | undefined | null, y: number | undefined | null, duration?: number) => Promise<void>`

Scroll to a specified X/Y location in the component.

#### Returns

Type: `Promise<void>`



### `scrollToTop(duration?: number) => Promise<void>`

Scroll to the top of the component.

#### Returns

Type: `Promise<void>`




## Slots

| Slot      | Description                                                          |
| --------- | -------------------------------------------------------------------- |
|           | Content is placed in the scrollable area if provided without a slot. |
| `"fixed"` | Should be used for fixed content that should not scroll.             |


## Shadow Parts

| Part           | Description                              |
| -------------- | ---------------------------------------- |
| `"background"` | The background of the content.           |
| `"scroll"`     | The scrollable container of the content. |


## CSS Custom Properties

| Name                | Description                                                                                                |
| ------------------- | ---------------------------------------------------------------------------------------------------------- |
| `--background`      | Background of the content                                                                                  |
| `--color`           | Color of the content                                                                                       |
| `--keyboard-offset` | Keyboard offset of the content                                                                             |
| `--offset-bottom`   | Offset bottom of the content                                                                               |
| `--offset-top`      | Offset top of the content                                                                                  |
| `--padding-bottom`  | Bottom padding of the content                                                                              |
| `--padding-end`     | Right padding if direction is left-to-right, and left padding if direction is right-to-left of the content |
| `--padding-start`   | Left padding if direction is left-to-right, and right padding if direction is right-to-left of the content |
| `--padding-top`     | Top padding of the content                                                                                 |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
