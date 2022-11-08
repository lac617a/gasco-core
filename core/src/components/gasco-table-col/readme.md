# gasco-table-col



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute     | Description | Type      | Default     |
| ------------ | ------------- | ----------- | --------- | ----------- |
| `action`     | `action`      |             | `boolean` | `undefined` |
| `typeAction` | `type-action` |             | `string`  | `undefined` |


## Events

| Event                  | Description | Type                               |
| ---------------------- | ----------- | ---------------------------------- |
| `gascoTableTypeAction` |             | `CustomEvent<ITableColTypeAction>` |


## Shadow Parts

| Part       | Description |
| ---------- | ----------- |
| `"native"` |             |


## Dependencies

### Used by

 - [gasco-table](../gasco-table)

### Depends on

- ion-icon
- [gasco-list](../gasco-list)
- [gasco-item](../gasco-item)

### Graph
```mermaid
graph TD;
  gasco-table-col --> ion-icon
  gasco-table-col --> gasco-list
  gasco-table-col --> gasco-item
  gasco-table --> gasco-table-col
  style gasco-table-col fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
