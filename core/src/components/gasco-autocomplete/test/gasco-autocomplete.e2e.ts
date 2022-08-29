import { newE2EPage } from '@stencil/core/testing';

describe('gasco-autocomplete', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<gasco-autocomplete></gasco-autocomplete>');

    const element = await page.find('gasco-autocomplete');
    expect(element).toHaveClass('hydrated');
  });
});
