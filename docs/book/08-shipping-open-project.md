# 37. Standalone Play-Along Guitar

Minimum dependency stack: AudioEngine, Clock, Listener, MusicalWorld, HarmonyEngine, PhraseMemory, GuitarRenderer, GuitarAgent. The first public demo should allow a user to sing or play into the microphone, watch detected pitch/key/chord/tempo, and hear an adaptive guitar choose sparse voicings and respond after phrase endings.

Required controls: Awaken, Start Listening, Sensitivity, Trust/Confidence Threshold, Guitar Mode, Density, Register, Tuning, Body, Brightness, Damping, Sympathy, Space, Hold Harmony, Panic, and Record. Optional controls should not obscure this basic path.

# 38. Standalone Play-Along Piano

Minimum stack: AudioEngine, Clock, Listener, MusicalWorld, HarmonyEngine, PhraseMemory, PianoRenderer, PianoAgent. The first version may use a lightweight synth renderer; the architecture must permit a sampled piano later without changing the agent.

Expose a visible current chord and the chosen voicing. That makes the instrument educational as well as performative. A “why this voicing?” diagnostic can show register separation, movement score, chord tones, and confidence.

# 39. Rhythm Section Package

A combined Bass + Drums app can listen to taps, singing, guitar, or MIDI. The drummer owns groove; the bassist owns harmonic foundation; both read one shared beat phase and harmony state. This package is useful even when guitar and piano are absent.

Expose style presets but keep the underlying controls inspectable: swing, density, fill rate, ghost notes, bass root loyalty, approach-tone rate, humanization, and phrase-aware simplification.

# 40. Vocal and Experimental Instrument Package

The Vocal package combines Listener, PhraseMemory, Harmony Engine, VocalAgent, and a renderer adapter. The Experimental package contains Orbit, Granular, Media-to-Music, modulation routing, and gesture controls. These tools should be independently usable so experimental features do not destabilize the core band.

# 41. Full Local Band

The complete app imports every subsystem and presents one simple experience: choose which musicians are present, choose how assertive they are, press Listen, and perform.

LISTENER  
+  
CONDUCTOR  
+  
GUITAR + PIANO + BASS + DRUMS + VOCAL  
+  
LOOPER + MEDIA + GRANULAR (optional)  
+  
MASTER AUDIO ENGINE  
=  
LOCAL AI BAND

The user experience should remain simple even as the architecture grows:

AWAKEN  
  
WHAT SHOULD PLAY?  
[✓] GUITAR [✓] PIANO [✓] BASS [✓] DRUMS [ ] VOCAL  
  
HOW SHOULD THEY PLAY?  
[ LISTEN ] [ FOLLOW ] [ JAM ] [ FULL BAND ]  
  
HEARD: E4  
KEY: A MINOR · 78%  
CHORD: Am7 · 82%  
TEMPO: 91 BPM · 71%  
PHRASE: ACTIVE

# 42. Current Reference Build vs. Expansion Roadmap

The Sound Fixed III browser build already provides a meaningful functional base. It should be presented publicly with a clear line between implemented behavior and planned architecture.

| **Area**    | **Present in reference browser build**                                      | **Expanded architecture in this book**                                      |
|-------------|-----------------------------------------------------------------------------|-----------------------------------------------------------------------------|
| Audio       | Web Audio master graph, generated instruments, effects, recording, panic    | Native-capable engine, per-musician buses, stricter event/render separation |
| Timing      | Look-ahead scheduler and shared step dispatch                               | Unified cross-language master clock/event protocol                          |
| Listening   | Pitch, energy, spectrum features, onsets, key/chord/tempo/phrase heuristics | Replaceable perception modules; optional trained local models               |
| Guitar      | Physical-model-style six-string instrument, tunings, body shaping, sympathy | Dedicated GuitarAgent, voicing solver, independent application              |
| Piano       | General synth tones available, but not a dedicated piano system             | PianoRenderer + voicing solver + PianoAgent                                 |
| Bass        | Simple generated low accompaniment behavior                                 | Autonomous BassAgent with groove and approach logic                         |
| Drums       | Synthesized kick/snare/hat accompaniment                                    | DrummerAgent, groove models, fills, shared GrooveState                      |
| Vocal       | Harmony ghost and call/response synthesized tones                           | Renderer-agnostic VocalAgent and optional local singing synthesis           |
| Media       | Local audio/video feature analysis, transmutation, granular texture         | Standalone media and modulation packages with stable event interfaces       |
| Conductor   | Seeded section/motif/chord generation and auto-guitar behavior              | Full arranger, conflict resolution, density/tension and musician allocation |
| Persistence | Local preferences and versioned state import/export                         | Portable RBSession schema and formal migrations                             |

The engineering priority is extraction before expansion: separate AudioEngine, Clock, EventBus, MusicalWorld, Listener, HarmonyEngine, and PhraseMemory from UI code; extract GravityGuitar into renderer + agent; then add piano, bass, drums, vocal, and conductor modules around the stable core.

APPENDICES

# Appendix A — Core Equations

