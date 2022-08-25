import { newSpecPage } from '@stencil/core/testing';
import { GascoDatetime } from '../gasco-datetime';

describe('gasco-datetime', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [GascoDatetime],
      html: `<gasco-datetime></gasco-datetime>`,
    });
    expect(page.root).toEqualHtml(`
      <gasco-datetime>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </gasco-datetime>
    `);
  });
});
