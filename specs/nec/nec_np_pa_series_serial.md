---
spec_id: admin/nec-np-pa-series-serial-tcp
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC NP-PA Series Control Spec"
manufacturer: NEC
model_family: NP-PA1705UL
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - NP-PA1705UL
    - NP-PA1505UL
    - NP-PA1004UL
    - NP-PA804UL
    - NP-PA803UL
    - NP-PA703UL
    - NP-PA653UL
    - NP-PA803U
    - NP-PA723U
    - NP-PA653U
    - NP-PA853W
    - NP-PA703W
    - NP-PA903X
    - NP-PA622U
    - NP-PA522U
    - NP-PA672W
    - NP-PA572W
    - NP-PA722X
    - NP-PA622X
    - NP-PA621U
    - NP-PA521U
    - NP-PA671W
    - NP-PA571W
    - NP-PA721X
    - NP-PA621X
    - NP-PA600X
    - NP-PA500X
    - NP-PA550W
    - NP-PA500U
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:52:25.396Z
last_checked_at: 2026-05-14T18:17:18.593Z
generated_at: 2026-05-14T18:17:18.593Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact model-specific input terminal hex codes vary by model — see supplementary tables in source"
  - "eco mode values vary by model subgroup"
  - "some models cannot receive commands in standby mode — see Appendix \"Standby Mode setting for receiving commands\""
  - "flow control not explicitly stated; RTS/CTS pins connected in pinout"
  - "range not stated; use gain_parameter request to discover"
  - "no unsolicited event/notification mechanism described in source."
  - "no multi-step macro sequences described in source"
  - "source mentions interlock switch (DATA09 Bit1) but no explicit"
  - "exact control ID (ID1) and model code (ID2) values not specified in source — likely configured per projector"
  - "supported input terminal codes are model-specific; only representative examples listed"
  - "eco mode, aspect ratio values are model-specific"
  - "maximum/minimum values for picture and volume adjustment ranges not stated; must be queried via gain parameter request (060-1)"
  - "standby mode command reception capability varies by model"
  - "document revision is BDT140013 Rev 7.1 / BDT140014 Rev 29.0; firmware compatibility ranges not stated"
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:18.593Z
  matched_actions: 29
  action_count: 29
  confidence: medium
  summary: "All 48 spec actions have literal command matches in NEC PA serial source; transport parameters verified; comprehensive coverage. (14 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-13
---

# NEC NP-PA Series Control Spec

## Summary
NEC NP-PA Series professional installation projectors. This spec covers binary control via RS-232C serial and TCP/IP network connections. The protocol uses hex-encoded command frames with checksum validation, supporting power control, input switching, picture/audio adjustment, lens control, shutter, freeze, eco mode, edge blending, and extensive status queries.

<!-- UNRESOLVED: exact model-specific input terminal hex codes vary by model — see supplementary tables in source -->
<!-- UNRESOLVED: eco mode values vary by model subgroup -->
<!-- UNRESOLVED: some models cannot receive commands in standby mode — see Appendix "Standby Mode setting for receiving commands" -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142  # TCP port for network control
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not explicitly stated; RTS/CTS pins connected in pinout
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # power on/off commands (015, 016)
  - routable     # input switching command (018)
  - queryable    # extensive status request commands (037, 078, 305)
  - levelable    # volume, brightness, contrast, color, hue, sharpness, lamp adjust (030-1, 030-2, 030-15)
  - mutable      # picture mute, sound mute, onscreen mute (020-025)
