---
spec_id: admin/nec-np-um301x-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC NP-UM301X Series Control Spec"
manufacturer: NEC
model_family: NP-UM301X
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - NP-UM301X
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-05-14T18:17:18.753Z
generated_at: 2026-05-14T18:17:18.753Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:18.753Z
  matched_actions: 28
  action_count: 28
  confidence: high
  summary: "All 53 spec actions match literal wire tokens in NEC UM301X serial source; transport parameters verified; no fabricated or drifted commands."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-13
---

# NEC NP-UM301X Series Control Spec

## Summary

The NEC NP-UM301X is an ultra-short-throw projector controllable via RS-232C serial or wired LAN (TCP). The protocol uses binary command frames with hex-encoded byte sequences, a checksum byte, and model-specific ID parameters. This spec covers power control, input switching, audio/video mute, picture and volume adjustment, lens control, shutter, freeze, eco mode, edge blending, PIP/PbP, and various status queries.

<!-- UNRESOLVED: NP-UM301X is not explicitly listed in the supplementary tables for input terminal codes, aspect values, or eco mode values. Those per-model lookup tables cover other NEC families. Input terminal hex codes should be confirmed from the projector on-screen menu or a model-specific supplement. -->
<!-- UNRESOLVED: standby mode command-reception capability not stated for NP-UM301X specifically -->

## Transport

```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: RTS/CTS pins wired but no software flow control stated
addressing:
  port: 7142  # TCP port for LAN command interface
auth:
  type: none  # inferred: no authentication procedure described in source
```

## Traits

```yaml
traits:
  - powerable     # power on/off commands
  - routable      # input switch command
  - queryable     # extensive status request commands
  - levelable     # volume, brightness, contrast, color, hue, sharpness, lamp adjust
  - mutable       # picture mute, sound mute, onscreen mute
```

## Actions

