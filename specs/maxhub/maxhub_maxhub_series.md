---
schema_version: ai4av-public-spec-v1
device_id: maxhub/cfxxfa
entity_id: maxhub_maxhub_series
spec_id: admin/maxhub-ifp-v6
revision: 1
author: admin
title: "MAXHUB IFP V6 Control Spec"
status: published
manufacturer: MAXHUB
manufacturer_key: maxhub
model_family: CFXXFA
aliases: []
compatible_with:
  manufacturers:
    - MAXHUB
  models:
    - CFXXFA
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls:
  - "https://sgp-cstore-pub.maxhub.com/maxhub_global_public/software/v6/IFP%20V6%20RS-232%20&%20LAN%20Protocol%20%20Specification%20-0725.pdf"
source_documents:
  - title: "MAXHUB public source"
    url: "https://sgp-cstore-pub.maxhub.com/maxhub_global_public/software/v6/IFP%20V6%20RS-232%20&%20LAN%20Protocol%20%20Specification%20-0725.pdf"
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-26T18:13:34.840Z
  - title: "MAXHUB public source"
    url: "https://sgp-cstore-pub.maxhub.com/maxhub_global_public/software/v6/IFP%20V6%20RS-232%20&%20LAN%20Protocol%20%20Specification%20-0725.pdf"
    stage: download
    content_type: unknown
    checked_at: 2026-04-26T18:13:56.361Z
  - title: "MAXHUB public source"
    url: "https://sgp-cstore-pub.maxhub.com/maxhub_global_public/software/v6/IFP%20V6%20RS-232%20&%20LAN%20Protocol%20%20Specification%20-0725.pdf"
    stage: spec
    content_type: unknown
    checked_at: 2026-04-26T18:17:06.345Z
retrieved_at: 2026-04-26T18:17:06.345Z
last_checked_at: 2026-04-27T09:04:48.432Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "Not stated in exported source metadata."
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-27T09:04:48.432Z
  matched_actions: 22
  action_count: 22
  confidence: high
  summary: "All 22 spec actions matched source command tokens; transport parameters verified verbatim."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-26
---

# MAXHUB IFP V6 Control Spec

## Summary
MAXHUB interactive flat panel (IFP V6) with RS-232 and LAN control interfaces. Supports power, display settings, audio, video source selection, and timer scheduling. Control via hex-encoded binary protocol over serial or TCP.

<!-- UNRESOLVED: model CFXXFA is internal variant; front-panel model name not stated in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 4664
auth:
  type: none
```

## Traits
```yaml
- powerable
- levelable
- routable
- queryable
```

## Actions
```yaml
- id: power_backlight_off
  label: Backlight Off
  kind: action
  params: []

- id: power_backlight_on
  label: Backlight On
  kind: action
  params: []

- id: power_off
  label: Power Off
  kind: action
  params: []

- id: power_on
  label: Power On
  kind: action
  params: []

- id: set_backlight
  label: Set Backlight
  kind: action
  params:
    - name: value
      type: integer
      description: 0-100

- id: set_volume
  label: Set Volume
  kind: action
  params:
    - name: value
      type: integer
      description: 0-100

- id: set_mute
  label: Set Mute
  kind: action
  params:
    - name: value
      type: integer
      enum: [0, 1]

- id: set_pc_sound_mode
  label: Set PC Sound Mode
  kind: action
  params:
    - name: value
      type: integer
      enum: [0, 1]

- id: set_pc_picture_mode
  label: Set PC Picture Mode
  kind: action
  params:
    - name: value
      type: integer
      enum: [0, 1, 2]

- id: set_microphone
  label: Set Microphone
  kind: action
  params:
    - name: value
      type: integer
      enum: [0, 1]

- id: set_camera
  label: Set Camera
  kind: action
  params:
    - name: value
      type: integer
      enum: [0, 1]

- id: set_auto_brightness
  label: Set Auto Brightness
  kind: action
  params:
    - name: value
      type: integer
      enum: [0, 1]

- id: select_video_source
  label: Select Video Source
  kind: action
  params:
    - name: input
      type: integer
      description: 1=HDMI1, 103=Slot in PC, 104=Type-C1, 105=Type-C2

- id: set_contrast
  label: Set Contrast
  kind: action
  params:
    - name: value
      type: integer
      description: 0-100

- id: set_touch
  label: Set Touch
  kind: action
  params:
    - name: value
      type: integer
      enum: [0, 1]

- id: set_no_signal_power_off
  label: Set No Signal Power Off Timer
  kind: action
  params:
    - name: minutes
      type: integer
      description: 0=off, 1,3,5,10,15,30,45,60 minutes

- id: set_timing_power
  label: Set Timing Power Schedule
  kind: action
  params:
    - name: schedule
      type: object
      description: |
        Byte array (15 bytes):
        - Byte1: timer number 1-7
        - Byte2-8: day-of-week enable bits (Sun-Sat, On timer, Off timer)
        - Byte9: On timer enable
        - Byte10: On hour (0-23, encoded as value+16)
        - Byte11: On minute (0-59, encoded as value+16)
        - Byte12: Off timer enable
        - Byte13: Off hour (0-23)
        - Byte14: Off minute (0-59)
        - Byte15: reserved, set 0

