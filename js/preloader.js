'use strict';

// Sequenza di apertura della home.
//
// L'idea: la frase si contrae sul nome dell'azienda, e il nome diventa il
// marchio. Funziona perché FASE sono davvero le prime quattro lettere di
// FASEMEC — non è un accostamento inventato per far tornare l'effetto. Tutto
// quello che non serve al nome cade, il nome resta, si porta al centro e cede
// il posto al marchio. Un gesto solo, con una ragione.
//
// Prima le lettere superstiti erano le iniziali delle tre parole — F, M, S —
// che non compongono nulla: tre lettere lontane fra loro che scivolavano al
// centro senza motivo, e il movimento si leggeva arbitrario.
//
// Tutto in Web Animations API: il sito non carica dipendenze.

const PRELOADER_TESTO = 'FASEMEC MECHANICAL SOLUTION';

// La parte iniziale del testo che sopravvive e diventa marchio.
const PRELOADER_MARCA = 'FASE';

const TEMPI = {
  // Le parole entrano una dopo l'altra, in fretta: qui non succede ancora niente.
  parolaPasso: 90,

  // Quanto resta leggibile la frase intera prima di cominciare a sfoltirsi.
  lettura: 620,

  // Le lettere di troppo cadono, in onda da destra: l'ultima della frase per
  // prima, così lo sguardo viene accompagnato verso sinistra, dove resta il nome.
  cadutaDurata: 380,
  cadutaPasso: 26,

  // Il nome si porta sopra le lettere disegnate e ne prende la misura, poi
  // avviene lo scambio. È un blocco solo, quindi si muove come una parola.
  marcaDurata: 560,

  // Deformazione dei tracciati: è la battuta che si guarda, quindi ha respiro.
  morphDurata: 760,

  // L'anello si chiude attorno alle lettere mentre finiscono di formarsi.
  anelloDurata: 460,

  // Il marchio fermo, da solo. È il momento per cui esiste la sequenza.
  marchioPausa: 1000,

  pannelloDurata: 520,
};

const CURVE = {
  // Parte di scatto e frena a lungo: la lettera si stacca e si posa.
  caduta: 'cubic-bezier(0.65, 0, 0.35, 1)',
  // Frenata lunga senza rimbalzo: il nome arriva al centro e si ferma.
  approdo: 'cubic-bezier(0.16, 0.84, 0.28, 1)',
  pannello: 'cubic-bezier(0.42, 0, 0.58, 1)',
};

const CHIAVE_SESSIONE = 'fase-preloader';

document.addEventListener('DOMContentLoaded', avviaPreloader);

function avviaPreloader() {
  const pannello = document.querySelector('[data-preloader]');
  if (!pannello) return;

  // Chi ha già visto la sequenza in questa scheda non la rivede. Lo script in
  // testa a index.html ha già nascosto il pannello prima del primo disegno.
  if (giaVisto()) {
    pannello.remove();
    return;
  }
  segnaVisto();

  // Con prefers-reduced-motion il CSS tiene il pannello a display:none.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    pannello.remove();
    return;
  }

  const testo = pannello.querySelector('[data-preloader-testo]');
  const logo = pannello.querySelector('[data-preloader-logo]');

  const composizione = componiTesto(testo, PRELOADER_TESTO, PRELOADER_MARCA);
  adattaLarghezza(testo);
  const riadatta = () => adattaLarghezza(testo);
  window.addEventListener('resize', riadatta);

  const fineCaduta = entrataECaduta(composizione);
  const marchioFermo = morphNelMarchio(composizione.marca, logo, fineCaduta);

  uscitaPannello(pannello, ritardoUscita(marchioFermo), () => {
    window.removeEventListener('resize', riadatta);
    pannello.remove();
  });
}

function giaVisto() {
  try {
    return !!sessionStorage.getItem(CHIAVE_SESSIONE);
  } catch (errore) {
    return false; // navigazione privata con storage negato: si mostra e basta.
  }
}

function segnaVisto() {
  try {
    sessionStorage.setItem(CHIAVE_SESSIONE, '1');
  } catch (errore) { /* vedi sopra */ }
}

// ---------------------------------------------------------------- il testo

