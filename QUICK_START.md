# Quick Start Guide - Easy Loan Services Chatbot

## 🚀 Start in 3 Commands

### 1️⃣ Install Dependencies (One-time only)
```bash
npm install
```

### 2️⃣ Create .env File (One-time only)
Copy `.env.example` to `.env`:
```bash
copy .env.example .env
```

Then open `.env` and add your OpenAI API key:
```
OPENAI_API_KEY=sk-your-actual-key-here
PORT=3000
```

### 3️⃣ Run the Chatbot

**Open TWO terminals (side by side):**

#### Terminal 1 - Backend API:
```bash
node server.js
```

Look for:
```
✓ Server running at http://localhost:3000
✓ API endpoint: http://localhost:3000/api/chat
```

#### Terminal 2 - Frontend Website:
```
In VS Code:
- Open index.html
- Right-click → "Open with Live Server"
```

Website opens at: `http://localhost:5500`

---

## ✅ Testing Checklist

- [ ] Backend running at http://localhost:3000
- [ ] Frontend running at http://localhost:5500
- [ ] Can see floating chat button (💬) at bottom-right
- [ ] Can click button to open chat window
- [ ] Can send message: "What is a personal loan?"
- [ ] Receive AI response
- [ ] Can click quick-reply buttons
- [ ] Can see lead form when asking to apply

---

## 🆘 If Something Goes Wrong

### Backend won't start:
```
Error: Cannot find module
→ Run: npm install
```

### API key error:
```
✗ OpenAI initialization error
→ Check .env file has correct key
→ Key should start with: sk-
```

### Chatbot button not showing:
```
→ Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
→ Check browser console: F12 → Console
```

### CORS errors:
```
→ Make sure both servers are running
→ Backend: http://localhost:3000
→ Frontend: http://localhost:5500
```

---

## 📝 OpenAI API Key

1. Go to: https://platform.openai.com/api-keys
2. Click "Create new secret key"
3. Copy the full key (starts with `sk-`)
4. Paste into `.env` file
5. Save and restart `node server.js`

---

## 📁 Project Structure

```
d:\Online loan agency\
├── server.js           ← Start this (Terminal 1)
├── .env                ← Add API key here
├── package.json        ← Dependencies
├── config/loanKnowledge.js
├── routes/api.js
├── js/chatbot.js       ← Frontend logic
├── css/chatbot.css     ← Chatbot styling
├── index.html          ← Open in Live Server (Terminal 2)
└── pages/              ← All other pages
```

---

## 🎯 Common Tasks

### Change chatbot name:
Edit `js/chatbot.js` line 50: `<h3>Loan Assistant</h3>`

### Change welcome message:
Edit `config/loanKnowledge.js` → Update system prompt

### Change quick-reply buttons:
Edit `js/chatbot.js` line 35-42: `QUICK_REPLIES` array

### Change API port:
Edit `.env`: `PORT=3001` (change 3000)
Then update `js/chatbot.js` line 18: `apiUrl: 'http://localhost:3001/api/chat'`

---

## 📚 Full Documentation

See: `CHATBOT_SETUP.md` for complete guide with:
- Detailed installation steps
- API documentation
- Troubleshooting guide
- Deployment instructions
- Configuration options

---

## ⏱️ Estimated Time

- First setup: 15-20 minutes
- Daily startup: 30 seconds (2 commands)

---

**You're ready! 🎉**
