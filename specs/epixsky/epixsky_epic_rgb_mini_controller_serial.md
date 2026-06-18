---
spec_id: admin/epixsky-epic-rgb-mini-controller
schema_version: ai4av-public-spec-v1
revision: 1
title: "EpixSky Epic RGB Mini Controller Control Spec"
manufacturer: EpixSky
model_family: "RGB Mini"
aliases: []
compatible_with:
  manufacturers:
    - EpixSky
  models:
    - "RGB Mini"
  firmware: "2.1.0\""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - epixsky.com
source_urls:
  - https://www.epixsky.com/wp-content/uploads/2024/03/RGB-Mini-Command-Sheet.pdf
  - https://www.epixsky.com/wp-content/uploads/2024/03/RGB-MINI-Spec.pdf
  - https://www.epixsky.com/specification-literature/
retrieved_at: 2026-06-15T12:38:01.688Z
last_checked_at: 2026-06-16T07:02:12.071Z
generated_at: 2026-06-16T07:02:12.071Z
firmware_coverage: "2.1.0\""
protocol_coverage: []
known_gaps:
  - "no response/acknowledgement strings documented; no query commands; no safety/interlock text."
  - "no query commands in source - remove if no evidence"
  - "source documents no query commands or response strings"
  - "no settable parameters documented beyond discrete commands"
  - "no unsolicited notifications documented"
  - "no multi-step sequences documented"
  - "source contains no safety warnings, interlock procedures, or power-on sequencing text"
verification:
  verdict: verified
  checked_at: 2026-06-16T07:02:12.071Z
  matched_actions: 35
  action_count: 35
  confidence: medium
  summary: "All 35 spec actions matched verbatim in source command table; complete bidirectional coverage. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-15
---

# EpixSky Epic RGB Mini Controller Control Spec

## Summary
Legacy RS-232 controlled RGB LED controller ("RGB Mini", firmware 2.1.0). Commands are ASCII strings terminated with CR (`\r`); the controller repeats all received commands out the serial port for daisy-chaining. Spec covers color presets, RGB brightness up/down, ramp time, color cycle control, and 5 save/recall preset slots.

<!-- UNRESOLVED: no response/acknowledgement strings documented; no query commands; no safety/interlock text. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- levelable  # inferred from per-channel brighten/dim commands (embrt, embrt, emdim, etc.)
- queryable # UNRESOLVED: no query commands in source - remove if no evidence
```

<!-- Note: queryable trait removed — source has no query (e.g. `?`) commands. -->

## Actions
```yaml
- id: all_red
  label: All Red
  kind: action
  command: "emallred"
  params: []

- id: all_green
  label: All Green
  kind: action
  command: "emallgreen"
  params: []

- id: all_blue
  label: All Blue
  kind: action
  command: "emallblue"
  params: []

- id: magenta
  label: Magenta
  kind: action
  command: "emmagenta"
  params: []

- id: cyan
  label: Cyan
  kind: action
  command: "emcyan"
  params: []

- id: gold
  label: Gold
  kind: action
  command: "emgold"
  params: []

- id: rgb_white
  label: RGB White
  kind: action
  command: "emrgbwhite"
  params: []

- id: orange
  label: Orange
  kind: action
  command: "emorange"
  params: []

- id: light_blue
  label: Light Blue
  kind: action
  command: "emltblue"
  params: []

- id: light_green
  label: Light Green
  kind: action
  command: "emltgreen"
  params: []

- id: violet
  label: Violet
  kind: action
  command: "emviolet"
  params: []

- id: pink
  label: Pink
  kind: action
  command: "empink"
  params: []

- id: warm_white
  label: Warm White
  kind: action
  command: "emrgbww"
  params: []

- id: color_cycle_start
  label: Color Cycle (start)
  kind: action
  command: "emcycle"
  params: []

- id: color_cycle_pause
  label: Color Cycle (pause)
  kind: action
  command: "empause"
  params: []

