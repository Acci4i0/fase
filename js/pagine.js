// Carte per meta nella striscia fotografica di Azienda. Va dichiarata qui: il
// montaggio della pagina parte subito sotto, e una const letta piu in basso nel
// file non sarebbe ancora inizializzata.
const CARTE_STRISCIA = 12;

riempiPagina();

function riempiPagina() {
  const contenuto = document.querySelector('[data-pagina]');
  if (!contenuto) return;

  const costruisci = {
    home: paginaHome,
    sistema: paginaSistema,
    macchina: paginaMacchina,
    azienda: paginaAzienda,
    contatti: paginaContatti,
    elenco: paginaElenco,
    legale: paginaLegale,
    soluzione: paginaSoluzione,
  }[contenuto.dataset.pagina];

  if (costruisci) contenuto.insertAdjacentHTML('afterbegin', costruisci(contenuto.dataset));
}

// ---------------------------------------------------------------- home

function paginaHome() {
  return fasciaProdotto(carosello({
    classi: 'carousel section hero',
    attributi: 'data-carousel-name="Hero" aria-roledescription="carosello" aria-label="Storie in evidenza"',
    contenitore: 'div',
    classeTraccia: 'hero__track',
    slide: DATI.hero.map(slideHero),
    controlli: controlliSovrapposti('slide', 'Slide'),
  })) + sezioneSistemi() + sezioneSoluzioni();
}

// Le sezioni con foto di prodotto vanno su fondo grigio a tutta larghezza:
// la .section resta centrata e limitata, la fascia porta il colore fino ai bordi.
function fasciaProdotto(contenuto) {
  return `<div class="fascia-prodotto">${contenuto}</div>`;
}

// Puntinato dello stesso tratto della mappa della Sede: dà fondo al bianco dietro le
// card senza aggiungere un'immagine da caricare.
function fasciaPunteggiata(contenuto) {
  return `<div class="fascia-punteggiata">${contenuto}</div>`;
}

// Il testo precede la foto nel markup: è l'ordine che serve su mobile, dove le
// due colonne si impilano, e da tablet in su la griglia le affianca.
function slideHero(slide, indice) {
  const titolo = indice === 0 ? 'h1' : 'h2';
  return `
        <article class="carousel__slide hero__slide${indice === 0 ? ' is-active' : ''}" aria-roledescription="slide" aria-label="${indice + 1} di ${DATI.hero.length}">
          <div class="hero__content">
            <${titolo} class="hero__title">${slide.titolo}</${titolo}>
            <p class="hero__text">${slide.testo}</p>
            <a class="button-accent" href="${percorso(slide.cta.href)}">${slide.cta.testo}</a>
          </div>
          ${media(slide.immagine, slide.placeholder, 'media--hero', indice === 0)}
        </article>`;
}

// La fascia grigia parte sotto il bordo alto delle tessere, che la scavalcano.
function sezioneSoluzioni() {
  return `
  <div class="fascia-soluzioni">
    <section class="section soluzioni" aria-label="Soluzioni">
      <ul class="soluzioni__lista">
        ${DATI.soluzioni.map(cardSoluzione).join('')}
      </ul>
    </section>
  </div>`;
}

// Il nome sta al centro basso; passandoci sopra il velo copre la foto, il nome
// sale e compare l'invito. Il markup è quello di un link, gli strati sono CSS.
function cardSoluzione(voce) {
  return `
        <li data-reveal>
          <a class="soluzione" href="${percorso(voce.pagina)}">
            ${media(voce.immagine, voce.placeholder, 'soluzione__media')}
            <span class="soluzione__velo"></span>
            <span class="soluzione__testo">
              <span class="soluzione__nome">${voce.nome}</span>
              <span class="soluzione__azione">${voce.azione} ${frecciaDestra()}</span>
            </span>
          </a>
        </li>`;
}

// ---------------------------------------------------------------- soluzioni

