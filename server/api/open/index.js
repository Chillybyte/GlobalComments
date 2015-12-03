var express = require("express"),
    router = express.Router();

router.use("/thread_comment", require("./thread_comment"));
router.use("/user", require("./user"));

module.exports = router;