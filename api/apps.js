export default function handler(req, res) {
    let path = req.path;
    let query = req.query;
    let cookies = req.cookies;
    let headers = req.headers;
    console.log('path: ', req);
    console.log('query: ', query);
    console.log('cookies: ', cookies);
    console.log('headers: ', headers);

    return res.json({path, query, cookies, headers})
}
