import { Inject, Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { plainToClass } from 'class-transformer';
import { FooService } from 'src/foo/foo.service';
import { GetBarResponse } from './dto/bar.dto';

@Injectable()
export class BarService {
  private fooService: FooService;

  constructor(
    private readonly moduleRef: ModuleRef,
  ) {}

  onModuleInit() {
    this.fooService = this.moduleRef.get(FooService, { strict: false });
  }

  private barObject = {
    id: 1,
    name: 'bar object',
    password: 'we store password like this',
    properties: {
      balance: '10.00',
      roles: ['user'],
      bankAccount: "don't show this",
    },
  };

  getBar(): GetBarResponse {
    return this.barObject;
    return plainToClass(GetBarResponse, this.barObject, {
      excludeExtraneousValues: true,
    });
  }

  getFoo() {
    return this.fooService.getBar();
  }
}
