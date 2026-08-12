// Le pagine macchina stanno in prodotti/: tutti i percorsi generati vanno risaliti di un livello.
const RADICE = window.location.pathname.includes('/prodotti/') ? '../' : '';

// Ripetizioni del nome in ciascuna meta della fascia di chiusura. Va dichiarata
// qui: il montaggio parte subito sotto, e una const letta piu in basso nel file
// non sarebbe ancora inizializzata.
const RIPETIZIONI_FASCIA = 2;

montaLayoutCondiviso();

function percorso(riferimento) {
  return /^(https?:|mailto:|tel:|#|\/)/.test(riferimento) ? riferimento : RADICE + riferimento;
}

function montaLayoutCondiviso() {
  sostituisci('[data-layout-header]', intestazione() + menuSovrapposto());
  sostituisci('[data-layout-sede]', sezioneSede());
  sostituisci('[data-layout-footer]', piePagina());
  sostituisci('[data-layout-fascia]', fasciaMarchio());
  avviaMappaDelMondo();
}

function sostituisci(selettore, markup) {
  const segnaposto = document.querySelector(selettore);
  if (segnaposto) segnaposto.outerHTML = markup;
}

function avviaMappaDelMondo() {
  const canvas = document.querySelector('[data-mappa-mondo]');
  if (canvas) disegnaMappaDelMondo(canvas);
}

function intestazione() {
  return `
<header class="site-header" data-site-header>
  <div class="site-header__inner">
    <a class="site-header__logo" href="${percorso('index.html')}" aria-label="${DATI.azienda.nome}, torna alla home">
      <img class="site-header__marchio" src="${percorso(DATI.azienda.logo)}" alt="${DATI.azienda.nome}" width="232" height="87">
    </a>

    <p class="scroll-progress" data-scroll-progress aria-hidden="true">0%</p>

    <button class="hamburger" type="button" aria-label="Apri il menu" aria-expanded="false" aria-controls="menu-principale" data-nav-open>
      ${icona('M3 6h18M3 12h18M3 18h18', 'hamburger__icon')}
    </button>
  </div>
</header>`;
}

function menuSovrapposto() {
  return `
<div class="nav-overlay" id="menu-principale" data-nav-overlay>
  <div class="nav-overlay__backdrop" data-nav-backdrop></div>

  <nav class="nav-overlay__panel" aria-label="Menu principale">
    <div class="nav-overlay__bar">
      <button class="nav-overlay__close" type="button" aria-label="Chiudi il menu" data-nav-close>
        ${icona('M5 5l14 14M19 5L5 19')}
      </button>
    </div>

    <ul class="nav-menu">
      ${DATI.menu.map(voceDiMenu).join('')}
    </ul>
  </nav>
</div>`;
}

function voceDiMenu(voce, indice) {
  if (!voce.voci) {
    return `<li class="nav-menu__item"><a class="nav-menu__link"${attributoPaginaCorrente(voce.href)} href="${percorso(voce.href)}">${voce.testo}</a></li>`;
  }

  const id = `menu-livello-${indice}`;
  return `
      <li class="nav-menu__item">
        <button class="disclosure" type="button" aria-expanded="false" aria-controls="${id}">
          ${voce.testo}
          ${icona('M6 9l6 6 6-6', 'disclosure__chevron')}
        </button>
        <ul class="nav-menu__sublist" id="${id}" hidden>
          ${voce.voci.map((v) => `<li><a${attributoPaginaCorrente(v.href)} href="${percorso(v.href)}">${v.testo}</a></li>`).join('')}
        </ul>
      </li>`;
}

function attributoPaginaCorrente(href) {
  return href === paginaCorrente() ? ' aria-current="page"' : '';
}

function paginaCorrente() {
  return window.location.pathname.split('/').pop() || 'index.html';
}

function sezioneSede() {
  const a = DATI.azienda;
  return `
  <section class="section locations" aria-labelledby="titolo-sede">
    <canvas class="locations__map" data-mappa-mondo aria-hidden="true"></canvas>

    <div class="locations__content">
      <h2 class="locations__title" id="titolo-sede">Sede</h2>

      <div class="locations__panel">
        <p class="locations__country">IT</p>

        <address class="locations__address">
          <span class="locations__company">${a.ragioneSociale}</span>
          ${a.via}<br>
          ${a.citta}<br>
          T. ${a.telefono}<br>
          ${a.email}
        </address>
      </div>

      <a class="button-accent" href="${a.mappa}" target="_blank" rel="noopener"
         aria-label="Posizione della sede su Google Maps, si apre in una nuova scheda">Posizione</a>
    </div>
  </section>`;
}

// Tre colonne e una riga di chiusura: due di collegamenti e una di recapiti,
// tutti e tre raggiungibili con un tocco — mail, telefono e posizione.
//
// Le intestazioni non ci sono: con tre voci per colonna erano impalcatura, e il
// gruppo si legge senza. Restano pero come aria-label, se no chi ascolta la
// pagina trova tre elenchi di link senza sapere di cosa.
function piePagina() {
  const a = DATI.azienda;
  return `
<footer class="site-footer">
  <div class="site-footer__inner">

    <div class="footer-columns">
      ${DATI.footer.colonne.map((c) => `
      <nav class="footer-column" aria-label="${c.titolo}">
        ${elencoLink(c.voci)}
      </nav>`).join('')}

      <address class="footer-column" aria-label="Recapiti">
        <ul class="footer-column__links">
          <li><a href="mailto:${a.email}">${a.email}</a></li>
          <li><a href="${a.telefonoHref}">T. ${a.telefono}</a></li>
          <li><a href="${a.mappa}" target="_blank" rel="noopener"
                 aria-label="Posizione della sede su Google Maps, si apre in una nuova scheda">Posizione</a></li>
        </ul>
      </address>
    </div>

    <hr class="site-footer__divider">

    <div class="site-footer__coda">
      <a class="footer-social" href="${a.facebook}" target="_blank" rel="noopener" aria-label="Facebook, si apre in una nuova scheda">
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/>
          <path d="M14.5 7.5h-1.8a2.2 2.2 0 00-2.2 2.2V19M8.2 12.6h5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square"/>
        </svg>
      </a>
      <nav class="legal-links" aria-label="Informazioni legali">
        <ul>${DATI.footer.legali.map((v) => `<li><a href="${percorso(v.href)}">${v.testo}</a></li>`).join('')}</ul>
      </nav>
    </div>

    <p class="site-footer__copyright">Copyright © 2026 ${a.nome} — ${a.legale}</p>

  </div>
</footer>`;
}

// Fascia di chiusura della home: il nome disteso a scala display, in scorrimento
// continuo. E decorativa — il nome sta gia nell'intestazione, nel piede e nel
// titolo della pagina — quindi resta fuori dall'ordine di lettura.
//
// Due meta identiche, e l'animazione trasla di -50%: a fine giro la seconda si
// trova esattamente dove stava la prima, quindi il raccordo non esiste come
// momento. Perche non si apra un vuoto a destra, una meta deve essere piu larga
// dello schermo: due ripetizioni bastano dai 320px ai 2560px, verificato.
// L'unita che si ripete e nome + marchio. Il marchio e senza payoff: quello del
// lockup direbbe "MECHANICAL ENGINEERING" a un dito dalla stessa parola scritta
// in grande, e il ritmo del giro si romperebbe.
//
// SVG in linea e non <img> perche il colore deve essere lo stesso nero del
// testo: con fill impostato dal CSS il marchio prende --color-ink per
// costruzione, mentre un filtro sul PNG darebbe #000 e non #111. La geometria
// sta in un <symbol> emesso una volta sola; le quattro unita lo richiamano con
// <use>, quindi nel documento i tracciati non si ripetono.
function fasciaMarchio() {
  const a = DATI.azienda;
  const m = a.marchio;
  const unita = `<span class="fascia__voce">${a.nome}</span>`
    + '<svg class="fascia__marchio" aria-hidden="true" focusable="false">'
    + '<use href="#fascia-marchio"></use></svg>';
  const meta = unita.repeat(RIPETIZIONI_FASCIA);
  return `
<div class="fascia" aria-hidden="true">
  <svg class="fascia__deposito" aria-hidden="true" focusable="false">
    <symbol id="fascia-marchio" viewBox="${m.viewBox}">
      ${m.tracciati.map((d) => `<path d="${d}"/>`).join('\n      ')}
    </symbol>
  </svg>
  <div class="fascia__nastro">${meta}${meta}</div>
</div>`;
}



function elencoLink(voci) {
  return `<ul class="footer-column__links">${voci.map((v) => `<li><a href="${percorso(v.href)}">${v.testo}</a></li>`).join('')}</ul>`;
}

function icona(disegno, classe = '') {
  return `<svg${classe ? ` class="${classe}"` : ''} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="${disegno}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square"/>
      </svg>`;
}
