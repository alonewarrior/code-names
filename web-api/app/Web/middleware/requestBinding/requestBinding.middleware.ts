import {MiddlewareInterface} from '../../../common/base/interfaces/middleware.interface';
import {Namespace, getNamespace} from 'continuation-local-storage';
import {CLSConstants} from '../../../Contracts/constants';

export class RequestBindingMiddleware implements MiddlewareInterface {
    public handler(req: object, res: object, next: any): any {
        const namespace = getNamespace(CLSConstants.GLOBAL_NAMESPACE);
        namespace.set(CLSConstants.REQUEST, req);
        next();
    }
}
