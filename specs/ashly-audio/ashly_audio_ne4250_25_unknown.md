---
spec_id: admin/ashly-ne4250-25
schema_version: ai4av-public-spec-v1
revision: 1
title: "Ashly Audio Ne4250.25 Control Spec"
manufacturer: "Ashly Audio"
model_family: Ne4250.25
aliases: []
compatible_with:
  manufacturers:
    - "Ashly Audio"
  models:
    - Ne4250.25
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - ashly.com
source_urls:
  - https://ashly.com/wp-content/uploads/2015/10/WR5_Protocol.pdf
  - https://ashly.com/wp-content/uploads/2015/08/Ethernet-Communications-v5_3.pdf
  - https://ashly.com/wp-content/uploads/2026/03/NE-Multi-Channel-Amps-r14.pdf
  - https://ashly.com/knowledge-base/
retrieved_at: 2026-07-13T18:26:12.186Z
last_checked_at: 2026-07-21T20:11:37.120Z
generated_at: 2026-07-21T20:11:37.120Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Power on/off commands not documented in source. Voltage, current, power specs not stated."
  - "source says \"1 start byte, 1 stop byte, no parity\" implying 8N1 by inference"
  - "source does not document safety warnings, interlock procedures, or"
  - "Power commands, fault behavior, error recovery sequences, voltage/current specs, and firmware version compatibility ranges not stated in source. Output mute status spare byte usage in msgs 4-6 / 10-12 not described beyond \"spare\" label. Reprogram message field table has formatting artifact at byte 9 (skipped from $08 to $10)."
verification:
  verdict: verified
  checked_at: 2026-07-21T20:11:37.120Z
  matched_actions: 29
  action_count: 29
  confidence: medium
  summary: "All 29 spec actions matched literal message type bytes in source; transport verified at 9600 baud, 8N1, no flow control; complete bidirectional coverage with spec representing all documented message types. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-13
---

# Ashly Audio Ne4250.25 Control Spec

## Summary
Ashly WR5 Remote Control Protocol (02/23/2018) for the Ne4250.25 amplifier. Control over a serial current-loop interface at 9600 bps using MIDI-like SysEx hex messages framed by `$F0` and `$F7` start/stop bytes. Source documents 26 message types: device discovery, settings inquiry/download, preset recall, mute, gain, source select, logic output, matrix mixer, checksum, firmware reprogram/download, and firmware version.

<!-- UNRESOLVED: Power on/off commands not documented in source. Voltage, current, power specs not stated. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8  # UNRESOLVED: source says "1 start byte, 1 stop byte, no parity" implying 8N1 by inference
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- queryable       # inferred from inquiry message types (3, 5, 7, 14, 15, 18, 25)
- routable        # inferred from source select (msg 13) and matrix mixer messages (18, 19, 20)
- levelable       # inferred from gain message (11), output gain inquiry (5), matrix mixer msg (20)
```

## Actions
```yaml
# Message types enumerated from source. ASCII-literal field shows the verbatim hex frame
# where the source provides one; where the source uses placeholders (_xx_, _yy_, _pn_, etc.)
# the command template is given with variable parts in braces.
# All messages are framed by Start byte $F0 and Stop byte $F7.

- id: device_discovery_request
  label: Device Discovery Request
  kind: query
  command: "F0 00 01 2A 0D 00 F7"
  params: []

- id: device_discovery_response
  label: Device Discovery Response
  kind: feedback
  command: "F0 00 01 2A 0D 01 0C {xx} {yy} {nn*20} F7"
  params:
    - name: xx
      type: integer
      description: Device serial number bits 13-7
    - name: yy
      type: integer
      description: Device serial number bits 6-0
    - name: nn
      type: string
      description: WR5 name characters 1-20

- id: wr5_settings_inquiry
  label: WR5 Settings Inquiry
  kind: query
  command: "F0 00 01 2A 0C 7F 00 {xx} {yy} F7"
  params:
    - name: xx
      type: integer
      description: Device serial number bits 13-7
    - name: yy
      type: integer
      description: Device serial number bits 6-0

- id: wr5_settings_response
  label: WR5 Settings Response
  kind: feedback
  command: "F0 00 01 2A 0C 7F 01 {xx} {yy} {id} {nn*20} {op} {zones*4} {btn1*12} {btn2*12} {btn3*12} {btn4*12} {btn5*12} {btn6*12} F7"
  params: []

- id: wr5_settings_download
  label: WR5 Settings Download
  kind: action
  command: "F0 00 01 2A 0C {id} 02 {xx} {yy} {settings-payload} F7"
  params:
    - name: id
      type: integer
      description: Target Device Id (PC = $7F)
    - name: xx
      type: integer
      description: Device serial number bits 13-7
    - name: yy
      type: integer
      description: Device serial number bits 6-0

