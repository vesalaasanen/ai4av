---
spec_id: admin/ashly-audio-nxe1502bd
schema_version: ai4av-public-spec-v1
revision: 1
title: "Ashly Audio Nxe1502Bd Control Spec"
manufacturer: "Ashly Audio"
model_family: Nxe1502Bd
aliases: []
compatible_with:
  manufacturers:
    - "Ashly Audio"
  models:
    - Nxe1502Bd
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - ashly.com
source_urls:
  - https://ashly.com/wp-content/uploads/2015/10/WR5_Protocol.pdf
  - https://ashly.com/wr-5-and-ina-1-protocol/
  - https://ashly.com/wp-content/uploads/2026/03/nX-amp-full-manual-r12.pdf
  - https://ashly.com/nxe-multi-mode/
retrieved_at: 2026-07-13T18:29:17.887Z
last_checked_at: 2026-10-01T11:21:00.616Z
generated_at: 2026-10-01T11:21:00.616Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "data bits not stated in source; flow control not stated; number of physical I/O channels per device not enumerated; logic output count not stated"
  - "data bits not stated in source"
  - "flow control not stated in source"
  - "no macros described in source"
  - "source contains no safety warnings, interlock procedures, or power-on"
  - "data bits and flow control not stated in source"
  - "number of physical inputs/outputs and logic outputs on the Nxe1502Bd not stated in this source"
  - "firmware version compatibility range not stated"
  - "firmware CRC error message byte 10 undocumented in source"
  - "checksum byte insertion position (byte 11 of checksum msg refers to byte 11 of the *following* message) is ambiguously worded in source"
verification:
  verdict: verified
  checked_at: 2026-10-01T11:21:00.616Z
  matched_actions: 18
  action_count: 18
  confidence: medium
  summary: "All 18 spec action units map 1:1 to source WR5 message types 0,3,5,7,9,10,11,12,15,17,18,20,21,22,23,25 with matching opcode bytes and shapes; transport 9600/1/N/1 confirmed. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-13
---

# Ashly Audio Nxe1502Bd Control Spec

## Summary
The Ashly Audio Nxe1502Bd is controlled via the WR5 Remote Protocol, a binary serial (RS-232C) protocol operating at 9600 bps with 1 start bit, 1 stop bit, and no parity. Messages are framed with `$F0` start and `$F7` stop bytes and use the Ashly manufacturer SysEx id (`00 01 2A`). This spec covers device discovery, preset recall, channel gain, mute, matrix mixer, logic output, and firmware message types documented in the WR5 protocol reference (02/23/2018).

<!-- UNRESOLVED: data bits not stated in source; flow control not stated; number of physical I/O channels per device not enumerated; logic output count not stated -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: null  # UNRESOLVED: data bits not stated in source
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits
```yaml
traits:
  - queryable  # inferred: inquiry message types present (settings, preset/mute, gain, logic, matrix)
  - levelable  # inferred: gain messages with 0-99 level values present
  - routable  # inferred: matrix mixer message types present
```

