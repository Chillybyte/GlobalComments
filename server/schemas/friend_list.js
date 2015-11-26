var mongoose = require("mongoose"),
    Schema = mongoose.Schema;


var friend_request = new Schema({

    user: { //The owner of the friend list
        type: Schema.Types.ObjectId,
        required: true,
        unique: false,
        index: true
    },

    users: [{ //Persons who are friends
        type: Schema.Types.ObjectId,
        required: true,
        unique: true,
        index: true
    }],

    created_at: { //Date created
        type: Date,
        required: true,
        unique: false,
        default: Date.now
    },

    updated_at: { //Date updated
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