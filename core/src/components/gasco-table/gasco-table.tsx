import { ComponentInterface, EventEmitter, Fragment, FunctionalComponent } from '@stencil/core';
import { Component, Host, h, Prop, State, Listen, Event } from '@stencil/core';
import { ITableUsers, ITableColTypeAction } from '../../interface';

@Component({
  tag: 'gasco-table',
  styleUrl: 'gasco-table.scss',
  shadow: true,
})
export class GascoTable implements ComponentInterface {
  // This can be improved, so that it can be more dynamic.
  private tableHeader: ITableUsers[] = [{
    name: 'Nombre',
    phone: 'Telefono',
    address: 'Dirección',
    date: 'Fecha',
    hour: 'Hora',
    state: 'Estado'
  }];

  @Prop() pagination?: boolean = true;
  /**
   * Taking into account the number of elements to display by default it is `undefined`.
  */
  @Prop({ reflect: true }) totalItems?: number;
  /**
   * Number of elements to show this taking into account that it will always be 10 + 10.
   */
  @Prop({ reflect: true }) pageSize?: number = 10;
  /**
   * If it is `1`, `pageSize` will be shown, which is equivalent to the elements that you want to show.
   */
  @Prop({ reflect: true }) currentPage?: number = 1;
  /**
   * Amounts of items to display, this may vary depending on the user.
   */
  @Prop({ reflect: true }) suggestionList?: number[] = [10, 20, 30];

  /**
   * The number of users to display.
   */
  @Prop({ mutable: true }) users?: ITableUsers[];

  @State() isResponsive: number = document.documentElement.clientWidth;
  @State() checkboxList: any[] = [];
  @State() stateUserList: ITableUsers[] = [];
  @State() isCheckboxAll: boolean = false;
  @State() isCheckbox: boolean = false;

  @Event() gascoTableAction!: EventEmitter<ITableColTypeAction>;

  // EVENT's
  @Listen('resize', {target: 'window'})
  protected handleResize() {
    this.isResponsive = document.documentElement.clientWidth;
  }

  @Listen('gascoTableTypeAction', { target: 'body' })
  protected handleGetTypeAction(ev: CustomEvent<ITableColTypeAction>) {
    const type = ev.detail;
    if (this.checkboxList.length > 0) {
      this.gascoTableAction.emit({ action: type.action, data: this.checkboxList });
    } else {
      this.gascoTableAction.emit({ action: type.action, data: type.data });
    }
  }

  componentWillLoad() {
    this.stateUserList = this.users;
  }

  // METHOD's
  private handleSelectUser(userOrAll: string | number) {

    // We have all the users we want to either edit, delete or etc.
    if (userOrAll === 'all') {
      this.checkboxList = [];
      if (!this.isCheckboxAll) {
        this.users.forEach(({ id }) => this.checkboxList.push(id));
        this.isCheckboxAll = true;
        return 0;
      }
      this.isCheckboxAll = false;
      return 0;
    }

    // We are looking for an existing user.
    const findUser = this.checkboxList.find(id => id === userOrAll);
    if (findUser) {
      // If the user existes we delete it.
      const removeUser = this.checkboxList.filter(id => id !== userOrAll);
      this.checkboxList = removeUser;
    } else {
      // If the user does not exist, we save it
      this.checkboxList.push(userOrAll);
      this.isCheckbox = true;
    }

    if (this.checkboxList.length === 0) {
      this.isCheckbox = false;
    }
  }

  private handleTableSortData(e: Event) {
    this.stateUserList = [];
    const thead = (e.target as HTMLGascoTableColElement);

    if (thead.getAttribute("data-dir") === "desc") {
      this.handleSortData(thead.id, "desc");
      thead.setAttribute("data-dir", "asc");
    } else {
      this.handleSortData(thead.id, "asc");
      thead.setAttribute("data-dir", "desc");
    }
  }

  private handleSortData(param: string, direction: string = "asc") {
    const sortedData = direction === "asc"
      ? this.users.sort((a, b) => {
          if (a[param] < b[param]) {
            return -1;
          }
          if (a[param] > b[param]) {
            return 1;
          }
          return 0;
        })
      : this.users.sort((a, b) => {
          if (b[param] < a[param]) {
            return -1;
          }
          if (b[param] > a[param]) {
            return 1;
          }
          return 0;
        });
    this.stateUserList = sortedData;
    // console.log(this.stateUserList);
  }

  private renderThead() {
    return this.tableHeader.map(thead => {
      return Object.values(thead).map((value, y: number) => {
        const valueForSort = Object.keys(thead)[y];
        return (
          <gasco-table-col
            id={valueForSort}
            class="table-thead"
            onClick={(e) => this.handleTableSortData(e)}>
            {value} <SvgSort />
          </gasco-table-col>
        )
      });
    });
  }

