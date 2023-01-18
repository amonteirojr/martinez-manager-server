import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { join } from 'path';
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
    @Headers('admentmentId') admentmentId: number,
  ) {
    return await this.fileService.createUploadedFiles(
      files,
      contractId,
      admentmentId,
    );
  }

  @Delete('/:fileId')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteFile(@Param('fileId') fileId: number) {
    return await this.fileService.deleteFile(fileId);
  }

  @Get('/:imgpath')
  seeUploadedFile(@Param('imgpath') image: string, @Res() res: Response) {
    return res.sendFile(image, { root: './upload/files' });
  }

  @Get('/reports/:reportPath')
  getReport(@Param('reportPath') report: string, @Res() res: Response) {
    const root = './downloads/files';
    console.log(root);

    return res.sendFile(report, { root });
  }
}
