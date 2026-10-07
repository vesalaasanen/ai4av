---
spec_id: admin/nec-np-p350w-p350x-420x
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC NP P350W P350X 420X Control Spec"
manufacturer: NEC
model_family: NP-P350W
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - NP-P350W
    - NP-P350X
    - NP-420X
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-13T08:34:27.457Z
last_checked_at: 2026-10-07T11:10:16.639Z
generated_at: 2026-10-07T11:10:16.639Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "078-1. SETTING REQUEST"
  - "053-7. LENS INFORMATION REQUEST"
  - "084. INFORMATION STRING REQUEST"
  - "wireless LAN unit sold separately; no auth mechanism described in source"
  - "source lists 115200/38400/19200/9600/4800 bps; no default stated"
  - "RTS/CTS pins wired but flow control mode not specified"
  - "no unsolicited event notifications described in source"
  - "no explicit macro sequences described in source"
  - "no explicit safety interlock procedures in source beyond command blocking notes"
  - "default baud rate not stated (multiple options listed); wireless LAN unit details not in source"
verification:
  verdict: verified
  checked_at: 2026-10-07T11:10:16.639Z
  matched_actions: 49
  action_count: 49
  confidence: medium
  summary: "All 49 action units match the source's hex frames and query names, transport is supported, and 49 of about 53 source commands are covered (0.92). (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# NEC NP P350W P350X 420X Control Spec

## Summary
NEC NP-P350W/P350X/420X projector. Control via RS-232C serial or wired TCP/IP (port 7142). Supports power on/off, input routing, picture/sound/onscreen mute, picture adjustments, volume, lens control, eco mode, freeze, edge blending, PIP/PbP, and extensive query commands for status, lamp/filter usage, and model information.

<!-- UNRESOLVED: wireless LAN unit sold separately; no auth mechanism described in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142  # stated: "Use TCP port number 7142"
serial:
  baud_rate: null  # UNRESOLVED: source lists 115200/38400/19200/9600/4800 bps; no default stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: RTS/CTS pins wired but flow control mode not specified
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits
```yaml
- powerable       # POWER ON / POWER OFF commands present
- routable         # INPUT SW CHANGE command present
- queryable        # numerous status/information request commands present
- levelable        # PICTURE ADJUST, VOLUME ADJUST, LENS CONTROL present
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
  hex: "02h 00h 00h 00h 00h 02h"
  notes: "No other command accepted while power-on executes."

- id: power_off
  label: Power Off
  kind: action
  params: []
  hex: "02h 01h 00h 00h 00h 03h"
  notes: "No other command accepted during cooling time."

- id: input_sw_change
  label: Input Switch
  kind: action
  params:
    - name: input
      type: integer
      description: Input terminal value (see Appendix; example 06h = video)
  hex_template: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  params: []
  hex: "02h 10h 00h 00h 00h 12h"

- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  params: []
  hex: "02h 11h 00h 00h 00h 13h"

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  params: []
  hex: "02h 12h 00h 00h 00h 14h"

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  params: []
  hex: "02h 13h 00h 00h 00h 15h"

- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  params: []
  hex: "02h 14h 00h 00h 00h 16h"

- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  params: []
  hex: "02h 15h 00h 00h 00h 17h"

- id: picture_adjust
  label: Picture Adjust
  kind: action
  params:
    - name: target
      type: integer
      description: "0=Brightness, 1=Contrast, 2=Color, 3=Hue, 4=Sharpness"
    - name: mode
      type: integer
      description: "0=absolute, 1=relative"
    - name: value
      type: integer
      description: Signed 16-bit adjustment value
  hex_template: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> <DATA03> <DATA04> <CKS>"

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=absolute, 1=relative"
    - name: value
      type: integer
      description: Signed 16-bit volume value
  hex_template: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: value
      type: integer
      description: Aspect value (see Appendix)
  hex_template: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"

- id: other_adjust
  label: Other Adjust (Lamp/Light)
  kind: action
  params:
    - name: target
      type: integer
      description: "96h FFh = LAMP/LIGHT ADJUST"
    - name: mode
      type: integer
      description: "0=absolute, 1=relative"
    - name: value
      type: integer
      description: Signed 16-bit adjustment value
  hex_template: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: "Key code from key code table (e.g., 02h=POWER ON, 05h=AUTO, 06h=MENU, etc.)"
  hex_template: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"

- id: shutter_close
  label: Shutter Close
  kind: action
  params: []
  hex: "02h 16h 00h 00h 00h 18h"

- id: shutter_open
  label: Shutter Open
  kind: action
  params: []
  hex: "02h 17h 00h 00h 00h 19h"

- id: lens_control
  label: Lens Control
  kind: action
  params:
    - name: function
      type: integer
      description: "06h=Periphery Focus"
    - name: direction
      type: integer
      description: "00h=Stop, 01h/02h/03h=plus timed, 7Fh=plus continuous, 81h=minus continuous, FDh/FEh/FFh=minus timed"
  hex_template: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: command
      type: integer
      description: "FFh=Stop"
    - name: mode
      type: integer
      description: "00h=absolute, 02h=relative"
    - name: value
      type: integer
      description: 16-bit position value
  hex_template: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  hex_template: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  hex_template: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"

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
  hex_template: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  params:
    - name: profile
      type: integer
      description: "00h=Profile 1, 01h=Profile 2"
  hex_template: "02h 27h 00h 00h 01h <DATA01> <CKS>"

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: state
      type: integer
      description: "01h=On, 02h=Off"
  hex_template: "01h 98h 00h 00h 01h <DATA01> <CKS>"

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  params:
    - name: value
      type: integer
      description: Eco mode value (see Appendix)
  hex_template: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  params:
    - name: name
      type: string
      description: Projector name (up to 16 bytes, NUL-terminated)
  hex_template: "03h B1h 00h 00h 12h 2Ch <DATA01-DATA16> 00h <CKS>"

- id: pip_picture_by_picture_set
  label: PIP/Picture-by-Picture Set
  kind: action
  params:
    - name: target
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: integer
      description: Setting value per target (see spec)
  hex_template: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  params:
    - name: value
      type: integer
      description: "00h=OFF, 01h=ON"
  hex_template: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"

- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: input
      type: integer
      description: Input terminal value
    - name: source
      type: integer
      description: "00h=terminal in DATA01, 02h=COMPUTER"
  hex_template: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
```

