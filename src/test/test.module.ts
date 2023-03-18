import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';

@Module({
  providers: [TestService],
  controllers: [TestController],
  imports: [AuthModule, JwtModule],
})
export class TestModule {}
