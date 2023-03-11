'use strict';

console.time('Total application preparation time');
const moduleAsync = require('async');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// LOAD APPLICATION'S CONSTANTS
console.time('Loading app constants');
const CONSTANTS = require('./configs/constants');
const {PATH} = CONSTANTS;
console.timeEnd('Loading app constants');

// DEFINE ALL MODULES
console.time('Loading app modules');
const MODULES = require(PATH.APPLICATION_MODULES);
console.timeEnd('Loading app modules');

// INITIALIZE TOOLS, LIBRARIES AND WHOLE APPLICATION
// eslint-disable-next-line require-jsdoc
function initiateTools(callback) {
    require(PATH.APPLICATION_TOOLS)(MODULES, CONSTANTS, callback);
}

// STARTING APPLICATION SERVER (Express, RPC, etc)
// eslint-disable-next-line require-jsdoc
function initiateAppServers(err, tools) {
    if (err) {
        throw err;
    } else {
        console.timeEnd('Total application preparation time');

        // Initialize express server
        require(PATH.EXPRESS_SERVER)(tools, MODULES, CONSTANTS);
    }
}

// DOING ASYNC.waterfall BECAUSE SEVERAL PROCESS NEEDS BLOCKING PROCESSING
moduleAsync.waterfall([initiateTools], initiateAppServers);
