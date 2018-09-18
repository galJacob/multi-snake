const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true
}));
app.use(bodyParser.json());
app.use(cookieParser('secret string'));
app.use(session({
  secret: 'secret string',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 100000000000000
  }
}));

const addUserRoutes = require('./routes/UserRoutes');
addUserRoutes(app);
const port = 2000;
app.listen(port, () => {
  console.log(`listening to port: ${port}`);
});