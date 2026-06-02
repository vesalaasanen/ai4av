---
spec_id: admin/nec-m4x1-m551-m651
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC M4x1 M551 M651 Control Spec"
manufacturer: NEC
model_family: M4x1
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - M4x1
    - M551
    - M651
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-13T07:59:10.352Z
last_checked_at: 2026-06-02T22:10:33.874Z
generated_at: 2026-06-02T22:10:33.874Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "input terminal value mapping references appendix not included in source"
  - "eco mode value mapping references appendix not included in source"
  - "aspect value mapping references appendix not included in source"
  - "sub input setting value mapping references appendix not included in source"
  - "base model type value mapping references appendix not included in source"
  - "flow control not stated; full duplex noted"
  - "continuous variables (brightness, contrast, volume, etc.) have adjustable ranges"
  - "no event/push notification model documented"
  - "no multi-step macro sequences described in source"
  - "no explicit safety interlock procedures documented in source"
  - "appendix with input terminal, aspect, eco mode, sub input, base model type value mappings not included in source"
  - "flow control for serial not specified beyond \"full duplex\""
  - "default baud rate not stated; multiple rates supported"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:10:33.874Z
  matched_actions: 28
  action_count: 28
  confidence: medium
  summary: "All 28 spec actions traced to source (dip-safe re-verify). (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# NEC M4x1 M551 M651 Control Spec

## Summary

NEC M4x1, M551, and M651 projectors controlled via binary RS-232C or TCP/IP. Protocol uses hex byte frames with checksum. Supports power, input switching, picture/sound/onscreen mute, lens control, volume, eco mode, edge blending, PIP, and various status queries.

<!-- UNRESOLVED: input terminal value mapping references appendix not included in source -->
<!-- UNRESOLVED: eco mode value mapping references appendix not included in source -->
<!-- UNRESOLVED: aspect value mapping references appendix not included in source -->
<!-- UNRESOLVED: sub input setting value mapping references appendix not included in source -->
<!-- UNRESOLVED: base model type value mapping references appendix not included in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate:
    - 4800
    - 9600
    - 19200
    - 38400
    - 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated; full duplex noted
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred from power on/off commands
  - queryable    # inferred from multiple request commands
  - routable     # inferred from input switch command
  - levelable    # inferred from volume/brightness/contrast/lamp adjust
```

## Actions
```yaml
actions:
  - id: power_on
    label: Power On
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    description: "Turns on projector. No other commands accepted during power-on sequence."
    params: []

  - id: power_off
    label: Power Off
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    description: "Turns off projector. No other commands accepted during cooling."
    params: []

  - id: input_switch
    label: Input Switch
    kind: action
    command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
    description: "Switches input terminal or entry list."
    params:
      - name: input_terminal
        type: integer
        description: "Input terminal byte value. See appendix for full mapping. Example: 06h = video port."

  - id: picture_mute_on
    label: Picture Mute On
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    description: "Turns picture mute on. Cleared by input or signal switch."
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
    description: "Turns sound mute on. Cleared by input/signal switch or volume adjust."
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
    description: "Turns onscreen mute on. Cleared by input or signal switch."
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
    description: "Adjusts picture parameters (brightness, contrast, color, hue, sharpness)."
    params:
      - name: target
        type: integer
        description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
      - name: mode
        type: integer
        description: "00h=absolute, 01h=relative"
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
        description: "00h=absolute, 01h=relative"
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
        description: "Aspect value byte. See appendix for mapping."

  - id: lamp_adjust
    label: Lamp/Light Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 96h FFh <DATA03> <DATA04> <DATA05> <CKS>"
    description: "Adjusts lamp/light output."
    params:
      - name: mode
        type: integer
        description: "00h=absolute, 01h=relative"
      - name: value
        type: integer
        description: "16-bit adjustment value (low byte, high byte)"

  - id: remote_key_code
    label: Remote Key Code
    kind: action
    command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
    description: "Sends remote control key code."
    params:
      - name: key_code
        type: integer
        description: "WORD key code. Examples: 02h 00h=POWER ON, 03h 00h=POWER OFF, 05h 00h=AUTO, 06h 00h=MENU, 07h 00h=UP, 08h 00h=DOWN, 09h 00h=RIGHT, 0Ah 00h=LEFT, 0Bh 00h=ENTER, 0Ch 00h=EXIT"

  - id: shutter_close
    label: Shutter Close
    kind: action
    command: "02h 16h 00h 00h 00h 18h"
    description: "Closes lens shutter."
    params: []

  - id: shutter_open
    label: Shutter Open
    kind: action
    command: "02h 17h 00h 00h 00h 19h"
    description: "Opens lens shutter."
    params: []

  - id: lens_control
    label: Lens Control
    kind: action
    command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    description: "Adjusts lens position (periphery focus). Timed or continuous drive."
    params:
      - name: target
        type: integer
        description: "06h=Periphery Focus"
      - name: direction
        type: integer
        description: "00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s"

  - id: lens_control_2
    label: Lens Control 2
    kind: action
    command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
    description: "Adjusts lens position with absolute/relative value."
    params:
      - name: target
        type: integer
        description: "FFh=Stop, other values for lens axis"
      - name: mode
        type: integer
        description: "00h=absolute, 02h=relative"
      - name: value
        type: integer
        description: "16-bit adjustment value (low byte, high byte)"

  - id: lens_memory_control
    label: Lens Memory Control
    kind: action
    command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
    description: "Controls lens memory. MOVE, STORE, or RESET."
    params:
      - name: operation
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  - id: reference_lens_memory_control
    label: Reference Lens Memory Control
    kind: action
    command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
    description: "Controls reference lens memory for current profile. MOVE, STORE, or RESET."
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
    description: "Sets eco mode. Value mapping in appendix."
    params:
      - name: mode
        type: integer
        description: "Eco mode value. See appendix for mapping."

  - id: projector_name_set
    label: Projector Name Set
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch <DATA01>-<DATA16> 00h <CKS>"
    description: "Sets projector name (up to 16 bytes)."
    params:
      - name: name
        type: string
        description: "Projector name, up to 16 bytes"

  - id: pip_pbp_set
    label: PIP/Picture by Picture Set
    kind: action
    command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
    description: "Sets PIP or picture-by-picture mode, position, or sub input."
    params:
      - name: target
        type: integer
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: value
        type: integer
        description: "MODE: 00h=PIP, 01h=PBP. POSITION: 00h=TL, 01h=TR, 02h=BL, 03h=BR. Sub input: see appendix."

  - id: edge_blending_set
    label: Edge Blending Set
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
    description: "Sets edge blending on or off."
    params:
      - name: state
        type: integer
        description: "00h=OFF, 01h=ON"

  - id: audio_select_set
    label: Audio Select Set
    kind: action
    command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
    description: "Sets audio source for a given input terminal."
    params:
      - name: input_terminal
        type: integer
        description: "Input terminal byte. See appendix for mapping."
      - name: source
        type: integer
        description: "00h=Terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
