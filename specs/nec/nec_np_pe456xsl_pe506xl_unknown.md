---
spec_id: admin/nec-np-pe456xsl-pe506xl
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC NP PE456xSL PE506xL Control Spec"
manufacturer: NEC
model_family: "NP PE456xSL"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "NP PE456xSL"
    - "NP PE506xL"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-05-18T16:36:43.206Z
generated_at: 2026-05-18T16:36:43.206Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-18T16:36:43.206Z
  matched_actions: 28
  action_count: 28
  confidence: high
  summary: "All 28 spec actions match source command encodings verbatim; transport parameters confirmed in source documentation."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-15
---

# NEC NP PE456xSL PE506xL Control Spec

## Summary

NEC NP PE456xSL and PE506xL projectors with binary control protocol over RS-232 serial and TCP/IP (wired/wireless LAN). Commands are hex-encoded frames with checksum. Supports power control, input switching, picture/sound/onscreen mute, lens control (zoom/focus/shift), lens memory, volume, picture adjustment, eco mode, freeze, shutter, edge blending, PIP, and extensive status queries.

<!-- UNRESOLVED: input terminal value mapping referenced in Appendix but not included in source -->
<!-- UNRESOLVED: eco mode value mapping referenced in Appendix but not included in source -->
<!-- UNRESOLVED: aspect value mapping referenced in Appendix but not included in source -->
<!-- UNRESOLVED: flow_control not stated for serial -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: 115200  # source lists 115200/38400/19200/9600/4800; 115200 is first/default
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
  - powerable    # power on/off commands
  - queryable    # extensive status request commands
  - routable     # input switching commands
  - levelable    # volume, brightness, contrast, color, hue, sharpness adjustment
```

## Actions
```yaml
actions:
  - id: power_on
    label: Power On
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    params: []

  - id: power_off
    label: Power Off
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []

  - id: input_switch
    label: Input Switch Change
    kind: action
    command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
    params:
      - name: input
        type: integer
        description: "Input terminal value (hex). Refer to Appendix for mapping. Example: 06h = Video port"

  - id: picture_mute_on
    label: Picture Mute On
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
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
    params:
      - name: target
        type: integer
        description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
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
        description: "Adjustment value (16-bit, low byte then high byte)"

  - id: aspect_adjust
    label: Aspect Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
    params:
      - name: aspect
        type: integer
        description: "Aspect value (hex). Refer to Appendix for mapping"

  - id: lamp_adjust
    label: Lamp/Light Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 96h FFh <DATA03> <DATA04> <DATA05> <CKS>"
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
        description: "WORD key code. Examples: 02h00h=POWER ON, 05h00h=AUTO, 06h00h=MENU, 07h00h=UP, 08h00h=DOWN, 09h00h=RIGHT, 0Ah00h=LEFT, 0Bh00h=ENTER, 0Ch00h=EXIT, 84h00h=VOLUME UP, 85h00h=VOLUME DOWN, 8Ah00h=FREEZE, A3h00h=ASPECT"

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
      - name: axis
        type: integer
        description: "Lens axis. 06h=Periphery Focus"
      - name: direction
        type: integer
        description: "00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s"

  - id: lens_control_2
    label: Lens Control 2
    kind: action
    command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
    params:
      - name: axis
        type: integer
        description: "Lens axis (FFh=Stop)"
      - name: mode
        type: integer
        description: "00h=Absolute value, 02h=Relative value"
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
      - name: mode
        type: integer
        description: "Eco mode value. Refer to Appendix for mapping"

  - id: lan_projector_name_set
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
      - name: parameter
        type: integer
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: value
        type: integer
        description: "MODE: 00h=PIP, 01h=PBP. POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT"

  - id: edge_blending_mode_set
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
        description: "Input terminal value. Refer to Appendix for mapping"
      - name: audio_source
        type: integer
        description: "00h=Follow terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
