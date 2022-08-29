import { newE2EPage } from '@stencil/core/testing';

describe('gasco-card-title', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<gasco-card-title></gasco-card-title>');

    const element = await page.find('gasco-card-title');
    expect(element).toHaveClass('hydrated');
  });
});
