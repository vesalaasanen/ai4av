---
spec_id: admin/knoll-hd290
schema_version: ai4av-public-spec-v1
revision: 1
title: "Knoll HD290 Control Spec"
manufacturer: Knoll
model_family: HD290
aliases: []
compatible_with:
  manufacturers:
    - Knoll
  models:
    - HD290
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - projector-database.com
source_urls:
  - https://www.projector-database.com/pdf/knollhd108-178-290-292-an-en.pdf
retrieved_at: 2026-05-21T03:56:51.060Z
last_checked_at: 2026-05-26T20:03:36.690Z
generated_at: 2026-05-26T20:03:36.690Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - BOE
  - LMR
  - SYS
verification:
  verdict: verified
  checked_at: 2026-05-26T20:03:36.690Z
  matched_actions: 76
  action_count: 76
  confidence: high
  summary: "All 76 spec actions matched cleanly to source commands; transport verified; comprehensive coverage including major actions and read-only variables."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-21
---

# Knoll HD290 Control Spec

## Summary
RS-232C serial control interface for the Knoll HD290 projector. All commands follow a 3-letter alpha format enclosed in parentheses, supporting both read (?) and write operations. No authentication required.

<!-- UNRESOLVED: only HD290 confirmed; HD178 and HD292 listed in source title are not included in compatible_with -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # PWR command present
- routable   # SRC command for source selection present
- queryable  # read commands (?) present
- levelable  # BRT, CON, SHP, etc. present
```

## Actions
```yaml
- id: power
  label: Power
  kind: action
  params:
    - name: value
      type: integer
      description: 0 = off, 1 = on, 2-9999 = on
  responses:
    - description: returns (0,1) or (?) on error

- id: brightness
  label: Brightness
  kind: action
  params:
    - name: value
      type: integer
      description: Range 0-255, default 128
  responses:
    - description: returns (0-255,current)

- id: contrast
  label: Contrast
  kind: action
  params:
    - name: value
      type: integer
      description: Range 0-255, default 128

- id: aspect_ratio
  label: Aspect Ratio
  kind: action
  params:
    - name: value
      type: integer
      description: 0=Native, 1=4:3, 2=16:9, 3=Letterbox, 4=Natural Wide

- id: source
  label: Source
  kind: action
  params:
    - name: value
      type: integer
      description: 0=HDMI, 1=M1-DA, 2=Component, 3=S-Video, 4=Composite, 5=SCART RGB

- id: color_space
  label: Color Space
  kind: action
  params:
    - name: value
      type: integer
      description: 0=RGB, 2=REC601, 3=REC709

- id: color_temp
  label: Color Temperature
  kind: action
  params:
    - name: value
      type: integer
      description: 0=6500K, 1=7500K, 2=9300K, 3=Native

- id: color
  label: Color
  kind: action
  params:
    - name: value
      type: integer
      description: Range 0-100, default 50

- id: tint
  label: Tint
  kind: action
  params:
    - name: value
      type: integer
      description: Range 2-98, default 50

- id: sharpness
  label: Sharpness
  kind: action
  params:
    - name: value
      type: integer
      description: Range 0-4, default 2

- id: lamp_hours
  label: Lamp Hours
  kind: query
  params: []
  responses:
    - description: returns (0-9999,hours)

- id: auto_ceiling
  label: Auto Ceiling Enable
  kind: action
  params:
    - name: value
      type: integer
      description: 0=off, 1=on

- id: auto_color_space
  label: Auto Color Space Enable
  kind: action
  params:
    - name: value
      type: integer
      description: 0=off, 1=on

- id: auto_image
  label: Auto Image
  kind: action
  params:
    - name: value
      type: integer
      description: 0=off, 1=on

- id: auto_power
  label: Auto Power Enable
  kind: action
  params:
    - name: value
      type: integer
      description: 0=off, 1=on

- id: auto_source
  label: Auto Source Enable
  kind: action
  params:
    - name: value
      type: integer
      description: 0=off, 1=on

