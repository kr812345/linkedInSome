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

// 1. Dynamic CORS configuration (Must be first!)
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://linkroast.vercel.app',
  'https://linked-in-some-cbpa.vercel.app',
  process.env.CORS_ORIGIN
].filter(Boolean);

app.use(cors({ 
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    const normalizedOrigin = origin.replace(/\/$/, "");
    const isAllowed = allowedOrigins.some(ao => ao.replace(/\/$/, "") === normalizedOrigin);
    if (isAllowed) {
      return callback(null, true);
    } else {
      console.warn(`Blocked by CORS: ${origin}`);
      return callback(null, false);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// 2. Parse JSON and form data
app.use(express.json()); 
app.use(express.urlencoded({extended: true})); 

// 3. Rate Limiting Configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, // Increased limit for testing
  standardHeaders: true, 
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests, please try again later."
  }
});
app.use(limiter);


app.use('/v1/api', linkRoastRouter);

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: "LinkRoast API is active and healthy.",
    version: "1.0.0"
  });
});

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Always listen on the provided port unless running on Vercel
if (!process.env.VERCEL) {
  app.listen(port, "0.0.0.0", () => {
    console.log(`\n🚀 Server is live at http://0.0.0.0:${port}`);
    console.log(`📡 Health check: http://0.0.0.0:${port}/health`);
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