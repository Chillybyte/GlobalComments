/*_ASSIGN_ ET*/
var express = require("express"),
    router = express.Router();

router.route("/:thread_id")
    .post(require("./POST.js"))
    .get(require("./GET.js"));

module.exports = router;