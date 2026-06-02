---
spec_id: admin/seura-strm-47-2
schema_version: ai4av-public-spec-v1
revision: 1
title: "Seura STRM-47.2 Control Spec"
manufacturer: Seura
model_family: STRM-47.2
aliases: []
compatible_with:
  manufacturers:
    - Seura
  models:
    - STRM-47.2
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - storage.googleapis.com
source_urls:
  - https://storage.googleapis.com/wp-stateless/2019/10/RS232-protocol-entertainment-and-outdoor-tvs.pdf
retrieved_at: 2026-05-26T20:31:55.077Z
last_checked_at: 2026-05-31T21:05:28.277Z
generated_at: 2026-05-31T21:05:28.277Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "all settable parameters modeled as actions; no additional variables identified"
  - "no multi-step sequences described in source"
  - "no safety warnings or interlock procedures in source"
  - "firmware version compatibility not stated in source"
  - "SHA query response format not explicitly shown (inferred from pattern of other picture commands)"
  - "GAM query not documented in source; only set command shown"
  - "no power-on sequencing or warm-up delay documented"
verification:
  verdict: verified
  checked_at: 2026-05-31T21:05:28.277Z
  matched_actions: 79
  action_count: 79
  confidence: medium
  summary: "All 79 spec actions found verbatim in source; transport parameters confirmed; bidirectional command coverage is complete. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-26
---

# Seura STRM-47.2 Control Spec

## Summary
Seura STRM-47.2 television controlled via RS-232C serial through an RJ45 connector. Protocol uses STX/ETX-framed ASCII commands with optional unit ID addressing (000-255). Supports power, volume, mute, input selection, channel tuning, picture adjustments, format, backlight mode, game mode, and IR key emulation.

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
  - powerable     # PWD on/off/toggle commands
  - queryable     # query support for PWD, VOL, MUT, CHA, INP, CON, BRT, SAT, TIN, TEM
  - levelable     # VOL, CON, BRT, SAT, TIN, SHA continuous values
  - routable      # INP input selection
