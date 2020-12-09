import Container from 'kontainer-di';
import * as path from 'path';
import moduleConfig from './module.config.json';

require('reflect-metadata');
// const moduleConfig = require('./module.config.json');

export function containerInit(app, envConfig) {
    const InjectNameConstants = require('../app/Contracts/constants').InjectNameConstants;
    const container: Container = require('kontainer-di/container'),
        clsFactory = require('../app/factories/cls')
    ;

    container.registerModule(InjectNameConstants.ENV_CONFIG, [], envConfig);
    container.register(InjectNameConstants.DB_CONFIG, [], envConfig.database);
    container.register(InjectNameConstants.CACHE_CONFIG, [], envConfig.cache || {});
    container.register(InjectNameConstants.CLS, [], clsFactory);
    // container.register(Types.AutoMapper, [], autoMapperFactory.getMapper);


    console.info('[CONTAINER] Loading App Modules');
    loadAppModules(container);
    console.info('[CONTAINER] Loaded App Modules');

    return container;
}

function loadAppModules(container: Container) {
    const Constants = require('../app/Contracts/constants').Constants;
    const fs = require('fs');
    const glob = require('glob');
    // const dir2 = path.join(__dirname, moduleConfig.moduleRootDir);
    const root = __dirname + '/../app/';

    console.info('[CONTAINER MODULES] Loading Modules');
    const result = glob.sync('**/module.*s', {cwd: root});
    result.forEach(x => {
        require(`${__dirname}/../app/${x}`);
    });
    console.info('[CONTAINER MODULES] Loaded Modules');

    const checkForInjectionName = (targets, k) => {
        if (!container.modules.hasOwnProperty(k) && targets.indexOf(k) === -1) {
            throw new Error(`Inject name (${k}) is not registered in the container and/or is not marked as injectable`);
        }
    };

    const data = Reflect.getMetadata(Constants.InjectableNamespace.INJECTABLE_CLASS, Reflect);
    const dataKeys = Object.keys(data);
    for (const key in data) {
        if (!container.modules.hasOwnProperty(key)) {
            const injectable = data[key];
            const injectionKeys = Reflect.getOwnMetadata(Constants.InjectableNamespace.INJECT_NAME, injectable) || [];
            injectionKeys.forEach(ik => checkForInjectionName(dataKeys, ik));

            container.register(key, injectionKeys, injectable);
        } else {
            throw new Error(`Injectable class (${key}) is already registered and cannot be registered a second time`);
        }
    }
}

module.exports = containerInit;

// export the configured container itself (yep it's a Singleton)
