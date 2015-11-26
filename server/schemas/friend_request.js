var mongoose = require("mongoose"),
    Schema = mongoose.Schema;


var friendRequestSchema = new Schema({

    user: { //Person who requested a user to be friends
        type: Schema.Types.ObjectId,
        required: true,
        unique: false,
        index: true
    },

    user_requested: { //Person who is requested to be friends
        type: Schema.Types.ObjectId,
        required: true,
        unique: false,
        index: true
    },

    answer: { //Yes i want to be friends = true, no i dont want to be friend false.
        type: boolean,
        required: true,
        unique: false,
        index: false,
        default: false
    },

    answered: { //Have the requested user answered yes or no, or is it still unanswered
        type: boolean,
        required: true,
        unique: false,
        index: false,
        default: false
    },

    created_at: { //Date of created
        type: Date,
        required: true,
        unique: false,
        default: Date.now
    },

    updated_at: { //Date updated at
        type: Date,
        required: true,
        unique: false,
        default: Date.now
    }

}, {
    strict: true //Only data relevant to this schema is saved
}).pre("save", function(next) {
    var _now = new Date();
    //On every update, this variable is update to current date
    this.updated_at = _now;
    next();
});

module.exports = mongoose.model("friend_request", friendRequestSchema);