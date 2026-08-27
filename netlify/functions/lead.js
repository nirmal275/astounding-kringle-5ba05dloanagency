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

function clean(value, maxLength) {
  return typeof value === 'string' ? value.replace(/[<>]/g, '').trim().slice(0, maxLength) : '';
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

  if (event.httpMethod !== 'POST') return json(405, { error: 'Method not allowed. Use POST.' });

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch (_) {
    return json(400, { error: 'Invalid JSON request.' });
  }

  const name = clean(body.name, 100);
  const phone = clean(body.phone, 20).replace(/\D/g, '');
  if (!name || !/^\d{10}$/.test(phone)) return json(400, { error: 'Please provide a name and valid 10-digit phone number.' });

  const leadId = `LEAD-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
  console.log('New lead received:', { leadId, name, phone, email: clean(body.email, 150), loanType: clean(body.loanType, 50), amount: clean(body.amount, 100), source: 'netlify-chatbot' });
  return json(200, { success: true, message: 'Thank you! We received your information. A specialist will contact you shortly.', leadId, timestamp: new Date().toISOString() });
};
