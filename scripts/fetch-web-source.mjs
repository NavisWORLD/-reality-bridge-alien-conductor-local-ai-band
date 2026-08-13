import fs from 'node:fs';
import crypto from 'node:crypto';
import path from 'node:path';

const SOURCE_REPO = 'NavisWORLD/REALITY_BRIDGE_ALIEN_CONDUCTOR_III_SOUND_FIXED';
const SOURCE_COMMIT = '3a32a4b536466386d9651fbe02e717aa175962c2';
const SOURCE_FILE = 'REALITY_BRIDGE_ALIEN_CONDUCTOR_III_SOUND_FIXED.html';
const EXPECTED_GIT_BLOB = '93ca29e0150546910663ba2b4c5886a8b5ccc0bb';
const url = `https://raw.githubusercontent.com/${SOURCE_REPO}/${SOURCE_COMMIT}/${SOURCE_FILE}`;

const response = await fetch(url, { headers: { 'user-agent': 'reality-bridge-release-builder/0.1.0' } });
if (!response.ok) throw new Error(`Could not fetch pinned Sound Fixed III source: ${response.status} ${response.statusText}`);
const bytes = Buffer.from(await response.arrayBuffer());
const gitHeader = Buffer.from(`blob ${bytes.length}\0`);
const blobSha = crypto.createHash('sha1').update(gitHeader).update(bytes).digest('hex');
if (blobSha !== EXPECTED_GIT_BLOB) {
  throw new Error(`Pinned source integrity failure: expected ${EXPECTED_GIT_BLOB}, got ${blobSha}`);
}
let html = bytes.toString('utf8');
for (const marker of ['AWAKEN THE CONDUCTOR','LIVE VOICE // CO-MUSICIAN','GRAVITY GUITAR','class VoiceCompanion','class Conductor']) {
  if (!html.includes(marker)) throw new Error(`Pinned source is missing required marker: ${marker}`);
}

const headAdd = `\n<meta name="theme-color" content="#07100f">\n<meta name="mobile-web-app-capable" content="yes">\n<meta name="apple-mobile-web-app-capable" content="yes">\n<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">\n<meta name="apple-mobile-web-app-title" content="Alien Conductor">\n<link rel="manifest" href="./manifest.webmanifest">\n`;
const bodyAdd = `\n<script>\n(() => {\n  const secure = location.protocol === 'https:' || location.hostname === 'localhost';\n  if ('serviceWorker' in navigator && secure) {\n    addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));\n  }\n})();\n</script>\n`;
html = html.replace('</head>', headAdd + '</head>');
html = html.replace('</body>', bodyAdd + '</body>');
const out = path.join('app','web','index.html');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, html);
console.log(`Prepared ${out} from ${SOURCE_REPO}@${SOURCE_COMMIT.slice(0,12)} (${bytes.length} source bytes, verified blob ${blobSha}).`);
