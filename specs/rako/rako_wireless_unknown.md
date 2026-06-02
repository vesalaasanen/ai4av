---
spec_id: admin/rako-wra-232
schema_version: ai4av-public-spec-v1
revision: 1
title: "Rako WRA-232 Control Spec"
manufacturer: Rako
model_family: WRA-232
aliases: []
compatible_with:
  manufacturers:
    - Rako
  models:
    - WRA-232
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - rakocontrols.com
source_urls:
  - https://rakocontrols.com/media/1512/rako-rs232-command-summary.pdf
  - https://rakocontrols.com/media/2065/accessing-the-rako-hub.pdf
  - https://rakocontrols.com/media/1956/accessing-the-rako-bridge-v222.pdf
  - https://rakocontrols.com/integration/system-integration/
retrieved_at: 2026-05-22T17:22:30.713Z
last_checked_at: 2026-05-31T07:07:38.318Z
generated_at: 2026-05-31T07:07:38.318Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Rako dimmer/wireless device models supported not enumerated in source"
  - "whether battery low notifications (instruction 10) are sent asynchronously from battery-powered devices"
  - "RASOFT software-defined profiles (EEPROM 63-127) not documented as macro sequences"
  - "power sequencing requirements not stated in source"
  - "COMMAND instructions 9, 11, 14 table entries empty in source"
  - "ps1-ps4 instructions (3-6) not fully documented, SCENE recommended instead"
  - "full RASOFT profile data format (EEPROM 63-127) not documented"
verification:
  verdict: verified
  checked_at: 2026-05-31T07:07:38.318Z
  matched_actions: 11
  action_count: 11
  confidence: medium
  summary: "All 11 spec actions matched verbatim to source commands; transport parameters (9600 baud, 8/N/1, port 9761) verified; complete protocol coverage. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-22
---

# Rako WRA-232 Control Spec

## Summary
TCP/RS-232 interface for Rako wireless lighting control. Supports House/Room/Channel addressing with scenes, dimming via LEVEL, and feedback output. Serial at 9600/8/N/1; TCP on port 9761.

<!-- UNRESOLVED: Rako dimmer/wireless device models supported not enumerated in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 9761  # TCP port stated in source
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # Xon/Xoff or None stated
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable    # OFF and LEVEL commands present
- routable     # ROOM, CHANNEL, SCENE commands present
- queryable    # STATUS and VER commands present
```

## Actions
```yaml
- id: house_set
  label: Set House Address
  kind: action
  params:
    - name: house_number
      type: integer
      description: House number 1-255
  notes: Stored in non-volatile memory. Deprecated in favor of web UI.

- id: room_set
  label: Set Room Address
  kind: action
  params:
    - name: room_number
      type: integer
      description: Room 0-255. 0 = all rooms in house. Omit to set 0.
  notes: Stored in non-volatile memory.

- id: channel_set
  label: Set Channel Address
  kind: action
  params:
    - name: channel_number
      type: integer
      description: Channel 0-15. 0 = all channels in room. Omit to set 0.

- id: scene_set
  label: Set Scene
  kind: action
  params:
    - name: scene_number
      type: integer
      description: Scene 1-16 (corresponds to control panel buttons)

- id: power_off
  label: Power Off
  kind: action
  params: []

- id: level_set
  label: Set Power Level
  kind: action
  params:
    - name: power_level
      type: integer
      description: Level 0-255 (255 = 100%)

- id: store
  label: Store Current Level to Scene
  kind: action
  params: []

- id: command_send
  label: Send Raw Command Number
  kind: action
  params:
    - name: command_number
      type: integer
      description: Command 0-15 per Command Number Summary

- id: eeprom_write
  label: Write EEPROM Address
  kind: action
  params:
    - name: address
      type: integer
      description: EEPROM address
    - name: data
      type: integer
      description: Data value

- id: address_set
  label: Set EEPROM Target Address
  kind: action
  params:
    - name: address
      type: integer
      description: EEPROM address 0-127

- id: data_set
  label: Set EEPROM Data Value
  kind: action
  params:
    - name: data
      type: integer
      description: Data byte value
```

## Feedbacks
```yaml
- id: command_feedback
  label: Command Feedback Output
  type: string
  format: "<RRR:CCC:II" | "<RRR:CCC:III:DDD"
  description: |
    RRR = room 0-255 (3 digits)
    CC/CCC = channel 0-15 (2-3 digits, 0 = all)
    II = 2-digit instruction (Table 2) for commands 0-15
    III = 3-digit instruction (Table 4) for commands >=16
    DDD = data value for extra instructions
  example: "<004:00:03" (Room 4, Channel 0, Scene 1)

