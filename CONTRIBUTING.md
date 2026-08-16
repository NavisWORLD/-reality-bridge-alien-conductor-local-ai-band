# Contributing

Reality Bridge / Alien Conductor is being developed as a modular local music system. Contributions should preserve the project's central engineering rules: deterministic timing, local-first operation, measurable behavior, and separation between perception, musical state, musician agents, and audio rendering.

## Before contributing

- Keep blocking work out of the real-time audio path.
- Schedule every musician against the shared transport.
- Treat pitch, tempo, key, and chord estimates as confidence-weighted observations rather than absolute truth.
- Prefer reusable modules over tightly coupled UI logic.
- Add tests or instrumentation for timing-sensitive behavior when practical.
- Document whether a feature is implemented, experimental, simulated, or proposed.
- Do not submit private recordings, credentials, proprietary samples, or material you do not have the right to provide.

## Rights boundary for new contributions

The historical `v0.1.0` generation was distributed under MIT. Those historical rights remain intact.

Beginning 2026-08-16, the current protected generation is not accepting outside copyrightable code, documentation, audio assets, designs, or other substantive authorship for incorporation unless Cory Shane Davis and the contributor first execute a written contribution, assignment, or licensing agreement sufficient to establish the rights required for incorporation and future licensing.

Opening a pull request does not transfer copyright ownership and does not grant the project additional rights beyond those independently provided by law or a separate written agreement. Issues, bug reports, test results, compatibility reports, and non-copyrightable factual feedback are welcome.

See `LICENSE` and `LICENSE_HISTORY.md` before submitting material.
