let express = require('express');
let logger = require('morgan');
let cookieParser = require('cookie-parser');

let app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());

app.use(cookieParser());
app.use(logger('dev'));

app.use((req, res, next) => {
  console.log(req.cookies);
  next();
});

app.use('/about', (req, res, next) => {
  res.cookie('lastName', 'mane');
  next();
});

app.get('/', (req, res) => {
  res.send('Welcome');
});
app.listen(5555, () => {
  console.log('Server is listening on 5555 port');
});
