# Mobile builds

Reality Bridge Alien Conductor uses Capacitor to wrap the same local-first Sound Fixed III instrument on Android and iOS.

## Android

```bash
npm install
npm run prepare:web
npx cap add android
node scripts/prepare-native.mjs android
npx cap sync android
cd android
./gradlew assembleDebug
```

The public CI release produces an installable debug-signed APK. A stable Play Store / production signature should be supplied as a private repository secret rather than committed to source control.

## iOS

```bash
npm install
npm run prepare:web
npx cap add ios
node scripts/prepare-native.mjs ios
npx cap sync ios
npx cap open ios
```

GitHub Actions builds both an iPhone Simulator `.app` archive and an unsigned device `.ipa` payload. A physical-iPhone/App Store IPA must be signed using an Apple Developer certificate and provisioning profile owned by the publisher.

## PWA

`app/web` contains a manifest and service worker. The release preparation step injects those into the pinned Sound Fixed III source, allowing the instrument to run as a standalone home-screen web application when served over HTTPS.
