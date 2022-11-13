import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailVerificationModule } from './email-verification/email-verification.module';
require('dotenv').config()

@Module({
  imports: [EmailVerificationModule, MongooseModule.forRoot(process.env.MONGODB_CONNECTION_KEY)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
