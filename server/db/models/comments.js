var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
	author: {
		type: mongoose.Schema.Types.ObjectId, ref: 'User'
	},
	content: {
		type: String,
		required: true
	},
	date: {
		type: Date
	}
})

mongoose.model('Comment', commentSchema)