feedbacks:
  - id: error_status
    label: Error Status
    type: binary
    command: "00h 88h 00h 00h 00h 88h"
    description: "Returns 12 bytes of error bitfield. Bit=0 normal, bit=1 error. Covers cover, fan, temperature, power, lamp, formatter, FPGA, iris, ballast, interlock, lens errors."

  - id: power_status
    label: Power Status
    type: enum
    values: [standby, power_on, cooling, standby_error, standby_sleep, standby_power_saving, network_standby]
    description: "From RUNNING STATUS REQUEST DATA03+DATA06. 00h=Standby(Sleep), 04h=Power on, 05h=Cooling, 06h=Standby(error), 0Fh=Standby(Power saving), 10h=Network standby."

  - id: input_status
    label: Input Status
    type: composite
    command: "00h 85h 00h 00h 01h 02h 88h"
    description: "Returns signal type 1/2, signal list number, test pattern state, content displayed."

  - id: mute_status
    label: Mute Status
    type: composite
    command: "00h 85h 00h 00h 01h 03h 89h"
    description: "Returns picture mute, sound mute, onscreen mute, forced onscreen mute, OSD display (each 00h=Off, 01h=On)."

  - id: model_name
    label: Model Name
    type: string
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    description: "Returns model name as NUL-terminated string (up to 32 bytes)."

  - id: cover_status
    label: Cover Status
    type: enum
    values: [normal_open, closed]
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    description: "00h=Normal (cover opened), 01h=Cover closed."

  - id: projector_info
    label: Projector Information
    type: composite
    command: "03h 8Ah 00h 00h 00h 8Dh"
    description: "Returns projector name (49 bytes), lamp usage time (seconds, 4 bytes), filter usage time (seconds, 4 bytes)."

  - id: filter_usage
    label: Filter Usage
    type: composite
    command: "03h 95h 00h 00h 00h 98h"
    description: "Returns filter usage time and filter alarm start time (seconds). -1 if undefined."

  - id: lamp_info
    label: Lamp Information
    type: composite
    command: "03h 96h 00h 00h 02h <lamp_select> <content_type> <CKS>"
    description: "lamp_select: 00h=Lamp 1, 01h=Lamp 2. content_type: 01h=usage time (seconds), 04h=remaining life (%). Negative remaining life if deadline exceeded."

  - id: carbon_savings
    label: Carbon Savings
    type: composite
    command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
    description: "DATA01: 00h=Total, 01h=During operation. Returns kg (4 bytes, max 99999) + mg (4 bytes, max 999999)."

  - id: gain_parameter
    label: Gain Parameter
    type: composite
    command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
    description: "DATA01: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness, 05h=Volume, 96h=Lamp adjust. Returns status, upper/lower/default/current values, adjustment widths."

  - id: lens_position
    label: Lens Position
    type: composite
    command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
    description: "Returns upper limit, lower limit, current value (16-bit each) for specified lens axis."

  - id: lens_information
    label: Lens Information
    type: binary
    command: "02h 22h 00h 00h 01h 00h 25h"
    description: "Bitfield: bit0=lens memory, bit1=zoom, bit2=focus, bit3=lens shift H, bit4=lens shift V (0=Stop, 1=During operation)."

  - id: lens_memory_option
    label: Lens Memory Option
    type: composite
    command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
    description: "DATA01: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE. Returns setting: 00h=OFF, 01h=ON."

  - id: lens_profile
    label: Lens Profile
    type: enum
    values: [profile_1, profile_2]
    command: "02h 28h 00h 00h 00h 2Ah"
    description: "00h=Profile 1, 01h=Profile 2."

  - id: info_string
    label: Information String
    type: string
    command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
    description: "DATA01: 03h=horizontal sync freq, 04h=vertical sync freq. Returns NUL-terminated string."

  - id: eco_mode
    label: Eco Mode
    type: integer
    command: "03h B0h 00h 00h 01h 07h BBh"
    description: "Returns current eco mode value. See appendix for mapping."

  - id: projector_name
    label: Projector Name
    type: string
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    description: "Returns projector name as NUL-terminated string (up to 17 bytes)."

  - id: mac_address
    label: MAC Address
    type: string
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    description: "Returns 6-byte MAC address."

  - id: pip_pbp_status
    label: PIP/PBP Status
    type: composite
    command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
    description: "DATA01 selects query: 00h=MODE, 01h=POSITION, 02h=SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."

  - id: edge_blending_status
    label: Edge Blending Status
    type: enum
    values: [off, on]
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    description: "00h=OFF, 01h=ON."

  - id: base_model_type
    label: Base Model Type
    type: composite
    command: "00h BFh 00h 00h 01h 00h C0h"
    description: "Returns base model type (2 bytes), model name string, second base model type (2 bytes)."

  - id: serial_number
    label: Serial Number
    type: string
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    description: "Returns serial number as NUL-terminated string (up to 16 bytes)."

  - id: basic_information
    label: Basic Information
    type: composite
    command: "00h BFh 00h 00h 01h 02h C2h"
    description: "Returns operation status, content displayed, signal types, video/sound/onscreen mute, freeze status."

  - id: settings
    label: Settings
    type: composite
    command: "00h 85h 00h 00h 01h 00h 86h"
    description: "Returns base model type, sound function availability, profile/sleep timer capability."
