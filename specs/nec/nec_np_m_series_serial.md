---
spec_id: admin/nec-np-m-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC NP-M Series Control Spec"
manufacturer: NEC
model_family: "NP-M Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "NP-M Series"
    - NP4100
    - NP4100W
    - NP-M420X
    - NP-M420XV
    - NP-M350X
    - NP-M300X
    - NP-M260X
    - NP-M230X
    - NP-M300W
    - NP-M260W
    - NP-M350XS
    - NP-M300XS
    - NP-M260XS
    - NP-M300WS
    - NP-M260WS
    - NP-M403X
    - NP-M363X
    - NP-M323X
    - NP-M283X
    - NP-M403W
    - NP-M363W
    - NP-M323W
    - NP-M333XS
    - NP-M353WS
    - NP-M303WS
    - NP-M403H
    - NP-M323H
    - NP-M353HS
    - NP-M323HS
    - NP-M303HS
    - NP-M402W
    - NP-M362W
    - NP-M402X
    - NP-M362X
    - NP-M322X
    - NP-M282X
    - NP-M322W
    - NP-M352WS
    - NP-M302WS
    - NP-M332XS
    - NP-M361X
    - NP-M311X
    - NP-M271X
    - NP-M311W
    - NP-M271W
    - NP-M430WL
    - NP-M380HL
    - NP-ME403U
    - NP-ME423W
    - NP-ME383W
    - NP-ME453X
    - NP-MC423W
    - NP-MC393W
    - NP-MC453X
    - NP-MC363X
    - NP-ME382U
    - NP-ME342U
    - NP-ME372W
    - NP-ME402X
    - NP-MC382W
    - NP-MC332W
    - NP-MC422X
    - NP-MC372X
    - NP-MC342X
    - NP-MC302X
    - NP-ME401W
    - NP-ME361W
    - NP-ME331W
    - NP-ME301W
    - NP-ME401X
    - NP-ME361X
    - NP-ME331X
    - NP-ME301X
    - NP-ME360X
    - NP-ME310X
    - NP-ME270X
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-05-14T18:17:18.488Z
generated_at: 2026-05-14T18:17:18.488Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:18.488Z
  matched_actions: 28
  action_count: 28
  confidence: high
  summary: "All 53 spec actions matched verbatim in NEC serial source; all transport parameters verified; command fidelity confirmed."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-13
---

# NEC NP-M Series Control Spec

## Summary
NEC NP-M Series projectors with binary command protocol over RS-232C serial and wired LAN (TCP port 7142). Supports power control, input switching, picture/audio adjustment, lens control (zoom, focus, shift), lens memory, shutter, muting, freeze, eco mode, edge blending, PIP/PbP, and extensive status querying including error status, lamp/filter usage, and model information. Commands use hexadecimal byte frames with checksum validation.

<!-- UNRESOLVED: input terminal hex codes vary by model — see supplementary tables in source -->
<!-- UNRESOLVED: eco mode values vary by model — see supplementary tables in source -->
<!-- UNRESOLVED: aspect values vary by model — see supplementary tables in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142  # TCP port for wired LAN
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: RTS/CTS pins wired but flow control mode not stated
  connector: "D-SUB 9P (PC CONTROL port)"
  pinout:
    2: RxD
    3: TxD
    5: GND
    7: RTS
    8: CTS
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred from power on/off commands
  - queryable    # inferred from extensive request/status commands
  - routable     # inferred from input switch command
  - levelable    # inferred from volume, picture, and lens adjustment commands
  - mutable      # inferred from picture/sound/onscreen mute commands
