const http = require('http');
const os = require('os');

const startTime = Date.now();

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });

  if (req.url === '/health') {
    return res.end(JSON.stringify({ status: 'ok' }));
  }

  res.end(JSON.stringify({
    message: 'Hello from my Dockerized App!',
    hostname: os.hostname(),
    uptime: Math.floor((Date.now() - startTime) / 1000) + 's'
  }));
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});