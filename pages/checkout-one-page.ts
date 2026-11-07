import { type Page, type Locator } from "@playwright/test";
import { CheckoutTwoPage } from "./checkout-two-page";

export class CheckoutOnePage {
    readonly page: Page;
    readonly url: string;
    readonly continueButton: Locator;
    readonly firstNameField: Locator;
    readonly lastNameField: Locator;
    readonly postalCodeField: Locator;


    constructor(page: Page) {
        this.page = page;
        this.url = "/checkout-step-one.html";
        this.continueButton = page.getByTestId("continue");
        this.firstNameField = page.getByTestId("firstName");
        this.lastNameField = page.getByTestId("lastName");
        this.postalCodeField = page.getByTestId("postalCode");
    }

    //actions
    async inputValidData(firstname: string, lastname: string, postalCode: string) {
        await  this.firstNameField.fill(firstname);
        await this.lastNameField.fill(lastname);
        await this.postalCodeField.fill(postalCode);
    }

    async continueCheckout()
    {
        await this.continueButton.click();
        return new CheckoutTwoPage(this.page);
    }
}