---
spec_id: admin/dynalite-patpa
schema_version: ai4av-public-spec-v1
revision: 1
title: "Dynalite Patpa Control Spec"
manufacturer: Dynalite
model_family: Patpa
aliases: []
compatible_with:
  manufacturers:
    - Dynalite
  models:
    - Patpa
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - docs.dynalite.com
source_urls:
  - https://docs.dynalite.com/system-builder/latest/quick_start/dynet_opcodes.html
retrieved_at: 2026-09-05T02:05:22.909Z
last_checked_at: 2026-09-05T22:16:16.356Z
generated_at: 2026-09-05T22:16:16.356Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model name \"Patpa\" does not appear anywhere in the source text — source is a generic \"Basic DyNet Opcodes\" reference. Firmware, hardware variant, and voltage/power specs not stated."
  - "flow control not stated in source"
  - "no unsolicited events documented in source; report messages (60/62/4A)"
  - "no multi-step sequences documented in source."
  - "source contains no safety warnings or interlock procedures."
  - "model name \"Patpa\" not present in source — source is a generic DyNet opcode reference; confirm actual product before publishing."
  - "physical message format (5C sync) documented but without opcode examples."
  - "no voltage, current, or power specifications in source."
  - "flow control not stated in source."
verification:
  verdict: verified
  checked_at: 2026-09-05T22:16:16.356Z
  matched_actions: 39
  action_count: 39
  confidence: medium
  summary: "All 39 spec action units match source opcodes 03/65/64/0F/68/69/6B/71/72/73/74/75/76/79/04/5F/61/63/08/09/66/67/17/18/10/15/16/11/1A/1B/31/3A/3B/48/49/14/40/20/21; Feedbacks 60/62/4A also covered. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-05
---

# Dynalite Patpa Control Spec

## Summary
Dynalite Patpa lighting control device speaking the DyNet protocol over RS-485 serial (9600 bps, 8 data bits, 1 stop bit, no parity). Spec covers basic DyNet logical-message opcodes: preset recall/program, channel ramp/fade, level and preset reporting, panic, control-panel lockout, daylight harvesting, occupancy detection, user preferences, and area linking.

<!-- UNRESOLVED: model name "Patpa" does not appear anywhere in the source text — source is a generic "Basic DyNet Opcodes" reference. Firmware, hardware variant, and voltage/power specs not stated. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# - levelable       (ramp/fade to level, ramp on/off, fade to preset - opcodes 68/69/6B/71/72/73/74/75/79/5F)
# - queryable       (request channel level 61, request preset 63, request user preference 49)
traits:
  - levelable
  - queryable
```

## Actions
```yaml
# DyNet logical frame: 8 bytes - [1C sync] [area] [data1] [opcode] [data2] [data3] [join] [checksum]
# Join byte usually FF. Checksum = negative 8-bit two's-complement sum of bytes 0-6
# (source: "Checksum = Negative 8 bit 2s Complement sum of bytes 1-7"; verified against
# all source examples: sum of all 8 bytes ≡ 0x00 mod 256).
# Timing: idle between bytes <1ms; delay between packets >10ms.

- id: select_preset
  label: Select Current Preset
  kind: action
  command: "1C {area} {fade_lo} {preset} {fade_hi} {bank} {join} {checksum}"
  # source example: 1C 01 20 03 00 00 FF C1 (Select Preset 4, Area 1)
  params:
    - name: area
      type: integer
      description: "Area number (hex byte)"
    - name: preset
      type: string
      description: "Preset opcode byte: 00=P1, 01=P2, 02=P3, 03=P4, 0A=P5, 0B=P6, 0C=P7, 0D=P8"
    - name: bank
      type: integer
      description: "Preset bank: 00=P1-P8, 01=P9-P16, 02=P17-P24, etc."
    - name: fade_lo
      type: integer
      description: "Fade rate low byte (source: 'usually 100'; example uses 0x20)"
    - name: fade_hi
      type: integer
      description: "Fade rate high byte (source: usually 0)"

