# 23. Conductor and Arranger

The conductor is the attention manager of the band. It does not need to synthesize notes itself. It controls who is allowed to be musically assertive, how dense the arrangement is, what section is active, how tension evolves, and which proposed events should survive.

Recommended internal components: SectionManager, DensityManager, TensionManager, InteractionManager, InstrumentAllocator, MotifManager, and MutationManager.

| **Section example** | **Guitar** | **Piano** | **Bass** | **Drums** | **Vocal** |
|---------------------|------------|-----------|----------|-----------|-----------|
| Verse               | 60%        | 20%       | 70%      | 45%       | 5%        |
| Chorus              | 85%        | 70%       | 90%      | 95%       | 65%       |
| Breakdown           | 10%        | 30%       | 0%       | 10%       | 20%       |
| Outro               | 35%        | 55%       | 40%      | 25%       | 35%       |

The existing conductor’s named journey — Awakening, Ascent, Fracture, Void, Rebirth, Transcendence — can remain as a presentation layer. Underneath, sections should be data: energy target, density target, harmonic tension, rhythm intensity, register range, and instrument permissions.

# 24. Musical Space and Conflict Resolution

An adaptive band should continuously ask: how much space is available? A simple conceptual measure is one minus human activity, but a useful system also considers register distance, onset rate, phrase gaps, and band density.

AvailableSpace = w1(1-HumanEnergy) + w2(1-OnsetRate) + w3(RegisterDistance) + w4(PhraseGap)

Musical ducking is broader than volume. It includes note density, register, rhythm, note length, timbre, and stereo position. When the singer begins, the piano can drop notes, the guitar can shift register, drums can simplify, and vocal harmony can wait for high confidence.

When multiple musicians propose conflicting events, score them:

Score = RolePriority + HarmonicValue + PhraseValue + Novelty - RegisterCollision - DensityCost

The conductor may reject, delay, transpose, thin, or re-voice low-scoring proposals. That is the point where independent generators become an ensemble.

# 25. Memory and Motifs

Memory belongs at multiple timescales: immediate note/chord memory, phrase memory over seconds, section memory over bars, song memory for the session, and optional persistent human preference memory.

Motifs should be represented relatively. If the human sings C-D-G-E, store interval motion +2, +5, -3 and the rhythm separately. This motif can later appear in another key. Relative representations support recall, variation, and transposition better than raw absolute notes.

Motif {  
intervals[],  
rhythm[],  
contour,  
velocityShape,  
tonalRole,  
source,  
confidence  
}

A persistent HumanMusicianProfile may learn non-sensitive musical tendencies such as typical tempo range, common keys, timing offset, phrase length, pitch range, average energy, and preferred band density. Adaptation should change priors gradually, not overfit one performance.

# 26. Musician Personalities

Each musician should expose interpretable personality controls rather than only opaque model settings.

| **Agent** | **Example personality parameters**                                                                    |
|-----------|-------------------------------------------------------------------------------------------------------|
| Guitar    | assertiveness, complexity, rhythmic density, register, syncopation, responsiveness, risk, space       |
| Piano     | voicing width, extension probability, pedal, left-hand density, melodic tendency, comping syncopation |
| Bass      | root loyalty, approach-tone probability, register, rhythmic lock, melodic tendency                    |
| Drums     | swing, ghost notes, fill probability, velocity variance, complexity, cymbal tendency                  |
| Vocal     | harmony interval preference, response probability, breathiness, vibrato, register distance, density   |

Presets become structured parameter collections: “Sparse Ambient,” “Pocket Rhythm Section,” “Singer First,” “Experimental Alien,” or genre-specific packs. Because the parameters are explicit, users can understand what a preset changes.

# 27. Where Local Machine Learning Belongs

Machine learning should enhance the architecture rather than replace real-time engineering. The useful insertion points are advanced pitch tracking, source separation, beat/chord recognition, style embeddings, phrase embeddings, gesture classification, generative melody, and long-range planning.

A robust deployment uses three brains:

| **Brain** | **Latency**         | **Responsibilities**                                                                               |
|-----------|---------------------|----------------------------------------------------------------------------------------------------|
| Reflex    | Milliseconds        | Audio, onsets, pitch, immediate ducking, rendering. No language model.                             |
| Musician  | Tens-hundreds of ms | Next note/chord, voicing, groove adjustment, phrase response. Rules or small local models.         |
| Composer  | Seconds or bars     | Sections, motifs, long-range direction, style planning. Larger local generative model may be used. |

If the Composer is late, music continues. If the Musician model crashes, deterministic fallback logic continues. No optional model should become a single point of failure for audio.

PART VI — IMPLEMENTATION
