import { Given, Before, After, setDefaultTimeout } from '@cucumber/cucumber';
// Increase default timeout for slow environments
setDefaultTimeout(60 * 1000);
import { chromium, Browser, Page } from 'playwright';


let browser: Browser;
let page: Page;

Before(async function () {
  browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });
  page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

Given('I am on the home page', async function () {
  let retries = 2;
  while (retries > 0) {
    try {
      await this.page.goto('https://magento.softwaretestingboard.com/', { waitUntil: 'load', timeout: 30000 });
      return;
    } catch (err) {
      retries--;
      if (retries === 0) throw err;
      // If page crashed, recreate page and retry
      this.page = await this.browser.newPage();
    }
  }
});

After(async function () {
  if (this.page) await this.page.close();
  if (this.browser) await this.browser.close();
});

export { browser, page };
