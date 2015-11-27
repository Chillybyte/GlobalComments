var mongoose = require("mongoose"),
    Schema = mongoose.Schema;


var friendSchema = new Schema({

    requester: { //ID of user who is requesting the friendship
        type: Schema.Types.ObjectID,
        requried: true,
        unique: false,
        index: true
    },

    requestee: { //ID of user who is being requested to start new friendship
        type: Schema.Types.ObjectID,
        requried: true,
        unique: false,
        index: true
    },

    requesterrequestee: { //Qualifies as unique identified to avoid duplicates in the database
        type: Schema.Types.ObjectID,
        requried: true,
        unique: true,
        index: true
    },

    friendship: { //Meta data about the friendship
        accepted: { //Has the friendship been accepted?
            type: Boolean,
            required: false,
            unique: false,
            default: false
        },
        requested_at: { //When was the friendship requested?
            type: Date,
            required: false,
            unique: false,
            default: Date.now
        },
        accepted_at: { //When was the friendship accepted? if requested_at === accepted_at then no answer has been given
            type: Date,
            required: false,
            unique: false,
            default: Date.now
        }
    },

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

module.exports = mongoose.model("friend", friendSchema);