import { newE2EPage } from '@stencil/core/testing';

describe('gasco-card-header', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<gasco-card-header></gasco-card-header>');

    const element = await page.find('gasco-card-header');
    expect(element).toHaveClass('hydrated');
  });
});
