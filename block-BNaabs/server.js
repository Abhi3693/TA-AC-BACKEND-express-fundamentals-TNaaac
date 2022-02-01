let express = require('express');

let app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/index', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/new', (req, res) => {
  res.sendFile(__dirname + '/new.html');
});

app.post('/form', (req, res) => {
  let data = req.body;
  console.log(data);
  res.send(data);
});

app.get('/user/:username', (req, res) => {
  let username = req.params.username;
  res.send(username);
});

app.listen(3456);
