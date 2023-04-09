const router = require('express').Router();
const {User, Comment, Post } = require('../models');
const withAuth = require('../utils/auth')

router.get('/', withAuth, async (req, res) => {
    try {
        const dbUserData = await User.findAll({
            include: [
              {
                model: Post,
                attributes: ['title', 'body', 'create_on'],
              },
            ],
          });
      const posts = dbUserData.map((post) => post.get({ plain: true }));
  
      res.render('all-posts', {
        posts: posts,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
    res.render('login');
  });
  
module.exports = router