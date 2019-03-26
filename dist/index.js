"use strict"; // Import class Logger

var Logger = require("./Logger"); // Export only one instance of the Logger and its categories.


var instance = null;

var getInstance = function getInstance() {
  if (!instance) {
    // Creat new instance of the Logger.
    instance = new Logger(); // eslint-disable-next-line no-unused-vars

    instance.catKeys.forEach(function (el, index) {
      instance[el] = instance.getLogger(el);
    });
  }

  return instance;
}; // Export Logger.


exports = module.exports = getInstance();