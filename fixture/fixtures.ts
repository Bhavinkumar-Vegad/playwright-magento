import { test as base, expect, Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SignUpPage } from '../pages/SignUpPage';
import { SignInPage } from '../pages/SignInPage';

// Extend base test with custom fixtures
export const test = base.extend<{
  homePage: HomePage;
  signUpPage: SignUpPage;
  signInPage: SignInPage;
}>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  signUpPage: async ({ page }, use) => {
    await use(new SignUpPage(page));
  },
  signInPage: async ({ page }, use) => {
    await use(new SignInPage(page));
  },
});

export { expect };
