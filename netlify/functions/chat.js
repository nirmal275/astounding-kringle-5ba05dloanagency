let OpenAI = null;
try {
  const openaiModule = require('openai');
  OpenAI = openaiModule.OpenAI || openaiModule;
} catch (_) {
  // OpenAI module optional/fallback available
}

const loanKnowledge = require('../../config/loanKnowledge');

const corsHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
};

function json(statusCode, body) {
  return {
    statusCode,
    headers: corsHeaders,
    body: JSON.stringify(body)
  };
}

function buildSystemPrompt() {
  const loanTypes = Object.entries(loanKnowledge.loanTypes)
    .map(([key, loan]) => `${loan.name}: ${loan.minAmount} to ${loan.maxAmount}; rates ${loan.minRate} to ${loan.maxRate}; tenure ${loan.tenure}; eligibility ${loan.eligibility}`)
    .join('\n');

  return `You are "Loan Assistant", the official AI chatbot for Easy Loan Services (India).
Answer user questions accurately regarding personal, home, business, car, gold, and education loans, interest rates, eligibility, documents, and EMI calculations.
Rules:
1. Never guarantee loan approval.
2. Never ask for passwords, OTPs, PINs, or complete bank details.
3. Keep responses helpful, polite, and concise (under 150 words).
4. Direct users to call +91-88008-38765 or submit their contact details for a specialist callback.
Loan products:\n${loanTypes}`;
}

exports.handler = async (event) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: corsHeaders,
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Method not allowed. Use POST.' });
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch (_) {
    return json(400, { error: 'Invalid JSON request body.' });
  }

  const message = typeof body.message === 'string' ? body.message.trim() : '';
  if (!message) {
    return json(400, { error: 'Message cannot be empty.' });
  }
  if (message.length > 2000) {
    return json(400, { error: 'Message is too long. Please keep under 2000 characters.' });
  }

  // If OPENAI_API_KEY is configured, try calling OpenAI GPT
  if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.trim() !== '') {
    try {
      const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY.trim() });
      const response = await client.chat.completions.create({
        model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: buildSystemPrompt() },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 500
      });

      const reply = response.choices && response.choices[0] && response.choices[0].message && response.choices[0].message.content;
      if (reply) {
        return json(200, {
          success: true,
          message: reply,
          source: 'openai',
          timestamp: new Date().toISOString()
        });
      }
    } catch (openAiError) {
      console.warn('[Netlify Function] OpenAI call failed, falling back to loan knowledge engine:', openAiError.message);
    }
  }

  // Use loan knowledge response generator (offline / unconfigured API fallback)
  const knowledgeResponse = loanKnowledge.getLoanAssistantResponse(message);
  return json(200, {
    success: true,
    message: knowledgeResponse,
    source: 'knowledge-engine',
    timestamp: new Date().toISOString()
  });
};
