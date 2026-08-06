const HERO_AUTOPLAY_MS = 7000;
const SWIPE_THRESHOLD_PX = 40;
const RESIZE_DEBOUNCE_MS = 150;
const CARDS_VISIBLE_ON_TABLET = 2;
const CARDS_VISIBLE_ON_DESKTOP = 3;
const TABLET_QUERY = '(min-width: 768px)';
const DESKTOP_QUERY = '(min-width: 1200px)';
const MOBILE_QUERY = '(max-width: 767px)';

document.addEventListener('DOMContentLoaded', startPage);

function startPage() {
  addShadowToHeaderOnScroll();
  showScrollProgress();
  enableNavigationOverlay();
  enableFooterAccordions();
  startHeroCarousel();
  startSystemCarousel();
  enableSystemPanels();
  startGalleryCarousels();
  revealOnScroll();
  enableFlipCards();
  enableContactForm();
}

// Card di Applicazioni e Settori. Il giro è tutto in CSS: qui si sposta solo
// una classe e si tiene in ordine ciò che il CSS non può fare — chi è
// raggiungibile col TAB, dove finisce il fuoco, cosa annuncia il lettore.
function enableFlipCards() {
  document.querySelectorAll('[data-flip]').forEach((carta) => {
    // Fronte e retro presi per nome e non per posizione: l'ordine nel DOM è
    // un dettaglio del markup, qui serve sapere quale faccia è quale.
    const facce = [
      carta.querySelector('.riquadro__faccia--fronte'),
      carta.querySelector('.riquadro__faccia--retro'),
    ];
    if (facce.some((faccia) => !faccia)) return;

    const bottoni = facce.map((faccia) => faccia.querySelector('.riquadro__apri'));
    if (bottoni.some((bottone) => !bottone)) return;

    bottoni.forEach((bottone, indice) => {
      // detail vale 0 solo quando il click nasce da Invio o Spazio; col mouse
      // porta il numero di click. Serve a capire come è arrivato il comando.
      bottone.addEventListener('click', (evento) => {
        giraCard(carta, facce, bottoni, indice === 0, evento.detail === 0);
      });
    });

    // Esc riporta la card sul davanti: è la scorciatoia che ci si aspetta
    // quando una cosa si è aperta e va richiusa. Arriva solo da tastiera,
    // perché solo allora il fuoco è dentro la card.
    carta.addEventListener('keydown', (evento) => {
      if (evento.key === 'Escape' && carta.classList.contains('is-girata')) {
        giraCard(carta, facce, bottoni, false, true);
      }
    });
  });
}

function giraCard(carta, facce, bottoni, versoIlRetro, daTastiera) {
  const arrivo = versoIlRetro ? 1 : 0;

  carta.classList.toggle('is-girata', versoIlRetro);
  bottoni.forEach((bottone) => bottone.setAttribute('aria-expanded', String(versoIlRetro)));

  // L'ordine conta: prima si riapre la faccia che arriva, poi si spegne quella
  // che se ne va — al contrario il fuoco resterebbe un istante su un elemento
  // già spento. Il fuoco lo si sposta però solo per chi naviga da tastiera:
  // spostarlo anche al click lascerebbe il contorno blu attorno alla card,
  // perché un focus dato via script fa scattare :focus-visible. Col mouse non
  // serve — quando la faccia diventa inert il browser toglie da sé il fuoco.
  facce[arrivo].removeAttribute('inert');
  if (daTastiera) bottoni[arrivo].focus({ preventScroll: true });
  facce[1 - arrivo].inert = true;
}

// Il modulo valida in pagina e si ferma: non c'è un server a cui consegnarlo e
// fingere un invio riuscito sarebbe peggio di non averlo. Per collegarlo basta
// sostituire il corpo di consegnaModulo con la chiamata all'endpoint.
function enableContactForm() {
  const modulo = document.querySelector('[data-modulo-contatti]');
  if (!modulo) return;

  const esito = modulo.querySelector('[data-modulo-esito]');
  const campi = [...modulo.querySelectorAll('[required]')];

  modulo.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const invalidi = campi.filter((campo) => !segnalaCampo(campo));
    if (invalidi.length > 0) {
      esito.textContent = '';
      invalidi[0].focus();
      return;
    }

    consegnaModulo(modulo, esito);
  });

  campi.forEach((campo) => {
    campo.addEventListener('blur', () => segnalaCampo(campo));
    campo.addEventListener('input', () => nascondiErrore(campo));
  });
}

