'use client';

import React, { useEffect, useLayoutEffect, useRef } from 'react';

/**
 * L'entrée de l'accueil : le texte du héros se reforme à partir de poussière,
 * comme un claquement de doigts à l'envers, puis les icônes arrivent une par
 * une de la même façon.
 *
 * Principe : chaque bloc marqué data-intro est redessiné, lettre par lettre
 * à sa place exacte, dans un canevas hors écran. Les pixels de ce dessin
 * deviennent les points d'arrivée de milliers de grains, partis en nappes de
 * plusieurs côtés. Quand les grains sont posés, le vrai texte apparaît en
 * fondu par-dessus et le canevas s'efface : ce qu'on lit à la fin est
 * toujours le vrai HTML.
 *
 * Le texte est dans le HTML quoi qu'il arrive, seule son opacité est tenue à
 * zéro pendant l'entrée. Mouvement réduit, défilement, clic ou touche :
 * tout s'affiche immédiatement. Une seule fois par chargement de page, pas à
 * chaque retour sur l'accueil.
 */

let dejaJoue = false;

type Groupe = {
  elements: Element[];
  debut: number;
  fin: number;
  pose: boolean;
};

const FONDU = 0.35;

export default function IntroHeros({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  // Avant la première peinture : si l'entrée a déjà été jouée ou n'a pas lieu
  // d'être, on retire le voile tout de suite, sans flash.
  useLayoutEffect(() => {
    const racine = ref.current;
    if (!racine) return;
    if (dejaJoue || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      racine.classList.remove('heros-intro');
    }
  }, []);

  useEffect(() => {
    const racine = ref.current;
    if (!racine || !racine.classList.contains('heros-intro')) return;
    dejaJoue = true;

    let arrete = false;
    let canevas: HTMLCanvasElement | null = null;
    let image = 0;

    const montreTout = () => {
      if (arrete) return;
      arrete = true;
      cancelAnimationFrame(image);
      racine.querySelectorAll('[data-intro], .tuile-app').forEach((e) => e.classList.add('pose'));
      canevas?.remove();
      racine.classList.remove('heros-intro');
      retireEcouteurs();
    };
    const evenements = ['wheel', 'touchstart', 'keydown', 'pointerdown', 'scroll'] as const;
    const retireEcouteurs = () =>
      evenements.forEach((e) => window.removeEventListener(e, montreTout));
    evenements.forEach((e) => window.addEventListener(e, montreTout, { passive: true }));
    // Filet de sécurité : quoi qu'il arrive, tout est visible après 6 s.
    const secours = window.setTimeout(montreTout, 6000);

    demarre().catch(montreTout);

    async function demarre() {
      await document.fonts.ready;
      const tuiles = Array.from(racine!.querySelectorAll<HTMLElement>('.tuile-app'));
      const images = tuiles.map((t) => t.querySelector('img'));
      await Promise.all(images.map((i) => (i ? i.decode().catch(() => undefined) : undefined)));
      if (arrete) return;

      const L = window.innerWidth;
      const H = window.innerHeight;
      const mobile = L < 700;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      // 1. Le dessin hors écran : texte, pastilles et boutons à leur place.
      const hors = document.createElement('canvas');
      hors.width = L;
      hors.height = H;
      const hc = hors.getContext('2d', { willReadFrequently: true })!;

      const blocs = Array.from(racine!.querySelectorAll<HTMLElement>('[data-intro]'));
      blocs.forEach((b) => dessineBloc(hc, b));
      const texte = echantillonne(hc, L, H, mobile ? 4500 : 10000);

      const icones = tuiles.map((t, i) => {
        hc.clearRect(0, 0, L, H);
        if (images[i]) dessineTuile(hc, t, images[i]!);
        return echantillonne(hc, L, H, mobile ? 260 : 480);
      });

      // 2. Les groupes : le texte d'abord, puis chaque icône, l'une après l'autre.
      const groupes: Groupe[] = [];
      const grains: Grain[] = [];
      const cx = L / 2;
      const cy = Math.min(H, racine!.getBoundingClientRect().bottom) / 2;

      groupes.push({ elements: blocs, debut: 0, fin: 2.1, pose: false });
      texte.forEach((c) => grains.push(grainTexte(c, 0, L, H, cx, cy, false)));
      // La brume : des grains qui partent avec les autres et se dissipent en route.
      for (let i = 0; i < texte.length * 0.3; i++) {
        const c = texte[Math.floor(Math.random() * texte.length)];
        grains.push(grainTexte(c, 0, L, H, cx, cy, true));
      }

      icones.forEach((cibles, i) => {
        const debut = 1.85 + i * 0.13;
        const g = groupes.push({ elements: [tuiles[i]], debut, fin: debut + 0.9, pose: false }) - 1;
        cibles.forEach((c) => grains.push(grainIcone(c, g)));
      });

      // Les grains de même couleur sont dessinés d'une traite.
      grains.sort((a, b) => (a.couleur < b.couleur ? -1 : a.couleur > b.couleur ? 1 : 0));

      // 3. Le canevas visible, par-dessus la page, sans capter un seul clic.
      canevas = document.createElement('canvas');
      canevas.setAttribute('aria-hidden', 'true');
      canevas.width = Math.round(L * dpr);
      canevas.height = Math.round(H * dpr);
      Object.assign(canevas.style, {
        position: 'fixed',
        inset: '0',
        width: `${L}px`,
        height: `${H}px`,
        pointerEvents: 'none',
        zIndex: '5',
      });
      document.body.appendChild(canevas);
      const ctx = canevas.getContext('2d')!;
      ctx.scale(dpr, dpr);

      const t0 = performance.now();
      const finTotale = Math.max(...groupes.map((g) => g.fin)) + FONDU;

      const trame = () => {
        if (arrete) return;
        const t = (performance.now() - t0) / 1000;
        ctx.clearRect(0, 0, L, H);

        for (const g of groupes) {
          // Le vrai texte commence à apparaître juste avant que les derniers
          // grains se posent : on ne voit jamais les lettres en pixels figées.
          if (!g.pose && t >= g.fin - 0.3) {
            g.pose = true;
            g.elements.forEach((e) => e.classList.add('pose'));
          }
        }

        let couleur = '';
        for (const p of grains) {
          const g = groupes[p.groupe];
          const local = (t - g.debut - p.retard) / p.duree;
          if (local <= 0) continue;
          let alpha = p.alpha;
          if (t > g.fin - 0.15) {
            const f = 1 - (t - (g.fin - 0.15)) / FONDU;
            if (f <= 0) continue;
            alpha *= f;
          }
          const u = Math.min(local, 1);
          // Départ lent, arrivée douce : une brume qui se rassemble.
          const e = u * u * (3 - 2 * u);
          const derive = Math.sin(u * p.frequence + p.phase) * p.ampleur * (1 - e);
          const x = p.sx + (p.tx - p.sx) * e + p.nx * derive;
          const y = p.sy + (p.ty - p.sy) * e + p.ny * derive;
          const taille = p.taille0 + (p.taille1 - p.taille0) * e;
          if (p.brume) {
            if (u >= 1) continue;
            alpha *= Math.sin(Math.PI * u) * 0.35;
          } else {
            alpha *= Math.min(1, u * 2) * (0.35 + 0.65 * e * e);
          }
          if (couleur !== p.couleur) {
            couleur = p.couleur;
            ctx.fillStyle = couleur;
          }
          ctx.globalAlpha = alpha;
          ctx.fillRect(x - taille / 2, y - taille / 2, taille, taille);
        }
        ctx.globalAlpha = 1;

        if (t >= finTotale) {
          window.clearTimeout(secours);
          montreTout();
          return;
        }
        image = requestAnimationFrame(trame);
      };
      image = requestAnimationFrame(trame);
    }

    return () => {
      window.clearTimeout(secours);
      arrete = true;
      cancelAnimationFrame(image);
      canevas?.remove();
      retireEcouteurs();
    };
  }, []);

  return (
    <div ref={ref} className="heros-intro">
      {children}
      <style>{`
        .heros-intro [data-intro],
        .heros-intro .tuile-app { opacity: 0; }
        .heros-intro [data-intro].pose,
        .heros-intro .tuile-app.pose { opacity: 1; transition: opacity ${FONDU * 1000}ms ease; }
        @media (prefers-reduced-motion: reduce) {
          .heros-intro [data-intro],
          .heros-intro .tuile-app { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/* Le dessin hors écran                                                       */
/* ------------------------------------------------------------------------ */

const transparent = (c: string) => c === 'transparent' || /rgba\(.*,\s*0\)$/.test(c);

/** Fonds et bordures (boutons, pastille verte), puis chaque lettre à sa place. */
function dessineBloc(c: CanvasRenderingContext2D, bloc: HTMLElement) {
  const formes = [bloc, ...Array.from(bloc.querySelectorAll<HTMLElement>('*'))];
  for (const el of formes) {
    const s = getComputedStyle(el);
    const fond = s.backgroundColor;
    const bord = parseFloat(s.borderTopWidth);
    if (transparent(fond) && (!bord || transparent(s.borderTopColor))) continue;
    const r = el.getBoundingClientRect();
    const rayon = Math.min(parseFloat(s.borderTopLeftRadius) || 0, r.height / 2);
    c.beginPath();
    c.roundRect(r.left, r.top, r.width, r.height, rayon);
    if (!transparent(fond)) {
      c.fillStyle = fond;
      c.fill();
    }
    if (bord && !transparent(s.borderTopColor)) {
      c.strokeStyle = s.borderTopColor;
      c.lineWidth = bord;
      c.stroke();
    }
  }

  const marcheur = document.createTreeWalker(bloc, NodeFilter.SHOW_TEXT);
  const plage = document.createRange();
  for (let n = marcheur.nextNode(); n; n = marcheur.nextNode()) {
    const noeud = n as Text;
    const parent = noeud.parentElement;
    if (!parent) continue;
    const s = getComputedStyle(parent);
    c.font = `${s.fontStyle} ${s.fontWeight} ${s.fontSize} ${s.fontFamily}`;
    c.fillStyle = s.color;
    c.textBaseline = 'alphabetic';
    const texte = noeud.data;
    let i = 0;
    while (i < texte.length) {
      const code = texte.codePointAt(i)!;
      const long = code > 0xffff ? 2 : 1;
      const lettre = texte.slice(i, i + long);
      if (lettre.trim()) {
        plage.setStart(noeud, i);
        plage.setEnd(noeud, i + long);
        const r = plage.getClientRects()[0];
        if (r && r.width) {
          const m = c.measureText(lettre);
          const haut = m.fontBoundingBoxAscent;
          const bas = m.fontBoundingBoxDescent;
          c.fillText(lettre, r.left, r.top + (r.height - (haut + bas)) / 2 + haut);
        }
      }
      i += long;
    }
  }
}

/** L'icône telle qu'elle est affichée : inclinée, arrondie. */
function dessineTuile(c: CanvasRenderingContext2D, tuile: HTMLElement, img: HTMLImageElement) {
  const r = tuile.getBoundingClientRect();
  const m = new DOMMatrix(getComputedStyle(tuile).transform);
  const cote = tuile.offsetWidth;
  const rayon = parseFloat(getComputedStyle(tuile).borderTopLeftRadius) || 0;
  c.save();
  c.translate(r.left + r.width / 2, r.top + r.height / 2);
  c.transform(m.a, m.b, m.c, m.d, 0, 0);
  c.beginPath();
  c.roundRect(-cote / 2, -cote / 2, cote, cote, rayon);
  c.clip();
  c.drawImage(img, -cote / 2, -cote / 2, cote, cote);
  c.restore();
}

type Cible = { x: number; y: number; couleur: string; alpha: number; pas: number };

/** Transforme le dessin en points d'arrivée, au plus `maximum`. */
function echantillonne(
  c: CanvasRenderingContext2D,
  L: number,
  H: number,
  maximum: number
): Cible[] {
  const { data } = c.getImageData(0, 0, L, H);
  let pleins = 0;
  for (let i = 3; i < data.length; i += 16) if (data[i] > 90) pleins++;
  // pleins compte un pixel sur quatre : on règle le pas pour tomber sous le maximum.
  const pas = Math.max(1, Math.ceil(Math.sqrt((pleins * 4) / maximum)));
  const cibles: Cible[] = [];
  for (let y = 0; y < H; y += pas) {
    for (let x = 0; x < L; x += pas) {
      const i = (y * L + x) * 4;
      if (data[i + 3] <= 90) continue;
      // Couleurs arrondies, pour dessiner beaucoup de grains d'une même traite.
      const q = (v: number) => Math.round(v / 24) * 24;
      cibles.push({
        // Le centre du pixel lu, pas le centre de la case : sinon le dessin
        // glisse d'un demi-pas vers le bas à droite et double le vrai texte.
        x: x + 0.5,
        y: y + 0.5,
        couleur: `rgb(${q(data[i])},${q(data[i + 1])},${q(data[i + 2])})`,
        alpha: data[i + 3] / 255,
        pas,
      });
    }
  }
  return cibles;
}

/* ------------------------------------------------------------------------ */
/* Les grains                                                                 */
/* ------------------------------------------------------------------------ */

type Grain = {
  groupe: number;
  sx: number;
  sy: number;
  tx: number;
  ty: number;
  nx: number;
  ny: number;
  retard: number;
  duree: number;
  ampleur: number;
  frequence: number;
  phase: number;
  taille0: number;
  taille1: number;
  couleur: string;
  alpha: number;
  brume: boolean;
};

const hasard = (a: number, b: number) => a + Math.random() * (b - a);
/** Une valeur en cloche, pour des nappes aux bords flous. */
const cloche = () => (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;

// Les nappes de brume partent de ces directions (en fractions de l'écran).
const SOURCES = [
  { x: -0.25, y: 0.35 },
  { x: 1.25, y: 0.45 },
  { x: 0.15, y: -0.3 },
  { x: 0.9, y: -0.25 },
  { x: 0.3, y: 1.2 },
  { x: 0.8, y: 1.15 },
];

function acheve(p: Omit<Grain, 'nx' | 'ny'>): Grain {
  const dx = p.tx - p.sx;
  const dy = p.ty - p.sy;
  const d = Math.hypot(dx, dy) || 1;
  // La dérive se fait en travers du trajet : les nappes ondulent au lieu de filer droit.
  return { ...p, nx: -dy / d, ny: dx / d };
}

function grainTexte(
  c: Cible,
  groupe: number,
  L: number,
  H: number,
  cx: number,
  cy: number,
  brume: boolean
): Grain {
  const s = SOURCES[Math.floor(Math.random() * SOURCES.length)];
  const sx = cx + (s.x - 0.5) * L + cloche() * L * 0.22;
  const sy = cy + (s.y - 0.5) * H + cloche() * H * 0.25;
  return acheve({
    groupe,
    sx,
    sy,
    tx: c.x,
    ty: c.y,
    retard: hasard(0, 0.7),
    duree: hasard(0.9, 1.4),
    ampleur: hasard(20, 90) * (Math.random() < 0.5 ? -1 : 1),
    frequence: hasard(2, 5),
    phase: hasard(0, Math.PI * 2),
    taille0: brume ? hasard(1.5, 3) : hasard(1, 2),
    taille1: brume ? hasard(1, 2) : c.pas,
    couleur: c.couleur,
    alpha: c.alpha,
    brume,
  });
}

function grainIcone(c: Cible, groupe: number): Grain {
  const angle = hasard(0, Math.PI * 2);
  const distance = hasard(50, 150);
  return acheve({
    groupe,
    sx: c.x + Math.cos(angle) * distance,
    sy: c.y + Math.sin(angle) * distance,
    tx: c.x,
    ty: c.y,
    retard: hasard(0, 0.12),
    duree: hasard(0.55, 0.75),
    ampleur: hasard(8, 30) * (Math.random() < 0.5 ? -1 : 1),
    frequence: hasard(2, 4),
    phase: hasard(0, Math.PI * 2),
    taille0: hasard(1, 2),
    taille1: c.pas,
    couleur: c.couleur,
    alpha: c.alpha,
    brume: false,
  });
}
