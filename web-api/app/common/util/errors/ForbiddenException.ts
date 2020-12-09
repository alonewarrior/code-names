export class ForbiddenException extends Error {
    message: string;
    name: string;
    status: number = 403;
    constructor(message: string, name: string = "ForbiddenException") {
        super();
        this.message = message;
        this.name = name;
    }
}

