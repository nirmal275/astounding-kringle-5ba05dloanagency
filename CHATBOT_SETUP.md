# Easy Loan Services - AI Chatbot Setup Guide

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [File Structure](#file-structure)
3. [Prerequisites](#prerequisites)
4. [Installation Steps](#installation-steps)
5. [Configuration](#configuration)
6. [Running Locally](#running-locally)
7. [Testing the Chatbot](#testing-the-chatbot)
8. [Troubleshooting](#troubleshooting)
9. [API Documentation](#api-documentation)
10. [Deployment](#deployment)

---

## 🎯 Project Overview

This chatbot integration adds an AI-powered "Loan Assistant" to your Easy Loan Services website. The chatbot:

- ✅ Answers loan-related questions (eligibility, documents, interest rates, etc.)
- ✅ Provides quick-reply buttons for common queries
- ✅ Collects lead information through an embedded form
- ✅ Works on desktop and mobile devices
- ✅ Operates with secure backend API (API key never exposed to frontend)
- ✅ Uses OpenAI's GPT-3.5/GPT-4 for intelligent responses

---

## 📁 File Structure

### **New Files Created:**

```
📦 d:\Online loan agency\
├── 📄 server.js                    # Node.js backend server
├── 📄 package.json                 # Dependencies
├── 📄 .env.example                 # Environment variables template
├── 📁 config/
│   └── 📄 loanKnowledge.js        # Loan information database
├── 📁 routes/
│   └── 📄 api.js                  # API endpoints (/api/chat, /api/lead)
├── 📁 js/
│   └── 📄 chatbot.js              # Frontend chatbot logic
├── 📁 css/
│   └── 📄 chatbot.css             # Chatbot styling
└── 📄 CHATBOT_SETUP.md            # This file
```

### **Modified Files:**

- `index.html` - Added chatbot CSS & JS links
- `pages/*.html` - Added chatbot CSS & JS links to all pages
- `blog/index.html` - Added chatbot CSS & JS links

---

## 🔧 Prerequisites

Before starting, ensure you have:

1. **Node.js & npm** (Download from https://nodejs.org/)
   - Check: Open terminal and run `node --version` and `npm --version`
   
2. **OpenAI API Key** (Free or paid plan)
   - Get from: https://platform.openai.com/api-keys
   - You'll need an OpenAI account (create at https://openai.com)
   
3. **VS Code** with Live Server extension (for serving HTML files)
   - Install Live Server: Open VS Code → Extensions → Search "Live Server" → Install

4. **Text Editor** (VS Code recommended)

---

## 📦 Installation Steps

### **Step 1: Install Node.js Dependencies**

1. Open terminal in your project folder: `d:\Online loan agency\`
   - In VS Code: Use `Ctrl + `` to open terminal
   - Or right-click folder → Open in Terminal

2. Run the following command:
   ```bash
   npm install
   ```
   
   This will install:
   - `express` - Web framework
   - `cors` - Enable cross-origin requests
   - `dotenv` - Environment variables
   - `openai` - OpenAI API client

   **Expected output:**
   ```
   added X packages in X seconds
   ```

---

### **Step 2: Create .env File**

1. Copy `.env.example` to `.env`:
   - **Windows:** In terminal, run:
     ```bash
     copy .env.example .env
     ```
   - **Mac/Linux:** Run:
     ```bash
     cp .env.example .env
     ```

2. Open `.env` file and add your OpenAI API key:
   ```
   OPENAI_API_KEY=sk-your-actual-api-key-here
   PORT=3000
   NODE_ENV=development
   COMPANY_PHONE=+91-88008-38765
   COMPANY_EMAIL=support@easyloanservices.in
   ```

3. **Important:** Replace `sk-your-actual-api-key-here` with your actual OpenAI API key

---

### **Step 3: Verify API Key**

1. Visit https://platform.openai.com/api-keys
2. Click "Create new secret key"
3. Copy the entire key (it starts with `sk-`)
4. Paste into `.env` file
5. Save the file

---

## ▶️ Running Locally

### **Method 1: Run Backend and Frontend in Separate Terminals**

#### **Terminal 1 - Start Backend Server:**
```bash
cd d:\Online loan agency
node server.js
```

You should see:
```
============================================================
Easy Loan Services - Chatbot Server
============================================================

✓ Server running at http://localhost:3000
✓ API endpoint: http://localhost:3000/api/chat

Make sure your website is also running.
Use Live Server or similar to serve the HTML files.

============================================================
```

#### **Terminal 2 - Start Frontend (Live Server):**

1. In VS Code, open `index.html`
2. Right-click → "Open with Live Server"
3. Website opens at `http://localhost:5500` (or similar port)

---

### **Method 2: Use npm script (Easier)**

Add this to `package.json` if you want a simpler start command:

```json
"scripts": {
  "start": "node server.js",
  "dev": "node server.js"
}
```

Then run:
```bash
npm start
```

---

## 🔐 Configuration

### **.env Variables Explained:**

| Variable | Purpose | Example |
|----------|---------|---------|
| `OPENAI_API_KEY` | Your OpenAI API key | Set only on the backend host |
| `PORT` | Backend server port | `3000` |
| `NODE_ENV` | Environment mode | `development` |
| `COMPANY_PHONE` | Company contact number | `+91-88008-38765` |
| `COMPANY_EMAIL` | Company email | `support@easyloanservices.in` |

### **Modify Chatbot API URL (if needed):**

If your backend runs on a different port:
1. Open `js/chatbot.js`
2. Configure `LOAN_API_URL` in Netlify for the deployed backend, or use the automatic local-host configuration during development.
3. Change `3000` to your actual port number

---

## 🧪 Testing the Chatbot

### **Test 1: Backend Health Check**
1. Open browser: `http://localhost:3000/api/health`
2. You should see JSON response:
   ```json
   {
     "status": "ok",
     "server": "Easy Loan Services Chatbot",
     "apiConfigured": true
   }
   ```

### **Test 2: Frontend Chatbot**
1. Open `http://localhost:5500` (or your Live Server port)
2. Look for floating chat button at bottom-right corner
3. Click the button to open chat window
4. Send test message: `"What is a personal loan?"`
5. You should get an AI response within 2-3 seconds

### **Test 3: Quick Reply Buttons**
1. Chatbot should show welcome message with buttons
2. Click any button like "Loan Eligibility"
3. Button text is sent as message
4. Bot responds with relevant information

### **Test 4: Lead Form**
1. Send message: `"I want to apply now"`
2. Bot should offer to collect your information
3. Fill the form with test data:
   - Name: Test User
   - Phone: 9876543210
   - Loan Type: Personal Loan
4. Click "Submit & Get Offer"
5. Should show success message with Lead ID

### **Test 5: Mobile Responsive**
1. Open chatbot on phone or use Chrome DevTools (F12)
2. Press `Ctrl+Shift+M` for responsive view
3. Test on different screen sizes
4. Chatbot should adapt responsively

---

## 🐛 Troubleshooting

### **Issue: "Cannot find module 'express'"**
- **Solution:** Run `npm install` again to install dependencies
- Check that `node_modules` folder was created

### **Issue: "OPENAI_API_KEY not found in environment"**
- **Solution:** 
  1. Check `.env` file exists (not `.env.example`)
  2. Verify API key is actually pasted (not `sk-your-api-key-here`)
  3. Restart backend server after saving `.env`

### **Issue: "Invalid API key" or "401 Unauthorized"**
- **Solution:**
  1. Go to https://platform.openai.com/api-keys
  2. Check if your key is still active (not expired/revoked)
  3. Verify key format: should start with `sk-`
  4. Try generating a new key and updating `.env`

### **Issue: Chatbot shows "Unable to process message"**
- **Solution:**
  1. Check browser console (F12) for errors
  2. Ensure backend server is running (Terminal 1)
  3. Check terminal for error messages
  4. Verify API key in `.env` is valid

### **Issue: Chatbot button not appearing**
- **Solution:**
  1. Check console (F12) for JavaScript errors
  2. Verify `js/chatbot.js` was added to HTML
  3. Verify `css/chatbot.css` was added to HTML
  4. Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

### **Issue: API calls timing out**
- **Solution:**
  1. Check internet connection
  2. Verify OpenAI API is up: https://status.openai.com/
  3. Check API request limits/quota
  4. Try again - OpenAI sometimes has latency

### **Issue: CORS errors in console**
- **Solution:**
  1. Update `cors` settings in `server.js` if needed
  2. Check API URL matches: should be `http://localhost:3000`
  3. Ensure backend is running on correct port

---

## 📚 API Documentation

### **Endpoint 1: POST /api/chat**

**Send a message to the chatbot:**

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What is a personal loan?"}'
```

**Request:**
```json
{
  "message": "What is a personal loan?"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "A personal loan is an unsecured loan...",
  "timestamp": "2024-08-26T10:30:00.000Z"
}
```

**Response (Error):**
```json
{
  "error": "Message is too long. Maximum 2000 characters."
}
```

---

### **Endpoint 2: POST /api/lead**

**Submit lead information:**

```bash
curl -X POST http://localhost:3000/api/lead \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "phone": "9876543210",
    "email": "john@example.com",
    "loanType": "personal",
    "amount": "5 lakhs"
  }'
```

**Request:**
```json
{
  "name": "John Doe",
  "phone": "9876543210",
  "email": "john@example.com",
  "loanType": "personal",
  "amount": "5 lakhs",
  "employmentType": "Salaried"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Thank you! We have received your information...",
  "leadId": "LEAD-1724091400000-ABC123DEF",
  "timestamp": "2024-08-26T10:30:00.000Z"
}
```

---

### **Endpoint 3: GET /api/health**

**Check if server is running:**

```bash
curl http://localhost:3000/api/health
```

**Response:**
```json
{
  "status": "ok",
  "server": "Easy Loan Services Chatbot",
  "timestamp": "2024-08-26T10:30:00.000Z",
  "apiKeyConfigured": true
}
```

---

### **Endpoint 4: GET /api/loan-info/:type**

**Get loan information:**

```bash
curl http://localhost:3000/api/loan-info/personal
```

**Response:**
```json
{
  "success": true,
  "data": {
    "name": "Personal Loan",
    "minAmount": "₹10,000",
    "maxAmount": "₹50 lakhs",
    "minRate": "10.5%",
    "maxRate": "18%",
    "tenure": "12-60 months",
    "documents": ["Aadhaar", "PAN", "Salary slips (3 months)", "Bank statements (6 months)"],
    "eligibility": "Age 21-60, monthly income ₹15,000+, CIBIL 700+"
  }
}
```

---

## 🚀 Deployment

### **Deploy to Production (General Steps):**

1. **Choose a hosting service:**
   - Heroku (easiest for Node.js)
   - Railway
   - AWS
   - DigitalOcean
   - Render

2. **Prepare for production:**
   - Update `.env` with production values
   - Verify all API endpoints
   - Update `cors` origins in `server.js` to your domain
   - Enable HTTPS

3. **Example: Heroku Deployment**
   
   a. Install Heroku CLI
   b. Create `Procfile` file with:
      ```
      web: node server.js
      ```
   c. Run:
      ```bash
      heroku login
      heroku create your-app-name
      heroku config:set OPENAI_API_KEY=sk-your-key
      git push heroku main
      ```

4. **Update frontend API URL:**
   - In `js/chatbot.js`, update:
     ```javascript
     const CONFIG = {
       apiUrl: 'https://your-app-name.herokuapp.com/api/chat',
       leadApiUrl: 'https://your-app-name.herokuapp.com/api/lead'
     };
     ```

---

## 📞 Support

### **For Issues:**
- Check browser console: F12 → Console tab
- Check backend terminal for error messages
- Check `.env` file configuration
- Verify OpenAI API key is valid

### **Backend Logs:**
Look for messages like:
- `✓ Server running at http://localhost:3000` - Backend started successfully
- `✓ OpenAI API initialized successfully` - API key is valid
- `✗ OpenAI initialization error` - Problem with API key

### **Frontend Logs:**
- Open browser DevTools: F12
- Check Console tab for JavaScript errors
- Network tab shows API requests

---

## 📝 Next Steps

1. Test chatbot thoroughly in development
2. Customize chatbot responses in `config/loanKnowledge.js`
3. Add lead database integration in `routes/api.js`
4. Deploy backend to production server
5. Update frontend API URLs for production
6. Monitor chatbot performance and user feedback

---

**Happy deploying! 🚀**
