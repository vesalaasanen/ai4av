---
spec_id: admin/dynalite-dus30cs
schema_version: ai4av-public-spec-v1
revision: 1
title: "Dynalite DUS30CS Control Spec"
manufacturer: Dynalite
model_family: DUS30CS
aliases: []
compatible_with:
  manufacturers:
    - Dynalite
  models:
    - DUS30CS
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
retrieved_at: 2026-06-30T06:31:37.074Z
last_checked_at: 2026-06-30T07:00:16.746Z
generated_at: 2026-06-30T07:00:16.746Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "DUS30CS exposes no native RS-232/TCP/IP control port. Transport is DyNet over RS-485, addressed via a Dynalite gateway (e.g. DDNG232) for third-party integration. Source document is the DyNet opcode reference, not a device-specific protocol manual."
  - "flow control not stated in source"
  - "no input-switching commands present in this source"
  - "no additional named multi-step sequences in source."
  - "no electrical safety, fault-recovery, or sequencing guidance in source."
  - "DUS30CS-specific commissioning / addressing message (Box number assignment via 5C Physical sync), diagnostics, or device-class identification opcodes are NOT in this source. Only the Logical Message opcode catalogue is covered."
  - "firmware range, mains voltages, fault recovery, flow-control specifics beyond `none`."
verification:
  verdict: verified
  checked_at: 2026-06-30T07:00:16.746Z
  matched_actions: 42
  action_count: 42
  confidence: medium
  summary: "All 42 spec actions match opcodes in source; transport parameters verified; 100% coverage. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-30
---

# Dynalite DUS30CS Control Spec

## Summary
The Dynalite DUS30CS is a multifunction sensor (occupancy / light-level / temperature) that communicates over the Dynalite DyNet proprietary bus on RS-485 at 9600 bps. This spec covers the DyNet opcode catalogue the device responds to or reports on the bus: presets, channel/area ramp and fade, level reporting, panel lock, panic, DMX mode, daylight harvesting, occupancy detection, user preferences, joins, and area linking.

<!-- UNRESOLVED: DUS30CS exposes no native RS-232/TCP/IP control port. Transport is DyNet over RS-485, addressed via a Dynalite gateway (e.g. DDNG232) for third-party integration. Source document is the DyNet opcode reference, not a device-specific protocol manual. -->

## Transport
```yaml
# Transport is DyNet (Dynalite proprietary) over RS-485, per source. The user-supplied
# "Known protocol: RS-232C" is inaccurate for the sensor itself; DyNet/RS-485 is the only
# protocol the source documents for the DUS30CS.

protocols:
  - serial
serial:
  baud_rate: 9600      # source: "9600bps"
  data_bits: 8          # source: "8 bit data"
  parity: none          # source: "no parity"
  stop_bits: 1          # source: "1 stop bit"
  flow_control: none    # UNRESOLVED: flow control not stated in source
  # Additional DyNet framing parameters (not standard serial fields):
  # - start bits: 1 (source: "1 start bit")
  # - inter-byte idle: <1 ms (source)
  # - inter-packet delay: >10 ms (source)
  # - physical sync byte: 5C (Physical Message); logical sync byte: 1C (Logical Message)
  # - checksum: byte 7 = negative 8-bit 2's-complement of sum of bytes 1-6
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
powerable: true      # inferred from Set to Off and Panic opcodes
queryable: true      # inferred from Request Channel Level (0x61) / Request Preset (0x63) / Request User Preference (0x49)
routable: false      # UNRESOLVED: no input-switching commands present in this source
levelable: true      # inferred from Ramp/Fade Channel-to-Level opcodes (0x68/0x69/0x71/0x72/0x73)
sensors:
  - occupancy        # inferred from Occupancy Detection opcodes (0x31/0x3A/0x3B)
  - light_level      # inferred from Light Level Compensation opcodes (0x11/0x1A/0x1B)
  - temperature      # inferred from User Preference 0x06/0x07/0x0C/0x0D
```

