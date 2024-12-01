var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// package.json
var require_package = __commonJS({
  "package.json"(exports2, module2) {
    module2.exports = {
      name: "sqltools-driver-cloudsql-pg",
      displayName: "SQLTools Google Cloud SQL (PostgreSQL) Driver",
      description: "SQLTools Google Cloud SQL (PostgreSQL) Driver",
      version: "0.1.0",
      engines: {
        vscode: "^1.72.0"
      },
      publisher: "curioswitch",
      license: "MIT",
      repository: {
        type: "git",
        url: "https://github.com/curioswitch/vscode-sqltools-cloudsql-pg.git"
      },
      bugs: {
        url: "https://github.com/curioswitch/vscode-sqltools-cloudsql-pg"
      },
      keywords: [
        "sqltools-driver",
        "postgre",
        "postgres",
        "postgresql",
        "cloudsql",
        "gcp"
      ],
      galleryBanner: {
        theme: "dark",
        color: "#333333"
      },
      icon: "icon.png",
      categories: [
        "Programming Languages",
        "Snippets",
        "Formatters",
        "Other"
      ],
      pricing: "Free",
      extensionDependencies: [
        "mtxr.sqltools"
      ],
      activationEvents: [
        "*",
        "onLanguage:sql",
        "onCommand:sqltools.*"
      ],
      main: "./out/extension.js",
      vsce: {
        dependencies: false,
        useYarn: false
      },
      scripts: {
        format: "prettier --write .",
        "vscode:prepublish": "yarn run build",
        "vscode:package": "vsce package --allow-star-activation",
        build: "rimraf out && yarn run compile:ext && yarn run compile:ls",
        esbuild: "esbuild --platform=node --tsconfig=./tsconfig.json --external:vscode --log-level=error --color=true --format=cjs",
        "compile:ext": `yarn run esbuild --bundle ./src/extension.ts --outfile=./out/extension.js --target=es2017 --define:process.env.PRODUCT="'ext'"`,
        "compile:ls": `yarn run esbuild --bundle ./src/ls/plugin.ts --outfile=./out/ls/plugin.js --target=es2015 --define:process.env.PRODUCT="'ls'"`,
        compile: "tsc -p ./",
        watch: "tsc -watch -p ./"
      },
      dependencies: {
        "@google-cloud/cloud-sql-connector": "^1.2.1",
        "@sqltools/base-driver": "^0.1.11",
        "@sqltools/types": "^0.1.7",
        "google-auth-library": "^9.4.1",
        lodash: "^4.17.19",
        pg: "^8.2.1",
        uuid: "^7.0.2"
      },
      devDependencies: {
        "@babel/preset-env": "^7.5.5",
        "@types/lodash": "^4.14.123",
        "@types/node": "^14.0.9",
        "@types/pg": "^8.10.9",
        "@types/uuid": "^9.0.7",
        "@types/vscode": "^1.42.0",
        "@vscode/vsce": "^2.22.0",
        esbuild: "^0.19.10",
        prettier: "^3.1.1",
        rimraf: "^5.0.5",
        typescript: "^5.3.3"
      },
      packageManager: "yarn@4.0.2"
    };
  }
});

// src/extension.ts
var extension_exports = {};
__export(extension_exports, {
  activate: () => activate,
  deactivate: () => deactivate
});
module.exports = __toCommonJS(extension_exports);
var import_vscode = require("vscode");

// src/constants.ts
var DRIVER_ALIASES = [
  {
    displayName: "PostgreSQL (Cloud SQL)",
    value: "CloudSQL-PostgreSQL"
  }
];

