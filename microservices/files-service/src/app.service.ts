import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import * as fs from 'fs';
import { FILES_DIR_PROVIDER } from './app.constants';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  private filePath = `hello_file`;
  private writeStream: fs.WriteStream;

  constructor(@Inject(FILES_DIR_PROVIDER) private readonly filesDir: string) {}
  getHello(): boolean {
    return this.writeStream.write('Hello World\n');
  }

  onApplicationBootstrap() {
    console.log('files are created in directory: ', this.filesDir);
    this.writeStream = fs.createWriteStream(this.filesDir + this.filePath, {
      flags: 'a+',
    });
  }
}
