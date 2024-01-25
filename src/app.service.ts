import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { LazyModule } from './lazy/lazy.module';
import { LazyService } from './lazy/lazy.service';

@Injectable()
export class AppService {
  constructor(private readonly lazyLoader: LazyModuleLoader) {}
  getHello(): string {
    return 'Hello World!';
  }

  async getFib(): Promise<number> {
    const lazyModuleRef = await this.lazyLoader.load(() => LazyModule);
    const lazyService = lazyModuleRef.get(LazyService);
    return lazyService.calc(10);
  }
}
