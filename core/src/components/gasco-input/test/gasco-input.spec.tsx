import { newSpecPage } from '@stencil/core/testing';
import { GascoInput } from '../gasco-input';

describe('gasco-input', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [GascoInput],
      html: `<gasco-input></gasco-input>`,
    });
    expect(page.root).toEqualHtml(`
      <gasco-input>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </gasco-input>
    `);
  });
});
