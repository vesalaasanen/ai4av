---
spec_id: admin/seura-strm-42-3-s-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Seura STRM-42.3-S Series Control Spec"
manufacturer: Seura
model_family: "STRM-42.3-S Series"
aliases: []
compatible_with:
  manufacturers:
    - Seura
  models:
    - "STRM-42.3-S Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - storage.googleapis.com
retrieved_at: 2026-05-01T01:59:50.755Z
last_checked_at: 2026-05-03T13:04:56.253Z
generated_at: 2026-05-03T13:04:56.253Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-03T13:04:56.253Z
  matched_actions: 68
  action_count: 68
  confidence: high
  summary: "All 68 spec actions matched literally in source; transport parameters verified; full command set represented."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-03
---

# Seura STRM-42.3-S Series Control Spec

## Summary
Seura Storm outdoor TV with RS-232C serial control via female RJ45 connector. Supports power, input selection, volume, mute, channel, picture adjustments (contrast, brightness, color saturation, tint, sharpness), color temperature, backlight mode, display format, game mode, and IR remote key emulation. Optional unit ID addressing (000–255) allows multi-display installations.

<!-- UNRESOLVED: source covers Storm, Storm Ultra Bright, and S2 models — exact model variants and firmware compatibility not specified -->

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
traits:
  - powerable    # inferred from PWD command (on/off/toggle)
  - queryable    # inferred from query support (PWD, CHA, INP, VOL, CON, BRT, SAT, TIN, MUT, TEM)
  - routable     # inferred from INP command (9 input sources)
  - levelable    # inferred from VOL, CON, BRT, SAT, TIN, SHA continuous value commands
