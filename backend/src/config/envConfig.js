import { configDotenv } from "dotenv";
// this is an scalable way to manage env variables effectively.
configDotenv({ path: process.env.NODE_ENV === "production" ? ".env.prod" : ".env" || process.env.NODE_ENV === "development" ? ".env.development" : ".env", 
               override: true, debug: true });

// configDotenv({path: '.env.prod', override: true, debug: true})

// console.log(process.env.WEBHOOK_URL);

const envConfig = {
  makeWebhook: process.env.WEBHOOK_URL,
  openaiKey: process.env.OPENAI_API_KEY,
  redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
};

export default envConfig;