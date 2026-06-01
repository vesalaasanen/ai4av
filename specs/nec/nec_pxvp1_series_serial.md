---
spec_id: admin/nec-pxvp1-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC PXVP1 Series Control Spec"
manufacturer: NEC
model_family: "PXVP1 Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "PXVP1 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-05-31T06:51:02.708Z
generated_at: 2026-05-31T06:51:02.708Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-31T06:51:02.708Z
  matched_actions: 28
  action_count: 28
  confidence: high
  summary: "All 28 action commands match source hex sequences exactly; transport parameters verified in source; feedbacks enumerate status queries."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-23
---

# NEC PXVP1 Series Control Spec

## Summary
NEC PXVP1 Series projector with binary control protocol over RS-232C serial and TCP/IP (LAN). Commands are hex-encoded with checksum. Covers power, input switching, picture/audio adjustment, lens control, shutter, freeze, eco mode, edge blending, PIP, and extensive status queries.

<!-- UNRESOLVED: input terminal value mapping references appendix not included in source -->
<!-- UNRESOLVED: eco mode value mapping references appendix not included in source -->
<!-- UNRESOLVED: aspect value mapping references appendix not included in source -->
<!-- UNRESOLVED: base model type value mapping references appendix not included in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142
serial:
  baud_rate: 115200  # UNRESOLVED: source lists 115200/38400/19200/9600/4800 - default not stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: RTS/CTS pins wired but flow control setting not stated
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred from power on/off commands
  - routable     # inferred from input switch commands
  - queryable    # inferred from numerous request commands
  - levelable    # inferred from volume/picture/lamp adjust commands
