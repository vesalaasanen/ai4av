---
spec_id: admin/extron-dp-da2
schema_version: ai4av-public-spec-v1
revision: 1
title: "Extron DP DA2 Control Spec"
manufacturer: Extron
model_family: "DP DA2 (60-1221-01)"
aliases: []
compatible_with:
  manufacturers:
    - Extron
  models:
    - "DP DA2 (60-1221-01)"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - media.extron.com
source_urls:
  - https://media.extron.com/public/download/files/userman/68-2154-01_E_DP_DA2_Body.pdf
retrieved_at: 2026-07-02T20:23:52.614Z
last_checked_at: 2026-07-07T11:36:54.122Z
generated_at: 2026-07-07T11:36:54.122Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "power voltage/current specs not in source excerpt. flow_control not stated. Mute contact-closure pin behavior is hardware-level, not protocol."
  - "flow control not stated in source"
  - "no safety warnings or interlock procedures present in source excerpt."
  - "flow_control not stated in source."
  - "firmware version compatibility range not stated (reported dynamically as V x.xx)."
  - "exact reset sub-modes behind \"ZXXX\" not expanded in source."
verification:
  verdict: verified
  checked_at: 2026-07-07T11:36:54.122Z
  matched_actions: 24
  action_count: 24
  confidence: medium
  summary: "All 24 spec actions match verbatim against the source command table; transport parameters verified; complete coverage. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-02
---

# Extron DP DA2 Control Spec

## Summary
The Extron DP DA2 (part 60-1221-01) is a two-output DisplayPort v1.1a distribution amplifier with EDID Minder, Key Minder (HDCP), and output muting. It is controlled via RS-232 (rear 5-pole captive screw `Remote` connector or front panel Config USB port) using the Extron Simple Instruction Set (SIS). This spec covers the SIS command set: video/audio mute, signal/HDCP status, EDID Minder queries, video bit depth, DDC speed, and unit identity.

<!-- UNRESOLVED: power voltage/current specs not in source excerpt. flow_control not stated. Mute contact-closure pin behavior is hardware-level, not protocol. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - queryable  # inferred: mute/signal/HDCP/EDID/bitdepth/DDC/name/version queries present
```

## Actions
```yaml
# SIS symbol legend (verbatim from source Symbol table):
#   E    = Escape (0x1B) - prefix for many commands
#   }    = Carriage return (0x0D), no line feed - command terminator
#   ]    = Carriage return + line feed (0x0D 0x0A) - response terminator
#   • / space = literal space character (0x20)
# Variables:
#   X! = video output (1 or 2)   X@ = status (0=off, 1=on)
#   X( = bit depth (0=Auto, 1=8bit)   X* = DDC speed (1=Low, 2=High)
#   X& = unit name (<=24 chars, [A-Z0-9-], first alpha, last not hyphen)

# --- Video Mute ---
- id: set_video_mute_output
  label: Set Video Mute (single output)
  kind: action
  command: "X! * X@ B"
  params:
    - name: output
      type: integer
      description: "Output number (1 or 2) - SIS variable X!"
    - name: status
      type: integer
      description: "Mute status: 0=off, 1=on - SIS variable X@"
  response: "Vmt X! * X@]"

- id: set_video_mute_all
  label: Set Video Mute (all outputs)
  kind: action
  command: "X@ B"
  params:
    - name: status
      type: integer
      description: "Mute status: 0=off, 1=on - SIS variable X@"
  response: "Vmt X@]"

- id: query_video_mute
  label: Query Video Mute Status
  kind: query
  command: "B"
  params: []
  response: "Vmt X@•X@]"  # output1 status, output2 status

# --- Audio Mute ---
- id: set_audio_mute_output
  label: Set Audio Mute (single output)
  kind: action
  command: "X! * X@ Z"
  params:
    - name: output
      type: integer
      description: "Output number (1 or 2) - SIS variable X!"
    - name: status
      type: integer
      description: "Mute status: 0=off, 1=on - SIS variable X@"
  response: "Amt X! * X@]"

- id: set_audio_mute_all
  label: Set Audio Mute (all outputs)
  kind: action
  command: "X@ Z"
  params:
    - name: status
      type: integer
      description: "Mute status: 0=off, 1=on - SIS variable X@"
  response: "Amt X@]"

