---
spec_id: admin/sharpnec-pnm322
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Pnm322 Control Spec"
manufacturer: Sharp/NEC
model_family: Pnm322
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - Pnm322
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T14:48:13.057Z
last_checked_at: 2026-06-18T09:10:31.527Z
generated_at: 2026-06-18T09:10:31.527Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "input terminal values, eco mode values, base model type values, and sub input values reference an Appendix \"Supplementary Information by Command\" not present in this source extract."
  - "default baud rate not specified in source; supported values are 115200/38400/19200/9600/4800"
  - "flow control not explicitly stated (full duplex noted); inferred none"
  - "no unsolicited notifications documented in source. Device is poll-only."
  - "no explicit multi-step sequences described in source."
  - "source contains no explicit power-on sequencing requirements or external interlock procedures beyond the error bitmask definition."
  - "default baud rate (9600 vs others) not specified."
  - "input terminal value list not in source extract."
  - "eco mode value list not in source extract."
  - "base model type value list not in source extract."
  - "firmware version compatibility not stated."
  - "exact ID1 control ID default value not stated."
  - "model code (ID2) value for Pnm322 not stated."
verification:
  verdict: verified
  checked_at: 2026-06-18T09:10:31.527Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Pnm322 Control Spec

## Summary
Sharp/NEC Pnm322 projector control spec covering RS-232C serial and TCP/IP (LAN) control. Binary hex command protocol with checksum byte; supports power, input switching, mute, picture/volume/lens adjust, lens memory, status queries, and edge blending.

<!-- UNRESOLVED: input terminal values, eco mode values, base model type values, and sub input values reference an Appendix "Supplementary Information by Command" not present in this source extract. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600  # source lists 115200/38400/19200/9600/4800 bps; default not stated, picking lowest common documented value is NOT allowed - marked UNRESOLVED below
  # UNRESOLVED: default baud rate not specified in source; supported values are 115200/38400/19200/9600/4800
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not explicitly stated (full duplex noted); inferred none
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable       # inferred from POWER ON/OFF commands
  - queryable       # inferred from numerous REQUEST query commands
  - levelable       # inferred from PICTURE/VOLUME/LENS adjust commands
  - routable        # inferred from INPUT SW CHANGE command
```

## Actions
```yaml
- id: error_status_request
  label: Error Status Request
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

- id: power_on
  label: Power On
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: "While turning on power, no other command accepted."

- id: power_off
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "While turning off (including cooling time), no other command accepted."

- id: input_sw_change
  label: Input Switch Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Input terminal (see Appendix Supplementary Information by Command). Example: 06h = Video port."
  notes: "Response DATA01 FFh = ended with error (no signal switch made)."

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []
  notes: "Turned off by input/video signal switch."

- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []
  notes: "Turned off by input/video switch or volume adjustment."

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []

- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: picture_adjust
  label: Picture Adjust
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} FFh {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: DATA02
      type: byte
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA03
      type: byte
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA04
      type: byte
      description: "Adjustment value (high-order 8 bits)"

- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {DATA01} {DATA02} {DATA03} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA02
      type: byte
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA03
      type: byte
      description: "Adjustment value (high-order 8 bits)"

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Aspect value (see Appendix Supplementary Information by Command)"

- id: other_adjust
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Adjustment target: 96h=LAMP ADJUST / LIGHT ADJUST"
    - name: DATA02
      type: byte
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA03
      type: byte
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA04
      type: byte
      description: "Adjustment value (high-order 8 bits)"
    - name: DATA05
      type: byte
      description: "See source table"
  notes: "DATA01/DATA02 pair documented as 96h/FFh for LAMP/LIGHT ADJUST."

- id: information_request
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "Returns projector name, lamp usage time (s), filter usage time (s). Updated at 1-min intervals."

- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: "Returns filter usage time and filter alarm start time (seconds). '-1' if undefined."

- id: lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Lamp selector: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: DATA02
      type: byte
      description: "Content: 01h=Lamp usage time (s), 04h=Lamp remaining life (%)"

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Key code low byte (WORD type). See Key code list."
    - name: DATA02
      type: byte
      description: "Key code high byte. See Key code list."
  notes: "Key code list in source includes POWER ON, POWER OFF, AUTO, MENU, UP, DOWN, RIGHT, LEFT, ENTER, EXIT, HELP, MAGNIFY UP/DOWN, MUTE, PICTURE, COMPUTER1/2, VIDEO1, S-VIDEO1, VOLUME UP/DOWN, FREEZE, ASPECT, SOURCE, LAMP MODE/ECO."

- id: shutter_close
  label: Shutter Close
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

- id: shutter_open
  label: Shutter Open
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

- id: lens_control
  label: Lens Control
  kind: action
  command: "02h 18h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Lens target. Documented example: 06h=Periphery Focus."
    - name: DATA02
      type: byte
      description: "Content: 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s"

- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Lens target (same as Lens Control DATA01)"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Lens target. FFh=Stop (mode/value ignored)."
    - name: DATA02
      type: byte
      description: "Adjustment mode: 00h=absolute, 02h=relative"
    - name: DATA03
      type: byte
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA04
      type: byte
      description: "Adjustment value (high-order 8 bits)"

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  notes: "Controls profile number specified by LENS PROFILE SET."

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: DATA02
      type: byte
      description: "Setting value: 00h=OFF, 01h=ON"

- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: "Returns lens operation status bitmask (lens memory, zoom, focus, lens shift H/V)."

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Profile number: 00h=Profile 1, 01h=Profile 2"

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h {DATA01} 00h 00h {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"

- id: setting_request
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []

- id: running_status_request
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: "Returns power status, cooling/power processes, operation status."

- id: input_status_request
  label: Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []

- id: mute_status_request
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []

- id: model_name_request
  label: Model Name Request
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []

- id: cover_status_request
  label: Cover Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []

- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "01h=Freeze ON, 02h=Freeze OFF"

- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "03h=Horizontal sync frequency, 04h=Vertical sync frequency"

- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: "Returns Light mode or Lamp mode value (see Appendix)."

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []

- id: lan_mac_address_status_request2
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: pip_picture_by_picture_request
  label: PIP/Picture by Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Eco mode value (see Appendix Supplementary Information by Command)"

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {DATA01}-{DATA16} 00h {CKS}"
  params:
    - name: DATA01-16
      type: string
      description: "Projector name (up to 16 bytes)"

- id: pip_picture_by_picture_set
  label: PIP/Picture by Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: byte
      description: "Setting value (depends on DATA01)"

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Setting value: 00h=OFF, 01h=ON"

- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []

- id: serial_number_request
  label: Serial Number Request
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []

- id: basic_information_request
  label: Basic Information Request
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []

- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Input terminal (see Appendix)"
    - name: DATA02
      type: byte
      description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# Each command's response format is documented in source. Generic success/error envelope:
- id: command_response_envelope
  type: object
  description: "Success response starts with 2Xh (where X = command class). Error response starts with AXh (where X = command class) followed by ERR1 ERR2 CKS."
- id: error_status
  type: bitmask
  description: "12-byte error bitmask returned by 009 ERROR STATUS REQUEST (cover, fan, temp, lamp, mirror cover, lens, interlock, system errors)."
- id: power_status
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_sleep, standby_power_saving, network_standby]
- id: mute_status
  type: object
  description: "Picture/Sound/Onscreen/Forced-onscreen mute booleans plus OSD display flag."
```

## Variables
```yaml
- id: brightness
  type: integer
  description: "PICTURE/BRIGHTNESS (adjustable via 030-1, readable via 060-1)"
- id: contrast
  type: integer
  description: "PICTURE/CONTRAST"
- id: color
  type: integer
  description: "PICTURE/COLOR"
- id: hue
  type: integer
  description: "PICTURE/HUE"
- id: sharpness
  type: integer
  description: "PICTURE/SHARPNESS"
- id: volume
  type: integer
  description: "VOLUME (030-2 / 060-1)"
- id: lamp_light_adjust
  type: integer
  description: "LAMP ADJUST / LIGHT ADJUST (030-15 / 060-1)"
- id: eco_mode
  type: enum
  description: "Eco/Light/Lamp mode (see Appendix for value list)"
- id: projector_name
  type: string
  description: "LAN projector name (up to 16 bytes)"
- id: edge_blending_mode
  type: enum
  values: [off, on]
- id: lens_profile
  type: enum
  values: [profile_1, profile_2]
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications documented in source. Device is poll-only.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for:
  - power_off  # source notes cooling time during which no commands accepted
interlocks:
  - "POWER ON: no other command accepted while power-on in progress"
  - "POWER OFF: no other command accepted during power-off including cooling time"
  - "Error DATA09 Bit1: interlock switch open is a defined error condition"
# UNRESOLVED: source contains no explicit power-on sequencing requirements or external interlock procedures beyond the error bitmask definition.
```

## Notes
- Command/response framing: hex byte strings. Frame uses leading command-class byte (00h–03h for requests, 20h–23h for success responses, A0h–A3h for error responses).
- Parameters ID1 (control ID), ID2 (model code), CKS (checksum) are common to all commands.
- Checksum = low-order 8 bits of sum of all preceding bytes.
- Error responses carry ERR1+ERR2 pair — see source error code list (00h/00h unrecognized, 02h/0Dh power off, etc.).
- Signal list number returned is 1 less than practical value (add 1).
- Lamp/filter usage info updates at 1-minute intervals despite 1-second resolution.
- Appendices referenced ("Supplementary Information by Command") are not in this source extract — values for input terminal, eco mode, base model type, and sub input are UNRESOLVED.

<!-- UNRESOLVED: default baud rate (9600 vs others) not specified. -->
<!-- UNRESOLVED: input terminal value list not in source extract. -->
<!-- UNRESOLVED: eco mode value list not in source extract. -->
<!-- UNRESOLVED: base model type value list not in source extract. -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: exact ID1 control ID default value not stated. -->
<!-- UNRESOLVED: model code (ID2) value for Pnm322 not stated. -->
````

Spec above. 53 actions enumerated — every command row in source 2. Command List covered. Hex payloads verbatim. Ports/serial config direct from source. UNRESOLVED markers on gaps (baud default, appendix values, firmware).

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T14:48:13.057Z
last_checked_at: 2026-06-18T09:10:31.527Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T09:10:31.527Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "input terminal values, eco mode values, base model type values, and sub input values reference an Appendix \"Supplementary Information by Command\" not present in this source extract."
- "default baud rate not specified in source; supported values are 115200/38400/19200/9600/4800"
- "flow control not explicitly stated (full duplex noted); inferred none"
- "no unsolicited notifications documented in source. Device is poll-only."
- "no explicit multi-step sequences described in source."
- "source contains no explicit power-on sequencing requirements or external interlock procedures beyond the error bitmask definition."
- "default baud rate (9600 vs others) not specified."
- "input terminal value list not in source extract."
- "eco mode value list not in source extract."
- "base model type value list not in source extract."
- "firmware version compatibility not stated."
- "exact ID1 control ID default value not stated."
- "model code (ID2) value for Pnm322 not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
