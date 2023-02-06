import { WorkersModule } from './../workers/workers.module';
import { Workers } from './../workers/workers.model';
import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef(() => WorkersModule),
    JwtModule.register({
      secret: process.env.SECRET_KEY || 'SECRET',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}