- id: query_audio_mute
  label: Query Audio Mute Status
  kind: query
  command: "Z"
  params: []
  response: "Amt X@•X@]"  # output1 status, output2 status

# --- Signal Status ---
- id: request_signal_status
  label: Request All Signal Status
  kind: query
  command: "E LS }"
  params: []
  response: "Sig X@ * X@•X@]"  # input status * output1 status • output2 status (0=undetected, 1=detected)

# --- HDCP ---
- id: hdcp_on
  label: HDCP Authorized Device On
  kind: action
  command: "E E1HDCP }"
  params: []
  response: "HdcpE1 ]"

- id: hdcp_off
  label: HDCP Authorized Device Off
  kind: action
  command: "E E0HDCP }"
  params: []
  response: "HdcpE0 ]"

- id: query_hdcp_status
  label: Query HDCP Authorized Device Status
  kind: query
  command: "E EHDCP }"
  params: []
  response: "X@]"  # 1=on, 0=off

# --- EDID Minder ---
- id: view_edid_assignment
  label: View EDID Assignment
  kind: query
  command: "E A*EDID }"
  params: []
  response: "X#]"  # 1=default, 2=stored, 3=extend

- id: read_edid_hex
  label: Read EDID in HEX
  kind: query
  command: "E R*EDID }"
  params: []
  response: "X$]"  # up to 256 bytes of HEX (as text) from currently selected EDID

- id: view_edid_native_resolution
  label: View EDID Native Resolution
  kind: query
  command: "E N*EDID }"
  params: []
  response: "X%]"  # e.g. 1600x1200 @ 60Hz

# --- Video Bit Depth ---
- id: set_video_bit_depth
  label: Set Video Bit Depth
  kind: action
  command: "E V X( BITD }"
  params:
    - name: bit_depth
      type: integer
      description: "0=Auto (default), 1=8 bit - SIS variable X("
  response: "BitdV X(]"

- id: query_video_bit_depth
  label: Query Video Bit Depth
  kind: query
  command: "E VBITD }"
  params: []
  response: "BitdV X(]"

# --- DDC Speed ---
- id: set_ddc_speed_output
  label: Set DDC Speed (single output)
  kind: action
  command: "EX! * X* DDCS }"
  params:
    - name: output
      type: integer
      description: "Output number (1 or 2) - SIS variable X!"
    - name: speed
      type: integer
      description: "1=Low (20 kbits, default), 2=High (100 kbits) - SIS variable X*"
  response: "Ddcs X! * X*]"

- id: set_ddc_speed_all
  label: Set DDC Speed (all outputs)
  kind: action
  command: "E 0* X* DDCS }"
  params:
    - name: speed
      type: integer
      description: "1=Low (20 kbits, default), 2=High (100 kbits) - SIS variable X*"
  response: "Ddcs0* X*]"

- id: query_ddc_speed
  label: Query DDC Speed (single output)
  kind: query
  command: "EX! DDCS }"
  params:
    - name: output
      type: integer
      description: "Output number (1 or 2) - SIS variable X!"
  response: "Ddcs X*]"  # 1=low, 2=high

# --- Unit Name ---
- id: set_unit_name
  label: Set Unit Name
  kind: action
  command: "EX& CN }"
  params:
    - name: name
      type: string
      description: "Unit name (<=24 chars, [A-Z0-9-], first char alpha, last not hyphen) - SIS variable X&"
  response: "Ipn •X&]"

- id: view_unit_name
  label: View Unit Name
  kind: query
  command: "E CN }"
  params: []
  response: "X&]"

# --- Other ---
- id: request_part_number
  label: Request Part Number
  kind: query
  command: "N"
  params: []
  response: "60-1221-01]"

- id: query_firmware_version
  label: Query Firmware Version
  kind: query
  command: "Q"
  params: []
  response: "X^]"  # firmware version with 2 decimals

- id: reset
  label: Reset
  kind: action
  command: "E ZXXX }"
  params: []
  response: "Zpx ]"

- id: upload_firmware
  label: Upload Firmware
  kind: action
  command: "E Upload }"
  params: []
  response: "...go"  # during upload; "Upl]" when upload complete
```

## Feedbacks
```yaml
- id: video_mute_state
  type: enum
  values: [on, off]
  description: "Per-output video mute (response Vmt X@•X@ = output1, output2)"

