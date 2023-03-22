
'use strict';

module.exports = function(TOOLS, MODULES, CONSTANTS) {
    console.time('Loading express engine');

    // Initialize Express engine
    // eslint-disable-next-line new-cap
    const APP = MODULES.EXPRESS();
    APP.use(MODULES.BODY_PARSER.urlencoded({extended: false}));
    APP.use(MODULES.BODY_PARSER.json({extended: true}));
    // eslint-disable-next-line new-cap
    APP.use(MODULES.CORS());
    APP.use(MODULES.EXPRESS_LOGGER.create(TOOLS.LOG));
    // eslint-disable-next-line new-cap
    APP.use(MODULES.METHOD_OVERRIDE());

    // Make directory '/public' as a static file content
    APP.use('/public', MODULES.EXPRESS.static(CONSTANTS.PATH.PUBLIC_FILE_PATH));

    // Secure Express HTTP Headers
    // eslint-disable-next-line new-cap
    APP.use(MODULES.HELMET());

    // Initialize express interface
    TOOLS.INTERFACES.EXPRESS = require(CONSTANTS.PATH.CLASS_LOADER)(
        TOOLS,
        MODULES,
        CONSTANTS,
        CONSTANTS.PATH.EXPRESS_INTERFACES_PATH)
    ;

    // const {RoleCheckingInterface, GoogleAuthInterface, AuthInterface} = MODULES.AUTH;
    // eslint-disable-next-line new-cap
    // TOOLS.INTERFACES.EXPRESS.AuthorizationInterface = RoleCheckingInterface();
    // TOOLS.INTERFACES.EXPRESS.GoogleAuthInterface = GoogleAuthInterface();
    // TOOLS.INTERFACES.EXPRESS.AuthInterface = AuthInterface(TOOLS);

    // Initialize routers
    require(CONSTANTS.PATH.ROUTERS_LOADER)(TOOLS, APP, CONSTANTS, MODULES);

    // Not found route handler
    APP.use(function(req, res) {
        return res.status(404).json({status: MODULES.HTTP.STATUS_CODES[404]});
    });

    // Unhandled error should be 'handled'
    APP.use(function(err, req, res) {
        TOOLS.LOG.error(err);
        return res.status(500).json({
            code: 500,
            status: MODULES.HTTP.STATUS_CODES[500],
            message: 'Unhandled error',
            data: {},
        });
    });

    return new Promise(function(resolve) {
        // Starting the application server
        const SERVER = APP.listen(process.env.APP_PORT, function() {
            console.timeEnd('Loading express engine');
            console.info('Listening on port: ' + SERVER.address().port);
        });
        // Return APP for testing purpose
        resolve(SERVER);
    });
};
