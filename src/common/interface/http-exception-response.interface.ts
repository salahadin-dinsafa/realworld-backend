export interface HttpExceptionResponse {
    statusCode: number;
    error: string;
    message?: string;
}

export interface CustomHttpExceptionResponse extends HttpExceptionResponse {
    method: string;
    path: string;
    timeStamp: string;
}
export interface RealWorldHttpExceptionResponse {
    errors: any
}