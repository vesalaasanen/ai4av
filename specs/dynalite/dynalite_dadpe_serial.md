---
spec_id: admin/dynalite-dadpe
schema_version: ai4av-public-spec-v1
revision: 1
title: "Dynalite Dadpe Control Spec"
manufacturer: Dynalite
model_family: Dadpe
aliases: []
compatible_with:
  manufacturers:
    - Dynalite
  models:
    - Dadpe
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - docs.dynalite.com
  - aca.im
source_urls:
  - https://docs.dynalite.com/system-builder/latest/quick_start/dynet_opcodes.html
  - https://docs.dynalite.com/system-builder/latest/user_interfaces/display_and_buttons/display_properties.html
  - https://docs.dynalite.com/system-builder/latest/user_interfaces/device_properties.html
  - https://docs.dynalite.com/system-builder/latest/ddng232/dynet_messaging.html
  - "https://aca.im/driver_docs/Philips/Dynet%20Integrators%20hand%20book%20for%20the%20DNG232%20V2.pdf"
retrieved_at: 2026-06-29T21:24:43.409Z
last_checked_at: 2026-06-30T07:00:16.008Z
generated_at: 2026-06-30T07:00:16.008Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "device hardware specs (voltage, current, power) not in source. Firmware version compatibility not stated. Physical Message Structure opcodes (device-code/box-number space) not included in this refined excerpt."
  - "flow control not stated; none implied by listed params"
  - "device-level status (e.g. online/offline, fault flags) not documented in source."
  - "max channel count per area not stated; FF=all is documented but no upper bound."
  - "source does not describe whether Report opcodes are pushed unsolicited or only in reply to a Request."
  - "no multi-step sequences described in source."
  - "source contains no safety warnings, interlock procedures, or"
  - "firmware version compatibility not stated in source."
  - "device hardware specs (voltage/current/power) not in source."
  - "Physical Message Structure opcodes (device-code/box-number space) omitted — not in refined excerpt."
  - "maximum number of channels per area not stated; FF=all-channels documented but no upper bound given."
  - "whether Report opcodes (0x60/0x62/0x4A) are pushed unsolicited or strictly query-replies is not stated."
  - "\"Swap Bank\" mentioned as a sibling of Preset Offset but not documented in source."
verification:
  verdict: verified
  checked_at: 2026-06-30T07:00:16.008Z
  matched_actions: 42
  action_count: 42
  confidence: medium
  summary: "All 42 spec action opcodes matched literally in source with correct byte-level shapes and parameter ranges; RS-485/9600/8N1 transport verified; complete bidirectional coverage. (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-30
---

# Dynalite Dadpe Control Spec

## Summary
Dynalite Dadpe lighting/network controller speaking the DyNet RS-485 protocol. Spec covers the Logical Message opcodes for preset recall, channel ramp/fade, level reporting, program/save/restore preset, panic, DMX mode, panel lock, daylight harvesting, occupancy detection, user preferences, join/RMask, and area linking. Communication uses 8-byte packets with a negative 8-bit two's-complement checksum over bytes 1–7.

<!-- UNRESOLVED: device hardware specs (voltage, current, power) not in source. Firmware version compatibility not stated. Physical Message Structure opcodes (device-code/box-number space) not included in this refined excerpt. -->

## Transport
```yaml
# Source explicitly states RS-485 at 9600 bps, 8 data bits, 1 start, 1 stop, no parity.
# NOTE: input context labelled the protocol "RS-232C", but the refined source document
# describes the DyNet interface as RS-485. Population follows the source (Tier 1).
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated; none implied by listed params
auth:
  type: none  # inferred: no auth/login procedure in source
```

## Traits
```yaml
# - powerable  (Set to Off / Ramp to Off / Ramp to On / Fade to Off / Fade to On)
# - levelable  (ramp/fade to a level across multiple rate ranges)
# - queryable  (Request Channel Level, Request Preset, Request User Preference)
traits:
  - powerable
  - levelable
  - queryable
```

