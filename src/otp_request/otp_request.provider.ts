import { OtpRequest } from 'model/otp-request.model';
import { Users } from 'model/user.model';

export const otpRequestRepository = [
  {
    provide: 'OTP_REQUEST_REPOSITORY',
    useValue: OtpRequest,
  },
  {
    provide: 'USERS_REPOSITORY',
    useValue: Users,
  },
];
