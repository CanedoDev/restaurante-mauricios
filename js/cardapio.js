(function () {
  'use strict';

  const WHATSAPP_NUMBER = '5524993061488';
  const STORAGE_KEY = 'mauricios_cart_v2';

  const brlFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });

  const formatCents = (cents) => brlFormatter.format(cents / 100);

  const normalizeText = (value) =>
    String(value || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();

  const prefersReduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobileViewport = () => window.matchMedia('(max-width: 767px)').matches;

  /* ---------- Catalogo separado da UI (precos em centavos inteiros) ---------- */
  const DISHES = [
    {
      id: 'chiclete-camarao',
      name: 'Chiclete de camarão',
      description: 'Camarões com cobertura gratinada.',
      priceCents: 8400,
      img: './assets/chiclete-camarao.jpg',
      width: 1250,
      height: 562,
      highlight: true,
      ingredients: ['camarão', 'cobertura gratinada', 'frutos do mar']
    },
    {
      id: 'moqueca-camarao',
      name: 'Moqueca de camarão',
      description: 'Camarão servido na panela, com acompanhamentos.',
      priceCents: 9200,
      img: './assets/moqueca-camarao.jpg',
      width: 938,
      height: 1250,
      highlight: true,
      ingredients: ['camarão', 'panela', 'acompanhamentos', 'frutos do mar']
    },
    {
      id: 'bobo-camarao',
      name: 'Bobó de camarão',
      description: 'Bobó cremoso, servido quente na panela.',
      priceCents: 7800,
      img: './assets/bobo-camarao.jpg',
      width: 703,
      height: 1250,
      highlight: true,
      ingredients: ['camarão', 'bobó', 'panela', 'frutos do mar']
    },
    {
      id: 'arroz-camarao',
      name: 'Arroz de camarão',
      description: 'Arroz com camarões, servido na travessa.',
      priceCents: 7200,
      img: './assets/arroz-camarao.jpg',
      width: 703,
      height: 1250,
      highlight: false,
      ingredients: ['camarão', 'arroz', 'travessa', 'frutos do mar']
    },
    {
      id: 'picanha-pedra',
      name: 'Picanha na pedra',
      description: 'Picanha servida quente na pedra.',
      priceCents: 9400,
      img: './assets/picanha-pedra.jpg',
      width: 1200,
      height: 1600,
      highlight: false,
      ingredients: ['picanha', 'carne', 'pedra', 'chapa']
    },
    {
      id: 'file-piamontese',
      name: 'Filé à piamontese',
      description: 'Filé com arroz à piamontese.',
      priceCents: 8600,
      img: './assets/file-piamontese.jpg',
      width: 938,
      height: 1250,
      highlight: false,
      ingredients: ['filé', 'carne', 'arroz à piamontese']
    },
    {
      id: 'empada-camarao',
      name: 'Empada de camarão',
      description: 'Empada com recheio de camarão.',
      priceCents: 1400,
      img: './assets/empada-camarao.jpg',
      width: 938,
      height: 1250,
      highlight: false,
      ingredients: ['empada', 'camarão', 'entrada', 'petisco']
    },
    {
      id: 'frango-grelhado',
      name: 'Frango grelhado',
      description: 'Opção de frango grelhado para o almoço.',
      priceCents: 3800,
      img: './assets/frango-grelhado.jpg',
      width: 1600,
      height: 1200,
      highlight: false,
      ingredients: ['frango', 'grelhado', 'executivo', 'almoço']
    },
    {
      id: 'flan',
      name: 'Flan',
      description: 'Sobremesa com calda de caramelo.',
      priceCents: 1800,
      img: './assets/flan-caramelo.jpg',
      width: 938,
      height: 1250,
      highlight: false,
      ingredients: ['flan', 'caramelo', 'sobremesa']
    },
    {
      id: 'caipirinha-tangerina',
      name: 'Caipirinha de tangerina',
      description: 'Tangerina e pimenta no copo.',
      priceCents: 2700,
      img: './assets/caipirinha-tangerina.jpg',
      width: 703,
      height: 1250,
      highlight: false,
      ingredients: ['caipirinha', 'tangerina', 'pimenta', 'bebida', 'bar']
    }
  ];

  const DISH_MAP = Object.fromEntries(DISHES.map((d) => [d.id, d]));

  const SECTIONS = [
    {
      id: 'mais-pedidos',
      title: 'Mais pedidos',
      note: 'Destaques citados pelos visitantes no Google Maps',
      dishIds: ['chiclete-camarao', 'moqueca-camarao', 'bobo-camarao']
    },
    {
      id: 'frutos-do-mar',
      title: 'Frutos do Mar',
      note: 'Especialidade da casa · preços ilustrativos',
      dishIds: ['chiclete-camarao', 'moqueca-camarao', 'bobo-camarao', 'arroz-camarao']
    },
    {
      id: 'chapas-e-carnes',
      title: 'Chapas & Carnes',
      note: 'Chapas quentes e cortes clássicos',
      dishIds: ['picanha-pedra', 'file-piamontese']
    },
    {
      id: 'entradas-e-petiscos',
      title: 'Entradas & Petiscos',
      note: 'Para abrir o almoço ou acompanhar o bar',
      dishIds: ['empada-camarao']
    },
    {
      id: 'executivo',
      title: 'Executivo',
      note: 'Composição do dia confirmada diretamente com a casa',
      dishIds: ['frango-grelhado']
    },
    {
      id: 'sobremesas',
      title: 'Sobremesas',
      note: 'Para fechar a refeição',
      dishIds: ['flan']
    },
    {
      id: 'batidas-e-bebidas',
      title: 'Batidas & Bebidas',
      note: 'Coquetéis, batidas e bebidas da casa',
      dishIds: ['caipirinha-tangerina']
    }
  ];

  /* ---------- Estado ---------- */
  const state = {
    cart: [],
    mode: 'retirada',
    address: '',
    searchQuery: '',
    modalDishId: null,
    modalQty: 1,
    lastFocusedBeforeModal: null
  };

  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed.cart)) {
        state.cart = parsed.cart.filter((item) => item && DISH_MAP[item.id] && Number(item.qty) > 0);
      }
      if (parsed.mode === 'entrega' || parsed.mode === 'retirada') {
        state.mode = parsed.mode;
      }
      if (typeof parsed.address === 'string') {
        state.address = parsed.address;
      }
    }
  } catch (err) {
    /* ignore storage error */
  }

  const persistState = () => {
    try {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ cart: state.cart, mode: state.mode, address: state.address })
      );
    } catch (err) {
      /* ignore storage error */
    }
  };

  /* ---------- Elementos DOM ---------- */
  const catalogContainer = document.getElementById('catalog-sections');
  const searchInput = document.getElementById('menu-search');
  const searchClearBtn = document.getElementById('search-clear');
  const searchStatusBar = document.getElementById('search-status-bar');
  const searchStatusCount = document.getElementById('search-status-count');
  const emptySearchEl = document.getElementById('empty-search');
  const emptySearchClearBtn = document.getElementById('empty-search-clear');
  const catBar = document.getElementById('cat-bar');
  const catBarWrap = document.querySelector('.cat-bar-wrap');
  const catPills = Array.from(document.querySelectorAll('.cat-pill'));

  const cartPanel = document.getElementById('cart-panel');
  const cartBackdrop = document.getElementById('cart-backdrop');
  const cartDrawerClose = document.getElementById('cart-drawer-close');
  const openDrawerBtn = document.getElementById('open-drawer-btn');
  const cartEmptyEl = document.getElementById('cart-empty');
  const cartItemsEl = document.getElementById('cart-items');
  const modeRetiradaBtn = document.getElementById('mode-retirada');
  const modeEntregaBtn = document.getElementById('mode-entrega');
  const fulfillmentInfo = document.getElementById('fulfillment-info');
  const deliveryAddressWrap = document.getElementById('delivery-address-wrap');
  const deliveryAddressInput = document.getElementById('delivery-address');
  const cartSubtotalEl = document.getElementById('cart-subtotal');
  const mobileCartCountEl = document.getElementById('mobile-cart-count');
  const mobileCartTotalEl = document.getElementById('mobile-cart-total');
  const openReviewBtn = document.getElementById('open-review-btn');

  const itemModal = document.getElementById('item-modal');
  const itemModalDialog = document.getElementById('item-modal-dialog');
  const itemModalClose = document.getElementById('item-modal-close');
  const modalDishImg = document.getElementById('modal-dish-img');
  const modalDishTitle = document.getElementById('modal-dish-title');
  const modalDishDesc = document.getElementById('modal-dish-desc');
  const modalDishPrice = document.getElementById('modal-dish-price');
  const modalDishNote = document.getElementById('modal-dish-note');
  const modalQtyMinus = document.getElementById('modal-qty-minus');
  const modalQtyValue = document.getElementById('modal-qty-value');
  const modalQtyPlus = document.getElementById('modal-qty-plus');
  const modalAddBtn = document.getElementById('modal-add-btn');

  const reviewModal = document.getElementById('review-modal');
  const reviewModalDialog = document.getElementById('review-modal-dialog');
  const reviewModalClose = document.getElementById('review-modal-close');
  const reviewItemsList = document.getElementById('review-items-list');
  const reviewModeSummary = document.getElementById('review-mode-summary');
  const reviewSubtotalEl = document.getElementById('review-subtotal');
  const reviewPreviewText = document.getElementById('review-preview-text');
  const reviewWhatsappLink = document.getElementById('review-whatsapp-link');

  /* ---------- Renderizacao de Cards e Catalogo ---------- */
  const createDishCard = (dish) => {
    const card = document.createElement('article');
    card.className = 'dish-card';
    card.dataset.dishId = dish.id;

    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'dish-card-trigger';
    trigger.setAttribute('aria-label', `${dish.name}, ${formatCents(dish.priceCents)}, ver detalhes`);
    trigger.addEventListener('click', () => openItemModal(dish.id, trigger));

    const photo = document.createElement('div');
    photo.className = 'dish-card-photo';

    const img = document.createElement('img');
    img.src = dish.img;
    img.alt = dish.name;
    img.width = dish.width;
    img.height = dish.height;
    img.loading = 'lazy';
    img.decoding = 'async';
    photo.appendChild(img);

    if (dish.highlight) {
      const badge = document.createElement('span');
      badge.className = 'dish-badge';
      badge.textContent = 'Mais pedido';
      photo.appendChild(badge);
    }

    const body = document.createElement('div');
    body.className = 'dish-card-body';

    const name = document.createElement('h3');
    name.className = 'dish-card-name';
    name.textContent = dish.name;

    const desc = document.createElement('p');
    desc.className = 'dish-card-desc';
    desc.textContent = dish.description;

    const foot = document.createElement('div');
    foot.className = 'dish-card-foot';

    const price = document.createElement('span');
    price.className = 'dish-card-price';
    price.textContent = formatCents(dish.priceCents);

    const addHint = document.createElement('span');
    addHint.className = 'dish-card-add';
    addHint.setAttribute('aria-hidden', 'true');
    addHint.textContent = 'Selecionar';

    foot.append(price, addHint);
    body.append(name, desc, foot);
    trigger.append(photo, body);
    card.appendChild(trigger);

    return card;
  };

  let sectionObserver = null;

  const setActiveCategory = (catId) => {
    let activePill = null;
    catPills.forEach((pill) => {
      const match = pill.dataset.cat === catId;
      pill.classList.toggle('is-active', match);
      pill.setAttribute('aria-current', match ? 'true' : 'false');
      if (match) activePill = pill;
    });

    if (activePill && catBar) {
      const barRect = catBar.getBoundingClientRect();
      const pillRect = activePill.getBoundingClientRect();
      if (pillRect.left < barRect.left || pillRect.right > barRect.right) {
        activePill.scrollIntoView({ behavior: prefersReduced() ? 'auto' : 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  };

  const setupSectionObserver = () => {
    if (sectionObserver) {
      sectionObserver.disconnect();
      sectionObserver = null;
    }

    const sectionEls = Array.from(catalogContainer.querySelectorAll('.catalog-section')).filter((el) => !el.hidden);
    if (!sectionEls.length || !('IntersectionObserver' in window)) return;

    const barHeight = catBarWrap ? Math.ceil(catBarWrap.getBoundingClientRect().height) : 64;
    sectionEls.forEach((sec) => {
      sec.style.scrollMarginTop = `${barHeight + 12}px`;
    });

    sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0 && visible[0].target.id) {
          setActiveCategory(visible[0].target.id);
        }
      },
      {
        rootMargin: `-${barHeight + 8}px 0px -65% 0px`,
        threshold: 0
      }
    );

    sectionEls.forEach((sec) => sectionObserver.observe(sec));
  };

  const renderCatalog = () => {
    catalogContainer.innerHTML = '';
    const queryNorm = normalizeText(state.searchQuery);

    if (searchClearBtn) {
      searchClearBtn.hidden = queryNorm.length === 0;
    }

    if (!queryNorm) {
      searchStatusBar.hidden = true;
      emptySearchEl.hidden = true;

      SECTIONS.forEach((sec) => {
        const sectionEl = document.createElement('section');
        sectionEl.className = 'catalog-section';
        sectionEl.id = sec.id;
        sectionEl.setAttribute('aria-labelledby', `head-${sec.id}`);

        const head = document.createElement('div');
        head.className = 'catalog-section-head';

        const title = document.createElement('h2');
        title.className = 'catalog-section-title';
        title.id = `head-${sec.id}`;
        title.textContent = sec.title;

        const note = document.createElement('span');
        note.className = 'catalog-section-note';
        note.textContent = sec.note;

        head.append(title, note);

        const grid = document.createElement('div');
        grid.className = 'dish-grid';
        sec.dishIds.forEach((id) => {
          const dish = DISH_MAP[id];
          if (dish) grid.appendChild(createDishCard(dish));
        });

        sectionEl.append(head, grid);
        catalogContainer.appendChild(sectionEl);
      });

      setupSectionObserver();
      return;
    }

    const matchedDishes = DISHES.filter((dish) => {
      const haystack = normalizeText([dish.name, dish.description, ...dish.ingredients].join(' '));
      return haystack.includes(queryNorm);
    });

    if (matchedDishes.length === 0) {
      searchStatusBar.hidden = true;
      emptySearchEl.hidden = false;
      return;
    }

    emptySearchEl.hidden = true;
    searchStatusBar.hidden = false;
    const countWord = matchedDishes.length === 1 ? '1 prato' : `${matchedDishes.length} pratos`;
    searchStatusCount.textContent = `${countWord} para “${state.searchQuery.trim()}”`;

    const resultSection = document.createElement('section');
    resultSection.className = 'catalog-section';
    const grid = document.createElement('div');
    grid.className = 'dish-grid';
    matchedDishes.forEach((dish) => grid.appendChild(createDishCard(dish)));
    resultSection.appendChild(grid);
    catalogContainer.appendChild(resultSection);
  };

  /* ---------- Carrinho e Centavos Inteiros ---------- */
  const computeSubtotalCents = () =>
    state.cart.reduce((sum, item) => {
      const dish = DISH_MAP[item.id];
      return dish ? sum + item.qty * dish.priceCents : sum;
    }, 0);

  const computeTotalQty = () => state.cart.reduce((sum, item) => sum + item.qty, 0);

  const renderCart = () => {
    const hasItems = state.cart.length > 0;
    cartEmptyEl.hidden = hasItems;
    cartItemsEl.innerHTML = '';

    state.cart.forEach((item, index) => {
      const dish = DISH_MAP[item.id];
      if (!dish) return;

      const row = document.createElement('div');
      row.className = 'cart-item';

      const top = document.createElement('div');
      top.className = 'cart-item-top';

      const info = document.createElement('div');
      const nameEl = document.createElement('p');
      nameEl.className = 'cart-item-name';
      nameEl.textContent = dish.name;

      const unitEl = document.createElement('p');
      unitEl.className = 'cart-item-unit';
      unitEl.textContent = `${formatCents(dish.priceCents)} / unidade`;

      info.append(nameEl, unitEl);

      const lineTotal = document.createElement('strong');
      lineTotal.textContent = formatCents(item.qty * dish.priceCents);

      top.append(info, lineTotal);
      row.appendChild(top);

      if (item.note) {
        const noteEl = document.createElement('p');
        noteEl.className = 'cart-item-note';
        noteEl.textContent = `Obs.: ${item.note}`;
        row.appendChild(noteEl);
      }

      const controls = document.createElement('div');
      controls.className = 'cart-item-controls';

      const stepper = document.createElement('div');
      stepper.className = 'qty-stepper';

      const minusBtn = document.createElement('button');
      minusBtn.type = 'button';
      minusBtn.className = 'qty-btn';
      minusBtn.setAttribute('aria-label', `Diminuir quantidade de ${dish.name}`);
      minusBtn.textContent = '−';
      minusBtn.addEventListener('click', () => {
        if (state.cart[index].qty > 1) {
          state.cart[index].qty -= 1;
        } else {
          state.cart.splice(index, 1);
        }
        persistState();
        renderCart();
      });

      const qtyVal = document.createElement('span');
      qtyVal.className = 'qty-value';
      qtyVal.textContent = String(item.qty);

      const plusBtn = document.createElement('button');
      plusBtn.type = 'button';
      plusBtn.className = 'qty-btn';
      plusBtn.setAttribute('aria-label', `Aumentar quantidade de ${dish.name}`);
      plusBtn.textContent = '+';
      plusBtn.addEventListener('click', () => {
        state.cart[index].qty += 1;
        persistState();
        renderCart();
      });

      stepper.append(minusBtn, qtyVal, plusBtn);

      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      removeBtn.className = 'cart-remove-btn';
      removeBtn.textContent = 'Remover';
      removeBtn.addEventListener('click', () => {
        state.cart.splice(index, 1);
        persistState();
        renderCart();
      });

      controls.append(stepper, removeBtn);
      row.appendChild(controls);
      cartItemsEl.appendChild(row);
    });

    const isEntrega = state.mode === 'entrega';
    modeRetiradaBtn.setAttribute('aria-pressed', String(!isEntrega));
    modeEntregaBtn.setAttribute('aria-pressed', String(isEntrega));
    deliveryAddressWrap.hidden = !isEntrega;
    if (deliveryAddressInput && deliveryAddressInput.value !== state.address) {
      deliveryAddressInput.value = state.address;
    }

    fulfillmentInfo.textContent = isEntrega
      ? 'Entrega pelo restaurante. Endereço e taxa a confirmar pelo WhatsApp.'
      : 'Retirada no Shopping Altair, andar G.';

    const subtotalCents = computeSubtotalCents();
    const formattedSubtotal = formatCents(subtotalCents);
    cartSubtotalEl.textContent = formattedSubtotal;
    mobileCartTotalEl.textContent = formattedSubtotal;
    mobileCartCountEl.textContent = String(computeTotalQty());

    openReviewBtn.disabled = !hasItems;
  };

  /* ---------- Gaveta mobile (<1100px) ---------- */
  const syncDrawerInert = () => {
    const isDesktop = window.innerWidth >= 1100;
    const isOpen = cartPanel.classList.contains('is-open');
    cartPanel.inert = !isDesktop && !isOpen;
  };
  syncDrawerInert();
  window.addEventListener('resize', syncDrawerInert);

  const openCartDrawer = () => {
    cartBackdrop.hidden = false;
    cartPanel.inert = false;
    cartBackdrop.classList.add('is-visible');
    cartPanel.classList.add('is-open');
    document.body.classList.add('modal-open');
    void cartPanel.offsetWidth;
    if (cartDrawerClose) cartDrawerClose.focus({ preventScroll: true });
    requestAnimationFrame(() => {
      if (cartDrawerClose && document.activeElement !== cartDrawerClose) {
        cartDrawerClose.focus({ preventScroll: true });
      }
    });
  };

  const closeCartDrawer = (restore = true) => {
    cartPanel.classList.remove('is-open');
    cartBackdrop.classList.remove('is-visible');
    syncDrawerInert();
    document.body.classList.remove('modal-open');
    const delay = prefersReduced() ? 0 : 260;
    setTimeout(() => {
      if (!cartBackdrop.classList.contains('is-visible')) {
        cartBackdrop.hidden = true;
      }
    }, delay);
    if (restore && openDrawerBtn && window.innerWidth < 1100) {
      openDrawerBtn.focus({ preventScroll: true });
    }
  };

  if (openDrawerBtn) openDrawerBtn.addEventListener('click', openCartDrawer);
  if (cartDrawerClose) cartDrawerClose.addEventListener('click', () => closeCartDrawer(true));
  if (cartBackdrop) cartBackdrop.addEventListener('click', () => closeCartDrawer(true));

  /* ---------- Animacao de abertura/fechamento de modal ---------- */
  const animateModalOpen = (overlay, dialog) => {
    overlay.hidden = false;
    document.body.classList.add('modal-open');
    if (typeof window.gsap === 'undefined' || prefersReduced()) {
      return;
    }
    window.gsap.killTweensOf([overlay, dialog]);
    window.gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.2, ease: 'power2.out' });
    if (isMobileViewport()) {
      window.gsap.fromTo(dialog, { yPercent: 100 }, { yPercent: 0, duration: 0.26, ease: 'power3.out', clearProps: 'transform' });
    } else {
      window.gsap.fromTo(dialog, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.2, ease: 'power2.out', clearProps: 'transform,opacity' });
    }
  };

  const hideModalImmediate = (overlay) => {
    overlay.hidden = true;
    document.body.classList.remove('modal-open');
    if (state.lastFocusedBeforeModal && typeof state.lastFocusedBeforeModal.focus === 'function') {
      state.lastFocusedBeforeModal.focus();
    }
    state.lastFocusedBeforeModal = null;
  };

  /* ---------- Modal de detalhe do prato ---------- */
  const openItemModal = (dishId, triggerEl) => {
    const dish = DISH_MAP[dishId];
    if (!dish) return;
    state.modalDishId = dishId;
    state.modalQty = 1;
    state.lastFocusedBeforeModal = triggerEl || document.activeElement;

    modalDishImg.src = dish.img;
    modalDishImg.alt = dish.name;
    modalDishImg.width = dish.width;
    modalDishImg.height = dish.height;
    modalDishTitle.textContent = dish.name;
    modalDishDesc.textContent = dish.description;
    modalDishPrice.textContent = `${formatCents(dish.priceCents)} / unidade`;
    modalDishNote.value = '';
    modalQtyValue.textContent = '1';

    animateModalOpen(itemModal, itemModalDialog);
    itemModalClose.focus();
  };

  const closeItemModal = () => {
    state.modalDishId = null;
    hideModalImmediate(itemModal);
  };

  modalQtyMinus.addEventListener('click', () => {
    if (state.modalQty > 1) {
      state.modalQty -= 1;
      modalQtyValue.textContent = String(state.modalQty);
    }
  });

  modalQtyPlus.addEventListener('click', () => {
    state.modalQty += 1;
    modalQtyValue.textContent = String(state.modalQty);
  });

  modalAddBtn.addEventListener('click', () => {
    if (!state.modalDishId) return;
    const note = modalDishNote.value.trim();
    const existing = state.cart.find((item) => item.id === state.modalDishId && item.note === note);
    if (existing) {
      existing.qty += state.modalQty;
    } else {
      state.cart.push({ id: state.modalDishId, qty: state.modalQty, note });
    }
    persistState();
    renderCart();
    closeItemModal();
  });

  itemModalClose.addEventListener('click', closeItemModal);
  itemModal.addEventListener('click', (e) => {
    if (e.target === itemModal) closeItemModal();
  });

  /* ---------- Modal de revisao e resumo WhatsApp ---------- */
  const buildWhatsappMessage = () => {
    const lines = ['Olá! Gostaria de confirmar um pedido ilustrativo no Restaurante Mauricio’s:', ''];
    state.cart.forEach((item) => {
      const dish = DISH_MAP[item.id];
      if (!dish) return;
      lines.push(`• ${item.qty}x ${dish.name} (${formatCents(dish.priceCents)}/un.) = ${formatCents(item.qty * dish.priceCents)}`);
      if (item.note) {
        lines.push(`  Observação: ${item.note}`);
      }
    });
    lines.push('');
    if (state.mode === 'entrega') {
      const addr = state.address.trim() || 'Endereço a informar pelo WhatsApp';
      lines.push(`Modalidade: Entrega (${addr})`);
      lines.push('Taxa de entrega: a confirmar com a casa');
    } else {
      lines.push('Modalidade: Retirada no Shopping Altair, andar G');
    }
    lines.push(`Subtotal ilustrativo: ${formatCents(computeSubtotalCents())}`);
    return lines.join('\n');
  };

  const openReviewModal = () => {
    if (state.cart.length === 0) return;
    closeCartDrawer(false);
    state.lastFocusedBeforeModal = openReviewBtn;

    reviewItemsList.innerHTML = '';
    state.cart.forEach((item) => {
      const dish = DISH_MAP[item.id];
      if (!dish) return;

      const row = document.createElement('div');
      row.className = 'review-row';

      const left = document.createElement('div');
      const title = document.createElement('span');
      title.textContent = `${item.qty}× ${dish.name} (${formatCents(dish.priceCents)} / un.)`;
      left.appendChild(title);

      if (item.note) {
        const noteSpan = document.createElement('span');
        noteSpan.className = 'review-row-note';
        noteSpan.textContent = `Observação: ${item.note}`;
        left.appendChild(noteSpan);
      }

      const right = document.createElement('strong');
      right.textContent = formatCents(item.qty * dish.priceCents);

      row.append(left, right);
      reviewItemsList.appendChild(row);
    });

    if (state.mode === 'entrega') {
      const addr = state.address.trim();
      reviewModeSummary.textContent = addr
        ? `Entrega · ${addr} · Taxa a confirmar pelo WhatsApp.`
        : 'Entrega · Endereço e taxa a confirmar pelo WhatsApp.';
    } else {
      reviewModeSummary.textContent = 'Retirada no Shopping Altair, andar G.';
    }

    reviewSubtotalEl.textContent = formatCents(computeSubtotalCents());
    const message = buildWhatsappMessage();
    reviewPreviewText.textContent = message;
    reviewWhatsappLink.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    animateModalOpen(reviewModal, reviewModalDialog);
    reviewModalClose.focus();
  };

  const closeReviewModal = () => {
    hideModalImmediate(reviewModal);
  };

  openReviewBtn.addEventListener('click', openReviewModal);
  reviewModalClose.addEventListener('click', closeReviewModal);
  reviewModal.addEventListener('click', (e) => {
    if (e.target === reviewModal) closeReviewModal();
  });

  /* ---------- Eventos de busca, modalidade e teclado ---------- */
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      renderCatalog();
    });
  }

  const clearSearch = () => {
    state.searchQuery = '';
    if (searchInput) {
      searchInput.value = '';
      searchInput.focus();
    }
    renderCatalog();
  };

  if (searchClearBtn) searchClearBtn.addEventListener('click', clearSearch);
  if (emptySearchClearBtn) emptySearchClearBtn.addEventListener('click', clearSearch);

  modeRetiradaBtn.addEventListener('click', () => {
    state.mode = 'retirada';
    persistState();
    renderCart();
  });

  modeEntregaBtn.addEventListener('click', () => {
    state.mode = 'entrega';
    persistState();
    renderCart();
    if (deliveryAddressInput) deliveryAddressInput.focus();
  });

  if (deliveryAddressInput) {
    deliveryAddressInput.addEventListener('input', (e) => {
      state.address = e.target.value;
      persistState();
    });
  }

  catPills.forEach((pill) => {
    pill.addEventListener('click', (e) => {
      const catId = pill.dataset.cat;
      if (state.searchQuery.trim()) {
        state.searchQuery = '';
        if (searchInput) searchInput.value = '';
        renderCatalog();
      }
      const targetSec = document.getElementById(catId);
      if (targetSec) {
        e.preventDefault();
        setActiveCategory(catId);
        targetSec.scrollIntoView({ behavior: prefersReduced() ? 'auto' : 'smooth', block: 'start' });
        history.replaceState(null, '', `#${catId}`);
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (!reviewModal.hidden) {
      closeReviewModal();
    } else if (!itemModal.hidden) {
      closeItemModal();
    } else if (cartPanel.classList.contains('is-open')) {
      closeCartDrawer(true);
    }
  });

  /* ---------- Inicializacao ---------- */
  renderCatalog();
  renderCart();

  if (window.location.hash) {
    const targetId = window.location.hash.slice(1);
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      setTimeout(() => {
        setActiveCategory(targetId);
        targetEl.scrollIntoView({ behavior: 'auto', block: 'start' });
      }, 60);
    }
  }
})();