  private renderTbodyLarger() {
    return this.stateUserList.map((data: ITableUsers) => (
      <gasco-table-row>
        <gasco-table-col>
          <gasco-checkbox
            checked={this.isCheckboxAll}
            onClick={() => this.handleSelectUser(data.id)}
          ></gasco-checkbox>
        </gasco-table-col>
        <gasco-table-col>
          <gasco-avatar src={data.avatar} alt={data.name}>
            <gasco-label class="avatar-label">{data.name}</gasco-label>
            <gasco-label class="avatar-label">{data.description}</gasco-label>
          </gasco-avatar>
        </gasco-table-col>
        <gasco-table-col>{data.phone}</gasco-table-col>
        <gasco-table-col>{data.address}</gasco-table-col>
        <gasco-table-col>{data.date}</gasco-table-col>
        <gasco-table-col>{data.hour}</gasco-table-col>
        <gasco-table-col
          class={`table-status-${data.state ? 'active' : 'inactive'}`}>
          {data.state ? 'Activo' : 'Inactivo'}
        </gasco-table-col>
        <gasco-table-col action typeAction={data.id}></gasco-table-col>
      </gasco-table-row>
    ));
  }

  private renderTbodySmall() {
    return this.stateUserList.map((data: ITableUsers) => (
      <gasco-table-row class="table-row-small">
        <gasco-table-col class="table-col-small">
          <gasco-checkbox
            checked={this.isCheckboxAll}
            onClick={() => this.handleSelectUser(data.id)}
          ></gasco-checkbox>
          <gasco-avatar src={data.avatar} alt={data.name}>
            <gasco-label class="avatar-label">{data.name}</gasco-label>
            <gasco-label class="avatar-label">{data.description}</gasco-label>
          </gasco-avatar>
          <gasco-table-col action typeAction={data.id}></gasco-table-col>
        </gasco-table-col>
        <div class="wrapper-table-small">
          <div class="table-small">
            <span>Status</span>
            <gasco-table-col
              class={`table-status-${data.state ? 'active' : 'inactive'}`}>
              {data.state ? 'Activo' : 'Inactivo'}
            </gasco-table-col>
          </div>
          <div class="table-small">
            <span>Numero</span>
            <gasco-table-col>{data.phone}</gasco-table-col>
          </div>
          <div class="table-small">
            <span>Fecha</span>
            <gasco-table-col>{data.date}</gasco-table-col>
          </div>
          <div class="table-small">
            <span>Dirección</span>
            <gasco-table-col>{data.address}</gasco-table-col>
          </div>
          <div class="table-small">
            <span>Hora</span>
            <gasco-table-col>{data.hour}</gasco-table-col>
          </div>
        </div>
      </gasco-table-row>
    ));
  }

  render() {
    const { pagination, currentPage, pageSize, totalItems, suggestionList } = this;
    return (
      <Host class={{
        'gasco-table': true,
        'gasco-color-primary': true
      }}>
        <div role="table" class="table-native" part="native">
          {this.isResponsive > 768 ? (
            <Fragment>
              <gasco-table-row header>
                <gasco-table-col>
                  <gasco-checkbox onClick={() => this.handleSelectUser('all')}></gasco-checkbox>
                </gasco-table-col>
                {this.renderThead()}
                <gasco-table-col
                  action={this.isCheckboxAll || this.isCheckbox}>
                  {!this.isCheckboxAll && !this.isCheckbox && 'Acciones'}
                </gasco-table-col>
              </gasco-table-row>
              {this.renderTbodyLarger()}
            </Fragment>
          ) : (
            <Fragment>
              <gasco-table-row header class="table-row-small">
                <gasco-table-col class="table-col-small">
                  <gasco-checkbox onClick={() => this.handleSelectUser('all')}></gasco-checkbox>
                </gasco-table-col>
                <gasco-table-col action={!this.isCheckboxAll || !this.isCheckbox}></gasco-table-col>
              </gasco-table-row>
              {this.renderTbodySmall()}
            </Fragment>
          )}
        </div>
        {pagination && (
          <gasco-paginator
            currentPage={currentPage}
            pageSize={pageSize}
            totalItems={totalItems}
            suggestionList={suggestionList}></gasco-paginator>
        )}
      </Host>
    );
  }
}

const SvgSort: FunctionalComponent = () => (
  <svg
    width="8"
    height="14"
    fill="none"
    viewBox="0 0 8 14"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M7.33203 9.50007L3.9987 12.8334L0.665364 9.50007M0.665364 4.50007L3.9987 1.16674L7.33203 4.50007"
      stroke="#072531"
      stroke-width="1.25"
      stroke-linecap="round"
      stroke-linejoin="round"/>
  </svg>
)