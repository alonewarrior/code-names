'use strict';
import * as path from 'path';
import * as environment from '../environment';

let morgan = require('morgan');
let express = require('express');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
import {Response} from 'express';

module Environment  {
    export const LOCAL = 'local';
    export const DEV = 'dev';
    export const INT = 'int';
    export const PROD = 'prod';
}

// Config values
const API_BASE_URI_VALUE = '/api/';
const API_LOGGING_VALUE = false;
const URI_LOGGER_PATTERN_VALUE = ':date[iso] :method :url :status :response-time ms - :res[content-length]';
const ENVIRONMENTS_API_VIEWER_ENABLED_VALUES = [Environment.LOCAL, Environment.DEV, Environment.INT];

const BODY_PARSER_JSON_LIMIT_VALUE = '5mb';
const BODY_PARSER_JSON_TYPE_VALUE = 'application/vnd.api+json';

const BODY_PARSER_URL_ENCODED_LIMIT_VALUE = '5mb';

// Config keys
const API_BASE_URI = 'baseUrl';
const API_LOGGING = 'apiLogging';


module.exports = function (app) {
    require('./../app/common/util');
    let passport = app.get('passport');
    app.set(API_BASE_URI, API_BASE_URI_VALUE);
    app.set(API_LOGGING, API_LOGGING_VALUE);

    // route logging
    const uriLogger = morgan(URI_LOGGER_PATTERN_VALUE);
    app.use(uriLogger);

    // api viewer page
    if (ENVIRONMENTS_API_VIEWER_ENABLED_VALUES.includes(environment.type)) {
        console.log(__dirname);
        console.log(path.join(__dirname, '../public_dev'));
        app.use(express.static(path.join(__dirname, '../public_dev')));
    }

    // front end app
    app.use(express.static(path.join(__dirname, 'public')));

    // content type
    app.use(bodyParser.json({limit: BODY_PARSER_JSON_LIMIT_VALUE, type: BODY_PARSER_JSON_TYPE_VALUE}));
    app.use(bodyParser.urlencoded({limit: BODY_PARSER_URL_ENCODED_LIMIT_VALUE, extended: false}));

    // cookie parsing
    app.use(cookieParser('keyboard cat'));


    app.all(/^(?!\/api|\/apiViewer).*$/, function (req, res) {
        var options = {
            root: './public'
        };
        if ((req.url.search(/\/assets\/.*/)) !== -1) {
            res.sendFile(req.url, options);
        } else {
            res.sendFile('/index.html', options);
        }
    });

    app.all(/\/api\/.*/, function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
        const namespace = app.get('container').getModule('namespace');
        namespace.run(() => {
            let authorization = req.headers['authorization'];
            if (authorization && authorization !== '') {
                passport.authenticate('bearer', (err, user) => {
                    if (err) {
                        res.send(err);
                    } else {
                        req.user = user;
                        next();
                    }
                })(req, res, next);
            } else {
                req.guest = 'guest';
                next();
            }
        });
    });
};
