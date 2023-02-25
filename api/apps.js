export default function handler(req, res) {
    let query = req.query;
    let cookies = req.cookies;
    let headers = req.headers
    console.log(query);
    console.log(cookies);
    console.log(headers);

    return res.json({query, cookies, headers})
}
