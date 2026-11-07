import { type Page, type Locator } from "@playwright/test";

export class CheckoutCompletePage {
    readonly page: Page;
    readonly url: string;
    readonly tick: Locator;
    readonly completeHeader: Locator;
    readonly pdfButton: Locator;


    constructor(page: Page) {
        this.page = page;
        this.url = "/checkout-complete.html";
        this.tick = page.getByTestId("pony-express");
        this.completeHeader = page.getByTestId("complete-header");
        this.pdfButton = page.getByTestId("generate-pdf-order");
    }

    //actions
    async pdfDownload()
    {
        const downloadEvent = this.page.waitForEvent("download");
        await this.pdfButton.click();

        const downloadedPdf = await downloadEvent;

        return downloadedPdf;
    }
}