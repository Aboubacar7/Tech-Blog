const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model { }

Post.init(
    {
        
        title: DataTypes.STRING,
        body: DataTypes.STRING,
        create_0n: DataTypes.DATE,

        // user_id: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //       model: 'user',
        //       key: 'id',
        //     },
        //   },
    },
    
    {
        sequelize
    }
)

module.exports = Post;