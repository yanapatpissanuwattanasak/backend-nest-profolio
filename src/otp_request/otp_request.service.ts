import { Inject, Injectable } from '@nestjs/common';
import { OtpRequest } from 'model/otp-request.model';
import { CreateOtpRequestDto } from './dto/create-otp_request.dto';
import { UpdateOtpRequestDto } from './dto/update-otp_request.dto';

@Injectable()
export class OtpRequestService {
  constructor(
    @Inject('OTP_REQUEST_REPOSITORY')
    private otpRequestRepository: typeof OtpRequest,
  ) {}
  create(createOtpRequestDto: any) {
    return this.otpRequestRepository.create(createOtpRequestDto);
  }

  findAll() {
    return `This action returns all otpRequest`;
  }

  findOneByPhoneNo(phoneNo) {
    return this.otpRequestRepository.findOne({ where: { phoneNo: phoneNo } });
  }

  update(id: number, updateOtpRequestDto: UpdateOtpRequestDto) {
    return `This action updates a #${id} otpRequest`;
  }

  remove(id: number) {
    return `This action removes a #${id} otpRequest`;
  }

  updateExpireOtp(phoneNo) {
    return this.otpRequestRepository.update(
      {
        expireDate: new Date(
          new Date(new Date().getTime() + 15 * 60000).toUTCString(),
        ).toISOString(),
      },
      { where: { phoneNo: phoneNo } },
    );
  }
}
