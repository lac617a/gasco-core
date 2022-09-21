import { newE2EPage } from '@stencil/core/testing';

describe('gasco-calendar', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<gasco-calendar></gasco-calendar>');

    const element = await page.find('gasco-calendar');
    expect(element).toHaveClass('hydrated');
  });
});
