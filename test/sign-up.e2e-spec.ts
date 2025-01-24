import { test, expect } from '@playwright/test';

test('sign up successfully', async ({ page }) => {
  await page.goto('/signup', { waitUntil: 'networkidle' });

  await page.getByLabel('Restaurant name').fill('Pizza Shop');
  await page.getByLabel('Manager Name').fill('John Doe');
  await page.getByLabel('Phone Number').fill('0123456789');
  await page.getByLabel('Your email').fill('johndoe2@example.com');

  await page.getByRole('button', { name: 'Complete registration' }).click();

  const toast = page.getByText('New company register successfully');

  expect(toast).toBeVisible();

  // await page.getByRole('button', { name: 'Access Panel' }).click();

  // const toast = page.getByText(
  //   'An email has been sent to you with the access link',
  // );

  // expect(toast).toBeVisible();

  // await page.waitForTimeout(2000);
});

test('sigup with error', async ({ page }) => {
  await page.goto('/signup', { waitUntil: 'networkidle' });

   await page.getByLabel('Restaurant name').fill('Pizza Shop');
   await page.getByLabel('Manager Name').fill('John Doe');
   await page.getByLabel('Phone Number').fill('0123456789');
   await page.getByLabel('Your email').fill('johndoe2@example.com');

   await page.getByRole('button', { name: 'Complete registration' }).click();

   const toast = page.getByText('An error occurred, please try again later');

   expect(toast).toBeVisible();

  await page.waitForTimeout(2000);
});

test('navigate new login page', async ({ page }) => {
  await page.goto('/signup', { waitUntil: 'networkidle' });

  await page
    .getByRole('link', { name: 'Already have account? Sign In' })
    .click();

  expect(page.url()).toContain('/signin');
});