function paginaSoluzione(dataset) {
  const voce = DATI.soluzioni.find((v) => v.slug === dataset.soluzione);

  return paginaProfilo(voce, [{ testo: 'Home', href: 'index.html' }, { testo: voce.nome }])
    + fasciaPunteggiata(`
    <div class="section">
      <ul class="riquadri">
        ${voce.voci.map(riquadro).join('')}
      </ul>
    </div>`) + `

  <div class="section chiusura">
    <a class="text-link" href="${percorso('contatti.html')}">Parla con un tecnico ${frecciaDestra()}</a>
  </div>`;
}

// Card che si gira: davanti foto e nome, dietro il testo. Il bottone non sta
// attorno al contenuto ma sopra, steso su tutta la faccia: così il click prende
// qualunque punto della card senza che titoli e paragrafi finiscano dentro un
// <button>, dove non potrebbero stare. Una faccia per volta è attiva — l'altra
// porta `inert`, quindi esce dal giro del TAB e dal lettore di schermo.
function riquadro(voce) {
  return `
        <li class="riquadro" data-reveal data-flip>
          <div class="riquadro__carta">
            <div class="riquadro__faccia riquadro__faccia--fronte">
              ${media(voce.immagine, voce.placeholder, 'riquadro__media')}
              <p class="riquadro__nome">${voce.nome}</p>
              ${segnoGira()}
              <button class="riquadro__apri" type="button" aria-expanded="false"
                aria-label="Leggi la scheda: ${voce.nome}"></button>
            </div>

            <div class="riquadro__faccia riquadro__faccia--retro" inert>
              <div class="riquadro__retro">
                <p class="riquadro__titolo">${voce.nome}</p>
                ${voce.retro.map((t) => `<p class="riquadro__testo">${t}</p>`).join('')}
              </div>
              ${segnoGira()}
              <button class="riquadro__apri" type="button" aria-expanded="true"
                aria-label="Torna alla foto: ${voce.nome}"></button>
            </div>
          </div>
        </li>`;
}

// Freccia che gira su sé stessa: dice «si volta» senza scomodare un'etichetta.
function segnoGira() {
  return `<span class="riquadro__segno" aria-hidden="true">
                ${icona('M22 5v5h-5M19.6 15.1a8 8 0 1 1-1.7-8.5L22 10')}
              </span>`;
}

function sezioneSistemi() {
  return `
  <section class="section systems" aria-labelledby="titolo-sistemi">
    <h2 class="systems__title" id="titolo-sistemi">I nostri sistemi di trattamento truciolo</h2>

    ${carosello({
      classi: 'carousel',
      attributi: 'data-system-carousel data-carousel-name="Sistemi" aria-roledescription="carosello" aria-label="Sistemi di trattamento truciolo"',
      contenitore: 'ul',
      classeTraccia: 'cards__track',
      slide: DATI.sistemi.map(cardSistema),
      controlli: controlli('sistemi', 'Sistemi'),
    })}

    ${DATI.sistemi.map(pannelloMacchinari).join('')}
  </section>`;
}

function cardSistema(sistema, indice) {
  return `
          <li class="carousel__slide cards__slide" aria-roledescription="slide" aria-label="${indice + 1} di ${DATI.sistemi.length}">
            <button class="system-card" type="button" aria-expanded="false" aria-controls="macchinari-${sistema.slug}" data-system-toggle>
              ${media(sistema.immagine, sistema.placeholder, 'media--prodotto')}
              <span class="system-card__body">
                <span class="system-card__name">${sistema.nome}</span>
                <span class="system-card__description">${sistema.sommario}</span>
                <span class="system-card__hint">Vedi i macchinari
                  <svg class="system-card__chevron" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square"/>
                  </svg>
                </span>
              </span>
            </button>
          </li>`;
}

