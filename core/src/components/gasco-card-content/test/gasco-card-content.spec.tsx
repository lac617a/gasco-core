import { newSpecPage } from '@stencil/core/testing';
import { GascoCardContent } from '../gasco-card-content';

describe('gasco-card-content', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [GascoCardContent],
      html: `<gasco-card-content></gasco-card-content>`,
    });
    expect(page.root).toEqualHtml(`
      <gasco-card-content>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </gasco-card-content>
    `);
  });
});
