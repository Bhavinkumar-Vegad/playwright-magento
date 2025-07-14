
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SignUpPage } from '../pages/SignUpPage';
import { SignInPage } from '../pages/SignInPage';

// Helper for required fields
const requiredFields = [
  'First Name',
  'Last Name',
  'Email',
  'Password',
  'Confirm Password',
];
test.describe('Sign Up Required Fields Validation', () => {
  test('should show errors when all required fields are empty', async ({ page }) => {
    const homePage = new HomePage(page);
    const signUpPage = new SignUpPage(page);
    await homePage.goto();
    await homePage.clickCreateAccount();
    await signUpPage.submit();
    await signUpPage.assertRequiredFieldErrors(requiredFields);
  });

  test('should show error when only First Name is empty', async ({ page }) => {
    const homePage = new HomePage(page);
    const signUpPage = new SignUpPage(page);
    await homePage.goto();
    await homePage.clickCreateAccount();
    await signUpPage.fillSignUpForm('', 'Smith', 'brainsmith13071434@mailinator.com', 'Password123!');
    await signUpPage.submit();
    await signUpPage.assertRequiredFieldErrors(['First Name']);
  });

  test('should show error when only Last Name is empty', async ({ page }) => {
    const homePage = new HomePage(page);
    const signUpPage = new SignUpPage(page);
    await homePage.goto();
    await homePage.clickCreateAccount();
    await signUpPage.fillSignUpForm('Brain', '', 'brainsmith13071434@mailinator.com', 'Password123!');
    await signUpPage.submit();
    await signUpPage.assertRequiredFieldErrors(['Last Name']);
  });

  test('should show error when only Email is empty', async ({ page }) => {
    const homePage = new HomePage(page);
    const signUpPage = new SignUpPage(page);
    await homePage.goto();
    await homePage.clickCreateAccount();
    await signUpPage.fillSignUpForm('Brain', 'Smith', '', 'Password123!');
    await signUpPage.submit();
    await signUpPage.assertRequiredFieldErrors(['Email']);
  });

  test('should show error when only Password is empty', async ({ page }) => {
    const homePage = new HomePage(page);
    const signUpPage = new SignUpPage(page);
    await homePage.goto();
    await homePage.clickCreateAccount();
    await signUpPage.fillSignUpForm('Brain', 'Smith', 'brainsmith13071434@mailinator.com', '');
    await signUpPage.submit();
    await signUpPage.assertRequiredFieldErrors(['Password']);
  });

  test('should show error when only Confirm Password is empty', async ({ page }) => {
    const homePage = new HomePage(page);
    const signUpPage = new SignUpPage(page);
    await homePage.goto();
    await homePage.clickCreateAccount();
    // Fill all except Confirm Password
    await signUpPage.fillSignUpForm('Brain', 'Smith', 'brainsmith13071434@mailinator.com', 'Password123!');
    await page.getByRole('textbox', { name: 'Confirm Password*' }).fill('');
    await signUpPage.submit();
    await signUpPage.assertRequiredFieldErrors(['Confirm Password']);
  });
});

test.skip('test', async ({ page }) => {
  const homePage = new HomePage(page);
  const signUpPage = new SignUpPage(page);
  const signInPage = new SignInPage(page);

  // Dynamic test data
  const firstName = 'Tonny';
  const lastName = 'Smith';
  const email = `tonnysmith13071435@mailinator.com`;
  const password = 'Password123!';

  await homePage.goto();
  await homePage.clickCreateAccount();
  await signUpPage.fillSignUpForm(firstName, lastName, email, password);
  await signUpPage.submit();
  await homePage.assertRegistrationSuccess();
  await homePage.assertUserInfo(firstName, lastName, email);
  await homePage.signOut();
  await homePage.clickSignIn();
  await signInPage.fillSignInForm(email, password);
  await signInPage.submit();
  await homePage.assertLoginUserInfo(firstName, lastName);
});