- id: ok_response
  label: Valid Command Acknowledgement
  type: string
  values:
    - OK

- id: invalid_command_response
  label: Invalid Command Response
  type: string
  values:
    - Invalid Command!

- id: prompt
  label: Command Prompt
  type: string
  description: ">" issued when interface ready for command

- id: version_info
  label: Version Information
  type: string
  description: Returned by VER command

- id: status_info
  label: Status Information
  type: string
  description: "HO:nnn RO:nnn CH:nnn EH:nnn format from STATUS command"
```

## Variables
```yaml
- id: house_address
  label: House Address
  type: integer
  range: [1, 255]
  default: 0
  storage: eeprom

- id: room_address
  label: Room Address
  type: integer
  range: [0, 255]
  default: 0
  storage: eeprom

- id: channel_address
  label: Channel Address
  type: integer
  range: [0, 15]
  default: 0
  storage: eeprom

- id: eeprom_scene_1
  label: Scene 1 Preset Value
  type: integer
  range: [0, 255]
  address: 1

- id: eeprom_scene_2
  label: Scene 2 Preset Value
  type: integer
  range: [0, 255]
  address: 2

- id: eeprom_scene_3
  label: Scene 3 Preset Value
  type: integer
  range: [0, 255]
  address: 3

- id: eeprom_scene_4
  label: Scene 4 Preset Value
  type: integer
  range: [0, 255]
  address: 4

- id: eeprom_start_mode
  label: Start Mode After Power Failure
  type: integer
  range: [0, 255]
  address: 9
  description: "0=off, 1-4=scene, 5=memory, 6-255=absolute power level"

- id: eeprom_scene_fade_rate
  label: Scene Fade Rate
  type: integer
  range: [0, 255]
  address: 34
  description: "0=fast"

- id: eeprom_scene_fade_decay_rate
  label: Scene Fade Decay Rate
  type: integer
  range: [0, 255]
  address: 36
  description: "0=no decay"
```

## Events
```yaml
# Device does not initiate unsolicited events. All output is response to commands.
# UNRESOLVED: whether battery low notifications (instruction 10) are sent asynchronously from battery-powered devices
```

## Macros
```yaml
# No explicit multi-step macros documented.
# UNRESOLVED: RASOFT software-defined profiles (EEPROM 63-127) not documented as macro sequences
```

## Safety
```yaml
confirmation_required_for:
  - eeprom_write  # Warning: writing address 0 affects all dimmers with same house
interlocks: []
# UNRESOLVED: power sequencing requirements not stated in source
```

## Notes

Command format: `[COMMAND] <VALUE>\r`. Delimiters: whitespace, tabs, or colons. Case insensitive. Shortened non-ambiguous versions allowed (e.g., ROOM:1 → RO:1).

Prompt character ">" indicates interface ready. Characters echoed. Responses: "OK" (valid) or "Invalid Command!" (invalid).

TCP connection on port 9761. Serial 9600/8/N/1. Hardware flow control via CTS line; if unused, observe ">" prompt before sending next command to avoid buffer overflow.

<!-- UNRESOLVED: COMMAND instructions 9, 11, 14 table entries empty in source -->
<!-- UNRESOLVED: ps1-ps4 instructions (3-6) not fully documented, SCENE recommended instead -->
<!-- UNRESOLVED: full RASOFT profile data format (EEPROM 63-127) not documented -->

## Provenance

```yaml
source_domains:
  - rakocontrols.com
source_urls:
  - https://rakocontrols.com/media/1512/rako-rs232-command-summary.pdf
  - https://rakocontrols.com/media/2065/accessing-the-rako-hub.pdf
  - https://rakocontrols.com/media/1956/accessing-the-rako-bridge-v222.pdf
  - https://rakocontrols.com/integration/system-integration/
retrieved_at: 2026-05-22T17:22:30.713Z
last_checked_at: 2026-05-31T07:07:38.318Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T07:07:38.318Z
matched_actions: 11
action_count: 11
confidence: medium
summary: "All 11 spec actions matched verbatim to source commands; transport parameters (9600 baud, 8/N/1, port 9761) verified; complete protocol coverage. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Rako dimmer/wireless device models supported not enumerated in source"
- "whether battery low notifications (instruction 10) are sent asynchronously from battery-powered devices"
- "RASOFT software-defined profiles (EEPROM 63-127) not documented as macro sequences"
- "power sequencing requirements not stated in source"
- "COMMAND instructions 9, 11, 14 table entries empty in source"
- "ps1-ps4 instructions (3-6) not fully documented, SCENE recommended instead"
- "full RASOFT profile data format (EEPROM 63-127) not documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
