
import { Then } from '@cucumber/cucumber';
import assert from 'assert';
import { browser, page } from './common.steps';

Then('I should see the page title as {string}', async function (expectedTitle: string) {
  const title = await this.page.title();
  assert.strictEqual(title, expectedTitle);
  await this.browser.close();
});
