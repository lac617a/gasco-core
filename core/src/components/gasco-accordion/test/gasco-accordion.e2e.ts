import { newE2EPage } from '@stencil/core/testing';

describe('gasco-accordion', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<gasco-accordion></gasco-accordion>');

    const element = await page.find('gasco-accordion');
    expect(element).toHaveClass('hydrated');
  });
});
