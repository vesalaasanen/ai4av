---
spec_id: admin/dynalite-dus360cs
schema_version: ai4av-public-spec-v1
revision: 1
title: "Dynalite DUS360CS Control Spec"
manufacturer: Dynalite
model_family: DUS360CS
aliases: []
compatible_with:
  manufacturers:
    - Dynalite
  models:
    - DUS360CS
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - docs.dynalite.com
source_urls:
  - https://docs.dynalite.com/system-builder/latest/quick_start/dynet_opcodes.html
  - https://docs.dynalite.com/system-builder/latest/quick_start/device_codes.html
  - https://docs.dynalite.com/system-builder/latest/ddng485.html
  - https://docs.dynalite.com/system-builder/latest/ddng232.html
  - https://docs.dynalite.com/system-builder/latest/ddng232/dynet_messaging.html
retrieved_at: 2026-06-30T06:32:31.417Z
last_checked_at: 2026-06-30T07:00:17.537Z
generated_at: 2026-06-30T07:00:17.537Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source documents the general DyNet opcode catalogue, not DUS360CS-specific behaviour (which sensor opcodes it emits/consumes). Device power specs, voltage, and fault behaviour not stated. Source states RS-485 electrical interface; user context cited RS-232C — discrepancy unresolved."
  - "flow control not stated; source specifies byte/packet timing instead (idle <1ms, inter-packet >10ms)"
  - "source does not explicitly document unsolicited notification behaviour."
  - "no multi-step sequences explicitly documented in source."
  - "source contains no explicit safety warnings, interlock procedures, or"
  - "DUS360CS-specific sensor behaviour (which opcodes it originates, occupancy/light-level report cadence) not in source. Source is the generic DyNet opcode catalogue."
  - "source states RS-485 electrical interface; input context cited RS-232C. Serial framing (9600 8N1) is identical; electrical layer discrepancy unresolved."
verification:
  verdict: verified
  checked_at: 2026-06-30T07:00:17.537Z
  matched_actions: 39
  action_count: 39
  confidence: medium
  summary: "All 39 spec action opcodes found in source; transport parameters verified; complete bidirectional coverage. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-30
---

# Dynalite DUS360CS Control Spec

## Summary
The Dynalite DUS360CS is a Universal Sensor (occupancy / light-level) operating on the DyNet RS-485 serial bus. This spec covers the Basic DyNet Logical Message opcode set: preset recall, channel ramp/fade, level reporting, preset program/restore, panic, DMX mode, control-panel lock, light-level compensation, occupancy detection, user preferences, join/RMask, and area linking. All commands are 8-byte packets (sync `1C`) with a trailing 2's-complement checksum.

<!-- UNRESOLVED: source documents the general DyNet opcode catalogue, not DUS360CS-specific behaviour (which sensor opcodes it emits/consumes). Device power specs, voltage, and fault behaviour not stated. Source states RS-485 electrical interface; user context cited RS-232C — discrepancy unresolved. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated; source specifies byte/packet timing instead (idle <1ms, inter-packet >10ms)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - levelable   # inferred: ramp/fade to level commands present (0x71/0x72/0x73/0x5F)
  - queryable   # inferred: request channel level (0x61), request preset (0x63), request user preference (0x49)
  - powerable   # inferred: set-to-off / ramp-to-off / fade-to-off/on commands present
```

## Actions
```yaml
# DyNet Logical packet: [1C] {area} {d1} {opcode} {d2} {d3} {join} {checksum}
# Sync byte0 = 1C. Join byte6 usually FF. Checksum byte7 = 2's complement of (sum of bytes 0-6) mod 256.
# All byte values hexadecimal. Area/channel are 0-origin; channel FF = all channels in area.

