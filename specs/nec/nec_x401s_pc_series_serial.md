---
schema_version: ai4av-public-spec-v1
device_id: nec/x401s-pc-series
entity_id: nec_x401s_pc_series
spec_id: admin/nec-x401s-pc-series
revision: 1
author: admin
title: "NEC X401S-PC Series Control Spec"
status: published
manufacturer: NEC
manufacturer_key: nec
model_family: "X401S-PC Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "X401S-PC Series"
  firmware: ""  # UNRESOLVED: firmware version not stated in source
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: nec_x401s_pc_series_serial.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T21:34:40.338Z
retrieved_at: 2026-04-25T21:34:40.338Z
last_checked_at: 2026-04-25T21:34:40.338Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: ""  # UNRESOLVED: firmware version not stated in source
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-25T21:34:40.338Z
  matched_actions: 55
  action_count: 55
  confidence: high
  summary: "All 55 spec actions matched to source; transport params verified; bidirectional coverage complete."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# NEC X401S-PC Series Control Spec

## Summary
NEC X401S-PC Series professional projector controllable via RS-232C serial and wired LAN (TCP port 7142). Supports power control, input routing, picture/sound muting, volume/brightness/contrast adjustment, lens positioning, and comprehensive status querying. Command protocol uses hex-encoded binary packets with checksum validation.

<!-- UNRESOLVED: LAN authentication method not described in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142  # stated: TCP port 7142 for LAN sending/receiving
serial:
  baud_rate: null  # UNRESOLVED: multiple baud rates supported (115200/38400/19200/9600/4800 bps); default not stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not documented
auth:
  type: none  # inferred: no auth/login procedure in source
```

## Traits
```yaml
- powerable  # POWER ON/OFF commands present
- routable   # INPUT SW CHANGE command present
- queryable  # multiple status/information request commands present
- levelable  # VOLUME ADJUST, PICTURE ADJUST, GAIN PARAMETER REQUEST present
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
  description: Turns on projector power. No other command accepted during execution.

- id: power_off
  label: Power Off
  kind: action
  params: []
  description: Turns off projector power including cooling time. No other command accepted during cooling.

- id: input_sw_change
  label: Input Switch Change
  kind: action
  params:
    - name: input
      type: string
      description: Hex code of input terminal (e.g., 01h=COMPUTER, 06h=VIDEO, A1h=HDMI)

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  params: []
  description: Turns picture mute on. Canceled by input/signal switch.

- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  params: []

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  params: []
  description: Turns sound mute on. Canceled by input/signal switch or volume adjustment.

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  params: []

- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  params: []
  description: Turns onscreen mute on. Canceled by input/signal switch.

- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  params: []

- id: picture_adjust
  label: Picture Adjust
  kind: action
  params:
    - name: target
      type: string
      description: Adjustment target (00h=brightness, 01h=contrast, 02h=color, 03h=hue, 04h=sharpness)
    - name: mode
      type: string
      description: "00h=absolute value, 01h=relative value"
    - name: value
      type: integer
      description: Adjustment value (16-bit, low-order byte first)

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: string
      description: "00h=absolute value, 01h=relative value"
    - name: value
      type: integer
      description: Adjustment value (16-bit, low-order byte first)

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: value
      type: string
      description: Aspect hex code (00h=auto, 01h=wide zoom, 02h=16:9, 03h=native, 04h=4:3, etc.)

- id: lamp_adjust
  label: Lamp/Light Adjust
  kind: action
  params:
    - name: mode
      type: string
      description: "00h=absolute value, 01h=relative value"
    - name: value
      type: integer
      description: Adjustment value (16-bit, low-order byte first)

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: Key code (e.g., 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 0Ah=UP, etc.)

- id: shutter_close
  label: Shutter Close
  kind: action
  params: []
  description: Closes lens shutter.

- id: shutter_open
  label: Shutter Open
  kind: action
  params: []
  description: Opens lens shutter.

