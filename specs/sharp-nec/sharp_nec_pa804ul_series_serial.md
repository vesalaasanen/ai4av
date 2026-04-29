---
schema_version: ai4av-public-spec-v1
device_id: sharp-nec/pa804ul-series
entity_id: sharp_nec_pa804ul_series
spec_id: admin/sharp-nec-pa804ul-series
revision: 1
author: admin
title: "Sharp-NEC PA804UL Series Control Spec"
status: published
manufacturer: Sharp-NEC
manufacturer_key: sharp-nec
model_family: "PA804UL Series"
aliases: []
compatible_with:
  manufacturers:
    - Sharp-NEC
  models:
    - "PA804UL Series"
  firmware: "\"\" # UNRESOLVED: firmware version not stated in source"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls:
  - https://sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
source_documents:
  - title: "Sharp-NEC public source"
    url: https://sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T10:09:17.395Z
  - title: "Sharp-NEC public source"
    url: https://sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T10:09:19.549Z
  - title: "Sharp-NEC public source"
    url: https://sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T10:09:23.445Z
  - title: "Sharp-NEC public source"
    url: https://sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T10:09:26.551Z
  - title: "Sharp-NEC public source"
    url: https://sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T10:09:32.506Z
retrieved_at: 2026-04-29T10:09:32.506Z
last_checked_at: 2026-04-27T09:45:19.205Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "\"\" # UNRESOLVED: firmware version not stated in source"
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-27T09:45:19.205Z
  matched_actions: 53
  action_count: 53
  confidence: high
  summary: "All 53 spec action/feedback commands matched literally in source; hex sequences verified; transport parameters confirmed."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-15
---

# Sharp-NEC PA804UL Series Control Spec

## Summary

Binary control protocol for Sharp-NEC PA804UL Series projectors over RS-232C serial and TCP/IP (wired LAN, port 7142). Covers power, input switching, picture/sound/onscreen mute, picture adjustment, volume, lens control, lens memory, shutter, freeze, eco mode, edge blending, PIP/PbP, and extensive status queries. Commands are fixed-length binary frames with hex-encoded parameters and a trailing checksum byte.

<!-- UNRESOLVED: PA804UL-specific input terminal codes not listed in the appendix — appendix covers other NEC models only -->
<!-- UNRESOLVED: PA804UL-specific eco mode values not listed in the appendix — appendix covers other NEC models only -->
<!-- UNRESOLVED: PA804UL-specific aspect values not listed in the appendix — appendix covers other NEC models only -->
<!-- UNRESOLVED: standby mode settings for receiving commands — PA804UL not listed in the standby mode table -->

## Transport

```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: null  # UNRESOLVED: source lists 115200/38400/19200/9600/4800 bps - default not stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not explicitly stated; communication mode is full duplex
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits

```yaml
traits:
  - powerable    # inferred from power on/off commands
  - routable     # inferred from input switch command
  - queryable    # inferred from multiple request commands
  - levelable    # inferred from volume/picture adjust commands
  - mutable      # inferred from picture/sound/onscreen mute commands
