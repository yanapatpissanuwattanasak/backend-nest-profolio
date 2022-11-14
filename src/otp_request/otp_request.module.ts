import { Module } from '@nestjs/common';
import { OtpRequestService } from './otp_request.service';
import { OtpRequestController } from './otp_request.controller';
import { otpRequestRepository } from './otp_request.provider';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [OtpRequestController],
  providers: [OtpRequestService, UsersService, ...otpRequestRepository],
})
export class OtpRequestModule {}
