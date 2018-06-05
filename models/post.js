const mongoose= require('mongoose');

const PostSchema = new mongoose.Schema({
	title: {
		type: String, 
		unique: true, 
		required: true, 
		trim: true
	}, 
	categories: {
		type: String, 
		unique: true, 
		required: true, 
		trim: true
	}, 
	content: {
		type: String, 
		unique: true, 
		required: true, 
		trim: true
	}
});

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;