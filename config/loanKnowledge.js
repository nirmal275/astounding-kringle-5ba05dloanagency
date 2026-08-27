/**
 * Loan Knowledge Base & Response Engine
 * Contains loan-specific information and intelligent response generation for Easy Loan Services
 */

const loanKnowledge = {
  // Company Information
  company: {
    name: "Easy Loan Services",
    tagline: "Your Trusted Loan Partner in India",
    phone: "+91-88008-38765",
    phoneRaw: "+918800838765",
    email: "support@easyloanservices.in",
    hours: "Monday to Saturday, 9:00 AM - 6:00 PM IST",
    whatsapp: "https://wa.me/918800838765?text=Hi%2C%20I%20need%20help%20with%20a%20loan%20application"
  },

  // Loan Types and Details
  loanTypes: {
    personal: {
      name: "Personal Loan",
      description: "Unsecured multi-purpose loan for travel, medical emergencies, wedding, or home renovation with instant approval.",
      minAmount: "₹10,000",
      maxAmount: "₹50 Lakhs",
      minRate: "10.5%",
      maxRate: "18% p.a.",
      tenure: "12 to 60 Months",
      documents: ["Aadhaar Card", "PAN Card", "3 Months Salary Slips", "6 Months Bank Statements"],
      eligibility: "Age 21-60 years, minimum monthly salary ₹15,000, CIBIL score 700+."
    },
    home: {
      name: "Home Loan",
      description: "Affordable secured loan for purchasing a new house, flat, plot, or home construction/renovation.",
      minAmount: "₹5 Lakhs",
      maxAmount: "₹5 Crores",
      minRate: "8.4%",
      maxRate: "12% p.a.",
      tenure: "5 to 30 Years",
      documents: ["Aadhaar & PAN", "2 Years ITR / Form 16", "6 Months Bank Statements", "Property Title & Valuation Papers"],
      eligibility: "Age 21-70 years, annual income ₹3 Lakhs+, CIBIL score 650+."
    },
    business: {
      name: "Business Loan",
      description: "Collateral-free and secured loans for business expansion, working capital, machinery, and inventory.",
      minAmount: "₹50,000",
      maxAmount: "₹5 Crores",
      minRate: "12%",
      maxRate: "18% p.a.",
      tenure: "24 to 60 Months",
      documents: ["Business Registration / GST", "3 Years ITR & Audited P&L", "12 Months Bank Statements", "PAN & Aadhaar"],
      eligibility: "Business operational for 1+ year, annual turnover ₹5 Lakhs+, CIBIL 650+."
    },
    car: {
      name: "Car Loan / Vehicle Loan",
      description: "Attractive financing for new and used cars with up to 100% on-road funding options.",
      minAmount: "₹2 Lakhs",
      maxAmount: "₹1 Crore",
      minRate: "9%",
      maxRate: "15% p.a.",
      tenure: "12 to 84 Months",
      documents: ["Aadhaar & PAN", "Salary Slips / ITR", "Bank Statements", "Driving License", "Vehicle Quotation"],
      eligibility: "Age 21-65 years, monthly income ₹20,000+, CIBIL 700+."
    },
    gold: {
      name: "Gold Loan",
      description: "Instant disbursement against gold jewelry with minimal paperwork and secure vault storage.",
      minAmount: "₹10,000",
      maxAmount: "₹25 Lakhs",
      minRate: "10%",
      maxRate: "14% p.a.",
      tenure: "12 to 36 Months",
      documents: ["Aadhaar Card", "PAN Card", "Gold Purity & Weight Verification at branch"],
      eligibility: "Age 21-75 years, gold purity 18K-24K, min weight 5 grams. Instant same-day sanction."
    },
    education: {
      name: "Education Loan",
      description: "Low-interest loans for higher education in India and premier universities abroad.",
      minAmount: "₹1 Lakh",
      maxAmount: "₹1 Crore",
      minRate: "8%",
      maxRate: "12% p.a.",
      tenure: "12 to 120 Months (with moratorium period)",
      documents: ["Admission Letter & Fee Structure", "Academic Records", "KYC & Income Proof of Co-Applicant (Parent/Guardian)"],
      eligibility: "Secured admission in recognized institution in India or overseas."
    }
  },

  // General FAQs
  faqs: {
    emi: "EMI (Equated Monthly Installment) is the fixed payment amount made by a borrower to a lender at a specified date each calendar month. Formula: EMI = [P × R × (1+R)^N] / [(1+R)^N - 1]. You can calculate your exact EMI anytime on our website's EMI Calculator!",
    processingTime: "Loan approval typically takes 24 to 48 hours. Once verified, funds are disbursed directly into your bank account within 1-3 business days.",
    cibil: "A CIBIL / Credit score of 700+ gives you the lowest interest rates and quickest approvals. We also process applications with scores between 650-699.",
    documents: "Basic documents required for most loans include: 1) Aadhaar & PAN Card, 2) Recent 3-6 months bank statements, 3) Income proof (Salary slips for salaried or 2-3 yrs ITR for self-employed).",
    applyProcess: "Applying is quick and simple in 4 steps:\n1. Fill out our online application form or chatbot lead form.\n2. Submit basic KYC and income documents.\n3. Quick verification and approval within 24-48 hours.\n4. Loan disbursement directly into your bank account."
  }
};

