import { newE2EPage } from '@stencil/core/testing';

describe('gasco-item', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<gasco-item></gasco-item>');

    const element = await page.find('gasco-item');
    expect(element).toHaveClass('hydrated');
  });
});
