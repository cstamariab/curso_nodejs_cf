const http = require('http');
const fs = require('fs');
const parser = require('./params_parser.js')
const port = 8080;

var p = parser;

http.createServer((req , res) => {
  if (req.url.indexOf("favicon.ico") > 0){ return; }
  console.log('====================================\n\n');

  fs.readFile('./index.html', 'utf-8', (err , html) => {
    let html_string = html.toString();
    let variables = html_string.match(/[^\{\}]+(?=\})/g);
    let nombre = "";

    var parametros = p(req);
    for (var j = 0; j < variables.length; j++) {
      html_string = html_string.replace("{"+variables[j]+"}", parametros[variables[j]]);
    }

    res.writeHead(200,{'Content-type':'text/html'});
    res.write(html_string);
    res.end();
  });

}).listen(port)

