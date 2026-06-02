---
spec_id: admin/nec-c431-c501-c551
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC C431/C501/C551 Control Spec"
manufacturer: NEC
model_family: C431
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - C431
    - C501
    - C551
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-13T07:32:51.141Z
last_checked_at: 2026-06-02T22:10:02.213Z
generated_at: 2026-06-02T22:10:02.213Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "input terminal value mapping (referenced as \"Supplementary Information by Command\" appendix — not in source)"
  - "eco mode value mapping (referenced as \"Supplementary Information by Command\" appendix — not in source)"
  - "aspect value mapping (referenced as \"Supplementary Information by Command\" appendix — not in source)"
  - "sub input value mapping for PIP/PbP (referenced as \"Supplementary Information by Command\" appendix — not in source)"
  - "base model type value mapping (referenced as \"Supplementary Information by Command\" appendix — not in source)"
  - "multiple supported (115200/38400/19200/9600/4800) - no single default stated"
  - "flow control not stated in source"
  - "no settable continuous variables beyond what Actions cover"
  - "no unsolicited notification protocol described in source"
  - "no multi-step macro sequences described in source"
  - "interlock switch mentioned in error status (DATA09 Bit1) but no"
  - "input terminal byte value mapping (appendix not in source)"
  - "aspect value mapping (appendix not in source)"
  - "eco mode value mapping (appendix not in source)"
  - "sub input value mapping for PIP/PbP (appendix not in source)"
  - "base model type value mapping (appendix not in source)"
  - "default baud rate (multiple supported, no single default stated)"
  - "flow control setting for serial"
  - "firmware version compatibility"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:10:02.213Z
  matched_actions: 28
  action_count: 28
  confidence: medium
  summary: "All 28 spec actions traced to source (dip-safe re-verify). (19 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# NEC C431/C501/C551 Control Spec

## Summary

NEC C431, C501, and C551 projectors controlled via binary protocol over RS-232C serial or TCP/IP (LAN). Commands are hex byte sequences with a trailing checksum (low-order byte of sum of preceding bytes). Supports power control, input switching, picture/sound/onscreen mute, lens control, lens memory, volume/picture adjustment, freeze, shutter, eco mode, edge blending, PIP/PbP, and extensive status queries.

<!-- UNRESOLVED: input terminal value mapping (referenced as "Supplementary Information by Command" appendix — not in source) -->
<!-- UNRESOLVED: eco mode value mapping (referenced as "Supplementary Information by Command" appendix — not in source) -->
<!-- UNRESOLVED: aspect value mapping (referenced as "Supplementary Information by Command" appendix — not in source) -->
<!-- UNRESOLVED: sub input value mapping for PIP/PbP (referenced as "Supplementary Information by Command" appendix — not in source) -->
<!-- UNRESOLVED: base model type value mapping (referenced as "Supplementary Information by Command" appendix — not in source) -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: null  # UNRESOLVED: multiple supported (115200/38400/19200/9600/4800) - no single default stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred from power on/off commands
  - queryable    # inferred from multiple status request commands
  - levelable    # inferred from volume/picture adjust commands
  - routable     # inferred from input switch change command
