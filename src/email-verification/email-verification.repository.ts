import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmailVerificationDTO } from './email-verification.dto';
import { EmailVerificationDocument } from './email-verification.schema';

@Injectable()
export class EmailVerificationRepository {
  constructor(
    @InjectModel('EmailVerification')
    private emailVerificatonModel: Model<EmailVerificationDocument>,
  ) {}

  async create(emailVerificationDTO: EmailVerificationDTO) {
    let obj = new this.emailVerificatonModel(emailVerificationDTO);
    return await obj.save();
  }

  async findOneByUsername(username: string) {
    return await this.emailVerificatonModel.findOne({
      username: username,
    });
  }

  async findOneByToken(token: string) {
    return await this.emailVerificatonModel.findById(token);
  }

  async update(id: object, emailVerificationDTO: EmailVerificationDTO) {
    return await this.emailVerificatonModel.findOneAndUpdate(
      { _id: id },
      emailVerificationDTO,
      { new: false },
    );
  }
}
