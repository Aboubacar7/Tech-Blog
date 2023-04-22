const router = require('express').Router();
const {User} = require('../../models')

router.post('/signup', (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    })
    .then(userData => {
        req.session.save(() => {
            req.session.user_id = userData.id
            req.session.username = userData.username
            req.session.logged_In = true
            
            res.json(userData)
        })
    })
})
router.post('/login', async (req, res) => {
  
    try {
      const dbUserData = await User.findOne({
        where: {
          username: req.body.username,
        },
      });
  
      if (!dbUserData) {
        console.log('user not found')
        res
          .status(400)
          .json({ message: 'Incorrect username or password. Please try again!' });
        return;
      }
      console.log(req.body.password)
      const validPassword = await dbUserData.checkPassword(req.body.password);
  
      if (!validPassword) {
        console.log('password incorect')
        res
          .status(400)
          .json({ message: 'Incorrect username or password. Please try again!' });
        return;
      }
      console.log('login correct')
      req.session.save(() => {
        req.session.logged_In = true;
        console.log(
          '🚀 ~ file: user-routes.js ~ line 57 ~ req.session.save ~ req.session.cookie',
          req.session.cookie
        );
  
        res
          .status(200)
          .json({ user: dbUserData, message: 'You are now logged in!' });
      });
      
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  
  

router.post('/logout', (req, res) => {
    if (req.session.logged_In) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });
  
module.exports = router