import { WorkersService } from './../workers/workers.service';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateWorkerDto } from 'src/workers/dto/create-worker.dto';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcryptjs';
import { Workers } from 'src/workers/workers.model';

@Injectable()
export class AuthService {
  constructor(
    private workersService: WorkersService,
    private jwtService: JwtService,
  ) {}

  async login(workerDto: CreateWorkerDto) {
    const worker = await this.validateWorker(workerDto);
    return this.generateToken(worker);
  }

  async registration(workerDto: CreateWorkerDto) {
    const candidate = await this.workersService.getWorkerByEmail(
      workerDto.email,
    );
    if (candidate) {
      throw new HttpException(
        'Пользователь с таким email существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hash(workerDto.password, 5);
    const worker = await this.workersService.createWorker({
      ...workerDto,
      password: hashPassword,
    });
    return this.generateToken(worker);
  }

  async generateToken(worker: Workers) {
    const payload = {
      email: worker.email,
      FIO: worker.FIO,
      id: worker.id,
      roles: worker.roles,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  // async validateToken(token: string) {
  //   const worker = this.jwtService.decode(token);
  //   if (worker) {
  //     return worker;
  //   } else {
  //     throw new UnauthorizedException({
  //       message: 'Вы не авторизованы',
  //     });
  //   }
  // }

  private async validateWorker(workerDto: CreateWorkerDto) {
    const worker = await this.workersService.getWorkerByEmail(workerDto.email);
    console.log('Работник', worker);
    if (worker !== null) {
      const passwordEquals = await bcrypt.compare(
        workerDto.password,
        worker.password,
      );
      //console.log(worker);
      console.log(passwordEquals);
      if (worker && passwordEquals) {
        return worker;
      } else {
        throw new UnauthorizedException({
          message: 'Некорректный email или пароль',
        });
      }
    } else {
      throw new UnauthorizedException({
        message: 'Некорректный email или пароль',
      });
    }
  }
}
