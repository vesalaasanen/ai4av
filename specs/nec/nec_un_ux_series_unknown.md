---
spec_id: admin/nec-un-ux-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC UN UX Series Control Spec"
manufacturer: NEC
model_family: "NEC UN UX Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "NEC UN UX Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-05-18T16:38:02.195Z
generated_at: 2026-05-18T16:38:02.195Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-18T16:38:02.195Z
  matched_actions: 28
  action_count: 28
  confidence: high
  summary: "All 28 action commands match source hex sequences exactly; all transport parameters confirmed; feedback queries represented in spec Feedbacks section."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# NEC UN UX Series Control Spec

## Summary
NEC UN UX Series projectors support control via RS-232C serial and TCP/IP (wired/wireless LAN) using a binary command protocol. This spec covers power, input switching, picture/sound/onscreen mute, picture and volume adjustment, lens control with memory, eco mode, freeze, shutter, PIP/Picture-by-Picture, edge blending, and various status queries. Commands are hexadecimal byte sequences with a checksum.

<!-- UNRESOLVED: exact model names within UN UX Series not stated in source document (document is "Projector Control Command Reference Manual" BDT140013 Rev 7.1) -->
<!-- UNRESOLVED: input terminal and aspect value enums reference an Appendix not included in the refined source -->
<!-- UNRESOLVED: eco mode value enums reference an Appendix not included in the refined source -->
<!-- UNRESOLVED: sub input setting values for PIP reference an Appendix not included in the refined source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate:
    - 115200
    - 38400
    - 19200
    - 9600
    - 4800
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated; RTS/CTS pins present in pinout but no explicit flow control setting
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: power on/off commands 015/016
  - queryable    # inferred: multiple request commands (status, info, gain, etc.)
  - levelable    # inferred: volume, brightness, contrast, color, hue, sharpness adjustment
  - routable     # inferred: input switch command 018
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
    label: Input Switch Change
    kind: action
    command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
    description: "Switches the input terminal or entry list."
    params:
      - name: input_terminal
        type: integer
        description: "Input terminal selector (hex value). See Appendix for full enum. 06h = VIDEO."

  - id: picture_mute_on
    label: Picture Mute On
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    description: "Turns picture mute on. Cleared by input/video switch."
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
    description: "Turns sound mute on. Cleared by input switch, video switch, or volume adjust."
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
    description: "Turns onscreen mute on. Cleared by input/video switch."
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
        description: "00h=Absolute value, 01h=Relative value"
      - name: value
        type: integer
        description: "Adjustment value (16-bit, low byte then high byte). Supports negative values."

  - id: volume_adjust
    label: Volume Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
    description: "Adjusts sound volume."
    params:
      - name: mode
        type: integer
        description: "00h=Absolute value, 01h=Relative value"
      - name: value
        type: integer
        description: "Volume value (16-bit, low byte then high byte)."

  - id: aspect_adjust
    label: Aspect Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
    description: "Sets the aspect ratio."
    params:
      - name: aspect
        type: integer
        description: "Aspect value. See Appendix for full enum."

  - id: lamp_adjust
    label: Lamp/Light Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 96h FFh <DATA03> <DATA04> <DATA05> <CKS>"
    description: "Adjusts lamp/light output."
    params:
      - name: mode
        type: integer
        description: "00h=Absolute value, 01h=Relative value"
      - name: value
        type: integer
        description: "Adjustment value (16-bit, low byte then high byte)."

  - id: remote_key_code
    label: Remote Key Code
    kind: action
    command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
    description: "Sends a remote control key code."
    params:
      - name: key_code
        type: integer
        description: "WORD key code (low byte, high byte). Examples: 02h 00h=POWER ON, 03h 00h=POWER OFF, 05h 00h=AUTO, 06h 00h=MENU, 07h 00h=UP, 08h 00h=DOWN, 09h 00h=RIGHT, 0Ah 00h=LEFT, 0Bh 00h=ENTER, 0Ch 00h=EXIT, 13h 00h=MUTE, 84h 00h=VOLUME UP, 85h 00h=VOLUME DOWN, 8Ah 00h=FREEZE, A3h 00h=ASPECT"

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
    command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    description: "Adjusts lens position (focus, zoom, shift). Continuous drive or timed."
    params:
      - name: axis
        type: integer
        description: "06h=Periphery Focus"
      - name: direction
        type: integer
        description: "00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s"

  - id: lens_control_2
    label: Lens Control 2
    kind: action
    command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
    description: "Adjusts lens position with absolute or relative value."
    params:
      - name: axis
        type: integer
        description: "FFh=Stop"
      - name: mode
        type: integer
        description: "00h=Absolute, 02h=Relative"
      - name: value
        type: integer
        description: "Adjustment value (16-bit, low byte then high byte)."

  - id: lens_memory_control
    label: Lens Memory Control
    kind: action
    command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
    description: "Controls lens memory (MOVE/STORE/RESET)."
    params:
      - name: operation
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  - id: reference_lens_memory_control
    label: Reference Lens Memory Control
    kind: action
    command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
    description: "Controls reference lens memory (MOVE/STORE/RESET) for the profile set via LENS PROFILE SET."
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
    description: "Selects the reference lens memory profile number."
    params:
      - name: profile
        type: integer
        description: "00h=Profile 1, 01h=Profile 2"

  - id: freeze_control
    label: Freeze Control
    kind: action
    command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
    description: "Turns freeze function on or off."
    params:
      - name: state
        type: integer
        description: "01h=On, 02h=Off"

  - id: eco_mode_set
    label: Eco Mode Set
    kind: action
    command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
    description: "Sets eco mode (also labeled Light mode or Lamp mode depending on model)."
    params:
      - name: mode
        type: integer
        description: "Eco mode value. See Appendix for full enum."

  - id: projector_name_set
    label: Projector Name Set
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch <DATA01-16> 00h <CKS>"
    description: "Sets the projector name (up to 16 bytes, NUL terminated)."
    params:
      - name: name
        type: string
        description: "Projector name (up to 16 bytes)."

  - id: pip_pbp_set
    label: PIP/Picture by Picture Set
    kind: action
    command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
    description: "Sets PIP or Picture-by-Picture mode, position, or sub-input."
    params:
      - name: target
        type: integer
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: value
        type: integer
        description: "MODE: 00h=PIP, 01h=PBP. POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT. Sub input values per Appendix."

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
    description: "Sets audio input selection."
    params:
      - name: input_terminal
        type: integer
        description: "Input terminal value per Appendix."
      - name: audio_source
        type: integer
        description: "00h=Same as specified terminal, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
