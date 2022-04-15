declare class ErrorException extends Error {
    statusCode: number;
    constructor(message: string, statusCode: number);
}
export default ErrorException;
