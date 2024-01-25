import { BadRequestException } from '@nestjs/common';
import { HttpCode } from '@nestjs/common';
import { Controller, Get, Req, Res } from '@nestjs/common';
import * as fs from 'fs';

@Controller('video')
export class VideoController {
  private videoPath;
  private videoSize;
  private CHUNK_SIZE = 10 ** 6;

  constructor() {
    this.videoPath = './src/video/sofa.MOV';
    this.videoSize = fs.statSync(this.videoPath).size;
    console.log(this.videoSize);
  }

  @Get('')
  @HttpCode(206)
  getVideo(@Req() req, @Res() res) {
    const range: string | null = req.headers.range;
    if (!range) {
      throw new BadRequestException('Requires Range header');
    }
    const [bytes, rangeBytes] = range.split('=');
    let [start, end] = rangeBytes.split('-').map((data) => Number(data));
    console.log(start, end);
    if (end === 0) {
      end = Math.min(start + this.CHUNK_SIZE, this.videoSize - 1);
    }
    // const end = Math.min(start + this.CHUNK_SIZE, this.videoSize - 1);
    const contentLength = end - start + 1;
    const headers = {
      'Content-Range': `bytes ${start}-${end}/${this.videoSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': contentLength,
      'Content-Type': 'video/mp4',
    };
    res.header(headers);
    const videoStream = fs.createReadStream(this.videoPath, { start, end });
    videoStream.pipe(res);
  }
}
