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
source_urls:
  - https://rakocontrols.com/media/1286/rs232-command-summary.pdf
retrieved_at: 2026-09-26T14:23:14.427Z
last_checked_at: 2026-09-26T14:23:14.427Z
generated_at: 2026-09-26T14:23:14.427Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "BAUD applicability to RAV232+ is not documented.\""
  - "source event example labels instruction 01 as fade up, while its command table defines 1=LIGHT- and 2=LIGHT+. No unsupported resolution is claimed."
  - "firmware version — VER command exists but output format not captured"
  - "complete firmware applicability and authentication are not specified."
verification:
  verdict: verified
  checked_at: 2026-09-26T14:23:14.427Z
  matched_actions: 16
  action_count: 16
  confidence: medium
  summary: "Independently read the complete refined source and rendered all four pages of its official primary PDF. All16 action IDs/wire families and parameter ranges match:15 commands in the interface table plus BAUD in model-specific configuration. Complete COMMAND normal/program-mode and EEPROM tables are represented. RAV232 versus RAV232+ baud/flow/power/echo/event conditions agree with source. HOUSE0, instruction01 direction, prompt/reply framing and auth uncertainties are explicitly retained rather than resolved without evidence. No WRA232 source substitution. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# Rako RAV232 & RAV232+ RF Interface Control Spec

## Summary
Rako RAV232 (unidirectional) and RAV232+ (bidirectional) are RS-232 RF interfaces for Rako lighting control systems. RAV232 uses 1200 bps and can be switched to 9600 bps with BAUD plus a power cycle; RAV232+ is documented at 9600 bps. The source does not establish BAUD switching for RAV232+. The bidirectional variant receives button-press events from Rako devices. All commands are text-based, case-insensitive, terminated with carriage-return.

The four-page source explicitly covers RAV232 and RAV232+. The similarly named eight-page WRA-232 V2.0.1 document describes a different product and is not used here.

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: null  # Select the model/configuration profile below; no single baud rate covers both models.
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # Explicitly supported by both models; observe the RAV232+ readiness requirement below.
serial_profiles:
  - model: RAV232
    baud_rates: [1200, 9600]
    flow_control_options: [xon_xoff, none]
    notes: "1200 bps documented configuration. BAUD 96 selects 9600; BAUD 12 selects 1200. Power cycle after selection. 9600 bps requires external power."
  - model: RAV232+
    baud_rates: [9600]
    flow_control_options: [hardware, none]
    notes: "CTS indicates ready to receive. Without CTS, avoid sending too quickly or wait for the > prompt after each command. No numeric pacing interval is documented."
auth:
  type: UNRESOLVED  # Source states neither an authentication procedure nor an explicit absence of authentication.
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
  command: "HOUSE {house_number}\r"
  params:
    - name: house_number
      type: integer
      min: 1
      max: 255
      description: House address (1-255, stored in non-volatile memory); source warning about HOUSE 0 does not extend this documented setter range.

- id: room
  label: Set Room Address
  kind: action
  command: "ROOM {room_number}\r"
  params:
    - name: room_number
      type: integer
      min: 0
      max: 255
      description: Room address (0-255); 0 = all rooms with matching house; omitted argument selects 0; stored in non-volatile memory.

- id: channel
  label: Set Channel Address
  kind: action
  command: "CHANNEL {channel_number}\r"
  params:
    - name: channel_number
      type: integer
      min: 0
      max: 15
      description: Channel address (0-15); 0 = all channels in current room; omitted argument selects 0.

- id: scene
  label: Set Scene
  kind: action
  command: "SCENE {scene_number}\r"
  params:
    - name: scene_number
      type: integer
      min: 1
      max: 4
      description: Scene number (1-4)

- id: off
  label: Lights Off
  kind: action
  command: "OFF\r"
  params: []

- id: level
  label: Set Power Level
  kind: action
  command: "LEVEL {power_level}\r"
  params:
    - name: power_level
      type: integer
      min: 0
      max: 255
      description: Power level 0-255 (0=0%, 128=50%, 255=100%)

- id: store
  label: Store Scene
  kind: action
  command: "STORE\r"
  description: Stores current power level to the current scene
  params: []

