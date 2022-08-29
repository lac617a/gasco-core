import { newE2EPage } from '@stencil/core/testing';

describe('gasco-dialog-content', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<gasco-dialog-content></gasco-dialog-content>');

    const element = await page.find('gasco-dialog-content');
    expect(element).toHaveClass('hydrated');
  });
});
