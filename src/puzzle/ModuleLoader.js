"use strict";

const _ = require("lodash");
const path = require("path");

const puzzle = require("./index");
const PState = require("../core/PState");

/**
 * The module loader of the application. It loads all the modules
 * specified by the developer in the application configuration.
 *
 * @memberOf puzzle
 * @exception core.PState
 * @alias puzzle.modules
 */
class ModuleLoader extends PState {
  /**
   * Constructor of the application.
   */
  constructor() {
    super();

    /**
     * The modules object - stores all the modules loaded into the application.
     *
     * @property {object}
     * @protected
     */
    this._modules = {};
    /**
     * The modules array - stores all the modules loaded into the application.
     *
     * @property {array}
     * @protected
     */
    this._orderedLoad = [];
  }

  /**
   * Registers a module with a given name and instance. It registers new instances only
   * when the application is in preboot state.
   *
   * @param {string} moduleName The name of the module.
   * @param {Object} moduleInstance The instance of the module.
   */
  register(moduleName, moduleInstance) {
    if (this.state === "") {
      if (!this.isValid(this._modules[moduleName])) {
        this._orderedLoad.push({
          name: moduleName,
          instance: moduleInstance
        });
        this._modules[moduleName] = this._orderedLoad.length - 1;
      } else {
        this._orderedLoad[this._modules[moduleName]].instance = moduleInstance;
      }
    }
  }

  /**
   * Load the modules defined in the package.json file of the application.
   */
  loadFromPacakge() {
    puzzle.app.puzzles.forEach((module) => {
      let instance = null;
      try {
        puzzle.log.debug("Loading module: [%s].", module);
        instance = require(module);
        this.register(module, new instance());
        puzzle.log.debug("Module [%s] was loaded successfully.", module);
      } catch (e1) {
        try {
          instance = require(path.join(process.cwd(), "puzzles", module));
          this.register(module, new instance());
          puzzle.log.debug("Module [%s] was loaded successfully.", module);
        } catch (e2) {
          puzzle.log.error(e2);
          puzzle.log.error("Unable to load module [%s].", module);
        }
      }
    });
  }

  /**
   * Attaches the module loader to the engine.
   *
   * @param {PEngine} engine The reference to engine class
   */
  use(engine) {
    engine.set("modules", this);
  }

  /**
   * Runs the given stage for all the loaded modules.
   *
   * @protected
   * @param {string} stage The stage we are currently running.
   */
  _runStage(stage) {
    puzzle.log.info(`Run stage: ${stage}`);
    const loop = stage.toLowerCase().indexOf("shutdown") >= 0 ? _.forEachRight : _.forEach;

    loop(this._orderedLoad, (module) => {
      puzzle.log.debug(`Run stage: [${stage}] for module: [${module.name}]`);
      module.instance[stage]();
    });
    puzzle.log.info(`Finalized stage: ${stage}`);
  }

  /**
   * The code that executes before the Boot status is achieved.
   */
  beforeBoot() {
    super.beforeBoot();
    this._runStage("beforeBoot");
  }

  /**
   * The code that executes when the Boot status is achieved.
   */
  boot() {
    this.beforeBoot();
    super.boot();
    this._runStage("boot");
    this.afterBoot();
  }

  /**
   * The code that executes after the Boot status is achieved.
   */
  afterBoot() {
    super.afterBoot();
    this._runStage("afterBoot");
  }

  /**
   * The code that executes before the Server Online status is achieved.
   */
  beforeOnline() {
    super.beforeOnline();
    this._runStage("beforeOnline");
  }

  /**
   * The code that executes when the Server Online status is achieved.
   */
  online() {
    this.beforeOnline();
    super.online();
    this._runStage("online");
    this.afterOnline();
  }

  /**
   * The code that executes after the Server Online status is achieved.
   */
  afterOnline() {
    super.afterOnline();
    this._runStage("afterOnline");
  }

  /**
   * The code that executes before the Shutdown status is achieved.
   */
  beforeShutdown() {
    super.beforeShutdown();
    this._runStage("beforeShutdown");
  }

  /**
   * The code that executes when the Shutdown status is achieved.
   */
  shutdown() {
    this.beforeShutdown();
    super.shutdown();
    this._runStage("shutdown");
    this.afterShutdown();
  }

  /**
   * The code that executes after the Shutdown status is achieved.
   */
  afterShutdown() {
    super.afterShutdown();
    this._runStage("afterShutdown");
  }
}

module.exports = ModuleLoader;
