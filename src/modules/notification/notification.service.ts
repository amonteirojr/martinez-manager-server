import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CodeErrors } from 'src/shared/code-errors.enum';
import { EmailTemplates } from 'src/shared/email-templates.enum';
import { ConfigService } from '../config/config.service';
import { UserService } from '../user/user.service';
import { PasswordRecoveryDTO } from './dto/password-recovery.dto';
import { SendEmailDTO } from './dto/send-email.dto copy';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);
  constructor(
    private readonly userService: UserService,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async sendEmail(sendEmailDTO: SendEmailDTO): Promise<void> {
    try {
      const receiversData: { name: string; email: string }[] = [];
      const notFoundUsers: { email: string }[] = [];

      for (const receiver of sendEmailDTO.receivers) {
        const exists = await this.userService.findOneByEmail(receiver);
        if (!exists) {
          notFoundUsers.push({ email: receiver });
        }
        receiversData.push({ email: receiver, name: exists.firstname });
      }

      if (notFoundUsers && notFoundUsers.length > 0) {
        this.logger.warn(
          `Some emails were not found in database: ${JSON.stringify(
            notFoundUsers,
          )}`,
        );
      }

      if (!receiversData && receiversData.length <= 0) return;

      const emailPayload = {
        subject: sendEmailDTO.subject,
        htmlContent:
          '<html><body><h1>Olá {{params.userName}}! </h1></body></html>',
        sender: {
          name: this.configService.envConfig.senderName,
          email: this.configService.envConfig.senderEmail,
        },
        to: receiversData,
        params: {
          userName: 'Teste',
        },
      };

      const response = await firstValueFrom(
        this.httpService.post('/v3/smtp/email', emailPayload),
      );

      switch (response.status) {
        case 201:
          this.logger.log(
            `Email was sent succesfully to receivers ${JSON.stringify(
              receiversData,
            )}`,
          );
          break;
        case 202:
          this.logger.log(
            `Emails were scheduled - receiversData: ${JSON.stringify(
              receiversData,
            )}`,
          );
          break;
        default:
          break;
      }
    } catch (err) {
      this.logger.error(`Error on sending email. Cause ${err}`);
    }
  }

  async sendPasswordRecoveryEmail(dto: PasswordRecoveryDTO): Promise<void> {
    try {
      const exists = await this.userService.findOneByEmail(dto.receiver);

      if (!exists) {
        this.logger.error(
          `User email ${dto.receiver} was not found in database. Email will not be sent.`,
        );

        throw new InternalServerErrorException({
          code: CodeErrors.USER_EMAIL_NOT_FOUND,
          message: 'User email not found',
        });
      }
      const emailPayload = {
        subject: 'Recuperação de senha - Martinez Manager',
        templateId: EmailTemplates.PASSWORD_RECOVERY,
        sender: {
          name: this.configService.envConfig.senderName,
          email: this.configService.envConfig.senderEmail,
        },
        to: [{ email: dto.receiver, name: exists.firstname }],
        params: {
          userName: exists.firstname,
        },
      };

      const response = await firstValueFrom(
        this.httpService.post('/v3/smtp/email', emailPayload),
      );

      switch (response.status) {
        case 201:
          this.logger.log(
            `Email was sent succesfully to receiver ${JSON.stringify(
              dto.receiver,
            )}`,
          );
          break;
        case 202:
          this.logger.log(
            `Emails were scheduled - receiver: ${JSON.stringify(dto.receiver)}`,
          );
          break;
        default:
          break;
      }
    } catch (err) {
      this.logger.error(
        `Error on sending password recovery email. Cause ${err}`,
      );

      if (err instanceof InternalServerErrorException) {
        throw err;
      }

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_SEND_PASSWORD_RECOVERY_EMAIL,
        message: 'Failed to send password recovery email',
      });
    }
  }
}
