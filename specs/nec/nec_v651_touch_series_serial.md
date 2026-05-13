---
spec_id: admin/nec-v651-touch-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC V651-TOUCH Series Control Spec"
manufacturer: NEC
model_family: V651-TOUCH
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - V651-TOUCH
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-04-25T21:33:32.686Z
generated_at: 2026-04-25T21:33:32.686Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-25T21:33:32.686Z
  matched_actions: 53
  action_count: 53
  confidence: high
  summary: "All 53 spec actions matched to distinct source commands with correct semantics; all transport parameters present in source."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# NEC V651-TOUCH Series Control Spec

## Summary
NEC V651-TOUCH is a professional projector supporting both RS-232C serial and wired LAN (TCP/IP) control. This spec covers the full command set including power control, input routing, picture/sound mute, volume and picture adjustments, lens positioning, eco mode, and comprehensive query commands for status monitoring.

<!-- UNRESOLVED: HDBaseT, SDI, USB, and viewer input terminal control details are referenced in Appendix tables but full command sequences for these inputs are not documented in the source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142  # stated: "Use TCP port number 7142 for sending and receiving commands"
serial:
  baud_rate: 115200  # supported: 115200/38400/19200/9600/4800 bps
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not specified in source
auth:
  type: none  # inferred: no auth/login/password procedure in source
```

## Traits
```yaml
- powerable       # POWER ON (015), POWER OFF (016) commands present
- routable        # INPUT SW CHANGE (018) with multiple input terminals documented
- queryable       # INFORMATION REQUEST (037), RUNNING STATUS REQUEST (078-2), INPUT STATUS REQUEST (078-3), MUTE STATUS REQUEST (078-4), etc.
- levelable       # VOLUME ADJUST (030-2), PICTURE ADJUST (030-1), LAMP ADJUST/LIGHT ADJUST (030-15)
```

## Actions
```yaml
- id: error_status_request
  label: Error Status Request
  kind: action
  params: []
  description: Gets information about errors occurring in the projector.

- id: power_on
  label: Power On
  kind: action
  params: []
  description: Turns on the power of the projector. No other command accepted while power is turning on.

- id: power_off
  label: Power Off
  kind: action
  params: []
  description: Turns off the power of the projector. No other command accepted during cooling time.

- id: input_sw_change
  label: Input Switch
  kind: action
  params:
    - name: input
      type: integer
      description: Input terminal hex code (e.g., 06h=VIDEO, 01h=COMPUTER, A1h=HDMI)

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  params: []
  description: Turns picture mute on. Cleared by input terminal switch or video signal switch.

- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  params: []

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  params: []
  description: Turns sound mute on. Cleared by input switch, video signal switch, or volume adjustment.

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  params: []

- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  params: []
  description: Turns onscreen mute on. Cleared by input terminal switch or video signal switch.

- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  params: []

- id: picture_adjust
  label: Picture Adjust
  kind: action
  params:
    - name: target
      type: integer
      description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: mode
      type: integer
      description: "00h=absolute value, 01h=relative value"
    - name: value
      type: integer
      description: Adjustment value (16-bit, low/high order)

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=absolute value, 01h=relative value"
    - name: value
      type: integer
      description: Adjustment value (16-bit, low/high order)

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: value
      type: integer
      description: Aspect mode hex code (see appendix for values)

- id: other_adjust
  label: Lamp/Light Adjust
  kind: action
  params:
    - name: target
      type: integer
      description: "96h FFh = LAMP ADJUST / LIGHT ADJUST"
    - name: mode
      type: integer
      description: "00h=absolute value, 01h=relative value"
    - name: value
      type: integer
      description: Adjustment value (16-bit, low/high order)

- id: information_request
  label: Information Request
  kind: action
  params: []
  description: Gets projector information including name, lamp usage time, filter usage time.

- id: filter_usage_info_request
  label: Filter Usage Information Request
  kind: action
  params: []
  description: Gets filter usage time and filter alarm start time.

- id: lamp_info_request_3
  label: Lamp Information Request 3
  kind: action
  params:
    - name: lamp
      type: integer
      description: "00h=Lamp 1, 01h=Lamp 2"
    - name: content
      type: integer
      description: "01h=usage time (seconds), 04h=remaining life (%)"

