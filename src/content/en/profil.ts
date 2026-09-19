/**
 * The English profile. Written, not translated.
 *
 * The French site sells to a French market: Amiens, local meetings, SIREN.
 * The English site sells to a different buyer entirely — a remote client in
 * London, Dublin or New York — so the objections are different: time zones,
 * invoicing, language. Translating the French word for word would answer
 * questions nobody asked and skip the ones that matter.
 *
 * Same rule as the French side: nothing here is invented. Every fact traces
 * back to a published app or to the CV.
 */

export const profileEn = {
  name: 'Nadir Ben Salah',
  role: 'React Native developer',
  city: 'Amiens',
  country: 'France',
  /** What a remote buyer actually needs to know about working with someone in France. */
  timezone: 'CET — same hours as London plus one, four hours of overlap with New York',
  email: 'contact@nadirbensalah.com',
  linkedin: 'https://www.linkedin.com/in/nadir-ben-salah/',
  github: 'https://github.com/Nadir-Bensalah',
  site: 'https://nadirbensalah.com',
  cv: '/assets/cv/cv-nadir-ben-salah.pdf',
} as const;

/**
 * The positioning, in one paragraph.
 *
 * Deliberately narrow. "Full-stack developer available for hire" competes
 * with every marketplace on earth. "React Native developer who writes the
 * Swift when React Native runs out" competes with almost nobody, and it is
 * what four of the eight published apps actually prove.
 */
export const positioningEn =
  'Most React Native work stops where iOS begins. Live Activities, the Dynamic Island, App Intents, widgets, a Watch companion: none of them have a JavaScript equivalent, and that is usually where a project stalls. I write the Swift, wire it to the React Native side, and ship it through App Review.';

export type ProofEn = { title: string; body: string };

export const proofsEn: ProofEn[] = [
  {
    title: 'I write the native layer',
    body: 'Four of my published apps contain Swift I wrote: ActivityKit for Live Activities, App Intents for Siri and Control Center, Core NFC, and a SwiftUI Watch app. That is the part most React Native teams outsource or abandon.',
  },
  {
    title: 'I ship through App Review',
    body: 'Signing, privacy questionnaire, screenshots, rejections and the replies that get them overturned. The gap between a working build and a live app is a job of its own, and it is where most projects stop.',
  },
  {
    title: 'I hold real constraints',
    body: 'A flight computer that makes no network calls, ever. A parking timer in 3.3 MB driving the Dynamic Island. A pet health record you can verify in airplane mode. The constraint is decided before the first line of code.',
  },
  {
    title: 'I work as a European contractor',
    body: 'Invoicing from France, one hour ahead of London, four hours of overlap with New York. No visa question, no agency in between, no intermediary reading your brief before I do.',
  },
];

/** What I take on, phrased as outcomes rather than a service menu. */
export const servicesEn = [
  {
    title: 'Native iOS features in a React Native app',
    body: 'Live Activities and the Dynamic Island, App Intents for Siri and the Control Center, home screen widgets, a Watch companion, NFC. Written in Swift, bridged properly, shipped.',
  },
  {
    title: 'Code audit',
    body: 'An independent read of your React Native codebase: architecture, performance, technical debt and App Store risk. A written report ordered by priority, with an effort estimate per item.',
  },
  {
    title: 'Taking over a stalled project',
    body: 'An app someone else started and left. I find out what is really there, what it costs to finish, and whether finishing is the right call. Sometimes it is not, and I say so.',
  },
  {
    title: 'Getting unblocked in App Review',
    body: 'Repeated rejections, a privacy questionnaire that contradicts the binary, a build that will not sign. These are known problems with known fixes.',
  },
];

/**
 * The objections a remote buyer raises, answered before they have to ask.
 * This is the section that converts on the English side.
 */
export const objectionsEn = [
  {
    q: 'You are in France. How do the hours work?',
    a: 'I am one hour ahead of London, so a UK working day is effectively the same day. With New York there are about four usable hours every afternoon. For Australia there is no honest answer, so I do not take that work.',
  },
  {
    q: 'How does invoicing work from outside the UK or US?',
    a: 'I invoice from France as a registered sole trader. For UK and US companies that is an ordinary international supplier invoice. No employer of record, no umbrella company, no payroll complication.',
  },
  {
    q: 'Is your English good enough for daily work?',
    a: 'Written English, yes, including code review, specs and documentation. Calls are fine. I will not pretend to be a native speaker, and if a role needs client-facing presentations in English every day, someone else is a better fit.',
  },
  {
    q: 'Can you take a full-time role remotely?',
    a: 'For a contract, yes, straightforwardly. For an employed role, a company outside France needs an employer of record, which most will not set up for one developer. Worth knowing before either of us spends time on it.',
  },
  {
    q: 'What do you not do?',
    a: 'Flutter, native Android as a specialism, backend at scale, game development, design from scratch. I also turn down projects where an app is not the right answer, which happens more often than you would think.',
  },
];
