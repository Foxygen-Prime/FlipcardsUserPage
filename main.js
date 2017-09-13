const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const flipcards = require('./Models/flipcards.js')
const session = require('express-session');
// const registration = require('./Models/registration.js')

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/FlipcardSchemaLibrary');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')

app.get('/', (req, res) => {
  console.log("rendering index page successfully");
  res.render('index')
})

app.use(function(req, res, next) {
  if (req.url == 'index') {
    console.log('user journey begins at index; rendergin\'!');
    next('route');
  } else if (!req.session.username) {
    console.log('going to have to sign-in first!');
    res.render('login')
  } else {
    console.log("next(route)");
    next('route');
  }
});




// registration
//
// login
//
//
// logout

app.listen(3000, function() {
  console.log('Successfully started express application!')
})
