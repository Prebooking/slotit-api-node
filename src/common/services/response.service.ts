import { Injectable } from '@nestjs/common';
@Injectable()
export class ResponseService {
  successResponse(message: string, data?: any) {
    return {
      status: true,
      message: message,
      data: data,
    };
  }

  errorResponse(message: string) {
    return {
      status: false,
      message: message,
    };
  }
}
