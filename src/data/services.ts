export type ServiceIcon = 'chat' | 'brain' | 'book' | 'spiral' | 'compass' | 'bolt' | 'leaf';

export interface Service {
  slug: string;
  title: string;
  summary: string;
  icon: ServiceIcon;
  intro: string;
  sections: { heading: string; paragraphs?: string[]; items?: string[] }[];
  firstSession: string;
  /** Matches an id in `bookingServices`. */
  bookingId: string;
}

export const services: Service[] = [
  {
    slug: 'consulenza-psicologica',
    title: 'Consulenza Psicologica Individuale',
    summary:
      'Uno spazio di ascolto riservato per affrontare traumi, lutti, attacchi di panico, ansia da prestazione e grandi cambiamenti di vita.',
    icon: 'chat',
    intro:
      'La consulenza psicologica individuale offre uno spazio protetto in cui comprendere ciò che si sta vivendo e individuare, insieme, le risorse per affrontarlo.',
    sections: [
      {
        heading: 'Quando può essere utile',
        items: [
          'Un trauma o un evento che ha segnato la tua vita',
          'La perdita di una persona cara',
          'Attacchi di panico e stati d’ansia',
          'Ansia da prestazione in ambito lavorativo o scolastico',
          'Grandi cambiamenti e momenti di transizione',
        ],
      },
      {
        heading: 'Intervento psicologico',
        paragraphs: [
          'L’intervento psicologico è un percorso che richiede tempo e partecipazione attiva sia della persona sia del terapeuta. Non è una pillola magica né una soluzione immediata: piccoli cambiamenti nei comportamenti autodistruttivi e il superamento del senso di inferiorità (tristezza, paura, dolore) possono portare a risultati che cambiano la vita.',
        ],
      },
    ],
    firstSession:
      'Il primo incontro è dedicato alla conoscenza reciproca: racconterai il motivo della richiesta e definiremo insieme obiettivi e modalità del percorso.',
    bookingId: 'consulenza-psicologica',
  },
  {
    slug: 'potenziamento-cognitivo',
    title: 'Potenziamento Cognitivo Psicopedagogico',
    summary:
      'Consapevolezza, capacità interpretative, ripristino di vecchie reazioni e strategie pratiche per la vita quotidiana.',
    icon: 'bolt',
    intro:
      'Un percorso psicopedagogico orientato a sviluppare strumenti concreti per leggere meglio le situazioni e rispondere in modo più funzionale.',
    sections: [
      {
        heading: 'Su cosa si lavora',
        items: [
          'Consapevolezza di sé e dei propri schemi di pensiero',
          'Capacità interpretative delle situazioni',
          'Azzeramento e ripristino di vecchie reazioni automatiche',
          'Strategie pratiche da applicare nella quotidianità',
        ],
      },
    ],
    firstSession:
      'Nel primo incontro si definiscono gli obiettivi e si individuano le aree su cui concentrare il lavoro.',
    bookingId: 'consulenza-psicologica',
  },
  {
    slug: 'neuropsicologia',
    title: 'Consulenza Neuropsicologica',
    summary:
      'Valutazione di attenzione, memoria, linguaggio, percezione e funzioni esecutive con test neuropsicologici globali e specifici.',
    icon: 'brain',
    intro:
      'La valutazione neuropsicologica indaga le funzioni cognitive attraverso test globali e test specifici per singola funzione.',
    sections: [
      {
        heading: 'Funzioni valutate',
        items: ['Attenzione', 'Memoria', 'Linguaggio', 'Percezione', 'Funzioni esecutive'],
      },
      {
        heading: 'Le tre fasi della valutazione',
        items: [
          'Colloquio clinico-neuropsicologico',
          'Somministrazione di test psicometrici, computerizzati e/o carta-e-matita',
          'Colloquio di restituzione con la persona o con il familiare/caregiver che la accompagna',
        ],
      },
      {
        heading: 'Quando è rilevante',
        paragraphs: [
          'La valutazione neuropsicologica è utile in presenza di trauma cranico, patologie vascolari, processi neurodegenerativi come le demenze, condizioni psichiatriche croniche o condizioni mediche generali. Può avere finalità diagnostiche, prognostiche, medico-legali/peritali e riabilitative.',
        ],
      },
    ],
    firstSession:
      'La valutazione si apre con il colloquio clinico-neuropsicologico, in cui si raccolgono storia e difficoltà riferite; i test vengono scelti in base alla richiesta.',
    bookingId: 'neuropsicologia',
  },
  {
    slug: 'consulenza-pedagogica',
    title: 'Consulenza Pedagogica e DSA',
    summary:
      'Sostegno a bambini, adolescenti, studenti universitari e genitori: metodo di studio, atteggiamenti positivi verso l’apprendimento e strategie per i DSA.',
    icon: 'book',
    intro:
      'La consulenza pedagogica accompagna bambini, adolescenti, studenti universitari e genitori verso un rapporto sereno ed efficace con lo studio.',
    sections: [
      {
        heading: 'Aree di intervento',
        items: [
          'Costruzione di un metodo di studio personalizzato',
          'Sviluppo di atteggiamenti positivi verso l’apprendimento',
          'Strategie funzionali per i DSA (Disturbi Specifici dell’Apprendimento)',
          'Supporto e orientamento ai genitori',
        ],
      },
    ],
    firstSession:
      'Il primo incontro è un colloquio di conoscenza con lo studente e/o i genitori per comprendere difficoltà, risorse e obiettivi.',
    bookingId: 'pedagogica-dsa',
  },
  {
    slug: 'ipnosi',
    title: 'Ipnosi',
    summary:
      'Un processo terapeutico e di rilassamento a supporto del dolore e delle componenti psicosomatiche ed emotive.',
    icon: 'spiral',
    intro: 'L’ipnosi è un processo terapeutico e di rilassamento che può affiancare il percorso psicologico.',
    sections: [
      {
        heading: 'Ambiti di applicazione',
        items: [
          'Supporto nella gestione del dolore',
          'Componenti psicosomatiche ed emotive: ansia, depressione, timidezza',
          'Autostima',
          'Espressione personale, professionale e creativa',
        ],
      },
      {
        heading: 'Nota importante',
        paragraphs: [
          'L’ipnosi non sostituisce le cure mediche o psichiatriche. L’opportunità di utilizzarla viene valutata nel primo colloquio.',
        ],
      },
    ],
    firstSession:
      'Prima di ogni induzione si svolge un colloquio per valutare l’appropriatezza dello strumento e raccogliere il consenso informato.',
    bookingId: 'ipnosi',
  },
  {
    slug: 'professional-coaching',
    title: 'Professional Coaching e Career Enhancement',
    summary:
      'Percorsi di Professional Coaching e Career Enhancement per chiarire gli obiettivi e sviluppare il proprio potenziale professionale.',
    icon: 'compass',
    intro: 'Il Professional Coaching sostiene la crescita professionale e il raggiungimento di obiettivi concreti.',
    sections: [{ heading: 'Percorsi', items: ['Professional Coaching', 'Percorso Career Enhancement'] }],
    firstSession: 'Il primo incontro serve a definire obiettivi, aspettative e struttura del percorso di coaching.',
    bookingId: 'coaching',
  },
  {
    slug: 'percorso-transpersonale',
    title: 'Percorso Transpersonale Evolutivo',
    summary: 'Un percorso di crescita personale orientato allo sviluppo della persona nella sua globalità.',
    icon: 'leaf',
    intro: 'Il Percorso Transpersonale Evolutivo è un cammino di crescita personale che guarda alla persona nella sua globalità.',
    sections: [
      {
        heading: 'Informazioni',
        paragraphs: [
          'Per conoscere contenuti, durata e modalità del percorso contatta lo studio: i dettagli vengono condivisi nel colloquio iniziale.',
        ],
      },
    ],
    firstSession: 'Il colloquio iniziale serve a comprendere motivazioni e aspettative e a spiegare il percorso.',
    bookingId: 'coaching',
  },
];

