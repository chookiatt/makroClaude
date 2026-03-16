import { test, expect } from '@playwright/test';

test('TC02', async ({ page, request }) => {
  const apiResponse = await request.post('https://erp-ao-int-uat.siammakro.co.th/sgm-automation/update', {
    data: {
      item: 100124,
      loc: 205,
      new_selling_price: 70.00,
      wac: 87.06
    }
  });
  console.log('API Status:', apiResponse.status());
  console.log('API Body:', await apiResponse.text());
  expect(apiResponse.ok()).toBeTruthy();

  await page.goto('https://sgm-store-empower.mango-qa.siammakro.cloud/login.html');
  await page.getByRole('textbox', { name: 'User name' }).fill('automatetest2');
  await page.getByRole('textbox', { name: 'Password' }).fill('St@1234567890');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.waitForURL('**/index.html', { timeout: 30000 });
  await page.getByRole('menuitem', { name: 'Price Request', exact: true }).click();
  await page.getByRole('button', { name: 'CREATE REQUEST' }).click();
  await page.getByRole('button', { name: 'New' }).click();
  await page.getByRole('textbox', { name: 'Item No.*' }).fill('100124');
  await page.getByRole('textbox', { name: 'Requested Selling Price (In.' }).fill('100');
  const [fileChooser] = await Promise.all([
    page.waitForEvent('filechooser'),
    page.getByRole('button', { name: 'Upload image Browse...' }).click(),
  ]);
  await fileChooser.setFiles('244402_sign.jpg');
  await page.getByLabel('Competitor Name', { exact: true }).selectOption('43628621390960136');
  await page.getByRole('textbox', { name: 'Competitor Price*' }).fill('100');
  await page.getByLabel('Edit Price Request Detail').getByRole('button', { name: 'Save' }).click();
  await page.getByRole('button', { name: 'Validate', exact: true }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.locator('.btn.mx-button.mx-name-actionButton4').first().click();
  await page.getByRole('button', { name: 'OK' }).click();
  const approveBtn = page.locator('.btn.mx-button.mx-name-actionButton5');
  await approveBtn.waitFor({ state: 'visible', timeout: 15000 });
  await approveBtn.click({ force: true });
  await page.waitForURL('**/index.html', { timeout: 30000 });
});
