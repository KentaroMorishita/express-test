import * as express from 'express';
import * as http from 'http';
import app from './app';

const debug = require('debug')('express-test:server');
const port = process.env.PORT || 9000;
const server = http.createServer(app.set('port', port));

server.listen(app.get('port'), () => {
    console.log('Express server listening on port ' + app.get('port'));
});

server.on('error', (error: any) => {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
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
});

server.on('listening', () => {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
});
