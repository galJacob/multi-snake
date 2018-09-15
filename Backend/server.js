const express = require('express');
const session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const cors = require('cors');
const addUserRoutes = require('./routes/UserRoutes');

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true // enable set cookie
}));
app.use(session({
  secret: 'secret string',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true
  },
  cookieName: 'session',
}));

addUserRoutes(app);


const port = 4000;
app.listen(port, () => {
  console.log(`listening to port: ${port}`);
});