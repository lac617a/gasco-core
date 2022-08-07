import { newE2EPage } from "@stencil/core/testing";

describe('gasco-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<gasco-button></gasco-button>');

    const element = await page.find('gasco-button');
    expect(element).toHaveClass('hydrated');
  });
});