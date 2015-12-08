/*_ASSIGN_ ET; RE; MSN*/
var express = require("express"),
    router = express.Router();

router.use("/comment", require("./comment"));
router.use("/thread_comment", require("./thread_comment"));
router.use("/thread_chat", require("./thread_chat"));
router.use("/friends", require("./friends"));
router.use("/users", require("./users"));

module.exports = router;