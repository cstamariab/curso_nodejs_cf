const express = require('express');
const bodyParser = require('body-parser')
var app = express();

var User = require('./models/user');
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
  User.find((err,doc)=>{
    console.log(doc);
    res.render('login');
  })
})

app.post('/users', (req , res ,next)=> {

  var user = new User({
    email: req.body.email,
    password: req.body.password,
    password_confirmation: req.body.password_confirmation}
  );
  console.log(user.password_confirmation);
  user.save((err)=>{
    if (err) {
      console.log(String(err));
    }
    res.send("Guardamos tus datos");
  });

})

app.listen(8080);