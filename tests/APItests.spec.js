import {test, expect} from '@playwright/test';


test("Getting an API testing", async({request}) => {

    const response = await request.get("https://jsonplaceholder.typicode.com/posts");

    //assertions
    expect(response.status()).toBe(200);
    const responseBody=await response.json();
    console.log(responseBody);
})
test("create new Post",async({request})=>{

    const newPost = {
        userId : 9,
        title : "something",
        body: " there is something"
    }

    const response = await request.post("https://jsonplaceholder.typicode.com/posts",{data : newPost});

    //assertions: 
    await expect(response.status()).toBe(201);
    const json_body = await response.json();

    //console.log(typeof json_body);
    const json_arr = [json_body];
    const specific_data = json_arr.filter(item => item.title ==="something");
    console.log(specific_data);
})
test("PUT request",async({request})=>{

    const updatePut = {
        userId : 1,
        title : "something else",
        body: " there is something else",
        id : 1
    }
    const response = await request.put("https://jsonplaceholder.typicode.com/posts/1")

    expect(response.status()).toBe(200);
    const json_body = await response.json();
    // const json_arr= [json_body]
    // const data = json_arr.filter(item => item.title ==="something else");
    console.log(json_body);
})
test.only("DELETE Request - Remove a Post", async ({ request }) => {
    const response = await request.delete("https://jsonplaceholder.typicode.com/posts/1");

    expect(response.status()).toBe(200);
    console.log(await response.json()); 
});