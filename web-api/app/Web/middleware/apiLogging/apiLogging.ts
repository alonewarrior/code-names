import { MiddlewareInterface } from '../../../common/base/interfaces/middleware.interface';
import {Namespace} from 'continuation-local-storage';
import {InjectNameConstants} from '../../../Contracts/constants';
import {ApiLog} from '../../../common/util/interfaces/apiLog';
import {Express, NextFunction, Request, Response} from 'express';

export class ApiLogging implements MiddlewareInterface {
    private cls: Namespace;

    constructor(private app: Express, private config: any) {
        this.cls = app.get('container').getModule(InjectNameConstants.CLS);
    }

    public handler(req: Request, res: Response, next: NextFunction) {
        if (this.app.get('env') === 'development' && this.app.get('apiLogging') === true && req.method !== 'GET') {
            this.cls.run(() => {
                this.setupLog(req, res, next);
                next();
            });
        } else {
            next();
        }
    }

    private setupLog(req: Request, res: Response, next: NextFunction): void {
        const apiLog: ApiLog = {
            request: req.body,
            originalUrl: req.originalUrl,
            baseUrl: req.baseUrl,
            requestType: req.method
        };

        this.cls.set('apiLog', apiLog);
    }
}
