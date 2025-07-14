import { test } from '../fixture/fixtures';
import { generateUserData } from '../utils/testData';

test.describe('User Sign-Up and Sign-In Scenarios', () => {
  test('should allow a new user to sign up and login successfully', async ({ homePage, signUpPage, signInPage }) => {
    // Dynamic test data
    const { firstName, lastName, email, password } = generateUserData();

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

  test('should show errors when all required fields are empty', async ({ homePage, signUpPage }) => {
    await homePage.goto();
    await homePage.clickCreateAccount();
    await signUpPage.submit();
    await signUpPage.assertRequiredErrors(['First Name', 'Last Name', 'Email', 'Password', 'Confirm Password']);
  });

  test('should show error when only First Name is empty', async ({ homePage, signUpPage }) => {
    await homePage.goto();
    await homePage.clickCreateAccount();
    await signUpPage.fillSignUpForm('', 'Smith', 'brainsmith13071434@mailinator.com', 'Password123!');
    await signUpPage.submit();
    await signUpPage.assertRequiredErrors(['First Name']);
  });

  test('should show error when only Last Name is empty', async ({ homePage, signUpPage }) => {
    await homePage.goto();
    await homePage.clickCreateAccount();
    await signUpPage.fillSignUpForm('Brain', '', 'brainsmith13071434@mailinator.com', 'Password123!');
    await signUpPage.submit();
    await signUpPage.assertRequiredErrors(['Last Name']);
  });

  test('should show error when only Email is empty', async ({ homePage, signUpPage }) => {
    await homePage.goto();
    await homePage.clickCreateAccount();
    await signUpPage.fillSignUpForm('Brain', 'Smith', '', 'Password123!');
    await signUpPage.submit();
    await signUpPage.assertRequiredErrors(['Email']);
  });

  test('should show error when only Password is empty', async ({ homePage, signUpPage }) => {
    await homePage.goto();
    await homePage.clickCreateAccount();
    await signUpPage.fillSignUpForm('Brain', 'Smith', 'brainsmith13071434@mailinator.com', '');
    await signUpPage.submit();
    await signUpPage.assertRequiredErrors(['Password']);
  });

  test('should show error when only Confirm Password is empty', async ({ homePage, signUpPage, page }) => {
    await homePage.goto();
    await homePage.clickCreateAccount();
    // Fill all except Confirm Password
    await signUpPage.fillSignUpForm('Brain', 'Smith', 'brainsmith13071434@mailinator.com', 'Password123!');
    await page.getByRole('textbox', { name: 'Confirm Password*' }).fill('');
    await signUpPage.submit();
    await signUpPage.assertRequiredErrors(['Confirm Password']);
  });

  test('should show error when try to signup with already used email', async ({ homePage, signUpPage }) => {
    await homePage.goto();
    await homePage.clickCreateAccount();
    await signUpPage.fillSignUpForm('Tonny', 'Smith', 'tonnysmith13071435@mailinator.com', 'Password123!');
    await signUpPage.submit();
    await signUpPage.assertRequiredErrors(['Duplicate Email']);
  });

    test('should show error for invalid email format', async ({ homePage, signUpPage }) => {
    await homePage.goto();
    await homePage.clickCreateAccount();
    await signUpPage.fillSignUpForm('Brain', 'Smith', 'invalid-email', 'Password123!');
    await signUpPage.submit();
    await signUpPage.assertRequiredErrors(['Invalid Email Format']);
  });

  test('should show error for password minimum length', async ({ homePage, signUpPage }) => {
    await homePage.goto();
    await homePage.clickCreateAccount();
    await signUpPage.fillSignUpForm('Brain', 'Smith', 'brainsmith13071434@mailinator.com', 'Pass1!');
    await signUpPage.submit();
    await signUpPage.assertRequiredErrors(['Password Min Length']);
  });

  test('should show error for password complexity', async ({ homePage, signUpPage }) => {
    await homePage.goto();
    await homePage.clickCreateAccount();
    // Only lowercase and digits, not enough character classes
    await signUpPage.fillSignUpForm('Brain', 'Smith', 'brainsmith13071434@mailinator.com', 'password1');
    await signUpPage.submit();
    await signUpPage.assertRequiredErrors(['Password Complexity']);
  });

});