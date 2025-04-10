import { extname, join } from 'path';

import { BadRequestException } from '@nestjs/common';
import { MulterModuleOptions } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

export function pictureUploadConfig(): MulterModuleOptions {
  return {
      storage: diskStorage({
          destination: (req, file, cb) => {
              cb(null, join(process.cwd(), 'uploads', 'icons'));
          },
          filename: (req, file, cb) => {
              const uniqueSuffix =
                  Date.now() + '-' + Math.round(Math.random() * 1e9);
              cb(
                  null,
                  `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`,
              );
          },
      }),
      fileFilter: (req, file, cb):void => {
          if (file.fieldname === 'icon') {
              const allowedFileTypes = ['png', 'jpg', 'jpeg', 'image'];
              if (!allowedFileTypes.includes(file.mimetype.split('/')[1])) {
                  return cb(
                      new BadRequestException('Unsupported file type for icon'),
                      false,
                  );
              }
          }
          cb(null, true);
      },
  };
}
