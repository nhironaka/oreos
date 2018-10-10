const http = require('http');
// const socketIo = require('socket.io');

const app = require('./app');

const port = process.env.PORT || 9000;
app.set('port', port);
const server = http.createServer(app);
// const io = socketIo(server); // < Interesting!
// io.on('connection', (_socket) => {
//   console.log('listening');
// });

server.listen(port);

module.exports = server;