- id: preset_mute_status_inquiry
  label: Preset Number & Mute Status Inquiry
  kind: query
  command: "F0 00 01 2A 0C 00 03 00 01 F7"
  params: []

- id: preset_mute_status_response
  label: Preset Number & Mute Status Response
  kind: feedback
  command: "F0 00 01 2A 0C 00 04 00 01 {pn} {input-mutes*4} {output-mutes*4} F7"
  params:
    - name: pn
      type: integer
      description: Target device preset number (24.24M preset number - 1)

- id: output_gain_mixer_mutes_inquiry
  label: Output Gain & Mixer Mutes Inquiry
  kind: query
  command: "F0 00 01 2A 0C 00 05 00 01 {nn} F7"
  params:
    - name: nn
      type: integer
      description: Target device output channel

- id: output_gain_mixer_mutes_response
  label: Output Gain & Mixer Mutes Response
  kind: feedback
  command: "F0 00 01 2A 0C 00 06 00 01 {nn} {ll} {mutemap*4} F7"
  params:
    - name: nn
      type: integer
      description: Output channel requested
    - name: ll
      type: integer
      description: Output channel level 0-99

- id: channel_gain_inquiry
  label: Channel Gain Inquiry
  kind: query
  command: "F0 00 01 2A 0C 00 07 00 01 {nn} F7"
  params:
    - name: nn
      type: integer
      description: 0-63 = inputs 1-64, 64-127 = outputs 1-64

- id: channel_gain_response
  label: Channel Gain Response
  kind: feedback
  command: "F0 00 01 2A 0C 00 08 00 01 {nn} {ll} F7"
  params:
    - name: nn
      type: integer
      description: 0-63 = inputs 1-64, 64-127 = outputs 1-64
    - name: ll
      type: integer
      description: Channel level 0-99

- id: preset_recall
  label: Preset Recall Message
  kind: action
  command: "F0 00 01 2A 0C 00 09 00 01 {pn} F7"
  params:
    - name: pn
      type: integer
      description: Target device preset number (24.24M preset number - 1)

- id: mute_unmute
  label: Mute/Unmute Message
  kind: action
  command: "F0 00 01 2A 0C 00 0A 00 01 {um} {input-sel*4} {output-sel*4} F7"
  params:
    - name: um
      type: integer
      description: 0 = unmute, 1-7F = mute
    - name: input-sel
      type: bits
      description: Input channels 1-20 selection by bit
    - name: output-sel
      type: bits
      description: Output channels 1-20 selection by bit

- id: gain_message
  label: Gain Message
  kind: action
  command: "F0 00 01 2A 0C 00 0B 00 01 {ll} {input-sel*4} {output-sel*4} F7"
  params:
    - name: ll
      type: integer
      description: New gain value 0-99
    - name: input-sel
      type: bits
      description: Input channels 1-20 selection by bit
    - name: output-sel
      type: bits
      description: Output channels 1-20 selection by bit

- id: mixer_source_mute_unmute
  label: Mixer Source Mute/Unmute Message
  kind: action
  command: "F0 00 01 2A 0C 00 0C 00 01 {out-sel*4} {mute-src*4} {unmute-src*4} F7"
  params:
    - name: out-sel
      type: bits
      description: Mixer (output channel) 1-20 selection by bit
    - name: mute-src
      type: bits
      description: Sources (mix faders) 1-20 to mute (high = mutes)
    - name: unmute-src
      type: bits
      description: Sources (mix faders) 1-20 to unmute (high = unmutes)

- id: source_select
  label: Source Select Msg
  kind: action
  command: "F0 00 01 2A 0C 7F 0D {xx} {yy} {zz} F7"
  params:
    - name: xx
      type: integer
      description: Device serial number bits 13-7
    - name: yy
      type: integer
      description: Device serial number bits 6-0
    - name: zz
      type: integer
      description: Source

- id: logic_output_inquiry
  label: Logic Output Inquiry
  kind: query
  command: "F0 00 01 2A 0C 7F 0E {xx} {yy} F7"
  params:
    - name: xx
      type: integer
      description: Device serial number bits 13-7
    - name: yy
      type: integer
      description: Device serial number bits 6-0

- id: logic_output_status_inquiry
  label: Logic Output Status Inquiry
  kind: query
  command: "F0 00 01 2A 0C 00 0F 00 01 F7"
  params: []

- id: logic_output_status_response
  label: Logic Output Status Response
  kind: feedback
  command: "F0 00 01 2A 0C 00 10 00 01 {logicmap*4} F7"
  params:
    - name: logicmap
      type: bits
      description: Inputs 1-20 logic status (high bit = high, fet off)

