"use strict"; // Import modules.

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var path = require("path");

var log4js = require("log4js");

var log4js_extend = require("log4js-extend"); // Defines environment.


var env = process.env.NODE_ENV || "production";
var isProd = ["production", "prod"].includes(env); // console.log("env =  " + env);
// console.log("isProd =  " + isProd);

/**
 * Class Logger.
 */

var Logger =
/*#__PURE__*/
function () {
  /**
    * Class Logger constructor.
    */
  function Logger() {
    var _this = this;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$fileAppenders = _ref.fileAppenders,
        fileAppenders = _ref$fileAppenders === void 0 ? ["app", "data", "lib", "server", "services"] : _ref$fileAppenders,
        logLevel = _ref.logLevel,
        _ref$logsPath = _ref.logsPath,
        logsPath = _ref$logsPath === void 0 ? "logs" : _ref$logsPath,
        _ref$logsPathRoot = _ref.logsPathRoot,
        logsPathRoot = _ref$logsPathRoot === void 0 ? process.cwd() : _ref$logsPathRoot;

    _classCallCheck(this, Logger);

    // Property list of file appenders.
    this.fileAppenders = fileAppenders;
    this.catKeys = fileAppenders; // Initialize property logs.

    this.logsPath = logsPath;
    this.logsPathRoot = logsPathRoot;
    this.logLevel = logLevel || (isProd ? "error" : "trace"); // Initialize file appenders & categories lists.

    var appenders = {
      stdout: {
        type: "stdout"
      },
      "all": {
        type: "file",
        filename: this.fileResolve("debug")
      }
    };
    var categories = {
      default: {
        appenders: ["stdout"],
        level: "error"
      },
      all: {
        appenders: ["stdout", "all"],
        level: "trace"
      }
    }; // eslint-disable-next-line no-unused-vars

    this.fileAppenders.forEach(function (el, index) {
      appenders[el] = {
        type: "file",
        filename: _this.fileResolve("debug")
      };
      categories[el] = {
        appenders: [el, "stdout"],
        level: _this.logLevel
      };
    }); // Force log to trace level for informations. 

    appenders["info"] = {
      type: "file",
      filename: this.fileResolve("activity")
    };
    categories["info"] = {
      appenders: ["info", "stdout"],
      level: "trace"
    }; // Force log to info level for informations. 

    appenders["activity"] = {
      type: "file",
      filename: this.fileResolve("activity")
    };
    categories["activity"] = {
      appenders: ["activity", "stdout"],
      level: "info"
    }; // Force log to deprecated level for informations. 

    appenders["deprecated"] = {
      type: "file",
      filename: this.fileResolve("deprecated")
    };
    categories["deprecated"] = {
      appenders: ["deprecated", "stdout"],
      level: "warn"
    };
    this.catKeys.push("activity");
    this.catKeys.push("all");
    this.catKeys.push("default");
    this.catKeys.push("info");
    this.catKeys.push("deprecated"); // Configure log4js with the given options.

    log4js.configure({
      appenders: appenders,
      categories: categories
    }); // Initialize log4js extend.

    log4js_extend(log4js, {
      path: process.env.XTRMADDONS_LOGGER_PATH || __dirname.split("node_modules")[0],
      format: "at @name (@file:@line:@column)"
    });
  }
  /**
    * Method to get log4js category appenders logger.
   *
   * @public
    * @param {string} appender A category of appenders.
   *
    * @returns {object} A log4js log category appender.
    */


  _createClass(Logger, [{
    key: "getLogger",
    value: function getLogger(category) {
      if (this.catKeys.includes(category)) {
        return log4js.getLogger(category);
      }

      return log4js.getLogger();
    }
    /**
     * Method to resolve a log file path.
     *
     * @public
     * @param {string} fname
     *
     * @returns {string} A filename or full file path.
     */

  }, {
    key: "fileResolve",
    value: function fileResolve(fname) {
      return path.join(this.logsPathRoot, this.logsPath, "".concat(!isProd ? env + "." : "").concat(fname, ".log"));
    }
  }]);

  return Logger;
}(); // Exports class as module.


exports = module.exports = Logger;