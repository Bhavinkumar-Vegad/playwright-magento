
import { test } from '../fixture/fixtures';

test.describe('User Sign-In Scenarios', () => {
  test('valid credentials', async ({ homePage, signInPage }) => {
    const email = 'johnsmith@mailinator.com';
    const password = 'Password123!';
    const firstName = 'John';
    const lastName = 'Smith';

    await homePage.goto();
    await homePage.clickSignIn();
    await signInPage.fillSignInForm(email, password);
    await signInPage.submit();
    await homePage.assertLoginUserInfo(firstName, lastName);
  });

  test('required fields validation', async ({ homePage, signInPage }) => {
    await homePage.goto();
    await homePage.clickSignIn();
    await signInPage.fillSignInForm('', '');
    await signInPage.submit();
    await signInPage.assertRequiredErrors(['Email', 'Password']);
  });

  test('email required validation', async ({ homePage, signInPage }) => {
    await homePage.goto();
    await homePage.clickSignIn();
    await signInPage.fillSignInForm('', 'somepassword');
    await signInPage.submit();
    await signInPage.assertRequiredErrors(['Email']);
  });

  test('password required validation', async ({ homePage, signInPage }) => {
    await homePage.goto();
    await homePage.clickSignIn();
    await signInPage.fillSignInForm('user@example.com', '');
    await signInPage.submit();
    await signInPage.assertRequiredErrors(['Password']);
  });

  test('invalid email format validation', async ({ homePage, signInPage }) => {
    await homePage.goto();
    await homePage.clickSignIn();
    await signInPage.fillSignInForm('invalid-email', 'somepassword');
    await signInPage.submit();
    await signInPage.assertRequiredErrors(['Invalid Email Format']);
  });

  test.only('invalid credentials validation', async ({ homePage, signInPage }) => {
    await homePage.goto();
    await homePage.clickSignIn();
    await signInPage.fillSignInForm('johnsmith@mailinator.com', 'Password123@');
    await signInPage.submit();
    await signInPage.assertRequiredErrors(['Invalid Credentials']);
  });
});
