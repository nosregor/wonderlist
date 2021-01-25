import * as http from 'http-status-codes';

/**
 * @export
 * @class HttpError
 * @extends {Error}
 */
export class HttpError extends Error {
  name: string;
  message: string;
  status: number;

  /**
   * Creates an instance of HttpError
   * @params {number} [status]
   * @params {string} [message]
   * @memberof HttpError
   */
  constructor(status?: number, message?: string) {
    super(message);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HttpError);
    }

    this.status = status || 500;

    this.name = http.StatusCodes[this.status] || 'Error';

    this.message =
      message || http.StatusCodes[this.status] || 'Error';
  }
}