- id: select_preset_linear
  label: Select Current Preset (Linear)
  kind: action
  command: "1C {area} {preset} 65 {fade_lo} {fade_hi} {join} {checksum}"
  # source example: 1C 01 03 65 64 00 FF 18 (Preset 4, Area 1, 2s fade)
  params:
    - name: area
      type: integer
      description: "Area number (hex byte)"
    - name: preset
      type: integer
      description: "Preset (0 origin)"
    - name: fade_lo
      type: integer
      description: "Fade time low byte; 16-bit fade time in 20 ms steps"
    - name: fade_hi
      type: integer
      description: "Fade time high byte; 16-bit fade time in 20 ms steps"

- id: preset_offset
  label: Preset Offset
  kind: action
  command: "1C {area} {offset_plus_80} 64 00 00 {join} {checksum}"
  # source example: 1C 01 8F 64 00 00 FF F1 (offset 15, Area 1)
  params:
    - name: area
      type: integer
      description: "Area number (hex byte)"
    - name: offset_plus_80
      type: integer
      description: "Offset value plus bit 8 set (offset + 0x80) to distinguish Preset Offset from Swap Bank"

- id: reset_preset
  label: Reset Preset
  kind: action
  command: "1C {area} {fade_lo} 0F {fade_hi} 00 {join} {checksum}"
  # source example: 1C 01 FA 0F 00 00 FF DB (Area 1, 5s)
  params:
    - name: area
      type: integer
      description: "Area number (hex byte)"
    - name: fade_lo
      type: integer
      description: "Fade time low byte; 16-bit fade time in 20 ms steps"
    - name: fade_hi
      type: integer
      description: "Fade time high byte; 16-bit fade time in 20 ms steps"

- id: ramp_off
  label: Ramp Channel/Area to Off
  kind: action
  command: "1C {area} {channel} 68 00 {ramp_rate} {join} {checksum}"
  # source example: 1C 01 03 68 00 32 FF 47 (Channel 4, Area 1, 5s)
  params:
    - name: area
      type: integer
      description: "Area number (hex byte)"
    - name: channel
      type: integer
      description: "Channel (0 origin, FF = all channels in the area)"
    - name: ramp_rate
      type: integer
      description: "Ramp rate in 100 ms steps (time to fade 0 to 100%)"

- id: ramp_on
  label: Ramp Channel/Area to On
  kind: action
  command: "1C {area} {channel} 69 00 {ramp_rate} {join} {checksum}"
  # source example: 1C 01 03 69 00 32 FF 46 (Channel 4, Area 1, 5s)
  params:
    - name: area
      type: integer
      description: "Area number (hex byte)"
    - name: channel
      type: integer
      description: "Channel (0 origin, FF = all channels in the area)"
    - name: ramp_rate
      type: integer
      description: "Ramp rate in 100 ms steps (time to fade 0 to 100%)"

- id: fade_to_preset
  label: Fade Channel/Area to Preset
  kind: action
  command: "1C {area} {channel} 6B {preset} {fade_time} {join} {checksum}"
  # source example: 1C 01 03 6B 03 64 FF 0F (Area 1 Ch 4, Preset 4, 2.00s)
  params:
    - name: area
      type: integer
      description: "Area number (hex byte)"
    - name: channel
      type: integer
      description: "Channel (0 origin, FF = all channels in the area)"
    - name: preset
      type: integer
      description: "Preset (0 origin)"
    - name: fade_time
      type: integer
      description: "Fade time in 20 ms steps"

- id: ramp_to_level_100ms
  label: Ramp Channel/Area to a Level (0.1s to 25.5s)
  kind: action
  command: "1C {area} {channel} 71 {level} {ramp_rate} {join} {checksum}"
  # source example: 1C 02 02 71 82 32 FF BC (Area 2 Ch 3, 50%, 5s)
  params:
    - name: area
      type: integer
      description: "Area number (hex byte)"
    - name: channel
      type: integer
      description: "Channel (0 origin, FF = all channels in the area)"
    - name: level
      type: integer
      description: "Channel level (01 = 100%, FF = 0%)"
    - name: ramp_rate
      type: integer
      description: "Ramp rate in 100 ms steps"

- id: fade_to_level_secs
  label: Fade Channel/Area to a Level (1s to 255s)
  kind: action
  command: "1C {area} {channel} 72 {level} {fade_rate} {join} {checksum}"
  # source example: 1C 02 02 72 82 32 FF BB (Area 2 Ch 3, 50%, 50s)
  params:
    - name: area
      type: integer
      description: "Area number (hex byte)"
    - name: channel
      type: integer
      description: "Channel (0 origin, FF = all channels in the area)"
    - name: level
      type: integer
      description: "Channel level (01 = 100%, FF = 0%)"
    - name: fade_rate
      type: integer
      description: "Fade rate in 1 s steps"

