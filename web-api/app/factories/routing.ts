'use strict';
import {Namespace} from 'continuation-local-storage';
import 'reflect-metadata';
import {FileUtil} from '../common/util/fileUtil';
import {AppSettingsConstants, InjectNameConstants} from '../Contracts/constants';

let debug = require('debug')('code-names:factories:routing');
let fs = require('fs');

export const METADATA_KEY = {
    controller: 'inversify-express-utils:controller',
    controllerMethod: 'inversify-express-utils:controller-method',
    controllerParameter: 'inversify-express-utils:controller-parameter',
    httpContext: 'inversify-express-utils:httpcontext'
};

export function getControllersFromMetadata() {
    let arrayOfControllerMetadata = Reflect.getMetadata(
        METADATA_KEY.controller,
        Reflect
    ) || [];
    return arrayOfControllerMetadata.map((metadata) => metadata.target);
}

interface RoutingConfig {
    modelDirectory: string;
    resourceDirectory: string;
    resourceExt: string;
    altResourceExt: string;
    configExt: string;
    roles: {
        [key: string]: number;
    },
    specialFiles: string[]
}

export class Routing {

    private fileUtil = FileUtil;
    private cls: Namespace;

    constructor(private app: any,
                private models: any,
                private _routingConfig: RoutingConfig
                // private resourceExt: any,
                // private configExt: any,
                // private _specialFiles: any
    ) {
        this.fileUtil.specialFiles = this._routingConfig.specialFiles;
        this.cls = this.app.get(AppSettingsConstants.CONTAINER).getModule(InjectNameConstants.CLS);
    }

    public initResources(resourceDirectory: string, modelDirectory: string): void {
        fs.readdirSync(resourceDirectory).forEach((file: string) => {
            if (fs.lstatSync(resourceDirectory + file).isDirectory()) {
                this.initResources(resourceDirectory + file + '/', modelDirectory);
            } else {
                if (this.fileUtil.isExtension(file, this._routingConfig.resourceExt) || this.fileUtil.isExtension(file, this._routingConfig.altResourceExt)) {
                    console.debug(`[ROUTE SETUP] Importing route class: ${file}`);
                    let routeClass = require(resourceDirectory + file);
                    console.debug(`[ROUTE SETUP] Route class imported: ${file}`);
                    if (this.fileUtil.isSpecialFile(file, this._routingConfig.resourceExt) || this.fileUtil.isSpecialFile(file, this._routingConfig.altResourceExt)) {
                        console.debug('[ROUTE SETUP] Loading model APIs');
                        this.initModelApis(modelDirectory, routeClass);
                        console.debug('[ROUTE SETUP] Model APIs loaded');
                    } else {
                        let extension: string;
                        if (this.fileUtil.isExtension(file, this._routingConfig.resourceExt)) {
                            extension = this._routingConfig.resourceExt;
                        } else {
                            extension = this._routingConfig.altResourceExt;
                        }
                        let routeConfig: object = fs.readFileSync(
                            resourceDirectory + this.fileUtil.swapExtension(file, extension,
                            this._routingConfig.configExt));
                        if (routeConfig) {
                            // const test = this.app.get('container');
                            const controllers = getControllersFromMetadata();
                            const useNewContainer: boolean = this.app.get('useNewContainer');
                            if (!controllers.find((c) => c.name === routeClass.name) || !useNewContainer) {
                                const controller = new routeClass(this.app, this.models, routeConfig);
                            }
                        }
                    }
                }
            }
        });
    }


    private initModelApis(modelDirectory: string, resourceClass: any): void {
        fs.readdirSync(modelDirectory).forEach((model) => {
            if (fs.lstatSync(modelDirectory + model).isDirectory()) {
                this.initModelApis(modelDirectory + model + '/', resourceClass);
            } else {
                if (this.fileUtil.isExtension(model, this._routingConfig.configExt)) {
                    console.debug(`[ROUTE SETUP] Starting model API: ${model}`);
                    let rawModelConfig = fs.readFileSync(modelDirectory + model);
                    let modelConfig = JSON.parse(rawModelConfig);
                    new resourceClass(this.app, this.models, modelConfig);
                    console.debug(`[ROUTE SETUP] Started model API: ${model}`);
                }
            }
        });
    }
}


