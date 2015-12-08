/*_ASSIGN_ RE*/
var express = require("express"),
    router = express.Router();

router.route("/:query")
    .get(require("./GET.js"))
    .post(require("./POST.js"))
    .delete(require("./DELETE.js"));

module.exports = router;