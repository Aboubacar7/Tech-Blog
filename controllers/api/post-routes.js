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

router.get('/post', async (req, res) => {
    try {
        res.render('post');

    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/comment/:postid', async (req, res) => {
    try {
        console.log(req.body.body)
        console.log(req.body.user_id)
        const commentData = await Comment.create({ body: req.body.body, user_id: req.body.user_id, post_id: req.body.postid   })
        // const postsComment = commentData.get({ plain: true });
        res.status(200).json(commentData)

        // res.render('post', {
        //     postsComment: postsComment
        // })
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

        const commentData = await Comment.findAll(req.body,{
             where: {
                 id: req.params.id
             }
        });
        console.log(posts)
        console.log(commentData)
        res.render('post', {
            posts: posts, comments:commentData
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