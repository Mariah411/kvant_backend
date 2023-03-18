import { CreateWorkerDto } from './../workers/dto/create-worker.dto';
import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() workerDto: CreateWorkerDto) {
    return this.authService.login(workerDto);
  }

  @Post('/registration')
  registration(@Body() workerDto: CreateWorkerDto) {
    return this.authService.registration(workerDto);
  }

  // @Post('/validate')
  // validate(@Body() token) {
  //   return this.authService.validateToken(token.token);
  // }
}
