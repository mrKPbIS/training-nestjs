import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { BarService } from 'src/bar/bar.service';

@Injectable()
export class FooService {
  private barService: BarService;

  constructor(private readonly moduleRef: ModuleRef) {}

  onModuleInit() {
    this.barService = this.moduleRef.get(BarService, { strict: false });
  }

  getFoo(): string {
    return 'foo';
  }

  getBar() {
    return this.barService.getBar();
  }
}
