import * as http from 'http-status-codes';

/**
 * @export
 * @class HttpError
 * @extends {Error}
 */
export class HttpError extends Error {
  status: number;
  message: string;
  name: 'HttpError';

  /**
   * Creates an instance of HttpError
   * @params {number} [status]
   * @params {string} {message}
   * @memberof HttpError
   */
  constructor(status?: number, message?: string) {
    super(message);

    Error.captureStackTrace(this, this.constructor);
    console.log(status);
    this.status = status || 500;
    console.log(this.status);

    // @ts-ignore: Unreachable code error
    this.name = this.name;
    this.message = message || http.StatusCodes[this.status];
    console.log(http.StatusCodes[this.status], 'httpstatus error');
  }
  //
}
