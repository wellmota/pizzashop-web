import { test, expect } from '@playwright/test';

test('sign in successfully', async ({ page }) => {
  await page.goto('/signin', { waitUntil: 'networkidle' });

  await page.getByLabel('Your email').fill('impeto.wellington@gmail.com');

  await page.getByRole('button', { name: 'Access Panel' }).click();

  const toast = page.getByText(
    'An email has been sent to you with the access link',
  );

  expect(toast).toBeVisible();

  await page.waitForTimeout(2000);
});

test('sign in wrong credentials', async ({ page }) => {
  await page.goto('/signin', { waitUntil: 'networkidle' });

  await page.getByLabel('Your email').fill('wrong@gmail.com');

  await page.getByRole('button', { name: 'Access Panel' }).click();

  const toast = page.getByText('An error occured, please try again later');

  expect(toast).toBeVisible();

  await page.waitForTimeout(2000);
});

test('navigate to new restaurant page', async ({ page }) => {
  await page.goto('/signin', { waitUntil: 'networkidle' });

  await page.getByRole('link', { name: 'Create New Account' }).click();

  expect(page.url()).toContain('/signup');

  await page.waitForTimeout(2000);
});
