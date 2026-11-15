/* =============================================
   PORTFOLIO JAVASCRIPT - Yash Singh Rawat
   ============================================= */

// -----------------------------------------------
// LOADER
// -----------------------------------------------
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
  }, 2000);
});

// -----------------------------------------------
// CURSOR
// -----------------------------------------------
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

if (cursor && cursorFollower && window.matchMedia('(pointer: fine)').matches) {
  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  document.querySelectorAll('a, button, .project-card, .service-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('expand'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('expand'));
  });
}

// -----------------------------------------------
// NAVIGATION SCROLL
// -----------------------------------------------
const nav = document.getElementById('main-nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav?.classList.add('scrolled');
  } else {
    nav?.classList.remove('scrolled');
  }
  updateActiveNavLink();
});

function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active-nav');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active-nav');
    }
  });
}

// -----------------------------------------------
// MOBILE MENU
// -----------------------------------------------
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const menuOverlay = document.getElementById('menu-overlay');
const closeMenuBtn = document.getElementById('close-menu');

function openMenu() {
  mobileMenu?.classList.add('open');
  menuOverlay?.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  mobileMenu?.classList.remove('open');
  menuOverlay?.classList.remove('show');
  document.body.style.overflow = '';
}

hamburger?.addEventListener('click', openMenu);
closeMenuBtn?.addEventListener('click', closeMenu);
menuOverlay?.addEventListener('click', closeMenu);

document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// -----------------------------------------------
// SMOOTH SCROLL
// -----------------------------------------------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// -----------------------------------------------
// PARTICLES CANVAS
// -----------------------------------------------
const canvas = document.getElementById('particles-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationId;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.radius = Math.random() * 1.5 + 0.5;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.color = Math.random() > 0.6 ? '#00d4aa' : '#ccd6f6';
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.opacity;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  function initParticles() {
    const count = Math.min(80, Math.floor(canvas.width * canvas.height / 15000));
    particles = Array.from({ length: count }, () => new Particle());
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = '#00d4aa';
          ctx.globalAlpha = (1 - dist / 120) * 0.1;
          ctx.lineWidth = 0.5;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    animationId = requestAnimationFrame(animateParticles);
  }

  initParticles();
  animateParticles();
}

// -----------------------------------------------
// TYPED TEXT
// -----------------------------------------------
const typedEl = document.querySelector('.typed-text');
if (typedEl) {
  const phrases = [
    'IB Back Office Analyst',
    'Trade Settlement Associate',
    'Finance Operations Specialist',
    'Reconciliation Analyst',
    'MIS & Reporting Analyst',
    'M.Com Finance Graduate'
  ];
  let currentPhrase = 0;
  let currentChar = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function typeWriter() {
    const phrase = phrases[currentPhrase];
    if (isDeleting) {
      typedEl.textContent = phrase.substring(0, currentChar - 1);
      currentChar--;
      typingSpeed = 50;
    } else {
      typedEl.textContent = phrase.substring(0, currentChar + 1);
      currentChar++;
      typingSpeed = 90;
    }

    if (!isDeleting && currentChar === phrase.length) {
      typingSpeed = 2200;
      isDeleting = true;
    } else if (isDeleting && currentChar === 0) {
      isDeleting = false;
      currentPhrase = (currentPhrase + 1) % phrases.length;
      typingSpeed = 400;
    }

    setTimeout(typeWriter, typingSpeed);
  }

  setTimeout(typeWriter, 1500);
}

// -----------------------------------------------
// COUNTER ANIMATION
// -----------------------------------------------
function animateCounter(el, target, duration = 1800) {
  const suffix = el.getAttribute('data-suffix') || '';
  const prefix = el.getAttribute('data-prefix') || '';
  let start = 0;
  const increment = target / (duration / 16);

  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      start = target;
      clearInterval(timer);
    }
    el.textContent = prefix + Math.floor(start) + suffix;
  }, 16);
}

// -----------------------------------------------
// SCROLL REVEAL - Intersection Observer
// -----------------------------------------------
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);

      // Animate counters when visible
      const counters = entry.target.querySelectorAll('.count-up');
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        if (!isNaN(target)) animateCounter(counter, target);
      });
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .timeline-item').forEach(el => {
  revealObserver.observe(el);
});

// -----------------------------------------------
// SKILL BARS
// -----------------------------------------------
const skillBarObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fills = entry.target.querySelectorAll('.skill-bar-fill');
      fills.forEach(fill => {
        const width = fill.getAttribute('data-width');
        setTimeout(() => {
          fill.style.width = width + '%';
        }, 200);
      });
      skillBarObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const skillsSection = document.getElementById('skills');
if (skillsSection) skillBarObserver.observe(skillsSection);

// -----------------------------------------------
// PROJECT FILTER
// -----------------------------------------------
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    projectCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      if (filter === 'all' || cardCategory === filter) {
        card.style.display = 'block';
        card.style.animation = 'fadeInUp 0.4s ease forwards';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// -----------------------------------------------
// CONTACT FORM — mailto fallback (always works)
// -----------------------------------------------
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const btn = this.querySelector('[type="submit"]');
    const originalHTML = btn.innerHTML;

    const fname   = this.querySelector('#fname').value.trim();
    const lname   = this.querySelector('#lname').value.trim();
    const email   = this.querySelector('#email').value.trim();
    const phone   = this.querySelector('#phone').value.trim();
    const purpose = this.querySelector('#service').value;
    const message = this.querySelector('#message').value.trim();

    if (!email || !fname || !message) return;

    // Build a mailto link so the message lands in your inbox
    const subject = encodeURIComponent('Portfolio Message from ' + fname + ' ' + lname);
    const body = encodeURIComponent(
      'Name: ' + fname + ' ' + lname + '\n' +
      'Email: ' + email + '\n' +
      'Phone: ' + (phone || 'Not provided') + '\n' +
      'Purpose: ' + (purpose || 'Not specified') + '\n\n' +
      'Message:\n' + message
    );

    // Open their mail app pre-filled and addressed to you
    window.location.href = 'mailto:yashsingh2542@gmail.com?subject=' + subject + '&body=' + body;

    // Show success immediately
    btn.innerHTML = '✅ Message Sent!';
    btn.style.background = 'linear-gradient(135deg, #00d4aa, #0099cc)';
    btn.disabled = true;
    contactForm.reset();

    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.disabled = false;
      btn.style.background = '';
    }, 5000);
  });
}

// -----------------------------------------------
// TILT EFFECT ON CARDS
// -----------------------------------------------
function addTilt(selector) {
  document.querySelectorAll(selector).forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
  });
}

addTilt('.service-card');
addTilt('.cert-card');

// -----------------------------------------------
// GLITCH EFFECT ON HERO NAME
// -----------------------------------------------
const glitchEl = document.querySelector('.glitch');
if (glitchEl) {
  setInterval(() => {
    glitchEl.classList.add('glitching');
    setTimeout(() => glitchEl.classList.remove('glitching'), 200);
  }, 4000);
}

// -----------------------------------------------
// PROGRESS INDICATOR
// -----------------------------------------------
const progressBar = document.getElementById('progress-bar');
if (progressBar) {
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = progress + '%';
  });
}

// -----------------------------------------------
// NUMBERS IN HERO STATS - trigger when in view
// -----------------------------------------------
const heroStatsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.count-up').forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        if (!isNaN(target)) animateCounter(counter, target);
      });
      heroStatsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) heroStatsObserver.observe(heroStats);
