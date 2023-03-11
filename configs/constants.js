'use strict';

const path = require('path');

module.exports = {
    // application directory
    PATH: {
        APPLICATION_MODULES: path.join(__dirname, '/modules'),
        APPLICATION_TOOLS: path.join(__dirname, '/tools'),
    },
};
