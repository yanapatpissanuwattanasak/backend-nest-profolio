// eslint-disable-next-line prettier/prettier
import sequelize from 'sequelize';
import {
  AllowNull,
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'otp_request',
})
export class OtpRequest extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  phoneNo: string;

  @Column
  otpCode: string;

  @Column({
    defaultValue: sequelize.literal(
      `DATE_FORMAT( DATE_ADD(CONVERT_TZ(NOW(), @@session.time_zone,'+00:00'), INTERVAL 15 MINUTE ),'%Y-%m-%dT%T+00:00')`,
    ),
  })
  expireDate?: string;

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
