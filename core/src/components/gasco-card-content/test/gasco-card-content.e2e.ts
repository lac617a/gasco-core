import { newE2EPage } from '@stencil/core/testing';

describe('gasco-card-content', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<gasco-card-content></gasco-card-content>');

    const element = await page.find('gasco-card-content');
    expect(element).toHaveClass('hydrated');
  });
});