```

## Actions
```yaml
actions:
  - id: power_on
    label: Power On
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    params: []
    notes: No other commands accepted during power-on sequence.

  - id: power_off
    label: Power Off
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    notes: No other commands accepted during power-off including cooling time.

  - id: input_switch
    label: Input Switch Change
    kind: action
    command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
    params:
      - name: input_terminal
        type: integer
        description: Input terminal byte value (see appendix - values not in source)
    notes: Response DATA01=FFh indicates error (no signal switch made).

  - id: picture_mute_on
    label: Picture Mute On
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []
    notes: Auto-released on input switch or video signal switch.

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
    notes: Auto-released on input switch, video signal switch, or volume adjustment.

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
    notes: Auto-released on input switch or video signal switch.

  - id: onscreen_mute_off
    label: Onscreen Mute Off
    kind: action
    command: "02h 15h 00h 00h 00h 17h"
    params: []

  - id: picture_adjust
    label: Picture Adjust
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> <DATA03> <DATA04> <CKS>"
    params:
      - name: target
        type: integer
        description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
      - name: mode
        type: integer
        description: "00h=absolute, 01h=relative"
      - name: value
        type: integer
        description: Signed 16-bit value (low byte, high byte)

  - id: volume_adjust
    label: Volume Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
    params:
      - name: mode
        type: integer
        description: "00h=absolute, 01h=relative"
      - name: value
        type: integer
        description: Signed 16-bit value (low byte, high byte)

  - id: aspect_adjust
    label: Aspect Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
    params:
      - name: aspect_value
        type: integer
        description: Aspect setting byte (values in appendix - not in source)

  - id: lamp_adjust
    label: Lamp/Light Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 96h FFh <DATA03> <DATA04> <DATA05> <CKS>"
    params:
      - name: mode
        type: integer
        description: "00h=absolute, 01h=relative"
      - name: value
        type: integer
        description: Signed 16-bit value (low byte, high byte)

  - id: remote_key_code
    label: Remote Key Code
    kind: action
    command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: key_code
        type: integer
        description: "WORD key code. Examples: 02h 00h=POWER ON, 03h 00h=POWER OFF, 05h 00h=AUTO, 06h 00h=MENU, 07h 00h=UP, 08h 00h=DOWN, 09h 00h=RIGHT, 0Ah 00h=LEFT, 0Bh 00h=ENTER, 0Ch 00h=EXIT, 13h 00h=MUTE, 84h 00h=VOLUME UP, 85h 00h=VOLUME DOWN, 8Ah 00h=FREEZE, A3h 00h=ASPECT, D7h 00h=SOURCE, EEh 00h=LAMP MODE/ECO"

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
    command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: target
        type: integer
        description: "06h=Periphery Focus"
      - name: direction
        type: integer
        description: "00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s"
    notes: Send 00h to stop continuous drive. Same command re-issued during drive works without stop.

  - id: lens_control_2
    label: Lens Control 2
    kind: action
    command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
    params:
      - name: target
        type: integer
        description: "FFh=Stop"
      - name: mode
        type: integer
        description: "00h=absolute, 02h=relative"
      - name: value
        type: integer
        description: Signed 16-bit value (low byte, high byte)

  - id: lens_memory_control
    label: Lens Memory Control
    kind: action
    command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: operation
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  - id: reference_lens_memory_control
    label: Reference Lens Memory Control
    kind: action
    command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: operation
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET"
    notes: Operates on profile number set via lens_profile_set.

  - id: lens_memory_option_set
    label: Lens Memory Option Set
    kind: action
    command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: option
        type: integer
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: value
        type: integer
        description: "00h=OFF, 01h=ON"

  - id: lens_profile_set
    label: Lens Profile Set
    kind: action
    command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: profile
        type: integer
        description: "00h=Profile 1, 01h=Profile 2"

  - id: freeze_control
    label: Freeze Control
    kind: action
    command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: state
        type: integer
        description: "01h=On, 02h=Off"

  - id: eco_mode_set
    label: Eco Mode Set
    kind: action
    command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
    params:
      - name: mode_value
        type: integer
        description: Eco mode value (mapping in appendix - not in source)

  - id: projector_name_set
    label: Projector Name Set
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch <DATA01>-<DATA16> 00h <CKS>"
    params:
      - name: name
        type: string
        description: Projector name, up to 16 bytes

  - id: pip_pbp_set
    label: PIP/Picture by Picture Set
    kind: action
    command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
    params:
      - name: setting
        type: integer
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: value
        type: integer
        description: "MODE: 00h=PIP, 01h=PbP. POSITION: 00h=TL, 01h=TR, 02h=BL, 03h=BR. Sub input: see appendix."

  - id: edge_blending_set
    label: Edge Blending Mode Set
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
    params:
      - name: state
        type: integer
        description: "00h=OFF, 01h=ON"

  - id: audio_select_set
    label: Audio Select Set
    kind: action
    command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
    params:
      - name: input_terminal
        type: integer
        description: Input terminal value (see appendix - not in source)
      - name: audio_source
        type: integer
        description: "00h=Same as DATA01 terminal, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
