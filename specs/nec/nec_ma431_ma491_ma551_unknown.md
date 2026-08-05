---
spec_id: admin/nec-ma431-ma491-ma551
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC MA431/MA491/MA551 Control Spec"
manufacturer: NEC
model_family: MA431
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - MA431
    - MA491
    - MA551
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-14T17:40:32.844Z
last_checked_at: 2026-07-21T23:36:07.715Z
generated_at: 2026-07-21T23:36:07.715Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "input terminal value ranges (Appendix \"Supplementary Information by Command\" not included in source)"
  - "eco mode / aspect value ranges not documented (Appendix reference only)"
  - "no unsolicited event / notification messages documented."
  - "no explicit multi-step macro sequences documented."
  - "explicit interlock procedure / safety confirmation not stated in source."
  - "Appendix \"Supplementary Information by Command\" values for input terminals, aspect, eco mode, and sub input settings not included in source — referenced but content omitted"
  - "model code (ID2) values not stated in source (varies by model)"
  - "wireless LAN control details not documented (referenced to separate wireless LAN unit manual)"
  - "firmware version compatibility not stated in source"
  - "voltage/current/power specifications not stated in source"
verification:
  verdict: verified
  checked_at: 2026-07-21T23:36:07.715Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched literally to source commands with one-to-one correspondence; all transport parameters verified. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# NEC MA431/MA491/MA551 Control Spec

## Summary
Projector control spec covering RS-232 serial and TCP/IP control interfaces. Supports power management, input switching, mute controls, picture/volume adjustments, lens positioning, eco mode, and queryable status. TCP port 7142 stated; no auth procedure in source.

<!-- UNRESOLVED: input terminal value ranges (Appendix "Supplementary Information by Command" not included in source) -->
<!-- UNRESOLVED: eco mode / aspect value ranges not documented (Appendix reference only) -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142  # stated: "Use TCP port number '7142'"
serial:
  baud_rate: 115200  # stated: supports 115200/38400/19200/9600/4800 bps
  data_bits: 8
  parity: none
  stop_bits: 1
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # inferred: POWER ON (015) and POWER OFF (016) commands documented
- queryable  # inferred: ERROR STATUS (009), INFORMATION REQUEST (037), RUNNING STATUS (078-2), INPUT STATUS (078-3), MUTE STATUS (078-4) and many other query commands documented
- routable  # inferred: INPUT SW CHANGE (018) command documented
- levelable  # inferred: VOLUME ADJUST (030-2), PICTURE ADJUST (030-1), ASPECT ADJUST (030-12), OTHER ADJUST (030-15) commands documented
```

## Actions
```yaml
# ── Power ──
- id: power_on
  label: Power On
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  description: Turns projector power on. No other command accepted during power-on sequence.

- id: power_off
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  description: Turns projector power off. No other command accepted during power-off sequence (including cooling).

# ── Input switching ──
- id: input_sw_change
  label: Input Switch
  kind: action
  command: "02h 03h 00h 00h 02h 01h {input} {checksum}"
  params:
    - name: input
      type: integer
      description: Input terminal selector (DATA01). Values defined in Appendix; video example shown as 06h.

# ── Mute controls ──
- id: picture_mute_on
  label: Picture Mute On
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []
  description: Turns picture mute on. Cancelled by input terminal switch or video signal switch.

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
  description: Turns sound mute on. Cancelled by input switch, video signal switch, or volume adjustment.

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
  description: Turns onscreen mute on. Cancelled by input switch or video signal switch.

- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

# ── Adjustments ──
- id: picture_adjust
  label: Picture Adjust
  kind: action
  command: "03h 10h 00h 00h 05h {target} FFh {value_lo} {value_hi} {checksum}"
  params:
    - name: target
      type: integer
      description: |
        00h = Brightness, 01h = Contrast, 02h = Color, 03h = Hue, 04h = Sharpness
    - name: mode
      type: integer
      description: 00h = absolute value, 01h = relative value
    - name: value
      type: integer
      description: 16-bit signed adjustment value (DATA03 low, DATA04 high)

- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {mode} {value_lo} {value_hi} {checksum}"
  params:
    - name: mode
      type: integer
      description: 00h = absolute value, 01h = relative value
    - name: value
      type: integer
      description: 16-bit signed adjustment value (DATA02 low, DATA03 high)

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {value} 00h {checksum}"
  params:
    - name: value
      type: integer
      description: Aspect setting value per Appendix

