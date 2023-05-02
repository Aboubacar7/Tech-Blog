const router = require('express').Router();
const { User, Comment, Post } = require('../models');
const withAuth = require('../utils/auth');
const { route } = require('./api');

// router.get('/', withAuth,  async (req, res) => {
//     try {
//         res.render('dashboard', {
//             isdashboard: true,
//             logged_In: req.session.logged_In,
//         });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

router.get('/', withAuth, async (req, res) => {
    try {
        const dbpostData = await Post.findAll
        ({
            where: {
                user_id: req.session.user_id
            },
            include: [
                User
            ],
        });
        const posts = dbpostData.map((post) => post.get({ plain: true }));

        res.render('all-post-admin', {
            layout: "dashboard",
            posts
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/new', withAuth, (req, res) => {
    res.render("add-post", {
        layout: "dashboard"
    })
})


router.get('/edit/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                },
            ],
        });

        const posts = postData.get({ plain: true });

        res.render('edit', {
            posts: posts,
            layout: "dashboard"
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router