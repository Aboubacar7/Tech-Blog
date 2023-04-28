const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth')

router.get('/newcomment',  async (req, res) => {
    try {
        res.render('add-comment');
        
    } catch (err) {
        res.status(500).json(err);
    }
});


/* Edit comments route*/
router.put('/:id',withAuth, async (req, res) => {
    console.log(req.params.id)
    console.log(req.body)
    try {
        await Comment.update( 
            {
                body: req.body.content
            },
            { 
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

/* Delete comments route*/
router.delete('/:id', withAuth, async (req, res) => {
    
    console.log("DELETED ID", req.params.id)
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
            },
        })
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});
module.exports = router