- id: other_adjust
  label: Other Adjust
  kind: action
  command: "03h 10h 00h 00h 05h {target} {target2} {mode} {value_lo} {value_hi} {checksum}"
  params:
    - name: target
      type: integer
      description: "DATA01: 96h = LAMP ADJUST / LIGHT ADJUST"
    - name: target2
      type: integer
      description: "DATA02: FFh for LAMP ADJUST / LIGHT ADJUST"
    - name: mode
      type: integer
      description: 00h = absolute value, 01h = relative value
    - name: value
      type: integer
      description: 16-bit signed adjustment value

# ── Remote key code ──
- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h {key_code_lo} {key_code_hi} {checksum}"
  params:
    - name: key_code
      type: integer
      description: |
        Key code WORD: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP,
        08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP,
        10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2,
        4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE,
        A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO

# ── Shutter ──
- id: shutter_close
  label: Shutter Close
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []
  description: Closes the lens shutter.

- id: shutter_open
  label: Shutter Open
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []
  description: Opens the lens shutter.

# ── Lens control ──
- id: lens_control
  label: Lens Control
  kind: action
  command: "02h 18h 00h 00h 02h {target} {action} {checksum}"
  params:
    - name: target
      type: integer
      description: "06h = Periphery Focus"
    - name: action
      type: integer
      description: |
        00h=Stop, 01h=Drive +1s, 02h=Drive +0.5s, 03h=Drive +0.25s, 7Fh=Drive +continuous,
        81h=Drive -continuous, FDh=Drive -0.25s, FEh=Drive -0.5s, FFh=Drive -1s.
        Send 00h to stop continuous drive.

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {command_byte} {mode} {value_lo} {value_hi} {checksum}"
  params:
    - name: command
      type: integer
      description: FFh = Stop, otherwise drive direction
    - name: mode
      type: integer
      description: 00h = absolute value, 02h = relative value
    - name: value
      type: integer
      description: 16-bit signed adjustment value

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h {operation} {checksum}"
  params:
    - name: operation
      type: integer
      description: 00h = MOVE, 01h = STORE, 02h = RESET

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h {operation} {checksum}"
  params:
    - name: operation
      type: integer
      description: 00h = MOVE, 01h = STORE, 02h = RESET

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h {option} {value} {checksum}"
  params:
    - name: option
      type: integer
      description: 00h = LOAD BY SIGNAL, 01h = FORCED MUTE
    - name: value
      type: integer
      description: 00h = OFF, 01h = ON

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h {profile} {checksum}"
  params:
    - name: profile
      type: integer
      description: "00h = Profile 1, 01h = Profile 2"
  description: Selects the profile number of the reference lens memory.

# ── Freeze ──
- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h {state} {checksum}"
  params:
    - name: state
      type: integer
      description: 01h = On, 02h = Off

# ── Eco mode ──
- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h {mode} {checksum}"
  params:
    - name: mode
      type: integer
      description: Eco mode value per Appendix

# ── LAN / name ──
- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {name_bytes} 00h {checksum}"
  params:
    - name: name
      type: string
      description: Projector name up to 16 bytes (NUL-terminated)

# ── PIP / Picture-by-Picture ──
- id: pip_picture_by_picture_set
  label: PIP/Picture-by-Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {target} {value} {checksum}"
  params:
    - name: target
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: integer
      description: Mode (00h=PIP, 01h=PICTURE BY PICTURE), Position (00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT), Sub input per Appendix

# ── Edge blending ──
- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {mode} {checksum}"
  params:
    - name: mode
      type: integer
      description: 00h = OFF, 01h = ON

# ── Audio select ──
- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h {input} {value} {checksum}"
  params:
    - name: input
      type: integer
      description: Input terminal per Appendix
    - name: value
      type: integer
      description: "00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"

# ── Query commands (kind: query) ──

- id: error_status_request
  label: Error Status Request
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []
  description: Gets information about errors occurring in the projector.

- id: information_request
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  description: Gets the information of the projector (name, lamp usage time, filter usage time).

- id: filter_usage_info_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  description: Gets filter usage information such as usage time.

- id: lamp_info_request
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h {lamp} {content} {checksum}"
  params:
    - name: lamp
      type: integer
      description: "00h = Lamp 1, 01h = Lamp 2 (two-lamp models only)"
    - name: content
      type: integer
      description: "01h = Lamp usage time (seconds), 04h = Lamp remaining life (%)"
  description: Gets lamp usage information such as usage time or remaining life.

