let app = require("express")(),
    bodyParser = require("body-parser"),
    mongoose = require('mongoose'),
    authRoutes = require('./routes/auth'),
    postRoutes = require('./routes/posts'),
    dotenv = require('dotenv'),
    port = 8000;

dotenv.config();

mongoose.connect(process.env.DB_CONNECT, { useUnifiedTopology: true, useNewUrlParser: true }, () => { console.log('conneced successfully'); });

//middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(require('express').json())

//route middlewares
app.use('/api/users', authRoutes)
app.use('/api/posts', postRoutes)

app.listen(port, () => {
    console.log(`server is running at ${port}`);
})

