/*_ASSIGN_ MSN*/
var express = require("express"),
    router = express.Router();

router.route("/:reference")
    .post(require("./POST.js"));

module.exports = router;