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
	const debug = __webpack_require__(14)('express-test:server');
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
	const path = __webpack_require__(4);
	const logger = __webpack_require__(5);
	const methodOverride = __webpack_require__(6);
	const cookieParser = __webpack_require__(7);
	const bodyParser = __webpack_require__(8);
	const index_1 = __webpack_require__(9);
	const users_1 = __webpack_require__(10);
	const posts_1 = __webpack_require__(13);
	const app = express();
	app.set('env', process.env.NODE_ENV || 'development');
	// view engine setup
	app.set('views', path.resolve('views'));
	app.set('view engine', 'pug');
	// uncomment after placing your favicon in /public
	//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
	app.use(logger('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(methodOverride('_method'));
	app.use(cookieParser());
	app.use(express.static(path.resolve('public')));
	app.use('/', index_1.index);
	app.use('/users', users_1.users);
	app.use('/posts', posts_1.posts);
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

	module.exports = require("path");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("morgan");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("method-override");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("cookie-parser");

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 9 */
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const express = __webpack_require__(3);
	const db_1 = __webpack_require__(11);
	const router = express.Router();
	/* GET users listing. */
	router.get('/', (req, res, next) => {
	    db_1.connection.query("select * from users where email LIKE ?", ["%gmail%"], (err, rows) => {
	        console.log(rows);
	        res.send(rows);
	    });
	});
	exports.users = router;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const mysql = __webpack_require__(12);
	exports.connection = mysql.createConnection({
	    host: process.env.DB_HOST || '172.17.8.101',
	    user: process.env.DB_USER || 'root',
	    password: process.env.DB_PASS || 'mysql',
	    database: process.env.DB_NAME || 'express_db'
	});


/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("mysql");

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const express = __webpack_require__(3);
	const db_1 = __webpack_require__(11);
	/**
	 * 投稿コントローラー
	 *
	 * @class Posts
	 */
	class Posts {
	    /**
	     * 初期データ取得
	     *
	     * @static
	     *
	     * @memberOf Posts
	     */
	    static initialize() {
	        db_1.connection.query("select * from posts", (err, rows) => {
	            Posts.posts = rows;
	        });
	    }
	}
	/**
	 * 投稿データ格納配列
	 *
	 * @static
	 * @type {Array<Post>}
	 * @memberOf Posts
	 */
	Posts.posts = [];
	/**
	 * 一覧表示
	 *
	 * @static
	 * @type {express.RequestHandler}
	 * @memberOf Posts
	 */
	Posts.index = (req, res, next) => {
	    res.render('posts/index', { posts: Posts.posts });
	};
	/**
	 * 詳細
	 *
	 * @static
	 * @type {express.RequestHandler}
	 * @memberOf Posts
	 */
	Posts.show = (req, res, next) => {
	    const post = Posts.posts.filter((v, i) => {
	        return v.id == req.params.id;
	    })[0];
	    res.render('posts/show', { post: post });
	};
	/**
	 * 新規作成
	 *
	 * @static
	 * @type {express.RequestHandler}
	 * @memberOf Posts
	 */
	Posts.new = (req, res, next) => {
	    res.render('posts/new', {});
	};
	/**
	 * 編集
	 *
	 * @static
	 * @type {express.RequestHandler}
	 * @memberOf Posts
	 */
	Posts.edit = (req, res, next) => {
	    const post = Posts.posts.filter((v, i) => {
	        return v.id == req.params.id;
	    })[0];
	    res.render('posts/edit', {
	        post: post,
	        id: req.params.id
	    });
	};
	/**
	 * 新規作成処理
	 *
	 * @static
	 * @type {express.RequestHandler}
	 * @memberOf Posts
	 */
	Posts.create = (req, res, next) => {
	    const post = Object.assign({}, req.body);
	    db_1.connection.query("insert into posts set ?", post, (err, results) => {
	        if (err)
	            throw err;
	        Posts.posts.push(Object.assign(post, { id: results.insertId }));
	    });
	    res.redirect('/posts/');
	};
	/**
	 * 編集処理
	 *
	 * @static
	 * @type {express.RequestHandler}
	 * @memberOf Posts
	 */
	Posts.update = (req, res, next) => {
	    const post = Object.assign({}, req.body);
	    db_1.connection.query("update posts set ? where ?", [post, { id: post.id }], (err, result) => {
	        if (err)
	            throw err;
	        Posts.posts = Posts.posts.map((v, i) => {
	            if (v.id == parseInt(req.params.id)) {
	                v = post;
	            }
	            return v;
	        });
	    });
	    res.redirect('/posts/');
	};
	/**
	 * 削除処理
	 *
	 * @static
	 * @type {express.RequestHandler}
	 * @memberOf Posts
	 */
	Posts.destroy = (req, res, next) => {
	    db_1.connection.query("delete from posts where ?", { id: req.body.id }, (err, result) => {
	        console.log(result);
	        if (err)
	            throw err;
	        Posts.posts = Posts.posts.filter((v, i) => {
	            return v.id !== parseInt(req.body.id);
	        });
	    });
	    res.redirect('/posts/');
	};
	Posts.initialize();
	/**
	 * ルーティング
	 */
	const router = express.Router();
	router.get(['/', '/index'], Posts.index);
	router.get('/:id([0-9]+)', Posts.show);
	router.get('/new', Posts.new);
	router.get('/edit/:id([0-9]+)', Posts.edit);
	router.post('/create', Posts.create);
	router.put('/:id([0-9]+)', Posts.update);
	router.delete('/:id([0-9]+)', Posts.destroy);
	exports.posts = router;


/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = require("debug");

/***/ }
/******/ ]);