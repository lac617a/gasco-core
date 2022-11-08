import { ComponentInterface, EventEmitter } from '@stencil/core';
import { Component, h, Element, State, Prop, Event } from '@stencil/core';
import { ellipsisVertical } from 'ionicons/icons';

import { ITableColTypeAction } from '../../interface'

@Component({
  tag: 'gasco-table-col',
  styleUrl: 'gasco-table-col.scss',
  scoped: true,
})
export class GascoTableCol implements ComponentInterface {
  @State() isColHeader: boolean;
  @State() showList: boolean = false;

  @Element() el!: HTMLGascoTableColElement;

  @Prop({ reflect: true }) action?: boolean;
  @Prop({ reflect: true }) typeAction?: string;

  @Event({composed: true})
    gascoTableTypeAction!: EventEmitter<ITableColTypeAction>;

  componentWillLoad() {
    this.getRowHeader();
  }

  private getRowHeader() {
    const parent = this.el.parentElement.className;
    this.isColHeader = parent.includes('table-row-header');
  }
  
  render() {
    const { action, typeAction } = this;
    return (
      <span
        part="native"
        class={{
          'table-col': true,
          [`table-col-header`]: this.isColHeader
        }}>
        <slot></slot>
        {action && (
          <button
            onFocus={() => this.showList = true}
            onBlur={() => setTimeout(() => this.showList = false, 200)}>
            <ion-icon icon={ellipsisVertical} lazy={false}></ion-icon>
          </button>
        )}
        {this.showList && (
          <gasco-list>
            <gasco-item
              class="table-action"
              onClick={() => this.gascoTableTypeAction.emit({action: 'edit', data: typeAction})}>
              Editar
            </gasco-item>
            <gasco-item
              class="table-action"
              onClick={() => this.gascoTableTypeAction.emit({action: 'delete', data: typeAction})}>
              Eliminar
            </gasco-item>
          </gasco-list>
        )}
      </span>
    );
  }

}
