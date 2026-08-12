# 1. Definition: What Alien Conductor Is

Alien Conductor is best understood as three systems combined: an instrument, a musical perception system, and a musical decision system. A conventional digital instrument waits for an explicit command such as “play C4 now.” Alien Conductor is designed to infer musical context from a performer and then decide how to participate.

The core behavior is not “generate a song from a prompt.” It is a closed musical feedback loop:

HUMAN → PERCEPTION → MUSICAL STATE → DECISION → SOUND → HUMAN → ...

A singer may produce G4. The listener estimates pitch, energy, tonal context, chord candidates, tempo, and phrase state. A guitar agent may choose to hold a low voicing instead of duplicating the singer. When the phrase ends, a piano or vocal agent may answer. The human hears the response and changes the next phrase. The machine listens again.

The reference Sound Fixed III implementation already contains the ancestry of this architecture: Web Audio synthesis and routing, a look-ahead scheduler, a physical-model-style guitar, microphone analysis, pitch and phrase memory, key/chord/tempo inference, generated accompaniment, media analysis, granular texture, event looping, recording, state persistence, and mobile audio-unlock handling.

| **Engineering distinction —** The current browser build is a local adaptive generative music system. It uses real-time DSP, music-theory heuristics, confidence scoring, memory, and rules. The full multi-agent “AI band” described in this book is the modular architecture that grows from that foundation and can optionally add trained local models. |
|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

# 2. Prime Design Principles

| **Principle**                        | **Engineering consequence**                                                                                                   |
|--------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Real-time first                      | No high-latency model is allowed to block audio output or the master clock.                                                   |
| One shared musical reality           | Pitch, harmony, tempo, phrase state, and confidence are inferred once and shared with every musician.                         |
| Separate perception from performance | A listener reports what it hears. Instruments decide what to play. Renderers make sound.                                      |
| Confidence is data                   | The system represents uncertainty explicitly instead of turning every guess into a fact.                                      |
| Musical space matters                | A good bandmate often decides not to play. Density, register, rhythm, and phrase activity are first-class variables.          |
| Modularity over monoliths            | A guitar, piano, drummer, bassist, or vocal companion must be able to run alone.                                              |
| Local operation by default           | Microphone and media processing should be possible without sending private performance data to a remote service.              |
| Seeded generative behavior           | Stochastic behavior should be reproducible for debugging, research, and shareable musical worlds.                             |
| Graceful degradation                 | If a model, microphone feature, or media decoder fails, the core instrument should continue working.                          |
| Instrument honesty                   | The UI should show measured confidence and actual implementation state instead of implying capabilities that are not present. |

# 3. Complete Architecture

The complete system is a pipeline with a feedback loop. Inputs become features; features become a shared musical world; musicians read the world and propose events; the conductor resolves conflicts; the scheduler and renderers turn accepted events into sound.

**Figure:** Architecture diagram (see the Word edition for the rendered figure).

Figure 1. Full local-band architecture. Every musician reads one shared musical state; audio rendering remains downstream of high-level decisions.

The architecture should be decomposed into these primary packages:

- Audio Kernel — device/output graph, DSP buses, recording, panic
- Clock and Scheduler — musical time and look-ahead event scheduling
- Listener — signal features and musical inference
- Musical World — canonical shared state with confidence and history
- Harmony Engine — scale, key, chord, voicing, and progression helpers
- Musician Agents — guitar, piano, bass, drums, vocal
- Conductor — density, sections, tension, instrument allocation, conflict resolution
- Renderers — physical models, samplers, synthesis, effects
- Persistence — sessions, presets, loops, motifs, migration
- UI and Telemetry — controls, diagnostics, visualization

# 4. The Shared Musical World and Confidence

The MusicalWorld object is the single source of truth for current musical context. Individual musicians may maintain private memory, but they should not each run an independent full key/chord/tempo detector unless an experiment explicitly requires competing hypotheses.

MusicalWorld {  
transport: { bpm, beat, bar, subdivision, phase, confidence },  
harmony: { root, mode, scale, chord, tones\[\], confidence },  
human: { active, phraseActive, pitch, energy, register,  
brightness, articulation, motion, onsetRate },  
structure: { section, tension, density, sectionAge },  
band: { guitarActivity, pianoActivity, bassActivity,  
drumActivity, vocalActivity },  
memory: { notes\[\], motifs\[\], chords\[\], phrases\[\] }  
}

Confidence should travel with every inferred state. A chord detector may return Am at 0.81 and C6 at 0.55. The bassist can establish the root strongly when confidence is high, use root/fifth ambiguity when confidence is medium, and wait when confidence is low.

| **Confidence** | **Recommended musical behavior**                                   |
|----------------|--------------------------------------------------------------------|
| \> 0.80        | Commit confidently; full voicings and bass roots are reasonable.   |
| 0.55-0.80      | Use reversible choices; omit risky extensions; keep voicings open. |
| 0.30-0.55      | Prefer ambiguous support: roots/fifths, drones, sparse percussion. |
| \< 0.30        | Listen, reduce density, and avoid forcing a tonal interpretation.  |

PART II — THE REAL-TIME KERNEL
