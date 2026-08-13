import fs from 'node:fs';
const html = fs.readFileSync('app/web/index.html','utf8');
const required = [
  'AWAKEN THE CONDUCTOR',
  'LIVE VOICE // CO-MUSICIAN',
  'GRAVITY GUITAR',
  'class VoiceCompanion',
  'class GravityGuitar',
  'class MediaEngine',
  'class Conductor',
  'class Scheduler',
  'navigator.mediaDevices?.getUserMedia',
  'manifest.webmanifest'
];
const missing = required.filter(x => !html.includes(x));
if (missing.length) {
  console.error('Missing release-critical markers:', missing);
  process.exit(1);
}
const manifest = JSON.parse(fs.readFileSync('app/web/manifest.webmanifest','utf8'));
if (manifest.display !== 'standalone' || !manifest.icons?.length) throw new Error('PWA manifest incomplete');
JSON.parse(fs.readFileSync('capacitor.config.json','utf8'));
JSON.parse(fs.readFileSync('package.json','utf8'));
console.log(`Release smoke test passed. HTML bytes: ${Buffer.byteLength(html)}; app: ${manifest.name}`);
