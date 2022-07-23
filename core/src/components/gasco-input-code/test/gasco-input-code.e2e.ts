import { newE2EPage } from '@stencil/core/testing';

describe('gasco-input-code', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<gasco-input-code></gasco-input-code>');

    const element = await page.find('gasco-input-code');
    expect(element).toHaveClass('hydrated');
  });
});
