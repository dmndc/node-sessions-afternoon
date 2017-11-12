const express = require('express');
const { json } = require('body-parser');
const session = require('express-session');

// middlewares
const checkForSession = require('./middlewares/checkForSession');

// controllers
const swagCtrl = require('./controllers/swag_controller');
const authCtrl = require('./controllers/auth_controller');
const cartCrtl = require('./controllers/cart_controller');
const searchCrtl = require('./controllers/search_controller');


const app = express();

app.use(json());
app.use(session({
  secret: 'just Anything',
  resave: false,
  saveUninitialized: false
}));
app.use(checkForSession);
app.use(express.static(`${__dirname}/../public/build`));

// Swag data
app.get('/api/swag', swagCtrl.read);

// Auth endpoints
app.post('/api/login', authCtrl.login);
app.post('/api/register', authCtrl.register);
app.post('/api/signout', authCtrl.signout);
app.get('/api/user', authCtrl.getUser);

// Cart endpoints
app.post('/api/cart', cartCrtl.add);
app.post('/api/cart/checkout', cartCrtl.checkout);
app.delete('/api/cart', cartCrtl.delete);

// Search endpoint 
app.get('/api/search', searchCrtl.search);

const port = 3000;
app.listen(port, () => { console.log(`Listening on port: ${port}`); });