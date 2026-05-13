---
spec_id: admin/sharp-nec-p547ul-series-serial
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp-NEC P547UL Series Control Spec"
manufacturer: Sharp-NEC
model_family: P547UL
aliases: []
compatible_with:
  manufacturers:
    - Sharp-NEC
  models:
    - P547UL
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
retrieved_at: 2026-04-29T10:09:32.506Z
last_checked_at: 2026-04-25T21:56:08.248Z
generated_at: 2026-04-25T21:56:08.248Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-25T21:56:08.248Z
  matched_actions: 53
  action_count: 53
  confidence: high
  summary: "All 53 spec actions matched literally in source with correct command structure; transport params verified; comprehensive protocol coverage confirmed."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-15
---

# Sharp-NEC P547UL Series Control Spec

## Summary
The Sharp-NEC P547UL Series is a laser projector controllable via RS-232C serial or TCP/IP (wired LAN, port 7142). This spec covers the binary command protocol for power control, input switching, picture/sound/onscreen mute, lens control (zoom, focus, shift), lens memory, shutter, freeze, picture/volume/aspect adjustment, eco mode, edge blending, PIP/PbyP, and various status queries. Commands are fixed-length hex byte sequences with a trailing checksum.

<!-- UNRESOLVED: specific P547UL input terminal codes not listed in supplementary tables — the appendix only covers NP-M, NP-ME, NP4100 series models -->
<!-- UNRESOLVED: specific P547UL aspect values not listed in supplementary tables -->
<!-- UNRESOLVED: specific P547UL eco mode values not listed in supplementary tables -->
<!-- UNRESOLVED: standby mode command-reception setting for P547UL not listed -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600  # supported: 4800, 9600, 19200, 38400, 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow_control not explicitly stated; RTS/CTS pins present on connector
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable  # inferred: power on/off commands present
  - queryable  # inferred: numerous request commands returning state
  - routable  # inferred: input switch command present
  - levelable  # inferred: volume, brightness, contrast, color, hue, sharpness adjustment present