```

## Actions
```yaml
actions:
  - id: power_on
    label: Power On
    kind: action
    command: "[0x02]PWD:1[0x03]"
    params: []

  - id: power_off
    label: Power Off
    kind: action
    command: "[0x02]PWD:0[0x03]"
    params: []

  - id: power_toggle
    label: Power Toggle
    kind: action
    command: "[0x02]PWD:3[0x03]"
    params: []

  - id: mute_on
    label: Mute
    kind: action
    command: "[0x02]MUT:1[0x03]"
    params: []

  - id: mute_off
    label: Unmute
    kind: action
    command: "[0x02]MUT:0[0x03]"
    params: []

  - id: select_input
    label: Select Input
    kind: action
    command: "[0x02]INP:{input}[0x03]"
    params:
      - name: input
        type: enum
        values:
          - label: VGA
            value: "0"
          - label: HDMI 1
            value: "1"
          - label: TUNER
            value: "2"
          - label: AV1
            value: "3"
          - label: AV2
            value: "4"
          - label: HDMI 2
            value: "6"
          - label: COMPONENT
            value: "7"
          - label: HDMI 3
            value: "9"
          - label: USB
            value: "12"

  - id: set_volume
    label: Set Volume
    kind: action
    command: "[0x02]VOL:{level}[0x03]"
    params:
      - name: level
        type: integer
        min: 0
        max: 100
        description: "Volume level (000-100, 3-digit zero-padded)"

  - id: set_channel
    label: Set Channel
    kind: action
    command: "[0x02]CHA:{channel}[0x03]"
    params:
      - name: channel
        type: string
        description: "Channel number in xxx.x format (tuner only)"

  - id: set_format
    label: Set Display Format
    kind: action
    command: "[0x02]FOR:{mode}[0x03]"
    params:
      - name: mode
        type: enum
        values:
          - label: "4:3"
            value: "0"
          - label: "16:9"
            value: "1"
          - label: ZOOM
            value: "3"
          - label: "1:1"
            value: "5"
          - label: SCREEN OFF (audio only)
            value: "6"

  - id: set_contrast
    label: Set Contrast
    kind: action
    command: "[0x02]CON:{value}[0x03]"
    params:
      - name: value
        type: string
        description: "Absolute value 000-100, or +/- for increment/decrement"

  - id: contrast_up
    label: Contrast Up
    kind: action
    command: "[0x02]CON:+[0x03]"
    params: []

  - id: contrast_down
    label: Contrast Down
    kind: action
    command: "[0x02]CON:-[0x03]"
    params: []

  - id: set_brightness
    label: Set Brightness
    kind: action
    command: "[0x02]BRT:{value}[0x03]"
    params:
      - name: value
        type: string
        description: "Absolute value 000-100, or +/- for increment/decrement"

  - id: brightness_up
    label: Brightness Up
    kind: action
    command: "[0x02]BRT:+[0x03]"
    params: []

  - id: brightness_down
    label: Brightness Down
    kind: action
    command: "[0x02]BRT:-[0x03]"
    params: []

  - id: set_color_saturation
    label: Set Color Saturation
    kind: action
    command: "[0x02]SAT:{value}[0x03]"
    params:
      - name: value
        type: string
        description: "Absolute value 000-100, or +/- for increment/decrement"

  - id: color_saturation_up
    label: Color Saturation Up
    kind: action
    command: "[0x02]SAT:+[0x03]"
    params: []

  - id: color_saturation_down
    label: Color Saturation Down
    kind: action
    command: "[0x02]SAT:-[0x03]"
    params: []

  - id: set_tint
    label: Set Tint
    kind: action
    command: "[0x02]TIN:{value}[0x03]"
    params:
      - name: value
        type: string
        description: "Absolute value 000-100, or +/- for increment/decrement"

  - id: tint_up
    label: Tint Up
    kind: action
    command: "[0x02]TIN:+[0x03]"
    params: []

  - id: tint_down
    label: Tint Down
    kind: action
    command: "[0x02]TIN:-[0x03]"
    params: []

  - id: set_sharpness
    label: Set Sharpness
    kind: action
    command: "[0x02]SHA:{value}[0x03]"
    params:
      - name: value
        type: string
        description: "Absolute value 000-100, or +/- for increment/decrement"

  - id: sharpness_up
    label: Sharpness Up
    kind: action
    command: "[0x02]SHA:+[0x03]"
    params: []

  - id: sharpness_down
    label: Sharpness Down
    kind: action
    command: "[0x02]SHA:-[0x03]"
    params: []

  - id: set_color_temp
    label: Set Color Temperature
    kind: action
    command: "[0x02]TEM:{value}[0x03]"
    params:
      - name: value
        type: enum
        values:
          - label: Warm
            value: "0"
          - label: Normal
            value: "1"
          - label: Cool
            value: "2"

  - id: set_backlight_mode
    label: Set Backlight Mode
    kind: action
    command: "[0x02]BLT:{value}[0x03]"
    params:
      - name: value
        type: enum
        values:
          - label: Day
            value: "0"
          - label: Night
            value: "1"
          - label: Auto
            value: "2"

  - id: set_game_mode
    label: Set Game Mode
    kind: action
    command: "[0x02]GAM:{value}[0x03]"
    params:
      - name: value
        type: enum
        values:
          - label: "Off"
            value: "0"
          - label: "On"
            value: "1"

  - id: key_digit
    label: Send Key Digit
    kind: action
    command: "[0x02]KEY:{digit}[0x03]"
    params:
      - name: digit
        type: integer
        min: 0
        max: 9
        description: "Remote digit 0-9"

  - id: key_sleep
    label: Key Sleep
    kind: action
    command: "[0x02]KEY:11[0x03]"
    params: []

  - id: key_cc
    label: Key Closed Caption
    kind: action
    command: "[0x02]KEY:12[0x03]"
    params: []

  - id: key_menu
    label: Key Menu Toggle
    kind: action
    command: "[0x02]KEY:21[0x03]"
    params: []

  - id: key_display
    label: Key Display Toggle
    kind: action
    command: "[0x02]KEY:22[0x03]"
    params: []

  - id: key_vol_up
    label: Key Volume Up / Navigate Right
    kind: action
    command: "[0x02]KEY:23[0x03]"
    params: []

  - id: key_vol_down
    label: Key Volume Down / Navigate Left
    kind: action
    command: "[0x02]KEY:24[0x03]"
    params: []

  - id: key_ch_up
    label: Key Channel Up / Navigate Up
    kind: action
    command: "[0x02]KEY:25[0x03]"
    params: []

  - id: key_ch_down
    label: Key Channel Down / Navigate Down
    kind: action
    command: "[0x02]KEY:26[0x03]"
    params: []

  - id: key_picture_standard
    label: Key Picture Mode Standard
    kind: action
    command: "[0x02]KEY:27[0x03]"
    params: []

  - id: key_picture_dynamic
    label: Key Picture Mode Dynamic
    kind: action
    command: "[0x02]KEY:28[0x03]"
    params: []

  - id: key_picture_theater
    label: Key Picture Mode Theater
    kind: action
    command: "[0x02]KEY:29[0x03]"
    params: []

  - id: key_picture_personal
    label: Key Picture Mode Personal
    kind: action
    command: "[0x02]KEY:30[0x03]"
    params: []

  - id: key_play
    label: Key Play
    kind: action
    command: "[0x02]KEY:115[0x03]"
    params: []

  - id: key_pause
    label: Key Pause
    kind: action
    command: "[0x02]KEY:116[0x03]"
    params: []

  - id: key_stop
    label: Key Stop
    kind: action
    command: "[0x02]KEY:117[0x03]"
    params: []

  - id: key_skip_forward
    label: Key Skip Forward / Chapter Plus
    kind: action
    command: "[0x02]KEY:118[0x03]"
    params: []

  - id: key_skip_backward
    label: Key Skip Backward / Chapter Minus
    kind: action
    command: "[0x02]KEY:19[0x03]"
    params: []

  - id: key_prev_channel
    label: Key Previous Channel
    kind: action
    command: "[0x02]KEY:35[0x03]"
    params: []

  - id: key_enter
    label: Key Enter
    kind: action
    command: "[0x02]KEY:36[0x03]"
    params: []

  - id: key_ok
    label: Key OK
    kind: action
    command: "[0x02]KEY:37[0x03]"
    params: []

  - id: key_input_toggle
    label: Key Input Select Toggle
    kind: action
    command: "[0x02]KEY:38[0x03]"
    params: []

  - id: key_fast_forward
    label: Key Fast Forward
    kind: action
    command: "[0x02]KEY:109[0x03]"
    params: []

  - id: key_fast_backward
    label: Key Fast Backward
    kind: action
    command: "[0x02]KEY:112[0x03]"
    params: []

  - id: key_exit
    label: Key Exit
    kind: action
    command: "[0x02]KEY:110[0x03]"
    params: []

  - id: key_dot
    label: Key Digit Dot (ATSC Sub-Channel)
    kind: action
    command: "[0x02]KEY:104[0x03]"
    params: []

  - id: key_guide
    label: Key Guide Toggle
    kind: action
    command: "[0x02]KEY:105[0x03]"
    params: []

  - id: key_red
    label: Key Red
    kind: action
    command: "[0x02]KEY:32[0x03]"
    params: []

  - id: key_green
    label: Key Green
    kind: action
    command: "[0x02]KEY:114[0x03]"
    params: []

  - id: key_yellow
    label: Key Yellow
    kind: action
    command: "[0x02]KEY:111[0x03]"
    params: []

  - id: key_blue
    label: Key Blue
    kind: action
    command: "[0x02]KEY:113[0x03]"
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    label: Power State
    query: "[0x02]PWD:?[0x03]"
    type: enum
    values:
      - label: "Off"
        value: "0"
      - label: "On"
        value: "1"

  - id: input_state
    label: Current Input
    query: "[0x02]INP:?[0x03]"
    type: enum
    values:
      - label: VGA
        value: "0"
      - label: HDMI 1
        value: "1"
      - label: TUNER
        value: "2"
      - label: AV1
        value: "3"
      - label: AV2
        value: "4"
      - label: HDMI 2
        value: "6"
      - label: COMPONENT
        value: "7"
      - label: HDMI 3
        value: "9"
      - label: USB
        value: "12"

  - id: volume_level
    label: Volume Level
    query: "[0x02]VOL:?[0x03]"
    type: integer
    min: 0
    max: 100

  - id: mute_state
    label: Mute State
    query: "[0x02]MUT:?[0x03]"
    type: enum
    values:
      - label: Unmuted
        value: "0"
      - label: Muted
        value: "1"

  - id: channel
    label: Current Channel
    query: "[0x02]CHA:?[0x03]"
    type: string
    description: "Returns channel in xxx.x format (tuner only)"

  - id: contrast_level
    label: Contrast Level
    query: "[0x02]CON:?[0x03]"
    type: integer
    min: 0
    max: 100

  - id: brightness_level
    label: Brightness Level
    query: "[0x02]BRT:?[0x03]"
    type: integer
    min: 0
    max: 100

  - id: color_saturation_level
    label: Color Saturation Level
    query: "[0x02]SAT:?[0x03]"
    type: integer
    min: 0
    max: 100

  - id: tint_level
    label: Tint Level
    query: "[0x02]TIN:?[0x03]"
    type: integer
    min: 0
    max: 100

  - id: color_temp
    label: Color Temperature
    query: "[0x02]TEM:?[0x03]"
    type: enum
    values:
      - label: Warm
        value: "0"
      - label: Normal
        value: "1"
      - label: Cool
        value: "2"