## Feedbacks
```yaml
- id: error_status
  label: Error Status
  type: bitfield
  description: "12 bytes of error information; Bit0=cover error, Bit1=temp error, Bit3=fan error, Bit4=fan error, Bit5=power error, Bit6=lamp off, Bit7=replacement moratorium. See DATA05-DATA09 for extended status."

- id: command_response
  label: Command Response
  type: enum
  values:
    - success
    - error
  notes: "Success: A2h or 23h with ERR1/ERR2=00h. Error: ERR1/ERR2 contain error code per error code list."

- id: power_state
  label: Power State
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
  query_command: "078-2 RUNNING STATUS REQUEST"

- id: mute_status
  label: Mute Status
  type: object
  properties:
    - picture_mute: [off, on]
    - sound_mute: [off, on]
    - onscreen_mute: [off, on]
    - forced_onscreen_mute: [off, on]
    - onscreen_display: [not_displayed, displayed]
  query_command: "078-4 MUTE STATUS REQUEST"

- id: input_status
  label: Input Status
  type: object
  description: "Signal switch process, signal list number, signal type, test pattern, content displayed"
  query_command: "078-3 INPUT STATUS REQUEST"

- id: projector_information
  label: Projector Information
  type: object
  description: "Projector name (DATA01-49), lamp usage time seconds (DATA83-86), filter usage time seconds (DATA87-90)"
  query_command: "037 INFORMATION REQUEST"

- id: filter_usage_info
  label: Filter Usage Info
  type: object
  properties:
    - filter_usage_seconds: integer
    - filter_alarm_start_seconds: integer
  query_command: "037-3 FILTER USAGE INFORMATION REQUEST"

- id: lamp_info
  label: Lamp Info
  type: object
  description: "Lamp usage time seconds or remaining life percent for lamp 1 or lamp 2"
  query_command: "037-4 LAMP INFORMATION REQUEST 3"

- id: carbon_savings
  label: Carbon Savings Info
  type: object
  description: "Total or operation carbon savings in kg and mg"
  query_command: "037-6 CARBON SAVINGS INFORMATION REQUEST"

- id: lens_position
  label: Lens Position
  type: object
  description: "Upper/lower adjustment limits and current value"
  query_command: "053-1 LENS CONTROL REQUEST"

- id: lens_memory_option
  label: Lens Memory Option
  type: object
  properties:
    - mode: [load_by_signal, forced_mute]
    - setting: [off, on]
  query_command: "053-5 LENS MEMORY OPTION REQUEST"

- id: lens_profile
  label: Lens Profile
  type: enum
  values: [profile_1, profile_2]
  query_command: "053-11 LENS PROFILE REQUEST"

- id: gain_parameter
  label: Gain Parameter
  type: object
  description: "Adjustment status, range limits, default, current value for picture/volume/lamp parameters"
  query_command: "060-1 GAIN PARAMETER REQUEST 3"

- id: eco_mode
  label: Eco Mode
  type: integer
  query_command: "097-8 ECO MODE REQUEST"

- id: lan_projector_name
  label: LAN Projector Name
  type: string
  query_command: "097-45 LAN PROJECTOR NAME REQUEST"

- id: mac_address
  label: MAC Address
  type: string
  description: "6-byte MAC address"
  query_command: "097-155 LAN MAC ADDRESS STATUS REQUEST2"

- id: pip_pbp_status
  label: PIP/Picture-by-Picture Status
  type: object
  description: "Mode, start position, sub input settings"
  query_command: "097-198 PIP/PICTURE BY PICTURE REQUEST"

- id: edge_blending_mode
  label: Edge Blending Mode
  type: enum
  values: [off, on]
  query_command: "097-243-1 EDGE BLENDING MODE REQUEST"

- id: model_name
  label: Model Name
  type: string
  query_command: "078-5 MODEL NAME REQUEST"

- id: cover_status
  label: Cover Status
  type: enum
  values: [normal, cover_closed]
  query_command: "078-6 COVER STATUS REQUEST"

- id: base_model_type
  label: Base Model Type
  type: string
  query_command: "305-1 BASE MODEL TYPE REQUEST"

- id: serial_number
  label: Serial Number
  type: string
  query_command: "305-2 SERIAL NUMBER REQUEST"

- id: basic_info
  label: Basic Information
  type: object
  description: "Operation status, content displayed, signal types, video/sound/onscreen mute, freeze status"
  query_command: "305-3 BASIC INFORMATION REQUEST"
```

