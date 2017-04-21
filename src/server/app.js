/**
 * Created by desyon on 07.04.2017.
 */

var express = require('express');
var cons = require('consolidate');

app = express();

app.engine('html', cons.swig);

app.set('view engine', 'html');
app.set('views' , __dirname + '\\views');

app.get('/', function(req, res) {
  res.render('test.hbs', {
    title: 'Root',
    content: 'Hello World from Root'
  })
});

app.get('/test', function (req, res) {
  res.send('Hello World from test.')
});

app.listen(3000, function() {
  console.log('Now listening on localhost:3000')
});