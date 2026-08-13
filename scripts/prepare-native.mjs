import fs from 'node:fs';
import path from 'node:path';

const target = process.argv[2];
if (!['android','ios'].includes(target)) {
  console.error('Usage: node scripts/prepare-native.mjs android|ios');
  process.exit(2);
}

if (target === 'android') {
  const manifest = path.join('android','app','src','main','AndroidManifest.xml');
  let xml = fs.readFileSync(manifest, 'utf8');
  const perms = [
    '<uses-permission android:name="android.permission.RECORD_AUDIO" />',
    '<uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />'
  ];
  for (const perm of perms) {
    if (!xml.includes(perm)) xml = xml.replace(/<manifest([^>]*)>/, m => `${m}\n    ${perm}`);
  }
  fs.writeFileSync(manifest, xml);
  console.log('Patched Android microphone/audio permissions.');
}

if (target === 'ios') {
  const plist = path.join('ios','App','App','Info.plist');
  let xml = fs.readFileSync(plist, 'utf8');
  if (!xml.includes('NSMicrophoneUsageDescription')) {
    xml = xml.replace('</dict>', '  <key>NSMicrophoneUsageDescription</key>\n  <string>Reality Bridge uses microphone input only when you enable Live Voice so it can analyze pitch, timing, energy, and harmony locally on your device.</string>\n</dict>');
  }
  fs.writeFileSync(plist, xml);
  console.log('Patched iOS microphone usage description.');
}
