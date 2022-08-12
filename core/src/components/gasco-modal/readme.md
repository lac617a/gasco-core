# gasco-modal



<!-- Auto Generated Below -->


## Properties

| Property             | Attribute             | Description                                                                                                                                                                                                                                                                                                                                                                                          | Type                                     | Default     |
| -------------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- | ----------- |
| `animated`           | `animated`            | If `true`, the modal will animate.                                                                                                                                                                                                                                                                                                                                                                   | `boolean`                                | `true`      |
| `backdropBreakpoint` | `backdrop-breakpoint` | A decimal value between 0 and 1 that indicates the point after which the backdrop will begin to fade in when using a sheet modal. Prior to this point, the backdrop will be hidden and the content underneath the sheet can be interacted with. This value is exclusive meaning the backdrop will become active after the value specified.                                                           | `number`                                 | `0`         |
| `backdropDismiss`    | `backdrop-dismiss`    | If `true`, the modal will be dismissed when the backdrop is clicked.                                                                                                                                                                                                                                                                                                                                 | `boolean`                                | `true`      |
| `breakpoints`        | --                    | The breakpoints to use when creating a sheet modal. Each value in the array must be a decimal between 0 and 1 where 0 indicates the modal is fully closed and 1 indicates the modal is fully open. Values are relative to the height of the modal, not the height of the screen. One of the values in this array must be the value of the `initialBreakpoint` property. For example: [0, .25, .5, 1] | `number[]`                               | `undefined` |
| `canDismiss`         | `can-dismiss`         | Determines whether or not a modal can dismiss when calling the `dismiss` method.  If the value is `true` or the value's function returns `true`, the modal will close when trying to dismiss. If the value is `false` or the value's function returns `false`, the modal will not close when trying to dismiss.                                                                                      | `(() => Promise<boolean>) \| boolean`    | `undefined` |
| `enterAnimation`     | --                    | Animation to use when the modal is presented.                                                                                                                                                                                                                                                                                                                                                        | `(baseEl: any, opts?: any) => Animation` | `undefined` |
| `handle`             | `handle`              | The horizontal line that displays at the top of a sheet modal. It is `true` by default when setting the `breakpoints` and `initialBreakpoint` properties.                                                                                                                                                                                                                                            | `boolean`                                | `undefined` |
| `htmlAttributes`     | --                    | Additional attributes to pass to the modal.                                                                                                                                                                                                                                                                                                                                                          | `{ [key: string]: any; }`                | `undefined` |
| `initialBreakpoint`  | `initial-breakpoint`  | A decimal value between 0 and 1 that indicates the initial point the modal will open at when creating a sheet modal. This value must also be listed in the `breakpoints` array.                                                                                                                                                                                                                      | `number`                                 | `undefined` |
| `isOpen`             | `is-open`             | If `true`, the modal will open. If `false`, the modal will close. Use this if you need finer grained control over presentation, otherwise just use the modalController or the `trigger` property. Note: `isOpen` will not automatically be set back to `false` when the modal dismisses. You will need to do that in your code.                                                                      | `boolean`                                | `false`     |
| `keyboardClose`      | `keyboard-close`      | If `true`, the keyboard will be automatically dismissed when the overlay is presented.                                                                                                                                                                                                                                                                                                               | `boolean`                                | `true`      |
| `leaveAnimation`     | --                    | Animation to use when the modal is dismissed.                                                                                                                                                                                                                                                                                                                                                        | `(baseEl: any, opts?: any) => Animation` | `undefined` |
| `modalBody`          | `modal-body`          | If `true`, the modal will body.                                                                                                                                                                                                                                                                                                                                                                      | `string`                                 | `undefined` |
| `modalTitle`         | `modal-title`         | If `true`, the modal will title.                                                                                                                                                                                                                                                                                                                                                                     | `string`                                 | `undefined` |
| `presentingElement`  | --                    | The element that presented the modal. This is used for card presentation effects and for stacking multiple modals on top of each other. Only applies in iOS mode.                                                                                                                                                                                                                                    | `HTMLElement`                            | `undefined` |
| `showBackdrop`       | `show-backdrop`       | If `true`, a backdrop will be displayed behind the modal. This property controls whether or not the backdrop darkens the screen when the modal is presented. It does not control whether or not the backdrop is active or present in the DOM.                                                                                                                                                        | `boolean`                                | `true`      |
| `size`               | `size`                | The Modal size.                                                                                                                                                                                                                                                                                                                                                                                      | `"default" \| "large" \| "small"`        | `undefined` |
| `swipeToClose`       | `swipe-to-close`      | <span style="color:red">**[DEPRECATED]**</span> - To prevent modals from dismissing, use canDismiss instead.<br/><br/>If `true`, the modal can be swiped to dismiss. Only applies in iOS mode.                                                                                                                                                                                                       | `boolean`                                | `false`     |
| `trigger`            | `trigger`             | An ID corresponding to the trigger element that causes the modal to open when clicked.                                                                                                                                                                                                                                                                                                               | `string`                                 | `undefined` |
| `type`               | `type`                | If `"default"`, the modal will default. For default `"default"`.                                                                                                                                                                                                                                                                                                                                     | `"basic" \| "default" \| "simple"`       | `'default'` |


