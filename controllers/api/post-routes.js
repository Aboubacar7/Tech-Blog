const router = require('express').Router()
const { Post, User } = require('../../models')



router.post('/', async (req, res) => {
    try {
        const dbPostData = await Post.create({
            title: req.body.title,
            body: req.body.body
        });
        res.status(200).json(dbPostData)
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const dbpostData = await Post.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
    const posts = dbpostData.map((post) => post.get({ plain: true }));
        res.status(200).json(dbpostData);

        res.render('edit')
    } catch (err) {
        res.status(500).json(err);
    }
})


module.exports = router