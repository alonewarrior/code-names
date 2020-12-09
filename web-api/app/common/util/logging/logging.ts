import * as fs from 'fs';
import * as util from 'util';
import * as environment from '../../../../environment';

export enum LoggingLevel {
    Debug,
    Info,
    Log,
    Warn,
    Error
}

export function setupDebug(dir: string, fileName: string = 'node.access.log', options?: ILoggerOptions) {
    const defaultOptions = {
        prepend: 'Debug',
        includeDate: true,
        addDateToFileName: true
    };
    options = !!options ? {...defaultOptions, ...options} : defaultOptions;
    const internalOptions: IInternalLoggerOptions = {...options, logLevel: LoggingLevel.Debug};
    setupConsole('debug', dir, fileName, internalOptions);
}

export function setupWarn(dir: string, fileName: string = 'node.access.log', options?: ILoggerOptions) {
    const defaultOptions = {
        prepend: 'Warning',
        includeDate: true,
        addDateToFileName: true
    };
    options = !!options ? {...defaultOptions, ...options} : defaultOptions;
    const internalOptions: IInternalLoggerOptions = {...options, logLevel: LoggingLevel.Warn};
    setupConsole('warn', dir, fileName, internalOptions);
}

export function setupInfo(dir: string, fileName: string = 'node.access.log', options?: ILoggerOptions) {
    const defaultOptions = {
        prepend: 'Info',
        includeDate: true,
        addDateToFileName: true
    };
    options = !!options ? {...defaultOptions, ...options} : defaultOptions;
    const internalOptions: IInternalLoggerOptions = {...options, logLevel: LoggingLevel.Info};
    setupConsole('info', dir, fileName, internalOptions);
}

export function setupLog(dir: string, fileName: string = 'node.access.log', options?: ILoggerOptions) {
    const defaultOptions = {
        prepend: 'Log',
        includeDate: true,
        addDateToFileName: true
    };
    options = !!options ? {...defaultOptions, ...options} : defaultOptions;
    const internalOptions: IInternalLoggerOptions = {...options, logLevel: LoggingLevel.Log};
    setupConsole('log', dir, fileName, internalOptions);
}

export function setupError(dir: string, fileName: string = 'node.error.log', options?: ILoggerOptions) {
    const defaultOptions = {
        prepend: 'Error',
        includeDate: true,
        addDateToFileName: true
    };
    options = !!options ? {...defaultOptions, ...options} : defaultOptions;
    const internalOptions: IInternalLoggerOptions = {...options, logLevel: LoggingLevel.Error};
    setupConsole('error', dir, fileName, internalOptions);
}


export interface ILoggerOptions {
    prepend?: string;
    includeDate?: boolean;
    addDateToFileName?: boolean;
    nestedDir?: string;
}

interface IInternalLoggerOptions extends ILoggerOptions {
    logLevel?: LoggingLevel;
}


function setupAppend(file: string, message: string, trueFunc: Function): void {
    fs.appendFile(`${file}`,
        `${message}\n`,
        function (err) {
            if (err) {
                return trueFunc(err);
            }
        });
}

function setupConsole<T extends keyof Console>(func: T,
                                               dir: string,
                                               fileName: string,
                                               options?: IInternalLoggerOptions) {
    const trueFunc = console[func] as (...args: any[]) => void;

    // @ts-ignore
    console[func] = function (...msg) {
        const date = new Date();
        const filePartDate = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
        const tempFileName = options.addDateToFileName ? `${filePartDate}-${fileName}` : fileName;
        const file = `${dir}/${tempFileName}`;
        // @ts-ignore
        let tempMsg = util.format(...msg);
        let prepend = '';
        if (options.includeDate) {
            const date = new Date();
            prepend = `[${date.toISOString()}]`;
        }
        if (options.prepend) {
            prepend = `${prepend}[${options.prepend}] `;
        }

        tempMsg = `${prepend}${tempMsg}`;
        setupAppend(file, tempMsg, trueFunc);
        if (canLog(options.logLevel, environment.logging.level)) {
            const style = getStyle(options.logLevel);
            if (style) {
                trueFunc(style, tempMsg);
            } else {
                trueFunc(tempMsg);
            }
        }
    };
}


function getStyle(logLevel: LoggingLevel) {
    switch (logLevel) {
        case LoggingLevel.Log:
        case LoggingLevel.Info:
            return '\x1b[0m';
        case LoggingLevel.Debug:
            return '\x1b[34m';
        case LoggingLevel.Error:
            return '\x1b[31m';
        case LoggingLevel.Warn:
            return '\x1b[33m';
        default:
            return null;
    }
}

function getCaller(): any {
    let err;
    try {
        throw new Error();
    } catch (e) {
        err = e;
    }
    const temp = err.stack
        .split('\n')[3]
        .trim();
    return temp;
}

function canLog(logLevel: LoggingLevel, configLevel: LoggingLevel): boolean {
    return logLevel >= configLevel;
}
