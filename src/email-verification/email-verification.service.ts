import { Injectable } from '@nestjs/common';
import { EmailVerificationRepository } from './email-verification.repository';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailVerificationService {
  constructor(
    private emailVerificationRepository: EmailVerificationRepository,
    private mailService: MailerService,
  ) {}

  generateDigitCode = (n: number) => {
    var add = 1,
      max = 12 - add;

    if (n > max) {
      return this.generateDigitCode(max) + this.generateDigitCode(n - max);
    }

    max = Math.pow(10, n + add);
    var min = max / 10;
    var number = Math.floor(Math.random() * (max - min + 1)) + min;

    return ('' + number).substring(add);
  };

  public async getToken(username: string) {
    const user = await this.emailVerificationRepository.findOneByUsername(
      username,
    );
    if (user) {
      return user;
    }
    const otp = null;
    const obj = { username, otp };

    return await this.emailVerificationRepository.create(obj);
  }

  public async sendOtp(
    token: string,
    otpDigits: number,
    toMail: string,
    subject: string,
    text: string,
  ) {
    const user = await this.emailVerificationRepository.findOneByToken(token);

    if (user === null) {
      return 'Token Invalid';
    }

    const OTP = this.generateDigitCode(Number(otpDigits));

    if (user && user.username && user._id) {
      const obj = { username: user.username, otp: OTP };
      await this.emailVerificationRepository.update(user._id, obj);

      await this.mailService.sendMail({
        to: `${toMail}`,
        from: 'sirisanagandlavenu@gmail.com',
        subject: `${subject}`,
        text: `Hello Mate! This is your OTP:${OTP}. ${text}.`,
      });

      return 'success';
    }
    return 'failed';
  }

  public async verifyOtp(token: string, otp: number) {
    const user = await this.emailVerificationRepository.findOneByToken(token);

    if (user === null) {
      return 'Token Invalid';
    }

    if (user.otp === Number(otp)) {
      return 'success';
    }
    return 'failed';
  }
}
