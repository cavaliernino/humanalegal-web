/* =========================================================
   Humana Legal — main.js
   ========================================================= */

(function () {
  'use strict';

  /* ---------- Sticky nav shadow ---------- */
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (!nav) return;
    if (window.scrollY > 10) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  const toggle = document.querySelector('.nav__toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isOpen));
      if (isOpen) mobileMenu.setAttribute('hidden', '');
      else mobileMenu.removeAttribute('hidden');
    });
    // close menu on link click
    mobileMenu.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('hidden', '');
      });
    });
  }

  /* ---------- Smooth scroll for in-page anchors ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const offset = 72;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ---------- Current year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Contact form ---------- */
  const form = document.getElementById('contact-form');
  if (form) {
    const note = form.querySelector('.form__note');
    const lang = document.documentElement.lang.startsWith('en') ? 'en' : 'es';
    const msgs = {
      es: {
        sending: 'Enviando mensaje…',
        success: 'Gracias. Hemos recibido su mensaje y responderemos dentro de 24 horas hábiles.',
        error: 'Ha ocurrido un error al enviar. Por favor intente nuevamente o escriba a tamara@humanalegal.cl',
        invalid: 'Por favor complete los campos requeridos correctamente.',
        spam: 'Mensaje rechazado.'
      },
      en: {
        sending: 'Sending message…',
        success: 'Thank you. We have received your message and will reply within 24 business hours.',
        error: 'There was an error sending your message. Please try again or email tamara@humanalegal.cl',
        invalid: 'Please complete the required fields correctly.',
        spam: 'Message rejected.'
      }
    };
    const t = msgs[lang];

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      note.classList.remove('is-success', 'is-error');

      // Honeypot
      const hp = form.querySelector('input[name="website"]');
      if (hp && hp.value.trim() !== '') {
        note.textContent = t.spam;
        note.classList.add('is-error');
        return;
      }

      // Basic validation
      if (!form.checkValidity()) {
        form.reportValidity();
        note.textContent = t.invalid;
        note.classList.add('is-error');
        return;
      }

      // Collect data
      const data = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        phone: form.phone.value.trim(),
        area: form.area.value,
        message: form.message.value.trim(),
        website: hp ? hp.value : '',
        lang: lang,
        timestamp: new Date().toISOString()
      };

      note.textContent = t.sending;
      note.classList.remove('is-error', 'is-success');

      try {
        // Backend propio en el mismo servidor (ver deploy/contact-api/).
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(data)
        });

        if (!res.ok) throw new Error('Network response was not ok');

        note.textContent = t.success;
        note.classList.add('is-success');
        form.reset();
      } catch (err) {
        // Fallback: open mail client as backup
        note.textContent = t.error;
        note.classList.add('is-error');
        const mailtoBody = encodeURIComponent(
          `Nombre: ${data.name}\nEmail: ${data.email}\nTeléfono: ${data.phone}\nÁrea: ${data.area}\n\n${data.message}`
        );
        setTimeout(() => {
          window.location.href = `mailto:tamara@humanalegal.cl?subject=${encodeURIComponent('Consulta desde el sitio web')}&body=${mailtoBody}`;
        }, 1800);
      }
    });
  }

  /* ---------- Calendly placeholder ---------- */
  const calendlyLinks = document.querySelectorAll('[data-calendly]');
  calendlyLinks.forEach((el) => {
    el.addEventListener('click', (e) => {
      // When Calendly URL is configured, update href and remove this handler
      const CAL_URL = ''; // ← set Calendly URL here
      if (!CAL_URL) {
        e.preventDefault();
        const c = document.getElementById('contacto') || document.getElementById('contact');
        if (c) {
          const top = c.getBoundingClientRect().top + window.scrollY - 72;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      } else {
        el.setAttribute('href', CAL_URL);
        el.setAttribute('target', '_blank');
        el.setAttribute('rel', 'noopener');
      }
    });
  });

  /* ---------- Scroll reveal (subtle) ---------- */
  if ('IntersectionObserver' in window) {
    const reveal = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            reveal.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.area, .approach__item, .fees__list li, .profile__facts > div').forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity 700ms cubic-bezier(0.22,1,0.36,1), transform 700ms cubic-bezier(0.22,1,0.36,1)';
      reveal.observe(el);
    });
    const style = document.createElement('style');
    style.textContent = '.is-visible{opacity:1 !important; transform:none !important;}';
    document.head.appendChild(style);
  }
})();
