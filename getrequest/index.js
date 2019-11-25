const fetch = require("node-fetch");

// fetch the API
const getFirstUserData = async (url) => {
    const response = await fetch(url) // get users list
    const data = await response.json() // parse JSON
    return data
}

module.exports = async function (context, req) {
    try {
        context.log('GET ');
        //var data = await getFirstUserData('https://jsonplaceholder.typicode.com/posts/1');

        // construct the URL to post to a publication
        //const POST_URL = `https://api.medium.com/v1/publications/${MEDIUM_PUBLICATION_ID}/posts`;
        const POST_URL = `https://jsonplaceholder.typicode.com/posts/1`;

        /*
        headers: {
            "Authorization": `Bearer ${MEDIUM_ACCESS_TOKEN}`,

            ...

            body: JSON.stringify({
                title: "Title of my post",
                contentFormat: "html",
                content: "Body of my post",
                tags: ["Hello", "World"],
                publishStatus: "draft", // or "public" to immediately publish

                // optional: the canonical URL if posted elsewhere first
                canonicalUrl: "http://example.com/blog/1"            
            })

        */

        const response = await fetch(POST_URL, {
            method: "get",
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json",
                "Accept-Charset": "utf-8"
            }
        });

        const responseData = await response.json();

        if ((response.status !== 200) && (response.status !== 201)) {
            context.res = {
                status: response.status,
                body: 'Invalid response status',
                isRaw: true,
                headers: {
                    'Content-Type': 'text/html'
                }
            };
        } else {
            context.res = {
                status: 200,
                body: responseData,
                isRaw: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            };
        }
    } catch (e) {
        context.log("Error: " + e);

        context.res = {
            status: 500,
            body: "500 Internal Server Error.",
            headers: {
            }
        };
    }
};