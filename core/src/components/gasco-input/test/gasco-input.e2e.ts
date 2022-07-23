import { newE2EPage } from '@stencil/core/testing';

describe('gasco-input', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<gasco-input></gasco-input>');

    const element = await page.find('gasco-input');
    expect(element).toHaveClass('hydrated');
  });
});
