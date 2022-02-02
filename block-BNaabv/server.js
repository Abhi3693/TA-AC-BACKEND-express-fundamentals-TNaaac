let express = require('express');
let logger = require('morgan');
let cookieParser = require('cookie-parser');

let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(logger('dev'));
app.use(cookieParser());

app.get('/users/:username', (req, res, next) => {
  let data = req.params.username;
  res.writeHead(200, { 'Content-type': 'text/html' });
  res.end(`<h2>${data}</h2>`);
});

app.use('/cookie', (req, res, next) => {
  let count = req.cookies.countNumber;
  if (count) {
    res.cookie('countNumber', Number(count) + 1);
    res.send(req.cookies);
  } else {
    res.cookie('countNumber', 1);
    res.send(req.cookies);
  }
});

app.use((req, res, next) => {
  if (req.url === '/admin') {
    next('UnAuthorised User');
  }
  next();
});

app.get('/', (req, res, next) => {
  res.writeHead(200, { 'Content-type': 'text/html' });
  res.end('<h2>Welcome to Express</h2>');
});

app.get('/about', (req, res, next) => {
  res.writeHead(200, { 'Content-type': 'text/plain' });
  res.end('My name is qwerty');
});

app.post('/form', (req, res, next) => {
  console.log(req.body);
  res.writeHead(200, { 'Content-type': 'text/plain' });
  res.end(JSON.stringify(req.body));
  next();
});

app.post('/json', (req, res, next) => {
  res.send(req.body);
  next();
});

app.use((req, res, next) => {
  res.send('Page Not Found: 404');
});

app.use((err, req, res, next) => {
  res.writeHead(500, { 'Content-type': 'text/html' });
  res.end(`<h1>${err}</h1>`);
});

app.listen(3000);