/**
 * Intelligent pattern-matching response generator
 * Generates rich, contextual responses for chatbot when offline or as AI fallback
 */
function getLoanAssistantResponse(inputMessage) {
  if (!inputMessage || typeof inputMessage !== 'string') {
    return "Hello! 👋 I'm your Loan Assistant. How can I help you today? You can ask about loan types, interest rates, eligibility criteria, EMI calculations, or how to apply.";
  }

  const query = inputMessage.toLowerCase().trim();

  // 1. Greetings
  if (/^(hi|hello|hey|hola|namaste|good morning|good afternoon|good evening|start|help)\b/i.test(query)) {
    return "Hello! 👋 Welcome to **Easy Loan Services**! I am your AI Loan Assistant.\n\nI can help you with:\n• 💰 **Loan Types & Rates** (Personal, Home, Business, Car, Gold, Education)\n• 📊 **EMI Calculation & Formulas**\n• ✓ **Eligibility & Required Documents**\n• 📝 **Applying Online for Fast Approval**\n\nHow can I assist you today?";
  }

  // 2. What loan types do you offer? / Loan Types
  if (/loan\s*types?|types of loan|which loans|what loans|all loans|loans available|what do you offer/i.test(query)) {
    return "We offer 6 flexible loan products tailored to your needs:\n\n" +
      "1. 👤 **Personal Loan**: ₹10K – ₹50 Lakhs (Interest from 10.5% p.a.)\n" +
      "2. 🏠 **Home Loan**: ₹5 Lakhs – ₹5 Crores (Interest from 8.4% p.a.)\n" +
      "3. 💼 **Business Loan**: ₹50K – ₹5 Crores (Interest from 12% p.a.)\n" +
      "4. 🚗 **Car Loan**: ₹2 Lakhs – ₹1 Crore (Interest from 9% p.a.)\n" +
      "5. 🪙 **Gold Loan**: ₹10K – ₹25 Lakhs (Interest from 10% p.a., Instant approval)\n" +
      "6. 🎓 **Education Loan**: ₹1 Lakh – ₹1 Crore (Interest from 8% p.a.)\n\n" +
      "Would you like more details on any specific loan or wish to check your eligibility?";
  }

  // 3. What is EMI? / EMI calculations
  if (/\bemi\b|monthly installment|calculate emi|how is emi calculated|emi information|emi formula/i.test(query)) {
    return "📊 **What is EMI?**\n" +
      "EMI stands for **Equated Monthly Installment**. It is the fixed amount you pay back to the lender each month until the loan is fully repaid.\n\n" +
      "📐 **EMI Formula**: `EMI = [P × R × (1+R)^N] / [(1+R)^N - 1]`\n" +
      "• **P** = Principal Loan Amount\n" +
      "• **R** = Monthly Interest Rate (Annual Rate ÷ 12 ÷ 100)\n" +
      "• **N** = Tenure in Months\n\n" +
      "💡 You can use our interactive **EMI Calculator** on our website to see your exact monthly payout and amortization schedule!";
  }

  // 4. How can I apply for a loan? / Application process
  if (/how to apply|how can i apply|apply for (a )?loan|application process|where to apply|want to apply|process of applying/i.test(query)) {
    return "📝 **How to Apply for a Loan in 4 Easy Steps:**\n\n" +
      "1️⃣ **Submit Details**: Click 'Apply Now' on our site or use the chat lead form with your basic contact info.\n" +
      "2️⃣ **Eligibility Check**: Our specialists assess your profile and match you with the best rates.\n" +
      "3️⃣ **Document Verification**: Upload Aadhaar, PAN, and bank statements online.\n" +
      "4️⃣ **Instant Disbursement**: Once approved, funds are credited directly to your bank account within 24-48 hours!\n\n" +
      "👉 Would you like to start your application right now?";
  }

  // 5. Loan Eligibility / Criteria
  if (/eligib|who can apply|am i eligible|minimum salary|age limit|qualification/i.test(query)) {
    return "✓ **General Loan Eligibility Criteria:**\n\n" +
      "• **Age**: 21 to 65 years\n" +
      "• **Employment**: Salaried (min. ₹15,000/month) or Self-Employed / Business owner\n" +
      "• **CIBIL / Credit Score**: 650+ (700+ preferred for best interest rates)\n" +
      "• **Nationality**: Indian Citizen\n" +
      "• **Work Experience**: Minimum 6 months in current job or 1 year in business\n\n" +
      "Would you like to check eligibility for a specific loan type?";
  }

  // 6. Documents Required
  if (/document|paperwork|what proofs|aadhaar|pan card|itr|salary slip/i.test(query)) {
    return "📄 **Required Documents:**\n\n" +
      "1. **Identity Proof**: Aadhaar Card, PAN Card, Passport, or Voter ID\n" +
      "2. **Address Proof**: Utility Bill, Rent Agreement, or Aadhaar\n" +
      "3. **Income Proof**:\n" +
      "   • *Salaried*: Last 3 months salary slips + 6 months bank statements\n" +
      "   • *Self-Employed*: Last 2-3 years ITR with computation + 12 months bank statements\n" +
      "4. **Passport Size Photographs**\n\n" +
      "Property/Collateral documents are required only for Home or Gold loans.";
  }

  // 7. Personal Loan specific
  if (/personal loan/i.test(query)) {
    const pl = loanKnowledge.loanTypes.personal;
    return `👤 **${pl.name} Overview:**\n• **Amount**: ${pl.minAmount} to ${pl.maxAmount}\n• **Interest Rate**: Starting at ${pl.minRate}\n• **Tenure**: ${pl.tenure}\n• **Key Benefits**: No collateral required, quick 24hr disbursal, flexible end-use.\n• **Documents**: ${pl.documents.join(', ')}.`;
  }

  // 8. Home Loan specific
  if (/home loan|house loan|property loan/i.test(query)) {
    const hl = loanKnowledge.loanTypes.home;
    return `🏠 **${hl.name} Overview:**\n• **Amount**: ${hl.minAmount} to ${hl.maxAmount}\n• **Interest Rate**: Starting at ${hl.minRate}\n• **Tenure**: ${hl.tenure}\n• **Key Benefits**: Low interest rates, tax benefits under Sec 80C & 24b, high loan amounts.\n• **Eligibility**: ${hl.eligibility}`;
  }

  // 9. Business Loan specific
  if (/business loan|commercial loan|msme|working capital/i.test(query)) {
    const bl = loanKnowledge.loanTypes.business;
    return `💼 **${bl.name} Overview:**\n• **Amount**: ${bl.minAmount} to ${bl.maxAmount}\n• **Interest Rate**: Starting at ${bl.minRate}\n• **Tenure**: ${bl.tenure}\n• **Key Benefits**: Working capital & expansion funding with minimal documentation.\n• **Eligibility**: ${bl.eligibility}`;
  }

  // 10. Car Loan specific
  if (/car loan|vehicle loan|auto loan/i.test(query)) {
    const cl = loanKnowledge.loanTypes.car;
    return `🚗 **${cl.name} Overview:**\n• **Amount**: ${cl.minAmount} to ${cl.maxAmount}\n• **Interest Rate**: Starting at ${cl.minRate}\n• **Tenure**: ${cl.tenure}\n• **Key Benefits**: Up to 100% on-road financing for new & used cars with quick processing.`;
  }

  // 11. Gold Loan specific
  if (/gold loan/i.test(query)) {
    const gl = loanKnowledge.loanTypes.gold;
    return `🪙 **${gl.name} Overview:**\n• **Amount**: ${gl.minAmount} to ${gl.maxAmount}\n• **Interest Rate**: Starting at ${gl.minRate}\n• **Tenure**: ${gl.tenure}\n• **Key Benefits**: Instant disbursement in 30 minutes, minimal documents, high loan-to-value ratio.`;
  }

  // 12. Education Loan specific
  if (/education loan|study loan|student loan/i.test(query)) {
    const el = loanKnowledge.loanTypes.education;
    return `🎓 **${el.name} Overview:**\n• **Amount**: ${el.minAmount} to ${el.maxAmount}\n• **Interest Rate**: Starting at ${el.minRate}\n• **Tenure**: ${el.tenure}\n• **Key Benefits**: Covers 100% tuition & living expenses in India & abroad, with repayment starting after course completion.`;
  }

  // 13. Interest Rate queries
  if (/interest rate|rate of interest|roi|charges|percentage/i.test(query)) {
    return "📈 **Our Current Starting Interest Rates:**\n\n" +
      "• 🏠 Home Loan: **8.4% – 12% p.a.**\n" +
      "• 🎓 Education Loan: **8% – 12% p.a.**\n" +
      "• 🚗 Car Loan: **9% – 15% p.a.**\n" +
      "• 🪙 Gold Loan: **10% – 14% p.a.**\n" +
      "• 👤 Personal Loan: **10.5% – 18% p.a.**\n" +
      "• 💼 Business Loan: **12% – 18% p.a.**\n\n" +
      "*Note: Final interest rate depends on credit score, income profile, and loan tenure.*";
  }

  // 14. CIBIL / Credit Score
  if (/cibil|credit score|experian|low cibil|bad credit/i.test(query)) {
    return "📊 **CIBIL Score Information:**\n\n" +
      "• **750+**: Excellent – Guaranteed lowest interest rates & highest loan amounts.\n" +
      "• **700 – 749**: Good – Eligible for most loans with fast approval.\n" +
      "• **650 – 699**: Fair – Eligible with additional income verification or co-applicant.\n" +
      "• **Below 650**: Gold loans or secured loans are recommended to rebuild credit score.";
  }

  // 15. Contact / Support / Phone / WhatsApp
  if (/contact|support|phone|number|call|whatsapp|email|address|branch|office|talk to human|agent/i.test(query)) {
    return "☎️ **Contact Easy Loan Services Support:**\n\n" +
      "• 📞 **Phone**: [+91-88008-38765](tel:+918800838765)\n" +
      "• 💬 **WhatsApp**: [Click to Chat on WhatsApp](https://wa.me/918800838765)\n" +
      "• ✉️ **Email**: support@easyloanservices.in\n" +
      "• ⏰ **Working Hours**: Mon – Sat: 9:00 AM – 6:00 PM IST\n\n" +
      "Our loan specialists are ready to assist you with any questions!";
  }

  // 16. Thanks / Goodbye
  if (/thanks|thank you|ok|okay|bye|goodbye|great/i.test(query)) {
    return "You're very welcome! 😊 If you have any more questions about loans or need assistance with your application, I'm always here to help. Have a great day!";
  }

  // 17. Default Contextual Fallback
  return "I'd be happy to help you with that! 😊\n\n" +
    "Easy Loan Services offers Personal Loans, Home Loans, Business Loans, Car Loans, Gold Loans, and Education Loans with competitive rates starting from 8.4% p.a.\n\n" +
    "You can ask me about:\n" +
    "• Specific loan interest rates & eligibility\n" +
    "• How to calculate your monthly EMI\n" +
    "• Required documents & application steps\n\n" +
    "Or contact our loan advisory team directly at 📞 **+91-88008-38765**.";
}

loanKnowledge.getLoanAssistantResponse = getLoanAssistantResponse;

// Node.js module export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = loanKnowledge;
}

// Browser global export if included directly in <script>
if (typeof window !== 'undefined') {
  window.loanKnowledge = loanKnowledge;
}
