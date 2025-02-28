import {test, expect} from "@playwright/test"


const URL = "https://www.saucedemo.com/";
const username = "standard_user";
const password = "secret_sauce";
var temp = 1;
test.describe.parallel('Login with different users', () =>{
    
    const data= ([
        {username :'locked_out_user',expected:'Fail'},
        {username :'problem_user',expected:'Pass'},
        {username :'invalid_user',expected:'Fail'}
    ])
    for( const{username,expected} of data ){
        test(`Login with USER : ${username}`,async ({page})=>
        {
            await page.goto(URL);
            await page.getByPlaceholder("Username").fill(username);
            await page.locator("//input[@name= 'password']").fill(password);
            await page.locator("//input[@name= 'login-button']").click();

            if(expected=='Pass'){
                await expect(page).toHaveURL(/inventory/);
            }
            else{
                await expect(page.locator('[data-test="error"]')).toBeVisible();
                await page.screenshot({path: `playwright-report/screenshot_${temp}.png`});
                temp++;
            }
        
        });
    }
});