- id: fade_to_level_mins
  label: Fade Channel/Area to a Level (1min to 22min)
  kind: action
  command: "1C {area} {channel} 73 {level} {fade_rate} {join} {checksum}"
  # source example: 1C 02 02 73 82 0F FF DD (Area 2 Ch 3, 50%, 15 min)
  params:
    - name: area
      type: integer
      description: "Area number (hex byte)"
    - name: channel
      type: integer
      description: "Channel (0 origin, FF = all channels in the area)"
    - name: level
      type: integer
      description: "Channel level (01 = 100%, FF = 0%)"
    - name: fade_rate
      type: integer
      description: "Fade rate in 1 min steps, max 22 minutes"

- id: fade_off
  label: Fade Channel/Area to Off
  kind: action
  command: "1C {area} {channel} 74 {fade_lo} {fade_hi} {join} {checksum}"
  # source example: 1C 04 FF 74 64 00 FF 0A (Area 4 all channels, 2.00s)
  params:
    - name: area
      type: integer
      description: "Area number (hex byte)"
    - name: channel
      type: integer
      description: "Channel (0 origin, FF = all channels in the area)"
    - name: fade_lo
      type: integer
      description: "Fade time low byte; 16-bit fade time in 20 ms steps"
    - name: fade_hi
      type: integer
      description: "Fade time high byte; 16-bit fade time in 20 ms steps"

- id: fade_on
  label: Fade Channel/Area to On
  kind: action
  command: "1C {area} {channel} 75 {fade_lo} {fade_hi} {join} {checksum}"
  # source example: 1C 04 FF 75 64 00 FF 09 (Area 4 all channels, 2.00s)
  params:
    - name: area
      type: integer
      description: "Area number (hex byte)"
    - name: channel
      type: integer
      description: "Channel (0 origin, FF = all channels in the area)"
    - name: fade_lo
      type: integer
      description: "Fade time low byte; 16-bit fade time in 20 ms steps"
    - name: fade_hi
      type: integer
      description: "Fade time high byte; 16-bit fade time in 20 ms steps"

- id: stop_fade
  label: Stop Fade Channel/Area
  kind: action
  command: "1C {area} {channel} 76 00 00 {join} {checksum}"
  # source example: 1C 04 05 76 00 00 FF 66 (Area 4 Channel 6)
  params:
    - name: area
      type: integer
      description: "Area number (hex byte)"
    - name: channel
      type: integer
      description: "Channel (0 origin, FF = all channels in the area)"

- id: fade_area_to_level
  label: Fade Area to a Level
  kind: action
  command: "1C {area} {level} 79 {fade_lo} {fade_hi} {join} {checksum}"
  # source example: 1C 04 82 79 64 00 FF 82 (Area 4, 50%, 2s)
  # note: source byte table labels byte 2 "Channel" but the example uses it as level (82 = 50%)
  params:
    - name: area
      type: integer
      description: "Area number (hex byte)"
    - name: level
      type: integer
      description: "Level (01 = 100%, FF = 0%); example uses 82 = 50%"
    - name: fade_lo
      type: integer
      description: "Fade time low byte; 16-bit fade time in 20 ms steps"
    - name: fade_hi
      type: integer
      description: "Fade time high byte; 16-bit fade time in 20 ms steps"

- id: area_off
  label: Set to Off
  kind: action
  command: "1C {area} {fade_lo} 04 {fade_hi} 00 {join} {checksum}"
  # source example: 1C 03 0A 04 00 00 FF D4 (turn Area 3 off)
  params:
    - name: area
      type: integer
      description: "Area number (hex byte)"
    - name: fade_lo
      type: integer
      description: "Fade rate low byte (source: 'usually 100'; example uses 0x0A)"
    - name: fade_hi
      type: integer
      description: "Fade rate high byte (source: usually 0)"

