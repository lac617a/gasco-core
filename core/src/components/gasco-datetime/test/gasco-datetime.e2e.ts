import { newE2EPage } from '@stencil/core/testing';

describe('gasco-datetime', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<gasco-datetime></gasco-datetime>');

    const element = await page.find('gasco-datetime');
    expect(element).toHaveClass('hydrated');
  });
});
