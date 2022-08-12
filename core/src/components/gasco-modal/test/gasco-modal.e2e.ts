import { newE2EPage } from '@stencil/core/testing';

describe('gasco-modal', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<gasco-modal></gasco-modal>');

    const element = await page.find('gasco-modal');
    expect(element).toHaveClass('hydrated');
  });
});
