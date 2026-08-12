# Architecture Summary

The system separates real-time audio, musical perception, shared state, musician behavior, and high-level conducting.

```text
INPUT
  ↓
AUDIO / INPUT KERNEL
  ↓
MUSICAL PERCEPTION
  ↓
SHARED MUSICAL WORLD
  ↓
GUITAR | PIANO | BASS | DRUMS | VOCAL
  ↓
CONDUCTOR / ARRANGER
  ↓
PERFORMANCE EVENT BUS
  ↓
SYNTHESIS / SAMPLING / PHYSICAL MODELS
  ↓
MASTER DSP GRAPH
  ↓
OUTPUT
```

## Timing layers

- **Audio loop:** sample/buffer rendering only.
- **Perception loop:** pitch, spectral, onset, and phrase features.
- **Beat loop:** future scheduling against one transport.
- **Musician loop:** decide what each instrument should play.
- **Conductor loop:** decide who should play, how much, and when.

## Core interface

Each musician should conceptually expose:

```text
observe(world)
plan(horizon)
emit(events)
reset()
serialize()
deserialize()
```

The musician does not own the master clock or independently infer the entire song state.

See the engineering book in `docs/` for the complete specification.
