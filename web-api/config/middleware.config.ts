const middlewareConfig = {
    'ordering': [
        'pre-auth',
        'auth',
        'post-auth',
        'resource',
        'post-resource'
    ],
    'defaultMiddleware': {
        'pre-auth': [
            require('../app/Web/middleware/apiLogging/apiLogging').ApiLogging
        ],
        'post-auth': []
    },
    'customMiddleware': {
    }
};

module.exports = middlewareConfig;
