import { newSpecPage } from '@stencil/core/testing';
import { GascoAccordionGroup } from '../gasco-accordion-group';

describe('gasco-accordion-group', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [GascoAccordionGroup],
      html: `<gasco-accordion-group></gasco-accordion-group>`,
    });
    expect(page.root).toEqualHtml(`
      <gasco-accordion-group>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </gasco-accordion-group>
    `);
  });
});
