export interface MiddlewareInterface {
    handler(req: object, res: object, next: any): any
}

