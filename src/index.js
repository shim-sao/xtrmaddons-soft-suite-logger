"use strict";

// Import class Logger
const Logger = require("./Logger");

// Export only one instance of the Logger and its categories.
let instance = null;
const getInstance = function() {
	if (!instance) {
		// Creat new instance of the Logger.
		instance = new Logger();

		// eslint-disable-next-line no-unused-vars
		instance.catKeys.forEach((el, index) => {
			instance[el] = instance.getLogger(el);
		});
	}
	return instance;
};

// Export Logger.
exports = module.exports = getInstance();
