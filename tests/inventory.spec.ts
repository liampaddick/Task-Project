import { expect, test } from '@playwright/test';
import { loginData } from '../test-data/login-data';
import { LoginPage } from '../pages/login-page';
import { InventoryPage } from '../pages/inventory-page';


test.describe("cart functionality", () => {
    let inventoryPage: InventoryPage;

    test.beforeEach(async ({ page }) => {
        let loginPage = new LoginPage(page);
        await loginPage.navigateTo();

        inventoryPage = await loginPage.login(loginData.users.standard, loginData.passwords.correctPassword);
    });

    test.describe("Adding to cart functionality", () => {

        test("adding a single item to cart", { tag: "@regression" }, async () => {
            await inventoryPage.addToBasket(0, inventoryPage.backpackAddToCartButton);
            await expect(inventoryPage.shoppingCartBadge).toHaveText("1");
        });

        test("adding multiple items to cart", { tag: "@regression" }, async () => {

            await inventoryPage.addToBasket(0, inventoryPage.backpackAddToCartButton, inventoryPage.bikeLightAddToCartButton);
            await expect(inventoryPage.shoppingCartBadge).toHaveText("2");
        });
    });
    test.describe("Removing from cart functionality", () => {

        test("add two items then remove single item from cart back to 1", { tag: "@regression" }, async () => {
            await inventoryPage.addToBasket(0, inventoryPage.backpackAddToCartButton, inventoryPage.bikeLightAddToCartButton);
            await inventoryPage.removeFromBasket(inventoryPage.bikeLightRemoveFromCartButton);
            await expect(inventoryPage.shoppingCartBadge).toHaveText("1");
        });

    });
});
