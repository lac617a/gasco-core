import { newSpecPage } from '@stencil/core/testing';
import { GascoContent } from '../gasco-content';

describe('gasco-content', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [GascoContent],
      html: `<gasco-content></gasco-content>`,
    });
    expect(page.root).toEqualHtml(`
      <gasco-content>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </gasco-content>
    `);
  });
});
