import { newE2EPage } from '@stencil/core/testing';

describe('gasco-picker-column-internal', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<gasco-picker-column-internal></gasco-picker-column-internal>');

    const element = await page.find('gasco-picker-column-internal');
    expect(element).toHaveClass('hydrated');
  });
});
