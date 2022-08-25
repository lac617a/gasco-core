import { newSpecPage } from '@stencil/core/testing';
import { GascoProgress } from '../gasco-progress';

describe('gasco-progress', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [GascoProgress],
      html: `<gasco-progress></gasco-progress>`,
    });
    expect(page.root).toEqualHtml(`
      <gasco-progress>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </gasco-progress>
    `);
  });
});