# --- Preset ---
- id: select_current_preset
  label: Select Current Preset
  kind: action
  command: "[1C] {area} {fade_rate_lo} {preset} {fade_rate_hi} {preset_bank} [FF] {checksum}"
  params:
    - name: area
      type: integer
      description: Target area (0-origin)
    - name: preset
      type: enum
      description: "Preset index in byte3 (opcode slot): 0=P1,1=P2,2=P3,3=P4,A=P5,B=P6,C=P7,D=P8"
    - name: preset_bank
      type: integer
      description: "Byte5: 0=P1-P8, 1=P9-P16, 2=P17-P24 ..."
    - name: fade_rate_lo
      type: integer
      description: Byte2 fade rate low (example uses 0x20)
    - name: fade_rate_hi
      type: integer
      description: Byte4 fade rate high (usually 0)
  notes: "Example P4 Area1: [1C][01][20][03][00][00][FF][C1]"

- id: select_current_preset_linear
  label: Select Current Preset (Linear)
  kind: action
  command: "[1C] {area} {preset} [65] {fade_time_lo} {fade_time_hi} [FF] {checksum}"
  params:
    - name: area
      type: integer
      description: Target area (0-origin)
    - name: preset
      type: integer
      description: Preset (0-origin) in byte2
    - name: fade_time_lo
      type: integer
      description: 16-bit fade time, low byte, 20ms steps (byte4)
    - name: fade_time_hi
      type: integer
      description: 16-bit fade time, high byte (byte5)
  notes: "Example P4 Area1 fade 2s: [1C][01][03][65][64][00][FF][18]"

- id: preset_offset
  label: Preset Offset
  kind: action
  command: "[1C] {area} {offset_plus_0x80} [64] [00] [00] [FF] {checksum}"
  params:
    - name: area
      type: integer
      description: Target area (0-origin)
    - name: offset_plus_0x80
      type: integer
      description: Byte2 = offset value with bit8 set (0x80) to distinguish from Swap Bank
  notes: "Example offset 15 Area1: [1C][01][8F][64][00][00][FF][F1]"

- id: reset_preset
  label: Reset Preset
  kind: action
  command: "[1C] {area} {fade_time_lo} [0F] {fade_time_hi} [00] [FF] {checksum}"
  params:
    - name: area
      type: integer
      description: Target area (0-origin)
    - name: fade_time_lo
      type: integer
      description: 16-bit fade time low byte, 20ms steps
    - name: fade_time_hi
      type: integer
      description: 16-bit fade time high byte
  notes: "Example Area1 5s: [1C][01][FA][0F][00][00][FF][DB]"

# --- Ramp / Fade ---
- id: ramp_channel_area_to_off
  label: Ramp Channel/Area to Off
  kind: action
  command: "[1C] {area} {channel} [68] [00] {ramp_rate} [FF] {checksum}"
  params:
    - name: area
      type: integer
      description: Target area (0-origin)
    - name: channel
      type: integer
      description: Channel (0-origin; FF = all channels in area)
    - name: ramp_rate
      type: integer
      description: Byte5 ramp rate in 100ms steps (time 0->100%)
  notes: "Example Ch4 Area1 5s: [1C][01][03][68][00][32][FF][47]"

- id: ramp_channel_area_to_on
  label: Ramp Channel/Area to On
  kind: action
  command: "[1C] {area} {channel} [69] [00] {ramp_rate} [FF] {checksum}"
  params:
    - name: area
      type: integer
      description: Target area (0-origin)
    - name: channel
      type: integer
      description: Channel (0-origin; FF = all channels)
    - name: ramp_rate
      type: integer
      description: Byte5 ramp rate in 100ms steps
  notes: "Example Ch4 Area1 5s: [1C][01][03][69][00][32][FF][46]"

- id: fade_channel_area_to_preset
  label: Fade Channel/Area to Preset
  kind: action
  command: "[1C] {area} {channel} [6B] {preset} {fade_time} [FF] {checksum}"
  params:
    - name: area
      type: integer
      description: Target area (0-origin)
    - name: channel
      type: integer
      description: Channel (0-origin; FF = all channels)
    - name: preset
      type: integer
      description: Byte4 preset (0-origin)
    - name: fade_time
      type: integer
      description: Byte5 fade time in 20ms steps
  notes: "Example A1 Ch4 P4 2.00s: [1C][01][03][6B][03][64][FF][0F]"

