---
spec_id: admin/maxhub-cfxxfa
schema_version: ai4av-public-spec-v1
revision: 1
title: "MAXHUB IFP V6 (CFXXFA) Control Spec"
manufacturer: MAXHUB
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
source_domains:
  - sgp-cstore-pub.maxhub.com
source_urls:
  - "https://sgp-cstore-pub.maxhub.com/maxhub_global_public/software/v6/IFP%20V6%20RS-232%20&%20LAN%20Protocol%20%20Specification%20-0725.pdf"
retrieved_at: 2026-04-26T18:17:06.345Z
last_checked_at: 2026-06-02T17:23:30.443Z
generated_at: 2026-06-02T17:23:30.443Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility, command timeouts, and connection keep-alive behavior not stated in source."
  - "source does not document safety warnings, interlock procedures, or power-on sequencing requirements."
  - "firmware version compatibility, command timeouts, keep-alive, and any LAN authentication are not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-02T17:23:30.443Z
  matched_actions: 79
  action_count: 79
  confidence: medium
  summary: "All 79 spec actions matched exactly to source commands with correct hex codes; all transport parameters verified against specification. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# MAXHUB IFP V6 (CFXXFA) Control Spec

## Summary
MAXHUB IFP V6 interactive flat panel display (model CFXXFA) controlled via RS-232 (DB-9 male, 9600/8/N/1) and LAN (TCP port 4664). All commands are 9-byte hex frames with a fixed start (0x3A), machine ID bytes (0x30 0x31 for ID 1), set/get opcode, command type, three data bytes, and 0x0D end byte. No authentication is required for either transport.

<!-- UNRESOLVED: firmware version compatibility, command timeouts, and connection keep-alive behavior not stated in source. -->

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
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred from power command examples
- routable        # inferred from video source command examples
- queryable       # inferred from GET command examples
- levelable       # inferred from volume/backlight/contrast command examples
```

## Actions
```yaml
- id: power_backlight_off
  label: Power Backlight Off
  kind: action
  command: "3A 30 31 53 30 30 30 30 0d"
  params: []

- id: power_backlight_on
  label: Power Backlight On
  kind: action
  command: "3A 30 31 53 30 30 30 31 0d"
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "3A 30 31 53 30 30 30 32 0d"
  params: []

- id: power_on
  label: Power On
  kind: action
  command: "3A 30 31 53 30 30 30 33 0d"
  notes: "RS232 only; no reply value."
  params: []

- id: backlight_set
  label: Backlight Set
  kind: action
  command: "3A 30 31 53 3F {value_hex} 0d"
  params:
    - name: value
      type: integer
      description: Backlight level 0-100 (three ASCII digits, e.g. 050 = 0x30 0x35 0x30)

- id: volume_set
  label: Volume Set
  kind: action
  command: "3A 30 31 53 38 {value_hex} 0d"
  params:
    - name: value
      type: integer
      description: Volume level 0-100 (three ASCII digits)

- id: mute_off
  label: Mute Off
  kind: action
  command: "3A 30 31 53 39 30 30 30 0d"
  params: []

- id: mute_on
  label: Mute On
  kind: action
  command: "3A 30 31 53 39 30 30 31 0d"
  params: []

- id: pc_sound_mode_wall
  label: PC Sound Mode Wall
  kind: action
  command: "3A 30 31 53 A0 30 30 30 0d"
  params: []

- id: pc_sound_mode_bracket
  label: PC Sound Mode Bracket
  kind: action
  command: "3A 30 31 53 A0 30 30 31 0d"
  params: []

- id: pc_picture_mode_demonstration
  label: PC Picture Mode Demonstration
  kind: action
  command: "3A 30 31 53 A1 30 30 30 0d"
  params: []

- id: pc_picture_mode_soft
  label: PC Picture Mode Soft
  kind: action
  command: "3A 30 31 53 A1 30 30 31 0d"
  params: []

- id: pc_picture_mode_standard
  label: PC Picture Mode Standard
  kind: action
  command: "3A 30 31 53 A1 30 30 32 0d"
  params: []

- id: microphone_off
  label: Microphone Off
  kind: action
  command: "3A 30 31 53 A2 30 30 30 0d"
  params: []

- id: microphone_on
  label: Microphone On
  kind: action
  command: "3A 30 31 53 A2 30 30 31 0d"
  params: []

- id: camera_off
  label: Camera Off
  kind: action
  command: "3A 30 31 53 A3 30 30 30 0d"
  params: []

