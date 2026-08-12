# 15. Gravity Guitar: Renderer and Physical Model

Gravity Guitar is the strongest standalone instrument already present in the browser lineage. Its architecture should be split into a renderer and an agent. The renderer answers “how does this pluck sound?” The agent answers “should I pluck, strum, arpeggiate, or wait?”

The existing string algorithm belongs to the Karplus-Strong family of plucked-string physical modeling. For target frequency f:

delayLength ≈ sampleRate / f

An excitation ring is filled with noise shaped by pick position and string character. Repeated neighbor averaging plus damping generates a decaying pitched waveform. Variants such as STEEL, NYLON, WIRE, GLASS, and IMPOSSIBLE modify excitation or feedback behavior. The result then passes through a guitar-body filter network.

The current instrument represents Standard, Drop D, DADGAD, Open D, Open G, Baritone, Nashville, and an intentionally microtonal Alien tuning. String pitch is a function of base pitch, fret, capo, bend, and detune.

The body model uses resonant filters and a high-shelf stage to approximate different body responses. Personalities include Parlor, Dreadnought, Jumbo, Hollow Void, Crystal Body, and Infinite Body. Adjustable dimensions include size, depth, resonance, air, bridge response, and string/body coupling.

Sympathetic resonance should remain part of the renderer. When another open string lies near a simple harmonic ratio to an excited frequency, the engine can add a low-level sympathetic response. This makes notes interact rather than behave as isolated samples.

# 16. Play-Along Guitar Agent

The standalone guitar application needs only the Audio Engine, Clock, Listener, Musical World, Harmony Engine, Phrase Memory, Guitar Renderer, and Guitar Agent. Everything else is optional.

human sings / plays  
↓  
Listener → key / chord / phrase / energy  
↓  
MusicalWorld  
↓  
GuitarAgent  
↓  
strum / pluck / arpeggio events  
↓  
GravityGuitar renderer  
↓  
speaker

Guitar roles should include Follow, Strum, Fingerstyle, Arpeggiate, Countermelody, Ambient, Power Chord, Rhythm Chop, and Call + Response.

Decision sketch:

if human.phraseActive:  
density *= 0.35  
if chordConfidence high: support chord tones  
if human.register high: choose low/mid voicing  
if human.energy low: fingerpick  
else: sparse rhythmic strum  
else:  
if phraseJustEnded: answer phrase  
else: maintain groove

A dedicated voicing solver should minimize unnecessary fret movement while respecting playable span, open-string preferences, desired register, and previous hand position. This is the guitar-specific form of voice leading.

# 17. Play-Along Piano

The piano should be a separate application that shares the Listener, World, and Harmony packages but has its own renderer and voicing solver. A PianoNote event needs pitch, velocity, note-on time, note-off time, and pedal state.

Voicing is a constrained optimization problem. For each candidate realization of a chord, score movement from the previous voicing, register collision with the human, hand span, density, and melodic continuity. The lowest-cost musically valid voicing wins.

Cost = α·Movement + β·RegisterCollision + γ·HandSpan + δ·Density - ε·MelodicContinuity

| **Mode**      | **Behavior**                                                                 |
|---------------|------------------------------------------------------------------------------|
| Ballad        | Low root/fifth support, sparse right-hand voicings, long pedal, low density. |
| Pop           | Octave/fifth foundation, triadic right hand, regular eighth-note motion.     |
| Jazz          | Extensions, rootless options, voice leading, syncopated comping.             |
| Ambient       | Wide intervals, slow attack, long release, large stereo/space treatment.     |
| Rhythmic      | Short chords, offbeat comping, strong articulation.                          |
| Follow Singer | Listen during phrases; support harmony; answer gaps.                         |

Renderer tiers can range from a tiny oscillator/modal browser piano, to local multisamples, to a physical/modal piano model with hammer, string, soundboard, pedal, and sympathetic resonance. The Piano Agent should not care which renderer is installed.