function segnalaCampo(campo) {
  const messaggio = messaggioDiErrore(campo);
  const avviso = document.getElementById(`errore-${campo.name}`);

  campo.setAttribute('aria-invalid', messaggio ? 'true' : 'false');
  if (avviso) {
    avviso.textContent = messaggio;
    avviso.hidden = !messaggio;
  }

  return !messaggio;
}

function nascondiErrore(campo) {
  const avviso = document.getElementById(`errore-${campo.name}`);
  campo.removeAttribute('aria-invalid');
  if (avviso) avviso.hidden = true;
}

function messaggioDiErrore(campo) {
  if (campo.type === 'checkbox') return campo.checked ? '' : 'Serve il consenso per poterti rispondere.';
  if (campo.value.trim() === '') return 'Questo campo è obbligatorio.';
  if (campo.type === 'email' && !campo.validity.valid) return 'Controlla l\u2019indirizzo email.';
  return '';
}

// ⇩ PUNTO DI INTEGRAZIONE: qui va la chiamata all'endpoint del server.
function consegnaModulo(modulo, esito) {
  esito.textContent = 'Il modulo non è ancora collegato a un server. '
    + `Nel frattempo scrivi a ${DATI.azienda.email} o chiama ${DATI.azienda.telefono}.`;
}

// I blocchi marcati data-reveal salgono di poco entrando nello schermo. Lo stato
// di partenza lo accende il JS: senza, il contenuto resta visibile comunque.
function revealOnScroll() {
  const blocchi = [...document.querySelectorAll('[data-reveal]')];
  if (blocchi.length === 0) return;

  document.documentElement.classList.add('js-reveal');

  if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
    blocchi.forEach(showBlock);
    return;
  }

  const osservatore = new IntersectionObserver((voci) => {
    // Rivela anche i blocchi già superati: chi arriva con un'ancora nell'URL
    // se li lascia sopra la finestra senza averli mai attraversati.
    voci.filter((v) => v.isIntersecting || v.boundingClientRect.top < 0)
      .forEach((v) => rivela(v.target, osservatore));
  }, { rootMargin: '0px 0px -12% 0px' });

  blocchi.forEach((blocco) => osservatore.observe(blocco));
  recuperaBlocchiScavalcati(blocchi, osservatore);
}

// Un salto istantaneo — un'ancora cliccata, il tasto Fine — porta la finestra
// oltre un blocco senza che l'osservatore attraversi la soglia: quel blocco
// resterebbe invisibile. Qui viene recuperato, e la rete si smonta da sola.
function recuperaBlocchiScavalcati(blocchi, osservatore) {
  const controlla = () => {
    blocchi.filter((b) => !b.classList.contains('is-revealed') && b.getBoundingClientRect().top < 0)
      .forEach((b) => rivela(b, osservatore));

    if (blocchi.every((b) => b.classList.contains('is-revealed'))) {
      window.removeEventListener('scroll', controlla);
    }
  };

  window.addEventListener('scroll', controlla, { passive: true });
}

function rivela(blocco, osservatore) {
  showBlock(blocco);
  osservatore.unobserve(blocco);
}

function showBlock(blocco) {
  blocco.classList.add('is-revealed');
}

function addShadowToHeaderOnScroll() {
  const header = document.querySelector('[data-site-header]');

  const syncShadow = () => header.classList.toggle('is-scrolled', window.scrollY > 0);

  syncShadow();
  window.addEventListener('scroll', syncShadow, { passive: true });
}

function showScrollProgress() {
  const output = document.querySelector('[data-scroll-progress]');

  const render = () => {
    output.textContent = `${measureScrolledPercentage()}%`;
  };

  render();
  window.addEventListener('scroll', render, { passive: true });
  window.addEventListener('resize', render);
  new ResizeObserver(render).observe(document.body);
}

