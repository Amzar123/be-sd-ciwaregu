'use strict';

module.exports = [
    {
        method: 'get',
        endpoint: '/liveness',
        handlers: [
            'HealthInterface.liveness',
        ],
    },
];
