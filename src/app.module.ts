import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot(
      'mongodb+srv://root:password123A@cluster0.l4bpyb6.mongodb.net/users',
    ),
    AuthModule,
  ],
  controllers: [AuthController],
  providers: [],
})
export class AppModule {}
