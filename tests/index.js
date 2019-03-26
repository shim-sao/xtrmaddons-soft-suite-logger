// Import external modules.
require("module-alias/register");

// Initialize process environment, comment/uncomment the desired value.
// Need to be defined first. Otherwise "production" will be used by default.
// process.env.NODE_ENV = "test";
// process.env.NODE_ENV = "development";
process.env.NODE_ENV = "production";

// Import Logger module.
const Logger = require("@dist");

// todo: add a Mocha assert.
// Logger.info.debug(Logger.catKeys);

// Test each file appenders as categories.
Logger.catKeys.forEach(element => {
	["trace", "debug", "info", "warn", "error", "fatal"].forEach(level => {
		Logger[element][level]("Test Logger." + element + "."+ level + "()");
	});
	// eslint-disable-next-line no-console
	console.log("------------------------------------");
});