- id: lens_control
  label: Lens Control
  kind: action
  params:
    - name: target
      type: string
      description: "06h=Periphery Focus"
    - name: direction
      type: string
      description: "00h=stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=continuous+, 81h=continuous-, FDh=-0.25s, FEh=-0.5s, FFh=-1s"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: action
      type: string
      description: "FFh=stop"
    - name: mode
      type: string
      description: "00h=absolute value, 02h=relative value"
    - name: value
      type: integer
      description: Adjustment value (16-bit)

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  params:
    - name: action
      type: string
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  params:
    - name: action
      type: string
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  params:
    - name: option
      type: string
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: value
      type: string
      description: "00h=OFF, 01h=ON"

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  params:
    - name: profile
      type: integer
      description: "0=Profile 1, 1=Profile 2"

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  params:
    - name: mode
      type: string
      description: Eco mode hex code (00h=off, 01h=normal/auto, 02h=eco, 03h=eco2, 04h=long life, 06h=silent, 05h=boost)

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  params:
    - name: name
      type: string
      description: Projector name (up to 16 bytes, NUL-terminated)

- id: pip_pbp_set
  label: PIP/Picture-by-Picture Set
  kind: action
  params:
    - name: target
      type: string
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: string
      description: Setting value (varies by target)

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  params:
    - name: mode
      type: string
      description: "00h=OFF, 01h=ON"

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: action
      type: string
      description: "01h=freeze on, 02h=freeze off"

- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: input
      type: string
      description: Input terminal hex code
    - name: source
      type: string
      description: "00h=terminal in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
- id: error_status
  label: Error Status Request
  type: bitfield
  params: []
  description: Returns 12 bytes of error information. Bit=1 indicates error.

- id: command_response
  label: Command Response
  type: enum
  values:
    - success: no data returned (no-data commands) or data returned (data-request commands)
    - error: ERR1/ERR2 codes indicate cause
  description: "Response format: A2h/22h/23h + <ID1><ID2> + LEN + [ERR1][ERR2] + CKS (error) or data fields + CKS (success)"

- id: input_switch_response
  label: Input Switch Response
  type: enum
  values:
    - FFh: ended with error
  description: FFh returned when no signal switch occurs.

- id: picture_adjust_response
  label: Picture Adjust Response
  type: hex
  description: "0000h=success, other=error"

- id: volume_adjust_response
  label: Volume Adjust Response
  type: hex
  description: "0000h=success, other=error"

- id: information_request_response
  label: Information Request Response
  type: structured
  description: "DATA01-49: projector name (NUL), DATA83-86: lamp usage (sec), DATA87-90: filter usage (sec)"

- id: filter_usage_info
  label: Filter Usage Info
  type: structured
  description: "DATA01-04: filter usage time (sec), DATA05-08: filter alarm start time (sec), -1 if undefined"

- id: lamp_info_request_3
  label: Lamp Info Request 3
  type: structured
  description: "Returns lamp usage time (sec) or remaining life (%). Remaining life negative if deadline exceeded."

- id: carbon_savings_info
  label: Carbon Savings Info
  type: structured
  description: "DATA01: 00h=total, 01h=operation. DATA02-05: kg (max 99999), DATA06-09: mg (max 999999)"

- id: lens_control_request
  label: Lens Control Request
  type: structured
  description: "Returns adjustment range limits and current value (16-bit little-endian)"

- id: lens_info_request
  label: Lens Info Request
  type: structured
  description: "Bitfield: Bit0=lens memory, Bit1=zoom, Bit2=focus, Bit3=lens shift H, Bit4=lens shift V"

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  type: structured
  description: "Returns adjustment status, range limits, default, current value, width for specified gain"

- id: setting_request
  label: Setting Request
  type: structured
  description: "Returns base model type, sound function, profile number in DATA01-32"

- id: running_status_request
  label: Running Status Request
  type: structured
  description: "DATA03: power (00h=standby, 01h=on), DATA04: cooling status, DATA05: on/off process, DATA06: operation status"

- id: input_status_request
  label: Input Status Request
  type: structured
  description: "Returns signal switch process, signal list number, signal types, test pattern display, content display"

- id: mute_status_request
  label: Mute Status Request
  type: structured
  description: "DATA01: picture mute, DATA02: sound mute, DATA03: onscreen mute, DATA04: forced onscreen mute, DATA05: onscreen display"

- id: model_name_request
  label: Model Name Request
  type: string
  description: "Returns model name (up to 32 chars, NUL-terminated)"