```

## Actions
```yaml
actions:
  - id: power_on
    label: Power On
    kind: action
    command: "[STX]PWD:1[ETX]"
    params: []

  - id: power_off
    label: Power Off
    kind: action
    command: "[STX]PWD:0[ETX]"
    params: []

  - id: power_toggle
    label: Power Toggle
    kind: action
    command: "[STX]PWD:3[ETX]"
    params: []

  - id: power_query
    label: Power Status Query
    kind: query
    command: "[STX]PWD:?[ETX]"
    params: []

  - id: set_volume
    label: Set Volume
    kind: action
    command: "[STX]VOL:{value}[ETX]"
    params:
      - name: value
        type: integer
        min: 0
        max: 100
        description: Volume level 000-100

  - id: volume_query
    label: Volume Query
    kind: query
    command: "[STX]VOL:?[ETX]"
    params: []

  - id: mute_on
    label: Mute
    kind: action
    command: "[STX]MUT:1[ETX]"
    params: []

  - id: mute_off
    label: Unmute
    kind: action
    command: "[STX]MUT:0[ETX]"
    params: []

  - id: mute_query
    label: Mute Status Query
    kind: query
    command: "[STX]MUT:?[ETX]"
    params: []

  - id: select_input
    label: Select Input
    kind: action
    command: "[STX]INP:{input}[ETX]"
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
        description: Input source selection

  - id: input_query
    label: Input Query
    kind: query
    command: "[STX]INP:?[ETX]"
    params: []

  - id: set_channel
    label: Set Channel
    kind: action
    command: "[STX]CHA:{channel}[ETX]"
    params:
      - name: channel
        type: string
        description: "Channel number in xxx.x format (ATSC sub-channel supported)"
    notes: "Tuner models only (indicated by ¹ in source)"

  - id: channel_query
    label: Channel Query
    kind: query
    command: "[STX]CHA:?[ETX]"
    params: []

  - id: set_format
    label: Set Format
    kind: action
    command: "[STX]FOR:{format}[ETX]"
    params:
      - name: format
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

  - id: contrast_up
    label: Contrast Up
    kind: action
    command: "[STX]CON:+[ETX]"
    params: []

  - id: contrast_down
    label: Contrast Down
    kind: action
    command: "[STX]CON:-[ETX]"
    params: []

  - id: set_contrast
    label: Set Contrast
    kind: action
    command: "[STX]CON:{value}[ETX]"
    params:
      - name: value
        type: integer
        min: 0
        max: 100
        description: Contrast value 000-100

  - id: contrast_query
    label: Contrast Query
    kind: query
    command: "[STX]CON:?[ETX]"
    params: []

  - id: brightness_up
    label: Brightness Up
    kind: action
    command: "[STX]BRT:+[ETX]"
    params: []

  - id: brightness_down
    label: Brightness Down
    kind: action
    command: "[STX]BRT:-[ETX]"
    params: []

  - id: set_brightness
    label: Set Brightness
    kind: action
    command: "[STX]BRT:{value}[ETX]"
    params:
      - name: value
        type: integer
        min: 0
        max: 100
        description: Brightness value 000-100

  - id: brightness_query
    label: Brightness Query
    kind: query
    command: "[STX]BRT:?[ETX]"
    params: []

  - id: saturation_up
    label: Color Saturation Up
    kind: action
    command: "[STX]SAT:+[ETX]"
    params: []

  - id: saturation_down
    label: Color Saturation Down
    kind: action
    command: "[STX]SAT:-[ETX]"
    params: []

  - id: set_saturation
    label: Set Color Saturation
    kind: action
    command: "[STX]SAT:{value}[ETX]"
    params:
      - name: value
        type: integer
        min: 0
        max: 100
        description: Color saturation value 000-100

  - id: saturation_query
    label: Color Saturation Query
    kind: query
    command: "[STX]SAT:?[ETX]"
    params: []

  - id: tint_up
    label: Tint Up
    kind: action
    command: "[STX]TIN:+[ETX]"
    params: []

  - id: tint_down
    label: Tint Down
    kind: action
    command: "[STX]TIN:-[ETX]"
    params: []

  - id: set_tint
    label: Set Tint
    kind: action
    command: "[STX]TIN:{value}[ETX]"
    params:
      - name: value
        type: integer
        min: 0
        max: 100
        description: Tint value 000-100

  - id: tint_query
    label: Tint Query
    kind: query
    command: "[STX]TIN:?[ETX]"
    params: []

  - id: sharpness_up
    label: Sharpness Up
    kind: action
    command: "[STX]SHA:+[ETX]"
    params: []

  - id: sharpness_down
    label: Sharpness Down
    kind: action
    command: "[STX]SHA:-[ETX]"
    params: []

  - id: set_sharpness
    label: Set Sharpness
    kind: action
    command: "[STX]SHA:{value}[ETX]"
    params:
      - name: value
        type: integer
        min: 0
        max: 100
        description: Sharpness value 000-100

  - id: sharpness_query
    label: Sharpness Query
    kind: query
    command: "[STX]SHA:?[ETX]"
    params: []

  - id: set_color_temp
    label: Set Color Temperature
    kind: action
    command: "[STX]TEM:{value}[ETX]"
    params:
      - name: value
        type: enum
        values:
          - label: WARM
            value: "0"
          - label: NORMAL
            value: "1"
          - label: COOL
            value: "2"

  - id: color_temp_query
    label: Color Temperature Query
    kind: query
    command: "[STX]TEM:?[ETX]"
    params: []

  - id: set_backlight_mode
    label: Set Backlight Mode
    kind: action
    command: "[STX]BLT:{value}[ETX]"
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

  - id: backlight_mode_query
    label: Backlight Mode Query
    kind: query
    command: "[STX]BLT:?[ETX]"
    params: []

  - id: set_game_mode
    label: Set Game Mode
    kind: action
    command: "[STX]GAM:{value}[ETX]"
    params:
      - name: value
        type: enum
        values:
          - label: OFF
            value: "0"
          - label: ON
            value: "1"

  - id: key_0
    label: Key Digit 0
    kind: action
    command: "[STX]KEY:0[ETX]"
    params: []

  - id: key_1
    label: Key Digit 1
    kind: action
    command: "[STX]KEY:1[ETX]"
    params: []

  - id: key_2
    label: Key Digit 2
    kind: action
    command: "[STX]KEY:2[ETX]"
    params: []

  - id: key_3
    label: Key Digit 3
    kind: action
    command: "[STX]KEY:3[ETX]"
    params: []

  - id: key_4
    label: Key Digit 4
    kind: action
    command: "[STX]KEY:4[ETX]"
    params: []

  - id: key_5
    label: Key Digit 5
    kind: action
    command: "[STX]KEY:5[ETX]"
    params: []

  - id: key_6
    label: Key Digit 6
    kind: action
    command: "[STX]KEY:6[ETX]"
    params: []

  - id: key_7
    label: Key Digit 7
    kind: action
    command: "[STX]KEY:7[ETX]"
    params: []

  - id: key_8
    label: Key Digit 8
    kind: action
    command: "[STX]KEY:8[ETX]"
    params: []

  - id: key_9
    label: Key Digit 9
    kind: action
    command: "[STX]KEY:9[ETX]"
    params: []

  - id: key_sleep
    label: Key Sleep
    kind: action
    command: "[STX]KEY:11[ETX]"
    params: []

  - id: key_cc
    label: Key Closed Caption
    kind: action
    command: "[STX]KEY:12[ETX]"
    params: []

  - id: key_menu
    label: Key Menu Toggle
    kind: action
    command: "[STX]KEY:21[ETX]"
    params: []

  - id: key_display
    label: Key Display Toggle
    kind: action
    command: "[STX]KEY:22[ETX]"
    params: []

  - id: key_vol_up
    label: Key Volume Up / Navigate Right
    kind: action
    command: "[STX]KEY:23[ETX]"
    params: []

  - id: key_vol_down
    label: Key Volume Down / Navigate Left
    kind: action
    command: "[STX]KEY:24[ETX]"
    params: []

  - id: key_ch_up
    label: Key Channel Up / Navigate Up
    kind: action
    command: "[STX]KEY:25[ETX]"
    params: []

  - id: key_ch_down
    label: Key Channel Down / Navigate Down
    kind: action
    command: "[STX]KEY:26[ETX]"
    params: []

  - id: key_picture_standard
    label: Key Picture Mode Standard
    kind: action
    command: "[STX]KEY:27[ETX]"
    params: []

  - id: key_picture_dynamic
    label: Key Picture Mode Dynamic
    kind: action
    command: "[STX]KEY:28[ETX]"
    params: []

  - id: key_picture_theater
    label: Key Picture Mode Theater
    kind: action
    command: "[STX]KEY:29[ETX]"
    params: []

  - id: key_picture_personal
    label: Key Picture Mode Personal
    kind: action
    command: "[STX]KEY:30[ETX]"
    params: []

  - id: key_play
    label: Key Play
    kind: action
    command: "[STX]KEY:115[ETX]"
    params: []

  - id: key_pause
    label: Key Pause
    kind: action
    command: "[STX]KEY:116[ETX]"
    params: []

  - id: key_stop
    label: Key Stop
    kind: action
    command: "[STX]KEY:117[ETX]"
    params: []

  - id: key_skip_forward
    label: Key Skip Forward / Chapter+
    kind: action
    command: "[STX]KEY:118[ETX]"
    params: []

  - id: key_prev_channel
    label: Key Previous Channel
    kind: action
    command: "[STX]KEY:35[ETX]"
    params: []

  - id: key_enter
    label: Key Enter
    kind: action
    command: "[STX]KEY:36[ETX]"
    params: []

  - id: key_ok
    label: Key OK
    kind: action
    command: "[STX]KEY:37[ETX]"
    params: []

  - id: key_input_toggle
    label: Key Input Select Toggle
    kind: action
    command: "[STX]KEY:38[ETX]"
    params: []

  - id: key_skip_backward
    label: Key Skip Backward / Chapter-
    kind: action
    command: "[STX]KEY:19[ETX]"
    params: []

  - id: key_fast_forward
    label: Key Fast Forward
    kind: action
    command: "[STX]KEY:109[ETX]"
    params: []

  - id: key_fast_backward
    label: Key Fast Backward
    kind: action
    command: "[STX]KEY:112[ETX]"
    params: []

  - id: key_exit
    label: Key Exit
    kind: action
    command: "[STX]KEY:110[ETX]"
    params: []

  - id: key_dot
    label: Key Digit Dot / ATSC Sub-Channel
    kind: action
    command: "[STX]KEY:104[ETX]"
    params: []

  - id: key_guide
    label: Key Guide Toggle
    kind: action
    command: "[STX]KEY:105[ETX]"
    params: []

  - id: key_red
    label: Key Red
    kind: action
    command: "[STX]KEY:32[ETX]"
    params: []

  - id: key_green
    label: Key Green
    kind: action
    command: "[STX]KEY:114[ETX]"
    params: []

  - id: key_yellow
    label: Key Yellow
    kind: action
    command: "[STX]KEY:111[ETX]"
    params: []

  - id: key_blue
    label: Key Blue
    kind: action
    command: "[STX]KEY:113[ETX]"
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    label: Power State
    query_command: "[STX]PWD:?[ETX]"
    response_pattern: "[STX]{value}[ETX]"
    type: enum
    values:
      - label: OFF
        value: "0"
      - label: ON
        value: "1"

  - id: volume_level
    label: Volume Level
    query_command: "[STX]VOL:?[ETX]"
    response_pattern: "[STX]{value}[ETX]"
    type: integer
    min: 0
    max: 100

  - id: mute_state
    label: Mute State
    query_command: "[STX]MUT:?[ETX]"
    response_pattern: "[STX]{value}[ETX]"
    type: enum
    values:
      - label: UNMUTED
        value: "0"
      - label: MUTED
        value: "1"

  - id: input_state
    label: Current Input
    query_command: "[STX]INP:?[ETX]"
    response_pattern: "[STX]{value}[ETX]"
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

  - id: channel_state
    label: Current Channel
    query_command: "[STX]CHA:?[ETX]"
    response_pattern: "[STX]{value}[ETX]"
    type: string

  - id: contrast_level
    label: Contrast Level
    query_command: "[STX]CON:?[ETX]"
    response_pattern: "[STX]CON:{value}[ETX]"
    type: integer
    min: 0
    max: 100

  - id: brightness_level
    label: Brightness Level
    query_command: "[STX]BRT:?[ETX]"
    response_pattern: "[STX]BRT:{value}[ETX]"
    type: integer
    min: 0
    max: 100

  - id: saturation_level
    label: Color Saturation Level
    query_command: "[STX]SAT:?[ETX]"
    response_pattern: "[STX]SAT:{value}[ETX]"
    type: integer
    min: 0
    max: 100

  - id: tint_level
    label: Tint Level
    query_command: "[STX]TIN:?[ETX]"
    response_pattern: "[STX]TIN:{value}[ETX]"
    type: integer
    min: 0
    max: 100

  - id: color_temp
    label: Color Temperature
    query_command: "[STX]TEM:?[ETX]"
    response_pattern: "[STX]{value}[ETX]"
    type: enum
    values:
      - label: WARM
        value: "0"
      - label: NORMAL
        value: "1"
      - label: COOL
        value: "2"

  - id: backlight_mode
    label: Backlight Mode
    query_command: "[STX]BLT:?[ETX]"
    response_pattern: "[STX]{value}[ETX]"
    type: enum
    values:
      - label: Day
        value: "0"
      - label: Night
        value: "1"
      - label: Auto
        value: "2"
