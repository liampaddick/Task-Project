import { type Page, type Locator } from "@playwright/test";
import { CheckoutOnePage } from "./checkout-one-page";

export class CartPage {
    readonly page: Page;
    readonly url: string;
    readonly checkoutButton: Locator;


    constructor(page: Page) {
        this.page = page;
        this.url = "/cart.html";
        this.checkoutButton = page.getByTestId("checkout");
    }

    //actions
    async navigateCheckout() {
        await this.checkoutButton.click();
        return new CheckoutOnePage(this.page);
    }
}