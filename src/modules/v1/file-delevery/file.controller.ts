import { Controller, Get, Param, Res } from "@nestjs/common";
import { Response } from 'express';
import { ApiParam } from "@nestjs/swagger";
import { join } from "path";
import * as fs from 'fs'


@Controller('file')
export class FileController{

  @Get('get-file/:filename')
  @ApiParam({
      name: 'filename',
      required: true,
    })
  async getFile(@Param('filename') filename: string, @Res() res: Response) {
    const mimeType = filename.split('.').pop();    
    const filePath = join(__dirname, '../../../../uploads/icons', filename);
    const stream = fs.createReadStream(filePath)
    res.setHeader('Content-Type', `image/${mimeType}`);
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);

    stream.pipe(res)
    
  }
}