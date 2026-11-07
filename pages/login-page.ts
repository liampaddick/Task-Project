import { type Page, type Locator, expect } from "@playwright/test";
import { InventoryPage } from "./inventory-page";

export class LoginPage {
    readonly page: Page;
    readonly url: string;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly error: Locator;

//locators
    constructor(page: Page) {
        this.page = page;
        this.url = process.env.BASE_URL as string;
        this.usernameInput = page.getByTestId("username");
        this.passwordInput = page.getByTestId("password");
        this.loginButton = page.getByTestId("login-button");
        this.error = page.getByTestId("error");
    }

    //actions

    async navigateTo() {
        await this.page.goto(this.url);
        await expect(this.loginButton).toBeVisible();
    }
    async login (username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();

        return new InventoryPage(this.page);
    }
}