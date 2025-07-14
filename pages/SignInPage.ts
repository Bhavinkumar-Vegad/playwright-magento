import { Page, expect } from '@playwright/test';

export class SignInPage {
  constructor(private page: Page) {}

  async fillSignInForm(email: string, password: string) {
    await this.page.getByRole('textbox', { name: 'Email*' }).fill(email);
    await this.page.getByRole('textbox', { name: 'Password*' }).fill(password);
  }

  async submit() {
    await this.page.getByRole('button', { name: 'Sign In' }).click();
  }

  async assertRequiredErrors(fields: string[]) {
    const errorMap: Record<string, { selector: string; message: string }> = {
      'Email': { selector: '#email-error', message: 'This is a required field.' },
      'Password': { selector: '#pass-error', message: 'This is a required field.' },
      'Invalid Email Format': { selector: '#email-error', message: 'Please enter a valid email address (Ex: johndoe@domain.com).' },
    };

    for (const field of fields) {
      if (field === 'Invalid Credentials') {
        await this.page.waitForSelector('.message-error');
        await expect(this.page.locator('.message-error')).toHaveText('The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.');
        continue;
      }

      const error = errorMap[field];
      if (error) {
        await expect(this.page.locator(error.selector)).toHaveText(error.message);
      }
    }
  }
}
