'use strict';

// Intro della home.
//
// Sipario nero davanti al sito. Una linea bianca attraversa lo spazio del
// marchio e lo scopre man mano che passa — e una maschera, non una dissolvenza:
// prima della linea il marchio non c'e, dopo c'e. Poi la tagline, una
// pausa, e il sipario si apre verso l'alto mentre il marchio raggiunge il suo
// posto nell'intestazione.
//
// Il sito sotto e gia quello definitivo, coi suoi colori: l'intro non lo tocca.
// Niente librerie: Web Animations API e clip-path.

const CHIAVE_SESSIONE = 'faseIntroPlayed';

const TEMPI = {
  attesa: 200,          // nero, prima che accada qualcosa
  scansione: 1000,      // la linea attraversa il marchio: deliberata, non rapida
  taglineRitardo: 850,  // la tagline entra quando la scansione e all'85%
  tagline: 350,
  lineaSvanisce: 140,   // la linea supera il marchio e si spegne
  respiro: 800,         // marchio completo e immobile: e il momento centrale
  respiroStretto: 700,  // su schermi piccoli si accorcia, non si toglie
  volo: 600,            // il lockup raggiunge l'intestazione
  sipario: 640,         // il nero si ritira verso l'alto
  scambio: 110,         // incrocio col logo di navbar
};

const CURVE = {
  // Frenata lunga senza rimbalzo: e la curva del movimento premium.
  posa: 'cubic-bezier(0.22, 1, 0.36, 1)',
  // La scansione: parte controllata, prende un filo di velocita, si posa.
  scansione: 'cubic-bezier(0.45, 0, 0.2, 1)',
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

  const lockup = intro.querySelector('[data-intro-lockup]');
  const marca = intro.querySelector('[data-intro-marca]');
  const tagline = intro.querySelector('[data-intro-tagline]');
  const linea = intro.querySelector('[data-intro-linea]');
  if (!lockup || !marca || !linea) { intro.remove(); return; }

  document.body.classList.add('intro-in-corso');
  // Rete di sicurezza: se qualcosa si inceppa la pagina non resta bloccata.
  const salvagente = setTimeout(() => chiudi(intro), 8000);

  scansiona(marca, linea, lockup);
  entraTagline(tagline);

  // Il marchio e completo quando l'ultima delle due cose ha finito: la linea
  // che si spegne o la tagline che arriva. Da li parte la sosta, e solo dopo
  // la sosta comincia l'uscita — prima il marchio, poi il sito.
  const marchioCompleto = Math.max(
    TEMPI.attesa + TEMPI.scansione + TEMPI.lineaSvanisce,
    TEMPI.attesa + TEMPI.taglineRitardo + TEMPI.tagline,
  );
  const sosta = window.innerWidth < 480 ? TEMPI.respiroStretto : TEMPI.respiro;

  setTimeout(() => {
    clearTimeout(salvagente);
    apriSipario(intro, lockup);
  }, marchioCompleto + sosta);
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
// e questo a far leggere il marchio come rivelato dalla linea, non come
// comparso per conto suo. Stessa durata e stessa curva per entrambe, se no si
// staccherebbero a meta strada.
function scansiona(marca, linea, lockup) {
  const durata = TEMPI.scansione;
  const parte = TEMPI.attesa;

  marca.animate(
    [{ clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0 0 0)' }],
    {
      duration: durata, delay: parte, easing: CURVE.scansione, fill: 'both',
    },
  );

  // Il marchio occupa x 3,7-176,3 dei 232 del lockup: la linea percorre quello,
  // non tutta la casella, e prosegue di un soffio oltre il bordo destro perche
  // si veda che la scansione e finita davvero.
  const larghezza = lockup.getBoundingClientRect().width;
  const daX = (3.7 / 232) * larghezza;
  const aX = ((176.3 / 232) * larghezza) + larghezza * 0.015;

  linea.animate(
    [
      { transform: `translateX(${daX.toFixed(1)}px)`, opacity: 1 },
      { transform: `translateX(${aX.toFixed(1)}px)`, opacity: 1 },
    ],
    {
      duration: durata, delay: parte, easing: CURVE.scansione, fill: 'both',
    },
  );

  // Superato il marchio si spegne: non sparisce di colpo.
  linea.animate(
    [{ opacity: 1 }, { opacity: 0 }],
    {
      duration: TEMPI.lineaSvanisce,
      delay: parte + durata - 20,
      easing: CURVE.posa,
      fill: 'forwards',
    },
  );

  // Assestamento appena percettibile, chiuso insieme alla scansione: da li in
  // poi il marchio e a scala 1 e non si muove piu.
  lockup.animate(
    [{ transform: 'scale(0.99)' }, { transform: 'scale(1)' }],
    {
      duration: 420, delay: parte + durata - 380, easing: CURVE.posa, fill: 'both',
    },
  );
}

// Entra quando la scansione e all'85%: completa il marchio senza esibirsi.
// Solo opacita — un movimento in piu, qui, si noterebbe.
function entraTagline(tagline) {
  if (!tagline) return;

  tagline.animate(
    [{ opacity: 0 }, { opacity: 1 }],
    {
      duration: TEMPI.tagline,
      delay: TEMPI.attesa + TEMPI.taglineRitardo,
      easing: CURVE.posa,
      fill: 'both',
    },
  );
}

// ----------------------------------------------------------------- uscita

// Il sipario si ritira verso l'alto e insieme il lockup raggiunge il posto del
// logo nell'intestazione. Parte solo a sosta finita: prima il marchio, poi il
// sito.
function apriSipario(intro, lockup) {
  const logoNavbar = document.querySelector('.site-header__marchio');
  const volo = portaAllIntestazione(lockup, logoNavbar);

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

// FLIP. Il lockup dell'intro e il logo dell'intestazione sono la stessa
// composizione nello stesso spazio 232x87, quindi i due riquadri si
// corrispondono uno a uno e non serve ritagliare porzioni.
// Se il logo di navbar manca o non e visibile si preferisce una dissolvenza
// pulita a un volo verso il nulla.
function portaAllIntestazione(lockup, logoNavbar) {
  const partenza = lockup.getBoundingClientRect();
  const arrivo = logoNavbar ? logoNavbar.getBoundingClientRect() : null;

  if (!arrivo || arrivo.width < 4 || partenza.width < 4) {
    lockup.animate(
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

  const corsa = lockup.animate(
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
    lockup.animate([{ opacity: 1 }, { opacity: 0 }], { duration: TEMPI.scambio, fill: 'forwards' });
    document.body.classList.remove('intro-in-volo');
    logoNavbar.animate([{ opacity: 0 }, { opacity: 1 }], { duration: TEMPI.scambio, fill: 'both' });
  });

  return true;
}

// Unico punto in cui l'intro sparisce: toglie il blocco allo scorrimento e si
// stacca dal documento, cosi non resta nessuno strato sopra la pagina.
function chiudi(intro) {
  document.body.classList.remove('intro-in-corso', 'intro-in-volo');
  if (intro && intro.isConnected) intro.remove();
}
