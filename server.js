const http = require('http')
const app = require('./app/app')
const server = http.createServer(app)

const PORT = process.env.PORT || 3001;
server.listen(PORT);

console.log(`Server Satrted on ${PORT}`);