# 18. Local AI Bassist

Bass provides harmonic certainty and rhythmic glue. It should prefer stability over novelty. Candidate tones include root, fifth, octave, third, seventh, scale passing tone, and chromatic approach tone.

Chord confidence should directly constrain risk. Low confidence suggests root/fifth or even a held pedal. High confidence permits passing tones and voice-led movement. Bass should coordinate with the drummer through a shared GrooveState rather than by reading drum audio after the fact.

if chordConfidence < 0.4:  
choose(root or fifth)  
elif chordConfidence < 0.7:  
choose(chord tone, weighted to root)  
else:  
allow(chord tone, scale passing tone, chromatic approach)

# 19. Local AI Drummer

The drummer needs tempo, beat phase, section, energy, phrase state, and onset rate. Pitch analysis is optional. The renderer may use synthesis, samples, or a hybrid kit; the agent only emits drum events.

16-step skeleton  
KICK : X . . . . . . . X . . . . . . .  
SNARE: . . . . X . . . . . . . X . . .  
HAT : X . X . X . X . X . X . X . X .

The drummer then probabilistically varies the skeleton according to energy, section density, fill probability, swing, ghost-note tendency, and human onset rate. Microtiming should be bounded stylistically; “humanization” is not random sloppiness.

During active vocal phrases, the drummer may reduce fills while maintaining groove. At phrase endings or section transitions, fill probability can rise. This makes the rhythm section conversational rather than static.

# 20. Vocal Bandmate and Harmony Ghost

The Vocal Bandmate is separate from the human voice analyzer. Its output model should remain renderer-agnostic: pitch, duration, intensity, vowel/phoneme, breathiness, vibrato, and pan. That representation can drive anything from a simple oscillator “ghost” to a local singing synthesizer.

Harmony modes can include diatonic third, third below, sixth, octave double, drone, contrary motion, and scale-aware nearest-harmony. The existing browser ancestry already generates scale-relative harmony tones and call-and-response patterns; the modular version turns that into an explicit VocalAgent.

Phrase memory should store relative intervals and rhythm, not only absolute notes, so a response motif can be transposed. Useful transformations include reverse, transpose, rhythmic compression/expansion, contour inversion, simplification, and cadence completion.

# 21. Orbit, Granular, and Media Instruments

The project also contains three experimental instrument families that should be preserved as standalone tools.

## 21.1 Orbit Instrument

Map touch geometry to music: angle → scale degree, radius → register, gesture speed → velocity, and horizontal position → stereo pan. Because the output is normalized note events, Orbit can control any renderer.

## 21.2 Granular Instrument

Granular mode uses a locally loaded audio buffer and creates short grains according to position, size, density, pitch ratio, jitter, and stereo spread. A freeze mode loops a tiny region as a texture. This can become REALITY_BRIDGE_GRANULAR without importing the band.

## 21.3 Media-to-Music Engine

The current media analyzer extracts audio features such as RMS, peak, zero crossings, centroid, rolloff, flux, chroma, frequency-band energy, transients, tempo candidates, root pitch class, density, and dynamic range. Video analysis extracts luminance, contrast, average color, motion, motion center, edges, and scene-change candidates.

A generalized modulation matrix should route source features toward pitch, rhythm, timbre, filter, density, panning, mutation, and effects. Media should modulate musical parameters rather than be mistaken for “AI understanding” unless a trained semantic model is actually present.

# 22. Looper: Event and Audio Memory

The browser ancestor contains event loops: musical actions are stored relative to the scheduler and replayed later. Preserve this because event loops can be transposed, re-rendered with a different instrument, or played at a new tempo.

Add a second loop type for raw audio. Event loops preserve intent; audio loops preserve sound. A mature looper should support quantization, free timing, overdub, undo, track length, mute/solo, scene launching, tempo stretch for audio where available, and export.

PART V — BAND INTELLIGENCE
