import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import ArticlePage from '@/components/en/ArticlePage';
import { articleBySlug } from '@/content/en/articles';

const article = articleBySlug('react-native-live-activities-production')!;

export const metadata: Metadata = {
  title: 'Live Activities in React Native, in Production',
  description: article.description,
  alternates: { canonical: '/en/blog/react-native-live-activities-production' },
  openGraph: {
    title: article.title,
    description: article.description,
    url: '/en/blog/react-native-live-activities-production',
    images: ['/assets/images/og.png'],
    locale: 'en_GB',
    type: 'article',
  },
};

export default function Post() {
  return (
    <ArticlePage article={article}>
      <p>
        Getting a Live Activity on screen is an afternoon&apos;s work. There are enough tutorials
        for that, and they are broadly correct. What none of them prepare you for is the month
        afterwards, when the thing is in front of real users on real devices.
      </p>
      <p>
        I have shipped two: a parking countdown in <Link href="/realisations/ticket">Ticket</Link>{' '}
        and prayer times in <Link href="/realisations/qindil">Qindil</Link>. These are the things
        that cost me time.
      </p>

      <h2>It is a widget extension, not part of your app</h2>
      <p>
        The Live Activity runs in a separate process, written in SwiftUI, with no access to your
        React Native code. Whatever it displays has to be handed to it, either at start time or
        through an update.
      </p>
      <p>
        The practical consequence is that your <code>ActivityAttributes</code> becomes an API
        contract between two processes. Get it wrong and you are shipping an app update to fix a
        layout. Design it as if you cannot change it, because changing it is expensive.
      </p>

      <h2>Three layouts, and the one everybody forgets</h2>
      <p>
        The Dynamic Island has a compact form, a minimal form and an expanded form. The Lock Screen
        has its own. That is four states, and the minimal one is the trap: it appears when a second
        activity is running, and it is barely wider than a circle.
      </p>
      <p>
        If your minimal layout assumes any width at all, it will be clipped the first time a user
        has a timer running alongside your app. Design the minimal state first, not last.
      </p>

      <h2>Update budgets are real and mostly undocumented</h2>
      <p>
        You cannot update a Live Activity as often as you like. iOS enforces a budget, and when you
        exceed it your updates are simply dropped. No error, no callback, nothing in the logs.
      </p>
      <p>
        For a countdown, the answer is not to update at all. Pass the end date once and let SwiftUI
        render the countdown natively with a <code>Text</code> timer. Ticket runs a full parking
        session with essentially no updates after the initial start. It is the cheapest and most
        reliable approach, and it is what makes a 3.3 MB app feel instant.
      </p>
      <p>
        Update only when the underlying fact changes: the user adds fifteen minutes, the train is
        delayed, the score changes. Not on a timer.
      </p>

      <h2>Ending the activity is harder than starting it</h2>
      <p>
        The case everybody misses: the user force-quits your app while the activity is live. Your
        JavaScript is gone, your app is not running, and the activity is still on their Lock Screen.
      </p>
      <p>
        If you have nothing in place, it sits there until iOS eventually clears it, which can be
        hours. Set a dismissal policy when you start the activity, and give it a sensible end date
        even when you expect to end it manually. Treat the manual end as the happy path, not the
        only path.
      </p>

      <h2>Buttons on the Lock Screen need App Intents</h2>
      <p>
        A Live Activity with interactive buttons is where this gets genuinely useful — &quot;add 15
        minutes&quot; without unlocking the phone. Those buttons are App Intents, which run in yet
        another process and cannot touch your JavaScript either.
      </p>
      <p>
        Which means the same shared-state problem as everywhere else in this stack. I wrote about
        the two honest strategies in{' '}
        <Link href="/en/blog/react-native-app-intents-after-sirikit">the App Intents piece</Link>,
        and they apply identically here.
      </p>

      <h2>What I would tell you before you start</h2>
      <ul>
        <li>Design the minimal Dynamic Island state first. It is the one that breaks.</li>
        <li>Pass an end date and let SwiftUI count down. Do not push updates every second.</li>
        <li>Handle the force-quit case explicitly, from day one.</li>
        <li>
          Keep the shared attributes small. Every field is a field that can drift between two
          processes.
        </li>
        <li>
          Test with a second Live Activity running. Most bugs in mine only appeared in that state.
        </li>
      </ul>
    </ArticlePage>
  );
}
