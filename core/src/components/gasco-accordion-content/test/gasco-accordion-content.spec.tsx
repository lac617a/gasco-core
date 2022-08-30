import { newSpecPage } from '@stencil/core/testing';
import { GascoAccordionContent } from '../gasco-accordion-content';

describe('gasco-accordion-content', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [GascoAccordionContent],
      html: `<gasco-accordion-content></gasco-accordion-content>`,
    });
    expect(page.root).toEqualHtml(`
      <gasco-accordion-content>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </gasco-accordion-content>
    `);
  });
});
