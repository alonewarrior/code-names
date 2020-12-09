export class InvalidOperationException extends Error {
    message: string;
    name: string;
    constructor(message: string, name: string = 'InvalidOperationException') {
        super();
        this.message = message;
        this.name = name;
    }
}

