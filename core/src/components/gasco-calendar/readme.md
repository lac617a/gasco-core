# gasco-calendar



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute           | Description | Type      | Default |
| ----------------- | ------------------- | ----------- | --------- | ------- |
| `fireFocusEvents` | `fire-focus-events` |             | `boolean` | `true`  |


## Events

| Event              | Description                         | Type                                  |
| ------------------ | ----------------------------------- | ------------------------------------- |
| `gascoBlur`        | Emitted when the input loses focus. | `CustomEvent<FocusEvent>`             |
| `gascoChangeValue` | Emitted when the value has changed. | `CustomEvent<InputChangeEventDetail>` |
| `gascoFocus`       | Emitted when the input has focus.   | `CustomEvent<FocusEvent>`             |


## Shadow Parts

| Part       | Description |
| ---------- | ----------- |
| `"native"` |             |


## Dependencies

### Depends on

- [gasco-input](../gasco-input)
- ion-icon
- [gasco-datetime](../gasco-datetime)

### Graph
```mermaid
graph TD;
  gasco-calendar --> gasco-input
  gasco-calendar --> ion-icon
  gasco-calendar --> gasco-datetime
  gasco-datetime --> gasco-button
  gasco-datetime --> gasco-picker-internal
  gasco-datetime --> gasco-picker-column-internal
  gasco-datetime --> gasco-item
  gasco-datetime --> gasco-label
  gasco-datetime --> ion-icon
  gasco-datetime --> gasco-button-icon
  gasco-datetime --> gasco-popover
  gasco-popover --> gasco-backdrop
  style gasco-calendar fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
