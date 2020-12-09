'use strict';
import * as environment from '../../../../environment';


let Resource = require('../../../common/base/baseResource').BaseResource;
let config = require('./helloWorld.apiconfig.json');

class HelloWorldResource extends Resource {
    private _config: any;
    private _container: any;

    constructor(app) {
        super(app, config.name);
        this._config = config;
        this._container = app.get('container');
        if (this._config.public) {
            this.createResource(
                this._config.helloWorld.method.toLowerCase(),
                this._config.helloWorld.uri,
                this._config.helloWorld,
                app,
                this.getHelloWorld.bind(this));
        }
    }

    getHelloWorld(req, res) {
        return res.send('hello world');
    }

}

export = HelloWorldResource;
