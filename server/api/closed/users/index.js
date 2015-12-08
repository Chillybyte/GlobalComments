/*_ASSIGN_ ET*/
var express = require("express"),
    router = express.Router();

router.route("/:user_id")
    .get(require("./GET.js"))
    .put(require("./PUT.js"));


module.exports = router;