## Events

| Event                      | Description                                                                  | Type                                            |
| -------------------------- | ---------------------------------------------------------------------------- | ----------------------------------------------- |
| `accepted`                 | Emitted after the modal has accepted. Shorthand for gascoModalAccepted.      | `CustomEvent<OverlayEventDetail<any>>`          |
| `didDismiss`               | Emitted after the modal has dismissed. Shorthand for gascoModalDidDismiss.   | `CustomEvent<OverlayEventDetail<any>>`          |
| `didPresent`               | Emitted after the modal has presented. Shorthand for gascoModalWillDismiss.  | `CustomEvent<void>`                             |
| `gascoBreakpointDidChange` | Emitted after the modal breakpoint has changed.                              | `CustomEvent<ModalBreakpointChangeEventDetail>` |
| `gascoModalAccepted`       | Emitted after the modal has accepted.                                        | `CustomEvent<any>`                              |
| `gascoModalDidDismiss`     | Emitted after the modal has dismissed.                                       | `CustomEvent<OverlayEventDetail<any>>`          |
| `gascoModalDidPresent`     | Emitted after the modal has presented.                                       | `CustomEvent<void>`                             |
| `gascoModalWillDismiss`    | Emitted before the modal has dismissed.                                      | `CustomEvent<OverlayEventDetail<any>>`          |
| `gascoModalWillPresent`    | Emitted before the modal has presented.                                      | `CustomEvent<void>`                             |
| `willDismiss`              | Emitted before the modal has dismissed. Shorthand for gascoModalWillDismiss. | `CustomEvent<OverlayEventDetail<any>>`          |
| `willPresent`              | Emitted before the modal has presented. Shorthand for gascoModalWillPresent. | `CustomEvent<void>`                             |


## Methods

### `dismiss(data?: any, role?: string) => Promise<boolean>`

Dismiss the modal overlay after it has been presented.

#### Returns

Type: `Promise<boolean>`



### `getCurrentBreakpoint() => Promise<number | undefined>`

Returns the current breakpoint of a sheet style modal

#### Returns

Type: `Promise<number>`



### `onDidDismiss<T = any>() => Promise<OverlayEventDetail<T>>`

Returns a promise that resolves when the modal did dismiss.

#### Returns

Type: `Promise<OverlayEventDetail<T>>`



### `onWillDismiss<T = any>() => Promise<OverlayEventDetail<T>>`

Returns a promise that resolves when the modal will dismiss.

#### Returns

Type: `Promise<OverlayEventDetail<T>>`



### `present() => Promise<void>`

Present the modal overlay after it has been created.

#### Returns

Type: `Promise<void>`



### `setCurrentBreakpoint(breakpoint: number) => Promise<void>`

Move a sheet style modal to a specific breakpoint. The breakpoint value must
be a value defined in your `breakpoints` array.

#### Returns

Type: `Promise<void>`




## Slots

| Slot | Description                                                 |
| ---- | ----------------------------------------------------------- |
|      | Content for a type of logo or striking figure of the modal. |


## Shadow Parts

| Part         | Description                                                                      |
| ------------ | -------------------------------------------------------------------------------- |
| `"backdrop"` | The `gasco-backdrop` element.                                                    |
| `"button"`   |                                                                                  |
| `"content"`  | The wrapper element for the default slot.                                        |
| `"handle"`   | The handle that is displayed at the top of the sheet modal when `handle="true"`. |


## CSS Custom Properties

| Name                 | Description                        |
| -------------------- | ---------------------------------- |
| `--backdrop-opacity` | Opacity of the backdrop            |
| `--background`       | Background of the modal content    |
| `--border-color`     | Border color of the modal content  |
| `--border-radius`    | Border radius of the modal content |
| `--border-style`     | Border style of the modal content  |
| `--border-width`     | Border width of the modal content  |
| `--height`           | Height of the modal                |
| `--max-height`       | Maximum height of the modal        |
| `--max-width`        | Maximum width of the modal         |
| `--min-height`       | Minimum height of the modal        |
| `--min-width`        | Minimum width of the modal         |
| `--width`            | Width of the modal                 |


## Dependencies

### Depends on

- [gasco-backdrop](../gasco-backdrop)
- [gasco-button](../gasco-button)

### Graph
```mermaid
graph TD;
  gasco-modal --> gasco-backdrop
  gasco-modal --> gasco-button
  style gasco-modal fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
