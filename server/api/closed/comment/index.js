var express = require("express"),
    router = express.Router();

router.route("/:delete")
	.delete(require("./DELETE.js"));

module.exports = router;