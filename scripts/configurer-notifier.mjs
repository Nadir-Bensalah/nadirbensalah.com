/**
 * Écrit out/notifier-config.php à partir des secrets GitHub, au moment du
 * déploiement. Ce fichier n'existe jamais dans le dépôt, qui est public : il
 * contient le nom du canal ntfy, le jeton du résumé et les adresses de Nadir.
 *
 * Les valeurs sont encodées en base64 dans le fichier PHP, ce qui évite tout
 * problème d'échappement. Rien n'est affiché dans le journal du déploiement.
 */
import fs from 'node:fs';

const { NTFY_SUJET, MES_IP, RESUME_JETON, NOTIF_VISITES } = process.env;

if (!NTFY_SUJET || !RESUME_JETON) {
  console.warn('Relais de notifications : secrets absents, le relais restera inactif (503).');
  process.exit(0);
}

const config = {
  sujet: NTFY_SUJET,
  ntfy: 'https://ntfy.sh',
  domaine: 'nadirbensalah.com',
  jeton: RESUME_JETON,
  exclure_ip: MES_IP ?? '',
  // Une notification à chaque visite, tant que le trafic reste faible. Pour
  // la couper : secret GitHub NOTIF_VISITES = off, puis redéployer.
  visites: NOTIF_VISITES !== 'off',
};
const b64 = Buffer.from(JSON.stringify(config)).toString('base64');
fs.writeFileSync(
  'out/notifier-config.php',
  `<?php return json_decode(base64_decode('${b64}'), true);\n`
);
console.log(
  `Relais de notifications configuré (${(MES_IP ?? '').split(',').filter(Boolean).length} adresse(s) exclue(s)).`
);
