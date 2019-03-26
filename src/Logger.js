"use strict";

// Import modules.
const path = require("path");
const log4js = require("log4js");
const log4js_extend = require("log4js-extend");

// Defines environment.
const env = process.env.NODE_ENV || "production";
const isProd = ["production", "prod"].includes(env);

// console.log("env =  " + env);
// console.log("isProd =  " + isProd);

/**
 * Class Logger.
 */
class Logger {
	/**
   * Class Logger constructor.
   */
	constructor({
		fileAppenders = [ "app", "data", "lib", "server", "services" ],
		logLevel,
		logsPath = "logs",
		logsPathRoot = process.cwd()
	} = {}) {
		// Property list of file appenders.
		this.fileAppenders = fileAppenders;
		this.catKeys = fileAppenders;

		// Initialize property logs.
		this.logsPath = logsPath;
		this.logsPathRoot = logsPathRoot;
		this.logLevel = logLevel || (isProd ? "error" : "trace");

		// Initialize file appenders & categories lists.
		const appenders = { stdout: { type: "stdout" }, "all": { type: "file", filename: this.fileResolve("debug") } };
		const categories = {
			default: { appenders: ["stdout"], level: "error" },
			all: { appenders: ["stdout", "all"], level: "trace" }
		};

		// eslint-disable-next-line no-unused-vars
		this.fileAppenders.forEach((el, index) => {
			appenders[el] = { type: "file", filename: this.fileResolve("debug") };
			categories[el] = { appenders: [el, "stdout"], level: this.logLevel };
		});
    
		// Force log to trace level for informations. 
		appenders["info"] = { type: "file", filename: this.fileResolve("activity") };
		categories["info"] = { appenders: ["info", "stdout"], level: "trace" };
		
		// Force log to info level for informations. 
		appenders["activity"] = { type: "file", filename: this.fileResolve("activity") };
		categories["activity"] = { appenders: ["activity", "stdout"], level: "info" };

		// Force log to deprecated level for informations. 
		appenders["deprecated"] = { type: "file", filename: this.fileResolve("deprecated") };
		categories["deprecated"] = { appenders: ["deprecated", "stdout"], level: "warn" };

		this.catKeys.push("activity");
		this.catKeys.push("all");
		this.catKeys.push("default");
		this.catKeys.push("info");
		this.catKeys.push("deprecated");

		// Configure log4js with the given options.
		log4js.configure({
			appenders,
			categories
		});

		// Initialize log4js extend.
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
	getLogger(category) {
		if(this.catKeys.includes(category)) {
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
	fileResolve(fname) {
		return path.join(
			this.logsPathRoot,
			this.logsPath,
			`${!isProd ? env + "." : ""}${fname}.log`
		);
	}
}

// Exports class as module.
exports = module.exports = Logger;
