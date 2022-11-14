/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
} from "@nestjs/common";
import { FastifyReply } from 'fastify'
import { UsersService } from "./users.service";
import { getReasonPhrase, StatusCodes } from "http-status-codes"
import { responseMessages } from "utils/app";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(
    @Req() req: any,
    @Body() createUserDto: any,
    @Res() res: FastifyReply
  ) {
    const createUser = await this.usersService.create(createUserDto);
    return res.status(StatusCodes.OK).send(responseMessages(StatusCodes.OK, null, createUser))
  }

  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

  @Post("phoneNo")
  async findPhoneNo(@Req() 
    req: any,
    @Body() findOtp: any,
    @Res() res: FastifyReply
  ) {
    const response = await this.usersService.findPhoneNo(findOtp.phoneNo);
    return res.status(StatusCodes.OK).send(responseMessages(StatusCodes.OK, null, response))
  }

  

  // @Delete(":id")
  // remove(@Param("id") id: string) {
  //   return this.usersService.remove(+id);
  // }
}