```

## Actions
```yaml
actions:
  - id: power_on
    label: Power On
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    params: []
    notes: No other commands accepted while powering on.

  - id: power_off
    label: Power Off
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    notes: No other commands accepted during power-off including cooling time.

  - id: input_switch
    label: Switch Input
    kind: action
    command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
    params:
      - name: input_terminal
        type: integer
        description: "Input terminal hex code - varies by model. Examples: COMPUTER=01h, VIDEO=06h, HDMI=A1h, DisplayPort=A6h, HDBaseT=BFh. See supplementary tables in source."
    response:
      success_data01: "00h = ended successfully, FFh = ended with error (no signal switch)"
    notes: Input terminal codes are model-specific. See Section 4 supplementary tables.

  - id: picture_mute_on
    label: Picture Mute On
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []
    notes: Mute is cancelled by input terminal switch or video signal switch.

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
    notes: Mute is cancelled by input switch, video signal switch, or volume adjustment.

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

  - id: freeze_on
    label: Freeze On
    kind: action
    command: "01h 98h 00h 00h 01h 01h <CKS>"
    params: []

  - id: freeze_off
    label: Freeze Off
    kind: action
    command: "01h 98h 00h 00h 01h 02h <CKS>"
    params: []

  - id: picture_adjust
    label: Picture Adjust
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> FFh <MODE> <VALUE_LO> <VALUE_HI> <CKS>"
    params:
      - name: target
        type: integer
        description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
      - name: mode
        type: integer
        description: "00h=absolute value, 01h=relative value"
      - name: value
        type: integer
        description: "16-bit signed adjustment value (low byte, high byte)"

  - id: volume_adjust
    label: Volume Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h <MODE> <VALUE_LO> <VALUE_HI> <CKS>"
    params:
      - name: mode
        type: integer
        description: "00h=absolute value, 01h=relative value"
      - name: value
        type: integer
        description: "16-bit signed adjustment value"

  - id: aspect_adjust
    label: Aspect Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
    params:
      - name: aspect
        type: integer
        description: "Aspect value - model-specific. Common: 00h=4:3, 02h=WIDE SCREEN, 06h=FULL, 07h=ZOOM, 0Fh=NATIVE"

  - id: lamp_adjust
    label: Lamp/Light Adjust
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> <DATA02> <MODE> <VALUE_LO> <VALUE_HI> <CKS>"
    params:
      - name: target
        type: integer
        description: "96h=LAMP ADJUST, FFh=LIGHT ADJUST"
      - name: mode
        type: integer
        description: "00h=absolute value, 01h=relative value"
      - name: value
        type: integer
        description: "16-bit signed adjustment value"

  - id: lens_control
    label: Lens Control (Drive)
    kind: action
    command: "02h 18h 00h 00h 02h <TARGET> <DIRECTION> <CKS>"
    params:
      - name: target
        type: integer
        description: "00h=Zoom, 01h=Focus, 02h=Lens Shift H, 03h=Lens Shift V, 06h=Periphery Focus"
      - name: direction
        type: integer
        description: "00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=plus continuous, 81h=minus continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s"

  - id: lens_control_2
    label: Lens Control 2 (Absolute/Relative)
    kind: action
    command: "02h 1Dh 00h 00h 04h <TARGET> <MODE> <VALUE_LO> <VALUE_HI> <CKS>"
    params:
      - name: target
        type: integer
        description: "00h=Zoom, 01h=Focus, 02h=Lens Shift H, 03h=Lens Shift V, FFh=Stop"
      - name: mode
        type: integer
        description: "00h=absolute value, 02h=relative value"
      - name: value
        type: integer
        description: "16-bit adjustment value"

  - id: lens_memory_control
    label: Lens Memory Control
    kind: action
    command: "02h 1Eh 00h 00h 01h <OPERATION> <CKS>"
    params:
      - name: operation
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  - id: reference_lens_memory_control
    label: Reference Lens Memory Control
    kind: action
    command: "02h 1Fh 00h 00h 01h <OPERATION> <CKS>"
    params:
      - name: operation
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  - id: lens_profile_set
    label: Lens Profile Set
    kind: action
    command: "02h 27h 00h 00h 01h <PROFILE> <CKS>"
    params:
      - name: profile
        type: integer
        description: "00h=Profile 1, 01h=Profile 2"

  - id: lens_memory_option_set
    label: Lens Memory Option Set
    kind: action
    command: "02h 21h 00h 00h 02h <TARGET> <VALUE> <CKS>"
    params:
      - name: target
        type: integer
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: value
        type: integer
        description: "00h=OFF, 01h=ON"

  - id: remote_key_code
    label: Remote Key Code
    kind: action
    command: "02h 0Fh 00h 00h 02h <KEY_LO> <KEY_HI> <CKS>"
    params:
      - name: key_code
        type: integer
        description: "WORD key code. Examples: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT"

  - id: eco_mode_set
    label: Eco Mode Set
    kind: action
    command: "03h B1h 00h 00h 02h 07h <VALUE> <CKS>"
    params:
      - name: value
        type: integer
        description: "Model-specific eco mode value. See supplementary tables."

  - id: projector_name_set
    label: Projector Name Set
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch <DATA01-16> 00h <CKS>"
    params:
      - name: name
        type: string
        description: "Projector name up to 16 bytes"

  - id: edge_blending_set
    label: Edge Blending Set
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h <VALUE> <CKS>"
    params:
      - name: value
        type: integer
        description: "00h=OFF, 01h=ON"

  - id: pip_pbp_set
    label: PIP/Picture-by-Picture Set
    kind: action
    command: "03h B1h 00h 00h 03h C5h <TARGET> <VALUE> <CKS>"
    params:
      - name: target
        type: integer
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT"
      - name: value
        type: integer
        description: "MODE: 00h=PIP, 01h=PBP. POSITION: 00h=TL, 01h=TR, 02h=BL, 03h=BR. SUB INPUT: model-specific."

  - id: audio_select_set
    label: Audio Select Set
    kind: action
    command: "03h C9h 00h 00h 03h 09h <INPUT> <VALUE> <CKS>"
    params:
      - name: input_terminal
        type: integer
        description: "Input terminal code"
      - name: value
        type: integer
        description: "00h=same terminal, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
