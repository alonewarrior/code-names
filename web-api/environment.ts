import {LoggingLevel} from './common';
import {Environment} from './typings';

const path = require('path');

const config: Environment = {
    autoRestart: false,
    testMode: false,
    port: 8100,
    type: 'dev',
    numProcesses: '1',
    local: false,
    logging: {
        logDir: `${__dirname}${path.sep}logs`,
        level: LoggingLevel.Info
    },
    uiUrl: 'localhost:4200',
    pageSize: 0
};

export = config;