feedbacks:
  - id: error_status
    label: Error Status
    type: binary
    command: "00h 88h 00h 00h 00h 88h"
    description: "12-byte error bitmap. Bit fields: cover error, fan error, temperature error, power error, lamp off, lamp replacement moratorium, lamp usage time exceeded, formatter error, FPGA error, lamp not present, mirror cover error, ballast communication error, iris calibration error, lens not installed, interlock switch open, system error"

  - id: power_state
    label: Power State
    type: enum
    command: "00h 85h 00h 00h 01h 01h 87h"
    values: [standby, power_on, cooling, standby_error, standby_sleep, standby_power_saving, network_standby]
    description: "Running status request (078-2). DATA03: 00h=Standby, 01h=Power on, FFh=Not supported. DATA06 operation status: 00h=Standby(Sleep), 04h=Power on, 05h=Cooling, 06h=Standby(error), 0Fh=Standby(Power saving), 10h=Network standby"

  - id: input_status
    label: Input Status
    type: composite
    command: "00h 85h 00h 00h 01h 02h 88h"
    description: "Input signal status (078-3). Returns signal list number, selection signal type 1/2, signal list type, test pattern display, content displayed"

  - id: mute_status
    label: Mute Status
    type: composite
    command: "00h 85h 00h 00h 01h 03h 89h"
    description: "Mute status (078-4). Returns picture mute (00h=Off/01h=On), sound mute, onscreen mute, forced onscreen mute, onscreen display"

  - id: model_name
    label: Model Name
    type: string
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    description: "Returns model name string (up to 32 bytes)"

  - id: cover_status
    label: Cover Status
    type: enum
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    values: [normal_cover_opened, cover_closed]
    description: "00h=Normal (cover opened), 01h=Cover closed"

  - id: projector_information
    label: Projector Information
    type: composite
    command: "03h 8Ah 00h 00h 00h 8Dh"
    description: "Returns projector name (49 bytes), lamp usage time in seconds (DATA83-86), filter usage time in seconds (DATA87-90)"

  - id: filter_usage
    label: Filter Usage Information
    type: composite
    command: "03h 95h 00h 00h 00h 98h"
    description: "Returns filter usage time (seconds, DATA01-04) and filter alarm start time (seconds, DATA05-08)"

  - id: lamp_information
    label: Lamp Information
    type: composite
    command: "03h 96h 00h 00h 02h <lamp> <content> <CKS>"
    description: "Lamp usage time (01h) or remaining life % (04h). DATA01: 00h=Lamp 1, 01h=Lamp 2"

  - id: carbon_savings
    label: Carbon Savings Information
    type: composite
    command: "03h 9Ah 00h 00h 01h <type> <CKS>"
    description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation. Returns kg and mg values"

  - id: lens_position
    label: Lens Control Position
    type: composite
    command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
    description: "Returns upper/lower adjustment range limits and current value (16-bit each) for specified lens axis"

  - id: lens_information
    label: Lens Information
    type: binary
    command: "02h 22h 00h 00h 01h 00h 25h"
    description: "Bit field: Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift H, Bit4=Lens Shift V (0=Stop, 1=During operation)"

  - id: lens_profile
    label: Lens Profile
    type: enum
    command: "02h 28h 00h 00h 00h 2Ah"
    values: [profile_1, profile_2]
    description: "00h=Profile 1, 01h=Profile 2"

  - id: lens_memory_option
    label: Lens Memory Option
    type: composite
    command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
    description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE. Returns ON/OFF setting value"

  - id: gain_parameter
    label: Gain Parameter
    type: composite
    command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
    description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness, 05h=Volume, 96h=Lamp Adjust. Returns adjustment status, range limits, default, current value, adjustment widths"

  - id: setting_information
    label: Setting Information
    type: composite
    command: "00h 85h 00h 00h 01h 00h 86h"
    description: "Returns base model type, sound function availability, profile number (clock/sleep timer)"

  - id: information_string
    label: Information String
    type: string
    command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
    description: "03h=Horizontal sync frequency, 04h=Vertical sync frequency. Returns label/info string"

  - id: eco_mode
    label: Eco Mode
    type: enum
    command: "03h B0h 00h 00h 01h 07h BBh"
    description: "Returns eco mode value. Refer to Appendix for mapping"

  - id: lan_projector_name
    label: LAN Projector Name
    type: string
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    description: "Returns projector name (up to 17 bytes)"

  - id: mac_address
    label: MAC Address
    type: string
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    description: "Returns 6-byte MAC address"

  - id: pip_pbp_status
    label: PIP/Picture by Picture Status
    type: composite
    command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
    description: "00h=MODE (00h=PIP/01h=PBP), 01h=START POSITION, 02h=SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

  - id: edge_blending_mode
    label: Edge Blending Mode
    type: enum
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    values: [off, on]
    description: "00h=OFF, 01h=ON"

  - id: base_model_type
    label: Base Model Type
    type: composite
    command: "00h BFh 00h 00h 01h 00h C0h"
    description: "Returns base model type and model name string"

  - id: serial_number
    label: Serial Number
    type: string
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    description: "Returns serial number (up to 16 bytes)"

  - id: basic_information
    label: Basic Information
    type: composite
    command: "00h BFh 00h 00h 01h 02h C2h"
    description: "Returns operation status, content displayed, signal type, video/sound/onscreen mute, freeze status"
