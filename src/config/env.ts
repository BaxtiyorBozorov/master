import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({
  path: path.join(process.cwd(), '.env'),
});

interface EnvConfig {
  PORT: string | undefined;
  HOST: string | undefined;
  DB_HOST: string | undefined;
  DB_PORT: string | undefined;
  DB_USER: string | undefined;
  DB_PASSWORD: string | undefined;
  DB_NAME: string | undefined;
  JWT_PRIVAT_KEY: string | undefined;
  NODE_ENV: string | undefined;
  REDIS_PORT: string | undefined;
  EMAIL_USER: string | undefined;
  EMAIL_PASS: string | undefined;
}

export const ENV: EnvConfig = {
  PORT: process.env.PORT,
  HOST: process.env.HOST,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  JWT_PRIVAT_KEY: process.env.JWT_PRIVATE_KEY,
  NODE_ENV: process.env.NODE_ENV,
  REDIS_PORT: process.env.REDIS_PORT,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
};
