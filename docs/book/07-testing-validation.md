# 33. Engineering Telemetry

Every serious build should be able to record timing and decision telemetry. Useful fields include timestamp, audio callback duration, underruns, CPU load, feature latency, pitch and confidence, chord and confidence, tempo and confidence, phrase state, agent proposals, accepted/rejected events, scheduled audio time, actual render time when measurable, and model latency.

The purpose is not to generate a flashy dashboard. It is to make every claim debuggable. If accompaniment feels late, telemetry should reveal whether capture, pitch inference, planning, scheduling, or output buffering caused it.

# 34. Listener Validation

Pitch tests should generate known tones such as 110, 220, 440, and 880 Hz. Measure frequency error, cents error, confidence, and detection latency.

centsError = 1200 * log2(f_estimated / f_true)

Key tests should use known progressions across modes and transpositions. Measure top-1 accuracy, time-to-lock, false transitions, and confidence calibration. Chord tests should include major, minor, suspended, seventh, and intentionally ambiguous voicings.

Tempo tests should cover 60-160 BPM plus swing, missing beats, half-time/double-time ambiguity, human jitter, and non-percussive singing. Phrase tests should include sustained notes, breaths, short pauses, staccato, legato, and conversational call-and-response.

# 35. Band Validation

Correct notes alone do not make a good accompaniment system. Evaluate behavior in context.

| **Metric**              | **Question**                                                                      |
|-------------------------|-----------------------------------------------------------------------------------|
| Register collision rate | How often does a dense instrument occupy the performer’s register at high energy? |
| Interruption rate       | How often does lead-like accompaniment occur during active human phrases?         |
| Harmonic agreement      | How often do generated notes fit the accepted harmonic state?                     |
| Timing error            | How far are rendered events from their scheduled timestamps?                      |
| Response latency        | How long from phrase end to musical answer?                                       |
| Repetition              | How frequently are identical motifs repeated without purpose?                     |
| State stability         | How often do key/tempo/chord estimates oscillate unnecessarily?                   |
| Recovery                | Does the band continue safely when a subsystem fails?                             |

# 36. Scientific and Human Evaluation

A/B testing can compare a fixed backing track with adaptive accompaniment. Ask musicians which system felt more responsive, left more space, followed timing better, sounded more musical, and made them want to continue playing.

Report both objective and subjective metrics. If a feature is simulated, label it simulated. If an inference has low confidence, expose the confidence. If a model was not tested on polyphonic instruments, do not imply polyphonic accuracy. The public-facing project should replace claims with instrumentation.

PART VIII — SHIPPING THE OPEN PROJECT
