const http = require('http');
const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Le backend fonctionne !\n');
});
server.listen(5000, () => {
  console.log('Serveur en écoute sur le port 5000');
});
