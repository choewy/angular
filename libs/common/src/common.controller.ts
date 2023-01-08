import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class CommonController {
  @Get()
  redirect(@Res() response: Response): void {
    return response.redirect('document');
  }

  @Get('document')
  document(@Res() response: Response): void {
    return response.sendFile(process.cwd() + '/documentation/index.html');
  }
}
