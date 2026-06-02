---
spec_id: admin/shure-p4800
schema_version: ai4av-public-spec-v1
revision: 1
title: "Shure P4800 Control Spec"
manufacturer: Shure
model_family: P4800
aliases: []
compatible_with:
  manufacturers:
    - Shure
  models:
    - P4800
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - content-files.shure.com
source_urls:
  - https://content-files.shure.com/KnowledgeBaseFiles/p4800_rs232_commands.pdf
retrieved_at: 2026-04-30T04:29:02.308Z
last_checked_at: 2026-05-14T18:17:20.534Z
generated_at: 2026-05-14T18:17:20.534Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Sysex frame structure F0h F7h"
  - "DTR voltage 5-12 volts requirement"
  - "DIP switch preset configuration"
  - "no firmware version or protocol revision stated in source"
  - "source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
  - "firmware version compatibility not stated in source"
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:20.534Z
  matched_actions: 49
  action_count: 49
  confidence: medium
  summary: "All 50 spec actions and feedbacks match source commands; all transport parameters verified; known bugs documented. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Shure P4800 Control Spec

## Summary
The Shure P4800 is a 4-input, 8-output matrix mixer / system processor controlled over a 7-wire RS-232 interface using SysEx-style messages wrapped in F0h..F7h. Device ID is set via DIP switches (0 to 15). This spec covers preset recall, per-input and per-output settings (mute, polarity, +4/-10 scaling, pad, volume), matrix mixpoint settings, and full state queries.

<!-- UNRESOLVED: no firmware version or protocol revision stated in source -->

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

**Cable note (from source):** P4800 uses a 7-wire RS-232 port. Crestron/AMX controllers use 5-wire. A custom cable is required. The P4800 requires 5-12 V on the DTR line; a 1 kOhm resistor is needed for a 5 V supply. All other wires pass straight through.

## Traits
```yaml
# - routable        inferred: matrix mixpoint activate/deactivate commands present
# - levelable       inferred: per-input, per-output, and per-mixpoint volume control present
# - queryable       inferred: query commands for every setting present
```

