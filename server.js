const http = require('http');
const app = require('./app');

const port = process.env.PORT || 80;

const server = http.createServer(app);

server.listen(port, () => console.log(`API running on localhost:${port}`));