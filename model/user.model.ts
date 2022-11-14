// eslint-disable-next-line prettier/prettier
import sequelize from 'sequelize';
import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'users',
})
export class Users extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  phoneNo: string;

  @Column
  email?: string;

  @Column({
    defaultValue: sequelize.literal(
      `DATE_FORMAT(CONVERT_TZ(NOW(), @@session.time_zone,'+00:00'),'%Y-%m-%dT%T+00:00')`,
    ),
  })
  createdAt?: string;

  @Column({
    defaultValue: sequelize.literal(
      `DATE_FORMAT(CONVERT_TZ(NOW(), @@session.time_zone,'+00:00'),'%Y-%m-%dT%T+00:00')`,
    ),
  })
  updatedAt?: string;

  @Column
  createdBy?: string;

  @Column
  updatedBy?: string;
}