```

## Variables
```yaml
# UNRESOLVED: continuous variables (brightness, contrast, volume, etc.) have adjustable ranges
# returned dynamically by gain_parameter request; static range not documented.
```

## Events
```yaml
# Source does not describe unsolicited notifications from projector.
# UNRESOLVED: no event/push notification model documented
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Power on/off commands block all other commands during execution.
# Lens continuous drive (7Fh/81h) requires explicit stop (00h) command.
# UNRESOLVED: no explicit safety interlock procedures documented in source
```

## Notes

Protocol uses binary hex frames. Command format: `<CMD_BYTE> <SUB_BYTE> <ID1> <ID2> <LEN> <DATA...> <CKS>`. Response prefix has high bit set (e.g. command 02h → response 22h on success, A2h on error).

Checksum: sum all bytes preceding CKS, take low-order 8 bits.

ID1 = projector control ID (configurable). ID2 = model code (model-dependent).

Error responses use A-prefix (command 02h → A2h) with ERR1/ERR2 byte pairs. Key errors: 00h 00h=unrecognized command, 01h 00h=invalid value, 02h 0Dh=command rejected (power off), 02h 0Eh=execution failed.

Input terminal values, aspect values, eco mode values, sub input values, and base model type values reference an appendix not included in this source extract.

Lamp usage time returned in seconds, updated at one-minute intervals. Remaining life can be negative if replacement deadline exceeded.

<!-- UNRESOLVED: appendix with input terminal, aspect, eco mode, sub input, base model type value mappings not included in source -->
<!-- UNRESOLVED: flow control for serial not specified beyond "full duplex" -->
<!-- UNRESOLVED: default baud rate not stated; multiple rates supported -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-13T07:59:10.352Z
last_checked_at: 2026-06-02T22:10:33.874Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:10:33.874Z
matched_actions: 28
action_count: 28
confidence: medium
summary: "All 28 spec actions traced to source (dip-safe re-verify). (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "input terminal value mapping references appendix not included in source"
- "eco mode value mapping references appendix not included in source"
- "aspect value mapping references appendix not included in source"
- "sub input setting value mapping references appendix not included in source"
- "base model type value mapping references appendix not included in source"
- "flow control not stated; full duplex noted"
- "continuous variables (brightness, contrast, volume, etc.) have adjustable ranges"
- "no event/push notification model documented"
- "no multi-step macro sequences described in source"
- "no explicit safety interlock procedures documented in source"
- "appendix with input terminal, aspect, eco mode, sub input, base model type value mappings not included in source"
- "flow control for serial not specified beyond \"full duplex\""
- "default baud rate not stated; multiple rates supported"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
