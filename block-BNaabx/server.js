let express = require('express');
let http = require('http');
let url = require('url');
let fs = require('fs');
const qs = require('querystring');

let app = express();

app.use((req, res, next) => {
  console.log(req.url, req.method, new Date());
  next();
});

app.use((req, res, next) => {
  let store;
  req.on('data', (chunk) => {
    store = store + chunk;
  });

  req.on('end', () => {
    req.body = qs.parse(store);
  });

  next();
});

app.use((req, res, next) => {
  let splittedURL = req.url.split('/');
  let mimeType = splittedURL[splittedURL.length - 1].split('.');
  if (mimeType[1] === 'css') {
    res.sendFile(__dirname + '/public' + req.url);
  } else if (
    mimeType[1] === 'jpeg' ||
    mimeType[1] === 'png' ||
    mimeType[1] === 'jpg'
  ) {
    res.sendFile(__dirname + '/public' + req.url);
  } else {
    next();
  }
});

app.get('/', (req, res, next) => {
  res.sendFile(__dirname + '/form.html');
});

app.post('/form', (req, res) => {
  res.send(req.body);
});

app.listen(5678);
