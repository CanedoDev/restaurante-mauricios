(function () {
  'use strict';

  const prefersReduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. Header scrolled a partir de 72px ---------- */
  const header = document.getElementById('site-header');
  const syncHeaderState = () => {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY >= 72);
  };
  syncHeaderState();
  window.addEventListener('scroll', syncHeaderState, { passive: true });

  /* ---------- 2. Menu mobile fullscreen ---------- */
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuClose = document.getElementById('mobile-menu-close');
  const menuBackground = [header, document.getElementById('conteudo-principal'),
    document.querySelector('.site-footer'), document.querySelector('.skip-link')].filter(Boolean);
  if (menuToggle && mobileMenu) header.classList.add('has-menu');
  let lastTriggerEl = null;

  const setMenuLinesDelay = () => {
    if (!mobileMenu) return;
    const lines = mobileMenu.querySelectorAll('.menu-line');
    lines.forEach((line, idx) => {
      line.style.transitionDelay = prefersReduced() ? '0ms' : `${idx * 50}ms`;
    });
  };
  setMenuLinesDelay();

  if (mobileMenu) {
    mobileMenu.inert = true;
  }

  const closeMobileMenu = (restoreFocus = true) => {
    if (!mobileMenu || !mobileMenu.classList.contains('is-open')) return;
    mobileMenu.classList.remove('is-open');
    mobileMenu.inert = true;
    mobileMenu.setAttribute('aria-hidden', 'true');
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
    menuBackground.forEach((element) => { element.inert = false; });
    if (restoreFocus && lastTriggerEl && typeof lastTriggerEl.focus === 'function') {
      lastTriggerEl.focus({ preventScroll: true });
    }
  };

  const openMobileMenu = () => {
    if (!mobileMenu) return;
    lastTriggerEl = document.activeElement;
    setMenuLinesDelay();
    mobileMenu.inert = false;
    mobileMenu.classList.add('is-open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
    menuBackground.forEach((element) => { element.inert = true; });
    void mobileMenu.offsetWidth;
    if (menuClose) menuClose.focus({ preventScroll: true });
    requestAnimationFrame(() => {
      if (menuClose && document.activeElement !== menuClose) {
        menuClose.focus({ preventScroll: true });
      }
    });
  };

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      const open = mobileMenu && mobileMenu.classList.contains('is-open');
      if (open) closeMobileMenu(true);
      else openMobileMenu();
    });
  }

  if (menuClose) {
    menuClose.addEventListener('click', () => closeMobileMenu(true));
  }

  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => closeMobileMenu(false));
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('is-open')) {
      closeMobileMenu(true);
    }
  });

  /* ---------- 3. Carrossel de 4 categorias ---------- */
  const carouselRoot = document.querySelector('.section-categories');
  const slides = Array.from(document.querySelectorAll('.category-slide'));
  const tabs = Array.from(document.querySelectorAll('.carousel-tab'));
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  let activeSlide = 0;
  let activeSlideTween = null;

  const activateSlide = (targetIdx, direction = 1) => {
    const total = slides.length;
    if (!total) return;
    const nextIdx = ((targetIdx % total) + total) % total;
    if (nextIdx === activeSlide) return;

    const prevIdx = activeSlide;
    const prevSlide = slides[prevIdx];
    const nextSlide = slides[nextIdx];
    activeSlide = nextIdx;

    tabs.forEach((tab, idx) => {
      const selected = idx === nextIdx;
      tab.setAttribute('aria-selected', String(selected));
    });

    if (activeSlideTween) {
      activeSlideTween.kill();
      activeSlideTween = null;
    }

    slides.forEach((slide, idx) => {
      if (idx !== prevIdx && idx !== nextIdx) {
        slide.classList.remove('is-active', 'is-under');
        slide.hidden = true;
        slide.style.clipPath = '';
      }
    });

    nextSlide.hidden = false;
    prevSlide.classList.remove('is-active');
    prevSlide.classList.add('is-under');
    nextSlide.classList.add('is-active');

    const canAnimate = typeof window.gsap !== 'undefined' && !prefersReduced();
    if (!canAnimate) {
      prevSlide.classList.remove('is-under');
      prevSlide.hidden = true;
      nextSlide.style.clipPath = '';
      return;
    }

    const fromClip = direction >= 0 ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)';
    const titleEl = nextSlide.querySelector('.category-title');
    const descEl = nextSlide.querySelector('.category-desc');

    const tl = window.gsap.timeline({
      onComplete: () => {
        prevSlide.classList.remove('is-under');
        prevSlide.hidden = true;
        nextSlide.style.clipPath = '';
        activeSlideTween = null;
      }
    });

    tl.fromTo(
      nextSlide,
      { clipPath: fromClip },
      { clipPath: 'inset(0 0 0 0%)', duration: 0.66, ease: 'power2.inOut' },
      0
    );

    if (titleEl) {
      tl.fromTo(
        titleEl,
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.56, ease: 'power3.out', clearProps: 'transform,opacity' },
        0.08
      );
    }

    if (descEl) {
      tl.fromTo(
        descEl,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.48, ease: 'power2.out', clearProps: 'transform,opacity' },
        0.14
      );
    }

    activeSlideTween = tl;
  };

  if (prevBtn) {
    prevBtn.addEventListener('click', () => activateSlide(activeSlide - 1, -1));
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => activateSlide(activeSlide + 1, 1));
  }

  tabs.forEach((tab, idx) => {
    tab.addEventListener('click', () => {
      const dir = idx >= activeSlide ? 1 : -1;
      activateSlide(idx, dir);
    });
    tab.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        const nextTab = (idx + 1) % tabs.length;
        tabs[nextTab].focus();
        activateSlide(nextTab, 1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const prevTab = (idx - 1 + tabs.length) % tabs.length;
        tabs[prevTab].focus();
        activateSlide(prevTab, -1);
      }
    });
  });

  if (carouselRoot) {
    let startX = 0;
    let startY = 0;
    let trackingSwipe = false;

    carouselRoot.addEventListener('pointerdown', (e) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      if (e.target.closest('a, button')) return;
      startX = e.clientX;
      startY = e.clientY;
      trackingSwipe = true;
    }, { passive: true });

    carouselRoot.addEventListener('pointerup', (e) => {
      if (!trackingSwipe) return;
      trackingSwipe = false;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      if (Math.abs(dx) > 42 && Math.abs(dx) > Math.abs(dy) * 1.2) {
        if (dx < 0) activateSlide(activeSlide + 1, 1);
        else activateSlide(activeSlide - 1, -1);
      }
    }, { passive: true });

    carouselRoot.addEventListener('pointercancel', () => {
      trackingSwipe = false;
    }, { passive: true });
  }

  /* ---------- 4. FAQ em acordeao (1 aberto por vez) ---------- */
  const faqItems = Array.from(document.querySelectorAll('.faq-item'));

  const setFaqOpen = (item, shouldOpen, immediate = false) => {
    const btn = item.querySelector('.faq-trigger');
    const panel = item.querySelector('.faq-panel');
    if (!btn || !panel) return;

    btn.setAttribute('aria-expanded', String(shouldOpen));
    const useImmediate = immediate || prefersReduced() || typeof window.gsap === 'undefined';
    window.gsap?.killTweensOf(panel);

    if (shouldOpen) {
      panel.hidden = false;
      panel.setAttribute('data-open', 'true');
      if (useImmediate) {
        panel.style.height = 'auto';
        return;
      }
      const targetHeight = panel.scrollHeight;
      window.gsap.fromTo(
        panel,
        { height: 0 },
        {
          height: targetHeight,
          duration: 0.28,
          ease: 'power2.out',
          onComplete: () => {
            panel.style.height = 'auto';
            window.ScrollTrigger?.refresh(true);
          }
        }
      );
    } else {
      panel.removeAttribute('data-open');
      if (useImmediate) {
        panel.style.height = '0px';
        panel.hidden = true;
        return;
      }
      const currentHeight = panel.getBoundingClientRect().height;
      window.gsap.fromTo(
        panel,
        { height: currentHeight },
        {
          height: 0,
          duration: 0.22,
          ease: 'power2.in',
          onComplete: () => {
            panel.hidden = true;
            window.ScrollTrigger?.refresh(true);
          }
        }
      );
    }
  };

  faqItems.forEach((item) => {
    const btn = item.querySelector('.faq-trigger');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      faqItems.forEach((other) => {
        if (other !== item) {
          const otherBtn = other.querySelector('.faq-trigger');
          if (otherBtn && otherBtn.getAttribute('aria-expanded') === 'true') {
            setFaqOpen(other, false);
          }
        }
      });
      setFaqOpen(item, !isExpanded);
    });
  });

  /* ---------- 5. Sentido da passagem de cor nos botões ---------- */
  document.querySelectorAll('.button').forEach((button) => {
    button.addEventListener('pointerenter', (event) => {
      if (event.pointerType !== 'mouse') return;
      const { left, width } = button.getBoundingClientRect();
      const fromLeft = event.clientX < left + width / 2;
      button.style.setProperty('--button-from', fromLeft ? '-103%' : '103%');
    });
  });

  /* ---------- 6. Abertura da varanda ---------- */
  let openingPlayed = false;

  const playOpening = (gsap) => {
    if (openingPlayed || window.location.hash || window.scrollY > 2 || performance.now() > 1400) return;

    const hero = document.querySelector('.hero-stage');
    const intro = document.getElementById('intro-stage');
    if (!hero || !intro) return;
    openingPlayed = true;

    const title = hero.querySelector('.hero-title');
    const name = title.textContent;
    const image = hero.querySelector('.hero-media img');
    const oval = intro.querySelector('.intro-oval-path');
    const perimeter = oval.getTotalLength();

    // The title is a single word. Restore its natural kerning after the entrance.
    const letters = Array.from(name, (letter) => {
      const mask = document.createElement('span');
      const glyph = document.createElement('span');
      mask.className = 'char-mask';
      mask.setAttribute('aria-hidden', 'true');
      glyph.className = 'char-inner';
      glyph.textContent = letter;
      mask.append(glyph);
      return mask;
    });
    title.setAttribute('aria-label', name);
    title.replaceChildren(...letters);
    hero.classList.add('is-opening');

    let timeline;
    const finish = () => {
      if (!timeline) return;
      hero.classList.remove('is-opening');
      timeline.revert();
      timeline = null;
      title.textContent = name;
      title.removeAttribute('aria-label');
      document.removeEventListener('focusin', finish);
      window.removeEventListener('scroll', finishOnScroll);
      window.removeEventListener('pagehide', finish);
    };
    const finishOnScroll = () => {
      if (window.scrollY > 24) finish();
    };

    timeline = gsap.timeline({ onComplete: finish });
    timeline
      .addLabel('signature', 0)
      .fromTo(oval, { strokeDasharray: perimeter, strokeDashoffset: perimeter },
        { strokeDashoffset: 0, duration: 0.55, ease: 'power2.inOut' }, 'signature')
      .from(intro.querySelector('.intro-monogram-letter'),
        { yPercent: 110, duration: 0.48, ease: 'power4.out' }, 'signature+=0.07')
      .from(intro.querySelectorAll('.intro-rule'),
        { scaleX: 0, duration: 0.5, ease: 'power3.out' }, 'signature+=0.13')
      .addLabel('opening', 0.46)
      .to(intro.querySelector('.intro-emblem'),
        { opacity: 0, y: -14, duration: 0.21, ease: 'power2.in' }, 'opening')
      .to(intro.querySelector('.intro-shutter--top'),
        { yPercent: -102, duration: 0.92, ease: 'power4.inOut' }, 'opening')
      .to(intro.querySelector('.intro-shutter--bottom'),
        { yPercent: 102, duration: 0.88, ease: 'power4.inOut' }, 'opening+=0.04')
      .from(image, { scale: 1.16, duration: 1.18, ease: 'power3.out' }, 'opening')
      .addLabel('wordmark', 0.84)
      .from(title.querySelectorAll('.char-inner'), {
        yPercent: 112,
        rotationX: -52,
        opacity: 0,
        stagger: 0.028,
        duration: 0.58,
        ease: 'power4.out'
      }, 'wordmark');

    document.addEventListener('focusin', finish, { once: true });
    window.addEventListener('scroll', finishOnScroll, { passive: true });
    window.addEventListener('pagehide', finish, { once: true });
    return finish;
  };

  /* ---------- 7. Revelações e movimento pela rolagem nativa ---------- */
  const scrollMotion = (gsap, desktop) => {
    const lineOriginals = new Map();
    const enter = (trigger, start = 'top 91%') => ({ trigger, start, once: true });

    document.querySelectorAll('[data-split-lines]').forEach((heading) => {
      const original = heading.innerHTML;
      const label = heading.innerText.replace(/\s+/g, ' ').trim();
      lineOriginals.set(heading, original);
      heading.setAttribute('aria-label', label);
      heading.innerHTML = original.split(/<br\s*\/?>/i)
        .map((line) => '<span class="line-mask" aria-hidden="true"><span class="line-inner">' + line.trim() + '</span></span>')
        .join('');

      gsap.fromTo(heading.querySelectorAll('.line-inner'), { yPercent: 106, rotationX: -22 }, {
        yPercent: 0,
        rotationX: 0,
        duration: desktop ? 0.76 : 0.61,
        stagger: 0.095,
        ease: 'power4.out',
        clearProps: 'transform',
        scrollTrigger: enter(heading, 'top 94%')
      });
    });

    const hero = document.querySelector('.hero-stage');
    gsap.to(hero.querySelector('.hero-media'), {
      yPercent: -4,
      scale: 1.10,
      ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.5 }
    });

    const canvas = document.querySelector('.manifesto-canvas');
    const collage = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: { trigger: canvas, start: 'top bottom', end: 'bottom top', scrub: 0.55 }
    });

    canvas.querySelectorAll('.collage-item').forEach((photo) => {
      const { parallax, parallaxMobile, driftX, rotStart, rotEnd } = photo.dataset;
      const y = Number(desktop ? parallax : parallaxMobile);
      const x = Number(driftX) * (desktop ? 1 : 0.38);
      const angle = desktop ? 1 : 0.52;
      collage.fromTo(photo, {
        x: -x * 0.55, y: -y * 0.5, rotation: Number(rotStart) * angle
      }, {
        x: x * 0.45, y: y * 0.5, rotation: Number(rotEnd) * angle, duration: 1
      }, 0);
    });

    const trio = document.querySelector('.trio-grid');
    trio.querySelectorAll('.trio-card').forEach((card) => {
      const y = Number(desktop ? card.dataset.trioY : card.dataset.trioYMobile);
      gsap.fromTo(card, { y: -y * 0.45 }, {
        y: y * 0.55,
        ease: 'none',
        scrollTrigger: { trigger: trio, start: 'top bottom', end: 'bottom top', scrub: 0.6 }
      });
    });

    // The crop and the movement of the photo live on different elements.
    const fromBottom = 'inset(100% 0 0 0)';
    const fromLeft = 'inset(0 100% 0 0)';
    const fromRight = 'inset(0 0 0 100%)';
    const runs = [
      ['.collage-inner', [fromBottom, fromLeft, fromRight]],
      ['.signature-photo', [fromLeft, fromRight]],
      ['.trio-card img', [fromRight, fromBottom, fromLeft]],
      ['.experience-photo, .visit-photo', [fromBottom, fromLeft]],
      ['.moment-photo, .instagram-frame', [fromBottom]]
    ];
    runs.forEach(([selector, edges]) => {
      document.querySelectorAll(selector).forEach((frame, index) => {
        gsap.fromTo(frame, { clipPath: edges[index % edges.length] }, {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: desktop ? 0.88 : 0.67,
          ease: 'power3.inOut',
          clearProps: 'clipPath',
          scrollTrigger: enter(frame, 'top 98%')
        });
      });
    });

    const passiveGroups = [
      ['.manifesto-copy', [':scope > .eyebrow', '.manifesto-lead']],
      ['.trust-item', ['.trust-metric', '.trust-label']],
      ['.reviews-grid', ['.reviews-score', '.reviews-count', '.reviews-summary']],
      ['.signature-card', ['.signature-title', '.signature-desc']],
      ['.moment-card', ['.moment-title', '.moment-desc']]
    ];
    passiveGroups.forEach(([parentSelector, selectors]) => {
      document.querySelectorAll(parentSelector).forEach((group) => {
        const texts = group.querySelectorAll(selectors.join(', '));
        if (!texts.length) return;
        gsap.fromTo(texts, { y: 16, opacity: 0 }, {
          y: 0,
          opacity: 1,
          stagger: 0.06,
          duration: 0.56,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: enter(texts[0], 'top 96%')
        });
      });
    });

    document.querySelectorAll('.section-break').forEach((divider) => {
      const borders = divider.querySelectorAll('.section-break-border');
      gsap.fromTo(borders, { scaleX: 0 }, {
        scaleX: 1,
        duration: 0.72,
        ease: 'power3.inOut',
        clearProps: 'transform',
        scrollTrigger: enter(divider)
      });
    });

    const categories = document.querySelector('.categories-stage');
    const activeCover = categories.querySelector('.category-slide.is-active img');
    gsap.fromTo(activeCover, { scale: 1.12 }, {
      scale: 1,
      duration: 1.13,
      ease: 'power3.out',
      clearProps: 'transform',
      scrollTrigger: enter(categories, 'top 98%')
    });

    const wordmark = document.querySelector('.footer-wordmark');
    gsap.fromTo(wordmark, { clipPath: fromBottom, yPercent: 19 }, {
      clipPath: 'inset(0% 0% 0% 0%)',
      yPercent: 0,
      duration: 0.95,
      ease: 'power4.out',
      clearProps: 'clipPath,transform',
      scrollTrigger: enter(wordmark, 'top 97%')
    });

    return () => {
      lineOriginals.forEach((html, heading) => {
        heading.innerHTML = html;
        heading.removeAttribute('aria-label');
      });
    };
  };

  const initMotion = () => {
    const { gsap, ScrollTrigger } = window;
    if (!gsap) return;

    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => playOpening(gsap));

    if (!ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);
    mm.add({
      motion: '(prefers-reduced-motion: no-preference)',
      desktop: '(min-width: 1024px)'
    }, ({ conditions }) => {
      if (conditions.motion) return scrollMotion(gsap, conditions.desktop);
    });
    document.fonts?.ready.then(() => ScrollTrigger.refresh(true));
  };

  initMotion();
})();
