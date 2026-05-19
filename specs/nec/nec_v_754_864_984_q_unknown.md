---
spec_id: admin/nec-v754-864-984q
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC V754/Q, V864/Q, V984/Q Control Spec"
manufacturer: NEC
model_family: V754Q
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - V754Q
    - V864Q
    - V984Q
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-05-18T16:39:32.501Z
generated_at: 2026-05-18T16:39:32.501Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-18T16:39:32.501Z
  matched_actions: 28
  action_count: 28
  confidence: high
  summary: "All 28 spec actions matched literally with source command bytes; transport parameters verified verbatim in source documentation."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# NEC V754/Q, V864/Q, V984/Q Control Spec

## Summary
NEC V-series projectors (V754Q, V864Q, V984Q) controlled via RS-232 serial or TCP/IP LAN (wired/wireless). Binary command protocol with hex-encoded frames, checksum validation, and per-command error responses. Supports power, input switching, picture/sound/onscreen mute, lens control (shift/zoom/focus/memory), volume, aspect, eco mode, edge blending, PIP/P-by-P, freeze, shutter, and extensive status queries.

<!-- UNRESOLVED: Appendix "Supplementary Information by Command" not included in source — input terminal values, aspect values, eco mode values, base model type values, sub-input values for PIP are referenced but not enumerated -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: specific model-to-model command differences not documented -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # 115200/38400/19200/9600/4800 selectable
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated (RTS/CTS pins present on connector)
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable     # power on/off commands
  - queryable     # extensive status/info request commands
  - routable      # input switch commands
  - levelable     # volume, brightness, contrast, sharpness, color, hue adjust
  - mutable       # picture/sound/onscreen mute
```

## Actions
```yaml
actions:
  - id: power_on
    label: Power On
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    description: "Turns on the projector. No other commands accepted during power-on sequence."
    params: []

  - id: power_off
    label: Power Off
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    description: "Turns off the projector. No other commands accepted during cooldown."
    params: []

  - id: input_switch
    label: Input Switch
    kind: action
    command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
    description: "Switches input terminal."
    params:
      - name: input
        type: integer
        description: "Input terminal code (hex). Values in appendix - e.g. 06h = VIDEO"

  - id: picture_mute_on
    label: Picture Mute On
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    description: "Turns picture mute on. Cleared by input switch or signal change."
    params: []

  - id: picture_mute_off
    label: Picture Mute Off
    kind: action
    command: "02h 11h 00h 00h 00h 13h"
    params: []

  - id: sound_mute_on
    label: Sound Mute On
    kind: action
    command: "02h 12h 00h 00h 00h 14h"
    description: "Turns sound mute on. Cleared by input switch, signal change, or volume adjust."
    params: []

  - id: sound_mute_off
    label: Sound Mute Off
    kind: action
    command: "02h 13h 00h 00h 00h 15h"
    params: []

  - id: onscreen_mute_on
    label: Onscreen Mute On
    kind: action
    command: "02h 14h 00h 00h 00h 16h"
    description: "Turns onscreen mute on. Cleared by input switch or signal change."
    params: []

  - id: onscreen_mute_off
    label: Onscreen Mute Off
    kind: action
    command: "02h 15h 00h 00h 00h 17h"
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
        description: "00h=Absolute, 01h=Relative"
      - name: value
        type: integer
        description: "16-bit signed value (low byte, high byte)"

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
        description: "16-bit signed value (low byte, high byte)"

  - id: aspect_adjust
    label: Aspect Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
    description: "Sets aspect ratio."
    params:
      - name: aspect
        type: integer
        description: "Aspect value - see appendix"

  - id: other_adjust
    label: Lamp/Light Adjust
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"
    description: "Adjusts lamp/light output."
    params:
      - name: mode
        type: integer
        description: "00h=Absolute, 01h=Relative"
      - name: value
        type: integer
        description: "16-bit signed value (low byte, high byte)"

  - id: remote_key_code
    label: Remote Key Code
    kind: action
    command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
    description: "Sends a remote control key code."
    params:
      - name: key_code
        type: integer
        description: "16-bit key code - e.g. 02h 00h=POWER ON, 03h 00h=POWER OFF, 05h 00h=AUTO, 13h 00h=MUTE"

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
    description: "Drives lens motor (periphery focus). Send 00h to stop continuous drive."
    params:
      - name: axis
        type: integer
        description: "06h=Periphery Focus"
      - name: direction
        type: integer
        description: "00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=continuous+, 81h=continuous-, FDh=-0.25s, FEh=-0.5s, FFh=-1s"

  - id: lens_control_2
    label: Lens Control 2
    kind: action
    command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
    description: "Adjusts lens position with absolute/relative value."
    params:
      - name: axis
        type: integer
        description: "FFh=Stop, else axis code"
      - name: mode
        type: integer
        description: "00h=Absolute, 02h=Relative"
      - name: value
        type: integer
        description: "16-bit signed value (low byte, high byte)"

  - id: lens_memory_control
    label: Lens Memory Control
    kind: action
    command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
    description: "Controls lens memory (MOVE/STORE/RESET)."
    params:
      - name: action
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  - id: reference_lens_memory_control
    label: Reference Lens Memory Control
    kind: action
    command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
    description: "Controls reference lens memory (MOVE/STORE/RESET)."
    params:
      - name: action
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  - id: lens_memory_option_set
    label: Lens Memory Option Set
    kind: action
    command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    description: "Sets lens memory option (LOAD BY SIGNAL / FORCED MUTE)."
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
    description: "Selects the reference lens memory profile."
    params:
      - name: profile
        type: integer
        description: "00h=Profile 1, 01h=Profile 2"

  - id: freeze_control
    label: Freeze Control
    kind: action
    command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
    description: "Toggles freeze function on/off."
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
        description: "Eco mode value - see appendix"

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
    label: PIP/Picture-by-Picture Set
    kind: action
    command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
    description: "Sets PIP or P-by-P mode, start position, or sub-input."
    params:
      - name: parameter
        type: integer
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: value
        type: integer
        description: "Setting value - e.g. MODE: 00h=PIP, 01h=P-by-P; POSITION: 00h=TL, 01h=TR, 02h=BL, 03h=BR"

  - id: edge_blending_set
    label: Edge Blending Set
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
    description: "Sets edge blending on/off."
    params:
      - name: state
        type: integer
        description: "00h=OFF, 01h=ON"

  - id: audio_select_set
    label: Audio Select Set
    kind: action
    command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
    description: "Sets audio input source for a given terminal."
    params:
      - name: input_terminal
        type: integer
        description: "Input terminal code - see appendix"
      - name: source
        type: integer
        description: "00h=Terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
