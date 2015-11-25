var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var commentSchema = new Schema({

    user: { //Person who wrote content
        type: Schema.Types.ObjectId,
        required: true,
        unique: false,
        index: true
    },

    content: { //Actual message
        type: String,
        required: true,
        unique: false,
        index: true
    },

    created_at: { //Date of created comment
        type: Date,
        required: true,
        unique: false,
        default: Date.now
    }
}, {
    strict: true //Only data relevant to this schema is saved
});


module.exports = mongoose.model("comment", commentSchema);