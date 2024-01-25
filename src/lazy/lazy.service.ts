import { Injectable } from '@nestjs/common';

@Injectable()
export class LazyService {
  constructor() {
    console.log('lazy module created');
  }

  calc(n: number) {
    let a = 1,
      b = 1;
    let res = 0;
    if (n === 1) {
      return a;
    } else if (n === 2) {
      return b;
    }
    for (let i = 3; i < n; i++) {
      res = a + b;
      a = b;
      b = res;
    }
    return res;
  }
}
