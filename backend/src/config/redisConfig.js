import { createClient } from 'redis';
import envConfig from './envConfig.js';

const isTls = envConfig.redisUrl.startsWith('rediss://');

const client = createClient({
    url: envConfig.redisUrl,
    socket: {
        tls: isTls,
        rejectUnauthorized: false // Often needed for hosted Redis providers
    }
});

client.on('error', (err) => console.log('Redis Client Error', err));

(async () => {
    try {
        await client.connect();
        console.log('Connected to Redis');
    } catch (err) {
        console.error('Failed to connect to Redis:', err);
    }
})();

export default client;
