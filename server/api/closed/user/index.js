var express = require("express"),
    router = express.Router();

router.route("/:user_id")
    .put(require("./PUT.js"));

module.exports = router;