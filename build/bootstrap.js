/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const http = __webpack_require__(1);
	const app_1 = __webpack_require__(2);
	const debug = __webpack_require__(9)('express-test:server');
	const port = process.env.PORT || 9000;
	const server = http.createServer(app_1.default.set('port', port));
	server.listen(app_1.default.get('port'), () => {
	    console.log('Express server listening on port ' + app_1.default.get('port'));
	});
	server.on('error', (error) => {
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


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("http");

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const express = __webpack_require__(3);
	const logger = __webpack_require__(4);
	const cookieParser = __webpack_require__(5);
	const bodyParser = __webpack_require__(6);
	const index_1 = __webpack_require__(7);
	const users_1 = __webpack_require__(8);
	const app = express();
	// view engine setup
	app.set('views', 'views');
	app.set('view engine', 'pug');
	// uncomment after placing your favicon in /public
	//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
	app.use(logger('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(cookieParser());
	app.use(express.static('public'));
	app.use('/', index_1.index);
	app.use('/users', users_1.users);
	// catch 404 and forward to error handler
	app.use((req, res, next) => {
	    const err = new Error('Not Found');
	    err.status = 404;
	    next(err);
	});
	// error handler
	app.use((err, req, res, next) => {
	    // set locals, only providing error in development
	    res.locals.message = err.message;
	    res.locals.error = req.app.get('env') === 'development' ? err : {};
	    // render the error page
	    res.status(err.status || 500);
	    res.render('error');
	});
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = app;


/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("morgan");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("cookie-parser");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const express = __webpack_require__(3);
	const router = express.Router();
	/* GET home page. */
	router.get('/', (req, res, next) => {
	    res.render('index', { title: 'Express' });
	});
	exports.index = router;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var express = __webpack_require__(3);
	var router = express.Router();
	/* GET users listing. */
	router.get('/', function (req, res, next) {
	    res.send('respond with a resource');
	});
	exports.users = router;


/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("debug");

/***/ }
/******/ ]);