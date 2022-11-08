# gasco-table



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute    | Description | Type            | Default     |
| ------------ | ------------ | ----------- | --------------- | ----------- |
| `pagination` | `pagination` |             | `boolean`       | `true`      |
| `users`      | --           |             | `ITableUsers[]` | `undefined` |


## Shadow Parts

| Part       | Description |
| ---------- | ----------- |
| `"native"` |             |


## Dependencies

### Depends on

- [gasco-table-row](../gasco-table-row)
- [gasco-table-col](../gasco-table-col)
- [gasco-checkbox](../gasco-checkbox)
- [gasco-avatar](../gasco-avatar)
- [gasco-label](../gasco-label)
- [gasco-paginator](../gasco-paginator)

### Graph
```mermaid
graph TD;
  gasco-table --> gasco-table-row
  gasco-table --> gasco-table-col
  gasco-table --> gasco-checkbox
  gasco-table --> gasco-avatar
  gasco-table --> gasco-label
  gasco-table --> gasco-paginator
  gasco-table-col --> ion-icon
  gasco-paginator --> ion-icon
  gasco-paginator --> gasco-item
  gasco-paginator --> gasco-list
  style gasco-table fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
