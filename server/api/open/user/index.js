/*_ASSIGN_ MSN*/
var express = require("express"),
    router = express.Router();

router.route("/")
    .get(require("./GET.js"))
    .post(require("./POST.js"));

module.exports = router;