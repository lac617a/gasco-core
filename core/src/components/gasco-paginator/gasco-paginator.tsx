import { ComponentInterface, EventEmitter, Fragment, Listen } from '@stencil/core';
import { Component, Event, Prop, h, Host, Watch, Element, State } from '@stencil/core';
import { chevronBack, chevronForward, playBackOutline, playForwardOutline } from 'ionicons/icons';
import { PaginatorChangeEventDetail, PaginatorReadyEventDetail } from '../../interface';
import paginate from './utils';

@Component({
  tag: 'gasco-paginator',
  styleUrl: 'gasco-paginator.scss',
  shadow: true
})
export class GascoPaginator implements ComponentInterface {
  private pages: number[] = [];
  private start: number = 1;
  private end: number;
  private pageCount: number = 0;

  @Element() el!: HTMLGascoPaginatorElement;

  @Prop({ reflect: true, mutable: true }) currentPage: number = 1;
  @Prop({ reflect: true, mutable: true }) pageSize: number = 10;
  @Prop({ reflect: true, mutable: true }) suggestionList?: number[];

  @Prop({ reflect: true }) totalItems?: number;

  /**
   * Additional attributes to pass to the pagiantor.
   */
  @Prop() htmlAttributes?: { [key: string]: any };

  @Event() sizeChanged!: EventEmitter;
  @Event() gascoChange!: EventEmitter<PaginatorChangeEventDetail>;
  @Event() gascoReady!: EventEmitter<PaginatorReadyEventDetail>;

  @State() countPaginatorStart: number = 0;
  @State() countPaginatorEnd: number = 3;
  @State() isExpanded: boolean = false;

  componentWillLoad() {

    if (this.totalItems) {
      this.getTotalItemCount(this.totalItems);
      const { currentPage, pageSize } = this.getTotalItemCount(this.totalItems);
      this.end = currentPage * pageSize;
    }

    if (document.documentElement.clientWidth > 480) {
      this.displayedPagesLarge();
    } else {
      this.displayedPagesSmall();
    }

    this.gascoReady.emit({ ...this, start: this.start, end: this.end });
  }

  @Watch('totalItems')
  handleItemCount(current: number) {
    this.getTotalItemCount(current);
  }

  private getTotalItemCount(current?: number) {
    const { totalPages, pages, currentPage, pageSize } = paginate(current, this.currentPage, this.pageSize);
    this.pages = pages;
    this.pageCount = totalPages;

    return {
      pageSize,
      currentPage
    }
  }

  private getPageSelect() {
    const pageSelects = this.suggestionList
      ? this.suggestionList.map((s) => {
        return s;
      })
      : [];
    return pageSelects
  }

  private handleSelect(event: UIEvent, index: number) {
    event.preventDefault();
    this.currentPage = index;
    if (this.currentPage <= this.pageCount) {
      if (this.currentPage === 2) {
        this.start = this.currentPage * (this.pageSize / 2) + 1;
        this.end = this.currentPage * (this.pageSize / 2) + this.pageSize;
      } else {
        this.start = (this.currentPage - 1) * this.pageSize + 1;
        this.end = (this.currentPage - 1) * this.pageSize + this.pageSize;
      }

      this.end = this.currentPage === this.pageCount ? this.totalItems : this.end;

      if (this.end !== this.pageCount) {
        this.gascoChange.emit({ current: index, start: this.start, end: this.end });
      }
    }
    event.stopPropagation();
  }

  @Watch('pageSize')
  handlePageSize(current: number) {
    this.pageSize = current;
    this.end = (this.currentPage - 1) * current + current;
    this.getTotalItemCount(this.totalItems);
    this.gascoChange.emit({ current: this.currentPage, start: this.start, end: this.end });
  }

  private handlePageSizeChange(event: Event, value: number) {
    event.preventDefault();
    this.pageSize = value;
    event.stopPropagation();
  }

  @Listen('resize', {target: 'window'})
  protected handleResizePaginator(){
    if (document.documentElement.clientWidth > 480) {
      return this.displayedPagesLarge();
    } else {
      return this.displayedPagesSmall();
    }
  }


