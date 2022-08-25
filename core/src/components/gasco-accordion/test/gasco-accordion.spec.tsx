import { newSpecPage } from '@stencil/core/testing';
import { GascoAccordion } from '../gasco-accordion';

describe('gasco-accordion', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [GascoAccordion],
      html: `<gasco-accordion></gasco-accordion>`,
    });
    expect(page.root).toEqualHtml(`
      <gasco-accordion>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </gasco-accordion>
    `);
  });
});
