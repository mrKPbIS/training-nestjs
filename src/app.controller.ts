import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import * as fs from 'fs';
import { Res } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Res() res) {
    res.sendFile(__dirname + '/public/index.html');
  }

  @Get('fib')
  getFib() {
    return this.appService.getFib();
  }
}