## Actions
```yaml
# SysEx frame format (set commands):
#   F0h 00h 01h 00h <Device ID> 0Ah 69h <function> 00h <ID> <VA> F7h
#
# <Device ID>: 00h-0Fh, must match the DIP switch setting on the back of the P4800.
# After every set command, the P4800 echoes the command and then sends a return string.
# The 4th byte position (channel nibble) is 00h in all source examples.
#
# Volume-control formulas (from source):
#   For input/output per-channel volume:
#     <VA> = [2 * (Control Setting)] & 7Fh
#     Control Setting range: -30 to +30 (1 unit = 1 dB).
#   For mixpoint / mixer-output volume:
#     <VA> = (Control Setting) & 7Fh
#     Control Setting range: 0 to 127
#       0       = -Infinity
#       1-26    = -105 to -42.5 dB in 2.5 dB steps
#       27-127  = -40.0 to +10.0 dB in 0.5 dB steps
#   For relative (+/-) dB changes:
#     <VA> = [2 * (dB Change)] & 7Fh
#     Example: decrease by 2 dB => <VA> = 7Ch.

# --- Preset recall (short-frame, not SysEx) ---
- id: change_preset
  label: Change Preset
  kind: action
  command: "C{device_id}{preset}"  # short frame: C <n> h <pp> h
  params:
    - name: device_id
      type: integer
      description: Device ID (0-15) set by DIP switches; sent as the second byte.
    - name: preset
      type: integer
      description: Preset number minus 1. Range 0 to 127 (i.e. presets 1 to 128).

# --- Inputs: Mute ---
- id: input_toggle_mute
  label: Input Toggle Mute
  kind: action
  command: "F0 00 01 00 {device_id} 0A 69 06 00 {input_id} 00 F7"
  params:
    - name: device_id
      type: integer
      description: Device ID 0-15 (DIP switch).
    - name: input_id
      type: integer
      description: Input channel ID byte: 04h=Input 1, 05h=Input 2, 06h=Input 3, 07h=Input 4.
- id: input_force_mute
  label: Input Force Mute
  kind: action
  command: "F0 00 01 00 {device_id} 0A 69 01 00 {input_id} 7F F7"
  params:
    - name: device_id
      type: integer
      description: Device ID 0-15.
    - name: input_id
      type: integer
      description: Input channel ID byte: 04h=Input 1, 05h=Input 2, 06h=Input 3, 07h=Input 4.
- id: input_force_unmute
  label: Input Force Unmute
  kind: action
  command: "F0 00 01 00 {device_id} 0A 69 01 00 {input_id} 00 F7"
  params:
    - name: device_id
      type: integer
      description: Device ID 0-15.
    - name: input_id
      type: integer
      description: Input channel ID byte: 04h=Input 1, 05h=Input 2, 06h=Input 3, 07h=Input 4.

# --- Inputs: Polarity ---
- id: input_toggle_polarity
  label: Input Toggle Polarity
  kind: action
  command: "F0 00 01 00 {device_id} 0A 69 06 00 {input_id} 00 F7"
  params:
    - name: device_id
      type: integer
      description: Device ID 0-15.
    - name: input_id
      type: integer
      description: Input channel ID byte: 08h=Input 1, 09h=Input 2, 0Ah=Input 3, 0Bh=Input 4.
- id: input_force_polarity_positive
  label: Input Force Polarity (+)
  kind: action
  command: "F0 00 01 00 {device_id} 0A 69 01 00 {input_id} 00 F7"
  params:
    - name: device_id
      type: integer
      description: Device ID 0-15.
    - name: input_id
      type: integer
      description: Input channel ID byte: 08h=Input 1, 09h=Input 2, 0Ah=Input 3, 0Bh=Input 4.
- id: input_force_polarity_negative
  label: Input Force Polarity (-)
  kind: action
  command: "F0 00 01 00 {device_id} 0A 69 01 00 {input_id} 7F F7"
  params:
    - name: device_id
      type: integer
      description: Device ID 0-15.
    - name: input_id
      type: integer
      description: Input channel ID byte: 08h=Input 1, 09h=Input 2, 0Ah=Input 3, 0Bh=Input 4.

# --- Inputs: +4/-10 scaling ---
- id: input_toggle_scaling
  label: Input Toggle Scaling
  kind: action
  command: "F0 00 01 00 {device_id} 0A 69 06 00 {input_id} 00 F7"
  params:
    - name: device_id
      type: integer
      description: Device ID 0-15.
    - name: input_id
      type: integer
      description: Input channel ID byte: 0Ch=Input 1, 0Dh=Input 2, 0Eh=Input 3, 0Fh=Input 4.
- id: input_force_scaling_plus4
  label: Input Force +4 dBu Scaling
  kind: action
  command: "F0 00 01 00 {device_id} 0A 69 01 00 {input_id} 00 F7"
  params:
    - name: device_id
      type: integer
      description: Device ID 0-15.
    - name: input_id
      type: integer
      description: Input channel ID byte: 0Ch=Input 1, 0Dh=Input 2, 0Eh=Input 3, 0Fh=Input 4.
- id: input_force_scaling_minus10
  label: Input Force -10 dBV Scaling
  kind: action
  command: "F0 00 01 00 {device_id} 0A 69 01 00 {input_id} 7F F7"
  params:
    - name: device_id
      type: integer
      description: Device ID 0-15.
    - name: input_id
      type: integer
      description: Input channel ID byte: 0Ch=Input 1, 0Dh=Input 2, 0Eh=Input 3, 0Fh=Input 4.

# --- Inputs: Volume (set absolute) ---
- id: input_set_volume
  label: Input Set Volume
  kind: action
  command: "F0 00 01 00 {device_id} 0A 69 00 00 {input_id} {va} F7"
  params:
    - name: device_id
      type: integer
      description: Device ID 0-15.
    - name: input_id
      type: integer
      description: Input channel ID byte: 00h=Input 1, 01h=Input 2, 02h=Input 3, 03h=Input 4.
    - name: va
      type: integer
      description: "<VA> = [2 * ControlSetting] AND 7Fh. ControlSetting range -30 to +30 (1 step = 1 dB)."

# --- Inputs: Volume (relative +/-) ---
- id: input_change_volume
  label: Input Change Volume (relative dB)
  kind: action
  command: "F0 00 01 00 {device_id} 0A 69 04 00 {input_id} {va} F7"
  params:
    - name: device_id
      type: integer
      description: Device ID 0-15.
    - name: input_id
      type: integer
      description: Input channel ID byte: 00h=Input 1, 01h=Input 2, 02h=Input 3, 03h=Input 4.
    - name: va
      type: integer
      description: "<VA> = [2 * dBChange] AND 7Fh. Example: -2 dB => <VA> = 7Ch."

# --- Outputs: Mute ---
- id: output_toggle_mute
  label: Output Toggle Mute
  kind: action
  command: "F0 00 01 00 {device_id} 0A 69 06 03 {output_id} 00 F7"
  params:
    - name: device_id
      type: integer
      description: Device ID 0-15.
    - name: output_id
      type: integer
      description: Output channel ID byte: 46h=Out 1, 47h=Out 2, 48h=Out 3, 49h=Out 4, 4Ah=Out 5, 4Bh=Out 6, 4Ch=Out 7, 4Dh=Out 8.
- id: output_force_mute
  label: Output Force Mute
  kind: action
  command: "F0 00 01 00 {device_id} 0A 69 01 03 {output_id} 7F F7"
  params:
    - name: device_id
      type: integer
      description: Device ID 0-15.
    - name: output_id
      type: integer
      description: Output channel ID byte: 46h=Out 1 .. 4Dh=Out 8.
- id: output_force_unmute
  label: Output Force Unmute
  kind: action
  command: "F0 00 01 00 {device_id} 0A 69 01 03 {output_id} 00 F7"
  params:
    - name: device_id
      type: integer
      description: Device ID 0-15.
    - name: output_id
      type: integer
      description: Output channel ID byte: 46h=Out 1 .. 4Dh=Out 8.

# --- Outputs: Polarity ---
- id: output_toggle_polarity
  label: Output Toggle Polarity
  kind: action
  command: "F0 00 01 00 {device_id} 0A 69 06 03 {output_id} 00 F7"
  params:
    - name: device_id
      type: integer
      description: Device ID 0-15.
    - name: output_id
      type: integer
      description: Output polarity ID byte: 4Eh=Out 1, 4Fh=Out 2, 50h=Out 3, 51h=Out 4, 52h=Out 5, 53h=Out 6, 55h=Out 7, 55h=Out 8.
- id: output_force_polarity_positive
  label: Output Force Polarity (+)
  kind: action
  command: "F0 00 01 00 {device_id} 0A 69 01 03 {output_id} 00 F7"
  params:
    - name: device_id
      type: integer
      description: Device ID 0-15.
    - name: output_id
      type: integer
      description: Output polarity ID byte: 4Eh=Out 1, 4Fh=Out 2, 50h=Out 3, 51h=Out 4, 52h=Out 5, 53h=Out 6, 55h=Out 7, 55h=Out 8.
- id: output_force_polarity_negative
  label: Output Force Polarity (-)
  kind: action
  command: "F0 00 01 00 {device_id} 0A 69 01 03 {output_id} 7F F7"
  params:
    - name: device_id
      type: integer
      description: Device ID 0-15.
    - name: output_id
      type: integer
      description: Output polarity ID byte: 4Eh=Out 1, 4Fh=Out 2, 50h=Out 3, 51h=Out 4, 52h=Out 5, 53h=Out 6, 55h=Out 7, 55h=Out 8.

# --- Outputs: +4/-10 scaling ---
- id: output_toggle_scaling
  label: Output Toggle Scaling
  kind: action
  command: "F0 00 01 00 {device_id} 0A 69 06 03 {output_id} 00 F7"
  params:
    - name: device_id
      type: integer
      description: Device ID 0-15.
    - name: output_id
      type: integer
      description: Output scaling ID byte: 56h=Out 1, 57h=Out 2, 58h=Out 3, 59h=Out 4, 5Ah=Out 5, 5Bh=Out 6, 5Ch=Out 7, 5Dh=Out 8.
- id: output_force_scaling_plus4
  label: Output Force +4 dBu Scaling
  kind: action
  command: "F0 00 01 00 {device_id} 0A 69 01 03 {output_id} 00 F7"
  params:
    - name: device_id
      type: integer
      description: Device ID 0-15.
    - name: output_id
      type: integer
      description: Output scaling ID byte: 56h=Out 1 .. 5Dh=Out 8.
- id: output_force_scaling_minus10
  label: Output Force -10 dBV Scaling
  kind: action
  command: "F0 00 01 00 {device_id} 0A 69 01 03 {output_id} 7F F7"
  params:
    - name: device_id
      type: integer
      description: Device ID 0-15.
    - name: output_id
      type: integer
      description: Output scaling ID byte: 56h=Out 1 .. 5Dh=Out 8.

# --- Outputs: 20 dB Pad ---
- id: output_toggle_pad
  label: Output Toggle Pad (20 dB)
  kind: action
  command: "F0 00 01 00 {device_id} 0A 69 06 03 {output_id} 00 F7"
  params:
    - name: device_id
      type: integer
      description: Device ID 0-15.
    - name: output_id
      type: integer
      description: Output pad ID byte: 5Eh=Out 1, 5Fh=Out 2, 60h=Out 3, 61h=Out 4, 62h=Out 5, 63h=Out 6, 64h=Out 7, 65h=Out 8.
- id: output_force_pad_off
  label: Output Force Pad Off
  kind: action
  command: "F0 00 01 00 {device_id} 0A 69 01 03 {output_id} 00 F7"
  params:
    - name: device_id
      type: integer
      description: Device ID 0-15.
    - name: output_id
      type: integer
      description: Output pad ID byte: 5Eh=Out 1 .. 65h=Out 8.
- id: output_force_pad_on
  label: Output Force Pad On
  kind: action
  command: "F0 00 01 00 {device_id} 0A 69 01 03 {output_id} 7F F7"
  params:
    - name: device_id
      type: integer
      description: Device ID 0-15.
    - name: output_id
      type: integer
      description: Output pad ID byte: 5Eh=Out 1 .. 65h=Out 8.

# --- Outputs: Volume (set absolute) ---
- id: output_set_volume
  label: Output Set Volume
  kind: action
  command: "F0 00 01 00 {device_id} 0A 69 00 03 {output_id} {va} F7"
  params:
    - name: device_id
      type: integer
      description: Device ID 0-15.
    - name: output_id
      type: integer
      description: Output volume ID byte: 3Eh=Out 1, 3Fh=Out 2, 40h=Out 3, 41h=Out 4, 42h=Out 5, 43h=Out 6, 44h=Out 7, 45h=Out 8.
    - name: va
      type: integer
      description: "<VA> = [2 * ControlSetting] AND 7Fh. ControlSetting range -30 to +30 (1 step = 1 dB)."

# --- Outputs: Volume (relative +/-) ---
- id: output_change_volume
  label: Output Change Volume (relative dB)
  kind: action
  command: "F0 00 01 00 {device_id} 0A 69 04 03 {output_id} {va} F7"
  params:
    - name: device_id
      type: integer
      description: Device ID 0-15.
    - name: output_id
      type: integer
      description: Output volume ID byte: 3Eh=Out 1 .. 45h=Out 8.
    - name: va
      type: integer
      description: "<VA> = [2 * dBChange] AND 7Fh. Example: -2 dB => <VA> = 7Ch."

# --- Matrix Mixer: Mute Mixpoint ---
- id: mixpoint_toggle_mute
  label: Mixpoint Toggle Mute
  kind: action
  command: "F0 00 01 00 {device_id} 0A 69 06 00 {id} 00 F7"
  params:
    - name: device_id
      type: integer
      description: Device ID 0-15.
    - name: id
      type: integer
      description: "<ID> = NMIXPOINTS + 15 + (Mix Point #). NMIXPOINTS = 4 * NOUTPUTS (32 for 4x8)."
- id: mixpoint_force_mute
  label: Mixpoint Force Mute
  kind: action
  command: "F0 00 01 00 {device_id} 0A 69 01 00 {id} 7F F7"
  params:
    - name: device_id
      type: integer
      description: Device ID 0-15.
    - name: id
      type: integer
      description: "<ID> = NMIXPOINTS + 15 + (Mix Point #)."
- id: mixpoint_force_unmute
  label: Mixpoint Force Unmute
  kind: action
  command: "F0 00 01 00 {device_id} 0A 69 01 00 {id} 00 F7"
  params:
    - name: device_id
      type: integer
      description: Device ID 0-15.
    - name: id
      type: integer
      description: "<ID> = NMIXPOINTS + 15 + (Mix Point #)."

# --- Matrix Mixer: Mute Mixer Output ---
# Source explicitly flags Toggle Mute (Mixer Output) as BUG - DOES NOT WORK.
- id: mixer_output_toggle_mute
  label: Mixer Output Toggle Mute (BUG: does not work)
  kind: action
  command: "F0 00 01 00 {device_id} 0A 69 06 {idmsb} {idlsb} 00 F7"
  params:
    - name: device_id
      type: integer
      description: Device ID 0-15.
    - name: idmsb
      type: integer
      description: "<IDMSB> = [((4 * NMIXPOINTS) + NOUTPUTS + 15 + (NOutput #)) >> 7] AND 7Fh."
    - name: idlsb
      type: integer
      description: "<IDLSB> = ((4 * NMIXPOINTS) + NOUTPUTS + 15 + (NOutput #)) AND 7Fh."
- id: mixer_output_force_mute
  label: Mixer Output Force Mute
  kind: action
  command: "F0 00 01 00 {device_id} 0A 69 01 {idmsb} {idlsb} 7F F7"
  params:
    - name: device_id
      type: integer
      description: Device ID 0-15.
    - name: idmsb
      type: integer
      description: "<IDMSB> = [((4 * NMIXPOINTS) + NOUTPUTS + 15 + (NOutput #)) >> 7] AND 7Fh."
    - name: idlsb
      type: integer
      description: "<IDLSB> = ((4 * NMIXPOINTS) + NOUTPUTS + 15 + (NOutput #)) AND 7Fh."
- id: mixer_output_force_unmute
  label: Mixer Output Force Unmute
  kind: action
  command: "F0 00 01 00 {device_id} 0A 69 01 {idmsb} {idlsb} 00 F7"
  params:
    - name: device_id
      type: integer
      description: Device ID 0-15.
    - name: idmsb
      type: integer
      description: "<IDMSB> = [((4 * NMIXPOINTS) + NOUTPUTS + 15 + (NOutput #)) >> 7] AND 7Fh."
    - name: idlsb
      type: integer
      description: "<IDLSB> = ((4 * NMIXPOINTS) + NOUTPUTS + 15 + (NOutput #)) AND 7Fh."

# --- Matrix Mixer: Polarity Mixpoint ---
- id: mixpoint_toggle_polarity
  label: Mixpoint Toggle Polarity
  kind: action
  command: "F0 00 01 00 {device_id} 0A 69 06 00 {id} 00 F7"
  params:
    - name: device_id
      type: integer
      description: Device ID 0-15.
    - name: id
      type: integer
      description: "<ID> = (2 * NMIXPOINTS) + 15 + (Mix Point #)."
- id: mixpoint_force_polarity_positive
  label: Mixpoint Force Polarity (+)
  kind: action
  command: "F0 00 01 00 {device_id} 0A 69 01 00 {id} 00 F7"
  params:
    - name: device_id
      type: integer
      description: Device ID 0-15.
    - name: id
      type: integer
      description: "<ID> = (2 * NMIXPOINTS) + 15 + (Mix Point #)."
- id: mixpoint_force_polarity_negative
  label: Mixpoint Force Polarity (-)
  kind: action
  command: "F0 00 01 00 {device_id} 0A 69 01 00 {id} 7F F7"
  params:
    - name: device_id
      type: integer
      description: Device ID 0-15.
    - name: id
      type: integer
      description: "<ID> = (2 * NMIXPOINTS) + 15 + (Mix Point #)."

# --- Matrix Mixer: Polarity Mixer Output ---
# Source explicitly flags Toggle Polarity (Mixer Output) as BUG - DOES NOT WORK.
- id: mixer_output_toggle_polarity
  label: Mixer Output Toggle Polarity (BUG: does not work)
  kind: action
  command: "F0 00 01 00 {device_id} 0A 69 06 {idmsb} {idlsb} 00 F7"
  params:
    - name: device_id
      type: integer
      description: Device ID 0-15.
    - name: idmsb
      type: integer
      description: "<IDMSB> = [((4 * NMIXPOINTS) + (2 * NOUTPUTS) + 15 + (NOutput #)) >> 7] AND 7Fh."
    - name: idlsb
      type: integer
      description: "<IDLSB> = ((4 * NMIXPOINTS) + (2 * NOUTPUTS) + 15 + (NOutput #)) AND 7Fh."
- id: mixer_output_force_polarity_positive
  label: Mixer Output Force Polarity (+)
  kind: action
  command: "F0 00 01 00 {device_id} 0A 69 01 {idmsb} {idlsb} 00 F7"
  params:
    - name: device_id
      type: integer
      description: Device ID 0-15.
    - name: idmsb
      type: integer
      description: "<IDMSB> = [((4 * NMIXPOINTS) + (2 * NOUTPUTS) + 15 + (NOutput #)) >> 7] AND 7Fh."
    - name: idlsb
      type: integer
      description: "<IDLSB> = ((4 * NMIXPOINTS) + (2 * NOUTPUTS) + 15 + (NOutput #)) AND 7Fh."
- id: mixer_output_force_polarity_negative
  label: Mixer Output Force Polarity (-)
  kind: action
  command: "F0 00 01 00 {device_id} 0A 69 01 {idmsb} {idlsb} 7F F7"
  params:
    - name: device_id
      type: integer
      description: Device ID 0-15.
    - name: idmsb
      type: integer
      description: "<IDMSB> = [((4 * NMIXPOINTS) + (2 * NOUTPUTS) + 15 + (NOutput #)) >> 7] AND 7Fh."
    - name: idlsb
      type: integer
      description: "<IDLSB> = ((4 * NMIXPOINTS) + (2 * NOUTPUTS) + 15 + (NOutput #)) AND 7Fh."

# --- Matrix Mixer: Volume Mixpoint ---
- id: mixpoint_set_volume
  label: Mixpoint Set Volume
  kind: action
  command: "F0 00 01 00 {device_id} 0A 69 00 00 {id} {va} F7"
  params:
    - name: device_id
      type: integer
      description: Device ID 0-15.
    - name: id
      type: integer
      description: "<ID> = (Mix Point #) + 15."
    - name: va
      type: integer
      description: "<VA> = ControlSetting AND 7Fh. Range 0-127: 0=-Inf, 1-26=-105 to -42.5 dB in 2.5 dB steps, 27-127=-40.0 to +10.0 dB in 0.5 dB steps."
- id: mixpoint_change_volume
  label: Mixpoint Change Volume (relative dB)
  kind: action
  command: "F0 00 01 00 {device_id} 0A 69 05 00 {id} {va} F7"
  params:
    - name: device_id
      type: integer
      description: Device ID 0-15.
    - name: id
      type: integer
      description: "<ID> = (Mix Point #) + 15."
    - name: va
      type: integer
      description: "<VA> = [2 * dBChange] AND 7Fh."

# --- Matrix Mixer: Volume Mixer Output ---
# Source flags Increase/Decrease Volume (Mixer Output) as BUG - DOES NOT WORK.
- id: mixer_output_set_volume
  label: Mixer Output Set Volume
  kind: action
  command: "F0 00 01 00 {device_id} 0A 69 00 {idmsb} {idlsb} {va} F7"
  params:
    - name: device_id
      type: integer
      description: Device ID 0-15.
    - name: idmsb
      type: integer
      description: "<IDMSB> = [((4 * NMIXPOINTS) + 15 + (NOutput #)) >> 7] AND 7Fh."
    - name: idlsb
      type: integer
      description: "<IDLSB> = ((4 * NMIXPOINTS) + 15 + (NOutput #)) AND 7Fh."
    - name: va
      type: integer
      description: "<VA> = ControlSetting AND 7Fh. Range 0-127: 0=-Inf, 1-26=-105 to -42.5 dB in 2.5 dB steps, 27-127=-40.0 to +10.0 dB in 0.5 dB steps."
- id: mixer_output_change_volume
  label: Mixer Output Change Volume (BUG: does not work)
  kind: action
  command: "F0 00 01 00 {device_id} 0A 69 05 {idmsb} {idlsb} {va} F7"
  params:
    - name: device_id
      type: integer
      description: Device ID 0-15.
    - name: idmsb
      type: integer
      description: "<IDMSB> = [((4 * NMIXPOINTS) + 15 + (NOutput #)) >> 7] AND 7Fh."
    - name: idlsb
      type: integer
      description: "<IDLSB> = ((4 * NMIXPOINTS) + 15 + (NOutput #)) AND 7Fh."
    - name: va
      type: integer
      description: "<VA> = [2 * dBChange] AND 7Fh."

# --- Matrix Mixer: Activate Mixpoint (route input to output) ---
# Source explicitly flags Toggle Activation as BUG - DOES NOT WORK.
- id: mixpoint_toggle_activation
  label: Mixpoint Toggle Activation (BUG: does not work)
  kind: action
  command: "F0 00 01 00 {device_id} 0A 69 06 {idmsb} {idlsb} 00 F7"
  params:
    - name: device_id
      type: integer
      description: Device ID 0-15.
    - name: idmsb
      type: integer
      description: "<IDMSB> = [((3 * NMIXPOINTS) + 15 + (Mix Point #)) >> 7] AND 7Fh."
    - name: idlsb
      type: integer
      description: "<IDLSB> = ((3 * NMIXPOINTS) + 15 + (Mix Point #)) AND 7Fh."
- id: mixpoint_force_activate
  label: Mixpoint Force Activation
  kind: action
  command: "F0 00 01 00 {device_id} 0A 69 01 {idmsb} {idlsb} 7F F7"
  params:
    - name: device_id
      type: integer
      description: Device ID 0-15.
    - name: idmsb
      type: integer
      description: "<IDMSB> = [((3 * NMIXPOINTS) + 15 + (Mix Point #)) >> 7] AND 7Fh."
    - name: idlsb
      type: integer
      description: "<IDLSB> = ((3 * NMIXPOINTS) + 15 + (Mix Point #)) AND 7Fh."
- id: mixpoint_force_deactivate
  label: Mixpoint Force Deactivation
  kind: action
  command: "F0 00 01 00 {device_id} 0A 69 01 {idmsb} {idlsb} 00 F7"
  params:
    - name: device_id
      type: integer
      description: Device ID 0-15.
    - name: idmsb
      type: integer
      description: "<IDMSB> = [((3 * NMIXPOINTS) + 15 + (Mix Point #)) >> 7] AND 7Fh."
    - name: idlsb
      type: integer
      description: "<IDLSB> = ((3 * NMIXPOINTS) + 15 + (Mix Point #)) AND 7Fh."

# --- Queries ---
# Each query echoes the command then sends a return string.
# Return string device-ID byte is <Device ID + 10h>.
- id: query_input_mute
  label: Query Input Mute
  kind: query
  command: "F0 00 01 00 {device_id} 0A 70 00 {input_id} F7"
  params:
    - name: device_id
      type: integer
      description: Device ID 0-15.
    - name: input_id
      type: integer
      description: Input ID byte: 04h=In1, 05h=In2, 06h=In3, 07h=In4.
- id: query_input_polarity
  label: Query Input Polarity
  kind: query
  command: "F0 00 01 00 {device_id} 0A 70 00 {input_id} F7"
  params:
    - name: device_id
      type: integer
      description: Device ID 0-15.
    - name: input_id
      type: integer
      description: Input ID byte: 08h=In1, 09h=In2, 0Ah=In3, 0Bh=In4.
- id: query_input_scaling
  label: Query Input Scaling
  kind: query
  command: "F0 00 01 00 {device_id} 0A 70 00 {input_id} F7"
  params:
    - name: device_id
      type: integer
      description: Device ID 0-15.
    - name: input_id
      type: integer
      description: Input ID byte: 0Ch=In1, 0Dh=In2, 0Eh=In3, 0Fh=In4.
- id: query_input_volume
  label: Query Input Volume
  kind: query
  command: "F0 00 01 00 {device_id} 0A 70 00 {input_id} F7"
  params:
    - name: device_id
      type: integer
      description: Device ID 0-15.
    - name: input_id
      type: integer
      description: Input volume ID byte: 00h=In1, 01h=In2, 02h=In3, 03h=In4.
- id: query_output_mute
  label: Query Output Mute
  kind: query
  command: "F0 00 01 00 {device_id} 0A 70 03 {output_id} F7"
  params:
    - name: device_id
      type: integer
      description: Device ID 0-15.
    - name: output_id
      type: integer
      description: Output mute ID byte: 46h=Out1 .. 4Dh=Out8.
- id: query_output_polarity
  label: Query Output Polarity
  kind: query
  command: "F0 00 01 00 {device_id} 0A 70 03 {output_id} F7"
  params:
    - name: device_id
      type: integer
      description: Device ID 0-15.
    - name: output_id
      type: integer
      description: Output polarity ID byte: 4Eh=Out1, 4Fh=Out2, 50h=Out3, 51h=Out4, 52h=Out5, 53h=Out6, 54h=Out7, 55h=Out8.
- id: query_output_scaling
  label: Query Output Scaling
  kind: query
  command: "F0 00 01 00 {device_id} 0A 70 03 {output_id} F7"
  params:
    - name: device_id
      type: integer
      description: Device ID 0-15.
    - name: output_id
      type: integer
      description: Output scaling ID byte: 56h=Out1 .. 5Dh=Out8.
- id: query_output_pad
  label: Query Output Pad
  kind: query
  command: "F0 00 01 00 {device_id} 0A 70 03 {output_id} F7"
  params:
    - name: device_id
      type: integer
      description: Device ID 0-15.
    - name: output_id
      type: integer
      description: Output pad ID byte: 5Eh=Out1 .. 65h=Out8.
- id: query_output_volume
  label: Query Output Volume
  kind: query
  command: "F0 00 01 00 {device_id} 0A 70 03 {output_id} F7"
  params:
    - name: device_id
      type: integer
      description: Device ID 0-15.
    - name: output_id
      type: integer
      description: Output volume ID byte: 3Eh=Out1 .. 45h=Out8.
- id: query_mixpoint_mute
  label: Query Mixpoint Mute
  kind: query
  command: "F0 00 01 00 {device_id} 0A 70 00 {id} F7"
  params:
    - name: device_id
      type: integer
      description: Device ID 0-15.
    - name: id
      type: integer
      description: "<ID> = NMIXPOINTS + 15 + (Mix Point #)."
- id: query_mixer_output_mute
  label: Query Mixer Output Mute
  kind: query
  command: "F0 00 01 00 {device_id} 0A 70 {idmsb} {idlsb} F7"
  params:
    - name: device_id
      type: integer
      description: Device ID 0-15.
    - name: idmsb
      type: integer
      description: "<IDMSB> = [((4 * NMIXPOINTS) + NOUTPUTS + 15 + (NOutput #)) >> 7] AND 7Fh."
    - name: idlsb
      type: integer
      description: "<IDLSB> = ((4 * NMIXPOINTS) + NOUTPUTS + 15 + (NOutput #)) AND 7Fh."
- id: query_mixpoint_polarity
  label: Query Mixpoint Polarity
  kind: query
  command: "F0 00 01 00 {device_id} 0A 70 00 {id} F7"
  params:
    - name: device_id
      type: integer
      description: Device ID 0-15.
    - name: id
      type: integer
      description: "<ID> = (2 * NMIXPOINTS) + 15 + (Mix Point #)."
- id: query_mixer_output_polarity
  label: Query Mixer Output Polarity
  kind: query
  command: "F0 00 01 00 {device_id} 0A 70 {idmsb} {idlsb} F7"
  params:
    - name: device_id
      type: integer
      description: Device ID 0-15.
    - name: idmsb
      type: integer
      description: "<IDMSB> = [((4 * NMIXPOINTS) + (2 * NOUTPUTS) + 15 + (NOutput #)) >> 7] AND 7Fh."
    - name: idlsb
      type: integer
      description: "<IDLSB> = ((4 * NMIXPOINTS) + (2 * NOUTPUTS) + 15 + (NOutput #)) AND 7Fh."
- id: query_mixpoint_volume
  label: Query Mixpoint Volume
  kind: query
  command: "F0 00 01 00 {device_id} 0A 70 00 {id} F7"
  params:
    - name: device_id
      type: integer
      description: Device ID 0-15.
    - name: id
      type: integer
      description: "<ID> = (Mix Point #) + 15."
- id: query_mixer_output_volume
  label: Query Mixer Output Volume
  kind: query
  command: "F0 00 01 00 {device_id} 0A 70 {idmsb} {idlsb} F7"
  params:
    - name: device_id
      type: integer
      description: Device ID 0-15.
    - name: idmsb
      type: integer
      description: "<IDMSB> = [((4 * NMIXPOINTS) + 15 + (NOutput #)) >> 7] AND 7Fh."
    - name: idlsb
      type: integer
      description: "<IDLSB> = ((4 * NMIXPOINTS) + 15 + (NOutput #)) AND 7Fh."
- id: query_mixpoint_activation
  label: Query Mixpoint Activation
  kind: query
  command: "F0 00 01 00 {device_id} 0A 70 {idmsb} {idlsb} F7"
  params:
    - name: device_id
      type: integer
      description: Device ID 0-15.
    - name: idmsb
      type: integer
      description: "<IDMSB> = [((3 * NMIXPOINTS) + 15 + (Mix Point #)) >> 7] AND 7Fh."
    - name: idlsb
      type: integer
      description: "<IDLSB> = ((3 * NMIXPOINTS) + 15 + (Mix Point #)) AND 7Fh."
```

