import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { WorkersService } from './workers/workers.service';
import { WorkersModule } from './workers/workers.module';
import { Workers } from './workers/workers.model';

@Module({
  controllers: [],
  providers: [WorkersService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Workers],
      autoLoadModels: true,
    }),
    WorkersModule,
  ],
})
export class AppModule {}