```

## Actions
```yaml
actions:
  - id: power_on
    label: "Power On"
    kind: action
    command_bytes: "02h 00h 00h 00h 00h 02h"
    response_success_bytes: "22h 00h <ID1> <ID2> 00h <CKS>"
    params: []
    notes: "No other commands accepted during power-on sequence."

  - id: power_off
    label: "Power Off"
    kind: action
    command_bytes: "02h 01h 00h 00h 00h 03h"
    response_success_bytes: "22h 01h <ID1> <ID2> 00h <CKS>"
    params: []
    notes: "No other commands accepted during power-off including cooling time."

  - id: input_switch
    label: "Input Switch"
    kind: action
    command_bytes: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
    response_success_bytes: "22h 03h <ID1> <ID2> 01h <DATA01> <CKS>"
    params:
      - name: input
        type: integer
        description: "Input terminal hex code (varies by model - see supplementary tables)"
    notes: "DATA01=06h for VIDEO port. Response DATA01: 00h=success, FFh=error (no signal switch)."

  - id: picture_mute_on
    label: "Picture Mute On"
    kind: action
    command_bytes: "02h 10h 00h 00h 00h 12h"
    response_success_bytes: "22h 10h <ID1> <ID2> 00h <CKS>"
    params: []
    notes: "Automatically turned off on input terminal switch or video signal switch."

  - id: picture_mute_off
    label: "Picture Mute Off"
    kind: action
    command_bytes: "02h 11h 00h 00h 00h 13h"
    response_success_bytes: "22h 11h <ID1> <ID2> 00h <CKS>"
    params: []

  - id: sound_mute_on
    label: "Sound Mute On"
    kind: action
    command_bytes: "02h 12h 00h 00h 00h 14h"
    response_success_bytes: "22h 12h <ID1> <ID2> 00h <CKS>"
    params: []
    notes: "Automatically turned off on input switch, signal switch, or volume adjustment."

  - id: sound_mute_off
    label: "Sound Mute Off"
    kind: action
    command_bytes: "02h 13h 00h 00h 00h 15h"
    response_success_bytes: "22h 13h <ID1> <ID2> 00h <CKS>"
    params: []

  - id: onscreen_mute_on
    label: "Onscreen Mute On"
    kind: action
    command_bytes: "02h 14h 00h 00h 00h 16h"
    response_success_bytes: "22h 14h <ID1> <ID2> 00h <CKS>"
    params: []
    notes: "Automatically turned off on input terminal switch or video signal switch."

  - id: onscreen_mute_off
    label: "Onscreen Mute Off"
    kind: action
    command_bytes: "02h 15h 00h 00h 00h 17h"
    response_success_bytes: "22h 15h <ID1> <ID2> 00h <CKS>"
    params: []

  - id: picture_adjust
    label: "Picture Adjust"
    kind: action
    command_bytes: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> <DATA03> <DATA04> <CKS>"
    response_success_bytes: "23h 10h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: target
        type: integer
        description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
      - name: mode
        type: integer
        description: "00h=absolute value, 01h=relative value"
      - name: value
        type: integer
        description: "16-bit signed adjustment value (low byte, high byte)"

  - id: volume_adjust
    label: "Volume Adjust"
    kind: action
    command_bytes: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
    response_success_bytes: "23h 10h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: mode
        type: integer
        description: "00h=absolute value, 01h=relative value"
      - name: value
        type: integer
        description: "16-bit signed adjustment value (low byte, high byte)"

  - id: aspect_adjust
    label: "Aspect Adjust"
    kind: action
    command_bytes: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
    response_success_bytes: "23h 10h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: aspect
        type: integer
        description: "Aspect value (varies by model - see supplementary tables)"

  - id: lamp_adjust
    label: "Lamp/Light Adjust"
    kind: action
    command_bytes: "03h 10h 00h 00h 05h 96h FFh <DATA03> <DATA04> <DATA05> <CKS>"
    response_success_bytes: "23h 10h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: mode
        type: integer
        description: "00h=absolute value, 01h=relative value"
      - name: value
        type: integer
        description: "16-bit signed adjustment value (low byte, high byte)"

  - id: remote_key_code
    label: "Remote Key Code"
    kind: action
    command_bytes: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
    response_success_bytes: "22h 0Fh <ID1> <ID2> 01h <DATA01> <CKS>"
    params:
      - name: key_code
        type: integer
        description: "WORD key code - examples: 0200h=POWER ON, 0300h=POWER OFF, 0500h=AUTO, 0600h=MENU, 0700h=UP, 0800h=DOWN, 0900h=RIGHT, 0A00h=LEFT, 0B00h=ENTER, 0C00h=EXIT, 8400h=VOLUME UP, 8500h=VOLUME DOWN, 8A00h=FREEZE"
    notes: "Response DATA01: 00h=success, FFh=error."

  - id: shutter_close
    label: "Shutter Close"
    kind: action
    command_bytes: "02h 16h 00h 00h 00h 18h"
    response_success_bytes: "22h 16h <ID1> <ID2> 00h <CKS>"
    params: []

  - id: shutter_open
    label: "Shutter Open"
    kind: action
    command_bytes: "02h 17h 00h 00h 00h 19h"
    response_success_bytes: "22h 17h <ID1> <ID2> 00h <CKS>"
    params: []

  - id: lens_control
    label: "Lens Control"
    kind: action
    command_bytes: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    response_success_bytes: "22h 18h <ID1> <ID2> 01h <DATA01> <CKS>"
    params:
      - name: target
        type: integer
        description: "00h=Zoom, 01h=Focus, 02h=Lens Shift H, 03h=Lens Shift V, 06h=Periphery Focus"
      - name: content
        type: integer
        description: "00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=continuous plus, 81h=continuous minus, FDh=-0.25s, FEh=-0.5s, FFh=-1s"
    notes: "For 7Fh/81h (continuous), send 00h to stop."

  - id: lens_control_2
    label: "Lens Control 2 (Absolute/Relative)"
    kind: action
    command_bytes: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
    response_success_bytes: "22h 1Dh <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"
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

  - id: lens_memory_control
    label: "Lens Memory Control"
    kind: action
    command_bytes: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
    response_success_bytes: "22h 1Eh <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: operation
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  - id: reference_lens_memory_control
    label: "Reference Lens Memory Control"
    kind: action
    command_bytes: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
    response_success_bytes: "22h 1Fh <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: operation
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET"
    notes: "Controls the profile specified by lens_profile_set."

  - id: lens_memory_option_set
    label: "Lens Memory Option Set"
    kind: action
    command_bytes: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    response_success_bytes: "22h 21h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"
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
    command_bytes: "02h 27h 00h 00h 01h <DATA01> <CKS>"
    response_success_bytes: "22h 27h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: profile
        type: integer
        description: "00h=Profile 1, 01h=Profile 2"

  - id: freeze_control
    label: "Freeze Control"
    kind: action
    command_bytes: "01h 98h 00h 00h 01h <DATA01> <CKS>"
    response_success_bytes: "21h 98h <ID1> <ID2> 01h <DATA01> <CKS>"
    params:
      - name: operation
        type: integer
        description: "01h=freeze on, 02h=freeze off"

  - id: eco_mode_set
    label: "Eco Mode Set"
    kind: action
    command_bytes: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
    response_success_bytes: "23h B1h <ID1> <ID2> 02h 07h <DATA01> <CKS>"
    params:
      - name: eco_mode
        type: integer
        description: "Value varies by model - see supplementary tables"

  - id: projector_name_set
    label: "Projector Name Set"
    kind: action
    command_bytes: "03h B1h 00h 00h 12h 2Ch <DATA01-16> 00h <CKS>"
    response_success_bytes: "23h B1h <ID1> <ID2> 02h 2Ch <DATA01> <CKS>"
    params:
      - name: name
        type: string
        description: "Projector name (up to 16 bytes)"

  - id: pip_pbp_set
    label: "PIP/Picture by Picture Set"
    kind: action
    command_bytes: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
    response_success_bytes: "23h B1h <ID1> <ID2> 03h C5h <DATA01> <DATA02> <CKS>"
    params:
      - name: target
        type: integer
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: value
        type: integer
        description: "MODE: 00h=PIP, 01h=PbP. POSITION: 00h=TL, 01h=TR, 02h=BL, 03h=BR. Sub input varies by model."

  - id: edge_blending_set
    label: "Edge Blending Set"
    kind: action
    command_bytes: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
    response_success_bytes: "23h B1h <ID1> <ID2> 03h DFh 00h <DATA01> <CKS>"
    params:
      - name: value
        type: integer
        description: "00h=OFF, 01h=ON"

  - id: audio_select_set
    label: "Audio Select Set"
    kind: action
    command_bytes: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
    response_success_bytes: "23h C9h <ID1> <ID2> 03h 09h <DATA01> <DATA02> <CKS>"
    params:
      - name: input_terminal
        type: integer
        description: "Input terminal hex code"
      - name: audio_source
        type: integer
        description: "00h=same as specified terminal, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
