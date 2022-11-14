import { Test, TestingModule } from '@nestjs/testing';
import { OtpRequestController } from './otp_request.controller';
import { OtpRequestService } from './otp_request.service';

describe('OtpRequestController', () => {
  let controller: OtpRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OtpRequestController],
      providers: [OtpRequestService],
    }).compile();

    controller = module.get<OtpRequestController>(OtpRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
