<?php
/**
 * Relais de notifications : le site signale, ce fichier transmet à ntfy.
 *
 * Pourquoi un relais plutôt qu'un appel direct à ntfy depuis la page : le nom
 * du canal ntfy serait alors lisible par n'importe qui dans le code du site,
 * et le dépôt est public. Ici il vit dans notifier-config.php, écrit au
 * déploiement à partir des secrets GitHub, jamais versionné.
 *
 * Ce qui arrive sur le téléphone de Nadir :
 * - un message reçu par le formulaire (confirmé par Web3Forms) ;
 * - un CV téléchargé ;
 * - un prospect arrivé par un lien de prospection (utm_source=prospection) ;
 * - chaque soir à 19 h, le résumé de la journée.
 *
 * Aucune donnée personnelle ne transite : jamais de nom, d'adresse, de
 * message. L'adresse IP du visiteur ne sert qu'à deux choses, sur place : ne
 * pas notifier Nadir de ses propres visites, et limiter les abus. Elle n'est
 * jamais transmise ; seule une empreinte chiffrée est gardée, 24 heures.
 *
 * Écrit pour PHP 7.4 et plus : la version de Hostinger peut changer.
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Robots-Tag: noindex, nofollow');

function repondre(int $code, array $corps = []): void
{
    http_response_code($code);
    echo json_encode($corps === [] ? ['ok' => $code < 400] : $corps, JSON_UNESCAPED_UNICODE);
    exit;
}

$config = @include __DIR__ . '/notifier-config.php';
if (!is_array($config) || empty($config['sujet'])) {
    repondre(503, ['ok' => false, 'raison' => 'non_configure']);
}

$ntfy = rtrim((string) ($config['ntfy'] ?? 'https://ntfy.sh'), '/');
$domaine = (string) ($config['domaine'] ?? 'nadirbensalah.com');
$jeton = (string) ($config['jeton'] ?? '');
$dossier = (string) ($config['dossier'] ?? '');

/* ------------------------------------------------------------------------ */
/* Le stockage : des compteurs du jour, hors de la racine publique          */
/* ------------------------------------------------------------------------ */

function dossierDonnees(string $prefere): string
{
    $candidats = [$prefere, dirname(__DIR__) . '/notifier-donnees', sys_get_temp_dir() . '/notifier-donnees'];
    foreach ($candidats as $d) {
        if ($d === '') {
            continue;
        }
        if (is_dir($d) || @mkdir($d, 0700, true)) {
            if (is_writable($d)) {
                return $d;
            }
        }
    }
    return sys_get_temp_dir();
}
$donnees = dossierDonnees($dossier);

/** Lit, modifie et réécrit un fichier JSON sous verrou. */
function modifier(string $fichier, callable $f)
{
    $h = @fopen($fichier, 'c+');
    if ($h === false) {
        $vide = [];
        return $f($vide);
    }
    flock($h, LOCK_EX);
    $brut = stream_get_contents($h);
    $etat = json_decode($brut === false || $brut === '' ? '{}' : $brut, true);
    if (!is_array($etat)) {
        $etat = [];
    }
    $resultat = $f($etat);
    ftruncate($h, 0);
    rewind($h);
    fwrite($h, json_encode($etat, JSON_UNESCAPED_UNICODE));
    fflush($h);
    flock($h, LOCK_UN);
    fclose($h);
    return $resultat;
}

$fuseau = new DateTimeZone('Europe/Paris');
$maintenant = new DateTimeImmutable('now', $fuseau);
$jour = $maintenant->format('Y-m-d');

// Ménage : les compteurs du jour partent au bout de quinze jours, les
// empreintes servant à limiter les abus au bout de vingt-quatre heures.
if (random_int(1, 20) === 1) {
    foreach (glob($donnees . '/jour-*.json') ?: [] as $vieux) {
        if (filemtime($vieux) < time() - 15 * 86400) {
            @unlink($vieux);
        }
    }
    foreach (glob($donnees . '/limite-*.json') ?: [] as $vieux) {
        if (filemtime($vieux) < time() - 86400) {
            @unlink($vieux);
        }
    }
}

/* ------------------------------------------------------------------------ */
/* Qui appelle                                                              */
/* ------------------------------------------------------------------------ */

/** Toutes les adresses sous lesquelles l'appelant peut se présenter. */
function adressesAppelant(): array
{
    $a = [(string) ($_SERVER['REMOTE_ADDR'] ?? '')];
    foreach (['HTTP_X_FORWARDED_FOR', 'HTTP_CF_CONNECTING_IP', 'HTTP_X_REAL_IP'] as $en_tete) {
        if (!empty($_SERVER[$en_tete])) {
            $a[] = trim(explode(',', (string) $_SERVER[$en_tete])[0]);
        }
    }
    return array_values(array_filter(array_unique($a)));
}