- id: auto_video_standard
  label: Auto Video Standard Enable
  kind: action
  params:
    - name: value
      type: integer
      description: 0=off, 1=on

- id: blank
  label: Blank
  kind: action
  params:
    - name: value
      type: integer
      description: 0=Black screen, 1=Blue screen

- id: blue_color_offset
  label: Blue Color Offset
  kind: action
  params:
    - name: value
      type: integer
      description: Range 1-255, default 128

- id: blue_gain
  label: Blue Gain
  kind: action
  params:
    - name: value
      type: integer
      description: Range 1-255, default 128

- id: green_color_offset
  label: Green Color Offset
  kind: action
  params:
    - name: value
      type: integer
      description: Range 0-255, default 128

- id: green_gain
  label: Green Gain
  kind: action
  params:
    - name: value
      type: integer
      description: Range 0-255, default 128

- id: red_color_offset
  label: Red Color Offset
  kind: action
  params:
    - name: value
      type: integer
      description: Range 0-255, default 128

- id: red_gain
  label: Red Gain
  kind: action
  params:
    - name: value
      type: integer
      description: Range 0-255, default 128

- id: ceiling
  label: Ceiling Mount
  kind: action
  params:
    - name: value
      type: integer
      description: 0=off, 1=on

- id: display_messages
  label: Display Messages
  kind: action
  params:
    - name: value
      type: integer
      description: 0=off, 1=on

- id: factory_reset
  label: Factory Reset
  kind: action
  params:
    - name: value
      type: integer
      description: Write only, 0-1

- id: flesh_tone_correction
  label: Flesh Tone Correction
  kind: action
  params:
    - name: value
      type: integer
      description: 0=off, 1=on

- id: gamma_table
  label: Gamma Table
  kind: action
  params:
    - name: value
      type: integer
      description: 0-8, default 3. 2=Video, 3=Film, 5=Bright Room, 7=CRT, 8=PC

- id: high_power
  label: High Power Enable
  kind: action
  params:
    - name: value
      type: integer
      description: 0=off, 1=on

- id: horizontal_position
  label: Horizontal Position
  kind: action
  params:
    - name: value
      type: integer

- id: vertical_keystone
  label: Vertical Keystone
  kind: action
  params:
    - name: value
      type: integer
      description: Range 0-80, default 40

- id: menu_enable
  label: Menu Enable
  kind: action
  params:
    - name: value
      type: integer
      description: 0=off, 1=on

- id: menu_navigation
  label: Menu Navigation
  kind: action
  params:
    - name: value
      type: integer
      description: 1=up, 2=down, 3=select

- id: language
  label: Language
  kind: action
  params:
    - name: value
      type: integer
      description: 0=English, 1=French, 2=German, 3=Italian, 4=Japanese, 5=Korean, 6=Norwegian, 7=Portuguese, 8=Russian, 9=Chinese Simplified, 10=Spanish, 11=Chinese Traditional

- id: noise_reduction_mode
  label: Noise Reduction Mode
  kind: action
  params:
    - name: value
      type: integer
      description: 0=Off, 1=Auto

- id: noise_reduction_level
  label: Noise Reduction Level
  kind: action
  params:
    - name: value
      type: integer
      description: Range 8-248, default 128

- id: overscan
  label: Overscan
  kind: action
  params:
    - name: value
      type: integer
      description: Range 0-2, default 0

- id: phase
  label: Phase
  kind: action
  params:
    - name: value
      type: integer
      description: Range 0-100, default 50

- id: power_save
  label: Power Save Enable
  kind: action
  params:
    - name: value
      type: integer
      description: 0=off, 1=on

- id: presets
  label: Presets
  kind: action
  params:
    - name: value
      type: integer
      description: 0=Default, 1=User 1, 2=User 2, 4=Off

- id: rear_project
  label: Rear Project
  kind: action
  params:
    - name: value
      type: integer
      description: 0=off, 1=on

- id: sleep_timer
  label: Sleep Timer
  kind: action
  params:
    - name: value
      type: integer
      description: 0=off, 1=on

