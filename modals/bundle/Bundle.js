let mongoose = require('mongoose')

let BundleScema = mongoose.Scema({
	package : {
		name : {
			type : String,
			required : true
		},
		createdOn : {
			type : Date,
			required : true
		},
		packages : {
			type : mongoose.Scema.Types.ObjectId,
			ref : 'package'
		}
	}
})


module.exports = mongoose.model('bundle' , BundleScema)