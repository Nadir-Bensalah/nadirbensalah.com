import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import ArticlePage from '@/components/en/ArticlePage';
import { articleBySlug } from '@/content/en/articles';

const article = articleBySlug('react-native-apple-watch')!;

export const metadata: Metadata = {
  title: 'React Native and Apple Watch: the Honest Answer',
  description: article.description,
  alternates: { canonical: '/en/blog/react-native-apple-watch' },
  openGraph: {
    title: article.title,
    description: article.description,
    url: '/en/blog/react-native-apple-watch',
    images: ['/assets/images/og.png'],
    locale: 'en_GB',
    type: 'article',
  },
};

export default function Post() {
  return (
    <ArticlePage article={article}>
      <p>
        React Native does not run on watchOS. There is no configuration flag, no community fork
        worth depending on, and no realistic prospect of one. The watch app is SwiftUI, and if
        somebody tells you otherwise they are either selling something or have not shipped one.
      </p>
      <p>
        That is the disappointing half. The useful half is that this matters far less than teams
        assume, because of what a watch app actually is.
      </p>

      <h2>A watch app is not a small phone app</h2>
      <p>
        The temptation is to port your interface. Do not. A watch interaction lasts a few seconds,
        at arm&apos;s length, often while walking. The right scope is usually one screen showing one
        number, and maybe one button.
      </p>
      <p>
        In <Link href="/realisations/qindil">Qindil</Link> the watch app shows the next prayer time
        and how long until it. That is the entire surface. In{' '}
        <Link href="/realisations/amiens-bus-velam">Amiens</Link> it shows the next bus at your
        usual stop. Both took a fraction of the time the phone screens took, because there was
        almost nothing on them.
      </p>
      <p>
        Which reframes the problem: you are not rewriting your app in SwiftUI. You are writing one
        or two small screens, and the cost is proportional.
      </p>

      <h2>What can be shared, and what cannot</h2>
      <p>
        <strong>Shareable:</strong> nothing of your JavaScript, but plenty of your thinking. The
        data model, the business rules, the formatting conventions. If your prayer time calculation
        lives in TypeScript, you will be writing it again in Swift — so keep it small and well
        specified, and write tests on both sides that assert the same fixtures.
      </p>
      <p>
        <strong>Not shareable:</strong> the interface, the navigation, the state management. All of
        it is SwiftUI.
      </p>
      <p>
        There is a third option people forget: for many cases, the watch app does not need your
        logic at all. It needs a <em>result</em> the phone already computed. Which leads to the
        connection.
      </p>

      <h2>How the two halves talk</h2>
      <p>
        <code>WatchConnectivity</code> is the framework, and it has several transfer modes that
        behave very differently. The one that matters for most apps is{' '}
        <strong>application context</strong>: a small dictionary the phone updates and the watch
        reads, where only the latest value survives.
      </p>
      <p>
        That is exactly right for &quot;here is the next prayer time&quot; or &quot;here is your
        usual stop&quot;. It is exactly wrong for a queue of events, because intermediate values are
        discarded.
      </p>
      <p>
        The constraint nobody mentions: the watch is frequently unreachable. Out of range, in a
        different room, battery saving. Your watch app must render something sensible with stale
        data or no data at all. Design that state first, because your users will see it more often
        than you expect.
      </p>

      <h2>The complication, which is the real reason to do this</h2>
      <p>
        The app on the watch is the smaller half of the value. The complication — the number on the
        watch face itself — is what people actually use, because it needs no interaction at all.
      </p>
      <p>
        Complications have their own update budget, tighter than Live Activities. The same lesson
        applies: give the system data it can render over time rather than pushing updates. A next
        prayer time or a departure time is a date, and the watch can count towards it on its own.
      </p>

      <h2>So, should you?</h2>
      <p>
        Worth it when your app has a single recurring number somebody would glance at: a time, a
        countdown, a next departure, a streak. The complication is the product; the app is the
        settings screen for it.
      </p>
      <p>
        Not worth it when your app is about browsing, reading, entering data or anything involving a
        list longer than five items. You will spend weeks on something with very few users, and I
        would rather say that before you commit than after.
      </p>
    </ArticlePage>
  );
}