- id: sync_threshold
  label: Sync Threshold Adjust
  kind: action
  params:
    - name: value
      type: integer
      description: Range 1-15, default 8

- id: source_1_program
  label: Source 1 Program
  kind: action
  params:
    - name: value
      type: integer
      description: Range 0-5

- id: source_2_program
  label: Source 2 Program
  kind: action
  params:
    - name: value
      type: integer
      description: Range 0-5

- id: source_3_program
  label: Source 3 Program
  kind: action
  params:
    - name: value
      type: integer
      description: Range 0-5

- id: source_5_program
  label: Source 5 Program
  kind: action
  params:
    - name: value
      type: integer
      description: Range 0-5

- id: startup_logo
  label: Startup Logo
  kind: action
  params:
    - name: value
      type: integer
      description: 0-2, default 2

- id: film_mode_auto_detect
  label: Film Mode Auto Detect
  kind: action
  params:
    - name: value
      type: integer
      description: 0=off, 1=on

- id: tracking
  label: Tracking
  kind: action
  params:
    - name: value
      type: integer
      description: Range 0-100, default 50

- id: screen_trigger_enable
  label: Screen Trigger Enable
  kind: action
  params:
    - name: value
      type: integer
      description: 0=off, 1=on

- id: translucent_osd
  label: Translucent OSD
  kind: action
  params:
    - name: value
      type: integer
      description: 0=off, 1=on

- id: test_pattern_enable
  label: Test Pattern Enable
  kind: action
  params:
    - name: value
      type: integer
      description: 0=off, 1=on

- id: test_pattern_select
  label: Test Pattern Select
  kind: action
  params:
    - name: value
      type: integer
      description: Range 0-9, default 0

- id: vertical_position
  label: Vertical Position
  kind: action
  params:
    - name: value
      type: integer
      description: Range 0-100, default 50

- id: video_standard
  label: Video Standard
  kind: action
  params:
    - name: value
      type: integer
      description: 0=Auto, 1=NTSC, 2=PAL, 5=SECAM

- id: white_peaking
  label: White Peaking
  kind: action
  params:
    - name: value
      type: integer
      description: Range 0-10, default 1

- id: save_user_1_preset
  label: Save User 1 Preset
  kind: action
  params:
    - name: value
      type: integer
      description: 0-1

- id: save_user_2_preset
  label: Save User 2 Preset
  kind: action
  params:
    - name: value
      type: integer
      description: 0-1

- id: save_user_3_preset
  label: Save User 3 Preset
  kind: action
  params:
    - name: value
      type: integer
      description: 0-1

- id: logo_capture_enable
  label: Logo Capture Enable
  kind: action
  params:
    - name: value
      type: integer
      description: 0=off, 1=on

- id: source_enable_0
  label: Source Enable 0 (HDMI)
  kind: action
  params:
    - name: value
      type: integer
      description: 0=disabled, 1=enabled

- id: source_enable_1
  label: Source Enable 1 (M1-DA)
  kind: action
  params:
    - name: value
      type: integer
      description: 0=disabled, 1=enabled

- id: source_enable_2
  label: Source Enable 2 (Component)
  kind: action
  params:
    - name: value
      type: integer
      description: 0=disabled, 1=enabled

- id: source_enable_3
  label: Source Enable 3 (S-Video)
  kind: action
  params:
    - name: value
      type: integer
      description: 0=disabled, 1=enabled

- id: source_enable_4
  label: Source Enable 4 (Composite)
  kind: action
  params:
    - name: value
      type: integer
      description: 0=disabled, 1=enabled

- id: source_enable_5
  label: Source Enable 5 (SCART RGB)
  kind: action
  params:
    - name: value
      type: integer
      description: 0=disabled, 1=enabled

- id: logo_capture_compress
  label: Logo Capture Compress
  kind: action
  params:
    - name: value
      type: integer
      description: 0=off, 1=on

- id: logo_capture_compression
  label: Logo Capture Compression
  kind: action
  params:
    - name: value
      type: integer
      description: Range 0-480, default 0

