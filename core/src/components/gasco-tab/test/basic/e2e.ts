import { newE2EPage } from '@stencil/core/testing';

test('segment: basic', async () => {
  const page = await newE2EPage({
    url: '/src/components/gasco-tab/test/basic?gasco:_testing=true',
  });

  const compare = await page.compareScreenshot();
  expect(compare).toMatchScreenshot();
});

test('segment:rtl: basic', async () => {
  const page = await newE2EPage({
    url: '/src/components/gasco-tab/test/basic?gasco:_testing=true&rtl=true',
  });

  const compare = await page.compareScreenshot();
  expect(compare).toMatchScreenshot();
});