```

## Variables
```yaml
variables:
  - id: volume
    label: Volume
    command: "[0x02]VOL:{value}[0x03]"
    query: "[0x02]VOL:?[0x03]"
    type: integer
    min: 0
    max: 100

  - id: contrast
    label: Contrast
    command: "[0x02]CON:{value}[0x03]"
    query: "[0x02]CON:?[0x03]"
    type: integer
    min: 0
    max: 100

  - id: brightness
    label: Brightness
    command: "[0x02]BRT:{value}[0x03]"
    query: "[0x02]BRT:?[0x03]"
    type: integer
    min: 0
    max: 100

  - id: color_saturation
    label: Color Saturation
    command: "[0x02]SAT:{value}[0x03]"
    query: "[0x02]SAT:?[0x03]"
    type: integer
    min: 0
    max: 100

  - id: tint
    label: Tint
    command: "[0x02]TIN:{value}[0x03]"
    query: "[0x02]TIN:?[0x03]"
    type: integer
    min: 0
    max: 100

  - id: sharpness
    label: Sharpness
    command: "[0x02]SHA:{value}[0x03]"
    type: integer
    min: 0
    max: 100

  - id: backlight_mode
    label: Backlight Mode
    command: "[0x02]BLT:{value}[0x03]"
    query: "[0x02]BLT:?[0x03]"
    type: enum
    values:
      - label: Day
        value: "0"
      - label: Night
        value: "1"
      - label: Auto
        value: "2"
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification events described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing
# requirements found in source. Never infer - only populate from explicit source text.
```

## Notes
- Command format: `STX (0x02) [ID;]COMMAND:PARAM ETX (0x03)`. STX and ETX must be hex bytes; all other data is ASCII.
- Optional unit ID (000–255) prefixes the command, separated by semicolon (e.g. `[0x02]001;PWD:1[0x03]`). ID 000 broadcasts to all units.
- Acknowledgment: success returns `[0x02]OK[0x03]`, error returns `[0x02]ER[0x03]` (possibly with colon-delimited detail), unsupported command returns `[0x02]INVALID[0x03]`.
- Query uses `?` as parameter. No "OK" returned on query — the current value is returned directly.
- AMX programmers may need 100ms delays between parameters in commands.
- Source header states "MODELS: STORM, STORM ULTRA BRIGHT, S2" — protocol likely applies across these model lines.
- Channel (CHA) commands are tuner-only (marked with ¹ in source).

<!-- UNRESOLVED: sharpness query not explicitly shown in source — SHA query column present but response example may be incomplete -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: RJ45 pinout is documented but cable wiring diagram not provided in text form -->
<!-- UNRESOLVED: exact STRM-42.3-S model variants covered by this protocol not explicitly listed — source covers Storm family broadly -->

## Provenance

```yaml
source_domains:
  - storage.googleapis.com
retrieved_at: 2026-05-01T01:59:50.755Z
last_checked_at: 2026-05-03T13:04:56.253Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-03T13:04:56.253Z
matched_actions: 68
action_count: 68
confidence: high
summary: "All 68 spec actions matched literally in source; transport parameters verified; full command set represented."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