- id: reset
  label: Reset Microcontroller
  kind: action
  command: "RESET\r"
  params: []

- id: command
  label: Send Command Number
  kind: action
  command: "COMMAND {command_number}\r"
  params:
    - name: command_number
      type: integer
      min: 0
      max: 15
      description: Command number (0-15). LIGHT+ and LIGHT- fade lights; STOP halts fade.

- id: address
  label: Set EEPROM Address
  kind: action
  command: "ADDRESS {eeprom_address}\r"
  params:
    - name: eeprom_address
      type: integer
      min: 0
      max: 127
      description: Protocol address domain 0-127; write only documented addresses listed in Notes. Profile addresses 63-127 should only be changed using RASOFT.

- id: data
  label: Write EEPROM Data
  kind: action
  command: "DATA {eeprom_data}\r"
  params:
    - name: eeprom_data
      type: integer
      min: 0
      max: 255
      description: EEPROM data value (0-255)

- id: baud
  label: Set Baud Rate
  kind: action
  command: "BAUD {rate}\r"
  models: [RAV232]
  notes: "Power cycle after selection; external 9-15V DC at 50mA required for 9600 bps. UNRESOLVED: BAUD applicability to RAV232+ is not documented."
  params:
    - name: rate
      type: integer
      enum: [12, 96]
      description: Baud rate - 96 for 9600 bps, 12 for 1200 bps

# BAUD is documented in the RAV232 serial-configuration instructions, outside the command table.
- id: version_query
  label: Display Version Information
  kind: action
  command: "VER\r"
  params: []

- id: status_query
  label: Display Current House/Room/Channel Status
  kind: action
  command: "STATUS\r"
  params: []

- id: noecho
  label: Disable Character Echoing (RAV232+ only)
  kind: action
  command: "NOECHO\r"
  models: [RAV232+]
  notes: "Bi-directional model only; current echo mode is stored in non-volatile memory."
  params: []

- id: echo
  label: Enable Character Echoing (RAV232+ only)
  kind: action
  command: "ECHO\r"
  models: [RAV232+]
  notes: "Bi-directional model only; current echo mode is stored in non-volatile memory."
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
  pattern: "^HO:\\d{3} RO:\\d{3} CH:\\d{3}$"
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
  description: "<RRR:CC:IN - decimal room 0-255, channel 0-15, instruction number; line terminates with CR LF. Current HOUSE filters received events."
  # Instruction meanings depend on normal/program mode; see the complete Notes table.
  # UNRESOLVED: source event example labels instruction 01 as fade up, while its command table defines 1=LIGHT- and 2=LIGHT+. No unsupported resolution is claimed.
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
  - desc: "Source warns CHANNEL or HOUSE 0 affects ALL dimmers when writing EEPROM; HOUSE setter itself documents only 1-255. ROOM 0 separately addresses all rooms in the current house."
    # Source: "if the channel or house number is set to zero as this will change the values on ALL the dimmers"