## Actions
```yaml
# DyNet Logical Message packet: 8 bytes. Byte0=1C sync, Byte1=Area, Byte2-5=data,
# Byte6=Join (usually FF), Byte7=Checksum = negative 8-bit two's-complement sum of bytes 1-7.
# Idle between bytes <1ms; delay between packets >10ms.
# Commands listed verbatim with example payloads from source.

# --- Preset ---

- id: select_current_preset
  label: Select Current Preset
  kind: action
  command: "1C {area} {fade_rate_lo} {preset} {fade_rate_hi} {preset_bank} {join} {checksum}"
  params:
    - name: area
      type: integer
      description: Area number (Byte 1)
    - name: preset
      type: enum
      description: "Byte3 opcode also carries preset: 0=P1,1=P2,2=P3,3=P4,A=P5,B=P6,C=P7,D=P8"
    - name: preset_bank
      type: integer
      description: "Byte5: 0=P1-P8, 1=P9-P16, 2=P17-P24, etc."
  notes: "Example Select Preset 4 in Area 1: [1C] [01] [20] [03] [00] [00] [FF] [C1]"

- id: select_current_preset_linear
  label: Select Current Preset (Linear)
  kind: action
  command: "1C {area} {preset} 65 {fade_time_lo} {fade_time_hi} {join} {checksum}"
  params:
    - name: area
      type: integer
      description: Area number
    - name: preset
      type: integer
      description: Preset (0 origin)
    - name: fade_time_lo
      type: integer
      description: "16-bit fade time, 20ms steps (low byte)"
    - name: fade_time_hi
      type: integer
      description: "16-bit fade time, 20ms steps (high byte)"
  notes: "Example Preset 4 Area 1 fade 2s: [1C] [01] [03] [65] [64] [00] [FF] [18]"

- id: preset_offset
  label: Preset Offset
  kind: action
  command: "1C {area} {offset_or_80} 64 00 00 {join} {checksum}"
  params:
    - name: area
      type: integer
      description: Area number
    - name: offset_or_80
      type: integer
      description: "Offset value plus Bit 8 set, to distinguish from Swap Bank"
  notes: "Example Offset 15 Area 1: [1C] [01] [8F] [64] [00] [00] [FF] [F1]"

- id: reset_preset
  label: Reset Preset
  kind: action
  command: "1C {area} {fade_time_lo} 0F {fade_time_hi} 00 {join} {checksum}"
  params:
    - name: area
      type: integer
      description: Area number
    - name: fade_time_lo
      type: integer
      description: "16-bit fade time, 20ms steps (low byte)"
    - name: fade_time_hi
      type: integer
      description: "16-bit fade time, 20ms steps (high byte)"
  notes: "Example Reset Preset Area 1 5s: [1C] [01] [FA] [0F] [00] [00] [FF] [DB]"

# --- Ramp / Fade ---

- id: ramp_to_off
  label: Ramp Channel/Area to Off
  kind: action
  command: "1C {area} {channel} 68 00 {ramp_rate} {join} {checksum}"
  params:
    - name: area
      type: integer
      description: Area number
    - name: channel
      type: integer
      description: "Channel (0 origin, FF = all channels in area)"
    - name: ramp_rate
      type: integer
      description: "100ms steps (time to fade 0 to 100%)"
  notes: "Example Ch4 Area1 5s: [1C] [01] [03] [68] [00] [32] [FF] [47]"

- id: ramp_to_on
  label: Ramp Channel/Area to On
  kind: action
  command: "1C {area} {channel} 69 00 {ramp_rate} {join} {checksum}"
  params:
    - name: area
      type: integer
      description: Area number
    - name: channel
      type: integer
      description: "Channel (0 origin, FF = all channels in area)"
    - name: ramp_rate
      type: integer
      description: "100ms steps (time to fade 0 to 100%)"
  notes: "Example Ch4 Area1 5s: [1C] [01] [03] [69] [00] [32] [FF] [46]"

- id: fade_to_preset
  label: Fade Channel/Area to Preset
  kind: action
  command: "1C {area} {channel} 6B {preset} {fade_time} {join} {checksum}"
  params:
    - name: area
      type: integer
      description: Area number
    - name: channel
      type: integer
      description: "Channel (0 origin, FF = all channels in area)"
    - name: preset
      type: integer
      description: Preset (0 origin)
    - name: fade_time
      type: integer
      description: "Fade time, 20ms steps"
  notes: "Example Area1 Ch4 Preset4 2.00s: [1C] [01] [03] [6B] [03] [64] [FF] [0F]"

- id: ramp_to_level_0_1_to_25_5s
  label: Ramp Channel/Area to a Level (0.1s to 25.5s)
  kind: action
  command: "1C {area} {channel} 71 {level} {ramp_rate} {join} {checksum}"
  params:
    - name: area
      type: integer
      description: Area number
    - name: channel
      type: integer
      description: "Channel (0 origin, FF = all channels in area)"
    - name: level
      type: integer
      description: "Channel level (01=100%, FF=0%)"
    - name: ramp_rate
      type: integer
      description: "100ms steps (time to fade 0 to 100%)"
  notes: "Example Area2 Ch3 50% 5s: [1C] [02] [02] [71] [82] [32] [FF] [BC]"

- id: fade_to_level_1_to_255s
  label: Fade Channel/Area to a Level (1s to 255s)
  kind: action
  command: "1C {area} {channel} 72 {level} {fade_rate} {join} {checksum}"
  params:
    - name: area
      type: integer
      description: Area number
    - name: channel
      type: integer
      description: "Channel (0 origin, FF = all channels in area)"
    - name: level
      type: integer
      description: "Channel level (01=100%, FF=0%)"
    - name: fade_rate
      type: integer
      description: "1 sec steps"
  notes: "Example Area2 Ch3 50% 50s: [1C] [02] [02] [72] [82] [32] [FF] [BB]"

- id: fade_to_level_1_to_22min
  label: Fade Channel/Area to a Level (1 min to 22 min)
  kind: action
  command: "1C {area} {channel} 73 {level} {fade_rate} {join} {checksum}"
  params:
    - name: area
      type: integer
      description: Area number
    - name: channel
      type: integer
      description: "Channel (0 origin, FF = all channels in area)"
    - name: level
      type: integer
      description: "Channel level (01=100%, FF=0%)"
    - name: fade_rate
      type: integer
      description: "1 min steps, max 22 minutes"
  notes: "Example Area2 Ch3 50% 15min: [1C] [02] [02] [73] [82] [0F] [FF] [DD]"

- id: fade_to_off
  label: Fade Channel/Area to Off
  kind: action
  command: "1C {area} {channel} 74 {fade_time_lo} {fade_time_hi} {join} {checksum}"
  params:
    - name: area
      type: integer
      description: Area number
    - name: channel
      type: integer
      description: "Channel (0 origin, FF = all channels in area)"
    - name: fade_time_lo
      type: integer
      description: "16-bit fade time, 20ms steps (low byte)"
    - name: fade_time_hi
      type: integer
      description: "16-bit fade time, 20ms steps (high byte)"
  notes: "Example Area4 all chans 2.00s: [1C] [04] [FF] [74] [64] [00] [FF] [0A]"

- id: fade_to_on
  label: Fade Channel/Area to On
  kind: action
  command: "1C {area} {channel} 75 {fade_time_lo} {fade_time_hi} {join} {checksum}"
  params:
    - name: area
      type: integer
      description: Area number
    - name: channel
      type: integer
      description: "Channel (0 origin, FF = all channels in area)"
    - name: fade_time_lo
      type: integer
      description: "16-bit fade time, 20ms steps (low byte)"
    - name: fade_time_hi
      type: integer
      description: "16-bit fade time, 20ms steps (high byte)"
  notes: "Example Area4 all chans 2.00s: [1C] [04] [FF] [75] [64] [00] [FF] [09]"

- id: stop_fade
  label: Stop Fade Channel/Area
  kind: action
  command: "1C {area} {channel} 76 00 00 {join} {checksum}"
  params:
    - name: area
      type: integer
      description: Area number
    - name: channel
      type: integer
      description: "Channel (0 origin, FF = all channels in area)"
  notes: "Example Area4 Ch6: [1C] [04] [05] [76] [00] [00] [FF] [66]"

- id: fade_area_to_level
  label: Fade Area to a Level
  kind: action
  command: "1C {area} {level} 79 {fade_time_lo} {fade_time_hi} {join} {checksum}"
  params:
    - name: area
      type: integer
      description: Area number
    - name: level
      type: integer
      description: "Byte2 acts as level (01=100%, FF=0% per sibling opcodes)"
    - name: fade_time_lo
      type: integer
      description: "16-bit fade time, 20ms steps (low byte)"
    - name: fade_time_hi
      type: integer
      description: "16-bit fade time, 20ms steps (high byte)"
  notes: "Example Area4 50% 2s: [1C] [04] [82] [79] [64] [00] [FF] [82]"

- id: set_to_off
  label: Set to Off
  kind: action
  command: "1C {area} {fade_rate_lo} 04 {fade_rate_hi} 00 {join} {checksum}"
  params:
    - name: area
      type: integer
      description: Area number
    - name: fade_rate_lo
      type: integer
      description: "Fade rate low byte (usually 100 decimal = 0x64)"
    - name: fade_rate_hi
      type: integer
      description: "Fade rate high byte (usually 0)"
  notes: "Example Area3 Off: [1C] [03] [0A] [04] [00] [00] [FF] [D4]"

- id: ramp_to_level_except_zero
  label: Ramp Channel/Area to a Level except channels preset to 0% or don't care
  kind: action
  command: "1C {area} {channel} 5F {level} {ramp_rate} {join} {checksum}"
  params:
    - name: area
      type: integer
      description: Area number
    - name: channel
      type: integer
      description: "Channel (0 origin, FF = all channels in area)"
    - name: level
      type: integer
      description: "Level (01=100%, FF=0%)"
    - name: ramp_rate
      type: integer
      description: "100ms steps (time to fade 0 to 100%)"
  notes: "Example Area4 ramp lit channels to 100% 5.00s: [1C] [04] [FF] [5F] [01] [32] [FF] [50]"

# --- Request / Report ---

- id: report_channel_level
  label: Report Channel Level (reply from dimmer)
  kind: event
  command: "1C {area} {channel} 60 {target_level} {current_level} {join} {checksum}"
  params:
    - name: area
      type: integer
      description: Area number
    - name: channel
      type: integer
      description: Channel (0 origin)
    - name: target_level
      type: integer
      description: "Target level (01=100%, FF=0%)"
    - name: current_level
      type: integer
      description: "Current level (01=100%, FF=0%)"
  notes: "Example Ch5 Area2 target/current 57%: [1C] [02] [04] [60] [70] [70] [FF] [9F]"

- id: request_channel_level
  label: Request Channel Level (sent to dimmer)
  kind: query
  command: "1C {area} {channel} 61 00 00 {join} {checksum}"
  params:
    - name: area
      type: integer
      description: Area number
    - name: channel
      type: integer
      description: Channel (0 origin)
  notes: "Example Ch5 Area2: [1C] [02] [04] [61] [00] [00] [FF] [7E]"

- id: report_preset
  label: Report Preset (reply from dimmer)
  kind: event
  command: "1C {area} {preset} 62 00 00 {join} {checksum}"
  params:
    - name: area
      type: integer
      description: Area number
    - name: preset
      type: integer
      description: Preset (0 origin)
  notes: "Example Area4 currently in Preset 6: [1C] [04] [05] [62] [00] [00] [FF] [7A]"

- id: request_preset
  label: Request Preset (sent to dimmer)
  kind: query
  command: "1C {area} 00 63 00 00 {join} {checksum}"
  params:
    - name: area
      type: integer
      description: Area number
  notes: "Example Request current preset Area4: [1C] [04] [00] [63] [00] [00] [FF] [7E]"

# --- Program / Save / Restore Preset ---

- id: program_current_preset
  label: Program Current Preset (save channel levels to current preset)
  kind: action
  command: "1C {area} 00 08 00 00 {join} {checksum}"
  params:
    - name: area
      type: integer
      description: Area number
  notes: "Example Area4 save current levels to current preset: [1C] [04] [00] [08] [00] [00] [FF] [D9]"

- id: program_defined_preset
  label: Program Defined Preset (save channel levels to a defined preset)
  kind: action
  command: "1C {area} {preset} 09 00 00 {join} {checksum}"
  params:
    - name: area
      type: integer
      description: Area number
    - name: preset
      type: integer
      description: Preset (0 origin)
  notes: "Example Area4 save current levels to Preset 1: [1C] [04] [00] [09] [00] [00] [FF] [D8]"

- id: save_current_preset
  label: Save Current Preset (saves current preset number)
  kind: action
  command: "1C {area} 00 66 00 00 {join} {checksum}"
  params:
    - name: area
      type: integer
      description: Area number
  notes: "Example Area1: [1C] [01] [00] [66] [00] [00] [FF] [7E]"

- id: restore_saved_preset
  label: Restore Saved Preset
  kind: action
  command: "1C {area} {fade_time_lo} 67 {fade_time_hi} 00 {join} {checksum}"
  params:
    - name: area
      type: integer
      description: Area number
    - name: fade_time_lo
      type: integer
      description: "16-bit fade time, 20ms steps (low byte)"
    - name: fade_time_hi
      type: integer
      description: "16-bit fade time, 20ms steps (high byte)"
  notes: "Example Area1: [1C] [01] [FA] [67] [00] [00] [FF] [83]"

# --- Panic ---

- id: panic
  label: Panic (Locks panels and selects panic preset)
  kind: action
  command: "1C {area} 00 17 00 00 {join} {checksum}"
  params:
    - name: area
      type: integer
      description: Area number
  notes: "Example Area2: [1C] [02] [F0] [17] [00] [00] [FF] [DC]"

- id: un_panic
  label: Un-Panic (Unlocks panels and restores previous preset)
  kind: action
  command: "1C {area} 00 18 00 00 {join} {checksum}"
  params:
    - name: area
      type: integer
      description: Area number
  notes: "Example Area2: [1C] [02] [F0] [18] [00] [00] [FF] [DB]"

# --- DMX ---

- id: set_dmx_mode
  label: Set DMX Mode
  kind: action
  command: "1C {area} {mode} 10 00 00 {join} {checksum}"
  params:
    - name: area
      type: integer
      description: Area number
    - name: mode
      type: enum
      description: "00=DMX if Present, 01=Local Override, 02=HTP, 03=DyNet"
  notes: "Example Area1 DyNet only: [1C] [01] [03] [10] [00] [00] [FF] [D1]"

# --- Disable/Enable Control Panels ---

- id: disable_control_panels
  label: Disable Control Panels
  kind: action
  command: "1C {area} 00 15 00 00 {join} {checksum}"
  params:
    - name: area
      type: integer
      description: Area number
  notes: "Example lock all panels Area6: [1C] [06] [00] [15] [00] [00] [FF] [CA]"

- id: enable_control_panels
  label: Enable Control Panels
  kind: action
  command: "1C {area} 00 16 00 00 {join} {checksum}"
  params:
    - name: area
      type: integer
      description: Area number
  notes: "Example unlock all panels Area6: [1C] [06] [00] [16] [00] [00] [FF] [C9]"

# --- Light Level Compensation (Daylight Harvesting) ---

- id: suspend_resume_llc_all_presets
  label: Suspend/Resume Light Level Compensation (All presets)
  kind: action
  command: "1C {area} {channel} 11 00 {suspend_resume} {join} {checksum}"
  params:
    - name: area
      type: integer
      description: Area number
    - name: channel
      type: integer
      description: "Channel (0 origin, FF = all channels in area)"
    - name: suspend_resume
      type: enum
      description: "0 = Suspend, 1 = Resume"
  notes: "Example Area2 all chans Resume: [1C] [02] [FF] [11] [00] [01] [FF] [D2]"

- id: suspend_llc_current_preset
  label: Suspend Light Level Compensation (Current Preset)
  kind: action
  command: "1C {area} {channel} 1A 00 00 {join} {checksum}"
  params:
    - name: area
      type: integer
      description: Area number
    - name: channel
      type: integer
      description: "Channel (0 origin, FF = all channels in area)"
  notes: "Example Area2 all chans disable LLC current preset: [1C] [02] [FF] [1A] [00] [00] [FF] [CA]"

- id: resume_llc_current_preset
  label: Resume Light Level Compensation (Current Preset)
  kind: action
  command: "1C {area} {channel} 1B 00 00 {join} {checksum}"
  params:
    - name: area
      type: integer
      description: Area number
    - name: channel
      type: integer
      description: "Channel (0 origin, FF = all channels in area)"
  notes: "Example Area2 all chans enable LLC current preset: [1C] [02] [FF] [1B] [00] [00] [FF] [C9]"

# --- Occupancy Detection ---

- id: suspend_resume_occupancy_all_presets
  label: Suspend/Resume Occupancy Detection (All presets)
  kind: action
  command: "1C {area} {channel} 31 00 {suspend_resume} {join} {checksum}"
  params:
    - name: area
      type: integer
      description: Area number
    - name: channel
      type: integer
      description: "Channel (0 origin, FF = all channels in area)"
    - name: suspend_resume
      type: enum
      description: "0 = Suspend, 1 = Resume"
  notes: "Example Area1 all chans Resume: [1C] [01] [FF] [31] [00] [01] [FF] [B3]"

- id: disable_occupancy_current_preset
  label: Disable Occupancy Detection (Current Preset)
  kind: action
  command: "1C {area} {channel} 3A 00 00 {join} {checksum}"
  params:
    - name: area
      type: integer
      description: Area number
    - name: channel
      type: integer
      description: "Channel (0 origin, FF = all channels in area)"
  notes: "Example Area1 all chans disable occupancy current preset: [1C] [01] [FF] [3A] [00] [00] [FF] [AB]"

- id: enable_occupancy_current_preset
  label: Enable Occupancy Detection (Current Preset)
  kind: action
  command: "1C {area} {channel} 3B 00 00 {join} {checksum}"
  params:
    - name: area
      type: integer
      description: Area number
    - name: channel
      type: integer
      description: "Channel (0 origin, FF = all channels in area)"
  notes: "Example Area1 all chans enable occupancy current preset: [1C] [01] [FF] [3B] [00] [00] [FF] [AA]"

# --- User Preference Messages ---

- id: set_user_preference
  label: Set User Preference
  kind: action
  command: "1C {area} {preference} 48 {data_hi} {data_lo} {join} {checksum}"
  params:
    - name: area
      type: integer
      description: Area number
    - name: preference
      type: enum
      description: >
        Preference ID. 0x01 Indicator LED Brightness, 0x02 Backlight LED Brightness,
        0x03 Display Brightness, 0x04 Display Contrast, 0x05 Sounder Volume,
        0x06 Actual Temperature (16-bit 2s comp, 0.25C steps), 0x07 User Temp setpoint,
        0x08 Display Brightness Scaled, 0x09 AC Plant Capability, 0x0A Closed-loop light setpoint (LUX),
        0x0B Dynamic No Motion Timeout, 0x0C Actual Temp (signed fixed point C), 0x0D User Temp setpoint (signed fixed point C)
    - name: data_hi
      type: integer
      description: "Data high byte (meaning depends on preference)"
    - name: data_lo
      type: integer
      description: "Data low byte (meaning depends on preference)"
  notes: "Example Area1 LED brightness 50% fade 1.00s: [1C] [01] [01] [48] [82] [32] [FF] [E7]"

- id: request_user_preference
  label: Request User Preference
  kind: query
  command: "1C {area} {preference} 49 00 00 {join} {checksum}"
  params:
    - name: area
      type: integer
      description: Area number
    - name: preference
      type: enum
      description: "See set_user_preference preference enum (0x01-0x0D)"
  notes: "Example Area1 request actual temperature: [1C] [01] [06] [49] [00] [00] [FF] [95]"

- id: report_user_preference
  label: Report User Preference
  kind: event
  command: "1C {area} {preference} 4A {data_hi} {data_lo} {join} {checksum}"
  params:
    - name: area
      type: integer
      description: Area number
    - name: preference
      type: enum
      description: "See set_user_preference preference enum (0x01-0x0D)"
    - name: data_hi
      type: integer
      description: "Data high byte (per preference encoding)"
    - name: data_lo
      type: integer
      description: "Data low byte (per preference encoding)"
  notes: "Example Area1 actual temp 22C: [1C] [01] [06] [4A] [00] [58] [FF] [3C]"

# --- Join ---

- id: set_join_level
  label: Set Join Level
  kind: action
  command: "1C {area} {join_level} 14 00 00 {join} {checksum}"
  params:
    - name: area
      type: integer
      description: Area number
    - name: join_level
      type: integer
      description: Join level
  notes: "Example Area1 Set Join Level 6: [1C] [01] [06] [14] [00] [00] [FF] [CA]"

- id: set_rmask
  label: Set RMask
  kind: action
  command: "1C {area} {rmask} 40 00 00 {join} {checksum}"
  params:
    - name: area
      type: integer
      description: Area number
    - name: rmask
      type: integer
      description: RMask value
  notes: "Example Area1 RMask level 3: [1C] [01] [03] [40] [00] [00] [FF] [A1]"

# --- Area Linking ---

- id: set_area_links
  label: Set Area Links
  kind: action
  command: "1C {area} {link_byte2} 20 {link_byte4} {link_byte5} {join} {checksum}"
  params:
    - name: area
      type: integer
      description: Base Link Area (BLA) - acts as Area 0
    - name: link_byte2
      type: integer
      description: "Bitmask Byte2: Bit7=1st area, Bit0=8th area"
    - name: link_byte4
      type: integer
      description: "Bitmask Byte4: Bit7=9th area, Bit0=16th area"
    - name: link_byte5
      type: integer
      description: "Bitmask Byte5: Bit7=17th area, Bit0=24th area"
  notes: "Example link Areas 4&5 (Base Area=3): [1C] [04] [80] [20] [00] [00] [FF] [41]"

- id: clear_area_links
  label: Clear Area Links
  kind: action
  command: "1C {area} {unlink_byte2} 21 {unlink_byte4} {unlink_byte5} {join} {checksum}"
  params:
    - name: area
      type: integer
      description: Base Link Area
    - name: unlink_byte2
      type: integer
      description: Bitmask of areas to unlink (Byte 2 encoding)
    - name: unlink_byte4
      type: integer
      description: Bitmask of areas to unlink (Byte 4 encoding)
    - name: unlink_byte5
      type: integer
      description: Bitmask of areas to unlink (Byte 5 encoding)
  notes: "Example separate Areas 4&5 (Base Area=3): [1C] [04] [80] [21] [00] [00] [FF] [40]"
```

