const http = require('http');
const fs = require('fs');
const port = 8080;

// FUNCION SINCRONA DE LECTURA DE ARCHIVOS
// var html = fs.readFileSync('./index.html', 'utf-8');

//codigo 200 = success , 400 = not_found , 300 = movido algun lugar , 500 = error
http.createServer((req , res) => {

  fs.readFile('./index.html', 'utf-8', (err , html) => {
    res.writeHead(200,{'Content-type':'application/json'})
    res.write(JSON.stringify({nombre: "Christian", username:"cstamariab"}))
    res.end()
  });

}).listen(port)

