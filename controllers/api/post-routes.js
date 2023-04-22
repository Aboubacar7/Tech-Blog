const router = require('express').Router()
const { Post, User,Comment } = require('../../models')


// router.get('/newpost', async (req, res) => {
//     try {
//         res.render('add-post', {

//         });

//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// router.get('/editpost', async (req, res) => {
//     try {
//         res.render('edit');

//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

router.post('/comment/', async (req, res) => {
    try {
        console.log(req.body.body)
        console.log(req.session.user_id)
        const commentData = await Comment.create({ body: req.body.body, user_id: req.session.user_id })
        const postsComment = commentData.get({ plain: true });
        res.status(200).json(commentData)

        res.render('post', {
            postsComment: postsComment
        })
    }
    catch (err) {
        res.status(500).json(err)
    }
})

router.get('/comment/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                },
            ],
        });

        const posts = postData.get({ plain: true });
        console.log(posts)
        res.render('post', {
            posts: posts
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const dbPostData = await Post.create({
            title: req.body.title,
            body: req.body.body,
            user_id: req.session.user_id
        });
        res.status(200).json(dbPostData)

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.put('/:id', async (req, res) => {
    console.log(req.params.id)
    console.log(req.body)
    try {
        await Post.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        res.status(200).end()
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
})

router.delete('/:id', async (req, res) => {
    // delete one product by its `id` value
    console.log("DELETED ID", req.params.id)
    try {
        const PostData = await Post.destroy({
            where: {
                id: req.params.id,
            },
        })
        res.status(200).json(PostData);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router