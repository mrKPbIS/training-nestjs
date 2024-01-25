import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { BarController } from './bar.controller';
import { BarService } from './bar.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'FIB_SERVICE',
        transport: Transport.TCP,
        options: {
          port: 2999,
        },
      },
    ]),
  ],
  providers: [BarService],
  controllers: [BarController],
})
export class BarModule {}
