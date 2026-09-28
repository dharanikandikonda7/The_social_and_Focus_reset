/* ==========================================================================
   Interactive JS Application Logic for The Social & Focus Reset
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Countdown Timers
  initCountdownTimer();
  
  // Initialize FAQ Accordions
  initFAQ();
  
  // Initialize Payment Modal
  initPaymentModal();
  
  // Initialize ROI Calculator
  initCalculator();

  // Initialize Sample Chapter Modal
  initSampleModal();
  
  // Initialize Sticky Bar Scroll Listener
  initStickyBar();
  
  // Initialize Thank You Page features if on thank-you.html
  initThankYouPage();
});

/* --------------------------------------------------------------------------
   1. Countdown Urgency Timer
   -------------------------------------------------------------------------- */
function initCountdownTimer() {
  const timerElements = document.querySelectorAll('.countdown-timer');
  if (!timerElements.length) return;

  // Set 15 minutes from now, store in localStorage for consistency
  let targetTime = localStorage.getItem('sfr_offer_timer');
  if (!targetTime || new Date().getTime() > parseInt(targetTime)) {
    targetTime = new Date().getTime() + 15 * 60 * 1000; // 15 mins
    localStorage.setItem('sfr_offer_timer', targetTime);
  }

  function updateTimer() {
    const now = new Date().getTime();
    const distance = parseInt(targetTime) - now;

    if (distance < 0) {
      // Reset timer
      targetTime = new Date().getTime() + 15 * 60 * 1000;
      localStorage.setItem('sfr_offer_timer', targetTime);
    }

    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    timerElements.forEach(el => {
      el.textContent = formattedTime;
    });
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

/* --------------------------------------------------------------------------
   2. FAQ Accordion Handler
   -------------------------------------------------------------------------- */
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all other items
      faqItems.forEach(i => i.classList.remove('active'));
      
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   3. Payment Gateway & Redirection Modal
   -------------------------------------------------------------------------- */
function initPaymentModal() {
  const modalOverlay = document.getElementById('paymentModal');
  const openBtns = document.querySelectorAll('.trigger-buy-btn');
  const closeBtn = document.getElementById('closeModalBtn');
  const payForm = document.getElementById('paymentForm');
  const payOptions = document.querySelectorAll('.pay-option');
  const formState = document.getElementById('formState');
  const processingState = document.getElementById('processingState');

  if (!modalOverlay) return;

  // Open Modal
  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close Modal
  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  // Payment option selector
  payOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      payOptions.forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
    });
  });

  // Handle Payment Submit
  if (payForm) {
    payForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const userName = document.getElementById('custName').value.trim() || 'Valued Reader';
      const userEmail = document.getElementById('custEmail').value.trim() || 'customer@example.com';
      
      // Switch to processing animation
      formState.style.display = 'none';
      processingState.style.display = 'flex';
      
      // Simulate Razorpay/UPI Payment Gateway API confirmation & Redirection
      setTimeout(() => {
        // Redirection to custom thank you page url with params
        const redirectUrl = `thank-you.html?name=${encodeURIComponent(userName)}&email=${encodeURIComponent(userEmail)}&orderId=SFR-${Math.floor(100000 + Math.random() * 900000)}`;
        window.location.href = redirectUrl;
      }, 2200);
    });
  }
}

/* --------------------------------------------------------------------------
   4. Screen Time & ROI Savings Calculator
   -------------------------------------------------------------------------- */
function initCalculator() {
  const slider = document.getElementById('screenTimeSlider');
  const hoursValDisplay = document.getElementById('screenTimeVal');
  const yearlyHoursDisplay = document.getElementById('yearlyHoursSaved');
  const daysSavedDisplay = document.getElementById('daysSavedPerYear');
  
  if (!slider) return;

  function calculate() {
    const hoursPerDay = parseFloat(slider.value);
    hoursValDisplay.textContent = `${hoursPerDay} Hrs/Day`;
    
    // Estimate 50% reduction in wasted time via 7-Day Reset
    const hoursSavedDaily = hoursPerDay * 0.5;
    const yearlyHours = Math.round(hoursSavedDaily * 365);
    const fullDaysSaved = (yearlyHours / 24).toFixed(1);
    
    yearlyHoursDisplay.textContent = `${yearlyHours} Hours`;
    daysSavedDisplay.textContent = `~${fullDaysSaved} Full Days of Life Reclaimed`;
  }

  slider.addEventListener('input', calculate);
  calculate();
}

/* --------------------------------------------------------------------------
   5. Sample Chapter Preview Modal
   -------------------------------------------------------------------------- */
function initSampleModal() {
  const sampleModal = document.getElementById('sampleModal');
  const openSampleBtns = document.querySelectorAll('.trigger-sample-btn');
  const closeSampleBtn = document.getElementById('closeSampleBtn');

  if (!sampleModal) return;

  openSampleBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      sampleModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  if (closeSampleBtn) {
    closeSampleBtn.addEventListener('click', () => {
      sampleModal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }
}

/* --------------------------------------------------------------------------
   6. Sticky Bottom Purchase Bar
   -------------------------------------------------------------------------- */
function initStickyBar() {
  const stickyBar = document.getElementById('stickyBar');
  const heroCta = document.querySelector('.hero-cta-group');
  
  if (!stickyBar || !heroCta) return;

  window.addEventListener('scroll', () => {
    const heroRect = heroCta.getBoundingClientRect();
    if (heroRect.bottom < 0) {
      stickyBar.classList.add('visible');
    } else {
      stickyBar.classList.remove('visible');
    }
  });
}

/* --------------------------------------------------------------------------
   7. Thank You Page Logic & Particle Confetti
   -------------------------------------------------------------------------- */
function initThankYouPage() {
  const thankYouContainer = document.getElementById('thankYouPageContainer');
  if (!thankYouContainer) return;

  // Extract Name & Email from Query Parameters
  const urlParams = new URLSearchParams(window.location.search);
  const name = urlParams.get('name') || 'Friend';
  const email = urlParams.get('email') || 'your email';
  const orderId = urlParams.get('orderId') || `SFR-${Math.floor(100000 + Math.random() * 900000)}`;

  const nameEl = document.getElementById('custNameDisplay');
  const emailEl = document.getElementById('custEmailDisplay');
  const orderIdEl = document.getElementById('orderIdDisplay');

  if (nameEl) nameEl.textContent = name;
  if (emailEl) emailEl.textContent = email;
  if (orderIdEl) orderIdEl.textContent = orderId;

  // Trigger celebration confetti
  launchConfetti();
}

function launchConfetti() {
  const canvas = document.getElementById('confettiCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const pieces = [];
  const numberOfPieces = 80;
  const colors = ['#f59e0b', '#10b981', '#38bdf8', '#ef4444', '#a855f7'];

  for (let i = 0; i < numberOfPieces; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      rotation: Math.random() * 360,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedY: Math.random() * 3 + 2,
      speedX: Math.random() * 2 - 1,
      spin: Math.random() * 6 - 3
    });
  }

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    pieces.forEach(p => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();

      p.y += p.speedY;
      p.x += p.speedX;
      p.rotation += p.spin;

      if (p.y > canvas.height) {
        p.y = -20;
        p.x = Math.random() * canvas.width;
      }
    });

    requestAnimationFrame(render);
  }

  render();
}