/**
 * Est-ce Nadir ? Une entrée se termine par « : » ou « . » quand c'est un
 * préfixe : chez Free, l'IPv6 garde son préfixe mais change sa fin.
 */
function estNadir(array $adresses, string $liste): bool
{
    foreach (array_filter(array_map('trim', explode(',', $liste))) as $entree) {
        $prefixe = substr($entree, -1) === ':' || substr($entree, -1) === '.' || substr($entree, -1) === '*';
        $motif = strtolower(rtrim($entree, '*'));
        foreach ($adresses as $ip) {
            $ip = strtolower($ip);
            if ($prefixe ? strncmp($ip, $motif, strlen($motif)) === 0 : $ip === $motif) {
                return true;
            }
        }
    }
    return false;
}

$adresses = adressesAppelant();
$nadir = estNadir($adresses, (string) ($config['exclure_ip'] ?? ''));
$jetonValide = $jeton !== '' && hash_equals($jeton, (string) ($_SERVER['HTTP_X_JETON'] ?? ''));
$action = (string) ($_GET['action'] ?? '');

/* ------------------------------------------------------------------------ */
/* L'envoi vers ntfy                                                        */
/* ------------------------------------------------------------------------ */

function envoyerNtfy(string $ntfy, string $sujet, string $titre, string $message, array $etiquettes, int $priorite): bool
{
    $corps = json_encode([
        'topic' => $sujet,
        'title' => $titre,
        'message' => $message,
        'tags' => $etiquettes,
        'priority' => $priorite,
        'click' => 'https://eu.posthog.com/project/282648/dashboard/971252',
    ], JSON_UNESCAPED_UNICODE);

    if (function_exists('curl_init')) {
        $c = curl_init($ntfy);
        curl_setopt_array($c, [
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => $corps,
            CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 6,
            CURLOPT_CONNECTTIMEOUT => 4,
        ]);
        curl_exec($c);
        $code = (int) curl_getinfo($c, CURLINFO_HTTP_CODE);
        curl_close($c);
        return $code >= 200 && $code < 300;
    }

    $contexte = stream_context_create(['http' => [
        'method' => 'POST',
        'header' => "Content-Type: application/json\r\n",
        'content' => $corps,
        'timeout' => 6,
        'ignore_errors' => true,
    ]]);
    $r = @file_get_contents($ntfy, false, $contexte);
    return $r !== false;
}

/** Au plus trente notifications par heure : un robot ne doit pas vider le téléphone. */
function plafondNotifications(string $donnees, DateTimeImmutable $maintenant): bool
{
    $fichier = $donnees . '/limite-push-' . $maintenant->format('YmdH') . '.json';
    return (bool) modifier($fichier, function (array &$e) {
        $e['n'] = ($e['n'] ?? 0) + 1;
        return $e['n'] <= 30;
    });
}

/* ------------------------------------------------------------------------ */
/* 1. État : pour vérifier le relais sans rien déclencher                   */
/* ------------------------------------------------------------------------ */

if ($_SERVER['REQUEST_METHOD'] === 'GET' && $action === 'etat') {
    repondre(200, ['ok' => true, 'php' => PHP_VERSION, 'exclu' => $nadir, 'stockage' => is_writable($donnees)]);
}

/* ------------------------------------------------------------------------ */
/* 2. Le résumé du soir, déclenché par GitHub Actions avec le jeton         */
/* ------------------------------------------------------------------------ */

