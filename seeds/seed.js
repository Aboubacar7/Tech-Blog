const sequelize = require('../config/connection');
const {User, Post, Comment} = require ('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
  
    const users = await User.bulkCreate(userData);
  
    for (const { id } of users) {
      const newPost = await Post.create({
        user_id: id,
      });
    }
  
    for (const comment of postData) {
      const newComment = await Comment.create({
        ...comment,
       user_id: users[Math.floor(Math.random() * users.length)].id,
      });
    }
  
    process.exit(0);
  };
  
  seedDatabase();
  