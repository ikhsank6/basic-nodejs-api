const bodyParser = require('body-parser');
const express = require('express');
const app = express() ,
port = process.env.PORT || 3000;
var morgan = require('morgan');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

var route = require('./router');
route(app);

//daftarkan menu routes dari index
// app.use('/auth', require('./middleware'));

app.listen(port);
console.log(`RESTful API server started on: ${port}`);