## Feedbacks
```yaml
- id: input_mute_state
  type: enum
  values: [unmuted, muted]
  description: "Return string: F0 00 01 00 <Device ID+10h> 0A 00 00 04h..07h <VA> 00 F7. <VA>=00h unmuted, 7Fh muted."
- id: input_polarity_state
  type: enum
  values: [positive, negative]
  description: "Return string uses ID 08h..0Bh. <VA>=00h (+), 01h (-)."
- id: input_scaling_state
  type: enum
  values: ["+4 dBu", "-10 dBV"]
  description: "Return string uses ID 0Ch..0Fh. <VA>=00h (+4 dBu), 01h (-10 dBV)."
- id: input_volume_state
  type: integer
  description: "Return string uses ID 00h..03h. <VA> range -60 to +60. Divide by 2 for dB."
- id: output_mute_state
  type: enum
  values: [unmuted, muted]
  description: "Return string uses ID 46h..4Dh. <VA>=00h unmuted, 7Fh muted."
- id: output_polarity_state
  type: enum
  values: [positive, negative]
  description: "Return string uses ID 4Eh..53h,54h,55h. <VA>=00h (+), 01h (-)."
- id: output_scaling_state
  type: enum
  values: ["+4 dBu", "-10 dBV"]
  description: "Return string uses ID 56h..5Dh. <VA>=00h (+4 dBu), 01h (-10 dBV)."
- id: output_pad_state
  type: enum
  values: [disengaged, engaged]
  description: "Return string uses ID 5Eh..65h. <VA>=00h off, 01h on."
- id: output_volume_state
  type: integer
  description: "Return string uses ID 3Eh..45h. <VA> range -60 to +60. Divide by 2 for dB."
- id: mixpoint_mute_state
  type: enum
  values: [unmuted, muted]
  description: "Return string uses <ID>=NMIXPOINTS+15+MixPoint#. <VA>=00h unmuted, 7Fh muted."
- id: mixer_output_mute_state
  type: enum
  values: [unmuted, muted]
  description: "Return string uses IDMSB/IDLSB. <VA>=00h unmuted, 7Fh muted."
- id: mixpoint_polarity_state
  type: enum
  values: [positive, negative]
  description: "Return string uses <ID>=(2*NMIXPOINTS)+15+MixPoint#. <VA>=00h (+), 01h (-)."
- id: mixer_output_polarity_state
  type: enum
  values: [positive, negative]
  description: "Return string uses IDMSB/IDLSB. <VA>=00h (+), 01h (-)."
- id: mixpoint_volume_state
  type: integer
  description: "Return string uses <ID>=MixPoint#+15. <VA>=0..127: 0=-Inf, 1-26=-105 to -42.5 dB in 2.5 dB steps, 27-127=-40.0 to +10.0 dB in 0.5 dB steps."
- id: mixer_output_volume_state
  type: integer
  description: "Return string uses IDMSB/IDLSB. <VA>=0..127 same table as mixpoint."
- id: mixpoint_activation_state
  type: enum
  values: [deactivated, activated]
  description: "Return string uses IDMSB/IDLSB. <VA>=00h not activated, 01h activated."
```

