---
spec_id: admin/rako-rav232
schema_version: ai4av-public-spec-v1
revision: 1
title: "Rako RAV232 & RAV232+ RF Interface Control Spec"
manufacturer: Rako
model_family: RAV232
aliases: []
compatible_with:
  manufacturers:
    - Rako
  models:
    - RAV232
    - RAV232+
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - rakocontrols.com
retrieved_at: 2026-04-30T04:28:54.023Z
last_checked_at: 2026-04-26T22:32:30.100Z
generated_at: 2026-04-26T22:32:30.100Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-26T22:32:30.100Z
  matched_actions: 16
  action_count: 16
  confidence: high
  summary: "All 16 spec actions matched literal source commands with correct parameters and transport configuration verified against datasheet."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# Rako RAV232 & RAV232+ RF Interface Control Spec

## Summary
Rako RAV232 (unidirectional) and RAV232+ (bidirectional) are RS-232 RF interfaces for Rako lighting control systems. Both operate at 1200 or 9600 bps (RAV232 defaults to 1200; RAV232+ defaults to 9600). The bidirectional variant receives button-press events from Rako devices. All commands are text-based, case-insensitive, terminated with carriage-return.

<!-- UNRESOLVED: power supply voltage spec for RAV232 at 9600bps — external supply required but rating not stated -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 1200  # RAV232 default; also supports 9600 via BAUD command
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: xon_xoff  # RAV232: Xon/Xoff or None
  # Note: RAV232+ uses 9600 bps with hardware flow control (CTS line)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # OFF command present
- levelable       # LEVEL command present (0-255)
- routable        # HOUSE/ROOM/CHANNEL addressing for multi-device control
- queryable       # STATUS, VER commands present
```

## Actions
```yaml
- id: house
  label: Set House Address
  kind: action
  params:
    - name: house_number
      type: integer
      description: House address (1-255, stored in non-volatile memory)

- id: room
  label: Set Room Address
  kind: action
  params:
    - name: room_number
      type: integer
      description: Room address (0-255); 0 = all rooms with matching house

- id: channel
  label: Set Channel Address
  kind: action
  params:
    - name: channel_number
      type: integer
      description: Channel address (0-15); 0 = all channels in current room

- id: scene
  label: Set Scene
  kind: action
  params:
    - name: scene_number
      type: integer
      description: Scene number (1-4)

- id: off
  label: Lights Off
  kind: action
  params: []

- id: level
  label: Set Power Level
  kind: action
  params:
    - name: power_level
      type: integer
      description: Power level 0-255 (0=0%, 128=50%, 255=100%)

- id: store
  label: Store Scene
  kind: action
  description: Stores current power level to the current scene
  params: []

- id: reset
  label: Reset Microcontroller
  kind: action
  params: []

- id: command
  label: Send Command Number
  kind: action
  params:
    - name: command_number
      type: integer
      description: Command number (0-15). LIGHT+ and LIGHT- fade lights; STOP halts fade.

- id: address
  label: Set EEPROM Address
  kind: action
  params:
    - name: eeprom_address
      type: integer
      description: EEPROM address (0-127)

- id: data
  label: Write EEPROM Data
  kind: action
  params:
    - name: eeprom_data
      type: integer
      description: EEPROM data value (0-255)

- id: baud
  label: Set Baud Rate
  kind: action
  params:
    - name: rate
      type: integer
      description: Baud rate - 96 for 9600 bps, 12 for 1200 bps

# UNRESOLVED: BAUD command - appears in examples but not in command table
- id: version_query
  label: Display Version Information
  kind: action
  params: []

- id: status_query
  label: Display Current House/Room/Channel Status
  kind: action
  params: []

- id: noecho
  label: Disable Character Echoing (RS-232 only)
  kind: action
  params: []

- id: echo
  label: Enable Character Echoing (RS-232 only)
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: ok
  label: Command Acknowledged
  type: string
  values:
    - ">OK"

- id: invalid_command
  label: Invalid Command Response
  type: string
  values:
    - ">Invalid Command!"

- id: status_response
  label: Status Output
  type: string
  pattern: "^>HO:\\d{3} RO:\\d{3} CH:\\d{3}$"
  description: Returns current House, Room, and Channel as 3-digit zero-padded decimals

- id: version_response
  label: Version Info
  type: string
  description: Version string returned by VER command

# Bi-directional only - received events from Rako devices:
- id: button_event
  label: Button Event
  type: string
  pattern: "^<\\d{3}:\\d{2}:\\d{2}$"
  description: "<RRR:CC:IN" - room (0-255), channel (0-15), instruction number
  # Instruction codes: 1=LIGHT-, 2=LIGHT+, 3=SCENE1, 4=SCENE2, 5=SCENE3, 6=SCENE4,
  # 7=PROGRAM MODE, 8=IDENT, 9=IDENT, 10=LOW BATTERY, 11=EEPROM WRITE,
  # 12=LEVEL SET, 13=STORE, 14=EXIT, 15=STOP
```

## Variables
```yaml
- id: echo_mode
  label: Echo Mode
  type: boolean
  writable: true
  description: Character echo toggle - NOECHO turns off, ECHO turns on. RAV232+ only.
  # Stored in non-volatile memory
```

## Events
```yaml
# RAV232+ only - unsolicited button press and system notifications
# Format: <RRR:CC:IN followed by CR LF
# House must be set via HOUSE command to filter output to current house only
```

## Macros
```yaml
# Multi-step sequences from source examples:
- id: set_scene_in_room
  label: Set Scene in Room
  steps:
    - 'ROOM <room_number>'
    - 'CHANNEL 0'
    - 'SCENE <scene_number>'
  description: Target all channels in a specific room to a specific scene
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - desc: "RAV232 at 9600bps and RAV232+ must be powered by external 9-15V DC @ 50mA supply"
    # Source: "MUST be powered by an external supply of 9 to 15V DC @ 50mA"
  - desc: "RAV232+ hardware flow control - wait for '>' prompt before sending next command if CTS not connected"
  - desc: "Avoid setting HOUSE or ROOM to 0 when writing EEPROM - affects ALL dimmers"
    # Source: "if the channel or house number is set to zero as this will change the values on ALL the dimmers"
```

## Notes
RAV232 is unidirectional (transmit only); RAV232+ is bidirectional and receives button-press events from Rako devices. The bidirectional unit only outputs messages for the current house address (set via HOUSE command). Commands are not case-sensitive and can be shortened (e.g., HOUSE:1 → HO:1). Delimiters: space, tab, or colon accepted. Character echoing is configurable on RAV232+ only (NOECHO/ECHO commands). EEPROM addresses 63-127 are profile data — should only be changed via RASOFT software.
<!-- UNRESOLVED: power consumption at 1200bps — "requires external power supply" but voltage not stated -->
<!-- UNRESOLVED: firmware version — VER command exists but output format not captured -->
<!-- UNRESOLVED: RAV232 9600bps default vs command-switchable — confirm if 9600 is persistent -->

## Provenance

```yaml
source_domains:
  - rakocontrols.com
retrieved_at: 2026-04-30T04:28:54.023Z
last_checked_at: 2026-04-26T22:32:30.100Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-26T22:32:30.100Z
matched_actions: 16
action_count: 16
confidence: high
summary: "All 16 spec actions matched literal source commands with correct parameters and transport configuration verified against datasheet."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
