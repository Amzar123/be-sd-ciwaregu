'use strict';

/**
 * @module configs/tools
 */
require('../typedef');

/**
 * @param {MODULES} MODULES
 * @param {CONSTANTS} CONSTANTS
 * @param {function} callback
 */
module.exports = function(MODULES, CONSTANTS, callback) {
    /**
     * Load databases and tools for microservice
     * @param {function} callback callback function executed after this method
     * @return {void}
     */
    function loadToolsAndDatabase(callback) {
        console.time('Loading app tools and database');
        const {Kafka} = MODULES.KAFKA;
        const {transports, createLogger, format} = MODULES.WINSTON;
        const {combine, timestamp, json, errors} = format;

        // Define parameter for initialization

        const TOOLS = {};
        const addSeverityFormat = format((info) => {
            if (info.level === 'warn') {
                info.severity = 'WARNING';
            } else {
                info.severity = info.level.toUpperCase();
            }
            return info;
        });
        TOOLS.LOG = createLogger({
            format: combine(
                errors({stack: true}),
                timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss',
                }),
                addSeverityFormat(),
                json(),
            ),
            transports: [
                new transports.Console(),
                new transports.File({
                    filename: CONSTANTS.PATH.LOG_DEFAULT_PATH,
                    handleExceptions: false,
                    colorize: true,
                    json: false,
                    maxsize: 10485760, // 10MB
                    maxFiles: 50,
                    tailable: true,
                    prepend: true,
                }),
                new transports.File({
                    filename: CONSTANTS.PATH.LOG_ERROR_PATH,
                    handleExceptions: false,
                    colorize: true,
                    json: false,
                    maxsize: 5242880, // 10MB
                    maxFiles: 25,
                    level: 'error',
                    tailable: true,
                    prepend: true,
                }),
            ],
            exceptionHandlers: [
                new transports.Console(),
                new transports.File({
                    filename: CONSTANTS.PATH.LOG_EXCEPTIONS_PATH,
                    handleExceptions: true,
                    colorize: true,
                    json: true,
                    maxsize: 5242880, // 5MB
                    maxFiles: 10,
                    prepend: true,
                    tailable: true,
                }),
            ],
        });

        // Initialize mongoose (Mongoose)
        TOOLS.SCHEMA = require(CONSTANTS.PATH.SCHEMA_LOADER)(MODULES, CONSTANTS);

        // Initialize Elasticsearch
        TOOLS.ELASTIC_CLIENT = require(CONSTANTS.PATH.ELASTIC_CLIENT)(MODULES, CONSTANTS);

        // Initialize Redis database
        TOOLS.REDIS_CLIENT = require(CONSTANTS.PATH.REDIS_CLIENT)(MODULES);
        TOOLS.REDIS_CREATOR = () => require(CONSTANTS.PATH.REDIS_CLIENT)(MODULES);

        // Initialize Kafka
        const {KAFKA} = CONSTANTS.VARIABLE;

        TOOLS.KAFKA_CLIENT = new Kafka({
            clientId: KAFKA.ID,
            brokers: [`${KAFKA.HOST}:${KAFKA.PORT}`],
        });

        TOOLS.KAFKA_PRODUCER = TOOLS.KAFKA_CLIENT.producer();

        // Initialize Event
        const {EventEmitter} = MODULES.EVENT;
        TOOLS.EVENT = new EventEmitter();

        TOOLS.KAFKA_PRODUCER.connect()
            .then(() => {
                console.timeEnd('Loading app tools and database');
                callback(null, TOOLS);
            })
            .catch((err) => {
                throw err;
            });
    }

    /**
     * Load application layer of microservice included services, controllers, and interfaces
     * @param {AnyObject} tools object that consists of required tools for running microservice
     * @param {function} callback callback function executed after this method
     * @return {void}
     */
    function loadApplicationLayer(tools, callback) {
        console.time('Loading services, controllers and interfaces');
        // Initialize services
        tools.SERVICES = require(CONSTANTS.PATH.CLASS_LOADER)(tools, MODULES, CONSTANTS, CONSTANTS.PATH.SERVICES_PATH);

        // Initialize event listeners
        tools.LISTENERS = require(CONSTANTS.PATH.CLASS_LOADER)(
            tools,
            MODULES,
            CONSTANTS,
            CONSTANTS.PATH.EVENT_LISTENERS_PATH,
        );

        // Attach listeners to events
        require(CONSTANTS.PATH.EVENT_LOADER)(tools, MODULES, CONSTANTS, CONSTANTS.PATH.SERVICES_PATH);

        // Initialize interfaces
        tools.CONTROLLERS = require(CONSTANTS.PATH.CLASS_LOADER)(
            tools,
            MODULES,
            CONSTANTS,
            CONSTANTS.PATH.CONTROLLERS_PATH,
        );

        // Initialize JOI schema
        tools.JOISCHEMA = require(CONSTANTS.PATH.CLASS_LOADER)(tools, MODULES, CONSTANTS, CONSTANTS.PATH.JOI_SCHEMA);

        // Initialize interfaces
        tools.INTERFACES = {};

        console.timeEnd('Loading services, controllers and interfaces');
        callback(null, tools);
    }

    MODULES.ASYNC.waterfall([loadToolsAndDatabase, loadApplicationLayer], function(err, result) {
        if (err) {
            throw err;
        } else {
            callback(null, result);
        }
    });
};
