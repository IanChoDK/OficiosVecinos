/**
 * OficiosVecinos - Lógica Reactiva SPA y Persistencia Local-First (Gentle-AI)
 * Implementa: Router Hash (13 Vistas), 5 Estados de Componentes, Accesibilidad WCAG AA,
 * Adaptación Territorial Integral a Río Cuarto, Córdoba, Modales con Focus Trap,
 * Calificación Barrial de 1 Toque, Chat con Presupuesto, Gestión de Suscripción PRO,
 * Publicación de Servicios y Edición de Perfil "Mis Datos".
 */

(function () {
  'use strict';

  // ========================================================================
  // 1. DATOS SEMILLA (Seed Data) - Adaptados a Río Cuarto, Córdoba
  // ========================================================================

  const SEED_PROFESSIONALS = [
    {
      id: 'roberto-gomez',
      name: 'Roberto Gómez',
      category: 'Plomería',
      categoryFull: 'Plomería y Gas Natural',
      zone: 'Centro',
      rating: 4.9,
      reviewsCount: 128,
      verified: true,
      matricula: 'Mat. 4812 (Ecogas / EMOS Río Cuarto)',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=160&auto=format&fit=crop&q=80',
      cover: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=800&auto=format&fit=crop&q=80',
      phone: '+5493584445555',
      bio: 'Técnico matriculado con más de 20 años en Centro y Banda Norte, Río Cuarto. Reparación de pérdidas de agua, destapes, colocación de griferías, calefones y termotanques. Presupuesto sin cargo en el barrio.',
      priceRef: 'Presupuesto sin cargo en el barrio'
    },
    {
      id: 'carlos-perez',
      name: 'Carlos Pérez',
      category: 'Electricidad',
      categoryFull: 'Electricidad Domiciliaria e Industrial',
      zone: 'Banda Norte',
      rating: 4.8,
      reviewsCount: 94,
      verified: true,
      matricula: 'Mat. ERSeP 12490 (Córdoba)',
      avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=160&auto=format&fit=crop&q=80',
      cover: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&auto=format&fit=crop&q=80',
      phone: '+5493586667777',
      bio: 'Especialista en cortocircuitos, cambio de térmicas, disyuntores y cableados completos. Atención de urgencias 24 hs en Río Cuarto.',
      priceRef: 'Visita de diagnóstico desde $8.000'
    },
    {
      id: 'mariana-silva',
      name: 'Mariana Silva',
      category: 'Pintura',
      categoryFull: 'Pintura de Interiores y Fachadas',
      zone: 'Alberdi',
      rating: 5.0,
      reviewsCount: 62,
      verified: true,
      matricula: 'Técnica en Acabados y Restauración',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80',
      cover: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&auto=format&fit=crop&q=80',
      phone: '+5493588889999',
      bio: 'Pintura látex, impermeabilizaciones, arreglos de humedad y enduido. Trabajo prolijo, limpio y con materiales de primera línea en Río Cuarto.',
      priceRef: 'Cotización por metro cuadrado'
    },
    {
      id: 'juan-davalos',
      name: 'Juan Dávalos',
      category: 'Cerrajería',
      categoryFull: 'Cerrajería de Urgencias 24 Horas',
      zone: 'Castelli',
      rating: 4.7,
      reviewsCount: 110,
      verified: true,
      matricula: 'Cerrajería Habilitada Río Cuarto',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80',
      cover: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&auto=format&fit=crop&q=80',
      phone: '+5493583334444',
      bio: 'Apertura de puertas sin romper, cambio de cerraduras, llaves codificadas y blindadas en Río Cuarto. Llego en menos de 25 minutos.',
      priceRef: 'Aperturas de urgencia acordadas'
    },
    {
      id: 'jorge-romero',
      name: 'Jorge Romero',
      category: 'Carpintería',
      categoryFull: 'Carpintería de Madera y Muebles',
      zone: 'Las Ferias',
      rating: 4.9,
      reviewsCount: 45,
      verified: true,
      matricula: 'Artesano Maderero Certificado Río Cuarto',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&auto=format&fit=crop&q=80',
      cover: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=800&auto=format&fit=crop&q=80',
      phone: '+5493582221111',
      bio: 'Reparación de aberturas, puertas placa, bajomesadas, mesas y fabricación de muebles a medida en Río Cuarto. Maderas macizas y recicladas.',
      priceRef: 'Presupuesto a domicilio'
    },
    {
      id: 'lucia-benitez',
      name: 'Lucía Benítez',
      category: 'Gas',
      categoryFull: 'Instalaciones y Calefacción de Gas',
      zone: 'Bimaco',
      rating: 4.9,
      reviewsCount: 78,
      verified: true,
      matricula: 'Mat. 1ra Categoría Ecogas Río Cuarto',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&auto=format&fit=crop&q=80',
      cover: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&auto=format&fit=crop&q=80',
      phone: '+5493587778888',
      bio: 'Pruebas de hermeticidad con manómetro, colocación de estufas tiro balanceado, cocinas y trámites ante Ecogas Río Cuarto.',
      priceRef: 'Revisión técnica de seguridad'
    }
  ];

  const DEFAULT_PROVIDER_SERVICES = [
    {
      id: 'srv-1',
      title: 'Electricista',
      category: 'Electricidad',
      tag: 'Oficio',
      tagClass: 'text-amber-300 bg-white/20',
      icon: 'fa-bolt',
      iconClass: 'text-amber-300',
      stars: '★★★★★',
      price: '$12.000',
      description: 'Detección de cortocircuitos, recableado, térmicas y disyuntores.',
      zone: 'Banda Norte y Centro'
    },
    {
      id: 'srv-2',
      title: 'Plomería',
      category: 'Plomería',
      tag: 'Urgencias',
      tagClass: 'text-sky-200 bg-white/20',
      icon: 'fa-faucet-drip',
      iconClass: 'text-sky-200',
      stars: '★★★★★',
      price: '$15.000',
      description: 'Reparación de pérdidas de agua, destapes y griferías en el día.',
      zone: 'Centro y Alberdi'
    },
    {
      id: 'srv-3',
      title: 'Carpintería',
      category: 'Carpintería',
      tag: 'Taller',
      tagClass: 'text-emerald-200 bg-white/20',
      icon: 'fa-hammer',
      iconClass: 'text-emerald-200',
      stars: '★★★★★',
      price: '$18.000',
      description: 'Reparación de aberturas, bajomesadas y muebles a medida.',
      zone: 'Banda Norte y Castelli'
    },
    {
      id: 'srv-4',
      title: 'Sodero',
      category: 'Reparto',
      tag: 'Reparto',
      tagClass: 'text-purple-200 bg-white/20',
      icon: 'fa-bottle-water',
      iconClass: 'text-purple-200',
      stars: '★★★★★',
      price: '$3.500',
      description: 'Reparto barrial semanal de sifones y bidones retornables.',
      zone: 'Río Cuarto y alrededores'
    }
  ];

  const CATEGORIES = [
    { name: 'Todos', icon: 'fa-layer-group' },
    { name: 'Plomería', icon: 'fa-faucet-drip' },
    { name: 'Electricidad', icon: 'fa-bolt' },
    { name: 'Gas', icon: 'fa-fire-burner' },
    { name: 'Cerrajería', icon: 'fa-key' },
    { name: 'Pintura', icon: 'fa-paint-roller' },
    { name: 'Carpintería', icon: 'fa-hammer' }
  ];

  // ========================================================================
  // 2. ESTADO DE LA APLICACIÓN & PERSISTENCIA LOCAL-FIRST
  // ========================================================================

  const state = {
    currentRole: localStorage.getItem('oficios_role') || 'cliente',
    accessibleText: localStorage.getItem('oficios_accessible_text') === 'true',
    activeCategory: 'Todos',
    activeBarrio: 'Todos',
    searchTerm: '',
    selectedProfessional: SEED_PROFESSIONALS[0],
    selectedSolicitud: null,
    activeRating: 5,
    lastFocusedElement: null,
    billingPlan: 'monthly',
    isProSubscribed: localStorage.getItem('oficios_is_pro') === 'true',
    userData: JSON.parse(localStorage.getItem('oficios_user_data')) || {
      name: 'Marta Vecina',
      email: 'marta.vecina@email.com',
      phone: '358 456-7890',
      address: 'Sobremonte 450, Centro, Río Cuarto'
    },
    providerData: JSON.parse(localStorage.getItem('oficios_provider_data')) || {
      name: 'Carlos Pérez',
      email: 'carlos.perez.electricidad@email.com',
      phone: '358 666-7777',
      address: 'Marcelo T. de Alvear 750, Banda Norte, Río Cuarto'
    },
    providerServices: JSON.parse(localStorage.getItem('oficios_provider_services')) || DEFAULT_PROVIDER_SERVICES,
    requests: JSON.parse(localStorage.getItem('oficios_requests')) || [
      {
        id: 'REQ-101',
        profId: 'roberto-gomez',
        profName: 'Roberto Gómez',
        rubro: 'Plomería y Gas',
        problem: 'Pérdida de agua bajo la bacha de la cocina',
        address: 'Sobremonte 450, Centro, Río Cuarto',
        status: 'Aceptada',
        date: 'Hoy, 10:40 AM',
        budget: '$15.000 ARS',
        budgetAccepted: true
      }
    ]
  };

  // ========================================================================
  // 3. ROUTER SPA (Control de 13 Vistas por Hash)
  // ========================================================================

  const views = {
    home: document.getElementById('view-home'),
    'home-prestador': document.getElementById('view-home-prestador'),
    explorar: document.getElementById('view-explorar'),
    profesional: document.getElementById('view-profesional'),
    contratar: document.getElementById('view-contratar'),
    chat: document.getElementById('view-chat'),
    calificar: document.getElementById('view-calificar'),
    perfil: document.getElementById('view-perfil'),
    'mis-datos': document.getElementById('view-mis-datos'),
    'detalle-solicitud': document.getElementById('view-detalle-solicitud'),
    prestador: document.getElementById('view-prestador'),
    'prestador-crear-servicio': document.getElementById('view-prestador-crear-servicio'),
    'prestador-servicios': document.getElementById('view-prestador-servicios'),
    'prestador-suscripcion': document.getElementById('view-prestador-suscripcion')
  };

  function navigateTo(route) {
    const cleanRoute = (route || 'home').replace(/^#/, '');
    const targetRoute = views[cleanRoute] ? cleanRoute : 'home';

    // Ocultar todas las vistas
    Object.values(views).forEach(v => {
      if (v) v.classList.add('hidden');
    });

    // Mostrar la vista activa
    if (views[targetRoute]) {
      views[targetRoute].classList.remove('hidden');
      window.scrollTo(0, 0);
    }

    // Actualizar barra de navegación inferior
    document.querySelectorAll('.bottom-nav-item').forEach(item => {
      const itemTarget = item.getAttribute('data-target');
      const isHomeActive = (targetRoute === 'home' || targetRoute === 'home-prestador');
      const isSearchActive = (targetRoute === 'explorar' || targetRoute === 'profesional' || targetRoute === 'contratar');
      const isProfileActive = (targetRoute === 'perfil' || targetRoute === 'mis-datos' || targetRoute === 'detalle-solicitud' || targetRoute.startsWith('prestador'));

      if (
        itemTarget === targetRoute ||
        (itemTarget === 'home' && isHomeActive) ||
        (itemTarget === 'explorar' && isSearchActive) ||
        (itemTarget === 'perfil' && isProfileActive)
      ) {
        item.classList.add('text-[#1764AE]', 'font-bold');
        item.classList.remove('text-slate-600');
      } else {
        item.classList.remove('text-[#1764AE]', 'font-bold');
        item.classList.add('text-slate-600');
      }
    });

    // Cargas contextuales por vista
    if (targetRoute === 'mis-datos') {
      populateMisDatosForm();
    } else if (targetRoute === 'prestador-servicios') {
      renderProviderServices();
    } else if (targetRoute === 'detalle-solicitud') {
      updateSolicitudDetailView();
    }

    // Accesibilidad: dar foco al contenedor principal
    const mainContent = document.getElementById('main-content');
    if (mainContent) mainContent.focus();
  }

  window.addEventListener('hashchange', () => {
    navigateTo(window.location.hash);
  });

  // ========================================================================
  // 4. RENDERIZADO DE COMPONENTES UI
  // ========================================================================

  // Carrusel continuo de Inicio
  function renderFeaturedCarousel() {
    const container = document.getElementById('featured-carousel');
    if (!container) return;

    container.innerHTML = SEED_PROFESSIONALS.slice(0, 4).map(p => `
      <article class="card-clickable w-64 flex flex-col justify-between shrink-0" role="article" aria-label="Tarjeta de ${p.name}, ${p.category}">
        <div>
          <div class="flex items-center gap-2.5 mb-2.5">
            <img src="${p.avatar}" alt="Foto de ${p.name}" class="w-12 h-12 rounded-xl object-cover border border-slate-200">
            <div class="min-w-0">
              <h3 class="text-sm font-bold text-[#00112B] truncate">${p.name}</h3>
              <p class="text-xs font-semibold text-[#1764AE] truncate">${p.category}</p>
              <div class="flex items-center gap-1 text-[11px] text-amber-600 font-bold">
                <i class="fa-solid fa-star"></i>
                <span>${p.rating}</span>
                <span class="text-slate-400 font-normal">(${p.reviewsCount})</span>
              </div>
            </div>
          </div>
          <p class="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
            ${p.bio}
          </p>
        </div>
        <div class="pt-2 border-t border-slate-100 flex items-center justify-between">
          <span class="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
            <i class="fa-solid fa-location-dot text-slate-400 mr-0.5"></i>${p.zone}
          </span>
          <button type="button" class="btn-primary text-xs py-2 px-3 min-h-[40px] select-prof-btn" data-id="${p.id}" aria-label="Ver perfil completo de ${p.name}">
            <span>Ver perfil</span>
            <i class="fa-solid fa-arrow-right text-[10px]"></i>
          </button>
        </div>
      </article>
    `).join('');

    bindProfessionalSelectButtons();
  }

  // Barra de Pills de Categorías (Explorar)
  function renderCategoryPills() {
    const container = document.getElementById('category-pills-bar');
    if (!container) return;

    container.innerHTML = CATEGORIES.map(cat => {
      const isActive = state.activeCategory === cat.name;
      return `
        <button type="button" class="category-pill-btn shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold transition-all min-h-[44px] ${
          isActive 
            ? 'bg-[#1764AE] text-white shadow-sm' 
            : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
        }" data-category="${cat.name}" aria-pressed="${isActive}">
          <i class="fa-solid ${cat.icon} text-xs"></i>
          <span>${cat.name}</span>
        </button>
      `;
    }).join('');

    container.querySelectorAll('.category-pill-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        state.activeCategory = btn.getAttribute('data-category');
        renderCategoryPills();
        renderFilteredProfessionals();
      });
    });
  }

  // Listado de Profesionales en el Feed de Río Cuarto
  function renderFilteredProfessionals() {
    const container = document.getElementById('professionals-feed-list');
    if (!container) return;

    const term = state.searchTerm.toLowerCase().trim();
    const filtered = SEED_PROFESSIONALS.filter(p => {
      const matchesCategory = state.activeCategory === 'Todos' || p.category === state.activeCategory;
      const matchesBarrio = state.activeBarrio === 'Todos' || p.zone.toLowerCase().includes(state.activeBarrio.toLowerCase());
      const matchesSearch = !term || 
        p.name.toLowerCase().includes(term) || 
        p.categoryFull.toLowerCase().includes(term) || 
        p.bio.toLowerCase().includes(term) ||
        p.zone.toLowerCase().includes(term);
      return matchesCategory && matchesBarrio && matchesSearch;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="bg-white rounded-2xl p-6 text-center border border-slate-200 shadow-xs">
          <div class="w-12 h-12 rounded-full bg-blue-50 text-[#1764AE] flex items-center justify-center text-xl mx-auto mb-2">
            <i class="fa-solid fa-magnifying-glass"></i>
          </div>
          <p class="text-sm font-bold text-[#00112B] mb-1">
            Todavía no hay trabajadores registrados en este rubro para ${state.activeBarrio}.
          </p>
          <p class="text-xs text-slate-500 mb-4">
            ¡Avisale a tu trabajador de confianza para que se sume a la red barrial de Río Cuarto!
          </p>
          <button type="button" id="btn-reset-filters" class="btn-secondary text-xs py-2 px-4">
            Ver todos los oficios disponibles
          </button>
        </div>
      `;
      const resetBtn = document.getElementById('btn-reset-filters');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          state.activeCategory = 'Todos';
          state.activeBarrio = 'Todos';
          state.searchTerm = '';
          const searchInput = document.getElementById('feed-search-input');
          if (searchInput) searchInput.value = '';
          const selectBarrio = document.getElementById('select-barrio');
          if (selectBarrio) selectBarrio.value = 'Todos';
          renderCategoryPills();
          renderFilteredProfessionals();
        });
      }
      return;
    }

    container.innerHTML = filtered.map(p => `
      <article class="card-clickable flex flex-col gap-2.5" role="article" aria-label="Profesional ${p.name}, ${p.category}">
        <div class="flex items-start justify-between gap-3">
          <div class="flex items-center gap-3">
            <img src="${p.avatar}" alt="Foto de ${p.name}" class="w-14 h-14 rounded-2xl object-cover border-2 border-slate-100 shadow-xs">
            <div>
              <div class="flex items-center gap-1.5">
                <h3 class="text-base font-bold text-[#00112B] font-mono leading-tight">${p.name}</h3>
                ${p.verified ? '<i class="fa-solid fa-circle-check text-[#1764AE] text-xs" title="Verificado"></i>' : ''}
              </div>
              <p class="text-xs font-semibold text-[#1764AE]">${p.categoryFull}</p>
              <div class="flex items-center gap-2 mt-0.5 text-xs text-slate-600">
                <span class="text-amber-500 font-bold flex items-center gap-0.5">
                  <i class="fa-solid fa-star"></i> ${p.rating}
                </span>
                <span>•</span>
                <span>${p.reviewsCount} trabajos</span>
              </div>
            </div>
          </div>
          <span class="text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full shrink-0">
            ${p.zone}
          </span>
        </div>

        <p class="text-xs text-slate-700 leading-relaxed line-clamp-2">
          ${p.bio}
        </p>

        <div class="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
          <span class="text-xs font-medium text-slate-500 truncate">
            <i class="fa-solid fa-tag text-slate-400 mr-1"></i>${p.priceRef}
          </span>
          <button type="button" class="btn-primary text-xs py-2 px-3.5 select-prof-btn" data-id="${p.id}" aria-label="Ver detalles de ${p.name}">
            <span>Contactar</span>
            <i class="fa-solid fa-chevron-right text-[10px]"></i>
          </button>
        </div>
      </article>
    `).join('');

    bindProfessionalSelectButtons();
  }

  // Conexión de botones "Ver Perfil / Contactar"
  function bindProfessionalSelectButtons() {
    document.querySelectorAll('.select-prof-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const profId = btn.getAttribute('data-id');
        const found = SEED_PROFESSIONALS.find(p => p.id === profId);
        if (found) {
          state.selectedProfessional = found;
          updateProfessionalDetailView(found);
          window.location.hash = '#profesional';
        }
      });
    });
  }

  // Actualización de la Ficha Técnica del Profesional
  function updateProfessionalDetailView(prof) {
    const profNameElem = document.getElementById('prof-name');
    if (profNameElem) profNameElem.textContent = prof.name;

    const profCatElem = document.getElementById('prof-category');
    if (profCatElem) profCatElem.textContent = prof.categoryFull;

    const profRatingElem = document.getElementById('prof-rating');
    if (profRatingElem) profRatingElem.textContent = prof.rating;

    const profBioElem = document.getElementById('prof-bio');
    if (profBioElem) profBioElem.textContent = prof.bio;

    const profAvatarImg = document.getElementById('prof-avatar-img');
    if (profAvatarImg) {
      profAvatarImg.src = prof.avatar;
      profAvatarImg.alt = `Foto de ${prof.name}`;
    }

    const profCoverImg = document.getElementById('prof-cover-img');
    if (profCoverImg) profCoverImg.src = prof.cover;

    const profPhoneLink = document.getElementById('prof-phone-link');
    if (profPhoneLink) profPhoneLink.href = `tel:${prof.phone}`;

    const profZoneBadge = document.getElementById('prof-zone-badge');
    if (profZoneBadge) profZoneBadge.textContent = `${prof.zone}, Río Cuarto`;

    const profMatBadge = document.getElementById('prof-mat-badge');
    if (profMatBadge) profMatBadge.textContent = prof.matricula;

    // Actualizar también en el formulario de contratación
    const formProfName = document.getElementById('form-prof-name');
    if (formProfName) formProfName.textContent = prof.name;

    const formProfRubro = document.getElementById('form-prof-rubro');
    if (formProfRubro) formProfRubro.textContent = prof.categoryFull;

    const formProfAvatar = document.getElementById('form-prof-avatar');
    if (formProfAvatar) formProfAvatar.src = prof.avatar;
  }

  // Renderizado de Solicitudes del Usuario (en Mi Perfil)
  function renderUserRequests() {
    const container = document.getElementById('user-requests-list');
    if (!container) return;

    if (state.requests.length === 0) {
      container.innerHTML = `
        <p class="text-xs text-slate-500 italic p-3 bg-white rounded-xl border border-slate-200">
          No tenés solicitudes activas en este momento.
        </p>
      `;
      return;
    }

    container.innerHTML = state.requests.map(req => `
      <article class="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex flex-col gap-1.5" role="article">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-[#1764AE]">${req.rubro}</span>
          <span class="text-[11px] font-bold px-2 py-0.5 rounded-full ${
            req.status === 'Aceptada' 
              ? 'bg-emerald-100 text-emerald-800' 
              : 'bg-amber-100 text-amber-800'
          }">${req.status}</span>
        </div>
        <h3 class="text-sm font-bold text-[#00112B]">${req.profName}</h3>
        <p class="text-xs text-slate-600 line-clamp-1">${req.problem}</p>
        <div class="pt-2 mt-1 border-t border-slate-100 flex items-center justify-between text-xs">
          <span class="text-slate-400">${req.date}</span>
          <div class="flex items-center gap-3">
            <button type="button" class="btn-view-solicitud font-bold text-[#1764AE] hover:underline flex items-center gap-1" data-id="${req.id}">
              <i class="fa-solid fa-eye"></i> Detalle
            </button>
            <a href="#chat" class="font-bold text-[#1764AE] hover:underline flex items-center gap-1">
              <i class="fa-regular fa-comment-dots"></i> Chat
            </a>
          </div>
        </div>
      </article>
    `).join('');

    container.querySelectorAll('.btn-view-solicitud').forEach(btn => {
      btn.addEventListener('click', () => {
        const reqId = btn.getAttribute('data-id');
        const found = state.requests.find(r => r.id === reqId);
        if (found) {
          state.selectedSolicitud = found;
          updateSolicitudDetailView(found);
          window.location.hash = '#detalle-solicitud';
        }
      });
    });
  }

  // Renderizado de Servicios Publicados del Prestador (Carlos)
  function renderProviderServices() {
    const grid = document.getElementById('provider-services-grid');
    if (!grid) return;

    grid.innerHTML = state.providerServices.map(srv => `
      <article class="card-service-dark">
        <div>
          <div class="flex items-center justify-between mb-1">
            <span class="text-[10px] font-bold uppercase tracking-wider ${srv.tagClass || 'bg-white/20 text-sky-200'} px-1.5 py-0.5 rounded">${srv.tag || srv.category}</span>
            <i class="fa-solid ${srv.icon || 'fa-toolbox'} text-xs ${srv.iconClass || 'text-sky-200'}"></i>
          </div>
          <h3 class="font-bold text-sm tracking-tight text-white mb-1">${escapeHtml(srv.title)}</h3>
          <div class="flex items-center text-amber-400 text-xs mb-1" title="5 de 5 estrellas">
            ${srv.stars || '★★★★★'}
          </div>
          <p class="text-[11px] text-slate-300 font-semibold mb-1">${srv.price || '$12.000'}</p>
        </div>
        <button type="button" class="btn-service-detail inline-flex items-center text-xs font-bold text-sky-200 hover:text-white mt-2 text-left" data-id="${srv.id}">
          <span>Detalle</span>
          <i class="fa-solid fa-arrow-right text-[10px] ml-1"></i>
        </button>
      </article>
    `).join('');

    grid.querySelectorAll('.btn-service-detail').forEach(btn => {
      btn.addEventListener('click', () => {
        const srvId = btn.getAttribute('data-id');
        const found = state.providerServices.find(s => s.id === srvId);
        if (found) {
          state.selectedSolicitud = {
            id: found.id,
            profName: 'Carlos Pérez (Oficio)',
            rubro: found.category,
            problem: found.description || found.title,
            address: 'Banda Norte y Centro, Río Cuarto',
            status: 'Publicado',
            budget: found.price || 'A convenir',
            avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=160&auto=format&fit=crop&q=80'
          };
          updateSolicitudDetailView(state.selectedSolicitud);
          window.location.hash = '#detalle-solicitud';
        }
      });
    });

    const btnMisServicios = document.getElementById('btn-mis-servicios');
    if (btnMisServicios) {
      btnMisServicios.querySelector('span').textContent = `Mis servicios publicados (${state.providerServices.length})`;
    }
  }

  // Actualización de la Vista de Detalle de Solicitud / Servicio
  function updateSolicitudDetailView(item) {
    const target = item || state.selectedSolicitud || state.requests[0];
    if (!target) return;

    const codeBadge = document.getElementById('solicitud-code-badge');
    if (codeBadge) codeBadge.textContent = `PEDIDO: ${target.rubro || 'Oficio'} - ${target.profName}`;

    const nameElem = document.getElementById('solicitud-name');
    if (nameElem) nameElem.textContent = target.profName;

    const addrElem = document.getElementById('solicitud-address');
    if (addrElem) addrElem.textContent = target.address || 'Sobremonte 450, Centro, Río Cuarto';

    const statusBadge = document.getElementById('solicitud-status-badge');
    if (statusBadge) {
      statusBadge.textContent = (target.status || 'ACEPTADA').toUpperCase();
      if (target.status === 'Enviada') {
        statusBadge.className = 'inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider bg-amber-100 text-amber-800 uppercase shadow-2xs';
      } else {
        statusBadge.className = 'inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider bg-emerald-100 text-emerald-800 uppercase shadow-2xs';
      }
    }

    const descElem = document.getElementById('solicitud-desc-text');
    if (descElem) {
      descElem.textContent = target.problem 
        ? `Trabajo solicitado: ${target.problem}. Presupuesto estimado: ${target.budget || '$15.000 ARS'}.`
        : 'El profesional ha aceptado tu solicitud de servicio. Ya podés coordinar los detalles finales por mensaje directo o llamarlo por teléfono.';
    }

    const avatarElem = document.getElementById('solicitud-avatar');
    if (avatarElem && target.avatar) {
      avatarElem.src = target.avatar;
    }
  }

  // Poblar formulario de "Mis Datos"
  function populateMisDatosForm() {
    const isPrestador = state.currentRole === 'prestador';
    const currentData = isPrestador ? state.providerData : state.userData;

    const inputNombre = document.getElementById('input-edit-nombre');
    const inputEmail = document.getElementById('input-edit-email');
    const inputTelefono = document.getElementById('input-edit-telefono');
    const inputDireccion = document.getElementById('input-edit-direccion');

    if (inputNombre) inputNombre.value = currentData.name;
    if (inputEmail) inputEmail.value = currentData.email;
    if (inputTelefono) inputTelefono.value = currentData.phone;
    if (inputDireccion) inputDireccion.value = currentData.address;
  }

  // ========================================================================
  // 5. ACCESIBILIDAD, MODALES & NOTIFICACIONES (WCAG AA)
  // ========================================================================

  function showToast(message) {
    const toast = document.getElementById('toast');
    const toastText = document.getElementById('toast-text');
    if (!toast || !toastText) return;

    toastText.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }

  function openModal(modalId, triggerElement) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    state.lastFocusedElement = triggerElement || document.activeElement;
    modal.classList.add('active');

    const focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusable.length > 0) {
      focusable[0].focus();
    }
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('active');
    if (state.lastFocusedElement) {
      state.lastFocusedElement.focus();
    }
  }

  // Configuración de eventos de cierre de modales
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal(overlay);
    });

    const closeBtns = overlay.querySelectorAll('.btn-close-modal');
    closeBtns.forEach(btn => {
      btn.addEventListener('click', () => closeModal(overlay));
    });
  });

  // Atrapamiento de foco y tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const activeModal = document.querySelector('.modal-overlay.active');
      if (activeModal) closeModal(activeModal);
    }
  });

  // ========================================================================
  // 6. FORMULARIOS Y GESTIÓN DE DATOS
  // ========================================================================

  function setupFormValidations() {
    // 6.1 Contratación de Servicio
    const problemInput = document.getElementById('input-problem');
    const addressInput = document.getElementById('input-address');
    const phoneInput = document.getElementById('input-phone');
    const hireForm = document.getElementById('hire-service-form');

    function validateField(input, errorElementId, validatorFn, errorMessage) {
      const errorElem = document.getElementById(errorElementId);
      if (!errorElem) return true;

      const isValid = validatorFn(input.value.trim());
      if (!isValid) {
        input.classList.add('is-invalid');
        input.setAttribute('aria-invalid', 'true');
        errorElem.textContent = errorMessage;
        return false;
      } else {
        input.classList.remove('is-invalid');
        input.removeAttribute('aria-invalid');
        errorElem.textContent = '';
        return true;
      }
    }

    if (problemInput) {
      problemInput.addEventListener('blur', () => {
        validateField(
          problemInput,
          'problem-error',
          val => val.length >= 8,
          'Por favor contanos brevemente qué problema tenés (mínimo 8 caracteres).'
        );
      });
    }

    if (addressInput) {
      addressInput.addEventListener('blur', () => {
        validateField(
          addressInput,
          'address-error',
          val => val.length >= 5,
          'Por favor ingresá tu dirección en Río Cuarto para coordinar la visita.'
        );
      });
    }

    if (phoneInput) {
      phoneInput.addEventListener('blur', () => {
        validateField(
          phoneInput,
          'phone-error',
          val => val.length >= 7,
          'Ingresá un teléfono de contacto válido (ej: 358 456-7890).'
        );
      });
    }

    if (hireForm) {
      hireForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const v1 = validateField(problemInput, 'problem-error', val => val.length >= 8, 'Por favor contanos brevemente qué problema tenés.');
        const v2 = validateField(addressInput, 'address-error', val => val.length >= 5, 'Por favor ingresá tu dirección en Río Cuarto.');
        const v3 = validateField(phoneInput, 'phone-error', val => val.length >= 7, 'Ingresá un teléfono válido.');

        if (!v1 || !v2 || !v3) return;

        const paymentSelect = document.getElementById('select-payment-method');
        const newReq = {
          id: `REQ-${Date.now().toString().slice(-4)}`,
          profId: state.selectedProfessional.id,
          profName: state.selectedProfessional.name,
          rubro: state.selectedProfessional.categoryFull,
          problem: problemInput.value.trim(),
          address: addressInput.value.trim(),
          paymentMethod: paymentSelect ? paymentSelect.value : 'Mercado Pago',
          status: 'Enviada',
          date: 'Recién',
          budget: 'A coordinar',
          budgetAccepted: false,
          avatar: state.selectedProfessional.avatar
        };

        state.requests.unshift(newReq);
        localStorage.setItem('oficios_requests', JSON.stringify(state.requests));
        renderUserRequests();

        const modalDesc = document.getElementById('modal-success-desc');
        if (modalDesc) {
          modalDesc.textContent = `Le enviamos tu pedido en Río Cuarto a ${state.selectedProfessional.name}. Te responderá en breve por mensaje.`;
        }
        openModal('modal-success', document.getElementById('btn-submit-hire'));
      });
    }

    // 6.2 Edición de Mis Datos Personales
    const editUserDataForm = document.getElementById('edit-user-data-form');
    if (editUserDataForm) {
      editUserDataForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const inputNombre = document.getElementById('input-edit-nombre');
        const inputEmail = document.getElementById('input-edit-email');
        const inputTelefono = document.getElementById('input-edit-telefono');
        const inputDireccion = document.getElementById('input-edit-direccion');

        const isPrestador = state.currentRole === 'prestador';
        const updated = {
          name: inputNombre ? inputNombre.value.trim() : '',
          email: inputEmail ? inputEmail.value.trim() : '',
          phone: inputTelefono ? inputTelefono.value.trim() : '',
          address: inputDireccion ? inputDireccion.value.trim() : ''
        };

        if (isPrestador) {
          state.providerData = updated;
          localStorage.setItem('oficios_provider_data', JSON.stringify(updated));
        } else {
          state.userData = updated;
          localStorage.setItem('oficios_user_data', JSON.stringify(updated));
        }

        // Actualizar displays
        const profileName = document.getElementById('profile-name-display');
        if (profileName) profileName.textContent = updated.name;

        const profileZone = document.getElementById('profile-zone-display');
        if (profileZone) profileZone.textContent = `${updated.address} • Vecino verificado`;

        showToast('Tus datos personales se actualizaron correctamente.');
        setTimeout(() => {
          window.location.hash = isPrestador ? '#prestador' : '#perfil';
        }, 1200);
      });
    }

    // 6.3 Publicación de Nuevo Servicio (Prestador)
    const createServiceForm = document.getElementById('create-service-form');
    if (createServiceForm) {
      createServiceForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const titleInput = document.getElementById('new-service-title');
        const priceInput = document.getElementById('new-service-price');
        const categorySelect = document.getElementById('new-service-category');
        const detailsInput = document.getElementById('new-service-details');
        const zoneInput = document.getElementById('new-service-zone');

        const title = titleInput ? titleInput.value.trim() : '';
        const price = priceInput ? `$${priceInput.value.replace(/[^0-9.]/g, '')}` : '$15.000';
        const category = categorySelect ? categorySelect.value : 'Electricidad';
        const details = detailsInput ? detailsInput.value.trim() : '';
        const zone = zoneInput ? zoneInput.value.trim() : 'Río Cuarto';

        if (!title) {
          showToast('Por favor completá el título del oficio.');
          if (titleInput) titleInput.focus();
          return;
        }

        const iconConfig = {
          'Electricidad': { icon: 'fa-bolt', iconClass: 'text-amber-300', tag: 'Oficio', tagClass: 'text-amber-300 bg-white/20' },
          'Plomería': { icon: 'fa-faucet-drip', iconClass: 'text-sky-200', tag: 'Urgencias', tagClass: 'text-sky-200 bg-white/20' },
          'Carpintería': { icon: 'fa-hammer', iconClass: 'text-emerald-200', tag: 'Taller', tagClass: 'text-emerald-200 bg-white/20' },
          'Pintura': { icon: 'fa-paint-roller', iconClass: 'text-pink-200', tag: 'Pintor', tagClass: 'text-pink-200 bg-white/20' },
          'Cerrajería': { icon: 'fa-key', iconClass: 'text-yellow-200', tag: '24 Horas', tagClass: 'text-yellow-200 bg-white/20' },
          'Albañilería': { icon: 'fa-trowel-bricks', iconClass: 'text-orange-200', tag: 'Obra', tagClass: 'text-orange-200 bg-white/20' }
        };

        const conf = iconConfig[category] || { icon: 'fa-briefcase', iconClass: 'text-sky-200', tag: 'Oficio', tagClass: 'text-sky-200 bg-white/20' };

        const newService = {
          id: `srv-${Date.now()}`,
          title: title,
          category: category,
          tag: conf.tag,
          tagClass: conf.tagClass,
          icon: conf.icon,
          iconClass: conf.iconClass,
          stars: '★★★★★',
          price: price,
          description: details,
          zone: zone
        };

        state.providerServices.unshift(newService);
        localStorage.setItem('oficios_provider_services', JSON.stringify(state.providerServices));
        renderProviderServices();

        showToast('¡Servicio publicado con éxito en tu barrio de Río Cuarto!');
        window.location.hash = '#prestador-servicios';
      });
    }
  }

  // ========================================================================
  // 7. CALIFICACIÓN BARRIAL DE 1 TOQUE (5 Estrellas)
  // ========================================================================

  function setupStarRating() {
    const starBtns = document.querySelectorAll('.star-btn');
    const feedbackText = document.getElementById('star-rating-feedback');
    const saveRatingBtn = document.getElementById('btn-save-rating');

    const ratingsLabels = {
      1: '1 de 5 estrellas (Regular)',
      2: '2 de 5 estrellas (Aceptable)',
      3: '3 de 5 estrellas (Bueno)',
      4: '4 de 5 estrellas (Muy bueno)',
      5: '5 de 5 estrellas (Excelente)'
    };

    starBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const val = parseInt(btn.getAttribute('data-value'), 10);
        state.activeRating = val;

        starBtns.forEach(b => {
          const bVal = parseInt(b.getAttribute('data-value'), 10);
          if (bVal <= val) {
            b.classList.add('active');
            b.setAttribute('aria-checked', 'true');
          } else {
            b.classList.remove('active');
            b.setAttribute('aria-checked', 'false');
          }
        });

        if (feedbackText) {
          feedbackText.textContent = ratingsLabels[val];
        }
      });
    });

    if (saveRatingBtn) {
      saveRatingBtn.addEventListener('click', () => {
        showToast(`¡Gracias! Calificaste a Roberto Gómez con ${state.activeRating} estrellas.`);
        setTimeout(() => {
          window.location.hash = '#profesional';
        }, 1200);
      });
    }
  }

  // ========================================================================
  // 8. INTERACTIVIDAD DEL CHAT & PRESUPUESTO
  // ========================================================================

  function setupChatInteractivity() {
    const chatForm = document.getElementById('chat-input-form');
    const chatInput = document.getElementById('chat-message-input');
    const chatContainer = document.getElementById('chat-messages-container');
    const acceptBudgetBtn = document.getElementById('btn-accept-budget');

    if (chatForm && chatInput && chatContainer) {
      chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = chatInput.value.trim();
        if (!text) return;

        // Mensaje del usuario
        const userMsg = document.createElement('div');
        userMsg.className = 'flex flex-col items-end';
        userMsg.innerHTML = `
          <div class="bg-[#1764AE] text-white p-3 rounded-2xl rounded-tr-xs max-w-[85%] shadow-xs">
            <p class="text-xs leading-relaxed">${escapeHtml(text)}</p>
          </div>
          <span class="text-[10px] text-slate-500 mt-1 pr-1">Recién <i class="fa-solid fa-check text-blue-500"></i></span>
        `;
        chatContainer.appendChild(userMsg);
        chatInput.value = '';
        chatContainer.scrollTop = chatContainer.scrollHeight;

        // Respuesta simulada de Roberto
        setTimeout(() => {
          const reply = document.createElement('div');
          reply.className = 'flex flex-col items-start';
          reply.innerHTML = `
            <div class="bg-white border border-slate-200 text-slate-800 p-3 rounded-2xl rounded-tl-xs max-w-[85%] shadow-xs">
              <p class="text-xs font-bold text-[#1764AE] mb-1">Roberto Gómez</p>
              <p class="text-xs leading-relaxed">¡Entendido vecina! Ya tengo agendada la visita en Río Cuarto. Nos vemos mañana en el horario acordado.</p>
            </div>
            <span class="text-[10px] text-slate-500 mt-1 pl-1">Recién</span>
          `;
          chatContainer.appendChild(reply);
          chatContainer.scrollTop = chatContainer.scrollHeight;
        }, 1500);
      });
    }

    if (acceptBudgetBtn) {
      acceptBudgetBtn.addEventListener('click', () => {
        acceptBudgetBtn.disabled = true;
        acceptBudgetBtn.innerHTML = '<i class="fa-solid fa-check-double text-emerald-600"></i> <span>Presupuesto Aceptado ($15.000 en efectivo)</span>';
        acceptBudgetBtn.className = 'btn-secondary w-full py-2.5 text-xs font-bold text-emerald-800 bg-emerald-50 border-emerald-300';
        showToast('Presupuesto aceptado. Se coordinó la visita con Roberto en Río Cuarto.');
      });
    }
  }

  function escapeHtml(string) {
    const div = document.createElement('div');
    div.innerText = string;
    return div.innerHTML;
  }

  // ========================================================================
  // 9. GESTIÓN DE SUSCRIPCIÓN PRO (Stitch)
  // ========================================================================

  function setupSubscriptionManagement() {
    const monthlyBtn = document.getElementById('billing-monthly-btn');
    const annualBtn = document.getElementById('billing-annual-btn');
    const priceDisplay = document.getElementById('sub-price-display');
    const periodDisplay = document.getElementById('sub-period-display');
    const subscribeBtn = document.getElementById('btn-subscribe-pro');

    function updateBillingDisplay(plan) {
      state.billingPlan = plan;
      if (plan === 'annual') {
        if (annualBtn) {
          annualBtn.className = 'flex-1 py-2 rounded-full bg-[#1764AE] text-white shadow-xs transition-all flex items-center justify-center gap-1';
        }
        if (monthlyBtn) {
          monthlyBtn.className = 'flex-1 py-2 rounded-full text-slate-700 hover:text-slate-900 transition-all';
        }
        if (priceDisplay) priceDisplay.textContent = '$3.992';
        if (periodDisplay) periodDisplay.textContent = '/ mes (pago anual)';
      } else {
        if (monthlyBtn) {
          monthlyBtn.className = 'flex-1 py-2 rounded-full bg-[#1764AE] text-white shadow-xs transition-all';
        }
        if (annualBtn) {
          annualBtn.className = 'flex-1 py-2 rounded-full text-slate-700 hover:text-slate-900 transition-all flex items-center justify-center gap-1';
        }
        if (priceDisplay) priceDisplay.textContent = '$4.990';
        if (periodDisplay) periodDisplay.textContent = '/ mes';
      }
    }

    if (monthlyBtn) {
      monthlyBtn.addEventListener('click', () => updateBillingDisplay('monthly'));
    }

    if (annualBtn) {
      annualBtn.addEventListener('click', () => updateBillingDisplay('annual'));
    }

    if (subscribeBtn) {
      if (state.isProSubscribed) {
        subscribeBtn.innerHTML = '<i class="fa-solid fa-circle-check text-emerald-400"></i> <span>Membresía PRO Activa</span>';
        subscribeBtn.classList.add('bg-emerald-700');
      }

      subscribeBtn.addEventListener('click', () => {
        state.isProSubscribed = true;
        localStorage.setItem('oficios_is_pro', 'true');
        subscribeBtn.innerHTML = '<i class="fa-solid fa-circle-check text-emerald-400"></i> <span>Membresía PRO Activa</span>';
        subscribeBtn.classList.remove('bg-[#1764AE]');
        subscribeBtn.classList.add('bg-emerald-700');
        showToast('¡Felicitaciones! Te suscribiste al Plan Pro de Río Cuarto. 0% comisiones activadas.');
      });
    }
  }

  // ========================================================================
  // 10. CONFIGURACIONES DE PERFIL & SWITCH ACCESIBLE
  // ========================================================================

  function setupAccessibleToggle() {
    const toggle = document.getElementById('accessible-text-toggle');
    if (!toggle) return;

    toggle.checked = state.accessibleText;
    if (state.accessibleText) {
      document.body.classList.add('accessible-text');
    }

    toggle.addEventListener('change', () => {
      state.accessibleText = toggle.checked;
      localStorage.setItem('oficios_accessible_text', toggle.checked);

      if (toggle.checked) {
        document.body.classList.add('accessible-text');
        showToast('Tamaño de texto accesible activado.');
      } else {
        document.body.classList.remove('accessible-text');
        showToast('Tamaño de texto estándar restablecido.');
      }
    });
  }

  // Alternar Rol (Vecino <-> Prestador)
  function setupRoleToggle() {
    const roleBtn = document.getElementById('toggle-role-btn');
    const roleLabel = document.getElementById('role-label');
    const avatarInitials = document.getElementById('user-initials');

    function applyRole(role) {
      state.currentRole = role;
      localStorage.setItem('oficios_role', role);

      if (role === 'prestador') {
        if (roleLabel) roleLabel.textContent = 'Prestador';
        if (avatarInitials) avatarInitials.textContent = 'CP';
        if (roleBtn) roleBtn.className = 'text-[10px] font-bold px-2 py-1 bg-amber-600 text-white rounded-md shadow-xs hover:bg-amber-700 transition-colors whitespace-nowrap min-h-[36px]';
        window.location.hash = '#prestador';
      } else {
        if (roleLabel) roleLabel.textContent = 'Vecino';
        if (avatarInitials) avatarInitials.textContent = 'MV';
        if (roleBtn) roleBtn.className = 'text-[10px] font-bold px-2 py-1 bg-[#1764AE] text-white rounded-md shadow-xs hover:bg-[#00112B] transition-colors whitespace-nowrap min-h-[36px]';
        window.location.hash = '#home';
      }
    }

    if (roleBtn) {
      roleBtn.addEventListener('click', () => {
        const nextRole = state.currentRole === 'cliente' ? 'prestador' : 'cliente';
        applyRole(nextRole);
        showToast(`Cambiado al modo: ${nextRole === 'prestador' ? 'Oficio (Carlos)' : 'Vecino (Marta)'}`);
      });
    }

    if (state.currentRole === 'prestador') {
      applyRole('prestador');
    }
  }

  // ========================================================================
  // 11. BOTONES DE NAVEGACIÓN Y ACCIONES RÁPIDAS
  // ========================================================================

  function setupGlobalNavigation() {
    // Botones "Volver atrás"
    document.querySelectorAll('.btn-back').forEach(btn => {
      btn.addEventListener('click', () => {
        window.history.back();
      });
    });

    // Botón "Servicios más populares" en Home
    const btnPopulares = document.getElementById('btn-servicios-populares');
    if (btnPopulares) {
      btnPopulares.addEventListener('click', () => {
        state.activeCategory = 'Todos';
        renderCategoryPills();
        renderFilteredProfessionals();
        window.location.hash = '#explorar';
      });
    }

    // Botones de categoría en el Home
    document.querySelectorAll('.category-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.getAttribute('data-category');
        state.activeCategory = cat;
        renderCategoryPills();
        renderFilteredProfessionals();
        window.location.hash = '#explorar';
      });
    });

    // Botón "Pedir visita a domicilio" en el perfil profesional
    const btnIniciarContratacion = document.getElementById('btn-iniciar-contratacion');
    if (btnIniciarContratacion) {
      btnIniciarContratacion.addEventListener('click', () => {
        window.location.hash = '#contratar';
      });
    }

    // Botón "Calificar trabajo" en el perfil profesional
    const btnDejarResena = document.getElementById('btn-dejar-resena');
    if (btnDejarResena) {
      btnDejarResena.addEventListener('click', () => {
        window.location.hash = '#calificar';
      });
    }

    // Botón "Abrir chat" en el modal de éxito
    const btnGoToChat = document.getElementById('btn-go-to-chat');
    if (btnGoToChat) {
      btnGoToChat.addEventListener('click', () => {
        closeModal(document.getElementById('modal-success'));
        window.location.hash = '#chat';
      });
    }

    // Botón de chat en header
    const navBtnChat = document.getElementById('nav-btn-chat');
    if (navBtnChat) {
      navBtnChat.addEventListener('click', () => {
        window.location.hash = '#chat';
      });
    }

    const profOpenChatBtn = document.getElementById('prof-open-chat-btn');
    if (profOpenChatBtn) {
      profOpenChatBtn.addEventListener('click', () => {
        window.location.hash = '#chat';
      });
    }

    // Buscador de cabecera
    const headerSearchInput = document.getElementById('header-search');
    const headerSearchBtn = document.getElementById('header-search-btn');

    function performHeaderSearch() {
      if (!headerSearchInput) return;
      state.searchTerm = headerSearchInput.value.trim();
      const feedInput = document.getElementById('feed-search-input');
      if (feedInput) feedInput.value = state.searchTerm;
      renderFilteredProfessionals();
      window.location.hash = '#explorar';
    }

    if (headerSearchBtn && headerSearchInput) {
      headerSearchBtn.addEventListener('click', performHeaderSearch);
      headerSearchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') performHeaderSearch();
      });
    }

    // Buscador del feed
    const feedSearchInput = document.getElementById('feed-search-input');
    const clearSearchBtn = document.getElementById('clear-search-btn');

    if (feedSearchInput) {
      feedSearchInput.addEventListener('input', () => {
        state.searchTerm = feedSearchInput.value;
        if (clearSearchBtn) {
          clearSearchBtn.classList.toggle('hidden', !feedSearchInput.value);
        }
        renderFilteredProfessionals();
      });
    }

    if (clearSearchBtn && feedSearchInput) {
      clearSearchBtn.addEventListener('click', () => {
        feedSearchInput.value = '';
        state.searchTerm = '';
        clearSearchBtn.classList.add('hidden');
        renderFilteredProfessionals();
        feedSearchInput.focus();
      });
    }

    // Selector de barrio de Río Cuarto
    const selectBarrio = document.getElementById('select-barrio');
    if (selectBarrio) {
      selectBarrio.addEventListener('change', () => {
        state.activeBarrio = selectBarrio.value;
        renderFilteredProfessionals();
      });
    }

    // Modal de Filtros
    const btnOpenFilters = document.getElementById('btn-open-filter-modal');
    if (btnOpenFilters) {
      btnOpenFilters.addEventListener('click', () => {
        openModal('modal-filtros', btnOpenFilters);
      });
    }

    const btnApplyFilters = document.getElementById('btn-apply-filters');
    if (btnApplyFilters) {
      btnApplyFilters.addEventListener('click', () => {
        closeModal(document.getElementById('modal-filtros'));
        showToast('Filtros aplicados correctamente en Río Cuarto.');
        renderFilteredProfessionals();
      });
    }
  }

  // Reloj en status bar
  function updateClock() {
    const clock = document.getElementById('clock-display');
    if (!clock) return;
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    clock.textContent = `${h}:${m}`;
  }

  // ========================================================================
  // 12. INICIALIZACIÓN GENERAL
  // ========================================================================

  function init() {
    updateClock();
    setInterval(updateClock, 30000);

    renderFeaturedCarousel();
    renderCategoryPills();
    renderFilteredProfessionals();
    renderUserRequests();
    renderProviderServices();

    setupFormValidations();
    setupStarRating();
    setupChatInteractivity();
    setupSubscriptionManagement();
    setupAccessibleToggle();
    setupRoleToggle();
    setupGlobalNavigation();

    // Iniciar en la ruta según hash o por defecto #home
    navigateTo(window.location.hash || '#home');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