```

## Actions

```yaml
actions:
  - id: power_on
    label: Power On
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    response_success: "22h 00h <ID1> <ID2> 00h <CKS>"
    params: []
    notes: No other commands accepted while powering on.

  - id: power_off
    label: Power Off
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    response_success: "22h 01h <ID1> <ID2> 00h <CKS>"
    params: []
    notes: No other commands accepted during power-off including cooling time.

  - id: input_switch
    label: Input Switch
    kind: action
    command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
    response_success: "22h 03h <ID1> <ID2> 01h <DATA01> <CKS>"
    params:
      - name: input_terminal
        type: integer
        description: "Input terminal hex code (e.g. 06h=VIDEO). See appendix for model-specific codes."
    notes: "Response DATA01: 00h=success, FFh=error (no signal switch)."

  - id: picture_mute_on
    label: Picture Mute On
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    response_success: "22h 10h <ID1> <ID2> 00h <CKS>"
    params: []
    notes: Mute cancels on input switch or video signal switch.

  - id: picture_mute_off
    label: Picture Mute Off
    kind: action
    command: "02h 11h 00h 00h 00h 13h"
    response_success: "22h 11h <ID1> <ID2> 00h <CKS>"
    params: []

  - id: sound_mute_on
    label: Sound Mute On
    kind: action
    command: "02h 12h 00h 00h 00h 14h"
    response_success: "22h 12h <ID1> <ID2> 00h <CKS>"
    params: []
    notes: Mute cancels on input switch, video signal switch, or volume adjustment.

  - id: sound_mute_off
    label: Sound Mute Off
    kind: action
    command: "02h 13h 00h 00h 00h 15h"
    response_success: "22h 13h <ID1> <ID2> 00h <CKS>"
    params: []

  - id: onscreen_mute_on
    label: Onscreen Mute On
    kind: action
    command: "02h 14h 00h 00h 00h 16h"
    response_success: "22h 14h <ID1> <ID2> 00h <CKS>"
    params: []
    notes: Mute cancels on input switch or video signal switch.

  - id: onscreen_mute_off
    label: Onscreen Mute Off
    kind: action
    command: "02h 15h 00h 00h 00h 17h"
    response_success: "22h 15h <ID1> <ID2> 00h <CKS>"
    params: []

  - id: picture_adjust
    label: Picture Adjust
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> <DATA03> <DATA04> <CKS>"
    response_success: "23h 10h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: target
        type: integer
        description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
      - name: mode
        type: integer
        description: "00h=absolute, 01h=relative"
      - name: value
        type: integer
        description: "16-bit signed adjustment value (low byte, high byte)"

  - id: volume_adjust
    label: Volume Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
    response_success: "23h 10h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"
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
    response_success: "23h 10h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: aspect_value
        type: integer
        description: "Aspect hex code - model-specific, see appendix"

  - id: lamp_adjust
    label: Lamp/Light Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 96h FFh <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
    response_success: "23h 10h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"
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
    response_success: "22h 0Fh <ID1> <ID2> 01h <DATA01> <CKS>"
    params:
      - name: key_code
        type: integer
        description: "WORD key code (e.g. 02h 00h=POWER ON, 03h 00h=POWER OFF, 05h 00h=AUTO, 06h 00h=MENU, etc.)"
    notes: "Response DATA01: 00h=success, FFh=error."

  - id: shutter_close
    label: Shutter Close
    kind: action
    command: "02h 16h 00h 00h 00h 18h"
    response_success: "22h 16h <ID1> <ID2> 00h <CKS>"
    params: []

  - id: shutter_open
    label: Shutter Open
    kind: action
    command: "02h 17h 00h 00h 00h 19h"
    response_success: "22h 17h <ID1> <ID2> 00h <CKS>"
    params: []

  - id: lens_control
    label: Lens Control
    kind: action
    command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    response_success: "22h 18h <ID1> <ID2> 01h <DATA01> <CKS>"
    params:
      - name: target
        type: integer
        description: "00h=Zoom, 01h=Focus, 02h=Lens Shift H, 03h=Lens Shift V, 06h=Periphery Focus"
      - name: direction
        type: integer
        description: "00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s"
    notes: Send 00h to stop continuous drive. While lens is driving, same command can re-issue without stop.

  - id: lens_control_2
    label: Lens Control 2 (Absolute/Relative)
    kind: action
    command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
    response_success: "22h 1Dh <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: target
        type: integer
        description: "00h=Zoom, 01h=Focus, 02h=Lens Shift H, 03h=Lens Shift V, FFh=Stop"
      - name: mode
        type: integer
        description: "00h=absolute, 02h=relative"
      - name: value
        type: integer
        description: "16-bit adjustment value (low byte, high byte)"
    notes: When DATA01=FFh (Stop), mode and value are not referenced.

  - id: lens_memory_control
    label: Lens Memory Control
    kind: action
    command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
    response_success: "22h 1Eh <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: operation
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET"
    notes: "Response DATA02: 00h=success, FFh=error."

  - id: reference_lens_memory_control
    label: Reference Lens Memory Control
    kind: action
    command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
    response_success: "22h 1Fh <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: operation
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET"
    notes: Controls the profile number set via lens_profile_set.

  - id: lens_memory_option_set
    label: Lens Memory Option Set
    kind: action
    command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    response_success: "22h 21h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: target
        type: integer
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: value
        type: integer
        description: "00h=OFF, 01h=ON"

  - id: lens_profile_set
    label: Lens Profile Set
    kind: action
    command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
    response_success: "22h 27h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: profile_number
        type: integer
        description: "00h=Profile 1, 01h=Profile 2"

  - id: freeze_control
    label: Freeze Control
    kind: action
    command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
    response_success: "21h 98h <ID1> <ID2> 01h <DATA01> <CKS>"
    params:
      - name: operation
        type: integer
        description: "01h=freeze on, 02h=freeze off"

  - id: eco_mode_set
    label: Eco Mode Set
    kind: action
    command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
    response_success: "23h B1h <ID1> <ID2> 02h 07h <DATA01> <CKS>"
    params:
      - name: eco_mode
        type: integer
        description: "Eco mode value - model-specific, see appendix"

  - id: projector_name_set
    label: Projector Name Set
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch <DATA01>-<DATA16> 00h <CKS>"
    response_success: "23h B1h <ID1> <ID2> 02h 2Ch <DATA01> <CKS>"
    params:
      - name: name
        type: string
        description: "Projector name up to 16 bytes"

  - id: pip_pbp_set
    label: PIP/Picture by Picture Set
    kind: action
    command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
    response_success: "23h B1h <ID1> <ID2> 03h C5h <DATA01> <DATA02> <CKS>"
    params:
      - name: target
        type: integer
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: value
        type: integer
        description: "MODE: 00h=PIP, 01h=PbP; POSITION: 00h=TL, 01h=TR, 02h=BL, 03h=BR; sub input values model-specific"

  - id: edge_blending_set
    label: Edge Blending Set
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
    response_success: "23h B1h <ID1> <ID2> 03h DFh 00h <DATA01> <CKS>"
    params:
      - name: value
        type: integer
        description: "00h=OFF, 01h=ON"

  - id: audio_select_set
    label: Audio Select Set
    kind: action
    command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
    response_success: "23h C9h <ID1> <ID2> 03h 09h <DATA01> <DATA02> <CKS>"
    params:
      - name: input_terminal
        type: integer
        description: "Input terminal code - see appendix"
      - name: setting
        type: integer
        description: "00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks

```yaml
feedbacks:
  - id: error_status
    label: Error Status
    type: binary_flags
    command: "00h 88h 00h 00h 00h 88h"
    response_success: "20h 88h <ID1> <ID2> 0Ch <DATA01>-<DATA12> <CKS>"
    description: "12 bytes of error bit flags. Bit=0 normal, Bit=1 error. Covers cover, fan, temperature, lamp, power, formatter, FPGA, mirror cover, interlock, lens, iris errors."

  - id: information
    label: Projector Information
    type: composite
    command: "03h 8Ah 00h 00h 00h 8Dh"
    response_success: "23h 8Ah <ID1> <ID2> 62h <DATA01>-<DATA98> <CKS>"
    description: "98 bytes: projector name (1-49), lamp usage time in seconds (83-86), filter usage time in seconds (87-90)."

  - id: filter_usage
    label: Filter Usage Information
    type: composite
    command: "03h 95h 00h 00h 00h 98h"
    response_success: "23h 95h <ID1> <ID2> 08h <DATA01>-<DATA08> <CKS>"
    description: "Filter usage time in seconds (1-4), filter alarm start time in seconds (5-8). -1 if undefined."

  - id: lamp_information
    label: Lamp Information
    type: composite
    command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    response_success: "23h 96h <ID1> <ID2> 06h <DATA01>-<DATA06> <CKS>"
    description: "DATA01 target (00h=Lamp1, 01h=Lamp2), DATA02 content (01h=usage seconds, 04h=remaining life %), DATA03-06=value."

  - id: carbon_savings
    label: Carbon Savings Information
    type: composite
    command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
    response_success: "23h 9Ah <ID1> <ID2> 09h <DATA01>-<DATA09> <CKS>"
    description: "DATA01 target (00h=total, 01h=operation). DATA02-05 kg (max 99999), DATA06-09 mg (max 999999)."

  - id: lens_position
    label: Lens Position
    type: composite
    command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
    response_success: "22h 1Ch <ID1> <ID2> 08h <DATA01> 00h <DATA02>-<DATA07> <CKS>"
    description: "DATA01 target (00h=Zoom, 01h=Focus, 02h=ShiftH, 03h=ShiftV). Returns upper limit, lower limit, current value (16-bit each)."

  - id: lens_memory_option
    label: Lens Memory Option
    type: enum
    command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
    response_success: "22h 20h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"
    description: "DATA01 target (00h=LOAD BY SIGNAL, 01h=FORCED MUTE). DATA02: 00h=OFF, 01h=ON."

  - id: lens_information
    label: Lens Operation Status
    type: binary_flags
    command: "02h 22h 00h 00h 01h 00h 25h"
    response_success: "22h 22h <ID1> <ID2> 02h 00h <DATA01> <CKS>"
    description: "Bit flags: Bit0=lens memory, Bit1=zoom, Bit2=focus, Bit3=lens shift H, Bit4=lens shift V. 0=stopped, 1=operating."

  - id: lens_profile
    label: Lens Profile
    type: enum
    command: "02h 28h 00h 00h 00h 2Ah"
    response_success: "22h 28h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"
    values: ["Profile 1 (00h)", "Profile 2 (01h)"]

  - id: gain_parameter
    label: Gain Parameter
    type: composite
    command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
    response_success: "23h 05h <ID1> <ID2> 10h <DATA01>-<DATA16> <CKS>"
    description: "DATA01 target (00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness, 05h=Volume, 96h=Lamp). Returns adjustment status, upper/lower limits, default, current value, step widths."

  - id: setting_request
    label: Projector Settings
    type: composite
    command: "00h 85h 00h 00h 01h 00h 86h"
    response_success: "20h 85h <ID1> <ID2> 20h <DATA01>-<DATA32> <CKS>"
    description: "Base model type (1-3), sound function (4), profile number (5)."

  - id: running_status
    label: Running Status
    type: composite
    command: "00h 85h 00h 00h 01h 01h 87h"
    response_success: "20h 85h <ID1> <ID2> 10h <DATA01>-<DATA16> <CKS>"
    description: "Power status (DATA03: 00h=standby, 01h=on), cooling process, power on/off process, operation status (DATA06: 00h=standby sleep, 04h=on, 05h=cooling, 06h=standby error, 0Fh=standby power saving, 10h=network standby)."

  - id: input_status
    label: Input Status
    type: composite
    command: "00h 85h 00h 00h 01h 02h 88h"
    response_success: "20h 85h <ID1> <ID2> 10h <DATA01>-<DATA16> <CKS>"
    description: "Signal switch process, signal list number, selection signal types 1 & 2, test pattern display, content displayed."

  - id: mute_status
    label: Mute Status
    type: composite
    command: "00h 85h 00h 00h 01h 03h 89h"
    response_success: "20h 85h <ID1> <ID2> 10h <DATA01>-<DATA16> <CKS>"
    description: "Picture mute, sound mute, onscreen mute, forced onscreen mute, onscreen display (each 00h=Off, 01h=On, FFh=not supported)."

  - id: model_name
    label: Model Name
    type: string
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    response_success: "20h 85h <ID1> <ID2> 20h <DATA01>-<DATA32> <CKS>"
    description: "Model name as NUL-terminated string (up to 32 bytes)."

  - id: cover_status
    label: Cover Status
    type: enum
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    response_success: "20h 85h <ID1> <ID2> 01h <DATA01> <CKS>"
    values: ["Normal / cover opened (00h)", "Cover closed (01h)"]

  - id: information_string
    label: Information String
    type: composite
    command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
    response_success: "20h D0h <ID1> <ID2> LEN <DATA01> 01h <DATA02>-<DATA??> <CKS>"
    description: "DATA01: 03h=horizontal sync freq, 04h=vertical sync freq. Returns label/info NUL-terminated string."

  - id: eco_mode
    label: Eco Mode
    type: enum
    command: "03h B0h 00h 00h 01h 07h BBh"
    response_success: "23h B0h <ID1> <ID2> 02h 07h <DATA01> <CKS>"
    description: "Eco mode value - model-specific, see appendix."

  - id: projector_name
    label: Projector Name
    type: string
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    response_success: "23h B0h <ID1> <ID2> 12h 2Ch <DATA01>-<DATA17> <CKS>"
    description: "Projector name as NUL-terminated string (up to 17 bytes)."

  - id: mac_address
    label: MAC Address
    type: string
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    response_success: "23h B0h <ID1> <ID2> 08h 9Ah 00h <DATA01>-<DATA06> <CKS>"
    description: "6-byte MAC address."

  - id: pip_pbp_status
    label: PIP/Picture by Picture Status
    type: composite
    command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
    response_success: "23h B0h <ID1> <ID2> 03h C5h <DATA01> <DATA02> <CKS>"
    description: "DATA01 target (00h=MODE, 01h=POSITION, 02h=SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3). Returns current setting."

  - id: edge_blending_status
    label: Edge Blending Status
    type: enum
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    response_success: "23h B0h <ID1> <ID2> 03h DFh 00h <DATA01> <CKS>"
    values: ["OFF (00h)", "ON (01h)"]

  - id: base_model_type
    label: Base Model Type
    type: composite
    command: "00h BFh 00h 00h 01h 00h C0h"
    response_success: "20h BFh <ID1> <ID2> 10h 00h <DATA01>-<DATA15> <CKS>"
    description: "Base model type and model name."

  - id: serial_number
    label: Serial Number
    type: string
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    response_success: "20h BFh <ID1> <ID2> 12h 01h 06h <DATA01>-<DATA16> <CKS>"
    description: "Serial number as NUL-terminated string (up to 16 bytes)."

  - id: basic_information
    label: Basic Information
    type: composite
    command: "00h BFh 00h 00h 01h 02h C2h"
    response_success: "20h BFh <ID1> <ID2> 10h 02h <DATA01>-<DATA15> <CKS>"
    description: "Operation status, content displayed, signal types, display signal type, video/sound/onscreen mute, freeze status."
```

