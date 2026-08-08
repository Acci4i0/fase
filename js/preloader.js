'use strict';

// Sequenza di apertura, ricostruita dai valori misurati su auw.studio e
// riportati in ANALYSIS.md. L'originale è un file After Effects riprodotto da
// Lottie; qui è tutto in Web Animations API, senza librerie, perché il sito non
// carica dipendenze esterne. I numeri però sono quelli estratti, non a occhio:
// vedi TEMPI qui sotto, ogni voce ha il riferimento al paragrafo dell'analisi.

const PRELOADER_TESTO = 'FASEMEC MECHANICAL SOLUTION';

// La sequenza è divisa in quattro battute: il testo entra, si sfoglia, il
// marchio prende il posto delle iniziali, il marchio resta fermo. L'ultima è
// la più importante: è lì che l'occhio si posa, e prima non esisteva — il
// pannello partiva mentre il logo stava ancora comparendo, e quel
// sovrapporsi era lo strappo. Ora fra la comparsa e la partenza c'è una
// pausa di mezzo secondo in cui non si muove niente.
const TEMPI = {
  // Entrata: passo accorciato da 166,7 a 100 ms. L'apertura era la parte
  // più lenta e non ci succede niente: tanto vale arrivarci prima.
  parolaPasso: 100,

  // I glifi non iniziali cadono di un'altezza di riga, in onda da destra.
  cadutaInizio: 780,
  cadutaDurata: 400,
  // 22 glifi in caduta: a 28 ms l'onda dura 590 ms e chiude a 1,77 s.
  cadutaPasso: 28,

  // Le iniziali si stringono e sfumano; il marchio entra mentre svaniscono,
  // dallo stesso bordo sinistro, così la sostituzione avviene sul posto.
  marchioInizio: 1820,
  marchioDurata: 420,
  // Di quanto il marchio parte in ritardo rispetto alle lettere: si
  // incrociano a metà strada invece di darsi il cambio di netto.
  marchioSfasamento: 170,

  // La battuta più lunga di tutte: il marchio fermo al centro, da solo. È il
  // motivo per cui la sequenza esiste, quindi dura più di ogni altra fase.
  marchioPausa: 1250,

  // Il pannello parte dopo la pausa, non durante la comparsa del marchio.
  pannelloDurata: 520,

  // Il contatore chiude prima che cominci la caduta.
  contaFine: 1150,
};

// Momento in cui il marchio è arrivato e sta fermo, e quello in cui il
// pannello comincia a salire. Derivati, così spostando una battuta le altre
// si riallineano da sole invece di andare fuori sincrono a mano.
TEMPI.marchioFermo = TEMPI.marchioInizio + TEMPI.marchioSfasamento + TEMPI.marchioDurata;
TEMPI.pannelloRitardo = TEMPI.marchioFermo + TEMPI.marchioPausa;

const CURVE = {
  // § 5 — tangenti Lottie o=(1,0) i=(0.45,0.99) del segmento di caduta.
  caduta: 'cubic-bezier(1, 0, 0.45, 0.99)',
  // § 3.1 — "easeInOut" di framer-motion.
  pannello: 'cubic-bezier(0.42, 0, 0.58, 1)',
  // § 4 — tangenti 0.167/0.833: la ease-in-out simmetrica di After Effects.
  morbida: 'cubic-bezier(0.167, 0.167, 0.833, 0.833)',
  // Frenata lunga: parte decisa e si posa senza rimbalzo. È la curva con cui
  // il marchio arriva a fermarsi, e deve leggersi come un appoggio.
  approdo: 'cubic-bezier(0.16, 0.84, 0.28, 1)',
};

const CHIAVE_SESSIONE = 'fase-preloader';

document.addEventListener('DOMContentLoaded', avviaPreloader);

