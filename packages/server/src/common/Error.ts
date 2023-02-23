interface ErrorParams {
  status: number,
  name?: string,
  data?: object,
  message?: string,
}

/**
 * Custom error exception
 */
export class ErrorObj {
  public status: number;
  public name?: string;
  public data: object;
  public message: string;

  /* eslint-disable-next-line require-jsdoc */
  constructor (params: ErrorParams) {
    this.status = params.status;
    this.name = params.name;
    this.data = params.data || {};
    this.message = params.message = 'Unexpected error';
  }
}