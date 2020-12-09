let express = require('express');
let BPromise = require('bluebird');
let path = require('path');
let favicon = require('serve-favicon');
let compression = require('compression');
const fs = require('fs');
const cors = require('cors');
const environment = require('./environment');

let app = express();

const corsOptions = {};

// making a minor change

app.options('*', cors(corsOptions));

app.set('baseDir', __dirname);
app.set('apiLog', null);
app.use(compression());

app.set('envConfig', environment);

const logDir = path.join(__dirname, environment.logDir || 'logs');
fs.existsSync(logDir) || fs.mkdirSync(logDir);
// app.use(logger('combined', {stream: accessLogStream}));

if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = app.get('envConfig').type;
    app.set('env', app.get('envConfig').type);
}
app.set('express', express);
app.set('Promise', BPromise);
app.set('passport', require('passport'));
// Initialize the container and _database module
console.info('[CONTAINER] Initializing Container');
let container = require('./config/container.config')(app, app.get('envConfig'));
console.info('[CONTAINER] Initialized Container');
app.set('container', container);


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// let multer = require('multer');
//
//
// app.use(multer({
//     storage: multer.memoryStorage()
// }).single('photo'));
app.set('fileStore', environment.images_bucket);

// Passport, authentication and sessions

// sends flash messages to views

require('./config/app.config')(app);

let routingConfig = require('./config/routing.config');
let routing = require('./app/factories/routing').Routing;
let configRoutes = new routing(app, [], routingConfig);
console.info('[API] Initializing API');
configRoutes.initResources(routingConfig.resourceDirectory, routingConfig.modelDirectory);
console.info('[API] Completed API initialization');

// app = configRoutes.initInversifyContainerApp();


// error setup
require('./config/error.config').error(app);

module.exports = app;

export {};
