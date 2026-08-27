// ============================================================
// Easy Loan Services — Loan Eligibility Checker
// ============================================================

(function () {
  'use strict';

  function checkEligibility() {
    const age          = parseInt(document.getElementById('eligAge')?.value || 0);
    const salary       = parseFloat(document.getElementById('eligSalary')?.value || 0);
    const employment   = document.getElementById('eligEmployment')?.value || '';
    const existingEMI  = parseFloat(document.getElementById('eligExistingEMI')?.value || 0);
    const loanAmount   = parseFloat(document.getElementById('eligLoanAmount')?.value || 0);
    const resultDiv    = document.getElementById('eligibilityResult');

    if (!resultDiv) return;
    if (!age || !salary || !employment || !loanAmount) {
      resultDiv.innerHTML = `
        <div class="eligibility-icon">⚠️</div>
        <h5 style="color:#92400e">Please fill all fields</h5>
        <p style="color:#78350f;font-size:.88rem">Enter all required information to check your eligibility.</p>
      `;
      resultDiv.className = 'eligibility-result';
      return;
    }

    // Eligibility Rules
    let issues = [];
    let multiplier = 1;
    let maxLoan = 0;

    // Age check
    if (age < 21 || age > 65) {
      issues.push('Age should be between 21 and 65 years.');
    }

    // FOIR (Fixed Obligation to Income Ratio) — max 50%
    const foir = existingEMI / salary;
    const availableIncome = salary - existingEMI;
    const maxEMICapacity = salary * 0.5 - existingEMI;

    if (maxEMICapacity <= 0) {
      issues.push('Existing EMI exceeds 50% of income.');
    }

    // Minimum salary
    if (employment === 'salaried' && salary < 15000) {
      issues.push('Minimum salary of ₹15,000 required for salaried applicants.');
    }
    if (employment === 'self-employed' && salary < 25000) {
      issues.push('Minimum monthly income of ₹25,000 required for self-employed applicants.');
    }

    // Employment multiplier
    const empMultiplier = { 'salaried': 1.0, 'self-employed': 0.85, 'business': 0.9, 'professional': 0.95, 'retired': 0.7 };
    multiplier = empMultiplier[employment] || 0.85;

    // Max loan calculation: EMI capacity / monthly rate * factor
    // Assuming 10.5% interest, 5 year tenure for estimation
    const r = 10.5 / 12 / 100;
    const n = 60;
    const factor = (Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n));
    maxLoan = Math.round(maxEMICapacity * factor * multiplier / 100) * 100;
    if (maxLoan < 0) maxLoan = 0;

    // Age-based reduction
    if (age > 55) maxLoan = Math.round(maxLoan * 0.8);

    const isEligible = issues.length === 0 && maxLoan >= loanAmount * 0.5;
    const canProvide = maxLoan >= loanAmount;

    let html = '';
    let className = 'eligibility-result';

    if (!isEligible || maxLoan < 10000) {
      className += ' not-eligible';
      html = `
        <div class="eligibility-icon">❌</div>
        <h4 style="color:#dc2626;font-family:'Poppins',sans-serif;font-weight:700;">Not Currently Eligible</h4>
        <p style="color:#7f1d1d;font-size:.9rem;margin:12px 0 20px;">Based on your information, you may not qualify at this time.</p>
        <div style="background:rgba(239,68,68,.08);border:1px solid rgba(239,68,68,.2);border-radius:12px;padding:16px;text-align:left;margin-bottom:16px;">
          ${issues.map(i => `<div style="color:#b91c1c;font-size:.85rem;padding:4px 0;display:flex;align-items:center;gap:8px;"><i class="fas fa-times-circle" style="color:#ef4444;"></i>${i}</div>`).join('')}
        </div>
        <p style="font-size:.82rem;color:#9ca3af;">Please consult our loan expert for personalized advice.</p>
        <a href="#contact" class="btn btn-sm mt-2" style="background:var(--gradient-blue);color:white;border-radius:50px;padding:10px 24px;font-weight:600;">Talk to Expert</a>
      `;
    } else if (canProvide) {
      className += ' eligible';
      html = `
        <div class="eligibility-icon">✅</div>
        <h4 style="color:#065f46;font-family:'Poppins',sans-serif;font-weight:700;">Congratulations! You're Eligible</h4>
        <p style="color:#047857;font-size:.9rem;margin:12px 0;">You qualify for a loan of up to:</p>
        <div class="eligibility-amount">₹${maxLoan.toLocaleString('en-IN')}</div>
        <p style="font-size:.8rem;color:#6b7280;margin-top:8px;">(Estimated based on your profile)</p>
        <div style="background:rgba(16,185,129,.08);border:1px solid rgba(16,185,129,.25);border-radius:12px;padding:16px;text-align:left;margin:20px 0;">
          <div style="color:#065f46;font-size:.85rem;padding:4px 0;"><i class="fas fa-check-circle" style="color:#10b981;margin-right:8px;"></i>Age criteria: Met</div>
          <div style="color:#065f46;font-size:.85rem;padding:4px 0;"><i class="fas fa-check-circle" style="color:#10b981;margin-right:8px;"></i>Income criteria: Met</div>
          <div style="color:#065f46;font-size:.85rem;padding:4px 0;"><i class="fas fa-check-circle" style="color:#10b981;margin-right:8px;"></i>FOIR (${(foir*100).toFixed(0)}%): Within limits</div>
        </div>
        <a href="#contact" class="btn mt-2" style="background:var(--gradient-green);color:white;border-radius:50px;padding:12px 32px;font-weight:700;border:none;">Apply Now →</a>
      `;
    } else {
      className += ' eligible';
      html = `
        <div class="eligibility-icon">🟡</div>
        <h4 style="color:#92400e;font-family:'Poppins',sans-serif;font-weight:700;">Partially Eligible</h4>
        <p style="color:#78350f;font-size:.9rem;margin:12px 0;">Based on your profile, you qualify for:</p>
        <div class="eligibility-amount" style="color:#d97706;">₹${maxLoan.toLocaleString('en-IN')}</div>
        <p style="font-size:.85rem;color:#6b7280;margin-top:8px;">You requested ₹${loanAmount.toLocaleString('en-IN')}. We can offer ₹${maxLoan.toLocaleString('en-IN')}.</p>
        <p style="font-size:.8rem;color:#9ca3af;margin-top:12px;">Speak to our advisor for options to increase your eligibility.</p>
        <a href="#contact" class="btn mt-2" style="background:var(--gradient-blue);color:white;border-radius:50px;padding:12px 32px;font-weight:700;border:none;">Talk to Expert</a>
      `;
    }

    resultDiv.className = className;
    resultDiv.innerHTML = html;

    // Re-init AOS for result
    resultDiv.style.animation = 'none';
    requestAnimationFrame(() => {
      resultDiv.style.animation = 'fadeInUp 0.5s ease both';
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const checkBtn = document.getElementById('checkEligibilityBtn');
    if (checkBtn) checkBtn.addEventListener('click', checkEligibility);

    const eligForm = document.getElementById('eligibilityForm');
    if (eligForm) {
      eligForm.addEventListener('submit', function(e) {
        e.preventDefault();
        checkEligibility();
      });
    }
  });

})();
