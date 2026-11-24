import type { Locale } from '../i18n';

export type ServiceIcon = 'chat' | 'brain' | 'book' | 'spiral' | 'compass' | 'bolt' | 'leaf';

export interface ServiceSection {
  heading: string;
  paragraphs?: string[];
  items?: string[];
  /** Render `items` as a numbered list. */
  ordered?: boolean;
}

export interface Service {
  slug: string;
  title: string;
  summary: string;
  icon: ServiceIcon;
  intro: string;
  sections: ServiceSection[];
  firstSession: string;
  /** Matches an id in `bookingServices`. */
  bookingId: string;
  seo: { title: string; description: string };
}

type ServiceText = Omit<Service, 'slug' | 'icon' | 'bookingId'>;

/** Language-independent part of each service. */
const base = [
  { slug: 'consulenza-psicologica', icon: 'chat', bookingId: 'consulenza-psicologica' },
  { slug: 'potenziamento-cognitivo', icon: 'bolt', bookingId: 'consulenza-psicologica' },
  { slug: 'neuropsicologia', icon: 'brain', bookingId: 'neuropsicologia' },
  { slug: 'consulenza-pedagogica', icon: 'book', bookingId: 'pedagogica-dsa' },
  { slug: 'ipnosi', icon: 'spiral', bookingId: 'ipnosi' },
  { slug: 'professional-coaching', icon: 'compass', bookingId: 'coaching' },
  { slug: 'percorso-transpersonale', icon: 'leaf', bookingId: 'coaching' },
] as const satisfies readonly { slug: string; icon: ServiceIcon; bookingId: string }[];

type Slug = (typeof base)[number]['slug'];