## Feedbacks
```yaml
# Observable query/response states. See also Actions with kind: event for the
# unsolicited Report opcodes (0x60, 0x62, 0x4A).

- id: channel_level_response
  type: object
  description: "Reply to Request Channel Level (op 0x61). Carries target and current level (01=100%, FF=0%)."

- id: preset_response
  type: integer
  description: "Reply to Request Preset (op 0x63). Current preset number (0 origin)."

- id: user_preference_response
  type: object
  description: "Reply to Request User Preference (op 0x49). Carries preference id, data hi, data lo."

# UNRESOLVED: device-level status (e.g. online/offline, fault flags) not documented in source.
```

## Variables
```yaml
# Settable parameters that are not discrete one-shot actions.

- id: area
  type: integer
  description: "Logical area number (Byte 1). Scope for most opcodes."

- id: channel
  type: integer
  description: "Channel within area (Byte 2). 0 origin; FF = all channels in the area."

- id: preset
  type: integer
  description: "Preset index (0 origin). Banked in groups of 8 via preset_bank."

- id: preset_bank
  type: integer
  description: "Byte5 in Select Current Preset. 0=P1-P8, 1=P9-P16, 2=P17-P24, etc."

- id: channel_level
  type: integer
  range: [0x01, 0xFF]
  description: "Channel level encoding. 01=100%, FF=0% (inverted)."

- id: fade_time_20ms
  type: integer
  description: "16-bit fade time, 20ms steps (split across low/high bytes)."

- id: ramp_rate_100ms
  type: integer
  description: "Ramp rate in 100ms steps (time to fade 0 to 100%)."

- id: join
  type: integer
  description: "Byte 6. Usually FF hex."

- id: checksum
  type: integer
  description: "Byte 7. Negative 8-bit two's complement sum of bytes 1-7."

# UNRESOLVED: max channel count per area not stated; FF=all is documented but no upper bound.
```

