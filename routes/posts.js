const router = require('express').Router();
const verify = require('./verifyToken')


router.get('/', verify, (req, res) => {
    res.json({
        posts: {
            title: "first post",
            description: "neewww postt"
        }
    })
})

module.exports = router