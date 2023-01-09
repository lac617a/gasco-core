import type { ComponentInterface } from '@stencil/core';
import { Component, Host, h, Prop, Watch, Element, State, Listen } from '@stencil/core';
import { chevronBackOutline, chevronDownOutline, chevronForwardOutline  } from 'ionicons/icons';

import type { Color } from '../../interface';
import { createColorClasses } from '../../utils/theme';
import { INavbarUser, INavbarUserNav, IGetUserOfNavbar } from '../../interface';

@Component({
  tag: 'gasco-sidebar',
  styleUrl: 'gasco-sidebar.scss',
  scoped: true,
})
export class GascoSidebar implements ComponentInterface {
  private usernav!: INavbarUserNav[];
  //TODO hacer una variable privada para manejar el los subItem

  @Element() el!: HTMLGascoSidebarElement;

  @State() user?: INavbarUser;
  @State() isResize: boolean = false;
  @State() isOpenMenu: boolean = false;
  @State() isOpenNavbar: boolean = false;
  @State() isResponsive: number = document.documentElement.clientWidth;

  /**
   * If 'true', the `gasco-sidebar` will be inicialized open, defaul is `false`.
   */
  @Prop() isOpen?: boolean = false;

  /**
   * If `cover`, the `gasco-sidebar` will expand to cover the full height of its container.
   * If `fixed`, the `gasco-sidebar` will have a fixed height.
   */
  @Prop() size?: 'cover' | 'fixed' = 'fixed';

  /**
   * The color to use from your application's color palette.
   * Default options are: `"primary"`, `"secondary"`, `"success"`, `"warning"`, `"danger"`.
   */
  @Prop({ reflect: true }) color?: Color = 'primary';

  // EVENT's
  @Listen('resize', {target: 'window'})
  protected handleResize() {
    this.isResponsive = document.documentElement.clientWidth;
  }

  @Listen('gascoSetUserToSidebar', {target: 'body'})
  protected handleShowUser(e: CustomEvent<IGetUserOfNavbar>) {
    this.user = e.detail.user;
    this.usernav = e.detail.userNav;
  }

  @Listen('gascoBackdropTap', {target: 'body'})
  protected handleBackdrop() {
    this.isResize = false;

    setTimeout(() => {
      this.isOpenNavbar = false;
      document.body.childNodes.forEach((node) => {
        if (node.nodeName === 'GASCO-BACKDROP') {
          node.remove();
        }
      });
    }, 120);
  }

  @Listen('gascoSidebarShow', {target: 'body'})
  protected handleSidebarShow(e: CustomEvent) {
    this.isOpenNavbar = e.detail;
    this.isResize = true;

    const backdropEl = document.createElement('gasco-backdrop');
    backdropEl.visible = true;
    document.body.appendChild(backdropEl);
  }

  @Listen('click', {target: 'body', capture: false, passive: true})
  protected handleGascoChange(e: Event) {
    const item = (e.target as HTMLGascoItemElement);

    if(item.tagName === "GASCO-ITEM") {
      if (item.style.height === 'auto' || !item.style.height) {
        item.style.height = '24px';
        item.children.item(2).replaceWith(this.createNewIcon(chevronForwardOutline, 'end'));
      } else {
        item.style.height = 'auto';
        item.children.item(2).replaceWith(this.createNewIcon(chevronDownOutline, 'end'));
      }
    }
    e.stopPropagation();
  }

  // Item  Watch
  @Watch('isResize')
  protected handleIsResize(current: boolean) {
    const subItem = this.el.querySelectorAll('gasco-list-header');
    const item = this.el.querySelectorAll('gasco-item');

    if(current) {

      item?.forEach(node => {
        node.classList.remove('in-sidebar-show');
        node.classList.add('in-sidebar');
        if (!node?.href) {
          node.style.height = '24px';
          node.children.item(2).replaceWith(this.createNewIcon(chevronForwardOutline, 'end'));
        }
      });

      if (this.isResponsive >= 480) {
        subItem?.forEach((el, index) => {
          el.style.transition = '300ms';
          el.style.opacity = '0';
          el.style.height = '40px';
          el.style.transform = 'translate(-100px) scale(0)';
          if (index > 0) {
            setTimeout(() => el.style.display = 'none', 300);
          }
        });
      } else {
        item?.forEach(node => {
          node.classList.add('in-sidebar-show');
          node.classList.remove('in-sidebar');
        });
      }
    } else {
      item?.forEach(node => {
        node.classList.add('in-sidebar-show');
        node.classList.remove('in-sidebar');
      });

      subItem?.forEach(el => {
        el.style.display = 'flex';
        el.style.opacity = '1';
        el.style.height = 'auto';
        el.style.transform = 'translate(0px) scale(1)';
      });
    }
  }