## Actions
```yaml
# All WR5 message types enumerated verbatim from source. Message-type byte shown in the
# command payload. Controller->device messages (inquiry/download/msg) are Actions;
# device->controller responses are in Feedbacks; unsolicited WR5 button msgs are in Events.
# Serial bytes: for 3rd-party control, serial hi=00, lo=01 (per source). Target Device Id=00.
- id: device_discovery_request
  label: Device Discovery Request
  kind: query
  command: "F0 00 01 2A 0D 00 F7"
  params: []
  notes: "Broadcast discovery; model byte=$0D, msg type byte7=00."

- id: settings_inquiry
  label: WR5 Settings Inquiry
  kind: query
  command: "F0 00 01 2A 0C 7F 00 {sn_hi} {sn_lo} F7"
  params:
    - name: sn_hi
      type: integer
      description: Device Serial number bits 13-7
    - name: sn_lo
      type: integer
      description: Device Serial number bits 6-0
  notes: "msg type 00; byte6=$7F = PC Device Id."

- id: settings_download
  label: WR5 Settings Download
  kind: action
  command: "F0 00 01 2A 0C 7F 02 {sn_hi} {sn_lo} {id} {name[1..20]} {settings[31..107]} F7"
  params:
    - name: id
      type: integer
      description: Target Device Id
    - name: name
      type: string
      description: WR5 name characters 1-20
    - name: settings
      type: object
      description: Settings bytes 31-107 (options, zone selection, 6 button config blocks)
  notes: "msg type 02; same layout as Settings Response but byte7=$02. Function types: 0=off,1=preset recall,2=preset scroll,3=gain,4=mute,5=source select,6=LogicOut ActiveHigh,7=LogicOut ActiveLow,8=Matrix Mixer."

- id: preset_mute_status_inquiry
  label: Preset Number & Mute Status Inquiry
  kind: query
  command: "F0 00 01 2A 0C 00 03 00 01 F7"
  params: []
  notes: "msg type 03."

- id: output_gain_inquiry
  label: Output Gain & Mixer Mutes Inquiry
  kind: query
  command: "F0 00 01 2A 0C 00 05 00 01 {channel} F7"
  params:
    - name: channel
      type: integer
      description: Target device output channel (0 to n = output 1 to n+1)
  notes: "msg type 05."

- id: channel_gain_inquiry
  label: Channel Gain Inquiry
  kind: query
  command: "F0 00 01 2A 0C 00 07 00 01 {channel} F7"
  params:
    - name: channel
      type: integer
      description: "0-63 = inputs 1-64; 64-127 = outputs 1-64"
  notes: "msg type 07."

- id: preset_recall
  label: Preset Recall
  kind: action
  command: "F0 00 01 2A 0C 00 09 00 01 {preset} F7"
  params:
    - name: preset
      type: integer
      description: Target device preset number (24.24M preset number - 1)
  notes: "msg type 09."

- id: mute_unmute
  label: Mute/Unmute
  kind: action
  command: "F0 00 01 2A 0C 00 0A 00 01 {um} {in1_7} {in8_14} {in15_20} {in_sp} {out1_7} {out8_14} {out15_20} {out_sp} F7"
  params:
    - name: um
      type: integer
      description: "0 = unmute selected channels; 1-7F = mute selected channels"
    - name: in1_7
      type: integer
      description: Inputs 1-7 selection bitmask (high bit = selected)
    - name: in8_14
      type: integer
      description: Inputs 8-14 selection bitmask
    - name: in15_20
      type: integer
      description: Inputs 15-20 selection bitmask
    - name: out1_7
      type: integer
      description: Outputs 1-7 selection bitmask (high bit = selected)
    - name: out8_14
      type: integer
      description: Outputs 8-14 selection bitmask
    - name: out15_20
      type: integer
      description: Outputs 15-20 selection bitmask
  notes: "msg type 0A (10)."

- id: gain_message
  label: Gain Message
  kind: action
  command: "F0 00 01 2A 0C 00 0B 00 01 {level} {in1_7} {in8_14} {in15_20} {in_sp} {out1_7} {out8_14} {out15_20} {out_sp} F7"
  params:
    - name: level
      type: integer
      description: New gain value (0-99)
    - name: in1_7
      type: integer
      description: Inputs 1-7 selection bitmask (high bit = selected for new gain)
    - name: in8_14
      type: integer
      description: Inputs 8-14 selection bitmask
    - name: in15_20
      type: integer
      description: Inputs 15-20 selection bitmask
    - name: out1_7
      type: integer
      description: Outputs 1-7 selection bitmask
    - name: out8_14
      type: integer
      description: Outputs 8-14 selection bitmask
    - name: out15_20
      type: integer
      description: Outputs 15-20 selection bitmask
  notes: "msg type 0B (11)."

- id: mixer_source_mute
  label: Mixer Source Mute/Unmute
  kind: action
  command: "F0 00 01 2A 0C 00 0C 00 01 {out1_7} {out8_14} {out15_20} {out_sp} {mute1_7} {mute8_14} {mute15_20} {mute_sp} {unmute1_7} {unmute8_14} {unmute15_20} {unmute_sp} F7"
  params:
    - name: out1_7
      type: integer
      description: Mixer output channel 1-7 selection bitmask
    - name: out8_14
      type: integer
      description: Mixer output channel 8-14 selection bitmask
    - name: out15_20
      type: integer
      description: Mixer output channel 15-20 selection bitmask
    - name: mute1_7
      type: integer
      description: Sources (mix faders) 1-7 to mute (high = mute)
    - name: mute8_14
      type: integer
      description: Sources 8-14 to mute
    - name: mute15_20
      type: integer
      description: Sources 15-20 to mute
    - name: unmute1_7
      type: integer
      description: Sources 1-7 to unmute (high = unmute)
    - name: unmute8_14
      type: integer
      description: Sources 8-14 to unmute
    - name: unmute15_20
      type: integer
      description: Sources 15-20 to unmute
  notes: "msg type 0C (12)."

- id: logic_output_status_inquiry
  label: Logic Output Status Inquiry
  kind: query
  command: "F0 00 01 2A 0C 00 0F 00 01 F7"
  params: []
  notes: "msg type 0F (15)."

- id: logic_output_message
  label: Logic Output Set
  kind: action
  command: "F0 00 01 2A 0C 00 11 00 01 {num} {value} F7"
  params:
    - name: num
      type: integer
      description: Logic Output Number (0 to number of logic outputs)
    - name: value
      type: integer
      description: "0 = Low (Fet on); 1 = High (Fet off)"
  notes: "msg type 11 (17)."

- id: matrix_mixer_inquiry
  label: Matrix Mixer Inquiry
  kind: query
  command: "F0 00 01 2A 0C 00 12 00 01 {zone} {input} F7"
  params:
    - name: zone
      type: integer
      description: Output zone to request mixer settings for
    - name: input
      type: integer
      description: Mixer input number
  notes: "msg type 12 (18)."

- id: matrix_mixer_message
  label: Matrix Mixer Set
  kind: action
  command: "F0 00 01 2A 0C 00 14 00 01 {level} {zout1_7} {zout8_14} {zout15_20} {zout_sp} {min1_7} {min8_14} {min15_20} {min_sp} F7"
  params:
    - name: level
      type: integer
      description: New gain value (0-99)
    - name: zout1_7
      type: integer
      description: Zone outputs 1-7 selection bitmask
    - name: zout8_14
      type: integer
      description: Zone outputs 8-14 selection bitmask
    - name: zout15_20
      type: integer
      description: Zone outputs 15-20 selection bitmask
    - name: min1_7
      type: integer
      description: Mixer inputs 1-7 selection bitmask (high bit = selected for new level)
    - name: min8_14
      type: integer
      description: Mixer inputs 8-14 selection bitmask
    - name: min15_20
      type: integer
      description: Mixer inputs 15-20 selection bitmask
  notes: "msg type 14 (20)."

- id: checksum_message
  label: Checksum Message
  kind: action
  command: "F0 00 01 2A 0C 00 15 00 01 {follow_type} {checksum} F7"
  params:
    - name: follow_type
      type: integer
      description: Message-to-follow type byte
    - name: checksum
      type: integer
      description: Computed checksum (two's complement of summed message bytes AND 0x7F)
  notes: "msg type 15 (21). Optional; prepend to messages when checksum flag set in options."

- id: reprogram_message
  label: Enter Reprogram Message
  kind: action
  command: "F0 00 01 2A 0C 7F 16 {sn_hi} {sn_lo} 33 55 F7"
  params:
    - name: sn_hi
      type: integer
      description: Device Serial number bits 13-7
    - name: sn_lo
      type: integer
      description: Device Serial number bits 6-0
  notes: "msg type 16 (22). Bytes 10-11 reserved $33 $55."

- id: firmware_download_message
  label: Download Firmware Protocol Message
  kind: action
  command: "F0 00 01 2A 0C 7F 17 {sn_hi} {sn_lo} {len} F7"
  params:
    - name: sn_hi
      type: integer
      description: Device Serial number bits 13-7
    - name: sn_lo
      type: integer
      description: Device Serial number bits 6-0
    - name: len
      type: integer
      description: Length of message (byte 1)
  notes: "msg type 17 (23)."

- id: firmware_version_inquiry
  label: WR5 Firmware Version Inquiry
  kind: query
  command: "F0 00 01 2A 0C 7F 19 {sn_hi} {sn_lo} F7"
  params:
    - name: sn_hi
      type: integer
      description: Device Serial number bits 13-7
    - name: sn_lo
      type: integer
      description: Device Serial number bits 6-0
  notes: "msg type 19 (25)."
```