- id: carbon_savings_info_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h {type} {checksum}"
  params:
    - name: type
      type: integer
      description: "00h = Total Carbon Savings, 01h = Carbon Savings during operation"
  description: Gets the Carbon Saving values on the projector.

- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {target} 00h {checksum}"
  params:
    - name: target
      type: integer
      description: Lens adjustment target (same as LENS CONTROL DATA01, e.g. 06h = Periphery Focus)
  description: Gets adjusted values of the lens position (upper/lower limits, current value).

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h {option} {checksum}"
  params:
    - name: option
      type: integer
      description: "00h = LOAD BY SIGNAL, 01h = FORCED MUTE"
  description: Gets the value set for the lens memory.

- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  description: Gets lens operation status (zoom, focus, lens shift H/V, lens memory).

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []
  description: Gets the selected profile number of the reference lens memory.

- id: gain_parameter_request
  label: Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h {name} 00h 00h {checksum}"
  params:
    - name: name
      type: integer
      description: |
        Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE,
        04h=SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST / LIGHT ADJUST
  description: Gets adjusted values of the picture, volume, etc. (limits, default, current).

- id: setting_request
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  description: Gets information of the projector (base model type, sound function, profile/timer functions).

- id: running_status_request
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  description: Gets the operation status of the projector (power, cooling, power on/off process).

- id: input_status_request
  label: Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  description: Gets the input signal status of the projector.

- id: mute_status_request
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  description: Gets the mute status of the projector.

- id: model_name_request
  label: Model Name Request
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []
  description: Gets the model name of the projector.

- id: cover_status_request
  label: Cover Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  description: Gets the status of the mirror cover or lens cover.

- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h {type} 01h {checksum}"
  params:
    - name: type
      type: integer
      description: "03h = Horizontal synchronous frequency, 04h = Vertical synchronous frequency"
  description: Gets information strings (English) displayed on the projector.

- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  description: Gets the value set for the eco mode.

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []
  description: Gets the projector name.

- id: lan_mac_address_request
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []
  description: Gets the MAC address of the projector.

- id: pip_pbp_request
  label: PIP/Picture-by-Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h {target} {checksum}"
  params:
    - name: target
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
  description: Gets the value set for PIP and picture-by-picture.

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []
  description: Gets the value set for edge blending.

- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  description: Gets the base model type and model name of the projector.

- id: serial_number_request
  label: Serial Number Request
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []
  description: Gets the serial number of the projector.

- id: basic_information_request
  label: Basic Information Request
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  description: Gets the basic information about the operation status of the projector.
```

## Feedbacks
```yaml
- id: error_status
  label: Error Status
  type: object
  properties:
    - name: data01
      type: object
      description: |
        Error info (bits): Bit0=cover error, Bit1=temp error (bi-metallic), Bit3=fan error,
        Bit4=fan error, Bit5=power error, Bit6=lamp off/backlight off, Bit7=lamp replacement moratorium
    - name: data02
      type: object
      description: "Bit0=lamp1 usage exceeded, Bit1=formatter error, Bit2=lamp2 off, Bit7=extended status"
    - name: data03
      type: object
      description: "Bit1=FPGA error, Bit2=temp sensor error, Bit3=lamp1 not present, Bit4=lamp1 data error, Bit5=mirror cover error, Bit6=lamp2 moratorium, Bit7=lamp2 usage exceeded"
    - name: data04
      type: object
      description: "Bit0=lamp2 not present, Bit1=lamp2 data error, Bit2=temp due to dust, Bit3=foreign matter sensor, Bit4=iris calibration, Bit5=ballast comm error, Bit7=lens not installed"
    - name: data09
      type: object
      description: "Bit0=portrait cover side up, Bit1=interlock switch open, Bit2=system error (Slave CPU), Bit3=system error (Formatter)"

- id: power_state
  label: Power State
  type: enum
  values:
    - "00h: Standby"
    - "01h: Power on"
    - "05h: Cooling"
    - "06h: Standby (error)"
    - "0Fh: Standby (Power saving)"
    - "10h: Network standby"

