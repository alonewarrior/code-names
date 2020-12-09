import {WebApiController} from './types';

export function Controller(routeName: string) {
    return (target): typeof WebApiController => {
        return class WebApiController extends target {
            _routeName = routeName;
        };
    };
}

/**
 * for routes:
 * need name,
 * method type,
 * input type,
 *
 */
