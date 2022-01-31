let express = require('express');
let url = require('url');

let app = express();

app.use('/about', (req, res, next) => {
  console.log(req.method);
  console.log(req.url);
  console.log(url.parse(req.url));
  next();
});

app.get('/about', (req, res) => {
  res.send('Welcome to second assignment');
});
app.listen(4000, () => {
  console.log('Server is listning on 4k port');
});
