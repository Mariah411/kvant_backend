import { HttpException, Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import * as fs from 'fs';
import * as uuid from 'uuid';

import * as path from 'path';

@Injectable()
export class FilesService {
  async createFile(file): Promise<string> {
    console.log('Файл', file);
    try {
      const fileName = uuid.v4() + '.jpg';
      const filePath = path.resolve(__dirname, '..', 'static');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.join(filePath, fileName), file.buffer);

      // file.mv(path.resolve(__dirname, '..', 'static', fileName));
      return fileName;
    } catch (e) {
      throw new HttpException(
        e.message,
        // 'Произошла ошибка при записи файла',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteFile(fileName: string) {
    const filePath = path.resolve(__dirname, '..', 'static');
    fs.unlinkSync(path.join(filePath, fileName));
  }
}
