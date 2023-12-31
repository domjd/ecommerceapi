const express = require('express');
const session = require('express-session');
const app = express();
const bodyParser = require('body-parser');
const PORT = 3000;

const store = new session.MemoryStore();

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);


const passport = require("./config/passport");
app.use(
    session({
        secret:"f4z4gs$Gcg",
        cookie: { maxAge: 300000000, secure: true, sameSite: true},
        saveUninitialized: false,
        resave: false,
        store
    })
);

app.use(passport.initialize());
app.use(passport.session());


const orders = require('./orders');
const products = require('./products');
const users = require('./users');
const carts = require('./carts');



app.use('/orders', orders);
app.use('/products', products);
app.use('/users', users);
app.use('/carts', carts);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})
