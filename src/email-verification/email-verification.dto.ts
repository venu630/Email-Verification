import { ApiProperty } from '@nestjs/swagger';

export class EmailVerificationDTO {
  @ApiProperty()
  username: string;

  @ApiProperty()
  otp: number;
}