function pannelloMacchinari(sistema) {
  return `
    <div class="machines" id="macchinari-${sistema.slug}" data-machine-panel hidden>
      <h3 class="machines__title">Macchinari — ${sistema.nome}</h3>

      ${carosello({
        classi: 'carousel',
        attributi: `data-carousel-name="${sistema.nome}" aria-roledescription="carosello" aria-label="Macchinari del sistema ${sistema.nome}"`,
        contenitore: 'ul',
        classeTraccia: 'cards__track',
        slide: sistema.macchinari.map((m, i) => `
            <li class="carousel__slide cards__slide" aria-roledescription="slide" aria-label="${i + 1} di ${sistema.macchinari.length}">
              ${cardMacchina(m)}
            </li>`),
        controlli: controlli('macchinari', 'Macchinari'),
      })}
    </div>`;
}

// Card usata sia nel carosello della home sia nella griglia delle pagine di categoria.
// Una sola card per la griglia di categoria e per i pannelli della home. Nella
// griglia mostra anche i punti salienti; nel carosello della home resterebbero
// stretti, quindi lì si ferma alla sintesi.
function cardMacchina(macchina, { punti = false } = {}) {
  return `
              <article class="machine-card">
                <div class="machine-card__cover">
                  ${media(macchina.immagine, macchina.placeholder, 'media--prodotto')}
                  <span class="machine-card__caption">
                    <h3 class="machine-card__name">${macchina.nome}</h3>
                  </span>
                </div>
                <div class="machine-card__corpo">
                  <p class="machine-summary">${macchina.sintesi}</p>
                  ${punti ? puntiSalienti(macchina) : ''}
                  <a class="text-link" href="${percorso(macchina.pagina)}" aria-label="Vai alla scheda di ${macchina.nome}">
                    Vai alla scheda
                    ${frecciaDestra()}
                  </a>
                </div>
              </article>`;
}

// Fino a tre, presi dalle caratteristiche già pubblicate: alcune macchine ne
// hanno meno di tre e la card si accorcia invece di riempirsi di voci inventate.
function puntiSalienti(macchina) {
  const voci = (macchina.caratteristiche || []).slice(0, 3);
  if (voci.length === 0) return '';

  return `
                  <ul class="machine-card__punti">
                    ${voci.map((v) => `<li class="machine-card__punto">${icona('M5 12.5l4.2 4.2L19 7', 'machine-card__spunta')}<span>${v}</span></li>`).join('')}
                  </ul>`;
}

// ---------------------------------------------------------------- categoria: solo indice

function paginaSistema(dataset) {
  const sistema = DATI.sistemi.find((s) => s.slug === dataset.sistema);
  const quante = sistema.macchinari.length;

  return briciole([{ testo: 'Home', href: 'index.html' }, { testo: sistema.nome }])
    + fasciaProdotto(`
    <div class="section testata">
      <div class="testata__testo">
        <p class="eyebrow">${DATI.azienda.nome}</p>
        <h1 class="pagina__titolo">${sistema.nome}</h1>
        <p class="pagina__sottotitolo">${sistema.intro}</p>
        <a class="button-accent" href="#modelli">Scopri i modelli</a>
      </div>
      ${media(sistema.copertina, sistema.copertinaPlaceholder, 'media--hero', true)}
    </div>`) + `

  ` + fasciaPunteggiata(`
    <section class="section modelli" id="modelli" aria-labelledby="titolo-modelli">
      <h2 class="modelli__titolo" id="titolo-modelli" data-reveal>${quante} modelli in catalogo</h2>
      <ul class="griglia-macchine${quante < 3 ? ' griglia-macchine--pochi' : ''}">
        ${sistema.macchinari.map((m) => `<li class="griglia-macchine__voce" data-reveal>${cardMacchina(m, { punti: true })}</li>`).join('')}
      </ul>
    </section>`);
}

// ---------------------------------------------------------------- pagina della singola macchina

