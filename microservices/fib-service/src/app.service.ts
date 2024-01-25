import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private fibs: number[] = [];
  private MOD = Math.pow(10, 9) + 7;

  constructor() {
    this.fibs.push(0, 1);
    this.calcFibs();
  }

  private calcFibs(limit: number = 100): void {
    const currentSize = this.fibs.length;
    if (limit < currentSize) {
      return;
    }
    for (let i = currentSize; i <= limit; i++) {
      this.fibs.push(
        (this.fibs[this.fibs.length - 1] + this.fibs[this.fibs.length - 2]) %
          this.MOD,
      );
    }
  }

  getFib(n: number): number {
    if (n >= this.fibs.length) {
      this.calcFibs(n);
    }
    return this.fibs[n];
  }
}
