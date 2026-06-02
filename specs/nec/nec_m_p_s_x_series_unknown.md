---
spec_id: admin/nec-m-p-s-x-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC M/P/S/X Series Control Spec"
manufacturer: NEC
model_family: "NEC M/P/S/X Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "NEC M/P/S/X Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-27T05:49:05.925Z
last_checked_at: 2026-05-31T06:46:46.189Z
generated_at: 2026-05-31T06:46:46.189Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Appendix \"Supplementary Information by Command\" referenced but not included in source — input terminal values, aspect values, eco mode values, base model type values, and sub-input setting values are incomplete."
  - "firmware version compatibility not stated in source"
  - "wireless LAN communication conditions not stated (refers to wireless LAN unit manual)"
  - "RTS/CTS pins wired but flow control mode not stated"
  - "source does not document unsolicited notification events"
  - "source does not document multi-step macro sequences"
  - "flow control mode not stated despite RTS/CTS pins being wired"
  - "wireless LAN communication conditions not stated"
  - "Appendix parameter value tables not included in source"
verification:
  verdict: verified
  checked_at: 2026-05-31T06:46:46.189Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions verified against source with matching wire-level commands; transport parameters confirmed; bidirectional coverage complete. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-27
---

# NEC M/P/S/X Series Control Spec

## Summary

NEC M/P/S/X Series projectors support control via RS-232C serial and TCP/IP (wired/wireless LAN). The binary protocol uses hex-formatted frames with a checksum byte. This spec covers power, input switching, picture/audio adjustment, lens control, shutter, freeze, eco mode, PIP/PbP, edge blending, and various status queries documented in BDT140013 Revision 7.1.

<!-- UNRESOLVED: Appendix "Supplementary Information by Command" referenced but not included in source — input terminal values, aspect values, eco mode values, base model type values, and sub-input setting values are incomplete. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: wireless LAN communication conditions not stated (refers to wireless LAN unit manual) -->

## Transport

```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: [4800, 9600, 19200, 38400, 115200]
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: RTS/CTS pins wired but flow control mode not stated
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits

```yaml
traits:
  - powerable    # inferred from power on/off commands
  - queryable    # inferred from numerous status query commands
  - routable     # inferred from input switch commands
  - levelable    # inferred from volume, brightness, contrast, etc. adjust commands
