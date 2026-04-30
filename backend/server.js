import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import './src/config/envConfig.js';
import './src/service/service.gemini.js';
import './src/service/service.openai.js';
import linkRoastRouter from './src/routes/route.upload.js';

const port = process.env.PORT || 5000;

const app = express();

// Trust proxy for Render/Vercel (essential for accurate rate limiting and HTTPS detection)
app.set('trust proxy', 1);

app.use(express.json()); // for json to parse in the request
app.use(express.urlencoded({extended: true})); // for formdata.

// Rate Limiting Configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Limit each IP to 20 requests per 15 minutes
  standardHeaders: true, 
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests from this IP, please try again after 15 minutes."
  }
});

// Apply rate limiter to all routes
app.use(limiter);

// Dynamic CORS configuration
const allowedOrigins = [
  'http://localhost:3000', 
  'https://linkroast.vercel.app', 
  process.env.CORS_ORIGIN
].filter(Boolean);

app.use(cors({ 
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));


app.use('/v1/api', linkRoastRouter);

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(port, "0.0.0.0", () => {
    console.log(`\n\n ''' \n\n Server is running at: http://0.0.0.0:${port} \n\n ''' \n\n`);
  });
}

export default app;

// Graceful Shutdown Logic
const shutdown = () => {
  console.log('Shutdown signal received: closing HTTP server');
  process.exit(0);
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);