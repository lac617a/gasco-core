export interface PaginatorChangeEventDetail {
  current?: number | null;
  start?: number | null;
  end?: number | null;
}

export interface PaginatorReadyEventDetail {
  target: HTMLGascoPaginatorElement;
  detail: PaginatorChangeEventDetail
}