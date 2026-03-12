import { test, expect } from '@playwright/test';

test('Create and submit price request', async ({ page }) => {
  // Login
  await page.goto('https://sgm-store-empower.mango-qa.siammakro.cloud/login.html');
  await page.getByRole('textbox', { name: 'User name' }).click();
  await page.getByRole('textbox', { name: 'User name' }).fill('automatetest3');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('St@1234567890');
  await page.getByRole('button', { name: 'Sign in' }).click();

  // Navigate to Price Request
  await page.getByRole('menuitem', { name: 'Price Request', exact: true }).click();

  // Create new request
  await page.getByRole('button', { name: 'CREATE REQUEST' }).click();
  await page.getByRole('button', { name: 'New' }).click();

  // Fill in item details
  await page.getByRole('textbox', { name: 'Item No.*' }).click();
  await page.getByRole('textbox', { name: 'Item No.*' }).fill('100124');
  await page.getByRole('textbox', { name: 'Requested Selling Price (In.' }).click();
  await page.getByRole('textbox', { name: 'Requested Selling Price (In.' }).fill('100');

  // Upload competitor image
  const [fileChooser] = await Promise.all([
    page.waitForEvent('filechooser'),
    page.getByRole('button', { name: 'Upload image Browse...' }).click(),
  ]);
  await fileChooser.setFiles('244402_sign.jpg');

  // Fill in competitor info
  await page.getByLabel('Competitor Name', { exact: true }).selectOption('43628621390960136');
  await page.getByRole('textbox', { name: 'Competitor Price*' }).click();
  await page.getByRole('textbox', { name: 'Competitor Price*' }).fill('100');

  // Save the detail
  await page.getByLabel('Edit Price Request Detail').getByRole('button', { name: 'Save' }).click();

  // Validate the request
  await page.getByRole('button', { name: 'Validate', exact: true }).click();
  await page.getByRole('button', { name: 'OK' }).click();

  // Submit the request
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
});
