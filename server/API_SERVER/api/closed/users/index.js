var express = require("express"),
    router = express.Router();

router.use("/api/", require("./api"));
router.route("/:user_id")
    .get(require("./GET.js"))
    .put(require("./PUT.js"));


module.exports = router;