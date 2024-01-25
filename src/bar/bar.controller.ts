import {
  Body,
  Controller,
  Get,
  Inject,
  OnApplicationBootstrap,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices/client';
import { timeout } from 'rxjs';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { Roles } from 'src/roles/roles.decorator';
import { BarService } from './bar.service';

@Controller('bar')
export class BarController implements OnApplicationBootstrap {
  constructor(
    private readonly service: BarService,
    @Inject('FIB_SERVICE') private readonly fibClient: ClientProxy,
  ) {}

  async onApplicationBootstrap() {
    await this.fibClient.connect();
  }

  @Get()
  @UseInterceptors(TransformInterceptor)
  // @ResponseType(GetBarResponse)
  getBar() {
    return this.service.getBar();
  }

  @Roles(['admin'])
  @Get('test')
  getTest() {
    return this.service.getFoo();
  }

  @Post('fib')
  async getFib(@Body() data) {
    const { number } = data;
    const res = this.fibClient
      .send({ cmd: 'get_fib' }, number)
      .pipe(timeout(1000));
    return res;
  }
}
