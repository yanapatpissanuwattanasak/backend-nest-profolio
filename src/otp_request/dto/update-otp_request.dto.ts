import { PartialType } from '@nestjs/mapped-types';
import { CreateOtpRequestDto } from './create-otp_request.dto';

export class UpdateOtpRequestDto extends PartialType(CreateOtpRequestDto) {}
