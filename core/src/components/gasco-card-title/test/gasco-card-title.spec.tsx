import { newSpecPage } from '@stencil/core/testing';
import { GascoCardTitle } from '../gasco-card-title';

describe('gasco-card-title', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [GascoCardTitle],
      html: `<gasco-card-title></gasco-card-title>`,
    });
    expect(page.root).toEqualHtml(`
      <gasco-card-title>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </gasco-card-title>
    `);
  });
});
