export class ConflictException extends Error {
    message: string;
    name: string;
    status: number = 409;
    constructor(message: string, name: string = 'ConflictException') {
        super();
        this.message = message;
        this.name = name;
    }
}

