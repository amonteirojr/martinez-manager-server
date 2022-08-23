import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { unlink, unlinkSync } from 'fs';
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

  async deleteFile(fileId: number): Promise<void> {
    try {
      const fileToDelete = await this.fileRepository.findOne({
        where: { fileId },
      });

      if (!fileToDelete) {
        this.logger.error('File does not exist');
        throw new NotFoundException({
          message: 'File does not exist.',
          code: CodeErrors.FILE_DOES_NOT_EXIST,
        });
      }

      unlinkSync(`upload/files/${fileToDelete.fileName}`);
      this.logger.log(
        `File "${fileToDelete.fileName}" was deleted from folder`,
      );

      await this.fileRepository.delete({ fileId });
      this.logger.log(
        `File "${fileToDelete.fileName}" was deleted from database`,
      );
    } catch (err) {
      this.logger.error(`Failed to delete file. Cause: ${err}`);

      if (err instanceof NotFoundException) {
        throw err;
      }

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_DELETE_FILE,
        message: `Failed to delete file`,
      });
    }
  }
}
