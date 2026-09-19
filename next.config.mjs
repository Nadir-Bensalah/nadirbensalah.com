import { imageHosts } from './image-hosts.config.mjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',

  // Les cartes de source pesaient 2,5 Mo dans l'export et exposaient le code
  // d'origine. Sur un site statique public, elles ne servent personne.
  productionBrowserSourceMaps: false,

  distDir: process.env.DIST_DIR || '.next',

  // Le build doit échouer sur une erreur de type ou de lint, sinon la
  // vérification ne vérifie rien.
  typescript: {
    ignoreBuildErrors: false,
  },

  eslint: {
    ignoreDuringBuilds: false,
    dirs: ['src'],
  },

  images: {
    unoptimized: true,
    remotePatterns: imageHosts,
    minimumCacheTTL: 60,
  },
};
export default nextConfig;
