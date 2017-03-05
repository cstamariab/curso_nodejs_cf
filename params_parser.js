function parse (req) {
  let array_parametros = [];
  let parametros = {};

  if (req.url.indexOf('?') > 0) {
    // /?nombre=Christian
    var url_data = req.url.split('?');
    array_parametros =  url_data[1].split('&');

  }
  for (var i = 0; i < array_parametros.length; i++) {
    var parametro  = array_parametros[i];
    var param_data = parametro.split("=");

    parametros[param_data[0]] = param_data[1];

  }
return parametros;
}

module.exports = parse;