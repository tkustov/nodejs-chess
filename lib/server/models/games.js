var mongoose = require( 'mongoose' );

var gameSchema = new mongoose.Schema({
    chat: { 
    	type : [String], 
    	"default" : [] 
    }
});

module.exports = mongoose.model('Game', gameSchema);