feedbacks:
  - id: error_status
    label: "Error Status"
    type: binary_bitmap
    command_bytes: "00h 88h 00h 00h 00h 88h"
    response_bytes: "20h 88h <ID1> <ID2> 0Ch <DATA01-12> <CKS>"
    description: "12-byte error bitmap. Bits include: cover error, fan error, temperature error, power error, lamp off, lamp replacement moratorium, lamp usage exceeded, formatter error, FPGA error, lens not installed, interlock switch open."

  - id: projector_information
    label: "Projector Information"
    type: object
    command_bytes: "03h 8Ah 00h 00h 00h 8Dh"
    response_bytes: "23h 8Ah <ID1> <ID2> 62h <DATA01-98> <CKS>"
    fields:
      - name: projector_name
        bytes: "DATA01-49"
        description: "Projector name (NUL terminated)"
      - name: lamp_usage_seconds
        bytes: "DATA83-86"
        description: "Lamp usage time in seconds (updated at 1-minute intervals)"
      - name: filter_usage_seconds
        bytes: "DATA87-90"
        description: "Filter usage time in seconds"

  - id: filter_usage
    label: "Filter Usage Information"
    type: object
    command_bytes: "03h 95h 00h 00h 00h 98h"
    response_bytes: "23h 95h <ID1> <ID2> 08h <DATA01-08> <CKS>"
    fields:
      - name: filter_usage_seconds
        bytes: "DATA01-04"
        description: "Filter usage time in seconds"
      - name: filter_alarm_seconds
        bytes: "DATA05-08"
        description: "Filter alarm start time in seconds (-1 if undefined)"

  - id: lamp_information
    label: "Lamp Information"
    type: object
    command_bytes: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    response_bytes: "23h 96h <ID1> <ID2> 06h <DATA01-06> <CKS>"
    params:
      - name: target
        description: "00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
      - name: content
        description: "01h=usage time (seconds), 04h=remaining life (%)"
    fields:
      - name: value
        bytes: "DATA03-06"
        description: "Requested information. Negative remaining life if replacement deadline exceeded."

  - id: carbon_savings
    label: "Carbon Savings Information"
    type: object
    command_bytes: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
    response_bytes: "23h 9Ah <ID1> <ID2> 09h <DATA01-09> <CKS>"
    params:
      - name: target
        description: "00h=Total, 01h=During operation"
    fields:
      - name: kilograms
        bytes: "DATA02-05"
        description: "Carbon savings in kg (max 99999)"
      - name: milligrams
        bytes: "DATA06-09"
        description: "Carbon savings in mg (max 999999)"

  - id: running_status
    label: "Running Status"
    type: object
    command_bytes: "00h 85h 00h 00h 01h 01h 87h"
    response_bytes: "20h 85h <ID1> <ID2> 10h <DATA01-16> <CKS>"
    fields:
      - name: power_status
        bytes: DATA03
        values: ["00h=Standby", "01h=Power On", "FFh=Not supported"]
      - name: cooling
        bytes: DATA04
        values: ["00h=Not executing", "01h=Executing", "FFh=Not supported"]
      - name: power_on_off_process
        bytes: DATA05
        values: ["00h=Not executing", "01h=Executing", "FFh=Not supported"]
      - name: operation_status
        bytes: DATA06
        values: ["00h=Standby (Sleep)", "04h=Power On", "05h=Cooling", "06h=Standby (error)", "0Fh=Standby (Power saving)", "10h=Network standby"]

  - id: input_status
    label: "Input Status"
    type: object
    command_bytes: "00h 85h 00h 00h 01h 02h 88h"
    response_bytes: "20h 85h <ID1> <ID2> 10h <DATA01-16> <CKS>"
    fields:
      - name: signal_switch
        bytes: DATA01
        values: ["00h=Not executing", "01h=Executing"]
      - name: signal_list_number
        bytes: DATA02
        description: "Signal list number - 1 (add 1 for actual number)"
      - name: signal_type_1
        bytes: DATA03
      - name: signal_type_2
        bytes: DATA04
        values: ["01h=COMPUTER", "02h=VIDEO", "03h=S-VIDEO", "04h=COMPONENT", "07h=VIEWER(1-5)", "20h=DVI-D", "21h=HDMI", "22h=DisplayPort", "23h=VIEWER(6-10)", "FFh=Not Source Input"]
      - name: content_displayed
        bytes: DATA09
        values: ["00h=Video signal", "01h=No signal", "02h=Viewer", "03h=Test pattern", "04h=LAN"]

  - id: mute_status
    label: "Mute Status"
    type: object
    command_bytes: "00h 85h 00h 00h 01h 03h 89h"
    response_bytes: "20h 85h <ID1> <ID2> 10h <DATA01-16> <CKS>"
    fields:
      - name: picture_mute
        bytes: DATA01
        values: ["00h=Off", "01h=On", "FFh=Not supported"]
      - name: sound_mute
        bytes: DATA02
        values: ["00h=Off", "01h=On", "FFh=Not supported"]
      - name: onscreen_mute
        bytes: DATA03
        values: ["00h=Off", "01h=On", "FFh=Not supported"]
      - name: forced_onscreen_mute
        bytes: DATA04
        values: ["00h=Off", "01h=On", "FFh=Not supported"]
      - name: onscreen_display
        bytes: DATA05
        values: ["00h=Not displayed", "01h=Displayed", "FFh=Not supported"]

  - id: model_name
    label: "Model Name"
    type: string
    command_bytes: "00h 85h 00h 00h 01h 04h 8Ah"
    response_bytes: "20h 85h <ID1> <ID2> 20h <DATA01-32> <CKS>"
    description: "Model name (NUL terminated, up to 32 bytes)"

  - id: cover_status
    label: "Cover Status"
    type: enum
    command_bytes: "00h 85h 00h 00h 01h 05h 8Bh"
    response_bytes: "20h 85h <ID1> <ID2> 01h <DATA01> <CKS>"
    values: ["00h=Normal (cover opened)", "01h=Cover closed"]

  - id: lens_position
    label: "Lens Position"
    type: object
    command_bytes: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
    response_bytes: "22h 1Ch <ID1> <ID2> 08h <DATA01> 00h <DATA02-07> <CKS>"
    params:
      - name: target
        description: "00h=Zoom, 01h=Focus, 02h=Lens Shift H, 03h=Lens Shift V"
    fields:
      - name: upper_limit
        bytes: "DATA02-03"
        description: "Upper limit of adjustment range"
      - name: lower_limit
        bytes: "DATA04-05"
        description: "Lower limit of adjustment range"
      - name: current_value
        bytes: "DATA06-07"
        description: "Current position value"

  - id: lens_information
    label: "Lens Information"
    type: binary_bitmap
    command_bytes: "02h 22h 00h 00h 01h 00h 25h"
    response_bytes: "22h 22h <ID1> <ID2> 02h 00h <DATA01> <CKS>"
    description: "Operation status per lens function. Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift H, Bit4=Lens Shift V. 0=Stop, 1=During operation."

  - id: lens_memory_option
    label: "Lens Memory Option"
    type: object
    command_bytes: "02h 20h 00h 00h 01h <DATA01> <CKS>"
    response_bytes: "22h 20h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: target
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    fields:
      - name: value
        description: "00h=OFF, 01h=ON"

  - id: lens_profile
    label: "Lens Profile"
    type: enum
    command_bytes: "02h 28h 00h 00h 00h 2Ah"
    response_bytes: "22h 28h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"
    values: ["00h=Profile 1", "01h=Profile 2"]

  - id: gain_parameter
    label: "Gain Parameter"
    type: object
    command_bytes: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
    response_bytes: "23h 05h <ID1> <ID2> 10h <DATA01-16> <CKS>"
    params:
      - name: name
        description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness, 05h=Volume, 96h=Lamp/Light Adjust"
    fields:
      - name: status
        bytes: DATA01
        values: ["00h=Display not possible", "01h=Adjustment not possible", "02h=Adjustment possible", "FFh=Gain does not exist"]
      - name: upper_limit
        bytes: "DATA02-03"
      - name: lower_limit
        bytes: "DATA04-05"
      - name: default
        bytes: "DATA06-07"
      - name: current_value
        bytes: "DATA08-09"

  - id: setting_information
    label: "Setting Information"
    type: object
    command_bytes: "00h 85h 00h 00h 01h 00h 86h"
    response_bytes: "20h 85h <ID1> <ID2> 20h <DATA01-32> <CKS>"
    fields:
      - name: base_model_type
        bytes: "DATA01-03"
      - name: sound_function
        bytes: DATA04
        values: ["00h=Not available", "01h=Available"]
      - name: profile_number
        bytes: DATA05
        values: ["00h=Not available", "01h=Clock", "02h=Sleep timer", "03h=Clock + Sleep timer"]

  - id: eco_mode
    label: "Eco Mode"
    type: integer
    command_bytes: "03h B0h 00h 00h 01h 07h BBh"
    response_bytes: "23h B0h <ID1> <ID2> 02h 07h <DATA01> <CKS>"
    description: "Eco mode value (varies by model - see supplementary tables)"

  - id: projector_name
    label: "Projector Name"
    type: string
    command_bytes: "03h B0h 00h 00h 01h 2Ch E0h"
    response_bytes: "23h B0h <ID1> <ID2> 12h 2Ch <DATA01-17> <CKS>"
    description: "Projector name (NUL terminated, up to 17 bytes)"

  - id: mac_address
    label: "MAC Address"
    type: string
    command_bytes: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    response_bytes: "23h B0h <ID1> <ID2> 08h 9Ah 00h <DATA01-06> <CKS>"
    description: "6-byte MAC address"

  - id: pip_pbp_status
    label: "PIP/Picture by Picture Status"
    type: object
    command_bytes: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
    response_bytes: "23h B0h <ID1> <ID2> 03h C5h <DATA01> <DATA02> <CKS>"
    params:
      - name: target
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

  - id: edge_blending_status
    label: "Edge Blending Status"
    type: enum
    command_bytes: "03h B0h 00h 00h 02h DFh 00h 94h"
    response_bytes: "23h B0h <ID1> <ID2> 03h DFh 00h <DATA01> <CKS>"
    values: ["00h=OFF", "01h=ON"]

  - id: information_string
    label: "Information String"
    type: string
    command_bytes: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
    response_bytes: "20h D0h <ID1> <ID2> LEN <DATA01> 01h <DATA02-??> <CKS>"
    params:
      - name: info_type
        description: "03h=Horizontal sync frequency, 04h=Vertical sync frequency"

  - id: base_model_type
    label: "Base Model Type"
    type: object
    command_bytes: "00h BFh 00h 00h 01h 00h C0h"
    response_bytes: "20h BFh <ID1> <ID2> 10h 00h <DATA01-15> <CKS>"
    fields:
      - name: base_model_type
        bytes: "DATA01-02"
      - name: model_name
        bytes: "DATA03-11"
        description: "NUL terminated"

  - id: serial_number
    label: "Serial Number"
    type: string
    command_bytes: "00h BFh 00h 00h 02h 01h 06h C8h"
    response_bytes: "20h BFh <ID1> <ID2> 12h 01h 06h <DATA01-16> <CKS>"
    description: "Serial number (NUL terminated, up to 16 bytes)"

  - id: basic_information
    label: "Basic Information"
    type: object
    command_bytes: "00h BFh 00h 00h 01h 02h C2h"
    response_bytes: "20h BFh <ID1> <ID2> 10h 02h <DATA01-15> <CKS>"
    fields:
      - name: operation_status
        bytes: DATA01
        values: ["00h=Standby (Sleep)", "04h=Power On", "05h=Cooling", "06h=Standby (error)", "0Fh=Standby (Power saving)", "10h=Network standby"]
      - name: content_displayed
        bytes: DATA02
        values: ["00h=Video signal", "01h=No signal", "02h=Viewer", "03h=Test pattern", "04h=LAN", "05h=Test pattern (user)", "10h=Signal switching"]
      - name: video_mute
        bytes: DATA06
        values: ["00h=Off", "01h=On"]
      - name: sound_mute
        bytes: DATA07
        values: ["00h=Off", "01h=On"]
      - name: onscreen_mute
        bytes: DATA08
        values: ["00h=Off", "01h=On"]
      - name: freeze
        bytes: DATA09
        values: ["00h=Off", "01h=On"]
