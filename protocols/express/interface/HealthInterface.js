module.exports = function(TOOLS, MODULES, CONSTANTS) {
    return {
        liveness: async (previousData, req, res, next) => {
            next(null, {
                code: 200, message: 'Alive', version: process.env.npm_pacakge_version,
            });
        },
    };
};
