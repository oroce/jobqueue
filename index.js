var Zeller = require('./lib/Zeller.js');

var app = new Zeller();

app.use(function*(data, next) {
  console.log(1, 'down');
  yield next;
  console.log(1, 'up');
}).use(function*(data, next) {
  console.log(2, 'down');
  yield next;
  console.log(2, 'up');
});

app.recieve({foo:'bar'});
