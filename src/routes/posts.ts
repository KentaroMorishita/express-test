import * as express from 'express';

interface Post {
  id: number,
  title: string,
  body: string
}

class Posts {
  public static posts: Array<Post> = [
    { id: 0, title: 'title0', body: 'body0' },
    { id: 1, title: 'title1', body: 'body1' },
    { id: 2, title: 'title2', body: 'body2' },
  ];

  public static post_count = Posts.posts.length;

  public static index: express.RequestHandler = (req, res, next): any => {
    res.render('posts/index', { posts: Posts.posts });
  };

  public static show: express.RequestHandler = (req, res, next): any => {
    const post = Posts.posts.filter((v, i) => {
      return v.id == req.params.id;
    })[0];
    res.render('posts/show', { post: post });
  };

  public static new: express.RequestHandler = (req, res, next): any => {
    res.render('posts/new', {});
  };

  public static edit: express.RequestHandler = (req, res, next): any => {
    const post = Posts.posts.filter((v, i) => {
      return v.id == req.params.id;
    })[0];
    res.render('posts/edit', {
      post: post,
      id: req.params.id
    });
  };

  public static create: express.RequestHandler = (req, res, next): any => {
    const post: Post = {
      id: Posts.post_count,
      title: req.body.title,
      body: req.body.body
    };
    Posts.posts.push(post);
    Posts.post_count++;
    res.redirect('/posts/');
  };

  public static update: express.RequestHandler = (req, res, next): any => {
    const post: Post = {
      id: req.body.id,
      title: req.body.title,
      body: req.body.body
    };
    Posts.posts = Posts.posts.map((v, i)=>{
      if(v.id == parseInt(req.params.id)){
        v = post;
      }
      return v;
    });
    res.redirect('/posts/');
  };

  public static destroy: express.RequestHandler = (req, res, next): any => {
    Posts.posts = Posts.posts.filter((v, i) => {
      return v.id !== parseInt(req.params.id)
    });
    res.redirect('/posts/');
  };

}

const router = express.Router();
router.get(['/', '/index'], Posts.index);
router.get('/:id([0-9]+)', Posts.show);
router.get('/new', Posts.new);
router.get('/edit/:id([0-9]+)', Posts.edit);
router.post('/create', Posts.create);
router.put('/:id([0-9]+)', Posts.update);
router.delete('/:id([0-9]+)', Posts.destroy);

export const posts = router;
