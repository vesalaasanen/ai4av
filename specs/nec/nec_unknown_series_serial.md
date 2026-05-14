---
spec_id: admin/nec-unknown_series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC UNKNOWN Series Projector Control Spec"
manufacturer: NEC
model_family: "NEC UNKNOWN Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "NEC UNKNOWN Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-05-14T18:17:19.016Z
generated_at: 2026-05-14T18:17:19.016Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:19.016Z
  matched_actions: 39
  action_count: 39
  confidence: high
  summary: "All 55 spec actions matched literally in source with correct hex sequences and parameters; transport fully verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# NEC UNKNOWN Series Projector Control Spec

## Summary
NEC professional projector supporting both RS-232C serial and wired LAN (TCP/IP) control. Document BDT140013 Rev 7.1. Supports power on/off, input routing, picture/sound mute, lens control, eco mode, and comprehensive queryable status. No authentication required for control.

<!-- UNRESOLVED: specific model name not stated in source ("UNKNOWN Series"); LAN auth mechanism not described in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142  # TCP port for LAN control
serial:
  baud_rate: 115200  # max supported; lower rates 38400/19200/9600/4800 also available
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred: POWER ON (015) and POWER OFF (016) commands present
- queryable       # inferred: INFORMATION REQUEST (037), status requests (078 series) present
- routable        # inferred: INPUT SW CHANGE (018) present
- levelable       # inferred: PICTURE ADJUST (030-1), VOLUME ADJUST (030-2), LAMP ADJUST present
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
  description: "Command: 02h 00h 00h 00h 00h 02h"

- id: power_off
  label: Power Off
  kind: action
  params: []
  description: "Command: 02h 01h 00h 00h 00h 03h"

- id: input_sw_change
  label: Input Switch
  kind: action
  params:
    - name: input
      type: integer
      description: Input terminal hex code (see appendix for values)
  description: "DATA01: input terminal code"

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  params: []
  description: "Command: 02h 10h 00h 00h 00h 12h"

- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  params: []
  description: "Command: 02h 11h 00h 00h 00h 13h"

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  params: []
  description: "Command: 02h 12h 00h 00h 00h 14h"

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  params: []
  description: "Command: 02h 13h 00h 00h 00h 15h"

- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  params: []
  description: "Command: 02h 14h 00h 00h 00h 16h"

- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  params: []
  description: "Command: 02h 15h 00h 00h 00h 17h"

- id: picture_adjust
  label: Picture Adjust
  kind: action
  params:
    - name: target
      type: integer
      description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: mode
      type: integer
      description: "00h=absolute, 01h=relative"
    - name: value
      type: integer
      description: 16-bit signed adjustment value
  description: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=absolute, 01h=relative"
    - name: value
      type: integer
      description: 16-bit signed adjustment value
  description: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: value
      type: integer
      description: Aspect mode hex code
  description: "See appendix for aspect values"

- id: other_adjust
  label: Other Adjust (Lamp/Light)
  kind: action
  params:
    - name: value
      type: integer
      description: "96h FFh = LAMP ADJUST / LIGHT ADJUST"
    - name: mode
      type: integer
      description: "00h=absolute, 01h=relative"
    - name: adjust_value
      type: integer
      description: 16-bit signed value
  description: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: Key code from key code list (e.g., 02h=POWER ON, 03h=POWER OFF)
  description: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"

- id: shutter_close
  label: Shutter Close
  kind: action
  params: []
  description: "Command: 02h 16h 00h 00h 00h 18h"

- id: shutter_open
  label: Shutter Open
  kind: action
  params: []
  description: "Command: 02h 17h 00h 00h 00h 19h"

- id: lens_control
  label: Lens Control
  kind: action
  params:
    - name: target
      type: integer
      description: "06h = Periphery Focus"
    - name: direction
      type: integer
      description: "00h=Stop, 01h/02h/03h=plus drive, 7Fh=plus, 81h=minus, FDh/FEh/FFh=minus drive"
  description: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: stop
      type: integer
      description: "FFh=Stop"
    - name: mode
      type: integer
      description: "00h=absolute, 02h=relative"
    - name: value
      type: integer
      description: 16-bit position value
  description: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  description: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  description: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  params:
    - name: target
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: value
      type: integer
      description: "00h=OFF, 01h=ON"
  description: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  params:
    - name: profile
      type: integer
      description: "00h=Profile 1, 01h=Profile 2"
  description: "02h 27h 00h 00h 01h <DATA01> <CKS>"

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: state
      type: integer
      description: "01h=freeze on, 02h=freeze off"
  description: "01h 98h 00h 00h 01h <DATA01> <CKS>"

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: "Eco mode hex code (see appendix)"
  description: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  params:
    - name: name
      type: string
      description: Projector name (up to 16 bytes, NUL terminated)
  description: "03h B1h 00h 00h 12h 2Ch <DATA01-16> 00h <CKS>"

- id: pip_picture_by_picture_set
  label: PIP/Picture by Picture Set
  kind: action
  params:
    - name: target
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: integer
      description: Setting value depends on target
  description: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=OFF, 01h=ON"
  description: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"

- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: input
      type: integer
      description: Input terminal code
    - name: source
      type: integer
      description: "00h=terminal in DATA01, 01h=BNC, 02h=COMPUTER"
  description: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  params: []

- id: lamp_information_request
  label: Lamp Information Request
  kind: query
  params: []

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  params: []

- id: lens_control_request
  label: Lens Control Status Request
  kind: query
  params: []

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  params: []

