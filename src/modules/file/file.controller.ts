import {
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('/upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: './upload/files',
        filename: (_, file, callback) => {
          const prefix = new Date().getTime();
          const fileName = `${prefix}${file.originalname}`;
          callback(null, fileName);
        },
      }),
    }),
  )
  async uploadFile(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Headers('contractId') contractId: number,
  ) {
    return await this.fileService.createUploadedFiles(files, contractId);
  }

  @Get('/contract/:contractId')
  @HttpCode(HttpStatus.OK)
  async getFiles(
    @Res() res: Response,
    @Param('contractId') contractId: number,
  ) {
    const files = await this.fileService.getFiles(contractId);
    return res.send(files);
  }

  @Get('/:imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './upload/files' });
  }
}