## Variables

```yaml
variables:
  - id: brightness
    label: Brightness
    type: integer
    query_command: "03h 05h 00h 00h 03h 00h 00h 00h 0Bh"
    set_command: "03h 10h 00h 00h 05h 00h FFh <DATA02> <DATA03> <DATA04> <CKS>"
    description: "Picture brightness adjustment"

  - id: contrast
    label: Contrast
    type: integer
    query_command: "03h 05h 00h 00h 03h 01h 00h 00h <CKS>"
    set_command: "03h 10h 00h 00h 05h 01h FFh <DATA02> <DATA03> <DATA04> <CKS>"

  - id: color
    label: Color
    type: integer
    query_command: "03h 05h 00h 00h 03h 02h 00h 00h <CKS>"
    set_command: "03h 10h 00h 00h 05h 02h FFh <DATA02> <DATA03> <DATA04> <CKS>"

  - id: hue
    label: Hue
    type: integer
    query_command: "03h 05h 00h 00h 03h 03h 00h 00h <CKS>"
    set_command: "03h 10h 00h 00h 05h 03h FFh <DATA02> <DATA03> <DATA04> <CKS>"

  - id: sharpness
    label: Sharpness
    type: integer
    query_command: "03h 05h 00h 00h 03h 04h 00h 00h <CKS>"
    set_command: "03h 10h 00h 00h 05h 04h FFh <DATA02> <DATA03> <DATA04> <CKS>"

  - id: volume
    label: Volume
    type: integer
    query_command: "03h 05h 00h 00h 03h 05h 00h 00h <CKS>"
    set_command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
```

