require('dotenv').config({ path: './config.env' });
const debug = require('debug')('dev:');
const http = require('http');
const app = require('./app');

const server = http.createServer(app);

const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const port = normalizePort(process.env.PORT || '3000');

app.set('port', port);

const onListening = () => {
  server.address();
  const bind = typeof port === 'string' ? `pipe ${port}` : `port ${port}`;
  debug(`Listening on ${bind}`);
};

server.on('listening', onListening);

const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof port === 'string' ? `pipe ${port}` : `port ${port}`;

  switch (error.code) {
    case 'EACCES':
      debug(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      debug(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};
server.on('error', onError);

server.listen(port);
