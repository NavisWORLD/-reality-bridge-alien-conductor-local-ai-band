# Reality Bridge Alien Conductor v0.1.0

First packaged application release of the Sound Fixed III instrument.

## Binaries

- Windows x64 one-click NSIS `.exe` installer
- macOS universal `.dmg` and `.zip` containing the `.app`
- Android installable debug-signed `.apk`
- iOS Simulator `.app` archive
- iOS unsigned device `.ipa` package for signing by an Apple Developer account

## Included instrument

- generative conductor
- Live Voice local microphone analysis and adaptive accompaniment
- Gravity Guitar physical-model-style instrument
- local media analysis/transmutation
- orbit and void performance surfaces
- event looping, state persistence, audio test and panic controls

## Signing note

Community binaries produced by the public CI pipeline are not commercial code-signed/notarized. Windows Authenticode, macOS Developer ID/notarization, Play Store signing and physical-iPhone/App Store distribution require publisher credentials and should be provided through encrypted CI secrets, never committed publicly.