- id: camera_on
  label: Camera On
  kind: action
  command: "3A 30 31 53 A3 30 30 31 0d"
  params: []

- id: auto_brightness_off
  label: Auto Brightness Off
  kind: action
  command: "3A 30 31 53 A4 30 30 30 0d"
  params: []

- id: auto_brightness_on
  label: Auto Brightness On
  kind: action
  command: "3A 30 31 53 A4 30 30 31 0d"
  params: []

- id: video_source_hdmi1
  label: Video Source HDMI1
  kind: action
  command: "3A 30 31 53 3A 30 30 31 0d"
  params: []

- id: video_source_slot_in_pc
  label: Video Source Slot in PC
  kind: action
  command: "3A 30 31 53 3A 31 30 33 0d"
  params: []

- id: video_source_type_c1
  label: Video Source Type-C1
  kind: action
  command: "3A 30 31 53 3A 31 30 34 0d"
  params: []

- id: video_source_type_c2
  label: Video Source Type-C2
  kind: action
  command: "3A 30 31 53 3A 31 30 35 0d"
  params: []

- id: contrast_set
  label: Contrast Set
  kind: action
  command: "3A 30 31 53 34 {value_hex} 0d"
  params:
    - name: value
      type: integer
      description: Contrast 0-100 (three ASCII digits)

- id: touch_off
  label: Touch Off
  kind: action
  command: "3A 30 31 53 44 30 30 30 0d"
  params: []

- id: touch_on
  label: Touch On
  kind: action
  command: "3A 30 31 53 44 30 30 31 0d"
  params: []

- id: no_signal_power_off_off
  label: No Signal Power Off Disabled
  kind: action
  command: "3A 30 31 53 46 30 30 30 0d"
  params: []

- id: no_signal_power_off_1min
  label: No Signal Power Off 1 minute
  kind: action
  command: "3A 30 31 53 46 30 30 31 0d"
  params: []

- id: no_signal_power_off_3min
  label: No Signal Power Off 3 minutes
  kind: action
  command: "3A 30 31 53 46 30 30 33 0d"
  params: []

- id: no_signal_power_off_5min
  label: No Signal Power Off 5 minutes
  kind: action
  command: "3A 30 31 53 46 30 30 35 0d"
  params: []

- id: no_signal_power_off_10min
  label: No Signal Power Off 10 minutes
  kind: action
  command: "3A 30 31 53 46 30 31 30 0d"
  params: []

- id: no_signal_power_off_15min
  label: No Signal Power Off 15 minutes
  kind: action
  command: "3A 30 31 53 46 30 31 35 0d"
  params: []

- id: no_signal_power_off_30min
  label: No Signal Power Off 30 minutes
  kind: action
  command: "3A 30 31 53 46 30 33 30 0d"
  params: []

- id: no_signal_power_off_45min
  label: No Signal Power Off 45 minutes
  kind: action
  command: "3A 30 31 53 46 30 34 35 0d"
  params: []

- id: no_signal_power_off_60min
  label: No Signal Power Off 60 minutes
  kind: action
  command: "3A 30 31 53 46 30 36 30 0d"
  params: []

- id: timing_power_on_off
  label: Timing Powering On/Off
  kind: action
  command: "3A 30 31 53 47 {byte1..byte15} 0D"
  notes: "15-byte payload. Byte1=0x1..0x07 selects timer slot 1-7. Byte2..Byte8 enable/disable each weekday (Sun..Sat). Byte9 enables On timer; Byte10=On hour (hex value 0x10..0x27 = decimal 16-39, subtract 16 for 0-23); Byte11=On minute (0x10..0x4B = 16-75, subtract 16 for 0-59). Byte12 enables Off timer; Byte13=Off hour; Byte14=Off minute. Byte15=reserved, set 0x00. If both Byte9 and Byte12 are 0x00, the target timer is deleted."
  params:
    - name: timer_slot
      type: integer
      description: Timer slot 1-7
    - name: sunday_enable
      type: integer
      description: 0=disabled, 1=enabled
    - name: monday_enable
      type: integer
      description: 0=disabled, 1=enabled
    - name: tuesday_enable
      type: integer
      description: 0=disabled, 1=enabled
    - name: wednesday_enable
      type: integer
      description: 0=disabled, 1=enabled
    - name: thursday_enable
      type: integer
      description: 0=disabled, 1=enabled
    - name: friday_enable
      type: integer
      description: 0=disabled, 1=enabled
    - name: saturday_enable
      type: integer
      description: 0=disabled, 1=enabled
    - name: on_timer_enable
      type: integer
      description: 0=disabled, 1=enabled
    - name: on_hour
      type: integer
      description: 0-23
    - name: on_minute
      type: integer
      description: 0-59
    - name: off_timer_enable
      type: integer
      description: 0=disabled, 1=enabled
    - name: off_hour
      type: integer
      description: 0-23
    - name: off_minute
      type: integer
      description: 0-59