- id: audio_mute_state
  type: enum
  values: [on, off]
  description: "Per-output audio mute (response Amt X@•X@ = output1, output2)"

- id: signal_status
  type: enum
  values: [detected, undetected]
  description: "Input + output1 + output2 signal detect (response Sig X@ * X@•X@)"

- id: hdcp_state
  type: enum
  values: [on, off]

- id: edid_assignment
  type: enum
  values: [default, stored, extend]
  description: "SIS X# (1=default, 2=stored, 3=extend)"

- id: edid_raw_hex
  type: string
  description: "Up to 256 bytes HEX (as text) from selected EDID (SIS X$)"

- id: edid_native_resolution
  type: string
  description: "e.g. 1600x1200 @ 60Hz (SIS X%)"

- id: video_bit_depth
  type: enum
  values: [auto, "8bit"]

- id: ddc_speed
  type: enum
  values: [low, high]
  description: "1=Low (20 kbits), 2=High (100 kbits)"

- id: unit_name
  type: string

- id: part_number
  type: string
  description: "60-1221-01"

- id: firmware_version
  type: string
  description: "Version with 2 decimals (SIS X^)"
```

## Variables
```yaml
# Settable parameters are exposed as Actions above (mute, bit depth, DDC speed, unit name, HDCP, reset).
# No additional continuous control variables documented.
```

## Events
```yaml
- id: startup_banner
  description: >-
    Unsolicited message sent when the DP DA2 is first switched on:
    "(c) Copyright 2012, Extron Electronics DisplayPort DA Series, V x.xx, 60-1221-01]"
    where 60-1221-01 is the part number and V x.xx is the firmware version.

- id: error_E01
  description: "E01 - Invalid input channel number (too large)"

- id: error_E10
  description: "E10 - Invalid command"

- id: error_E13
  description: "E13 - Invalid value (too large)"

- id: error_E14
  description: "E14 - Not valid for this configuration"
```

## Macros
```yaml
# No multi-step sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures present in source excerpt.
# NOTE (not a safety inference): firmware upload (Upload) and reset (ZXXX) are destructive
# operations per their descriptions; source does not document sequencing safeguards.
```

## Notes
- Control transports: rear 5-pole captive screw `Remote` connector (Tx/Rx/G) **or** front-panel Config USB mini-B port. Both carry SIS at 9600/8/N/1. **Only one serial port may be used at a time** — if the Config port is in use, the rear captive screw connector must be disconnected, and vice versa.
- SIS commands are case-insensitive unless otherwise stated; no special start/end characters required beyond the `}` (CR) terminator.
- All unit responses terminate with CR/LF (`]`).
- Mute can also be triggered by hardware contact closure on `Remote` pins 1 (output 1) / 2 (output 2), ground shared with RS-232 — this is hardware-level, outside the SIS protocol.
- EDID source selection / output mode is set by two DIP switches; SIS EDID commands report the resulting state (default / stored / extend).
- Extend mode resolutions (per output): 1920x1080, 1680x1050, 1440x900, 1280x1024 (all @ 60 Hz).

<!-- UNRESOLVED: flow_control not stated in source. -->
<!-- UNRESOLVED: firmware version compatibility range not stated (reported dynamically as V x.xx). -->
<!-- UNRESOLVED: exact reset sub-modes behind "ZXXX" not expanded in source. -->

## Provenance

```yaml
source_domains:
  - media.extron.com
source_urls:
  - https://media.extron.com/public/download/files/userman/68-2154-01_E_DP_DA2_Body.pdf
retrieved_at: 2026-07-02T20:23:52.614Z
last_checked_at: 2026-07-07T11:36:54.122Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T11:36:54.122Z
matched_actions: 24
action_count: 24
confidence: medium
summary: "All 24 spec actions match verbatim against the source command table; transport parameters verified; complete coverage. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "power voltage/current specs not in source excerpt. flow_control not stated. Mute contact-closure pin behavior is hardware-level, not protocol."
- "flow control not stated in source"
- "no safety warnings or interlock procedures present in source excerpt."
- "flow_control not stated in source."
- "firmware version compatibility range not stated (reported dynamically as V x.xx)."
- "exact reset sub-modes behind \"ZXXX\" not expanded in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