## Events
```yaml
# Unsolicited / reply messages the device emits.

- id: report_channel_level_event
  opcode: "0x60"
  description: "Dimmer reports channel target/current level (reply or push)."

- id: report_preset_event
  opcode: "0x62"
  description: "Dimmer reports current preset."

- id: report_user_preference_event
  opcode: "0x4A"
  description: "Dimmer reports a user preference value (e.g. actual temperature)."

# UNRESOLVED: source does not describe whether Report opcodes are pushed unsolicited or only in reply to a Request.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements. Panic/Un-Panic opcodes are documented as
# panel-lock + preset-recall behaviour, not as safety interlocks.
```

## Notes
- Packet framing: 8-byte Logical Message. Byte0 = `1C` sync (Logical). Byte1 = Area. Bytes 2–5 = opcode + data. Byte6 = Join (usually `FF`). Byte7 = checksum = negative 8-bit two's complement sum of bytes 1–7.
- Bus timing: idle between bytes `< 1ms`; delay between packets `> 10ms`.
- Byte3 carries the opcode for all Logical opcodes (the "preset" field in Select Current Preset at Byte3 doubles as both opcode position and preset selector per the source's mixed Byte3 description).
- Source also defines a Physical Message Structure (Byte0=`5C`, device code, box number) not enumerated here — refined excerpt covers Logical Message space only.
- Input context labelled the protocol "RS-232C"; the refined source explicitly describes the DyNet interface as RS-485 at 9600 bps. This spec follows the source.
- Level encoding is inverted: `01` = 100%, `FF` = 0%.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: device hardware specs (voltage/current/power) not in source. -->
<!-- UNRESOLVED: Physical Message Structure opcodes (device-code/box-number space) omitted — not in refined excerpt. -->
<!-- UNRESOLVED: maximum number of channels per area not stated; FF=all-channels documented but no upper bound given. -->
<!-- UNRESOLVED: whether Report opcodes (0x60/0x62/0x4A) are pushed unsolicited or strictly query-replies is not stated. -->
<!-- UNRESOLVED: "Swap Bank" mentioned as a sibling of Preset Offset but not documented in source. -->
```

规范已输出。共 39 个操作码，均为 1 级直接来自源。`serial` + RS-485 9600（遵循源，而非 RS-232C 输入标签）。恐慌/解除恐慌为面板锁定，并非安全联锁 → 安全部分未解决。

## Provenance

```yaml
source_domains:
  - docs.dynalite.com
  - aca.im
source_urls:
  - https://docs.dynalite.com/system-builder/latest/quick_start/dynet_opcodes.html
  - https://docs.dynalite.com/system-builder/latest/user_interfaces/display_and_buttons/display_properties.html
  - https://docs.dynalite.com/system-builder/latest/user_interfaces/device_properties.html
  - https://docs.dynalite.com/system-builder/latest/ddng232/dynet_messaging.html
  - "https://aca.im/driver_docs/Philips/Dynet%20Integrators%20hand%20book%20for%20the%20DNG232%20V2.pdf"
retrieved_at: 2026-06-29T21:24:43.409Z
last_checked_at: 2026-06-30T07:00:16.008Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-30T07:00:16.008Z
matched_actions: 42
action_count: 42
confidence: medium
summary: "All 42 spec action opcodes matched literally in source with correct byte-level shapes and parameter ranges; RS-485/9600/8N1 transport verified; complete bidirectional coverage. (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "device hardware specs (voltage, current, power) not in source. Firmware version compatibility not stated. Physical Message Structure opcodes (device-code/box-number space) not included in this refined excerpt."
- "flow control not stated; none implied by listed params"
- "device-level status (e.g. online/offline, fault flags) not documented in source."
- "max channel count per area not stated; FF=all is documented but no upper bound."
- "source does not describe whether Report opcodes are pushed unsolicited or only in reply to a Request."
- "no multi-step sequences described in source."
- "source contains no safety warnings, interlock procedures, or"
- "firmware version compatibility not stated in source."
- "device hardware specs (voltage/current/power) not in source."
- "Physical Message Structure opcodes (device-code/box-number space) omitted — not in refined excerpt."
- "maximum number of channels per area not stated; FF=all-channels documented but no upper bound given."
- "whether Report opcodes (0x60/0x62/0x4A) are pushed unsolicited or strictly query-replies is not stated."
- "\"Swap Bank\" mentioned as a sibling of Preset Offset but not documented in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
