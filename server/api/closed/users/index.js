var express = require("express"),
    router = express.Router();

router.route("/:user_id")
    .get(require("./GET.js"));

module.exports = router;