- id: carbon_savings_request
  label: Carbon Savings Information Request
  kind: action
  params:
    - name: type
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: Key code (WORD type). See key code table for values (POWER ON=0200h, POWER OFF=0300h, etc.)

- id: shutter_close
  label: Shutter Close
  kind: action
  params: []
  description: Closes the lens shutter.

- id: shutter_open
  label: Shutter Open
  kind: action
  params: []
  description: Opens the lens shutter.

- id: lens_control
  label: Lens Control
  kind: action
  params:
    - name: target
      type: integer
      description: "06h=Periphery Focus"
    - name: direction
      type: integer
      description: "00h=Stop, 01h=plus 1s, 02h=plus 0.5s, 03h=plus 0.25s, 7Fh=continuous plus, 81h=minus, FDh=minus 0.25s, FEh=minus 0.5s, FFh=minus 1s"

- id: lens_control_request
  label: Lens Control Request
  kind: action
  params:
    - name: target
      type: integer
      description: "06h=Periphery Focus"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: command
      type: integer
      description: "FFh=Stop"
    - name: mode
      type: integer
      description: "00h=absolute, 02h=relative"
    - name: value
      type: integer
      description: Adjustment value (16-bit)

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: ref_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
    - name: profile
      type: integer
      description: Profile number controlled by command 053-10

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: action
  params:
    - name: option
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  params:
    - name: option
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: value
      type: integer
      description: "00h=OFF, 01h=ON"

- id: lens_info_request
  label: Lens Information Request
  kind: action
  params: []
  description: Gets lens status (memory, zoom, focus, shift operations).

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  params:
    - name: profile
      type: integer
      description: "00h=Profile 1, 01h=Profile 2"

- id: lens_profile_request
  label: Lens Profile Request
  kind: action
  params: []

- id: gain_param_request_3
  label: Gain Parameter Request 3
  kind: action
  params:
    - name: gain_name
      type: integer
      description: "00h=PICTURE/BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST"

- id: setting_request
  label: Setting Request
  kind: action
  params: []
  description: Gets base model type, sound function, profile number, clock/sleep timer availability.

- id: running_status_request
  label: Running Status Request
  kind: action
  params: []
  description: Gets power status, cooling process, power on/off process, operation status.

- id: input_status_request
  label: Input Status Request
  kind: action
  params: []
  description: Gets signal switch process, signal list number, selection signal type.

- id: mute_status_request
  label: Mute Status Request
  kind: action
  params: []
  description: Gets picture mute, sound mute, onscreen mute, forced onscreen mute, onscreen display status.

- id: model_name_request
  label: Model Name Request
  kind: action
  params: []
  description: Gets model name string.

- id: cover_status_request
  label: Cover Status Request
  kind: action
  params: []
  description: Gets mirror cover or lens cover status.

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: state
      type: integer
      description: "01h=freeze on, 02h=freeze off"

- id: info_string_request
  label: Information String Request
  kind: action
  params:
    - name: info_type
      type: integer
      description: "03h=horizontal sync frequency, 04h=vertical sync frequency"

- id: eco_mode_request
  label: Eco Mode Request
  kind: action
  params: []
  description: Gets eco mode value (Light mode or Lamp mode depending on projector).

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: action
  params: []
  description: Gets projector name.

- id: lan_mac_address_request
  label: LAN MAC Address Request
  kind: action
  params: []
  description: Gets MAC address of projector.

- id: pip_pbp_request
  label: PIP/Picture by Picture Request
  kind: action
  params:
    - name: target
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: edge_blend_mode_request
  label: Edge Blending Mode Request
  kind: action
  params: []

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: Eco mode value (see appendix for codes)

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  params:
    - name: name
      type: string
      description: Projector name (up to 16 bytes, NUL-terminated)

- id: pip_pbp_set
  label: PIP/Picture by Picture Set
  kind: action
  params:
    - name: target
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: integer
      description: Setting value for target

- id: edge_blend_mode_set
  label: Edge Blending Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=OFF, 01h=ON"

- id: base_model_type_request
  label: Base Model Type Request
  kind: action
  params: []
  description: Gets base model type and model name.

- id: serial_number_request
  label: Serial Number Request
  kind: action
  params: []
  description: Gets serial number.

