
import { When, Then } from '@cucumber/cucumber';
import assert from 'assert';

When('I submit the sign in form', async function () {
  await this.page.getByRole('button', { name: 'Sign In' }).click();
});

Then('I should see the user info as {string} {string}', async function (firstName, lastName) {
  await this.page.waitForSelector('.panel.header .logged-in');
  const userInfo = await this.page.textContent('.panel.header .logged-in');
  assert(userInfo && userInfo.includes(firstName) && userInfo.includes(lastName), 'User info not found after login');
});