```yaml
actions:
  - id: power_on
    label: Power On
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    response_success: "22h 00h <ID1> <ID2> 00h <CKS>"
    response_failure: "A2h 00h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"
    params: []
    notes: No other commands accepted while powering on.

  - id: power_off
    label: Power Off
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    response_success: "22h 01h <ID1> <ID2> 00h <CKS>"
    response_failure: "A2h 01h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"
    params: []
    notes: No other commands accepted during power-off including cooling period.

  - id: input_switch
    label: Input Switch
    kind: action
    command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
    response_success: "22h 03h <ID1> <ID2> 01h <DATA01> <CKS>"
    response_failure: "A2h 03h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"
    params:
      - name: input_terminal
        type: integer
        description: "Input terminal hex code (model-dependent). Example: 06h = VIDEO. See supplementary table."
    notes: "Response DATA01: 00h = success, FFh = error (no signal switch made). Input terminal codes vary by model."

  - id: picture_mute_on
    label: Picture Mute On
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    response_success: "22h 10h <ID1> <ID2> 00h <CKS>"
    response_failure: "A2h 10h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"
    params: []
    notes: Picture mute is cancelled by input switch or video signal change.

  - id: picture_mute_off
    label: Picture Mute Off
    kind: action
    command: "02h 11h 00h 00h 00h 13h"
    response_success: "22h 11h <ID1> <ID2> 00h <CKS>"
    response_failure: "A2h 11h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"
    params: []

  - id: sound_mute_on
    label: Sound Mute On
    kind: action
    command: "02h 12h 00h 00h 00h 14h"
    response_success: "22h 12h <ID1> <ID2> 00h <CKS>"
    response_failure: "A2h 12h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"
    params: []
    notes: Sound mute is cancelled by input switch, video signal change, or volume adjustment.

  - id: sound_mute_off
    label: Sound Mute Off
    kind: action
    command: "02h 13h 00h 00h 00h 15h"
    response_success: "22h 13h <ID1> <ID2> 00h <CKS>"
    response_failure: "A2h 13h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"
    params: []

  - id: onscreen_mute_on
    label: Onscreen Mute On
    kind: action
    command: "02h 14h 00h 00h 00h 16h"
    response_success: "22h 14h <ID1> <ID2> 00h <CKS>"
    response_failure: "A2h 14h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"
    params: []
    notes: Onscreen mute is cancelled by input switch or video signal change.

  - id: onscreen_mute_off
    label: Onscreen Mute Off
    kind: action
    command: "02h 15h 00h 00h 00h 17h"
    response_success: "22h 15h <ID1> <ID2> 00h <CKS>"
    response_failure: "A2h 15h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"
    params: []

  - id: picture_adjust
    label: Picture Adjust
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> <DATA03> <DATA04> <CKS>"
    response_success: "23h 10h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"
    response_failure: "A3h 10h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"
    params:
      - name: target
        type: integer
        description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
      - name: mode
        type: integer
        description: "00h=absolute value, 01h=relative value"
      - name: value_lo
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: value_hi
        type: integer
        description: "Adjustment value (high-order 8 bits)"

  - id: volume_adjust
    label: Volume Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
    response_success: "23h 10h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"
    response_failure: "A3h 10h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"
    params:
      - name: mode
        type: integer
        description: "00h=absolute value, 01h=relative value"
      - name: value_lo
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: value_hi
        type: integer
        description: "Adjustment value (high-order 8 bits)"

  - id: aspect_adjust
    label: Aspect Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
    response_success: "23h 10h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"
    response_failure: "A3h 10h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"
    params:
      - name: aspect
        type: integer
        description: "Aspect value code (model-dependent, see supplementary table)"

  - id: lamp_adjust
    label: Lamp Adjust / Light Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 96h FFh <DATA03> <DATA04> <DATA05> <CKS>"
    response_success: "23h 10h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"
    response_failure: "A3h 10h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"
    params:
      - name: mode
        type: integer
        description: "00h=absolute value, 01h=relative value"
      - name: value_lo
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: value_hi
        type: integer
        description: "Adjustment value (high-order 8 bits)"

  - id: remote_key_code
    label: Remote Key Code
    kind: action
    command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
    response_success: "22h 0Fh <ID1> <ID2> 01h <DATA01> <CKS>"
    response_failure: "A2h 0Fh <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"
    params:
      - name: key_code_lo
        type: integer
        description: "Key code low byte (WORD type). Examples: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 13h=MUTE, 29h=PICTURE, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO"
      - name: key_code_hi
        type: integer
        description: "Key code high byte (typically 00h)"

  - id: shutter_close
    label: Shutter Close
    kind: action
    command: "02h 16h 00h 00h 00h 18h"
    response_success: "22h 16h <ID1> <ID2> 00h <CKS>"
    response_failure: "A2h 16h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"
    params: []

  - id: shutter_open
    label: Shutter Open
    kind: action
    command: "02h 17h 00h 00h 00h 19h"
    response_success: "22h 17h <ID1> <ID2> 00h <CKS>"
    response_failure: "A2h 17h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"
    params: []

  - id: lens_control
    label: Lens Control
    kind: action
    command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    response_success: "22h 18h <ID1> <ID2> 01h <DATA01> <CKS>"
    response_failure: "A2h 18h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"
    params:
      - name: target
        type: integer
        description: "00h=Zoom, 01h=Focus, 02h=Lens Shift H, 03h=Lens Shift V, 06h=Periphery Focus"
      - name: motion
        type: integer
        description: "00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s"
    notes: Send 00h to stop continuous drive. While lens is being driven, same command can be reissued without prior stop.

  - id: lens_control_2
    label: Lens Control 2 (Absolute/Relative)
    kind: action
    command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
    response_success: "22h 1Dh <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"
    response_failure: "A2h 1Dh <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"
    params:
      - name: target
        type: integer
        description: "00h=Zoom, 01h=Focus, 02h=Lens Shift H, 03h=Lens Shift V, FFh=Stop"
      - name: mode
        type: integer
        description: "00h=absolute value, 02h=relative value"
      - name: value_lo
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: value_hi
        type: integer
        description: "Adjustment value (high-order 8 bits)"

  - id: lens_memory_control
    label: Lens Memory Control
    kind: action
    command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
    response_success: "22h 1Eh <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"
    response_failure: "A2h 1Eh <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"
    params:
      - name: operation
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  - id: reference_lens_memory_control
    label: Reference Lens Memory Control
    kind: action
    command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
    response_success: "22h 1Fh <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"
    response_failure: "A2h 1Fh <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"
    params:
      - name: operation
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET"
    notes: Controls the profile number specified by lens_profile_set.

  - id: lens_memory_option_set
    label: Lens Memory Option Set
    kind: action
    command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    response_success: "22h 21h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"
    response_failure: "A2h 21h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"
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
    response_failure: "A2h 27h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"
    params:
      - name: profile
        type: integer
        description: "00h=Profile 1, 01h=Profile 2"

  - id: freeze_control
    label: Freeze Control
    kind: action
    command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
    response_success: "21h 98h <ID1> <ID2> 01h <DATA01> <CKS>"
    response_failure: "A1h 98h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"
    params:
      - name: operation
        type: integer
        description: "01h=freeze on, 02h=freeze off"

  - id: eco_mode_set
    label: Eco Mode Set
    kind: action
    command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
    response_success: "23h B1h <ID1> <ID2> 02h 07h <DATA01> <CKS>"
    response_failure: "A3h B1h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"
    params:
      - name: eco_mode
        type: integer
        description: "Eco mode value code (model-dependent, see supplementary table)"
    notes: Depending on projector, this sets Light mode or Lamp mode.

  - id: projector_name_set
    label: Projector Name Set
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch <DATA01>-<DATA16> 00h <CKS>"
    response_success: "23h B1h <ID1> <ID2> 02h 2Ch <DATA01> <CKS>"
    response_failure: "A3h B1h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"
    params:
      - name: name
        type: string
        description: "Projector name (up to 16 bytes)"

  - id: pip_pbp_set
    label: PIP/Picture by Picture Set
    kind: action
    command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
    response_success: "23h B1h <ID1> <ID2> 03h C5h <DATA01> <DATA02> <CKS>"
    response_failure: "A3h B1h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"
    params:
      - name: target
        type: integer
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: value
        type: integer
        description: "MODE: 00h=PIP, 01h=PbP. POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT. Sub input values: model-dependent."

  - id: edge_blending_set
    label: Edge Blending Mode Set
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
    response_success: "23h B1h <ID1> <ID2> 03h DFh 00h <DATA01> <CKS>"
    response_failure: "A3h B1h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"
    params:
      - name: enabled
        type: integer
        description: "00h=OFF, 01h=ON"

  - id: audio_select_set
    label: Audio Select Set
    kind: action
    command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
    response_success: "23h C9h <ID1> <ID2> 03h 09h <DATA01> <DATA02> <CKS>"
    response_failure: "A3h C9h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"
    params:
      - name: input_terminal
        type: integer
        description: "Input terminal code (model-dependent)"
      - name: audio_source
        type: integer
        description: "00h=follows specified terminal, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks

```yaml
feedbacks:
  - id: error_status
    label: Error Status
    command: "00h 88h 00h 00h 00h 88h"
    response: "20h 88h <ID1> <ID2> 0Ch <DATA01>-<DATA12> <CKS>"
    type: bitmask
    description: "12 bytes of error flags. Bit=0 normal, Bit=1 error. Includes: cover error, fan error, temperature error, power error, lamp errors, formatter error, mirror cover error, interlock switch, system errors."

  - id: running_status
    label: Running Status
    command: "00h 85h 00h 00h 01h 01h 87h"
    response: "20h 85h <ID1> <ID2> 10h <DATA01>-<DATA16> <CKS>"
    type: composite
    fields:
      power_status:
        description: "DATA03: 00h=Standby, 01h=Power On, FFh=Not supported"
      cooling: 
        description: "DATA04: 00h=Not executing, 01h=During execution"
      power_process:
        description: "DATA05: 00h=Not executing, 01h=During execution"
      operation_status:
        description: "DATA06: 00h=Standby(Sleep), 04h=Power On, 05h=Cooling, 06h=Standby(error), 0Fh=Standby(Power saving), 10h=Network standby"

  - id: input_status
    label: Input Status
    command: "00h 85h 00h 00h 01h 02h 88h"
    response: "20h 85h <ID1> <ID2> 10h <DATA01>-<DATA16> <CKS>"
    type: composite
    fields:
      signal_switch_process:
        description: "DATA01: 00h=Not executing, 01h=During execution"
      signal_list_number:
        description: "DATA02: 00h-C7h = signal list number minus 1, FFh=Not supported"
      signal_type_1:
        description: "DATA03: 01h-05h"
      signal_type_2:
        description: "DATA04: 01h=COMPUTER, 02h=VIDEO, 03h=S-VIDEO, 04h=COMPONENT, 07h=VIEWER(1-5), 20h=DVI-D, 21h=HDMI, 22h=DisplayPort, 23h=VIEWER(6-10), FFh=Not Source Input"
      content_displayed:
        description: "DATA09: 00h=Video signal, 01h=No signal, 02h=Viewer, 03h=Test pattern, 04h=LAN"

  - id: mute_status
    label: Mute Status
    command: "00h 85h 00h 00h 01h 03h 89h"
    response: "20h 85h <ID1> <ID2> 10h <DATA01>-<DATA16> <CKS>"
    type: composite
    fields:
      picture_mute:
        description: "DATA01: 00h=Off, 01h=On, FFh=Not supported"
      sound_mute:
        description: "DATA02: 00h=Off, 01h=On, FFh=Not supported"
      onscreen_mute:
        description: "DATA03: 00h=Off, 01h=On, FFh=Not supported"
      forced_onscreen_mute:
        description: "DATA04: 00h=Off, 01h=On, FFh=Not supported"
      onscreen_display:
        description: "DATA05: 00h=Not displayed, 01h=Displayed"

  - id: model_name
    label: Model Name
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    response: "20h 85h <ID1> <ID2> 20h <DATA01>-<DATA32> <CKS>"
    type: string
    description: "Model name (NUL-terminated string, up to 32 bytes)"

  - id: cover_status
    label: Cover Status
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    response: "20h 85h <ID1> <ID2> 01h <DATA01> <CKS>"
    type: enum
    values:
      - "00h: Normal (cover opened)"
      - "01h: Cover closed"

  - id: projector_info
    label: Projector Information
    command: "03h 8Ah 00h 00h 00h 8Dh"
    response: "23h 8Ah <ID1> <ID2> 62h <DATA01>-<DATA98> <CKS>"
    type: composite
    fields:
      projector_name:
        description: "DATA01-49: Projector name (NUL-terminated)"
      lamp_usage_seconds:
        description: "DATA83-86: Lamp usage time in seconds (updated at 1-min intervals)"
      filter_usage_seconds:
        description: "DATA87-90: Filter usage time in seconds"

  - id: filter_usage_info
    label: Filter Usage Information
    command: "03h 95h 00h 00h 00h 98h"
    response: "23h 95h <ID1> <ID2> 08h <DATA01>-<DATA08> <CKS>"
    type: composite
    fields:
      filter_usage_seconds:
        description: "DATA01-04: Filter usage time in seconds"
      filter_alarm_seconds:
        description: "DATA05-08: Filter alarm start time in seconds (-1 if undefined)"

  - id: lamp_info
    label: Lamp Information
    command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    response: "23h 96h <ID1> <ID2> 06h <DATA01>-<DATA06> <CKS>"
    type: composite
    params:
      - name: lamp_target
        description: "00h=Lamp 1, 01h=Lamp 2"
      - name: content
        description: "01h=usage time (seconds), 04h=remaining life (%)"
    fields:
      lamp_usage_seconds:
        description: "DATA03-06 when content=01h"
      lamp_remaining_life_pct:
        description: "DATA03-06 when content=04h (negative if replacement deadline exceeded)"

  - id: carbon_savings
    label: Carbon Savings Information
    command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
    response: "23h 9Ah <ID1> <ID2> 09h <DATA01>-<DATA09> <CKS>"
    type: composite
    params:
      - name: target
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
    fields:
      savings_kg:
        description: "DATA02-05: Carbon Savings in kg (max 99999)"
      savings_mg:
        description: "DATA06-09: Carbon Savings in mg (max 999999)"

  - id: lens_position
    label: Lens Control Position
    command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
    response: "22h 1Ch <ID1> <ID2> 08h <DATA01> 00h <DATA02>-<DATA07> <CKS>"
    type: composite
    params:
      - name: target
        description: "00h=Zoom, 01h=Focus, 02h=Lens Shift H, 03h=Lens Shift V"
    fields:
      upper_limit:
        description: "DATA02-03: Upper limit of adjustment range"
      lower_limit:
        description: "DATA04-05: Lower limit of adjustment range"
      current_value:
        description: "DATA06-07: Current value"

  - id: lens_info
    label: Lens Information
    command: "02h 22h 00h 00h 01h 00h 25h"
    response: "22h 22h <ID1> <ID2> 02h 00h <DATA01> <CKS>"
    type: bitmask
    description: "DATA01 bits: Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift H, Bit4=Lens Shift V. 0=Stop, 1=During operation."

  - id: lens_memory_option
    label: Lens Memory Option
    command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
    response: "22h 20h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"
    type: composite
    params:
      - name: target
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    fields:
      setting:
        description: "DATA02: 00h=OFF, 01h=ON"

  - id: lens_profile
    label: Lens Profile
    command: "02h 28h 00h 00h 00h 2Ah"
    response: "22h 28h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"
    type: enum
    fields:
      profile:
        description: "DATA01: 00h=Profile 1, 01h=Profile 2"

  - id: gain_parameter
    label: Gain Parameter
    command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
    response: "23h 05h <ID1> <ID2> 10h <DATA01>-<DATA16> <CKS>"
    type: composite
    params:
      - name: target
        description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness, 05h=Volume, 96h=Lamp/Light Adjust"
    fields:
      status:
        description: "DATA01: 00h=Display not possible, 01h=Adjustment not possible, 02h=Adjustment possible, FFh=Gain does not exist"
      upper_limit:
        description: "DATA02-03"
      lower_limit:
        description: "DATA04-05"
      default_value:
        description: "DATA06-07"
      current_value:
        description: "DATA08-09"

  - id: setting_info
    label: Setting Information
    command: "00h 85h 00h 00h 01h 00h 86h"
    response: "20h 85h <ID1> <ID2> 20h <DATA01>-<DATA32> <CKS>"
    type: composite
    fields:
      base_model_type:
        description: "DATA01-03"
      sound_function:
        description: "DATA04: 00h=Not available, 01h=Available"
      profile_number:
        description: "DATA05: 00h=Not available, 01h=Clock, 02h=Sleep timer, 03h=Both"

  - id: eco_mode
    label: Eco Mode
    command: "03h B0h 00h 00h 01h 07h BBh"
    response: "23h B0h <ID1> <ID2> 02h 07h <DATA01> <CKS>"
    type: integer
    description: "Returns current eco mode value (model-dependent). May reflect Light mode or Lamp mode."

  - id: projector_name
    label: LAN Projector Name
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    response: "23h B0h <ID1> <ID2> 12h 2Ch <DATA01>-<DATA17> <CKS>"
    type: string
    description: "Projector name (NUL-terminated, up to 17 bytes)"

  - id: mac_address
    label: MAC Address
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    response: "23h B0h <ID1> <ID2> 08h 9Ah 00h <DATA01>-<DATA06> <CKS>"
    type: string
    description: "6-byte MAC address"

  - id: pip_pbp_status
    label: PIP/Picture by Picture Status
    command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
    response: "23h B0h <ID1> <ID2> 03h C5h <DATA01> <DATA02> <CKS>"
    type: composite
    params:
      - name: target
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

  - id: edge_blending_status
    label: Edge Blending Mode
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    response: "23h B0h <ID1> <ID2> 03h DFh 00h <DATA01> <CKS>"
    type: enum
    values:
      - "00h: OFF"
      - "01h: ON"

  - id: info_string
    label: Information String
    command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
    response: "20h D0h <ID1> <ID2> LEN <DATA01> 01h <DATA02>-<DATA?? <CKS>"
    type: string
    params:
      - name: info_type
        description: "03h=Horizontal sync frequency, 04h=Vertical sync frequency"

  - id: base_model_type
    label: Base Model Type
    command: "00h BFh 00h 00h 01h 00h C0h"
    response: "20h BFh <ID1> <ID2> 10h 00h <DATA01>-<DATA15> <CKS>"
    type: composite
    fields:
      base_model_type:
        description: "DATA01-02 and DATA12-13"
      model_name:
        description: "DATA03-11: Model name (NUL-terminated)"

  - id: serial_number
    label: Serial Number
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    response: "20h BFh <ID1> <ID2> 12h 01h 06h <DATA01>-<DATA16> <CKS>"
    type: string
    description: "Serial number (NUL-terminated, up to 16 bytes)"

  - id: basic_info
    label: Basic Information
    command: "00h BFh 00h 00h 01h 02h C2h"
    response: "20h BFh <ID1> <ID2> 10h 02h <DATA01>-<DATA15> <CKS>"
    type: composite
    fields:
      operation_status:
        description: "DATA01: 00h=Standby(Sleep), 04h=Power On, 05h=Cooling, 06h=Standby(error), 0Fh=Standby(Power saving), 10h=Network standby"
      content_displayed:
        description: "DATA02: 00h=Video signal, 01h=No signal, 02h=Viewer, 03h=Test pattern, 04h=LAN, 05h=Test pattern(user), 10h=Signal switching"
      signal_type_2:
        description: "DATA04: 01h=COMPUTER, 02h=VIDEO, 03h=S-VIDEO, 04h=COMPONENT, 07h=VIEWER(1-5), 20h=DVI-D, 21h=HDMI, 22h=DisplayPort"
      video_mute:
        description: "DATA06: 00h=Off, 01h=On"
      sound_mute:
        description: "DATA07: 00h=Off, 01h=On"
      onscreen_mute:
        description: "DATA08: 00h=Off, 01h=On"
      freeze:
        description: "DATA09: 00h=Off, 01h=On"
