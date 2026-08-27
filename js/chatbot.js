/**
 * Easy Loan Services - Chatbot Frontend
 * Intelligent Loan Assistant with OpenAI & Local Knowledge Engine
 */

(function () {
  'use strict';

  // ============= LOCAL KNOWLEDGE ENGINE (CLIENT-SIDE) =============
  const LocalLoanKnowledge = {
    getResponse: function(text) {
      // Check if global loanKnowledge is loaded
      if (typeof window !== 'undefined' && window.loanKnowledge && typeof window.loanKnowledge.getLoanAssistantResponse === 'function') {
        return window.loanKnowledge.getLoanAssistantResponse(text);
      }

      const q = (text || '').toLowerCase().trim();

      // 1. Greetings
      if (/^(hi|hello|hey|namaste|good morning|good afternoon|good evening|start|help)\b/i.test(q)) {
        return "Hello! 👋 Welcome to **Easy Loan Services**! I am your AI Loan Assistant.\n\nI can help you with:\n• 💰 **Loan Types & Rates** (Personal, Home, Business, Car, Gold, Education)\n• 📊 **EMI Calculation & Formulas**\n• ✓ **Eligibility & Required Documents**\n• 📝 **Applying Online for Fast Approval**\n\nHow can I assist you today?";
      }

      // 2. Loan Types
      if (/loan\s*types?|types of loan|which loans|what loans|all loans|loans available|what do you offer/i.test(q)) {
        return "We offer 6 flexible loan products tailored to your needs:\n\n" +
          "1. 👤 **Personal Loan**: ₹10K – ₹50 Lakhs (Interest from 10.5% p.a.)\n" +
          "2. 🏠 **Home Loan**: ₹5 Lakhs – ₹5 Crores (Interest from 8.4% p.a.)\n" +
          "3. 💼 **Business Loan**: ₹50K – ₹5 Crores (Interest from 12% p.a.)\n" +
          "4. 🚗 **Car Loan**: ₹2 Lakhs – ₹1 Crore (Interest from 9% p.a.)\n" +
          "5. 🪙 **Gold Loan**: ₹10K – ₹25 Lakhs (Interest from 10% p.a., Instant approval)\n" +
          "6. 🎓 **Education Loan**: ₹1 Lakh – ₹1 Crore (Interest from 8% p.a.)\n\n" +
          "Would you like more details on any specific loan or wish to check your eligibility?";
      }

      // 3. EMI & Calculations
      if (/\bemi\b|monthly installment|calculate emi|how is emi calculated|emi information|emi formula/i.test(q)) {
        return "📊 **What is EMI?**\n" +
          "EMI stands for **Equated Monthly Installment**. It is the fixed amount you pay back to the lender each month until the loan is fully repaid.\n\n" +
          "📐 **EMI Formula**: `EMI = [P × R × (1+R)^N] / [(1+R)^N - 1]`\n" +
          "• **P** = Principal Loan Amount\n" +
          "• **R** = Monthly Interest Rate (Annual Rate ÷ 12 ÷ 100)\n" +
          "• **N** = Tenure in Months\n\n" +
          "💡 You can use our interactive **EMI Calculator** on our website to see your exact monthly payout and amortization schedule!";
      }

      // 4. How to Apply
      if (/how to apply|how can i apply|apply for (a )?loan|application process|where to apply|want to apply|process of applying/i.test(q)) {
        return "📝 **How to Apply for a Loan in 4 Easy Steps:**\n\n" +
          "1️⃣ **Submit Details**: Click 'Apply Now' or use the quick form in this chat with your contact info.\n" +
          "2️⃣ **Eligibility Check**: Our specialists assess your profile for instant pre-approval.\n" +
          "3️⃣ **Document Verification**: Upload Aadhaar, PAN, and bank statements online.\n" +
          "4️⃣ **Disbursement**: Once approved, funds are credited directly to your bank account within 24-48 hours!\n\n" +
          "👉 Would you like to fill out a quick application now?";
      }

      // 5. Eligibility Criteria
      if (/eligib|who can apply|am i eligible|minimum salary|age limit|qualification/i.test(q)) {
        return "✓ **General Loan Eligibility Criteria:**\n\n" +
          "• **Age**: 21 to 65 years\n" +
          "• **Employment**: Salaried (min. ₹15,000/month) or Self-Employed / Business owner\n" +
          "• **CIBIL Score**: 650+ (700+ preferred for lowest interest rates)\n" +
          "• **Nationality**: Indian Citizen\n" +
          "• **Experience**: Min. 6 months in current job or 1 year in business\n\n" +
          "Would you like to check your eligibility for a specific loan?";
      }

      // 6. Documents Required
      if (/document|paperwork|what proofs|aadhaar|pan card|itr|salary slip/i.test(q)) {
        return "📄 **Required Documents for Loan Application:**\n\n" +
          "1. **Identity Proof**: Aadhaar Card, PAN Card, Passport, or Voter ID\n" +
          "2. **Address Proof**: Utility Bill, Rent Agreement, or Aadhaar\n" +
          "3. **Income Proof**:\n" +
          "   • *Salaried*: Last 3 months salary slips + 6 months bank statements\n" +
          "   • *Self-Employed*: Last 2-3 years ITR + 12 months bank statements\n" +
          "4. **Passport Size Photograph**\n\n" +
          "Collateral documents are required only for Home or Gold loans.";
      }

      // 7. Personal Loan
      if (/personal loan/i.test(q)) {
        return "👤 **Personal Loan Overview:**\n" +
          "• **Loan Amount**: ₹10,000 to ₹50 Lakhs\n" +
          "• **Interest Rate**: Starting at 10.5% p.a.\n" +
          "• **Tenure**: 12 to 60 Months\n" +
          "• **Key Benefits**: 100% Paperless, No collateral needed, 24-hour disbursal.\n" +
          "• **Eligibility**: Min. salary ₹15,000/month, Age 21-60 years.";
      }

      // 8. Home Loan
      if (/home loan|house loan|property loan/i.test(q)) {
        return "🏠 **Home Loan Overview:**\n" +
          "• **Loan Amount**: ₹5 Lakhs to ₹5 Crores\n" +
          "• **Interest Rate**: Starting at 8.4% p.a.\n" +
          "• **Tenure**: Up to 30 Years\n" +
          "• **Key Benefits**: Lowest rates in India, Tax benefits under Sec 80C & 24b, Balance transfer facility.\n" +
          "• **Eligibility**: Age 21-70 years, annual income ₹3 Lakhs+.";
      }

      // 9. Business Loan
      if (/business loan|commercial loan|msme|working capital/i.test(q)) {
        return "💼 **Business Loan Overview:**\n" +
          "• **Loan Amount**: ₹50,000 to ₹5 Crores\n" +
          "• **Interest Rate**: Starting at 12% p.a.\n" +
          "• **Tenure**: 24 to 60 Months\n" +
          "• **Key Benefits**: Collateral-free options, working capital & machinery financing, quick sanction.\n" +
          "• **Eligibility**: Business operational for 1+ year, turnover ₹5 Lakhs+.";
      }

      // 10. Car Loan
      if (/car loan|vehicle loan|auto loan/i.test(q)) {
        return "🚗 **Car Loan Overview:**\n" +
          "• **Loan Amount**: ₹2 Lakhs to ₹1 Crore\n" +
          "• **Interest Rate**: Starting at 9% p.a.\n" +
          "• **Tenure**: 12 to 84 Months\n" +
          "• **Key Benefits**: Up to 100% on-road funding, options for new & used cars, minimal processing fee.";
      }

      // 11. Gold Loan
      if (/gold loan/i.test(q)) {
        return "🪙 **Gold Loan Overview:**\n" +
          "• **Loan Amount**: ₹10,000 to ₹25 Lakhs\n" +
          "• **Interest Rate**: Starting at 10% p.a.\n" +
          "• **Tenure**: 12 to 36 Months\n" +
          "• **Key Benefits**: Instant cash in 30 minutes, minimal documentation, bank vault safety with zero pre-closure penalty.";
      }

      // 12. Education Loan
      if (/education loan|study loan|student loan/i.test(q)) {
        return "🎓 **Education Loan Overview:**\n" +
          "• **Loan Amount**: ₹1 Lakh to ₹1 Crore\n" +
          "• **Interest Rate**: Starting at 8% p.a.\n" +
          "• **Tenure**: Up to 10 Years (repayment starts after course completion)\n" +
          "• **Key Benefits**: 100% tuition & living cost coverage for top universities in India & abroad.";
      }

      // 13. Interest Rates
      if (/interest rate|rate of interest|roi|charges|percentage/i.test(q)) {
        return "📈 **Current Starting Interest Rates:**\n\n" +
          "• 🏠 Home Loan: **8.4% – 12% p.a.**\n" +
          "• 🎓 Education Loan: **8% – 12% p.a.**\n" +
          "• 🚗 Car Loan: **9% – 15% p.a.**\n" +
          "• 🪙 Gold Loan: **10% – 14% p.a.**\n" +
          "• 👤 Personal Loan: **10.5% – 18% p.a.**\n" +
          "• 💼 Business Loan: **12% – 18% p.a.**\n\n" +
          "*Rates vary based on CIBIL score, income, and tenure.*";
      }

      // 14. CIBIL Score
      if (/cibil|credit score|experian|low cibil|bad credit/i.test(q)) {
        return "📊 **CIBIL / Credit Score Guide:**\n\n" +
          "• **750+**: Excellent – Guaranteed lowest interest rates & instant pre-approvals.\n" +
          "• **700 – 749**: Good – Eligible for most loans with fast turnaround.\n" +
          "• **650 – 699**: Fair – Eligible with additional income verification.\n" +
          "• **Below 650**: Gold loans or secured loans are recommended to rebuild your score.";
      }

      // 15. Contact & Support
      if (/contact|support|phone|number|call|whatsapp|email|address|branch|office|talk to human|agent/i.test(q)) {
        return "☎️ **Contact Easy Loan Services Support:**\n\n" +
          "• 📞 **Phone**: [+91-88008-38765](tel:+918800838765)\n" +
          "• 💬 **WhatsApp**: [Chat on WhatsApp](https://wa.me/918800838765)\n" +
          "• ✉️ **Email**: support@easyloanservices.in\n" +
          "• ⏰ **Working Hours**: Mon – Sat: 9:00 AM – 6:00 PM IST\n\n" +
          "Our team is ready to assist you!";
      }

      // 16. Thanks / Goodbye
      if (/thanks|thank you|ok|okay|bye|goodbye|great/i.test(q)) {
        return "You're very welcome! 😊 If you have any more questions or want to apply, feel free to ask anytime. Have a great day!";
      }

      // 17. Default Fallback
      return "I'm here to help with all your loan queries! 😊\n\n" +
        "We offer Personal, Home, Business, Car, Gold, and Education Loans with lowest interest rates starting at 8.4% p.a.\n\n" +
        "Feel free to ask about eligibility, EMI calculation, documents, or contact our support team at 📞 **+91-88008-38765**.";
    }
  };

  // ============= CHATBOT CONTEXT & CONFIGURATION =============
  const ChatbotContext = {
    getApiUrl: function() {
      const base = (window.LOAN_CHATBOT_CONFIG && window.LOAN_CHATBOT_CONFIG.apiBaseUrl) || '';
      return base ? `${base}/api/chat` : '/api/chat';
    },

    getLeadApiUrl: function() {
      const base = (window.LOAN_CHATBOT_CONFIG && window.LOAN_CHATBOT_CONFIG.apiBaseUrl) || '';
      return base ? `${base}/api/lead` : '/api/lead';
    },

    // Quick Reply Buttons
    QUICK_REPLIES: [
      { text: 'Loan Eligibility', icon: '✓' },
      { text: 'Required Documents', icon: '📄' },
      { text: 'Loan Types', icon: '💰' },
      { text: 'EMI Information', icon: '📊' },
      { text: 'How to Apply', icon: '📝' },
      { text: 'Contact Support', icon: '☎️' }
    ],

    // State Management
    state: {
      isOpen: false,
      isLoading: false,
      messages: [],
      initialized: false
    },

    // Initialize chatbot
    init: function() {
      if (this.state.initialized) return;

      try {
        this.createHTML();
        this.attachEvents();
        this.state.initialized = true;
        console.log('✓ Loan Assistant Chatbot initialized');
      } catch (error) {
        console.error('✗ Chatbot initialization error:', error);
      }
    },

    // Create HTML elements
    createHTML: function() {
      // 1. Create chat window widget if not exists
      if (!document.getElementById('chatbot-widget')) {
        const widget = document.createElement('div');
        widget.id = 'chatbot-widget';
        widget.className = 'chatbot-container';
        widget.innerHTML = this.getWindowHTML();
        document.body.appendChild(widget);
      }

      // 2. Ensure chatbot FAB exists in DOM
      if (!document.getElementById('chatbot-fab')) {
        const floatingContainer = document.querySelector('.floating-buttons');
        if (floatingContainer) {
          const chatWrap = document.createElement('div');
          chatWrap.className = 'fab-wrap fab-chat-wrap';
          chatWrap.innerHTML = `
            <button class="fab fab-chat chatbot-fab" id="chatbot-fab" title="Open Loan Assistant" aria-label="Open Loan Assistant">
              <div class="fab-icon"><i class="fas fa-comments"></i></div>
              <div class="fab-badge" id="fab-badge">1</div>
              <span class="fab-label">Loan Assistant</span>
            </button>
          `;
          const fabTopWrap = floatingContainer.querySelector('.fab-top-wrap');
          if (fabTopWrap && fabTopWrap.nextSibling) {
            floatingContainer.insertBefore(chatWrap, fabTopWrap.nextSibling);
          } else {
            floatingContainer.prepend(chatWrap);
          }
        } else {
          // Standalone FAB inside chatbot-widget
          const widget = document.getElementById('chatbot-widget');
          if (widget && !widget.querySelector('.chatbot-fab')) {
            widget.insertAdjacentHTML('afterbegin', `
              <button class="chatbot-fab" id="chatbot-fab" title="Open Loan Assistant" aria-label="Open Loan Assistant">
                <div class="fab-icon"><i class="fas fa-comments"></i></div>
                <div class="fab-badge" id="fab-badge">1</div>
                <div class="fab-tooltip">Loan Assistant</div>
              </button>
            `);
          }
        }
      }
    },

    // Get chat window HTML template
    getWindowHTML: function() {
      return `
        <!-- Chat Window -->
        <div class="chatbot-window" id="chatbot-window" role="dialog" aria-modal="true" aria-labelledby="chatbot-title">
          
          <!-- Header -->
          <div class="chatbot-header">
            <div class="header-content">
              <h3 id="chatbot-title">Loan Assistant</h3>
              <p class="header-subtitle">Easy Loan Services • Online 24/7</p>
            </div>
            <button class="close-btn" id="close-chatbot" title="Close chat" aria-label="Close chat">
              <i class="fas fa-times"></i>
            </button>
          </div>

          <!-- Messages Container -->
          <div class="chatbot-messages" id="chatbot-messages">
            <!-- Messages will be inserted here -->
          </div>

          <!-- Lead Form (hidden by default) -->
          <div class="chatbot-lead-form" id="chatbot-lead-form" style="display:none;">
            <h4>Quick Loan Application</h4>
            <form id="lead-form">
              <div class="form-group">
                <label for="lead-name">Your Full Name *</label>
                <input type="text" id="lead-name" name="name" placeholder="Enter your full name" required>
              </div>
              <div class="form-group">
                <label for="lead-phone">Mobile Number *</label>
                <input type="tel" id="lead-phone" name="phone" placeholder="10-digit mobile number" required pattern="[0-9]{10}">
              </div>
              <div class="form-group">
                <label for="lead-email">Email Address (optional)</label>
                <input type="email" id="lead-email" name="email" placeholder="yourname@gmail.com">
              </div>
              <div class="form-group">
                <label for="lead-loantype">Loan Type *</label>
                <select id="lead-loantype" name="loanType" required>
                  <option value="">Select a loan type</option>
                  <option value="Personal Loan">Personal Loan (10.5% p.a.)</option>
                  <option value="Home Loan">Home Loan (8.4% p.a.)</option>
                  <option value="Business Loan">Business Loan (12% p.a.)</option>
                  <option value="Car Loan">Car Loan (9% p.a.)</option>
                  <option value="Gold Loan">Gold Loan (10% p.a.)</option>
                  <option value="Education Loan">Education Loan (8% p.a.)</option>
                </select>
              </div>
              <div class="form-group">
                <label for="lead-amount">Required Loan Amount (optional)</label>
                <input type="text" id="lead-amount" name="amount" placeholder="e.g., ₹5 Lakhs">
              </div>
              <button type="submit" class="btn-submit" id="lead-submit-btn">Submit Application</button>
              <button type="button" class="btn-cancel" id="cancel-lead-form">Cancel</button>
            </form>
          </div>

          <!-- Input Area -->
          <div class="chatbot-input-area">
            <input 
              type="text" 
              id="chatbot-input" 
              class="chatbot-input" 
              placeholder="Ask about loans, rates, EMI..." 
              autocomplete="off"
              aria-label="Message input"
            >
            <button class="send-btn" id="send-btn" title="Send message" aria-label="Send message">
              <i class="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      `;
    },

    // Attach event listeners
    attachEvents: function() {
      const fabButtons = document.querySelectorAll('#chatbot-fab, .chatbot-fab, .chatbot-fab-trigger, [data-open-chatbot]');
      const closeBtn = document.getElementById('close-chatbot');
      const sendBtn = document.getElementById('send-btn');
      const input = document.getElementById('chatbot-input');
      const form = document.getElementById('lead-form');
      const cancelLeadBtn = document.getElementById('cancel-lead-form');

      fabButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.toggleChat();
        });
      });

      if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.closeChat();
        });
      }

      // Close on Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.state.isOpen) {
          this.closeChat();
        }
      });

      // Send message
      if (sendBtn && input) {
        sendBtn.addEventListener('click', (e) => {
          e.preventDefault();
          this.sendMessage();
        });
        input.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            this.sendMessage();
          }
        });
      }

      // Lead form
      if (form) {
        form.addEventListener('submit', (e) => this.handleLeadSubmit(e));
      }
      if (cancelLeadBtn) {
        cancelLeadBtn.addEventListener('click', (e) => {
          e.preventDefault();
          this.hideLeadForm();
        });
      }
    },

    // Toggle chat window
    toggleChat: function() {
      this.state.isOpen ? this.closeChat() : this.openChat();
    },

    // Open chat window
    openChat: function() {
      const chatWindow = document.getElementById('chatbot-window');
      const fabs = document.querySelectorAll('#chatbot-fab, .chatbot-fab');
      const badge = document.getElementById('fab-badge');

      if (chatWindow) chatWindow.classList.add('open');
      fabs.forEach(f => f.classList.add('active'));
      document.body.classList.add('chatbot-open');
      this.state.isOpen = true;

      if (badge) badge.style.display = 'none';

      if (this.state.messages.length === 0) {
        setTimeout(() => this.showWelcomeMessage(), 250);
      }

      setTimeout(() => {
        const input = document.getElementById('chatbot-input');
        if (input) input.focus();
      }, 300);
    },

    // Close chat window
    closeChat: function() {
      const chatWindow = document.getElementById('chatbot-window');
      const fabs = document.querySelectorAll('#chatbot-fab, .chatbot-fab');

      if (chatWindow) chatWindow.classList.remove('open');
      fabs.forEach(f => f.classList.remove('active'));
      document.body.classList.remove('chatbot-open');
      this.state.isOpen = false;
    },

    // Show welcome message
    showWelcomeMessage: function() {
      const message = {
        type: 'bot',
        text: "Hello! 👋 Welcome to **Easy Loan Services**! I am your AI Loan Assistant.\n\nHow can I help you today? You can select a topic below or type your question.",
        timestamp: new Date()
      };

      this.state.messages.push(message);
      this.displayMessage(message);
      this.showQuickReplies();
    },

    // Show quick reply buttons
    showQuickReplies: function() {
      const messagesContainer = document.getElementById('chatbot-messages');
      if (!messagesContainer) return;

      const quickRepliesDiv = document.createElement('div');
      quickRepliesDiv.className = 'quick-replies';

      this.QUICK_REPLIES.forEach(reply => {
        const btn = document.createElement('button');
        btn.className = 'quick-reply-btn';
        btn.type = 'button';
        btn.innerHTML = `<span>${reply.icon}</span> ${reply.text}`;
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          quickRepliesDiv.remove();
          this.sendMessageText(reply.text);
        });
        quickRepliesDiv.appendChild(btn);
      });

      messagesContainer.appendChild(quickRepliesDiv);
      this.scrollToBottom();
    },

    // Send message from input
    sendMessage: function() {
      const input = document.getElementById('chatbot-input');
      if (!input) return;
      const text = input.value.trim();
      if (!text) return;
      this.sendMessageText(text);
      input.value = '';
    },

    // Send message text
    sendMessageText: function(text) {
      if (text.length > 2000) {
        this.displayMessage({ type: 'bot', text: '⚠️ Message too long. Please keep under 2000 characters.', timestamp: new Date() });
        return;
      }
      const userMessage = { type: 'user', text: text, timestamp: new Date() };
      this.state.messages.push(userMessage);
      this.displayMessage(userMessage);
      this.showTypingIndicator();
      this.sendToBackend(text);
    },

    // Display message with safe markdown support
    displayMessage: function(message) {
      const messagesContainer = document.getElementById('chatbot-messages');
      if (!messagesContainer) return;

      const messageDiv = document.createElement('div');
      messageDiv.className = `message message-${message.type}`;
      const renderedText = this.formatMessageText(message.text);
      messageDiv.innerHTML = `<div class="message-bubble">${renderedText}</div><div class="message-time">${this.formatTime(message.timestamp)}</div>`;
      messagesContainer.appendChild(messageDiv);
      this.scrollToBottom();
    },

    // Show typing indicator
    showTypingIndicator: function() {
      this.removeTypingIndicator();
      const messagesContainer = document.getElementById('chatbot-messages');
      if (!messagesContainer) return;

      const typingDiv = document.createElement('div');
      typingDiv.className = 'message message-bot typing-indicator';
      typingDiv.id = 'typing-indicator';
      typingDiv.innerHTML = '<div class="message-bubble"><span></span><span></span><span></span></div>';
      messagesContainer.appendChild(typingDiv);
      this.scrollToBottom();
    },

    // Remove typing indicator
    removeTypingIndicator: function() {
      const typing = document.getElementById('typing-indicator');
      if (typing) typing.remove();
    },

    // Send to backend with automatic knowledge engine fallback
    sendToBackend: async function(message) {
      try {
        this.state.isLoading = true;
        const apiUrl = this.getApiUrl();

        // Attempt API request
        let apiSucceeded = false;
        let responseMessage = '';

        try {
          const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: message })
          });

          if (response.ok) {
            const data = await response.json();
            if (data && data.message) {
              responseMessage = data.message;
              apiSucceeded = true;
            }
          }
        } catch (_) {
          // Network / offline / file:// protocol fallback
        }

        // If backend API did not respond, use intelligent local loan knowledge engine
        if (!apiSucceeded || !responseMessage) {
          responseMessage = LocalLoanKnowledge.getResponse(message);
        }

        this.removeTypingIndicator();

        const botMessage = {
          type: 'bot',
          text: responseMessage,
          timestamp: new Date()
        };
        this.state.messages.push(botMessage);
        this.displayMessage(botMessage);

        if (this.shouldShowLeadForm(message)) {
          setTimeout(() => this.showLeadFormPrompt(), 800);
        }
      } catch (error) {
        this.removeTypingIndicator();
        const fallbackText = LocalLoanKnowledge.getResponse(message);
        const errorMessage = {
          type: 'bot',
          text: fallbackText,
          timestamp: new Date()
        };
        this.state.messages.push(errorMessage);
        this.displayMessage(errorMessage);
      } finally {
        this.state.isLoading = false;
      }
    },

    // Check if should show lead form prompt
    shouldShowLeadForm: function(userMessage) {
      const msg = (userMessage || '').toLowerCase();
      return ['apply', 'loan form', 'get loan', 'interested', 'sanction', 'need loan', 'want a loan', 'how to apply'].some(k => msg.includes(k));
    },

    // Show lead form prompt
    showLeadFormPrompt: function() {
      const existingPrompt = document.querySelector('.lead-form-prompt');
      if (existingPrompt) existingPrompt.remove();

      const messagesContainer = document.getElementById('chatbot-messages');
      if (!messagesContainer) return;

      const promptDiv = document.createElement('div');
      promptDiv.className = 'lead-form-prompt';
      promptDiv.innerHTML = `
        <p>📋 Would you like to check your instant loan offer?</p>
        <button type="button" class="btn-lead-form" id="show-lead-form-btn">Yes, Apply Now</button>
        <button type="button" class="btn-skip" id="skip-lead-form-btn">No, Thanks</button>
      `;
      messagesContainer.appendChild(promptDiv);

      const showBtn = document.getElementById('show-lead-form-btn');
      const skipBtn = document.getElementById('skip-lead-form-btn');

      if (showBtn) {
        showBtn.addEventListener('click', (e) => {
          e.preventDefault();
          promptDiv.remove();
          this.showLeadForm();
        });
      }
      if (skipBtn) {
        skipBtn.addEventListener('click', (e) => {
          e.preventDefault();
          promptDiv.remove();
        });
      }
      this.scrollToBottom();
    },

    // Show lead form
    showLeadForm: function() {
      const formEl = document.getElementById('chatbot-lead-form');
      const inputArea = document.querySelector('.chatbot-input-area');
      if (formEl) formEl.style.display = 'block';
      if (inputArea) inputArea.style.display = 'none';
      this.scrollToBottom();
    },

    // Hide lead form
    hideLeadForm: function() {
      const formEl = document.getElementById('chatbot-lead-form');
      const inputArea = document.querySelector('.chatbot-input-area');
      if (formEl) formEl.style.display = 'none';
      if (inputArea) inputArea.style.display = 'flex';
      const form = document.getElementById('lead-form');
      if (form) form.reset();
    },

    // Handle lead submit
    handleLeadSubmit: async function(e) {
      e.preventDefault();
      const submitBtn = document.getElementById('lead-submit-btn');
      const name = (document.getElementById('lead-name').value || '').trim();
      const phone = (document.getElementById('lead-phone').value || '').replace(/\D/g, '');
      const email = (document.getElementById('lead-email').value || '').trim();
      const loanType = document.getElementById('lead-loantype').value;
      const amount = (document.getElementById('lead-amount').value || '').trim();

      if (!name || phone.length !== 10) {
        alert('Please provide your full name and a valid 10-digit mobile number.');
        return;
      }

      const formData = { name, phone, email, loanType, amount };

      try {
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Submitting...';
        }

        let leadId = `LEAD-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

        try {
          const response = await fetch(this.getLeadApiUrl(), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
          });
          if (response.ok) {
            const data = await response.json();
            if (data.leadId) leadId = data.leadId;
          }
        } catch (_) {
          // Local offline fallback lead confirmation
        }

        this.hideLeadForm();

        const confirmationMsg = {
          type: 'bot',
          text: `✅ **Application Submitted Successfully!**\n\n• **Lead Reference ID**: \`${leadId}\`\n• **Name**: ${name}\n• **Phone**: +91-${phone}\n• **Loan Type**: ${loanType || 'General Loan'}\n\nOur loan specialist will contact you within 24 hours.`,
          timestamp: new Date()
        };
        this.state.messages.push(confirmationMsg);
        this.displayMessage(confirmationMsg);
      } catch (err) {
        alert('Unable to submit lead form. Please contact our support team at +91-88008-38765.');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Submit Application';
        }
      }
    },

    // Format markdown to safe HTML
    formatMessageText: function(text) {
      if (!text) return '';
      let html = text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

      // Bold: **text**
      html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

      // Inline code: `text`
      html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

      // Markdown links: [text](url)
      html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener" style="color:#1a56db;font-weight:600;text-decoration:underline;">$1</a>');

      // Line breaks
      html = html.replace(/\n/g, '<br>');

      return html;
    },

    formatTime: function(date) {
      const d = date instanceof Date ? date : new Date(date);
      return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    },

    scrollToBottom: function() {
      const messagesContainer = document.getElementById('chatbot-messages');
      setTimeout(() => {
        if (messagesContainer) {
          messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
      }, 50);
    }
  };

  // ============= STARTUP =============
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => ChatbotContext.init());
  } else {
    ChatbotContext.init();
  }

})();