- id: current_sub_source
  label: Current Sub-source
  kind: action
  params:
    - name: value
      type: integer
      description: Range 0-7

- id: power_up_source
  label: Power-up Source
  kind: action
  params:
    - name: value
      type: integer
      description: 0-5

- id: effect_key_program
  label: Effect Key Program
  kind: action
  params:
    - name: value
      type: integer
      description: Range 0-11, default 8

- id: freeze
  label: Freeze
  kind: action
  params:
    - name: value
      type: integer
      description: 0=off, 1=on

- id: lamp_power
  label: Lamp Power
  kind: action
  params:
    - name: value
      type: integer
      description: 0=off, 1=on

- id: perform_lamp_reset
  label: Perform Lamp Reset
  kind: action
  params:
    - name: value
      type: integer
      description: 0-1
```

## Feedbacks
```yaml
# Read responses return (range,current) format, e.g. (0-22,10)
- id: power_state
  type: enum
  values: [off, on]

- id: brightness
  type: integer
  range: [0, 255]

- id: contrast
  type: integer
  range: [0, 255]

- id: lamp_hours
  type: integer
  range: [0, 9999]

- id: system_error_code
  type: integer
  range: [0, 7]
```

## Variables
```yaml
# Variables are settable parameters that are not discrete actions
- id: lamp_total_time
  label: Lamp Total Time On
  type: integer
  description: Total hours for all bulbs (read-only)

- id: illuminatng_state
  label: Illuminating State
  type: integer
  description: 0-2 (read-only)

- id: lamp_hours_bulb_1
  label: Lamp 1 Hours
  type: integer
  description: Hours for bulb 1 (read-only)

- id: lamp_hours_bulb_2
  label: Lamp 2 Hours
  type: integer
  description: Hours for bulb 2 (read-only)

- id: lamp_hours_bulb_3
  label: Lamp 3 Hours
  type: integer
  description: Hours for bulb 3 (read-only)

- id: strike_attempts_success
  label: Successful Strike Attempts
  type: integer
  description: 0-65535 (read-only)

- id: strike_attempts_total
  label: Total Strike Attempts
  type: integer
  description: 0-65535 (read-only)

- id: on_count
  label: Power On Count
  type: integer
  description: Number of times unit turned on (read-only)

- id: on_time_30
  label: 30 Minute On Count
  type: integer
  description: Times on for 30+ minutes (read-only)

- id: on_time_60
  label: 60 Minute On Count
  type: integer
  description: Times on for 60+ minutes (read-only)

- id: on_time_90
  label: 90 Minute On Count
  type: integer
  description: Times on for 90+ minutes (read-only)

- id: total_on_minutes
  label: Total On Minutes
  type: integer
  description: Total minutes unit has been on (read-only)

- id: current_on_minutes
  label: Current Session Minutes
  type: integer
  description: Minutes unit currently on (read-only)

- id: previous_on_minutes
  label: Previous Session Minutes
  type: integer
  description: Minutes unit was previously on (read-only)
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```

## Notes
Command format: `(AAA####)` for write, `(AAA?)` for read. Response on error is `?`. Values exceeding max are clamped to max. For power, 0=off and 1=on. For absolute settings on other commands, 0=off, 1-999=on.
<!-- UNRESOLVED:firmware version compatibility not stated in source -->
<!-- UNRESOLVED: only HD290 model listed; source title references HD178 and HD292 but these are not included -->

## Provenance

```yaml
source_domains:
  - projector-database.com
source_urls:
  - https://www.projector-database.com/pdf/knollhd108-178-290-292-an-en.pdf
retrieved_at: 2026-05-21T03:56:51.060Z
last_checked_at: 2026-05-26T20:03:36.690Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-26T20:03:36.690Z
matched_actions: 76
action_count: 76
confidence: high
summary: "All 76 spec actions matched cleanly to source commands; transport verified; comprehensive coverage including major actions and read-only variables."
```

## Known Gaps

```yaml
- BOE
- LMR
- SYS
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
