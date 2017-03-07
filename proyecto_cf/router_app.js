var express = require('express');
var Imagen = require("./models/imagen");
var router = express.Router();

router.get('/',(req,res) => {
  res.render('app/home');
});

/* REST */

router.get("/imagenes/new",(req,res)=>{
  res.render('app/imagenes/new');
});

router.get("/imagenes/:id/edit", (req,res)=>{
  Imagen.findById(req.params.id, (err, imagen)=>{
    if (err) {console.log(String(err));}
    res.render('app/imagenes/edit',{imagen: imagen});
  })
});

router.route("/imagenes/:id")
.get((req,res)=>{
  Imagen.findById(req.params.id, (err, imagen)=>{
    if (err) {console.log(String(err));}
    res.render('app/imagenes/show',{imagen: imagen});
  })

})
.put((req,res)=>{
  Imagen.findById(req.params.id, (err, imagen)=>{
    imagen.title = req.body.title
    imagen.save((err)=>{
      if (!err) {
        res.render('app/imagenes/show',{imagen: imagen});
      }else{
        res.render('app/imagenes/'+imagen.id+'/edit',{imagen: imagen});
      }
    });

  })
})
.delete((req,res)=>{

});

router.route("/imagenes")
.get((req,res)=>{
  Imagen.find({},(err,imagenes)=>{
    if (err) {res.redirect('/app'); return;}
    res.render("app/imagenes/index",{imagenes:imagenes})
  })
})
.post((req,res)=>{

  var imagen = new Imagen({
    title: req.body.title
  });
  imagen.save().then((imagen)=>{
    res.redirect("/app/imagenes/"+imagen._id)
  }, (err) => {
    if (err) {
      console.log('error: ');
      res.render(err);
    }
  });
});



module.exports = router;