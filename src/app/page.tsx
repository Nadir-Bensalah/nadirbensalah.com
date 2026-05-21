'use client';

import React, { useState, useEffect } from 'react';

type Lang = 'fr' | 'en' | 'ar';

const skillDefinitions: Record<string, Record<Lang, string>> = {
  'React': { fr: 'Bibliothèque JavaScript pour construire des interfaces utilisateur interactives et réactives. Développée par Facebook, elle utilise un DOM virtuel pour des performances optimales.', en: 'JavaScript library for building interactive and reactive user interfaces. Developed by Facebook, it uses a virtual DOM for optimal performance.', ar: 'مكتبة JavaScript لبناء واجهات مستخدم تفاعلية ومتجاوبة. طورتها Facebook، تستخدم DOM افتراضي للأداء الأمثل.' },
  'React Native': { fr: 'Framework pour créer des applications mobiles natives iOS et Android avec JavaScript et React. Permet un développement cross-platform avec une seule codebase.', en: 'Framework for creating native iOS and Android mobile apps with JavaScript and React. Enables cross-platform development with a single codebase.', ar: 'إطار عمل لإنشاء تطبيقات جوال أصلية لنظامي iOS و Android باستخدام JavaScript و React. يتيح التطوير عبر المنصات بقاعدة كود واحدة.' },
  'Node.js': { fr: 'Environnement d\'exécution JavaScript côté serveur. Permet de créer des applications backend performantes, des APIs REST et des microservices.', en: 'Server-side JavaScript runtime environment. Enables building high-performance backend applications, REST APIs and microservices.', ar: 'بيئة تشغيل JavaScript من جانب الخادم. تمكن من بناء تطبيقات خلفية عالية الأداء وواجهات برمجية REST وخدمات مصغرة.' },
  'TypeScript': { fr: 'Superset de JavaScript qui ajoute le typage statique. Améliore la maintenabilité du code et réduit les bugs en production.', en: 'JavaScript superset that adds static typing. Improves code maintainability and reduces production bugs.', ar: 'مجموعة فائقة من JavaScript تضيف الكتابة الثابتة. تحسن قابلية صيانة الكود وتقلل الأخطاء في الإنتاج.' },
  'Next.js': { fr: 'Framework React pour le rendu côté serveur (SSR) et la génération de sites statiques (SSG). Optimisé pour le SEO et les performances.', en: 'React framework for server-side rendering (SSR) and static site generation (SSG). Optimized for SEO and performance.', ar: 'إطار عمل React للعرض من جانب الخادم (SSR) وتوليد المواقع الثابتة (SSG). محسّن لتحسين محركات البحث والأداء.' },
  'MongoDB': { fr: 'Base de données NoSQL orientée documents. Stocke les données au format JSON, idéale pour les applications modernes et scalables.', en: 'Document-oriented NoSQL database. Stores data in JSON format, ideal for modern and scalable applications.', ar: 'قاعدة بيانات NoSQL موجهة نحو المستندات. تخزن البيانات بتنسيق JSON، مثالية للتطبيقات الحديثة والقابلة للتطوير.' },
  'PostgreSQL': { fr: 'Système de gestion de base de données relationnelle open-source. Puissant, fiable et conforme aux standards SQL.', en: 'Open-source relational database management system. Powerful, reliable and SQL standards compliant.', ar: 'نظام إدارة قواعد بيانات علائقية مفتوح المصدر. قوي وموثوق ومتوافق مع معايير SQL.' },
  'Firebase': { fr: 'Plateforme de développement d\'applications mobiles et web de Google. Offre base de données temps réel, authentification, hébergement et plus.', en: 'Google\'s mobile and web application development platform. Offers real-time database, authentication, hosting and more.', ar: 'منصة Google لتطوير تطبيقات الجوال والويب. توفر قاعدة بيانات في الوقت الفعلي والمصادقة والاستضافة والمزيد.' },
  'Supabase': { fr: 'Alternative open-source à Firebase. Base de données PostgreSQL avec authentification, stockage et APIs temps réel intégrés.', en: 'Open-source alternative to Firebase. PostgreSQL database with built-in authentication, storage and real-time APIs.', ar: 'بديل مفتوح المصدر لـ Firebase. قاعدة بيانات PostgreSQL مع مصادقة مدمجة وتخزين وواجهات برمجية في الوقت الفعلي.' },
  'Git': { fr: 'Système de contrôle de version distribué. Permet de suivre les modifications du code et de collaborer efficacement en équipe.', en: 'Distributed version control system. Tracks code changes and enables efficient team collaboration.', ar: 'نظام التحكم في الإصدارات الموزع. يتتبع تغييرات الكود ويتيح التعاون الفعال للفريق.' },
  'Docker': { fr: 'Plateforme de conteneurisation. Permet d\'empaqueter des applications avec toutes leurs dépendances pour un déploiement cohérent.', en: 'Containerization platform. Packages applications with all dependencies for consistent deployment.', ar: 'منصة الحاويات. تحزم التطبيقات مع جميع التبعيات للنشر المتسق.' },
  'Tailwind': { fr: 'Framework CSS utility-first. Permet de créer des interfaces modernes rapidement avec des classes utilitaires.', en: 'Utility-first CSS framework. Enables rapid modern interface creation with utility classes.', ar: 'إطار عمل CSS يعتمد على الأدوات المساعدة. يتيح إنشاء واجهات حديثة بسرعة باستخدام فئات الأدوات المساعدة.' },
  'WordPress': { fr: 'CMS le plus populaire au monde. Permet de créer des sites web et blogs avec une interface d\'administration intuitive.', en: 'World\'s most popular CMS. Creates websites and blogs with an intuitive admin interface.', ar: 'نظام إدارة المحتوى الأكثر شعبية في العالم. ينشئ مواقع الويب والمدونات بواجهة إدارة بديهية.' },
  'Figma': { fr: 'Outil de design d\'interface collaboratif en ligne. Permet de créer des maquettes, prototypes et systèmes de design.', en: 'Collaborative online interface design tool. Creates mockups, prototypes and design systems.', ar: 'أداة تصميم واجهة تعاونية عبر الإنترنت. تنشئ نماذج بالحجم الطبيعي ونماذج أولية وأنظمة تصميم.' },
  'REST API': { fr: 'Architecture pour créer des services web. Utilise HTTP pour la communication entre client et serveur de manière standardisée.', en: 'Architecture for creating web services. Uses HTTP for standardized client-server communication.', ar: 'هندسة معمارية لإنشاء خدمات الويب. تستخدم HTTP للاتصال الموحد بين العميل والخادم.' },
  'GraphQL': { fr: 'Langage de requête pour APIs. Permet aux clients de demander exactement les données dont ils ont besoin, rien de plus.', en: 'Query language for APIs. Lets clients request exactly the data they need, nothing more.', ar: 'لغة استعلام لواجهات برمجة التطبيقات. تتيح للعملاء طلب البيانات التي يحتاجونها بالضبط، لا أكثر.' },
};