```

## Actions
```yaml
actions:
  - id: power_on
    label: Power On
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    description: "Turns on projector power. No other commands accepted during power-on sequence."
    params: []

  - id: power_off
    label: Power Off
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    description: "Turns off projector power. No other commands accepted during cooldown."
    params: []

  - id: input_switch
    label: Input Switch
    kind: action
    command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
    description: "Switches the input terminal or entry list."
    params:
      - name: input
        type: integer
        description: "Input terminal selector (hex). See appendix for values."

  - id: picture_mute_on
    label: Picture Mute On
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    description: "Turns picture mute on. Cleared by input/video signal switch."
    params: []

  - id: picture_mute_off
    label: Picture Mute Off
    kind: action
    command: "02h 11h 00h 00h 00h 13h"
    description: "Turns picture mute off."
    params: []

  - id: sound_mute_on
    label: Sound Mute On
    kind: action
    command: "02h 12h 00h 00h 00h 14h"
    description: "Turns sound mute on. Cleared by input/video signal switch or volume adjust."
    params: []

  - id: sound_mute_off
    label: Sound Mute Off
    kind: action
    command: "02h 13h 00h 00h 00h 15h"
    description: "Turns sound mute off."
    params: []

  - id: onscreen_mute_on
    label: Onscreen Mute On
    kind: action
    command: "02h 14h 00h 00h 00h 16h"
    description: "Turns onscreen mute on. Cleared by input/video signal switch."
    params: []

  - id: onscreen_mute_off
    label: Onscreen Mute Off
    kind: action
    command: "02h 15h 00h 00h 00h 17h"
    description: "Turns onscreen mute off."
    params: []

  - id: picture_adjust
    label: Picture Adjust
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> <DATA03> <DATA04> <CKS>"
    description: "Adjusts picture parameters."
    params:
      - name: target
        type: integer
        description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
      - name: mode
        type: integer
        description: "00h=Absolute, 01h=Relative"
      - name: value
        type: integer
        description: "16-bit adjustment value (low byte, high byte)"

  - id: volume_adjust
    label: Volume Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
    description: "Adjusts sound volume."
    params:
      - name: mode
        type: integer
        description: "00h=Absolute, 01h=Relative"
      - name: value
        type: integer
        description: "16-bit adjustment value (low byte, high byte)"

  - id: aspect_adjust
    label: Aspect Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
    description: "Adjusts aspect ratio."
    params:
      - name: aspect
        type: integer
        description: "Aspect value. See appendix for values."

  - id: lamp_adjust
    label: Lamp/Light Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 96h FFh <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
    description: "Adjusts lamp/light output."
    params:
      - name: mode
        type: integer
        description: "00h=Absolute, 01h=Relative"
      - name: value
        type: integer
        description: "16-bit adjustment value (low byte, high byte)"

  - id: remote_key_code
    label: Remote Key Code
    kind: action
    command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
    description: "Sends a remote control key code."
    params:
      - name: key_code
        type: integer
        description: "16-bit key code (WORD). e.g. 0200h=POWER ON, 0300h=POWER OFF, 0500h=AUTO, 0600h=MENU"

  - id: shutter_close
    label: Shutter Close
    kind: action
    command: "02h 16h 00h 00h 00h 18h"
    description: "Closes the lens shutter."
    params: []

  - id: shutter_open
    label: Shutter Open
    kind: action
    command: "02h 17h 00h 00h 00h 19h"
    description: "Opens the lens shutter."
    params: []

  - id: lens_control
    label: Lens Control
    kind: action
    command: "02h 18h 00h 00h 02h 06h <DATA02> <CKS>"
    description: "Adjusts lens position (periphery focus). Supports timed or continuous drive."
    params:
      - name: direction
        type: integer
        description: "00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s"

  - id: lens_control_2
    label: Lens Control 2
    kind: action
    command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
    description: "Adjusts lens position with absolute or relative value."
    params:
      - name: target
        type: integer
        description: "FFh=Stop, other values for lens axis"
      - name: mode
        type: integer
        description: "00h=Absolute, 02h=Relative"
      - name: value
        type: integer
        description: "16-bit adjustment value (low byte, high byte)"

  - id: lens_memory_control
    label: Lens Memory Control
    kind: action
    command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
    description: "Controls lens memory (move/store/reset)."
    params:
      - name: operation
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  - id: reference_lens_memory_control
    label: Reference Lens Memory Control
    kind: action
    command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
    description: "Controls reference lens memory for the profile set via lens profile set."
    params:
      - name: operation
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  - id: lens_memory_option_set
    label: Lens Memory Option Set
    kind: action
    command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    description: "Sets lens memory options."
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
    description: "Selects reference lens memory profile number."
    params:
      - name: profile
        type: integer
        description: "00h=Profile 1, 01h=Profile 2"

  - id: freeze_control
    label: Freeze Control
    kind: action
    command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
    description: "Toggles freeze function on or off."
    params:
      - name: state
        type: integer
        description: "01h=On, 02h=Off"

  - id: eco_mode_set
    label: Eco Mode Set
    kind: action
    command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
    description: "Sets eco/light/lamp mode."
    params:
      - name: mode
        type: integer
        description: "Eco mode value. See appendix for values."

  - id: projector_name_set
    label: Projector Name Set
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch <DATA01-16> 00h <CKS>"
    description: "Sets the projector name (up to 16 bytes)."
    params:
      - name: name
        type: string
        description: "Projector name (up to 16 bytes, NUL terminated)"

  - id: pip_set
    label: PIP/Picture by Picture Set
    kind: action
    command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
    description: "Sets picture-in-picture or picture-by-picture mode."
    params:
      - name: target
        type: integer
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: value
        type: integer
        description: "For MODE: 00h=PIP, 01h=PbP. For POSITION: 00h=TL, 01h=TR, 02h=BL, 03h=BR."

  - id: edge_blending_set
    label: Edge Blending Set
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
    description: "Enables or disables edge blending."
    params:
      - name: state
        type: integer
        description: "00h=OFF, 01h=ON"

  - id: audio_select_set
    label: Audio Select Set
    kind: action
    command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
    description: "Sets audio input selection for a given terminal."
    params:
      - name: terminal
        type: integer
        description: "Input terminal selector."
      - name: source
        type: integer
        description: "00h=Same as terminal, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