function measureScrolledPercentage() {
  const scrollableDistance = document.documentElement.scrollHeight - window.innerHeight;
  if (scrollableDistance <= 0) return 0;

  const travelled = window.scrollY / scrollableDistance;
  return Math.round(Math.min(Math.max(travelled, 0), 1) * 100);
}

function enableNavigationOverlay() {
  const overlay = document.querySelector('[data-nav-overlay]');
  const panel = overlay.querySelector('.nav-overlay__panel');
  const openButton = document.querySelector('[data-nav-open]');
  const closeButton = overlay.querySelector('[data-nav-close]');
  const backdrop = overlay.querySelector('[data-nav-backdrop]');

  openButton.addEventListener('click', openNavigation);
  closeButton.addEventListener('click', closeNavigation);
  backdrop.addEventListener('click', closeNavigation);
  overlay.addEventListener('keydown', keepTabbingInsidePanel);
  document.addEventListener('keydown', closeNavigationOnEscape);
  enableDisclosures(panel.querySelectorAll('.nav-menu .disclosure'));

  function openNavigation() {
    overlay.classList.add('is-open');
    openButton.setAttribute('aria-expanded', 'true');
    document.body.classList.add('is-nav-open');
    closeButton.focus();
  }

  function closeNavigation() {
    overlay.classList.remove('is-open');
    openButton.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('is-nav-open');
    openButton.focus();
  }

  function closeNavigationOnEscape(event) {
    if (event.key === 'Escape' && overlay.classList.contains('is-open')) {
      closeNavigation();
    }
  }

  function keepTabbingInsidePanel(event) {
    if (event.key !== 'Tab') return;

    const focusables = listFocusableElements(panel);
    if (focusables.length === 0) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const isLeavingBackwards = event.shiftKey && document.activeElement === first;
    const isLeavingForwards = !event.shiftKey && document.activeElement === last;
    if (!isLeavingBackwards && !isLeavingForwards) return;

    event.preventDefault();
    (event.shiftKey ? last : first).focus();
  }
}

function enableFooterAccordions() {
  const columns = [...document.querySelectorAll('[data-footer-column]')];
  const mobileQuery = window.matchMedia(MOBILE_QUERY);

  enableDisclosures(document.querySelectorAll('[data-footer-toggle]'));
  applyLayout();
  mobileQuery.addEventListener('change', applyLayout);

  function applyLayout() {
    columns.forEach(mobileQuery.matches ? makeColumnCollapsible : keepColumnOpen);
  }

  function makeColumnCollapsible(column) {
    const toggle = column.querySelector('[data-footer-toggle]');
    toggle.disabled = false;
    setDisclosureExpanded(toggle, false);
  }

  function keepColumnOpen(column) {
    const toggle = column.querySelector('[data-footer-toggle]');
    findDisclosurePanel(toggle).hidden = false;
    toggle.removeAttribute('aria-expanded');
    toggle.disabled = true;
  }
}

function startHeroCarousel() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  createCarousel(hero, {
    createTransition: createCrossfadeTransition,
    autoplayDelayMs: HERO_AUTOPLAY_MS,
    wrapsAround: true,
  });
}

function startSystemCarousel() {
  const sistemi = document.querySelector('[data-system-carousel]');
  if (sistemi) createCardCarousel(sistemi);
}

function enableSystemPanels() {
  const toggles = [...document.querySelectorAll('[data-system-toggle]')];
  const machineCarousels = new Map();

  toggles.forEach((toggle) => {
    toggle.addEventListener('click', () => showOnlyPanelOf(toggle));
  });

  function showOnlyPanelOf(clickedToggle) {
    const shouldOpen = clickedToggle.getAttribute('aria-expanded') !== 'true';

    toggles.forEach((toggle) => setDisclosureExpanded(toggle, false));
    if (!shouldOpen) return;

    setDisclosureExpanded(clickedToggle, true);
    revealMachineCarousel(findDisclosurePanel(clickedToggle));
  }

  function revealMachineCarousel(panel) {
    if (!machineCarousels.has(panel)) {
      machineCarousels.set(panel, createCardCarousel(panel.querySelector('[data-carousel]')));
    }

    machineCarousels.get(panel).relayout();
  }
}

function startGalleryCarousels() {
  document.querySelectorAll('[data-galleria]').forEach(createCardCarousel);
}

