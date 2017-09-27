import { ErrorCode } from '../app.enum';

export class Error {

    code: ErrorCode;
    message: string;
    reason: string;
    solution: string;
    details: string;

    constructor({code, message, reason, solution, details}) {
        this.code = code;
        this.message = message;
        this.reason = reason;
        this.solution = solution;
        this.details = details;
    }

}
