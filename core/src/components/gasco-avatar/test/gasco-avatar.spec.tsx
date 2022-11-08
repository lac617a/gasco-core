import { newSpecPage } from '@stencil/core/testing';
import { GascoAvatar } from '../gasco-avatar';

describe('gasco-avatar', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [GascoAvatar],
      html: `<gasco-avatar></gasco-avatar>`,
    });
    expect(page.root).toEqualHtml(`
      <gasco-avatar>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </gasco-avatar>
    `);
  });
});