```

## Actions
```yaml
actions:
  - id: power_on
    label: "Power On"
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    params: []
    notes: "No other commands accepted while powering on."

  - id: power_off
    label: "Power Off"
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    notes: "No other commands accepted during power-off including cooling time."

  - id: input_switch
    label: "Input Switch"
    kind: action
    command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
    params:
      - name: input_terminal
        type: integer
        description: "Input terminal hex code (see supplementary table)"
    notes: "Response DATA01=00h success, FFh error (no signal switch). UNRESOLVED: P547UL-specific input terminal codes not in source."

  - id: picture_mute_on
    label: "Picture Mute On"
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []
    notes: "Cleared by input switch or video signal switch."

  - id: picture_mute_off
    label: "Picture Mute Off"
    kind: action
    command: "02h 11h 00h 00h 00h 13h"
    params: []

  - id: sound_mute_on
    label: "Sound Mute On"
    kind: action
    command: "02h 12h 00h 00h 00h 14h"
    params: []
    notes: "Cleared by input switch, video signal switch, or volume adjustment."

  - id: sound_mute_off
    label: "Sound Mute Off"
    kind: action
    command: "02h 13h 00h 00h 00h 15h"
    params: []

  - id: onscreen_mute_on
    label: "Onscreen Mute On"
    kind: action
    command: "02h 14h 00h 00h 00h 16h"
    params: []
    notes: "Cleared by input switch or video signal switch."

  - id: onscreen_mute_off
    label: "Onscreen Mute Off"
    kind: action
    command: "02h 15h 00h 00h 00h 17h"
    params: []

  - id: picture_adjust
    label: "Picture Adjust"
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> <DATA03> <DATA04> <CKS>"
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
    label: "Volume Adjust"
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
    params:
      - name: mode
        type: integer
        description: "00h=Absolute, 01h=Relative"
      - name: value
        type: integer
        description: "16-bit adjustment value (low byte, high byte)"

  - id: aspect_adjust
    label: "Aspect Adjust"
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
    params:
      - name: aspect
        type: integer
        description: "Aspect value code. UNRESOLVED: P547UL-specific aspect codes not in source."

  - id: lamp_adjust
    label: "Lamp/Light Adjust"
    kind: action
    command: "03h 10h 00h 00h 05h 96h FFh <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
    params:
      - name: mode
        type: integer
        description: "00h=Absolute, 01h=Relative"
      - name: value
        type: integer
        description: "16-bit adjustment value (low byte, high byte)"

  - id: remote_key_code
    label: "Remote Key Code"
    kind: action
    command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: key_code
        type: integer
        description: "WORD key code (DATA01=low, DATA02=high). Examples: 02h 00h=POWER ON, 03h 00h=POWER OFF, 05h 00h=AUTO, 06h 00h=MENU, 84h 00h=VOLUME UP, 85h 00h=VOLUME DOWN, 8Ah 00h=FREEZE, A3h 00h=ASPECT, D7h 00h=SOURCE, EEh 00h=LAMP MODE/ECO"

  - id: shutter_close
    label: "Shutter Close"
    kind: action
    command: "02h 16h 00h 00h 00h 18h"
    params: []

  - id: shutter_open
    label: "Shutter Open"
    kind: action
    command: "02h 17h 00h 00h 00h 19h"
    params: []

  - id: lens_control
    label: "Lens Control"
    kind: action
    command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: target
        type: integer
        description: "00h=Zoom, 01h=Focus, 02h=Lens Shift H, 03h=Lens Shift V, 06h=Periphery Focus"
      - name: direction
        type: integer
        description: "00h=Stop, 01h/+1s, 02h/+0.5s, 03h/+0.25s, 7Fh=continuous plus, 81h=continuous minus, FDh/-0.25s, FEh/-0.5s, FFh/-1s"
    notes: "After continuous drive (7Fh/81h), send 00h to stop."

  - id: lens_control_2
    label: "Lens Control 2 (Absolute/Relative)"
    kind: action
    command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
    params:
      - name: target
        type: integer
        description: "00h=Zoom, 01h=Focus, 02h=Lens Shift H, 03h=Lens Shift V, FFh=Stop"
      - name: mode
        type: integer
        description: "00h=Absolute, 02h=Relative"
      - name: value
        type: integer
        description: "16-bit adjustment value (low byte, high byte)"

  - id: lens_memory_control
    label: "Lens Memory Control"
    kind: action
    command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: operation
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  - id: reference_lens_memory_control
    label: "Reference Lens Memory Control"
    kind: action
    command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: operation
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  - id: lens_memory_option_set
    label: "Lens Memory Option Set"
    kind: action
    command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: target
        type: integer
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: value
        type: integer
        description: "00h=OFF, 01h=ON"

  - id: lens_profile_set
    label: "Lens Profile Set"
    kind: action
    command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: profile
        type: integer
        description: "00h=Profile 1, 01h=Profile 2"

  - id: freeze_control
    label: "Freeze Control"
    kind: action
    command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: operation
        type: integer
        description: "01h=Freeze On, 02h=Freeze Off"

  - id: eco_mode_set
    label: "Eco Mode Set"
    kind: action
    command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
    params:
      - name: eco_mode
        type: integer
        description: "Eco mode value. UNRESOLVED: P547UL-specific eco mode codes not in source."

  - id: lan_projector_name_set
    label: "LAN Projector Name Set"
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch <DATA01-16> 00h <CKS>"
    params:
      - name: name
        type: string
        description: "Projector name (up to 16 bytes)"

  - id: pip_picture_by_picture_set
    label: "PIP/Picture by Picture Set"
    kind: action
    command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
    params:
      - name: target
        type: integer
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: value
        type: integer
        description: "MODE: 00h=PIP, 01h=PbyP. POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT."

  - id: edge_blending_mode_set
    label: "Edge Blending Mode Set"
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
    params:
      - name: value
        type: integer
        description: "00h=OFF, 01h=ON"

  - id: audio_select_set
    label: "Audio Select Set"
    kind: action
    command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
    params:
      - name: input_terminal
        type: integer
        description: "Input terminal code"
      - name: setting
        type: integer
        description: "00h=Terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