- id: basic_info_request
  label: Basic Information Request
  kind: action
  params: []
  description: Gets operation status, content displayed, signal type, mute status, freeze status.

- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: terminal
      type: integer
      description: Input terminal hex code
    - name: source
      type: integer
      description: "00h=terminal in DATA01, 01h=BNC, 02h=COMPUTER"

# UNRESOLVED: Commands 053-3 through 053-11 lack complete parameter tables for reference lens memory profile selection
```

## Feedbacks
```yaml
# All commands return error codes (ERR1, ERR2) on failure:
# 00h 00h = command not recognized
# 00h 01h = command not supported
# 01h 00h = invalid value
# 01h 01h = invalid input terminal
# 01h 02h = invalid language
# 02h 00h = memory allocation error
# 02h 02h = memory in use
# 02h 03h = value cannot be set
# 02h 04h = forced onscreen mute on
# 02h 06h = viewer error
# 02h 07h = no signal
# 02h 08h = test pattern or filter displayed
# 02h 09h = no PC card inserted
# 02h 0Ah = memory operation error
# 02h 0Ch = entry list displayed
# 02h 0Dh = power is off, command cannot be accepted
# 02h 0Eh = command execution failed
# 02h 0Fh = no authority
# 03h 00h = incorrect gain number
# 03h 01h = invalid gain
# 03h 02h = adjustment failed

- id: error_status
  label: Error Status
  type: bitfield
  description: 12-byte error information. Bit set to 1 = error present.
  fields:
    - name: cover_error
      bit: 0
    - name: temp_error_bimetallic
      bit: 1
    - name: fan_error
      bits: [3, 4]
    - name: power_error
      bit: 5
    - name: lamp_off
      bit: 6
    - name: lamp_moratorium
      bit: 7

- id: power_state
  label: Power State
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]

- id: input_signal_status
  label: Input Signal Status
  type: object
  fields:
    - name: signal_switch_process
    - name: signal_list_number
    - name: selection_signal_type_1
    - name: selection_signal_type_2
    - name: signal_list_type
    - name: test_pattern_displayed
    - name: content_displayed

- id: mute_status
  label: Mute Status
  type: object
  fields:
    - name: picture_mute
      values: [off, on]
    - name: sound_mute
      values: [off, on]
    - name: onscreen_mute
      values: [off, on]
    - name: forced_onscreen_mute
      values: [off, on]
    - name: onscreen_display
      values: [not_displayed, displayed]

- id: model_name
  label: Model Name
  type: string
  description: Up to 32 characters, NUL-terminated.

- id: serial_number
  label: Serial Number
  type: string
  description: Up to 16 characters, NUL-terminated.

- id: lamp_usage_time
  label: Lamp Usage Time
  type: integer
  description: Seconds. Updated at 1-minute intervals.

- id: lamp_remaining_life
  label: Lamp Remaining Life
  type: integer
  description: Percentage. Negative value if replacement deadline exceeded.

- id: filter_usage_time
  label: Filter Usage Time
  type: integer
  description: Seconds.

- id: carbon_savings
  label: Carbon Savings
  type: object
  fields:
    - name: kilograms
      type: integer
      max: 99999
    - name: milligrams
      type: integer
      max: 999999

- id: lens_position
  label: Lens Position
  type: object
  fields:
    - name: upper_limit
    - name: lower_limit
    - name: current_value

- id: gain_parameters
  label: Gain Parameters
  type: object
  fields:
    - name: status
      values: [display_not_possible, adjustment_not_possible, adjustment_possible, gain_not_exist]
    - name: upper_limit
    - name: lower_limit
    - name: default_value
    - name: current_value

- id: eco_mode
  label: Eco Mode
  type: enum
  values: [off, normal, eco, auto_eco, long_life, boost, silent]
  # exact mapping varies by model

- id: projector_name
  label: Projector Name
  type: string
  description: Up to 16 bytes, NUL-terminated.

- id: mac_address
  label: MAC Address
  type: string
  description: 6 bytes in hex format.

- id: pip_pbp_status
  label: PIP/PBP Status
  type: object
  fields:
    - name: mode
      values: [pip, picture_by_picture]
    - name: start_position
      values: [top_left, top_right, bottom_left, bottom_right]
    - name: sub_input_1
    - name: sub_input_2
    - name: sub_input_3

