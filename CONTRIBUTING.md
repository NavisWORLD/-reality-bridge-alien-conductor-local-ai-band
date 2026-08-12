# Contributing

Reality Bridge / Alien Conductor is being developed as a modular local music system. Contributions should preserve the project’s central engineering rules: deterministic timing, local-first operation, measurable behavior, and separation between perception, musical state, musician agents, and audio rendering.

## Before contributing

- Keep blocking work out of the real-time audio path.
- Schedule every musician against the shared transport.
- Treat pitch, tempo, key, and chord estimates as confidence-weighted observations rather than absolute truth.
- Prefer reusable modules over tightly coupled UI logic.
- Add tests or instrumentation for timing-sensitive behavior when practical.
- Document whether a feature is implemented, experimental, simulated, or proposed.

## Suggested contribution areas

- play-along guitar and piano agents
- adaptive bass and drum engines
- vocal harmony and call-and-response
- pitch, onset, chord, tempo, and phrase perception
- physical modeling and synthesis
- local model experimentation
- latency and musical-behavior benchmarks
- mobile and browser audio reliability
- accessibility and performance UI
- documentation and reproducible examples

By contributing, you agree that your contribution may be distributed under the repository’s MIT License.
