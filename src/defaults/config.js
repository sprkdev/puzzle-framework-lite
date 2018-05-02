"use strict";

/**
 * Default configuration values
 *
 * @type {Object}
 * @alias config
 * @memberOf engine
 */
module.exports = {
  /**
   * General engine configuration
   *
   * @type {Object}
   */
  engine: {
    /**
     * Is the application in debug mode? Overrides the log setting.
     *
     * @type {boolean}
     */
    debug: false,

    /**
     * Log configuration
     *
     * @type {Object}
     */
    log: {
      /**
       * Log level: emergency, alert, critical, error, warning, notice, info, debug
       *
       * @type {string}
       */
      level: "info",

      /**
       * Location of the log file.
       *
       * @type {string}
       */
      file: "",

      /**
       * Should the log be rotated?
       *
       * @type {boolean}
       */
      rotate: true,

      /**
       * Maximum log file size before rotation. Modifiers are: k(ilo), m(ega), g(iga)
       *
       * @type {string}
       */
      size: "50k",

      /**
       * Should the rotated log be compressed?
       *
       * @type {boolean}
       */
      compress: false,

      /**
       * How many rotation files should exist.
       *
       * @type {int}
       */
      count: 3
    },

    /**
     * Name of the application.
     *
     * @type {string}
     */
    name: "Puzzle Framework"
  },

  /**
   * HTTP module configuration.
   *
   * @type {Object}
   */
  http: {
    /**
     * Specifies the port the application is listening to.
     *
     * @type {int}
     */
    port: 3000,

    /**
     * The address on which the server listens on.
     *
     * @type {string}
     */
    listen: "127.0.0.1",

    /**
     * The context path to build URLs in the application.
     *
     * @type {string}
     */
    contextPath: "",

    /**
     * Cross-Origin resource sharing variable. A list with the sites that are allowed to
     * access REST resources exposed by the application.
     *
     * @type {string}
     */
    cors: "*",

    /**
     * The base path of the API routes.
     *
     * @type {string}
     */
    APIPath: "/api/v1"
  },

  /**
   * Internationalization module configuration.
   *
   * @type {Object}
   */
  i18n: {
    /**
     * A list with all enabled languages.
     *
     * @type {string[]}
     */
    languages: ["en", "ro"],

    /**
     * The name of the cookie used to translate the application.
     *
     * @type {string}
     */
    cookie: "puzzle.i18n",

    /**
     * The default locale to be used by the application.
     *
     * @var {string}
     */
    defaultLocale: "en",

    /**
     * Folder where the internationalisation files will be created.
     *
     * @var {string}
     */
    locales: "locales",

    /**
     * i18n - watch for changes in json files to reload locale on updates - defaults to false
     *
     * @var {boolean}
     */
    autoReload: true,

    /**
     * whether to write new locale information to disk - defaults to true
     *
     * @var {boolean}
     */
    updateFiles: false
  },

  /**
   * Session module configuration.
   *
   * @type {Object}
   */
  session: {
    /**
     * The secret used to encrypt the session cookie.
     *
     * @type {string}
     */
    secret: "qwertyuiop",

    /**
     * The secret used to encrypt the session cookie.
     *
     * @type {string}
     */
    store: "memory"
  },

  /**
   * Socket module configuration.
   *
   * @type {Object}
   */
  socket: {
    /**
     * Enables or disables the socket.io functionality.
     *
     * @type {boolean}
     */
    enabled: false
  },

  /**
   * View/UI module configuration.
   *
   * @type {Object}
   */
  views: {
    /**
     * Folder where all views are stored.
     *
     * @type {string}
     */
    views: "views",

    /**
     * Folder where all layouts are stored.
     *
     * @type {string}
     */
    layouts: "views/layouts",

    /**
     * Folder where all partials are stored.
     *
     * @type {string}
     */
    partials: "views/partials",

    /**
     * Location of the default layout.
     *
     * @type {string}
     */
    defaultLayout: "views/layouts/main.hbs",

    /**
     * Folder where public static content is stored.
     *
     * @type {string}
     */
    publicContent: "public"
  }
};