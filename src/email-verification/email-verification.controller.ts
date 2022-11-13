import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EmailVerificationDTO } from './email-verification.dto';
import { EmailVerificationService } from './email-verification.service';

@Controller('email-verification')
@ApiTags('email-verification')
export class EmailVerificationController {
  constructor(private emailVerificationService: EmailVerificationService) {}

  @Get('/get-token/:username')
  @ApiParam({
    name: 'username',
    type: 'string',
    description: 'This is the username',
    required: true,
  })
  @HttpCode(HttpStatus.OK)
  public async getToken(@Param('username') username, @Res() res) {
    if (!username) {
      throw new HttpException('Username is required', HttpStatus.NOT_FOUND);
    }
    const rec = await this.emailVerificationService.getToken(username);
    const response = { token: rec._id, username: rec.username };
    return res.status(HttpStatus.OK).json(response);
  }

  @Post('/send-otp')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        token: { type: 'string' },
        otpDigits: { type: 'integer' },
        toMail: { type: 'string' },
        subject: { type: 'string' },
        text: { type: 'string' },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: 'string',
    description: 'Sending the email',
  })
  @HttpCode(HttpStatus.OK)
  public async sendOtp(@Body() req, @Res() res): Promise<any> {
    const obj = await this.emailVerificationService.sendOtp(
      req.token,
      req.otpDigits,
      req.toMail,
      req.subject,
      req.text,
    );

    return res.status(HttpStatus.OK).json(obj);
  }

  @Post('/verify-otp')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        token: { type: 'string' },
        otp: { type: 'integer' },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: 'string',
    description: 'Verifying the email',
  })
  @HttpCode(HttpStatus.OK)
  public async verifyOtp(@Body() req, @Res() res) {
    const obj = await this.emailVerificationService.verifyOtp(
      req.token,
      req.otp,
    );

    return res.status(HttpStatus.OK).json(obj);
  }
}
