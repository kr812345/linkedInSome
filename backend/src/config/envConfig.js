import { configDotenv } from "dotenv";
// this is an scalable way to manage env variables effectively.
configDotenv({path:'./.env'})

const envConfig = {
        makeWebhook: process.env.WEBHOOK_URL,
}

export default envConfig;