## Actions
```yaml
# DyNet Logical Message Structure (8 bytes):
#   Byte 0: 1C (Logical Sync)
#   Byte 1: Area
#   Byte 2: Data Byte 1
#   Byte 3: Opcode
#   Byte 4: Data Byte 2
#   Byte 5: Data Byte 3
#   Byte 6: Join (usually FF)
#   Byte 7: Checksum = negative 8-bit 2's complement of sum of bytes 1-6
# Hex strings below are spaced-per-byte literal payloads verbatim from the source.

# --- Preset (0x04, 0x65, 0x64, 0x0F) ---
- id: select_preset
  label: Select Current Preset
  kind: action
  command: "1C {area} {fade_lo} {preset} {fade_hi} {bank} FF {checksum}"
  params:
    - name: area
      type: integer
      description: Logical area number
    - name: fade_lo
      type: integer
      description: Fade rate low byte (usually 100 = 1s)
    - name: preset
      type: integer
      description: Preset index per source: 0=P1, 1=P2, 2=P3, 3=P4, A=P5, B=P6, C=P7, D=P8
    - name: fade_hi
      type: integer
      description: Fade rate high byte (usually 0)
    - name: bank
      type: integer
      description: Preset bank: 0=P1-P8, 1=P9-P16, 2=P17-P24, ...
    - name: checksum
      type: integer
      description: Negative 8-bit 2's complement of sum of bytes 1-6 (byte 7)
  # source example: 1C 01 20 03 00 00 FF C1 (Select Preset 4 in Area 1)

- id: select_preset_linear
  label: Select Current Preset (Linear)
  kind: action
  command: "1C {area} {preset} 65 {fade_lo} {fade_hi} FF {checksum}"
  params:
    - name: area
      type: integer
    - name: preset
      type: integer
      description: Preset (0 origin)
    - name: fade_lo
      type: integer
      description: 16-bit fade time low byte (20 ms steps)
    - name: fade_hi
      type: integer
      description: 16-bit fade time high byte (20 ms steps)
    - name: checksum
      type: integer
  # source example: 1C 01 03 65 64 00 FF 18 (Preset 4 in Area 1, fade 2s)

- id: preset_offset
  label: Preset Offset
  kind: action
  command: "1C {area} {offset_bit8_set} 64 00 00 FF {checksum}"
  params:
    - name: area
      type: integer
    - name: offset_bit8_set
      type: integer
      description: Offset value plus bit 8 set (to distinguish from Swap Bank)
    - name: checksum
      type: integer
  # source example: 1C 01 8F 64 00 00 FF F1 (Offset 15 in Area 1)

- id: reset_preset
  label: Reset Preset
  kind: action
  command: "1C {area} {fade_lo} 0F {fade_hi} 00 FF {checksum}"
  params:
    - name: area
      type: integer
    - name: fade_lo
      type: integer
      description: 16-bit fade time low byte (20 ms steps)
    - name: fade_hi
      type: integer
      description: 16-bit fade time high byte (20 ms steps)
    - name: checksum
      type: integer
  # source example: 1C 01 FA 0F 00 00 FF DB (Reset in Area 1 over 5s)

# --- Ramp / Fade (0x04, 0x68, 0x69, 0x6B, 0x71, 0x72, 0x73, 0x74, 0x75, 0x76, 0x79, 0x5F) ---
- id: ramp_to_off
  label: Ramp Channel/Area to Off
  kind: action
  command: "1C {area} {channel} 68 00 {ramp_rate} FF {checksum}"
  params:
    - name: area
      type: integer
    - name: channel
      type: integer
      description: Channel (0 origin; FF = all channels in area)
    - name: ramp_rate
      type: integer
      description: 100 ms steps; time for 0%->100% fade
    - name: checksum
      type: integer
  # source example: 1C 01 03 68 00 32 FF 47

- id: ramp_to_on
  label: Ramp Channel/Area to On
  kind: action
  command: "1C {area} {channel} 69 00 {ramp_rate} FF {checksum}"
  params:
    - name: area
      type: integer
    - name: channel
      type: integer
      description: Channel (0 origin; FF = all channels in area)
    - name: ramp_rate
      type: integer
      description: 100 ms steps
    - name: checksum
      type: integer
  # source example: 1C 01 03 69 00 32 FF 46

- id: fade_to_preset
  label: Fade Channel/Area to Preset
  kind: action
  command: "1C {area} {channel} 6B {preset} {fade_time} FF {checksum}"
  params:
    - name: area
      type: integer
    - name: channel
      type: integer
      description: Channel (0 origin; FF = all channels in area)
    - name: preset
      type: integer
      description: Preset (0 origin)
    - name: fade_time
      type: integer
      description: Fade time in 20 ms steps
    - name: checksum
      type: integer
  # source example: 1C 01 03 6B 03 64 FF 0F

- id: ramp_to_level_short
  label: Ramp Channel/Area to Level (0.1-25.5 s)
  kind: action
  command: "1C {area} {channel} 71 {level} {ramp_rate} FF {checksum}"
  params:
    - name: area
      type: integer
    - name: channel
      type: integer
    - name: level
      type: integer
      description: 01=100%, FF=0%
    - name: ramp_rate
      type: integer
      description: 100 ms steps
    - name: checksum
      type: integer
  # source example: 1C 02 02 71 82 32 FF BC

- id: fade_to_level_medium
  label: Fade Channel/Area to Level (1-255 s)
  kind: action
  command: "1C {area} {channel} 72 {level} {fade_rate} FF {checksum}"
  params:
    - name: area
      type: integer
    - name: channel
      type: integer
    - name: level
      type: integer
      description: 01=100%, FF=0%
    - name: fade_rate
      type: integer
      description: 1-second steps
    - name: checksum
      type: integer
  # source example: 1C 02 02 72 82 32 FF BB

- id: fade_to_level_long
  label: Fade Channel/Area to Level (1-22 min)
  kind: action
  command: "1C {area} {channel} 73 {level} {fade_rate} FF {checksum}"
  params:
    - name: area
      type: integer
    - name: channel
      type: integer
    - name: level
      type: integer
      description: 01=100%, FF=0%
    - name: fade_rate
      type: integer
      description: 1-minute steps, max 22 minutes
    - name: checksum
      type: integer
  # source example: 1C 02 02 73 82 0F FF DD

- id: fade_to_off
  label: Fade Channel/Area to Off
  kind: action
  command: "1C {area} {channel} 74 {fade_lo} {fade_hi} FF {checksum}"
  params:
    - name: area
      type: integer
    - name: channel
      type: integer
      description: FF = all channels
    - name: fade_lo
      type: integer
      description: 16-bit fade time low byte (20 ms steps)
    - name: fade_hi
      type: integer
      description: 16-bit fade time high byte (20 ms steps)
    - name: checksum
      type: integer
  # source example: 1C 04 FF 74 64 00 FF 0A

- id: fade_to_on
  label: Fade Channel/Area to On
  kind: action
  command: "1C {area} {channel} 75 {fade_lo} {fade_hi} FF {checksum}"
  params:
    - name: area
      type: integer
    - name: channel
      type: integer
    - name: fade_lo
      type: integer
    - name: fade_hi
      type: integer
    - name: checksum
      type: integer
  # source example: 1C 04 FF 75 64 00 FF 09

- id: stop_fade
  label: Stop Fade Channel/Area
  kind: action
  command: "1C {area} {channel} 76 00 00 FF {checksum}"
  params:
    - name: area
      type: integer
    - name: channel
      type: integer
    - name: checksum
      type: integer
  # source example: 1C 04 05 76 00 00 FF 66

- id: fade_area_to_level
  label: Fade Area to Level
  kind: action
  command: "1C {area} {level} 79 {fade_lo} {fade_hi} FF {checksum}"
  params:
    - name: area
      type: integer
    - name: level
      type: integer
      description: Byte 2 carries encoded level (01=100%, FF=0%); FF=all-channels convention also accepted
    - name: fade_lo
      type: integer
      description: 16-bit fade time low byte (20 ms steps)
    - name: fade_hi
      type: integer
      description: 16-bit fade time high byte (20 ms steps)
    - name: checksum
      type: integer
  # source example: 1C 04 82 79 64 00 FF 82 (Area 4 to 50% over 2s)

- id: set_to_off
  label: Set to Off
  kind: action
  command: "1C {area} {fade_rate_lo} 04 {fade_rate_hi} 00 FF {checksum}"
  params:
    - name: area
      type: integer
    - name: fade_rate_lo
      type: integer
      description: Usually 100
    - name: fade_rate_hi
      type: integer
      description: Usually 0
    - name: checksum
      type: integer
  # source example: 1C 03 0A 04 00 00 FF D4

- id: ramp_lit_channels_to_level
  label: Ramp Channels (except preset 0% / don't-care) to Level
  kind: action
  command: "1C {area} {channel} 5F {level} {ramp_rate} FF {checksum}"
  params:
    - name: area
      type: integer
    - name: channel
      type: integer
      description: FF = all channels in area
    - name: level
      type: integer
      description: 01=100%, FF=0%
    - name: ramp_rate
      type: integer
      description: 100 ms steps
    - name: checksum
      type: integer
  # source example: 1C 04 FF 5F 01 32 FF 50

# --- Request / Report (0x60, 0x61, 0x62, 0x63) ---
- id: report_channel_level
  label: Report Channel Level (reply from dimmer)
  kind: feedback  # emitted by sensor/gateway
  command: "1C {area} {channel} 60 {target_level} {current_level} FF {checksum}"
  params:
    - name: area
      type: integer
    - name: channel
      type: integer
      description: Channel (0 origin)
    - name: target_level
      type: integer
      description: 01=100%, FF=0%
    - name: current_level
      type: integer
      description: 01=100%, FF=0%
    - name: checksum
      type: integer
  # source example: 1C 02 04 60 70 70 FF 9F

- id: request_channel_level
  label: Request Channel Level
  kind: query
  command: "1C {area} {channel} 61 00 00 FF {checksum}"
  params:
    - name: area
      type: integer
    - name: channel
      type: integer
      description: Channel (0 origin)
    - name: checksum
      type: integer
  # source example: 1C 02 04 61 00 00 FF 7E

- id: report_preset
  label: Report Preset (reply from dimmer)
  kind: feedback
  command: "1C {area} {preset} 62 00 00 FF {checksum}"
  params:
    - name: area
      type: integer
    - name: preset
      type: integer
      description: Preset (0 origin)
    - name: checksum
      type: integer
  # source example: 1C 04 05 62 00 00 FF 7A (Area 4 currently in Preset 6)

- id: request_preset
  label: Request Current Preset
  kind: query
  command: "1C {area} 00 63 00 00 FF {checksum}"
  params:
    - name: area
      type: integer
    - name: checksum
      type: integer
  # source example: 1C 04 00 63 00 00 FF 7E

# --- Program / Save / Restore (0x08, 0x09, 0x66, 0x67) ---
- id: program_current_preset
  label: Program Current Preset (save current channel levels)
  kind: action
  command: "1C {area} 00 08 00 00 FF {checksum}"
  params:
    - name: area
      type: integer
    - name: checksum
      type: integer
  # source example: 1C 04 00 08 00 00 FF D9

- id: program_defined_preset
  label: Program Defined Preset
  kind: action
  command: "1C {area} {preset} 09 00 00 FF {checksum}"
  params:
    - name: area
      type: integer
    - name: preset
      type: integer
      description: Preset (0 origin)
    - name: checksum
      type: integer
  # source example: 1C 04 00 09 00 00 FF D8

- id: save_current_preset
  label: Save Current Preset (number)
  kind: action
  command: "1C {area} 00 66 00 00 FF {checksum}"
  params:
    - name: area
      type: integer
    - name: checksum
      type: integer
  # source example: 1C 01 00 66 00 00 FF 7E

- id: restore_saved_preset
  label: Restore Saved Preset
  kind: action
  command: "1C {area} {fade_lo} 67 {fade_hi} 00 FF {checksum}"
  params:
    - name: area
      type: integer
    - name: fade_lo
      type: integer
      description: 16-bit fade time low byte (20 ms steps)
    - name: fade_hi
      type: integer
      description: 16-bit fade time high byte
    - name: checksum
      type: integer
  # source example: 1C 01 FA 67 00 00 FF 83

# --- Panic (0x17, 0x18) ---
- id: panic_lock
  label: Panic (lock panels, select panic preset)
  kind: action
  command: "1C {area} 00 17 00 00 FF {checksum}"
  params:
    - name: area
      type: integer
    - name: checksum
      type: integer
  # source example: 1C 02 F0 17 00 00 FF DC

- id: panic_unlock
  label: Un-Panic (restore normal, unlock panels)
  kind: action
  command: "1C {area} 00 18 00 00 FF {checksum}"
  params:
    - name: area
      type: integer
    - name: checksum
      type: integer
  # source example: 1C 02 F0 18 00 00 FF DB

# --- DMX (0x10) ---
- id: set_dmx_mode
  label: Set DMX Mode
  kind: action
  command: "1C {area} {mode} 10 00 00 FF {checksum}"
  params:
    - name: area
      type: integer
    - name: mode
      type: integer
      description: 00=DMX if Present, 01=Local Override, 02=HTP, 03=DyNet
    - name: checksum
      type: integer
  # source example: 1C 01 03 10 00 00 FF D1

# --- Disable/Enable Control Panels (0x15, 0x16) ---
- id: disable_control_panels
  label: Disable Control Panels
  kind: action
  command: "1C {area} 00 15 00 00 FF {checksum}"
  params:
    - name: area
      type: integer
    - name: checksum
      type: integer
  # source example: 1C 06 00 15 00 00 FF CA

- id: enable_control_panels
  label: Enable Control Panels
  kind: action
  command: "1C {area} 00 16 00 00 FF {checksum}"
  params:
    - name: area
      type: integer
    - name: checksum
      type: integer
  # source example: 1C 06 00 16 00 00 FF C9

# --- Light Level Compensation (0x11, 0x1A, 0x1B) ---
- id: llc_suspend_resume_all
  label: Suspend/Resume Light Level Compensation (all presets)
  kind: action
  command: "1C {area} {channel} 11 00 {mode} FF {checksum}"
  params:
    - name: area
      type: integer
    - name: channel
      type: integer
      description: Channel (0 origin; FF = all channels in area)
    - name: mode
      type: integer
      description: 0=Suspend, 1=Resume
    - name: checksum
      type: integer
  # source example: 1C 02 FF 11 00 01 FF D2

- id: llc_suspend_current_preset
  label: Suspend Light Level Compensation (current preset)
  kind: action
  command: "1C {area} {channel} 1A 00 00 FF {checksum}"
  params:
    - name: area
      type: integer
    - name: channel
      type: integer
    - name: checksum
      type: integer
  # source example: 1C 02 FF 1A 00 00 FF CA

- id: llc_resume_current_preset
  label: Resume Light Level Compensation (current preset)
  kind: action
  command: "1C {area} {channel} 1B 00 00 FF {checksum}"
  params:
    - name: area
      type: integer
    - name: channel
      type: integer
    - name: checksum
      type: integer
  # source example: 1C 02 FF 1B 00 00 FF C9

# --- Occupancy Detection (0x31, 0x3A, 0x3B) ---
- id: occupancy_suspend_resume_all
  label: Suspend/Resume Occupancy Detection (all presets)
  kind: action
  command: "1C {area} {channel} 31 00 {mode} FF {checksum}"
  params:
    - name: area
      type: integer
    - name: channel
      type: integer
      description: Channel (0 origin; FF = all channels in area)
    - name: mode
      type: integer
      description: 0=Suspend, 1=Resume
    - name: checksum
      type: integer
  # source example: 1C 01 FF 31 00 01 FF B3

- id: occupancy_disable_current_preset
  label: Disable Occupancy Detection (current preset)
  kind: action
  command: "1C {area} {channel} 3A 00 00 FF {checksum}"
  params:
    - name: area
      type: integer
    - name: channel
      type: integer
    - name: checksum
      type: integer
  # source example: 1C 01 FF 3A 00 00 FF AB

- id: occupancy_enable_current_preset
  label: Enable Occupancy Detection (current preset)
  kind: action
  command: "1C {area} {channel} 3B 00 00 FF {checksum}"
  params:
    - name: area
      type: integer
    - name: channel
      type: integer
    - name: checksum
      type: integer
  # source example: 1C 01 FF 3B 00 00 FF AA

# --- User Preferences (0x48, 0x49, 0x4A) ---
- id: set_user_preference
  label: Set User Preference
  kind: action
  command: "1C {area} {preference} 48 {data_hi} {data_lo} FF {checksum}"
  params:
    - name: area
      type: integer
    - name: preference
      type: integer
      description: "0x01 Indicator LED Brightness, 0x02 Backlight LED Brightness, 0x03 Display Brightness, 0x04 Display Contrast, 0x05 Sounder Volume, 0x07 User Temperature setpoint (0.25°C steps), 0x0A Closed-loop light setpoint (LUX), 0x0B No Motion Timeout, 0x0C Actual Temperature, 0x0D Setpoint Temperature"
    - name: data_hi
      type: integer
    - name: data_lo
      type: integer
      description: For brightness/volume preferences, Data Lo = 8-bit fade time in 20 ms increments
    - name: checksum
      type: integer
  # source example: 1C 01 01 48 82 32 FF E7 (LED 50%, fade 1s)

- id: request_user_preference
  label: Request User Preference
  kind: query
  command: "1C {area} {preference} 49 00 00 FF {checksum}"
  params:
    - name: area
      type: integer
    - name: preference
      type: integer
      description: Same preference table as set_user_preference
    - name: checksum
      type: integer
  # source example: 1C 01 06 49 00 00 FF 95 (Request Actual Temperature)

- id: report_user_preference
  label: Report User Preference
  kind: feedback
  command: "1C {area} {preference} 4A {data_hi} {data_lo} FF {checksum}"
  params:
    - name: area
      type: integer
    - name: preference
      type: integer
      description: Preference value reported
    - name: data_hi
      type: integer
    - name: data_lo
      type: integer
    - name: checksum
      type: integer
  # source example: 1C 01 06 4A 00 58 FF 3C (Actual temp 22C)

# --- Join (0x14, 0x40) ---
- id: set_join_level
  label: Set Join Level
  kind: action
  command: "1C {area} {join_level} 14 00 00 {join} {checksum}"
  params:
    - name: area
      type: integer
    - name: join_level
      type: integer
    - name: join
      type: integer
      description: Target join identifier
    - name: checksum
      type: integer
  # source example: 1C 01 06 14 00 00 FF CA (Area 1, Join Level 6)

- id: set_rmask
  label: Set RMask
  kind: action
  command: "1C {area} {rmask} 40 00 00 {join} {checksum}"
  params:
    - name: area
      type: integer
    - name: rmask
      type: integer
    - name: join
      type: integer
    - name: checksum
      type: integer
  # source example: 1C 01 03 40 00 00 FF A1

# --- Area Linking (0x20, 0x21) ---
- id: set_area_links
  label: Set Area Links
  kind: action
  command: "1C {area} {link_b1to8} 20 {link_b9to16} {link_b17to24} FF {checksum}"
  params:
    - name: area
      type: integer
      description: Base Link Area (BLA) acts as Area 0 for channels that have it defined
    - name: link_b1to8
      type: integer
      description: Bit 7=area 1, bit 0=area 8 (relative to BLA)
    - name: link_b9to16
      type: integer
      description: Bit 7=area 9, bit 0=area 16
    - name: link_b17to24
      type: integer
      description: Bit 7=area 17, bit 0=area 24
    - name: checksum
      type: integer
  # source example: 1C 04 80 20 00 00 FF 41 (Link Areas 4 & 5, Base Area = 3)

- id: clear_area_links
  label: Clear Area Links
  kind: action
  command: "1C {area} {unlink_b1to8} 21 {unlink_b9to16} {unlink_b17to24} FF {checksum}"
  params:
    - name: area
      type: integer
    - name: unlink_b1to8
      type: integer
    - name: unlink_b9to16
      type: integer
    - name: unlink_b17to24
      type: integer
    - name: checksum
      type: integer
  # source example: 1C 04 80 21 00 00 FF 40
```

