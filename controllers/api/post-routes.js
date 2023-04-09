const router = require('express').Router()
const {Post} = require('../../models')



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
  
  

module.exports = router