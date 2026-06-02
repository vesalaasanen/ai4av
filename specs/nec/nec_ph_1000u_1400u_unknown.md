---
spec_id: admin/nec-ph-1000u-1400u
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC PH1000U / PH1400U Control Spec"
manufacturer: NEC
model_family: PH1000U
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - PH1000U
    - PH1400U
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
  - assets.sharpnecdisplays.us
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
  - https://assets.sharpnecdisplays.us/documents/miscellaneous/pj-control-command-codes.pdf
retrieved_at: 2026-05-13T08:47:09.557Z
last_checked_at: 2026-06-02T22:11:47.945Z
generated_at: 2026-06-02T22:11:47.945Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "flow control not explicitly stated; full-duplex mode noted"
  - "min/max not stated; available via gain parameter request"
  - "no unsolicited notification protocol described in source"
  - "no multi-step macro sequences described in source"
  - "no explicit safety interlock sequences documented in source"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:11:47.945Z
  matched_actions: 28
  action_count: 28
  confidence: medium
  summary: "All 28 spec actions traced to source (dip-safe re-verify). (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# NEC PH1000U / PH1400U Control Spec

## Summary

Binary control protocol for NEC PH1000U and PH1400U projectors over RS-232 serial or TCP/IP (wired/wireless LAN). Commands are hex-byte frames with a checksum (sum of preceding bytes, low-order byte). Covers power, input switching, picture/volume adjustment, lens control, shutter, muting, freeze, eco mode, edge blending, PIP, and extensive status queries.

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: 115200  # supported: 115200, 38400, 19200, 9600, 4800
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not explicitly stated; full-duplex mode noted
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred from power on/off commands
  - queryable    # inferred from multiple request commands
  - levelable    # inferred from picture/volume adjust commands
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
        description: "Input terminal code (hex). e.g. 06h = Video port. See appendix for full list."
    notes: Response DATA01=FFh indicates error (no signal switch made).

  - id: picture_mute_on
    label: Picture Mute On
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []
    notes: Mute cleared by input terminal switch or video signal switch.

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
    notes: Mute cleared by input switch, video signal switch, or volume adjustment.

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
    notes: Mute cleared by input terminal switch or video signal switch.

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
        description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
      - name: mode
        type: integer
        description: "00h=Absolute value, 01h=Relative value"
      - name: value
        type: integer
        description: "Adjustment value (16-bit, low byte then high byte)"

  - id: volume_adjust
    label: Volume Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
    params:
      - name: mode
        type: integer
        description: "00h=Absolute value, 01h=Relative value"
      - name: value
        type: integer
        description: "Volume value (16-bit, low byte then high byte)"

  - id: aspect_adjust
    label: Aspect Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
    params:
      - name: aspect_value
        type: integer
        description: "Aspect value code. See appendix for full list."

  - id: lamp_adjust
    label: Lamp/Light Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 96h FFh <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
    params:
      - name: mode
        type: integer
        description: "00h=Absolute value, 01h=Relative value"
      - name: value
        type: integer
        description: "Adjustment value (16-bit, low byte then high byte)"

  - id: remote_key_code
    label: Remote Key Code
    kind: action
    command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: key_code
        type: integer
        description: "WORD key code. e.g. 02h 00h=POWER ON, 03h 00h=POWER OFF, 05h 00h=AUTO, 13h 00h=MUTE, 84h 00h=VOLUME UP, 85h 00h=VOLUME DOWN"

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
        description: "00h=Absolute, 02h=Relative"
      - name: value
        type: integer
        description: "Adjustment value (16-bit, low byte then high byte)"

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
      - name: eco_mode
        type: integer
        description: "Eco mode value code. See appendix for full list."

  - id: projector_name_set
    label: LAN Projector Name Set
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch <DATA01-16> 00h <CKS>"
    params:
      - name: name
        type: string
        description: "Projector name (up to 16 bytes)"

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
        description: "MODE: 00h=PIP, 01h=PBP; POSITION: 00h=TL, 01h=TR, 02h=BL, 03h=BR; SUB INPUT: see appendix"

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
        description: "Input terminal code. See appendix."
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
    response_bytes: 12
    description: "12 bytes of error bitmasks. Bit=0 normal, Bit=1 error. Covers cover, fan, temperature, power, lamp, formatter, FPGA, mirror, ballast, iris, lens, interlock errors."

  - id: projector_information
    label: Projector Information
    type: string
    command: "03h 8Ah 00h 00h 00h 8Dh"
    description: "Returns projector name (bytes 1-49), lamp usage time in seconds (bytes 83-86), filter usage time in seconds (bytes 87-90). Updated at 1-minute intervals."

  - id: filter_usage_info
    label: Filter Usage Information
    type: integer
    command: "03h 95h 00h 00h 00h 98h"
    description: "Returns filter usage time (seconds, bytes 1-4) and filter alarm start time (seconds, bytes 5-8). -1 if undefined."

  - id: lamp_info
    label: Lamp Information
    type: compound
    command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    description: "DATA01 selects lamp (00h=Lamp 1, 01h=Lamp 2). DATA02 selects content (01h=usage time in seconds, 04h=remaining life %). Negative remaining life means deadline exceeded."

  - id: carbon_savings_info
    label: Carbon Savings Information
    type: compound
    command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
    description: "DATA01: 00h=Total, 01h=During operation. Returns kg (bytes 2-5, max 99999) and mg (bytes 6-9, max 999999)."

  - id: lens_control_request
    label: Lens Control Position
    type: compound
    command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
    description: "Returns upper limit (16-bit), lower limit (16-bit), current value (16-bit) for specified lens axis."

  - id: lens_memory_option_request
    label: Lens Memory Option
    type: enum
    command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
    description: "DATA01: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE. Returns setting value (OFF/ON)."

  - id: lens_information
    label: Lens Operation Status
    type: bitmask
    command: "02h 22h 00h 00h 01h 00h 25h"
    description: "Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift H, Bit4=Lens Shift V. 0=Stop, 1=Operating."

  - id: lens_profile_request
    label: Lens Profile
    type: enum
    command: "02h 28h 00h 00h 00h 2Ah"
    description: "Returns current profile number (00h=Profile 1, 01h=Profile 2)."

  - id: gain_parameter
    label: Gain Parameter
    type: compound
    command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
    description: "DATA01: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness, 05h=Volume, 96h=Lamp Adjust. Returns status, upper/lower limits, default, current value, adjustment widths."

  - id: setting_request
    label: Projector Settings
    type: compound
    command: "00h 85h 00h 00h 01h 00h 86h"
    description: "Returns base model type (bytes 1-3), sound function (byte 4: 00h=not available, 01h=available), profile number (byte 5)."

  - id: running_status
    label: Running Status
    type: enum
    command: "00h 85h 00h 00h 01h 01h 87h"
    description: "Returns power status (00h=Standby, 01h=On), cooling status, power on/off process status, operation status (00h=Standby Sleep, 04h=On, 05h=Cooling, 06h=Standby Error, 0Fh=Standby Power Saving, 10h=Network Standby)."

  - id: input_status
    label: Input Status
    type: compound
    command: "00h 85h 00h 00h 01h 02h 88h"
    description: "Returns signal switch process, signal list number, selection signal type (COMPUTER/VIDEO/S-VIDEO/COMPONENT/HDMI/DisplayPort/DVI-D/VIEWER), content displayed, test pattern status."

  - id: mute_status
    label: Mute Status
    type: compound
    command: "00h 85h 00h 00h 01h 03h 89h"
    description: "Returns picture mute, sound mute, onscreen mute, forced onscreen mute, onscreen display status (each 00h=Off, 01h=On)."

  - id: model_name
    label: Model Name
    type: string
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    description: "Returns model name as NUL-terminated string (up to 32 bytes)."

  - id: cover_status
    label: Cover Status
    type: enum
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    description: "00h=Normal (cover opened), 01h=Cover closed."

  - id: information_string
    label: Information String
    type: string
    command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
    description: "DATA01: 03h=Horizontal sync frequency, 04h=Vertical sync frequency. Returns label/info string."

  - id: eco_mode
    label: Eco Mode
    type: enum
    command: "03h B0h 00h 00h 01h 07h BBh"
    description: "Returns current eco mode value. See appendix for value codes."

  - id: projector_name
    label: LAN Projector Name
    type: string
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    description: "Returns projector name (up to 17 bytes, NUL-terminated)."

  - id: mac_address
    label: MAC Address
    type: string
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    description: "Returns 6-byte MAC address."

  - id: pip_pbp_request
    label: PIP/Picture by Picture Status
    type: compound
    command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
    description: "DATA01 selects query: 00h=MODE (PIP/PBP), 01h=START POSITION (TL/TR/BL/BR), 02h=SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."

  - id: edge_blending_status
    label: Edge Blending Status
    type: enum
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    description: "00h=OFF, 01h=ON."

  - id: base_model_type
    label: Base Model Type
    type: compound
    command: "00h BFh 00h 00h 01h 00h C0h"
    description: "Returns base model type and model name (NUL-terminated). See appendix for type codes."

  - id: serial_number
    label: Serial Number
    type: string
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    description: "Returns serial number as NUL-terminated string (up to 16 bytes)."

  - id: basic_information
    label: Basic Information
    type: compound
    command: "00h BFh 00h 00h 01h 02h C2h"
    description: "Returns operation status, content displayed, signal type, video/sound/onscreen mute, freeze status. Comprehensive single-query status."
