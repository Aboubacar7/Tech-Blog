const router = require('express').Router();
const { User, Comment, Post } = require('../models');
const withAuth = require('../utils/auth')

router.get('/', async (req, res) => {
  try {
    const dbpostData = await Post.findAll({
      include: [
        User
      ],
    });
    const posts = dbpostData.map((post) => post.get({ plain: true }));

    res.render('all-posts', {
      posts: posts,
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