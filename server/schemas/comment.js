var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var commentSchema = new Schema({

        reference: {
            type: String,
            required: true,
            unique: false,
            index: true
        },

        user_id: {
            type: String,
            required: true,
            unique: false,
            index: true
        },
        
        content: {
            type: String,
            required: true,
            unique: false,
            index: true
        },

        date_time: {
            creation_time: Date.now();
            required: true,
            unique: false,
            }
        },

    }, {
        strict: true //Only data relevant to this schema is saved
    })


module.exports = mongoose.model("comment", commentSchema);