function paginaMacchina(dataset) {
  const sistema = DATI.sistemi.find((s) => s.macchinari.some((m) => m.id === dataset.macchina));
  const macchina = sistema.macchinari.find((m) => m.id === dataset.macchina);

  return briciole([
    { testo: 'Home', href: 'index.html' },
    { testo: sistema.nome, href: sistema.pagina },
    { testo: macchina.nome },
  ])
    // L'ordine è quello con cui si guarda una macchina: cosa è, com'è fatta,
    // quanto rende. I dati tecnici stavano in fondo, dopo la prosa: per
    // arrivarci bisognava scorrere due schermate.
    + fasciaProdotto(testataMacchina(sistema, macchina) + bandaChiavi(macchina))
    + specificheTecniche(macchina)
    + fasciaPunteggiata(`
    <div class="section">
      ${schedaMacchina(macchina)}
      ${galleriaMacchina(macchina)}
    </div>`) + `

  <div class="section ritorno">
    <a class="text-link" href="${percorso(sistema.pagina)}">Torna a ${sistema.nome.toLowerCase()} ${frecciaDestra()}</a>
  </div>`;
}

// Testata e banda dei punti chiave stanno nella stessa fascia grigia: sono un
// blocco solo, così sotto l'intestazione si vede subito la macchina e i suoi dati.
function testataMacchina(sistema, macchina) {
  const haTabelle = (macchina.specifiche || []).length > 0;

  return `
    <div class="section testata testata--prodotto">
      <div class="testata__testo">
        <p class="eyebrow">${sistema.nome}</p>
        <h1 class="pagina__titolo">${macchina.nome}</h1>
        <p class="pagina__sottotitolo">${macchina.sintesi}</p>
        <p class="testata__azioni">
          <a class="button-accent" href="${percorso('contatti.html')}">Richiedi informazioni</a>
          ${haTabelle ? `<a class="text-link" href="#specifiche">Vedi le specifiche ${frecciaDestra()}</a>` : ''}
        </p>
      </div>
      ${media(macchina.immagine, macchina.placeholder, 'media--prodotto testata__foto', true)}
    </div>`;
}

// Sintesi dei punti chiave: la formulazione tecnica completa resta in «Versione base».
function bandaChiavi(macchina) {
  const voci = macchina.puntiChiave || [];
  if (voci.length === 0) return '';

  return `
    <div class="section chiavi">
      <ul class="chiavi__lista">
        ${voci.map(chiave).join('')}
      </ul>
    </div>`;
}

function chiave(voce) {
  return `
        <li class="chiave">
          <span class="chiave__titolo">${voce.titolo}</span>
          <span class="chiave__valore">${voce.valore}</span>
        </li>`;
}

// Descrizione, versione base e accessori affiancati in un contenitore solo,
// separati da filetti: le colonne vuote non vengono create.
function schedaMacchina(macchina) {
  const colonne = [
    colonnaScheda('Descrizione', macchina.descrizione.map((p) => `<p>${p}</p>`).join('')),
    colonnaScheda('Versione base', elencoScheda(macchina.caratteristiche)),
    colonnaScheda('Accessori', elencoScheda(macchina.accessori)),
  ].filter(Boolean);

  return `
  <section class="section scheda" aria-label="Informazioni tecniche">
    <div class="scheda__colonne scheda__colonne--${colonne.length}" data-reveal>
      ${colonne.join('')}
    </div>
  </section>`;
}

function colonnaScheda(titolo, contenuto) {
  if (!contenuto) return '';

  return `
      <div class="scheda__colonna">
        <h2 class="scheda__titolo">${titolo}</h2>
        ${contenuto}
      </div>`;
}

function elencoScheda(voci) {
  if (!voci || voci.length === 0) return '';

  return `<ul class="scheda__elenco">${voci.map((v) => `<li>${v}</li>`).join('')}</ul>`;
}

