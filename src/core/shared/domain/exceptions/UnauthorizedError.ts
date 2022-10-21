import { CustomError } from "./CustomError";
export default class UnauthorizedError extends CustomError  {
    statusCode = 401;
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }
}