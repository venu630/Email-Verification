import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailVerificationRepository } from './email-verification.repository';
import { EmailVerificationController } from './email-verification.controller';
import { EmailVerificationService } from './email-verification.service';
import {
  EmailVerification,
  EmailVerificationSchema,
} from './email-verification.schema';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EmailVerification.name, schema: EmailVerificationSchema },
    ]),
    MailerModule.forRoot({
      transport: {
        host: process.env.HOST,
        secure: true,
        auth: {
          user: process.env.USER_EMAIL,
          pass: process.env.USER_PASSWORD,
        },
      },
      defaults: {
        from: '"No Reply" <noreply@example.com>',
      },
    }),
  ],
  controllers: [EmailVerificationController],
  providers: [EmailVerificationService, EmailVerificationRepository],
})
export class EmailVerificationModule {}