```

## Actions

```yaml
actions:
  - id: power_on
    label: Power On
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    description: "Turns on the projector. No other commands accepted during power-on."
    params: []

  - id: power_off
    label: Power Off
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    description: "Turns off the projector. No other commands accepted during power-off including cooling time."
    params: []

  - id: input_switch
    label: Input Switch Change
    kind: action
    command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
    description: "Switches the input terminal or entry list."
    params:
      - name: input_terminal
        type: integer
        description: "Input terminal value (hex). Values per Appendix Supplementary Information by Command."

  - id: picture_mute_on
    label: Picture Mute On
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    description: "Turns picture mute on. Cleared by input/video signal switch."
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
    description: "Turns sound mute on. Cleared by input/video signal switch or volume adjust."
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
    description: "Turns onscreen mute on. Cleared by input/video signal switch."
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
    command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02>-<DATA04> <CKS>"
    description: "Adjusts picture parameters (brightness, contrast, color, hue, sharpness)."
    params:
      - name: target
        type: integer
        description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
      - name: mode
        type: integer
        description: "Adjustment mode: 00h=Absolute, 01h=Relative"
      - name: value
        type: integer
        description: "Adjustment value (16-bit, low then high byte)"

  - id: volume_adjust
    label: Volume Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h <DATA01>-<DATA03> <CKS>"
    description: "Adjusts sound volume."
    params:
      - name: mode
        type: integer
        description: "Adjustment mode: 00h=Absolute, 01h=Relative"
      - name: value
        type: integer
        description: "Adjustment value (16-bit, low then high byte)"

  - id: aspect_adjust
    label: Aspect Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
    description: "Adjusts aspect ratio."
    params:
      - name: aspect_value
        type: integer
        description: "Aspect value. Values per Appendix Supplementary Information by Command."

  - id: other_adjust
    label: Other Adjust (Lamp/Light Adjust)
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01>-<DATA05> <CKS>"
    description: "Adjusts lamp/light adjust gain."
    params:
      - name: target
        type: integer
        description: "96h FFh = LAMP ADJUST / LIGHT ADJUST"
      - name: mode
        type: integer
        description: "Adjustment mode: 00h=Absolute, 01h=Relative"
      - name: value
        type: integer
        description: "Adjustment value (16-bit, low then high byte)"

  - id: remote_key_code
    label: Remote Key Code
    kind: action
    command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
    description: "Sends a remote control key code (WORD type)."
    params:
      - name: key_code
        type: integer
        description: "Key code (WORD): 2=POWER ON, 3=POWER OFF, 5=AUTO, 6=MENU, 7=UP, 8=DOWN, 9=RIGHT, 10=LEFT, 11=ENTER, 12=EXIT, 13=HELP, 15=MAGNIFY UP, 16=MAGNIFY DOWN, 19=MUTE, 41=PICTURE, 75=COMPUTER1, 76=COMPUTER2, 79=VIDEO1, 81=S-VIDEO1, 132=VOLUME UP, 133=VOLUME DOWN, 138=FREEZE, 163=ASPECT, 215=SOURCE, 238=LAMP MODE/ECO"

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
    description: "Adjusts lens position with timed or continuous drive."
    params:
      - name: axis
        type: integer
        description: "06h=Periphery Focus"
      - name: drive_mode
        type: integer
        description: "00h=Stop, 01h=1s plus, 02h=0.5s plus, 03h=0.25s plus, 7Fh=continuous plus, 81h=continuous minus, FDh=0.25s minus, FEh=0.5s minus, FFh=1s minus"

  - id: lens_control_2
    label: Lens Control 2
    kind: action
    command: "02h 1Dh 00h 00h 04h <DATA01>-<DATA04> <CKS>"
    description: "Adjusts lens position with absolute or relative value."
    params:
      - name: axis
        type: integer
        description: "FFh=Stop, other values per axis definition"
      - name: mode
        type: integer
        description: "00h=Absolute, 02h=Relative"
      - name: value
        type: integer
        description: "Adjustment value (16-bit, low then high byte)"

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
    description: "Controls the reference lens memory for the profile set via lens profile set."
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
    description: "Sets eco/light/lamp mode. Values per Appendix Supplementary Information by Command."
    params:
      - name: eco_mode
        type: integer
        description: "Value set for the eco mode. Values per Appendix Supplementary Information by Command."

  - id: lan_projector_name_set
    label: LAN Projector Name Set
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch <DATA01>-<DATA16> 00h <CKS>"
    description: "Sets the projector name (up to 16 bytes)."
    params:
      - name: name
        type: string
        description: "Projector name (up to 16 bytes)"

  - id: pip_picture_by_picture_set
    label: PIP/Picture by Picture Set
    kind: action
    command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
    description: "Sets PIP or Picture by Picture mode, start position, or sub input."
    params:
      - name: parameter
        type: integer
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: value
        type: integer
        description: "MODE: 00h=PIP, 01h=PbP. START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT. Sub input values per Appendix."

  - id: edge_blending_mode_set
    label: Edge Blending Mode Set
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
        description: "Input terminal. Values per Appendix Supplementary Information by Command."
      - name: audio_source
        type: integer
        description: "00h=Terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"

  - id: error_status_request
    label: Error Status Request
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    description: "Gets error information (12 bytes of bitmapped error flags)."
    params: []

  - id: information_request
    label: Information Request
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    description: "Gets projector name, lamp usage time (seconds), filter usage time (seconds)."
    params: []

  - id: filter_usage_information_request
    label: Filter Usage Information Request
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    description: "Gets filter usage time and filter alarm start time (seconds)."
    params: []

  - id: lamp_information_request_3
    label: Lamp Information Request 3
    kind: query
    command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    description: "Gets lamp usage time or remaining life for lamp 1 or lamp 2."
    params:
      - name: lamp_number
        type: integer
        description: "00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
      - name: content
        type: integer
        description: "01h=Lamp usage time (seconds), 04h=Lamp remaining life (%)"

  - id: carbon_savings_information_request
    label: Carbon Savings Information Request
    kind: query
    command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
    description: "Gets carbon savings values."
    params:
      - name: type
        type: integer
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

  - id: lens_control_request
    label: Lens Control Request
    kind: query
    command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
    description: "Gets lens position adjustment range and current value."
    params:
      - name: axis
        type: integer
        description: "Axis identifier"

  - id: lens_memory_option_request
    label: Lens Memory Option Request
    kind: query
    command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
    description: "Gets lens memory option setting value."
    params:
      - name: option
        type: integer
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

  - id: lens_information_request
    label: Lens Information Request
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    description: "Gets lens operation status (bitmapped: lens memory, zoom, focus, lens shift H/V)."
    params: []

  - id: lens_profile_request
    label: Lens Profile Request
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    description: "Gets the selected reference lens memory profile number."
    params: []

  - id: gain_parameter_request_3
    label: Gain Parameter Request 3
    kind: query
    command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
    description: "Gets adjustment range, default, and current value for picture/volume/lamp parameters."
    params:
      - name: parameter
        type: integer
        description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness, 05h=Volume, 96h=Lamp/Light Adjust"

  - id: setting_request
    label: Setting Request
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    description: "Gets base model type, sound function availability, profile number."
    params: []

  - id: running_status_request
    label: Running Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    description: "Gets power status, cooling process, power on/off process, operation status."
    params: []

  - id: input_status_request
    label: Input Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    description: "Gets input signal status, signal type, signal list number, content displayed."
    params: []

  - id: mute_status_request
    label: Mute Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    description: "Gets picture mute, sound mute, onscreen mute, forced onscreen mute, OSD status."
    params: []

  - id: model_name_request
    label: Model Name Request
    kind: query
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    description: "Gets the model name string."
    params: []

  - id: cover_status_request
    label: Cover Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    description: "Gets mirror cover or lens cover status."
    params: []

  - id: information_string_request
    label: Information String Request
    kind: query
    command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
    description: "Gets horizontal or vertical synchronous frequency strings."
    params:
      - name: info_type
        type: integer
        description: "03h=Horizontal sync frequency, 04h=Vertical sync frequency"

  - id: eco_mode_request
    label: Eco Mode Request
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    description: "Gets current eco/light/lamp mode. Values per Appendix Supplementary Information by Command."
    params: []

  - id: lan_projector_name_request
    label: LAN Projector Name Request
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    description: "Gets projector name string."
    params: []

  - id: lan_mac_address_request
    label: LAN MAC Address Status Request 2
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    description: "Gets the MAC address (6 bytes)."
    params: []

  - id: pip_picture_by_picture_request
    label: PIP/Picture by Picture Request
    kind: query
    command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
    description: "Gets PIP/PbP mode, start position, or sub input settings."
    params:
      - name: parameter
        type: integer
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

  - id: edge_blending_mode_request
    label: Edge Blending Mode Request
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    description: "Gets edge blending on/off status."
    params: []

  - id: base_model_type_request
    label: Base Model Type Request
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    description: "Gets base model type and model name."
    params: []

  - id: serial_number_request
    label: Serial Number Request
    kind: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    description: "Gets serial number string."
    params: []

  - id: basic_information_request
    label: Basic Information Request
    kind: query
    command: "00h BFh 00h 00h 01h 02h C2h"
    description: "Gets operation status, content displayed, signal type, mute/freeze status."
    params: []
