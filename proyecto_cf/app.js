const express = require('express');
const bodyParser = require('body-parser')
var app = express();

// VERBOS Http => GET / POST / PUT / PATCH / DELETE
//  NEXT equivale a la siguiente funcion que serea ejecutada

// Servir archivos estaticos => img , css , js
app.use("/public",express.static('public'));

app.use(bodyParser.json()); // para peticiones application/json
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine','jade')

app.get('/', (req , res ,next)=> {
  res.render('index');
})

app.get('/login', (req , res ,next)=> {
  res.render('login');
})

app.post('/users', (req , res ,next)=> {
  console.log("Email:"+req.body.email);
  console.log("Contraseña:"+req.body.password);
  res.send("Recibimos tus datos");
})

app.listen(8080);