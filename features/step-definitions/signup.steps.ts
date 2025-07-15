import { When, Then } from '@cucumber/cucumber';
import assert from 'assert';
import { browser, page } from './common.steps';
let registeredUser: { firstName: string; lastName: string; email: string; password: string };

When('I click the Create Account button', async function () {
  await this.page.getByRole('link', { name: /Create an Account/i }).click();
});

When('I fill the sign up form with valid data', async function () {
  // Generate random user data
  const random = Math.floor(Math.random() * 100000);
  registeredUser = {
    firstName: `Test${random}`,
    lastName: `User${random}`,
    email: `testuser${random}@mailinator.com`,
    password: 'Password123!'
  };
  await this.page.getByLabel('First Name').fill(registeredUser.firstName);
  await this.page.getByLabel('Last Name').fill(registeredUser.lastName);
  await this.page.getByLabel('Email', { exact: false }).fill(registeredUser.email);
  await this.page.getByLabel('Password', { exact: true }).fill(registeredUser.password);
  await this.page.getByLabel('Confirm Password').fill(registeredUser.password);
});

When('I fill the sign up form with first name {string} last name {string} email {string} password {string}', async function (firstName, lastName, email, password) {
  await this.page.getByLabel('First Name').fill(firstName);
  await this.page.getByLabel('Last Name').fill(lastName);
  await this.page.getByLabel('Email', { exact: false }).fill(email);
  await this.page.getByLabel('Password', { exact: true }).fill(password);
  await this.page.getByLabel('Confirm Password').fill(password);
});

When('I submit the sign up form', async function () {
  await this.page.getByRole('button', { name: /Create an Account/i }).click();
});

Then('I should see registration success', async function () {
  await this.page.waitForSelector('.message-success.success.message');
  const successMsg = await this.page.textContent('.message-success.success.message');
  assert(successMsg && successMsg.includes('Thank you for registering'), 'Registration success message not found');
});


Then('I should see the user info on home page', async function () {
  await this.page.waitForSelector('.panel.header .logged-in');
  const userInfo = await this.page.textContent('.panel.header .logged-in');
  assert(userInfo && userInfo.includes(registeredUser.firstName), 'User info not found on home page');
});

When('I sign out', async function () {
  await this.page.getByRole('button', { name: /My Account|Customer|Welcome/i }).click({ trial: true }).catch(async () => {
    // fallback for customer-welcome if not a button
    await this.page.click('.customer-welcome');
  });
  await this.page.getByRole('link', { name: /Sign Out/i }).click();
  await this.page.waitForSelector('.panel.header .authorization-link');
});

When('I click the Sign In button', async function () {
  await this.page.getByRole('link', { name: /Sign In/i }).click();
});

When('I fill the sign in form with the registered email and password', async function () {
  await this.page.getByLabel('Email', { exact: false }).fill(registeredUser.email);
  await this.page.getByLabel('Password', { exact: true }).fill(registeredUser.password);
});

When('I fill the sign in form with email {string} and password {string}', async function (email, password) {
  await this.page.getByLabel('Email', { exact: false }).fill(email);
  await this.page.getByLabel('Password', { exact: true }).fill(password);
});


Then('I should see the user info as registered', async function () {
  await this.page.waitForSelector('.panel.header .logged-in');
  const userInfo = await this.page.textContent('.panel.header .logged-in');
  assert(userInfo && userInfo.includes(registeredUser.firstName), 'Registered user info not found after login');
});


Then('I should see required errors:', async function (dataTable) {
  // Map error fields to their selectors and expected messages
    const errorMap: Record<string, { selector: string; message: RegExp }> = {
      'First Name': {
        selector: '#firstname-error',
        message: /required/i,
      },
      'Last Name': {
        selector: '#lastname-error',
        message: /required/i,
      },
      Email: {
        selector: '#email-error, #email_address-error',
        message: /required/i,
      },
      Password: {
        selector: '#pass-error, #password-error',
        message: /required/i,
      },
      'Confirm Password': {
        selector: '#password-confirmation-error',
        message: /required/i,
      },
      'Invalid Email Format': {
        // Try both sign-in and sign-up selectors
        selector: '#email-error, #email_address-error',
        message: /please enter a valid email address \(Ex: johndoe@domain.com\)/i,
      },
      // Add more mappings as needed
    };
  for (const { 0: errorField } of dataTable.raw()) {
    const error = errorMap[errorField];
    if (!error) {
      throw new Error(`No error mapping found for field: ${errorField}`);
    }
    const errorVisible = await this.page.isVisible(error.selector);
    assert(errorVisible, `Expected error for ${errorField} not visible`);
    const errorText = await this.page.textContent(error.selector);
    assert(errorText && error.message.test(errorText), `Expected error message for ${errorField} to match ${error.message}, got: ${errorText}`);
  }
});