- id: ramp_time
  label: Ramp Time
  kind: action
  command: "emrampYY"
  params:
    - name: YY
      type: string
      description: Two-digit ramp rate (source documents only the placeholder, not a value range)

- id: brighten_rgb
  label: Brighten RGB (+4%)
  kind: action
  command: "embrt"
  params: []

- id: brighten_red
  label: Brighten Red (+4%)
  kind: action
  command: "embtr"
  params: []

- id: brighten_green
  label: Brighten Green (+4%)
  kind: action
  command: "embtg"
  params: []

- id: brighten_blue
  label: Brighten Blue (+4%)
  kind: action
  command: "embtb"
  params: []

- id: dim_rgb
  label: Dim RGB (-4%)
  kind: action
  command: "emdim"
  params: []

- id: dim_red
  label: Dim Red (-4%)
  kind: action
  command: "emdmr"
  params: []

- id: dim_green
  label: Dim Green (-4%)
  kind: action
  command: "emdmg"
  params: []

- id: dim_blue
  label: Dim Blue (-4%)
  kind: action
  command: "emdmb"
  params: []

- id: save_preset_a
  label: Save Preset A
  kind: action
  command: "emsprea"
  params: []

- id: save_preset_b
  label: Save Preset B
  kind: action
  command: "emspreb"
  params: []

- id: save_preset_c
  label: Save Preset C
  kind: action
  command: "emsprec"
  params: []

- id: save_preset_d
  label: Save Preset D
  kind: action
  command: "emspred"
  params: []

- id: save_preset_e
  label: Save Preset E
  kind: action
  command: "emspree"
  params: []

- id: recall_preset_a
  label: Recall Preset A
  kind: action
  command: "emrprea"
  params: []

- id: recall_preset_b
  label: Recall Preset B
  kind: action
  command: "emrpreb"
  params: []

- id: recall_preset_c
  label: Recall Preset C
  kind: action
  command: "emrprec"
  params: []

- id: recall_preset_d
  label: Recall Preset D
  kind: action
  command: "emrpred"
  params: []

- id: recall_preset_e
  label: Recall Preset E
  kind: action
  command: "emrpree"
  params: []

- id: all_off
  label: All LEDs Off
  kind: action
  command: "emalloff"
  params: []
```

## Feedbacks
```yaml
# UNRESOLVED: source documents no query commands or response strings
```

## Variables
```yaml
# UNRESOLVED: no settable parameters documented beyond discrete commands
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications documented
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or power-on sequencing text
```

## Notes
- All commands must be terminated with carriage return (`\r`).
- Controller repeats every received command out the serial port for daisy-chaining to next device.
- Source header: "RGB MINI ONLY - Not sold anymore Do not use for RGBW" — model is discontinued; commands are NOT interchangeable with the RGBW successor.
- Source revision: "V-3-24".
- `emrampYY` placeholder `YY` value range not specified in source.
- `emltgreen` row lists "255%" in green column — likely a typo for 100% in the source; not corrected here per verbatim rule.

## Provenance

```yaml
source_domains:
  - epixsky.com
source_urls:
  - https://www.epixsky.com/wp-content/uploads/2024/03/RGB-Mini-Command-Sheet.pdf
  - https://www.epixsky.com/wp-content/uploads/2024/03/RGB-MINI-Spec.pdf
  - https://www.epixsky.com/specification-literature/
retrieved_at: 2026-06-15T12:38:01.688Z
last_checked_at: 2026-06-16T07:02:12.071Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-16T07:02:12.071Z
matched_actions: 35
action_count: 35
confidence: medium
summary: "All 35 spec actions matched verbatim in source command table; complete bidirectional coverage. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no response/acknowledgement strings documented; no query commands; no safety/interlock text."
- "no query commands in source - remove if no evidence"
- "source documents no query commands or response strings"
- "no settable parameters documented beyond discrete commands"
- "no unsolicited notifications documented"
- "no multi-step sequences documented"
- "source contains no safety warnings, interlock procedures, or power-on sequencing text"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
