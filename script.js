// Smooth scroll, mobile nav, form handling, and small UX touches

// Update year in footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Mobile navigation toggle
const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');
if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close nav when clicking a link (mobile)
  siteNav.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      siteNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Smooth scrolling enhancement (native CSS handles most; this ensures offset works for hash links)
function smoothScrollToHash(hash) {
  const target = document.querySelector(hash);
  if (!target) return;
  const headerOffset = document.querySelector('.site-header')?.offsetHeight || 0;
  const elementPosition = target.getBoundingClientRect().top + window.scrollY;
  const offsetPosition = elementPosition - (headerOffset - 1);
  window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const hash = link.getAttribute('href');
    if (!hash || hash === '#') return;
    const url = new URL(link.href);
    if (url.pathname === location.pathname) {
      e.preventDefault();
      history.pushState(null, '', hash);
      smoothScrollToHash(hash);
    }
  });
});

// Hero CTA focus scroll fallback
const cta = document.getElementById('ctaProjects');
if (cta) {
  cta.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') smoothScrollToHash('#projects');
  });
}

// Basic client-side contact form validation and submission
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    const message = form.querySelector('#message');
  const statusEl = form.querySelector('#formStatus');

    let valid = true;

    // Simple validations
    if (!name.value.trim()) {
      valid = false;
      name.nextElementSibling.textContent = 'Please enter your name.';
    } else {
      name.nextElementSibling.textContent = '';
    }

    const emailVal = email.value.trim();
    if (!emailVal || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
      valid = false;
      email.nextElementSibling.textContent = 'Enter a valid email address.';
    } else {
      email.nextElementSibling.textContent = '';
    }

    if (!message.value.trim()) {
      valid = false;
      message.nextElementSibling.textContent = 'Please enter a message.';
    } else {
      message.nextElementSibling.textContent = '';
    }

    if (!valid) return;

    // Show sending state
    if (statusEl) {
      statusEl.textContent = 'Sending…';
      statusEl.style.color = '';
    }

    const payload = {
      name: name.value.trim(),
      email: emailVal,
      message: message.value.trim(),
      page: location.href
    };

    // Spam check: if honeypot has any value, abort silently
    const honey = form.querySelector('#honey');
    if (honey && honey.value) {
      if (statusEl) statusEl.textContent = '';
      return;
    }

  // FormSubmit endpoint
  const ENDPOINT = 'https://formsubmit.co/ajax/hanzlacsi@gmail.com';

    // Submit via FormData for FormSubmit
    const fd = new FormData(form);
    fd.set('_subject', `Portfolio Inquiry from ${payload.name}`);
    fd.set('name', payload.name);
    fd.set('email', payload.email);
    fd.set('message', payload.message);

    const submitViaFetch = ENDPOINT ? fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: fd
    }) : Promise.reject('no-endpoint');

    submitViaFetch
      .then((res) => {
        if (!res.ok) throw new Error('Bad response');
        if (statusEl) {
          statusEl.textContent = 'Thanks! Your message has been sent.';
          statusEl.style.color = '#86efac';
        }
        form.reset();
      })
      .catch(() => {
        // Fallback: open the user's email client with a prefilled message
        const subject = encodeURIComponent(`Portfolio Inquiry from ${payload.name}`);
        const body = encodeURIComponent(`Name: ${payload.name}\nEmail: ${payload.email}\n\n${payload.message}`);
        const mailto = `mailto:hanzlacsi@gmail.com?subject=${subject}&body=${body}`;
        window.location.href = mailto;
        setTimeout(() => {
          if (statusEl) {
            statusEl.textContent = 'Opening your email app…';
            statusEl.style.color = '#86efac';
          }
          form.reset();
        }, 600);
      });
  });
}

// Active link highlighting on scroll
const sections = Array.from(document.querySelectorAll('main section[id]'));
const navLinks = Array.from(document.querySelectorAll('.site-nav a'));

function setActiveNav() {
  const scrollPos = window.scrollY + (document.querySelector('.site-header')?.offsetHeight || 0) + 8;
  let currentId = 'home';
  for (const sec of sections) {
    if (scrollPos >= sec.offsetTop) currentId = sec.id;
  }
  navLinks.forEach((link) => {
    const hash = link.getAttribute('href') || '';
    if (hash === `#${currentId}`) link.style.color = '#fff';
    else link.style.color = '';
  });
}

window.addEventListener('scroll', setActiveNav);
window.addEventListener('load', setActiveNav);

// Mini carousel logic (for PulseSentry)
function initCarousel(root) {
  const track = root.querySelector('.carousel-track');
  const slides = Array.from(root.querySelectorAll('.slide'));
  const prev = root.querySelector('.prev');
  const next = root.querySelector('.next');
  const dots = root.querySelector('.carousel-dots');
  let index = 0;

  // Build dots
  slides.forEach((_, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('role', 'tab');
    b.setAttribute('aria-label', `Go to slide ${i + 1}`);
    if (i === 0) b.setAttribute('aria-selected', 'true');
    b.addEventListener('click', () => goTo(i));
    dots.appendChild(b);
  });

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.querySelectorAll('button').forEach((btn, idx) => {
      btn.setAttribute('aria-selected', idx === index ? 'true' : 'false');
    });
  }

  prev?.addEventListener('click', () => goTo(index - 1));
  next?.addEventListener('click', () => goTo(index + 1));
}

document.querySelectorAll('.carousel').forEach(initCarousel);