const translations: Record<Lang, {
  title: string; disponibilite: string; disponibiliteLabel: string;
  profil: string; profilBold: string[]; openToWork: string;
  sectionProfil: string; sectionExp: string; sectionReal: string;
  sectionForm: string; sectionPortfolio: string; siteLabel: string;
  sectionComp: string; sectionAtouts: string;
  contactSectionTitle: string; contactSectionDesc: string; contactBtn: string;
  experiences: { title: string; company: string; date: string; bullets: string[] }[];
  realisations: { title: string; stack: string[]; desc: string; accent: 'blue' | 'teal' | 'purple' }[];
  formations: { degree: string; school: string; year: string; desc: string }[];
  competences: { label: string; tags: string[]; color: 'blue' | 'teal' | 'purple' | 'gray' }[];
  atouts: string[];
}> = {
  fr: {
    title: 'Développeur Full Stack Web & Mobile',
    disponibilite: 'Immédiate', disponibiliteLabel: 'Disponibilité',
    openToWork: 'Contacter', siteLabel: 'Site & projets',
    sectionProfil: 'Profil', sectionExp: 'Expériences', sectionReal: 'Réalisations',
    sectionForm: 'Formations', sectionPortfolio: 'Portfolio',
    sectionComp: 'Compétences', sectionAtouts: 'Atouts',
    contactSectionTitle: 'Intéressé par mon profil ?',
    contactSectionDesc: 'N\'hésitez pas à me contacter pour discuter de votre projet. Je suis disponible pour des missions en freelance, CDI ou CDD.',
    contactBtn: 'Me contacter',
    profil: "Développeur Full Stack spécialisé React, React Native & Node.js, je conçois des applications web et mobiles orientées produit - de l'architecture backend à l'expérience utilisateur. Autonome sur l'ensemble du cycle de vie d'un projet : conception, développement, déploiement et maintenance. Disponible en CDI, CDD ou mission freelance.",
    profilBold: ['React, React Native & Node.js', 'CDI, CDD ou mission freelance'],
    experiences: [
      { title: 'Développeur Full Stack Web & Mobile', company: 'Auto-entrepreneur · Freelance', date: "Juil. 2024 - Aujourd'hui", bullets: ["Conception et livraison d'applications web et mobiles cross-platform pour des clients directs", "Développement de solutions SaaS, e-commerce et dashboards administratifs de A à Z", "Création d'APIs REST robustes avec Node.js et Express, intégrées à des frontends React", 'Gestion complète des projets : architecture, UX/UI, intégration, déploiement et maintenance'] },
      { title: "Concepteur Développeur d'Applications Mobiles", company: 'Decayeux · Abbeville', date: 'Sept. 2022 - Oct. 2024', bullets: ['Développement d\'applications mobiles React Native en environnement industriel connecté', "Contribution active aux interfaces utilisateur et aux projets frontend en production", "Optimisation des performances backend et intégration d'APIs tierces", 'Collaboration étroite avec les équipes produit et techniques en mode agile'] },
    ],
    realisations: [
      { title: 'SaaS Dashboard Admin', stack: ['React', 'Node.js', 'MongoDB'], desc: 'Plateforme de gestion multi-tenant avec authentification, rôles utilisateurs et tableaux de bord analytiques en temps réel.', accent: 'blue' },
      { title: 'App Mobile E-commerce', stack: ['React Native', 'Firebase', 'Stripe'], desc: 'Application shopping cross-platform iOS/Android avec paiement intégré, notifications push et catalogue dynamique.', accent: 'teal' },
      { title: 'API REST Microservices', stack: ['Node.js', 'Express', 'PostgreSQL'], desc: 'Architecture API modulaire pour une plateforme B2B, documentation Swagger, tests unitaires et déploiement Docker.', accent: 'purple' },
    ],
    formations: [
      { degree: 'Concepteur Développeur Full Stack Web & Mobile', school: 'La Manu · Amiens', year: '2021 - 2023', desc: 'React, React Native, Node.js, APIs REST, bases SQL & NoSQL, architecture Full Stack, méthodologies Agile.' },
      { degree: "Master MIAGE - Informatique Appliquée à la Gestion des Entreprises", school: 'UPJV · Amiens', year: '2013 - 2015', desc: "Développement logiciel, gestion des SI, conception d'outils numériques appliqués aux entreprises." },
    ],
    competences: [
      { label: 'Frontend', tags: ['React', 'React Native', 'TypeScript', 'JavaScript', 'HTML/CSS'], color: 'blue' },
      { label: 'Backend', tags: ['Node.js', 'Express', 'APIs REST'], color: 'teal' },
      { label: 'Bases de données', tags: ['MongoDB', 'PostgreSQL', 'Firebase', 'Supabase'], color: 'purple' },
      { label: 'Outils', tags: ['Git', 'Docker', 'VS Code', 'Figma', 'Notion'], color: 'gray' },
      { label: 'Méthodes', tags: ['Agile', 'Scrum', 'Architecture applicative', 'UX/UI'], color: 'gray' },
    ],
    atouts: ['Jury professionnel pour formations développeur · Amiens', 'Forte autonomie sur la gestion complète de projets techniques', 'Profil orienté produit & expérience utilisateur', 'Veille technologique active sur les stacks web & mobile'],
  },
  en: {
    title: 'Full Stack Web & Mobile Developer',
    disponibilite: 'Immediate', disponibiliteLabel: 'Availability',
    openToWork: 'Contact', siteLabel: 'Site & projects',
    sectionProfil: 'Profile', sectionExp: 'Experience', sectionReal: 'Projects',
    sectionForm: 'Education', sectionPortfolio: 'Portfolio',
    sectionComp: 'Skills', sectionAtouts: 'Strengths',
    contactSectionTitle: 'Interested in my profile?',
    contactSectionDesc: 'Feel free to contact me to discuss your project. I am available for freelance missions, permanent or fixed-term contracts.',
    contactBtn: 'Contact me',
    profil: "Full Stack Developer specializing in React, React Native & Node.js - I build product-focused web and mobile applications, from backend architecture to user experience. Fully autonomous across the entire project lifecycle: design, development, deployment and maintenance. Available for permanent, fixed-term or freelance contracts.",
    profilBold: ['React, React Native & Node.js', 'permanent, fixed-term or freelance'],
    experiences: [
      { title: 'Full Stack Web & Mobile Developer', company: 'Self-employed · Freelance', date: 'Jul. 2024 - Present', bullets: ['Design and delivery of cross-platform web and mobile applications for direct clients', 'Development of SaaS solutions, e-commerce platforms and admin dashboards end-to-end', 'Building robust REST APIs with Node.js and Express, integrated with React frontends', 'Full project management: architecture, UX/UI, integration, deployment and maintenance'] },
      { title: 'Mobile Application Developer', company: 'Decayeux · Abbeville', date: 'Sept. 2022 - Oct. 2024', bullets: ['React Native mobile app development in a connected industrial environment', 'Active contribution to user interfaces and frontend projects in production', 'Backend performance optimization and third-party API integration', 'Close collaboration with product and technical teams in agile mode'] },
    ],
    realisations: [
      { title: 'SaaS Admin Dashboard', stack: ['React', 'Node.js', 'MongoDB'], desc: 'Multi-tenant management platform with authentication, user roles and real-time analytics dashboards.', accent: 'blue' },
      { title: 'Mobile E-commerce App', stack: ['React Native', 'Firebase', 'Stripe'], desc: 'Cross-platform iOS/Android shopping app with integrated payments, push notifications and dynamic catalog.', accent: 'teal' },
      { title: 'REST Microservices API', stack: ['Node.js', 'Express', 'PostgreSQL'], desc: 'Modular API architecture for a B2B platform, Swagger documentation, unit tests and Docker deployment.', accent: 'purple' },
    ],
    formations: [
      { degree: 'Full Stack Web & Mobile Application Developer', school: 'La Manu · Amiens', year: '2021 - 2023', desc: 'React, React Native, Node.js, REST APIs, SQL & NoSQL databases, Full Stack architecture, Agile methodologies.' },
      { degree: 'Master MIAGE - Computer Science Applied to Business Management', school: 'UPJV · Amiens', year: '2013 - 2015', desc: 'Software development, information systems management, design of digital tools for enterprises.' },
    ],
    competences: [
      { label: 'Frontend', tags: ['React', 'React Native', 'TypeScript', 'JavaScript', 'HTML/CSS'], color: 'blue' },
      { label: 'Backend', tags: ['Node.js', 'Express', 'REST APIs'], color: 'teal' },
      { label: 'Databases', tags: ['MongoDB', 'PostgreSQL', 'Firebase', 'Supabase'], color: 'purple' },
      { label: 'Tools', tags: ['Git', 'Docker', 'VS Code', 'Figma', 'Notion'], color: 'gray' },
      { label: 'Methods', tags: ['Agile', 'Scrum', 'App Architecture', 'UX/UI'], color: 'gray' },
    ],
    atouts: ['Professional jury for developer training programs · Amiens', 'Strong autonomy in full technical project management', 'Product-oriented profile focused on user experience', 'Active tech watch on web & mobile stacks'],
  },
  ar: {
    title: 'مطوّر Full Stack ويب وموبايل',
    disponibilite: 'فوري', disponibiliteLabel: 'التوفر',
    openToWork: 'اتصل', siteLabel: 'الموقع والمشاريع',
    sectionProfil: 'الملف الشخصي', sectionExp: 'الخبرات', sectionReal: 'المشاريع',
    sectionForm: 'التعليم', sectionPortfolio: 'المحفظة',
    sectionComp: 'المهارات', sectionAtouts: 'المزايا',
    contactSectionTitle: 'مهتم بملفي الشخصي؟',
    contactSectionDesc: 'لا تتردد في الاتصال بي لمناقشة مشروعك. أنا متاح لمهام العمل الحر والعقود الدائمة أو محددة المدة.',
    contactBtn: 'اتصل بي',
    profil: "مطوّر Full Stack متخصص في React وReact Native وNode.js - أبني تطبيقات ويب وموبايل موجهة نحو المنتج، من بنية الخادم إلى تجربة المستخدم. مستقل تمامًا في دورة حياة المشروع الكاملة: التصميم والتطوير والنشر والصيانة. متاح للعمل الدائم أو المؤقت أو كمستقل.",
    profilBold: ['React وReact Native وNode.js', 'دائم أو مؤقت أو كمستقل'],
    experiences: [
      { title: 'مطوّر Full Stack ويب وموبايل', company: 'مستقل · Freelance', date: 'يوليو 2024 - الآن', bullets: ['تصميم وتسليم تطبيقات ويب وموبايل متعددة المنصات لعملاء مباشرين', 'تطوير حلول SaaS ومنصات تجارة إلكترونية ولوحات إدارة من الألف إلى الياء', 'بناء APIs REST قوية مع Node.js وExpress مدمجة مع واجهات React', 'إدارة كاملة للمشاريع: الهندسة، UX/UI، التكامل، النشر والصيانة'] },
      { title: 'مطوّر تطبيقات موبايل', company: 'Decayeux · Abbeville', date: 'سبت. 2022 - أكت. 2024', bullets: ['تطوير تطبيقات موبايل بـ React Native في بيئة صناعية متصلة', 'مساهمة فعّالة في واجهات المستخدم والمشاريع الأمامية في الإنتاج', 'تحسين أداء الخادم وتكامل APIs الخارجية', 'تعاون وثيق مع فرق المنتج والتقنية بأسلوب Agile'] },
    ],
    realisations: [
      { title: 'لوحة إدارة SaaS', stack: ['React', 'Node.js', 'MongoDB'], desc: 'منصة إدارة متعددة المستأجرين مع المصادقة وأدوار المستخدمين ولوحات تحليلات في الوقت الفعلي.', accent: 'blue' },
      { title: 'تطبيق موبايل للتجارة الإلكترونية', stack: ['React Native', 'Firebase', 'Stripe'], desc: 'تطبيق تسوق متعدد المنصات iOS/Android مع دفع مدمج وإشعارات فورية وكتالوج ديناميكي.', accent: 'teal' },
      { title: 'API REST للخدمات المصغّرة', stack: ['Node.js', 'Express', 'PostgreSQL'], desc: 'بنية API معيارية لمنصة B2B، توثيق Swagger، اختبارات وحدة ونشر عبر Docker.', accent: 'purple' },
    ],
    formations: [
      { degree: 'مطوّر تطبيقات Full Stack ويب وموبايل', school: 'La Manu · Amiens', year: '2021 - 2023', desc: 'React، React Native، Node.js، REST APIs، قواعد بيانات SQL وNoSQL، هندسة Full Stack، منهجيات Agile.' },
      { degree: 'ماجستير MIAGE - علوم الحاسوب التطبيقية لإدارة الأعمال', school: 'UPJV · Amiens', year: '2013 - 2015', desc: 'تطوير البرمجيات، إدارة أنظمة المعلومات، تصميم أدوات رقمية للمؤسسات.' },
    ],
    competences: [
      { label: 'الواجهة الأمامية', tags: ['React', 'React Native', 'TypeScript', 'JavaScript', 'HTML/CSS'], color: 'blue' },
      { label: 'الخادم', tags: ['Node.js', 'Express', 'REST APIs'], color: 'teal' },
      { label: 'قواعد البيانات', tags: ['MongoDB', 'PostgreSQL', 'Firebase', 'Supabase'], color: 'purple' },
      { label: 'الأدوات', tags: ['Git', 'Docker', 'VS Code', 'Figma', 'Notion'], color: 'gray' },
      { label: 'المنهجيات', tags: ['Agile', 'Scrum', 'هندسة التطبيقات', 'UX/UI'], color: 'gray' },
    ],
    atouts: ['لجنة تحكيم مهنية لدورات تدريب المطورين · Amiens', 'استقلالية عالية في إدارة المشاريع التقنية الكاملة', 'ملف شخصي موجه نحو المنتج وتجربة المستخدم', 'متابعة تقنية نشطة لمنظومتَي الويب والموبايل'],
  },
};