```

## Variables

```yaml
variables:
  - id: brightness
    label: Brightness
    type: integer
    read_command: gain_parameter (target=00h)
    write_command: picture_adjust (target=00h)

  - id: contrast
    label: Contrast
    type: integer
    read_command: gain_parameter (target=01h)
    write_command: picture_adjust (target=01h)

  - id: color
    label: Color
    type: integer
    read_command: gain_parameter (target=02h)
    write_command: picture_adjust (target=02h)

  - id: hue
    label: Hue
    type: integer
    read_command: gain_parameter (target=03h)
    write_command: picture_adjust (target=03h)

  - id: sharpness
    label: Sharpness
    type: integer
    read_command: gain_parameter (target=04h)
    write_command: picture_adjust (target=04h)

  - id: volume
    label: Volume
    type: integer
    read_command: gain_parameter (target=05h)
    write_command: volume_adjust

  - id: lamp_adjust
    label: Lamp/Light Adjust
    type: integer
    read_command: gain_parameter (target=96h)
    write_command: lamp_adjust
```

## Events

```yaml
# UNRESOLVED: no unsolicited event/notification protocol described in source.
# The protocol appears to be strictly request-response.
```

## Macros

```yaml
# UNRESOLVED: no multi-step macro sequences described in source.
```

## Safety

```yaml
confirmation_required_for: []
interlocks: []
notes: >
  Error status query (command 009) returns bitmask covering: cover error, fan error,
  temperature error (bi-metallic strip and sensor), power error, lamp off/replacement
  moratorium/usage exceeded/data error/not present, formatter error, FPGA error,
  mirror cover error, ballast communication error, iris calibration error, lens not
  installed properly, foreign matter sensor error, interlock switch open, system errors.
  The interlock switch status bit is readable but no automated interlock behavior is
  described in the command reference.
