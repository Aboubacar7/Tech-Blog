const User= require ('./user');
const Post= require ('./post');
const Comment= require ('./comment');

User.hasMany(Post, {
    foreignKey: 'user_id',
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Comment.belongsToMany(Post, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
});

module.exports= {User, Post, Comment};