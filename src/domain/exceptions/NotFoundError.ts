import { CustomError } from "./CustomError";
export default class NotFoundError extends CustomError  {
    statusCode = 404;
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}