## Feedbacks
```yaml
- id: channel_level
  type: object
  description: Reply to Request Channel Level (opcode 0x61). Reply opcode 0x60.
  fields:
    target_level: "01=100%, FF=0%"
    current_level: "01=100%, FF=0%"
- id: current_preset
  type: integer
  description: Reply to Request Preset (opcode 0x63). Reply opcode 0x62.
  values: "0-origin preset index"
- id: user_preference
  type: object
  description: Reply to Request User Preference (opcode 0x49). Reply opcode 0x4A.
  fields:
    preference: "0x01 LED, 0x02 Backlight, 0x03 Display Brightness, 0x04 Contrast, 0x05 Sounder, 0x06 Actual Temp (0.25°C), 0x07 Setpoint (0.25°C), 0x08 Display Brightness Scaled, 0x09 AC Plant Cap, 0x0A Closed-loop LUX setpoint, 0x0B No Motion Timeout, 0x0C Actual Temp fixed-point °C, 0x0D Setpoint fixed-point °C"
    data_hi: "see preference table"
    data_lo: "see preference table"
```

## Variables
```yaml
- id: indicator_led_brightness
  type: percent
  description: "0x01 preference; Data Hi (01=100%, FF=0%); Data Lo = fade time 20 ms steps"
- id: backlight_brightness
  type: percent
  description: "0x02 preference"
- id: display_brightness
  type: percent
  description: "0x03 preference"
- id: display_contrast
  type: percent
  description: "0x04 preference"
- id: sounder_volume
  type: percent
  description: "0x05 preference"
- id: actual_temperature
  type: number
  unit: degC
  description: "0x06 preference: 16-bit two's complement in 0.25°C steps; or 0x0C: signed fixed-point °C (-127.99 to 127.99), MSB of Data Hi = sign bit"
- id: user_temperature_setpoint
  type: number
  unit: degC
  description: "0x07 preference (0.25°C steps) or 0x0D (signed fixed-point °C)"
- id: closed_loop_light_setpoint
  type: integer
  unit: lux
  description: "0x0A preference; 0x0000-0xFFFF raw lux"
- id: no_motion_timeout
  type: integer
  unit: seconds
  description: "0x0B preference; 0x0001-0xFFFE = timeout seconds; 0x0000 or 0xFFFF = revert to configured"
- id: ac_plant_capability
  type: object
  description: "0x09 preference; Bit-0 hot water, Bit-1 cold water availability"
- id: channel_level
  type: percent
  description: Per-channel current/target level, encoded with 01=100%, FF=0%
- id: current_preset
  type: integer
  description: 0-origin preset number currently active in area
```

