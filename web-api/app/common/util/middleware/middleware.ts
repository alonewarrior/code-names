let middleware = require('../../../../config/middleware.config');
export class Middleware {

    private static middlewareConfig = middleware;

    public static buildMiddlewareStack(modelConfig: any, app: any, resource: any, middlewareConfig: any = middleware): object{
        let stack = [];
        for (let key in middlewareConfig.ordering) {
            if (!middlewareConfig.ordering.hasOwnProperty(key)) continue;
            let ordering = middlewareConfig.ordering[key];
            if (ordering === 'resource') {
                stack.push(resource);
            } else if (modelConfig.middleware[ordering] && modelConfig.middleware[ordering].length > 0) {
                modelConfig.middleware[ordering].forEach((elem) => {
                    if (middlewareConfig.defaultMiddleware[elem]) {
                        let middleware = new middlewareConfig.defaultMiddleware[elem](app, modelConfig);
                        stack.push(middleware.handler.bind(middleware));
                    } else if (middlewareConfig.customMiddleware[elem]) {
                        let middleware = new middlewareConfig.customMiddleware[elem](app, modelConfig);
                        stack.push(middleware.handler.bind(middleware));
                    } else {
                        throw new Error(`${elem} Middleware has not been registered or has a typo.`);
                    }
                });
            } else if (typeof middlewareConfig.defaultMiddleware[ordering] === 'function') {
                let middleware = new middlewareConfig.defaultMiddleware[ordering](app, modelConfig);
                stack.push(middleware.handler.bind(middleware));
            } else if (Array.isArray(middlewareConfig.defaultMiddleware[ordering])) {
                middlewareConfig.defaultMiddleware[ordering]
                    .forEach((m) => {
                        let middleware = new m(app, modelConfig);
                        stack.push(middleware.handler.bind(middleware));
                    });
            }
        }
        return stack;
    }
}
