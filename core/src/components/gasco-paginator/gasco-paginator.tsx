import type { ComponentInterface, EventEmitter } from '@stencil/core';
import { Component, Event, Prop, h, Host, Watch, Element, State } from '@stencil/core';
import { chevronBack, chevronForward } from 'ionicons/icons';
import { PaginatorChangeEventDetail, PaginatorReadyEventDetail } from '../../interface';

@Component({
  tag: 'gasco-paginator',
  styleUrl: 'gasco-paginator.scss',
  scoped: true
})
export class GascoPaginator implements ComponentInterface {
  private pages: number[] = [];
  private start: number = 1;
  private end: number;
  private pageCount: number = 0;

  @Element() el!: HTMLGascoPaginatorElement;

  @Prop({reflect: true, mutable: true}) page: number = 1;
  @Prop({reflect: true, mutable: true}) pageSize: number = 10;
  @Prop({reflect: true, mutable: true}) selectList?: number[];
  
  @Prop({reflect: true}) itemCount?: number;

  /**
   * Additional attributes to pass to the pagiantor.
   */
  @Prop() htmlAttributes?:  { [key: string]: any };

  @Event() sizeChanged!: EventEmitter;
  @Event() gascoChange!: EventEmitter<PaginatorChangeEventDetail>;
  @Event() gascoPaginatorReady!: EventEmitter<PaginatorReadyEventDetail>;

  @State() countPaginatorStart: number = 0;
  @State() countPaginatorEnd: number = 3;

  componentWillLoad() {
    if (this.itemCount) {
      this.end = this.page * this.pageSize;
      this.getTotalItemCount(this.itemCount, this.pageSize);
    }
    this.gascoPaginatorReady.emit({...this, start: this.start, end: this.end});
  }

  @Watch('itemCount')
  handleItemCount(current: number){
    this.getTotalItemCount(current, this.pageSize);
  }

  private getTotalItemCount(itemCount?: number, pageSize?: number) {
    this.pages = [];
    for (let i = 1; i < Math.ceil(itemCount / pageSize); i++) {
      this.pages.push(i);
    }
    this.pageCount = this.pages.length;
  }

  private getPageSelect() {
    const pageSelects = this.selectList
      ? this.selectList.map((s) => {
        return s;
      })
      : [];
    return pageSelects
  }

  private handleCountPaginator(higher?: boolean, simple?: boolean) {
    let defaultSimple: boolean = this.page % 3 === (higher ? 0 : 1) && (this.page + 1) !== 2;
    if (!simple) {
      defaultSimple = this.page % 3 === 1;
    }
    
    if (defaultSimple) {
      if (higher) {
        this.countPaginatorStart = this.countPaginatorEnd;
        this.countPaginatorEnd += 3;
        return;
      }

      if ((this.page - 1) <= 3) {
        this.countPaginatorStart = 0;
        this.countPaginatorEnd = 3;
      } else {
        this.countPaginatorEnd = this.countPaginatorStart;
        this.countPaginatorStart -= 3;
      }
      // console.log('STATR:', this.countPaginatorStart);
      // console.log('END:', this.countPaginatorEnd);
    }
  }

  private handlePrevious(event: UIEvent, value?: number) {
    if (value && this.page !== 2 && this.page !== 1) {
      this.handleCountPaginator(false, false);
      return this.handleSelect(event, (this.page - 1) - value);
    } else if (this.page !== 1) {
      this.handleCountPaginator(false, true);
      return this.handleSelect(event, this.page - 1)
    }
  }

  private handleNext(event: UIEvent, value?: number) {
    if (value && this.page !== this.pageCount) {
      this.handleCountPaginator(true, false);
      return this.handleSelect(event, (this.page + 1) + value);
    } else if (this.page !== this.pageCount) {
      this.handleCountPaginator(true, true);
      return this.handleSelect(event, this.page + 1);
    }
  }

  private handleSelect(event: UIEvent, index: number) {
    event.preventDefault();
    this.page = index;

    if (this.page === 2) {
      this.start = this.page * (this.pageSize / 2) + 1;
      this.end = this.page * (this.pageSize / 2) + this.pageSize;
    } else {
      this.start = (this.page - 1) * this.pageSize + 1;
      this.end = (this.page - 1) * this.pageSize + this.pageSize;
    }

    this.end = this.page === this.pageCount ? this.itemCount : this.end;

    if (this.end !== this.pageCount) {
      this.gascoChange.emit({value: index + 1, start: this.start, end: this.end});
    }
  }

  @Watch('pageSize')
  handlePageSize(current: number) {
    this.end = (this.page - 1) * current + current + 1;
    this.getTotalItemCount(this.itemCount, current);
    this.gascoChange.emit({start: this.start, end: this.end});
  }

  private handlePageSizeChange(event) {
    this.pageSize = event.target.value
  }

  private renderPages() {
    return (
      <div class="paginator-pages">
        <div class="wrap-buttons">
          <button
            onClick={event => this.handlePrevious(event, 2)}>
            <ion-icon icon={chevronBack} lazy={false} flipRtl></ion-icon>
            <ion-icon icon={chevronBack} lazy={false} flipRtl></ion-icon>
          </button>
          <button
            onClick={event => this.handlePrevious(event)}>
            <ion-icon icon={chevronBack} lazy={false} flipRtl></ion-icon>
          </button>
        </div>
        <div class="wrap-indicator">
          {this.pages.slice(this.countPaginatorStart, this.countPaginatorEnd).map((index: number) => {
              return (
                <button
                  class={`paginator-indicator ${this.page === index && 'active-indicator'}`}
                  onClick={event => this.handleSelect(event, index)}>
                  {index}
                </button>
              )
          })}
        </div>
        <div class="wrap-buttons">
          <button
            onClick={event => this.handleNext(event)}>
            <ion-icon icon={chevronForward} lazy={false} flipRtl></ion-icon>
          </button>
          <button
            onClick={event => this.handleNext(event, 2)}>
            <ion-icon icon={chevronForward} lazy={false} flipRtl></ion-icon>
            <ion-icon icon={chevronForward} lazy={false} flipRtl></ion-icon>
          </button>
        </div>
      </div>
    )
  }

  render() {
    return (
      <Host
        {...(this.htmlAttributes as any)}
        class={`
          gasco-paginator 
          ${this.getPageSelect().length > 0 ? 'paginator-with-select' : ''}
        `}
      >
        {this.getPageSelect().length > 0 && (
          <div class="paginator-select">
            <div class="paginator-size">
              <span>Mostrar</span>
              <select onChange={event => this.handlePageSizeChange(event)}>
                {this.getPageSelect().map(n => <option>{n}</option>)}
              </select>
            </div>
            <div class="paginator-counts">
              {this.start} - {this.page === this.pages[this.pageCount] ? this.itemCount : this.end} de {this.itemCount}
            </div>
          </div>
        )}
        {this.renderPages()}
      </Host>
    );
  }
}
