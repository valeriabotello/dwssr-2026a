#!/usr/bin/env node

/**
 * Module dependencies.
 */

// var app = require('../app');
import app from '../app.js'; // Importamos la aplicación usando ES Modules
// var debug = require('debug')('dwssr-2026a:server');
import createdebug from 'debug'; // Importamos debug usando ES Modules
// var info = require('debug')('dwssr-2026a:info');
// var http = require('http');
import http from 'node:http'; // Importamos http usando ES Modules

const debug = createdebug('dwssr-2026a:server'); // Creamos la función debug con el espacio de nombres 'dwssr-2026a:server'
const info = createdebug('dwssr-2026a:info'); // Creamos la función info con el espacio de nombres 'dwssr-2026a:info'

/**
 * Get port from environment and store in Express.
 */

info(`👀 Normalizing port`);
var port = normalizePort(process.env.PORT || '3000');
info(`✅ Port normalized ` + port);
app.set('port', port);

/**
 * Create HTTP server.
 */
info (`🚀Starting server on port ${port}`)
var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;

  debug('🔊 Listening on ' + bind);
  info(`✅ Server is listening on ${bind}`);
}