- id: edge_blending_mode
  label: Edge Blending Mode
  type: enum
  values: [off, on]

- id: lens_memory_option
  label: Lens Memory Option
  type: object
  fields:
    - name: load_by_signal
      values: [off, on]
    - name: forced_mute
      values: [off, on]

- id: lens_info
  label: Lens Information
  type: bitfield
  fields:
    - name: lens_memory_operation
      bit: 0
    - name: zoom_operation
      bit: 1
    - name: focus_operation
      bit: 2
    - name: lens_shift_h_operation
      bit: 3
    - name: lens_shift_v_operation
      bit: 4

- id: cover_status
  label: Cover Status
  type: enum
  values: [normal_open, closed]

- id: info_string
  label: Information String
  type: string
  description: NUL-terminated string.

- id: basic_info
  label: Basic Information
  type: object
  fields:
    - name: operation_status
    - name: content_displayed
    - name: selection_signal_type_1
    - name: selection_signal_type_2
    - name: display_signal_type
    - name: video_mute
    - name: sound_mute
    - name: onscreen_mute
    - name: freeze_status

# UNRESOLVED: Response format for SETTING REQUEST (078-1) base model type field not decoded - values are model-specific
```

## Variables
```yaml
# UNRESOLVED: No standalone settable parameters found that are not discrete actions.
# Picture and volume adjustments use action commands rather than persistent variable storage.
# Eco mode uses dedicated SET commands (098-8) rather than variable paradigm.
```

## Events
```yaml
# UNRESOLVED: No unsolicited event/notification mechanism described in source.
# Commands appear to be strictly request-response; the projector does not initiate communication.
```

## Macros
```yaml
# UNRESOLVED: No multi-step macro sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety warnings, interlock procedures, or power-on sequencing
# requirements in source. Serial and LAN standby mode requirements vary by model
# but specific procedures are not documented.
```

## Notes
**Command format:** All commands use hex notation with structure: `[STX] [Command code] [ID1] [ID2] [Data length] [Data...] [Checksum]`. Checksum = low-order byte of sum of all preceding bytes.

**Power timing:** Power on and power off commands block other commands until execution completes (including cooling time for power off).

**Standby mode requirements:** Some models require specific standby modes for serial/LAN control to function. Supported standby modes vary by model: Normal, Active, Eco, NORMAL, NETWORK STANDBY, SLEEP, OFF, ON, STANDBY POWER ON for serial; Normal, NORMAL, NETWORK STANDBY, SLEEP, HDBaseT STANDBY, OFF, ON, STANDBY POWER ON for wired LAN. Some models only support certain modes for LAN vs serial.

**Input terminal codes** vary by model for COMPUTER3, HDMI, HDMI2, SLOT, USB-A, USB DISPLAY, BNC(Y/C). Common fallback values documented in appendix.

**Aspect mode values** vary: some modes have dual hex codes (e.g., LETTER BOX may be 07h or 08h, WIDE SCREEN may be 02h or 03h, FULL may be 09h or 10h).

**Eco mode values** vary significantly by model: Normal may be 00h or 01h, ECO may be 02h or 03h, AUTO ECO is 01h, ON is 01h, BOOST is 05h, SILENT is 06h, LONG LIFE is 04h.

**Selection signal type** values may vary between command contexts — HDMI may be 20h or 1Ah, DVI-D may be 20h, DisplayPort may be 21h or 22h, NETWORK/LAN may be 06h or 20h.

<!-- UNRESOLVED: HDBaseT standby mode details not documented -->
<!-- UNRESOLVED: SDI, USB, VIEWER full command sequences not documented (only listed in input terminal appendix) -->
<!-- UNRESOLVED: Audio select terminal codes vary by model — DATA01 values not fully specified -->
<!-- UNRESOLVED: Flow control configuration for RS-232 not stated in source -->
<!-- UNRESOLVED: Timing constraints between commands not specified (minimum intervals, etc.) -->
<!-- UNRESOLVED: Which models support Lamp 2 commands not enumerated in source -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-04-25T21:33:32.686Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T21:33:32.686Z
matched_actions: 53
action_count: 53
confidence: high
summary: "All 53 spec actions matched to distinct source commands with correct semantics; all transport parameters present in source."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
