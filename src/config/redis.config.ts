import { createClient } from 'redis';

import { ENV } from './env';

const redisClient = createClient({
  socket: {
    host: ENV.HOST,
    port: Number(ENV.REDIS_PORT) || 6379,
  },
});

redisClient.connect();

redisClient.on('connect', () => console.log('Redisga muvaffaqiyatli ulandi.'));
redisClient.on('error', (err) => console.error('Redis xatosi:', err));

export default redisClient;
