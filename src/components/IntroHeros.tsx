'use client';

import React, { useEffect, useLayoutEffect, useRef } from 'react';

/**
 * L'entrée de l'accueil : le texte du héros se reforme à partir de poussière
 * portée par le vent, comme un claquement de doigts à l'envers, puis les
 * icônes arrivent une par une de la même façon.
 *
 * Principe : chaque bloc marqué data-intro est redessiné, lettre par lettre à
 * sa place exacte, dans un canevas hors écran. Les pixels de ce dessin
 * deviennent les points d'arrivée de dizaines de milliers de grains fins. Les
 * grains voyagent dans un champ de vent continu : des grains voisins suivent
 * les mêmes remous, ce qui donne des volutes de fumée au lieu de trajectoires
 * indépendantes. Des nappes de brume, des taches floues et très pâles, les
 * accompagnent et se dissipent en route, surtout sur le bas du héros. Le texte
 * se pose de gauche à droite, dans le sens du vent, et le vrai texte apparaît
 * derrière le front des grains posés, sous un masque qui balaie dans le même
 * sens : ce qu'on lit à la fin est toujours le vrai HTML.
 *
 * Le texte est dans le HTML quoi qu'il arrive, seule son opacité est tenue à
 * zéro pendant l'entrée. Mouvement réduit, défilement, clic ou touche : tout
 * s'affiche immédiatement. Une seule fois par chargement de page, pas à chaque
 * retour sur l'accueil.
 */

let dejaJoue = false;

type Groupe = {
  elements: Element[];
  debut: number;
  fin: number;
  pose: boolean;
};

/** Durée du fondu entre les grains et le vrai texte, en secondes. */
const FONDU = 0.5;
/**
 * Les lettres se posent de gauche à droite. Une colonne située à la fraction
 * `a` de la largeur du texte a reçu tous ses grains à REVELE + a * BALAYAGE :
 * c'est à ce moment que le vrai texte y apparaît.
 */
