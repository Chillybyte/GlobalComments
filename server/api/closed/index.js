var express = require("express"),
    router = express.Router();

router.use("/comments", require("./comments"));

module.exports = router;