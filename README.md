# XtrmAddons Soft Suite Logger [![fr-FR](https://github.com/shim-sao/assets/blob/master/images/france-flag-icon-16.png)](README.fr-FR.md)

This directory is intended for the implementation and configuration of the logging system used in the various XtrmAddons NodeJs extensions and applications.


This system can be used on the same [principle](docs/README.md) dependencies log4js it uses:

* [log4js](https://www.npmjs.com/package/log4js)

* [log4js-extend](https://www.npmjs.com/package/log4js-extend)

## Install

### Method 1

Execute the following command for the installation of the modules :

```batch
npm install --save https://github.com/shim-sao/xtrmaddons-soft-suite-logger
```

### Method 2

```js
// Adding the file dependency package.json
{
  "name": "my-project",
  "version": "0.0.0",
  "dependencies": {
    // Direct link to the current branch of the Git Repository.
    // Copy/paste this dependency.
    "xtrmaddons-soft-suite-logger": "shim-sao/xtrmaddons-soft-suite-logger"
  }
}
```

After adding the needed dependencies in the list, execute the following command for the installation of the modules:

```batch
npm run install
```

---

## [API Documentation](docs/README.md)

Documentation of the functions contain in the API.

---

## Build

Command to perform Babel compilation for distribution :

```batch
npm run build
```

## Tests Mocha

Command to perform unit tests with Mocha :

```batch
npm run test
```

## Eslint fix

Command to perform fix with Eslint :

```batch
npm run eslint
```