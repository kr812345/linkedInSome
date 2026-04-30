import crypto from 'crypto';
import redisClient from '../config/redisConfig.js';

/**
 * Generates a SHA-256 hash of a string or buffer.
 */
export const generateHash = (data) => {
    return crypto.createHash('sha256').update(data).digest('hex');
};

/**
 * Gets a value from Redis cache.
 */
export const getCache = async (key) => {
    try {
        const data = await redisClient.get(key);
        return data ? JSON.parse(data) : null;
    } catch (err) {
        console.error('[Redis Cache] Get Error:', err);
        return null;
    }
};

/**
 * Sets a value in Redis cache with an expiry (default 1 hour).
 */
export const setCache = async (key, value, expiry = 3600) => {
    try {
        await redisClient.set(key, JSON.stringify(value), {
            EX: expiry
        });
    } catch (err) {
        console.error('[Redis Cache] Set Error:', err);
    }
};
