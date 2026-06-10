---
spec_id: admin/nec-mt-series1
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC MT Series1 Control Spec"
manufacturer: NEC
model_family: "MT Series1"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "MT Series1"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-15T00:10:18.759Z
last_checked_at: 2026-06-10T00:33:34.941Z
generated_at: 2026-06-10T00:33:34.941Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "input terminal value mapping deferred to Appendix \"Supplementary Information by Command\" not included in source"
  - "eco mode value mapping deferred to Appendix not included in source"
  - "aspect value mapping deferred to Appendix not included in source"
  - "sub input value mapping for PIP/PbP deferred to Appendix not included in source"
  - "base model type value mapping deferred to Appendix not included in source"
  - "wireless LAN serial config not stated"
  - "flow control not stated in source"
  - "full input terminal mapping in Appendix not included"
  - "axis enumeration not explicitly listed in source for request command\""
  - "no unsolicited event/notification mechanism described in source"
  - "no multi-step macro sequences described in source"
  - "control ID (ID1) default value and configuration method not stated"
  - "model code (ID2) value for MT Series1 not stated"
  - "Appendix \"Supplementary Information by Command\" not included — input terminal, aspect, eco mode, sub-input, base model type mappings missing"
  - "wireless LAN communication conditions not specified"
  - "flow control setting for serial not stated"
  - "maximum concurrent connection count not stated"
  - "command response timing / timeout values not stated"
