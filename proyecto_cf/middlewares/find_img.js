var Imagen = require('../models/imagen');
var owner_check = require('../middlewares/img_permission');
module.exports = (req,res,next) => {
  Imagen.findById(req.params.id)
  .populate('creator')
  .exec(
    (err , imagen) => {
      if (imagen != null && owner_check(imagen,req,res)) {
        res.locals.imagen = imagen;
        next();
      }else{
        console.log('error de permisos ');
        res.redirect("/app");
      }
    })
  }