export default function handler(req, res) {
    let query = req.query;
    let cookies = req.cookies;
    let headers = req.headers
    console.log('query: ', query);
    console.log('cookies: ', cookies);
    console.log('headers: ', headers);

    return res.json({query, cookies, headers})
}
