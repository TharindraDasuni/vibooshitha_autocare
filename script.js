// Custom Cursor Logic
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  // Move main dot
  cursor.style.left = e.clientX - 6 + 'px';
  cursor.style.top = e.clientY - 6 + 'px';
  
  // Target coordinates for the ring (lerp effect)
  rx += (e.clientX - 18 - rx) * 0.15;
  ry += (e.clientY - 18 - ry) * 0.15;
});

function animRing() {
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  requestAnimationFrame(animRing);
}
animRing();

// Hover interactions for all clickable elements
document.querySelectorAll('a, button, .service-card, .why-card, .price-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'scale(2)';
    ring.style.transform = 'scale(1.4)';
    ring.style.borderColor = '#ff0015';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'scale(1)';
    ring.style.transform = 'scale(1)';
    ring.style.borderColor = 'var(--red)';
  });
});

// Scroll Reveal Observer
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

reveals.forEach(r => observer.observe(r));

// Smooth number count-up on stats
function countUp(el, target, suffix = '') {
  let count = 0;
  const step = Math.ceil(target / 60);
  const t = setInterval(() => {
    count += step;
    if (count >= target) {
      count = target;
      clearInterval(t);
    }
    el.textContent = count + suffix;
  }, 25);
}

// Optional: Trigger countUp when stats section is visible
const statsSection = document.querySelector('.hero-stats');
const statsObserver = new IntersectionObserver(entries => {
    if(entries[0].isIntersecting) {
        document.querySelectorAll('.stat-num').forEach(stat => {
            const target = parseInt(stat.innerText);
            const suffix = stat.querySelector('span') ? stat.querySelector('span').innerText : '';
            countUp(stat, target, suffix);
        });
        statsObserver.disconnect();
    }
}, { threshold: 0.5 });

if(statsSection) statsObserver.observe(statsSection);

// script.js ෆයිල් එකට එකතු කරන්න

// Hero Section Animation එක ක්‍රියාත්මක කිරීම
window.addEventListener('load', () => {
    // Hero Section එකේ 'show' class එක එකතු කරන්න
    const heroWheel = document.querySelector('.wheel-container');
    if(heroWheel) {
        // Animation එක 500ms කට පසු ක්‍රියාත්මක කරන්න
        setTimeout(() => {
            heroWheel.classList.add('show');
        }, 500); 
    }
});

// Mobile Menu Toggle Logic
const hamburgerBtn = document.querySelector('.hamburger');
const mobileNavLinks = document.querySelector('.nav-links');

if(hamburgerBtn && mobileNavLinks) {
  hamburgerBtn.addEventListener('click', () => {
    mobileNavLinks.classList.toggle('active');
    
    // Hamburger icon එක 'X' අකුරට මාරු කිරීම
    if(mobileNavLinks.classList.contains('active')) {
      hamburgerBtn.innerHTML = '✕';
    } else {
      hamburgerBtn.innerHTML = '☰';
    }
  });

  // මෙනු එකේ ලින්ක් එකක් click කළාම මෙනු එක ඉබේම වැසී යාමට
  const navItems = document.querySelectorAll('.nav-links a');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      mobileNavLinks.classList.remove('active');
      hamburgerBtn.innerHTML = '☰';
    });
  });
}