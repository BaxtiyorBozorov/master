import { log } from 'console';

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // Xatolik tafsilotlarini olish
    let errorMessage = 'Unknown error';
    let errorResponse: any = null;

    if (exception instanceof HttpException) {
      errorResponse = exception.getResponse();
      if (typeof errorResponse === 'object' && errorResponse !== null) {
        errorMessage = errorResponse['message'] || JSON.stringify(errorResponse);
      } else {
        errorMessage = exception.message;
      }
    } else if (exception instanceof Error) {
      errorMessage = exception.message;
    }

    log(exception);

    response.status(status).json({
      success: false,
      statusCode: status,
      path: request.url,
      timestamp: new Date().toISOString(),
      message: errorMessage,
    });
  }
}