feedbacks:
  - id: error_status
    label: Error Status
    type: binary
    command: "00h 88h 00h 00h 00h 88h"
    response: "20h 88h <ID1> <ID2> 0Ch <DATA01>-<DATA12> <CKS>"
    description: 12 bytes of error bit flags (cover, fan, temp, power, lamp, formatter, FPGA, mirror, ballast, iris, lens, interlock, etc.)

  - id: information_request
    label: Projector Information
    type: compound
    command: "03h 8Ah 00h 00h 00h 8Dh"
    response: "23h 8Ah <ID1> <ID2> 62h <DATA01>-<DATA98> <CKS>"
    description: "DATA01-49: projector name, DATA83-86: lamp usage time (seconds), DATA87-90: filter usage time (seconds)"

  - id: filter_usage
    label: Filter Usage Information
    type: compound
    command: "03h 95h 00h 00h 00h 98h"
    response: "23h 95h <ID1> <ID2> 08h <DATA01>-<DATA08> <CKS>"
    description: "DATA01-04: filter usage time (seconds), DATA05-08: filter alarm start time (seconds). -1 if undefined."

  - id: lamp_information
    label: Lamp Information
    type: compound
    command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: lamp
        description: "00h=Lamp 1, 01h=Lamp 2"
      - name: content
        description: "01h=usage time (seconds), 04h=remaining life (%)"
    response: "23h 96h <ID1> <ID2> 06h <DATA01>-<DATA06> <CKS>"
    description: "DATA03-06: requested value. Eco mode affects values. Negative remaining life = past deadline."

  - id: carbon_savings
    label: Carbon Savings Information
    type: compound
    command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: type
        description: "00h=Total, 01h=During operation"
    response: "23h 9Ah <ID1> <ID2> 09h <DATA01>-<DATA09> <CKS>"
    description: "DATA02-05: kg (max 99999), DATA06-09: mg (max 999999)"

  - id: lens_control_request
    label: Lens Control Request
    type: compound
    command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
    response: "22h 1Ch <ID1> <ID2> 08h <DATA01> 00h <DATA02>-<DATA07> <CKS>"
    description: "Returns upper limit (2 bytes), lower limit (2 bytes), current value (2 bytes) for specified lens axis."

  - id: lens_memory_option_request
    label: Lens Memory Option Request
    type: compound
    command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: option
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    response: "22h 20h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"
    description: "DATA02: 00h=OFF, 01h=ON"

  - id: lens_information
    label: Lens Information
    type: binary
    command: "02h 22h 00h 00h 01h 00h 25h"
    response: "22h 22h <ID1> <ID2> 02h 00h <DATA01> <CKS>"
    description: "Bit flags: Bit0=lens memory, Bit1=zoom, Bit2=focus, Bit3=lens shift H, Bit4=lens shift V. 0=stopped, 1=operating."

  - id: lens_profile_request
    label: Lens Profile Request
    type: enum
    command: "02h 28h 00h 00h 00h 2Ah"
    response: "22h 28h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"
    values:
      - "00h: Profile 1"
      - "01h: Profile 2"

  - id: gain_parameter_request
    label: Gain Parameter Request
    type: compound
    command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
    params:
      - name: target
        description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness, 05h=Volume, 96h=Lamp Adjust"
    response: "23h 05h <ID1> <ID2> 10h <DATA01>-<DATA16> <CKS>"
    description: "Returns status, upper/lower limit, default, current value, wide/narrow adjustment width."

  - id: setting_request
    label: Setting Request
    type: compound
    command: "00h 85h 00h 00h 01h 00h 86h"
    response: "20h 85h <ID1> <ID2> 20h <DATA01>-<DATA32> <CKS>"
    description: "DATA01-03: base model type, DATA04: sound function (00h=not available, 01h=available), DATA05: profile features."

  - id: running_status
    label: Running Status
    type: enum
    command: "00h 85h 00h 00h 01h 01h 87h"
    response: "20h 85h <ID1> <ID2> 10h <DATA01>-<DATA16> <CKS>"
    description: "DATA03 power: 00h=standby, 01h=on. DATA04 cooling. DATA05 power process. DATA06 operation: 00h=standby(sleep), 04h=on, 05h=cooling, 06h=standby(error), 0Fh=standby(power saving), 10h=network standby."

  - id: input_status
    label: Input Status
    type: compound
    command: "00h 85h 00h 00h 01h 02h 88h"
    response: "20h 85h <ID1> <ID2> 10h <DATA01>-<DATA16> <CKS>"
    description: "Signal switch process, signal list number, selection signal type 1/2, signal list type, test pattern, content displayed."

  - id: mute_status
    label: Mute Status
    type: compound
    command: "00h 85h 00h 00h 01h 03h 89h"
    response: "20h 85h <ID1> <ID2> 10h <DATA01>-<DATA16> <CKS>"
    description: "DATA01: picture mute, DATA02: sound mute, DATA03: onscreen mute, DATA04: forced onscreen mute, DATA05: onscreen display."

  - id: model_name
    label: Model Name
    type: string
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    response: "20h 85h <ID1> <ID2> 20h <DATA01>-<DATA32> <CKS>"
    description: "NUL-terminated model name string (up to 32 bytes)."

  - id: cover_status
    label: Cover Status
    type: enum
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    response: "20h 85h <ID1> <ID2> 01h <DATA01> <CKS>"
    values:
      - "00h: Normal (cover opened)"
      - "01h: Cover closed"

  - id: info_string_request
    label: Information String Request
    type: string
    command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
    params:
      - name: info_type
        description: "03h=horizontal sync frequency, 04h=vertical sync frequency"
    response: "20h D0h <ID1> <ID2> LEN <DATA01> 01h <DATA02>-<DATA??> <CKS>"
    description: Returns label and information string.

  - id: eco_mode_request
    label: Eco Mode Request
    type: integer
    command: "03h B0h 00h 00h 01h 07h BBh"
    response: "23h B0h <ID1> <ID2> 02h 07h <DATA01> <CKS>"
    description: Returns eco mode value (mapping in appendix - not in source).

  - id: projector_name_request
    label: Projector Name Request
    type: string
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    response: "23h B0h <ID1> <ID2> 12h 2Ch <DATA01>-<DATA17> <CKS>"
    description: NUL-terminated projector name string (up to 17 bytes).

  - id: mac_address_request
    label: MAC Address Request
    type: string
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    response: "23h B0h <ID1> <ID2> 08h 9Ah 00h <DATA01>-<DATA06> <CKS>"
    description: 6-byte MAC address.

  - id: pip_pbp_request
    label: PIP/Picture by Picture Request
    type: compound
    command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
    params:
      - name: setting
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    response: "23h B0h <ID1> <ID2> 03h C5h <DATA01> <DATA02> <CKS>"

  - id: edge_blending_request
    label: Edge Blending Mode Request
    type: enum
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    response: "23h B0h <ID1> <ID2> 03h DFh 00h <DATA01> <CKS>"
    values:
      - "00h: OFF"
      - "01h: ON"

  - id: base_model_type_request
    label: Base Model Type Request
    type: compound
    command: "00h BFh 00h 00h 01h 00h C0h"
    response: "20h BFh <ID1> <ID2> 10h 00h <DATA01>-<DATA15> <CKS>"
    description: "DATA01-02: base model type, DATA03-11: model name, DATA12-13: base model type duplicate."

  - id: serial_number_request
    label: Serial Number Request
    type: string
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    response: "20h BFh <ID1> <ID2> 12h 01h 06h <DATA01>-<DATA16> <CKS>"
    description: NUL-terminated serial number string.

  - id: basic_information_request
    label: Basic Information Request
    type: compound
    command: "00h BFh 00h 00h 01h 02h C2h"
    response: "20h BFh <ID1> <ID2> 10h 02h <DATA01>-<DATA15> <CKS>"
    description: "DATA01: operation status (00h=standby, 04h=on, 05h=cooling, 06h=standby error, 0Fh=power saving, 10h=network standby). DATA02: content displayed. DATA03-04: signal type. DATA05: display signal type. DATA06-09: mute/freeze status."
