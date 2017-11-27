export const enum ErrorCode
{
    KEY_IS_EMPTY = 105,
    KEY_NOT_VALID = 106,
    KEY_NOT_FOUND = 101,
    INSERT_FAILED = 102,
    DELETE_FAILED = 103,
    UPDATE_FAILED = 104
}

export class Error
{

    code: ErrorCode;
    message: string;
    reason: string;
    solution: string;
    details: string;

    constructor ( { code, message, reason, solution, details } )
    {
        this.code = code;
        this.message = message;
        this.reason = reason;
        this.solution = solution;
        this.details = details;
    }

}
