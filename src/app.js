const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

const routing = require('./routes');

const app = express();
const PORT = 3000;


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(session({
  secret: 'jelly shop key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

app.use(express.static(path.join(__dirname, '../public')));

app.use('/', routing);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
