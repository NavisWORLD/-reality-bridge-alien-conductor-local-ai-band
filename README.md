# Reality Bridge // Alien Conductor

## Local AI Band + Real-Time Sing-and-Play Accompaniment

**Reality Bridge // Alien Conductor** is an open-source engineering project for turning a local computer, browser, or mobile device into a responsive collection of digital musicians that listen before deciding what to play.

The system is designed around human-coupled musical interaction: live voice, instrument, touch, and media signals are analyzed locally, converted into a shared musical state, and used by virtual musician agents to generate accompaniment in real time.

> **Core engineering idea:** Human → Perception → Musical State → Musician Decisions → Scheduled Sound → Human

The goal is not to hide uncertainty behind an “AI” label. Timing-critical behavior belongs in deterministic audio and DSP systems. Learned models are optional higher-level components. The current reference implementation and the expanded modular architecture are documented separately so readers can distinguish **working implementation** from **engineering roadmap**.

## Download v0.1.0

The cross-platform application release is published at [`v0.1.0`](https://github.com/NavisWORLD/-reality-bridge-alien-conductor-local-ai-band/releases/tag/v0.1.0).

| Platform | Release artifact | Status |
|---|---|---|
| Windows x64 | [`Reality-Bridge-Alien-Conductor-Setup-0.1.0-x64.exe`](https://github.com/NavisWORLD/-reality-bridge-alien-conductor-local-ai-band/releases/download/v0.1.0/Reality-Bridge-Alien-Conductor-Setup-0.1.0-x64.exe) | ✅ One-click NSIS installer |
| macOS Apple Silicon + Intel | [`Reality-Bridge-Alien-Conductor-0.1.0-universal.dmg`](https://github.com/NavisWORLD/-reality-bridge-alien-conductor-local-ai-band/releases/download/v0.1.0/Reality-Bridge-Alien-Conductor-0.1.0-universal.dmg) | ✅ Universal DMG |
| macOS app archive | [`Reality-Bridge-Alien-Conductor-0.1.0-universal.zip`](https://github.com/NavisWORLD/-reality-bridge-alien-conductor-local-ai-band/releases/download/v0.1.0/Reality-Bridge-Alien-Conductor-0.1.0-universal.zip) | ✅ `.app` archive |
| Android | [`Reality-Bridge-Alien-Conductor-Android-v0.1.0.apk`](https://github.com/NavisWORLD/-reality-bridge-alien-conductor-local-ai-band/releases/download/v0.1.0/Reality-Bridge-Alien-Conductor-Android-v0.1.0.apk) | ✅ Installable debug-signed APK |
| iOS Simulator | [`Reality-Bridge-Alien-Conductor-iOS-Simulator-v0.1.0.zip`](https://github.com/NavisWORLD/-reality-bridge-alien-conductor-local-ai-band/releases/download/v0.1.0/Reality-Bridge-Alien-Conductor-iOS-Simulator-v0.1.0.zip) | ✅ Compiled simulator `.app` |
| iPhone device package | [`Reality-Bridge-Alien-Conductor-iOS-Unsigned-v0.1.0.ipa`](https://github.com/NavisWORLD/-reality-bridge-alien-conductor-local-ai-band/releases/download/v0.1.0/Reality-Bridge-Alien-Conductor-iOS-Unsigned-v0.1.0.ipa) | ✅ Built unsigned IPA |

The iPhone device IPA is intentionally **unsigned**. Normal installation on a physical iPhone and App Store distribution require an Apple Developer certificate and provisioning profile owned by the publisher. Windows Authenticode signing, macOS Developer ID/notarization, and production Android store signing likewise require private publisher credentials and are not committed to this public repository.

The release pipeline is reproducible through [`.github/workflows/release-binaries.yml`](.github/workflows/release-binaries.yml). It verifies the pinned Sound Fixed III source, then builds Windows, macOS, Android, and iOS artifacts before publishing the GitHub Release.

## Engineering book

- **Read the complete open-source book online:** [`docs/book/README.md`](docs/book/README.md)
- **Download the Word edition:** [`docs/Reality_Bridge_Alien_Conductor_Local_AI_Band_Engineering_Book.docx`](docs/Reality_Bridge_Alien_Conductor_Local_AI_Band_Engineering_Book.docx)
- **Architecture reference:** [`ARCHITECTURE.md`](ARCHITECTURE.md)

The Word edition is reproducibly generated from the Markdown book source in this repository through GitHub Actions.

## What the project contains

The architecture separates the musical system into reusable projects so each component can operate alone or as part of a full local band:

| Module | Purpose |
|---|---|
| **Reality Bridge Core** | Clock, event protocol, musical world state, memory, harmony and shared contracts |
| **Reality Bridge Listener** | Pitch, onset, chroma, key, chord, tempo, timbre and phrase perception |
| **Reality Bridge Guitar** | Play-along physical-model / generative guitar |
| **Reality Bridge Piano** | Adaptive chord voicing, accompaniment and singer-following piano |
| **Reality Bridge Bass** | Harmonic and rhythmic bass agent |
| **Reality Bridge Drummer** | Groove, microtiming, fills and phrase-aware percussion |
| **Reality Bridge Vocal** | Harmony, phrase response and vocal-bandmate architecture |
| **Reality Bridge Granular** | Media-driven and granular texture instrument |
| **Reality Bridge Orbit** | Spatial / gestural performance instrument |
| **Reality Bridge Looper** | Event and audio-loop architecture |
| **Reality Bridge Conductor** | Arrangement, density, tension, interaction and instrument allocation |
| **Reality Bridge Band** | Full multi-agent local ensemble |

## Architecture

```text
Human performance / touch / media
                │
                ▼
       Audio + Input Kernel
                │
                ▼
       Musical Perception
 pitch • onset • chroma • key • chord
 tempo • phrase • timbre • energy
                │
                ▼
        Shared Musical World
 transport • harmony • human state
 section • memory • confidence
                │
                ▼
      Arranger / Conductor Layer
                │
     ┌──────────┼──────────┐
     ▼          ▼          ▼
 Guitarist   Pianist    Drummer
     ▼          ▼          ▼
 Bassist     Vocalist   Texture
     └──────────┼──────────┘
                ▼
       Performance Event Bus
                │
                ▼
       Master Musical Clock
                │
                ▼
 Synthesis / Sampling / Physical Models
                │
                ▼
       Mixer • FX • Safety
                │
                ▼
              Sound
                │
                └──────────────► Human
```

See [`ARCHITECTURE.md`](ARCHITECTURE.md) for the detailed engineering view.

## Reference implementation: what is already real

The Sound Fixed III browser lineage documented by this project already contains substantial local music-engineering machinery, including:

- Web Audio graph and interactive audio-context startup
- look-ahead musical scheduling
- microphone analysis without routing the microphone directly to speakers
- pitch estimation, chroma accumulation, key and chord inference
- onset and phrase tracking
- adaptive tempo estimation
- voice-following / call-and-response behaviors
- oscillator synthesis and percussion synthesis
- a Karplus-Strong-style physical-model guitar system
- alternate tunings, guitar-body personalities and sympathetic resonance logic
- generated harmony and voice-leading
- media audio/video analysis and media-to-music modulation
- granular playback / freeze concepts
- event-based loop recording
- conductor sections, motif memory and seeded generative behavior
- mobile-oriented audio unlock and panic behavior
- local state export / import and preference persistence

## Expanded architecture: what this repository specifies

The engineering book extends that reference implementation into a clean multi-project local-band architecture with independent musician agents, a shared `MusicalWorld`, event contracts, a single musical clock, human-adaptation memory, native C++ audio responsibilities, Python experimentation/model responsibilities, browser/mobile targets, and explicit testing metrics.

This expanded architecture is a **build specification and roadmap**, not a claim that every proposed learned or native component is already implemented in the browser reference file.

## Timing rule

The band must respond faster than language models think.

The project therefore separates three kinds of intelligence:

1. **Reflex brain** — audio rendering, pitch/onset observation, beat timing, ducking and panic; millisecond-sensitive.
2. **Musician brain** — next notes, chords, grooves, voicings and phrase responses; tens to hundreds of milliseconds.
3. **Composer brain** — longer-range form, style and planning; seconds can be acceptable and local generative models may be used.

No LLM belongs in the sample loop.

## Repository map

```text
.
├── README.md
├── LICENSE
├── CITATION.cff
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── ARCHITECTURE.md
├── package.json
├── capacitor.config.json
├── desktop/
│   └── main.cjs
├── app/
│   └── web/
│       ├── manifest.webmanifest
│       ├── sw.js
│       └── icons/
├── scripts/
│   ├── fetch-web-source.mjs
│   ├── prepare-native.mjs
│   └── smoke-test.mjs
├── mobile/
│   └── README.md
├── docs/
│   ├── Reality_Bridge_Alien_Conductor_Local_AI_Band_Engineering_Book.docx
│   ├── release/
│   │   └── RELEASE_NOTES.md
│   └── book/
│       ├── README.md
│       ├── 00-front-matter.md
│       ├── 01-system.md
│       ├── 02-real-time-kernel.md
│       ├── 03-listener.md
│       ├── 04-musicians.md
│       ├── 05-band-intelligence.md
│       ├── 06-implementation.md
│       ├── 07-testing-validation.md
│       └── 08-shipping-open-project.md
├── examples/
├── tests/
└── .github/
    └── workflows/
        ├── publish-word-book.yml
        └── release-binaries.yml
```

## Engineering principles

- **One master musical clock.** Independent musician timers create drift.
- **Confidence is data.** Key/chord guesses must carry confidence rather than being treated as facts.
- **Audio work never waits for AI.** No network request, LLM, filesystem operation or UI task belongs in a real-time render callback.
- **Musicians negotiate space.** Arrangement considers register, density, rhythm, duration, dynamics, stereo placement and timbre.
- **Human performance remains the center.** The machine listens and reacts rather than forcing the performer onto a rigid backing track.
- **Claims stay measurable.** Latency, cents error, tempo error, chord accuracy, collisions, interruptions, repetition and response timing should be tested.

## Open-source license

This repository is released under the **MIT License**. See [`LICENSE`](LICENSE).

Copyright © 2026 Cory Davis (NavisWORLD).

## Citation

Citation metadata is provided in [`CITATION.cff`](CITATION.cff). If this project contributes to research, teaching, creative work, or another engineering implementation, attribution is appreciated.

## Contributing

Contributions are welcome. Start with [`CONTRIBUTING.md`](CONTRIBUTING.md), preserve the distinction between measured behavior and speculative roadmap items, and include tests or evidence for engineering claims whenever possible.

---

**Project definition:** Alien Conductor turns the computer from a device that plays music when commanded into a collection of local digital musicians that listen before deciding what to play.
