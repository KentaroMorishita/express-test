import * as express from 'express';
import { connection } from '../db';

/**
 * 投稿インターフェイス
 * 
 * @interface Post
 */
interface Post {
  id?: number,
  title?: string,
  body?: string
}

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
   * @type {Array<Post>}
   * @memberOf Posts
   */
  public static posts: Array<Post> = [];

  /**
   * 初期データ取得
   * 
   * @static
   * 
   * @memberOf Posts
   */
  public static initialize() {
    connection.query("select * from posts", (err, rows) => {
      Posts.posts = rows;
    });
  }

  /**
   * 一覧表示
   * 
   * @static
   * @type {express.RequestHandler}
   * @memberOf Posts
   */
  public static index: express.RequestHandler = (req, res, next): any => {
    res.render('posts/index', { posts: Posts.posts });
  };

  /**
   * 詳細
   * 
   * @static
   * @type {express.RequestHandler}
   * @memberOf Posts
   */
  public static show: express.RequestHandler = (req, res, next): any => {
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
  public static new: express.RequestHandler = (req, res, next): any => {
    res.render('posts/new', {});
  };

  /**
   * 編集
   * 
   * @static
   * @type {express.RequestHandler}
   * @memberOf Posts
   */
  public static edit: express.RequestHandler = (req, res, next): any => {
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
  public static create: express.RequestHandler = (req, res, next): any => {
    const post: Post = Object.assign({}, req.body);
    connection.query("insert into posts set ?", post, (err, results) => {
      if (err) throw err;
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
  public static update: express.RequestHandler = (req, res, next): any => {
    const post: Post = Object.assign({}, req.body);
    connection.query("update posts set ? where ?", [post, { id: post.id }], (err, result) => {
      if (err) throw err;
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
  public static destroy: express.RequestHandler = (req, res, next): any => {
    connection.query("delete from posts where ?", { id: req.body.id }, (err, result) => {
      console.log(result);
      if (err) throw err;
      Posts.posts = Posts.posts.filter((v, i) => {
        return v.id !== parseInt(req.body.id)
      });
    });

    res.redirect('/posts/');
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
