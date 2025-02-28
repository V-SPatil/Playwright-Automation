import {test, expect} from "@playwright/test"


const URL = "https://www.saucedemo.com/";
const username = "standard_user";
const password = "secret_sauce";
test("Valiating the Login functionlity", async({page})=>{

    await page.goto(URL);
    await page.getByPlaceholder("Username").fill(username);
    await page.locator("//input[@name= 'password']").fill(password);
    await page.locator("//input[@name= 'login-button']").click();
    await expect(page).toHaveURL(/inventory/);
})
test("Validating the logout funtionality",async({page})=>{

    await page.goto(URL);
    await page.getByPlaceholder("Username").fill(username);
    await page.locator("//input[@name= 'password']").fill(password);
    await page.locator("//input[@name= 'login-button']").click();
    
    // get the invontery menu
    await page.getByRole('button',{name:"Open Menu"}).click();
    await expect(page.locator("//a[@id='logout_sidebar_link']")).toBeVisible();
    await page.locator("//a[@id='logout_sidebar_link']").click();
    
    //validate the logout url
    await expect(page).toHaveURL(URL);
})
test("Validating login error message",async ({page})=>{
    await page.goto(URL);
    await page.getByPlaceholder("Username").fill(username);
    await page.locator("//input[@name= 'password']").fill("wrong password");
    await page.locator("//input[@name= 'login-button']").click();
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toContainText("Epic sadface: Username and password do not match any user in this service");
    await page.screenshot({path: "playwright-report/invalidloginerror.png"});
})