```

## Variables
```yaml
variables:
  - id: brightness
    label: Brightness
    type: integer
    min: null  # UNRESOLVED: min/max not stated; available via gain parameter request
    max: null

  - id: contrast
    label: Contrast
    type: integer
    min: null
    max: null

  - id: color
    label: Color
    type: integer
    min: null
    max: null

  - id: hue
    label: Hue
    type: integer
    min: null
    max: null

  - id: sharpness
    label: Sharpness
    type: integer
    min: null
    max: null

  - id: volume
    label: Volume
    type: integer
    min: null
    max: null

  - id: lamp_adjust
    label: Lamp/Light Adjust
    type: integer
    min: null
    max: null
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
notes: >-
  Error status bitmask includes interlock switch open (DATA09 Bit1),
  cover error (DATA01 Bit0), temperature errors, fan errors.
  Power on/off commands block all other commands during execution
  (including cooling period for power off).
  Lens continuous-drive commands require explicit stop (00h) after
  issuing 7Fh (plus) or 81h (minus).
# UNRESOLVED: no explicit safety interlock sequences documented in source
```

## Notes

- Binary protocol: all commands and responses are hex-byte frames. Frame structure: `[header] [command] [ID1] [ID2] [LEN] [DATA...] [CKS]`. Checksum = low-order byte of sum of all preceding bytes.
- Parameters ID1 (control ID) and ID2 (model code) vary per projector configuration. Not documented in this source.
- Many command value tables (input terminal codes, eco mode values, aspect values, sub input values) reference an "Appendix: Supplementary Information by Command" which was not included in the source. These value mappings are UNRESOLVED.
- Gain parameter request returns full range metadata (upper/lower limits, default, current value, adjustment widths) — useful for dynamic UI generation.
- Lamp information request supports dual-lamp models (DATA01=01h for Lamp 2). Single-lamp models should use 00h.
- Error codes: ERR1/ERR2 combinations provide detailed failure reasons (unrecognized command, unsupported, invalid value, power-off state, no authority, memory errors, etc.).

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
  - assets.sharpnecdisplays.us
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
  - https://assets.sharpnecdisplays.us/documents/miscellaneous/pj-control-command-codes.pdf
retrieved_at: 2026-05-13T08:47:09.557Z
last_checked_at: 2026-06-02T22:11:47.945Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:11:47.945Z
matched_actions: 28
action_count: 28
confidence: medium
summary: "All 28 spec actions traced to source (dip-safe re-verify). (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "flow control not explicitly stated; full-duplex mode noted"
- "min/max not stated; available via gain parameter request"
- "no unsolicited notification protocol described in source"
- "no multi-step macro sequences described in source"
- "no explicit safety interlock sequences documented in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
