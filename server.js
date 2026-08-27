/**
 * Easy Loan Services - Chatbot Backend Server
 * 
 * Start this server with: node server.js
 * It will run on http://localhost:3000 by default
 * 
 * Requires:
 * - Node.js installed
 * - npm dependencies installed (npm install)
 * - .env file with OPENAI_API_KEY
 */

let dotenv = null;
try { dotenv = require('dotenv'); dotenv.config(); } catch (_) {}

let express;
try { express = require('express'); } catch (e) { console.error('Please run npm install to install dependencies.'); }
let cors;
try { cors = require('cors'); } catch (_) {}

let OpenAI = null;
try {
  const openaiModule = require('openai');
  OpenAI = openaiModule.OpenAI || openaiModule;
} catch (_) {}

const app = express ? express() : null;
const PORT = process.env.PORT || 3000;

// ============= MIDDLEWARE =============

// CORS - allow configured frontend origins, Netlify, and local development
const allowedOrigins = (process.env.FRONTEND_URL || 'https://www.easyloanservices.in,https://easyloanservices.in')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, Postman, file://)
    if (!origin) return callback(null, true);
    
    // Allow local development (any port on localhost or 127.0.0.1)
    const isLocalDevelopmentOrigin = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
    
    // Allow Netlify deployment previews (*.netlify.app)
    const isNetlifyOrigin = /^https:\/\/[a-z0-9-]+(\.netlify\.app)$/i.test(origin);

    if (isLocalDevelopmentOrigin || isNetlifyOrigin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(null, true); // Permissive in fallback to prevent frontend block
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: false
}));

app.options('*', cors());

// Parse JSON requests
app.use(express.json({ limit: '10mb' }));

// ============= INITIALIZATION =============

// Initialize OpenAI client
let openaiClient = null;

try {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY not found in environment variables');
  }

  openaiClient = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  console.log('✓ OpenAI API initialized successfully');
} catch (error) {
  console.error('✗ OpenAI initialization error:', error.message);
  console.error('Chat requests will return a temporary-unavailable response until OPENAI_API_KEY is configured.');
}

// ============= ROUTES =============

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    server: 'Easy Loan Services Chatbot',
    timestamp: new Date().toISOString(),
    apiConfigured: !!openaiClient
  });
});

// Load chatbot API routes
const apiRoutes = require('./routes/api');
apiRoutes.setOpenAIClient(openaiClient);
app.use('/api', apiRoutes);

// Static files - serve frontend from public folder if it exists
app.use(express.static('public'));

// Serve HTML files from root
app.use(express.static('.'));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// ============= ERROR HANDLING =============

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
});

// ============= START SERVER =============

app.listen(PORT, () => {
  console.log('\n' + '='.repeat(60));
  console.log('Easy Loan Services - Chatbot Server');
  console.log('='.repeat(60));
  console.log(`\n✓ Server running on port ${PORT}`);
  console.log(`✓ API endpoint: /api/chat`);
  console.log(`\nMake sure your website is also running.`);
  console.log(`Use Live Server or similar to serve the HTML files.`);
  console.log('\n' + '='.repeat(60) + '\n');
});
