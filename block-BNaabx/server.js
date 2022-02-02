let express = require('express');
let http = require('http');
let url = require('url');

let app = express();

app.use((req, res, next) => {
  console.log(req.url, req.method, new Date());
  next();
});

app.use('/', (req, res, next) => {
  var store = '';
  req.socket.on('data', (chunk) => {
    // console.log(chunk);
    store = store + chunk;
  });
  next();
});

app.get('/', (req, res, next) => {
  res.sendFile(__dirname + '/form.html');
});

app.post('/form', (req, res) => {
  res.send(req.body);
});

app.listen(5678);
