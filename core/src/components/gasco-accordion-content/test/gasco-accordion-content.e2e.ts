import { newE2EPage } from '@stencil/core/testing';

describe('gasco-accordion-content', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<gasco-accordion-content></gasco-accordion-content>');

    const element = await page.find('gasco-accordion-content');
    expect(element).toHaveClass('hydrated');
  });
});