const tagColors = {
  blue:   { bg: 'rgba(0,153,255,0.1)',   color: '#5bb8ff', border: 'rgba(0,153,255,0.2)' },
  teal:   { bg: 'rgba(0,212,170,0.08)',  color: '#2dd4a4', border: 'rgba(0,212,170,0.18)' },
  purple: { bg: 'rgba(124,58,237,0.1)',  color: '#a78bfa', border: 'rgba(124,58,237,0.22)' },
  gray:   { bg: 'rgba(255,255,255,0.04)', color: '#8892a4', border: '#1e2330' },
};

const accentColors = {
  blue:   { border: 'rgba(0,153,255,0.3)',  dot: '#0099ff', bg: 'rgba(0,153,255,0.06)' },
  teal:   { border: 'rgba(0,212,170,0.3)',  dot: '#00d4aa', bg: 'rgba(0,212,170,0.06)' },
  purple: { border: 'rgba(124,58,237,0.3)', dot: '#7c3aed', bg: 'rgba(124,58,237,0.06)' },
};

type ThemeColors = typeof themes.dark;

function Tag({ label, color = 'gray', th, onClick }: { label: string; color?: keyof typeof tagColors; th: ThemeColors; onClick?: () => void }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const hasDefinition = skillDefinitions[label];
  const baseC = tagColors[color] || tagColors.gray;
  const c = color === 'gray'
    ? { bg: th.tagGrayBg, color: th.tagGrayColor, border: th.tagGrayBorder }
    : baseC;
  return (
    <span 
      className="skill-tag"
      onMouseEnter={() => hasDefinition && setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={() => hasDefinition && onClick && onClick()}
      style={{
        fontSize: 12.5, padding: '4px 10px', borderRadius: 3, fontWeight: 400,
        background: c.bg, color: c.color, border: `1px solid ${c.border}`,
        display: 'inline-block', position: 'relative' as const,
        cursor: hasDefinition ? 'pointer' : 'default',
        transition: 'all 0.2s',
      }}>
      {label}
      {showTooltip && hasDefinition && (
        <span style={{
          position: 'absolute' as const, bottom: '100%', left: '50%', transform: 'translateX(-50%)',
          marginBottom: 8, padding: '6px 12px', background: th.floatBg, 
          border: `1px solid ${th.floatBorder}`, borderRadius: 6,
          fontSize: 10, color: th.floatText, whiteSpace: 'nowrap' as const,
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)', zIndex: 1000,
          pointerEvents: 'none' as const
        }}>
          En savoir plus
        </span>
      )}
    </span>
  );
}

