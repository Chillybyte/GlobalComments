var express = require("express"),
    router = express.Router();

router.use("/comments", require("./comments"));
router.use("/friends", require("./friends"));
router.use("/users", require("./users"));

module.exports = router;