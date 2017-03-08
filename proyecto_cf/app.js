var express = require('express');
var bodyParser = require('body-parser');
var User = require('./models/user');
var cookieSession = require('cookie-session');
// Modularizacion de rutas con express , router
// set con router app
var router_app = require('./router_app');
var session_middleware = require('./middlewares/session');
var formidable = require('express-formidable');

var methodOverride = require('method-override');

var app = express();
// VERBOS Http => GET / POST / PUT / PATCH / DELETE
//  NEXT equivale a la siguiente funcion que serea ejecutada

// Servir archivos estaticos => img , css , js
app.use('/public', express.static(__dirname + '/public'));
// app.use(bodyParser.json()); // para peticiones application/json
// app.use(bodyParser.urlencoded({extended: true}));

app.use(methodOverride("_method"));
app.use('/app/',methodOverride("_method"));

app.use(cookieSession({
  name: "session",
  keys: ["llave-1","llave-2"]
}))
app.use(formidable({keepExtensions: true}))

app.set('view engine','jade')

app.get('/', (req , res )=> {
  res.render('index');
})

app.get('/signup', (req , res )=> {
  User.find((err,doc)=>{
    console.log(doc);
    res.render('signup');
  })
})

app.get('/login', (req , res )=> {
  res.render('login');
})

app.post('/sessions', (req , res , next)=> {
  // el segundo parametro es para obtener atributos especificos ej username
  User.findOne({email:req.fields.email,password:req.fields.password}, function (err, user) {
    if (err){console.log(String(err));}
    req.session.user_id = user._id;
    res.redirect("./app/");
  })
});

app.post('/users', (req , res)=> {

  var user = new User({
    email: req.fields.email,
    password: req.fields.password,
    username: req.fields.username,
    password_confirmation: req.fields.password_confirmation
  });

  // USO DE PROMESAS , 2 callbacks de parametros : 1 success , 2 error
  user.save().then((user)=>{
    res.send("Guardamos el usuario exitosamente");
  }, (err) => {
    if (err) {
      console.log(String(err));
      res.send("No pudimos guardar la imformacion");
    }
  });

});

app.use('/app',session_middleware);
app.use('/app',router_app);

app.listen(8080);