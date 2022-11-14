import { Inject, Injectable } from '@nestjs/common';
import { Users } from 'model/user.model';
import { where } from 'sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof Users,
  ) {}
  create(createUserDto: any) {
    return this.usersRepository.create(createUserDto);
  }

  async findPhoneNo(phoneNo) {
    const a = await this.usersRepository.findAll<Users>({
      where: {
        phoneNo: phoneNo,
      },
    });
    console.log(a);
    return a;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(
      { firstName: 'asd' },
      { where: { id: id } },
    );
    return `This action updates a #${id} user`;
  }

  

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
