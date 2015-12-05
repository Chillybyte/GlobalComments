 var express = require('express');
var router = express.Router();

router.route("/user_online")
    .post(function(request, response) {
    	console.log("!?!?!?!?");
        console.log(request.body);
    	console.log("!?!?!?!?");
    	response.send();
    });
module.exports = router;