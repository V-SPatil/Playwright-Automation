import {test, expect} from "@playwright/test"

test('test', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
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