- id: ramp_level_lit_channels
  label: Ramp Channel/Area to a Level except channels preset to 0% or don't care
  kind: action
  command: "1C {area} {channel} 5F {level} {ramp_rate} {join} {checksum}"
  # source example: 1C 04 FF 5F 01 32 FF 50 (Area 4, toward 100%, 5.00s)
  params:
    - name: area
      type: integer
      description: "Area number (hex byte)"
    - name: channel
      type: integer
      description: "Channel (0 origin, FF = all channels in the area)"
    - name: level
      type: integer
      description: "Level (01 = 100%, FF = 0%)"
    - name: ramp_rate
      type: integer
      description: "Ramp rate in 100 ms steps"

- id: request_channel_level
  label: Request Channel Level
  kind: query
  command: "1C {area} {channel} 61 00 00 {join} {checksum}"
  # source example: 1C 02 04 61 00 00 FF 7E (Channel 5, Area 2)
  params:
    - name: area
      type: integer
      description: "Area number (hex byte)"
    - name: channel
      type: integer
      description: "Channel (0 origin)"

- id: request_preset
  label: Request Preset
  kind: query
  command: "1C {area} 00 63 00 00 {join} {checksum}"
  # source example: 1C 04 00 63 00 00 FF 7E (current preset of Area 4)
  params:
    - name: area
      type: integer
      description: "Area number (hex byte)"

- id: program_current_preset
  label: Program Current Preset
  kind: action
  command: "1C {area} 00 08 00 00 {join} {checksum}"
  # source example: 1C 04 00 08 00 00 FF D9 (save Area 4 levels to current preset)
  params:
    - name: area
      type: integer
      description: "Area number (hex byte)"

- id: program_defined_preset
  label: Program Defined Preset
  kind: action
  command: "1C {area} {preset} 09 00 00 {join} {checksum}"
  # source example: 1C 04 00 09 00 00 FF D8 (save Area 4 levels to Preset 1)
  params:
    - name: area
      type: integer
      description: "Area number (hex byte)"
    - name: preset
      type: integer
      description: "Preset (0 origin)"

- id: save_current_preset
  label: Save Current Preset
  kind: action
  command: "1C {area} 00 66 00 00 {join} {checksum}"
  # source example: 1C 01 00 66 00 00 FF 7E (saves current preset number)
  params:
    - name: area
      type: integer
      description: "Area number (hex byte)"

- id: restore_saved_preset
  label: Restore Saved Preset
  kind: action
  command: "1C {area} {fade_lo} 67 {fade_hi} 00 {join} {checksum}"
  # source example: 1C 01 FA 67 00 00 FF 83 (Area 1)
  params:
    - name: area
      type: integer
      description: "Area number (hex byte)"
    - name: fade_lo
      type: integer
      description: "Fade time low byte; 16-bit fade time in 20 ms steps"
    - name: fade_hi
      type: integer
      description: "Fade time high byte; 16-bit fade time in 20 ms steps"

- id: panic
  label: Panic (locks panels and selects panic preset)
  kind: action
  command: "1C {area} F0 17 00 00 {join} {checksum}"
  # source example: 1C 02 F0 17 00 00 FF DC (Area 2)
  # note: source byte table says byte 2 = 0 (unused) but the example uses F0
  params:
    - name: area
      type: integer
      description: "Area number (hex byte)"

- id: unpanic
  label: Un-Panic (unlocks panels and restores previous preset)
  kind: action
  command: "1C {area} F0 18 00 00 {join} {checksum}"
  # source example: 1C 02 F0 18 00 00 FF DB (Area 2)
  # note: source byte table says byte 2 = 0 (unused) but the example uses F0
  params:
    - name: area
      type: integer
      description: "Area number (hex byte)"

- id: set_dmx_mode
  label: Set DMX Mode
  kind: action
  command: "1C {area} {mode} 10 00 00 {join} {checksum}"
  # source example: 1C 01 03 10 00 00 FF D1 (Area 1, DyNet only)
  params:
    - name: area
      type: integer
      description: "Area number (hex byte)"
    - name: mode
      type: integer
      description: "00 = DMX if present, 01 = Local Override, 02 = HTP, 03 = DyNet"

- id: disable_control_panels
  label: Disable Control Panels
  kind: action
  command: "1C {area} 00 15 00 00 {join} {checksum}"
  # source example: 1C 06 00 15 00 00 FF CA (lock all panels in Area 6)
  params:
    - name: area
      type: integer
      description: "Area number (hex byte)"

