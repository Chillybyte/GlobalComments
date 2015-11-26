var express = require("express"),
    router = express.Router();

router.route("/:query")
    .get(require("./GET.js"));

module.exports = router;