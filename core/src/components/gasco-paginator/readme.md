# gasco-paginator



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute    | Description                                     | Type                      | Default     |
| ---------------- | ------------ | ----------------------------------------------- | ------------------------- | ----------- |
| `htmlAttributes` | --           | Additional attributes to pass to the pagiantor. | `{ [key: string]: any; }` | `undefined` |
| `itemCount`      | `item-count` |                                                 | `number`                  | `undefined` |
| `page`           | `page`       |                                                 | `number`                  | `1`         |
| `pageSize`       | `page-size`  |                                                 | `number`                  | `10`        |
| `selectList`     | --           |                                                 | `number[]`                | `undefined` |


## Events

| Event                 | Description | Type                                      |
| --------------------- | ----------- | ----------------------------------------- |
| `gascoChange`         |             | `CustomEvent<PaginatorChangeEventDetail>` |
| `gascoPaginatorReady` |             | `CustomEvent<PaginatorReadyEventDetail>`  |
| `sizeChanged`         |             | `CustomEvent<any>`                        |


## Dependencies

### Depends on

- ion-icon

### Graph
```mermaid
graph TD;
  gasco-paginator --> ion-icon
  style gasco-paginator fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*