## Events
```yaml
- id: report_channel_level
  description: Unsolicited 0x60 reply from dimmer carrying target and current level. 1C {area} {channel} 60 {target} {current} FF {chk}
- id: report_preset
  description: Unsolicited 0x62 reply announcing current preset. 1C {area} {preset} 62 00 00 FF {chk}
- id: report_user_preference
  description: Unsolicited 0x4A reply announcing a preference value. 1C {area} {pref} 4A {hi} {lo} FF {chk}
```

## Macros
```yaml
# Source documents a "Panic / Un-Panic" pair but no other multi-step sequences.
# UNRESOLVED: no additional named multi-step sequences in source.
```

## Safety
```yaml
confirmation_required_for:
  - panic_lock        # source: "Locks panels & selects panic preset"
  - panic_unlock      # source: "Unlocks panels & restores previous preset"
interlocks:
  - description: "Panic mode (0x17) locks all control panels in the area; Un-Panic (0x18) restores prior state. Source documents no other interlocks."
# UNRESOLVED: no electrical safety, fault-recovery, or sequencing guidance in source.
```

## Notes
- **Protocol actually is RS-485/DyNet, not RS-232.** User-supplied "Known protocol: RS-232C" does not match what the source describes. The DUS30CS is a bus device on the Dynalite DyNet proprietary RS-485 bus; third-party integration typically routes through a Dynalite gateway (e.g. DDNG232) that maps RS-232/IP -> DyNet. The DyNet logical message framing is documented here verbatim.
- **Two message layers in the source.** "Logical Message" uses sync byte `1C` + Area; "Physical Message" uses sync byte `5C` + Device code + Box number. The opcode set in this spec is the Logical Message set (Area-addressed); Physical opcodes for box-addressed commissioning are not enumerated in this source.
- **Checksum rule** is universal: byte 7 = negative 8-bit 2's complement of sum of bytes 1-6. All opcodes share the same frame.
- **Timing** (source): inter-byte idle < 1 ms; inter-packet delay > 10 ms. No flow control parameters stated beyond none/parity.
- **User Preference opcodes** are particularly relevant to the DUS30CS: 0x06/0x07/0x0C/0x0D carry temperature readings; 0x0A carries the closed-loop light setpoint; 0x0B carries the no-motion timeout for the Universal Motion sensor.
- **No documented command carries firmware-version, mains-voltage, or current/power info** — none has been assumed.

