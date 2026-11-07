import { expect, test } from '@playwright/test';
import { errorMessages, loginData } from '../test-data/login-data';
import { LoginPage } from '../pages/login-page';
import { InventoryPage } from '../pages/inventory-page';

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateTo();
});

test.describe("standard_user login tests - Happy Path", () => {

    test("standard_user login successfully", { tag: "@regression" }, async ({ page }) => {
        let homepage: InventoryPage = new InventoryPage(page);

        await loginPage.login(loginData.users.standard, loginData.passwords.correctPassword);
        await expect(homepage.inventoryContainer).toBeVisible();
    });
});

test.describe("standard_user login tests - Unhappy Path", () => {

    test("standard_user login failed - incorrect password", { tag: "@regression" }, async () => {
        await loginPage.login(loginData.users.standard, loginData.passwords.incorrectPassword);
        await expect(loginPage.error).toBeVisible();
        await expect(loginPage.error).toHaveText(errorMessages.incorrectPassword);
    });
});

test.describe("locked_out_user login tests", () => {

    test("locked_out_user unable to log in - error seen", { tag: "@regression" }, async () => {
        await loginPage.login(loginData.users.lockedOut, loginData.passwords.correctPassword);
        await expect(loginPage.error).toHaveText(errorMessages.lockedOut);
    });
});
