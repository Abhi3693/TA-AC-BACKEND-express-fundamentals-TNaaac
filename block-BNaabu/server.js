let express = require('express');

let app = express();

app.use((req, res, next) => {
  if (req.url === '/admin') {
    next('UnAuthorised user');
  }
  next();
});

app.get('/', (req, res, next) => {
  res.send('Welcome to index page');
});

app.get('/about', (req, res, next) => {
  res.send('This is about page');
});

app.use((req, res, next) => {
  res.send('Page not found : 404');
  next();
});

app.use((err, req, res, next) => {
  res.send(err);
  next();
});

app.listen(1234);
