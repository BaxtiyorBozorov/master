import { Injectable } from '@nestjs/common';
import RedisClient from '@redis/client/dist/lib/client';
import { createClient } from 'redis';

@Injectable()
export class CacheService {
  private redisClient;

  constructor() {
    this.redisClient = createClient({ socket: { host: 'localhost', port: 6379 } });
    this.redisClient.connect();
    this.redisClient.on('error', (err) => console.error('Redis xatosi:', err));
  }

  async setOtp(email: string, otp: string, ttl = 300): Promise<void> {
    await this.redisClient.set(`otp:${email}`, otp, { EX: ttl }); // 5 daqiqa amal qiladi
  }

  async getOtp(email: string): Promise<string | null> {
    return await this.redisClient.get(`otp:${email}`);
  }

  async deleteOtp(email: string): Promise<void> {
    await this.redisClient.del(`otp:${email}`);
  }
}
