'use strict';

// Intro della home.
//
// Sipario nero davanti al sito. Una linea bianca attraversa lo spazio del
// marchio e lo scopre man mano che passa — e una maschera, non una dissolvenza:
// prima della linea il marchio non c'e, dopo c'e. Poi il sottotitolo, una
// pausa, e il sipario si apre verso l'alto mentre il marchio raggiunge il suo
// posto nell'intestazione.
//
// Il sito sotto e gia quello definitivo, coi suoi colori: l'intro non lo tocca.
// Niente librerie: Web Animations API e clip-path.

const CHIAVE_SESSIONE = 'faseIntroPlayed';

const TEMPI = {
  attesa: 200,        // schermo nero prima che accada qualcosa
  scansione: 650,     // la linea attraversa il marchio scoprendolo
  sottotitolo: 420,
  respiro: 400,       // marchio e scritta fermi: la parte che si guarda
  volo: 600,          // il marchio raggiunge l'intestazione
  sipario: 640,       // il nero si ritira verso l'alto
  scambio: 110,       // incrocio fra marchio dell'intro e logo di navbar
};

const CURVE = {
  // Frenata lunga senza rimbalzo: e la curva del movimento premium.
  posa: 'cubic-bezier(0.22, 1, 0.36, 1)',
  // Simmetrica e decisa: il sipario parte e arriva con lo stesso peso.
  sipario: 'cubic-bezier(0.76, 0, 0.24, 1)',
  lineare: 'linear',
};

document.addEventListener('DOMContentLoaded', avviaIntro);

function avviaIntro() {
  const intro = document.querySelector('[data-intro]');
  if (!intro) return;

  // Gia vista in questa scheda, o movimento ridotto: il CSS la tiene spenta,
  // qui la si toglie di mezzo del tutto.
  if (giaVista() || menoMovimento()) {
    intro.remove();
    return;
  }
  segnaVista();

  const marchio = intro.querySelector('[data-intro-marchio]');
  const sottotitolo = intro.querySelector('[data-intro-sottotitolo]');
  const linea = intro.querySelector('[data-intro-linea]');
  if (!marchio || !linea) { intro.remove(); return; }

  document.body.classList.add('intro-in-corso');
  // Rete di sicurezza: se qualcosa si inceppa la pagina non resta bloccata.
  const salvagente = setTimeout(() => chiudi(intro), 6000);

  scopriMarchio(marchio, linea);
  entraSottotitolo(sottotitolo);

  const finePosa = TEMPI.attesa + TEMPI.scansione + TEMPI.respiro;
  setTimeout(() => {
    clearTimeout(salvagente);
    apriSipario(intro, marchio, sottotitolo);
  }, finePosa);
}

function giaVista() {
  try {
    return !!sessionStorage.getItem(CHIAVE_SESSIONE);
  } catch (errore) {
    return false; // storage negato: si mostra e basta
  }
}

function segnaVista() {
  try {
    sessionStorage.setItem(CHIAVE_SESSIONE, 'true');
  } catch (errore) { /* vedi sopra */ }
}

function menoMovimento() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// --------------------------------------------------------------- scansione

