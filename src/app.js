const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const routing = require('./routes');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

app.use(express.static(path.join(__dirname, '../public')));

app.use('/', routing);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
