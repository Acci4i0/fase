# Origine delle immagini

## fornite dal committente — cartella img/immagini/ (18 PNG, 1672×941)

Foto di prodotto e di sede consegnate direttamente da Fase, non presenti sul sito
pubblico. Gli originali restano intatti in `img/immagini/`; nel sito entrano le
versioni JPEG ricompresse elencate qui sotto.

| file usato nel sito | originale | dove compare |
|---|---|---|
| hero/01-truciolo.jpg | D31BD577-499C-40CB-81ED-FCC6709A9A4E.png | hero, slide azienda |
| hero/02-centrifughe.jpg | collage, vedi in fondo | hero, slide centrifughe |
| hero/03-linea-trattamento.jpg | 1C07E13D-626D-490D-B473-C452AFFAF288.png | hero, slide impianti |
| hero/04-trituratore.jpg | B141BDF0-5CB0-458F-90BE-66C35BD5C848.png | hero, slide trituratori |
| hero/05-linea-paniere-estraibile.jpg | AA196379-1851-40DA-9F3A-A6B06A6F3432.png | hero, slide settori |
| sede-fase.jpg | 32EEBF70-CB16-41DD-BD0B-93BFF024CFD4.png | azienda.html, banda del profilo |

| su-grigio/centrifuga.jpg | 4C7480F1-E4B5-4610-9477-79DBBB820F47.png | card del sistema Centrifughe |
| su-grigio/disoleatrice-ciclo-continuo.jpg | 0BFCBC22-747A-41C5-9E70-FC723C9AAC7A.png | scheda serie FD |

Le altre 8 foto della cartella restano disponibili e non sono ancora usate.

## foto reali al posto dei render — schede prodotto e copertine di catalogo

I file `FC.jpg`, `FCV480.jpg`, `imgDK.jpg`, `IMP-*.jpg`, `trattamento-truciolo-imp.jpg`,
`trituratore-orizzontale.jpg` e `trituratori-verticali.jpg` scaricati da fasemec.com
sono render CAD, non fotografie. Restano in `img/immagini/` come riferimento per il
riconoscimento dei modelli, ma non entrano più nel sito: al loro posto vanno le foto
del committente, rimontate sul grigio con `probe/su-grigio2.js`.

L'attribuzione modello per modello è stata fatta confrontando la sagoma di ogni foto
con il render omonimo e con le caratteristiche pubblicate in `js/dati.js`.

| file usato nel sito | originale | macchina | su cosa si regge l'attribuzione |
|---|---|---|---|
| su-grigio/fd-ciclo-continuo.jpg | FF29D76E-…png | serie FD | corpo cilindrico con bocchettone in alto: «il materiale entra dalla parte alta» |
| su-grigio/fc-cesto-estraibile.jpg | 59CF6564-…png | serie FC | fusto inox AISI 304 e cilindro di apertura del coperchio, basamento nel verde acqua del render FC |
| su-grigio/fcv-verticale.jpg | D69C9AC3-…PNG | serie FCV | sagoma identica al render FCV480: basamento rastremato, quadro elettrico a bordo |
| su-grigio/dk-cesto-estraibile.jpg | D5CC4107-…png | serie DK | stessa macchina che in 775371C8 compare con bandiera e paranco, accessorio elencato solo per la DK |
| su-grigio/imp-ciclo-continuo.jpg | 8046D52F-…png | impianto a ciclo continuo | silo, tramoggia e centrifuga in cabina |
| su-grigio/imp-paniere-estraibile.jpg | E27042DB-…png | impianto a paniere estraibile | vasche di raccolta e portale di movimentazione |
| su-grigio/imp-galvanico.jpg | 43510D0D-…PNG | impianto in ambiente galvanico | paniere sollevato dalla pinza accanto alla centrifuga di asciugatura |
| su-grigio/tr-orizzontale.jpg | 71110583-…PNG | serie TR | rotore ad asse orizzontale con motore in linea, tramoggia piramidale |
| su-grigio/trw-verticale.jpg | 9061426D-…PNG | serie TRW | motore in asse verticale e spintore idraulico laterale, citato nella scheda TRW |
| su-grigio/cop-centrifughe.jpg | F247E8A4-…png | copertina Centrifughe | copertina di categoria, non attribuita a un modello |
| su-grigio/cop-impianti.jpg | 0084D093-…png | copertina Impianti | idem |
| su-grigio/cop-trituratori.jpg | 585B6C3D-… 2.PNG | copertina Trituratori | idem |

