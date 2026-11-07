import { expect, test } from '@playwright/test';
import { loginData } from '../test-data/login-data';
import { LoginPage } from '../pages/login-page';
import { firstnames, lastNames, postalCodes } from '../test-data/checkout-one-data';
import { CheckoutCompletePage } from '../pages/checkout-complete-page';
import { completeHeaderText } from '../test-data/checkout-complete-data';
import fs from "fs";

test.describe("Checkout Complete Tests", () => {
    let checkoutCompletePage: CheckoutCompletePage;

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigateTo();

        const inventoryPage = await loginPage.login(loginData.users.standard, loginData.passwords.correctPassword);
        await inventoryPage.addToBasket(0, inventoryPage.backpackAddToCartButton, inventoryPage.bikeLightAddToCartButton);

        const cartPage = await inventoryPage.navigateToCart();
        const checkoutOnePage = await cartPage.navigateCheckout();
        await checkoutOnePage.inputValidData(firstnames.name1, lastNames.name2, postalCodes.postcode1);
        const checkoutTwoPage = await checkoutOnePage.continueCheckout();

        checkoutCompletePage = await checkoutTwoPage.finishCheckout();

    });

    test.describe("Visual Elements are present and correct", () => {
        test("complete header text is correct", { tag: "@regression" }, async () => {
            await expect(checkoutCompletePage.completeHeader).toHaveText(completeHeaderText);
        });
        //more tests/assertions would be added to confirm correctness of other visual elements
    });

    test.describe("PDF behaviour", () => {
        test("PDF is generated", { tag: "@regression" }, async ({}, testInfo) => {
            const pdf = await checkoutCompletePage.pdfDownload();

            const fileName = pdf.suggestedFilename();
            expect(fileName.endsWith(".pdf")).toBe(true);

            const savePath = testInfo.outputPath(fileName);
            await pdf.saveAs(savePath);

            const fileExists = fs.existsSync(savePath);
            expect(fileExists).toBe(true);
        });

        //more tests could be added to check pdf content etc
    });
});