## Feedbacks
```yaml
# Device->controller responses (one per source-documented response message type).
- id: device_discovery_response
  type: object
  command: "F0 00 01 2A 0D 01 {model} {sn_hi} {sn_lo} {name[1..20]} F7"
  values:
    model: "Device model number (WR5 model = $0C)"
    sn_hi: "Serial number bits 13-7"
    sn_lo: "Serial number bits 6-0"
    name: "WR5 name characters 1-20"
  notes: "Discovery response; msg type byte7=01, model byte=$0D."

- id: settings_response
  type: object
  command: "F0 00 01 2A 0C 7F 01 {sn_hi} {sn_lo} {id} {name[1..20]} {settings[31..107]} F7"
  values:
    id: "Target Device Id"
    name: "WR5 name characters 1-20"
    options: "Byte31 bitmask: bit0=exclusive source select, bit1=disable output zone lvl, bit2=use checksums, bit6=supports LogicOut & matrix mixer (read-only)"
    zone_selection: "Bytes 32-35 (outputs 1-20 selection)"
    buttons: "Bytes 36-107 (six button config blocks: ft/ll/ul/pn + input/output assignment bitmasks)"
  notes: "msg type 01; byte6=$7F PC Device Id."

- id: preset_mute_status_response
  type: object
  command: "F0 00 01 2A 0C 00 04 00 01 {preset} {in1_7} {in8_14} {in15_20} {in_sp} {out1_7} {out8_14} {out15_20} {out_sp} F7"
  values:
    preset: "Target device preset number (24.24M preset - 1)"
    input_mutes: "Inputs 1-20 mute status bitmasks (high bit = muted)"
    output_mutes: "Outputs 1-20 mute status bitmasks (high bit = muted)"
  notes: "msg type 04."

- id: output_gain_response
  type: object
  command: "F0 00 01 2A 0C 00 06 00 01 {channel} {level} {s1_7} {s8_14} {s15_20} {s_sp} F7"
  values:
    channel: "Requested output channel (0 to n = output 1 to n+1)"
    level: "Output channel level (0-99)"
    source_mutes: "Output channel's sources 1-20 mute status bitmasks"
  notes: "msg type 06."

- id: channel_gain_response
  type: object
  command: "F0 00 01 2A 0C 00 08 00 01 {channel} {level} F7"
  values:
    channel: "0-63 = inputs 1-64; 64-127 = outputs 1-64"
    level: "Channel level (0-99)"
  notes: "msg type 08."

- id: logic_output_status_response
  type: object
  command: "F0 00 01 2A 0C 00 10 00 01 {in1_7} {in8_14} {in15_20} {in_sp} F7"
  values:
    logic_status: "Inputs 1-20 logic status bitmasks (high bit = channel high / Fet off)"
  notes: "msg type 10 (16)."

- id: matrix_mixer_response
  type: object
  command: "F0 00 01 2A 0C 00 13 00 01 {zone} {input} {level} F7"
  values:
    zone: "Output zone mixer settings are for"
    input: "Mixer input number"
    level: "Mix level"
  notes: "msg type 13 (19)."

- id: firmware_crc_error_message
  type: object
  command: "F0 00 01 2A 0C 7F 18 {sn_hi} {sn_lo} {?} {len} F7"
  values:
    unknown: "Byte 10 undocumented (?)"
    len: "Length of message (byte 1)"
  notes: "msg type 18 (24). Source labels byte 10 as '?' - UNRESOLVED."

- id: firmware_version_response
  type: object
  command: "F0 00 01 2A 0C 7F 1A {sn_hi} {sn_lo} {version} F7"
  values:
    version: "Firmware version byte"
  notes: "msg type 1A (26)."
```

