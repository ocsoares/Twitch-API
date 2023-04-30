import { CronJob } from 'cron';
import axios from 'axios';

const url = 'https://twitch-api-jmwk.onrender.com';

console.log('Cron job running');

// Run every 5 minutes to keep server alive
new CronJob(
    '*/5 * * * *',
    async () => {
        try {
            await axios.get(url); // TENTAR ver se não é pq isso retornar o StatusCode da página inicial 404 !!!
        } catch (error) {
            console.log(error);
        }
    },
    null,
    true,
);
