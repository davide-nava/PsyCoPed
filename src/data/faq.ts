export interface FaqItem {
  q: string;
  a: string;
}

/** Answers marked VERIFY describe sample policy to be confirmed by the practice. */
export const faqs: FaqItem[] = [
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
];

export const emergencyText =
  'Questo sito non è un servizio di emergenza medica o psichiatrica. Se tu o qualcuno vicino a te siete in pericolo immediato o in crisi acuta, chiamate subito il 112 (Numero Unico di Emergenza) o recatevi al Pronto Soccorso più vicino.';
