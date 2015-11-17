var path = require("path");

// Global variables.
process.env.APP_CLIENT_FOLDER = path.join(__dirname, "../web/dist");
process.env.APP_DB_USERS = path.join(__dirname, "./schemas/user.js");