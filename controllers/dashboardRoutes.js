const router = require('express').Router();
const { User, Comment, Post } = require('../models');
const withAuth = require('../utils/auth');
const { route } = require('./api');

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        res.render('dashboard', {
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router