import { newE2EPage } from '@stencil/core/testing';

test('should properly set readonly on child accordions', async () => {
  const page = await newE2EPage({
    html: `
      <gasco-accordion-group animated="false">
        <gasco-accordion>
          <gasco-item slot="header">Label</gasco-item>
          <div slot="content">Content</div>
        </gasco-accordion>
      </gasco-accordion-group>
    `,
  });

  const accordion = await page.find('gasco-accordion');
  const value = await accordion.getProperty('readonly');

  expect(value).toBe(false);

  await page.$eval('gasco-accordion-group', (el: HTMLGascoAccordionGroupElement) => {
    el.readonly = true;
  });

  await page.waitForChanges();

  const valueAgain = await accordion.getProperty('readonly');
  expect(valueAgain).toBe(true);
});

test('should properly set disabled on child accordions', async () => {
  const page = await newE2EPage({
    html: `
      <gasco-accordion-group animated="false">
        <gasco-accordion>
          <gasco-item slot="header">Label</gasco-item>
          <div slot="content">Content</div>
        </gasco-accordion>
      </gasco-accordion-group>
    `,
  });

  const accordion = await page.find('gasco-accordion');
  const value = await accordion.getProperty('disabled');

  expect(value).toBe(false);

  await page.$eval('gasco-accordion-group', (el: HTMLGascoAccordionGroupElement) => {
    el.disabled = true;
  });

  await page.waitForChanges();

  const valueAgain = await accordion.getProperty('disabled');
  expect(valueAgain).toBe(true);
});