- id: dynamic_contrast_off
  label: Dynamic Contrast Off
  kind: action
  command: "3A 30 31 53 A5 30 30 30 0d"
  params: []

- id: dynamic_contrast_on
  label: Dynamic Contrast On
  kind: action
  command: "3A 30 31 53 A5 30 30 31 0d"
  params: []

- id: color_space_standard
  label: Color Space Standard
  kind: action
  command: "3A 30 31 53 A6 30 30 30 0d"
  params: []

- id: color_space_srgb
  label: Color Space sRGB
  kind: action
  command: "3A 30 31 53 A6 30 30 31 0d"
  params: []

- id: color_space_dci_p3
  label: Color Space DCI-P3
  kind: action
  command: "3A 30 31 53 A6 30 30 32 0d"
  params: []

- id: color_space_adobe_rgb
  label: Color Space AdobeRGB
  kind: action
  command: "3A 30 31 53 A6 30 30 33 0d"
  params: []

- id: smart_sound_barrier_close
  label: Smart Sound Barrier Close
  kind: action
  command: "3A 30 31 53 A7 30 30 30 0d"
  params: []

- id: smart_sound_barrier_automatic
  label: Smart Sound Barrier Automatic
  kind: action
  command: "3A 30 31 53 A7 30 30 31 0d"
  params: []

- id: smart_sound_barrier_front_30
  label: Smart Sound Barrier Front 30
  kind: action
  command: "3A 30 31 53 A7 30 30 32 0d"
  params: []

- id: smart_sound_barrier_front_60
  label: Smart Sound Barrier Front 60
  kind: action
  command: "3A 30 31 53 A7 30 30 33 0d"
  params: []

- id: smart_sound_barrier_front_90
  label: Smart Sound Barrier Front 90
  kind: action
  command: "3A 30 31 53 A7 30 30 34 0d"
  params: []

- id: intelligent_noise_reduction_off
  label: Intelligent Noise Reduction Off
  kind: action
  command: "3A 30 31 53 A8 30 30 30 0d"
  params: []

- id: intelligent_noise_reduction_on
  label: Intelligent Noise Reduction On
  kind: action
  command: "3A 30 31 53 A8 30 30 31 0d"
  params: []

- id: language_english
  label: Language English
  kind: action
  command: "3A 30 31 53 3C 30 30 30 0d"
  params: []

- id: language_spanish
  label: Language Español
  kind: action
  command: "3A 30 31 53 3C 30 30 32 0d"
  params: []

- id: language_traditional_chinese
  label: Language 繁中
  kind: action
  command: "3A 30 31 53 3C 30 30 33 0d"
  params: []

- id: language_simplified_chinese
  label: Language 简中
  kind: action
  command: "3A 30 31 53 3C 30 30 34 0d"
  params: []

- id: language_portuguese
  label: Language Português
  kind: action
  command: "3A 30 31 53 3C 30 30 35 0d"
  params: []

- id: language_polish
  label: Language Polish
  kind: action
  command: "3A 30 31 53 3C 30 30 38 0d"
  params: []

- id: language_russia
  label: Language Russia
  kind: action
  command: "3A 30 31 53 3C 30 30 39 0d"
  params: []

- id: language_vietnamese
  label: Language Vietnamese
  kind: action
  command: "3A 30 31 53 3C 30 32 35 0d"
  params: []

- id: language_thailand
  label: Language Thailand
  kind: action
  command: "3A 30 31 53 3C 30 32 36 0d"
  params: []

- id: language_japanese
  label: Language Japanese
  kind: action
  command: "3A 30 31 53 3C 30 32 30 0d"
  params: []

- id: language_korean
  label: Language Korean
  kind: action
  command: "3A 30 31 53 3C 30 32 32 0d"
  params: []

- id: power_query
  label: Power Query
  kind: query
  command: "3A 30 31 47 30 30 30 30 0D"
  notes: "Reply: 3A 30 31 72 30 30 30 {N} 0D where N=0 backlight off, 1 backlight on, 2 power off. RS232 only."
  params: []

