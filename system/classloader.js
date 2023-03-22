'use strict';

/**
 * @module system/classloader
 */

require('../typedef');

// eslint-disable-next-line valid-jsdoc
/**
 * @param {TOOLS} TOOLS
 * @param {MODULES} MODULES
 * @param {CONSTANTS} CONSTANTS
 * @param {string} FILE_PATH
 */
module.exports = function(TOOLS, MODULES, CONSTANTS, FILE_PATH) {
    const fs = MODULES.FS;
    const path = MODULES.PATH;
    const log = TOOLS.LOG;
    const classes = {};

    /**
     * Import classes recursively from a directory, return a list of class
     * @param {string} dirPath Directory of the classes
     * @return {void}
     */
    function readRecursive(dirPath) {
        fs.readdirSync(dirPath)
            .forEach(function(file) {
                const currentPath = dirPath + '/' + file;
                if (fs.statSync(currentPath)
                    .isDirectory()) {
                    readRecursive(currentPath);
                } else {
                    if (file.indexOf('.') !== 0 && file.slice(-3) === '.js') {
                        const className = file.replace(/\.js$/, '');
                        classes[className] = require(path.join(dirPath, className))(TOOLS, MODULES, CONSTANTS);
                    } else {
                        log.warn(`file '${currentPath + '/' + file}' is not supported for basic application class`);
                    }
                }
            });
    }

    readRecursive(FILE_PATH);
    return classes;
};
