const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model { }

Post.init(
    {
        
        title: DataTypes.STRING,
        body: DataTypes.STRING,
        create_0n: DataTypes.DATE,

       
    },
    
    {
        sequelize
    }
)

module.exports = Post;