'use strict';
import {ApiViewerService} from '../../apiViewer/apiViewer.service';
import * as environment from '../../../../environment';
import {Response} from 'express';


let Resource = require('../../../common/base/baseResource').BaseResource;
let config = require('./apiViewer.apiconfig.json');

class ApiViewerResource extends Resource {
    private config: any;
    private _apiViewerService: ApiViewerService;
    private _container: any;

    constructor(app, models) {
        super(app, 'apiViewer');
        this.config = config;
        this._container = app.get('container');
        this._apiViewerService = this._container.getModule('ApiViewerService');
        if (this.config.public && environment.type === 'dev') {
            this.createResource(
                this.config.getResources.method.toLowerCase(),
                this.config.getResources.uri,
                this.config.getResources,
                app,
                this.getApiResources.bind(this));
        }
    }

    getApiResources(req, res, next) {
        const resources = this._apiViewerService.getResources();
        return res.json(resources);
    }

}

export = ApiViewerResource;