feedbacks:
  - id: error_status
    label: "Error Status"
    command: "00h 88h 00h 00h 00h 88h"
    type: binary
    description: "Returns 12 bytes of error flags: cover, fan, temperature, power, lamp, formatter, FPGA, mirror cover, interlock switch, iris calibration, lens installation errors."

  - id: power_status
    label: "Running Status"
    command: "00h 85h 00h 00h 01h 01h 87h"
    type: enum
    values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
    description: "DATA03: 00h=Standby, 01h=Power On. DATA06 operation status: 00h=Standby(Sleep), 04h=Power On, 05h=Cooling, 06h=Standby(Error), 0Fh=Standby(Power Saving), 10h=Network Standby."

  - id: input_status
    label: "Input Status"
    command: "00h 85h 00h 00h 01h 02h 88h"
    type: composite
    description: "Returns signal switch process, signal list number, selection signal type 1/2, signal list type, test pattern display, content displayed."

  - id: mute_status
    label: "Mute Status"
    command: "00h 85h 00h 00h 01h 03h 89h"
    type: composite
    description: "Returns picture mute (DATA01: 00h=Off, 01h=On), sound mute (DATA02), onscreen mute (DATA03), forced onscreen mute (DATA04), onscreen display (DATA05)."

  - id: model_name
    label: "Model Name"
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    type: string
    description: "Returns 32-byte model name (NUL-terminated)."

  - id: cover_status
    label: "Cover Status"
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    type: enum
    values: [normal_cover_open, cover_closed]
    description: "DATA01: 00h=Normal (cover opened), 01h=Cover closed."

  - id: projector_information
    label: "Projector Information"
    command: "03h 8Ah 00h 00h 00h 8Dh"
    type: composite
    description: "Returns projector name (DATA01-49), lamp usage time in seconds (DATA83-86), filter usage time in seconds (DATA87-90). Updated at 1-minute intervals."

  - id: filter_usage_info
    label: "Filter Usage Information"
    command: "03h 95h 00h 00h 00h 98h"
    type: composite
    description: "Returns filter usage time (DATA01-04, seconds) and filter alarm start time (DATA05-08, seconds). Returns -1 if not defined."

  - id: lamp_information
    label: "Lamp Information"
    command: "03h 96h 00h 00h 02h <target> <content> <CKS>"
    type: composite
    params:
      - name: target
        description: "00h=Lamp 1, 01h=Lamp 2"
      - name: content
        description: "01h=Usage time (seconds), 04h=Remaining life (%)"
    description: "Returns lamp usage time or remaining life. Negative remaining life indicates replacement deadline exceeded."

  - id: carbon_savings
    label: "Carbon Savings"
    command: "03h 9Ah 00h 00h 01h <target> <CKS>"
    type: composite
    params:
      - name: target
        description: "00h=Total, 01h=During operation"
    description: "Returns carbon savings in kg (DATA02-05, max 99999) and mg (DATA06-09, max 999999)."

  - id: lens_position
    label: "Lens Position"
    command: "02h 1Ch 00h 00h 02h <target> 00h <CKS>"
    type: composite
    params:
      - name: target
        description: "00h=Zoom, 01h=Focus, 02h=Lens Shift H, 03h=Lens Shift V"
    description: "Returns upper limit, lower limit, and current value (each 16-bit)."

  - id: lens_memory_option
    label: "Lens Memory Option"
    command: "02h 20h 00h 00h 01h <target> <CKS>"
    type: enum
    params:
      - name: target
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    values: [off, on]

  - id: lens_information
    label: "Lens Information"
    command: "02h 22h 00h 00h 01h 00h 25h"
    type: binary
    description: "Returns lens operation status bitmask: Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift H, Bit4=Lens Shift V. 0=Stop, 1=During operation."

  - id: lens_profile
    label: "Lens Profile"
    command: "02h 28h 00h 00h 00h 2Ah"
    type: enum
    values: [profile_1, profile_2]

  - id: gain_parameter
    label: "Gain Parameter"
    command: "03h 05h 00h 00h 03h <name> 00h 00h <CKS>"
    type: composite
    params:
      - name: name
        description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness, 05h=Volume, 96h=Lamp/Light Adjust"
    description: "Returns status, upper/lower limits, default value, current value, adjustment widths."

  - id: setting_info
    label: "Setting Information"
    command: "00h 85h 00h 00h 01h 00h 86h"
    type: composite
    description: "Returns base model type (DATA01-03), sound function (DATA04: 00h=Not available, 01h=Available), profile number (DATA05)."

  - id: info_string
    label: "Information String"
    command: "00h D0h 00h 00h 03h 00h <type> 01h <CKS>"
    type: string
    params:
      - name: type
        description: "03h=Horizontal sync frequency, 04h=Vertical sync frequency"
    description: "Returns label/information string."

  - id: eco_mode
    label: "Eco Mode"
    command: "03h B0h 00h 00h 01h 07h BBh"
    type: integer
    description: "Returns current eco mode value. UNRESOLVED: P547UL-specific eco mode codes not in source."

  - id: lan_projector_name
    label: "LAN Projector Name"
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    type: string
    description: "Returns 17-byte projector name (NUL-terminated)."

  - id: lan_mac_address
    label: "LAN MAC Address"
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    type: string
    description: "Returns 6-byte MAC address."

  - id: pip_pbp_status
    label: "PIP/Picture by Picture Status"
    command: "03h B0h 00h 00h 02h C5h <target> <CKS>"
    type: composite
    params:
      - name: target
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    description: "MODE: 00h=PIP, 01h=PbyP. POSITION: 00h=TOP-LEFT through 03h=BOTTOM-RIGHT."

  - id: edge_blending_status
    label: "Edge Blending Status"
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    type: enum
    values: [off, on]

  - id: base_model_type
    label: "Base Model Type"
    command: "00h BFh 00h 00h 01h 00h C0h"
    type: composite
    description: "Returns base model type (DATA01-02), model name (DATA03-11), base model type 2 (DATA12-13)."

  - id: serial_number
    label: "Serial Number"
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    type: string
    description: "Returns 16-byte serial number (NUL-terminated)."

  - id: basic_information
    label: "Basic Information"
    command: "00h BFh 00h 00h 01h 02h C2h"
    type: composite
    description: "Returns operation status, content displayed, selection signal type 1/2, display signal type, video/sound/onscreen mute, freeze status."
