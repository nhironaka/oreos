import http from 'http';
import app from './app';
// import socketIo from 'socket.io';

const port = process.env.PORT;
app.set('port', port);
const server = http.createServer(app);
// const io = socketIo(server); // < Interesting!
// io.on('connection', (_socket) => {
//   console.log('listening');
// });

server.listen(port);

export default server;
