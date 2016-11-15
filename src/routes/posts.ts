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
   * 投稿データ格納配列
   * 
   * @static
   * @type {Array<ModelPost.PostInstance>}
   * @memberOf Posts
   */
  public static posts: Array<ModelPost.PostInstance> = [];

  /**
   * 初期データ取得
   * 
   * @static
   * 
   * @memberOf Posts
   */
  public static initialize() {
    db.Post.findAll()
      .then(data => Posts.posts = data)
      .catch(err => { throw err });
  }

  /**
   * 一覧表示
   * 
   * @static
   * @type {express.RequestHandler}
   * @memberOf Posts
   */
  public static index: express.RequestHandler = (req, res, next) => {
    res.render('posts/index', { posts: Posts.posts });
  };

  /**
   * 詳細
   * 
   * @static
   * @type {express.RequestHandler}
   * @memberOf Posts
   */
  public static show: express.RequestHandler = (req, res, next) => {
    res.render('posts/show', {
      post: Posts.posts.filter(v => v.id == req.params.id)[0]
    });
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
    res.render('posts/edit', {
      post: Posts.posts.filter(v => v.id == req.params.id)[0],
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
  public static create: express.RequestHandler = (req, res, next) => {
    db.Post.create(req.body)
      .then(data => {
        Posts.posts.push(data);
        res.redirect('/posts/');
      })
      .catch(err => { throw err });
  };

  /**
   * 編集処理
   * 
   * @static
   * @type {express.RequestHandler}
   * @memberOf Posts
   */
  public static update: express.RequestHandler = (req, res, next) => {
    const id = parseInt(req.body.id);
    Posts.posts.filter(v => v.id == id)[0].update(req.body)
      .then(() => res.redirect('/posts/'))
      .catch(err => { throw err });
  };

  /**
   * 削除処理
   * 
   * @static
   * @type {express.RequestHandler}
   * @memberOf Posts
   */
  public static destroy: express.RequestHandler = (req, res, next) => {
    const id = parseInt(req.body.id);
    Posts.posts.filter(v => v.id == id)[0].destroy()
      .then(data => {
        Posts.posts = Posts.posts.filter(v => v.id !== id)
        res.redirect('/posts/');
      })
      .catch(err => { throw err });
  };

}

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

export const posts = router;
