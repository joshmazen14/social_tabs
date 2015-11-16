var mongoose = require('mongoose');

var noteSchema = new mongoose.Schema({
	1: {
		type: Number
	},
	2: {
		type: Number
	},
	3: {
		type: Number
	},
	4: {
		type: Number
	},
	5: {
		type: Number
	},
	6: {
		type: Number
	},
	rest: {
		type: Boolean
	},
	duration: {
		type: Number
	}
})

var tabSchema = new mongoose.Schema({
	title: {
		type: String
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	notes: [noteSchema]
})

mongoose.model('Tablature', tabSchema)