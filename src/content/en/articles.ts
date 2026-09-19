/**
 * English articles: metadata only. The body of each one lives in its own
 * page file, because an article is written prose, not data.
 *
 * Editorial rule, same as the French side: every piece starts from something
 * actually shipped. When a figure appears, it traces back to a published app
 * or to a named public source.
 */

export type Article = {
  slug: string;
  title: string;
  description: string;
  /** The search intent this is written for. */
  intent: string;
  published: string;
  updated?: string;
  minutes: number;
  /** The standfirst, shown under the title and in the index. */
  standfirst: string;
};

export const articles: Article[] = [
  {
    slug: 'react-native-app-intents-after-sirikit',
    title: 'App Intents in React Native, now that SiriKit is gone',
    description:
      'Apple deprecated SiriKit at WWDC 2026. Since iOS 27 an app still using it is invisible to Siri. Here is what to write instead, from a React Native project.',
    intent:
      'A developer whose Siri integration stopped receiving traffic, looking for the current answer.',
    published: '2026-09-19',
    minutes: 7,
    standfirst:
      'Almost every guide you will find on this subject is now wrong, mine included until I rewrote it. SiriKit is deprecated, App Intents is the only route, and the two are not interchangeable.',
  },
  {
    slug: 'react-native-live-activities-production',
    title: 'Live Activities in React Native: what the tutorials leave out',
    description:
      'Getting a Live Activity on screen takes an afternoon. Keeping it correct in production is the actual work. Update budgets, dismissal, and the three layouts.',
    intent:
      'A developer who has a Live Activity working locally and is about to discover production.',
    published: '2026-09-19',
    minutes: 8,
    standfirst:
      'Every tutorial stops at the hello world in the Dynamic Island. This is what happens after that, learned from shipping two of them.',
  },
  {
    slug: 'react-native-apple-watch',
    title: 'You cannot write a Watch app in React Native. Here is what to do instead.',
    description:
      'React Native does not run on watchOS. The watch app is SwiftUI. What can be shared, what has to be written twice, and how the two halves talk.',
    intent:
      'A team being asked for a Watch app and trying to find out whether their stack allows it.',
    published: '2026-09-19',
    minutes: 6,
    standfirst:
      'The honest answer disappoints people, so most articles avoid giving it. Here it is, along with the architecture that does work.',
  },
];

export function articleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function dateEn(iso: string): string {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} ${months[m - 1]} ${y}`;
}
