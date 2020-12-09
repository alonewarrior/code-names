export class NotFoundException extends Error {
    name: string;
    message: string;
    status: number = 404;
    
    constructor(message: string, name: string = 'NotFoundException') {
        super();
        this.message = message;
        this.name = name;
    }
}
