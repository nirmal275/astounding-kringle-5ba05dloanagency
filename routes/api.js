/**
 * Chatbot API Routes
 * Handles chatbot messages and AI responses
 */

const express = require('express');
const router = express.Router();
const loanKnowledge = require('../config/loanKnowledge');

// Mock OpenAI client - will be initialized in server.js
let openaiClient = null;

// Initialize OpenAI client from server
router.setOpenAIClient = function(client) {
  openaiClient = client;
};

/**
 * POST /api/chat
 * Send a message to the chatbot and get AI response
 */
router.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;

    // Input validation
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Message length protection (prevent excessively long inputs)
    if (message.length > 2000) {
      return res.status(400).json({ error: 'Message is too long. Maximum 2000 characters.' });
    }

    const userMessage = message.trim();

    // If OpenAI client is initialized, attempt AI completion
    if (openaiClient) {
      try {
        const systemPrompt = buildSystemPrompt();
        const response = await openaiClient.chat.completions.create({
          model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: systemPrompt
            },
            {
              role: 'user',
              content: userMessage
            }
          ],
          temperature: 0.7,
          max_tokens: 500,
          top_p: 0.9
        });

        const aiResponse = response.choices && response.choices[0] && response.choices[0].message && response.choices[0].message.content;
        if (aiResponse) {
          return res.json({
            success: true,
            message: aiResponse,
            source: 'openai',
            timestamp: new Date().toISOString()
          });
        }
      } catch (openAiError) {
        console.warn('[Express Server] OpenAI completion failed, falling back to loan knowledge engine:', openAiError.message);
      }
    }

    // Fallback: Use built-in loan knowledge engine
    const knowledgeResponse = loanKnowledge.getLoanAssistantResponse(userMessage);
    return res.json({
      success: true,
      message: knowledgeResponse,
      source: 'knowledge-engine',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Chatbot error:', error.message);
    const knowledgeResponse = loanKnowledge.getLoanAssistantResponse(req.body && req.body.message);
    return res.json({
      success: true,
      message: knowledgeResponse,
      source: 'error-fallback',
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * POST /api/lead
 * Submit lead information (name, phone, loan type, etc.)
 */
router.post('/lead', async (req, res) => {
  try {
    const { name, phone, email, loanType, amount, employmentType } = req.body;

    // Basic validation
    if (!name || !phone) {
      return res.status(400).json({ error: 'Name and phone number are required' });
    }

    // Phone validation (basic)
    if (!/^\d{10}$/.test(phone.replace(/\D/g, ''))) {
      return res.status(400).json({ error: 'Invalid phone number. Please provide a valid 10-digit number.' });
    }

    // In a production app, you would save this to a database
    // For now, we'll just log it and send a success response
    const leadData = {
      name: sanitizeInput(name),
      phone: sanitizeInput(phone),
      email: email ? sanitizeInput(email) : null,
      loanType: loanType ? sanitizeInput(loanType) : null,
      amount: amount ? sanitizeInput(amount) : null,
      employmentType: employmentType ? sanitizeInput(employmentType) : null,
      timestamp: new Date().toISOString(),
      source: 'chatbot'
    };

    console.log('New lead received:', leadData);
    // TODO: Save to database or CRM

    return res.json({
      success: true,
      message: 'Thank you! We have received your information. A specialist will contact you shortly.',
      leadId: generateLeadId(),
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Lead submission error:', error.message);
    return res.status(500).json({
      error: 'Unable to process your application. Please try again or contact us directly.'
    });
  }
});

/**
 * GET /api/loan-info/:type
 * Get information about a specific loan type
 */
router.get('/loan-info/:type', (req, res) => {
  try {
    const { type } = req.params;
    const loanType = type.toLowerCase();

    if (!loanKnowledge.loanTypes[loanType]) {
      return res.status(404).json({ error: 'Loan type not found' });
    }

    return res.json({
      success: true,
      data: loanKnowledge.loanTypes[loanType]
    });

  } catch (error) {
    console.error('Loan info error:', error.message);
    return res.status(500).json({ error: 'Unable to fetch loan information' });
  }
});

/**
 * GET /api/health
 * Health check endpoint
 */
router.get('/health', (req, res) => {
  return res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    apiKeyConfigured: !!process.env.OPENAI_API_KEY
  });
});

// ============= HELPER FUNCTIONS =============

/**
 * Build system prompt with loan knowledge context
 */
function buildSystemPrompt() {
  const loanTypesText = Object.entries(loanKnowledge.loanTypes)
    .map(([key, loan]) => `
${loan.name}:
- Amount: ${loan.minAmount} to ${loan.maxAmount}
- Interest Rate: ${loan.minRate} to ${loan.maxRate}
- Tenure: ${loan.tenure}
- Eligibility: ${loan.eligibility}
    `)
    .join('\n');

  return `You are "Loan Assistant", a professional, helpful, and friendly chatbot for Easy Loan Services, a loan agency in India.

Your role is to:
1. Answer questions about personal loans, home loans, business loans, car loans, gold loans, and education loans
2. Explain eligibility criteria, required documents, interest rates, and loan application process
3. Help users understand EMI calculations and loan options
4. Guide users on how to apply online
5. Maintain a professional, confident but humble tone

LOAN TYPES AND DETAILS:
${loanTypesText}

IMPORTANT RULES YOU MUST FOLLOW:
1. NEVER guarantee loan approval - always say "subject to verification" or "eligible candidates may apply"
2. NEVER quote exact interest rates - always say "rates range from X% to Y%" 
3. NEVER ask for sensitive information: passwords, OTPs, PINs, CVV, complete credit card/bank details
4. If you don't know something specific about our policies, say: "This is a great question! I recommend contacting our team at +91-88008-38765 or visiting our website for detailed information."
5. Always be honest if you're unsure - don't make up information
6. For complex financial advice, recommend speaking with a loan consultant
7. Encourage users to visit the website pages (loan-eligibility, faq, etc.) for more detailed information
8. Keep responses concise, clear, and helpful (under 150 words)
9. Use friendly language and emojis when appropriate

Support Contact:
- Phone: +91-88008-38765
- Email: support@easyloanservices.in
- WhatsApp: Available for quick queries

If a user asks about applying for a loan, offer to collect their basic information for a lead form (name, phone, loan type, amount, employment type).`;
}

/**
 * Sanitize user input to prevent XSS
 */
function sanitizeInput(input) {
  if (typeof input !== 'string') return input;
  return input
    .replace(/[<>]/g, '')
    .trim()
    .substring(0, 500);
}

/**
 * Generate unique lead ID
 */
function generateLeadId() {
  return 'LEAD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

module.exports = router;