feedbacks:
  - id: error_status
    label: Error Status
    type: binary_flags
    command: "00h 88h 00h 00h 00h 88h"
    response: "20h 88h <ID1> <ID2> 0Ch <DATA01-12> <CKS>"
    description: "12-byte error bitmask. Bit=0 normal, bit=1 error. Covers cover, fan, temperature, power, lamp, formatter, FPGA, iris, interlock, ballast communication errors."

  - id: power_state
    label: Power State
    type: enum
    values: [standby, power_on, cooling, standby_error, standby_sleep, standby_power_saving, network_standby]
    description: "Obtained via RUNNING STATUS REQUEST (078-2) DATA03 or BASIC INFORMATION REQUEST (305-3) DATA01."

  - id: running_status
    label: Running Status
    type: composite
    command: "00h 85h 00h 00h 01h 01h 87h"
    response: "20h 85h <ID1> <ID2> 10h <DATA01-16> <CKS>"
    description: "Returns power status, cooling status, power-on/off process status, operation status."

  - id: input_status
    label: Input Status
    type: composite
    command: "00h 85h 00h 00h 01h 02h 88h"
    response: "20h 85h <ID1> <ID2> 10h <DATA01-16> <CKS>"
    description: "Returns signal switch process, signal list number, selection signal type, content displayed."

  - id: mute_status
    label: Mute Status
    type: composite
    command: "00h 85h 00h 00h 01h 03h 89h"
    response: "20h 85h <ID1> <ID2> 10h <DATA01-16> <CKS>"
    description: "Returns picture mute, sound mute, onscreen mute, forced onscreen mute, onscreen display states."

  - id: model_name
    label: Model Name
    type: string
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    response: "20h 85h <ID1> <ID2> 20h <DATA01-32> <CKS>"
    description: "Returns model name as NUL-terminated string (up to 32 bytes)."

  - id: cover_status
    label: Cover Status
    type: enum
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    response: "20h 85h <ID1> <ID2> 01h <DATA01> <CKS>"
    description: "00h=Normal (cover opened), 01h=Cover closed."

  - id: projector_info
    label: Projector Information
    type: composite
    command: "03h 8Ah 00h 00h 00h 8Dh"
    response: "23h 8Ah <ID1> <ID2> 62h <DATA01-98> <CKS>"
    description: "Returns projector name (bytes 1-49), lamp usage time in seconds (bytes 83-86), filter usage time in seconds (bytes 87-90). Updated at 1-minute intervals."

  - id: filter_usage
    label: Filter Usage Information
    type: composite
    command: "03h 95h 00h 00h 00h 98h"
    response: "23h 95h <ID1> <ID2> 08h <DATA01-08> <CKS>"
    description: "Returns filter usage time (bytes 1-4, seconds) and filter alarm start time (bytes 5-8, seconds). -1 if undefined."

  - id: lamp_info
    label: Lamp Information
    type: composite
    command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    description: "Returns lamp usage time (seconds) or remaining life (%). DATA01: 00h=Lamp 1, 01h=Lamp 2. DATA02: 01h=usage time, 04h=remaining life. Negative remaining life means deadline exceeded."

  - id: carbon_savings
    label: Carbon Savings
    type: composite
    command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
    description: "DATA01: 00h=Total, 01h=During operation. Returns kg (bytes 2-5, max 99999) and mg (bytes 6-9, max 999999)."

  - id: lens_control_request
    label: Lens Position Values
    type: composite
    command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
    response: "22h 1Ch <ID1> <ID2> 08h <DATA01> 00h <DATA02-07> <CKS>"
    description: "Returns upper limit, lower limit, and current value (each 16-bit) for specified lens axis."

  - id: lens_information
    label: Lens Information
    type: binary_flags
    command: "02h 22h 00h 00h 01h 00h 25h"
    response: "22h 22h <ID1> <ID2> 02h 00h <DATA01> <CKS>"
    description: "Bitmask of lens operation status. Bit0=memory, Bit1=zoom, Bit2=focus, Bit3=shift-H, Bit4=shift-V. 0=stopped, 1=operating."

  - id: lens_memory_option_request
    label: Lens Memory Option
    type: composite
    command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
    description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE. Returns ON/OFF setting value."

  - id: lens_profile_request
    label: Lens Profile
    type: enum
    command: "02h 28h 00h 00h 00h 2Ah"
    response: "22h 28h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"
    description: "00h=Profile 1, 01h=Profile 2."

  - id: gain_parameter
    label: Gain Parameter
    type: composite
    command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
    description: "DATA01: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness, 05h=Volume, 96h=Lamp Adjust. Returns status, range, default, current value, adjustment widths."

  - id: setting_request
    label: Setting Information
    type: composite
    command: "00h 85h 00h 00h 01h 00h 86h"
    description: "Returns base model type, sound function availability, profile number (clock/sleep timer)."

  - id: information_string
    label: Information String
    type: string
    command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
    description: "DATA01: 03h=Horizontal sync frequency, 04h=Vertical sync frequency. Returns NUL-terminated label string."

  - id: eco_mode
    label: Eco Mode
    type: enum
    command: "03h B0h 00h 00h 01h 07h BBh"
    description: "Returns eco/lamp/light mode value. See Appendix for enum."

  - id: projector_name_request
    label: Projector Name
    type: string
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    description: "Returns projector name (up to 17 bytes, NUL terminated)."

  - id: mac_address
    label: MAC Address
    type: string
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    description: "Returns 6-byte MAC address."

  - id: pip_pbp_request
    label: PIP/Picture by Picture Status
    type: composite
    command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
    description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."

  - id: edge_blending_request
    label: Edge Blending Status
    type: enum
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    description: "00h=OFF, 01h=ON."

  - id: base_model_type
    label: Base Model Type
    type: composite
    command: "00h BFh 00h 00h 01h 00h C0h"
    description: "Returns base model type and model name string."

  - id: serial_number
    label: Serial Number
    type: string
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    description: "Returns serial number (up to 16 bytes, NUL terminated)."

  - id: basic_information
    label: Basic Information
    type: composite
    command: "00h BFh 00h 00h 01h 02h C2h"
    description: "Returns operation status, content displayed, signal types, video/sound/onscreen mute, freeze status."