const contact = {
  phone: '+33 6 10 35 42 59',
  email: 'contact@nadirbensalah.com',
  linkedin: 'linkedin.com/in/nadir-ben-salah',
  site: 'nadirbensalah.com',
};

const name = 'Nadir Ben Salah';

type Theme = 'dark' | 'light';

const themes = {
  dark: {
    pageOuter: '#0d0f14', pageInner: '#111318', pageBorder: '#1e2330',
    headerBg: '#0d0f14', headerBorder: '#1e2330',
    mainBorder: '#1a1e2a', sidebarBg: '#0d0f14',
    h1: '#f0f4ff', h2: '#00d4aa',
    contactColor: '#8892a4',
    profilText: '#a0aec0', profilBold: '#e2e8f0',
    expTitle: '#e2e8f0', expDate: '#4a5568', expCompany: '#00d4aa',
    bulletColor: '#7a8599',
    divider: '#1a1e2a',
    eduDeg: '#e2e8f0', eduSchool: '#00d4aa', eduYear: '#4a5568', eduDesc: '#606880',
    openWorkBg: 'rgba(0,212,170,0.06)', openWorkBorder: 'rgba(0,212,170,0.2)', openWorkText: '#00d4aa',
    portfolioBg: 'rgba(0,153,255,0.06)', portfolioBorder: 'rgba(0,153,255,0.2)',
    portfolioLabel: '#4a5568', portfolioLink: '#0099ff',
    compLabel: '#4a5568',
    atoutText: '#8892a4',
    badgeBg: 'rgba(0,212,170,0.08)', badgeBorder: 'rgba(0,212,170,0.25)',
    badgeLabel: '#4a5568', badgeValue: '#00d4aa',
    sectionMainColor: '#0099ff', sectionMainBorder: '#1a2040',
    sectionSideColor: '#7c3aed', sectionSideBorder: '#1a1440',
    tagGrayBg: 'rgba(255,255,255,0.04)', tagGrayColor: '#8892a4', tagGrayBorder: '#1e2330',
    floatBg: '#1a1e2a', floatBorder: '#2a2e3a', floatText: '#e2e8f0',
    floatActiveBg: '#0099ff', floatActiveText: '#fff',
  },
  light: {
    pageOuter: '#f0f2f5', pageInner: '#ffffff', pageBorder: '#d8dde8',
    headerBg: '#f8f9fc', headerBorder: '#e2e6f0',
    mainBorder: '#e2e6f0', sidebarBg: '#f4f6fb',
    h1: '#1a2035', h2: '#0077cc',
    contactColor: '#5a6478',
    profilText: '#4a5568', profilBold: '#1a2035',
    expTitle: '#1a2035', expDate: '#8896aa', expCompany: '#0077cc',
    bulletColor: '#4a5568',
    divider: '#e2e6f0',
    eduDeg: '#1a2035', eduSchool: '#0077cc', eduYear: '#8896aa', eduDesc: '#6b7789',
    openWorkBg: 'rgba(0,180,140,0.07)', openWorkBorder: 'rgba(0,180,140,0.25)', openWorkText: '#00967a',
    portfolioBg: 'rgba(0,100,220,0.05)', portfolioBorder: 'rgba(0,100,220,0.18)',
    portfolioLabel: '#8896aa', portfolioLink: '#0055cc',
    compLabel: '#8896aa',
    atoutText: '#5a6478',
    badgeBg: 'rgba(0,180,140,0.07)', badgeBorder: 'rgba(0,180,140,0.25)',
    badgeLabel: '#8896aa', badgeValue: '#00967a',
    sectionMainColor: '#0055cc', sectionMainBorder: '#ccd5e8',
    sectionSideColor: '#6d28d9', sectionSideBorder: '#d8cef0',
    tagGrayBg: 'rgba(0,0,0,0.04)', tagGrayColor: '#5a6478', tagGrayBorder: '#d4d9e8',
    floatBg: '#ffffff', floatBorder: '#d0d6e8', floatText: '#1a2035',
    floatActiveBg: '#0055cc', floatActiveText: '#fff',
  },
};