## img/soluzioni/ — foto d'ambiente per Applicazioni e Settori

Consegnate dal committente nelle cartelle `img/applicazioni/` e `img/settori/`,
dove gli originali restano intatti (da 1,4 a 10 MB, fino a 8640 px di lato).
Qui entrano le versioni web: lato lungo 2000 px per le due immagini di testata,
ritaglio centrato 1200 × 900 (4:3) per le card, qualità JPEG 62.

| file usato nel sito | originale | dove compare |
|---|---|---|
| soluzioni/applicazioni.jpg | applicazioni/applicazioni.JPG | applicazioni.html, banda del profilo |
| soluzioni/asciugatura-pezzi-minuti.jpg | applicazioni/asciugatura_pezzi_minut.JPG | card «Asciugatura di pezzi minuti» |
| soluzioni/frantumazione-matasse.jpg | applicazioni/frantumazione_matasse.JPG | card «Frantumazione di matasse e fine barra» |
| soluzioni/trattamento-linea.jpg | applicazioni/trattamento_linea.JPG | card «Trattamento in linea» |
| soluzioni/settori.jpg | settori/settori.jpg | settori.html, banda del profilo |
| soluzioni/tornerie-automatiche.jpg | settori/tornerie_automatiche.JPG | card «Tornerie automatiche» |
| soluzioni/officine-meccaniche-moderne.jpg | settori/officine_meccaniche_moderne.JPG | card «Officine meccaniche e centri di lavoro» |
| soluzioni/reparti-galvanici.jpg | settori/reparti_galvanici.JPG | card «Reparti galvanici» |

Sono scatti d'ambiente generici, non impianti Fase: gli `alt` descrivono quello
che si vede e non attribuiscono le macchine inquadrate al committente.

Queste foto valgono solo **dentro** le due pagine. Le tessere «Applicazioni» e
«Settori» in homepage tengono gli scatti di prodotto su grigio
(`su-grigio/applicazioni.jpg` e `su-grigio/settori.jpg`), per restare in tono con
le copertine dei tre cataloghi che stanno appena sopra. In `js/dati.js` la tessera
usa `immagine`, la testata di pagina usa `testata`.

La card «Centrifugazione del truciolo» non ha una foto d'ambiente e tiene ancora
`su-grigio/app-centrifugazione.jpg`: è l'unica delle sette con lo scatto di
prodotto su fondo grigio.

## img/su-grigio/ — foto rimontate sul grigio