- id: ramp_to_level_0p1s_to_25p5s
  label: Ramp Channel/Area to a Level (0.1s to 25.5s)
  kind: action
  command: "[1C] {area} {channel} [71] {level} {ramp_rate} [FF] {checksum}"
  params:
    - name: area
      type: integer
      description: Target area (0-origin)
    - name: channel
      type: integer
      description: Channel (0-origin; FF = all channels)
    - name: level
      type: integer
      description: "Byte4 channel level (01=100%, FF=0%)"
    - name: ramp_rate
      type: integer
      description: Byte5 ramp rate in 100ms steps (0->100%)
  notes: "Example A2 Ch3 50% 5s: [1C][02][02][71][82][32][FF][BC]"

- id: fade_to_level_1s_to_255s
  label: Fade Channel/Area to a Level (1s to 255s)
  kind: action
  command: "[1C] {area} {channel} [72] {level} {fade_rate} [FF] {checksum}"
  params:
    - name: area
      type: integer
      description: Target area (0-origin)
    - name: channel
      type: integer
      description: Channel (0-origin; FF = all channels)
    - name: level
      type: integer
      description: "Byte4 level (01=100%, FF=0%)"
    - name: fade_rate
      type: integer
      description: Byte5 fade rate in 1s steps
  notes: "Example A2 Ch3 50% 50s: [1C][02][02][72][82][32][FF][BB]"

- id: fade_to_level_1min_to_22min
  label: Fade Channel/Area to a Level (1min to 22min)
  kind: action
  command: "[1C] {area} {channel} [73] {level} {fade_rate} [FF] {checksum}"
  params:
    - name: area
      type: integer
      description: Target area (0-origin)
    - name: channel
      type: integer
      description: Channel (0-origin; FF = all channels)
    - name: level
      type: integer
      description: "Byte4 level (01=100%, FF=0%)"
    - name: fade_rate
      type: integer
      description: Byte5 fade rate in 1min steps (max 22)
  notes: "Example A2 Ch3 50% 15min: [1C][02][02][73][82][0F][FF][DD]"

- id: fade_channel_area_to_off
  label: Fade Channel/Area to Off
  kind: action
  command: "[1C] {area} {channel} [74] {fade_time_lo} {fade_time_hi} [FF] {checksum}"
  params:
    - name: area
      type: integer
      description: Target area (0-origin)
    - name: channel
      type: integer
      description: Channel (0-origin; FF = all channels)
    - name: fade_time_lo
      type: integer
      description: 16-bit fade time low byte, 20ms steps
    - name: fade_time_hi
      type: integer
      description: 16-bit fade time high byte
  notes: "Example A4 all ch 2.00s: [1C][04][FF][74][64][00][FF][0A]"

- id: fade_channel_area_to_on
  label: Fade Channel/Area to On
  kind: action
  command: "[1C] {area} {channel} [75] {fade_time_lo} {fade_time_hi} [FF] {checksum}"
  params:
    - name: area
      type: integer
      description: Target area (0-origin)
    - name: channel
      type: integer
      description: Channel (0-origin; FF = all channels)
    - name: fade_time_lo
      type: integer
      description: 16-bit fade time low byte, 20ms steps
    - name: fade_time_hi
      type: integer
      description: 16-bit fade time high byte
  notes: "Example A4 all ch 2.00s: [1C][04][FF][75][64][00][FF][09]"

- id: stop_fade
  label: Stop Fade Channel/Area
  kind: action
  command: "[1C] {area} {channel} [76] [00] [00] [FF] {checksum}"
  params:
    - name: area
      type: integer
      description: Target area (0-origin)
    - name: channel
      type: integer
      description: Channel (0-origin; FF = all channels)
  notes: "Example A4 Ch6: [1C][04][05][76][00][00][FF][66]"

- id: fade_area_to_level
  label: Fade Area to a Level
  kind: action
  command: "[1C] {area} {level} [79] {fade_time_lo} {fade_time_hi} [FF] {checksum}"
  params:
    - name: area
      type: integer
      description: Target area (0-origin)
    - name: level
      type: integer
      description: "Byte2 level (01=100%, FF=0%)"
    - name: fade_time_lo
      type: integer
      description: 16-bit fade time low byte, 20ms steps
    - name: fade_time_hi
      type: integer
      description: 16-bit fade time high byte
  notes: "Example A4 50% 2s: [1C][04][82][79][64][00][FF][82]"

