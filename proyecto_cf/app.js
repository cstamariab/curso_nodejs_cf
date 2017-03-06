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

app.get('/signup', (req , res ,next)=> {
  User.find((err,doc)=>{
    console.log(doc);
    res.render('signup');
  })
})

app.get('/login', (req , res ,next)=> {
    res.render('login');
})

app.post('/sessions', (req , res ,next)=> {
  // el segundo parametro es para obtener atributos especificos ej username
  User.findOne({email:req.body.email,password:req.body.password},(err,docs) => {
    console.log(docs);
    res.send('Hola mundo');
  });
});

app.post('/users', (req , res ,next)=> {

  var user = new User({
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
    password_confirmation: req.body.password_confirmation
  });

// USO DE PROMESAS , 2 callbacks de parametros : 1 success , 2 error
  user.save().then((user)=>{
    res.send("Guardamos el usuario exitosamente");
  }, (err) => {
    if (err) {
      console.log(String(err));
      res.send("No pudimos guardar la imformacion")
    }
  });

});

app.listen(8080);