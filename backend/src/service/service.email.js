import axios from 'axios';
import envConfig from '../config/envConfig.js';

// we are using make.com automation tool to automate email, google sheets, telegram bot.

export default async function startAutomation(email) {

    await axios.post(`${envConfig.makeWebhook}`,
        { email },
        { headers: {
            'Content-Type': 'application/json',
            'x-make-apikey': 'zeroone',
        }})
    .then(res => console.log(res.data))
    .catch(err=> err);
}