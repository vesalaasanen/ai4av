---
spec_id: admin/bss-audio-sw9026
schema_version: ai4av-public-spec-v1
revision: 1
title: "BSS Audio SW9016/SW9026 Matrix Device Serial Control Spec"
manufacturer: "BSS Audio"
model_family: SW9016
aliases: []
compatible_with:
  manufacturers:
    - "BSS Audio"
  models:
    - SW9016
    - SW9026
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - bssaudio.com
source_urls:
  - https://bssaudio.com/en/product_documents/9016-9026_serial_protocolpdf--2
retrieved_at: 2026-07-01T13:59:56.719Z
last_checked_at: 2026-07-07T11:07:19.598Z
generated_at: 2026-07-07T11:07:19.598Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source describes serial framing only; no TCP/IP control details are specified for the SW9026 despite the known protocol hint"
  - "stop_bits not explicitly stated in source; standard 1 inferred for 8N1 framing with no parity"
  - "source does not document settable scalar parameters beyond the discrete commands above; section retained for completeness"
  - "source does not document unsolicited notifications from the device"
  - "source does not document multi-step sequences"
  - "source contains no safety warnings, interlock procedures, or power-on sequencing requirements"
  - "firmware version compatibility not stated in source"
  - "TCP/IP control details not specified in source despite known-protocol hint; spec is serial-only"
  - "port number not stated in source (serial transport only)"
  - "stop_bits not explicitly stated in source"
verification:
  verdict: verified
  checked_at: 2026-07-07T11:07:19.598Z
  matched_actions: 14
  action_count: 14
  confidence: medium
  summary: "All 14 spec actions match source opcodes exactly; transport parameters verified; complete bidirectional coverage. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-01
---

# BSS Audio SW9016/SW9026 Matrix Device Serial Control Spec

## Summary
This spec covers the serial control protocol used between Soundweb and the SW9016/SW9026 matrix device expansion boxes. Communication uses 8-bit serial at 38400 bps with no parity, framed by STX/ETX with an XOR checksum and using single-byte command opcodes.

<!-- UNRESOLVED: source describes serial framing only; no TCP/IP control details are specified for the SW9026 despite the known protocol hint -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 38400
  data_bits: 8
  parity: none
  flow_control: none
  stop_bits: 1
# UNRESOLVED: stop_bits not explicitly stated in source; standard 1 inferred for 8N1 framing with no parity
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- routable  # inferred from SET_CROSSPOINT command examples
- queryable  # inferred from REQUEST_VALUE / REQUEST_I/O / GET_PRESET / ID_REQUEST command examples
```

## Actions
```yaml
# SET_VALUE
- id: set_value
  label: Set Value (legacy opcode)
  kind: action
  command: "STX 0x80 <body> <xor_checksum> ETX"
  params:
    - name: body
      type: bytes
      description: Command-specific body bytes (param id + value), per vendor convention. XOR checksum is computed over body.
  notes: "0x80 SET_VALUE; legacy opcode retained for AMX system compatibility."

# SET_STRING
- id: set_string
  label: Set String (legacy opcode)
  kind: action
  command: "STX 0x81 <body> <xor_checksum> ETX"
  params:
    - name: body
      type: bytes
      description: Command-specific body bytes (param id + string), per vendor convention.
  notes: "0x81 SET_STRING; legacy opcode retained for AMX system compatibility."

# REQUEST_VALUE
- id: request_value
  label: Request Value (legacy opcode)
  kind: query
  command: "STX 0x82 <body> <xor_checksum> ETX"
  params:
    - name: body
      type: bytes
      description: Command-specific body bytes identifying the value to query.
  notes: "0x82 REQUEST_VALUE; legacy opcode retained for AMX system compatibility."

# REQUEST_STRING
- id: request_string
  label: Request String (legacy opcode)
  kind: query
  command: "STX 0x83 <body> <xor_checksum> ETX"
  params:
    - name: body
      type: bytes
      description: Command-specific body bytes identifying the string to query.
  notes: "0x83 REQUEST_STRING; legacy opcode retained for AMX system compatibility."

# RAW_MSG
- id: raw_msg
  label: Raw Message
  kind: action
  command: "STX 0x84 <body> <xor_checksum> ETX"
  params:
    - name: body
      type: bytes
      description: Raw message body bytes.
  notes: "0x84 RAW_MSG."

