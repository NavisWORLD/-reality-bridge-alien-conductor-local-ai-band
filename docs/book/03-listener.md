# 9. Signal Features: What the Machine Hears

The listener converts raw waveform samples into a compact performance description. The minimum real-time feature set is RMS energy, peak amplitude, spectral centroid, spectral flux, pitch with confidence, pitch-class energy, onset timestamps, articulation, register, and phrase activity.

RMS energy for N samples is:

RMS = sqrt((1/N) * Σ x_i²)

RMS is not musical meaning by itself. It is evidence. The performance profile may normalize RMS into a 0-1 energy value and combine it with spectral and temporal features.

Spectral centroid gives a useful approximation of brightness:

centroid = Σ(f_k * magnitude_k) / Σ(magnitude_k)

Spectral flux measures positive spectral change between frames and is useful for finding attacks and articulation:

flux_t = Σ max(0, X_t(k) - X_{t-1}(k))

# 10. Pitch Detection

The browser ancestor uses autocorrelation-style pitch estimation. For lag k, normalized correlation can be written approximately as:

R(k) = Σ x_i x_(i+k) / sqrt(Σ x_i² · Σ x_(i+k)²)

A strong periodic signal produces a strong correlation near its period. Frequency is then approximately sampleRate / lag. Convert frequency to MIDI with:

midi = 69 + 12 * log2(frequency / 440)

A modular architecture must treat the pitch detector as replaceable. The contract is more important than the algorithm:

PitchFrame {  
timestamp,  
hz,  
midi,  
confidence,  
voiced  
}

A native build may substitute YIN, pYIN, SWIPE, CREPE-like local inference, or another detector. The rest of the band should not change as long as the contract remains stable.

# 11. Onsets, Timbre, and Stability

An onset is evidence that a new musical action may have occurred: a syllable, pluck, key strike, drum hit, clap, or sharp articulation. Onsets become the basis for tempo inference and rhythmic responsiveness.

Pitch stability can be estimated from recent valid MIDI estimates. Let μ be their mean and σ their standard deviation; a normalized stability value can decrease as σ rises. Melodic motion can be estimated from the mean absolute difference between successive pitch estimates.

These features are more musically useful when combined: a high-flux, high-energy, low-stability phrase suggests an active articulated performance; a low-flux, moderate-energy, high-stability phrase suggests sustained material.

# 12. Chroma, Key, and Chord Inference

Chroma discards octave and accumulates energy into twelve pitch classes. For integer MIDI note m: pitchClass = m mod 12. Maintain at least two chroma memories: a slow chroma for tonal center and a fast chroma for local chord evidence.

Key inference can score root/mode candidates by rewarding energy on expected scale pitch classes, penalizing out-of-scale energy, and adding small priors for tonic and dominant evidence. Chord inference follows the same pattern with compact chord templates such as major, minor, sus2, sus4, maj7, and m7.

Confidence should be calibrated from candidate separation, total evidence, and temporal stability. A system that flips C major → A minor → C major every 200 ms may have high instantaneous template scores but poor temporal confidence.

| **Inference** | **Slow evidence**                      | **Fast evidence** | **Typical use**                                       |
|---------------|----------------------------------------|-------------------|-------------------------------------------------------|
| Key / mode    | Several seconds of pitch-class history | Not dominant      | Scale constraints, tonal center, long voicing choices |
| Chord         | Fast-decay chroma                      | Primary           | Current comping, bass root, guitar frets              |
| Phrase        | Energy and voiced state                | Immediate         | Do not interrupt; trigger responses                   |
| Tempo         | Recent onset intervals                 | Beat-scale        | Scheduler adaptation and groove                       |

# 13. Tempo and Phrase Detection

Tempo inference begins with onset timestamps. Consecutive onset intervals Δt yield raw candidates BPM = 60 / Δt. Normalize likely half-time and double-time interpretations into a practical range, then use a robust central estimate and a confidence score based on consistency and sample count.

Never hard-jump the scheduler to every tempo estimate. Interpolate gradually and require sufficient confidence. A cough, clap, or fast vocal ornament should not double the entire band tempo.

Phrase detection turns a stream of notes into conversational structure. A phrase becomes active when voiced/onset activity appears. A phrase ends after a configurable period of meaningful silence. The existing browser design waits for a short silence before firing a call-and-response action. The exact threshold should be adaptive by style and tempo in future versions.

if voiced or aboveGate:  
phraseActive = true  
silenceSince = 0  
else:  
if silenceSince == 0: silenceSince = now  
if phraseActive and now - silenceSince > endThreshold:  
phraseActive = false  
emit(PHRASE_END)

# 14. Human Performance Profile

The listener should publish not only notes but a continuous performance profile. This is the bridge from acoustic measurements to accompaniment behavior.

PerformanceProfile {  
energy,  
brightness,  
register,  
pitchStability,  
articulation,  
melodicMotion,  
onsetRate  
}

Mappings should remain interpretable. Bright singing can increase upper harmonics and piano attack. Soft stable singing can produce long sustained harmony. High articulation can encourage percussion or plucked accompaniment. High register can push band voicings downward to avoid masking.

The band should use uncertainty conservatively. If the listener does not know, the musicians should become simpler, not more assertive.

PART IV — THE MUSICIANS
