var express = require("express"),
    router = express.Router();

router.use("/comments", require("./comments"));
router.use("/user", require("./user"));

module.exports = router;