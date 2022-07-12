import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '../config/config.service';
import { UserService } from '../user/user.service';
import { SendEmailDTO } from './dto/send-email.dto';

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
        subject: 'My {{params.subject}}',
        htmlContent:
          '<html><body><h1>This is my first transactional email {{params.parameter}}</h1></body></html>',
        sender: {
          name: 'Martinez Manager',
          email: 'naoresponda@martinez.inf',
        },
        to: receiversData,
        replyTo: {
          email: 'replyto@domain.com',
          name: 'John Doe',
        },
        params: {
          parameter: 'My param value',
          subject: 'New Subject',
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
}
