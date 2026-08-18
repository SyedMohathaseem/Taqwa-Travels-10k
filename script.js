// ===== PRELOADER =====
window.addEventListener('load', () => {
  const preloader = document.querySelector('.preloader');
  setTimeout(() => {
    preloader.classList.add('hidden');
  }, 1200);
});

// ===== NAVBAR SCROLL =====
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  // Turn dark as soon as user starts scrolling (80px threshold)
  // Return to transparent when back at the very top
  if (window.scrollY > 80) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== MOBILE MENU =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navOverlay = document.querySelector('.nav-overlay');
const navAnchors = document.querySelectorAll('.nav-links a');

function toggleMenu() {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
  navOverlay.classList.toggle('active');
  document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
}

hamburger.addEventListener('click', toggleMenu);
navOverlay.addEventListener('click', toggleMenu);

navAnchors.forEach(anchor => {
  anchor.addEventListener('click', () => {
    if (navLinks.classList.contains('active')) {
      toggleMenu();
    }
  });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ===== SCROLL REVEAL ANIMATIONS =====
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -60px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ===== TESTIMONIALS SLIDER =====
const track = document.querySelector('.testimonials-track');
const slides = document.querySelectorAll('.testimonial-card');
const prevBtn = document.getElementById('testimonial-prev');
const nextBtn = document.getElementById('testimonial-next');
const dots = document.querySelectorAll('.testimonials-dots .dot');
let currentSlide = 0;
let autoSlideInterval;

function goToSlide(index) {
  if (index < 0) index = slides.length - 1;
  if (index >= slides.length) index = 0;
  currentSlide = index;
  track.style.transform = `translateX(-${currentSlide * 100}%)`;
  
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentSlide);
  });
}

function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    goToSlide(currentSlide + 1);
  }, 5000);
}

function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}

if (prevBtn && nextBtn) {
  prevBtn.addEventListener('click', () => {
    goToSlide(currentSlide - 1);
    resetAutoSlide();
  });

  nextBtn.addEventListener('click', () => {
    goToSlide(currentSlide + 1);
    resetAutoSlide();
  });
}

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    goToSlide(i);
    resetAutoSlide();
  });
});

startAutoSlide();

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = this.querySelector('[name="name"]').value;
    const phone = this.querySelector('[name="phone"]').value;
    const service = this.querySelector('[name="service"]').value;
    const message = this.querySelector('[name="message"]').value;

    const whatsappText = encodeURIComponent(
      `🌟 *New Inquiry - Taqwa Travels*\n\n` +
      `👤 *Name:* ${name}\n` +
      `📱 *Phone:* ${phone}\n` +
      `✈️ *Service:* ${service}\n` +
      `💬 *Message:* ${message}`
    );

    window.open(`https://wa.me/916380666587?text=${whatsappText}`, '_blank');
    
    // Reset form
    this.reset();
    
    // Show success feedback
    const btn = this.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '✓ Sent Successfully!';
    btn.style.background = '#25D366';
    btn.style.borderColor = '#25D366';
    btn.style.color = 'white';
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.background = '';
      btn.style.borderColor = '';
      btn.style.color = '';
    }, 3000);
  });
}

// ===== COUNTER ANIMATION =====
function animateCounters() {
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const suffix = counter.getAttribute('data-suffix') || '';
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const update = () => {
      current += step;
      if (current < target) {
        counter.textContent = Math.floor(current) + suffix;
        requestAnimationFrame(update);
      } else {
        counter.textContent = target + suffix;
      }
    };
    update();
  });
}

const counterSection = document.querySelector('.stats-section');
if (counterSection) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  counterObserver.observe(counterSection);
}

// ===== ACTIVE NAV LINK ON CURRENT PAGE =====
function updateActiveNavLink() {
  const fullPath = decodeURIComponent(window.location.pathname).toLowerCase();
  let currentFile = fullPath.split('/').pop().split('#')[0];
  
  if (!currentFile || currentFile === 'index.html' || currentFile === '' || !currentFile.endsWith('.html')) {
    currentFile = 'index.html';
  }
  
  navAnchors.forEach(anchor => {
    const href = anchor.getAttribute('href');
    if (!href || href.startsWith('http') || href.startsWith('https') || anchor.classList.contains('nav-cta')) {
      return;
    }

    const targetPage = href.split('#')[0].toLowerCase();
    
    if (targetPage === currentFile) {
      anchor.classList.add('active');
    } else {
      anchor.classList.remove('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', updateActiveNavLink);
window.addEventListener('load', updateActiveNavLink);

// ===== PARALLAX SUBTLE EFFECT ON HERO =====
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero-content');
  if (hero) {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
      hero.style.transform = `translateY(${scrolled * 0.3}px)`;
      hero.style.opacity = 1 - scrolled / window.innerHeight;
    }
  }
});

// ===== IMAGE LIGHTBOX (FULLSCREEN VIEWER) =====
const lightboxOverlay = document.getElementById('lightbox-overlay');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');

function openLightbox(src) {
  lightboxImg.src = src;
  lightboxOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightboxOverlay.classList.remove('active');
  document.body.style.overflow = '';
  setTimeout(() => {
    lightboxImg.src = '';
  }, 400);
}

// Click on any review image to open lightbox
document.querySelectorAll('.review-image-card img').forEach(img => {
  img.addEventListener('click', () => {
    openLightbox(img.src);
  });
});

// Close lightbox
if (lightboxClose) {
  lightboxClose.addEventListener('click', (e) => {
    e.stopPropagation();
    closeLightbox();
  });
}

if (lightboxOverlay) {
  lightboxOverlay.addEventListener('click', (e) => {
    if (e.target === lightboxOverlay) {
      closeLightbox();
    }
  });
}

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightboxOverlay.classList.contains('active')) {
    closeLightbox();
  }
});
