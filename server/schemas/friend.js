/*_ASSIGN_ RE*/
var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var friendSchema = new Schema({

        /**
         * uniquecombination is a design to prevent duplicates in the database
         * to use it, requester user id must be compared with requestee user id
         * the lowest value with be in front of the highest value and then be merged together
         *
         * Example:
         * requester ID: 123
         * requestee ID: 321
         * uniquecombination: 123321
         *
         * Example2:
         * requester ID: 2123
         * requestee ID: 1123
         * uniquecombination: 11232123
         */
        uniquecombination: {
            type: String,
            required: true,
            unique: true,
            index: false
        },

        requester: { //Person who requested the friendship
            user: { //User ID of the user who requested the friendship
                type: Schema.Types.ObjectId,
                required: true,
                unique: false,
                index: false
            },
            friend: { //User ID of the user who was requested a friendship
                type: Schema.Types.ObjectId,
                required: true,
                unique: false,
                index: false
            },
            accepted: { //Did the friend accept the friendship?
                type: Boolean,
                required: false,
                index: false,
                unique: false,
                default: false
            },
            ignore: { //Did the requester ignore the friendship?
                type: Boolean,
                required: false,
                index: false,
                unique: false,
                default: false
            }
        },

        requestee: { //Person who was requested a friendship
            user: { //User ID of the person who was requested a friendship
                type: Schema.Types.ObjectId,
                required: true,
                unique: false,
                index: false
            },
            friend: { //User ID of the user who requested a friendship
                type: Schema.Types.ObjectId,
                required: true,
                unique: false,
                index: false
            },
            accepted: { //Defaults to true, requester automatically accepts friendship with requestee
                type: Boolean,
                required: false,
                index: false,
                unique: false,
                default: true
            },
            ignore: { //Did the requestee ignore the friendship?
                type: Boolean,
                required: false,
                index: false,
                unique: false,
                default: false
            }
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
    })
    .pre("validate", function(next) {
        if (!this.requester.user) {
            next(new Error("ID of user is missing"));
        } else if (!this.requester.friend) {
            next(new Error("ID of friend is missing"));
        } else if (!this.requestee.user) {
            next(new Error("ID of friend is missing"));
        } else if (!this.requester.friend) {
            next(new Error("ID of user is missing"));
        } else {
            if (this.requester.user.toString() < this.requester.friend.toString())
                this.uniquecombination = this.requester.user.toString() + this.requester.friend.toString();
            else
                this.uniquecombination = this.requester.friend.toString() + this.requester.user.toString();
            next();
        }
    })
    .pre("save", function(next) {
        console.log(this);
        var _now = new Date();
        //On every update, this variable is update to current date
        this.updated_at = _now;
        next();
    });

module.exports = mongoose.model("friend", friendSchema);


/**
 *  Collects a list of a users friends and returns a promise
 *  If the promise is successfull a list of IDs is returned
 *  In case the promise fails nothing is returned
 *
 *  @user_id:   The ID of the user that needs to get a list of his/her
 *              friends
 *
 *  Example:
 *          require("friends.jd").get_id_list_of_fiends(user_id)
 *              .then(function(friend_ids) {
 *                  //Do something with the IDs
 *              })
 *              .catch(function() {
 *                  //Handle the error if needed
 *              });
 */
module.exports.get_id_list_of_fiends = function(user_id) {
    return this.find({
            $and: [{
                $and: [{
                    "requestee.accepted": true
                }, {
                    "requester.accepted": true
                }],
                $or: [{
                    "requester.user": user_id
                }, {
                    "requestee.user": user_id
                }]
            }]
        })
        .then(function(friends) {
            var list = [];
            friends.forEach(function(friend) {
                if (friend.requester.user.toString() === user_id.toString())
                    list.push(friend.requester.friend);
                else {
                    list.push(friend.requestee.friend);
                }
            });
            return list;
        });

};