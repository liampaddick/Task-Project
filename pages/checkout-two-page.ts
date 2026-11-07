import { type Page, type Locator } from "@playwright/test";
import { CheckoutCompletePage } from "./checkout-complete-page";

export class CheckoutTwoPage {
    readonly page: Page;
    readonly url: string;
    readonly finishButton: Locator;


    constructor(page: Page) {
        this.page = page;
        this.url = "/checkout-step-two.html";
        this.finishButton = page.getByTestId("finish");
    }

    //actions
    async finishCheckout() {
        await this.finishButton.click();
        return new CheckoutCompletePage(this.page);
    }
}