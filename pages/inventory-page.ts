import { type Page, type Locator, expect } from "@playwright/test";
import { CartPage } from "./cart-page";

export class InventoryPage {
    readonly page: Page;
    readonly url: string;
    readonly inventoryContainer: Locator;
    readonly backpackAddToCartButton: Locator;
    readonly bikeLightAddToCartButton: Locator;
    readonly backpackRemoveFromCartButton: Locator;
    readonly bikeLightRemoveFromCartButton: Locator;
    readonly shoppingCartLink: Locator;
    readonly shoppingCartBadge: Locator;

    constructor(page: Page) {
        this.page = page;
        this.url = "/inventory.html";
        this.inventoryContainer = page.getByTestId("inventory-container");
        this.backpackAddToCartButton = page.getByTestId("add-to-cart-sauce-labs-backpack");
        this.bikeLightAddToCartButton = page.getByTestId("add-to-cart-sauce-labs-bike-light");
        this.backpackRemoveFromCartButton = page.getByTestId("remove-sauce-labs-backpack");
        this.bikeLightRemoveFromCartButton = page.getByTestId("remove-sauce-labs-bike-light");
        this.shoppingCartLink = page.getByTestId("shopping-cart-link");
        this.shoppingCartBadge = page.getByTestId("shopping-cart-badge");
    }
    //actions
    //Add item (s) to Basket
    async addToBasket(count: number, ...items: Locator[]) {
        let currentCount = count;
        for (const item of items)
        {
            await item.click();
            currentCount++;
            await expect(this.shoppingCartBadge).toHaveText(currentCount.toString());
        }
    }

    //Remove item (s) from basket
    async removeFromBasket(...items: Locator[]) {
        const rawText = await this.shoppingCartBadge.textContent();
        let count = parseInt(rawText || "0", 10);
        
        if (count <= 0)
        {
            throw new Error("Cannot remove items, nothing in the shopping cart, check the test setup to ensure the correct amount of items are in there");
        }

        for (const item of items)
        {
            await item.click();
            count--;
            await expect(this.shoppingCartBadge).toHaveText(count.toString());
        }
    }

    async navigateToCart(){
        await this.shoppingCartLink.click();

        return new CartPage(this.page);
    }
}