// Il nome finisce in un elemento suo, non in quattro lettere sciolte: dopo dovrà
// muoversi come un blocco unico, e un contenitore lo fa senza dover ricalcolare
// la posizione di ogni glifo. Il resto della frase resta glifo per glifo, perché
// ogni lettera cade per conto proprio.
function componiTesto(contenitore, frase, marca) {
  const parole = frase.split(' ');
  const cadenti = [];
  let nodoMarca = null;

  contenitore.textContent = '';

  parole.forEach((parola, indiceParola) => {
    const blocco = document.createElement('span');
    blocco.className = 'preloader__parola';

    // Solo la prima parola può contenere il nome, e solo se ne è il principio.
    const conMarca = indiceParola === 0 && parola.startsWith(marca);

    if (conMarca) {
      nodoMarca = document.createElement('span');
      nodoMarca.className = 'preloader__marca';
      nodoMarca.textContent = marca;
      blocco.appendChild(nodoMarca);
    }

    [...(conMarca ? parola.slice(marca.length) : parola)].forEach((carattere) => {
      const glifo = document.createElement('span');
      glifo.className = 'preloader__glifo';
      glifo.textContent = carattere;
      blocco.appendChild(glifo);
      cadenti.push({ nodo: glifo, parola: indiceParola });
    });

    contenitore.appendChild(blocco);
  });

  return { marca: nodoMarca, cadenti, parole: parole.length };
}

// Il testo si stringe solo se non ci sta: non lo si ingrandisce mai oltre la
// misura naturale. Prima veniva stirato fino a riempire la riga, e su un
// monitor largo diventava una striscia sottile larga quanto lo schermo.
function adattaLarghezza(testo) {
  testo.style.transform = 'scale(1)';

  const disponibile = testo.parentElement.clientWidth;
  const naturale = testo.scrollWidth;
  if (!naturale || !disponibile) return;

  const fattore = Math.min(1, disponibile / naturale);
  testo.style.transform = `scale(${fattore.toFixed(4)})`;
}

// ---------------------------------------------------------------- i passi

// Entrata parola per parola, poi caduta lettera per lettera. Restituisce
// l'istante in cui l'ultima lettera ha finito di cadere: da lì riparte il resto.
function entrataECaduta({ marca, cadenti, parole }) {
  const entrata = (nodo, indiceParola) => nodo.animate(
    [{ opacity: 0, transform: 'translateY(0.18em)' }, { opacity: 1, transform: 'none' }],
    {
      duration: 260,
      delay: indiceParola * TEMPI.parolaPasso,
      easing: CURVE.approdo,
      fill: 'backwards',
    },
  );

  if (marca) entrata(marca, 0);
  cadenti.forEach(({ nodo, parola }) => entrata(nodo, parola));

  const inizioCaduta = (parole - 1) * TEMPI.parolaPasso + TEMPI.lettura;

  // L'onda parte dall'ultima lettera della frase e risale verso il nome.
  cadenti.forEach(({ nodo }, indice) => {
    const daDestra = cadenti.length - 1 - indice;

    nodo.animate(
      [
        { opacity: 1, transform: 'translateY(0) scale(1)' },
        { opacity: 0, transform: 'translateY(0.7em) scale(0.86)' },
      ],
      {
        duration: TEMPI.cadutaDurata,
        delay: inizioCaduta + daDestra * TEMPI.cadutaPasso,
        easing: CURVE.caduta,
        fill: 'forwards',
      },
    );
  });

  return inizioCaduta + (cadenti.length - 1) * TEMPI.cadutaPasso + TEMPI.cadutaDurata;
}

// Costruisce l'attributo d di una lettera. I buchi si contraggono sul proprio
// centro invece di restare: la A del testo ha l'occhiello chiuso, quella del
// marchio no, e farlo rimpicciolire fino a sparire e piu leggibile che
// deformarlo verso una forma che dall'altra parte non esiste.
function tracciaLettera(lettera, t) {
  const punto = (q, r) => `${(q[0] + (r[0] - q[0]) * t).toFixed(2)} ${(q[1] + (r[1] - q[1]) * t).toFixed(2)}`;
  let d = `M${lettera.da.map((q, i) => punto(q, lettera.a[i])).join('L')}Z`;

  const resta = Math.max(0.001, 1 - t);
  lettera.buchi.forEach((buco) => {
    const cx = buco.reduce((s, q) => s + q[0], 0) / buco.length;
    const cy = buco.reduce((s, q) => s + q[1], 0) / buco.length;
    d += `M${buco.map((q) => `${(cx + (q[0] - cx) * resta).toFixed(2)} ${(cy + (q[1] - cy) * resta).toFixed(2)}`).join('L')}Z`;
  });
  return d;
}

