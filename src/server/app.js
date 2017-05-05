/**
 * Created by Desyon on 07.04.2017.
 */

let express = require('express');

app = express();

app.get('/', function (req, res) {
  res.send('Hello World from root');
});

app.get('/test', function (req, res) {
  res.send('Hello World from test.');
});

app.listen(3000, function () {
  console.log('Now listening on localhost:3000');
});
