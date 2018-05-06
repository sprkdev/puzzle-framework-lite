"use strict";

const fs = require("fs");
const path = require("path");
const _ = require("lodash");

const PUse = require("../core/PUse");

/**
 * Routes loader class.
 *
 * Loads routes defined by a module into the application.
 *
 * @alias puzzle.routes
 * @extends core.PUse
 * @memberOf http
 */
class RoutesLoader extends PUse {
  /**
   * Initializes the Routes loader runtime.
   *
   * @param {PEngine} engine The engine reference.
   */
  use(engine) {
    engine.set("routes", this);
  }

  /**
   * Register a routes folder into the engine.
   *
   * @param {string} root The root folder of the module.
   * @param {string} [routes=routes] The name of the routes folder.
   */
  register(root, routes = "routes") {
    const fullpath = path.join(root, routes);
    fs.readdirSync(fullpath).forEach((file) => {
      if (path.extname(file) === ".js") {
        require(_.join([fullpath, file], "/"))();
      }
    });
  }

  /**
   * Register an API routes folder into the engine.
   *
   * @param {string} root The root folder of the module.
   * @param {string} [routes=routes] The name of the routes folder.
   */
  build(root, routes = "routes") {
    const fullpath = path.join(root, routes);
    fs.readdirSync(fullpath).forEach((file) => {
      if (path.extname(file) === ".js") {
        const ClassPath = require(_.join([fullpath, file], "/"));
        const classRoute = new ClassPath();
        classRoute.build();
      }
    });
  }
}

module.exports = RoutesLoader;