```

## Variables
```yaml
# UNRESOLVED: all settable parameters modeled as actions; no additional variables identified
```

## Events
```yaml
# No unsolicited notifications documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
- Commands framed with STX (0x02) and ETX (0x03); all content between is ASCII.
- Optional unit ID (000-255) prefix: `[STX]{ID};{CMD}:{PARAM}[ETX]`. ID 000 = global broadcast.
- ACK response: `[STX]OK[ETX]`. Error: `[STX]ER[ETX]`. Unsupported command: `[STX]INVALID[ETX]`.
- AMX programmers may need 100ms delays between parameters.
- Contrast/brightness/saturation/tint/sharpness support relative `+`/`-` params as well as absolute set.
- Channel command uses `xxx.x` format supporting ATSC sub-channels (tuner models only).
- Source lists "STORM, STORM ULTRA BRIGHT, S2" alongside STRM models for picture adjustment commands; spec scoped to STRM-47.2.
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: SHA query response format not explicitly shown (inferred from pattern of other picture commands) -->
<!-- UNRESOLVED: GAM query not documented in source; only set command shown -->
<!-- UNRESOLVED: no power-on sequencing or warm-up delay documented -->

## Provenance

```yaml
source_domains:
  - storage.googleapis.com
source_urls:
  - https://storage.googleapis.com/wp-stateless/2019/10/RS232-protocol-entertainment-and-outdoor-tvs.pdf
retrieved_at: 2026-05-26T20:31:55.077Z
last_checked_at: 2026-05-31T21:05:28.277Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T21:05:28.277Z
matched_actions: 79
action_count: 79
confidence: medium
summary: "All 79 spec actions found verbatim in source; transport parameters confirmed; bidirectional command coverage is complete. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "all settable parameters modeled as actions; no additional variables identified"
- "no multi-step sequences described in source"
- "no safety warnings or interlock procedures in source"
- "firmware version compatibility not stated in source"
- "SHA query response format not explicitly shown (inferred from pattern of other picture commands)"
- "GAM query not documented in source; only set command shown"
- "no power-on sequencing or warm-up delay documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
