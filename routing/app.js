const express = require('express');

var app = express();

// VERBOS Http => GET / POST / PUT / PATCH / DELETE

app.set('view engine','jade')

app.get('/', (req , res)=> {
  res.render('index');
})

app.get("/:nombre", (req, res) => {
  var data = {
    nombre: req.params.nombre
  }
  res.render('form',data)
})

app.post('/', (req, res)=> {
  res.render('form')
})

app.listen(8080);