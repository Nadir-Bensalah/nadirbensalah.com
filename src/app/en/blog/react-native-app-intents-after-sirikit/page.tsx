import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import ArticlePage from '@/components/en/ArticlePage';
import { articleBySlug } from '@/content/en/articles';

const article = articleBySlug('react-native-app-intents-after-sirikit')!;

export const metadata: Metadata = {
  title: 'App Intents in React Native, After SiriKit',
  description: article.description,
  alternates: { canonical: '/en/blog/react-native-app-intents-after-sirikit' },
  openGraph: {
    title: article.title,
    description: article.description,
    url: '/en/blog/react-native-app-intents-after-sirikit',
    images: ['/assets/images/og.png'],
    locale: 'en_GB',
    type: 'article',
  },
};

export default function Post() {
  return (
    <ArticlePage article={article}>
      <p>
        If you search for how to add Siri support to a React Native app, almost everything you will
        find describes SiriKit, <code>INIntent</code> definition files, or the{' '}
        <code>react-native-siri-shortcut</code> package. All of it is now the wrong answer, and the
        package in question has not been meaningfully maintained in years.
      </p>
      <p>
        Apple deprecated SiriKit at WWDC 2026. Since the public release of iOS 27, an app that still
        relies on it compiles and runs, but receives{' '}
        <strong>
          no voice traffic, no Spotlight indexing and no Apple Intelligence personalisation
        </strong>
        . It is not broken. It is invisible, which is worse, because nothing in your crash reports
        will tell you.
      </p>

      <h2>The two frameworks are not interchangeable</h2>
      <p>
        This is the part that catches teams out. SiriKit worked by mapping your app onto
        Apple&apos;s fixed vocabulary of domains: messaging, payments, workouts, ride booking. If
        your app did something Apple had not anticipated, you were out of luck.
      </p>
      <p>
        App Intents inverts that. You declare arbitrary actions with typed parameters, and the
        system works out how to surface them. That is far more powerful, but it means an existing
        SiriKit integration cannot be migrated mechanically. The concepts do not line up. You are
        rewriting the integration, not porting it.
      </p>

      <h2>Where the code actually lives</h2>
      <p>
        An App Intent is Swift, in your iOS target. There is no JavaScript equivalent and there will
        not be one, because the system needs to read your intents{' '}
        <strong>without launching your app</strong>. That constraint drives everything else.
      </p>
      <p>
        Concretely, in a React Native project you end up with three pieces. First, a Swift struct
        conforming to <code>AppIntent</code>, declaring its parameters and its title. Second, an{' '}
        <code>AppShortcutsProvider</code> that gives Siri the phrases people will actually say.
        Third, a way for the intent to reach your app&apos;s data, which is the part nobody writes
        about.
      </p>

      <h2>The part nobody writes about</h2>
      <p>
        Your intent runs in a separate process from your React Native app. It cannot call into your
        JavaScript. It cannot read your AsyncStorage. If the user says the phrase while your app has
        never been launched since reboot, there is no JavaScript context in existence at all.
      </p>
      <p>There are two honest strategies, and the choice matters.</p>
      <p>
        <strong>Deep link and let the app do the work.</strong> The intent opens the app with a URL,
        and your existing JavaScript handles it. Simple, reliable, and it works with the code you
        already have. The cost is that the app has to come to the foreground, which defeats the
        purpose of a Control Center button or a hands-free Siri command.
      </p>
      <p>
        <strong>Share state through an App Group and act natively.</strong> The intent reads and
        writes a store both processes can see, and returns a result without opening anything. This
        is what makes a Control Center toggle feel instant. The cost is that a slice of your
        business logic now exists in Swift, and has to stay in step with the JavaScript version.
      </p>
      <p>
        In <Link href="/realisations/ticket">Ticket</Link>, a parking timer, I used the second
        approach: starting a session from Siri, from the Control Center or from an NFC tag on the
        dashboard has to work without unlocking the phone, so the intent writes to a shared store
        and the app catches up later. The shared surface is deliberately tiny — a start time and a
        duration — because every field you share is a field that can drift.
      </p>
      <p>
        Ticket is fully native, so in its case both sides of that store are Swift. In a React Native
        app the same pattern holds, with one extra cost: the JavaScript side has to read the store
        on wake and reconcile, because the intent may have run while the app was not even in memory.
      </p>

      <h2>What to check if you are migrating</h2>
      <ul>
        <li>
          Search your iOS target for <code>INIntent</code>, <code>.intentdefinition</code> files,
          and any dependency mentioning Siri shortcuts. Those are what stopped working.
        </li>
        <li>
          Test with the app force-quit and the device freshly rebooted. This is the case that
          reveals whether you actually built the integration or just tested the happy path.
        </li>
        <li>
          Decide your shared surface before writing anything. The smaller it is, the less it will
          drift.
        </li>
        <li>
          Write the Siri phrases as a person would say them, not as your feature is named
          internally. &quot;Start parking&quot; beats &quot;Create session&quot; every time.
        </li>
      </ul>

      <h2>Whether this is worth doing at all</h2>
      <p>
        Honestly: for many apps, no. If nobody was using your Siri integration when it worked,
        rebuilding it on App Intents will not create demand that was not there.
      </p>
      <p>
        It is worth it when the action is something people do repeatedly, in a hurry, often with
        their hands full. Parking, timers, logging something, starting a session. If your action
        does not fit that description, spend the week on something else — and I would rather tell
        you that now than invoice you for it.
      </p>
    </ArticlePage>
  );
}