- id: set_to_off
  label: Set to Off
  kind: action
  command: "[1C] {area} {fade_rate_lo} [04] {fade_rate_hi} [00] [FF] {checksum}"
  params:
    - name: area
      type: integer
      description: Target area (0-origin)
    - name: fade_rate_lo
      type: integer
      description: Byte2 fade rate low (usually 100 / 0x64 in examples; source text says 0x0A in example)
    - name: fade_rate_hi
      type: integer
      description: Byte4 fade rate high (usually 0)
  notes: "Example Area3 off: [1C][03][0A][04][00][00][FF][D4]"

- id: ramp_to_level_except_zero
  label: Ramp Channel/Area to a Level (except channels preset to 0% or don't care)
  kind: action
  command: "[1C] {area} {channel} [5F] {level} {ramp_rate} [FF] {checksum}"
  params:
    - name: area
      type: integer
      description: Target area (0-origin)
    - name: channel
      type: integer
      description: Channel (0-origin; FF = all channels)
    - name: level
      type: integer
      description: "Byte4 level (01=100%, FF=0%)"
    - name: ramp_rate
      type: integer
      description: Byte5 ramp rate in 100ms steps
  notes: "Example A4 ramp lit ch to 100% 5.00s: [1C][04][FF][5F][01][32][FF][50]"

# --- Request (queries sent to device) ---
- id: request_channel_level
  label: Request Channel Level
  kind: query
  command: "[1C] {area} {channel} [61] [00] [00] [FF] {checksum}"
  params:
    - name: area
      type: integer
      description: Target area (0-origin)
    - name: channel
      type: integer
      description: Channel (0-origin)
  notes: "Example request Ch5 A2: [1C][02][04][61][00][00][FF][7E]. Reply = report_channel_level (0x60)."

- id: request_preset
  label: Request Preset
  kind: query
  command: "[1C] {area} [00] [63] [00] [00] [FF] {checksum}"
  params:
    - name: area
      type: integer
      description: Target area (0-origin)
  notes: "Example request A4: [1C][04][00][63][00][00][FF][7E]. Reply = report_preset (0x62)."

- id: request_user_preference
  label: Request User Preference
  kind: query
  command: "[1C] {area} {preference} [49] [00] [00] [FF] {checksum}"
  params:
    - name: area
      type: integer
      description: Target area (0-origin)
    - name: preference
      type: enum
      description: "Byte2 preference id (see Variables): 01 LED bright,02 backlight,03 display bright,04 contrast,05 sounder,06 actual temp,07 setpoint,08 display scaled,09 AC plant,0A lux setpoint,0B motion timeout,0C temp signed,0D setpoint signed"
  notes: "Example request actual temp A1: [1C][01][06][49][00][00][FF][95]. Reply = report_user_preference (0x4A)."

# --- Program / Save / Restore Preset ---
- id: program_current_preset
  label: Program Current Preset
  kind: action
  command: "[1C] {area} [00] [08] [00] [00] [FF] {checksum}"
  params:
    - name: area
      type: integer
      description: Target area (0-origin)
  notes: "Saves current channel levels to current preset. Example A4: [1C][04][00][08][00][00][FF][D9]"

- id: program_defined_preset
  label: Program Defined Preset
  kind: action
  command: "[1C] {area} {preset} [09] [00] [00] [FF] {checksum}"
  params:
    - name: area
      type: integer
      description: Target area (0-origin)
    - name: preset
      type: integer
      description: Byte2 preset (0-origin)
  notes: "Example save A4 to P1: [1C][04][00][09][00][00][FF][D8]"

- id: save_current_preset
  label: Save Current Preset
  kind: action
  command: "[1C] {area} [00] [66] [00] [00] [FF] {checksum}"
  params:
    - name: area
      type: integer
      description: Target area (0-origin)
  notes: "Saves current preset number. Example A1: [1C][01][00][66][00][00][FF][7E]"

- id: restore_saved_preset
  label: Restore Saved Preset
  kind: action
  command: "[1C] {area} {fade_time_lo} [67] {fade_time_hi} [00] [FF] {checksum}"
  params:
    - name: area
      type: integer
      description: Target area (0-origin)
    - name: fade_time_lo
      type: integer
      description: 16-bit fade time low byte, 20ms steps
    - name: fade_time_hi
      type: integer
      description: 16-bit fade time high byte
  notes: "Example A1: [1C][01][FA][67][00][00][FF][83]"

# --- Panic ---
- id: panic
  label: Panic
  kind: action
  command: "[1C] {area} {data} [17] [00] [00] [FF] {checksum}"
  params:
    - name: area
      type: integer
      description: Target area (0-origin)
    - name: data
      type: integer
      description: Byte2 (example uses F0)
  notes: "Locks panels & selects panic preset. Example A2: [1C][02][F0][17][00][00][FF][DC]"

- id: un_panic
  label: Un-Panic
  kind: action
  command: "[1C] {area} {data} [18] [00] [00] [FF] {checksum}"
  params:
    - name: area
      type: integer
      description: Target area (0-origin)
    - name: data
      type: integer
      description: Byte2 (example uses F0)
  notes: "Unlocks panels & restores previous preset. Example A2: [1C][02][F0][18][00][00][FF][DB]"

# --- DMX ---
- id: set_dmx_mode
  label: Set DMX Mode
  kind: action
  command: "[1C] {area} {mode} [10] [00] [00] [FF] {checksum}"
  params:
    - name: area
      type: integer
      description: Target area (0-origin)
    - name: mode
      type: enum
      description: "Byte2: 00=DMX if present, 01=Local Override, 02=HTP, 03=DyNet"
  notes: "Example A1 DyNet only: [1C][01][03][10][00][00][FF][D1]"

# --- Control Panel Enable/Disable ---
- id: disable_control_panels
  label: Disable Control Panels
  kind: action
  command: "[1C] {area} [00] [15] [00] [00] [FF] {checksum}"
  params:
    - name: area
      type: integer
      description: Target area (0-origin)
  notes: "Locks all control panels. Example A6: [1C][06][00][15][00][00][FF][CA]"

- id: enable_control_panels
  label: Enable Control Panels
  kind: action
  command: "[1C] {area} [00] [16] [00] [00] [FF] {checksum}"
  params:
    - name: area
      type: integer
      description: Target area (0-origin)
  notes: "Unlocks all control panels. Example A6: [1C][06][00][16][00][00][FF][C9]"

# --- Light Level Compensation (Daylight Harvesting) ---
- id: suspend_resume_light_level_comp_all
  label: Suspend/Resume Light Level Compensation (All Presets)
  kind: action
  command: "[1C] {area} {channel} [11] [00] {suspend_resume} [FF] {checksum}"
  params:
    - name: area
      type: integer
      description: Target area (0-origin)
    - name: channel
      type: integer
      description: Channel (0-origin; FF = all channels)
    - name: suspend_resume
      type: enum
      description: "Byte5: 0=Suspend, 1=Resume"
  notes: "Example A2 all ch resume: [1C][02][FF][11][00][01][FF][D2]"

- id: suspend_light_level_comp_current
  label: Suspend Light Level Compensation (Current Preset)
  kind: action
  command: "[1C] {area} {channel} [1A] [00] [00] [FF] {checksum}"
  params:
    - name: area
      type: integer
      description: Target area (0-origin)
    - name: channel
      type: integer
      description: Channel (0-origin; FF = all channels)
  notes: "Example A2 all ch: [1C][02][FF][1A][00][00][FF][CA]"

- id: resume_light_level_comp_current
  label: Resume Light Level Compensation (Current Preset)
  kind: action
  command: "[1C] {area} {channel} [1B] [00] [00] [FF] {checksum}"
  params:
    - name: area
      type: integer
      description: Target area (0-origin)
    - name: channel
      type: integer
      description: Channel (0-origin; FF = all channels)
  notes: "Example A2 all ch: [1C][02][FF][1B][00][00][FF][C9]"

# --- Occupancy Detection ---
- id: suspend_resume_occupancy_all
  label: Suspend/Resume Occupancy Detection (All Presets)
  kind: action
  command: "[1C] {area} {channel} [31] [00] {suspend_resume} [FF] {checksum}"
  params:
    - name: area
      type: integer
      description: Target area (0-origin)
    - name: channel
      type: integer
      description: Channel (0-origin; FF = all channels)
    - name: suspend_resume
      type: enum
      description: "Byte5: 0=Suspend, 1=Resume"
  notes: "Example A1 all ch resume: [1C][01][FF][31][00][01][FF][B3]"

- id: disable_occupancy_current
  label: Disable Occupancy Detection (Current Preset)
  kind: action
  command: "[1C] {area} {channel} [3A] [00] [00] [FF] {checksum}"
  params:
    - name: area
      type: integer
      description: Target area (0-origin)
    - name: channel
      type: integer
      description: Channel (0-origin; FF = all channels)
  notes: "Example A1 all ch: [1C][01][FF][3A][00][00][FF][AB]"

- id: enable_occupancy_current
  label: Enable Occupancy Detection (Current Preset)
  kind: action
  command: "[1C] {area} {channel} [3B] [00] [00] [FF] {checksum}"
  params:
    - name: area
      type: integer
      description: Target area (0-origin)
    - name: channel
      type: integer
      description: Channel (0-origin; FF = all channels)
  notes: "Example A1 all ch: [1C][01][FF][3B][00][00][FF][AA]"

# --- User Preference ---
- id: set_user_preference
  label: Set User Preference
  kind: action
  command: "[1C] {area} {preference} [48] {data_hi} {data_lo} [FF] {checksum}"
  params:
    - name: area
      type: integer
      description: Target area (0-origin)
    - name: preference
      type: enum
      description: "Byte2 preference id (see Variables for value encoding)"
    - name: data_hi
      type: integer
      description: Byte4 data high (meaning depends on preference)
    - name: data_lo
      type: integer
      description: Byte5 data low (meaning depends on preference)
  notes: "Example A1 LED brightness 50% fade 1.00s: [1C][01][01][48][82][32][FF][E7]"

# --- Join ---
- id: set_join_level
  label: Set Join Level
  kind: action
  command: "[1C] {area} {join_level} [14] [00] [00] {join} {checksum}"
  params:
    - name: area
      type: integer
      description: Target area (0-origin)
    - name: join_level
      type: integer
      description: Byte2 join level
    - name: join
      type: integer
      description: Byte6 join (source example uses FF here instead of usual join slot)
  notes: "Example A1 join 6: [1C][01][06][14][00][00][FF][CA]"

# --- RMask ---
- id: set_rmask
  label: Set RMask
  kind: action
  command: "[1C] {area} {rmask} [40] [00] [00] [FF] {checksum}"
  params:
    - name: area
      type: integer
      description: Target area (0-origin)
    - name: rmask
      type: integer
      description: Byte2 RMask level
  notes: "Example A1 RMask 3: [1C][01][03][40][00][00][FF][A1]"

# --- Area Linking ---
- id: set_area_links
  label: Set Area Links
  kind: action
  command: "[1C] {area} {links_b2} [20] {links_b4} {links_b5} [FF] {checksum}"
  params:
    - name: area
      type: integer
      description: Target area (0-origin; relative to Base Link Area)
    - name: links_b2
      type: integer
      description: "Byte2 bitmap of areas 1-8 to link (bit7=1st area, bit0=8th)"
    - name: links_b4
      type: integer
      description: "Byte4 bitmap of areas 9-16 to link"
    - name: links_b5
      type: integer
      description: "Byte5 bitmap of areas 17-24 to link"
  notes: "Base Link Area acts as Area 0 for linked channels. Example link A4&A5 (base=3): [1C][04][80][20][00][00][FF][41]"

- id: clear_area_links
  label: Clear Area Links
  kind: action
  command: "[1C] {area} {unlink_b2} [21] {unlink_b4} {unlink_b5} [FF] {checksum}"
  params:
    - name: area
      type: integer
      description: Target area (0-origin; relative to Base Link Area)
    - name: unlink_b2
      type: integer
      description: "Byte2 bitmap of areas 1-8 to unlink"
    - name: unlink_b4
      type: integer
      description: "Byte4 bitmap of areas 9-16 to unlink"
    - name: unlink_b5
      type: integer
      description: "Byte5 bitmap of areas 17-24 to unlink"
  notes: "Example separate A4&A5 (base=3): [1C][04][80][21][00][00][FF][40]"
```

## Feedbacks
```yaml
# Replies emitted by the device (dimmer/sensor) on the DyNet bus.
- id: report_channel_level
  type: object
  opcode: "60"
  command: "[1C] {area} {channel} [60] {target_level} {current_level} [FF] {checksum}"
  fields:
    area: "Byte1 (0-origin)"
    channel: "Byte2 (0-origin)"
    target_level: "Byte4 (01=100%, FF=0%)"
    current_level: "Byte5 (01=100%, FF=0%)"
  notes: "Example Ch5 A2 target 57% current 57%: [1C][02][04][60][70][70][FF][9F]"

- id: report_preset
  type: enum
  opcode: "62"
  command: "[1C] {area} {preset} [62] [00] [00] [FF] {checksum}"
  fields:
    area: "Byte1 (0-origin)"
    preset: "Byte2 current preset (0-origin)"
  notes: "Example A4 in P6: [1C][04][05][62][00][00][FF][7A]"

- id: report_user_preference
  type: object
  opcode: "4A"
  command: "[1C] {area} {preference} [4A] {data_hi} {data_lo} [FF] {checksum}"
  fields:
    area: "Byte1 (0-origin)"
    preference: "Byte2 preference id"
    data_hi: "Byte4 value high"
    data_lo: "Byte5 value low"
  notes: "Example A1 actual temp 22C: [1C][01][06][4A][00][58][FF][3C]"
```

## Variables
```yaml
# User Preference IDs (byte2 of set/request/report user preference).
# Data Hi/Lo encoding per preference, verbatim from source:
- id: pref_01_indicator_led_brightness
  preference: "0x01"
  data_hi: "Indicator LED brightness (01=100%, FF=0%)"
  data_lo: "8-bit fade time, 20ms increments"
- id: pref_02_backlight_led_brightness
  preference: "0x02"
  data_hi: "Backlight LED brightness (01=100%, FF=0%)"
  data_lo: "8-bit fade time, 20ms increments"
- id: pref_03_display_brightness
  preference: "0x03"
  data_hi: "LCD brightness (01=100%, FF=0%)"
  data_lo: "8-bit fade time, 20ms increments"
- id: pref_04_display_contrast
  preference: "0x04"
  data_hi: "LCD contrast (01=100%, FF=0%)"
  data_lo: "8-bit fade time, 20ms increments"
- id: pref_05_sounder_volume
  preference: "0x05"
  data_hi: "Sounder volume (01=100%, FF=0%)"
  data_lo: "8-bit fade time, 20ms increments"
- id: pref_06_actual_temperature_quarter
  preference: "0x06"
  value: "Actual temperature, 16-bit two's complement, 0.25 deg C steps"
- id: pref_07_user_temp_setpoint_quarter
  preference: "0x07"
  value: "User temperature setpoint, 16-bit two's complement, 0.25 deg C steps"
- id: pref_08_display_brightness_scaled
  preference: "0x08"
  data_hi: "Display brightness scaled (01=100%, FF=0%)"
  data_lo: "8-bit fade time, 20ms increments"
- id: pref_09_ac_plant_capability
  preference: "0x09"
  data_hi: "Bit0=hot water avail, Bit1=cold water avail"
  data_lo: "Unused"
- id: pref_0a_lux_setpoint
  preference: "0x0A"
  value: "Closed-loop light control setpoint (temporary adjust), raw LUX 0x0000-0xFFFF"
- id: pref_0b_motion_timeout
  preference: "0x0B"
  value: "No-motion timeout; 0x0000/0xFFFF=revert to configured, 0x0001-0xFFFE=seconds"
- id: pref_0c_actual_temp_signed
  preference: "0x0C"
  data_hi: "MSB sign (1=neg,0=pos); 7 LSBs integer part (not 2's complement)"
  data_lo: "8-bit unsigned fraction (decimal 0-99). e.g. +25.56C => Hi=0x19 Lo=0x38"
  range: "-127.99 to 127.99 deg C"
- id: pref_0d_setpoint_signed
  preference: "0x0D"
  value: "Setpoint/desired temperature, encoding per pref 0x0C"
```

## Events
```yaml
# UNRESOLVED: source does not explicitly document unsolicited notification behaviour.
# Report Channel Level (0x60), Report Preset (0x62), and Report User Preference (0x4A)
# may be emitted unsolicited on state change, but the source frames them as replies.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures, or
# power-on sequencing requirements. Panic (0x17) locks panels and selects a panic
# preset; treat as safety-relevant but no interlock detail provided.
```

## Notes
- **Packet structure:** 8-byte DyNet Logical Message. Byte0=`1C` sync, byte1=area, byte2=data1, byte3=opcode, byte4=data2, byte5=data3, byte6=join (usually `FF`), byte7=checksum.
- **Checksum:** negative 8-bit 2's complement of the sum of bytes 0-6 (mod 256). Verified against multiple source examples (e.g. `[1C][01][20][03][00][00][FF]` -> sum=0x13F -> low8=0x3F -> 0x100-0x3F=`C1`).
- **Serial timing:** idle between bytes <1ms; delay between packets >10ms. 1 start bit, 1 stop bit, no parity.
- **Physical Message Structure** also defined (byte0=`5C` sync, byte1=device code, byte2=box number) but all documented examples use the Logical (`1C`) structure.
- **Addressing:** area and channel are 0-origin; channel `FF` = all channels in the area.
- **Area Linking:** Base Link Area (BLA) behaves as Area 0 for linked channels. Link bitmaps cover 24 areas above the BLA (byte2: areas 1-8, byte4: 9-16, byte5: 17-24; bit7 = first).
<!-- UNRESOLVED: DUS360CS-specific sensor behaviour (which opcodes it originates, occupancy/light-level report cadence) not in source. Source is the generic DyNet opcode catalogue. -->
<!-- UNRESOLVED: source states RS-485 electrical interface; input context cited RS-232C. Serial framing (9600 8N1) is identical; electrical layer discrepancy unresolved. -->
```

Spec ready. 39 actions + 3 feedbacks + 13 preference variables, all 42 source opcodes covered. Checksum math verified against examples.

## Provenance

```yaml
source_domains:
  - docs.dynalite.com
source_urls:
  - https://docs.dynalite.com/system-builder/latest/quick_start/dynet_opcodes.html
  - https://docs.dynalite.com/system-builder/latest/quick_start/device_codes.html
  - https://docs.dynalite.com/system-builder/latest/ddng485.html
  - https://docs.dynalite.com/system-builder/latest/ddng232.html
  - https://docs.dynalite.com/system-builder/latest/ddng232/dynet_messaging.html
retrieved_at: 2026-06-30T06:32:31.417Z
last_checked_at: 2026-06-30T07:00:17.537Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-30T07:00:17.537Z
matched_actions: 39
action_count: 39
confidence: medium
summary: "All 39 spec action opcodes found in source; transport parameters verified; complete bidirectional coverage. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source documents the general DyNet opcode catalogue, not DUS360CS-specific behaviour (which sensor opcodes it emits/consumes). Device power specs, voltage, and fault behaviour not stated. Source states RS-485 electrical interface; user context cited RS-232C — discrepancy unresolved."
- "flow control not stated; source specifies byte/packet timing instead (idle <1ms, inter-packet >10ms)"
- "source does not explicitly document unsolicited notification behaviour."
- "no multi-step sequences explicitly documented in source."
- "source contains no explicit safety warnings, interlock procedures, or"
- "DUS360CS-specific sensor behaviour (which opcodes it originates, occupancy/light-level report cadence) not in source. Source is the generic DyNet opcode catalogue."
- "source states RS-485 electrical interface; input context cited RS-232C. Serial framing (9600 8N1) is identical; electrical layer discrepancy unresolved."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
