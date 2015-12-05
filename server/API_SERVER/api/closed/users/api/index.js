var express = require("express"),
    router = express.Router();

router.route("/:user_id")
    .post(require("./POST.js"));

module.exports = router;