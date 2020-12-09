
export enum LogLevel {
    Error = 1,
    Warn = 2,
    'testing' = 3,
    'development' = 4
}

export enum ColorOptions {
    Reset = '\x1b[0m',
    Bright = '\x1b[1m',
    Dim = '\x1b[2m',
    Underscore = '\x1b[4m',
    Blink = '\x1b[5m',
    Reverse = '\x1b[7m',
    Hidden = '\x1b[8m',

    FgBlack = '\x1b[30m',
    FgRed = '\x1b[31m',
    FgGreen = '\x1b[32m',
    FgYellow = '\x1b[33m',
    FgBlue = '\x1b[34m',
    FgMagenta = '\x1b[35m',
    FgCyan = '\x1b[36m',
    FgWhite = '\x1b[37m',

    BgBlack = '\x1b[40m',
    BgRed = '\x1b[41m',
    BgGreen = '\x1b[42m',
    BgYellow = '\x1b[43m',
    BgBlue = '\x1b[44m',
    BgMagenta = '\x1b[45m',
    BgCyan = '\x1b[46m',
    BgWhite = '\x1b[47m'
}

export class LoggerService {
    enabled = true;
    constructor(private _name: string, private _color: ColorOptions = ColorOptions.FgBlack) {
    }


    log(msg?: any, ...optMsg: any[]): void {
        if (LogLevel[process.env.NODE_ENV] === LogLevel.development && this.enabled) {
            console.debug(...this.prep(msg, ...optMsg));
        }
    }

    info(msg?: any, ...optMsg: any[]): void {
        if (LogLevel[process.env.NODE_ENV] <= LogLevel.testing && this.enabled) {
            console.info(...this.prep(msg, ...optMsg));
        }
    }

    warn(msg?: any, ...optMsg: any[]): void {
        if (LogLevel[process.env.NODE_ENV] <= LogLevel.Warn && this.enabled) {
            console.warn(...this.prep(msg, ...optMsg));
        }
    }

    error(msg?: any, ...optMsg: any[]): void {
        if (LogLevel[process.env.NODE_ENV] <= LogLevel.Error && this.enabled) {
            console.error(...this.prep(msg, ...optMsg));
        }
    }

    private prep(msg?: any, ...optMsg: any[]): any[] {
        const output = [`${this._color}%s${ColorOptions.Reset}`, `[${this._name}]`];
        if (msg) {
            output.push(msg);
        }
        if (optMsg) {
            output.push(...optMsg);
        }
        return output;
    }
}
