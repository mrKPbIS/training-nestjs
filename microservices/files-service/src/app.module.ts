import { Module } from '@nestjs/common';
import { FILES_DIR_PROVIDER } from './app.constants';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: FILES_DIR_PROVIDER,
      useValue: process.env['FILES_DIR'] || './',
    },
  ],
})
export class AppModule {}