function createCardCarousel(root) {
  return createCarousel(root, {
    createTransition: createHorizontalSlideTransition,
    wrapsAround: false,
    countVisibleSlides: countVisibleCards,
  });
}

function countVisibleCards() {
  if (window.matchMedia(DESKTOP_QUERY).matches) return CARDS_VISIBLE_ON_DESKTOP;
  if (window.matchMedia(TABLET_QUERY).matches) return CARDS_VISIBLE_ON_TABLET;
  return 1;
}

function createCarousel(root, options) {
  const {
    createTransition,
    autoplayDelayMs = 0,
    wrapsAround = false,
    countVisibleSlides = () => 1,
  } = options;

  const viewport = root.querySelector('.carousel__viewport');
  const track = root.querySelector('[data-carousel-track]');
  const dotList = root.querySelector('[data-carousel-dots]');
  const previousButton = root.querySelector('[data-carousel-previous]');
  const nextButton = root.querySelector('[data-carousel-next]');
  const status = document.querySelector('[data-carousel-status]');
  const slides = [...track.children];
  const transition = createTransition({ viewport, track, slides });
  const autoplay = createAutoplay(showNextStepAutomatically, autoplayDelayMs);

  let activeIndex = 0;
  let stepCount = countSteps();

  renderDots();
  goToStep(0, { requestedByUser: false });
  bindArrowButtons();
  bindKeyboardNavigation();
  bindSwipeGestures();
  bindFocusInsideTrack();
  bindLayoutChanges();
  bindAutoplayPausing();
  autoplay.play();

  return { relayout };

  function goToStep(requestedIndex, { requestedByUser = true } = {}) {
    activeIndex = wrapsAround
      ? wrapIndex(requestedIndex, stepCount)
      : clampIndex(requestedIndex, stepCount);

    transition.showStep(activeIndex);
    syncDots();
    syncArrowAvailability();

    if (requestedByUser) {
      autoplay.stopForGood();
      announceActiveStep();
    }
  }

  function showNextStepAutomatically() {
    goToStep(activeIndex + 1, { requestedByUser: false });
  }

  function countSteps() {
    return Math.max(slides.length - countVisibleSlides() + 1, 1);
  }

  function renderDots() {
    dotList.replaceChildren(...Array.from({ length: stepCount }, createDot));
    root.classList.toggle('carousel--is-static', stepCount === 1);
  }

  function createDot(_, index) {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'carousel__dot';
    dot.setAttribute('aria-label', `Vai alla posizione ${index + 1} di ${stepCount}`);
    dot.addEventListener('click', () => goToStep(index));
    return dot;
  }

  function syncDots() {
    [...dotList.children].forEach((dot, index) => {
      dot.setAttribute('aria-current', String(index === activeIndex));
    });
  }

  function syncArrowAvailability() {
    previousButton.disabled = !wrapsAround && activeIndex === 0;
    nextButton.disabled = !wrapsAround && activeIndex === stepCount - 1;
  }

  function announceActiveStep() {
    status.textContent = `${root.dataset.carouselName}: ${activeIndex + 1} di ${stepCount}`;
  }

  function bindArrowButtons() {
    previousButton.addEventListener('click', () => goToStep(activeIndex - 1));
    nextButton.addEventListener('click', () => goToStep(activeIndex + 1));
  }

  function bindKeyboardNavigation() {
    root.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') goToStep(activeIndex - 1);
      else if (event.key === 'ArrowRight') goToStep(activeIndex + 1);
      else return;

      event.preventDefault();
    });
  }

  function bindSwipeGestures() {
    enableHorizontalSwipe(viewport, {
      onSwipeLeft: () => goToStep(activeIndex + 1),
      onSwipeRight: () => goToStep(activeIndex - 1),
    });
  }

  function bindFocusInsideTrack() {
    track.addEventListener('focusin', (event) => {
      viewport.scrollLeft = 0;

      const slideIndex = slides.indexOf(event.target.closest('.carousel__slide'));
      if (slideIndex >= 0 && !isSlideVisible(slideIndex)) {
        goToStep(slideIndex, { requestedByUser: false });
      }
    });
  }

  function isSlideVisible(index) {
    return index >= activeIndex && index < activeIndex + countVisibleSlides();
  }

  function bindLayoutChanges() {
    window.addEventListener('resize', debounce(relayout, RESIZE_DEBOUNCE_MS));
  }

  function relayout() {
    if (viewport.clientWidth === 0) return;

    const currentStepCount = countSteps();
    if (currentStepCount !== stepCount) {
      stepCount = currentStepCount;
      renderDots();
    }

    transition.remeasure();
    goToStep(activeIndex, { requestedByUser: false });
  }

  function bindAutoplayPausing() {
    root.addEventListener('pointerenter', autoplay.pause);
    root.addEventListener('pointerleave', autoplay.play);
    root.addEventListener('focusin', autoplay.pause);
    root.addEventListener('focusout', autoplay.play);
  }
}