```

## Feedbacks

```yaml
feedbacks:
  - id: error_status
    type: object
    description: "12-byte bitmapped error flags (cover, fan, temperature, power, lamp, formatter, FPGA, mirror cover, ballast, iris, interlock, system errors)"

  - id: projector_info
    type: object
    description: "Projector name (49 bytes), lamp usage time (seconds), filter usage time (seconds)"

  - id: filter_usage_info
    type: object
    description: "Filter usage time (seconds) and filter alarm start time (seconds). -1 if undefined."

  - id: lamp_info
    type: object
    description: "Lamp usage time (seconds) or remaining life (%). Negative remaining life if past replacement deadline."

  - id: carbon_savings_info
    type: object
    description: "Carbon savings in kg (max 99999) and mg (max 999999)"

  - id: lens_control_range
    type: object
    description: "Upper limit, lower limit, and current value for requested lens axis"

  - id: lens_memory_option
    type: enum
    values: [off, on]
    description: "Lens memory option (LOAD BY SIGNAL or FORCED MUTE) on/off"

  - id: lens_operation_status
    type: object
    description: "Bitmapped status: lens memory, zoom, focus, lens shift H/V (stop/during operation)"

  - id: lens_profile
    type: enum
    values: [profile_1, profile_2]
    description: "Selected reference lens memory profile number"

  - id: gain_parameter
    type: object
    description: "Status, upper/lower limit, default, current value, wide/narrow adjustment width for gain parameter"

  - id: setting_info
    type: object
    description: "Base model type, sound function availability, profile number (clock/sleep timer)"

  - id: running_status
    type: object
    description: "Power status (standby/on), cooling process, power on/off process, operation status"

  - id: input_status
    type: object
    description: "Signal switch process, signal list number, selection signal type, content displayed"

  - id: mute_status
    type: object
    description: "Picture mute, sound mute, onscreen mute, forced onscreen mute, OSD status"

  - id: model_name
    type: string
    description: "Model name string"

  - id: cover_status
    type: enum
    values: [normal_open, closed]
    description: "Mirror cover or lens cover status"

  - id: sync_frequency_info
    type: string
    description: "Horizontal or vertical synchronous frequency label string"

  - id: eco_mode
    type: integer
    description: "Current eco/light/lamp mode value"

  - id: projector_name
    type: string
    description: "LAN projector name"

  - id: mac_address
    type: string
    description: "MAC address (6 bytes)"

  - id: pip_pbp_status
    type: object
    description: "PIP/PbP mode, start position, or sub input setting"

  - id: edge_blending_status
    type: enum
    values: [off, on]
    description: "Edge blending on/off"

  - id: base_model_info
    type: object
    description: "Base model type and model name string"

  - id: serial_number
    type: string
    description: "Serial number string"

  - id: basic_info
    type: object
    description: "Operation status, content displayed, signal type, video/sound/onscreen mute, freeze status"

  - id: error_response
    type: object
    description: "ERR1/ERR2 error codes returned on command failure"
