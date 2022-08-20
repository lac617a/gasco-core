import { newE2EPage } from '@stencil/core/testing';

test('radio: a11y', async () => {
  const page = await newE2EPage({
    url: '/src/components/gasco-radio/test/a11y?gasco:_testing=true',
  });

  const compare = await page.compareScreenshot();
  expect(compare).toMatchScreenshot();
});

test('radio:rtl: a11y', async () => {
  const page = await newE2EPage({
    url: '/src/components/gasco-radio/test/a11y?gasco:_testing=true&rtl=true',
  });

  const compare = await page.compareScreenshot();
  expect(compare).toMatchScreenshot();
});
