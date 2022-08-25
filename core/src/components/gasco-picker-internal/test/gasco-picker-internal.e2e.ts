import { newE2EPage } from '@stencil/core/testing';

describe('gasco-picker-internal', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<gasco-picker-internal></gasco-picker-internal>');

    const element = await page.find('gasco-picker-internal');
    expect(element).toHaveClass('hydrated');
  });
});