Copie ricalibrate sul grigio `--color-surface` (#DCDCDC), lo stesso della fascia
che le ospita: il fondo studio viene misurato per canale sul bordo e riscalato
fino a 220, così il bordo dello scatto sparisce sul fondo della pagina. Nessun
ritaglio e nessuna maschera, solo una scala dei livelli, quindi ombre e
sfumature restano continue. Gli originali scaricati da fasemec.com restano in
`img/` intatti; le foto del committente restano in `img/immagini/`.

Non ci sono più: `SEZIONE-CENTRIFUGHE-FD.jpg` aveva fondo sfumato e pavimento a
specchio incorporati nel render, che una scala dei livelli non può appiattire.
Al suo posto le due foto studio elencate sopra.

# Immagini scaricate da fasemec.com — nome file → pagine di origine

## home (15)
- Foto-home-fondo-pagina-scaled.jpg  ←  /, /chi_siamo/
- Targeted-Mobile-Ad-Image.jpg  ←  /
- cambia-idea.png  ←  /
- cropped-logo-FASE-1.png  ←  /
- flex.png  ←  /
- goccia2.jpg  ←  /
- mac2.jpg  ←  /
- macc1.jpg  ←  /
- macc3.jpg  ←  /
- modulo-fasemec.png  ←  /
- money1.png  ←  /
- settings.png  ←  /
- spremitura2.jpg  ←  /
- stretta-mano.png  ←  /
- world2.png  ←  /

## prodotto (77)
- FC.jpg  ←  /centrifughe/, /products/centrifughe-asciugatrici-serie-fc/, /products_category/a-paniere-estraibile/ …
- FCV480.jpg  ←  /centrifughe/, /products/centrifughe-asciugatrici-serie-fcv/, /products_category/a-paniere-estraibile/ …
- Foto-impianti.jpg  ←  /impianti/, /products/impianti-di-asciugatura-a-paniere-estraibile-in-ambiente-galvanico/, /products/impianti-di-trattamento-trucioli-metallici-a-ciclo-continuo/ …
- Foto-trituratori.jpg  ←  /products/trituratori-ad-asse-orrizzontale-serie-tr/, /products/trituratori-ad-asse-verticale-serie-trw/, /trituratori/
- IMG1--2021-06.jpg  ←  /products/centrifughe-asciugatrici-serie-fc/, /products/disoleatrici-a-ciclo-continuo-serie-fd/
- IMG1-1.jpg  ←  /products/centrifughe-asciugatrici-serie-fcv/
- IMG1-2.jpg  ←  /products/disoleatrici-serie-dk/
- IMG1-5.jpg  ←  /products/impianti-di-trattamento-trucioli-metallici-a-paniere-estraibile/
- IMG1-6.jpg  ←  /products/trituratori-ad-asse-orrizzontale-serie-tr/
- IMG1.jpg  ←  /products/centrifughe-asciugatrici-serie-fc/, /products/disoleatrici-a-ciclo-continuo-serie-fd/
- IMG10--2021-06.jpg  ←  /products/disoleatrici-a-ciclo-continuo-serie-fd/, /products/impianti-di-trattamento-trucioli-metallici-a-ciclo-continuo/
- IMG10-1.jpg  ←  /products/impianti-di-asciugatura-a-paniere-estraibile-in-ambiente-galvanico/
- IMG10.jpg  ←  /products/disoleatrici-a-ciclo-continuo-serie-fd/, /products/impianti-di-trattamento-trucioli-metallici-a-ciclo-continuo/
- IMG11--2021-06.jpg  ←  /products/disoleatrici-a-ciclo-continuo-serie-fd/, /products/impianti-di-trattamento-trucioli-metallici-a-ciclo-continuo/
- IMG11-1.jpg  ←  /products/impianti-di-asciugatura-a-paniere-estraibile-in-ambiente-galvanico/
- IMG11.jpg  ←  /products/disoleatrici-a-ciclo-continuo-serie-fd/, /products/impianti-di-trattamento-trucioli-metallici-a-ciclo-continuo/
- IMG12-1.jpg  ←  /products/impianti-di-asciugatura-a-paniere-estraibile-in-ambiente-galvanico/
- IMG12-scaled.jpg  ←  /products/impianti-di-trattamento-trucioli-metallici-a-ciclo-continuo/
- IMG12.jpg  ←  /products/disoleatrici-a-ciclo-continuo-serie-fd/
- IMG13--2021-06.jpg  ←  /products/disoleatrici-a-ciclo-continuo-serie-fd/, /products/impianti-di-trattamento-trucioli-metallici-a-ciclo-continuo/
- IMG13-1.jpg  ←  /products/impianti-di-asciugatura-a-paniere-estraibile-in-ambiente-galvanico/
- IMG13.jpg  ←  /products/disoleatrici-a-ciclo-continuo-serie-fd/, /products/impianti-di-trattamento-trucioli-metallici-a-ciclo-continuo/
- IMG14--2021-06.jpg  ←  /products/disoleatrici-a-ciclo-continuo-serie-fd/, /products/impianti-di-trattamento-trucioli-metallici-a-ciclo-continuo/
- IMG14-1.jpg  ←  /products/impianti-di-asciugatura-a-paniere-estraibile-in-ambiente-galvanico/
- IMG14.jpg  ←  /products/disoleatrici-a-ciclo-continuo-serie-fd/, /products/impianti-di-trattamento-trucioli-metallici-a-ciclo-continuo/
- IMG15-1.jpg  ←  /products/impianti-di-asciugatura-a-paniere-estraibile-in-ambiente-galvanico/
- IMG15.jpg  ←  /products/impianti-di-trattamento-trucioli-metallici-a-ciclo-continuo/
- IMG16.jpg  ←  /products/impianti-di-asciugatura-a-paniere-estraibile-in-ambiente-galvanico/
- IMG2-1.jpg  ←  /products/centrifughe-asciugatrici-serie-fcv/
- IMG2-2.jpg  ←  /products/disoleatrici-serie-dk/
- IMG2-5.jpg  ←  /products/impianti-di-trattamento-trucioli-metallici-a-paniere-estraibile/
- IMG2-6.jpg  ←  /products/trituratori-ad-asse-orrizzontale-serie-tr/
- IMG2-7.jpg  ←  /products/trituratori-ad-asse-verticale-serie-trw/
- IMG2.jpg  ←  /products/centrifughe-asciugatrici-serie-fc/
- IMG3-1.jpg  ←  /products/centrifughe-asciugatrici-serie-fcv/
- IMG3-2.jpg  ←  /products/disoleatrici-serie-dk/
- IMG3-5.jpg  ←  /products/impianti-di-trattamento-trucioli-metallici-a-paniere-estraibile/
- IMG3-6.jpg  ←  /products/trituratori-ad-asse-orrizzontale-serie-tr/
- IMG3-7.jpg  ←  /products/trituratori-ad-asse-verticale-serie-trw/
- IMG3.jpg  ←  /products/centrifughe-asciugatrici-serie-fc/
- IMG4-3.jpg  ←  /products/impianti-di-trattamento-trucioli-metallici-a-paniere-estraibile/
- IMG4-4.jpg  ←  /products/trituratori-ad-asse-verticale-serie-trw/
- IMG4-6.jpg  ←  /products/centrifughe-asciugatrici-serie-fc/
- IMG5-3.jpg  ←  /products/impianti-di-trattamento-trucioli-metallici-a-paniere-estraibile/
- IMG5-4.jpg  ←  /products/trituratori-ad-asse-verticale-serie-trw/
- IMG5-5.jpg  ←  /products/centrifughe-asciugatrici-serie-fc/
- IMG6-2.jpg  ←  /products/impianti-di-trattamento-trucioli-metallici-a-paniere-estraibile/
- IMG6-3.jpg  ←  /products/trituratori-ad-asse-verticale-serie-trw/
- IMG7-2.jpg  ←  /products/impianti-di-trattamento-trucioli-metallici-a-paniere-estraibile/
- IMG7-3.jpg  ←  /products/trituratori-ad-asse-verticale-serie-trw/
- IMG7-scaled.jpg  ←  /products/impianti-di-trattamento-trucioli-metallici-a-ciclo-continuo/
- IMG7.jpg  ←  /products/disoleatrici-a-ciclo-continuo-serie-fd/
- IMG8--2021-06.jpg  ←  /products/disoleatrici-a-ciclo-continuo-serie-fd/, /products/impianti-di-trattamento-trucioli-metallici-a-ciclo-continuo/
- IMG8-1.jpg  ←  /products/impianti-di-asciugatura-a-paniere-estraibile-in-ambiente-galvanico/
- IMG8.jpg  ←  /products/disoleatrici-a-ciclo-continuo-serie-fd/, /products/impianti-di-trattamento-trucioli-metallici-a-ciclo-continuo/
- IMG9--2021-06.jpg  ←  /products/disoleatrici-a-ciclo-continuo-serie-fd/, /products/impianti-di-trattamento-trucioli-metallici-a-ciclo-continuo/
- IMG9-1.jpg  ←  /products/impianti-di-asciugatura-a-paniere-estraibile-in-ambiente-galvanico/
- IMG9.jpg  ←  /products/disoleatrici-a-ciclo-continuo-serie-fd/, /products/impianti-di-trattamento-trucioli-metallici-a-ciclo-continuo/
- IMP-a-ciclo-continuo.jpg  ←  /impianti/, /products/impianti-di-trattamento-trucioli-metallici-a-ciclo-continuo/, /products_category/a-ciclo-continuo-impianti/ …
- IMP-a-paniere-estraibile2.jpg  ←  /impianti/, /products/impianti-di-asciugatura-a-paniere-estraibile-in-ambiente-galvanico/, /products_category/a-paniere-estraibile-impianti/ …
- SEZIONE-CENTRIFUGHE-FD.jpg  ←  /centrifughe/, /products/disoleatrici-a-ciclo-continuo-serie-fd/, /products_category/a-ciclo-continuo/ …
- Schermata-2021-06-20-alle-23.20.46.png  ←  /products/trituratori-ad-asse-orrizzontale-serie-tr/
- Schermata-2021-06-20-alle-23.21.55.png  ←  /products/centrifughe-asciugatrici-serie-fcv/
- Schermata-2021-06-20-alle-23.23.20.png  ←  /products/centrifughe-asciugatrici-serie-fc/
- Schermata-2021-06-20-alle-23.24.28.png  ←  /products/disoleatrici-serie-dk/
- Schermata-2021-06-20-alle-23.25.33.png  ←  /products/disoleatrici-a-ciclo-continuo-serie-fd/
- Schermata-2021-06-20-alle-23.27.45.png  ←  /products/disoleatrici-a-ciclo-continuo-serie-fd/
- Schermata-2021-06-29-alle-09.38.12.png  ←  /products/trituratori-ad-asse-verticale-serie-trw/
- foto-centrifughe-scaled.jpg  ←  /centrifughe/, /products/centrifughe-asciugatrici-serie-fc/, /products/centrifughe-asciugatrici-serie-fcv/ …
- imgDK.jpg  ←  /centrifughe/, /products/disoleatrici-serie-dk/, /products_category/a-paniere-estraibile/ …
- logo-FASE-1.png  ←  /, /4785/, /category/news/ …
- logo_menu.png  ←  /, /4785/, /category/news/ …
- panted-logo.png  ←  /, /4785/, /category/news/ …
- trattamento-truciolo-imp-1.jpg  ←  /impianti/, /products/impianti-di-trattamento-trucioli-metallici-a-paniere-estraibile/, /products_category/a-paniere-estraibile-impianti/ …
- trattamento-truciolo-imp.jpg  ←  /products/impianti-di-trattamento-trucioli-metallici-a-paniere-estraibile/
- trituratore-orizzontale.jpg  ←  /products/trituratori-ad-asse-orrizzontale-serie-tr/, /products_category/trituratori/, /trituratori/
- trituratori-verticali.jpg  ←  /products/trituratori-ad-asse-verticale-serie-trw/, /products_category/trituratori/, /trituratori/

## altro (22)
- .DS_Store  ←  ?
- 336x280.png  ←  /category/news/, /fiera-fornitore-offresi-2025/, /news/
- Foto-collabora-con-noi-scaled.jpg  ←  /collabora-con-noi/
- Foto-contatti-scaled.jpg  ←  /contatti/
- Foto-esterno-azienda.jpg  ←  /contatti/
- Foto-per-sito-1.png  ←  /category/occasioni/, /impiantodidisoleaturatruciolo/, /occasioni/
- Foto1.jpg  ←  /chi_siamo/
- Foto2.jpg  ←  /chi_siamo/
- Foto3.jpg  ←  /chi_siamo/
- Foto4.jpg  ←  /chi_siamo/
- Foto5.jpg  ←  /chi_siamo/
- IMM.-TRUCIOLO2-scaled.jpg  ←  /chi_siamo/
- MECSPE2025_BIG_2400x2025_ITA.jpg  ←  /category/news/, /fiera-mecspe-2025/, /news/
- MECSPE2026_SMALL_500x422_ITA.jpg  ←  /category/news/, /fiera-mecspe-2026/, /news/
- SMALL_500x422_ITA.jpg  ←  /category/news/, /fiera-mecspe-2024/, /news/
- Trattamento-trucioli-fullWidth.jpg  ←  /category/news/, /news/, /prova/
- Vi_aspettiamo_a_mecspe-e1632813901389.jpg  ←  /category/news/, /fiera-mecspe-2021/, /news/
- Vi_aspettiamo_a_mecspe_22.jpg  ←  /4785/, /category/news/, /news/
- lavoro.jpg  ←  /collabora-con-noi/
- piggy-bank2.png  ←  /chi_siamo/, /collabora-con-noi/
- team.png  ←  /chi_siamo/, /collabora-con-noi/
- world.png  ←  /chi_siamo/, /collabora-con-noi/

## Collage

`hero/02-centrifughe.jpg` non è uno scatto: è composto da tre foto di
`img/immagini/` — disoleatrice a ciclo continuo (FF29D76E…), centrifuga inox su
base verde (59CF6564…), centrifuga blu con coperchio a cupola (F247E8A4…).

Di ogni scatto lo script misura il fondo studio per canale, lo riscala sul grigio
`--color-surface`, ritaglia il riquadro della macchina e la appoggia su una linea
di terra comune, mantenendo le proporzioni reciproche degli scatti originali.

È una foto di famiglia sotto un titolo di famiglia («Centrifughe e disoleatrici»):
non dichiara un modello, quindi non c'è attribuzione da verificare.