```

## Variables
```yaml
variables:
  - id: brightness
    label: Brightness
    type: integer
    description: "Picture brightness adjustment via 030-1 PICTURE ADJUST (target 00h)"

  - id: contrast
    label: Contrast
    type: integer
    description: "Picture contrast adjustment via 030-1 PICTURE ADJUST (target 01h)"

  - id: color
    label: Color
    type: integer
    description: "Picture color adjustment via 030-1 PICTURE ADJUST (target 02h)"

  - id: hue
    label: Hue
    type: integer
    description: "Picture hue adjustment via 030-1 PICTURE ADJUST (target 03h)"

  - id: sharpness
    label: Sharpness
    type: integer
    description: "Picture sharpness adjustment via 030-1 PICTURE ADJUST (target 04h)"

  - id: volume
    label: Volume
    type: integer
    description: "Sound volume adjustment via 030-2 VOLUME ADJUST"

  - id: lamp_adjust
    label: Lamp/Light Adjust
    type: integer
    description: "Lamp or light adjustment via 030-15 OTHER ADJUST"

  - id: aspect
    label: Aspect
    type: integer
    description: "Aspect ratio setting via 030-12 ASPECT ADJUST. Refer to Appendix for value mapping"
```

## Events
```yaml
# UNRESOLVED: no unsolicited event/notification protocol described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source notes: during power on, no other command accepted until complete.
# During power off (including cooling time), no other command accepted.
# Interlock switch open status reported in extended error status (DATA09 Bit1).
# Never infer safety interlock sequences - only what source states explicitly.
```

## Notes

- All commands are binary hex frames with a trailing checksum byte. Checksum = low-order byte of sum of all preceding bytes.
- Command frame structure varies: some commands are fixed-length (6 bytes), others have variable DATA sections with a LEN field.
- Response frames start with the command byte ORed with 20h (success) or 80h+20h (error). Error responses carry ERR1/ERR2 error codes.
- Supported baud rates: 115200, 38400, 19200, 9600, 4800 bps. Source lists 115200 first.
- TCP port 7142 for LAN control (both wired and wireless).
- Input terminal values, aspect values, eco mode values, and sub-input values reference an Appendix ("Supplementary Information by Command") that was not included in the refined source document.
- Remote key code command (050) maps to physical remote buttons — key code table provided in source.
- Lens control (053) supports continuous drive (7Fh=+ / 81h=-) with explicit stop command (00h).
- Two-lamp projector models support Lamp 2 queries (DATA01=01h) in lamp information request.
<!-- UNRESOLVED: Appendix with input terminal, aspect, eco mode, and sub-input value mappings not included in source -->
<!-- UNRESOLVED: flow_control setting for serial not stated in source -->
<!-- UNRESOLVED: default baud rate not explicitly stated; 115200 listed first -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-05-18T16:36:43.206Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-18T16:36:43.206Z
matched_actions: 28
action_count: 28
confidence: high
summary: "All 28 spec actions match source command encodings verbatim; transport parameters confirmed in source documentation."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