feedbacks:
  - id: error_status
    label: Error Status
    type: binary_flags
    command: "00h 88h 00h 00h 00h 88h"
    response_bytes: 12
    description: "12 bytes of bit-flagged error info (cover error, fan error, temp error, lamp error, etc.)"

  - id: projector_info
    label: Projector Information
    type: composite
    command: "03h 8Ah 00h 00h 00h 8Dh"
    response_fields:
      - name: projector_name
        offset: "DATA01-49"
        description: "NUL-terminated string"
      - name: lamp_usage_seconds
        offset: "DATA83-86"
        description: "Lamp usage time in seconds (updated at 1-min intervals)"
      - name: filter_usage_seconds
        offset: "DATA87-90"
        description: "Filter usage time in seconds"

  - id: lamp_info
    label: Lamp Information
    type: composite
    command: "03h 96h 00h 00h 02h <LAMP> <CONTENT> <CKS>"
    params:
      - name: lamp
        description: "00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
      - name: content
        description: "01h=usage time (seconds), 04h=remaining life (%)"

  - id: filter_usage_info
    label: Filter Usage Information
    type: composite
    command: "03h 95h 00h 00h 00h 98h"
    response_fields:
      - name: filter_usage_seconds
        offset: "DATA01-04"
      - name: filter_alarm_start_seconds
        offset: "DATA05-08"

  - id: running_status
    label: Running Status
    type: composite
    command: "00h 85h 00h 00h 01h 01h 87h"
    response_fields:
      - name: power_status
        offset: "DATA03"
        values: "00h=Standby, 01h=Power On, FFh=Not supported"
      - name: cooling_process
        offset: "DATA04"
        values: "00h=Not executing, 01h=During execution"
      - name: power_onoff_process
        offset: "DATA05"
        values: "00h=Not executing, 01h=During execution"
      - name: operation_status
        offset: "DATA06"
        values: "00h=Standby(Sleep), 04h=Power On, 05h=Cooling, 06h=Standby(error), 0Fh=Standby(Power saving), 10h=Network standby"

  - id: input_status
    label: Input Status
    type: composite
    command: "00h 85h 00h 00h 01h 02h 88h"
    response_fields:
      - name: signal_switch_process
        offset: "DATA01"
      - name: signal_type_1
        offset: "DATA03"
      - name: signal_type_2
        offset: "DATA04"
        values: "01h=COMPUTER, 02h=VIDEO, 03h=S-VIDEO, 04h=COMPONENT, 20h=DVI-D, 21h=HDMI, 22h=DisplayPort"
      - name: content_displayed
        offset: "DATA09"
        values: "00h=Video signal, 01h=No signal, 02h=Viewer, 03h=Test pattern"

  - id: mute_status
    label: Mute Status
    type: composite
    command: "00h 85h 00h 00h 01h 03h 89h"
    response_fields:
      - name: picture_mute
        offset: "DATA01"
        values: "00h=Off, 01h=On"
      - name: sound_mute
        offset: "DATA02"
        values: "00h=Off, 01h=On"
      - name: onscreen_mute
        offset: "DATA03"
        values: "00h=Off, 01h=On"

  - id: model_name
    label: Model Name
    type: string
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    response_description: "32-byte NUL-terminated model name string"

  - id: cover_status
    label: Cover Status
    type: enum
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    values: ["00h=Normal (cover opened)", "01h=Cover closed"]

  - id: lens_control_request
    label: Lens Position
    type: composite
    command: "02h 1Ch 00h 00h 02h <TARGET> 00h <CKS>"
    params:
      - name: target
        description: "00h=Zoom, 01h=Focus, 02h=Lens Shift H, 03h=Lens Shift V"
    response_fields:
      - name: upper_limit
        description: "16-bit value"
      - name: lower_limit
        description: "16-bit value"
      - name: current_value
        description: "16-bit value"

  - id: lens_info
    label: Lens Operation Status
    type: binary_flags
    command: "02h 22h 00h 00h 01h 00h 25h"
    response_description: "Bit flags: Bit0=Lens Memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift H, Bit4=Lens Shift V (0=Stop, 1=Operating)"

  - id: lens_profile_request
    label: Lens Profile
    type: enum
    command: "02h 28h 00h 00h 00h 2Ah"
    values: ["00h=Profile 1", "01h=Profile 2"]

  - id: lens_memory_option_request
    label: Lens Memory Option
    type: composite
    command: "02h 20h 00h 00h 01h <TARGET> <CKS>"
    params:
      - name: target
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    response_values: "00h=OFF, 01h=ON"

  - id: gain_parameter
    label: Gain Parameter
    type: composite
    command: "03h 05h 00h 00h 03h <GAIN_ID> 00h 00h <CKS>"
    params:
      - name: gain_id
        description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness, 05h=Volume, 96h=Lamp Adjust"
    response_fields:
      - name: status
        description: "00h=display not possible, 01h=adjust not possible, 02h=adjustable, FFh=gain does not exist"
      - name: upper_limit
      - name: lower_limit
      - name: default_value
      - name: current_value

  - id: eco_mode_request
    label: Eco Mode
    type: integer
    command: "03h B0h 00h 00h 01h 07h BBh"
    response_description: "Eco mode value - model-specific"

  - id: projector_name_request
    label: Projector Name
    type: string
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    response_description: "17-byte NUL-terminated projector name"

  - id: mac_address_request
    label: MAC Address
    type: string
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    response_description: "6-byte MAC address"

  - id: edge_blending_request
    label: Edge Blending Mode
    type: enum
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    values: ["00h=OFF", "01h=ON"]

  - id: pip_pbp_request
    label: PIP/Picture-by-Picture
    type: composite
    command: "03h B0h 00h 00h 02h C5h <TARGET> <CKS>"
    response_description: "Returns mode, position, or sub-input based on target parameter"

  - id: basic_information
    label: Basic Information
    type: composite
    command: "00h BFh 00h 00h 01h 02h C2h"
    response_fields:
      - name: operation_status
        offset: "DATA01"
        values: "00h=Standby(Sleep), 04h=Power On, 05h=Cooling, 06h=Standby(error), 0Fh=Standby(Power saving), 10h=Network standby"
      - name: content_displayed
        offset: "DATA02"
      - name: signal_type
        offset: "DATA03-DATA04"
      - name: video_mute
        offset: "DATA06"
      - name: sound_mute
        offset: "DATA07"
      - name: freeze_status
        offset: "DATA09"

  - id: base_model_type_request
    label: Base Model Type
    type: composite
    command: "00h BFh 00h 00h 01h 00h C0h"
    response_fields:
      - name: base_model_type
        description: "2-byte type code"
      - name: model_name
        description: "NUL-terminated string"

  - id: serial_number_request
    label: Serial Number
    type: string
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    response_description: "16-byte NUL-terminated serial number"

  - id: info_string_request
    label: Information String
    type: string
    command: "00h D0h 00h 00h 03h 00h <TYPE> 01h <CKS>"
    params:
      - name: type
        description: "03h=Horizontal sync frequency, 04h=Vertical sync frequency"

  - id: setting_request
    label: Setting Information
    type: composite
    command: "00h 85h 00h 00h 01h 00h 86h"
    response_fields:
      - name: base_model_type
        offset: "DATA01-03"
      - name: sound_function
        offset: "DATA04"
        values: "00h=Not available, 01h=Available"