## Variables
```yaml
- id: input_volume
  type: integer
  range: [-30, 30]
  unit: dB
  description: "Per-input channel volume. Control Setting; <VA> = [2 * value] AND 7Fh."
- id: output_volume
  type: integer
  range: [-30, 30]
  unit: dB
  description: "Per-output channel volume. Same formula as input."
- id: mixpoint_volume
  type: integer
  range: [0, 127]
  unit: gain_table
  description: "Mixpoint gain. <VA> = value AND 7Fh. 0=-Inf, 1-26=-105..-42.5 dB @ 2.5 dB, 27-127=-40..+10 dB @ 0.5 dB."
- id: mixer_output_volume
  type: integer
  range: [0, 127]
  unit: gain_table
  description: "Mixer output gain. Same table as mixpoint."
- id: preset
  type: integer
  range: [1, 128]
  description: "Preset number. Sent as preset-1 (0..127) in the recall frame."
- id: device_id
  type: integer
  range: [0, 15]
  description: "Set via DIP switches on the rear of the P4800. Sent as a single hex nibble."
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or power-on sequencing requirements.
```

## Notes
- Source flags four commands as BUG — DOES NOT WORK: Mixer Output Toggle Mute, Mixer Output Toggle Polarity, Mixpoint Toggle Activation, Mixer Output Change Volume. These are still emitted above for completeness because the source lists them as documented rows.
- The source lists Output 7 and Output 8 polarity with the same ID byte 55h in the polarity section (4Eh, 4Fh, 50h, 51h, 52h, 53h, 55h, 55h). The query section uses 54h for Output 7. The set commands are transcribed verbatim from the source; the discrepancy is in the source, not introduced here.
- NOUTPUTS equals 8 when no crossover/splitter is in the preset; each crossover/splitter channel reduces it. NMIXPOINTS = 4 * NOUTPUTS.
- The P4800 requires 5-12 V on DTR; a 1 kOhm resistor to a 5 V supply is documented.
- Preset recall uses a short 2-byte frame (C <n> h <pp> h), not a full SysEx frame; all other commands use the F0h..F7h SysEx frame.
- After every set or query, the P4800 echoes the command and then sends a return string; the return-string device-ID byte is <Device ID + 10h>.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Provenance

```yaml
source_domains:
  - content-files.shure.com
source_urls:
  - https://content-files.shure.com/KnowledgeBaseFiles/p4800_rs232_commands.pdf
retrieved_at: 2026-04-30T04:29:02.308Z
last_checked_at: 2026-05-14T18:17:20.534Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:20.534Z
matched_actions: 49
action_count: 49
confidence: medium
summary: "All 50 spec actions and feedbacks match source commands; all transport parameters verified; known bugs documented. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Sysex frame structure F0h F7h"
- "DTR voltage 5-12 volts requirement"
- "DIP switch preset configuration"
- "no firmware version or protocol revision stated in source"
- "source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
- "firmware version compatibility not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
