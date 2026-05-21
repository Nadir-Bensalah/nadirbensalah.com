import type { SeoPage } from './seoPages';
import { pricePages, servicePages } from './seoPages';

const translateCommonFaq = [
  { question: 'How long does it take to launch a first version?', answer: 'A usable first version can often be scoped and built in a few weeks when the scope is properly prioritized. More advanced products with payments, marketplace logic, geolocation or admin dashboards require deeper design, testing and security work.' },
  { question: 'Can you help define the MVP before development?', answer: 'Yes. Product framing is part of the process: users, priorities, budget estimate, technical risks and launch plan.' },
  { question: 'Do you work remotely with clients in France, Tunisia and internationally?', answer: 'Yes. Collaboration is structured around clear milestones, regular updates and direct communication.' },
];

function englishServiceFrom(page: SeoPage): SeoPage {
  return {
    ...page,
    locale: 'en',
    path: `/en/services/${page.slug}`,
    alternatePaths: { fr: `/services/${page.slug}`, en: `/en/services/${page.slug}` },
    title: page.title
      .replace('Création application mobile sur mesure – iOS, Android, React Native', 'Custom Mobile App Development – iOS, Android, React Native')
      .replace('Développement SaaS sur mesure – Créer un logiciel en ligne rentable', 'Custom SaaS Development – Build a Profitable Online Software')
      .replace('Logiciel métier sur mesure pour PME – Automatisation et digitalisation', 'Custom Business Software for SMEs – Automation and Digitalization')
      .replace('Création marketplace sur mesure – Plateforme vendeurs acheteurs', 'Custom Marketplace Development – Buyers, Sellers and Service Platforms'),
    description: `Premium development service for ${page.primaryKeyword}: strategy, UX, technical architecture, development, launch and long-term evolution.`,
    eyebrow: 'Premium service',
    h1: page.h1
      .replace('Création application mobile sur mesure pour startup, PME et entrepreneur', 'Custom mobile app development for startups, SMEs and founders')
      .replace('Développement SaaS sur mesure pour lancer un logiciel rentable', 'Custom SaaS development to launch a profitable software product')
      .replace('Logiciel métier sur mesure pour digitaliser et automatiser votre entreprise', 'Custom business software to digitize and automate your company'),
    primaryKeyword: page.primaryKeyword
      .replace('création application mobile', 'mobile app development')
      .replace('développement SaaS', 'SaaS development')
      .replace('logiciel métier sur mesure', 'custom business software')
      .replace('création marketplace', 'marketplace development'),
    secondaryKeywords: ['custom software development', 'freelance developer', 'digital product development', 'MVP development'],
    intent: 'Founder, startup or company looking for a senior product-oriented developer.',
    intro: [
      'Building a serious digital product is not only about writing code. It requires business clarity, product prioritization, technical architecture and a launch plan.',
      'I help founders, startups and companies build mobile apps, SaaS products, marketplaces, web platforms and custom business software with a premium, direct and result-oriented approach.',
      'The goal is to launch a credible first version, reduce unnecessary complexity and create a product that can evolve after real user feedback.',
    ],
    offer: ['Product and MVP framing', 'UX and technical architecture', 'Frontend, backend and integrations', 'Launch, iteration and long-term support'],
    sections: [
      { heading: 'A product-first approach', body: ['Every project starts with the business objective: acquisition, automation, revenue, retention or operational efficiency.', 'This prevents wasted budget and keeps development focused on the features that create measurable value.'] },
      { heading: 'Senior technical execution', body: ['The stack is selected according to the product goal, expected scale, budget and timeline.', 'Projects may include React Native, Next.js, backend APIs, Firebase, Supabase, Stripe, dashboards, automation and AI integrations.'] },
      { heading: 'From idea to launch', body: ['The process covers framing, prioritization, UX, development, testing, deployment and post-launch evolution.', 'The objective is to ship a useful, reliable and commercially credible version before expanding the product.'] },
    ],
    benefits: ['Clearer product scope', 'Faster MVP launch', 'Maintainable architecture', 'Business-oriented decisions', 'Direct collaboration with the developer'],
    process: ['Discovery', 'MVP scope', 'Architecture', 'Development', 'Launch and iteration'],
    faq: translateCommonFaq,
    cta: 'Discuss my project',
  };
}

function englishPriceFrom(page: SeoPage): SeoPage {
  return {
    ...page,
    locale: 'en',
    path: `/en/pricing/${page.slug}`,
    alternatePaths: { fr: `/prix/${page.slug}`, en: `/en/pricing/${page.slug}` },
    title: page.title
      .replace('Prix application mobile : combien coûte une app iOS Android ?', 'Mobile App Cost: How Much Does an iOS/Android App Cost?')
      .replace('Prix développement SaaS – Budget pour créer un logiciel en ligne', 'SaaS Development Cost – Budget to Build an Online Software')
      .replace('Prix création marketplace – Budget, fonctionnalités et délais', 'Marketplace Development Cost – Budget, Features and Timeline'),
    description: `Understand the budget for ${page.primaryKeyword}: MVP scope, features, timeline, technical complexity and cost optimization strategy.`,
    eyebrow: 'Budget guide',
    h1: page.h1
      .replace('Prix application mobile : combien coûte la création d’une app ?', 'Mobile app cost: how much does it cost to build an app?')
      .replace('Prix développement SaaS : quel budget prévoir pour lancer un logiciel en ligne ?', 'SaaS development cost: what budget should you plan?'),
    primaryKeyword: page.primaryKeyword
      .replace('prix application mobile', 'mobile app cost')
      .replace('prix développement SaaS', 'SaaS development cost')
      .replace('prix création marketplace', 'marketplace development cost')
      .replace('prix site web sur mesure', 'custom website cost')
      .replace('prix logiciel métier', 'custom software cost'),
    secondaryKeywords: ['development budget', 'MVP cost', 'software quote', 'digital product pricing'],
    intent: 'Prospect comparing budgets before requesting a quote.',
    intro: ['The cost of a digital product depends on scope, features, design, backend, integrations and quality expectations.', 'The right question is not only how much it costs, but which first version can validate the business opportunity without wasting budget.', 'A clear MVP scope helps reduce risk and accelerate launch.'],
    offer: ['Feature-based estimate', 'MVP and V1 prioritization', 'Identification of expensive features', 'Phased development roadmap'],
    sections: [
      { heading: 'What impacts the cost', body: ['The main cost drivers are authentication, database, payments, geolocation, notifications, messaging, admin dashboard, integrations, security and testing.', 'Design, performance and maintainability should also be planned from the start.'] },
      { heading: 'MVP or complete product', body: ['An MVP focuses on proving the core value. A complete product adds more workflows, automation and robustness.', 'The goal is to avoid overbuilding before validating the market.'] },
      { heading: 'How to reduce cost without reducing quality', body: ['Prioritize the features that demonstrate value: onboarding, main workflow, payment, booking or dashboard.', 'Secondary features can be added after real user feedback.'] },
    ],
    benefits: ['Clearer budget', 'Better scope control', 'Lower product risk', 'Faster decision-making'],
    process: ['Idea analysis', 'Feature list', 'MVP prioritization', 'Estimate', 'Phased roadmap'],
    faq: translateCommonFaq,
    cta: 'Get a personalized estimate',
  };
}

export const englishServicePages = servicePages.map(englishServiceFrom);
export const englishPricePages = pricePages.map(englishPriceFrom);

export function findEnglishSeoPage(collection: SeoPage[], slug: string) {
  return collection.find((page) => page.slug === slug);
}
