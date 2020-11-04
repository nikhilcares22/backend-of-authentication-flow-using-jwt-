const router = require('express').Router(),
    { registerValidation, loginValidation } = require('../validation'),
    bcrypt = require('bcryptjs'),
    verifyTokenAuth = require('./verifyToken'),
    jwt = require('jsonwebtoken'),
    User = require('../models/User');


router.post('/register', async (req, res) => {
    //validate data before giving to db
    let { error } = registerValidation(req.body);
    if (error) return res.status(404).send(error.details[0].message)

    //checking if the user is already in the db
    const emailExist = await User.findOne({ email: req.body.email })
    if (emailExist) return res.status(404).send("email already exists")

    //hash a password 
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);


    //create a new user 
    try {
        const { _id, name, email } = await new User({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword
        }).save()

        res.send({ _id, name, email });
    } catch (error) {
        res.status(404).send(error)
    }

});

router.post('/login', verifyTokenAuth, async (req, res) => {
    //validate before sending the data
    let { error } = loginValidation(req.body);
    if (error) return res.status(404).send(error.details[0].message)

    //checking if the email exists
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(404).send("Email or password is wrong");

    //if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if (!validPass) return res.status(400).send('Invalid password')

    var token = jwt.sign({ id: user._id }, process.env.JSON_SECRET);
    res.header({ "auth-token": token }).status(200).send(token);

})

module.exports = router;