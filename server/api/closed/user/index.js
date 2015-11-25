var express = require("express"),
    router = express.Router();

router.route("/:user_id")
    .post(require("./PUT.js"));

module.exports = router;