import {
  Catch,
  ExceptionFilter,
  HttpException,
  ArgumentsHost,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();

    const message =
      exception.message ||
      `${status >= 500 ? 'Service Error' : 'Client Error'}`;

    response.status(status).json({
      code: status,
      message,
      timestamp: new Date().toString(),
    });
  }
}