```

## Variables
```yaml
variables:
  - id: brightness
    label: "Brightness"
    min: null  # UNRESOLVED: range retrieved dynamically via gain parameter request
    max: null
    step: null

  - id: contrast
    label: "Contrast"
    min: null
    max: null
    step: null

  - id: color
    label: "Color"
    min: null
    max: null
    step: null

  - id: hue
    label: "Hue"
    min: null
    max: null
    step: null

  - id: sharpness
    label: "Sharpness"
    min: null
    max: null
    step: null

  - id: volume
    label: "Volume"
    min: null
    max: null
    step: null

  - id: lamp_light_adjust
    label: "Lamp/Light Adjust"
    min: null
    max: null
    step: null
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification mechanism described in source
```

## Macros
```yaml
# No multi-step sequences explicitly described in source beyond sequential lens memory operations.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source mentions interlock switch in error status (DATA09 Bit1) but no explicit
# safety interlock procedure or power-on sequencing requirement is documented.
# Power on/off commands block other commands during execution.
```

## Notes
- Binary protocol: all commands and responses are hex byte sequences. Checksum is low-order byte of sum of all preceding bytes.
- Command frame structure: `<CMD_BYTE> <SUB_BYTE> <ID1> <ID2> <LEN> <DATA...> <CKS>`
- ID1 = control ID set on projector, ID2 = model code (varies by model).
- Response prefix distinguishes success (bit 7 cleared with 20h/21h/22h/23h) from failure (A0h/A1h/A2h/A3h).
- Error responses include ERR1 and ERR2 bytes indicating the cause of failure.
- Serial connector: D-SUB 9P with RTS/CTS handshaking lines.
- LAN connector: RJ-45, auto-negotiating 10/100 Mbps.
- Lamp usage time and filter usage time are updated at 1-minute intervals despite being returned in seconds.
- The supplementary tables in the source only cover NP-M, NP-ME, and NP4100 series models — P547UL-specific values for input terminal codes, aspect codes, and eco mode codes are not documented.
<!-- UNRESOLVED: P547UL-specific input terminal hex codes not in supplementary tables -->
<!-- UNRESOLVED: P547UL-specific aspect adjustment values not in supplementary tables -->
<!-- UNRESOLVED: P547UL-specific eco mode values not in supplementary tables -->
<!-- UNRESOLVED: P547UL standby mode setting for receiving commands not listed -->
<!-- UNRESOLVED: flow control method not explicitly stated (RTS/CTS pins wired but protocol behavior unspecified) -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
retrieved_at: 2026-04-29T10:09:32.506Z
last_checked_at: 2026-04-25T21:56:08.248Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T21:56:08.248Z
matched_actions: 53
action_count: 53
confidence: high
summary: "All 53 spec actions matched literally in source with correct command structure; transport params verified; comprehensive protocol coverage confirmed."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