verification:
  verdict: verified
  checked_at: 2026-06-10T00:33:34.941Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec action-units verified 1:1 against source. Hex codes, parameter structures, and values exact-match. UNRESOLVEDs properly flagged for missing appendices (not spec defects). No drift or fabrication detected. (18 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-15
---

# NEC MT Series1 Control Spec

## Summary
NEC MT Series1 projector control spec covering serial (RS-232C) and TCP/IP (wired/wireless LAN) interfaces. Binary command protocol with hex-encoded byte sequences and checksum validation. Supports power control, input switching, picture/audio/onscreen mute, lens control, volume adjustment, eco mode, edge blending, PIP/PbP, and extensive status queries.

<!-- UNRESOLVED: input terminal value mapping deferred to Appendix "Supplementary Information by Command" not included in source -->
<!-- UNRESOLVED: eco mode value mapping deferred to Appendix not included in source -->
<!-- UNRESOLVED: aspect value mapping deferred to Appendix not included in source -->
<!-- UNRESOLVED: sub input value mapping for PIP/PbP deferred to Appendix not included in source -->
<!-- UNRESOLVED: base model type value mapping deferred to Appendix not included in source -->
<!-- UNRESOLVED: wireless LAN serial config not stated -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: 115200
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
  - powerable    # inferred from POWER ON / POWER OFF commands
  - routable     # inferred from INPUT SW CHANGE command
  - queryable    # inferred from extensive REQUEST commands
  - levelable    # inferred from VOLUME ADJUST / PICTURE ADJUST commands
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
    label: Input Switch Change
    kind: action
    command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
    description: "Switches the input terminal or entry list."
    params:
      - name: input_terminal
        type: integer
        description: "Input terminal byte value (e.g. 06h = video port). See Appendix for full mapping."
        # UNRESOLVED: full input terminal mapping in Appendix not included

  - id: picture_mute_on
    label: Picture Mute On
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    description: "Turns picture mute on. Auto-off on input/signal switch."
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
    description: "Turns sound mute on. Auto-off on input/signal/volume change."
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
    description: "Turns onscreen mute on. Auto-off on input/signal switch."
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
        description: "16-bit adjustment value (low byte, high byte). Supports negative (two's complement)."

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
        description: "16-bit adjustment value (low byte, high byte)."

  - id: aspect_adjust
    label: Aspect Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
    description: "Adjusts the aspect ratio."
    params:
      - name: aspect_value
        type: integer
        description: "Aspect value byte. Mapping deferred to Appendix."

  - id: lamp_adjust
    label: Lamp / Light Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 96h FFh <DATA03> <DATA04> <DATA05> <CKS>"
    description: "Adjusts lamp/light output."
    params:
      - name: mode
        type: integer
        description: "00h=Absolute value, 01h=Relative value"
      - name: value
        type: integer
        description: "16-bit adjustment value (low byte, high byte)."

  - id: remote_key_code
    label: Remote Key Code
    kind: action
    command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
    description: "Sends a remote control key code (WORD type)."
    params:
      - name: key_code
        type: integer
        description: "16-bit key code. Examples: 02h 00h=POWER ON, 03h 00h=POWER OFF, 05h 00h=AUTO, 06h 00h=MENU, 07h 00h=UP, 08h 00h=DOWN, 09h 00h=RIGHT, 0Ah 00h=LEFT, 0Bh 00h=ENTER, 0Ch 00h=EXIT, 13h 00h=MUTE, 84h 00h=VOLUME UP, 85h 00h=VOLUME DOWN, 8Ah 00h=FREEZE, A3h 00h=ASPECT, D7h 00h=SOURCE, EEh 00h=LAMP MODE/ECO"

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
    description: "Adjusts lens position (periphery focus). Timed or continuous drive modes."
    params:
      - name: target
        type: integer
        description: "06h=Periphery Focus"
      - name: drive
        type: integer
        description: "00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s"

  - id: lens_control_2
    label: Lens Control 2
    kind: action
    command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
    description: "Adjusts lens position with absolute or relative values."
    params:
      - name: target
        type: integer
        description: "FFh=Stop (no further params referenced); otherwise lens axis identifier."
      - name: mode
        type: integer
        description: "00h=Absolute, 02h=Relative"
      - name: value
        type: integer
        description: "16-bit adjustment value (low byte, high byte)."

  - id: lens_memory_control
    label: Lens Memory Control
    kind: action
    command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
    description: "Controls lens memory (MOVE, STORE, RESET)."
    params:
      - name: operation
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  - id: reference_lens_memory_control
    label: Reference Lens Memory Control
    kind: action
    command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
    description: "Controls the reference lens memory for the active profile."
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
    description: "Selects the reference lens memory profile."
    params:
      - name: profile
        type: integer
        description: "00h=Profile 1, 01h=Profile 2"

  - id: freeze_control
    label: Freeze Control
    kind: action
    command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
    description: "Toggles freeze function."
    params:
      - name: state
        type: integer
        description: "01h=On, 02h=Off"

  - id: eco_mode_set
    label: Eco Mode Set
    kind: action
    command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
    description: "Sets eco/lamp/light mode."
    params:
      - name: mode_value
        type: integer
        description: "Eco mode value. Mapping deferred to Appendix."

  - id: projector_name_set
    label: LAN Projector Name Set
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch <DATA01>-<DATA16> 00h <CKS>"
    description: "Sets the projector name (up to 16 bytes)."
    params:
      - name: name
        type: string
        description: "Projector name string, up to 16 bytes, NUL-terminated."

  - id: pip_pbp_set
    label: PIP/Picture by Picture Set
    kind: action
    command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
    description: "Sets PIP or Picture-by-Picture mode."
    params:
      - name: parameter
        type: integer
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: value
        type: integer
        description: "For MODE: 00h=PIP, 01h=PbP. For START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT. Sub input values deferred to Appendix."

  - id: edge_blending_set
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
    description: "Sets audio input source for a given input terminal."
    params:
      - name: input_terminal
        type: integer
        description: "Input terminal byte. Mapping deferred to Appendix."
      - name: setting
        type: integer
        description: "00h=Same terminal as DATA01, 01h=BNC, 02h=COMPUTER"
  - id: error_status_request
    label: Error Status Request
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    description: "Gets information about errors occurring in the projector."
    params: []

  - id: information_request
    label: Information Request
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    description: "Gets projector name, lamp usage time, and filter usage time."
    params: []

  - id: filter_usage_information_request
    label: Filter Usage Information Request
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    description: "Gets filter usage time and filter alarm start time in seconds."
    params: []

  - id: lamp_information_request
    label: Lamp Information Request
    kind: query
    command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    description: "Gets lamp usage time or remaining life for the specified lamp."
    params:
      - name: lamp
        type: integer
        description: "00h=Lamp 1, 01h=Lamp 2 (effective only for two-lamp models)"
      - name: content
        type: integer
        description: "01h=Lamp usage time (seconds), 04h=Lamp remaining life (%)"

  - id: carbon_savings_information_request
    label: Carbon Savings Information Request
    kind: query
    command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
    description: "Gets total or operational carbon savings in kg and mg."
    params:
      - name: type
        type: integer
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

  - id: lens_control_request
    label: Lens Control Request
    kind: query
    command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
    description: "Gets adjusted values of the lens position for a given axis."
    params:
      - name: target
        type: integer
        description: "UNRESOLVED: axis enumeration not explicitly listed in source for request command"

  - id: lens_memory_option_request
    label: Lens Memory Option Request
    kind: query
    command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
    description: "Gets the value set for the specified lens memory option."
    params:
      - name: option
        type: integer
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

  - id: lens_information_request
    label: Lens Information Request
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    description: "Gets bitmask of lens operating states (memory, zoom, focus, shift H/V)."
    params: []

  - id: lens_profile_request
    label: Lens Profile Request
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    description: "Gets the selected profile number of the reference lens memory."
    params: []

  - id: gain_parameter_request
    label: Gain Parameter Request
    kind: query
    command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
    description: "Gets status, limits, default, current value, and adjustment widths for the specified gain parameter."
    params:
      - name: gain_name
        type: integer
        description: "00h=PICTURE/BRIGHTNESS, 01h=PICTURE/CONTRAST, 02h=PICTURE/COLOR, 03h=PICTURE/HUE, 04h=PICTURE/SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST/LIGHT ADJUST"

  - id: setting_request
    label: Setting Request
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    description: "Gets base model type, sound function availability, and profile number."
    params: []

  - id: running_status_request
    label: Running Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    description: "Gets power status, cooling process, power on/off process, and operation status."
    params: []

  - id: input_status_request
    label: Input Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    description: "Gets signal switch process, signal list number, selection signal type, and content displayed."
    params: []

  - id: mute_status_request
    label: Mute Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    description: "Gets picture mute, sound mute, onscreen mute, forced onscreen mute, and onscreen display status."
    params: []

  - id: model_name_request
    label: Model Name Request
    kind: query
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    description: "Gets the 32-byte NUL-terminated model name string."
    params: []

  - id: cover_status_request
    label: Cover Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    description: "Gets the status of the mirror cover or lens cover."
    params: []

  - id: information_string_request
    label: Information String Request
    kind: query
    command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
    description: "Gets horizontal or vertical synchronous frequency information string."
    params:
      - name: information_type
        type: integer
        description: "03h=Horizontal synchronous frequency, 04h=Vertical synchronous frequency"

  - id: eco_mode_request
    label: Eco Mode Request
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    description: "Gets the value set for the eco mode (Light mode or Lamp mode)."
    params: []

  - id: lan_projector_name_request
    label: LAN Projector Name Request
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    description: "Gets the 17-byte NUL-terminated projector name."
    params: []

  - id: mac_address_request
    label: LAN MAC Address Request
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    description: "Gets the 6-byte MAC address of the projector."
    params: []

  - id: pip_pbp_request
    label: PIP/Picture by Picture Request
    kind: query
    command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
    description: "Gets the value set for PIP mode, start position, or sub input."
    params:
      - name: parameter
        type: integer
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

  - id: edge_blending_mode_request
    label: Edge Blending Mode Request
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    description: "Gets the value set for edge blending (OFF/ON)."
    params: []

  - id: base_model_type_request
    label: Base Model Type Request
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    description: "Gets the base model type and model name."
    params: []

  - id: serial_number_request
    label: Serial Number Request
    kind: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    description: "Gets the 16-byte NUL-terminated serial number."
    params: []

  - id: basic_information_request
    label: Basic Information Request
    kind: query
    command: "00h BFh 00h 00h 01h 02h C2h"
    description: "Gets operation status, content displayed, signal types, mute states, and freeze status."
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: error_status
    label: Error Status
    type: binary
    description: "12-byte bitmask of error conditions (cover, fan, temperature, lamp, formatter, FPGA, mirror, ballast, iris, interlock, etc.). Bit=0 normal, bit=1 error."

  - id: power_status
    label: Power Status
    type: enum
    values: [standby, power_on, cooling, standby_error, standby_sleep, standby_power_saving, network_standby]
    description: "Running status DATA06: 00h=Standby(Sleep), 04h=Power on, 05h=Cooling, 06h=Standby(error), 0Fh=Standby(Power saving), 10h=Network standby."

  - id: power_on_off_process
    label: Power Process
    type: enum
    values: [not_executing, executing]
    description: "DATA05 from running status: 00h=Not executed, 01h=During execution."

  - id: cooling_process
    label: Cooling Process
    type: enum
    values: [not_executing, executing]
    description: "DATA04 from running status: 00h=Not executed, 01h=During execution."

  - id: input_status
    label: Input Status
    type: composite
    description: "Signal switch process, signal list number, selection signal type 1 & 2, signal list type, test pattern display, content displayed."

  - id: mute_status
    label: Mute Status
    type: composite
    description: "Picture mute, sound mute, onscreen mute, forced onscreen mute, onscreen display - each on/off."

  - id: model_name
    label: Model Name
    type: string
    description: "32-byte NUL-terminated model name string."

  - id: cover_status
    label: Cover Status
    type: enum
    values: [normal_open, closed]
    description: "DATA01: 00h=Normal (cover opened), 01h=Cover closed."

  - id: projector_information
    label: Projector Information
    type: composite
    description: "Projector name (49 bytes), lamp usage time (seconds, DATA83-86), filter usage time (seconds, DATA87-90). Updated at 1-minute intervals."

  - id: filter_usage
    label: Filter Usage Information
    type: composite
    description: "Filter usage time (seconds, DATA01-04), filter alarm start time (seconds, DATA05-08). Returns -1 if undefined."

  - id: lamp_information
    label: Lamp Information
    type: composite
    description: "Per-lamp (lamp 1 or lamp 2): usage time in seconds, remaining life in %. Negative remaining life indicates exceeded deadline."

  - id: carbon_savings
    label: Carbon Savings
    type: composite
    description: "Total or operational carbon savings in kg (max 99999) + mg (max 999999)."

  - id: lens_position
    label: Lens Position
    type: composite
    description: "Per axis: upper/lower adjustment range limits (16-bit) and current value (16-bit)."

  - id: lens_information
    label: Lens Information
    type: binary
    description: "Bitmask: Bit0=Lens memory (0=stop, 1=operating), Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift H, Bit4=Lens Shift V."

  - id: lens_profile
    label: Lens Profile
    type: enum
    values: [profile_1, profile_2]
    description: "Currently selected reference lens memory profile."

  - id: lens_memory_option
    label: Lens Memory Option
    type: composite
    description: "LOAD BY SIGNAL or FORCED MUTE, each ON/OFF."

  - id: gain_parameter
    label: Gain Parameter
    type: composite
    description: "For brightness/contrast/color/hue/sharpness/volume/lamp: status, upper/lower limits, default, current value, wide/narrow adjustment width."

  - id: setting
    label: Projector Setting
    type: composite
    description: "Base model type (3 bytes), sound function (available/not), profile number (clock/sleep timer)."

  - id: eco_mode
    label: Eco Mode
    type: integer
    description: "Current eco/lamp/light mode value. Mapping deferred to Appendix."

  - id: projector_name
    label: LAN Projector Name
    type: string
    description: "17-byte NUL-terminated projector name."

  - id: mac_address
    label: MAC Address
    type: string
    description: "6-byte MAC address."

  - id: pip_pbp_status
    label: PIP/Picture by Picture Status
    type: composite
    description: "MODE (PIP/PbP), START POSITION (corner), SUB INPUT 1/2/3 values."

  - id: edge_blending_status
    label: Edge Blending Status
    type: enum
    values: [off, on]
    description: "DATA01: 00h=OFF, 01h=ON."

  - id: base_model_type
    label: Base Model Type
    type: composite
    description: "Base model type (2-byte) + model name (NUL-terminated)."

  - id: serial_number
    label: Serial Number
    type: string
    description: "16-byte NUL-terminated serial number."

  - id: basic_information
    label: Basic Information
    type: composite
    description: "Operation status, content displayed, signal type 1/2, display signal type, video/sound/onscreen mute, freeze status."

  - id: information_string
    label: Information String
    type: string
    description: "Horizontal or vertical synchronous frequency string."
```

## Variables
```yaml
variables:
  - id: brightness
    label: Brightness
    type: integer
    description: "Picture brightness. Adjustable via PICTURE ADJUST (target 00h)."

  - id: contrast
    label: Contrast
    type: integer
    description: "Picture contrast. Adjustable via PICTURE ADJUST (target 01h)."

  - id: color
    label: Color
    type: integer
    description: "Picture color saturation. Adjustable via PICTURE ADJUST (target 02h)."

  - id: hue
    label: Hue
    type: integer
    description: "Picture hue. Adjustable via PICTURE ADJUST (target 03h)."

  - id: sharpness
    label: Sharpness
    type: integer
    description: "Picture sharpness. Adjustable via PICTURE ADJUST (target 04h)."

  - id: volume
    label: Volume
    type: integer
    description: "Sound volume level. Adjustable via VOLUME ADJUST."

  - id: lamp_adjust
    label: Lamp Adjust / Light Adjust
    type: integer
    description: "Lamp/light output level. Adjustable via OTHER ADJUST (target 96h FFh)."
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
# Note: POWER ON/OFF commands reject other commands during power transitions.
# No explicit safety interlock procedure documented in source.
```

## Notes
- Binary protocol: commands are hex byte sequences with trailing checksum (low-order byte of sum of all preceding bytes).
- Response prefix `2xh` = success; `Axh` = error with ERR1/ERR2 codes.
- Commands include control ID (ID1) and model code (ID2) parameters in responses.
- Input terminal, aspect, eco mode, sub-input, and base model type value mappings are referenced in an Appendix ("Supplementary Information by Command") not included in the source document.
- Error codes: ERR1=00h/ERR2=00h = unrecognized command; ERR1=02h/ERR2=0Dh = power off; ERR1=02h/ERR2=0Fh = no authority.
- Power ON/OFF blocks all other commands during execution (including cooling period).
- Picture/sound/onscreen mute auto-clear on input switch or signal change; sound mute also auto-clears on volume adjustment.
- Lamp usage time updated at 1-minute intervals despite second-level resolution.
- Baud rate configurable: 115200, 38400, 19200, 9600, or 4800 bps (115200 listed first in source).
- LAN connection: TCP port 7142.

<!-- UNRESOLVED: control ID (ID1) default value and configuration method not stated -->
<!-- UNRESOLVED: model code (ID2) value for MT Series1 not stated -->
<!-- UNRESOLVED: Appendix "Supplementary Information by Command" not included — input terminal, aspect, eco mode, sub-input, base model type mappings missing -->
<!-- UNRESOLVED: wireless LAN communication conditions not specified -->
<!-- UNRESOLVED: flow control setting for serial not stated -->
<!-- UNRESOLVED: maximum concurrent connection count not stated -->
<!-- UNRESOLVED: command response timing / timeout values not stated -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-15T00:10:18.759Z
last_checked_at: 2026-06-10T00:33:34.941Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-10T00:33:34.941Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec action-units verified 1:1 against source. Hex codes, parameter structures, and values exact-match. UNRESOLVEDs properly flagged for missing appendices (not spec defects). No drift or fabrication detected. (18 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "input terminal value mapping deferred to Appendix \"Supplementary Information by Command\" not included in source"
- "eco mode value mapping deferred to Appendix not included in source"
- "aspect value mapping deferred to Appendix not included in source"
- "sub input value mapping for PIP/PbP deferred to Appendix not included in source"
- "base model type value mapping deferred to Appendix not included in source"
- "wireless LAN serial config not stated"
- "flow control not stated in source"
- "full input terminal mapping in Appendix not included"
- "axis enumeration not explicitly listed in source for request command\""
- "no unsolicited event/notification mechanism described in source"
- "no multi-step macro sequences described in source"
- "control ID (ID1) default value and configuration method not stated"
- "model code (ID2) value for MT Series1 not stated"
- "Appendix \"Supplementary Information by Command\" not included — input terminal, aspect, eco mode, sub-input, base model type mappings missing"
- "wireless LAN communication conditions not specified"
- "flow control setting for serial not stated"
- "maximum concurrent connection count not stated"
- "command response timing / timeout values not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
