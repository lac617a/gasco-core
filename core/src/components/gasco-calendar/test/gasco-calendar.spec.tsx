import { newSpecPage } from '@stencil/core/testing';
import { GascoCalendar } from '../gasco-calendar';

describe('gasco-calendar', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [GascoCalendar],
      html: `<gasco-calendar></gasco-calendar>`,
    });
    expect(page.root).toEqualHtml(`
      <gasco-calendar>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </gasco-calendar>
    `);
  });
});
