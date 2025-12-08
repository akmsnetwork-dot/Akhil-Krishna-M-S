// script.js
// Fade-in on scroll, FAQ toggle, smooth small helpers

document.addEventListener('DOMContentLoaded', function () {
  // fade-in on scroll (IntersectionObserver)
  const faders = document.querySelectorAll('.fade-in');
  const appearOptions = { threshold: 0.08, rootMargin: '0px 0px -60px 0px' };
  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('appear');
      observer.unobserve(entry.target);
    });
  }, appearOptions);
  faders.forEach(f => appearOnScroll.observe(f));

  // FAQ toggle behavior
  const faqButtons = document.querySelectorAll('.faq-question');
  faqButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const ans = btn.nextElementSibling;
      if (!ans) return;
      const isOpen = ans.classList.contains('open');
      // close others (optional) - keep only one open at a time
      faqButtons.forEach(b => {
        const a = b.nextElementSibling;
        if (a && a !== ans) a.classList.remove('open');
      });
      if (isOpen) ans.classList.remove('open');
      else ans.classList.add('open');
      // smooth scroll into view a little if opened
      if (ans.classList.contains('open')) {
        setTimeout(() => {
          ans.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 120);
      }
    });
  });

  // lightweight smooth scrolling for internal links (fine-tune offset for sticky nav)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      if (!targetId) return;
      const el = document.getElementById(targetId) || document.querySelector(`[name="${targetId}"]`);
      if (!el) return;
      e.preventDefault();
      const headerOffset = 66; // adjust for navbar height
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    });
  });
});
