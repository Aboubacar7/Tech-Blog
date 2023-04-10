const router = require('express').Router();
const { User, Comment, Post } = require('../models');
const withAuth = require('../utils/auth');
const { route } = require('./api');

router.get('/', withAuth,  async (req, res) => {
    try {
        res.render('dashboard', {
            isdashboard: true,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/post/:id', async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['title', 'body'],
          },
        ],
      });
  
      const posts = postData.get({ plain: true });
  
      res.render('edit', {
        posts: posts,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router