```

## Variables
```yaml
variables:
  - id: volume
    label: Volume
    type: integer
    min: null  # UNRESOLVED: range not stated; use gain_parameter request to discover
    max: null
    command: volume_adjust

  - id: brightness
    label: Brightness
    type: integer
    command: picture_adjust
    target_code: "00h"

  - id: contrast
    label: Contrast
    type: integer
    command: picture_adjust
    target_code: "01h"

  - id: color
    label: Color
    type: integer
    command: picture_adjust
    target_code: "02h"

  - id: hue
    label: Hue
    type: integer
    command: picture_adjust
    target_code: "03h"

  - id: sharpness
    label: Sharpness
    type: integer
    command: picture_adjust
    target_code: "04h"

  - id: lamp_adjust
    label: Lamp Adjust / Light Adjust
    type: integer
    command: lamp_adjust

  - id: eco_mode
    label: Eco Mode
    type: integer
    command: eco_mode_set
    notes: Values are model-specific. See supplementary tables.

  - id: aspect
    label: Aspect Ratio
    type: integer
    command: aspect_adjust
    notes: Values are model-specific.

  - id: projector_name
    label: Projector Name
    type: string
    max_length: 16
    command: projector_name_set
```

## Events
```yaml
# UNRESOLVED: no unsolicited event/notification mechanism described in source.
# All responses are synchronous replies to commands.
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
  Power ON and Power OFF commands block all other commands during execution
  (including cooling period for power off). The error status request (009) provides
  bit-flagged hardware error detection including cover, fan, temperature, lamp,
  and interlock switch status.