const BALAYAGE = 1.3;
const REVELE = 2.9;
const FIN_TEXTE = REVELE + BALAYAGE + 0.15 + FONDU;

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
      racine.querySelectorAll<HTMLElement>('[data-intro]').forEach((b) => {
        b.style.removeProperty('mask-image');
        b.style.removeProperty('-webkit-mask-image');
      });
      racine.classList.remove('heros-intro');
      retireEcouteurs();
    };
    const evenements = ['wheel', 'touchstart', 'keydown', 'pointerdown', 'scroll'] as const;
    const retireEcouteurs = () =>
      evenements.forEach((e) => window.removeEventListener(e, montreTout));
    evenements.forEach((e) => window.addEventListener(e, montreTout, { passive: true }));
    // Filet de sécurité : quoi qu'il arrive, tout est visible après 10 s.
    const secours = window.setTimeout(montreTout, 10000);

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
      // Tout est calculé à la résolution réelle de l'écran : sur un écran
      // Retina, un grain fait un vrai pixel, pas un carré de quatre.
      const dpr = Math.min(Math.round(window.devicePixelRatio || 1), 2);
      const Ld = L * dpr;
      const Hd = H * dpr;

      // 1. Le dessin hors écran : texte, pastilles et boutons à leur place.
      const hors = document.createElement('canvas');
      hors.width = Ld;
      hors.height = Hd;
      const hc = hors.getContext('2d', { willReadFrequently: true })!;
      hc.scale(dpr, dpr);

      const blocs = Array.from(racine!.querySelectorAll<HTMLElement>('[data-intro]'));
      blocs.forEach((b) => dessineBloc(hc, b));
      const texte = echantillonne(hc, Ld, Hd, dpr, mobile ? 14000 : 36000);
      const zone = etendue(texte);

      const icones = tuiles.map((t, i) => {
        hc.clearRect(0, 0, L, H);
        if (images[i]) dessineTuile(hc, t, images[i]!);
        return echantillonne(hc, Ld, Hd, dpr, mobile ? 900 : 1800);
      });

      // 2. Les groupes : le texte d'abord, puis chaque icône, l'une après l'autre.
      const groupes: Groupe[] = [{ elements: blocs, debut: 0, fin: FIN_TEXTE, pose: false }];
      const grains: Grain[] = [];
      const nappes: Grain[] = [];

      texte.forEach((c) => grains.push(grainTexte(c, zone, L)));
      const largeur = zone.droite - zone.gauche || 1;
      const cadres = blocs.map((b) => b.getBoundingClientRect());
      // La brume : de grandes taches pâles qui voyagent avec les grains et se
      // dissipent avant d'arriver. Deux fois plus nombreuses sur le bas du héros.
      const nbNappes = mobile ? 260 : 700;
      for (let i = 0; i < nbNappes; i++) {
        let c = texte[Math.floor(Math.random() * texte.length)];
        const bas = (c.y - zone.haut) / (zone.bas - zone.haut || 1);
        if (Math.random() > 0.35 + 0.65 * bas) c = texte[Math.floor(Math.random() * texte.length)];
        nappes.push(nappe(grainTexte(c, zone, L)));
      }

      icones.forEach((cibles, i) => {
        const debut = FIN_TEXTE - 0.6 + i * 0.22;
        const g = groupes.push({ elements: [tuiles[i]], debut, fin: debut + 1.6, pose: false }) - 1;
        cibles.forEach((c) => grains.push(grainIcone(c, g)));
        for (let k = 0; k < (mobile ? 5 : 10); k++) {
          const n = nappe(grainIcone(cibles[Math.floor(Math.random() * cibles.length)], g));
          nappes.push({ ...n, cote: n.cote * 0.5 });
        }
      });

      // 3. Le canevas visible, par-dessus la page, sans capter un seul clic.
      // Les grains s'écrivent directement dans les pixels : c'est ce qui permet
      // d'en animer des dizaines de milliers sans ralentir.
      canevas = document.createElement('canvas');
      canevas.setAttribute('aria-hidden', 'true');
      canevas.width = Ld;
      canevas.height = Hd;
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
      const pixels = ctx.createImageData(Ld, Hd);
      const mots = new Uint32Array(pixels.data.buffer);
      const tache = fabriqueTache();

      const t0 = performance.now();
      const finTotale = Math.max(...groupes.map((g) => g.fin)) + FONDU;

      // Le vrai texte est révélé par un masque qui balaie de gauche à droite,
      // derrière le front des grains posés.
      blocs.forEach((b) => b.classList.add('pose'));
      const masque = (b: HTMLElement, valeur: string) => {
        b.style.setProperty('mask-image', valeur);
        b.style.setProperty('-webkit-mask-image', valeur);
      };
      const revele = (t: number) => {
        const front = zone.gauche + ((t - REVELE) / BALAYAGE) * largeur;
        blocs.forEach((b, i) => {
          const x = front - cadres[i].left;
          masque(b, `linear-gradient(90deg, #000 ${x - 90}px, transparent ${x}px)`);
        });
      };
      revele(0);

      const trame = () => {
        if (arrete) return;
        const t = (performance.now() - t0) / 1000;

        if (t < REVELE + BALAYAGE + 0.2) revele(t);
        else if (blocs[0].style.getPropertyValue('mask-image')) blocs.forEach((b) => masque(b, ''));

        for (const g of groupes) {
          // Le vrai texte commence à apparaître pendant que les derniers
          // grains se posent : on ne voit jamais les lettres figées en points.
          if (!g.pose && g !== groupes[0] && t >= g.fin - 0.5) {
            g.pose = true;
            g.elements.forEach((e) => e.classList.add('pose'));
          }
        }

        mots.fill(0);
        const d = pixels.data;
        for (const p of grains) {
          const g = groupes[p.groupe];
          const u = (t - g.debut - p.retard) / p.duree;
          if (u <= 0) continue;
          let alpha = p.alpha;
          // Un grain de texte s'efface quand le vrai texte est apparu à sa place,
          // un grain d'icône quand son icône apparaît.
          const effacement = p.groupe === 0 ? REVELE + p.avance * BALAYAGE + 0.15 : g.fin - 0.3;
          if (t > effacement) {
            const f = 1 - (t - effacement) / FONDU;
            if (f <= 0) continue;
            alpha *= f;
          }
          const { x, y, e } = position(p, Math.min(u, 1), t);
          alpha *= Math.min(1, u * 3) * (0.45 + 0.55 * e);
          const px = (x * dpr) | 0;
          const py = (y * dpr) | 0;
          // Un grain fait un pixel en vol, et au plus deux une fois posé : la
          // lettre reste une poussière fine jusqu'à ce que le vrai texte la remplace.
          const cote = e > 0.92 ? Math.min(p.cote, 2) : 1;
          const a = (alpha * 255) | 0;
          for (let dy = 0; dy < cote; dy++) {
            const yy = py + dy;
            if (yy < 0 || yy >= Hd) continue;
            for (let dx = 0; dx < cote; dx++) {
              const xx = px + dx;
              if (xx < 0 || xx >= Ld) continue;
              const i = (yy * Ld + xx) * 4;
              if (d[i + 3] >= a) continue;
              d[i] = p.r;
              d[i + 1] = p.v;
              d[i + 2] = p.b;
              d[i + 3] = a;
            }
          }
        }
        ctx.putImageData(pixels, 0, 0);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        for (const p of nappes) {
          const g = groupes[p.groupe];
          const u = (t - g.debut - p.retard) / p.duree;
          if (u <= 0 || u >= 1) continue;
          const { x, y } = position(p, u, t);
          const taille = p.cote * (1.3 - 0.5 * u);
          ctx.globalAlpha = p.alpha * Math.sin(Math.PI * u) ** 1.5;
          ctx.drawImage(tache(p), x - taille / 2, y - taille / 2, taille, taille);
        }
        ctx.globalAlpha = 1;
        ctx.setTransform(1, 0, 0, 1, 0, 0);

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

type Cible = { x: number; y: number; r: number; v: number; b: number; alpha: number; pas: number };
type Zone = { gauche: number; droite: number; haut: number; bas: number };

/** Transforme le dessin en points d'arrivée, au plus `maximum`. */
function echantillonne(
  c: CanvasRenderingContext2D,
  L: number,
  H: number,
  dpr: number,
  maximum: number
): Cible[] {
  const { data } = c.getImageData(0, 0, L, H);
  let pleins = 0;
  for (let i = 3; i < data.length; i += 4) if (data[i] > 90) pleins++;
  const pas = Math.max(1, Math.ceil(Math.sqrt(pleins / maximum)));
  const cibles: Cible[] = [];
  for (let y = 0; y < H; y += pas) {
    for (let x = 0; x < L; x += pas) {
      const i = (y * L + x) * 4;
      if (data[i + 3] <= 90) continue;
      // Les cibles sont en pixels CSS, le pas en pixels de l'écran. Chaque
      // cible est décalée au hasard dans sa case : sans ça, les lettres posées
      // montrent une trame régulière, comme une image imprimée.
      cibles.push({
        x: (x + Math.random() * (pas - 1)) / dpr,
        y: (y + Math.random() * (pas - 1)) / dpr,
        r: data[i],
        v: data[i + 1],
        b: data[i + 2],
        alpha: data[i + 3] / 255,
        pas,
      });
    }
  }
  return cibles;
}

function etendue(cibles: Cible[]): Zone {
  const z = { gauche: Infinity, droite: -Infinity, haut: Infinity, bas: -Infinity };
  for (const c of cibles) {
    if (c.x < z.gauche) z.gauche = c.x;
    if (c.x > z.droite) z.droite = c.x;
    if (c.y < z.haut) z.haut = c.y;
    if (c.y > z.bas) z.bas = c.y;
  }
  return z;
}

/* ------------------------------------------------------------------------ */
/* Le vent                                                                    */
/* ------------------------------------------------------------------------ */

type Grain = {
  groupe: number;
  sx: number;
  sy: number;
  tx: number;
  ty: number;
  retard: number;
  duree: number;
  /** Force des remous, en pixels : forte au départ, nulle à l'arrivée. */
  ampleur: number;
  graine: number;
  /** Position de la cible dans la largeur du texte, de 0 à 1. */
  avance: number;
  cote: number;
  r: number;
  v: number;
  b: number;
  alpha: number;
};

const hasard = (a: number, b: number) => a + Math.random() * (b - a);

/**
 * Le champ de vent : une somme d'ondes qui dépend du lieu et du temps. Deux
 * grains proches reçoivent presque le même souffle, et c'est ce qui dessine
 * des volutes au lieu d'un nuage de points indépendants.
 */
function souffle(x: number, y: number, t: number, graine: number) {
  const a = Math.sin(x * 0.0061 + t * 0.9 + Math.sin(y * 0.0093 + t * 0.6) * 1.8 + graine);
  const b = Math.cos(y * 0.0078 - t * 0.7 + Math.sin(x * 0.0047 - t * 0.5) * 1.6 + graine * 0.7);
  return { x: a + 0.35 * Math.sin(y * 0.021 + t * 1.7), y: b * 0.8 };
}

/** Démarrage lent, arrivée lente : la poussière dérive, puis se pose. */
const douceur = (u: number) => u * u * u * (u * (u * 6 - 15) + 10);

function position(p: Grain, u: number, t: number) {
  const e = douceur(u);
  const bx = p.sx + (p.tx - p.sx) * e;
  const by = p.sy + (p.ty - p.sy) * e;
  const s = souffle(bx, by, t, p.graine);
  const force = p.ampleur * (1 - e) ** 1.4;
  return { x: bx + s.x * force, y: by + s.y * force, e };
}

/**
 * Un grain de texte. Le vent souffle de la gauche : les grains partent loin à
 * gauche et un peu en dessous, et les lettres se posent de gauche à droite.
 * Plus on descend dans le héros, plus le vent est fort.
 */
function grainTexte(c: Cible, z: Zone, L: number): Grain {
  const largeur = z.droite - z.gauche || 1;
  const avance = (c.x - z.gauche) / largeur;
  const bas = (c.y - z.haut) / (z.bas - z.haut || 1);
  const angle = Math.PI + hasard(-0.55, 0.85);
  const distance = hasard(0.25, 0.75) * L;
  return {
    groupe: 0,
    sx: c.x + Math.cos(angle) * distance,
    sy: c.y - Math.sin(angle) * distance * 0.6 + hasard(0, 120),
    tx: c.x,
    ty: c.y,
    retard: avance * 1.3 + hasard(0, 0.9),
    duree: hasard(1.7, 2.0),
    ampleur: hasard(60, 110) * (0.7 + 0.8 * bas),
    graine: hasard(0, 0.6),
    avance,
    cote: c.pas,
    r: c.r,
    v: c.v,
    b: c.b,
    alpha: c.alpha,
  };
}

function grainIcone(c: Cible, groupe: number): Grain {
  const angle = Math.PI + hasard(-0.7, 0.7);
  const distance = hasard(60, 200);
  return {
    groupe,
    sx: c.x + Math.cos(angle) * distance,
    sy: c.y - Math.sin(angle) * distance * 0.6 + hasard(-20, 40),
    tx: c.x,
    ty: c.y,
    retard: hasard(0, 0.35),
    duree: hasard(1.0, 1.25),
    ampleur: hasard(25, 50),
    graine: hasard(0, 0.6),
    avance: 0,
    cote: c.pas,
    r: c.r,
    v: c.v,
    b: c.b,
    alpha: c.alpha,
  };
}

/** Une nappe de brume : grande, floue, pâle, et qui se dissipe avant d'arriver. */
function nappe(g: Grain): Grain {
  return {
    ...g,
    retard: g.retard * 0.8,
    duree: g.duree * 1.1,
    ampleur: g.ampleur * 1.4,
    cote: hasard(60, 160),
    alpha: hasard(0.025, 0.055),
  };
}

/** Une tache floue par couleur, dessinée une fois puis réutilisée. */
function fabriqueTache() {
  const cache = new Map<string, HTMLCanvasElement>();
  return (p: Grain) => {
    const cle = `${p.r >> 4},${p.v >> 4},${p.b >> 4}`;
    let t = cache.get(cle);
    if (!t) {
      t = document.createElement('canvas');
      t.width = t.height = 64;
      const c = t.getContext('2d')!;
      const d = c.createRadialGradient(32, 32, 0, 32, 32, 32);
      d.addColorStop(0, `rgba(${p.r},${p.v},${p.b},1)`);
      d.addColorStop(0.45, `rgba(${p.r},${p.v},${p.b},0.45)`);
      d.addColorStop(1, `rgba(${p.r},${p.v},${p.b},0)`);
      c.fillStyle = d;
      c.fillRect(0, 0, 64, 64);
      cache.set(cle, t);
    }
    return t;
  };
}
