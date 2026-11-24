/// <reference types="astro/client" />

interface ImportMetaEnv {
  /** Contact form endpoint (Formspree / Web3Forms / webhook). Optional. */
  readonly PUBLIC_CONTACT_ENDPOINT?: string;
  /** Booking request endpoint; falls back to PUBLIC_CONTACT_ENDPOINT. Optional. */
  readonly PUBLIC_BOOKING_ENDPOINT?: string;
  /** JSON feed of occupied slots merged into the static agenda. Optional. */
  readonly PUBLIC_AGENDA_FEED_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
