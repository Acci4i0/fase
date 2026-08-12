const DATI = {
  azienda: {
    nome: 'Fase Mechanical Engineering',
    ragioneSociale: 'Fase Mechanical Engineering S.r.l.',
    claim: 'Centrifughe, impianti e trituratori per il trattamento dello sfrido metallico.',
    via: 'Via Francesco Crispi 12',
    citta: '36056 Tezze sul Brenta (VI)',
    paese: 'Italia',
    telefono: '+39 0424 561848',
    telefonoHref: 'tel:+390424561848',
    fax: '+39 0424 564560',
    email: 'info@fasemec.com',
    logo: 'img/logo-FASE-1.png',
    // Il marchio senza payoff, per la fascia di chiusura: sono i sei tracciati
    // di img/logo-fase.svg — l'ovale e le lettere — senza il <text> del payoff,
    // che nella striscia si ripeterebbe con la parola accanto. viewBox stretto
    // sull'inchiostro, cosi il riquadro dell'elemento e la forma coincidono e
    // altezza e allineamento non portano dentro il vuoto lasciato dal payoff.
    marchio: {
      viewBox: '3.74 2.61 172.53 79.41',
      proporzione: 2.1727,
      tracciati: [
        'M82.17 2.61L99.19 2.61L99.39 2.72L105.42 2.83L115.16 3.51L123.32 4.53L131.02 5.89L139.89 8.05L148.04 10.77L152.58 12.69L158.27 15.65L163.39 19.07L165.77 21L168.63 23.75L171.6 27.4L173.19 29.89L174.22 31.96L175.01 33.89L175.81 36.63L176.27 40.03L176.27 42.32L175.81 45.27L174.79 48.47L173.41 51.22L171.01 54.53L167.25 58.18L164.05 60.47L160.96 62.18L156.43 64.11L150.85 65.82L146.2 66.72L143.03 67.06L135.98 67.06L135.78 66.95L133.97 67.06L129.64 67.06L129.44 66.95L125.22 66.95L125.02 67.06L123.18 67.06L122.98 66.95L121.03 66.95L120.83 67.06L119.24 66.95L84.49 67.03L83.95 66.48L83.71 64.61L83.15 62.15L83.59 61.65L84.32 61.51L86.25 61.63L139.07 61.63L142.35 61.29L145.44 60.6L149.63 59.13L152.26 57.87L156.03 55.47L157.84 53.99L159.57 52.15L161.63 49.18L162.78 46.77L163.58 44.25L163.92 42.32L163.92 38.78L163.23 35.36L162.1 32.3L160.84 29.89L159.37 27.63L157.53 25.33L154.9 22.7L152.97 21.11L148.53 18.03L144.19 15.64L138.42 13.15L132.3 11.11L124.91 9.29L119.36 8.27L108.93 7.14L99.31 6.57L86.14 6.57L85.94 6.68L78.55 6.91L68.92 7.7L58.95 9.18L53.06 10.42L46.01 12.35L41.7 13.83L38.08 15.3L34.76 16.9L32.16 18.37L29.44 20.19L25.9 23.04L23.72 25.22L22.02 27.26L20.07 30.01L18.02 33.89L16.89 36.94L16.43 38.67L15.86 42.3L15.86 45.04L16.55 49.26L17.34 51.76L18.6 54.62L20.07 57.11L21.91 59.52L24.2 61.92L26.24 63.62L28.99 65.57L32.95 67.83L37.4 69.77L41.02 71.02L44.34 71.93L48.53 72.84L52.04 73.41L57.7 73.97L65.15 74.11L65.59 74.58L65.59 81.52L65.09 82.02L57.36 82.02L51.47 81.68L46.03 81L39.69 79.75L35.47 78.61L31.39 77.25L27.77 75.78L22.98 73.39L18.68 70.67L14.68 67.47L10.92 63.59L7.95 59.49L6.35 56.51L4.99 53L4.42 50.82L3.96 48.22L3.74 46.06L3.74 43.43L4.3 39.24L5.44 35.24L6.58 32.53L7.38 31.02L8.97 28.42L12.5 24.09L16.72 20.21L19.47 18.15L24.23 15.09L29.92 12.13L35.7 9.75L41.36 7.94L46.71 6.57L52.72 5.32L59.29 4.3L66.2 3.51L73.9 2.95L81.97 2.72L82.15 2.61Z',
        'M44.89 20.28L66.13 20.28L66.61 20.76L65.48 27.95L64.94 28.52L52.7 28.55L52.14 29.08L51.57 32.26L52.14 32.85L60.12 32.85L60.58 33.28L59.47 40.64L58.88 41.35L51.12 41.35L49.87 42L47.8 54.12L47.21 55.05L39.45 55.05L38.97 54.57L44.29 21.1L44.86 20.28Z',
        'M76.49 20.28L84.59 20.28L85.07 20.76L90.82 54.63L90.37 55.05L82.16 55.05L81.68 54.57L80.32 47.04L79.67 46.36L71.34 46.36L70.69 47.15L67.4 66.47L66.86 67.03L66.35 67.06L59.05 66.95L58.59 66.52L64 33.33L64.49 32.85L72.92 32.85L73.41 33.73L72.87 36.5L73.38 37.01L77.91 37.04L78.48 36.5L76.01 21.04L76.46 20.28Z',
        'M102.66 20.28L114.39 20.28L114.87 20.76L113.82 28.01L113.37 28.43L108.21 28.55L107.59 28.8L106.6 30.16L106.82 32.03L111.02 40.13L111.81 43.3L112.04 46.42L111.47 49.7L110.19 51.91L108.1 53.89L105.1 55.05L94.67 55.03L94.25 54.57L93.12 47.89L93.12 47.15L93.6 46.67L98.3 46.67L99.72 46.19L100.37 45.51L100.48 42.17L96.4 33.28L95.84 30.44L95.84 27.67L96.4 25.52L97.68 23.42L99.89 21.44L102.63 20.28Z',
        'M118.63 32.85L134.1 32.85L134.55 33.28L133.42 40.92L132.96 41.35L126.17 41.49L125.52 42.4L125.06 46.08L125.66 46.67L136.99 46.7L137.41 47.15L137.3 48.34L136.39 54.57L135.91 55.05L115.12 55.05L114.67 54.63L117.93 34.24L118.61 32.85Z',
        'M120.79 20.28L141.8 20.28L142.28 20.82L141.04 27.84L140.44 28.43L120.5 28.55L119.6 28.52L119.17 27.67L120.19 20.87L120.76 20.28Z',
      ],
    },
    mappa: 'https://www.google.com/maps/search/?api=1&query=Via%20Francesco%20Crispi%2012%2C%2036056%20Tezze%20sul%20Brenta%20VI%2C%20Italia',
    facebook: 'https://www.facebook.com/FaseMechanicalEngineeringsrl/',
    legale:
      'C.F./P.IVA e n. iscriz. R.I. di VI: 03166770242 · N. REA di VI 304063 · ' +
      'Capitale sociale Euro 50.000,00 i.v. · Soggetta alla direzione e coordinamento ' +
      'di LM Industry Srl – Registro Imprese di Vicenza nr. 02739500243',
  },

  menu: [
    { testo: 'Home', href: 'index.html' },
    {
      testo: 'Sistemi di centrifugazione',
      voci: [
        { testo: 'Centrifughe', href: 'centrifughe.html' },
        { testo: 'Impianti', href: 'impianti.html' },
        { testo: 'Trituratori', href: 'trituratori.html' },
      ],
    },
    {
      testo: 'Soluzioni',
      voci: [
        { testo: 'Applicazioni', href: 'applicazioni.html' },
        { testo: 'Settori', href: 'settori.html' },
      ],
    },
    { testo: 'Azienda', href: 'azienda.html' },
    { testo: 'Contatti', href: 'contatti.html' },
    { testo: 'News', href: 'news.html' },
  ],

  footer: {
    colonne: [
      { titolo: 'Macchinari', voci: [
        { testo: 'Centrifughe', href: 'centrifughe.html' },
        { testo: 'Impianti', href: 'impianti.html' },
        { testo: 'Trituratori', href: 'trituratori.html' },
      ] },
      { titolo: 'Azienda', voci: [
        { testo: 'Chi siamo', href: 'azienda.html' },
        { testo: 'News', href: 'news.html' },
      ] },
    ],
    legali: [
      { testo: 'Policy Privacy', href: 'privacy.html' },
      { testo: 'Cookie policy', href: 'cookie-policy.html' },
    ],
  },

  hero: [
    {
      titolo: 'Centrifugazione e trattamento dello sfrido metallico',
      testo: 'Recupero del lubrorefrigerante e valorizzazione del truciolo.',
      cta: { testo: "Scopri l'azienda", href: 'azienda.html' },
      placeholder: 'cumulo di truciolo di acciaio con targhetta Fase',
      immagine: 'img/hero/01-truciolo.jpg',
    },
    {
      titolo: 'Centrifughe e disoleatrici',
      testo: 'Quattro serie, dal cesto estraibile al ciclo continuo. Il lubrorefrigerante torna in vasca, il truciolo esce asciutto.',
      cta: { testo: 'Vedi le centrifughe', href: 'centrifughe.html' },
      placeholder: 'quattro centrifughe Fase affiancate: disoleatrice a ciclo continuo, centrifuga a cesto in acciaio inox, centrifuga con coperchio a cupola e centrifuga su antivibranti',
      immagine: 'img/hero/02-centrifughe.jpg',
    },
    {
      titolo: 'Linee di trattamento truciolo',
      testo: 'Layout costruito sugli spazi reali, dal carico allo stoccaggio.',
      cta: { testo: 'Vedi gli impianti', href: 'impianti.html' },
      placeholder: 'linea Fase di trattamento truciolo: vasche di raccolta, centrifughe a paniere e ribaltatore per cassoni sotto un portale',
      immagine: 'img/hero/03-linea-trattamento.jpg',
    },
    {
      titolo: 'Trituratori ad asse orizzontale e verticale',
      testo: 'Due serie, dal trituratore compatto alla frantumazione gravosa. Lo sfrido ingombrante si trasporta e si centrifuga.',
      cta: { testo: 'Vedi i trituratori', href: 'trituratori.html' },
      placeholder: 'trituratore Fase ad asse orizzontale abbinato a una centrifuga',
      immagine: 'img/hero/04-trituratore.jpg',
    },
    {
      titolo: 'Tornerie automatiche e linee galvaniche',
      testo: 'Asciugatura dopo il processo galvanico e sfrido trattato a bordo macchina.',
      cta: { testo: 'Parla con un tecnico', href: 'contatti.html' },
      placeholder: 'impianto Fase di asciugatura a paniere estraibile con manipolatore su portale',
      immagine: 'img/hero/05-linea-paniere-estraibile.jpg',
    },
  ],

  soluzioni: [
    {
      slug: 'applicazioni',
      pagina: 'applicazioni.html',
      nome: 'Applicazioni',
      azione: 'Scopri le soluzioni',
      // La tessera in homepage tiene lo scatto di prodotto su grigio, in tono con
      // le altre tessere della pagina; la foto d'ambiente apre la pagina Soluzioni.
      immagine: 'img/su-grigio/applicazioni.jpg',
      placeholder: 'manipolatore Fase che afferra un paniere di centrifuga',
      testata: 'img/soluzioni/applicazioni.jpg',
      testataPlaceholder: 'particolari in ottone appena lavorati, allineati su un piano',
      titolo: 'Dal truciolo bagnato al truciolo asciutto',
      occhiello: 'Quattro lavorazioni, spesso combinate nella stessa linea',
      intro:
        'Il truciolo esce dalla macchina utensile carico di lubrorefrigerante, e quanto ne trattiene dipende '
        + 'dalla forma: un truciolo minuto ne porta con s\u00e9 meno di una matassa, e una matassa va prima ridotta. '
        + 'Per questo l\u2019impianto si sceglie a partire dal materiale, non dal listino.',
      // ARCHIVIO: versione lunga, oggi non stampata in pagina. Da quando i riquadri
      // si girano, il testo che si leggeva sotto la griglia sta sul retro delle card
      // (campo `retro` di ogni voce). Resta qui come fonte da cui il retro e' stato
      // condensato; per rimetterla in pagina basta una riga in paginaSoluzione.
      approfondimenti: [
        {
          titolo: 'Centrifugazione del truciolo',
          paragrafi: [
            'Il truciolo che esce da un tornio o da un centro di lavoro porta con s\u00e9 una quantit\u00e0 di '
            + 'lubrorefrigerante che dipende quasi solo dalla sua forma. Un truciolo minuto di ottone si asciuga '
            + 'in fretta; una matassa di acciaio inox trattiene il fluido negli avvolgimenti e continua a gocciolare '
            + 'nel cassone per giorni. Nel paniere in rotazione la forza centrifuga spinge il liquido contro la '
            + 'parete filtrante, che lo lascia passare trattenendo il solido.',
            'Il fluido raccolto viene incanalato verso una vasca e pu\u00f2 rientrare nel circuito della macchina '
            + 'utensile invece di finire nello smaltimento. Lo sfrido esce asciutto: pesa meno, non sporca il '
            + 'piazzale, e al momento della cessione viene pagato per il metallo e non per il liquido che si '
            + 'porta dietro. Sulle serie a ciclo continuo il carico avviene dall\u2019alto e la macchina lavora '
            + 'senza fermarsi; su quelle a cesto estraibile si tratta un lotto per volta, che \u00e8 quello che '
            + 'serve quando i materiali non vanno mescolati.',
          ],
        },
        {
          titolo: 'Asciugatura di pezzi minuti',
          paragrafi: [
            'Dopo un lavaggio o un passaggio in linea galvanica i pezzi arrivano bagnati, spesso alla rinfusa '
            + 'dentro un cesto. Lasciarli sgocciolare significa occupare spazio e rischiare aloni o ristagni negli '
            + 'incavi; asciugarli in forno significa aggiungere un ciclo termico che non tutti i trattamenti '
            + 'tollerano. La centrifuga risolve il passaggio in meccanica: il paniere gira, il liquido lascia la '
            + 'superficie e viene raccolto sotto.',
            'Il paniere entra carico ed esce pronto per il controllo o l\u2019imballo. Il vantaggio pratico si '
            + 'vede sulla ripetibilit\u00e0: tutti i pezzi dello stesso lotto escono nelle stesse condizioni, '
            + 'perch\u00e9 il tempo e i giri sono impostati e non dipendono da chi \u00e8 di turno. Nelle versioni '
            + 'con variatore di giri l\u2019accelerazione si controlla, e questo conta quando i componenti sono '
            + 'leggeri o hanno geometrie che tendono a incastrarsi fra loro.',
          ],
        },
        {
          titolo: 'Frantumazione di matasse e fine barra',
          paragrafi: [
            'Il truciolo lungo \u00e8 un problema di volume prima che di peso. Si avvolge su s\u00e9 stesso, riempie '
            + 'i cassoni lasciando aria in mezzo, si impiglia nei nastri e nelle coclee, e in centrifuga non entra '
            + 'nemmeno. Anche i fine barra, che restano a fine ciclo su una macchina automatica, hanno lo stesso '
            + 'effetto: ingombrano e vanno movimentati a mano.',
            'Il trituratore riduce la matassa a frammenti di dimensione controllata. Da quel momento il materiale '
            + 'si comporta come un truciolo minuto: si trasporta su nastro, si dosa, si centrifuga. Sulla serie ad '
            + 'asse orizzontale il rotore lavora con inserti di taglio sostituibili e lame fisse intercambiabili, '
            + 'cos\u00ec la manutenzione non richiede di smontare il gruppo. Su quella ad asse verticale la tramoggia '
            + 'accoglie un intero cassone e uno spintore idraulico evita che il materiale si fermi in alto, che '
            + '\u00e8 il punto dove di solito una linea si blocca.',
          ],
        },
        {
          titolo: 'Trattamento in linea',
          paragrafi: [
            'Quando le quantit\u00e0 crescono, il limite non \u00e8 pi\u00f9 la singola macchina ma il numero di volte '
            + 'in cui qualcuno deve spostare un cassone. Una linea collega le fasi in sequenza: il trituratore '
            + 'riceve lo sfrido, il nastro elevatore lo porta alla centrifuga, il fluido separato torna in vasca '
            + 'e il materiale asciutto finisce nel contenitore di raccolta.',
            'Il layout si costruisce sulla pianta del reparto, non su uno schema fisso: dove passano i carrelli, '
            + 'quanta altezza c\u2019\u00e8 sotto trave, da che lato arriva il truciolo. Sulle linee a ciclo continuo '
            + 'la gestione elettrica e analogica \u00e8 predisposta secondo la direttiva Industria 4.0, con '
            + 'archiviazione dei dati di processo e teleassistenza per gli interventi urgenti. Il risultato che '
            + 'interessa a chi produce \u00e8 semplice da misurare: meno movimentazioni manuali, un ciclo che si '
            + 'ripete uguale a ogni turno e un dato su cui ragionare quando qualcosa non torna.',
          ],
        },
      ],
      voci: [
        {
          // Le altre tre voci hanno la foto d'ambiente arrivata in img/applicazioni/.
          // Per la centrifugazione non ne è stata fornita una: resta lo scatto di
          // prodotto su grigio finché non arriva.
          nome: 'Centrifugazione del truciolo',
          immagine: 'img/su-grigio/app-centrifugazione.jpg',
          placeholder: 'centrifuga Fase con coperchio aperto e paniere in vista',
          retro: [
            'Quanto lubrorefrigerante trattiene il truciolo dipende dalla sua forma: un minuto di ottone si '
            + 'asciuga in fretta, una matassa di inox gocciola per giorni. Nel paniere in rotazione la forza '
            + 'centrifuga spinge il liquido contro la parete filtrante, che lo lascia passare e trattiene il solido.',
            'Il fluido raccolto rientra nel circuito della macchina utensile. Lo sfrido esce asciutto: pesa meno, '
            + 'non sporca il piazzale e alla cessione viene pagato per il metallo.',
          ],
        },
        {
          nome: 'Asciugatura di pezzi minuti',
          immagine: 'img/soluzioni/asciugatura-pezzi-minuti.jpg',
          placeholder: 'dadi e rondelle zincati alla rinfusa dentro un contenitore',
          retro: [
            'Dopo un lavaggio o un passaggio in linea galvanica i pezzi arrivano bagnati, spesso alla rinfusa. '
            + 'Sgocciolare occupa spazio e lascia aloni negli incavi; il forno aggiunge un ciclo termico che non '
            + 'tutti i trattamenti tollerano. La centrifuga risolve il passaggio in meccanica.',
            'Il paniere entra carico ed esce pronto per il controllo o l’imballo. Tempo e giri sono impostati, '
            + 'quindi tutti i pezzi del lotto escono nelle stesse condizioni.',
          ],
        },
        {
          nome: 'Frantumazione di matasse e fine barra',
          immagine: 'img/soluzioni/frantumazione-matasse.jpg',
          placeholder: 'benna a polipo che solleva rottame metallico sopra un cumulo di sfridi',
          retro: [
            'Il truciolo lungo è un problema di volume prima che di peso: si avvolge su sé stesso, riempie '
            + 'i cassoni lasciando aria in mezzo, si impiglia in nastri e coclee, e in centrifuga non entra. '
            + 'I fine barra hanno lo stesso effetto.',
            'Il trituratore lo riduce a frammenti di dimensione controllata. Da lì il materiale si comporta '
            + 'come un truciolo minuto: si trasporta su nastro, si dosa, si centrifuga.',
          ],
        },
        {
          nome: 'Trattamento in linea',
          immagine: 'img/soluzioni/trattamento-linea.jpg',
          placeholder: 'linea di trasporto a catene in un reparto di produzione',
          retro: [
            'Quando le quantità crescono, il limite non è più la singola macchina ma il numero di volte '
            + 'in cui qualcuno deve spostare un cassone. La linea collega le fasi: il trituratore riceve lo sfrido, '
            + 'il nastro lo porta alla centrifuga, il fluido torna in vasca.',
            'Il layout si costruisce sulla pianta del reparto. Sulle linee a ciclo continuo la gestione elettrica '
            + 'è predisposta secondo la direttiva Industria 4.0, con archiviazione dei dati e teleassistenza.',
          ],
        },
      ],
    },
    {
      slug: 'settori',
      pagina: 'settori.html',
      nome: 'Settori',
      azione: 'Scopri i reparti',
      // Come sopra: tessera in homepage su grigio, foto d'ambiente in testata.
      immagine: 'img/su-grigio/settori.jpg',
      placeholder: 'cella automatica Fase con portale di movimentazione e recinzione di protezione',
      testata: 'img/soluzioni/settori.jpg',
      testataPlaceholder: 'matasse di truciolo metallico lucido viste da vicino',
      titolo: 'Ogni reparto ha il suo sfrido',
      occhiello: 'Reparti diversi, lo stesso punto di intervento',
      intro:
        'Cambia il pezzo, cambia il fluido, cambia lo spazio a disposizione. Quello che non cambia \u00e8 dove '
        + 'interveniamo: subito a valle della lavorazione, prima che lo sfrido esca dal reparto e diventi un costo.',
      // ARCHIVIO — come sopra: la versione lunga non va più in pagina, il retro delle
      // card ne è la sintesi.
      approfondimenti: [
        {
          titolo: 'Tornerie automatiche',
          paragrafi: [
            'In torneria il truciolo esce in continuo e in quantit\u00e0 costante, spesso minuto e sempre dello '
            + 'stesso materiale. \u00c8 la condizione migliore per trattarlo dove nasce: una macchina compatta '
            + 'installata a bordo del tornio intercetta lo sfrido appena cade, separa il fluido e lo restituisce '
            + 'al circuito prima che lasci la postazione.',
            'Il guadagno non sta solo nel lubrorefrigerante recuperato. Un truciolo asciutto occupa meno volume, '
            + 'quindi il cassone si riempie pi\u00f9 lentamente e va svuotato meno spesso; e non gocciola durante '
            + 'il trasporto, il che tiene pulito il percorso fra macchina e area di stoccaggio. Sui lotti in ottone '
            + 'o in leghe leggere, dove il valore del metallo \u00e8 alto rispetto al peso, la differenza di umidit\u00e0 '
            + 'residua incide direttamente su quanto viene riconosciuto alla cessione. Quando le postazioni sono '
            + 'molte, si passa a una linea che raccoglie da pi\u00f9 macchine.',
          ],
        },
        {
          titolo: 'Officine meccaniche e centri di lavoro',
          paragrafi: [
            'In officina la variabile \u00e8 il cambio commessa. Nella stessa settimana passano acciaio, alluminio '
            + 'e ottone, con forme di truciolo diverse e a volte con la necessit\u00e0 di tenerli separati, perch\u00e9 '
            + 'mescolarli abbassa il valore di tutto il lotto. Anche i fluidi cambiano: olio intero su una '
            + 'lavorazione, emulsione su un\u2019altra.',
            'Le macchine a cesto estraibile rispondono a questo modo di lavorare. Si tratta un lotto per volta, '
            + 'si estrae il cesto e si passa al successivo senza contaminazioni. Il paniere in lamiera forata e '
            + 'il fusto removibile rendono la pulizia fra un materiale e l\u2019altro un\u2019operazione di minuti, '
            + 'non di mezza giornata. Per le cariche pi\u00f9 pesanti o per gli spezzoni di dimensione maggiore si '
            + 'usano le taglie con scocca rinforzata e sospensioni su tre punti, che assorbono i carichi eccentrici '
            + 'tipici di un cesto riempito a mano e mai perfettamente equilibrato.',
          ],
        },
        {
          titolo: 'Reparti galvanici',
          paragrafi: [
            'Qui la centrifuga non tratta lo sfrido ma il pezzo finito. Dopo il bagno e il risciacquo i componenti '
            + 'sono bagnati e vanno asciugati prima del controllo, del montaggio o dell\u2019imballo, senza che '
            + 'restino aloni sulla superficie appena trattata e senza segni dovuti al contatto fra i pezzi.',
            'L\u2019ambiente detta i vincoli pi\u00f9 delle prestazioni. C\u2019\u00e8 umidit\u00e0, ci sono residui aggressivi '
            + 'nell\u2019aria, e la movimentazione deve integrarsi con il ritmo della linea: i panieri arrivano dal '
            + 'processo e devono rientrarci. Per questo gli impianti per il galvanico sono a paniere estraibile, '
            + 'con la movimentazione studiata sul percorso del reparto e i materiali scelti per resistere a quello '
            + 'che trovano. Dove serve, i trattamenti di finitura vengono integrati nella stessa linea di '
            + 'asciugatura, cos\u00ec il pezzo esce dal ciclo gi\u00e0 pronto per la fase successiva.',
          ],
        },
      ],
      voci: [
        {
          nome: 'Tornerie automatiche',
          immagine: 'img/soluzioni/tornerie-automatiche.jpg',
          placeholder: 'macchina utensile in lavorazione con pezzo staffato sul piano',
          retro: [
            'In torneria il truciolo esce in continuo, spesso minuto e sempre dello stesso materiale: la '
            + 'condizione migliore per trattarlo dove nasce. Una macchina compatta a bordo del tornio intercetta '
            + 'lo sfrido appena cade e restituisce il fluido al circuito.',
            'Un truciolo asciutto occupa meno volume, quindi il cassone si riempie più lentamente, e non '
            + 'gocciola durante il trasporto. Quando le postazioni sono molte si passa a una linea.',
          ],
        },
        {
          nome: 'Officine meccaniche e centri di lavoro',
          immagine: 'img/soluzioni/officine-meccaniche-moderne.jpg',
          placeholder: 'capannone con macchine utensili di grandi dimensioni allineate',
          retro: [
            'In officina la variabile è il cambio commessa: nella stessa settimana passano acciaio, alluminio '
            + 'e ottone, a volte da tenere separati perché mescolarli abbassa il valore del lotto. Anche i fluidi '
            + 'cambiano.',
            'Le macchine a cesto estraibile rispondono a questo modo di lavorare: si tratta un lotto per volta e '
            + 'si passa al successivo senza contaminazioni. Il paniere forato e il fusto removibile rendono la '
            + 'pulizia un’operazione di minuti.',
          ],
        },
        {
          nome: 'Reparti galvanici',
          immagine: 'img/soluzioni/reparti-galvanici.jpg',
          placeholder: 'reparto con serbatoi conici bianchi allineati sotto un carroponte',
          retro: [
            'Qui la centrifuga non tratta lo sfrido ma il pezzo finito. Dopo il bagno e il risciacquo i componenti '
            + 'vanno asciugati prima del controllo o dell’imballo, senza aloni sulla superficie appena trattata.',
            'L’ambiente detta i vincoli più delle prestazioni: umidità, residui aggressivi nell’aria, e una '
            + 'movimentazione che deve integrarsi con il ritmo della linea. Per questo gli impianti sono a paniere '
            + 'estraibile, con materiali scelti per resistere.',
          ],
        },
      ],
    },
  ],

  sistemi: [
    {
      slug: 'centrifughe',
      immagine: 'img/su-grigio/cop-centrifughe.jpg',
      copertina: 'img/hero/02-centrifughe.jpg',
      copertinaPlaceholder: 'quattro centrifughe Fase affiancate: disoleatrice a ciclo continuo, centrifuga a cesto in acciaio inox, centrifuga con coperchio a cupola e centrifuga su antivibranti',
      pagina: 'centrifughe.html',
      nome: 'Centrifughe',
      sommario: 'Disoleatrici a ciclo continuo e a cesto estraibile',
      placeholder: 'centrifuga Fase blu con coperchio a cupola, su sospensioni antivibranti',
      intro: 'Separano il lubrorefrigerante dallo sfrido e restituiscono un truciolo asciutto, pronto per la valorizzazione.',
      macchinari: [
        {
          id: 'serie-fd',
          puntiChiave: [
            { titolo: 'Basamento', valore: 'carpenteria con sportelli removibili' },
            { titolo: 'Fasciatura', valore: 'antiusura sulle parti a contatto' },
            { titolo: 'Paniere', valore: 'acciaio da utensili temprato, sagomato a CNC' },
            { titolo: 'Rotore', valore: 'su antivibranti, arresto automatico' },
          ],
          pagina: 'prodotti/disoleatrici-ciclo-continuo-serie-fd.html',
          specifiche: [
            {
              titolo: 'Taglie disponibili',
              intestazioni: ['Modello', 'kW', 'Ø paniere (mm)', 'Portata nominale (mc/h)', 'Giri/min'],
              righe: [
                ['FD 250', '1,1', '250', '0,15', '2800'],
                ['FD 350', '1,5', '350', '0,35', '1500'],
                ['FD 420', '4,0', '420', '0,7', '1500'],
                ['FD 500', '4,0', '500', '1,5', '1500'],
                ['FD 650', '7,5', '650', '2,9', '1000'],
                ['FD 1000', '11,0', '1000', '5,0', '750'],
              ],
            },
            {
              titolo: 'Resa per materiale (kg/h)',
              intestazioni: ['Modello', 'Resa fino a', 'Fe (δ 1,3)', 'Inox (δ 1,1)', 'Al (δ 0,7)', 'Ghisa (δ 1,4)', 'Ottone (δ 1,5)'],
              righe: [
                ['FD 250', '0,15 mc/h', '195', '150', '105', '210', '225'],
                ['FD 350', '0,35 mc/h', '455', '385', '245', '490', '525'],
                ['FD 420', '0,7 mc/h', '910', '770', '490', '980', '1050'],
                ['FD 500', '1,5 mc/h', '1950', '1650', '1050', '2100', '2250'],
                ['FD 650', '2,9 mc/h', '3770', '3190', '2030', '4060', '4350'],
                ['FD 1000', '5 mc/h', '6500', '5500', '3500', '7000', '7500'],
              ],
            },
          ],
          galleria: [],
          immagine: 'img/su-grigio/fd-serie.jpg',
          nome: 'Disoleatrici a ciclo continuo serie FD',
          sintesi: 'Umidità residua sotto il 2%, fino a 7.000 kg/h',
          placeholder: 'disoleatrice Fase serie FD a ciclo continuo, imbuto di carico in sommità e portello di ispezione removibile',
          descrizione: [
            'Centrifugano sfrido minuto, ferroso e non, in uscita dalla macchina utensile. Il materiale entra dalla parte alta, olio intero ed emulsioni escono canalizzati.',
            'Le taglie compatte si installano a bordo macchina; le maggiori superano i 7.000 kg/h. Il lubrorefrigerante recuperato lascia meno del 2% di umidità residua.',
          ],
          caratteristiche: [
            'Basamento in carpenteria con sportelli removibili per pulizia e controllo',
            'Fasciatura interna antiusura sulle parti a contatto con lo sfrido',
            'Paniere in acciaio da utensili temprato, sagomato a CNC',
            'Rotore su antivibranti, con arresto automatico in caso di vibrazione eccessiva',
            'Geometria del filtro studiata per la separazione solido/liquido',
          ],
          accessori: [
            'Box elettrico con variatore di giri e predisposizione per interfaccia',
            'Telaio portante per il montaggio sopra un convogliatore',
            'Vasca di recupero con controllo di livello, pompa di lavaggio e rilancio',
          ],
        },
        {
          id: 'serie-fc',
          puntiChiave: [
            { titolo: 'Fusto e coperchio', valore: 'Fe o inox AISI 304' },
            { titolo: 'Coperchio', valore: 'apertura assistita da cilindro a gas' },
            { titolo: 'Cesto', valore: 'lamiera forata, fori Ø3 mm' },
            { titolo: 'Albero', valore: 'trattamento termico per usi gravosi' },
          ],
          pagina: 'prodotti/centrifughe-asciugatrici-serie-fc.html',
          specifiche: [
            {
              titolo: 'Taglie disponibili',
              intestazioni: ['Modello', 'kW', 'Ø cesto (mm)', 'Portata paniere (kg)', 'Volume paniere (l)', 'Giri/min'],
              righe: [
                ['FC 480', '1,5', '480', '60', '50', 'fino a 600'],
                ['FC 550', '2,2', '550', '100', '80', 'fino a 500'],
                ['FC 650', '3', '650', '150', '120', 'fino a 450'],
                ['FC 800', '5,5', '800', '200', '200', 'fino a 400'],
              ],
            },
          ],
          galleria: [],
          immagine: 'img/su-grigio/fc-serie.jpg',
          nome: 'Centrifughe asciugatrici serie FC',
          sintesi: 'Paniere estraibile per torneria e post galvanica',
          placeholder: 'centrifuga Fase serie FC, fusto inox su basamento verde acqua, cilindro di apertura del coperchio e motore esterno',
          descrizione: [
            'Centrifuga a paniere estraibile per tornerie automatiche e ambienti post galvanici. Struttura portante in Fe elettrosaldata, con porte di servizio per il cambio cinghie.',
          ],
          caratteristiche: [
            'Fusto e coperchio in Fe, su richiesta in acciaio inox AISI 304',
            'Apertura e chiusura del coperchio assistite da cilindro a gas',
            'Cesto in lamiera forata con fori Ø3 mm',
            'Albero di rotazione con trattamento termico per sollecitazioni gravose',
            'Motore autofrenante esterno e quadro elettrico di gestione',
          ],
          accessori: [
            'Variatore di giri elettronico per accelerazione e decelerazione controllate',
            'Cesto supplementare',
            'Apertura automatica del coperchio con cilindro pneumatico',
            'Kit soffiante ad aria calda con controllo della temperatura',
          ],
        },
        {
          id: 'serie-fcv',
          puntiChiave: [
            { titolo: 'Basamento', valore: 'Fe da 30 mm' },
            { titolo: 'Fusto e coperchio', valore: 'removibili, Fe o inox AISI 304' },
            { titolo: 'Cesto', valore: 'lamiera forata, fori Ø3 mm' },
            { titolo: 'Motore', valore: 'autoportante, verniciatura a polvere' },
          ],
          pagina: 'prodotti/centrifughe-asciugatrici-serie-fcv.html',
          specifiche: [
            {
              titolo: 'Taglie disponibili',
              intestazioni: ['Modello', 'kW', 'Ø cesto (mm)', 'Portata paniere (kg)', 'Volume paniere (l)', 'Giri/min'],
              righe: [
                ['FCV 350', '1,5', '350', '40', '30', '700'],
                ['FCV 475', '1,5', '475', '50', '45', '700'],
              ],
            },
          ],
          galleria: [],
          immagine: 'img/su-grigio/fcv-serie.jpg',
          nome: 'Centrifughe asciugatrici serie FCV',
          sintesi: 'Cesto verticale compatto, vibrazioni ammortizzate',
          placeholder: 'centrifuga Fase serie FCV, corpo verticale blu su basamento a tre punti con quadro a bordo macchina',
          descrizione: [
            'Disoleatrice verticale a cesto estraibile con ingombro ridotto. Un ammortizzatore interno assorbe le vibrazioni; il quadro elettrico può essere integrato a bordo.',
          ],
          caratteristiche: [
            'Basamento portante in Fe da 30 mm',
            'Fusto e coperchio removibili in Fe, su richiesta in inox AISI 304',
            'Cesto in lamiera forata con fori Ø3 mm',
            'Motore di rotazione autoportante e verniciatura a polvere',
          ],
          accessori: [
            'Variatore di giri elettronico',
            'Cesto supplementare',
            'Fusto e coperchio in acciaio inox AISI 304',
          ],
        },
        {
          id: 'serie-dk',
          puntiChiave: [
            { titolo: 'Scocca', valore: 'piastre elettrosaldate sagomate' },
            { titolo: 'Sospensioni', valore: 'tre punti per carichi eccentrici' },
            { titolo: 'Motore', valore: 'esterno, controllato da inverter' },
            { titolo: 'Supporto', valore: 'sovradimensionato e cementato' },
          ],
          pagina: 'prodotti/disoleatrici-serie-dk.html',
          specifiche: [
            {
              titolo: 'Taglie disponibili',
              intestazioni: ['Modello', 'kW', 'Ø cesto (mm)', 'Portata paniere (kg)', 'Volume paniere (l)', 'Giri/min'],
              righe: [
                ['DK 55', '3', '550', '120', '80', 'fino a 800'],
                ['DK 70', '5,5', '700', '160', '160', 'fino a 700'],
                ['DK 80', '7,5', '800', '200', '200', 'fino a 600'],
              ],
            },
          ],
          galleria: [],
          immagine: 'img/su-grigio/placeholder-nero.jpg',
          nome: 'Disoleatrici serie DK',
          sintesi: 'Cesto estraibile per cariche e spezzoni grandi',
          placeholder: 'immagine non disponibile: nessuna foto verificata per questa macchina',
          descrizione: [
            'Disoleatrice a cesto estraibile per cariche importanti. Tratta sfrido con spezzoni di taglia rilevante e minuteria; il processo si automatizza con un impianto di manipolazione dedicato.',
          ],
          caratteristiche: [
            'Scocca portante in piastre elettrosaldate sagomate e rinforzate',
            'Sospensioni su tre punti per dissipare i carichi eccentrici',
            'Motore esterno controllato da inverter',
            'Supporto di rotazione sovradimensionato e cementato, con lubrificazione esterna',
            'Sensore di arresto in caso di sbilanciamento eccessivo',
          ],
          accessori: [
            'Vasca di recupero con controllo di livello e pompa di rilancio',
            'Cesto supplementare',
            'Bandiera a colonna tirantata con paranco elettrico',
          ],
        },
      ],
    },
    {
      slug: 'impianti',
      immagine: 'img/su-grigio/cop-impianti.jpg',
      copertina: 'img/hero/03-linea-trattamento.jpg',
      copertinaPlaceholder: 'linea Fase di trattamento truciolo: vasche di raccolta, centrifughe a paniere e ribaltatore per cassoni sotto un portale',
      pagina: 'impianti.html',
      nome: 'Impianti',
      sommario: 'Linee automatiche di trattamento e asciugatura',
      placeholder: 'linea Fase di trattamento truciolo: vasche di raccolta, centrifughe a paniere e ribaltatore per cassoni sotto un portale',
      intro: 'Linee complete che collegano macchina utensile, trattamento dello sfrido e stoccaggio, dimensionate sul reparto.',
      macchinari: [
        {
          id: 'ciclo-continuo',
          puntiChiave: [
            { titolo: 'Gestione', valore: 'elettrica e analogica, Industria 4.0' },
            { titolo: 'Dati', valore: 'archiviazione digitale di processo' },
            { titolo: 'Software', valore: 'dedicato, sviluppato sull’impianto' },
            { titolo: 'Assistenza', valore: 'da remoto per gli urgenti' },
          ],
          pagina: 'prodotti/impianti-trattamento-trucioli-ciclo-continuo.html',
          galleria: [],
          immagine: 'img/su-grigio/placeholder-nero.jpg',
          nome: 'Impianti di trattamento trucioli metallici a ciclo continuo',
          sintesi: 'Alimentazione continua, dati secondo Industria 4.0',
          placeholder: 'immagine non disponibile: nessuna foto verificata per questa macchina',
          descrizione: [
            'Alimentano la centrifuga senza interruzioni. La configurazione dipende dal materiale da trattare, dalle quantità e dal tipo di stoccaggio.',
            'Disposizione e layout nascono da una valutazione degli spazi disponibili e del processo esistente.',
          ],
          caratteristiche: [
            'Gestione elettrica e analogica secondo la direttiva Industria 4.0',
            'Archiviazione digitale dei dati di processo',
            'Software dedicato sviluppato sull’impianto',
            'Teleassistenza da remoto per gli interventi urgenti',
          ],
          accessori: [],
        },
        {
          id: 'paniere-estraibile',
          puntiChiave: [
            { titolo: 'Cesto', valore: 'con bacino di contenimento liquidi' },
            { titolo: 'Mantello', valore: 'forato, sotto il trasportatore' },
          ],
          pagina: 'prodotti/impianti-trattamento-trucioli-paniere-estraibile.html',
          galleria: [],
          immagine: 'img/su-grigio/imp-paniere-serie.jpg',
          nome: 'Impianti di trattamento trucioli metallici a paniere estraibile',
          sintesi: 'Più materiali trattati senza contaminazione',
          placeholder: 'impianto Fase a paniere estraibile: portale su tre panieri separati, alimentati dalla tramoggia del truciolo',
          descrizione: [
            'Linee con centrifuga a cesto estraibile, adatte a truciolo corto, lungo, matassoso o con pezzi e fine barra.',
            'Sono la scelta obbligata quando nello stesso reparto si lavorano materiali diversi, anche con lubrorefrigeranti diversi.',
          ],
          caratteristiche: [
            'Cesto con bacino di contenimento liquidi inferiore',
            'Mantello forato da inserire sotto il trasportatore della macchina utensile',
          ],
          accessori: [],
        },
        {
          id: 'ambiente-galvanico',
          puntiChiave: [
            { titolo: 'Finitura', valore: 'trattamenti integrabili nella linea' },
          ],
          pagina: 'prodotti/impianti-asciugatura-paniere-estraibile-galvanico.html',
          galleria: [],
          immagine: 'img/su-grigio/placeholder-nero.jpg',
          nome: 'Impianti di asciugatura a paniere estraibile in ambiente galvanico',
          sintesi: 'Carico automatico del rotobarile dai cassoni',
          placeholder: 'immagine non disponibile: nessuna foto verificata per questa macchina',
          descrizione: [
            'Linee di asciugatura per processi galvanici, con svuotamento del materiale dai cassoni e carico automatico del rotobarile.',
          ],
          caratteristiche: [
            'Trattamenti di finitura integrabili nella linea di asciugatura',
          ],
          accessori: [],
        },
      ],
    },
    {
      slug: 'trituratori',
      immagine: 'img/su-grigio/cop-trituratori.jpg',
      copertina: 'img/hero/04-trituratore.jpg',
      copertinaPlaceholder: 'trituratore Fase ad asse orizzontale abbinato a una centrifuga',
      pagina: 'trituratori.html',
      nome: 'Trituratori',
      sommario: 'Frantumazione di trucioli lunghi e matassosi',
      placeholder: 'trituratore Fase compatto ad asse orizzontale con tramoggia di carico',
      intro: 'Riducono il volume della matassa prima della centrifugazione e semplificano stoccaggio e trasporto.',
      macchinari: [
        {
          id: 'serie-tr',
          puntiChiave: [
            { titolo: 'Corpo macchina', valore: 'robusto e accessibile' },
            { titolo: 'Rotore', valore: 'acciaio da utensili temprato' },
            { titolo: 'Inserti di taglio', valore: 'sostituibili, lame intercambiabili' },
            { titolo: 'Guance', valore: 'antiusura, vagliatura personalizzabile' },
          ],
          pagina: 'prodotti/trituratori-asse-orizzontale-serie-tr.html',
          specifiche: [
            {
              titolo: 'Taglie disponibili',
              intestazioni: ['Modello', 'kW', 'Resa acciaio (kg/h)', 'Sezione entrata sfrido (mm)'],
              righe: [
                ['TR 1', '2,2', '200', '350 × 180'],
                ['TR DUAL', '5', '400', '400 × 400'],
              ],
            },
          ],
          galleria: ['img/immagini/IMG2-6.jpg', 'img/immagini/IMG3-6.jpg'],
          immagine: 'img/su-grigio/placeholder-nero.jpg',
          nome: 'Trituratori ad asse orizzontale serie TR',
          sintesi: 'Asse orizzontale con espulsione brevettata',
          placeholder: 'immagine non disponibile: nessuna foto verificata per questa macchina',
          descrizione: [
            'Trituratore compatto per trucioli lunghi e matassosi, anche in presenza di pezzi di fine barra. Il sistema di espulsione automatica dello spezzone è brevettato.',
          ],
          caratteristiche: [
            'Corpo macchina robusto e accessibile per la manutenzione',
            'Rotore di frantumazione in acciaio da utensili temprato',
            'Inserti di taglio del rotore sostituibili e lame fisse intercambiabili',
            'Guance inferiori antiusura con vagliatura personalizzabile',
            'Paracolpi sulla giunzione del motoriduttore',
          ],
          accessori: [],
        },
        {
          id: 'serie-trw',
          puntiChiave: [
            { titolo: 'Tramoggia', valore: 'accoglie un intero cassone' },
            { titolo: 'Braccio', valore: 'antiusura, ricavato dal pieno' },
            { titolo: 'Utensili', valore: 'temprati, estraibili da cassetti' },
            { titolo: 'Spintore', valore: 'idraulico, evita l’arresto in tramoggia' },
          ],
          pagina: 'prodotti/trituratori-asse-verticale-serie-trw.html',
          specifiche: [
            {
              titolo: 'Taglie disponibili',
              intestazioni: ['Modello', 'kW', 'Resa acciaio (kg/h)', 'Movimentazione'],
              righe: [
                ['TRW 4_70', '7,5', '300-500', 'Meccanica'],
                ['TRW 4_110', '11', '500-800', 'Meccanica'],
                ['TRW 6_180', '20', '500-800', 'Idraulica'],
                ['TRW 6_220', '25', '500-1000', 'Idraulica'],
                ['TRW 7_300', '32', '500-1500', 'Idraulica'],
              ],
            },
          ],
          galleria: [],
          immagine: 'img/su-grigio/trw-serie.jpg',
          nome: 'Trituratori ad asse verticale serie TRW',
          sintesi: 'Asse verticale per frantumazione gravosa',
          placeholder: 'trituratore Fase serie TRW ad asse verticale, tramoggia di carico e motore laterale',
          descrizione: [
            'Trituratore per grandi quantità di truciolo lungo e matassoso, con espulsione automatica dei fine barra. Movimentazione meccanica o idraulica.',
          ],
          caratteristiche: [
            'Tramoggia di carico che accoglie un intero cassone',
            'Braccio di miscelazione della matassa in antiusura, ricavato dal pieno',
            'Utensili di taglio in acciaio temprato, estraibili da cassetti esterni',
            'Spintore idraulico che impedisce l’arresto del materiale in tramoggia',
            'Parti a contatto in acciaio antiusura di grosso spessore',
            'Taratura del grado di sovraccarico della macchina',
          ],
          accessori: [],
        },
      ],
    },
  ],

  pagine: {
    azienda: {
      titolo: 'Profilo dell\u2019azienda',
      occhiello: 'Chi siamo',
      placeholder: 'Sede e stabilimento Fase a Tezze sul Brenta, veduta esterna',
      immagine: 'img/immagini/sede-fase.jpg',
      intro:
        'Il nostro lavoro comincia dove finisce la lavorazione meccanica. Il truciolo esce dalla macchina '
        + 'utensile carico di lubrorefrigerante: i nostri sistemi lo separano, recuperano il fluido e '
        + 'restituiscono uno sfrido asciutto, pronto per essere valorizzato. Da vent\u2019anni progettiamo e '
        + 'costruiamo centrifughe, impianti di trattamento e trituratori per officine meccaniche, tornerie '
        + 'automatiche e reparti galvanici.',
      sezioni: [
        {
          titolo: 'Dal truciolo al valore',
          paragrafi: [
            'Ogni chilo di lubrorefrigerante che resta nel truciolo \u00e8 un costo due volte: \u00e8 fluido da '
            + 'riacquistare ed \u00e8 peso che abbassa il prezzo dello sfrido. I nostri impianti portano '
            + 'l\u2019umidit\u00e0 residua sotto il 2% e riportano il lubrorefrigerante nel circuito di lavorazione.',
            'Il risultato si misura su due fronti. Da una parte il ritorno economico, in tempi brevi, dato '
            + 'dalla valorizzazione dello sfrido trattato e dal fluido recuperato. Dall\u2019altra il minor volume '
            + 'da smaltire e la minor dispersione di lubrorefrigerante, nel rispetto della normativa vigente.',
          ],
        },
        {
          titolo: 'Ogni impianto nasce da un reparto preciso',
          paragrafi: [
            'Non partiamo da un catalogo chiuso. Un progetto comincia dalla misura degli spazi, dal materiale '
            + 'da trattare e dal volume di sfrido che il reparto produce: da l\u00ec nascono il layout della linea e '
            + 'il dimensionamento della macchina.',
            'Ricerca, progettazione e costruzione avvengono all\u2019interno. L\u2019area test verifica le soluzioni '
            + 'sullo sfrido reale del cliente prima della messa in produzione, cos\u00ec che le rese dichiarate '
            + 'siano quelle che si ottengono in officina.',
          ],
        },
        {
          titolo: 'Il rapporto non finisce alla consegna',
          paragrafi: [
            'Il team tecnico segue l\u2019impianto dalla preparazione del progetto fino al collaudo, e prosegue '
            + 'con controlli e manutenzioni programmate. Sugli impianti a ciclo continuo la teleassistenza da '
            + 'remoto permette di intervenire senza attendere una trasferta.',
            'L\u2019esperienza maturata nella centrifugazione industriale resta il riferimento su cui '
            + 'dimensioniamo ogni nuova macchina.',
          ],
        },
      ],
    },

    contatti: {
      titolo: 'Contatti',
      sottotitolo: 'Dimensionamento, prove sullo sfrido e assistenza',
      intro: [
        'Per rispondere con qualcosa di più di un listino ci serve sapere cosa esce dalla vostra lavorazione. '
        + 'Il materiale, la forma del truciolo, quanto ne producete in un turno e che fluido lo bagna cambiano '
        + 'la macchina da proporre molto più della cifra a budget.',
        'Descriveteci il componente e il ciclo attuale: come viene raccolto oggi lo sfrido, dove finisce, quanto '
        + 'lubrorefrigerante ci resta dentro e che risultato vi serve a valle. Se ci sono vincoli di spazio, di '
        + 'altezza sotto trave o di movimentazione, sono quelli a definire il layout.',
        'Su richiesta trattiamo un campione del vostro materiale prima di qualsiasi offerta.',
      ],
      argomenti: [
        'Centrifughe e disoleatrici',
        'Impianti di trattamento truciolo',
        'Trituratori',
        'Prova su campione di sfrido',
        'Assistenza su un impianto installato',
        'Altro',
      ],
    },
    news: {
      titolo: 'News',
      sottotitolo: 'Fiere, prove e aggiornamenti dall’azienda',
      voci: [
        { titolo: 'MECSPE 2026', data: '2026-01-29', dataTesto: '29 gennaio 2026',
          testo: 'Saremo a MECSPE, la fiera dedicata alle innovazioni per l’industria manifatturiera. Padiglione 14, stand F32.',
          placeholder: 'stand Fase alla fiera MECSPE', immagine: 'img/MECSPE2026_SMALL_500x422_ITA.jpg' },
        { titolo: 'MECSPE 2025', data: '2025-02-06', dataTesto: '6 febbraio 2025',
          testo: 'Fiera internazionale di riferimento per l’industria manifatturiera. Padiglione 19, stand A02.',
          placeholder: 'allestimento dello stand MECSPE 2025', immagine: 'img/MECSPE2025_BIG_2400x2025_ITA.jpg' },
        { titolo: 'Fornitore Offresi 2025', data: '2025-01-15', dataTesto: '15 gennaio 2025',
          testo: 'Salone internazionale della subfornitura meccanica, a Erba dal 13 al 15 febbraio. Padiglione B, stand 281.',
          placeholder: 'stand Fase al salone Fornitore Offresi', immagine: 'img/336x280.png' },
        { titolo: 'MECSPE 2024', data: '2024-02-20', dataTesto: '20 febbraio 2024',
          testo: 'In mostra i sistemi di centrifugazione e triturazione del truciolo metallico. Padiglione 19, stand A10.',
          placeholder: 'macchine esposte a MECSPE 2024', immagine: 'img/SMALL_500x422_ITA.jpg' },
        { titolo: 'MECSPE 2022', data: '2022-05-25', dataTesto: '25 maggio 2022',
          testo: 'Sistemi di centrifugazione e triturazione del truciolo metallico al padiglione 16, stand D07.',
          placeholder: 'visitatori allo stand MECSPE 2022', immagine: 'img/Vi_aspettiamo_a_mecspe_22.jpg' },
        { titolo: 'MECSPE 2021', data: '2021-09-24', dataTesto: '24 settembre 2021',
          testo: 'Presenti con i sistemi di centrifugazione e triturazione del truciolo metallico. Padiglione 22, stand C86.',
          placeholder: 'stand Fase a MECSPE 2021', immagine: 'img/Vi_aspettiamo_a_mecspe-e1632813901389.jpg' },
        { titolo: 'Test gratuiti di triturazione', data: '2021-09-07', dataTesto: '7 settembre 2021',
          testo: 'I trituratori frantumano il truciolo e semplificano centrifugazione e stoccaggio. Mettiamo a disposizione una prova gratuita sullo sfrido del cliente, su appuntamento.',
          placeholder: 'prova di triturazione nell’area test', immagine: 'img/immagini/trituratori-verticali.jpg' },
      ],
    },

  },
};
