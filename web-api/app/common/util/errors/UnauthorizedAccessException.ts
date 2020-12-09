export class UnauthorizedAccessException extends Error {
    message: string;
    name: string;
    status: number = 401;
    constructor(message: string = 'Unauthorized Access', name: string = 'UnauthorizedAccessException') {
        super();
        this.message = message;
        this.name = name;
    }
}

