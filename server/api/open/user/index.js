var express = require("express"),
    router  = express.Router();
    
    router.router("/")
        .get("./GET.js")                //Retreive  information
        .post("./POST.js")              //Create    information
        .put("./PUT.js")                //Replace   document
        .patch("./PATCH.js")            //Update    document
        .delete("./DELETE.js");         //Remove    document
    
module.exports = router;