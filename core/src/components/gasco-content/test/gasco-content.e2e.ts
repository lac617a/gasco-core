import { newE2EPage } from '@stencil/core/testing';

describe('gasco-content', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<gasco-content></gasco-content>');

    const element = await page.find('gasco-content');
    expect(element).toHaveClass('hydrated');
  });
});