# SET_CROSSPOINT
- id: set_crosspoint
  label: Set Crosspoint
  kind: action
  command: "STX 0x85 <group> <output> <input> <level> <xor_checksum> ETX"
  params:
    - name: group
      type: byte
      description: "Group byte identifying crosspoint type and addressed box. Bit field: bit 7 (F)=follow-video, bit 6 (V)=video, bit 5 (A)=audio, bit 4 (r)=reserved, bit 3 (id)=device id (0=A,1=B), bits 2-0=device address. Examples: AudioA_no_video=0x01, AudioB_no_video=0x11, VideoA_no_video=0x02, VideoB_no_video=0x12, FollowA_no_video=0x03, FollowB_no_video=0x13, AudioA_video=0x81, AudioB_video=0x91, VideoA_video=0x82, VideoB_video=0x92, FollowA_video=0x83, FollowB_video=0x93."
    - name: output
      type: byte
      description: "Output number of the crosspoint switch being addressed."
    - name: input
      type: byte
      description: "Input number for the specified output."
    - name: level
      type: byte
      description: "Gain value for the specified output. Send 192 (0xC0) if not using this field."
  notes: "0x85 SET_CROSSPOINT. Box 'A' returns ACK; messages for outputs 5-8 (box 'B') are ACKed by box 'A' but not actioned there."

# SET_I/O
- id: set_io
  label: Set Control I/O
  kind: action
  command: "STX 0x86 <group> <id> <data0> <data1> <xor_checksum> ETX"
  params:
    - name: group
      type: byte
      description: "Group byte identifying the control type and addressed box. Bit field: bit 4 (C)=control(0)/logic(1), bit 0 (l)=device address (0=A, 1=B). Examples: EXP_ControlA=0x00, EXP_ControlB=0x10, EXP_LogicA=0x01, EXP_LogicB=0x11."
    - name: id
      type: byte
      description: "Number of the output of the crosspoint switch being addressed."
    - name: data0
      type: byte
      description: "Input number for the specified output."
    - name: data1
      type: byte
      description: "Gain value for the specified output. Send 192 (0xC0) if not using this field."

# REQUEST_I/O
- id: request_io
  label: Request Control I/O
  kind: query
  command: "STX 0x87 <group> <id> <data0> <data1> <xor_checksum> ETX"
  params:
    - name: group
      type: byte
      description: "Group byte identifying the control type and addressed box. Same encoding as SET_I/O."
    - name: id
      type: byte
      description: "Number of the output of the crosspoint switch being addressed."
    - name: data0
      type: byte
      description: "Input number for the specified output."
    - name: data1
      type: byte
      description: "Gain value for the specified output. Send 192 (0xC0) if not using this field."
  notes: "Expansion box responds with a SET_I/O message for the same control."

# SET_BAUDRATE
- id: set_baudrate
  label: Set Secondary Baud Rate
  kind: action
  command: "STX 0x88 <group> <baud_index> <xor_checksum> ETX"
  params:
    - name: group
      type: byte
      description: "Byte identifying which box is being addressed."
    - name: baud_index
      type: byte
      description: "Baud rate index: 0=300, 1=1200, 2=2400, 3=9600, 4=19200, 5=38400, 6=115200."
  notes: "If device is in 'force 38k4' mode, only ACK is returned. Otherwise device ACKs at current baud, switches to new baud, awaits ACK from PC, then ACKs again at new baud. On timeout, device returns to original baud."

# SET_CROSSPOINT_IN_PRESET
- id: set_crosspoint_in_preset
  label: Set Crosspoint In Preset
  kind: action
  command: "STX 0x89 <group> <output> <input> <level> <preset> <xor_checksum> ETX"
  params:
    - name: group
      type: byte
      description: "Byte identifying which box is being addressed."
    - name: output
      type: byte
      description: "Output number of the crosspoint switch being addressed."
    - name: input
      type: byte
      description: "Input number for the specified output."
    - name: level
      type: byte
      description: "Gain value for the specified output. Set 192 (0xC0) if not used."
    - name: preset
      type: byte
      description: "Preset number that the previous four parameters refer to. If preset=0 the current state of the matrix is updated."
  notes: "0x89 SET_CROSSPOINT_IN_PRESET."

# COPY_PRESET
- id: copy_preset
  label: Copy Preset
  kind: action
  command: "STX 0x8A <group> <source> <destination> <xor_checksum> ETX"
  params:
    - name: group
      type: byte
      description: "Byte identifying which box is being addressed."
    - name: source
      type: byte
      description: "Preset number of the source preset."
    - name: destination
      type: byte
      description: "Preset number of the destination preset."

# CLEAR_PRESET
- id: clear_preset
  label: Clear Preset
  kind: action
  command: "STX 0x8B <group> <preset> <xor_checksum> ETX"
  params:
    - name: group
      type: byte
      description: "Byte identifying which box is being addressed."
    - name: preset
      type: byte
      description: "Preset number of the preset to be cleared."

