import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
} from '@nestjs/common';
import { OtpRequestService } from './otp_request.service';
import { CreateOtpRequestDto } from './dto/create-otp_request.dto';
import { UpdateOtpRequestDto } from './dto/update-otp_request.dto';
import { FastifyReply } from 'fastify';
import { StatusCodes } from 'http-status-codes';
import { responseMessages, saltRounds } from 'utils/app';
import { UsersService } from 'src/users/users.service';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

@Controller('otp-request')
export class OtpRequestController {
  constructor(
    private readonly otpRequestService: OtpRequestService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  async create(
    @Req() req: any,
    @Body() createOtpRequestDto: any,
    @Res() res: FastifyReply,
  ) {
    const { phoneNo, otpCode } = createOtpRequestDto;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(otpCode, salt);
    const user = await this.otpRequestService.findOneByPhoneNo(phoneNo);
    const dateNow = new Date(new Date().toUTCString()).toISOString();
    if (user) {
      const response = await this.otpRequestService.updateExpireOtp(phoneNo);
      return res
        .status(StatusCodes.OK)
        .send(responseMessages(StatusCodes.OK, 'OK'));
    }
    const otpCreated = await this.otpRequestService.create({
      phoneNo: phoneNo,
      otpCode: hash,
    });
    return res
      .status(StatusCodes.OK)
      .send(responseMessages(StatusCodes.OK, 'OK'));
    // return this.otpRequestService.create(createOtpRequestDto);
  }

  @Post('/otp')
  async sendOtp(@Req() req: any, @Body() body: any, @Res() res: FastifyReply) {
    const { phoneNo, otpCode } = body;
    const user = await this.otpRequestService.findOneByPhoneNo(phoneNo);
    const dateNow = new Date(new Date().toUTCString()).toISOString();
    // const otpCreated = await this.otpRequestService.create({
    //   phoneNo: phoneNo,
    //   otpCode: hash,
    // });
    console.log(dateNow, user['expireDate']);
    if (dateNow > user['expireDate']) {
      return res
        .status(StatusCodes.OK)
        .send(responseMessages(StatusCodes.OK, null, false));
    }
    const condition = await bcrypt.compareSync(otpCode, user['otpCode']);
    return res
      .status(StatusCodes.OK)
      .send(responseMessages(StatusCodes.OK, null, condition));
    // return this.otpRequestService.create(createOtpRequestDto);
  }

  // @Get()
  // findAll() {
  //   return this.otpRequestService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.otpRequestService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateOtpRequestDto: UpdateOtpRequestDto,
  // ) {
  //   return this.otpRequestService.update(+id, updateOtpRequestDto);
  // }

  @Patch('resent')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: any,
    @Res() res: FastifyReply,
  ) {
    const response = await this.otpRequestService.updateExpireOtp(
      updateUserDto.phoneNo,
    );
    return res
      .status(StatusCodes.OK)
      .send(responseMessages(StatusCodes.OK, null, response));
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.otpRequestService.remove(+id);
  // }
}
