var Imagen = require('../models/imagen');
module.exports = (req,res,next) => {
  Imagen.findById(req.params.id)
  .populate('creator')
  .exec(
    (err , imagen) => {
      if (imagen != null) {
        res.locals.imagen = imagen;
        next();
      }else{
        res.redirect("/app");
      }
    })
  }