- id: mute_status
  label: Mute Status
  type: object
  properties:
    - name: picture_mute
      type: integer
      description: 00h = Off, 01h = On
    - name: sound_mute
      type: integer
      description: 00h = Off, 01h = On
    - name: onscreen_mute
      type: integer
      description: 00h = Off, 01h = On
    - name: forced_onscreen_mute
      type: integer
      description: 00h = Off, 01h = On
    - name: onscreen_display
      type: integer
      description: 00h = Not displayed, 01h = Displayed

- id: input_status
  label: Input Status
  type: object
  properties:
    - name: signal_switch_process
      type: integer
      description: 00h=not executed, 01h=during execution, FFh=not supported
    - name: signal_list_number
      type: integer
      description: "0-FFh: signal list number - 1 (add 1 for actual number)"
    - name: selection_signal_type_1
      type: integer
      description: "01h-05h: signal type 1-5"
    - name: selection_signal_type_2
      type: integer
      description: "01h=COMPUTER, 02h=VIDEO, 03h=S-VIDEO, 04h=COMPONENT, 05h=reserved, 07h=VIEWER(1-5), 20h=DVI-D, 21h=HDMI, 22h=DisplayPort, 23h=VIEWER(6-10), FFh=No source"
    - name: content_displayed
      type: integer
      description: "00h=video signal, 01h=no signal, 02h=viewer, 03h=test pattern, 04h=LAN displayed"

- id: cover_status
  label: Cover Status
  type: enum
  values:
    - "00h: Normal (cover opened)"
    - "01h: Cover closed"

- id: running_status
  label: Running Status
  type: object
  properties:
    - name: power_status
      type: integer
      description: "00h=Standby, 01h=Power on, FFh=Not supported"
    - name: cooling_process
      type: integer
      description: "00h=Not executed, 01h=During execution, FFh=Not supported"
    - name: power_on_off_process
      type: integer
      description: "00h=Not executed, 01h=During execution, FFh=Not supported"
    - name: operation_status
      type: integer
      description: "00h=Standby(Sleep), 04h=Power on, 05h=Cooling, 06h=Standby(error), 0Fh=Standby(Power saving), 10h=Network standby"

- id: information_request
  label: Information Request
  type: object
  properties:
    - name: projector_name
      type: string
      description: Up to 49 bytes NUL-terminated
    - name: lamp_usage_time
      type: integer
      description: Seconds (DATA83-86), updated at 1-minute intervals
    - name: filter_usage_time
      type: integer
      description: Seconds (DATA87-90)

- id: filter_usage_information
  label: Filter Usage Information
  type: object
  properties:
    - name: filter_usage_time
      type: integer
      description: Seconds (DATA01-04), returns -1 if undefined
    - name: filter_alarm_start_time
      type: integer
      description: Seconds (DATA05-08), returns -1 if undefined

- id: lamp_information
  label: Lamp Information
  type: object
  properties:
    - name: lamp
      type: integer
      description: "00h=Lamp1, 01h=Lamp2 (two-lamp models only)"
    - name: content
      type: integer
      description: "01h=Lamp usage time (seconds), 04h=Lamp remaining life (%)"
    - name: value
      type: integer
      description: Obtained value (DATA03-06). Remaining life returns negative when deadline exceeded.

- id: carbon_savings_information
  label: Carbon Savings Information
  type: object
  properties:
    - name: type
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
    - name: carbon_savings_kg
      type: integer
      description: Carbon Savings in kilograms (DATA02-05, max 99999 kg)
    - name: carbon_savings_mg
      type: integer
      description: Carbon Savings in milligrams (DATA06-09, max 999999 mg)

- id: lens_control_values
  label: Lens Control Values
  type: object
  properties:
    - name: upper_limit
      type: integer
      description: Upper limit of adjustment range (DATA02 low, DATA03 high)
    - name: lower_limit
      type: integer
      description: Lower limit of adjustment range (DATA04 low, DATA05 high)
    - name: current_value
      type: integer
      description: Current value (DATA06 low, DATA07 high)

- id: lens_information
  label: Lens Information
  type: object
  properties:
    - name: lens_memory
      type: integer
      description: "Bit0: 0=Stop, 1=During operation"
    - name: zoom
      type: integer
      description: "Bit1: 0=Stop, 1=During operation"
    - name: focus
      type: integer
      description: "Bit2: 0=Stop, 1=During operation"
    - name: lens_shift_h
      type: integer
      description: "Bit3: 0=Stop, 1=During operation"
    - name: lens_shift_v
      type: integer
      description: "Bit4: 0=Stop, 1=During operation"