  private displayedPagesLarge() {
    // if currentPage is currentPage 1
    if (this.currentPage === 1) {
      return this.pages.slice(this.currentPage - 1, this.currentPage + 2);
    }
    // if currentPage is the last currentPage
    else if (this.currentPage === this.pages.length) {
      return this.pages.slice(this.currentPage - 2, this.currentPage + 1);
    }
    // if currentPage is between 4-7
    else if (this.currentPage >= 4 && this.currentPage <= 7) {
      return this.pages.slice(this.currentPage - 2, this.currentPage + 1);
    }
    // if currentPage more than 7
    else if (this.currentPage > 7) {
      return this.pages.slice(this.currentPage - 2, this.currentPage + 1);
    }
    // if currentPage less than 4
    else {
      return this.pages.slice(this.currentPage - 1, this.currentPage + 2);
    }
  }

  private displayedPagesSmall() {
    return this.pages.slice(this.currentPage - 1, this.currentPage + 1);
  }

  private renderPaginate() {
    return (
      <div class="paginator-pages">
        <div class="wrap-indicator">
          <button
            disabled={this.currentPage <= 2}
            onClick={e => {
              const current = this.currentPage -= 2;
              this.handleSelect(e, current);
          }}>
            <ion-icon icon={playBackOutline} lazy={false} flipRtl></ion-icon>
          </button>
          <button
            disabled={this.currentPage === 1}
            onClick={e => {
              const current = this.currentPage -= 1;
              this.handleSelect(e, current);
          }}>
            <ion-icon icon={chevronBack} lazy={false} flipRtl></ion-icon>
          </button>
          {document.documentElement.clientWidth > 480 && (
            this.currentPage > 3 && (
              <Fragment>
                <button
                  class="paginator-indicator"
                  onClick={e => {
                    const current = this.currentPage = 1;
                    this.handleSelect(e, current);
                  }}>
                    {this.pages[0]}
                </button>
                <span>...</span>
              </Fragment>
            )
          )}

          {this.handleResizePaginator().map(index => (
            <button
              class={{
                ['paginator-indicator']: true,
                ['active-indicator']: this.currentPage === index
              }}
              onClick={e => {
                const current = this.currentPage = index;
                this.handleSelect(e, current);
              }}>
              {index}
            </button>
          ))}
          {this.currentPage < this.pages.length - 2 && <span>...</span>}
          {this.currentPage < this.pages.length - 2 && (
            <button
              class="paginator-indicator"
              onClick={e => {
                const current = this.currentPage = this.pages.length;
                this.handleSelect(e, current);
              }}>
              {this.pages[this.pages.length - 1]}
            </button>
          )}

          <button
            disabled={this.currentPage === this.pages[this.pages.length - 1]}
            onClick={e => {
              const current = this.currentPage += 1;
              this.handleSelect(e, current);
            }}>
            <ion-icon icon={chevronForward} lazy={false} flipRtl></ion-icon>
          </button>
          <button
            disabled={this.currentPage >= this.pages[this.pages.length - 2]}
            onClick={e => {
              const current = this.currentPage += 2;
              this.handleSelect(e, current);
            }}>
            <ion-icon icon={playForwardOutline} lazy={false} flipRtl></ion-icon>
          </button>
        </div>
      </div>
    )
  }

  private renderChoice() {
    const choice = this.getPageSelect().map(n => (
      <gasco-item onClick={(e) => this.handlePageSizeChange(e, n)}>{n}</gasco-item>
    ));

    return this.getPageSelect().length > 0 && (
      <div class="paginator-select">
        <span>Filas por página:</span>
        <div class="select-wrap">
          <button
            class="select-button"
            onBlur={() => setTimeout(() => this.isExpanded = false, 200)}
            onFocus={() => this.isExpanded = true}>{this.pageSize}</button>
          {this.isExpanded && (
            <gasco-list>
              {choice}
            </gasco-list>
          )}
        </div>
        <span class="paginator-counts">
          {this.start} - {this.currentPage === this.pages[this.pageCount] ? this.totalItems : this.end} de {this.totalItems}
        </span>
      </div>
    )
  }

  render() {
    return (
      <Host
        {...(this.htmlAttributes as any)}
        class={{
          'gasco-paginator': true,
          'paginator-with-select': this.getPageSelect().length > 0
        }}>
        {this.renderChoice()}
        {this.renderPaginate()}
      </Host>
    );
  }
}
