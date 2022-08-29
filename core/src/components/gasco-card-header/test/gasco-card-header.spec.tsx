import { newSpecPage } from '@stencil/core/testing';
import { GascoCardHeader } from '../gasco-card-header';

describe('gasco-card-header', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [GascoCardHeader],
      html: `<gasco-card-header></gasco-card-header>`,
    });
    expect(page.root).toEqualHtml(`
      <gasco-card-header>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </gasco-card-header>
    `);
  });
});
