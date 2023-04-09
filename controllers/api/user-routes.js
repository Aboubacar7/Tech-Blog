const router = require('express').Router();
const {User} = require('../../models')

router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    })
    .then(userData => {
        req.session.save(() => {
            req.session.user_id = userData.id
            req.session.username = userData.username
            req.session.loggedIn = true
            
            res.json(userData)
        })
    })
})

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });
  
module.exports = router