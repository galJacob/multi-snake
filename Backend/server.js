const express = require('express');
const session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const cors = require('cors');

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
    secure: false
  },
  cookieName: 'session',
}));

const port = 3001;

app.listen(port, () => {
  console.log(`listening to port: ${port}`);
});