var express = require('express');
var Imagen = require("./models/imagen");
var fs = require('fs');
var router = express.Router();
var img_finder_middleware = require('./middlewares/find_img');

router.get('/',(req,res,next) => {
  Imagen.find({})
  .populate('creator')
  .exec((err, imagenes) => {
    if (err) {console.log(err);}
    res.render('app/home' ,{imagenes:imagenes});
  })
});

/* REST */

router.get("/imagenes/new",(req,res)=>{
  res.render('app/imagenes/new');
});

router.all("/imagenes/:id*",img_finder_middleware)

router.get("/imagenes/:id/edit", (req,res)=>{
  // Middleware Find img carga FindById
  res.render('app/imagenes/edit');
});

router.route("/imagenes/:id")
.get((req,res)=>{
  res.render('app/imagenes/show');
})
.put((req,res)=>{
  res.locals.imagen.title = req.fields.title;
  res.locals.imagen.creator = res.locals.user._id;
  res.locals.imagen.save((err)=>{
    if (!err) {
      res.render('app/imagenes/show');
    }else{
      res.render('app/imagenes/'+req.params.id+'/edit');
    }
  });
})
.delete((req,res)=>{
  Imagen.findOneAndRemove({_id: req.params.id}, (err) => {
    if (!err) {
      res.redirect("/app/imagenes");
    }else{
      console.log(err);
      res.redirect('/app/imagenes/'+req.params.id);
    }
  })
});

router.route("/imagenes")
.get((req,res)=>{
  Imagen.find({creator: res.locals.user._id},(err,imagenes)=>{
    if (err) {res.redirect('/app'); return;}
    res.render("app/imagenes/index",{imagenes:imagenes})
  })
})
.post((req,res)=>{

  var extension = req.files.archivo.name.split(".").pop(); // pop el ultimo del arreglo

  var imagen = new Imagen({
    title: req.fields.title,
    creator : res.locals.user._id,
    extension : extension
  });
  imagen.save().then((imagen)=>{
    fs.rename(req.files.archivo.path ,"public/imagenes/"+imagen._id + "." + extension);
    res.redirect("/app/imagenes/"+imagen._id);
  }, (err) => {
    if (err) {console.log(err);}
    res.redirect('/app/imagenes/new');
  });
});



module.exports = router;