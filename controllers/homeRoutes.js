const router = require('express').Router();
const { User, Comment, Post } = require('../models');
const withAuth = require('../utils/auth')

router.get('/', async (req, res) => {
  try {
    const dbpostData = await Post.findAll( {
      include: [
        { 
          model: User,
          attributes: ['id', 'username'],
        },
      ],
    });
    const posts = dbpostData.map((post) => post.get({ plain: true }));
console.log(posts)
    res.render('all-posts', {
      posts: posts,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/comment/:id', async (req, res) => {
  try {
      const commentData = await Comment.findByPk(req.params.id, {
          include: [
              {
                  model: User,
                  attributes: ['id', 'username'],
              },
          ],
      });

      const comments = commentData.get({ plain: true });
console.log(comments)
      res.render('edit-comment', {
        comments: comments,
      });
  } catch (err) {
      res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_In) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.logged_In) {
    res.redirect('/dashboard');
    return;
  }
  res.render('signup');
});

module.exports = router