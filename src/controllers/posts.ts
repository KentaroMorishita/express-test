import * as express from 'express';
import { db, sequelize } from '../models';

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
  public static index: express.RequestHandler = async (req, res, next) => {
    try {
      const data = await db.Post.findAll();
      res.render('posts/index', { posts: data });
    } catch (err) {
      next(err);
    }
  };

  /**
   * 詳細
   * 
   * @static
   * @type {express.RequestHandler}
   * @memberOf Posts
   */
  public static show: express.RequestHandler = async (req, res, next) => {
    try {
      const data = await db.Post.findById(req.params.id);
      res.render('posts/show', { post: data });
    } catch (err) {
      next(err);
    }
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
  public static edit: express.RequestHandler = async (req, res, next) => {
    try {
      const data = await db.Post.findById(req.params.id);
      res.render('posts/edit', { post: data });
    } catch (err) {
      next(err);
    }
  };

  /**
   * 新規作成処理
   * 
   * @static
   * @type {express.RequestHandler}
   * @memberOf Posts
   */
  public static create: express.RequestHandler = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
      await db.Post.create(req.body, { transaction: t });
      t.commit();
      res.redirect('/posts/');
    } catch (err) {
      t.rollback();
      next(err);
    }
  };

  /**
   * 編集処理
   * 
   * @static
   * @type {express.RequestHandler}
   * @memberOf Posts
   */
  public static update: express.RequestHandler = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
      const data = await db.Post.findById(parseInt(req.body.id));
      await data.update(req.body, { transaction: t });
      t.commit();
      res.redirect('/posts/');
    } catch (err) {
      t.rollback();
      next(err);
    }
  };

  /**
   * 削除処理
   * 
   * @static
   * @type {express.RequestHandler}
   * @memberOf Posts
   */
  public static destroy: express.RequestHandler = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
      const data = await db.Post.findById(parseInt(req.body.id));
      await data.destroy({ transaction: t });
      t.commit();
      res.redirect('/posts/');
    } catch (err) {
      t.rollback();
      next(err);
    }
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
