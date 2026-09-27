# Reality Bridge // Alien Conductor

## Local AI Band + Real-Time Sing-and-Play Accompaniment

**Reality Bridge // Alien Conductor** is an open-source engineering and research project for turning a local computer, browser, or mobile device into a responsive collection of digital musicians that listen before deciding what to play.

The system is designed around human-coupled musical interaction: live voice, instrument, touch, and media signals are analyzed locally, converted into a shared musical state, and used by virtual musician agents to generate accompaniment in real time.

> **Core engineering idea:** Human → Perception → Musical State → Musician Decisions → Scheduled Sound → Human

## Open-source rights and provenance

Copyright © 2026 Cory Shane Davis / NavisWORLD.

On adoption of this prospective transition, Cory-owned original software and documentation included in the new release are licensed under [Apache License 2.0](LICENSE) except individually marked components. It permits commercial use, modification and redistribution under its conditions. Copyright stays with its author. Other people's code, models, datasets, samples and external performances have their own terms.

The original v0.1.0 MIT release remains MIT. The subsequent source-available period remains a distinct historical grant. See [LICENSE_HISTORY.md](LICENSE_HISTORY.md), [COMMERCIAL_RIGHTS.md](COMMERCIAL_RIGHTS.md) and [NOTICE](NOTICE).

## Historical v0.1.0 download

The cross-platform application release remains available at [`v0.1.0`](https://github.com/NavisWORLD/-reality-bridge-alien-conductor-local-ai-band/releases/tag/v0.1.0). That historical release keeps its historical MIT terms.

| Platform | Release artifact | Status |
|---|---|---|
| Windows x64 | `Reality-Bridge-Alien-Conductor-Setup-0.1.0-x64.exe` | One-click NSIS installer |
| macOS Apple Silicon + Intel | `Reality-Bridge-Alien-Conductor-0.1.0-universal.dmg` | Universal DMG |
| macOS app archive | `Reality-Bridge-Alien-Conductor-0.1.0-universal.zip` | `.app` archive |
| Android | `Reality-Bridge-Alien-Conductor-Android-v0.1.0.apk` | Installable debug-signed APK |
| iOS Simulator | `Reality-Bridge-Alien-Conductor-iOS-Simulator-v0.1.0.zip` | Compiled simulator `.app` |
| iPhone device package | `Reality-Bridge-Alien-Conductor-iOS-Unsigned-v0.1.0.ipa` | Built unsigned IPA |

The iPhone device IPA is intentionally unsigned. Physical-device and store distribution require publisher signing credentials that are not committed to this repository.

## Engineering book and architecture

- [`docs/book/README.md`](docs/book/README.md)
- [`docs/Reality_Bridge_Alien_Conductor_Local_AI_Band_Engineering_Book.docx`](docs/Reality_Bridge_Alien_Conductor_Local_AI_Band_Engineering_Book.docx)
- [`ARCHITECTURE.md`](ARCHITECTURE.md)

Historical documentation may describe the earlier MIT/open-source generation. Rights for the exact copy or revision used are determined by its applicable license and the chronology in `LICENSE_HISTORY.md`.

## What the project contains

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

## Reference implementation

The browser lineage contains local music-engineering machinery including Web Audio routing, look-ahead musical scheduling, microphone analysis, pitch estimation, chroma/key/chord inference, onset and phrase tracking, adaptive tempo estimation, call-and-response behavior, oscillator/percussion synthesis, Karplus-Strong-style guitar modeling, generated harmony, media analysis, granular concepts, event-based loop recording, motif memory, seeded generative behavior, mobile audio unlock, local state export/import, and preference persistence.

The expanded architecture specifies a multi-project local-band design with independent musician agents, a shared musical world, event contracts, a single musical clock, adaptive memory, native audio responsibilities, Python experimentation/model responsibilities, browser/mobile targets, and explicit testing metrics.

## Timing rule

The band must respond faster than language models think.

1. **Reflex brain** - audio rendering, pitch/onset observation, beat timing, ducking and panic.
2. **Musician brain** - next notes, chords, grooves, voicings and phrase responses.
3. **Composer brain** - longer-range form, style and planning.

No LLM belongs in the sample loop.

## Engineering principles

- One master musical clock.
- Confidence is data.
- Audio work never waits for AI.
- Musicians negotiate space.
- Human performance remains the center.
- Claims stay measurable.
- Public provenance and current commercial rights are kept separate and explicit.

## Citation

Citation metadata is provided in [`CITATION.cff`](CITATION.cff). Citation or attribution does not itself grant reuse or commercial rights beyond the license governing the exact material used.

## Contributing

Read [`CONTRIBUTING.md`](CONTRIBUTING.md) before submitting anything. The protected current generation does not automatically accept copyrightable outside contributions without an appropriate written rights agreement.

---

**Project definition:** Alien Conductor turns the computer from a device that plays music when commanded into a collection of local digital musicians that listen before deciding what to play.