## Events

```yaml
# UNRESOLVED: source does not document unsolicited events or push notifications
```

## Macros

```yaml
# UNRESOLVED: source does not describe multi-step macro sequences
```

## Safety

```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source mentions interlock switch in error status (DATA09 Bit1) but no interlock
# procedures documented. Power on/off commands block other commands during transitions.
```

## Notes

- All commands use binary hex frames with a trailing checksum byte. Checksum is the low-order byte of the sum of all preceding bytes.
- Commands include model-dependent parameters ID1 (control ID) and ID2 (model code).
- Error responses use prefix byte A0h/A1h/A2h/A3h (depending on command length) and carry ERR1/ERR2 error codes.
- Multiple baud rates supported (115200, 38400, 19200, 9600, 4800) — default not stated.
- TCP control uses port 7142 on wired LAN.
- Some models cannot receive commands in standby mode over LAN.
- Lamp usage time and filter usage time update at one-minute intervals despite being returned in seconds.
- Picture/sound/onscreen mute automatically cancels on input switch or signal switch.
- Appendix tables for input terminal codes, aspect values, and eco mode values are model-specific and do not include PA804UL entries.

<!-- UNRESOLVED: PA804UL-specific input terminal hex codes not in appendix -->
<!-- UNRESOLVED: PA804UL-specific aspect mode values not in appendix -->
<!-- UNRESOLVED: PA804UL-specific eco mode values not in appendix -->
<!-- UNRESOLVED: PA804UL standby mode settings for serial/LAN command reception not in table -->
<!-- UNRESOLVED: flow control setting not explicitly stated for serial -->
<!-- UNRESOLVED: default baud rate not stated (multiple supported) -->
<!-- UNRESOLVED: command timing / minimum inter-command delay not documented -->
<!-- UNRESOLVED: maximum concurrent connection count for TCP not documented -->

## Provenance

```yaml
source_urls:
  - https://sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
source_documents:
  - title: "Sharp-NEC public source"
    url: https://sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T10:09:17.395Z
  - title: "Sharp-NEC public source"
    url: https://sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T10:09:19.549Z
  - title: "Sharp-NEC public source"
    url: https://sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T10:09:23.445Z
  - title: "Sharp-NEC public source"
    url: https://sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T10:09:26.551Z
  - title: "Sharp-NEC public source"
    url: https://sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T10:09:32.506Z
retrieved_at: 2026-04-29T10:09:32.506Z
last_checked_at: 2026-04-27T09:45:19.205Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-27T09:45:19.205Z
matched_actions: 53
action_count: 53
confidence: high
summary: "All 53 spec action/feedback commands matched literally in source; hex sequences verified; transport parameters confirmed."
```

## Known Gaps

```yaml
[]
```