function avviaPreloader() {
  const pannello = document.querySelector('[data-preloader]');
  if (!pannello) return;

  // Chi ha già visto la sequenza in questa scheda non la rivede. Lo script in
  // testa a index.html ha già nascosto il pannello prima del primo disegno:
  // qui si chiude il cerchio togliendolo dal documento.
  if (giaVisto()) {
    pannello.remove();
    return;
  }
  segnaVisto();

  // Con prefers-reduced-motion il CSS tiene il pannello a display:none. Non
  // c'è niente da animare e la pagina è già quella buona: si esce subito.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    pannello.remove();
    return;
  }

  const testo = pannello.querySelector('[data-preloader-testo]');
  const logo = pannello.querySelector('[data-preloader-logo]');
  const conta = pannello.querySelector('[data-preloader-conta]');

  const glifi = componiTesto(testo, PRELOADER_TESTO);
  adattaLarghezza(testo);
  const riadatta = () => adattaLarghezza(testo);
  window.addEventListener('resize', riadatta);

  entrataParole(glifi);
  cadutaGlifi(glifi);
  scopriMarchio(glifi, logo);
  contaPercentuale(conta);
  uscitaPannello(pannello, () => {
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

// Un elemento per glifo, perché ognuno se ne va per conto suo. Le parole
// restano raggruppate: servono per l'entrata sfalsata e per non spezzarle a
// capo. Lo spazio fra parole è un margine, non un carattere, così l'indice dei
// glifi resta pulito.
function componiTesto(contenitore, frase) {
  const parole = frase.split(' ');
  const glifi = [];

  contenitore.textContent = '';

  parole.forEach((parola, indiceParola) => {
    const blocco = document.createElement('span');
    blocco.className = 'preloader__parola';

    [...parola].forEach((carattere, indiceLettera) => {
      const glifo = document.createElement('span');
      glifo.className = 'preloader__glifo';
      glifo.textContent = carattere;
      blocco.appendChild(glifo);

      glifi.push({
        nodo: glifo,
        parola: indiceParola,
        // L'iniziale di ogni parola è quella che resta: F, M, S.
        resta: indiceLettera === 0,
      });
    });

    contenitore.appendChild(blocco);
  });

  return glifi;
}

// L'originale non ha breakpoint: è la composizione intera a rimpicciolirsi,
// mantenendo le proporzioni (§ 6.5). Qui si misura la larghezza naturale del
// testo e lo si scala per riempire lo spazio che resta accanto al contatore.
function adattaLarghezza(testo) {
  testo.style.transform = 'scale(1)';

  const disponibile = testo.parentElement.clientWidth;
  const naturale = testo.scrollWidth;
  if (!naturale || !disponibile) return;

  testo.style.transform = `scale(${(disponibile / naturale).toFixed(4)})`;
}

// ---------------------------------------------------------------- i passi

// § 4 — una parola ogni 10 frame. Taglio secco nell'originale: il layer
// semplicemente comincia. Qui un'opacità istantanea fa lo stesso effetto.
function entrataParole(glifi) {
  glifi.forEach(({ nodo, parola }) => {
    nodo.animate(
      [{ opacity: 0 }, { opacity: 0 }, { opacity: 1 }],
      { duration: 1, delay: parola * TEMPI.parolaPasso, fill: 'backwards' },
    );
  });
}

// § 5 — i glifi non iniziali scendono di un'altezza di riga svanendo, in onda
// da destra a sinistra: cade prima l'ultima lettera della riga.
function cadutaGlifi(glifi) {
  const inCaduta = glifi.filter((g) => !g.resta);

  inCaduta.forEach(({ nodo }, indice) => {
    const daDestra = inCaduta.length - 1 - indice;

    nodo.animate(
      [
        { transform: 'translateY(0)', opacity: 1 },
        { transform: 'translateY(1em)', opacity: 0 },
      ],
      {
        duration: TEMPI.cadutaDurata,
        delay: TEMPI.cadutaInizio + daDestra * TEMPI.cadutaPasso,
        easing: CURVE.caduta,
        fill: 'forwards',
      },
    );
  });
}

// Fase nostra: restano F, M e S, larghe come le parole che le contenevano. Si
// stringono contro il bordo sinistro — lo stesso da cui entra il marchio — e
// sfumano mentre lui arriva. Condividere l'origine è quello che fa leggere il
// passaggio come una sostituzione sul posto e non come due cose diverse che si
// danno il cambio.
function scopriMarchio(glifi, logo) {
  const superstiti = glifi.filter((g) => g.resta).map((g) => g.nodo);
  if (superstiti.length === 0 || !logo) return;

  // Le misure si prendono adesso, a testo fermo: dopo la caduta i glifi hanno
  // trasformazioni applicate e i rettangoli non sarebbero più quelli buoni.
  const partenze = superstiti.map((n) => n.getBoundingClientRect());
  const passo = partenze[0].width * 1.06; // un filo d'aria fra le lettere

  // Le iniziali si raccolgono al centro della scena, dove comparirà il marchio.
  // Prima si accostavano al bordo sinistro perché lì stava il logo; ora che il
  // logo è al centro devono arrivarci anche loro, o il passaggio si spezza.
  const scena = superstiti[0].closest('.preloader__marchio');
  const riquadro = scena ? scena.getBoundingClientRect() : partenze[0];
  const larghezzaGruppo = passo * (superstiti.length - 1) + partenze[superstiti.length - 1].width;
  const inizioGruppo = riquadro.left + riquadro.width / 2 - larghezzaGruppo / 2;

  superstiti.forEach((nodo, indice) => {
    const arrivo = inizioGruppo + passo * indice;
    const spostamento = arrivo - partenze[indice].left;

    // Le lettere non svaniscono sul posto: si accostano e insieme rimpiccioliscono
    // di un soffio, come se il marchio le riassorbisse. Ognuna parte un istante
    // dopo la precedente, così il gruppo si chiude invece di sparire in blocco.
    nodo.animate(
      [
        { transform: 'translateX(0) scale(1)', opacity: 1, offset: 0 },
        { transform: `translateX(${(spostamento * 0.72).toFixed(1)}px) scale(0.97)`, opacity: 0.62, offset: 0.55 },
        { transform: `translateX(${spostamento.toFixed(1)}px) scale(0.9)`, opacity: 0, offset: 1 },
      ],
      {
        duration: TEMPI.marchioDurata,
        delay: TEMPI.marchioInizio + indice * 45,
        easing: CURVE.approdo,
        fill: 'forwards',
      },
    );
  });

  // Il marchio sale di un niente e cresce fino alla misura giusta, incrociando
  // le lettere a metà strada. Finisce fermo e ci resta: la pausa dopo non è
  // tempo morto, è il momento in cui la sequenza vuole essere guardata.
  logo.animate(
    [
      { opacity: 0, transform: 'translateY(6px) scale(0.94)' },
      { opacity: 1, transform: 'translateY(0) scale(1)' },
    ],
    {
      duration: TEMPI.marchioDurata,
      delay: TEMPI.marchioInizio + TEMPI.marchioSfasamento,
      easing: CURVE.approdo,
      fill: 'forwards',
    },
  );
}

// § 6.3 — nell'originale è finto: 28 fotogrammi già disegnati, con
// un'accelerazione a mano che tocca il fondo scala a 1,567 s. Qui la stessa
// curva, calcolata invece che disegnata. Non misura nulla, esattamente come là.
function contaPercentuale(conta) {
  if (!conta) return;

  const partenza = performance.now();

  const passo = (adesso) => {
    const avanzamento = Math.min((adesso - partenza) / TEMPI.contaFine, 1);
    const eased = avanzamento < 0.5
      ? 4 * avanzamento ** 3
      : 1 - (-2 * avanzamento + 2) ** 3 / 2;

    conta.textContent = `${Math.round(eased * 100)}%`;
    if (avanzamento < 1) requestAnimationFrame(passo);
  };

  requestAnimationFrame(passo);
}

// § 3.1 — y da 0 a -101%, ritardo 3,5 s, durata 0,5 s, easeInOut. L'1% in più
// copre l'arrotondamento subpixel: senza, resta una riga chiara sul bordo.
function uscitaPannello(pannello, allaFine) {
  const uscita = pannello.animate(
    [{ transform: 'translateY(0)' }, { transform: 'translateY(-101%)' }],
    {
      duration: TEMPI.pannelloDurata,
      delay: TEMPI.pannelloRitardo,
      easing: CURVE.pannello,
      fill: 'forwards',
    },
  );

  uscita.addEventListener('finish', allaFine);
}

// ---------------------------------------------------------------------------
// DOVE MI SONO DISCOSTATO DAL RIFERIMENTO, E PERCHÉ
//
// 1. Nessuna libreria. Il riferimento usa framer-motion per il pannello e
//    Lottie per il testo (~250 kB solo il player). Questo sito non carica
//    dipendenze esterne, quindi tutto è in Web Animations API. I tempi e le
//    curve sono però quelli estratti: § 3.1 e § 5 di ANALYSIS.md.
//
// 2. Il morph è ricostruito, non riprodotto. Nel riferimento è un file After
//    Effects con centinaia di keyframe disegnati a mano su quelle 15 lettere:
//    non è codice e non è trasportabile su un testo diverso. Qui la stessa
//    idea — caduta sfalsata da destra a sinistra che lascia le iniziali — è
//    calcolata sui glifi, quindi funziona con qualunque frase.
//
// 3. Passo della caduta dimezzato: 33,3 ms invece dei 66,7 ms misurati. I
//    glifi che cadono qui sono 22 contro la decina dell'originale; al passo
//    pieno l'onda durerebbe 1,5 s e non starebbe nella finestra di 4 s.
//
// 4. Fase finale nuova. Nel riferimento le iniziali restano ferme e la
//    composizione finisce vuota (§ 5, punto aperto). Qui F, M ed S si
//    stringono e cedono il posto al marchio: è quello che era stato chiesto,
//    e nell'originale non esiste niente di equivalente da copiare.
//
// 5. Il marchio è un <img>, non un SVG inline. In img/ c'è solo il PNG. Il
//    riferimento non anima path SVG — muove gruppi interi di glifi — quindi
//    un raster in dissolvenza non toglie nulla. Con un logo vettoriale si
//    potrebbe animare il tracciato: basta sostituire il tag.
//
// 6. prefers-reduced-motion rispettato. Il riferimento lo ignora (§ 6.4).
//    Qui il CSS tiene il pannello a display:none e la pagina si apre subito.
//
// 7. Larghezza del testo. Il riferimento lascia un vuoto largo fra testo e
//    contatore; con 27 caratteri invece di 15 quel vuoto non c'è più e il
//    blocco si scala per riempire lo spazio. Il contatore rimpicciolisce
//    sotto i 768 px per non mangiarsi la riga (vedi il CSS).
//
// 8. Solo in home. Il riferimento mostra la sequenza sulla prima pagina di
//    arrivo, qualunque sia. Qui il markup sta in index.html: metterlo in
//    tutte e venti le pagine avrebbe voluto dire venti copie da tenere
//    allineate a mano, per un guadagno discutibile.
//
// 9. sessionStorage. Il progetto non usa storage, ma la regola "una volta per
//    sessione" senza storage non si scrive. È sessionStorage, non
//    localStorage: si svuota chiudendo la scheda, non lascia tracce.
// ---------------------------------------------------------------------------
