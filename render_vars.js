const http = require('http');
const fs = require('fs');
const port = 8080;

// FUNCION SINCRONA DE LECTURA DE ARCHIVOS
// var html = fs.readFileSync('./index.html', 'utf-8');

//codigo 200 = success , 400 = not_found , 300 = movido algun lugar , 500 = error
http.createServer((req , res) => {
  fs.readFile('./index.html', 'utf-8', (err , html) => {

    let html_string = html.toString();
    // Expresion regular que busca en el html donde haya { }
    let variables = html_string.match(/[^\{\}]+(?=\})/g);

    let nombre = "Christian Santa Maria";
    let descripcion = "Developer";

    //recorre variables { } encontradas en el html
    for (var i = 0; i < variables.length; i++) {
      var value = eval(variables[i]);
      // Evaluamos variables del html y se hace el render con las variables de node
      html_string = html_string.replace("{"+variables[i]+"}", value);
    }
    // Enviamos el contenido 
    res.writeHead(200,{'Content-type':'text/html'});
    res.write(html_string);
    res.end();
  });

}).listen(port)