if ($action === 'resume') {
    if (!$jetonValide) {
        repondre(403);
    }
    // Deux déclenchements programmés (17 h et 18 h UTC) : un seul tombe à
    // 19 h à Paris, été comme hiver. L'autre ne fait rien.
    $heureVoulue = isset($_GET['si_heure']) ? (int) $_GET['si_heure'] : null;
    if ($heureVoulue !== null && (int) $maintenant->format('G') !== $heureVoulue) {
        repondre(200, ['ok' => true, 'envoye' => false, 'raison' => 'pas_la_bonne_heure']);
    }

    $c = modifier($donnees . '/jour-' . $jour . '.json', function (array &$e) {
        return $e;
    });
    $visites = (int) ($c['visite'] ?? 0);
    $lectures = (int) ($c['lecture'] ?? 0);
    $cv = (int) ($c['cv'] ?? 0);
    $leads = (int) ($c['lead'] ?? 0);
    $prospects = (int) ($c['prospect_visite'] ?? 0);
    $s = function (int $n, string $un, string $plusieurs): string {
        return $n . ' ' . ($n > 1 ? $plusieurs : $un);
    };

    if ($visites === 0 && $leads === 0 && $cv === 0) {
        $message = 'Aucune visite aujourd’hui.';
    } else {
        $lignes = [
            $s($visites, 'visite', 'visites')
                . ' · ' . $s($lectures, 'a regardé vos réalisations', 'ont regardé vos réalisations'),
            $s($cv, 'CV téléchargé', 'CV téléchargés') . ' · ' . $s($leads, 'message reçu', 'messages reçus'),
        ];
        if ($prospects > 0) {
            $lignes[] = $s($prospects, 'prospect est venu', 'prospects sont venus') . ' par vos liens';
        }
        $canaux = (array) ($c['canaux'] ?? []);
        if ($canaux !== []) {
            arsort($canaux);
            $morceaux = [];
            foreach (array_slice($canaux, 0, 4, true) as $canal => $n) {
                $morceaux[] = $canal . ' ' . $n;
            }
            $lignes[] = 'D’où : ' . implode(' · ', $morceaux);
        }
        $message = implode("\n", $lignes);
    }

    $ok = envoyerNtfy($ntfy, (string) $config['sujet'], 'Résumé du jour · nadirbensalah.com', $message, ['bar_chart'], 3);
    repondre($ok ? 200 : 502, ['ok' => $ok, 'envoye' => $ok]);
}

/* ------------------------------------------------------------------------ */
/* 3. Un signal du site                                                     */
/* ------------------------------------------------------------------------ */

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    repondre(405);
}

// Seul le site lui-même peut signaler. Un test manuel passe par le jeton.
$origine = (string) ($_SERVER['HTTP_ORIGIN'] ?? '');
$hoteOrigine = $origine !== '' ? (string) parse_url($origine, PHP_URL_HOST) : '';
$memeSite = ($_SERVER['HTTP_SEC_FETCH_SITE'] ?? '') === 'same-origin'
    || $hoteOrigine === $domaine
    || $hoteOrigine === 'www.' . $domaine;
if (!$memeSite && !$jetonValide) {
    repondre(403);
}

// Les robots ne comptent pas.
if (preg_match('/bot|crawl|spider|slurp|headless|lighthouse|preview|monitor/i', (string) ($_SERVER['HTTP_USER_AGENT'] ?? ''))) {
    repondre(202, ['ok' => true, 'ignore' => 'robot']);
}

// Limite par appelant : une adresse hachée, jamais l'adresse elle-même.
$empreinte = hash('sha256', ($adresses[0] ?? '') . $jour . $jeton);
$autorise = modifier($donnees . '/limite-' . $maintenant->format('YmdH') . '.json', function (array &$e) use ($empreinte) {
    $e[$empreinte] = ($e[$empreinte] ?? 0) + 1;
    return $e[$empreinte] <= 60;
});
if (!$autorise) {
    repondre(429);
}

$brut = json_decode((string) file_get_contents('php://input', false, null, 0, 4096), true);
if (!is_array($brut)) {
    repondre(400);
}

/** Une valeur courte, sans caractère de contrôle ni coordonnée. */
function propre($v, int $max = 80): string
{
    $t = preg_replace('/[\x00-\x1F\x7F]+/u', ' ', is_scalar($v) ? (string) $v : '') ?? '';
    $t = preg_replace('/[^\s@]+@[^\s@]+\.[a-z]{2,}/i', '[e-mail]', $t) ?? '';
    $t = preg_replace('/(?:\+\d{1,3}[\s.-]?)?0?[1-9](?:[\s.-]?\d{2}){4}/', '[numéro]', $t) ?? '';
    $t = trim($t);
    return function_exists('mb_substr') ? mb_substr($t, 0, $max) : substr($t, 0, $max);
}

$type = propre($brut['type'] ?? '', 20);
$canal = propre($brut['canal'] ?? '', 30);
$source = propre($brut['source'] ?? '', 40);
$campagne = propre($brut['campagne'] ?? '', 60);
$intention = propre($brut['intention'] ?? '', 20);
$page = propre($brut['page'] ?? '', 80);
$arrivee = propre($brut['landing_page'] ?? '', 80);
$formulaire = propre($brut['formulaire'] ?? '', 20);
$emplacement = propre($brut['emplacement'] ?? '', 40);
$test = $jetonValide && ($_GET['action'] ?? '') === 'test';

