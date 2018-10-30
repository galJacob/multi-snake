const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo')(session);
const http = require('http');
const socketIo = require('socket.io');
const addSocketRoutes = require('./services/SocketRoutes');
const app = express();
const MONGO_SESSION_URL = 'mongodb://galAdmin:givemepie3.14@ds149672.mlab.com:49672/multi-snake';

const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', socket => {
  console.log('user connected');
  addSocketRoutes(socket, io);
});

app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true
}));

app.use(bodyParser.json());
app.use(cookieParser('secret string'));

app.use(session({
  store: new MongoStore({
    url: MONGO_SESSION_URL
  }),
  secret: 'secret string',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 100 * 60 * 60 * 24 * 365 //year
  }
}));

const addUserRoutes = require('./routes/UserRoutes');
addUserRoutes(app);
const port = 2000;


server.listen(port, () => {
  console.log(`listening to port: ${port}`);
});