| **Concept**               | **Equation / approximation**   |
|---------------------------|--------------------------------|
| RMS                       | sqrt((1/N) · Σx_i²)            |
| Spectral centroid         | Σ(f_k X_k) / ΣX_k              |
| Spectral flux             | Σ max(0, X_t(k) - X_(t-1)(k)) |
| MIDI from frequency       | 69 + 12 log2(f/440)            |
| Frequency from MIDI       | 440 · 2^((m-69)/12)            |
| Autocorrelation pitch     | f0 ≈ sampleRate / bestLag      |
| Tempo from onset interval | BPM = 60 / Δt                  |
| Cents error               | 1200 log2(f_est / f_true)      |
| Plucked-string delay      | delayLength ≈ sampleRate / f   |

# Appendix B — Suggested Event Schema

{  
"schemaVersion": 1,  
"eventId": "uuid-or-monotonic-id",  
"source": "guitar-agent",  
"type": "STRUM",  
"musicalTime": {  
"bar": 12,  
"beat": 3,  
"subdivision": 2  
},  
"audioTime": 184.552,  
"confidence": 0.88,  
"payload": {  
"direction": 1,  
"velocity": 0.61,  
"pitches": [45, 52, 57, 61, 64]  
}  
}

# Appendix C — Master Build Checklist

☐ Audio output initializes from a user gesture and can produce a deterministic test tone.

☐ Master graph has safe gain limits, dynamics, panic, and recording tap.

☐ One scheduler owns musical time and can schedule future events accurately.

☐ Listener reports RMS, pitch, onset, chroma, key, chord, tempo, phrase, and confidence.

☐ MusicalWorld publishes an immutable or snapshot-friendly shared state.

☐ Gravity Guitar works standalone before any band logic is added.

☐ GuitarAgent can listen, support, wait, and answer phrase endings.

☐ PianoRenderer and PianoAgent work independently of Gravity Guitar.

☐ Bass and Drums share a stable GrooveState and master clock.

☐ VocalAgent outputs renderer-agnostic vocal events.

☐ Conductor can reduce density and reject conflicting agent proposals.

☐ Every subsystem has deterministic unit tests where possible.

☐ Latency and confidence are visible in engineering diagnostics.

☐ Sessions contain schema and engine versions and support migrations.

☐ Examples run without requiring the full monolithic application.

☐ Public documentation distinguishes current implementation from roadmap.

# Appendix D — Glossary

| **Term**              | **Meaning**                                                                                          |
|-----------------------|------------------------------------------------------------------------------------------------------|
| Agent                 | A decision module representing one musician or musical role.                                         |
| Audio clock           | The real-time clock used to schedule rendered sound.                                                 |
| Chroma                | Twelve-dimensional pitch-class energy representation with octave removed.                            |
| Conductor             | The module that controls arrangement, density, roles, sections, and conflicts.                       |
| Confidence            | A numeric representation of uncertainty attached to an inference.                                    |
| Event bus             | The normalized channel through which musical actions are communicated.                               |
| Look-ahead scheduling | Planning events slightly before they occur and scheduling them against the audio clock.              |
| Musical World         | The shared canonical snapshot of transport, harmony, human state, structure, band state, and memory. |
| Onset                 | An estimated beginning of a new acoustic/musical event.                                              |
| Phrase                | A temporally bounded musical statement, often separated by silence or reduced activity.              |
| Renderer              | A subsystem that turns musical events into actual sound.                                             |
| Voicing               | The register and spacing chosen for chord tones.                                                     |
| Voice leading         | Choosing consecutive notes/chords to minimize unnecessary movement and preserve musical continuity.  |

# Appendix E — Public README Template

A repository can use the following condensed public description:

# Reality Bridge / Alien Conductor  
  
Alien Conductor is an experimental local, real-time adaptive music system. It listens to a performer, estimates musical context, maintains a shared musical state, and uses modular musician agents to generate accompaniment.  
  
The project is designed around a strict separation between:  
- real-time audio and timing,  
- musical perception,  
- musician decision logic,  
- synthesis/rendering,  
- and optional learned local models.  
  
The reference browser instrument already demonstrates local Web Audio synthesis, live pitch/key/chord/tempo/phrase analysis, physical-model guitar behavior, generative accompaniment, media analysis, looping, recording, and state persistence.  
  
The repository roadmap modularizes those components into standalone Guitar, Piano, Bass, Drums, Vocal, Listener, Conductor, Granular, Orbit, Looper, and Full Band packages.  
  
No cloud service is fundamentally required for the core architecture.

# Closing: The Core Idea

The essential idea is simple even though the engineering is not: the computer should become a musician that listens before deciding what to play.

A human performs. The listener measures. The Musical World updates. The conductor decides how much space exists. Independent musicians propose responses. The scheduler places accepted events into the future audio timeline. The renderer makes sound. The human hears the result and changes the next performance. The loop repeats.

Human → Perception → Musical State → Decision → Sound → Human

That feedback loop is the heart of Alien Conductor and the reason the project can be separated into many useful open tools rather than remaining one monolithic application.