## Variables
```yaml
# Settable continuous/discrete parameters surfaced via Actions; ranges from source.
- id: channel_gain_level
  type: integer
  range: [0, 99]
  description: Gain value used by Gain Message (msg 11) and Matrix Mixer Set (msg 20)

- id: preset_number
  type: integer
  range: [0, 99]
  description: Preset number used by Preset Recall (msg 09); 24.24M uses preset - 1

- id: logic_output_value
  type: enum
  values: [low_fet_on, high_fet_off]
  description: Logic output state (msg 17)

- id: button_function_type
  type: enum
  values: ["0_off", "1_preset_recall", "2_preset_scroll", "3_gain", "4_mute", "5_source_selection", "6_logic_out_active_high", "7_logic_out_active_low", "8_matrix_mixer"]
  description: WR5 button function type (settings bytes); types 6-8 added in firmware 2.0

- id: output_channel
  type: integer
  range: [0, 127]
  description: "Channel index: 0-63 = inputs 1-64; 64-127 = outputs 1-64"
```

## Events
```yaml
# Unsolicited WR5 remote notifications (remote -> host).
- id: wr5_button_pressed
  type: object
  command: "F0 00 01 2A 0C 7F 0D {sn_hi} {sn_lo} {button} F7"
  values:
    sn_hi: "Device Serial number bits 13-7"
    sn_lo: "Device Serial number bits 6-0"
    button: "WR5 button number pressed"
  notes: "msg type 0D (13); byte6=$7F PC Device Id."

- id: wr5_button_released
  type: object
  command: "F0 00 01 2A 0C 7F 0E {sn_hi} {sn_lo} F7"
  values:
    sn_hi: "Device Serial number bits 13-7"
    sn_lo: "Device Serial number bits 6-0"
  notes: "msg type 0E (14); byte6=$7F PC Device Id."
```