## Variables
```yaml
# No discrete settable variables beyond Actions. All parameters via action commands.
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source
```

## Macros
```yaml
# UNRESOLVED: no explicit macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "Power on/off commands block other commands during execution"
    details: "While POWER ON is executing, no other command accepted. While POWER OFF is executing (including cooling), no other command accepted."
  - description: "Lens continuous drive stop"
    details: "After sending 7Fh (drive plus) or 81h (drive minus), send 00h to stop."
# UNRESOLVED: no explicit safety interlock procedures in source beyond command blocking notes
```

## Notes
Command format: 20h–A3h header bytes + `<ID1> <ID2>` + `<LEN>` + `<DATA>` + `<CKS>`. Checksum = low-order byte of sum of all preceding bytes. ID1=control ID set on projector; ID2=model code varies by model.

Key code table supports: POWER ON/OFF, AUTO, MENU, UP/DOWN/LEFT/RIGHT/ENTER/EXIT, HELP, MAGNIFY UP/DOWN, MUTE, PICTURE, COMPUTER1/2, VIDEO1, S-VIDEO1, VOLUME UP/DOWN, FREEZE, ASPECT, SOURCE, LAMP MODE/ECO.

Input terminal values, aspect values, and eco mode values are in a separate Appendix ("Supplementary Information by Command") not included in this source.

Wireless LAN supported via separate wireless LAN unit (sold separately); consult unit's operation manual.

RS-232C serial uses D-SUB 9P with RTS/CTS hardware handshaking pins wired (cross cable).
<!-- UNRESOLVED: default baud rate not stated (multiple options listed); wireless LAN unit details not in source -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-13T08:34:27.457Z
last_checked_at: 2026-10-07T11:10:16.639Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T11:10:16.639Z
matched_actions: 49
action_count: 49
confidence: medium
summary: "All 49 action units match the source's hex frames and query names, transport is supported, and 49 of about 53 source commands are covered (0.92). (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "078-1. SETTING REQUEST"
- "053-7. LENS INFORMATION REQUEST"
- "084. INFORMATION STRING REQUEST"
- "wireless LAN unit sold separately; no auth mechanism described in source"
- "source lists 115200/38400/19200/9600/4800 bps; no default stated"
- "RTS/CTS pins wired but flow control mode not specified"
- "no unsolicited event notifications described in source"
- "no explicit macro sequences described in source"
- "no explicit safety interlock procedures in source beyond command blocking notes"
- "default baud rate not stated (multiple options listed); wireless LAN unit details not in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