type RealisationItem = { title: string; stack: string[]; desc: string; accent: 'blue' | 'teal' | 'purple' };

function RealisationCard({ item, th }: { item: RealisationItem; th: typeof themes.dark }) {
  const ac = accentColors[item.accent];
  return (
    <div style={{ 
      background: ac.bg, 
      border: `1px solid ${ac.border}`, 
      borderRadius: 8, 
      padding: 24, 
      transition: 'all 0.2s',
      cursor: 'pointer',
      position: 'relative' as const,
      overflow: 'hidden',
      aspectRatio: '1/1',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      <div style={{ position: 'absolute', top: 0, right: 0, width: 60, height: 60, background: `linear-gradient(135deg, ${ac.dot}20, transparent)`, borderRadius: '0 0 0 100%' }} />
      <div>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: ac.dot, marginBottom: 16 }} />
        <h3 style={{ fontSize: 17, fontWeight: 600, color: th.expTitle, lineHeight: 1.3, marginBottom: 12 }}>{item.title}</h3>
        <p style={{ fontSize: 13, color: th.bulletColor, lineHeight: 1.6, opacity: 0.85 }}>{item.desc}</p>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 6, marginTop: 16 }}>
        {item.stack.map((s: string) => <Tag key={s} label={s} color={item.accent} th={th} />)}
      </div>
    </div>
  );
}

type ToastItem = { id: number; message: string };

