import { Page, expect } from '@playwright/test';

export class SignUpPage {
  constructor(private page: Page) {}

  async fillSignUpForm(firstName: string, lastName: string, email: string, password: string) {
    await this.page.getByRole('textbox', { name: 'First Name*' }).fill(firstName);
    await this.page.getByRole('textbox', { name: 'Last Name*' }).fill(lastName);
    await this.page.getByRole('textbox', { name: 'Email*' }).fill(email);
    await this.page.getByRole('textbox', { name: 'Password*', exact: true }).fill(password);
    await this.page.getByRole('textbox', { name: 'Confirm Password*' }).fill(password);
  }

  async submit() {
    await this.page.getByRole('button', { name: 'Create an Account' }).click();
  }

  async assertRequiredFieldErrors(fields: string[]) {
    for (const field of fields) {
      // Map field names to error element IDs
      let errorId = '';
      switch (field) {
        case 'First Name':
          errorId = '#firstname-error';
          break;
        case 'Last Name':
          errorId = '#lastname-error';
          break;
        case 'Email':
          errorId = '#email_address-error';
          break;
        case 'Password':
          errorId = '#password-error';
          break;
        case 'Confirm Password':
          errorId = '#password-confirmation-error';
          break;
      }
      if (errorId) {
        await expect(this.page.locator(errorId)).toHaveText('This is a required field.');
      }
    }
  }
}
