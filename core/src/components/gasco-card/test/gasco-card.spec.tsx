import { newSpecPage } from '@stencil/core/testing';
import { GascoCard } from '../gasco-card';

describe('gasco-card', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [GascoCard],
      html: `<gasco-card></gasco-card>`,
    });
    expect(page.root).toEqualHtml(`
      <gasco-card>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </gasco-card>
    `);
  });
});