  // METHOD's
  private handleHiddenSidebar = () => {
    if (this.isResponsive <= 480) {
      this.isResize = false;
      setTimeout(() => {
        this.isOpenNavbar = false;
        this.handleBackdrop();
      }, 120);
    } else {
      this.isResize = !this.isResize;
      this.isOpenNavbar = !this.isOpenNavbar;
    }
  }

  private createNewIcon(icon: any, slot: string) {
    const iconEl = document.createElement('ion-icon');
    iconEl.slot = slot;
    iconEl.lazy = false;
    iconEl.icon = icon;
    iconEl.classList.add('gasco-sidebar-toggle-icon');
    iconEl.setAttribute('aria-hidden', 'true');
    return iconEl;
  }

  private routesExacItem(node: HTMLGascoListElement) {
    const location = window.location.pathname;
    if (node.slot === 'sub-list') {
      const parentElement = node.parentElement;
      let subItem: HTMLGascoItemElement;
      
      node.childNodes.forEach(item => {
        const ASitem = item as HTMLGascoItemElement;
        if (ASitem.tagName === 'GASCO-ITEM' && ASitem.href === location) {
          subItem = ASitem;
        }
      });

      parentElement.style.transition = 'height 300ms';
      parentElement.style.willChange = 'height';

      if (subItem) {
        parentElement.classList.add('route-active');
        parentElement.appendChild(
          this.createNewIcon(chevronDownOutline, 'end')
        );
      } else {
        parentElement.classList.remove('route-active');
        parentElement.style.height = '24px';
        parentElement.appendChild(
          this.createNewIcon(chevronForwardOutline, 'end')
        );
      }
    }
  }

  componentWillLoad() {
    const allItem = this.el.querySelectorAll('gasco-item');
    allItem.forEach(node => node.classList.add('in-sidebar-show'));

    const allList = this.el.querySelectorAll('gasco-list');
    allList.forEach(node => this.routesExacItem(node));
  }

  // componentWillUpdate() {
  //   const subItem = this.el.querySelectorAll('gasco-item');
  //   subItem.forEach(node => this.routesExacItem(node, true));
  // }

  render() {
    const { user, handleHiddenSidebar } = this;
    return (
      <Host
        class={createColorClasses(this.color, {
          'gasco-activatable': true,
          [`sidebar-size-${this.size}`]: true,
          'sidebar-show': this.isOpenNavbar,
          'sidebar-with-user': user !== null,
      })}>
        <div class="sidebar-native" part="native">
          <button
            class={`sidebar-button${this.isResize ? ' is-resize' : ''}`}
            onClick={handleHiddenSidebar}>
            <ion-icon icon={chevronBackOutline} style={{fontSize:52}}></ion-icon>
          </button>
          {this.isResponsive <= 480 && user !== null && (
            <button
              class="sidebar-user-button"
              onFocus={() => this.isOpenMenu = true}
              onBlur={() => setTimeout(() => this.isOpenMenu = false, 120)}>
              <figure class="wrap-avatar">
                <img src={user?.avatar} alt={user?.name} />
                <figcaption>
                  <h3>{user?.name}</h3>
                  <p>{user?.role}</p>
                </figcaption>
              </figure>
            </button>
          )}
          <slot name="user-nav" />
          {this.isOpenMenu && (
            <gasco-list class="menu-user">
              {this.usernav.map((nav: INavbarUserNav) => (
                <gasco-item href={nav.link}>{nav.name}</gasco-item>
              ))}
            </gasco-list>
          )}
          <slot />
        </div>
      </Host>
    );
  }
}
