// ============================================================
// Easy Loan Services — EMI Calculator
// ============================================================

(function () {
  'use strict';

  function calculateEMI(principal, annualRate, tenureMonths) {
    if (!principal || !annualRate || !tenureMonths) return { emi: 0, totalPayment: 0, totalInterest: 0 };
    const r = annualRate / 12 / 100;
    const n = tenureMonths;
    if (r === 0) return { emi: principal / n, totalPayment: principal, totalInterest: 0 };
    const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - principal;
    return { emi, totalPayment, totalInterest };
  }

  function formatCurrency(amount) {
    if (amount >= 10000000) return '₹' + (amount / 10000000).toFixed(2) + ' Cr';
    if (amount >= 100000) return '₹' + (amount / 100000).toFixed(2) + ' L';
    return '₹' + amount.toLocaleString('en-IN', { maximumFractionDigits: 0 });
  }

  function updateEMI() {
    const amountEl  = document.getElementById('loanAmount');
    const rateEl    = document.getElementById('interestRate');
    const tenureEl  = document.getElementById('loanTenure');
    const amtDisp   = document.getElementById('loanAmountDisplay');
    const rateDisp  = document.getElementById('interestRateDisplay');
    const tenureDisp= document.getElementById('loanTenureDisplay');
    const emiOut    = document.getElementById('emiResult');
    const totalAmt  = document.getElementById('totalAmount');
    const totalInt  = document.getElementById('totalInterest');
    const principalOut = document.getElementById('principalAmount');

    if (!amountEl || !rateEl || !tenureEl) return;

    const principal = parseFloat(amountEl.value);
    const rate      = parseFloat(rateEl.value);
    const tenure    = parseFloat(tenureEl.value);

    if (amtDisp)    amtDisp.textContent    = formatCurrency(principal);
    if (rateDisp)   rateDisp.textContent   = rate.toFixed(1) + '%';
    if (tenureDisp) tenureDisp.textContent = tenure + ' Yrs';

    const { emi, totalPayment, totalInterest } = calculateEMI(principal, rate, tenure * 12);

    if (emiOut)       emiOut.textContent       = '₹' + Math.round(emi).toLocaleString('en-IN');
    if (totalAmt)     totalAmt.textContent      = formatCurrency(Math.round(totalPayment));
    if (totalInt)     totalInt.textContent      = formatCurrency(Math.round(totalInterest));
    if (principalOut) principalOut.textContent  = formatCurrency(principal);

    // Update donut chart if canvas exists
    updateDonutChart(principal, totalInterest);

    // Update progress bars
    if (totalPayment > 0) {
      const principalPct = (principal / totalPayment * 100).toFixed(1);
      const interestPct  = (totalInterest / totalPayment * 100).toFixed(1);
      const principalBar = document.getElementById('principalBar');
      const interestBar  = document.getElementById('interestBar');
      const principalPctEl = document.getElementById('principalPct');
      const interestPctEl  = document.getElementById('interestPct');
      if (principalBar) principalBar.style.width = principalPct + '%';
      if (interestBar)  interestBar.style.width  = interestPct + '%';
      if (principalPctEl) principalPctEl.textContent = principalPct + '%';
      if (interestPctEl)  interestPctEl.textContent  = interestPct + '%';
    }
  }

  // ---- Donut Chart (pure canvas, no library) ----
  let donutCanvas, donutCtx;

  function updateDonutChart(principal, interest) {
    donutCanvas = donutCanvas || document.getElementById('emiDonut');
    if (!donutCanvas) return;
    donutCtx = donutCtx || donutCanvas.getContext('2d');
    const ctx = donutCtx;
    const W = donutCanvas.width;
    const H = donutCanvas.height;
    const cx = W / 2, cy = H / 2;
    const R = Math.min(W, H) / 2 - 10;
    const r = R * 0.55;
    const total = principal + interest;
    if (total === 0) return;

    ctx.clearRect(0, 0, W, H);

    // Principal arc
    const principalAngle = (principal / total) * 2 * Math.PI;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, R, -Math.PI / 2, -Math.PI / 2 + principalAngle);
    ctx.closePath();
    const g1 = ctx.createLinearGradient(cx - R, cy, cx + R, cy);
    g1.addColorStop(0, '#1a56db');
    g1.addColorStop(1, '#3b82f6');
    ctx.fillStyle = g1;
    ctx.fill();

    // Interest arc
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, R, -Math.PI / 2 + principalAngle, -Math.PI / 2 + 2 * Math.PI);
    ctx.closePath();
    const g2 = ctx.createLinearGradient(cx - R, cy, cx + R, cy);
    g2.addColorStop(0, '#059669');
    g2.addColorStop(1, '#34d399');
    ctx.fillStyle = g2;
    ctx.fill();

    // Donut hole
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, 2 * Math.PI);
    ctx.fillStyle = '#fff';
    ctx.fill();
  }

  function initEMICalculator() {
    const inputs = ['loanAmount', 'interestRate', 'loanTenure'];
    inputs.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('input', updateEMI);
    });
    updateEMI();
  }

  // ---- Amortization Table (full page calculator) ----
  function generateAmortization() {
    const tableBody = document.getElementById('amortizationBody');
    if (!tableBody) return;

    const principal = parseFloat(document.getElementById('loanAmount')?.value || 0);
    const rate      = parseFloat(document.getElementById('interestRate')?.value || 0);
    const tenure    = parseFloat(document.getElementById('loanTenure')?.value || 0);
    if (!principal || !rate || !tenure) return;

    const monthlyRate = rate / 12 / 100;
    const months = tenure * 12;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);

    let balance = principal;
    let html = '';
    const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const startDate = new Date();

    for (let i = 1; i <= months; i++) {
      const interest = balance * monthlyRate;
      const principalPart = emi - interest;
      balance -= principalPart;
      if (balance < 0) balance = 0;

      const date = new Date(startDate);
      date.setMonth(date.getMonth() + i);
      const monthLabel = monthNames[date.getMonth()] + ' ' + date.getFullYear();

      html += `<tr>
        <td>${i}</td>
        <td>${monthLabel}</td>
        <td>₹${Math.round(emi).toLocaleString('en-IN')}</td>
        <td>₹${Math.round(principalPart).toLocaleString('en-IN')}</td>
        <td>₹${Math.round(interest).toLocaleString('en-IN')}</td>
        <td>₹${Math.max(0, Math.round(balance)).toLocaleString('en-IN')}</td>
      </tr>`;
    }
    tableBody.innerHTML = html;
  }

  document.addEventListener('DOMContentLoaded', () => {
    initEMICalculator();
    const genBtn = document.getElementById('generateAmortization');
    if (genBtn) genBtn.addEventListener('click', generateAmortization);
  });

})();
