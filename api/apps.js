export default function handler(req, res) {
    let url = req.url;
    let query = req.query;
    let cookies = req.cookies;
    let headers = req.headers;
    console.log('url: ', url);
    console.log('query: ', query);
    console.log('cookies: ', cookies);
    console.log('headers: ', headers);

    return res.json({path, query, cookies, headers})
}