feedbacks:
  - id: error_status
    label: Error Status
    type: binary_flags
    command: "00h 88h 00h 00h 00h 88h"
    description: "12 bytes of error bitfield - cover, fan, temperature, lamp, power, formatter, FPGA, mirror, interlock, ballast, iris, lens errors."

  - id: information
    label: Projector Information
    type: composite
    command: "03h 8Ah 00h 00h 00h 8Dh"
    description: "Returns projector name (49 bytes), lamp usage time (seconds), filter usage time (seconds)."

  - id: filter_usage
    label: Filter Usage Information
    type: composite
    command: "03h 95h 00h 00h 00h 98h"
    description: "Filter usage time (seconds) and filter alarm start time (seconds)."

  - id: lamp_information
    label: Lamp Information
    type: composite
    command: "03h 96h 00h 00h 02h <lamp> <content> <CKS>"
    description: "Lamp usage time (seconds) or remaining life (%). Eco mode affects values."
    params:
      - name: lamp
        type: integer
        description: "00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
      - name: content
        type: integer
        description: "01h=Usage time (seconds), 04h=Remaining life (%)"

  - id: carbon_savings
    label: Carbon Savings Information
    type: composite
    command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
    description: "Carbon savings in kg and mg. 00h=Total, 01h=During operation."

  - id: gain_parameter
    label: Gain Parameter
    type: composite
    command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
    description: "Returns adjustment range, default, and current value for brightness/contrast/color/hue/sharpness/volume/lamp."
    params:
      - name: target
        type: integer
        description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness, 05h=Volume, 96h=Lamp/Light"

  - id: running_status
    label: Running Status
    type: enum
    command: "00h 85h 00h 00h 01h 01h 87h"
    description: "Power status, cooling process, power on/off process, operation status."

  - id: input_status
    label: Input Status
    type: composite
    command: "00h 85h 00h 00h 01h 02h 88h"
    description: "Signal switch process, signal list number, selection signal type, test pattern, content displayed."

  - id: mute_status
    label: Mute Status
    type: composite
    command: "00h 85h 00h 00h 01h 03h 89h"
    description: "Picture mute, sound mute, onscreen mute, forced onscreen mute, onscreen display states."

  - id: model_name
    label: Model Name
    type: string
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    description: "Returns model name (NUL-terminated, up to 32 bytes)."

  - id: cover_status
    label: Cover Status
    type: enum
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    description: "Mirror/lens cover status."
    values: ["normal_open", "closed"]

  - id: setting_request
    label: Setting Information
    type: composite
    command: "00h 85h 00h 00h 01h 00h 86h"
    description: "Base model type, sound function availability, profile/timer functions."

  - id: information_string
    label: Information String
    type: string
    command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
    description: "Horizontal/vertical sync frequency strings."
    params:
      - name: type
        type: integer
        description: "03h=Horizontal sync freq, 04h=Vertical sync freq"

  - id: eco_mode
    label: Eco Mode
    type: enum
    command: "03h B0h 00h 00h 01h 07h BBh"
    description: "Current eco/light/lamp mode setting."

  - id: projector_name
    label: Projector Name
    type: string
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    description: "Returns projector name (NUL-terminated, up to 17 bytes)."

  - id: mac_address
    label: MAC Address
    type: string
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    description: "Returns 6-byte MAC address."

  - id: pip_pbp_status
    label: PIP/P-by-P Status
    type: composite
    command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
    description: "Mode, start position, or sub-input setting."

  - id: edge_blending_status
    label: Edge Blending Status
    type: enum
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    description: "Edge blending on/off."
    values: ["off", "on"]

  - id: lens_control_request
    label: Lens Position
    type: composite
    command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
    description: "Returns adjustment range limits and current value for a lens axis."

  - id: lens_memory_option
    label: Lens Memory Option
    type: composite
    command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
    description: "Lens memory option setting (LOAD BY SIGNAL / FORCED MUTE)."

  - id: lens_information
    label: Lens Operation Status
    type: binary_flags
    command: "02h 22h 00h 00h 01h 00h 25h"
    description: "Bitfield: lens memory, zoom, focus, lens shift H/V operation status (stopped/in-operation)."

  - id: lens_profile
    label: Lens Profile
    type: enum
    command: "02h 28h 00h 00h 00h 2Ah"
    description: "Selected reference lens memory profile."
    values: ["profile_1", "profile_2"]

  - id: base_model_type
    label: Base Model Type
    type: composite
    command: "00h BFh 00h 00h 01h 00h C0h"
    description: "Base model type and model name."

  - id: serial_number
    label: Serial Number
    type: string
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    description: "Returns serial number (NUL-terminated, up to 16 bytes)."

  - id: basic_information
    label: Basic Information
    type: composite
    command: "00h BFh 00h 00h 01h 02h C2h"
    description: "Operation status, content displayed, signal type, mute states, freeze status."