// La maschera si apre da sinistra e la linea le corre davanti, sul suo bordo:
// e questo a far leggere il marchio come rivelato dalla linea e non come
// comparso per conto suo. Il marchio cresce di un soffio mentre finisce di
// scoprirsi, cosi l'ultimo tratto non e statico.
function scopriMarchio(marchio, linea) {
  marchio.animate(
    [{ clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0 0 0)' }],
    {
      duration: TEMPI.scansione, delay: TEMPI.attesa, easing: CURVE.lineare, fill: 'both',
    },
  );

  marchio.animate(
    [{ transform: 'scale(0.985)' }, { transform: 'scale(1)' }],
    {
      duration: 400,
      delay: TEMPI.attesa + TEMPI.scansione - 320,
      easing: CURVE.posa,
      fill: 'both',
    },
  );

  // La linea percorre la larghezza della scena alla stessa velocita della
  // maschera, quindi resta incollata al fronte che scopre.
  const larghezza = linea.parentElement.getBoundingClientRect().width;
  linea.animate(
    [
      { transform: 'translateX(0)', opacity: 1 },
      { transform: `translateX(${larghezza.toFixed(1)}px)`, opacity: 1 },
    ],
    {
      duration: TEMPI.scansione, delay: TEMPI.attesa, easing: CURVE.lineare, fill: 'both',
    },
  );

  // Arrivata in fondo si spegne subito: ha finito il suo lavoro.
  linea.animate(
    [{ opacity: 1 }, { opacity: 0 }],
    {
      duration: 120,
      delay: TEMPI.attesa + TEMPI.scansione - 40,
      easing: CURVE.posa,
      fill: 'forwards',
    },
  );
}

function entraSottotitolo(sottotitolo) {
  if (!sottotitolo) return;

  sottotitolo.animate(
    [
      { opacity: 0, transform: 'translateY(6px)', letterSpacing: '0.2em' },
      { opacity: 1, transform: 'translateY(0)', letterSpacing: '0.12em' },
    ],
    {
      duration: TEMPI.sottotitolo,
      delay: TEMPI.attesa + TEMPI.scansione - 180,
      easing: CURVE.posa,
      fill: 'both',
    },
  );
}

// ----------------------------------------------------------------- uscita

// Il sipario si ritira verso l'alto e insieme il marchio raggiunge il posto
// che occupa nell'intestazione. All'arrivo si scambia col logo vero: sono
// nella stessa posizione e della stessa misura, quindi il cambio non si vede.
function apriSipario(intro, marchio, sottotitolo) {
  const logoNavbar = document.querySelector('.site-header__marchio');

  if (sottotitolo) {
    sottotitolo.animate(
      [{ opacity: 1 }, { opacity: 0 }],
      { duration: 220, easing: CURVE.posa, fill: 'forwards' },
    );
  }

  const volo = portaAllIntestazione(marchio, logoNavbar);

  const tenda = intro.animate(
    [{ clipPath: 'inset(0 0 0 0)' }, { clipPath: 'inset(0 0 100% 0)' }],
    {
      duration: TEMPI.sipario,
      delay: volo ? 120 : 0,
      easing: CURVE.sipario,
      fill: 'forwards',
    },
  );

  tenda.addEventListener('finish', () => chiudi(intro));
}

// FLIP: si misurano il marchio dell'intro e il posto che occupa dentro il logo
// dell'intestazione, e si ricava la trasformazione che porta l'uno sull'altro.
// Restituisce false se il logo di navbar non c'e o non e visibile — su quel
// caso si preferisce una dissolvenza pulita a un volo verso il nulla.
function portaAllIntestazione(marchio, logoNavbar) {
  const partenza = marchio.getBoundingClientRect();
  const arrivo = riquadroDelMarchioInNavbar(logoNavbar);

  if (!arrivo || arrivo.width < 4 || partenza.width < 4) {
    marchio.animate(
      [{ opacity: 1 }, { opacity: 0 }],
      { duration: 320, easing: CURVE.posa, fill: 'forwards' },
    );
    return false;
  }

  const scala = arrivo.width / partenza.width;
  const dx = (arrivo.left + arrivo.width / 2) - (partenza.left + partenza.width / 2);
  const dy = (arrivo.top + arrivo.height / 2) - (partenza.top + partenza.height / 2);

  document.body.classList.add('intro-in-volo');

  // Il colore vira lungo il tragitto: bianco nell'intro, rosso del marchio
  // all'arrivo. Cosi allo scambio i due sono gia identici.
  const rosso = getComputedStyle(document.documentElement)
    .getPropertyValue('--color-accent').trim() || '#A72B2A';

  const corsa = marchio.animate(
    [
      { transform: 'translate(0, 0) scale(1)', color: '#FFF' },
      {
        transform: `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px) scale(${scala.toFixed(4)})`,
        color: rosso,
      },
    ],
    { duration: TEMPI.volo, easing: CURVE.posa, fill: 'forwards' },
  );

  corsa.addEventListener('finish', () => {
    marchio.animate([{ opacity: 1 }, { opacity: 0 }], { duration: TEMPI.scambio, fill: 'forwards' });
    document.body.classList.remove('intro-in-volo');
    if (logoNavbar) {
      logoNavbar.animate([{ opacity: 0 }, { opacity: 1 }], { duration: TEMPI.scambio, fill: 'both' });
    }
  });

  return true;
}

// Il logo dell'intestazione contiene marchio e sottotitolo in un'unica
// immagine 232x87; l'intro mostra solo il marchio, che li dentro occupa
// x 3,7-176,3 e y 2,6-82. Si ricava il riquadro di quella porzione, se no il
// volo atterrerebbe fuori squadro.
function riquadroDelMarchioInNavbar(logoNavbar) {
  if (!logoNavbar) return null;
  const r = logoNavbar.getBoundingClientRect();
  if (r.width === 0) return null;

  const kx = r.width / 232;
  const ky = r.height / 87;
  return {
    left: r.left + 3.7 * kx,
    top: r.top + 2.6 * ky,
    width: (176.3 - 3.7) * kx,
    height: (82 - 2.6) * ky,
  };
}

// Unico punto in cui l'intro sparisce: toglie il blocco allo scorrimento e si
// stacca dal documento, cosi non resta nessuno strato sopra la pagina.
function chiudi(intro) {
  document.body.classList.remove('intro-in-corso', 'intro-in-volo');
  if (intro && intro.isConnected) intro.remove();
}
