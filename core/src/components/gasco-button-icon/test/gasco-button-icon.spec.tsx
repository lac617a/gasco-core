import { newSpecPage } from '@stencil/core/testing';
import { GascoButtonIcon } from '../gasco-button-icon';

describe('gasco-button-icon', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [GascoButtonIcon],
      html: `<gasco-button-icon></gasco-button-icon>`,
    });
    expect(page.root).toEqualHtml(`
      <gasco-button-icon>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </gasco-button-icon>
    `);
  });
});
