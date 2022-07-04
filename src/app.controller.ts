import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/status')
  @HttpCode(HttpStatus.NO_CONTENT)
  async status() {
    return 'ok';
  }
}
