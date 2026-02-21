console.log("hello");
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import express from 'express';
import connectDB from './src/config/db.js';
import uploadRouter from './src/routes/route.upload.js';
import cors from 'cors';

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json()); // for json to parse in the request else body which is in json will not be parsed.
app.use(express.urlencoded({extended: true})); // for formdata.
app.use(cors({ origin: ['http://localhost:3000'] }))


// connectDB();
// console.log("GEMINI KEY:", process.env.GEMINI_API_KEY); 
// console.log(process.env);
// console.log("MONGO URI:", process.env.MONGO_URI);  

app.use('/api/v1', uploadRouter);

app.get('/health', (req, res) => {
  res.send('Server is running');
});

app.listen(port, () => {
  console.log(`\n\n ''' \n\n Server is running at: http://localhost:${port} \n\n ''' \n\n`);
});