// Il passaggio dal nome al marchio.
//
// Le lettere del marchio partono con la forma di quelle del testo: stesse
// lettere, stesso font. Il nome scritto in HTML si porta esattamente sopra di
// loro e li si scambiano — forme identiche nello stesso posto, quindi lo
// scambio non si vede. Da quel momento sono i tracciati a deformarsi, e ogni
// forma si puo seguire fino a quella d'arrivo.
//
// L'anello e la barra della E non si deformano da nulla: arrivano. Sono pezzi
// che nel testo non hanno un corrispettivo, e fingere che nascano da una
// lettera si vedrebbe.
function morphNelMarchio(marca, svg, fineCaduta) {
  if (!marca || !svg || typeof MARCHIO === 'undefined') return fineCaduta;

  const tracciati = new Map(
    [...svg.querySelectorAll('[data-marchio]')].map((n) => [n.dataset.marchio, n]),
  );
  const sottotitolo = svg.querySelector('text');
  const lettere = MARCHIO.lettere.filter((l) => tracciati.has(l.segno));

  // stato di partenza: lettere con la forma del testo, il resto assente
  lettere.forEach((l) => tracciati.get(l.segno).setAttribute('d', tracciaLettera(l, 0)));
  ['anello', 'barraE'].forEach((k) => { if (tracciati.has(k)) tracciati.get(k).style.opacity = '0'; });
  if (sottotitolo) sottotitolo.style.opacity = '0';
  svg.style.opacity = '1';
  svg.style.visibility = 'hidden'; // misurabile ma non ancora a schermo

  // dove stanno adesso le lettere disegnate, e dove sta il nome scritto
  const riquadroLettere = lettere
    .map((l) => tracciati.get(l.segno).getBoundingClientRect())
    .reduce((acc, r) => ({
      left: Math.min(acc.left, r.left), right: Math.max(acc.right, r.right),
      top: Math.min(acc.top, r.top), bottom: Math.max(acc.bottom, r.bottom),
    }), { left: Infinity, right: -Infinity, top: Infinity, bottom: -Infinity });

  const nome = marca.getBoundingClientRect();
  const scala = nome.width > 0 ? (riquadroLettere.right - riquadroLettere.left) / nome.width : 1;
  const dx = (riquadroLettere.left + riquadroLettere.right) / 2 - (nome.left + nome.right) / 2;
  const dy = (riquadroLettere.top + riquadroLettere.bottom) / 2 - (nome.top + nome.bottom) / 2;

  // il nome raggiunge la posizione e la misura delle lettere disegnate
  marca.animate(
    [
      { transform: 'translate(0, 0) scale(1)' },
      { transform: `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px) scale(${scala.toFixed(3)})` },
    ],
    {
      duration: TEMPI.marcaDurata, delay: fineCaduta, easing: CURVE.approdo, fill: 'forwards',
    },
  );

  const scambio = fineCaduta + TEMPI.marcaDurata;
  const fineMorph = scambio + TEMPI.morphDurata;

  const avvia = (ritardo, azione) => setTimeout(azione, ritardo);

  avvia(scambio, () => {
    marca.style.opacity = '0';
    svg.style.visibility = 'visible';

    const partito = performance.now();
    const passo = (adesso) => {
      const grezzo = Math.min((adesso - partito) / TEMPI.morphDurata, 1);
      // stessa frenata delle altre battute, calcolata invece che dichiarata
      const t = 1 - (1 - grezzo) ** 3;
      lettere.forEach((l) => tracciati.get(l.segno).setAttribute('d', tracciaLettera(l, t)));
      if (grezzo < 1) requestAnimationFrame(passo);
    };
    requestAnimationFrame(passo);
  });

  // l'anello si chiude attorno alle lettere mentre finiscono di formarsi
  const anello = tracciati.get('anello');
  if (anello) {
    anello.animate(
      [{ opacity: 0, transform: 'scale(0.94)' }, { opacity: 1, transform: 'scale(1)' }],
      {
        duration: TEMPI.anelloDurata,
        delay: scambio + TEMPI.morphDurata * 0.45,
        easing: CURVE.approdo,
        fill: 'forwards',
      },
    );
  }

  const barra = tracciati.get('barraE');
  if (barra) {
    barra.animate(
      [{ opacity: 0, transform: 'translateY(-2px)' }, { opacity: 1, transform: 'translateY(0)' }],
      { duration: 260, delay: fineMorph - 120, easing: CURVE.approdo, fill: 'forwards' },
    );
  }

  if (sottotitolo) {
    sottotitolo.animate(
      [{ opacity: 0 }, { opacity: 1 }],
      { duration: 320, delay: fineMorph + 40, easing: CURVE.approdo, fill: 'forwards' },
    );
  }

  return fineMorph + TEMPI.anelloDurata * 0.5;
}

// Il pannello parte dopo che il marchio si e composto e ha avuto la sua pausa.
function ritardoUscita(marchioFermo) {
  return marchioFermo + TEMPI.marchioPausa;
}

// L'1% in più copre l'arrotondamento subpixel: senza, resta una riga chiara.
function uscitaPannello(pannello, ritardo, allaFine) {
  const uscita = pannello.animate(
    [{ transform: 'translateY(0)' }, { transform: 'translateY(-101%)' }],
    {
      duration: TEMPI.pannelloDurata,
      delay: ritardo,
      easing: CURVE.pannello,
      fill: 'forwards',
    },
  );

  uscita.addEventListener('finish', allaFine);
}