// src/extension.ts
var { publisher, name } = require_package();
var driverName = "Google Cloud SQL (PostgreSQL)";
var AUTHENTICATION_PROVIDER = "sqltools-driver-credentials";
async function activate(extContext) {
  const sqltools = import_vscode.extensions.getExtension("mtxr.sqltools");
  if (!sqltools) {
    throw new Error("SQLTools not installed");
  }
  await sqltools.activate();
  const api = sqltools.exports;
  const extensionId = `${publisher}.${name}`;
  const plugin = {
    extensionId,
    name: `${driverName} Plugin`,
    type: "driver",
    async register(extension) {
      extension.resourcesMap().set(`driver/${DRIVER_ALIASES[0].value}/icons`, {
        active: extContext.asAbsolutePath("icons/pg/active.png"),
        default: extContext.asAbsolutePath("icons/pg/default.png"),
        inactive: extContext.asAbsolutePath("icons/pg/inactive.png")
      });
      DRIVER_ALIASES.forEach(({ value }) => {
        extension.resourcesMap().set(`driver/${value}/extension-id`, extensionId);
        extension.resourcesMap().set(
          `driver/${value}/connection-schema`,
          extContext.asAbsolutePath("connection.schema.json")
        );
        extension.resourcesMap().set(
          `driver/${value}/ui-schema`,
          extContext.asAbsolutePath("ui.schema.json")
        );
      });
      await extension.client.sendRequest("ls/RegisterPlugin", {
        path: extContext.asAbsolutePath("out/ls/plugin.js")
      });
    }
  };
  api.registerPlugin(plugin);
  return {
    driverName,
    parseBeforeSaveConnection: ({ connInfo }) => {
      const propsToRemove = ["id", "usePassword"];
      if (connInfo.usePassword) {
        if (connInfo.usePassword.toString().toLowerCase().includes("ask")) {
          connInfo.askForPassword = true;
          propsToRemove.push("password");
        } else if (connInfo.usePassword.toString().toLowerCase().includes("iam")) {
          connInfo.iamAuthentication = true;
          propsToRemove.push("password");
          propsToRemove.push("askForPassword");
        } else if (connInfo.usePassword.toString().toLowerCase().includes("empty")) {
          connInfo.password = "";
          propsToRemove.push("askForPassword");
        } else if (connInfo.usePassword.toString().toLowerCase().includes("save")) {
          propsToRemove.push("askForPassword");
        } else if (connInfo.usePassword.toString().toLowerCase().includes("secure")) {
          propsToRemove.push("password");
          propsToRemove.push("askForPassword");
        }
      }
      propsToRemove.forEach((p) => delete connInfo[p]);
      connInfo.pgOptions = connInfo.pgOptions || {};
      if (Object.keys(connInfo.pgOptions).length === 0) {
        delete connInfo.pgOptions;
      }
      return connInfo;
    },
    parseBeforeEditConnection: ({ connInfo }) => {
      const formData = __spreadValues({}, connInfo);
      if (connInfo.askForPassword) {
        formData.usePassword = "Ask on connect";
        delete formData.password;
      } else if (typeof connInfo.password === "string") {
        delete formData.askForPassword;
        formData.usePassword = connInfo.password ? "Save as plaintext in settings" : "Use empty password";
      } else if (connInfo.iamAuthentication) {
        formData.usePassword = "IAM authentication";
        delete formData.iamAuthentication;
      } else {
        formData.usePassword = "SQLTools Driver Credentials";
      }
      formData.pgOptions = formData.pgOptions || {};
      return formData;
    },
    resolveConnection: async ({ connInfo }) => {
      if (connInfo.password === void 0 && !connInfo.askForPassword && !connInfo.iamAuthentication) {
        const scopes = [connInfo.name, connInfo.username || ""];
        let session = await import_vscode.authentication.getSession(
          AUTHENTICATION_PROVIDER,
          scopes,
          { silent: true }
        );
        if (!session) {
          session = await import_vscode.authentication.getSession(
            AUTHENTICATION_PROVIDER,
            scopes,
            { createIfNone: true }
          );
        }
        if (session) {
          connInfo.password = session.accessToken;
        }
      }
      return connInfo;
    },
    driverAliases: DRIVER_ALIASES
  };
}
function deactivate() {
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  activate,
  deactivate
});
