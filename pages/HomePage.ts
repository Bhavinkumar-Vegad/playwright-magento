import { Page, expect } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/');
  }

  async clickCreateAccount() {
    await this.page.getByRole('link', { name: 'Create an Account' }).click();
  }

  async clickSignIn() {
    await this.page.getByRole('link', { name: 'Sign In' }).click();
  }

  async assertRegistrationSuccess() {
    await expect(this.page).toHaveURL('/customer/account/');
    await expect(this.page.getByRole('alert').first()).toContainText('Thank you for registering with Main Website Store.');
  }

  async assertUserInfo(firstName: string, lastName: string, email: string) {
    await expect(this.page.locator('#maincontent')).toContainText(`${firstName} ${lastName} ${email}`);
  }

  async signOut() {
    await this.page.getByRole('listitem').filter({ hasText: 'Change My Account My Wish' }).locator('button').click();
    await this.page.getByRole('link', { name: 'Sign Out' }).click();
    await this.page.goto('/customer/account/logoutSuccess/');
    await expect(this.page).toHaveURL('/customer/account/logoutSuccess/');
  }

  async assertLoginUserInfo(firstName: string, lastName: string) {
    await expect(this.page.locator('.panel.header')).toContainText(`Welcome, ${firstName} ${lastName}!`);
  }
}
