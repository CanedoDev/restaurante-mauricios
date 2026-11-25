(function () {
  'use strict';

  const prefersReduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isFinePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

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
  const mainEl = document.getElementById('conteudo-principal');
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
    mobileMenu.setAttribute('aria-hidden', 'true');
    mobileMenu.inert = true;
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
    if (mainEl) mainEl.inert = false;
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
    if (mainEl) mainEl.inert = true;
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

    if (shouldOpen) {
      panel.hidden = false;
      panel.setAttribute('data-open', 'true');
      if (useImmediate) {
        panel.style.height = 'auto';
        return;
      }
      const targetHeight = panel.scrollHeight;
      window.gsap.killTweensOf(panel);
      window.gsap.fromTo(
        panel,
        { height: 0 },
        {
          height: targetHeight,
          duration: 0.28,
          ease: 'power2.out',
          onComplete: () => {
            panel.style.height = 'auto';
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
      window.gsap.killTweensOf(panel);
      const currentHeight = panel.scrollHeight;
      window.gsap.fromTo(
        panel,
        { height: currentHeight },
        {
          height: 0,
          duration: 0.22,
          ease: 'power2.in',
          onComplete: () => {
            panel.hidden = true;
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

  /* ---------- 5. Botoes pilula .btn-text / .btn-text-hover ---------- */
  const initPillHover = () => {
    if (!isFinePointer() || prefersReduced() || typeof window.gsap === 'undefined') return;
    document.querySelectorAll('.pill').forEach((btn) => {
      const primary = btn.querySelector('.btn-text');
      const hover = btn.querySelector('.btn-text-hover');
      if (!primary || !hover) return;

      const tl = window.gsap.timeline({ paused: true });
      tl.to(primary, { yPercent: -105, duration: 0.28, ease: 'power2.out' }, 0)
        .fromTo(
          hover,
          { yPercent: 105, scale: 0.9 },
          { yPercent: 0, scale: 1, duration: 0.28, ease: 'power2.out' },
          0
        );

      btn.addEventListener('mouseenter', () => tl.play());
      btn.addEventListener('mouseleave', () => tl.reverse());
      btn.addEventListener('focusin', () => tl.play());
      btn.addEventListener('focusout', () => tl.reverse());
    });
  };

  /* ---------- 6. Split de linhas para titulos internos ---------- */
  const splitTargets = Array.from(document.querySelectorAll('[data-split-lines]'));
  splitTargets.forEach((el) => {
    el.dataset.originalHtml = el.innerHTML;
  });

  const buildLineMasks = () => {
    splitTargets.forEach((el) => {
      const original = el.dataset.originalHtml;
      if (!original) return;
      const ariaLabel = el.textContent.replace(/\s+/g, ' ').trim();
      el.setAttribute('aria-label', ariaLabel);

      const parts = original.split(/<br\s*\/?>/i);
      el.innerHTML = parts
        .map((part) => `<span class="line-mask" aria-hidden="true"><span class="line-inner">${part.trim()}</span></span>`)
        .join('');
    });
  };

  const restoreOriginalLines = () => {
    splitTargets.forEach((el) => {
      if (el.dataset.originalHtml) {
        el.innerHTML = el.dataset.originalHtml;
        el.removeAttribute('aria-label');
      }
    });
  };

  /* ---------- 7. Coreografia GSAP + ScrollTrigger via matchMedia ---------- */
  const initMotion = () => {
    initPillHover();

    if (typeof window.gsap === 'undefined' || typeof window.ScrollTrigger === 'undefined') {
      return;
    }

    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: reduce)', () => {
      restoreOriginalLines();
      return () => {};
    });

    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      buildLineMasks();

      document.querySelectorAll('[data-split-lines]').forEach((heading) => {
        const lines = heading.querySelectorAll('.line-inner');
        if (!lines.length) return;
        gsap.fromTo(
          lines,
          { yPercent: 100 },
          {
            yPercent: 0,
            duration: 0.78,
            ease: 'power3.out',
            stagger: 0.06,
            clearProps: 'transform',
            scrollTrigger: {
              trigger: heading,
              start: 'top 85%',
              once: true
            }
          }
        );
      });

      const heroImg = document.querySelector('.hero-media img');
      const heroContent = document.querySelector('.hero-content');
      const heroStage = document.querySelector('.hero-stage');
      if (heroStage && heroImg) {
        gsap.fromTo(
          heroImg,
          { scale: 1.04, yPercent: 0 },
          {
            scale: 1,
            yPercent: -4,
            ease: 'none',
            scrollTrigger: {
              trigger: heroStage,
              start: 'top top',
              end: 'bottom top',
              scrub: 0.55
            }
          }
        );
      }
      if (heroStage && heroContent) {
        gsap.to(heroContent, {
          y: -36,
          opacity: 0.15,
          ease: 'none',
          scrollTrigger: {
            trigger: heroStage,
            start: '35% top',
            end: 'bottom top',
            scrub: 0.5
          }
        });
      }

      const manifestoCanvas = document.querySelector('.manifesto-canvas');
      if (manifestoCanvas) {
        manifestoCanvas.querySelectorAll('.collage-item').forEach((item) => {
          const yOffset = Number(item.dataset.parallax || 0);
          gsap.fromTo(
            item,
            { y: yOffset * -0.5 },
            {
              y: yOffset * 0.5,
              ease: 'none',
              scrollTrigger: {
                trigger: manifestoCanvas,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.6
              }
            }
          );
        });
      }

      document.querySelectorAll('.section-break').forEach((brk) => {
        const borders = brk.querySelectorAll('.section-break-border');
        if (!borders.length) return;
        gsap.fromTo(
          borders,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.72,
            ease: 'power2.out',
            clearProps: 'transform',
            scrollTrigger: {
              trigger: brk,
              start: 'top 88%',
              once: true
            }
          }
        );
      });

      const trioGrid = document.querySelector('.trio-grid');
      if (trioGrid) {
        trioGrid.querySelectorAll('.trio-card').forEach((card) => {
          const yOffset = Number(card.dataset.trioY || 0);
          gsap.fromTo(
            card,
            { y: yOffset * -0.45 },
            {
              y: yOffset * 0.55,
              ease: 'none',
              scrollTrigger: {
                trigger: trioGrid,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.7
              }
            }
          );
        });
      }

      return () => {
        restoreOriginalLines();
      };
    });

    mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
      buildLineMasks();

      document.querySelectorAll('[data-split-lines]').forEach((heading) => {
        const lines = heading.querySelectorAll('.line-inner');
        if (!lines.length) return;
        gsap.fromTo(
          lines,
          { yPercent: 100 },
          {
            yPercent: 0,
            duration: 0.5,
            ease: 'power3.out',
            stagger: 0.06,
            clearProps: 'transform',
            scrollTrigger: {
              trigger: heading,
              start: 'top 88%',
              once: true
            }
          }
        );
      });

      const manifestoCanvas = document.querySelector('.manifesto-canvas');
      if (manifestoCanvas) {
        manifestoCanvas.querySelectorAll('.collage-item').forEach((item) => {
          const yOffset = Number(item.dataset.parallaxMobile || 14);
          gsap.fromTo(
            item,
            { y: yOffset * -0.5 },
            {
              y: yOffset * 0.5,
              ease: 'none',
              scrollTrigger: {
                trigger: manifestoCanvas,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.6
              }
            }
          );
        });
      }

      document.querySelectorAll('.section-break').forEach((brk) => {
        const borders = brk.querySelectorAll('.section-break-border');
        if (!borders.length) return;
        gsap.fromTo(
          borders,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.56,
            ease: 'power2.out',
            clearProps: 'transform',
            scrollTrigger: {
              trigger: brk,
              start: 'top 90%',
              once: true
            }
          }
        );
      });

      const trioGrid = document.querySelector('.trio-grid');
      if (trioGrid) {
        trioGrid.querySelectorAll('.trio-card').forEach((card) => {
          const yOffset = Number(card.dataset.trioYMobile || 0);
          gsap.fromTo(
            card,
            { y: yOffset * -0.45 },
            {
              y: yOffset * 0.55,
              ease: 'none',
              scrollTrigger: {
                trigger: trioGrid,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.7
              }
            }
          );
        });
      }

      return () => {
        restoreOriginalLines();
      };
    });

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMotion);
  } else {
    initMotion();
  }
})();