function specificheTecniche(macchina) {
  if (!macchina.specifiche || macchina.specifiche.length === 0) return '';

  // Sta subito sotto la banda grigia, non più annidata in un altro blocco:
  // porta quindi il proprio contenitore di pagina.
  return `
  <div class="section">
      <section class="tecnica" id="specifiche" aria-labelledby="titolo-specifiche" data-reveal>
        <h2 class="tecnica__titolo" id="titolo-specifiche">Specifiche tecniche</h2>
        ${macchina.specifiche.map(tabellaSpecifiche).join('')}
      </section>
  </div>`;
}

function tabellaSpecifiche(tabella) {
  return `
      <div class="tecnica__tabella">
        <table>
          <caption>${tabella.titolo}</caption>
          <thead>
            <tr>${tabella.intestazioni.map((t, i) => `<th scope="col"${i === 0 ? '' : ' class="numerica"'}>${t}</th>`).join('')}</tr>
          </thead>
          <tbody>
            ${tabella.righe.map((riga) => `
            <tr>${riga.map((cella, i) => (i === 0
              ? `<th scope="row">${cella}</th>`
              : `<td class="numerica">${cella}</td>`)).join('')}</tr>`).join('')}
          </tbody>
        </table>
      </div>`;
}

function galleriaMacchina(macchina) {
  if (!macchina.galleria || macchina.galleria.length === 0) return '';

  return `
      <section class="galleria" aria-label="Immagini di ${macchina.nome}" data-reveal>
        <h2 class="galleria__titolo">Immagini dell'installazione</h2>
        ${carosello({
          classi: 'carousel',
          attributi: `data-galleria data-carousel-name="${macchina.nome}" aria-roledescription="carosello" aria-label="Foto di ${macchina.nome}"`,
          contenitore: 'ul',
          classeTraccia: 'cards__track',
          slide: macchina.galleria.map((foto, i) => `
            <li class="carousel__slide cards__slide" aria-roledescription="slide" aria-label="${i + 1} di ${macchina.galleria.length}">
              <span class="galleria__scatto">${media(foto, `${macchina.nome} — foto ${i + 1}`, 'media--4x3')}</span>
            </li>`),
          controlli: controlli('immagini', 'Immagini'),
        })}
      </section>`;
}

// ---------------------------------------------------------------- altre pagine

// Stessa impaginazione delle pagine di catalogo: testata a due colonne nella
// fascia grigia, contenuti sul campo puntinato, una via d'uscita in fondo.
// Prima era una banda a tutta larghezza con un pannello sovrapposto e sotto
// tre blocchi di prosa centrata: leggibile ma di un'altra epoca rispetto al
// resto del sito. paginaProfilo resta, la usano ancora Applicazioni e Settori.
function paginaAzienda() {
  const p = DATI.pagine.azienda;

  return briciole([{ testo: 'Home', href: 'index.html' }, { testo: 'Azienda' }])
    + fasciaProdotto(`
    <div class="section testata testata--asciutta">
      <div class="testata__testo">
        <h1 class="pagina__titolo">${p.titolo}</h1>
      </div>
      ${media(p.immagine, p.placeholder, 'media--hero testata__foto', true)}
    </div>`)
    + strisciaFotografica()
    + fasciaPunteggiata(`
    <div class="section">
      <ul class="pilastri">
        ${p.sezioni.map(pilastro).join('')}
      </ul>
      ${percorsiSistemi()}
    </div>`);
}

// Striscia fotografica fra la foto dello stabilimento e i tre punti numerati.
// Stessa meccanica della fascia col nome in fondo alla home: due meta identiche
// e una traslazione di -50%, cioe esattamente la larghezza della prima, cosi al
// riavvolgimento la seconda si trova dove stava la prima e il giro non ha un
// momento di stacco. Lo spazio fra le carte non e un gap ma un margine su
// ciascuna: col gap i vuoti sarebbero 2N-1 e la meta non cadrebbe sul giunto.
//
// Dodici carte per meta: a 2560, la larghezza peggiore, una carta piu il suo
// spazio misura 224px e dodici bastano a coprire lo schermo, quindi non si apre
// mai un vuoto a destra.
//
// Per ora sono riquadri vuoti e non dicono nulla, quindi restano fuori
// dall'ordine di lettura. Quando arriveranno le foto andra tolto aria-hidden e
// dato un alt a ciascuna.
function strisciaFotografica() {
  const meta = '<div class="striscia__carta"></div>'.repeat(CARTE_STRISCIA);
  return `
  <div class="striscia" aria-hidden="true">
    <div class="striscia__nastro">${meta}${meta}</div>
  </div>`;
}

