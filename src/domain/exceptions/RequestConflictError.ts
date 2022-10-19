import { CustomError } from "./CustomError";
export default class RequestConflictError extends CustomError  {
    statusCode = 409;
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, RequestConflictError.prototype);
    }
}