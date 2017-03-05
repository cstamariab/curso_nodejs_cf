const express = require('express');

var app = express();

app.set('view engine','jade')

app.get('/', (req , res)=> {
  var data = {
    hola: "Hola christians"
  }
  res.render('index',data);
})

app.listen(8080);