```

## Variables
```yaml
variables:
  - id: volume
    label: Volume
    type: integer
    min: null  # UNRESOLVED: volume range not explicitly stated; gain parameter request returns range dynamically
    max: null
    description: "Sound volume level. Adjustable via VOLUME ADJUST (030-2) with absolute or relative values."

  - id: brightness
    label: Brightness
    type: integer
    description: "Picture brightness. Adjustable via PICTURE ADJUST (030-1) target 00h."

  - id: contrast
    label: Contrast
    type: integer
    description: "Picture contrast. Adjustable via PICTURE ADJUST (030-1) target 01h."

  - id: color
    label: Color
    type: integer
    description: "Picture color saturation. Adjustable via PICTURE ADJUST (030-1) target 02h."

  - id: hue
    label: Hue
    type: integer
    description: "Picture hue. Adjustable via PICTURE ADJUST (030-1) target 03h."

  - id: sharpness
    label: Sharpness
    type: integer
    description: "Picture sharpness. Adjustable via PICTURE ADJUST (030-1) target 04h."
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification protocol described in source. All responses are command-reply.
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety interlock procedures in source. Note: power on/off commands block other commands during execution (including cooling). Shutter close/open affects optical output directly.
```

## Notes
- Binary protocol: all commands are hexadecimal byte sequences. Each command includes a checksum (CKS) computed as the low byte of the sum of all preceding bytes.
- Common parameters: ID1 (control ID set on projector), ID2 (model code, varies by model).
- Response format: successful commands echo with first byte OR'd with A0h (e.g. 02h → A2h) or 20h/23h depending on command type; errors return ERR1+ERR2 codes.
- Error codes: 00h+00h=unrecognized command, 00h+01h=unsupported by model, 01h+00h=invalid value, 02h+0Dh=power off, 02h+0Eh=execution failed, 02h+0Fh=no authority.
- Lens control supports continuous drive (7Fh/81h) requiring a stop command (00h) to halt.
- Picture/sound/onscreen mute states auto-clear on input switch or video signal change.
- Lamp usage and filter usage times update at 1-minute intervals despite second-resolution values.
- Document references an Appendix for input terminal values, aspect values, eco mode values, and sub-input values — not included in the refined source.
<!-- UNRESOLVED: exact input terminal hex-to-name mapping not available (referenced Appendix not in source) -->
<!-- UNRESOLVED: exact aspect ratio enum values not available (referenced Appendix not in source) -->
<!-- UNRESOLVED: exact eco mode enum values not available (referenced Appendix not in source) -->
<!-- UNRESOLVED: exact gain parameter ranges (min/max) per adjustment target not stated — returned dynamically via GAIN PARAMETER REQUEST 3 -->
<!-- UNRESOLVED: default baud rate not stated; source lists 5 supported rates (4800–115200) -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-05-18T16:38:02.195Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-18T16:38:02.195Z
matched_actions: 28
action_count: 28
confidence: high
summary: "All 28 action commands match source hex sequences exactly; all transport parameters confirmed; feedback queries represented in spec Feedbacks section."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