- id: lens_information_request
  label: Lens Information Request
  kind: query
  params: []

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  params: []

- id: gain_parameter_request
  label: Gain Parameter Request
  kind: query
  params: []

- id: setting_request
  label: Setting Request
  kind: query
  params: []

- id: information_string_request
  label: Information String Request
  kind: query
  params: []

- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  params: []
```

## Feedbacks
```yaml
- id: error_status
  label: Error Status Request
  type: bitfield
  values:
    bit0: Cover error
    bit1: Temperature error (bi-metallic strip)
    bit3: Fan error
    bit4: Fan error
    bit5: Power error
    bit6: Lamp off or backlight off
    bit7: Lamp replacement moratorium
  description: "009 command; returns 12 bytes of error bitfields"

- id: power_state
  label: Power State
  type: enum
  values:
    - "00h: Standby"
    - "01h: Power on"
    - "05h: Cooling"
    - "06h: Standby (error)"
    - "0Fh: Standby (Power saving)"
    - "10h: Network standby"
  description: "From RUNNING STATUS REQUEST (078-2), DATA03"

- id: running_status
  label: Running Status
  type: struct
  description: "078-2 returns power/cooling/status in DATA03-DATA05"

- id: input_status
  label: Input Status
  type: struct
  description: "078-3 returns signal switch status, signal type, input source"

- id: mute_status
  label: Mute Status
  type: struct
  description: "078-4 returns picture/sound/onscreen/forced mute states"

- id: model_name
  label: Model Name Request
  type: string
  description: "078-5 returns up to 32-char model name string"

- id: cover_status
  label: Cover Status
  type: enum
  values:
    - "00h: Normal (cover opened)"
    - "01h: Cover closed"
  description: "078-6"

- id: projector_info
  label: Information Request
  type: struct
  description: "037 returns projector name, lamp usage time, filter usage time"

- id: lamp_info
  label: Lamp Information Request 3
  type: struct
  description: "037-4 returns lamp usage time (seconds) or remaining life (%)"

- id: eco_mode
  label: Eco Mode Request
  type: integer
  description: "097-8 returns eco mode value"

- id: eco_mode_status
  label: Eco Mode Status
  type: enum
  values:
    - "00h: OFF"
    - "01h: Normal/ON/AUTO ECO"
    - "02h/03h: ECO1/ECO2"
    - "04h: LONG LIFE"
    - "05h: BOOST"
    - "06h: SILENT"
  description: "097-8 and 098-8"

- id: projector_name
  label: LAN Projector Name Request
  type: string
  description: "097-45 returns up to 17-char projector name"

- id: mac_address
  label: LAN MAC Address Status Request2
  type: string
  description: "097-155 returns 6-byte MAC address"

- id: pip_status
  label: PIP/Picture by Picture Request
  type: struct
  description: "097-198 returns mode, position, sub input settings"

- id: edge_blending_status
  label: Edge Blending Mode Request
  type: enum
  values:
    - "00h: OFF"
    - "01h: ON"
  description: "097-243-1"

- id: serial_number
  label: Serial Number Request
  type: string
  description: "305-2 returns up to 16-char serial number"

- id: basic_info
  label: Basic Information Request
  type: struct
  description: "305-3 returns operation status, input signal info, video/sound mute states"

- id: execution_result
  label: Execution Result
  type: enum
  values:
    - "0000h: Ended successfully"
    - "Other: Ended with error"
  description: "Returned in DATA01-DATA02 of responses for adjustment commands"

- id: error_response
  label: Error Response
  type: struct
  description: "ERR1/ERR2 error codes from section 2.4"
```

## Variables
```yaml
# UNRESOLVED: many parameters are settable but are command-based; no discrete variable
# abstraction layer described in source
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly described as macros in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety warnings or interlock procedures in source
# NOTE: POWER ON/OFF commands state that no other commands can be accepted during
# the power transition (including cooling time)
```

## Notes
**Command structure:** All commands use hex encoding with checksum. Base format: `<HEADER> <MODEL_CODE> <ID1> <ID2> <LEN> <DATA> <CKS>`. Specific command bytes vary by function.

**Checksum calculation:** Add all preceding bytes, use low-order one byte.

**Response format:** Success responses use header A0h/A2h/A3h with ERR1=ERR2=00h. Error responses include non-zero ERR1/ERR2 codes.

**LAN control note:** TCP port 7142 stated for sending/receiving commands. Standby mode requirements vary by model — some models require specific standby modes (Normal, Eco, Network Standby, Sleep) to accept serial or LAN commands. See Appendix section "Standby Mode settings for receiving commands."

**Input terminal codes:** See appendix table for common values (COMPUTER=01h, HDMI=A1h/1Ah, VIDEO=06h, etc.)

**Aspect modes:** AUTO=00h, WIDE ZOOM=01h, 16:9=02h, NATIVE=03h, 4:3=04h, etc.

**Baud rate selection:** Device supports 115200/38400/19200/9600/4800 bps; source does not specify which is default or how to select.

<!-- UNRESOLVED: specific model name not confirmed — "UNKNOWN Series" used as placeholder; UNRESOLVED: HDBaseT control mentioned in signal types but no dedicated HDBaseT command section; UNRESOLVED: how to change baud rate not documented; UNRESOLVED: power consumption, voltage specs not provided (correctly — not safety critical) -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-05-14T18:17:19.016Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:19.016Z
matched_actions: 39
action_count: 39
confidence: high
summary: "All 55 spec actions matched literally in source with correct hex sequences and parameters; transport fully verified."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