- id: enable_control_panels
  label: Enable Control Panels
  kind: action
  command: "1C {area} 00 16 00 00 {join} {checksum}"
  # source example: 1C 06 00 16 00 00 FF C9 (unlock all panels in Area 6)
  params:
    - name: area
      type: integer
      description: "Area number (hex byte)"

- id: light_level_compensation_all_presets
  label: Suspend/Resume Light Level Compensation (All Presets)
  kind: action
  command: "1C {area} {channel} 11 00 {suspend_resume} {join} {checksum}"
  # source example: 1C 02 FF 11 00 01 FF D2 (Area 2 all channels, resume)
  params:
    - name: area
      type: integer
      description: "Area number (hex byte)"
    - name: channel
      type: integer
      description: "Channel (0 origin, FF = all channels in the area)"
    - name: suspend_resume
      type: integer
      description: "0 = suspend, 1 = resume"

- id: suspend_light_level_compensation_current_preset
  label: Suspend Light Level Compensation (Current Preset)
  kind: action
  command: "1C {area} {channel} 1A 00 00 {join} {checksum}"
  # source example: 1C 02 FF 1A 00 00 FF CA (Area 2 all channels)
  params:
    - name: area
      type: integer
      description: "Area number (hex byte)"
    - name: channel
      type: integer
      description: "Channel (0 origin, FF = all channels in the area)"

- id: resume_light_level_compensation_current_preset
  label: Resume Light Level Compensation (Current Preset)
  kind: action
  command: "1C {area} {channel} 1B 00 00 {join} {checksum}"
  # source example: 1C 02 FF 1B 00 00 FF C9 (Area 2 all channels)
  params:
    - name: area
      type: integer
      description: "Area number (hex byte)"
    - name: channel
      type: integer
      description: "Channel (0 origin, FF = all channels in the area)"

- id: occupancy_detection_all_presets
  label: Suspend/Resume Occupancy Detection (All Presets)
  kind: action
  command: "1C {area} {channel} 31 00 {suspend_resume} {join} {checksum}"
  # source example: 1C 01 FF 31 00 01 FF B3 (Area 1 all channels, resume)
  params:
    - name: area
      type: integer
      description: "Area number (hex byte)"
    - name: channel
      type: integer
      description: "Channel (0 origin, FF = all channels in the area)"
    - name: suspend_resume
      type: integer
      description: "0 = suspend, 1 = resume"

- id: disable_occupancy_detection_current_preset
  label: Disable Occupancy Detection (Current Preset)
  kind: action
  command: "1C {area} {channel} 3A 00 00 {join} {checksum}"
  # source example: 1C 01 FF 3A 00 00 FF AB (Area 1 all channels)
  params:
    - name: area
      type: integer
      description: "Area number (hex byte)"
    - name: channel
      type: integer
      description: "Channel (0 origin, FF = all channels in the area)"

- id: enable_occupancy_detection_current_preset
  label: Enable Occupancy Detection (Current Preset)
  kind: action
  command: "1C {area} {channel} 3B 00 00 {join} {checksum}"
  # source example: 1C 01 FF 3B 00 00 FF AA (Area 1 all channels)
  params:
    - name: area
      type: integer
      description: "Area number (hex byte)"
    - name: channel
      type: integer
      description: "Channel (0 origin, FF = all channels in the area)"

- id: set_user_preference
  label: Set User Preference
  kind: action
  command: "1C {area} {preference} 48 {data_hi} {data_lo} {join} {checksum}"
  # source example: 1C 01 01 48 82 32 FF E7 (Area 1, indicator LED 50%, 1.00s fade)
  params:
    - name: area
      type: integer
      description: "Area number (hex byte)"
    - name: preference
      type: integer
      description: "Preference id, see Notes table (01=indicator LED ... 0D=temp setpoint fixed point)"
    - name: data_hi
      type: integer
      description: "Data high byte (meaning depends on preference, see Notes)"
    - name: data_lo
      type: integer
      description: "Data low byte (meaning depends on preference, see Notes)"

- id: request_user_preference
  label: Request User Preference
  kind: query
  command: "1C {area} {preference} 49 00 00 {join} {checksum}"
  # source example: 1C 01 06 49 00 00 FF 95 (Area 1, actual temperature)
  params:
    - name: area
      type: integer
      description: "Area number (hex byte)"
    - name: preference
      type: integer
      description: "Preference id, see Notes table"

