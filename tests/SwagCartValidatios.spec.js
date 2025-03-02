import {test, expect} from "@playwright/test"

test.beforeEach(async({page})=>{
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
})
test('test', async ({ page }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click();

    await expect(page.locator('[data-test="shopping-cart-badge"]')).toContainText("2");

    await page.locator('[data-test="shopping-cart-link"]').click();
    const data_table = await page.locator('[data-test="cart-list"]');
    const no_of_items = await data_table.locator('[data-test="inventory-item"]').count();
    expect(no_of_items).toBe(2);
    await page.locator('[data-test="shopping-cart-link"]').screenshot({path:'cart_count.png'});
    
    await expect(page.locator('[data-test="item-quantity"]').nth(0)).toContainText("1");
    await expect(page.locator('[data-test="inventory-item-name"]').nth(0)).toContainText("Sauce Labs Bike Light");
    await expect(page.locator('[data-test="inventory-item-price"]').nth(0)).toContainText("$9.99");
  

    await expect(page.locator('[data-test="item-quantity"]').nth(1)).toContainText("1");
    await expect(page.locator('[data-test="inventory-item-name"]').nth(1)).toContainText("Sauce Labs Onesie");
    await expect(page.locator('[data-test="inventory-item-price"]').nth(1)).toContainText("$7.99");
});
test("Remove Items from Cart",async ({page})=>{
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.screenshot({path:"before_3_Items.png"});

    await page.locator('[data-test="shopping-cart-link"]').click();

    await page.locator('[data-test="remove-sauce-labs-bike-light"]').click();

    await page.locator('[data-test="continue-shopping"]').click();

    await expect(page.locator('[data-test="shopping-cart-badge"]')).toContainText("2");

    await page.screenshot({path:'after_2_items.png'});

});
test("Complete Checkout Flow",async ({page})=>{
        const item_total = '$17.98';
        await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
        await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click();
        await page.locator('[data-test="shopping-cart-link"]').click();
        await page.locator('[data-test="checkout"]').click();
        await page.locator('[data-test="firstName"]').click();
        await page.locator('[data-test="firstName"]').fill('vishal');
        await page.locator('[data-test="firstName"]').press('Tab');
        await page.locator('[data-test="lastName"]').fill('Patil');
        await page.locator('[data-test="lastName"]').press('Tab');
        await page.locator('[data-test="postalCode"]').fill('411225');
        await page.locator('[data-test="continue"]').click();
        await expect(page.locator('[data-test="subtotal-label"]')).toContainText(`${item_total}`);
        await page.locator('[data-test="finish"]').click();

        await expect(page.locator('[data-test="complete-header"]')).toContainText("Thank you for your order!");
        await page.screenshot({path: "order_confirmation.png"});
});