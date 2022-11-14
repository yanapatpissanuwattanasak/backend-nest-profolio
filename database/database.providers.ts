import { OtpRequest } from 'model/otp-request.model';
import { Users } from 'model/user.model';
import { Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'port_web',
});

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      sequelize.addModels([Users, OtpRequest]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
