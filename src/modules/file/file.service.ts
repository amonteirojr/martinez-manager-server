import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CodeErrors } from 'src/shared/code-errors.enum';
import { Repository } from 'typeorm';
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
    admentmentId: number,
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
          admentmentId,
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

  async updateFiles(
    files: Express.Multer.File[],
    contractId: number,
    admentmentId: number,
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
          admentmentId,
          fileName: file.filename,
          originalName: file.originalname,
        } as File;
      });

      await this.fileRepository.save(filesToSave);
      return;
    } catch (err) {
      this.logger.error(`Failed to upload fileS. Cause: ${err}`);

      if (
        err instanceof BadRequestException ||
        err instanceof InternalServerErrorException
      ) {
        throw err;
      }

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_UPLOAD_FILES,
        message: `Failed to upload file`,
      });
    }
  }
}