## Macros
```yaml
# No explicit multi-step sequences documented in source.
# UNRESOLVED: no macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or power-on
# sequencing requirements. Logic Output FET state (Fet on/off) is documented but no
# safety interlock guidance is provided.
```

## Notes
- Protocol is WR5 Remote Protocol dated 02/23/2018; framing is MIDI-like SysEx (`$F0`/`$F7`) over RS-232C. Hardware layer is logic 5V current loop (similar to MIDI) per source.
- Ashly manufacturer id = `00 01 2A`. WR5 model number byte = `$0C`; Device Discovery model byte = `$0D`.
- For 3rd-party control systems the source mandates serial bytes `00 01` (sn_hi=00, sn_lo=01) and Target Device Id `00`. For the 24.24M, use front-panel Device Id - 1 and preset number - 1.
- Checksum (msg 21) is optional: enabled only when the checksum flag bit is set in the Settings options byte. Computation: sum message bytes -> one's complement -> +1 (two's complement) -> AND `0x7F`.
- Up to 20 input and 20 output channels are addressable via the selection bitmasks (bytes packed 7 per byte across 3 bytes + 1 spare). Actual channel count of the Nxe1502Bd is not stated in this source.
- Button function types 6-8 (Logic Out Active High/Low, Matrix Mixer) were added in firmware version 2.0.

<!-- UNRESOLVED: data bits and flow control not stated in source -->
<!-- UNRESOLVED: number of physical inputs/outputs and logic outputs on the Nxe1502Bd not stated in this source -->
<!-- UNRESOLVED: firmware version compatibility range not stated -->
<!-- UNRESOLVED: firmware CRC error message byte 10 undocumented in source -->
<!-- UNRESOLVED: checksum byte insertion position (byte 11 of checksum msg refers to byte 11 of the *following* message) is ambiguously worded in source -->
````

## Provenance

```yaml
source_domains:
  - ashly.com
source_urls:
  - https://ashly.com/wp-content/uploads/2015/10/WR5_Protocol.pdf
  - https://ashly.com/wr-5-and-ina-1-protocol/
  - https://ashly.com/wp-content/uploads/2026/03/nX-amp-full-manual-r12.pdf
  - https://ashly.com/nxe-multi-mode/
retrieved_at: 2026-07-13T18:29:17.887Z
last_checked_at: 2026-10-01T11:21:00.616Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-01T11:21:00.616Z
matched_actions: 18
action_count: 18
confidence: medium
summary: "All 18 spec action units map 1:1 to source WR5 message types 0,3,5,7,9,10,11,12,15,17,18,20,21,22,23,25 with matching opcode bytes and shapes; transport 9600/1/N/1 confirmed. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "data bits not stated in source; flow control not stated; number of physical I/O channels per device not enumerated; logic output count not stated"
- "data bits not stated in source"
- "flow control not stated in source"
- "no macros described in source"
- "source contains no safety warnings, interlock procedures, or power-on"
- "data bits and flow control not stated in source"
- "number of physical inputs/outputs and logic outputs on the Nxe1502Bd not stated in this source"
- "firmware version compatibility range not stated"
- "firmware CRC error message byte 10 undocumented in source"
- "checksum byte insertion position (byte 11 of checksum msg refers to byte 11 of the *following* message) is ambiguously worded in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
