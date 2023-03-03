import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';


@Module({
  controllers: [AuthController],
  exports: [AuthService],
  imports: [
    UserModule,
    JwtModule.register({
      secret: 'APP_SECRET',
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
  providers: [AuthService],
})
export class AuthModule {}
