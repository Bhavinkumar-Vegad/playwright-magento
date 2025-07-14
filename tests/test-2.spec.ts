import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SignInPage } from '../pages/SignInPage';

test('test', async ({ page }) => {
  const homePage = new HomePage(page);
  const signInPage = new SignInPage(page);

  // Dynamic test data
  const email = 'brainsmith1307@mailinator.com';
  const password = 'Password123!';
  const firstName = 'Brain';
  const lastName = 'Smith';

  await homePage.goto();
  await homePage.clickSignIn();
  await signInPage.fillSignInForm(email, password);
  await signInPage.submit();
  await homePage.assertLoginUserInfo(firstName, lastName);
});