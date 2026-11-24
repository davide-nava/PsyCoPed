import type { Locale } from '../i18n';

export interface FaqItem {
  q: string;
  a: string;
}

/** Answers marked VERIFY describe sample policy to be confirmed by the practice. */
const faqText: Record<Locale, FaqItem[]> = {
  it: [
    {
      q: 'Come si svolge il primo colloquio?',
      a: 'Il primo colloquio è un incontro di conoscenza: racconti il motivo della richiesta, il professionista ti spiega come lavora e insieme definite obiettivi e modalità del percorso. Durata indicativa: circa 50–60 minuti.',
    },
    {
      q: 'Posso fare le sedute online?',
      a: 'Sì. Oltre agli incontri in studio a Cremenaga (VA) sono disponibili consulenze in videochiamata. Per l’online servono una connessione stabile e un luogo riservato in cui non essere disturbati.',
    },
    {
      q: 'Quanto è riservato quello che racconto?',
      a: 'Gli psicologi sono vincolati al segreto professionale e alle norme del Codice Deontologico. Le informazioni condivise non vengono comunicate a terzi senza il tuo consenso, salvo i casi previsti dalla legge.',
    },
    {
      q: 'La terapia dà risultati immediati?',
      a: 'No. La terapia non è una pillola magica né una soluzione istantanea: è un processo che richiede tempo e partecipazione attiva sia della persona sia del terapeuta. Piccoli cambiamenti costanti possono portare a risultati significativi.',
    },
    {
      q: 'Come si disdice o si sposta un appuntamento?',
      a: 'Ti chiediamo di avvisare con almeno 24 ore di anticipo, telefonicamente, via WhatsApp/Telegram o email. Le sedute disdette tardivamente possono essere addebitate. (Politica indicativa, da confermare con lo studio.)',
    },
    {
      q: 'Quanto costa una seduta e viene rilasciata fattura?',
      a: 'Le tariffe dipendono dal tipo di percorso e vengono comunicate in fase di prenotazione. Per ogni prestazione viene rilasciata regolare documentazione fiscale. Per informazioni contatta lo studio.',
    },
    {
      q: 'Posso portare un familiare alla valutazione neuropsicologica?',
      a: 'Sì. Il colloquio di restituzione può essere svolto con la persona o con il familiare/caregiver che la accompagna.',
    },
    {
      q: 'Il sito o il modulo contatti vanno bene in caso di emergenza?',
      a: 'No. Questo sito e i moduli di contatto non sono un servizio di emergenza e non vengono monitorati in tempo reale. In caso di pericolo immediato per te o per altri chiama il 112 (Numero Unico di Emergenza) o recati al Pronto Soccorso più vicino.',
    },
  ],
  en: [
    {
      q: 'How does the first session work?',
      a: 'The first session is a getting-to-know-each-other meeting: you explain why you have come, the professional explains how they work, and together you define the goals and the format of the path. Approximate duration: about 50–60 minutes.',
    },
    {
      q: 'Can I have sessions online?',
      a: 'Yes. In addition to in-person sessions at the studio in Cremenaga (VA), video consultations are available. For online sessions you need a stable connection and a private place where you will not be disturbed.',
    },
    {
      q: 'How confidential is what I share?',
      a: 'Psychologists are bound by professional secrecy and by the rules of the Code of Ethics. The information you share is not disclosed to third parties without your consent, except in cases required by law.',
    },
    {
      q: 'Does therapy give immediate results?',
      a: 'No. Therapy is not a magic pill or an instant solution: it is a process that takes time and the active participation of both the person and the therapist. Small, steady changes can lead to significant results.',
    },
    {
      q: 'How do I cancel or reschedule an appointment?',
      a: 'We ask you to give at least 24 hours’ notice, by phone, WhatsApp/Telegram or email. Late cancellations may be charged. (Indicative policy, to be confirmed with the studio.)',
    },
    {
      q: 'How much does a session cost, and is an invoice issued?',
      a: 'Fees depend on the type of path and are communicated when you book. Proper tax documentation is issued for every service. For information, contact the studio.',
    },
    {
      q: 'Can I bring a family member to the neuropsychological assessment?',
      a: 'Yes. The feedback session can be held with the person or with the family member/caregiver who accompanies them.',
    },
    {
      q: 'Are this website or the contact form suitable in an emergency?',
      a: 'No. This website and the contact forms are not an emergency service and are not monitored in real time. In case of immediate danger to yourself or others, call 112 (the single European emergency number) or go to the nearest emergency room.',
    },
  ],
};

export const getFaqs = (locale: Locale): FaqItem[] => faqText[locale];