if (!in_array($type, ['visite', 'lecture', 'cv', 'lead', 'prospect'], true)) {
    repondre(400);
}

// Les visites de contrôle faites après une mise en ligne ne comptent pas.
if (!$test && strncmp($source, 'verification_', 13) === 0) {
    repondre(202, ['ok' => true, 'ignore' => 'verification']);
}

// Nadir chez lui : rien ne compte, rien ne sonne.
if ($nadir && !$test) {
    repondre(202, ['ok' => true, 'ignore' => 'nadir']);
}

// Les compteurs du jour, pour le résumé du soir.
if (!$test) {
    modifier($donnees . '/jour-' . $jour . '.json', function (array &$e) use ($type, $canal) {
        $cle = $type === 'prospect' ? 'prospect_page' : $type;
        $e[$cle] = ($e[$cle] ?? 0) + 1;
        if ($type === 'visite') {
            $e['canaux'][$canal !== '' ? $canal : 'inconnu'] = ($e['canaux'][$canal !== '' ? $canal : 'inconnu'] ?? 0) + 1;
        }
        return null;
    });
}

$provenance = trim(implode(' · ', array_filter([
    $canal,
    $source !== '' && $source !== $canal ? $source : '',
    $campagne,
])));
$profil = $intention !== '' && $intention !== 'inconnue' ? $intention : '';
$prefixe = $test ? '[TEST] ' : '';

switch ($type) {
    case 'visite':
    case 'lecture':
        // Comptés pour le résumé, jamais notifiés un par un.
        repondre(202, ['ok' => true, 'compte' => true]);
        break;

    case 'lead':
        $titre = $formulaire === 'challenge' ? 'Nouveau problème soumis' : 'Nouveau message reçu';
        $lignes = array_filter([
            $provenance !== '' ? 'Venu de : ' . $provenance : '',
            $profil !== '' ? 'Profil : ' . $profil : '',
            $arrivee !== '' ? 'Arrivé sur : ' . $arrivee : '',
            'Le message est dans votre boîte mail.',
        ]);
        $ok = envoyerNtfy($ntfy, (string) $config['sujet'], $prefixe . $titre, implode("\n", $lignes), ['envelope_with_arrow'], 5);
        repondre($ok ? 200 : 502, ['ok' => $ok]);
        break;

    case 'cv':
        if (!$test && !plafondNotifications($donnees, $maintenant)) {
            repondre(202, ['ok' => true, 'ignore' => 'plafond']);
        }
        $lignes = array_filter([
            $page !== '' ? 'Depuis : ' . $page : '',
            $provenance !== '' ? 'Venu de : ' . $provenance : '',
            $profil !== '' ? 'Profil : ' . $profil : '',
        ]);
        $ok = envoyerNtfy($ntfy, (string) $config['sujet'], $prefixe . 'CV téléchargé', implode("\n", $lignes), ['page_facing_up'], 4);
        repondre($ok ? 200 : 502, ['ok' => $ok]);
        break;

    case 'prospect':
        // Une seule notification par prospect et par page, pendant dix minutes.
        $cle = $campagne . '|' . $source . '|' . $page;
        $qui = $campagne . '|' . $source;
        $nouveau = $test || modifier($donnees . '/jour-' . $jour . '.json', function (array &$e) use ($cle, $qui) {
            $vu = (int) ($e['prospects_vus'][$cle] ?? 0);
            if ($vu > time() - 600) {
                return false;
            }
            // Le résumé compte les prospects distincts du jour, pas les pages.
            if (empty($e['prospects_du_jour'][$qui])) {
                $e['prospect_visite'] = ($e['prospect_visite'] ?? 0) + 1;
                $e['prospects_du_jour'][$qui] = 1;
            }
            $e['prospects_vus'][$cle] = time();
            return true;
        });
        if (!$nouveau) {
            repondre(202, ['ok' => true, 'ignore' => 'deja_signale']);
        }
        if (!$test && !plafondNotifications($donnees, $maintenant)) {
            repondre(202, ['ok' => true, 'ignore' => 'plafond']);
        }
        $qui = $campagne !== '' ? $campagne : ($source !== '' ? $source : 'un prospect');
        $ok = envoyerNtfy(
            $ntfy,
            (string) $config['sujet'],
            $prefixe . 'Prospect sur votre site : ' . $qui,
            'Page : ' . ($page !== '' ? $page : '/') . "\nC’est le bon moment pour le relancer.",
            ['fire'],
            5
        );
        repondre($ok ? 200 : 502, ['ok' => $ok]);
        break;
}