- id: set_join_level
  label: Set Join Level
  kind: action
  command: "1C {area} {join_level} 14 00 00 {join} {checksum}"
  # source example: 1C 01 06 14 00 00 FF CA (Area 1, join level 6)
  params:
    - name: area
      type: integer
      description: "Area number (hex byte)"
    - name: join_level
      type: integer
      description: "Join level"

- id: set_rmask
  label: Set RMask
  kind: action
  command: "1C {area} {rmask} 40 00 00 {join} {checksum}"
  # source example: 1C 01 03 40 00 00 FF A1 (Area 1, RMask level 3)
  params:
    - name: area
      type: integer
      description: "Area number (hex byte)"
    - name: rmask
      type: integer
      description: "RMask level"

- id: set_area_links
  label: Set Area Links
  kind: action
  command: "1C {area} {areas_1_8} 20 {areas_9_16} {areas_17_24} {join} {checksum}"
  # source example: 1C 04 80 20 00 00 FF 41 (link Areas 4 & 5, base area = 3)
  params:
    - name: area
      type: integer
      description: "Area number (hex byte)"
    - name: areas_1_8
      type: integer
      description: "Bitmap for the 24 areas directly above the BLA; bit 7 = 1st area, bit 0 = 8th area"
    - name: areas_9_16
      type: integer
      description: "Bitmap; bit 7 = 9th area, bit 0 = 16th area"
    - name: areas_17_24
      type: integer
      description: "Bitmap; bit 7 = 17th area, bit 0 = 24th area"

- id: clear_area_links
  label: Clear Area Links
  kind: action
  command: "1C {area} {areas_1_8} 21 {areas_9_16} {areas_17_24} {join} {checksum}"
  # source example: 1C 04 80 21 00 00 FF 40 (separate Areas 4 & 5, base area = 3)
  params:
    - name: area
      type: integer
      description: "Area number (hex byte)"
    - name: areas_1_8
      type: integer
      description: "Bitmap of areas to unlink; bit 7 = 1st area, bit 0 = 8th area"
    - name: areas_9_16
      type: integer
      description: "Bitmap; bit 7 = 9th area, bit 0 = 16th area"
    - name: areas_17_24
      type: integer
      description: "Bitmap; bit 7 = 17th area, bit 0 = 24th area"
```

## Feedbacks
```yaml
# Report messages sent by the dimmer (logical opcode frame, 1C sync).

- id: channel_level_report
  label: Report Channel Level (reply from dimmer)
  type: object
  opcode: "60"
  # source example: 1C 02 04 60 70 70 FF 9F (Ch 5 Area 2, target 57%, current 57%)
  fields:
    - name: area
      description: "Area number"
    - name: channel
      description: "Channel (0 origin)"
    - name: target_level
      description: "Target level (01 = 100%, FF = 0%)"
    - name: current_level
      description: "Current level (01 = 100%, FF = 0%)"

- id: preset_report
  label: Report Preset (reply from dimmer)
  type: object
  opcode: "62"
  # source example: 1C 04 05 62 00 00 FF 7A (Area 4 currently in Preset 6)
  fields:
    - name: area
      description: "Area number"
    - name: preset
      description: "Preset (0 origin)"

- id: user_preference_report
  label: Report User Preference
  type: object
  opcode: "4A"
  # source example: 1C 01 06 4A 00 58 FF 3C (Area 1, actual temperature 22C)
  fields:
    - name: area
      description: "Area number"
    - name: preference
      description: "Preference id, see Notes table"
    - name: data_hi
      description: "Data high byte (meaning depends on preference)"
    - name: data_lo
      description: "Data low byte (meaning depends on preference)"
```

## Variables
```yaml
- id: channel_level
  label: Channel Level
  type: integer
  min: 1
  max: 255
  description: "Per area/channel lighting level; 01 = 100%, FF = 0%. Written via ramp/fade opcodes 71/72/73/5F; read via request_channel_level (61) / channel_level_report (60)."