feedbacks:
  - id: error_status
    label: Error Status
    type: binary
    command: "00h 88h 00h 00h 00h 88h"
    description: "Returns 12 bytes of error bitfield. Bit=0 normal, bit=1 error. Covers cover, fan, temp, power, lamp, formatter, FPGA, ballast, iris, interlock errors."

  - id: power_status
    label: Running Status
    type: enum
    command: "00h 85h 00h 00h 01h 01h 87h"
    description: "Returns power/cooling/power-process/operation status."
    values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]

  - id: input_status
    label: Input Status
    type: composite
    command: "00h 85h 00h 00h 01h 02h 88h"
    description: "Returns signal switch state, signal list number, signal types, test pattern, content displayed."

  - id: mute_status
    label: Mute Status
    type: composite
    command: "00h 85h 00h 00h 01h 03h 89h"
    description: "Returns picture/sound/onscreen/forced-onscreen mute and OSD status."
    values: [off, on]

  - id: model_name
    label: Model Name
    type: string
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    description: "Returns model name string."

  - id: cover_status
    label: Cover Status
    type: enum
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    description: "Mirror/lens cover status."
    values: [normal_open, closed]

  - id: information_request
    label: Projector Information
    type: composite
    command: "03h 8Ah 00h 00h 00h 8Dh"
    description: "Returns projector name, lamp usage time (seconds), filter usage time (seconds)."

  - id: filter_usage
    label: Filter Usage
    type: composite
    command: "03h 95h 00h 00h 00h 98h"
    description: "Returns filter usage time (seconds) and filter alarm start time (seconds)."

  - id: lamp_info
    label: Lamp Information
    type: composite
    command: "03h 96h 00h 00h 02h <lamp> <content> <CKS>"
    description: "Returns lamp usage time or remaining life %."
    params:
      - name: lamp
        description: "00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
      - name: content
        description: "01h=usage time (seconds), 04h=remaining life (%)"

  - id: carbon_savings
    label: Carbon Savings
    type: composite
    command: "03h 9Ah 00h 00h 01h <type> <CKS>"
    description: "Returns carbon savings in kg and mg."
    params:
      - name: type
        description: "00h=Total, 01h=During operation"

  - id: lens_control_request
    label: Lens Position
    type: composite
    command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
    description: "Returns lens adjustment range and current value for specified axis."

  - id: lens_memory_option_request
    label: Lens Memory Option
    type: composite
    command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
    description: "Returns lens memory option setting."
    params:
      - name: option
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

  - id: lens_info_request
    label: Lens Operation Status
    type: binary
    command: "02h 22h 00h 00h 01h 00h 25h"
    description: "Returns bitfield of lens operation status (memory/zoom/focus/shift-H/shift-V)."

  - id: lens_profile_request
    label: Lens Profile
    type: enum
    command: "02h 28h 00h 00h 00h 2Ah"
    description: "Returns selected reference lens memory profile."
    values: [profile_1, profile_2]

  - id: gain_parameter_request
    label: Gain Parameter
    type: composite
    command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
    description: "Returns adjustment range, default, current value for picture/volume/lamp parameters."
    params:
      - name: target
        description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness, 05h=Volume, 96h=Lamp/Light"

  - id: setting_request
    label: Settings
    type: composite
    command: "00h 85h 00h 00h 01h 00h 86h"
    description: "Returns base model type, sound function availability, profile number."

  - id: information_string_request
    label: Information String
    type: string
    command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
    description: "Returns H/V sync frequency strings."
    params:
      - name: type
        description: "03h=Horizontal sync freq, 04h=Vertical sync freq"

  - id: eco_mode_request
    label: Eco Mode
    type: integer
    command: "03h B0h 00h 00h 01h 07h BBh"
    description: "Returns current eco/light/lamp mode value."

  - id: projector_name_request
    label: Projector Name
    type: string
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    description: "Returns projector name (up to 17 bytes)."

  - id: mac_address_request
    label: MAC Address
    type: string
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    description: "Returns MAC address (6 bytes)."

  - id: pip_request
    label: PIP/Picture by Picture Status
    type: composite
    command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
    description: "Returns PIP/PbP mode, start position, or sub-input setting."

  - id: edge_blending_request
    label: Edge Blending Status
    type: enum
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    description: "Returns edge blending on/off."
    values: [off, on]

  - id: base_model_type_request
    label: Base Model Type
    type: composite
    command: "00h BFh 00h 00h 01h 00h C0h"
    description: "Returns base model type and model name."

  - id: serial_number_request
    label: Serial Number
    type: string
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    description: "Returns projector serial number."

  - id: basic_info_request
    label: Basic Information
    type: composite
    command: "00h BFh 00h 00h 01h 02h C2h"
    description: "Returns operation status, content displayed, signal types, video/sound/onscreen mute, freeze status."
