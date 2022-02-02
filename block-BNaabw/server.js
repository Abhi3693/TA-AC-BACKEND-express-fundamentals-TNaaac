// Packages
let express = require('express');
let cookieParser = require('cookie-parser');
let morgan = require('morgan');

// Server
let app = express();

// default middleWares

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

// Third Party middleWare

app.use(morgan('dev'));
app.use(cookieParser());

// Application middleware

app.use((req, res, next) => {
  let cooki = req.cookies.value;
  if (cooki) {
    console.log(req.cookies);
    res.cookie('value', Number(cooki) + 1);
  } else {
    res.cookie('value', 1);
  }
  next();
});

app.use('/user/:username', (req, res, next) => {
  let data = req.params.username;
  res.send(data);
});

// Routes

app.get('/', (req, res, next) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/project', (req, res) => {
  res.sendFile(__dirname + '/project.html');
});

app.get('/form', (req, res) => {
  res.sendFile(__dirname + '/form.html');
});

app.post('/form', (req, res) => {
  res.send(req.body);
});

// Error middleWares

app.use((req, res, next) => {
  res.send(`<h1>Page Not Found: 404</h1>`);
});

app.use((err, req, res, next) => {
  res.send(`<h1>${err}</h1>`);
});

app.listen(4000);