```

## Variables
```yaml
# UNRESOLVED: no settable continuous variables beyond what Actions cover
# All adjustable parameters (picture, volume, lamp) are set via action commands with embedded values.
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification protocol described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: interlock switch mentioned in error status (DATA09 Bit1) but no
# safety procedure details in source. Power on/off blocks other commands during execution.
```

## Notes

- Protocol is binary (hex byte sequences). All commands include a trailing checksum byte (low-order byte of sum of all preceding bytes).
- Common parameters: ID1 (control ID set on projector), ID2 (model code), CKS (checksum), LEN (data length), ERR1/ERR2 (error codes).
- Error codes: ERR1/ERR2 combinations indicate failure reason (unrecognized command, unsupported, invalid value, power off, etc.).
- Several commands reference an appendix ("Supplementary Information by Command") for input terminal values, aspect values, eco mode values, and sub-input values — this appendix is not present in the source.
- Baud rate is selectable from {115200, 38400, 19200, 9600, 4800} — no single default stated.
- Lamp usage time updates at one-minute intervals despite one-second resolution.
- Wireless LAN control supported via optional wireless LAN unit (details in separate operation manual).
- TCP port 7142 for LAN control (both wired and wireless).

<!-- UNRESOLVED: input terminal byte value mapping (appendix not in source) -->
<!-- UNRESOLVED: aspect value mapping (appendix not in source) -->
<!-- UNRESOLVED: eco mode value mapping (appendix not in source) -->
<!-- UNRESOLVED: sub input value mapping for PIP/PbP (appendix not in source) -->
<!-- UNRESOLVED: base model type value mapping (appendix not in source) -->
<!-- UNRESOLVED: default baud rate (multiple supported, no single default stated) -->
<!-- UNRESOLVED: flow control setting for serial -->
<!-- UNRESOLVED: firmware version compatibility -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-13T07:32:51.141Z
last_checked_at: 2026-06-02T22:10:02.213Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:10:02.213Z
matched_actions: 28
action_count: 28
confidence: medium
summary: "All 28 spec actions traced to source (dip-safe re-verify). (19 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "input terminal value mapping (referenced as \"Supplementary Information by Command\" appendix — not in source)"
- "eco mode value mapping (referenced as \"Supplementary Information by Command\" appendix — not in source)"
- "aspect value mapping (referenced as \"Supplementary Information by Command\" appendix — not in source)"
- "sub input value mapping for PIP/PbP (referenced as \"Supplementary Information by Command\" appendix — not in source)"
- "base model type value mapping (referenced as \"Supplementary Information by Command\" appendix — not in source)"
- "multiple supported (115200/38400/19200/9600/4800) - no single default stated"
- "flow control not stated in source"
- "no settable continuous variables beyond what Actions cover"
- "no unsolicited notification protocol described in source"
- "no multi-step macro sequences described in source"
- "interlock switch mentioned in error status (DATA09 Bit1) but no"
- "input terminal byte value mapping (appendix not in source)"
- "aspect value mapping (appendix not in source)"
- "eco mode value mapping (appendix not in source)"
- "sub input value mapping for PIP/PbP (appendix not in source)"
- "base model type value mapping (appendix not in source)"
- "default baud rate (multiple supported, no single default stated)"
- "flow control setting for serial"
- "firmware version compatibility"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