```

## Variables
```yaml
variables:
  - id: brightness
    label: Brightness
    type: integer
    description: "Picture brightness. Adjustable via picture_adjust (target 00h)."

  - id: contrast
    label: Contrast
    type: integer
    description: "Picture contrast. Adjustable via picture_adjust (target 01h)."

  - id: color
    label: Color
    type: integer
    description: "Picture color. Adjustable via picture_adjust (target 02h)."

  - id: hue
    label: Hue
    type: integer
    description: "Picture hue. Adjustable via picture_adjust (target 03h)."

  - id: sharpness
    label: Sharpness
    type: integer
    description: "Picture sharpness. Adjustable via picture_adjust (target 04h)."

  - id: volume
    label: Volume
    type: integer
    description: "Sound volume level. Adjustable via volume_adjust."

  - id: lamp_output
    label: Lamp/Light Output
    type: integer
    description: "Lamp intensity. Adjustable via lamp_adjust (other adjust target 96h FFh)."

  - id: aspect
    label: Aspect Ratio
    type: integer
    description: "Aspect ratio setting. Values per appendix."

  - id: eco_mode
    label: Eco/Lamp Mode
    type: integer
    description: "Eco mode setting. Values per appendix."

  - id: projector_name
    label: Projector Name
    type: string
    description: "LAN projector name (up to 16 bytes)."
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification events described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source notes: power on/off commands block all other commands during execution
# (power-on sequence and cooldown period). No explicit safety interlocks documented.
# UNRESOLVED: no explicit power-on sequencing or interlock procedures found in source
```

## Notes
- Binary protocol: all commands are hex byte sequences with a trailing checksum byte.
- Checksum = low-order byte of sum of all preceding bytes.
- Commands include ID1 (control ID set on projector) and ID2 (model code) in responses.
- Multiple baud rates supported (115200/38400/19200/9600/4800) — default not stated.
- TCP port 7142 for LAN control.
- Input terminal, eco mode, aspect ratio, and base model type value mappings reference an appendix not included in the source document.
- Two-lamp models support Lamp 2 queries (DATA01=01h).
- Lamp remaining life can return negative value when replacement deadline exceeded.
- Lens control supports both timed (0.25s/0.5s/1s) and continuous drive modes; continuous drive requires explicit stop command.
<!-- UNRESOLVED: appendix value tables for input terminals, eco modes, aspect ratios, base model types not in source -->
<!-- UNRESOLVED: flow control setting not stated despite RTS/CTS wiring -->
<!-- UNRESOLVED: default baud rate not stated -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-05-31T06:51:02.708Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T06:51:02.708Z
matched_actions: 28
action_count: 28
confidence: high
summary: "All 28 action commands match source hex sequences exactly; transport parameters verified in source; feedbacks enumerate status queries."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
