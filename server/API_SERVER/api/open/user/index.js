var express = require("express"),
    router  = express.Router();
    
    router.route("/")
        .get(require("./GET.js"))                //Retreive  information
        .post(require("./POST.js"))              //Create    information
  //      .put("./PUT.js")                //Replace   document
    //    .patch("./PATCH.js")            //Update    document
      //  .delete("./DELETE.js");         //Remove    document
    
module.exports = router;