import { newE2EPage } from '@stencil/core/testing';

test('locale', async () => {
  const page = await newE2EPage({
    url: '/src/components/datetime/test/locale?ionic:_testing=true',
  });

  const screenshotCompares = [];
  const datetime = await page.find('gasco-datetime');

  screenshotCompares.push(await page.compareScreenshot());

  datetime.setProperty('locale', 'es-ES');
  await page.waitForChanges();

  screenshotCompares.push(await page.compareScreenshot());

  for (const screenshotCompare of screenshotCompares) {
    expect(screenshotCompare).toMatchScreenshot();
  }
});

test('it should render month and year with an en-US locale', async () => {
  const page = await newE2EPage({
    url: '/src/components/datetime/test/locale?ionic:_testing=true',
  });

  const screenshotCompares = [];
  const datetime = await page.find('gasco-datetime');

  datetime.setProperty('locale', 'en-US');
  await page.waitForChanges();

  const button = await page.find('gasco-datetime >>> .calendar-month-year gasco-item');
  await button.click();
  await page.waitForChanges();

  const yearBody = await page.find('gasco-datetime >>> .datetime-year-body');
  expect(yearBody).toHaveClass('order-month-first');

  screenshotCompares.push(await page.compareScreenshot());

  for (const screenshotCompare of screenshotCompares) {
    expect(screenshotCompare).toMatchScreenshot();
  }
});

test('it should render year and month with a ja-JP locale', async () => {
  const page = await newE2EPage({
    url: '/src/components/datetime/test/locale?ionic:_testing=true',
  });

  const screenshotCompares = [];
  const datetime = await page.find('gasco-datetime');

  datetime.setProperty('locale', 'ja-JP');
  await page.waitForChanges();

  const button = await page.find('gasco-datetime >>> .calendar-month-year gasco-item');
  await button.click();
  await page.waitForChanges();

  const yearBody = await page.find('gasco-datetime >>> .datetime-year-body');
  expect(yearBody).toHaveClass('order-year-first');

  screenshotCompares.push(await page.compareScreenshot());

  for (const screenshotCompare of screenshotCompares) {
    expect(screenshotCompare).toMatchScreenshot();
  }
});