export default function HomePage() {
  const [lang, setLang] = useState<Lang>('fr');
  const [theme, setTheme] = useState<Theme>('dark');
  const [langOpen, setLangOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [modalSkill, setModalSkill] = useState<string | null>(null);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const toastIdRef = React.useRef(0);

  useEffect(() => {
    const nav = navigator.language || 'fr';
    if (nav.startsWith('ar')) setLang('ar');
    else if (nav.startsWith('en')) setLang('en');
    else setLang('fr');
  }, []);

  const showToast = (message: string) => {
    const id = toastIdRef.current++;
    setToasts(prev => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 2500);
  };

  const handleLangChange = (newLang: Lang) => {
    setLang(newLang);
    setLangOpen(false);
    const msgs = { fr: 'Langue changée en Français', en: 'Language changed to English', ar: 'تم تغيير اللغة إلى العربية' };
    showToast(msgs[newLang]);
  };

  const handleThemeToggle = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    const msgs = { dark: { fr: 'Mode sombre activé', en: 'Dark mode enabled', ar: 'تم تفعيل الوضع الداكن' }, light: { fr: 'Mode clair activé', en: 'Light mode enabled', ar: 'تم تفعيل الوضع الفاتح' } };
    showToast(msgs[newTheme][lang]);
  };

  const t = translations[lang];
  const th = themes[theme];
  const isRtl = lang === 'ar';
  const dir = isRtl ? 'rtl' : 'ltr';

  const SectionTitleComp = ({ children, side = false }: { children: React.ReactNode; side?: boolean }) => (
    <div style={{
      fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700, letterSpacing: 2.5,
      textTransform: 'uppercase' as const,
      color: side ? th.sectionSideColor : th.sectionMainColor,
      marginBottom: 16, paddingBottom: 8,
      borderBottom: `1px solid ${side ? th.sectionSideBorder : th.sectionMainBorder}`,
      display: 'flex', alignItems: 'center', gap: 8,
      flexDirection: isRtl ? 'row-reverse' : 'row',
    }}>
      <span style={{ display: 'inline-block', width: 12, height: 2, background: side ? th.sectionSideColor : th.sectionMainColor, flexShrink: 0 }} />
      {children}
    </div>
  );

  const langLabels: Record<Lang, string> = { fr: '🇫🇷 FR', en: '🇬🇧 EN', ar: '🇸🇦 AR' };
  const langFull: Record<Lang, string> = { fr: '🇫🇷 Français', en: '🇬🇧 English', ar: '🇸🇦 العربية' };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=DM+Sans:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { font-size: 16px; }
        body { background: ${th.pageOuter} !important; transition: background 0.2s; }
        a { text-decoration: none; transition: color 0.15s; }
        a:hover { color: #00d4aa !important; }
        .cv-bullet::before { content: '›'; position: absolute; ${isRtl ? 'right: 0; left: auto;' : 'left: 0;'} color: #0099ff; font-size: 16px; line-height: 1.5; }
        .fab-btn { cursor: pointer; border: none; transition: all 0.18s; outline: none; }
        .fab-btn:hover { transform: scale(1.07); }
        .fab-btn:active { transform: scale(0.98); }
        .lang-drop { position: absolute; top: calc(100% + 8px); right: 0; background: ${th.floatBg}; border: 1px solid ${th.floatBorder}; border-radius: 8px; overflow: hidden; min-width: 130px; box-shadow: 0 8px 24px rgba(0,0,0,0.18); z-index: 200; }
        .lang-opt { padding: 10px 16px; font-size: 13px; cursor: pointer; color: ${th.floatText}; transition: background 0.12s; border-bottom: 1px solid ${th.floatBorder}; }
        .lang-opt:last-child { border-bottom: none; }
        .lang-opt:hover { background: rgba(0,153,255,0.12); color: #0099ff; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        .skill-tag:hover { transform: translateY(-2px); box-shadow: 0 4px 8px rgba(0,0,0,0.15); }
        /* ── Tablet ── */
        @media (max-width: 900px) {
          .cv-body { grid-template-columns: 1fr 240px !important; }
        }
        /* ── Mobile ── */
        @media (max-width: 680px) {
          .cv-wrap  { padding: 0 !important; }
          .cv-page  { border-radius: 0 !important; border-left: none !important; border-right: none !important; }
          .cv-header { grid-template-columns: 1fr !important; gap: 16px !important; padding: 28px 18px 22px !important; }
          .cv-header-badge { display: inline-flex !important; align-self: flex-start !important; }
          .cv-body   { grid-template-columns: 1fr !important; }
          .cv-main   { border-right: none !important; border-bottom: 1px solid ${th.divider} !important; padding: 26px 18px !important; }
          .cv-sidebar { padding: 26px 18px 32px !important; }
          .cv-h1 { font-size: 22px !important; }
          .cv-h2 { font-size: 11px !important; letter-spacing: 2px !important; }
          .cv-contact-row { gap: 6px 12px !important; }
          .cv-contact-item { font-size: 12px !important; }
          .fab-wrap { top: 12px !important; right: 12px !important; gap: 6px !important; }
          .fab-btn  { width: 36px !important; height: 36px !important; padding: 0 10px !important; }
          .fab-lang-label { display: none !important; }
          .fab-btn svg { width: 16px !important; height: 16px !important; }
        }
        @media (max-width: 400px) {
          .cv-main { padding: 18px 12px !important; }
          .cv-sidebar { padding: 18px 12px 28px !important; }
          .cv-h1 { font-size: 19px !important; }
        }
        @media print {
          body { background: white !important; }
          .fab-wrap { display: none !important; }
          .cv-page { border: none !important; border-radius: 0 !important; }
        }
        @keyframes toastSlide {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .toast-enter { animation: toastSlide 0.3s ease-out; }
        .toast-wrap { position: fixed; bottom: 24px; right: 24px; z-index: 200; pointer-events: none; }
        .toast-wrap > * { pointer-events: auto; }
        @media (max-width: 680px) {
          .toast-wrap { bottom: 16px; left: 50%; right: auto; transform: translateX(-50%); align-items: center !important; }
        }
      `}</style>

      <div className="cv-wrap" dir={dir} style={{ background: th.pageOuter, color: th.expTitle, fontFamily: isRtl ? "'DM Sans', 'Segoe UI', Tahoma, sans-serif" : "'DM Sans', 'Segoe UI', sans-serif", fontSize: 15, lineHeight: 1.7, minHeight: '100vh', padding: '40px 20px', transition: 'background 0.2s, color 0.2s', position: 'relative' }}>

        <div className="cv-page" style={{ maxWidth: 1100, margin: '0 auto', background: th.pageInner, border: `1px solid ${th.pageBorder}`, borderRadius: 4, overflow: 'hidden', transition: 'background 0.2s, border-color 0.2s' }}>

          {/* Accent bar */}
          <div style={{ height: 3, background: 'linear-gradient(90deg, #00d4aa 0%, #0099ff 50%, #7c3aed 100%)' }} />

          {/* HEADER */}
          <div className="cv-header" style={{ padding: '44px 56px 36px', background: th.headerBg, display: 'grid', gridTemplateColumns: '1fr auto', gap: 28, alignItems: 'start', borderBottom: `1px solid ${th.headerBorder}`, transition: 'background 0.2s' }}>
            <div>
              <h1 className="cv-h1" style={{ fontFamily: "'Space Mono', monospace", fontSize: 34, fontWeight: 700, color: th.h1, letterSpacing: -0.5, lineHeight: 1.1, marginBottom: 8 }}>
                {name}
              </h1>
              <h2 className="cv-h2" style={{ fontSize: 13, fontWeight: 500, color: th.h2, letterSpacing: 2.5, textTransform: 'uppercase', marginBottom: 20 }}>
                {t.title}
              </h2>
              <div className="cv-contact-row" style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '8px 20px' }}>
                {[
                  { label: contact.phone, icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00d4aa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg> },
                  { label: contact.email, href: `mailto:${contact.email}`, icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00d4aa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> },
                  { label: contact.linkedin, href: `https://${contact.linkedin}`, icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00d4aa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg> },
                ].map((c, i) => (
                  <span key={i} className="cv-contact-item" style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13.5, color: th.contactColor }}>
                    {c.icon}
                    {c.href ? <a href={c.href} style={{ color: th.contactColor }}>{c.label}</a> : c.label}
                  </span>
                ))}
              </div>
            </div>
            <div className="cv-header-badge" style={{ 
              width: 140, height: 140, borderRadius: '50%', 
              background: `linear-gradient(135deg, ${th.badgeBg}, ${th.badgeBg}dd)`,
              border: `3px dashed ${th.badgeBorder}`, 
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              transform: 'rotate(-12deg)', boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              position: 'relative' as const
            }}>
              <div style={{ transform: 'rotate(12deg)', textAlign: 'center' as const }}>
                <span style={{ fontSize: 10, letterSpacing: 1.8, textTransform: 'uppercase' as const, color: th.badgeLabel, display: 'block', marginBottom: 6, fontWeight: 600 }}>{t.disponibiliteLabel}</span>
                <span style={{ fontSize: 15, fontWeight: 700, color: th.badgeValue, letterSpacing: 0.5 }}>{t.disponibilite}</span>
              </div>
            </div>
          </div>

          {/* BODY */}
          <div className="cv-body" style={{ display: 'grid', gridTemplateColumns: '1fr 300px' }}>

            {/* MAIN */}
            <div className="cv-main" style={{ padding: '36px 44px 48px 56px', borderRight: `1px solid ${th.mainBorder}` }}>

              {/* PROFIL */}
              <div style={{ marginBottom: 32 }}>
                <SectionTitleComp>{t.sectionProfil}</SectionTitleComp>
                <p style={{ fontSize: 15, color: th.profilText, lineHeight: 1.85 }}>
                  {t.profil.split(new RegExp(`(${t.profilBold.map(b => b.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`)).map((part: string, i: number) =>
                    t.profilBold.includes(part)
                      ? <strong key={i} style={{ color: th.profilBold, fontWeight: 500 }}>{part}</strong>
                      : part
                  )}
                </p>
              </div>

              {/* EXPÉRIENCES */}
              <div style={{ marginBottom: 32 }}>
                <SectionTitleComp>{t.sectionExp}</SectionTitleComp>
                {t.experiences.map((exp, i) => (
                  <div key={i}>
                    <div style={{ marginBottom: 24 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'flex-start', marginBottom: 2, flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                        <div style={{ fontSize: 16, fontWeight: 600, color: th.expTitle, lineHeight: 1.3 }}>{exp.title}</div>
                        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11.5, color: th.expDate, whiteSpace: 'nowrap' as const, paddingTop: 2, flexShrink: 0 }}>{exp.date}</div>
                      </div>
                      <div style={{ fontSize: 13.5, color: th.expCompany, marginBottom: 12, fontWeight: 500 }}>{exp.company}</div>
                      <ul style={{ listStyle: 'none' }}>
                        {exp.bullets.map((b, j) => (
                          <li key={j} className="cv-bullet" style={{ fontSize: 14, color: th.bulletColor, paddingLeft: isRtl ? 0 : 16, paddingRight: isRtl ? 16 : 0, position: 'relative' as const, lineHeight: 1.65, marginBottom: 6 }}>
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {i < t.experiences.length - 1 && <div style={{ height: 1, background: th.divider, margin: '20px 0' }} />}
                  </div>
                ))}
              </div>

              {/* RÉALISATIONS - CACHÉE POUR LE MOMENT */}
              {false && (
                <div style={{ marginBottom: 32 }}>
                  <SectionTitleComp>{t.sectionReal}</SectionTitleComp>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
                    {t.realisations.map((r, i) => <RealisationCard key={i} item={r} th={th} />)}
                  </div>
                </div>
              )}

              {/* FORMATIONS */}
              <div style={{ marginBottom: 0 }}>
                <SectionTitleComp>{t.sectionForm}</SectionTitleComp>
                {t.formations.map((f, i) => (
                  <div key={i}>
                    <div style={{ marginBottom: 18 }}>
                      <div style={{ fontSize: 15, fontWeight: 600, color: th.eduDeg, marginBottom: 3, lineHeight: 1.4 }}>{f.degree}</div>
                      <div style={{ fontSize: 13.5, color: th.eduSchool, marginBottom: 4 }}>{f.school}</div>
                      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11.5, color: th.eduYear }}>{f.year}</div>
                      <div style={{ fontSize: 13, color: th.eduDesc, marginTop: 6, lineHeight: 1.65 }}>{f.desc}</div>
                    </div>
                    {i < t.formations.length - 1 && <div style={{ height: 1, background: th.divider, margin: '20px 0' }} />}
                  </div>
                ))}
              </div>
            </div>

            {/* SIDEBAR */}
            <div className="cv-sidebar" style={{ padding: '36px 32px 48px', background: th.sidebarBg, transition: 'background 0.2s' }}>
              <button onClick={() => setContactModalOpen(true)} style={{ 
                display: 'inline-flex', alignItems: 'center', gap: 10, 
                background: '#00d4aa', color: '#0d0f14', border: 'none',
                borderRadius: 999, padding: '12px 20px', marginBottom: 24,
                boxShadow: '0 4px 12px rgba(0, 212, 170, 0.3)',
                flexDirection: isRtl ? 'row-reverse' : 'row',
                cursor: 'pointer', transition: 'all 0.2s'
              }}>
                <div style={{ fontSize: 13.5, fontWeight: 600, letterSpacing: 0.3 }}>{t.openToWork}</div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </button>

              {/* PORTFOLIO */}
              <div style={{ marginBottom: 32 }}>
                <SectionTitleComp side>{t.sectionPortfolio}</SectionTitleComp>
                <div style={{ background: th.portfolioBg, border: `1px solid ${th.portfolioBorder}`, borderRadius: 4, padding: '12px 14px', marginTop: 12 }}>
                  <div style={{ fontSize: 11, textTransform: 'uppercase' as const, letterSpacing: 1.5, color: th.portfolioLabel, marginBottom: 5 }}>{t.siteLabel}</div>
                  <a href={`https://${contact.site}`} style={{ fontFamily: "'Space Mono', monospace", fontSize: 12.5, color: th.portfolioLink }}>{contact.site}</a>
                </div>
              </div>

              {/* COMPÉTENCES */}
              <div style={{ marginBottom: 32 }}>
                <SectionTitleComp side>{t.sectionComp}</SectionTitleComp>
                {t.competences.map((g, i) => (
                  <div key={i} style={{ marginBottom: 14 }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: th.compLabel, letterSpacing: 1, textTransform: 'uppercase' as const, marginBottom: 9 }}>{g.label}</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 5 }}>
                      {g.tags.map((tag: string) => <Tag key={tag} label={tag} color={g.color} th={th} onClick={() => setModalSkill(tag)} />)}
                    </div>
                  </div>
                ))}
              </div>

              {/* ATOUTS */}
              <div style={{ marginBottom: 0 }}>
                <SectionTitleComp side>{t.sectionAtouts}</SectionTitleComp>
                {t.atouts.map((a, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 11, fontSize: 13.5, color: th.atoutText, lineHeight: 1.6, flexDirection: isRtl ? 'row-reverse' : 'row' }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#7c3aed', flexShrink: 0, marginTop: 5 }} />
                    <div>{a}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION CONTACT */}
          <div style={{ 
            padding: '48px 56px', 
            borderTop: `1px solid ${th.mainBorder}`,
            background: `linear-gradient(135deg, ${th.sidebarBg}40, transparent)`
          }}>
            <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' as const }}>
              <h3 style={{ 
                fontSize: 28, fontWeight: 700, color: th.h1, 
                marginBottom: 16, fontFamily: "'Space Mono', monospace" 
              }}>
                {t.contactSectionTitle}
              </h3>
              <p style={{ fontSize: 15, color: th.profilText, lineHeight: 1.7, marginBottom: 32 }}>
                {t.contactSectionDesc}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 32 }}>
                {[
                  { 
                    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00d4aa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
                    label: 'Email', value: contact.email, href: `mailto:${contact.email}` 
                  },
                  { 
                    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00d4aa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
                    label: 'Téléphone', value: contact.phone, href: `tel:${contact.phone}` 
                  },
                  { 
                    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00d4aa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>,
                    label: 'LinkedIn', value: 'Profil LinkedIn', href: `https://${contact.linkedin}` 
                  },
                ].map((item, i) => (
                  <a key={i} href={item.href} style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
                    background: th.portfolioBg, border: `1px solid ${th.portfolioBorder}`,
                    borderRadius: 12, padding: '24px 16px',
                    transition: 'all 0.2s', cursor: 'pointer',
                    textDecoration: 'none', color: th.expTitle
                  }}>
                    <div>{item.icon}</div>
                    <div style={{ fontSize: 11, textTransform: 'uppercase' as const, letterSpacing: 1.5, color: th.compLabel, fontWeight: 600 }}>{item.label}</div>
                    <div style={{ fontSize: 13.5, color: th.contactColor, fontWeight: 500 }}>{item.value}</div>
                  </a>
                ))}
              </div>
              <a href={`mailto:${contact.email}`} style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                background: '#00d4aa', color: '#0d0f14', 
                padding: '14px 32px', borderRadius: 999,
                fontSize: 14, fontWeight: 600, textDecoration: 'none',
                transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(0, 212, 170, 0.3)'
              }}>
                {t.contactBtn}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </a>
            </div>
          </div>

          {/* FOOTER */}
          <div style={{ 
            padding: '24px 56px', 
            borderTop: `1px solid ${th.mainBorder}`,
            textAlign: 'center' as const,
            background: th.sidebarBg
          }}>
            <p style={{ fontSize: 13, color: th.compLabel, margin: 0 }}>
              © {new Date().getFullYear()} Nadir Ben Salah. Tous droits réservés.
            </p>
          </div>
        </div>

        {/* ── FLOATING BUTTONS ── */}
        <div className="fab-wrap" style={{ position: 'fixed', top: 24, right: 20, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10, zIndex: 100 }}>

          {/* Theme toggle */}
          <button className="fab-btn" onClick={(e) => { e.preventDefault(); handleThemeToggle(); }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 42, height: 42, borderRadius: '50%', background: th.floatBg, border: `1px solid ${th.floatBorder}`, color: th.floatText }}>
            {theme === 'dark' ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>

          {/* Lang picker */}
          <div style={{ position: 'relative' }}>
            {langOpen && (
              <div className="lang-drop">
                {(['fr', 'en', 'ar'] as Lang[]).map(l => (
                  <div key={l} className="lang-opt" style={{ fontWeight: lang === l ? 600 : 400, color: lang === l ? '#0099ff' : th.floatText }}
                    onClick={(e) => { e.preventDefault(); handleLangChange(l); }}>
                    {langFull[l]}
                  </div>
                ))}
              </div>
            )}
            <button className="fab-btn" onClick={(e) => { e.preventDefault(); setLangOpen(v => !v); }}
              style={{ display: 'flex', alignItems: 'center', gap: 8, width: 'auto', height: 42, padding: '0 14px', borderRadius: 21, background: th.floatBg, border: `1px solid ${th.floatBorder}`, color: th.floatText, fontSize: 13, fontWeight: 600, fontFamily: "'Space Mono', monospace" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
              <span className="fab-lang-label" style={{ fontSize: 13 }}>{langLabels[lang]}</span>
            </button>
          </div>
        </div>

        {/* ── TOAST NOTIFICATIONS ── */}
        <div className="toast-wrap" style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end' }}>
          {toasts.map((toast, index) => (
            <div key={toast.id} className="toast-enter" style={{
              background: th.floatBg, border: `1px solid ${th.floatBorder}`,
              borderRadius: 999, padding: '12px 24px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
              fontSize: 14, fontWeight: 500, color: th.floatText,
              display: 'flex', alignItems: 'center', gap: 10, whiteSpace: 'nowrap' as const,
              marginBottom: index < toasts.length - 1 ? 0 : undefined,
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00d4aa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              {toast.message}
            </div>
          ))}
        </div>

        {/* ── MODAL CONTACT ── */}
        {contactModalOpen && (
          <div onClick={() => setContactModalOpen(false)} style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 9999, padding: 20
          }}>
            <div onClick={(e) => e.stopPropagation()} style={{
              background: th.floatBg, border: `2px solid ${th.floatBorder}`,
              borderRadius: 16, padding: 32, maxWidth: 400, width: '100%',
              boxShadow: '0 20px 60px rgba(0,0,0,0.4)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: th.expTitle, fontFamily: "'Space Mono', monospace" }}>
                  {t.contactBtn}
                </h3>
                <button onClick={() => setContactModalOpen(false)} style={{
                  background: 'transparent', border: 'none', cursor: 'pointer',
                  color: th.floatText, fontSize: 28, padding: 0, lineHeight: 1
                }}>×</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <a href={`mailto:${contact.email}`} onClick={() => setContactModalOpen(false)} style={{
                  display: 'flex', alignItems: 'center', gap: 16,
                  background: th.portfolioBg, border: `1px solid ${th.portfolioBorder}`,
                  borderRadius: 12, padding: '20px 24px', textDecoration: 'none',
                  transition: 'all 0.2s', cursor: 'pointer'
                }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00d4aa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  <div>
                    <div style={{ fontSize: 11, textTransform: 'uppercase' as const, letterSpacing: 1.5, color: th.compLabel, fontWeight: 600, marginBottom: 4 }}>Email</div>
                    <div style={{ fontSize: 14, color: th.expTitle, fontWeight: 500 }}>{contact.email}</div>
                  </div>
                </a>
                <a href={`tel:${contact.phone}`} onClick={() => setContactModalOpen(false)} style={{
                  display: 'flex', alignItems: 'center', gap: 16,
                  background: th.portfolioBg, border: `1px solid ${th.portfolioBorder}`,
                  borderRadius: 12, padding: '20px 24px', textDecoration: 'none',
                  transition: 'all 0.2s', cursor: 'pointer'
                }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00d4aa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  <div>
                    <div style={{ fontSize: 11, textTransform: 'uppercase' as const, letterSpacing: 1.5, color: th.compLabel, fontWeight: 600, marginBottom: 4 }}>Téléphone</div>
                    <div style={{ fontSize: 14, color: th.expTitle, fontWeight: 500 }}>{contact.phone}</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ── MODAL SKILL ── */}
        {modalSkill && skillDefinitions[modalSkill] && (
          <div onClick={() => setModalSkill(null)} style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 9999, padding: 20
          }}>
            <div onClick={(e) => e.stopPropagation()} style={{
              background: th.floatBg, border: `2px solid ${th.floatBorder}`,
              borderRadius: 16, padding: 32, maxWidth: 500, width: '100%',
              boxShadow: '0 20px 60px rgba(0,0,0,0.4)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                <h3 style={{ fontSize: 24, fontWeight: 700, color: th.expTitle, fontFamily: "'Space Mono', monospace" }}>
                  {modalSkill}
                </h3>
                <button onClick={() => setModalSkill(null)} style={{
                  background: 'transparent', border: 'none', cursor: 'pointer',
                  color: th.floatText, fontSize: 24, padding: 0, lineHeight: 1
                }}>×</button>
              </div>
              <p style={{ fontSize: 15, color: th.profilText, lineHeight: 1.8 }}>
                {skillDefinitions[modalSkill][lang]}
              </p>
            </div>
          </div>
        )}

      </div>
    </>
  );
}