// Un blocco per sezione, numerato. Il numero e il filetto rosso sono lo stesso
// segno che marca i titoli sul retro delle card di Applicazioni e Settori.
//
// E un <details> nativo: su telefono si apre e si chiude senza una riga di
// JavaScript, e la prima parte aperta. Nell'intestazione, sempre in vista, il
// numero, il titolo e una riga di aggancio col dato concreto del blocco — cosi
// i tre si scorrono con un colpo d'occhio invece di occupare tre schermate.
// Nel markup sono aperti tutti e tre, ed e main.js a chiuderne due sotto i
// 768px. Il verso conta: senza JavaScript il contenuto resta tutto visibile e
// il desktop e identico a prima, invece di dipendere da uno script per aprirsi.
function pilastro(sezione, indice) {
  return `
        <li data-reveal>
          <details class="pilastro" data-pilastro open>
            <summary class="pilastro__testata">
              <span class="pilastro__numero">${String(indice + 1).padStart(2, '0')}</span>
              <div class="pilastro__intestazione">
                <h2 class="pilastro__titolo">${sezione.titolo}</h2>
                <p class="pilastro__aggancio">${sezione.aggancio}</p>
              </div>
              ${icona('M6 9l6 6 6-6', 'pilastro__chevron')}
            </summary>
            <div class="pilastro__corpo">
              ${sezione.paragrafi.map((t) => `<p class="pilastro__testo">${t}</p>`).join('')}
            </div>
          </details>
        </li>`;
}

// La pagina non finisce in un vicolo cieco: da qui si entra nei tre cataloghi.
function percorsiSistemi() {
  return `
      <nav class="percorsi" aria-label="Sistemi di trattamento truciolo">
        ${DATI.sistemi.map((s) => `
        <a class="percorso" href="${percorso(s.pagina)}">
          <span class="percorso__nome">${s.nome}</span>
          <span class="percorso__sommario">${s.sommario}</span>
          <span class="percorso__azione">Vedi i modelli ${frecciaDestra()}</span>
        </a>`).join('')}
      </nav>`;
}

// Banda a tutta larghezza, pannello bianco che la scavalca, poi la prosa
// centrata. La usano la pagina Azienda e le due pagine soluzione.
// La testata può avere una foto sua, diversa da quella della tessera che porta
// qui dalla homepage; se non c'è, vale la stessa (è il caso di Azienda).
function paginaProfilo(p, percorsoBriciole) {
  return briciole(percorsoBriciole) + `
  <section class="profilo">
    ${media(p.testata || p.immagine, p.testataPlaceholder || p.placeholder, 'profilo__media', true)}

    <div class="profilo__pannello">
      <h1 class="profilo__titolo">${p.titolo}</h1>
      <p class="profilo__occhiello">${p.occhiello}</p>
      <p class="profilo__testo">${p.intro}</p>
    </div>
  </section>

  ${p.sezioni ? `<div class="profilo__seguito">
    ${p.sezioni.map(sezioneProfilo).join('')}
  </div>` : ''}`;
}

function sezioneProfilo(sezione) {
  return `
    <section class="profilo__sezione">
      <h2 class="profilo__sottotitolo">${sezione.titolo}</h2>
      ${sezione.paragrafi.map((t) => `<p class="profilo__testo">${t}</p>`).join('')}
    </section>`;
}

