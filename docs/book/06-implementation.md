# 28. Browser and iPhone Implementation

The single-file HTML build remains valuable because it is portable, inspectable, and install-free. It can host Web Audio synthesis, touch instruments, microphone analysis, local media decoding, event loops, recording, visualization, and preference storage.

Recommended browser modules after extraction: audio.js, scheduler.js, events.js, world.js, listener.js, harmony.js, guitar-renderer.js, guitar-agent.js, piano-renderer.js, piano-agent.js, bass-agent.js, drums.js, vocal-agent.js, media.js, granular.js, looper.js, conductor.js, state.js, ui.js.

iPhone requirements include user-gesture audio unlock, HTTPS or localhost for microphone APIs, visibility-state handling, safe-area-aware controls, large touch targets, careful memory use, and output diagnostics. The reference browser build already includes gesture-based audio recovery and visibility handling that should be preserved.

# 29. Native C++ and Python Architecture

The ultimate desktop version should move hard real-time audio to a native layer and let Python own slower intelligence and research workflows.

| **C++ / real-time layer**        | **Python / research and intelligence layer** |
|----------------------------------|----------------------------------------------|
| Audio device and callback        | Feature experiments and offline analysis     |
| Sample buffers and DSP graph     | Model inference where latency permits        |
| Physical models and samplers     | Training and dataset tooling                 |
| MIDI and low-latency event queue | High-level agent planning                    |
| Master clock and rendering       | Evaluation, logging, notebooks, benchmarks   |
| Mixer, limiter, effects          | Style/motif models and composition research  |

Python may schedule future musical events but must not be required to finish before the next audio buffer can play. A lock-free or bounded event queue can bridge processes. Every event should be timestamped relative to the master audio clock.

# 30. Recommended Repository Architecture

REALITY_BRIDGE/  
├── apps/  
│ ├── band/  
│ ├── guitar/  
│ ├── piano/  
│ ├── drummer/  
│ ├── bass/  
│ └── voice/  
├── core/  
│ ├── clock/  
│ ├── events/  
│ ├── world/  
│ ├── harmony/  
│ ├── phrase/  
│ └── memory/  
├── audio/  
│ ├── engine/  
│ ├── mixer/  
│ ├── guitar_model/  
│ ├── piano_renderer/  
│ ├── percussion/  
│ ├── synth/  
│ └── effects/  
├── perception/  
│ ├── pitch/  
│ ├── onset/  
│ ├── chroma/  
│ ├── key/  
│ ├── chord/  
│ ├── tempo/  
│ └── phrase/  
├── agents/  
│ ├── conductor/  
│ ├── guitarist/  
│ ├── pianist/  
│ ├── bassist/  
│ ├── drummer/  
│ └── vocalist/  
├── models/  
├── presets/  
├── recordings/  
├── examples/  
├── tests/  
└── docs/

The repository should make the smallest useful path obvious. Someone cloning only the guitar example should not need the media analyzer, video system, vocal renderer, or composer model.

# 31. Interfaces and Data Schemas

Use boring, stable interfaces. Clever class inheritance is less valuable than events and state that can be serialized across JavaScript, Python, C++, and MIDI.

HumanEvent {  
timestamp,  
type,  
pitch,  
velocity,  
duration,  
confidence,  
source  
}  
  
ChordEstimate {  
timestamp,  
root,  
quality,  
tones[],  
confidence,  
alternatives[]  
}  
  
BandEvent {  
source,  
type,  
musicalTime,  
audioTime,  
payload,  
confidence,  
eventId  
}

Schemas should include explicit version numbers. Unknown fields should be ignored safely where possible. Required timing units must be documented; “time = 1.0” is useless unless the unit and clock domain are defined.

# 32. State, Sessions, and Persistence

A session file should reproduce a musical world as far as the installed renderers and models allow. Store seed, engine version, transport, harmony, conductor state, musician presets, mixer/effects, loops, motifs, listener configuration, and model identifiers.

RBSession {  
schemaVersion,  
engineVersion,  
seed,  
transport,  
harmony,  
structure,  
listener,  
musicians,  
conductor,  
mixer,  
effects,  
loops,  
motifs,  
models,  
mediaReferences  
}

Never silently reinterpret old state files. Provide v1→v2 and v2→v3 migrations, or clearly reject unsupported versions. The browser ancestor already checks state versions; the repository version should formalize that practice.

PART VII — TESTING AND VALIDATION