- id: backlight_query
  label: Backlight Query
  kind: query
  command: "3A 30 31 47 3F 30 30 30 0D"
  notes: "Reply: 3A 30 31 72 3F 30 35 30 0D (e.g. value 050 = level 50)."
  params: []

- id: volume_query
  label: Volume Query
  kind: query
  command: "3A 30 31 47 38 30 30 30 0D"
  notes: "Reply: 3A 30 31 72 38 30 35 30 0D (e.g. value 050 = level 50)."
  params: []

- id: mute_query
  label: Mute Query
  kind: query
  command: "3A 30 31 47 39 30 30 30 0D"
  notes: "Reply: 3A 30 31 72 39 30 30 {N} 0D where N=0 off, 1 on."
  params: []

- id: pc_sound_mode_query
  label: PC Sound Mode Query
  kind: query
  command: "3A 30 31 47 A0 30 30 30 0D"
  notes: "Reply: 3A 30 31 72 A0 30 30 {N} 0D where N=0 Wall, 1 Bracket."
  params: []

- id: pc_picture_mode_query
  label: PC Picture Mode Query
  kind: query
  command: "3A 30 31 47 A1 30 30 30 0D"
  notes: "Reply: 3A 30 31 72 A1 30 30 {N} 0D where N=0 Demonstration, 1 Soft, 2 Standard."
  params: []

- id: microphone_query
  label: Microphone Query
  kind: query
  command: "3A 30 31 47 A2 30 30 30 0D"
  notes: "Reply: 3A 30 31 72 A2 30 30 {N} 0D where N=0 off, 1 on."
  params: []

- id: camera_query
  label: Camera Query
  kind: query
  command: "3A 30 31 47 A3 30 30 30 0D"
  notes: "Reply: 3A 30 31 72 A3 30 30 {N} 0D where N=0 off, 1 on."
  params: []

- id: auto_brightness_query
  label: Auto Brightness Query
  kind: query
  command: "3A 30 31 47 A4 30 30 30 0D"
  notes: "Reply: 3A 30 31 72 A4 30 30 {N} 0D where N=0 off, 1 on."
  params: []

- id: video_source_query
  label: Video Source Query
  kind: query
  command: "3A 30 31 47 3A 30 30 30 0D"
  notes: "Reply: 3A 30 31 72 3A {value} 0D where value=001 HDMI1, 103 Slot in PC, 104 Type-C1, 105 Type-C2."
  params: []

- id: contrast_query
  label: Contrast Query
  kind: query
  command: "3A 30 31 47 34 30 30 30 0D"
  notes: "Reply: 3A 30 31 72 34 30 35 30 0D (e.g. value 050 = contrast 50)."
  params: []

- id: touch_query
  label: Touch Query
  kind: query
  command: "3A 30 31 47 44 30 30 30 0D"
  notes: "Reply: 3A 30 31 72 44 30 30 {N} 0D where N=0 off, 1 on."
  params: []

- id: sleep_mode_query
  label: Sleep Mode Query
  kind: query
  command: "3A 30 31 47 46 30 30 30 0D"
  notes: "Reply: 3A 30 31 72 46 30 3* 3* 0D (two variable ASCII digits, 0-60 minutes)."
  params: []

- id: on_off_timer_query
  label: On/Off Timer Query
  kind: query
  command: "3A 30 31 47 47 01 00 00 00 00 00 00 00 00 00 00 00 00 00 0D"
  notes: "Byte1[3:0] selects timer slot 1-7; Byte1[7:4] reserved=0. Bytes 2-15 reserved=0x00. Response structure mirrors the SET payload but is not specified byte-for-byte in source."
  params:
    - name: timer_slot
      type: integer
      description: Timer slot 1-7

- id: dynamic_contrast_query
  label: Dynamic Contrast Query
  kind: query
  command: "3A 30 31 47 A5 30 30 30 0D"
  notes: "Reply: 3A 30 31 72 A5 30 30 {N} 0D where N=0 off, 1 on."
  params: []

- id: color_space_query
  label: Color Space Query
  kind: query
  command: "3A 30 31 47 A6 30 30 30 0D"
  notes: "Reply: 3A 30 31 72 A6 30 30 {N} 0D where N=0 Standard, 1 sRGB, 2 DCI-P3, 3 AdobeRGB."
  params: []

