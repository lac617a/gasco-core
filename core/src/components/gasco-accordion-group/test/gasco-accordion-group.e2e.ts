import { newE2EPage } from '@stencil/core/testing';

describe('gasco-accordion-group', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<gasco-accordion-group></gasco-accordion-group>');

    const element = await page.find('gasco-accordion-group');
    expect(element).toHaveClass('hydrated');
  });
});
