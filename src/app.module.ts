import { Module } from '@nestjs/common';
import { DatabaseModule } from 'database/database.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { OtpRequestModule } from './otp_request/otp_request.module';

@Module({
  imports: [UsersModule, OtpRequestModule],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