- id: cover_status_request
  label: Cover Status Request
  type: enum
  values:
    - "00h: normal (cover open)"
    - "01h: cover closed"

- id: info_string_request
  label: Info String Request
  type: structured
  description: "DATA01: info type (03h=horizontal freq, 04h=vertical freq), DATA02: string length, DATA03-??: string (NUL)"

- id: eco_mode_request
  label: Eco Mode Request
  type: string
  description: "Returns eco mode hex code"

- id: lan_projector_name_request
  label: LAN Projector Name Request
  type: string
  description: "Returns projector name (up to 17 bytes, NUL-terminated)"

- id: lan_mac_address_request2
  label: LAN MAC Address Request 2
  type: string
  description: "Returns 6-byte MAC address"

- id: pip_pbp_request
  label: PIP/PBP Request
  type: structured
  description: "Returns current settings for MODE, START POSITION, or SUB INPUT"

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  type: enum
  values:
    - "00h: OFF"
    - "01h: ON"

- id: serial_number_request
  label: Serial Number Request
  type: string
  description: "Returns serial number (up to 16 bytes, NUL-terminated)"

- id: basic_info_request
  label: Basic Info Request
  type: structured
  description: "Returns operation status, content display, signal type, mute states, freeze status"

- id: audio_select_response
  label: Audio Select Response
  type: enum
  values:
    - "00h: success"
    - "01h: error"
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters outside action commands documented
```

## Events
```yaml
# UNRESOLVED: source does not describe unsolicited notifications from projector
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly described in source
```

## Safety
```yaml
confirmation_required_for:
  - power_on  # "While this command is turning on the power, no other command can be accepted."
  - power_off  # "While this command is turning off the power (including the cooling time), no other command can be accepted."
interlocks:
  - command_rejection_during_power_transition: "POWER ON/OFF commands block all other commands during execution/cooling"
  - standby_mode_requirement: "Some models require specific standby modes (Normal/Active/Eco/Normal/Network Standby/Sleep/Off/On/Standby Power On for serial; Normal/Normal/Network Standby/Sleep/HDBaseT Standby/Off/On/Standby Power On for LAN)"
  - mute_cancellation_triggers: "Picture/sound/onscreen mute auto-cancel on input switch, video signal switch, or volume adjustment"
# UNRESOLVED: no explicit interlock procedures or safety warnings beyond command timing notes
```

## Notes
- Command format: `[Header][ModelCode][ID1][ID2][LEN][DATA...][CKS]` — all values hex
- Header values: 00h=request without data, 01h=request with data, 02h=control command, 03h=set command
- Checksum (CKS): low-order byte of sum of all preceding bytes
- ID1=control ID (set for projector), ID2=model code (varies by model)
- Successful response: A2h/22h/23h + `<ID1><ID2>` + LEN + data + CKS
- Error response: A0h/A1h/A3h + `<ID1><ID2>` + 02h + `[ERR1][ERR2]` + CKS
- Error codes: 00h00h=unrecognized, 00h01h=unsupported, 01h00h=invalid value, 02h0Dh=power off reject, 02h0Fh=no authority, others per table
- LAN uses TCP port 7142; no authentication method documented
- Serial supports 115200/38400/19200/9600/4800 bps — default not specified
- Input terminal hex codes vary across models (appendix lists common values)
- Lamp/filter usage times updated at 1-minute intervals despite 1-second resolution
- Lens commands: continuous drive (7Fh/81h) can be stopped by sending 00h

<!-- UNRESOLVED: TCP/IP protocol details beyond port 7142 not documented -->
<!-- UNRESOLVED: HDBaseT control support mentioned in standby modes but not detailed -->
<!-- UNRESOLVED: full input terminal code table not provided (appendix references supplementary doc) -->
<!-- UNRESOLVED: aspect value codes partially listed — some modes have dual codes -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: nec_x401s_pc_series_serial.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T21:34:40.338Z
retrieved_at: 2026-04-25T21:34:40.338Z
last_checked_at: 2026-04-25T21:34:40.338Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T21:34:40.338Z
matched_actions: 55
action_count: 55
confidence: high
summary: "All 55 spec actions matched to source; transport params verified; bidirectional coverage complete."
```

## Known Gaps

```yaml
[]
```