```

## Notes

- **Binary protocol**: All commands and responses are binary hex byte sequences, not ASCII text. Each frame includes a checksum byte (low-order byte of sum of all preceding bytes).
- **Model-dependent parameters**: Input terminal codes, aspect values, and eco mode values vary by model. The NP-UM301X is not explicitly listed in the supplementary lookup tables; these values must be confirmed from the device or a model-specific supplement.
- **Parameters ID1 and ID2**: Control ID and model code must be set correctly in commands. ID1 is the projector's configured control ID; ID2 varies by model.
- **Cooling lockout**: During power-on and power-off (including cooling), no other commands are accepted.
- **Standby mode**: Some models cannot receive LAN commands in standby mode. Standby mode command-reception capability is model-dependent.
- **Lens continuous drive**: When sending continuous drive commands (7Fh/81h), a subsequent stop command (00h) must be sent to halt motion.
- **Usage time resolution**: Lamp and filter usage times are stored in seconds but updated at 1-minute intervals.
<!-- UNRESOLVED: exact input terminal hex codes for NP-UM301X not found in supplementary tables -->
<!-- UNRESOLVED: exact eco mode value codes for NP-UM301X not found in supplementary tables -->
<!-- UNRESOLVED: exact aspect value codes for NP-UM301X not found in supplementary tables -->
<!-- UNRESOLVED: ID2 model code value for NP-UM301X not stated -->
<!-- UNRESOLVED: default baud rate not stated (multiple supported: 115200/38400/19200/9600/4800) -->
<!-- UNRESOLVED: pin 7 (RTS) and pin 8 (CTS) are cross-wired but no hardware flow control behavior described -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-05-14T18:17:18.753Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:18.753Z
matched_actions: 28
action_count: 28
confidence: high
summary: "All 53 spec actions match literal wire tokens in NEC UM301X serial source; transport parameters verified; no fabricated or drifted commands."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
