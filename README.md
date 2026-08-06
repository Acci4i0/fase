# Fase Mechanical Engineering — sito

Sito istituzionale di Fase Mechanical Engineering: centrifughe, impianti di
trattamento truciolo e trituratori.

## Come si apre

Non c'è niente da installare e niente da compilare: si apre `index.html` nel
browser. Gli script sono classici (niente moduli ES), quindi funziona anche da
`file://`, senza server.

Per servirlo in locale, se serve:

```
python3 -m http.server 8000
```

## Come è fatto

HTML, CSS e JavaScript scritti a mano. Nessun framework, nessun passo di build,
nessuna dipendenza, nessuna risorsa caricata da terzi: il font è nel repository,
le immagini pure. Mobile first, con due punti di rottura a 768 px e 1200 px.

```
index.html …          pagine di primo livello
prodotti/             una pagina per macchina (9)
css/style.css         foglio unico, variabili di progetto in :root
js/dati.js            tutti i contenuti del sito, in un file solo
js/layout.js          intestazione, menu, piè di pagina, sedi
js/pagine.js          i modelli di pagina, scelti da data-pagina
js/preloader.js       sequenza d'ingresso della home
js/mappa.js           collegamento alla mappa delle sedi
js/main.js            caroselli, moduli, animazioni allo scorrimento
fonts/                Source Sans 3 (variabile, woff2)
img/                  vedi img/ORIGINE.md per la provenienza
```

Ogni pagina è un guscio quasi vuoto: dichiara `data-pagina` e il resto lo
costruisce `js/pagine.js` leggendo `js/dati.js`. Per cambiare un testo, un
prezzo o una scheda tecnica si tocca solo `dati.js`.

Gli script condividono lo scope globale e vanno caricati nell'ordine dichiarato
nelle pagine: `dati` → `mappa` → `layout` → `pagine` → `preloader` → `main`.

## Accessibilità

Landmark e `aria-label` su tutte le regioni, focus sempre visibile, contrasto
verificato, `prefers-reduced-motion` rispettato ovunque: caroselli, animazioni
allo scorrimento, card che si girano e sequenza d'ingresso si fermano o saltano
allo stato finale.

## Immagini

`img/ORIGINE.md` tiene traccia di dove viene ogni fotografia e a quale macchina
è attribuita. Gli originali ad alta risoluzione e la libreria completa del
committente non stanno nel repository: pesano circa 100 MB e nel sito entrano
solo le versioni lavorate.
