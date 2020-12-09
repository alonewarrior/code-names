'use strict';

import {HttpStatus} from '../app/Contracts/constants';

export function error(app): void {

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        var err: any = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handlers

    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function (err, req, res, next) {
            const errStatus = err.status || 500;
            err.status = errStatus.toString();
            res.status(errStatus);
            console.error(err);
            const responseError = new SerializedHttpError(err.message, err.status);
            res.json(responseError);
        });
    }

    // production error handler
    // no stacktraces leaked to user
    if (app.get('env') === 'prod') {
        app.use(function (err, req, res, next) {
            const errStatus = err.status || 500;
            res.status(errStatus);
            console.error(err);
            let message: string;
            if (errStatus >= 500) {
                message = 'Something went wrong on our end, please hang tight while we attempt to resolve it :)';
            } else {
                message = err.message;
            }
            const responseError = new SerializedHttpError(message, errStatus.toString());
            return res.json(responseError);
        });
    }
}

class SerializedHttpError extends Error {
    constructor(message: string, public status: string) {
        super(message);
    }
}
