# DATO Y RELATO — Character Bible

This is the single source of truth for the channel's recurring Stickman protagonist. Every episode, scene, thumbnail, turnaround, animation rig and generated asset must follow this specification. Do not redesign the protagonist between episodes.

## Identity lock

- Character ID: `dato-relato-stickman`
- Role: the one recurring host/protagonist of DATO Y RELATO.
- Visual style: clean, expressive 2D cartoon Stickman with cinematic 2.5D staging.
- Head: one perfectly round white head, radius 48 design units in the canonical front view.
- Outline: near-black (#171717), rounded caps and joins, consistent 12-unit primary stroke.
- Body: simple black line-art torso, arms and legs; no realistic anatomy and no clothing by default.
- Face: two simple black eyes and a small expressive mouth. Eye spacing, head size and facial placement remain fixed.
- Palette: white (#FFFFFF), near-black (#171717), with scene lighting and environmental colors kept separate from the character's identity.
- Proportions: head-to-body ratio, limb lengths, shoulder width and foot placement are locked to the master rig. Never stretch proportions to fit a shot; scale the whole character uniformly instead.

## Allowed variation

The character may change pose, expression, gaze direction, body lean, gait, timing and screen position. He may hold story props or wear temporary episode-specific accessories only when the script requires them. Such additions must not alter the underlying head, face layout, silhouette, skeleton or core palette. Return to the base design after the scene.

## Required reusable animation set

Build once and reuse across episodes:
- idle breathing, blinking and subtle weight shifts
- talk and phoneme mouth shapes for lip sync
- happy, curious, confused, worried, frightened, exhausted, surprised and determined expressions
- walk, run, sneak, stumble, sit, fall, lie down, get up and point
- look-at targets, head turns, anticipation, follow-through and settle
- hand/arm gestures for explaining, warning and reacting

## Production rules

1. All shots must instantiate the same master character asset and rig; do not redraw a new protagonist per scene.
2. Expressions are variants/controls on the same head, not replacement character designs.
3. Keep a consistent stroke width relative to the character's scale.
4. Use the same rig and animation clips at 30 fps (or retime clips without changing proportions).
5. Maintain identity in front, profile and three-quarter views. Use matched turnarounds; do not improvise facial spacing or head shape.
6. Episode-specific lighting, color grading, camera effects and backgrounds may change. Character identity may not.
7. Before rendering, validate that every scene references the master character ID.
8. Review a contact sheet of key poses and angles against this bible before approving a final render.

## Current implementation note

The first sleep-deprivation video used a hand-drawn SVG Stickman directly inside `apps/video/src/SleepSevenDays.tsx`. That is a temporary prototype, not the canonical production asset. The next engineering step is to migrate this locked design into one reusable `*.toon.json` character document with a skeleton, face switches, controls and reusable clips, then make all episode scenes instantiate that asset.

## Approval checklist

- [ ] Master character document created and schema-validated
- [ ] Front, profile and three-quarter views match
- [ ] Expressions and mouth variants share the same head geometry
- [ ] Core movement clips tested in the playground
- [ ] Episode 1 migrated to the master rig
- [ ] Future episodes reference the same character asset
