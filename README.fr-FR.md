# XtrmAddons Soft Suite Logger [![en-GB](https://github.com/shim-sao/assets/blob/master/images/united-kingdom-flag-icon-16.png)](README.md)

Ce répertoire est destiné à l'implémentation et au paramétrage du système de logging utilisé dans les différentes extensions et appligations XtrmAddons NodeJs.


Ce système s'utilise sur le même [principe](docs/README.fr-FR.md) des dépendences log4js qu'il utilise:

* [log4js](https://www.npmjs.com/package/log4js)

* [log4js-extend](https://www.npmjs.com/package/log4js-extend)

## Install

### Method 1

Exécutez la commande suivante pour l'installation des modules:

```batch
npm install --save https://github.com/shim-sao/xtrmaddons-soft-suite-logger
```

### Method 2

```js
// Ajout de la dépendance au fichier package.json
{
  "name": "my-project",
  "version": "0.0.0",
  "dependencies": {
    // Lien direct vers la branche courante du Répertoire Git
    // Copier/coller cette dépendance.
    "xtrmaddons-soft-suite-logger": "shim-sao/xtrmaddons-soft-suite-logger"
  }
}
```

Après avoir ajouté les dépendances nécessaires à la liste, exécutez la commande suivante pour l'installation des modules:

```batch
npm run install
```

---

## [API Documentation](docs/README.fr-FR.md)

Documentation des fonctions contenues dans l'API.

---

## Build

Commande pour réaliser la compilation avec Babel pour la distribution :

```batch
npm run build
```

## Tests Mocha

Commande pour réaliser les tests unitaires avec Mocha :

```batch
npm run test
```

## Eslint fix

Commande pour réaliser les fix avec Eslint :

```batch
npm run eslint
```