- id: gain_parameter
  label: Gain Parameter
  type: object
  properties:
    - name: adjusted_value_status
      type: integer
      description: "00h=Display not possible, 01h=Adjustment not possible, 02h=Adjustment possible, FFh=Specified gain does not exist"
    - name: upper_limit
      type: integer
      description: Upper limit (DATA02 low, DATA03 high)
    - name: lower_limit
      type: integer
      description: Lower limit (DATA04 low, DATA05 high)
    - name: default_value
      type: integer
      description: Default value (DATA06 low, DATA07 high)
    - name: current_value
      type: integer
      description: Current value (DATA08 low, DATA09 high)
    - name: wide_adjustment_width
      type: integer
      description: Wide adjustment width (DATA10 low, DATA11 high)
    - name: narrow_adjustment_width
      type: integer
      description: Narrow adjustment width (DATA12 low, DATA13 high)
    - name: default_valid
      type: integer
      description: "DATA14: 00h=invalid, 01h=valid"

- id: setting_information
  label: Setting Information
  type: object
  properties:
    - name: base_model_type
      type: integer
      description: Base model type (DATA01-03), values per Appendix
    - name: sound_function
      type: integer
      description: "DATA04: 00h=Not available, 01h=Available"
    - name: profile_number
      type: integer
      description: "DATA05: 00h=Not available, 01h=Clock function, 02h=Sleep timer, 03h=Clock + Sleep timer"

- id: model_name
  label: Model Name
  type: string
  description: Model name (NUL-terminated, DATA01-32)

- id: information_string
  label: Information String
  type: object
  properties:
    - name: type
      type: integer
      description: "03h=Horizontal sync frequency, 04h=Vertical sync frequency"
    - name: string_length
      type: integer
      description: Label/information string length (excluding NUL)
    - name: string
      type: string
      description: Label/information strings (NUL-terminated)

- id: eco_mode_value
  label: Eco Mode Value
  type: integer
  description: Value set for eco mode. Per Appendix.

- id: lan_projector_name
  label: LAN Projector Name
  type: string
  description: Projector name (NUL-terminated, DATA01-17)

- id: lan_mac_address
  label: LAN MAC Address
  type: string
  description: MAC address (DATA01-06)

- id: pip_pbp_status
  label: PIP/Picture-by-Picture Status
  type: object
  properties:
    - name: target
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: integer
      description: "MODE: 00h=PIP, 01h=PICTURE BY PICTURE. POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT. Sub input per Appendix."

- id: edge_blending_status
  label: Edge Blending Status
  type: enum
  values:
    - "00h: OFF"
    - "01h: ON"

- id: base_model_type
  label: Base Model Type
  type: object
  properties:
    - name: base_model_type
      type: integer
      description: Base model type (DATA01-02), values per Appendix
    - name: model_name
      type: string
      description: Model name (DATA03-11, NUL-terminated)

- id: serial_number
  label: Serial Number
  type: string
  description: Serial number (NUL-terminated, DATA01-16)

- id: basic_information
  label: Basic Information
  type: object
  properties:
    - name: operation_status
      type: integer
      description: "00h=Standby(Sleep), 04h=Power on, 05h=Cooling, 06h=Standby(error), 0Fh=Standby(Power saving), 10h=Network standby"
    - name: content_displayed
      type: integer
      description: "00h=Video signal, 01h=No signal, 02h=Viewer, 03h=Test pattern, 04h=LAN, 05h=Test pattern(user), 10h=Signal being switched"
    - name: selection_signal_type_1
      type: integer
      description: "01h-05h: signal type 1-5"
    - name: selection_signal_type_2
      type: integer
      description: "01h=COMPUTER, 02h=VIDEO, 03h=S-VIDEO, 04h=COMPONENT, 07h=VIEWER(1-5), 20h=DVI-D, 21h=HDMI, 22h=DisplayPort, 23h=VIEWER(6-10), FFh=No source"
    - name: display_signal_type
      type: integer
      description: "Effective when DATA04 is 02h or 03h. 00h=NTSC3.58 ... 0Fh=PAL-L, FFh=Not Video Input"
    - name: video_mute
      type: integer
      description: "00h=Off, 01h=On"
    - name: sound_mute
      type: integer
      description: "00h=Off, 01h=On"
    - name: onscreen_mute
      type: integer
      description: "00h=Off, 01h=On"
    - name: freeze_status
      type: integer
      description: "00h=Off, 01h=On"
