# gasco-select



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description                                                                 | Type            | Default                    |
| ------------- | ------------- | --------------------------------------------------------------------------- | --------------- | -------------------------- |
| `choices`     | --            |                                                                             | `IChoiceProp[]` | `undefined`                |
| `disabled`    | `disabled`    | If `true`, the user cannot interact with the select.                        | `boolean`       | `false`                    |
| `label`       | `label`       | Instructional text that show before the input has a value. The Input label. | `string`        | `undefined`                |
| `multiple`    | `multiple`    |                                                                             | `boolean`       | `false`                    |
| `name`        | `name`        | The name of the control, which is submitted with the form data.             | `string`        | `this.selectId`            |
| `placeholder` | `placeholder` | Instructional text that show before the input has a value.                  | `string`        | `'Seleccione un elemento'` |


## Events

| Event               | Description | Type                         |
| ------------------- | ----------- | ---------------------------- |
| `gascoChangeSelect` |             | `CustomEvent<IChoiceDetail>` |
| `gascoReady`        |             | `CustomEvent<any>`           |


## Dependencies

### Depends on

- [gasco-input](../gasco-input)
- ion-icon
- [gasco-list](../gasco-list)
- [gasco-item](../gasco-item)
- [gasco-checkbox](../gasco-checkbox)

### Graph
```mermaid
graph TD;
  gasco-select --> gasco-input
  gasco-select --> ion-icon
  gasco-select --> gasco-list
  gasco-select --> gasco-item
  gasco-select --> gasco-checkbox
  style gasco-select fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
