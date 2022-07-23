import { newSpecPage } from "@stencil/core/testing";
import { Button } from '../button';

describe('gasco-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [Button],
      html: '<gasco-button></gasco-button>',
    });

    expect(page.root).toEqualHtml(`
      <gasco-button>
        <mock:shadow-root>
          <span>
            <slot></slot>
            <slot></slot>
            <slot></slot>
            <slot></slot>
          </span>
        </mock:shadow-root>
      </gasco-button>
    `)
  });
});