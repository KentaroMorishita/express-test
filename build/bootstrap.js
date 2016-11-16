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
	const debug = __webpack_require__(16)('express-test:server');
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
	const posts_1 = __webpack_require__(15);
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
	var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments)).next());
	    });
	};
	const express = __webpack_require__(3);
	const models_1 = __webpack_require__(11);
	/**
	 * ユーザーコントローラー
	 *
	 * @class Users
	 */
	class Users {
	}
	/**
	 * 一覧
	 *
	 * @static
	 * @type {express.RequestHandler}
	 * @memberOf Users
	 */
	Users.index = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
	    try {
	        res.send(yield models_1.db.User.findAll());
	    }
	    catch (err) {
	        next(err);
	    }
	});
	/**
	 * 新規登録
	 *
	 * @static
	 * @type {express.RequestHandler}
	 * @memberOf Users
	 */
	Users.new = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
	    const t = yield models_1.sequelize.transaction();
	    try {
	        const data = yield models_1.db.User.create(req.params, { transaction: t });
	        t.commit();
	        res.send(data);
	    }
	    catch (err) {
	        t.rollback();
	        next(err);
	    }
	});
	/**
	 * ルーティング
	 */
	const router = express.Router();
	router.get('/', Users.index);
	router.get('/new/:name/:email', Users.new);
	exports.users = router;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const Sequelize = __webpack_require__(12);
	const user_1 = __webpack_require__(13);
	const post_1 = __webpack_require__(14);
	exports.sequelize = new Sequelize(process.env.DB_NAME || 'express_db', process.env.DB_USER || 'root', process.env.DB_PASS || 'mysql', {
	    host: '172.17.8.101',
	    dialect: 'mysql',
	    pool: {
	        max: 5,
	        min: 0,
	        idle: 10000
	    }
	});
	exports.db = {
	    User: user_1.default.define(exports.sequelize),
	    Post: post_1.default.define(exports.sequelize)
	};


/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("sequelize");

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const Sequelize = __webpack_require__(12);
	var ModelUser;
	(function (ModelUser) {
	    function define(sequelize) {
	        const Model = sequelize.define('users', {
	            id: {
	                type: Sequelize.UUID,
	                autoIncrement: true,
	                allowNull: false,
	                primaryKey: true
	            },
	            name: Sequelize.STRING(255),
	            email: Sequelize.STRING(255)
	        }, {
	            tableName: 'users',
	            timestamps: true,
	            createdAt: "created_at",
	            updatedAt: "updated_at"
	        });
	        return Model;
	    }
	    ModelUser.define = define;
	})(ModelUser = exports.ModelUser || (exports.ModelUser = {}));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = ModelUser;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const Sequelize = __webpack_require__(12);
	var ModelPost;
	(function (ModelPost) {
	    function define(sequelize) {
	        const Model = sequelize.define('posts', {
	            id: {
	                type: Sequelize.UUID,
	                autoIncrement: true,
	                allowNull: false,
	                primaryKey: true
	            },
	            title: Sequelize.STRING(255),
	            body: Sequelize.TEXT
	        }, {
	            tableName: 'posts',
	            timestamps: true,
	            createdAt: "created_at",
	            updatedAt: "updated_at"
	        });
	        return Model;
	    }
	    ModelPost.define = define;
	})(ModelPost = exports.ModelPost || (exports.ModelPost = {}));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = ModelPost;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments)).next());
	    });
	};
	const express = __webpack_require__(3);
	const models_1 = __webpack_require__(11);
	/**
	 * 投稿コントローラー
	 *
	 * @class Posts
	 */
	class Posts {
	}
	/**
	 * 一覧表示
	 *
	 * @static
	 * @type {express.RequestHandler}
	 * @memberOf Posts
	 */
	Posts.index = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
	    try {
	        const data = yield models_1.db.Post.findAll();
	        res.render('posts/index', { posts: data });
	    }
	    catch (err) {
	        next(err);
	    }
	});
	/**
	 * 詳細
	 *
	 * @static
	 * @type {express.RequestHandler}
	 * @memberOf Posts
	 */
	Posts.show = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
	    try {
	        const data = yield models_1.db.Post.findById(req.params.id);
	        res.render('posts/show', { post: data });
	    }
	    catch (err) {
	        next(err);
	    }
	});
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
	Posts.edit = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
	    try {
	        const data = yield models_1.db.Post.findById(req.params.id);
	        res.render('posts/edit', { post: data });
	    }
	    catch (err) {
	        next(err);
	    }
	});
	/**
	 * 新規作成処理
	 *
	 * @static
	 * @type {express.RequestHandler}
	 * @memberOf Posts
	 */
	Posts.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
	    const t = yield models_1.sequelize.transaction();
	    try {
	        yield models_1.db.Post.create(req.body, { transaction: t });
	        t.commit();
	        res.redirect('/posts/');
	    }
	    catch (err) {
	        t.rollback();
	        next(err);
	    }
	});
	/**
	 * 編集処理
	 *
	 * @static
	 * @type {express.RequestHandler}
	 * @memberOf Posts
	 */
	Posts.update = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
	    const t = yield models_1.sequelize.transaction();
	    try {
	        const data = yield models_1.db.Post.findById(parseInt(req.body.id));
	        yield data.update(req.body, { transaction: t });
	        t.commit();
	        res.redirect('/posts/');
	    }
	    catch (err) {
	        t.rollback();
	        next(err);
	    }
	});
	/**
	 * 削除処理
	 *
	 * @static
	 * @type {express.RequestHandler}
	 * @memberOf Posts
	 */
	Posts.destroy = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
	    const t = yield models_1.sequelize.transaction();
	    try {
	        const data = yield models_1.db.Post.findById(parseInt(req.body.id));
	        yield data.destroy({ transaction: t });
	        t.commit();
	        res.redirect('/posts/');
	    }
	    catch (err) {
	        t.rollback();
	        next(err);
	    }
	});
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
/* 16 */
/***/ function(module, exports) {

	module.exports = require("debug");

/***/ }
/******/ ]);