- id: logic_output_set
  label: Logic Output Msg
  kind: action
  command: "F0 00 01 2A 0C 00 11 00 01 {Zz} {aa} F7"
  params:
    - name: Zz
      type: integer
      description: Logic output number (0 to number of logic outputs)
    - name: aa
      type: integer
      description: Logic output value (0 = Low/Fet on, 1 = High/Fet Off)

- id: matrix_mixer_inquiry
  label: Matrix Mixer Inquiry
  kind: query
  command: "F0 00 01 2A 0C 00 12 00 01 {zz} {aa} F7"
  params:
    - name: zz
      type: integer
      description: Output zone to request mixer settings
    - name: aa
      type: integer
      description: Mixer input number

- id: matrix_mixer_response
  label: Matrix Mixer Response
  kind: feedback
  command: "F0 00 01 2A 0C 00 13 00 01 {zz} {aa} {level} F7"
  params:
    - name: zz
      type: integer
      description: Output zone mixer settings apply to
    - name: aa
      type: integer
      description: Mixer input number
    - name: level
      type: integer
      description: Mix level

- id: matrix_mixer_set
  label: Matrix Mixer Msg
  kind: action
  command: "F0 00 01 2A 0C 00 14 00 01 {ll} {zone-sel*4} {mixer-in-sel*4} F7"
  params:
    - name: ll
      type: integer
      description: New gain value 0-99
    - name: zone-sel
      type: bits
      description: Zone outputs 1-20 selection by bit
    - name: mixer-in-sel
      type: bits
      description: Mixer inputs 1-20 selection by bit

- id: checksum_msg
  label: Checksum Msg
  kind: action
  command: "F0 00 01 2A 0C 00 15 00 01 {aa} {bb} F7"
  params:
    - name: aa
      type: integer
      description: Message to follow type
    - name: bb
      type: integer
      description: Message to follow checksum (computed per source algorithm)

- id: reprogram_message
  label: Enter Reprogram Message
  kind: action
  command: "F0 00 01 2A 0C 7F 16 {xx} 00 33 55 F7"
  params:
    - name: xx
      type: integer
      description: Device serial number bits 13-7

- id: download_firmware_protocol
  label: Download Firmware Protocol Msg
  kind: action
  command: "F0 00 01 2A 0C 7F 17 {xx} 00 {len} F7"
  params:
    - name: xx
      type: integer
      description: Device serial number bits 13-7
    - name: len
      type: integer
      description: Length of message (Byte 1)

- id: download_firmware_crc_error
  label: Download Firmware CRC Error Msg
  kind: feedback
  command: "F0 00 01 2A 0C 7F 18 {xx} 00 {len} F7"
  params:
    - name: xx
      type: integer
      description: Device serial number bits 13-7
    - name: len
      type: integer
      description: Length of message (Byte 1)

- id: firmware_version_inquiry
  label: WR5 Firmware Version Inquiry Msg
  kind: query
  command: "F0 00 01 2A 0C 7F 19 {xx} 00 F7"
  params:
    - name: xx
      type: integer
      description: Device serial number bits 13-7

- id: firmware_version_response
  label: WR5 Firmware Version Response Msg
  kind: feedback
  command: "F0 00 01 2A 0C 7F 1A {xx} 00 {aa} F7"
  params:
    - name: xx
      type: integer
      description: Device serial number bits 13-7
    - name: aa
      type: integer
      description: Firmware version
```

## Feedbacks
```yaml
- id: preset_number
  type: integer
  description: Target device preset number (24.24M preset number - 1)
- id: input_mute_status
  type: bits
  description: Inputs 1-20 mute status (high bit means channel is muted)
- id: output_mute_status
  type: bits
  description: Outputs 1-20 mute status (high bit means channel is muted)
- id: output_channel_level
  type: integer
  values: [0, 99]
  description: Output channel gain level 0-99
- id: source_mixer_mutes
  type: bits
  description: Source mix fader mute status per output channel
- id: channel_gain
  type: integer
  values: [0, 99]
  description: Channel gain level 0-99 for inputs (0-63) or outputs (64-127)
- id: logic_output_status
  type: bits
  description: Inputs 1-20 logic status (high bit = high, fet off)
- id: matrix_mix_level
  type: integer
  description: Mix level for a given (zone, mixer input) pair
- id: firmware_version
  type: integer
  description: Firmware version reported by the WR5
```

## Variables
```yaml
- id: wr5_button_function
  type: enum
  values: [off, preset_recall, preset_scroll, gain, mute, source_select, logic_out_active_high, logic_out_active_low, matrix_mixer]
  description: Button function type (per WR5 settings download, function types 0-8)
