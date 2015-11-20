var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    sha3 = require("sha3"),
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
            unique: true,
            index: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            index: true,
            set: function(email) {
                if (mailPattern.test(email))
                    return email;
                return "";
            }
        },

        password: {
            type: String,
            required: true,
            unique: false,
            index: false
        },

        updated_at: {
            type: Date,
            required: true,
            unique: false,
            index: true,
            default: Date.now
        },

        created_at: {
            type: Date,
            required: true,
            unique: false,
            index: true,
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
    })
    .set("toJSON", {
        getters: true,
        transform: function(doc, ret, options) {
            //Values that should not be sent to client
            delete ret.password; //Sensitive information that could land in the wrong hands
            delete ret._id;
            delete ret.__v;
        }
    });



/**
 * Method to verify and set password at the same time.
 *
 * callback: Function with an err string if something is wrong otherwise all is good
 */
userSchema.methods.verify_password = function(password, confirm_password, callback) {
    //Password either not set or too short
    if (!password || password.length < 6) {
        callback("Password is too short");
    }
    //Confirm password either not set or does not match password
    else if (!confirm_password || password !== confirm_password) {
        callback("Password do not match");
    } else {
        //Success - Setting password automatically with encryption
        this.password = password;
        callback();
    }
};

userSchema.methods.encrypt_password = function(password) {
    var value_hash = new sha3.SHA3Hash();
    value_hash.update(password);
    return value_hash.digest("hex");
};

userSchema.methods.compare_password = function(password) {
    var value_hash = new sha3.SHA3Hash();
    value_hash.update(password);
    return value_hash.digest("hex") === this.get("password");
}


/**
 * Setting message for empty report
 */
userSchema.paths.email.validators[0].message = "'' in an invalid e-mail";


module.exports = mongoose.model("user", userSchema);