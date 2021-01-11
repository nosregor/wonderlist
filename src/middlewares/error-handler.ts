export class BadRequestError extends Error {
  statusCode: number;
  data?: object;

  constructor(message: string, data?: object) {
    super(message);
    this.data = data;
    this.statusCode = 400;
  }

  public static from(error: Error): BadRequestError {
    return new BadRequestError(error.message)
  }
}