- id: set_dynamic_contrast
  label: Set Dynamic Contrast
  kind: action
  params:
    - name: value
      type: integer
      enum: [0, 1]

- id: set_color_space
  label: Set Color Space
  kind: action
  params:
    - name: value
      type: integer
      enum: [0, 1, 2, 3]

- id: set_smart_sound_barrier
  label: Set Smart Sound Barrier
  kind: action
  params:
    - name: value
      type: integer
      enum: [0, 1, 2, 3, 4]

- id: set_intelligent_noise_reduction
  label: Set Intelligent Noise Reduction
  kind: action
  params:
    - name: value
      type: integer
      enum: [0, 1]

- id: set_language
  label: Set Language
  kind: action
  params:
    - name: value
      type: integer
      enum: [0, 2, 3, 4, 5, 8, 9, 20, 22, 25, 26]
      description: 0=English, 2=Español, 3=繁中, 4=简中, 5=Português, 8=Polish, 9=Russia, 20=Japanese, 22=Korean, 25=Vietnamese, 26=Thailand
```

## Feedbacks
```yaml
- id: power_state
  label: Power State
  type: enum
  values: [backlight_off, backlight_on, power_off, power_on]

- id: backlight_level
  label: Backlight Level
  type: integer
  range: [0, 100]

- id: volume_level
  label: Volume Level
  type: integer
  range: [0, 100]

- id: mute_state
  label: Mute State
  type: enum
  values: [off, on]

- id: pc_sound_mode
  label: PC Sound Mode
  type: enum
  values: [wall_mode, bracket_mode]

- id: pc_picture_mode
  label: PC Picture Mode
  type: enum
  values: [demonstration, soft, standard]

- id: microphone_state
  label: Microphone State
  type: enum
  values: [off, on]

- id: camera_state
  label: Camera State
  type: enum
  values: [off, on]

- id: auto_brightness_state
  label: Auto Brightness State
  type: enum
  values: [off, on]

- id: video_source
  label: Video Source
  type: enum
  values: [hdmi1, slot_in_pc, type_c1, type_c2]

- id: contrast_level
  label: Contrast Level
  type: integer
  range: [0, 100]

- id: touch_state
  label: Touch State
  type: enum
  values: [off, on]

- id: sleep_mode_minutes
  label: Sleep Mode Minutes
  type: integer
  range: [0, 60]

- id: on_off_timer
  label: On/Off Timer Query
  type: object
  description: Returns timer configuration (15-byte structure)

- id: dynamic_contrast_state
  label: Dynamic Contrast State
  type: enum
  values: [off, on]

- id: color_space
  label: Color Space
  type: enum
  values: [standard, srgb, dci_p3, adobe_rgb]

- id: smart_sound_barrier_state
  label: Smart Sound Barrier State
  type: enum
  values: [close, automatic, front_30, front_60, front_90]

- id: intelligent_noise_reduction_state
  label: Intelligent Noise Reduction State
  type: enum
  values: [off, on]

- id: language
  label: Language
  type: enum
  values: [english, espanol, traditional_chinese, simplified_chinese, portugues, polish, russia, japanese, korean, vietnamese, thailand]
```

## Variables
```yaml
# All settable parameters reflected in Feedbacks. No separate Variables section needed.
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Power on command (value=003) only supported over RS-232; LAN does not support it. Power off (value=002) also RS-232 only. Sleep mode (get) returns 3-byte minute value encoded as 3* 3*.

Command format: 9 bytes — start (0x3A), machine ID (30 31 = machine 1), set/get flag (53=set, 47=get), command type byte, data3 bytes, end (0x0D). Reply: 3A 30 31 72 ... 0D for success.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: authentication credentials not stated (none described) -->
<!-- UNRESOLVED: binary reply encoding for sleep mode minutes (3* 3* pattern) not fully decoded -->

## Provenance

```yaml
source_urls:
  - "https://sgp-cstore-pub.maxhub.com/maxhub_global_public/software/v6/IFP%20V6%20RS-232%20&%20LAN%20Protocol%20%20Specification%20-0725.pdf"
source_documents:
  - title: "MAXHUB public source"
    url: "https://sgp-cstore-pub.maxhub.com/maxhub_global_public/software/v6/IFP%20V6%20RS-232%20&%20LAN%20Protocol%20%20Specification%20-0725.pdf"
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-26T18:13:34.840Z
  - title: "MAXHUB public source"
    url: "https://sgp-cstore-pub.maxhub.com/maxhub_global_public/software/v6/IFP%20V6%20RS-232%20&%20LAN%20Protocol%20%20Specification%20-0725.pdf"
    stage: download
    content_type: unknown
    checked_at: 2026-04-26T18:13:56.361Z
  - title: "MAXHUB public source"
    url: "https://sgp-cstore-pub.maxhub.com/maxhub_global_public/software/v6/IFP%20V6%20RS-232%20&%20LAN%20Protocol%20%20Specification%20-0725.pdf"
    stage: spec
    content_type: unknown
    checked_at: 2026-04-26T18:17:06.345Z
retrieved_at: 2026-04-26T18:17:06.345Z
last_checked_at: 2026-04-27T09:04:48.432Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-27T09:04:48.432Z
matched_actions: 22
action_count: 22
confidence: high
summary: "All 22 spec actions matched source command tokens; transport parameters verified verbatim."
```

## Known Gaps

```yaml
[]
```
