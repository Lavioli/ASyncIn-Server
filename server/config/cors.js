const whitelist = ['http://localhost:3000', 'http://localhost:8080', 'https://lavioli.github.io', 'https://kevl927.github.io/ASyncIn-Client', 'https://asyncin-client-surbi.c9users.io', 'https://async-server-surbi.c9users.io', 'https://async-client-kl012.c9users.io', 'https://asyncin-server-kl012.c9users.io','https://kevl927.github.io'];

module.exports = (req, res, next) => {
    let allowCORS = false;

    if (process.env.NODE_ENV !== 'production') allowCORS = true;
    if (process.env.NODE_ENV === 'production' && whitelist.indexOf(req.headers.origin) !== -1) allowCORS = true;

    if (!allowCORS) return next();

    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    return next();
};