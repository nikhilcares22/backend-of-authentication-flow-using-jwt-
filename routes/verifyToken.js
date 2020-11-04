const jwt = require('jsonwebtoken'),
    User = require('../models/User');


function auth(req, res, next) {
    const token = req.header("auth-token");
    if (!token) return res.status(401).send("Access denied")

    try {
        const { id } = jwt.verify(token, process.env.JSON_SECRET)
        // req.user = { id }
        User.findById(id, (err, user) => {
            if (!err) {
                req.user = user
            }
        })

    } catch (error) {
        return res.status(400).send('Invalid Token')
    }
    next();

}
module.exports = auth;