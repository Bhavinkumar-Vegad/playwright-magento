import { Page } from '@playwright/test';

export class SignInPage {
  constructor(private page: Page) {}

  async fillSignInForm(email: string, password: string) {
    await this.page.getByRole('textbox', { name: 'Email*' }).fill(email);
    await this.page.getByRole('textbox', { name: 'Password*' }).fill(password);
  }

  async submit() {
    await this.page.getByRole('button', { name: 'Sign In' }).click();
  }
}
