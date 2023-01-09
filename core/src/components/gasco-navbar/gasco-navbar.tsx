import { ComponentInterface, EventEmitter } from '@stencil/core';
import { Component, Host, h, Prop, State, Listen, Event } from '@stencil/core';
import { menuSharp } from 'ionicons/icons';

import type { Color } from '../../interface';
import { createColorClasses } from '../../utils/theme';
import { INavbarUser, INavbarUserNav, IGetUserOfNavbar } from '../../interface';

const logo = 'https://i.ibb.co/ys0LhBX/logo-Gasco.png';

@Component({
  tag: 'gasco-navbar',
  styleUrl: 'gasco-navbar.scss',
  scoped: true,
})
export class GascoNavbar implements ComponentInterface {
  // STATE
  @State() isResponsive: number = document.documentElement.clientWidth;
  @State() isOpen: boolean = false;

  // PROPS
  @Prop() position?: 'relative' | 'sticky' = 'relative';
  @Prop({ reflect: true }) color?: Color = 'primary';

  @Prop({ reflect: true }) user?: INavbarUser;
  @Prop({ reflect: true }) usernav?: INavbarUserNav[];

  @Event({bubbles: true, composed: true}) gascoSidebarShow!: EventEmitter;
  @Event({bubbles: true, composed: true}) gascoSetUserToSidebar!: EventEmitter<IGetUserOfNavbar>;

  @Listen('resize', {target: 'window'})
  protected handleResize() {
    this.isResponsive = document.documentElement.clientWidth;
  }

  componentWillRender() {
    this.gascoSetUserToSidebar.emit({user: this.user, userNav: this.usernav});
  }

  render() {
    const { user, position } = this;
    return (
      <Host
        class={createColorClasses(this.color, {
          'gasco-navbar': true,
          'gasco-activatable': true,
          [`gasco-position-${position}`]: true,
        })}>
        <header class="header-native" part="native">
          {this.isResponsive <= 480 && (
            <button onClick={() => this.gascoSidebarShow.emit(true)}>
              <ion-icon icon={menuSharp} lazy={false} flipRtl></ion-icon>
            </button>
          )}
          <img src={logo} alt="logo" />
          {this.isResponsive >= 480 && (
            <div class="header-nav">
              <slot name="nav" />
              {user !== undefined && (
                <button
                  class="header-button"
                  onFocus={() => this.isOpen = true}
                  onBlur={() => setTimeout(() => this.isOpen = false, 120)}>
                  <figure class="wrap-avatar">
                    <img src={user?.avatar} alt={user?.name} />
                    <figcaption>
                      <h3>{user?.name}</h3>
                      <p>{user?.role}</p>
                    </figcaption>
                  </figure>
                </button>
              )}
            </div>
          )}
          {this.isOpen && (
            <gasco-list>
              {this.usernav.map((nav: INavbarUserNav, index: number) => (
                <gasco-item
                  divider={index > 0}
                  href={nav.link}>{nav.name}</gasco-item>
              ))}
          </gasco-list>
          )}
        </header>
      </Host>
    );
  }

}
