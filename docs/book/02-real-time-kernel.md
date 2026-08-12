# 5. Audio Engine and Master Graph

The audio engine is the lowest-level musical authority. It owns the audio context or native device, shared buses, master processing, node lifetime, safe gain limits, and recording taps. Nothing above this layer should directly write to the hardware output.

instrument buses  
↓  
per-bus gain / panning  
↓  
master filter / EQ  
↓  
dynamics compressor  
↓  
limiter or safety ceiling  
↓  
master gain  
├──→ analyzer / telemetry  
├──→ recording destination  
└──→ speakers / headphones

The browser ancestor constructs a master low-pass filter, dynamics compressor, master gain, analyzer, generated-instrument bus, source-media bus, delay/feedback path, speaker destination, and optional MediaStream recording destination. It also tracks active nodes so a panic operation can stop and disconnect them.

A production engine should expose a narrow API: awaken, ensureRunning, scheduleNote, schedulePercussion, setBusGain, setEffectParameter, recordStart, recordStop, panic, and diagnostics. Musician agents should emit events, not manipulate arbitrary Web Audio nodes.

# 6. Timing, Scheduler, and Five Loops

The band needs several time domains because audio, perception, musical choice, and composition happen at different speeds. A single giant AI loop is a design error.

**Figure:** Architecture diagram (see the Word edition for the rendered figure).

Figure 2. Timing domains. Slow intelligence may influence future music but cannot block the sample-accurate path.

The reference scheduler uses a short JavaScript timer to repeatedly look ahead into the AudioContext timeline. While the scheduling cursor is inside the look-ahead horizon, it dispatches future 16th-note steps and advances the next audio time. This is superior to “play a note whenever setInterval fires” because Web Audio can honor precise future timestamps even when the UI thread jitters.

while nextTime \< audioClock + lookahead:  
dispatch(step, nextTime)  
step += 1  
nextTime += secondsPerQuarter / 4

There must be one master clock. The drummer, piano, guitar, and bass must not own independent timers. Their musical individuality belongs in event choice and microtiming, not separate unsynchronized clocks.

# 7. Performance Event Bus

A normalized event bus decouples musical intelligence from sound production. A browser musician, Python musician, native C++ renderer, or MIDI hardware output can therefore participate in the same band.

{  
"type": "note",  
"source": "piano",  
"pitch": 64,  
"velocity": 0.62,  
"startBeat": 32.5,  
"durationBeats": 0.5,  
"confidence": 0.91  
}

Core event families: NOTE, CHORD, STRUM, PLUCK, DRUM, PEDAL, AUTOMATION, TEMPO, KEY, SECTION, PHRASE_START, PHRASE_END, LOOP, PANIC. Every event should carry either audio time, musical time, or a resolvable mapping between them.

A musician contract can be as small as:

observe(worldSnapshot)  
plan(horizon)  
emit(events)  
reset()  
serialize()  
deserialize()

# 8. Latency, Safety, and Mobile Boot

A responsive accompaniment system must account for capture latency, analysis window length, decision time, future scheduling, and output buffering. The UI should expose measured or estimated latency instead of hiding it.

| **Stage**         | **Typical target / rule**                                                         |
|-------------------|-----------------------------------------------------------------------------------|
| Input capture     | Device-dependent; minimize unnecessary processing.                                |
| Feature window    | Roughly 10-40 ms for fast transients; longer windows may improve pitch stability. |
| Reflex decision   | Prefer \<10 ms once a feature frame is available.                                 |
| Musician planning | Tens to hundreds of milliseconds is acceptable if scheduled ahead.                |
| Composer planning | Seconds are acceptable because it should target future bars/sections.             |
| Audio callback    | Never block on network, disk, model loading, or UI work.                          |

Mobile browsers require explicit user gestures to unlock audio. The robust order is: user touches AWAKEN; create the audio context; connect the graph; resume it; prime a short output; confirm a running state; only then expose live instrument controls. Microphone permission should be requested separately when the user chooses to listen or sing.

Microphone analysis should default to mic → analyzer, not mic → speakers. Direct speaker monitoring can create acoustic feedback. If monitoring is added, design for headphones and provide gain limits.

Every build needs a PANIC path. It should fade the master, cancel or release active voices, clear queued events, stop runaway feedback, reset stuck MIDI notes, and then restore the master safely.

PART III — THE LISTENER