// Solo il modulo. Intestazione, recapiti e collegamento alla mappa sono stati
// tolti: i recapiti stanno gia nel pie di pagina di ogni pagina e nella sezione
// Sede di home e Azienda, quindi qui erano la terza copia. Restano nei dati.
function paginaContatti() {
  const p = DATI.pagine.contatti;

  return briciole([{ testo: 'Home', href: 'index.html' }, { testo: p.titolo }]) + `
  <div class="section contatti contatti--solo-modulo">
    ${moduloContatti(p.argomenti)}
  </div>`;
}

// Nessun endpoint: il modulo valida e si ferma. Il punto di aggancio al server è
// segnato in main.js, e la pagina non finge un invio andato a buon fine.
function moduloContatti(argomenti) {
  return `
    <form class="modulo" novalidate data-modulo-contatti aria-labelledby="titolo-modulo">
      <h1 class="scheda__titolo" id="titolo-modulo">Scrivici</h1>

      <div class="modulo__coppia">
        ${campoModulo('nome', 'Nome', { autocomplete: 'given-name' })}
        ${campoModulo('cognome', 'Cognome', { autocomplete: 'family-name' })}
      </div>
      ${campoModulo('azienda', 'Azienda', { autocomplete: 'organization' })}
      <div class="modulo__coppia">
        ${campoModulo('email', 'Email', { tipo: 'email', autocomplete: 'email' })}
        ${campoModulo('telefono', 'Telefono', { tipo: 'tel', autocomplete: 'tel', obbligatorio: false })}
      </div>

      <p class="modulo__campo">
        <label class="modulo__etichetta" for="argomento">Argomento</label>
        <select class="modulo__controllo" id="argomento" name="argomento" required aria-describedby="errore-argomento">
          <option value="">Scegli un argomento</option>
          ${argomenti.map((v) => `<option value="${v}">${v}</option>`).join('')}
        </select>
        <span class="modulo__errore" id="errore-argomento" hidden></span>
      </p>

      <p class="modulo__campo">
        <label class="modulo__etichetta" for="messaggio">Messaggio</label>
        <textarea class="modulo__controllo" id="messaggio" name="messaggio" rows="6" required
                  aria-describedby="aiuto-messaggio errore-messaggio"
                  placeholder="Componente, materiale, forma del truciolo, quantità per turno, ciclo attuale"></textarea>
        <span class="modulo__aiuto" id="aiuto-messaggio">Più dettagli dai, più mirata sarà la risposta.</span>
        <span class="modulo__errore" id="errore-messaggio" hidden></span>
      </p>

      <p class="modulo__consenso">
        <input type="checkbox" id="privacy" name="privacy" required aria-describedby="errore-privacy">
        <label for="privacy">Ho letto la <a href="${percorso('privacy.html')}">Policy Privacy</a> e acconsento al trattamento dei miei dati.</label>
        <span class="modulo__errore" id="errore-privacy" hidden></span>
      </p>

      <button class="button-accent" type="submit">Invia la richiesta</button>
      <p class="modulo__esito" role="status" aria-live="polite" data-modulo-esito></p>
    </form>`;
}

function campoModulo(nome, etichetta, { tipo = 'text', autocomplete = 'on', obbligatorio = true } = {}) {
  return `
        <span class="modulo__campo">
          <label class="modulo__etichetta" for="${nome}">${etichetta}${obbligatorio ? '' : ' <span class="modulo__facoltativo">(facoltativo)</span>'}</label>
          <input class="modulo__controllo" type="${tipo}" id="${nome}" name="${nome}"
                 autocomplete="${autocomplete}"${obbligatorio ? ' required' : ''} aria-describedby="errore-${nome}">
          <span class="modulo__errore" id="errore-${nome}" hidden></span>
        </span>`;
}

function paginaElenco(dataset) {
  const p = DATI.pagine[dataset.elenco];

  return intestazionePagina(p.titolo, p.sottotitolo) + `
  <div class="section">
    <ul class="notizie">${p.voci.map(notizia).join('')}</ul>
  </div>`;
}

