/* eslint-disable valid-jsdoc */

'use strict';

/**
 * @module system/express/router
 */

require('../../typedef');

/**
 * @param {TOOLS} TOOLS
 * @param {MODULES} MODULES
 * @param {CONSTANTS} CONSTANTS
 * @param {import('./server')} APP
 */
module.exports = function(TOOLS, APP, CONSTANTS, MODULES) {
    console.time('Loading express routers');
    const {ASYNC: async, FS: fs, SHARED_SYSTEM: sharedSystem, UNDERSCORE: _} = MODULES;
    const interfaces = TOOLS.INTERFACES.EXPRESS;
    const logger = TOOLS.LOG;

    // Initialize endpoints generator
    const endpointLoader = {
        /**
         * Generate Express endpoints from files recursively through directories
         * @param basePath {string} Path of endpoints
         * @param subPath {string} Subdirectory of base path
         * @return {void}
         */
        recursiveGenerator: function generate(basePath, subPath) {
            const currentPath = basePath + (subPath ? '/' + subPath : '');
            fs.readdirSync(currentPath).forEach(function(file) {
                if (fs.statSync(currentPath + '/' + file).isDirectory()) {
                    // recursion invocation
                    generate(basePath, (subPath ? subPath + '/' : '') + file);
                } else {
                    // recursion base
                    if ((file.indexOf('.') !== 0) && (file.slice(-3) === '.js')) {
                        const apiConfig = require(currentPath + '/' + file);
                        endpointLoader.generateEndpoint(
                            apiConfig,
                            (subPath ? subPath + '/' : '') + file.replace('.js', ''),
                        );
                    } else { // invalid endpoint file type
                        logger.warn(`file '${currentPath + '/' + file}' is not supported for express router`);
                    }
                }
            });
        },

        /**
         * Decompose a single endpoint from endpoint configs file
         * @param routes {string[]} List of endpoint config
         * @param routeParent {string} First url endpoint string
         * @return {void}
         */
        generateEndpoint: function(routes, routeParent) {
            const self = this;
            routes.filter(function(routeConfig) {
                if (routeConfig.method && routeConfig.endpoint && routeConfig.handlers) {
                    return true;
                } else {
                    logger.error(new Error('Route error: missing some required parameter(s)'));
                    return false;
                }
            }).forEach(function(routeConfig) {
                let urlPath;
                const httpMethod = routeConfig.method.toLowerCase();
                routeParent = routeParent.toLowerCase();
                const lastEndpoint = routeConfig.endpoint;
                if (routeParent === 'index') {
                    urlPath = lastEndpoint;
                } else {
                    urlPath = '/' + routeParent + lastEndpoint;
                }
                self.endpointHandler(httpMethod, urlPath, routeConfig);
            });
        },

        /**
         * Define complete handlers for an endpoint
         * @param httpMethod {string} Appropriate http method for a specific endpoint
         * @param urlPath {string} Url full path for the endpoint
         * @param routeConfig {AnyObject} Endpoint configuration
         * @param {void}
         */
        endpointHandler: function(httpMethod, urlPath, routeConfig) {
            const self = this;
            // check if there exist one or more controller/handler for an endpoint
            if (routeConfig && routeConfig.handlers && routeConfig.handlers.length > 0) {
                APP[httpMethod](urlPath, function(req, res) {
                    const controllerMethods = [];
                    // define multiple controller/handler for an endpoint
                    routeConfig.handlers.forEach(function(controllerStr) {
                        controllerMethods.push(function(previousData, callback) {
                            // handle first function for async.waterfall, where callback is the first argument
                            if (!callback) {
                                callback = previousData;
                                previousData = {};
                            }
                            self.execController(controllerStr, previousData, req, res, callback);
                        });
                    });
                    // treat controllers with waterfall flow
                    async.waterfall(controllerMethods, function(stopData, data) {
                        if (data?.stream) {
                            if (data.contentType) {
                                res.contentType(data.contentType);
                            }

                            res.status(data.code);

                            return data.stream.pipe(res);
                        }

                        // return response immediately or whenever error arg on callback function exists
                        const result = sharedSystem.handleResponse(stopData, data, routeConfig.version, logger, req);
                        return res.status(result.code).json(result);
                    });
                });
            } else {
                logger.warn(`Can't find any controller for url path: ${urlPath}`);
            }
        },

        /**
         * Generate a controller with callback for data transition among other controllers
         * @param controllerStr {string} Controller name
         * @param previousData {AnyObject} Data passed by the previous executed controller
         * @param req {AnyObject} Request object (express)
         * @param res {AnyObject} Response object (express)
         * @param next {function} Callback function for transition to the next controller
         * @return {void}
         */
        execController: function(controllerStr, previousData, req, res, next) {
            const callController = this.getController(controllerStr);
            if (!callController) {
                throw new Error(`Controller ${controllerStr} not found`);
            } else {
                callController(previousData, req, res, function(err, data, clear) {
                    if (err) {
                        next(err);
                    } else {
                        const newData = clear ? data : _.extend(previousData, data);
                        next(null, newData);
                    }
                });
            }
        },

        /**
         * Get controller/handler function from interface list
         * @param {string} controllerStr Controller/handler name
         * @return {function} controller/handler function
         */
        getController: function(controllerStr) {
            try {
                const controllerFileName = controllerStr.split('.')[0];
                const controllerFuncName = controllerStr.split('.')[1];
                return interfaces[controllerFileName][controllerFuncName];
            } catch (e) {
                console.dir(e);
            }
        },
    };

    endpointLoader.recursiveGenerator(CONSTANTS.PATH.ROUTERS_PATH, null);
    console.timeEnd('Loading express routers');
};
