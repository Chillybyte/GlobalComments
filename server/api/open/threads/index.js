var express = require("express"),
    router = express.Router();

router.route("/:reference")
    .get(require("./GET.js"));

module.exports = router;