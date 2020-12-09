
export module Constants {
    export const test = 3;
    export module InjectableNamespace {
        export const INJECTABLE_CLASS = 'code-names:injectableClass';
        export const INJECT_NAME = 'code-names:injectName';
    }

}


export module AppSettingsConstants {
    export const CONTAINER = 'container';
}

export module InjectNameConstants {
    export module Services {
    }

    export module Middleware {
    }

    // Non-services
    export const CLS = 'namespace';
    export const ENV_CONFIG = 'envConfig';
    export const DB_CONFIG = 'dbConfig';
    export const CACHE_CONFIG = 'cacheConfig';
}

export module CLSConstants {
    export const
        GLOBAL_NAMESPACE = 'code-names',
        RESPONSE = 'response',
        PAGINATION = 'pagination',
        REQUEST = 'request',
        MODEL_NAME = 'modelName'
    ;
}

export enum HttpStatus {
    Ok = 200,
    Created = 201,
    NoContent = 204,
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    ServerError = 500
}

export module HttpMethods {
    export const
        GET = 'GET',
        POST = 'POST',
        PATCH = 'PATCH',
        DELETE = 'DELETE'
    ;
}
