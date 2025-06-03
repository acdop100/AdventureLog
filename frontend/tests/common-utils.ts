import { Page } from '@playwright/test';

// Common function to login to AdventureLog
export async function login(page: Page, username = 'admin', password = 'admin') {
  await page.goto('http://localhost:8015/');
  await page.getByRole('listitem').filter({ hasText: 'Login' }).getByRole('button').click();
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill(username);
  await page.getByRole('textbox', { name: 'Username' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill(password);
  // Try both Enter and explicit click for robustness
  await page.getByRole('textbox', { name: 'Password' }).press('Enter');
  await page.locator('form').filter({ hasText: 'Username Password Login' }).getByRole('button').click();
}
