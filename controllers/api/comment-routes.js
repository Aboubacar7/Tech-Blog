const router = require('express').Router();
const { Post, User } = require('../../models');

router.get('/newcomment',  async (req, res) => {
    try {
        res.render('add-comment');
        
    } catch (err) {
        res.status(500).json(err);
    }
});