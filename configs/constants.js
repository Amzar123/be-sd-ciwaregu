'use strict';

const path = require('path');

module.exports = {
    // application directory
    PATH: {
        APPLICATION_MODULES: path.join(__dirname, '/modules'),
        APPLICATION_TOOLS: path.join(__dirname, '/tools'),
        CONTROLLERS_PATH: path.join(__dirname, '/../application/controllers'),
        CLASS_LOADER: path.join(__dirname, '/../system/classloader'),
        EXPRESS_INTERFACES_PATH: path.join(__dirname, '/../protocols/express/interfaces'),
        EXPRESS_SERVER: path.join(__dirname, '/../system/express/server'),
        JOI_SCHEMA: path.join(__dirname, '/../application/schema'),
        LOG_DEFAULT_PATH: path.join(__dirname, '/../logs/logs.log'),
        LOG_ERROR_PATH: path.join(__dirname, '/../logs/errors.log'),
        LOG_EXCEPTIONS_PATH: path.join(__dirname, '/../logs/exceptions.log'),
        PUBLIC_FILE_PATH: path.join(__dirname, '/../public'),
        ROUTERS_LOADER: path.join(__dirname, '/../system/express/router'),
        ROUTERS_PATH: path.join(__dirname, '/../protocols/express/routers'),
        SERVICES_PATH: path.join(__dirname, '/../application/services'),
    },
};