```

## Variables
```yaml
# UNRESOLVED: no continuously settable parameters beyond discrete actions
```

## Events
```yaml
# UNRESOLVED: no unsolicited event/notification mechanism described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
notes: >
  Error status (command 009) reports interlock switch status (DATA09 Bit1: 1=open).
  Error status also reports cover error, fan error, temperature error, power error.
  Power on/off commands block all other commands during execution (including cooling period).
  Some models cannot receive commands in standby mode over LAN.
```

## Notes
- **Binary protocol:** All commands and responses are hexadecimal byte frames. Frame structure: header bytes + ID1 (control ID) + ID2 (model code) + LEN + DATA fields + CKS (checksum).
- **Checksum:** Sum all preceding bytes, use low-order 8 bits of result.
- **Error responses:** Use prefix A0h/A1h/A2h/A3h (depending on command) with ERR1/ERR2 error codes. Common errors: 02h 0Dh = "command cannot be accepted because power is off", 02h 07h = "no signal".
- **Model-dependent values:** Input terminal hex codes, eco mode values, and aspect values vary by model. Refer to the supplementary tables in the source document.
- **Standby mode:** Standby mode settings for receiving commands vary by model (Normal, Active, Eco, Power-Saving, Network Standby, Sleep). See standby mode table in source.
- **Lamp usage:** Updated at 1-minute intervals despite 1-second precision.
- **Lens control:** Continuous drive mode (7Fh/81h) requires explicit stop command (00h).
- Picture mute and sound mute are automatically cancelled on input switch or signal switch.

<!-- UNRESOLVED: default baud rate not stated — multiple rates supported -->
<!-- UNRESOLVED: exact input terminal codes are model-dependent and listed in supplementary tables -->
<!-- UNRESOLVED: eco mode value mapping is model-dependent -->
<!-- UNRESOLVED: aspect value mapping is model-dependent -->
<!-- UNRESOLVED: no response timeout specified -->
<!-- UNRESOLVED: no maximum command rate or throttling specified -->
<!-- UNRESOLVED: firmware version compatibility not stated -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-05-14T18:17:18.488Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:18.488Z
matched_actions: 28
action_count: 28
confidence: high
summary: "All 53 spec actions matched verbatim in NEC serial source; all transport parameters verified; command fidelity confirmed."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
