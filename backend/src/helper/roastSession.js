import crypto from 'crypto';
import redisClient from '../config/redisConfig.js';

const TTL_SECONDS = 30 * 60;
const memory = new Map();

function memoryGet(id) {
  const hit = memory.get(id);
  if (!hit) return null;
  if (Date.now() > hit.expires) {
    memory.delete(id);
    return null;
  }
  return hit.payload;
}

export async function putRoast(roast) {
  const id = crypto.randomUUID();
  const payload = { ...roast, createdAt: Date.now() };
  memory.set(id, { payload, expires: Date.now() + TTL_SECONDS * 1000 });

  try {
    if (redisClient?.isReady) {
      await redisClient.set(`roast:session:${id}`, JSON.stringify(payload), { EX: TTL_SECONDS });
    }
  } catch (err) {
    console.error('[RoastSession] Redis write failed:', err.message);
  }

  return id;
}

export async function getRoast(id) {
  if (!id || typeof id !== 'string' || id.length > 80) return null;

  try {
    if (redisClient?.isReady) {
      const raw = await redisClient.get(`roast:session:${id}`);
      if (raw) return JSON.parse(raw);
    }
  } catch (err) {
    console.error('[RoastSession] Redis read failed:', err.message);
  }

  return memoryGet(id);
}