- id: smart_sound_barrier_query
  label: Smart Sound Barrier Query
  kind: query
  command: "3A 30 31 47 A7 30 30 30 0D"
  notes: "Reply: 3A 30 31 72 A7 30 30 {N} 0D where N=0 Close, 1 Automatic, 2 Front 30, 3 Front 60, 4 Front 90."
  params: []

- id: intelligent_noise_reduction_query
  label: Intelligent Noise Reduction Query
  kind: query
  command: "3A 30 31 47 A8 30 30 30 0D"
  notes: "Reply: 3A 30 31 72 A8 30 30 {N} 0D where N=0 off, 1 on."
  params: []

- id: language_query
  label: Language Query
  kind: query
  command: "3A 30 31 47 3C 30 30 30 0D"
  notes: "Reply: 3A 30 31 72 3C {value} 0D where value encodes the current language (e.g. 000 English, 004 简中, 022 Korean)."
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [backlight_off, backlight_on, power_off]
  description: "From Power query reply 0x30 byte. RS232 only."

- id: backlight_level
  type: integer
  description: "0-100 from Backlight query reply"

- id: volume_level
  type: integer
  description: "0-100 from Volume query reply"

- id: mute_state
  type: enum
  values: [off, on]

- id: pc_sound_mode
  type: enum
  values: [wall, bracket]

- id: pc_picture_mode
  type: enum
  values: [demonstration, soft, standard]

- id: microphone_state
  type: enum
  values: [off, on]

- id: camera_state
  type: enum
  values: [off, on]

- id: auto_brightness_state
  type: enum
  values: [off, on]

- id: video_source
  type: enum
  values: [hdmi1, slot_in_pc, type_c1, type_c2]

- id: contrast_level
  type: integer
  description: "0-100 from Contrast query reply"

- id: touch_state
  type: enum
  values: [off, on]

- id: sleep_mode_minutes
  type: integer
  description: "0-60 from Sleep Mode query reply"

- id: dynamic_contrast_state
  type: enum
  values: [off, on]

- id: color_space
  type: enum
  values: [standard, srgb, dci_p3, adobe_rgb]

- id: smart_sound_barrier
  type: enum
  values: [close, automatic, front_30, front_60, front_90]

- id: intelligent_noise_reduction_state
  type: enum
  values: [off, on]

- id: language
  type: enum
  values: [english, spanish, traditional_chinese, simplified_chinese, portuguese, polish, russia, vietnamese, thailand, japanese, korean]
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not document safety warnings, interlock procedures, or power-on sequencing requirements.
```

## Notes
- All commands are 9-byte hex frames: `0x3A 0x30 0x31 [0x53 set|0x47 get] [cmd] [data x3] 0x0D`. Machine ID bytes are hard-coded to `0x30 0x31` (ID 1) — the source does not document how to target other machine IDs.
- Set success reply: `34 30 31 2B 0D`. Set fail reply: `34 30 31 2D 0D`.
- GET reply frames use the form `3A 30 31 72 [cmd] [data x3] 0D`.
- RS-232 DB-9 male pinout: pin 2 TXD, pin 3 RXD, pin 5 GND; other pins NC.
- Power On command (`...30 30 30 33 0d`) is documented as RS232-only with no reply value; Power state query is also RS232-only and not supported over LAN.
- Backlight/Volume/Contrast parameter values are three ASCII digits (e.g. value 50 = bytes `30 35 30`); implementer must encode integer to ASCII-hex digits, not raw hex.

<!-- UNRESOLVED: firmware version compatibility, command timeouts, keep-alive, and any LAN authentication are not stated in source. -->

## Provenance

```yaml
source_domains:
  - sgp-cstore-pub.maxhub.com
source_urls:
  - "https://sgp-cstore-pub.maxhub.com/maxhub_global_public/software/v6/IFP%20V6%20RS-232%20&%20LAN%20Protocol%20%20Specification%20-0725.pdf"
retrieved_at: 2026-04-26T18:17:06.345Z
last_checked_at: 2026-06-02T17:23:30.443Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:23:30.443Z
matched_actions: 79
action_count: 79
confidence: medium
summary: "All 79 spec actions matched exactly to source commands with correct hex codes; all transport parameters verified against specification. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility, command timeouts, and connection keep-alive behavior not stated in source."
- "source does not document safety warnings, interlock procedures, or power-on sequencing requirements."
- "firmware version compatibility, command timeouts, keep-alive, and any LAN authentication are not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
