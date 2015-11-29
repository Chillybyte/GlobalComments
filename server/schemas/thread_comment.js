var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    SCHEMA_MESSAGE = require(process.env.APP_SCHEMA_MESSAGE).schema;

var threadCommentSchema = new Schema({

        is_thread_comment: {
            type: Boolean,
            required: true,
            unique: false,
            index: false,
            default: true,
            set: function() {
                return true;
            }
        },

        reference: { //URL to actual content commented on
            type: String,
            required: true,
            unique: true,
            index: true
        },

        users: [{ //Persons who are involved in this thread
            type: Schema.Types.ObjectId,
            required: true,
            unique: true,
            index: true
        }],

        messages: [SCHEMA_MESSAGE],

        created_at: {
            type: Date,
            required: true,
            unique: false,
            default: Date.now
        },

        updated_at: {
            type: Date,
            required: true,
            unique: false,
            default: Date.now
        }

    }, {
        strict: true //Only data relevant to this schema is saved
    })
    .pre("save", function(next) {
        var _now = new Date();
        //On every update, this variable is update to current date
        this.updated_at = _now;
        next();
    });


module.exports = mongoose.model("thread_comment", threadCommentSchema);