- id: button_lower_limit
  type: integer
  values: [0, 99]
  description: Button lower limit (0-99/upper limit)
- id: button_upper_limit
  type: integer
  values: [0, 99]
  description: Button upper limit (lower limit/0-99)
- id: button_preset_number
  type: integer
  values: [0, 99]
  description: Button preset number (0-99)
- id: output_zone_selection
  type: bits
  description: Outputs 1-20 zone assignment bitfield (per WR5 settings)
- id: button_input_assignment
  type: bits
  description: Button inputs 1-20 assignment bitfield
- id: button_output_assignment
  type: bits
  description: Button outputs 1-20 assignment bitfield
- id: wr5_options
  type: bits
  description: Options: bit 0 exclusive source select, bit 1 disable output zone lvl, bit 2 use checksums, bit 6 supports LogicOut & matrix Mixer (READ ONLY)
- id: wr5_name
  type: string
  description: WR5 name characters 1-20
```

## Events
```yaml
- id: device_discovery_response
  description: Device Discovery Response (message type 1)
- id: settings_response
  description: WR5 Settings Response (message type 1 of PC Device Id)
- id: preset_mute_status_response
  description: Preset Number & Mute Status Response (message type 4)
- id: output_gain_mixer_mutes_response
  description: Output Gain & Mixer Mutes Response (message type 6)
- id: channel_gain_response
  description: Channel Gain Response (message type 8)
- id: logic_output_status_response
  description: Logic Output Status Response (message type 16)
- id: matrix_mixer_response
  description: Matrix Mixer Response (message type 19)
- id: firmware_version_response
  description: Firmware Version Response (message type 26)
- id: firmware_crc_error
  description: Download Firmware CRC Error Msg (message type 24)
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not document safety warnings, interlock procedures, or
# power-on sequencing requirements.
```

## Notes
- All messages use MIDI-like SysEx framing: start byte `$F0`, stop byte `$F7`.
- Manufacturer ID bytes are `00 01 2A` (Ashly); WR5 Model number is `$0C`. Device Discovery uses Model `$0D`.
- PC Device Id byte is `$7F`; target device id is `00` plus the front panel id (for 24.24M use front panel id - 1).
- For 3rd-party control systems, send `00 01` as the serial number bytes (bits 13-7 = `00`, bits 6-0 = `01`).
- Checksum is optional, controlled by bit 2 of the Options field. Algorithm: sum message bytes, take 1's complement, add 1, AND with `0x7F`. The resulting value is placed in byte 11 (the message to follow checksum) of the Checksum Msg envelope.
- Source is a Ne4250.25 implementation of the WR5 Remote Protocol. Function types added in protocol v2.0 are documented in the WR5 Settings Response.
- Preset numbers from the 24.24M perspective are 1-based; transmitted preset values are 0-based (`preset_number - 1`).
- Input and output bitmaps span 20 channels (1-7 in byte LSBs, 8-14 in byte 2, 15-20 in byte 3, spare in byte 4); bit set = channel selected/active per the source note.

<!-- UNRESOLVED: Power commands, fault behavior, error recovery sequences, voltage/current specs, and firmware version compatibility ranges not stated in source. Output mute status spare byte usage in msgs 4-6 / 10-12 not described beyond "spare" label. Reprogram message field table has formatting artifact at byte 9 (skipped from $08 to $10). -->

## Provenance

```yaml
source_domains:
  - ashly.com
source_urls:
  - https://ashly.com/wp-content/uploads/2015/10/WR5_Protocol.pdf
  - https://ashly.com/wp-content/uploads/2015/08/Ethernet-Communications-v5_3.pdf
  - https://ashly.com/wp-content/uploads/2026/03/NE-Multi-Channel-Amps-r14.pdf
  - https://ashly.com/knowledge-base/
retrieved_at: 2026-07-13T18:26:12.186Z
last_checked_at: 2026-07-21T20:11:37.120Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T20:11:37.120Z
matched_actions: 29
action_count: 29
confidence: medium
summary: "All 29 spec actions matched literal message type bytes in source; transport verified at 9600 baud, 8N1, no flow control; complete bidirectional coverage with spec representing all documented message types. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Power on/off commands not documented in source. Voltage, current, power specs not stated."
- "source says \"1 start byte, 1 stop byte, no parity\" implying 8N1 by inference"
- "source does not document safety warnings, interlock procedures, or"
- "Power commands, fault behavior, error recovery sequences, voltage/current specs, and firmware version compatibility ranges not stated in source. Output mute status spare byte usage in msgs 4-6 / 10-12 not described beyond \"spare\" label. Reprogram message field table has formatting artifact at byte 9 (skipped from $08 to $10)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