function notizia(v) {
  return `
      <li class="notizia">
        ${media(v.immagine, v.placeholder, 'media--4x3')}
        <div class="notizia__testo">
          <time class="notizia__data" datetime="${v.data}">${v.dataTesto}</time>
          <h2 class="notizia__titolo">${v.titolo}</h2>
          <p>${v.testo}</p>
        </div>
      </li>`;
}

function paginaLegale(dataset) {
  return intestazionePagina(dataset.titolo, '') + `
  <div class="section">
    <div class="testo-lungo">
      <p>Il testo integrale di questa informativa viene fornito da ${DATI.azienda.ragioneSociale}
      e sarà pubblicato qui. Per richieste sul trattamento dei dati scrivi a
      <a href="mailto:${DATI.azienda.email}">${DATI.azienda.email}</a>.</p>
    </div>
  </div>`;
}

// ---------------------------------------------------------------- pezzi comuni

// Le briciole di pane: la voce corrente non è un collegamento.
function briciole(voci) {
  return `
  <nav class="section briciole" aria-label="Percorso">
    <ol>
      ${voci.map((v) => `<li>${v.href ? `<a href="${percorso(v.href)}">${v.testo}</a>` : v.testo}</li>`).join('')}
    </ol>
  </nav>`;
}

function intestazionePagina(titolo, sottotitolo) {
  return `
  <header class="section pagina">
    <p class="eyebrow">${DATI.azienda.nome}</p>
    <h1 class="pagina__titolo">${titolo}</h1>
    ${sottotitolo ? `<p class="pagina__sottotitolo">${sottotitolo}</p>` : ''}
  </header>`;
}

function carosello({ classi, attributi, contenitore, classeTraccia, slide, controlli: barra }) {
  return `
    <section class="${classi}" data-carousel ${attributi}>
      <div class="carousel__viewport">
        <${contenitore} class="carousel__track ${classeTraccia}" data-carousel-track>
          ${slide.join('')}
        </${contenitore}>
      </div>
      ${barra}
    </section>`;
}

function controlli(gruppo, etichetta) {
  return `
      <div class="carousel__controls">
        ${freccia('precedenti', etichetta)}
        ${puntini(gruppo)}
        ${freccia('successivi', etichetta)}
      </div>`;
}

// Frecce grandi sovrapposte ai bordi dell'immagine, dot sotto il testo.
function controlliSovrapposti(gruppo, etichetta) {
  return `
      <div class="carousel__frecce">
        ${freccia('precedenti', etichetta)}
        ${freccia('successivi', etichetta)}
      </div>
      <div class="carousel__controls">
        ${puntini(gruppo)}
      </div>`;
}

function freccia(verso, etichetta) {
  const indietro = verso === 'precedenti';
  const disegno = indietro ? 'M15 4l-8 8 8 8' : 'M9 4l8 8-8 8';
  const aggancio = indietro ? 'data-carousel-previous' : 'data-carousel-next';

  return `
        <button class="carousel__arrow" type="button" aria-label="${etichetta} ${verso}" ${aggancio}>
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="${disegno}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square"/>
          </svg>
        </button>`;
}

function puntini(gruppo) {
  return `<div class="carousel__dots" role="group" aria-label="Scegli il gruppo di ${gruppo}" data-carousel-dots></div>`;
}

function media(riferimento, descrizione, classe, primoPiano = false) {
  if (!riferimento) return '';

  const caricamento = primoPiano ? 'eager" fetchpriority="high' : 'lazy';
  return `<img class="media ${classe}" src="${percorso(riferimento)}" alt="${descrizione}" loading="${caricamento}">`;
}

function frecciaDestra() {
  return `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M4 12h15m-6-6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square"/>
                </svg>`;
}

function frecciaSinistra() {
  return `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M20 12H5m6-6l-6 6 6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square"/>
                </svg>`;
}
