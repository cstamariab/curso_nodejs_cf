var express = require('express');

var router = express.Router();

router.get('/',(req,res) => {
  res.render('app/home');
})

/* REST */

router.get("/imagenes/new",(req,res)=>{
  res.render('app/imagenes/new');
});

router.get("/imagenes/:id/edit", (req,res)=>{

});

router.route("/imagenes/:id")
.get((req,res)=>{

})
.put((req,res)=>{

})
.delete((req,res)=>{

});

router.route("/imagenes")
.get((req,res)=>{

})
.post((req,res)=>{
  
  res.redirect('/app/imagenes/new');
});






module.exports = router;