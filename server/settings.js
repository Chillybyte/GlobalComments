var path = require("path");

// Global variables.
process.env.APP_CLIENT_FOLDER                   = path.join(__dirname, "../web/dist");
process.env.APP_SCHEMA_USER                     = path.join(__dirname, "./schemas/user.js");


//LIB EXPRESS
process.env.APP_LIB_EXPRESS_RESPONSE            = path.join(__dirname, "./lib/express/response.js");
process.env.APP_LIB_EXPRESS_IS_AUTHENTICATED    = path.join(__dirname, "./lib/express/is_authenticated.js");