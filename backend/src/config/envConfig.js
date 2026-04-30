import { configDotenv } from "dotenv";
import fs from "fs";
import path from "path";

// this is an scalable way to manage env variables effectively.
const isProduction = process.env.NODE_ENV === "production";
const envFile = isProduction ? ".env.prod" : ".env";

// In containerized environments, the .env file might be in the root directory (one level up from src/config)
const envPaths = [
  path.resolve(process.cwd(), envFile),
  path.resolve(process.cwd(), "..", envFile),
  envFile
];

for (const p of envPaths) {
  if (fs.existsSync(p)) {
    configDotenv({ path: p, override: true, debug: true });
    break;
  }
}

// console.log(process.env.WEBHOOK_URL);

const cleanRedisUrl = (url) => {
  if (!url) return 'redis://localhost:6379';
  
  // Check if it's a redis-cli command with --tls flag
  const hasTlsFlag = url.includes('--tls');
  
  // Extract URL using regex
  const match = url.match(/(rediss?:\/\/[^\s'"]+)/);
  if (match) {
    let cleanedUrl = match[1];
    // If the command specified --tls but the URL uses redis://, upgrade to rediss://
    if (hasTlsFlag && cleanedUrl.startsWith('redis://')) {
      cleanedUrl = cleanedUrl.replace('redis://', 'rediss://');
    }
    return cleanedUrl;
  }
  return url;
};

const envConfig = {
  makeWebhook: process.env.WEBHOOK_URL,
  openaiKey: process.env.OPENAI_API_KEY,
  redisUrl: cleanRedisUrl(process.env.REDIS_URL),
};

export default envConfig;