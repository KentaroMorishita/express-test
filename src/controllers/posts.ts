import * as express from 'express';
import { db, sequelize } from '../models';
import ModelPost from '../models/post';

/**
 * 投稿コントローラー
 * 
 * @class Posts
 */
class Posts {

  /**
   * 一覧表示
   * 
   * @static
   * @type {express.RequestHandler}
   * @memberOf Posts
   */
  public static index: express.RequestHandler = (req, res, next) => {
    db.Post.findAll()
      .then(data => res.render('posts/index', { posts: data }))
      .catch(err => next(err));
  };

  /**
   * 詳細
   * 
   * @static
   * @type {express.RequestHandler}
   * @memberOf Posts
   */
  public static show: express.RequestHandler = (req, res, next) => {
    db.Post.findById(req.params.id)
      .then(data => res.render('posts/show', { post: data }))
      .catch(err => next(err));
  };

  /**
   * 新規作成
   * 
   * @static
   * @type {express.RequestHandler}
   * @memberOf Posts
   */
  public static new: express.RequestHandler = (req, res, next) => {
    res.render('posts/new', {});
  };

  /**
   * 編集
   * 
   * @static
   * @type {express.RequestHandler}
   * @memberOf Posts
   */
  public static edit: express.RequestHandler = (req, res, next) => {
    db.Post.findById(req.params.id)
      .then(data => res.render('posts/edit', { post: data }))
      .catch(err => next(err));
  };

  /**
   * 新規作成処理
   * 
   * @static
   * @type {express.RequestHandler}
   * @memberOf Posts
   */
  public static create: express.RequestHandler = (req, res, next) => {
    db.Post.create(req.body)
      .then(() => res.redirect('/posts/'))
      .catch(err => next(err));
  };

  /**
   * 編集処理
   * 
   * @static
   * @type {express.RequestHandler}
   * @memberOf Posts
   */
  public static update: express.RequestHandler = (req, res, next) => {
    db.Post.findById(parseInt(req.body.id))
      .then(data => data.update(req.body))
      .then(() => res.redirect('/posts/'))
      .catch(err => next(err));
  };

  /**
   * 削除処理
   * 
   * @static
   * @type {express.RequestHandler}
   * @memberOf Posts
   */
  public static destroy: express.RequestHandler = (req, res, next) => {
    db.Post.findById(parseInt(req.body.id))
      .then(data => data.destroy())
      .then(() => res.redirect('/posts/'))
      .catch(err => next(err));
  };

}

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

export const posts = router;