function createCrossfadeTransition({ slides }) {
  return { showStep, remeasure };

  function showStep(index) {
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle('is-active', slideIndex === index);
    });
  }

  function remeasure() {}
}

function createHorizontalSlideTransition({ viewport, track, slides }) {
  let geometry = measureGeometry();

  return { showStep, remeasure };

  function showStep(index) {
    const offset = Math.min(index * geometry.stepWidth, geometry.maxOffset);
    track.style.transform = `translateX(${-offset}px)`;
  }

  function remeasure() {
    geometry = measureGeometry();
  }

  function measureGeometry() {
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const stepWidth = slides[0].getBoundingClientRect().width + gap;
    const trackWidth = slides.length * stepWidth - gap;

    return { stepWidth, maxOffset: Math.max(trackWidth - viewport.clientWidth, 0) };
  }
}

function createAutoplay(advance, delayMs) {
  let timerId = null;
  let isStopped = delayMs === 0 || prefersReducedMotion();

  return { play, pause, stopForGood };

  function play() {
    if (isStopped || timerId !== null) return;
    timerId = setInterval(advance, delayMs);
  }

  function pause() {
    clearInterval(timerId);
    timerId = null;
  }

  function stopForGood() {
    isStopped = true;
    pause();
  }
}

function enableHorizontalSwipe(element, { onSwipeLeft, onSwipeRight }) {
  let startX = 0;
  let startY = 0;
  let isTracking = false;

  element.addEventListener('pointerdown', (event) => {
    if (!event.isPrimary) return;

    startX = event.clientX;
    startY = event.clientY;
    isTracking = true;
  });

  element.addEventListener('pointerup', (event) => {
    if (!isTracking) return;
    isTracking = false;

    const travelledX = event.clientX - startX;
    const travelledY = event.clientY - startY;
    const isHorizontalSwipe =
      Math.abs(travelledX) >= SWIPE_THRESHOLD_PX && Math.abs(travelledX) > Math.abs(travelledY);
    if (!isHorizontalSwipe) return;

    if (travelledX < 0) onSwipeLeft();
    else onSwipeRight();
  });

  element.addEventListener('pointercancel', () => {
    isTracking = false;
  });
}

function enableDisclosures(buttons) {
  buttons.forEach((button) => {
    button.addEventListener('click', () => toggleDisclosure(button));
  });
}

function toggleDisclosure(button) {
  setDisclosureExpanded(button, button.getAttribute('aria-expanded') !== 'true');
}

function setDisclosureExpanded(button, shouldExpand) {
  button.setAttribute('aria-expanded', String(shouldExpand));
  findDisclosurePanel(button).hidden = !shouldExpand;
}

function findDisclosurePanel(button) {
  return document.getElementById(button.getAttribute('aria-controls'));
}

function listFocusableElements(container) {
  const selector = 'a[href], button:not(:disabled), [tabindex]:not([tabindex="-1"])';
  return [...container.querySelectorAll(selector)].filter(
    (element) => element.getClientRects().length > 0,
  );
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function wrapIndex(index, length) {
  return ((index % length) + length) % length;
}

function clampIndex(index, length) {
  return Math.min(Math.max(index, 0), length - 1);
}

function debounce(callback, waitMs) {
  let timerId = null;

  return () => {
    clearTimeout(timerId);
    timerId = setTimeout(callback, waitMs);
  };
}
