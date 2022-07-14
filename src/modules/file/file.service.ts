import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { readFileSync } from 'fs';
import { CodeErrors } from 'src/shared/code-errors.enum';
import { Repository } from 'typeorm';
import { UploadFileDTO } from './dto/upload-file.dto';
import { File } from './entitites/file.entity';

@Injectable()
export class FileService {
  private readonly logger = new Logger(FileService.name);

  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
  ) {}

  async createUploadedFiles(
    files: Express.Multer.File[],
    contractId: number,
  ): Promise<void> {
    try {
      if (!files) {
        throw new BadRequestException({
          code: CodeErrors.FILES_IS_NULL,
          message: 'Files is null',
        });
      }

      const filesToSave = files.map((file) => {
        return {
          contractId,
          fileName: file.filename,
          originalName: file.originalname,
        } as File;
      });

      await this.fileRepository.insert(filesToSave);
      return;
    } catch (err) {
      this.logger.error(`Failed to save uploaded file. Cause: ${err}`);

      if (err instanceof BadRequestException) {
        throw err;
      }

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_SAVE_UPLOADED_FILE,
        message: `Failed to save uploaded file`,
      });
    }
  }

  async getFiles(contractId: number): Promise<any> {
    try {
      const filesData = await this.fileRepository.find({
        where: { contractId },
      });

      const result = filesData.map((data) => {
        const buffer = readFileSync(`./upload/files/${data.fileName}`);
        const base64 = buffer.toString('base64');
        return {
          fileName: data.fileName,
          file: base64,
        };
      });

      return result;
    } catch (err) {
      this.logger.error(
        `Failed to get files for contract ${contractId}. Cause: ${err}`,
      );

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_GET_CONTRACT_FILES,
        message: `Failed to get files for contract ${contractId}`,
      });
    }
  }
}
