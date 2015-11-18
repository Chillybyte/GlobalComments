var express = require("express"),
    router  = express.Router();
    
    router.use("/user", require("./user"));
    
module.exports = router;