const text: Record<Locale, Record<Slug, ServiceText>> = {
  it: {
    'consulenza-psicologica': {
      title: 'Consulenza Psicologica Individuale',
      summary:
        'Uno spazio di ascolto riservato per affrontare traumi, lutti, attacchi di panico, ansia da prestazione e grandi cambiamenti di vita.',
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
      seo: {
        title: 'Consulenza psicologica a Cremenaga e online',
        description:
          'Consulenza psicologica individuale a Cremenaga (VA) e online: ansia, attacchi di panico, lutto, trauma e momenti di cambiamento. Prenota un colloquio.',
      },
    },
    'potenziamento-cognitivo': {
      title: 'Potenziamento Cognitivo Psicopedagogico',
      summary:
        'Consapevolezza, capacità interpretative, ripristino di vecchie reazioni e strategie pratiche per la vita quotidiana.',
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
      firstSession: 'Nel primo incontro si definiscono gli obiettivi e si individuano le aree su cui concentrare il lavoro.',
      seo: {
        title: 'Potenziamento cognitivo psicopedagogico',
        description:
          'Percorso di potenziamento cognitivo psicopedagogico: consapevolezza, capacità interpretative e strategie pratiche. Studio PsyCoPed, Cremenaga (VA).',
      },
    },
    neuropsicologia: {
      title: 'Consulenza Neuropsicologica',
      summary:
        'Valutazione di attenzione, memoria, linguaggio, percezione e funzioni esecutive con test neuropsicologici globali e specifici.',
      intro:
        'La valutazione neuropsicologica indaga le funzioni cognitive attraverso test globali e test specifici per singola funzione.',
      sections: [
        {
          heading: 'Funzioni valutate',
          items: ['Attenzione', 'Memoria', 'Linguaggio', 'Percezione', 'Funzioni esecutive'],
        },
        {
          heading: 'Le tre fasi della valutazione',
          ordered: true,
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
      seo: {
        title: 'Valutazione neuropsicologica a Varese e online',
        description:
          'Valutazione neuropsicologica di attenzione, memoria, linguaggio e funzioni esecutive con test psicometrici. Studio PsyCoPed, Cremenaga (VA).',
      },
    },
    'consulenza-pedagogica': {
      title: 'Consulenza Pedagogica e DSA',
      summary:
        'Sostegno a bambini, adolescenti, studenti universitari e genitori: metodo di studio, atteggiamenti positivi verso l’apprendimento e strategie per i DSA.',
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
      seo: {
        title: 'Consulenza pedagogica e DSA a Cremenaga',
        description:
          'Consulenza pedagogica per bambini, ragazzi, universitari e genitori: metodo di studio e strategie per i DSA. Studio PsyCoPed, Cremenaga (VA) e online.',
      },
    },
    ipnosi: {
      title: 'Ipnosi',
      summary: 'Un processo terapeutico e di rilassamento a supporto del dolore e delle componenti psicosomatiche ed emotive.',
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
      seo: {
        title: 'Ipnosi a Cremenaga (VA)',
        description:
          'Ipnosi come supporto al rilassamento, al dolore e alle componenti emotive e psicosomatiche, con il Dott. Mirko Provini a Cremenaga (VA).',
      },
    },
    'professional-coaching': {
      title: 'Professional Coaching e Career Enhancement',
      summary:
        'Percorsi di Professional Coaching e Career Enhancement per chiarire gli obiettivi e sviluppare il proprio potenziale professionale.',
      intro: 'Il Professional Coaching sostiene la crescita professionale e il raggiungimento di obiettivi concreti.',
      sections: [{ heading: 'Percorsi', items: ['Professional Coaching', 'Percorso Career Enhancement'] }],
      firstSession: 'Il primo incontro serve a definire obiettivi, aspettative e struttura del percorso di coaching.',
      seo: {
        title: 'Professional Coaching e Career Enhancement',
        description:
          'Percorsi di Professional Coaching e Career Enhancement per chiarire gli obiettivi e crescere professionalmente. Studio PsyCoPed, in studio e online.',
      },
    },
    'percorso-transpersonale': {
      title: 'Percorso Transpersonale Evolutivo',
      summary: 'Un percorso di crescita personale orientato allo sviluppo della persona nella sua globalità.',
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
      seo: {
        title: 'Percorso Transpersonale Evolutivo',
        description:
          'Il Percorso Transpersonale Evolutivo: un cammino di crescita personale che guarda alla persona nella sua globalità. Studio PsyCoPed, Cremenaga (VA).',
      },
    },
  },
  en: {
    'consulenza-psicologica': {
      title: 'Individual Psychological Counselling',
      summary:
        'A confidential space to address trauma, bereavement, panic attacks, performance anxiety and major life changes.',
      intro:
        'Individual psychological counselling offers a protected space in which to understand what you are going through and, together, identify the resources to face it.',
      sections: [
        {
          heading: 'When it can help',
          items: [
            'A trauma or an event that marked your life',
            'The loss of a loved one',
            'Panic attacks and anxiety',
            'Performance anxiety at work or school',
            'Major changes and moments of transition',
          ],
        },
        {
          heading: 'Psychological intervention',
          paragraphs: [
            'Psychological intervention is a path that takes time and the active participation of both the person and the therapist. It is not a magic pill or an immediate solution: small changes in self-destructive behaviours and overcoming the sense of inferiority (sadness, fear, pain) can lead to life-changing results.',
          ],
        },
      ],
      firstSession:
        'The first session is dedicated to getting to know each other: you will explain why you came and together we will define the goals and the format of the path.',
      seo: {
        title: 'Psychological counselling in Cremenaga and online',
        description:
          'Individual psychological counselling in Cremenaga (VA), Italy, and online: anxiety, panic attacks, bereavement, trauma and times of change. Book a session.',
      },
    },
    'potenziamento-cognitivo': {
      title: 'Psycho-pedagogical Cognitive Enhancement',
      summary:
        'Self-awareness, interpretive skills, resetting old reactions and practical strategies for everyday life.',
      intro:
        'A psycho-pedagogical path aimed at developing concrete tools to read situations better and respond in a more functional way.',
      sections: [
        {
          heading: 'What we work on',
          items: [
            'Awareness of yourself and your thinking patterns',
            'Interpretive skills in everyday situations',
            'Resetting and replacing old automatic reactions',
            'Practical strategies to apply in daily life',
          ],
        },
      ],
      firstSession: 'In the first session the goals are defined and the areas to focus on are identified.',
      seo: {
        title: 'Psycho-pedagogical cognitive enhancement',
        description:
          'Psycho-pedagogical cognitive enhancement path: self-awareness, interpretive skills and practical strategies. Studio PsyCoPed, Cremenaga (VA), Italy.',
      },
    },
    neuropsicologia: {
      title: 'Neuropsychological Consultation',
      summary:
        'Assessment of attention, memory, language, perception and executive functions using global and specific neuropsychological tests.',
      intro:
        'Neuropsychological assessment investigates cognitive functions through global tests and tests specific to each function.',
      sections: [
        {
          heading: 'Functions assessed',
          items: ['Attention', 'Memory', 'Language', 'Perception', 'Executive functions'],
        },
        {
          heading: 'The three phases of the assessment',
          ordered: true,
          items: [
            'Clinical-neuropsychological interview',
            'Administration of psychometric tests, computerised and/or paper-and-pencil',
            'Feedback session with the person or with the family member/caregiver who accompanies them',
          ],
        },
        {
          heading: 'When it is relevant',
          paragraphs: [
            'Neuropsychological assessment is useful in cases of head injury, vascular disease, neurodegenerative processes such as dementia, chronic psychiatric conditions or general medical conditions. It can serve diagnostic, prognostic, medico-legal/expert and rehabilitative purposes.',
          ],
        },
      ],
      firstSession:
        'The assessment begins with the clinical-neuropsychological interview, in which history and reported difficulties are collected; the tests are chosen according to the request.',
      seo: {
        title: 'Neuropsychological assessment in Varese and online',
        description:
          'Neuropsychological assessment of attention, memory, language and executive functions with psychometric tests. Studio PsyCoPed, Cremenaga (VA), Italy.',
      },
    },
    'consulenza-pedagogica': {
      title: 'Pedagogical Counselling and Learning Disorders (SLD)',
      summary:
        'Support for children, teenagers, university students and parents: study method, positive attitudes towards learning and strategies for specific learning disorders.',
      intro:
        'Pedagogical counselling helps children, teenagers, university students and parents build a calm and effective relationship with studying.',
      sections: [
        {
          heading: 'Areas of intervention',
          items: [
            'Building a personalised study method',
            'Developing positive attitudes towards learning',
            'Functional strategies for SLD (Specific Learning Disorders)',
            'Support and guidance for parents',
          ],
        },
      ],
      firstSession:
        'The first session is a getting-to-know-each-other meeting with the student and/or parents to understand difficulties, resources and goals.',
      seo: {
        title: 'Pedagogical counselling and SLD in Cremenaga',
        description:
          'Pedagogical counselling for children, teenagers, university students and parents: study method and strategies for learning disorders. Studio PsyCoPed, Cremenaga (VA), and online.',
      },
    },
    ipnosi: {
      title: 'Hypnosis',
      summary: 'A therapeutic and relaxation process that supports pain management and psychosomatic and emotional components.',
      intro: 'Hypnosis is a therapeutic and relaxation process that can complement a psychological path.',
      sections: [
        {
          heading: 'Areas of application',
          items: [
            'Support in pain management',
            'Psychosomatic and emotional components: anxiety, depression, shyness',
            'Self-esteem',
            'Personal, professional and creative expression',
          ],
        },
        {
          heading: 'Important note',
          paragraphs: [
            'Hypnosis does not replace medical or psychiatric care. Whether to use it is assessed in the first session.',
          ],
        },
      ],
      firstSession:
        'Before every induction, a session is held to assess whether the tool is appropriate and to obtain informed consent.',
      seo: {
        title: 'Hypnosis in Cremenaga (VA)',
        description:
          'Hypnosis as support for relaxation, pain and emotional and psychosomatic components, with Dr. Mirko Provini in Cremenaga (VA), Italy.',
      },
    },
    'professional-coaching': {
      title: 'Professional Coaching and Career Enhancement',
      summary:
        'Professional Coaching and Career Enhancement paths to clarify your goals and develop your professional potential.',
      intro: 'Professional Coaching supports professional growth and the achievement of concrete goals.',
      sections: [{ heading: 'Paths', items: ['Professional Coaching', 'Career Enhancement path'] }],
      firstSession: 'The first session is used to define goals, expectations and the structure of the coaching path.',
      seo: {
        title: 'Professional Coaching and Career Enhancement',
        description:
          'Professional Coaching and Career Enhancement paths to clarify your goals and grow professionally. Studio PsyCoPed, in the studio and online.',
      },
    },
    'percorso-transpersonale': {
      title: 'Evolutionary Transpersonal Path',
      summary: 'A personal growth path focused on developing the person as a whole.',
      intro: 'The Evolutionary Transpersonal Path is a journey of personal growth that looks at the person as a whole.',
      sections: [
        {
          heading: 'Information',
          paragraphs: [
            'To find out about the content, duration and format of the path, contact the studio: the details are shared in the initial session.',
          ],
        },
      ],
      firstSession: 'The initial session is used to understand motivations and expectations and to explain the path.',
      seo: {
        title: 'Evolutionary Transpersonal Path',
        description:
          'The Evolutionary Transpersonal Path: a journey of personal growth that looks at the person as a whole. Studio PsyCoPed, Cremenaga (VA), Italy.',
      },
    },
  },
};

export const getServices = (locale: Locale): Service[] =>
  base.map((b) => ({ ...b, ...text[locale][b.slug] }));

export const serviceSlugs: string[] = base.map((b) => b.slug);

/** Durations are sample values — VERIFY with the practice. */
const bookingBase = [
  { id: 'consulenza-psicologica', minutes: 50 },
  { id: 'neuropsicologia', minutes: 60 },
  { id: 'pedagogica-dsa', minutes: 50 },
  { id: 'ipnosi', minutes: 50 },
  { id: 'coaching', minutes: 50 },
] as const;

const bookingLabels: Record<Locale, Record<(typeof bookingBase)[number]['id'], string>> = {
  it: {
    'consulenza-psicologica': 'Consulenza Psicologica Individuale',
    neuropsicologia: 'Valutazione / Consulenza Neuropsicologica',
    'pedagogica-dsa': 'Consulenza Pedagogica / DSA',
    ipnosi: 'Ipnosi',
    coaching: 'Coaching / Career Enhancement / Transpersonale',
  },
  en: {
    'consulenza-psicologica': 'Individual Psychological Counselling',
    neuropsicologia: 'Neuropsychological Assessment / Consultation',
    'pedagogica-dsa': 'Pedagogical Counselling / SLD',
    ipnosi: 'Hypnosis',
    coaching: 'Coaching / Career Enhancement / Transpersonal',
  },
};

export const getBookingServices = (locale: Locale) =>
  bookingBase.map((b) => ({ id: b.id as string, minutes: b.minutes as number, label: bookingLabels[locale][b.id] }));
