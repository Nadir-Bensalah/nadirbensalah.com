/**
 * Configuration Tailwind, volontairement minimale.
 *
 * Le design du site ne passe pas par Tailwind : il vit dans les jetons CSS de
 * src/styles/tailwind.css (couleurs, espaces, rayons, typographie) et dans les
 * classes de composants qui y sont définies. Tailwind ne sert plus qu'à ses
 * utilitaires de mise en page ponctuels.
 *
 * L'ancienne configuration était un résidu de gabarit : elle mappait quinze
 * couleurs vers des variables jamais définies (--background, --foreground,
 * --primary…), ce qui produisait du texte blanc sur fond blanc sur les pages
 * restées sur l'ancien design. Elle déclarait aussi une police jamais chargée
 * et cinq animations jamais utilisées.
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      // Les seules couleurs exposées à Tailwind sont celles qui existent
      // réellement comme jetons. Toute autre valeur doit passer par le CSS.
      colors: {
        bg: 'var(--bg)',
        'bg-2': 'var(--bg-2)',
        'bg-3': 'var(--bg-3)',
        texte: 'var(--texte)',
        'texte-2': 'var(--texte-2)',
        'texte-3': 'var(--texte-3)',
        trait: 'var(--trait)',
        action: 'var(--action)',
      },
      borderRadius: {
        DEFAULT: 'var(--r-2)',
        carte: 'var(--r-3)',
        rond: 'var(--r-rond)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      maxWidth: {
        lecture: 'var(--colonne-lecture)',
        conteneur: 'var(--conteneur)',
      },
    },
  },
  plugins: [],
};
