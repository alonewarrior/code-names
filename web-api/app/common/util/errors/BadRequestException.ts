export class BadRequestException extends Error {
    readonly message: string;
    readonly name: string = 'BadRequestException';
    readonly status: number = 400;

    constructor(message: string) {
        super();
        this.message = message;
    }
}

