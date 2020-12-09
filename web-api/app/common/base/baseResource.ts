'use strict';
import {Router} from 'express';
import {Middleware} from '../util/middleware/middleware';
let bodyParser = require('body-parser');

// the initialized _database object within the container

export class BaseResource {
    protected resource_name: string;
    protected router: Router;
    private app;


    constructor(app, resource_name: string)
    {
        this.app = app;
        this.resource_name = app.get('baseUrl') + resource_name;
        this.router = app.get('express').Router();
        app.use(this.resource_name, this.router);
        this.setParser();
    }

    createResource(method, url, config, app, resource);
    createResource(method, url, config, app, resource, parser: string);
    createResource(method, url, config, app, resource, parser: string, size: string);
    createResource(method, url, config, app, resource, parser?: string, size?: string) {
        if (config.enabled) {
            if (parser || size) {
                parser = parser || 'application/vnd.api+json';
                size = size || '5mb';
                const router = app.get('express').Router();
                router.use(bodyParser.json({ type: parser, limit: size }));
                router[method]('/', Middleware.buildMiddlewareStack(config, app, resource));
                this.app.use(`${this.resource_name}${url}`, router);
            } else {
                this.router[method](url, Middleware.buildMiddlewareStack(config, app, resource));
            }
        }
    }

    private wrapperMethod(innerMethod) {
        return (req, res, next) => {
            try {
                return innerMethod(req, res, next);
            } catch (e) {
                return next(e);
            }
        };
    }
    
    setParser(type: string = 'application/vnd.api+json', limit: string = '5mb'): void {
        this.router.use(bodyParser.json({ type, limit }));
    }
}

