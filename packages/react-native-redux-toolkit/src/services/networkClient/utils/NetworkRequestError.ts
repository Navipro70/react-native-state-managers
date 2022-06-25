export class NetworkRequestError {
  name = ''
  message = ''
  statusCode = 0
  constructor({ message, statusCode }: { message: string; statusCode: number }) {
    this.message = message
    this.statusCode = statusCode
  }
}