```

## Variables
```yaml
variables:
  - id: volume
    label: Volume
    type: integer
    min: null  # UNRESOLVED: range not stated in source
    max: null
    description: "Sound volume level. Adjustable via volume_adjust command."

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
    description: "Color saturation. Adjustable via picture_adjust (target 02h)."

  - id: hue
    label: Hue
    type: integer
    description: "Hue adjustment. Adjustable via picture_adjust (target 03h)."

  - id: sharpness
    label: Sharpness
    type: integer
    description: "Picture sharpness. Adjustable via picture_adjust (target 04h)."

  - id: lamp_output
    label: Lamp Output
    type: integer
    description: "Lamp/light intensity. Adjustable via other_adjust (target 96h FFh)."
```

## Events
```yaml
# UNRESOLVED: source does not describe unsolicited notifications from projector
```

## Macros
```yaml
# UNRESOLVED: source does not describe multi-step sequences
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source notes: power on/off blocks other commands during transition.
# Lens continuous drive (7Fh/81h) requires explicit stop (00h) command.
# No explicit safety interlock procedures documented.
```

## Notes
- Binary protocol: all commands and responses are hex byte sequences with checksum (low byte of sum of preceding bytes).
- Command frame structure: `<header_byte> <command_byte> <ID1> <ID2> <LEN> <DATA...> <CKS>`. ID1 = control ID, ID2 = model code.
- Multiple baud rates supported (115200/38400/19200/9600/4800). Default not stated.
- TCP port 7142 for LAN control. Wired and wireless LAN supported.
- Error responses use ERR1/ERR2 code pairs (see error code table in source §2.4).
- Power on/off commands lock out all other commands during execution (including cooling period).
- Picture mute, sound mute, and onscreen mute auto-clear on input switch or signal change. Sound mute also clears on volume adjust.
- Appendix "Supplementary Information by Command" referenced throughout but not included in source — contains input terminal codes, aspect values, eco mode values, base model types, sub-input values.

<!-- UNRESOLVED: Appendix tables missing — input terminal hex codes, aspect values, eco mode values, base model type values, PIP sub-input values not available -->
<!-- UNRESOLVED: wireless LAN communication conditions not stated (deferred to wireless LAN unit manual) -->
<!-- UNRESOLVED: flow control setting not stated (RTS/CTS pins wired on D-SUB 9) -->
<!-- UNRESOLVED: default baud rate not stated -->
<!-- UNRESOLVED: exact command byte layouts for lens_control axis codes beyond 06h (Periphery Focus) — other axes may exist per model -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-05-18T16:39:32.501Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-18T16:39:32.501Z
matched_actions: 28
action_count: 28
confidence: high
summary: "All 28 spec actions matched literally with source command bytes; transport parameters verified verbatim in source documentation."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
