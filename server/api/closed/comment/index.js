var express = require("express"),
    router = express.Router();

router.route("/:delete/:user")
	.delete(require("./DELETE.js"));

module.exports = router;