```

## Variables
```yaml
- id: eco_mode
  label: Eco Mode
  type: integer
  description: Eco / lamp / light mode setting. Value per Appendix. Query via 097-8, set via 098-8.

- id: projector_name
  label: Projector Name
  type: string
  description: Up to 16 bytes NUL-terminated. Query via 097-45, set via 098-45.

- id: pip_mode
  label: PIP Mode
  type: enum
  values:
    - "00h: PIP"
    - "01h: PICTURE BY PICTURE"
  description: Picture-in-picture mode. Query via 097-198, set via 098-198.

- id: pip_position
  label: PIP Position
  type: enum
  values:
    - "00h: TOP-LEFT"
    - "01h: TOP-RIGHT"
    - "02h: BOTTOM-LEFT"
    - "03h: BOTTOM-RIGHT"
  description: PIP start position. Query via 097-198, set via 098-198.

- id: edge_blending_mode
  label: Edge Blending Mode
  type: enum
  values:
    - "00h: OFF"
    - "01h: ON"
  description: Edge blending enable. Query via 097-243-1, set via 098-243-1.

- id: lens_profile
  label: Lens Profile
  type: enum
  values:
    - "00h: Profile 1"
    - "01h: Profile 2"
  description: Reference lens memory profile number. Query via 053-11, set via 053-10.

- id: audio_select
  label: Audio Select
  type: object
  properties:
    - name: input_terminal
      type: integer
      description: Audio input terminal per Appendix
    - name: setting
      type: integer
      description: "00h=terminal in DATA01, 01h=BNC, 02h=COMPUTER"
  description: Audio input selection. Set via 319-10. Query not explicitly documented as separate command.
```

## Events
```yaml
# UNRESOLVED: no unsolicited event / notification messages documented.
# Device returns responses only in reply to commands. No push-style notifications described.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences documented.
# Lens memory operations (053-3, 053-4, 053-6) suggest multi-step workflows but not named as macros.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "Interlock switch open prevents certain operations (DATA09 Bit1 in error status)"
  # UNRESOLVED: explicit interlock procedure / safety confirmation not stated in source.
```

## Notes
Serial and TCP command format: `20h 88h <ID1> <ID2> 0Ch <DATA01> - <DATA12> <CKS>` (hex notation). Response format: `A0h 88h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>`. Control ID (ID1) must match projector setting. Checksum = low-order byte of sum of all preceding bytes. Ack-only protocol — no query-polling interval stated.

Power-on and power-off commands are exclusive: no other command accepted while power transition is in progress (including cooling time).

Power state is queryable via 078-2 RUNNING STATUS REQUEST and 305-3 BASIC INFORMATION REQUEST.

Cover status (mirror/lens cover open/closed) queryable via 078-6.

Error code list (ERR1/ERR2): 00h/00h=unrecognized command, 00h/01h=not supported by model, 01h/00h=invalid value, 01h/01h=invalid input terminal, 02h/0Dh=power off, 02h/0Eh=execution failed, 02h/0Fh=no authority, 03h/00h=incorrect gain number.

<!-- UNRESOLVED: Appendix "Supplementary Information by Command" values for input terminals, aspect, eco mode, and sub input settings not included in source — referenced but content omitted -->
<!-- UNRESOLVED: model code (ID2) values not stated in source (varies by model) -->
<!-- UNRESOLVED: wireless LAN control details not documented (referenced to separate wireless LAN unit manual) -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: voltage/current/power specifications not stated in source -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-14T17:40:32.844Z
last_checked_at: 2026-07-21T23:36:07.715Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T23:36:07.715Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched literally to source commands with one-to-one correspondence; all transport parameters verified. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "input terminal value ranges (Appendix \"Supplementary Information by Command\" not included in source)"
- "eco mode / aspect value ranges not documented (Appendix reference only)"
- "no unsolicited event / notification messages documented."
- "no explicit multi-step macro sequences documented."
- "explicit interlock procedure / safety confirmation not stated in source."
- "Appendix \"Supplementary Information by Command\" values for input terminals, aspect, eco mode, and sub input settings not included in source — referenced but content omitted"
- "model code (ID2) values not stated in source (varies by model)"
- "wireless LAN control details not documented (referenced to separate wireless LAN unit manual)"
- "firmware version compatibility not stated in source"
- "voltage/current/power specifications not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
