import { CreateKvantumDto } from './dto/create-kvantum.dto';
import { Kvantum } from './kvantums.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class KvantumsService {
  constructor(
    @InjectModel(Kvantum) private kvantumRepository: typeof Kvantum,
  ) {}

  async createKvantum(dto: CreateKvantumDto) {
    const kvantum = await this.kvantumRepository.create(dto);
    return kvantum;
  }

  async getKvantumByID(id: number) {
    const kvantum = await this.kvantumRepository.findByPk(id, {
      include: { all: true },
    });
    return kvantum;
  }

  async getAllKvantums() {
    const kvantums = await this.kvantumRepository.findAll();
    return kvantums;
  }

  async updateKvantum(id: number, dto: CreateKvantumDto) {
    const isUpdate = await this.kvantumRepository.update(
      { name: dto.name },
      { where: { id: id } },
    );
    return isUpdate;
  }

  async deleteKvantum(id: number) {
    const isDelete = await this.kvantumRepository.destroy({
      where: {
        id: id,
      },
    });

    return isDelete;
  }
}
