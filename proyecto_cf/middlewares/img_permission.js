var Imagen = require("../models/imagen");

module.exports = function(image,req,res){

  // True = Tienes permisos
  // Falso = SI no tienes permisos
  if(req.method === "GET" && req.path.indexOf("edit" ) < 0){
    // Ver la imagen
    return true;
  }

  if(typeof image.creator == "undefined") return false;

  if(image.creator._id.toString() == res.locals.user._id){
    // Esta imagen yo la subí
    return true;
  }

  return false;

}