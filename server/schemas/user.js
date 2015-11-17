var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    mailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

var userSchema = new Schema({

    first_name: {
        type: String,
        required: true,
        unique: false,
        index: true
    },

    last_name: {
        type: String,
        required: true,
        unique: false,
        index: true
    },

    username: {
        type: String,
        required: true,
        unique: false,
        index: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
        set: function(email) {
            if (mailPattern.test(email)) return email;
            return "";
        }
    },

    password: {
        type: String,
        required: true,
        unique: false,
        index: false

    },

    is_admin: {
        type: Boolean,
        required: false,
        unique: false,
        index: true
    },

    updated_at: {
        type: Date,
        required: true,
        unique: false,
        index: true
    },

    created_at: {
        type: Date,
        required: true,
        unique: false,
        index: true
    }
});

module.exports = mongoose.model("user", userSchema);