```

## Variables

```yaml
variables:
  - id: brightness
    type: integer
    description: "Picture brightness (absolute or relative)"
  - id: contrast
    type: integer
    description: "Picture contrast (absolute or relative)"
  - id: color
    type: integer
    description: "Picture color (absolute or relative)"
  - id: hue
    type: integer
    description: "Picture hue (absolute or relative)"
  - id: sharpness
    type: integer
    description: "Picture sharpness (absolute or relative)"
  - id: volume
    type: integer
    description: "Sound volume level (absolute or relative)"
  - id: lamp_adjust
    type: integer
    description: "Lamp/light adjust value (absolute or relative)"
  - id: aspect_ratio
    type: integer
    description: "Aspect ratio setting"
  - id: eco_mode
    type: integer
    description: "Eco/light/lamp mode"
  - id: projector_name
    type: string
    description: "LAN projector name (up to 16 bytes)"
  - id: lens_profile
    type: enum
    values: [profile_1, profile_2]
    description: "Reference lens memory profile"
  - id: edge_blending
    type: enum
    values: [off, on]
    description: "Edge blending mode"
  - id: audio_select
    type: enum
    values: [same_terminal, bnc, computer]
    description: "Audio input source selection"
```

## Events

```yaml
# UNRESOLVED: source does not document unsolicited notification events
```

## Macros

```yaml
# UNRESOLVED: source does not document multi-step macro sequences
```

## Safety

```yaml
confirmation_required_for: []
interlocks: []
```

## Notes

- Binary protocol: all commands and responses are hex-encoded byte frames with checksum (low-order byte of sum of all preceding bytes).
- Command frame structure: `20h 88h <ID1> <ID2> 0Ch <DATA01>-<DATA12> <CKS>`. ID1 = control ID (projector setting), ID2 = model code.
- Power on/off commands block all other commands during execution (including cooling time for power off).
- Picture mute and sound mute are automatically cleared by input switch or video signal switch.
- Lamp usage time updates at one-minute intervals despite being returned in seconds.
- Lamp remaining life returns negative value past replacement deadline.
- Many command parameter values (input terminal, aspect, eco mode, base model type) reference an Appendix "Supplementary Information by Command" not included in this source.
- <!-- UNRESOLVED: flow control mode not stated despite RTS/CTS pins being wired -->
- <!-- UNRESOLVED: wireless LAN communication conditions not stated -->
- <!-- UNRESOLVED: Appendix parameter value tables not included in source -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-27T05:49:05.925Z
last_checked_at: 2026-05-31T06:46:46.189Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T06:46:46.189Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions verified against source with matching wire-level commands; transport parameters confirmed; bidirectional coverage complete. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Appendix \"Supplementary Information by Command\" referenced but not included in source — input terminal values, aspect values, eco mode values, base model type values, and sub-input setting values are incomplete."
- "firmware version compatibility not stated in source"
- "wireless LAN communication conditions not stated (refers to wireless LAN unit manual)"
- "RTS/CTS pins wired but flow control mode not stated"
- "source does not document unsolicited notification events"
- "source does not document multi-step macro sequences"
- "flow control mode not stated despite RTS/CTS pins being wired"
- "wireless LAN communication conditions not stated"
- "Appendix parameter value tables not included in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