<!-- UNRESOLVED: DUS30CS-specific commissioning / addressing message (Box number assignment via 5C Physical sync), diagnostics, or device-class identification opcodes are NOT in this source. Only the Logical Message opcode catalogue is covered. -->
```

---

Spec output complete. Notes for operator:

- Source is DyNet opcode reference, not a DUS30CS-specific manual. Protocol is **RS-485 @ 9600 bps**, not RS-232 — user-supplied hint inaccurate.
- All 22 distinct DyNet opcodes from the source enumerated as actions: presets (4), ramp/fade (11 variants), report/request (4), program/save/restore (4), panic (2), DMX mode, panel lock/unlock, light-level compensation (3), occupancy (3), user preferences (3), joins (2), area linking (2).
- Each command carries the literal hex payload from the source (parameterized where the opcode has variable fields), with the verbatim source example shown as a per-action comment.
- Tier-3 fields marked UNRESOLVED: firmware range, mains voltages, fault recovery, flow-control specifics beyond `none`.

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
retrieved_at: 2026-06-30T06:31:37.074Z
last_checked_at: 2026-06-30T07:00:16.746Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-30T07:00:16.746Z
matched_actions: 42
action_count: 42
confidence: medium
summary: "All 42 spec actions match opcodes in source; transport parameters verified; 100% coverage. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "DUS30CS exposes no native RS-232/TCP/IP control port. Transport is DyNet over RS-485, addressed via a Dynalite gateway (e.g. DDNG232) for third-party integration. Source document is the DyNet opcode reference, not a device-specific protocol manual."
- "flow control not stated in source"
- "no input-switching commands present in this source"
- "no additional named multi-step sequences in source."
- "no electrical safety, fault-recovery, or sequencing guidance in source."
- "DUS30CS-specific commissioning / addressing message (Box number assignment via 5C Physical sync), diagnostics, or device-class identification opcodes are NOT in this source. Only the Logical Message opcode catalogue is covered."
- "firmware range, mains voltages, fault recovery, flow-control specifics beyond `none`."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