# User preference values (indicator LED brightness 0x01, backlight 0x02, display brightness 0x03,
# contrast 0x04, sounder volume 0x05, temperature setpoint 0x07/0x0D, lux setpoint 0x0A,
# no-motion timeout 0x0B) are settable via set_user_preference (opcode 48).
```

## Events
```yaml
# UNRESOLVED: no unsolicited events documented in source; report messages (60/62/4A)
# are described as replies from the dimmer.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings or interlock procedures.
# Note: Panic (opcode 17) locks all control panels in an area and selects the panic preset;
# Un-Panic (opcode 18) unlocks and restores the previous preset.
```

## Notes
- Interface: RS-485, 9600 bps, 8 data bits, 1 start bit, 1 stop bit, no parity. Idle between bytes must be <1 ms; delay between packets must be >10 ms.
- Two frame formats exist. Logical: `[1C sync][area][data1][opcode][data2][data3][join][checksum]`. Physical: `[5C sync][device code][box number][opcode][data1][data2][data3][checksum]`. Only the logical format has opcode examples in this source; physical-format opcodes are UNRESOLVED.
- Checksum = negative 8-bit two's-complement sum of bytes 0-6 (all 8 bytes sum to 0x00 mod 256). Verified consistent with every worked example in the source.
- Byte-2 anomalies: Panic/Un-Panic byte tables say "0 (Unused)" but examples use F0; Fade Area to a Level (opcode 79) byte table says "Channel" but the example (82 = 50%) uses it as the level. Examples followed verbatim.
- Preset Select uses the opcode byte itself for the preset value (0=P1 ... D=P8) with the bank in byte 5 (0=P1-P8, 1=P9-P16, 2=P17-P24, etc.).
- Area Linking: the Base Link Area (BLA) acts as an Area 0 for all channels with that BLA defined — useful as global control for a block of areas. Set/Clear Area Links use 3 bitmap bytes covering the 24 areas directly above the BLA.
- User preference ids: 0x01 indicator LED brightness, 0x02 backlight LED brightness, 0x03 display brightness, 0x04 display contrast, 0x05 sounder volume (Data Hi = 01=100%/FF=0%, Data Lo = fade in 20 ms steps for these), 0x06 actual temperature (16-bit two's complement, 0.25 °C steps), 0x07 user temperature setpoint (0.25 °C steps), 0x08 display brightness scaled, 0x09 AC plant capability (bit 0 hot water, bit 1 cold water), 0x0A closed-loop light control setpoint in lux (0x0000-0xFFFF), 0x0B no-motion timeout in seconds (0x0000/0xFFFF = revert to configured), 0x0C actual temperature signed fixed point -127.99 to 127.99 °C (Data Hi MSB sign, 7 LSB integer; Data Lo fraction 0-99), 0x0D setpoint as per 0x0C.

<!-- UNRESOLVED: model name "Patpa" not present in source — source is a generic DyNet opcode reference; confirm actual product before publishing. -->
<!-- UNRESOLVED: physical message format (5C sync) documented but without opcode examples. -->
<!-- UNRESOLVED: no voltage, current, or power specifications in source. -->
<!-- UNRESOLVED: flow control not stated in source. -->

## Provenance

```yaml
source_domains:
  - docs.dynalite.com
source_urls:
  - https://docs.dynalite.com/system-builder/latest/quick_start/dynet_opcodes.html
retrieved_at: 2026-09-05T02:05:22.909Z
last_checked_at: 2026-09-05T22:16:16.356Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-05T22:16:16.356Z
matched_actions: 39
action_count: 39
confidence: medium
summary: "All 39 spec action units match source opcodes 03/65/64/0F/68/69/6B/71/72/73/74/75/76/79/04/5F/61/63/08/09/66/67/17/18/10/15/16/11/1A/1B/31/3A/3B/48/49/14/40/20/21; Feedbacks 60/62/4A also covered. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model name \"Patpa\" does not appear anywhere in the source text — source is a generic \"Basic DyNet Opcodes\" reference. Firmware, hardware variant, and voltage/power specs not stated."
- "flow control not stated in source"
- "no unsolicited events documented in source; report messages (60/62/4A)"
- "no multi-step sequences documented in source."
- "source contains no safety warnings or interlock procedures."
- "model name \"Patpa\" not present in source — source is a generic DyNet opcode reference; confirm actual product before publishing."
- "physical message format (5C sync) documented but without opcode examples."
- "no voltage, current, or power specifications in source."
- "flow control not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
