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

  async assertRequiredErrors(fields: string[]) {
    const errorMap: Record<string, { selector: string; message: string }> = {
      'First Name': { selector: '#firstname-error', message: 'This is a required field.' },
      'Last Name': { selector: '#lastname-error', message: 'This is a required field.' },
      'Email': { selector: '#email_address-error', message: 'This is a required field.' },
      'Invalid Email Format': { selector: '#email_address-error', message: 'Please enter a valid email address (Ex: johndoe@domain.com).' },
      'Password': { selector: '#password-error', message: 'This is a required field.' },
      'Password Min Length': { selector: '#password-error', message: 'Minimum length of this field must be equal or greater than 8 symbols. Leading and trailing spaces will be ignored.' },
      'Password Complexity': { selector: '#password-error', message: 'Minimum of different classes of characters in password is 3. Classes of characters: Lower Case, Upper Case, Digits, Special Characters.' },
      'Confirm Password': { selector: '#password-confirmation-error', message: 'This is a required field.' },
    };

    for (const field of fields) {
      if (field === 'Duplicate Email') {
        await expect(this.page.locator('.message-error')).toHaveText(
          'There is already an account with this email address. If you are sure that it is your email address, click here to get your password and access your account.'
        );
        continue;
      }

      const error = errorMap[field];
      if (error) {
        await expect(this.page.locator(error.selector)).toHaveText(error.message);
      }
    }
  }
}
