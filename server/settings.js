/*_ASSIGN_ MSN*/
var path = require("path");

// Global variables.
process.env.APP_CLIENT_FOLDER                   = path.join(__dirname, "../web/dist");
process.env.APP_SCHEMA_USER                     = path.join(__dirname, "./schemas/user.js");
process.env.APP_SCHEMA_THREAD_COMMENT 			= path.join(__dirname, "./schemas/thread_comment.js");
process.env.APP_SCHEMA_MESSAGE 					= path.join(__dirname, "./schemas/message.js");
process.env.APP_SCHEMA_FRIEND 					= path.join(__dirname, "./schemas/friend.js");
process.env.APP_SCHEMA_THREAD_CHAT 				= path.join(__dirname, "./schemas/thread_chat.js");


//LIB EXPRESS
process.env.APP_LIB_EXPRESS_RESPONSE            = path.join(__dirname, "./lib/express/response.js");
process.env.APP_LIB_EXPRESS_IS_AUTHENTICATED    = path.join(__dirname, "./lib/express/is_authenticated.js");

//SOCKET
process.env.APP_SOCKET 							= path.join(__dirname, "./socket.js");