# UNRESOLVED: source mentions interlock switch (DATA09 Bit1) but no explicit
# interlock procedure is documented in the command reference.
```

## Notes
- All commands and responses are binary (hex-encoded) with a simple additive checksum (low byte of sum of all preceding bytes).
- Commands include `<ID1>` (control ID) and `<ID2>` (model code) parameters in responses.
- Error responses use a standard format with ERR1/ERR2 codes. See error code table in source Section 2.4.
- Lens control supports both timed drive (0.25s/0.5s/1s) and continuous drive modes. Continuous drive requires an explicit stop command.
- Input terminal hex codes and eco mode values vary significantly across NP-PA sub-models. Consult the supplementary tables in Sections 4 for exact mappings.
- Lamp usage time and filter usage time are returned in seconds but updated at one-minute intervals.
- Some models cannot receive commands in standby mode.

<!-- UNRESOLVED: exact control ID (ID1) and model code (ID2) values not specified in source — likely configured per projector -->
<!-- UNRESOLVED: supported input terminal codes are model-specific; only representative examples listed -->
<!-- UNRESOLVED: eco mode, aspect ratio values are model-specific -->
<!-- UNRESOLVED: maximum/minimum values for picture and volume adjustment ranges not stated; must be queried via gain parameter request (060-1) -->
<!-- UNRESOLVED: standby mode command reception capability varies by model -->
<!-- UNRESOLVED: document revision is BDT140013 Rev 7.1 / BDT140014 Rev 29.0; firmware compatibility ranges not stated -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:52:25.396Z
last_checked_at: 2026-05-14T18:17:18.593Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:18.593Z
matched_actions: 29
action_count: 29
confidence: medium
summary: "All 48 spec actions have literal command matches in NEC PA serial source; transport parameters verified; comprehensive coverage. (14 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact model-specific input terminal hex codes vary by model — see supplementary tables in source"
- "eco mode values vary by model subgroup"
- "some models cannot receive commands in standby mode — see Appendix \"Standby Mode setting for receiving commands\""
- "flow control not explicitly stated; RTS/CTS pins connected in pinout"
- "range not stated; use gain_parameter request to discover"
- "no unsolicited event/notification mechanism described in source."
- "no multi-step macro sequences described in source"
- "source mentions interlock switch (DATA09 Bit1) but no explicit"
- "exact control ID (ID1) and model code (ID2) values not specified in source — likely configured per projector"
- "supported input terminal codes are model-specific; only representative examples listed"
- "eco mode, aspect ratio values are model-specific"
- "maximum/minimum values for picture and volume adjustment ranges not stated; must be queried via gain parameter request (060-1)"
- "standby mode command reception capability varies by model"
- "document revision is BDT140013 Rev 7.1 / BDT140014 Rev 29.0; firmware compatibility ranges not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