# GET_PRESET
- id: get_preset
  label: Get Preset
  kind: query
  command: "STX 0x8C <group> <preset> <xor_checksum> ETX"
  params:
    - name: group
      type: byte
      description: "Byte identifying which box is being addressed."
    - name: preset
      type: byte
      description: "Preset number of the requested preset."
  notes: "Device responds with 0x8C <group> followed by 20 preset bytes: input for audio out 1..8, level for audio out 1..8, input for video out 1..4."

# ID_REQUEST
- id: id_request
  label: Device Identification Request
  kind: query
  command: "STX 0x8D <group> <xor_checksum> ETX"
  params:
    - name: group
      type: byte
      description: "Byte identifying which box is being addressed."
  notes: "Device responds with 0x8D <group> <baud_index> <mem_map> <led_map> <version>. baud_index is user-defined baud rate; mem_map is a bit map of loaded presets; led_map is a bit map of front panel LEDs; version is the firmware version."
```

## Feedbacks
```yaml
- id: ack
  type: enum
  values: [received]
  description: "0x06 ACK control byte returned within 1 second of receiving ETX when a message is received successfully and the command has been completed."

- id: nak
  type: enum
  values: [error]
  description: "0x15 NAK control byte returned within 1 second of receiving ETX (or last character) when a message is received unsuccessfully."

- id: baud_rate_user
  type: integer
  description: "User-defined baud rate index returned in ID_REQUEST response: 0=300, 1=1200, 2=2400, 3=9600, 4=19200, 5=38400, 6=115200."

- id: preset_map
  type: bytes
  description: "mem_map byte from ID_REQUEST response: bit map of which presets are loaded (bit 0=preset 1, bit 1=preset 2, etc.)."

- id: led_map
  type: bytes
  description: "led_map byte from ID_REQUEST response: bit map of front panel LEDs."

- id: firmware_version
  type: integer
  description: "version byte from ID_REQUEST response: firmware version number."

- id: preset_configuration
  type: bytes
  description: "20-byte preset configuration returned by GET_PRESET: input for audio out 1..8, level for audio out 1..8, input for video out 1..4."
```

## Variables
```yaml
# UNRESOLVED: source does not document settable scalar parameters beyond the discrete commands above; section retained for completeness
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited notifications from the device
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step sequences
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or power-on sequencing requirements
```

## Notes
- Source document is dated 7th Feb 2003 and is marked "Preliminary information only".
- All messages are framed as: STX <body> <xor_checksum> ETX, where the checksum is XOR of all body bytes. If the resulting checksum byte is a special character (0x02, 0x03, 0x06, 0x15, 0x1B), it must be substituted: 0x02→0x1B 0x82, 0x03→0x1B 0x83, 0x06→0x1B 0x86, 0x15→0x1B 0x95, 0x1B→0x1B 0x9B.
- Special bytes within the message body that must be escaped: 0x02→0x1B 0x82, 0x03→0x1B 0x83, 0x06→0x1B 0x86, 0x15→0x1B 0x95, 0x1B→0x1B 0x9B. Any other single byte may be used in the body without escaping.
- SET_CROSSPOINT group byte: bit 7 = audio-follows-video flag, bit 6 = video, bit 5 = audio, bit 3 = device id (0=A, 1=B). Bits 2-0 identify the box (0000/1000=A, 0001/1001=B).
- SET_BAUDRATE behavior depends on whether the unit is in 'force 38k4' mode.
- Only box 'A' returns ACK to Soundweb. Box 'A' ACKs but does not action messages addressed to box 'B' outputs.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: TCP/IP control details not specified in source despite known-protocol hint; spec is serial-only -->
<!-- UNRESOLVED: port number not stated in source (serial transport only) -->
<!-- UNRESOLVED: stop_bits not explicitly stated in source -->

## Provenance

```yaml
source_domains:
  - bssaudio.com
source_urls:
  - https://bssaudio.com/en/product_documents/9016-9026_serial_protocolpdf--2
retrieved_at: 2026-07-01T13:59:56.719Z
last_checked_at: 2026-07-07T11:07:19.598Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T11:07:19.598Z
matched_actions: 14
action_count: 14
confidence: medium
summary: "All 14 spec actions match source opcodes exactly; transport parameters verified; complete bidirectional coverage. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source describes serial framing only; no TCP/IP control details are specified for the SW9026 despite the known protocol hint"
- "stop_bits not explicitly stated in source; standard 1 inferred for 8N1 framing with no parity"
- "source does not document settable scalar parameters beyond the discrete commands above; section retained for completeness"
- "source does not document unsolicited notifications from the device"
- "source does not document multi-step sequences"
- "source contains no safety warnings, interlock procedures, or power-on sequencing requirements"
- "firmware version compatibility not stated in source"
- "TCP/IP control details not specified in source despite known-protocol hint; spec is serial-only"
- "port number not stated in source (serial transport only)"
- "stop_bits not explicitly stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
