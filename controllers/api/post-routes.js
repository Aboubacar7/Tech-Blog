const router = require('express').Router()
const { Post, User,Comment } = require('../../models')
const withAuth = require('../../utils/auth')

/* Get comments route*/
router.get('/post', async (req, res) => {
    try {
        res.render('post');

    } catch (err) {
        res.status(500).json(err);
    }
});
 

/* Create post*/
router.post('/', withAuth, async (req, res) => {
    console.log(req.session)
    try {
        const dbPostData = await Post.create({
            title: req.body.title,
            body: req.body.body,
            user_id: req.session.user_id
        });
        res.status(200).json(dbPostData)
        console.log(dbPostData)

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

/* Edit Post*/
router.put('/:id', withAuth, async (req, res) => {
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
/* Delete Post*/
router.delete('/:id', withAuth, async (req, res) => {
    
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


/* comment route*/

/* Create new comment route*/
router.post('/comment/:postid', withAuth, async (req, res) => {
    try {
        console.log("body ------------------",req.body.body)
        console.log("user ------------------",req.session.user )
const userData = await User.findByPk(req.session.user_id)
console.log(userData)
        const commentData = await Comment.create({ body: req.body.body, post_id: req.body.postId, user_id: req.session.user_id, username: userData.username })
        res.status(200).json(commentData)
    }
    catch (err) {
        res.status(500).json(err)
    }
})

/* Get commment by post_id route*/
router.get('/comment/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                },
                {
                    model: Comment,
                },
            ],
        });
        const posts = postData.get({ plain: true });

        console.log(posts)
        res.render('post', {
            posts
        });
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router