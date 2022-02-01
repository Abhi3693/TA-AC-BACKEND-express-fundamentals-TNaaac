let express = require('express');

let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  console.log(req.url);
  next();
});

app.get('/index', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/contact', (req, res, next) => {
  let data = req.body;
  console.log(data);
  res.send(data);
});

app.post('/json', (req, res) => {
  let data = req.body;
  console.log(data);
  res.send(data);
});

app.listen(4002, () => {
  console.log('server is listening on port 4000');
});
