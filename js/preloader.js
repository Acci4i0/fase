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

  // Il nome si porta al centro e cresce. È un blocco solo, non quattro lettere
  // da riallineare: si muove come una parola.
  marcaDurata: 620,

  // Il marchio entra mentre il nome è ancora in viaggio: si sovrappongono.
  marchioAnticipo: 200,
  marchioDurata: 420,

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
  portaAlCentro(composizione.marca, logo, fineCaduta);

  uscitaPannello(pannello, ritardoUscita(fineCaduta), () => {
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

// Il nome scivola al centro della scena e cresce verso la misura del marchio,
// che gli si sovrappone mentre è ancora in movimento. Condividere centro e
// misura è quello che fa leggere il passaggio come una cosa sola che si
// trasforma, invece di due che si danno il cambio.
function portaAlCentro(marca, logo, fineCaduta) {
  if (!marca || !logo) return;

  const partenza = marca.getBoundingClientRect();
  const scena = marca.closest('.preloader__marchio').getBoundingClientRect();
  const arrivo = logo.getBoundingClientRect();

  const spostamento = (scena.left + scena.width / 2) - (partenza.left + partenza.width / 2);
  // Quanto deve crescere il nome per stare alla larghezza del marchio. Il tetto
  // evita che su schermi stretti diventi più grande del marchio che lo sostituisce.
  const crescita = partenza.width > 0
    ? Math.min(2.4, Math.max(1, (arrivo.width * 0.82) / partenza.width))
    : 1;

  marca.animate(
    [
      { transform: 'translateX(0) scale(1)', opacity: 1 },
      { transform: `translateX(${spostamento.toFixed(1)}px) scale(${crescita.toFixed(3)})`, opacity: 0 },
    ],
    {
      duration: TEMPI.marcaDurata,
      delay: fineCaduta,
      easing: CURVE.approdo,
      fill: 'forwards',
    },
  );

  logo.animate(
    [
      { opacity: 0, transform: 'scale(0.94)' },
      { opacity: 1, transform: 'scale(1)' },
    ],
    {
      duration: TEMPI.marchioDurata,
      delay: fineCaduta + TEMPI.marcaDurata - TEMPI.marchioAnticipo,
      easing: CURVE.approdo,
      fill: 'forwards',
    },
  );
}

// Il pannello parte dopo che il marchio è arrivato e ha avuto la sua pausa.
function ritardoUscita(fineCaduta) {
  const marchioFermo = fineCaduta + TEMPI.marcaDurata - TEMPI.marchioAnticipo + TEMPI.marchioDurata;
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