/** Durations are sample values — VERIFY with the practice. */
export const bookingServices = [
  { id: 'consulenza-psicologica', label: 'Consulenza Psicologica Individuale', minutes: 50 },
  { id: 'neuropsicologia', label: 'Valutazione / Consulenza Neuropsicologica', minutes: 60 },
  { id: 'pedagogica-dsa', label: 'Consulenza Pedagogica / DSA', minutes: 50 },
  { id: 'ipnosi', label: 'Ipnosi', minutes: 50 },
  { id: 'coaching', label: 'Coaching / Career Enhancement / Transpersonale', minutes: 50 },
] as const;

/** SEO meta descriptions (120–160 chars), keyed by service slug. */
export const serviceSeo: Record<string, { title: string; description: string }> = {
  'consulenza-psicologica': {
    title: 'Consulenza psicologica a Cremenaga e online',
    description: 'Consulenza psicologica individuale a Cremenaga (VA) e online: ansia, attacchi di panico, lutto, trauma e momenti di cambiamento. Prenota un colloquio.',
  },
  'potenziamento-cognitivo': {
    title: 'Potenziamento cognitivo psicopedagogico',
    description: 'Percorso di potenziamento cognitivo psicopedagogico: consapevolezza, capacità interpretative e strategie pratiche. Studio PsyCoPed, Cremenaga (VA).',
  },
  neuropsicologia: {
    title: 'Valutazione neuropsicologica a Varese e online',
    description: 'Valutazione neuropsicologica di attenzione, memoria, linguaggio e funzioni esecutive con test psicometrici. Studio PsyCoPed, Cremenaga (VA).',
  },
  'consulenza-pedagogica': {
    title: 'Consulenza pedagogica e DSA a Cremenaga',
    description: 'Consulenza pedagogica per bambini, ragazzi, universitari e genitori: metodo di studio e strategie per i DSA. Studio PsyCoPed, Cremenaga (VA) e online.',
  },
  ipnosi: {
    title: 'Ipnosi a Cremenaga (VA)',
    description: 'Ipnosi come supporto al rilassamento, al dolore e alle componenti emotive e psicosomatiche, con il Dott. Mirko Provini a Cremenaga (VA).',
  },
  'professional-coaching': {
    title: 'Professional Coaching e Career Enhancement',
    description: 'Percorsi di Professional Coaching e Career Enhancement per chiarire gli obiettivi e crescere professionalmente. Studio PsyCoPed, in studio e online.',
  },
  'percorso-transpersonale': {
    title: 'Percorso Transpersonale Evolutivo',
    description: 'Il Percorso Transpersonale Evolutivo: un cammino di crescita personale che guarda alla persona nella sua globalità. Studio PsyCoPed, Cremenaga (VA).',
  },
};