```

## Notes
RAV232 is unidirectional (transmit only); RAV232+ is bidirectional and receives button-press events from Rako devices. The bidirectional unit only outputs messages for the current house address (set via HOUSE command). Commands are not case-sensitive and can be shortened (e.g., HOUSE:1 → HO:1). Delimiters: space, tab, or colon accepted. Character echoing is configurable on RAV232+ only (NOECHO/ECHO commands). EEPROM addresses 63-127 are profile data — should only be changed via RASOFT software.

<!-- UNRESOLVED: firmware version — VER command exists but output format not captured -->
<!-- UNRESOLVED: complete firmware applicability and authentication are not specified. -->

Source: https://rakocontrols.com/media/1286/rs232-command-summary.pdf (four pages; ©2006 Rako). Transmit command text followed by CR (0x0D); the template notation `\r` denotes that byte. Arguments may use spaces, tabs or colons. Commands are case-insensitive and unambiguous abbreviations are accepted. The `>` prompt and echo are interface output, not bytes to prepend to requests. The source writes `>OK` and `>Invalid Command!` in its syntax description but examples show the prompt separately from `OK`; do not infer a fixed contiguous prompt/reply framing grammar. STATUS documents `HO:nnn RO:nnn CH:nnn`, without a required `>` prefix. VER has no documented exact response grammar.

All 16 documented command families are represented. ROOM and CHANNEL may omit their argument to select zero; the explicit-value templates above support that value without requiring the abbreviated form. BAUD is specified in the configuration instructions for RAV232, not as proof of RAV232+ rate switching.

Instruction meanings (blank cells mean no meaning specified for that mode; value 0 is accepted by the generic COMMAND range but has no table meaning):

|Instruction<br>Number|Instruction|Program Mode<br>Instruction|
|---|---|---|
|1|LIGHT -||
|2|LIGHT +|LIGHT +|
|3|SCENE 1|LIGHT -|
|4|SCENE 2|STORE & IDENT|
|5|SCENE 3|CHANNEL +|
|6|SCENE 4|CHANNEL -|
|7|PROGRAM MODE||
|8|IDENT||
|9||IDENT|
|10|LOW BATTERY|LOW BATTERY|
|11|EEPROM WRITE|EEPROM WRITE|
|12|LEVEL SET|LEVEL SET|
|13|STORE|STORE|
|14||EXIT|
|15|STOP|STOP|

The fading instructions continue at the configured dimmer rate until STOP (15). The source's received-event example conflicts with the normal-mode LIGHT direction table; retain the numeric instruction and resolve behavior against further evidence before interpreting direction.

EEPROM write restrictions and values:

|EEPROM<br>Address|Action|Notes|
|---|---|---|
|1|Scene 1 Preset Value|-|
|2|Scene 2 Preset Value|-|
|3|Scene 3 Preset Value|-|
|4|Scene 4 Preset Value|-|
|9|Power Up Mode<br>(After Power Failure)|0 = Off<br>1-4 = Scene<br>5 = Last Scene<br>6-255= Power Level|
|22|Ignore Program Mode|>0 = Ignore|
|23|Ignore Group Commands|>0 = Ignore|
|24|Ignore House Commands|>0 = Ignore|
|26|Use Profile|>0 = Use Profile|
|34|Scene Fade Rate|0 = Fast|
|36|Scene Fade Decay Rate|0 = No decay|
|40|Manual Fade Rate Max|Sets The Maximum Rate|
|48|Manual Fade Rate Acceleration|Sets The Accelaration<br>To Maximum|
|50|Manual Fade Rate Start|Sets The Starting Fade Rate|
|63-127|Profile Data|Determines the dimmers profile.<br>These values should only be<br>changed usingRASOFT software|

Select HOUSE, ROOM and CHANNEL before ADDRESS, then send DATA. Only the documented EEPROM locations may be written; 63-127 profile data is reserved for changes through RASOFT. The source's HOUSE 0 warning conflicts with the documented HOUSE 1-255 command range; it does not authorize an extra setter value. The 9-15V DC / 50mA requirement applies to RAV232 at 9600 and to RAV232+.

## Provenance

```yaml
source_domains:
  - rakocontrols.com
source_urls:
  - https://rakocontrols.com/media/1286/rs232-command-summary.pdf
retrieved_at: 2026-09-26T14:23:14.427Z
last_checked_at: 2026-09-26T14:23:14.427Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-26T14:23:14.427Z
matched_actions: 16
action_count: 16
confidence: medium
summary: "Independently read the complete refined source and rendered all four pages of its official primary PDF. All16 action IDs/wire families and parameter ranges match:15 commands in the interface table plus BAUD in model-specific configuration. Complete COMMAND normal/program-mode and EEPROM tables are represented. RAV232 versus RAV232+ baud/flow/power/echo/event conditions agree with source. HOUSE0, instruction01 direction, prompt/reply framing and auth uncertainties are explicitly retained rather than resolved without evidence. No WRA232 source substitution. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "BAUD applicability to RAV232+ is not documented.\""
- "source event example labels instruction 01 as fade up, while its command table defines 1=LIGHT- and 2=LIGHT+. No unsupported resolution is claimed."
- "firmware version — VER command exists but output format not captured"
- "complete firmware applicability and authentication are not specified."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
