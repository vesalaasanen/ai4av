---
schema_version: ai4av-public-spec-v1
device_id: nec/p462-avt-r-series
entity_id: nec_p462_avt_r_series
spec_id: admin/nec-p462-avt-r-series
revision: 1
author: admin
title: "NEC P462-AVT-R Series Control Spec"
status: published
manufacturer: NEC
manufacturer_key: nec
model_family: "P462-AVT-R Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "P462-AVT-R Series"
  firmware: "\"\" # UNRESOLVED: firmware version not stated in source"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: nec_p462_avt_r_series_serial.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-26T21:18:37.678Z
retrieved_at: 2026-04-26T21:18:37.678Z
last_checked_at: 2026-04-26T21:18:37.678Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "\"\" # UNRESOLVED: firmware version not stated in source"
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-26T21:18:37.678Z
  matched_actions: 46
  action_count: 46
  confidence: high
  summary: "All 46 spec actions have literal one-to-one matches in source commands; transport parameters verified; source command set fully represented."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# NEC P462-AVT-R Series Control Spec

## Summary
NEC P462-AVT-R Series professional projector supporting both RS-232C serial and wired LAN (TCP/IP) control. The projector exposes power control, input routing, picture/sound mute, volume adjustment, lens control, eco mode, and comprehensive status querying via hexadecimal command/response protocol with checksum validation.

<!-- UNRESOLVED: LAN authentication mechanism not documented in source -->
<!-- UNRESOLVED: precise input terminal hex codes vary by model; common values listed in appendix -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # highest; also supports 38400/19200/9600/4800 bps
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not explicitly stated
addressing:
  port: 7142  # TCP port for LAN control; no port stated for serial
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # POWER ON / POWER OFF commands present
- routable        # INPUT SW CHANGE command present
- queryable       # multiple status/information request commands present
- levelable       # VOLUME ADJUST, PICTURE ADJUST commands present
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []

- id: power_off
  label: Power Off
  kind: action
  params: []

- id: input_sw_change
  label: Input Switch Change
  kind: action
  params:
    - name: input
      type: integer
      description: Input terminal hex code (e.g., 06h=VIDEO, 01h=COMPUTER, A1h=HDMI)

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  params: []

- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  params: []

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  params: []

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  params: []

- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  params: []

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
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: mode
      type: integer
      description: "00h=Absolute value, 01h=Relative value"
    - name: value
      type: integer
      description: Adjustment value (16-bit, low-order then high-order)

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=Absolute value, 01h=Relative value"
    - name: value
      type: integer
      description: Volume value (16-bit, low-order then high-order)

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: aspect
      type: integer
      description: "Aspect mode hex code: 00h=AUTO, 01h=WIDE ZOOM, 02h=16:9, 03h=NATIVE, 04h=4:3, 05h=15:9, 06h=16:10, 07h=LETTER BOX, 09h=FULL"

- id: other_adjust
  label: Other Adjust (Lamp/Light)
  kind: action
  params:
    - name: target
      type: integer
      description: "96h FFh = LAMP ADJUST / LIGHT ADJUST"
    - name: mode
      type: integer
      description: "00h=Absolute value, 01h=Relative value"
    - name: value
      type: integer
      description: Adjustment value (16-bit)

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: "Key code (WORD): 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO"

- id: shutter_close
  label: Shutter Close
  kind: action
  params: []

- id: shutter_open
  label: Shutter Open
  kind: action
  params: []

- id: lens_control
  label: Lens Control
  kind: action
  params:
    - name: target
      type: integer
      description: "06h=Periphery Focus"
    - name: direction
      type: integer
      description: "00h=Stop, 01h=Drive 1s plus, 02h=Drive 0.5s plus, 03h=Drive 0.25s plus, 7Fh=Drive plus, 81h=Drive minus, FDh=Drive 0.25s minus, FEh=Drive 0.5s minus, FFh=Drive 1s minus"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: action
      type: integer
      description: "FFh=Stop"
    - name: mode
      type: integer
      description: "00h=Absolute value, 02h=Relative value"
    - name: value
      type: integer
      description: 16-bit adjustment value

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

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

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  params:
    - name: profile
      type: integer
      description: "00h=Profile 1, 01h=Profile 2"

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: state
      type: integer
      description: "01h=Freeze on, 02h=Freeze off"

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: "Eco mode hex code: 00h=OFF, 01h=ON/NORMAL, 02h=ECO1, 03h=ECO2, 04h=LONG LIFE, 05h=BOOST, 06h=SILENT"

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  params:
    - name: name
      type: string
      description: Projector name (up to 16 bytes, NUL-terminated)

- id: pip_picture_by_picture_set
  label: PIP/Picture by Picture Set
  kind: action
  params:
    - name: target
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: integer
      description: Setting value (mode: 00h=PIP, 01h=PICTURE BY PICTURE; position: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT)

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=OFF, 01h=ON"

- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: input
      type: integer
      description: Input terminal hex code
    - name: source
      type: integer
      description: "Audio source: 00h=HDMI1, 01h=HDMI2, 02h=DisplayPort, 03h=HDBaseT, 04h=USB-A, 05h=USB-B"

# UNRESOLVED: commands 053-3 through 053-11 detailed in source but not fully enumerated as actions above
- id: information_request
  label: Information Request
  kind: query
  params: []

- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  params: []

- id: lamp_information_request
  label: Lamp Information Request
  kind: query
  params: []

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  params: []

- id: lens_control_request
  label: Lens Control Status Request
  kind: query
  params: []

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  params: []

- id: lens_information_request
  label: Lens Information Request
  kind: query
  params: []

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  params: []

- id: gain_parameter_request
  label: Gain Parameter Request
  kind: query
  params: []

- id: setting_request
  label: Setting Request
  kind: query
  params: []

- id: running_status_request
  label: Running Status Request
  kind: query
  params: []

- id: input_status_request
  label: Input Status Request
  kind: query
  params: []

- id: mute_status_request
  label: Mute Status Request
  kind: query
  params: []

- id: model_name_request
  label: Model Name Request
  kind: query
  params: []

- id: cover_status_request
  label: Cover Status Request
  kind: query
  params: []

- id: information_string_request
  label: Information String Request
  kind: query
  params: []

- id: eco_mode_request
  label: Eco Mode Status Request
  kind: query
  params: []

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  params: []
```

## Feedbacks
```yaml
- id: error_status
  label: Error Status
  type: bitfield
  description: Returns error information as bitmapped status (9 data bytes). Covers fan errors, temperature errors, lamp status, cover status, power errors, and extended status.

- id: running_status
  label: Running Status
  type: object
  properties:
    - name: power_status
      type: enum
      values: [standby, power_on]
    - name: cooling_status
      type: enum
      values: [not_executed, during_execution]
    - name: power_process
      type: enum
      values: [not_executed, during_execution]
    - name: operation_status
      type: enum
      values: [standby_sleep, standby_power_saving, power_on, cooling, standby_error, network_standby]

- id: input_status
  label: Input Status
  type: object
  properties:
    - name: signal_switch_status
      type: enum
      values: [not_executed, during_execution]
    - name: signal_list_number
      type: integer
    - name: signal_type_1
      type: integer
    - name: signal_type_2
      type: integer
    - name: content_displayed
      type: enum
      values: [video_signal, no_signal, viewer_displayed, test_pattern, lan_displayed]

- id: mute_status
  label: Mute Status
  type: object
  properties:
    - name: picture_mute
      type: boolean
    - name: sound_mute
      type: boolean
    - name: onscreen_mute
      type: boolean
    - name: forced_onscreen_mute
      type: boolean
    - name: onscreen_display
      type: boolean

- id: model_name
  label: Model Name
  type: string
  description: Model name as NUL-terminated string

- id: cover_status
  label: Cover Status
  type: enum
  values: [normal, cover_closed]

- id: projector_info
  label: Projector Information
  type: object
  properties:
    - name: projector_name
      type: string
    - name: lamp_usage_time
      type: integer
      description: Seconds (updated at 1-minute intervals)
    - name: filter_usage_time
      type: integer
      description: Seconds (updated at 1-minute intervals)

- id: lamp_info
  label: Lamp Information
  type: object
  properties:
    - name: lamp_number
      type: integer
      description: "00h=Lamp 1, 01h=Lamp 2"
    - name: usage_time
      type: integer
      description: Seconds
    - name: remaining_life
      type: integer
      description: Percentage (negative if replacement deadline exceeded)

- id: filter_usage_info
  label: Filter Usage Information
  type: object
  properties:
    - name: filter_usage_time
      type: integer
      description: Seconds
    - name: filter_alarm_start_time
      type: integer
      description: Seconds (-1 if not defined)

- id: carbon_savings_info
  label: Carbon Savings Information
  type: object
  properties:
    - name: type
      type: enum
      values: [total, during_operation]
    - name: kilograms
      type: integer
      description: Maximum 99999 kg
    - name: milligrams
      type: integer
      description: Maximum 999999 mg

- id: lens_position
  label: Lens Position
  type: object
  properties:
    - name: upper_limit
      type: integer
    - name: lower_limit
      type: integer
    - name: current_value
      type: integer

- id: lens_memory_option
  label: Lens Memory Option
  type: object
  properties:
    - name: load_by_signal
      type: boolean
    - name: forced_mute
      type: boolean

- id: lens_profile
  label: Lens Profile
  type: enum
  values: [profile_1, profile_2]

- id: gain_parameter
  label: Gain Parameter
  type: object
  description: Returns adjustment range and current value for picture, volume, lamp adjust

- id: eco_mode
  label: Eco Mode
  type: integer
  description: Current eco mode hex code

- id: lan_projector_name
  label: LAN Projector Name
  type: string

- id: lan_mac_address
  label: LAN MAC Address
  type: string
  description: MAC address as hex bytes

- id: pip_picture_by_picture
  label: PIP/Picture by Picture
  type: object
  properties:
    - name: mode
      type: enum
      values: [pip, picture_by_picture]
    - name: position
      type: enum
      values: [top_left, top_right, bottom_left, bottom_right]
    - name: sub_input
      type: integer

- id: edge_blending_mode
  label: Edge Blending Mode
  type: boolean

- id: serial_number
  label: Serial Number
  type: string

- id: base_model_type
  label: Base Model Type
  type: string

- id: basic_info
  label: Basic Information
  type: object
  properties:
    - name: operation_status
      type: enum
    - name: content_displayed
      type: enum
    - name: video_mute
      type: boolean
    - name: sound_mute
      type: boolean
    - name: freeze_status
      type: boolean

- id: information_string
  label: Information String
  type: string
  description: Horizontal or vertical sync frequency as NUL-terminated string

- id: execution_result
  label: Execution Result
  type: enum
  values: [success, error]
  description: General command execution result returned in DATA01/DATA02

- id: response_error
  label: Response Error
  type: object
  properties:
    - name: err1
      type: integer
      description: Primary error code
    - name: err2
      type: integer
      description: Secondary error code
  description: Error codes 00h/00h=Unrecognized, 00h/01h=Unsupported, 01h/00h=Invalid value, 01h/01h=Invalid input, 01h/02h=Invalid language, 02h/00h=Memory alloc, 02h/02h=Memory in use, 02h/03h=Cannot set, 02h/04h=Forced onscreen mute, 02h/06h=Viewer error, 02h/07h=No signal, 02h/08h=Test pattern, 02h/09h=No PC card, 02h/0Ah=Memory error, 02h/0Ch=Entry list displayed, 02h/0Dh=Power off, 02h/0Eh=Command failed, 02h/0Fh=No authority, 03h/00h=Incorrect gain number, 03h/01h=Invalid gain, 03h/02h=Adjustment failed
```

## Variables
```yaml
# UNRESOLVED: variables are primarily controlled via action parameters;
# no standalone settable parameters documented beyond those in Actions
```

## Events
```yaml
# UNRESOLVED: no unsolicited event/notification mechanism described in source;
# device only responds to commands sent to it
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for:
  - power_on    # While power is turning on, no other command can be accepted
  - power_off    # While power is turning off (including cooling time), no other command can be accepted
interlocks: []
# UNRESOLVED: some models require specific standby modes for serial/LAN control;
# interlock switch status exposed via error status bit but no interlock procedure stated
# UNRESOLVED: HDBaseT standby mode not available on all models
```

## Notes
The protocol uses a hexadecimal command structure with variable-length data and checksum validation. Commands begin with a header byte (02h for actions, 00h/03h for queries), followed by model-specific bytes, data length, variable data, and a checksum calculated as the low-order byte of the sum of all preceding bytes.

Some models require specific standby modes to accept serial or LAN commands. Supported standby modes vary: Normal, Active, Eco, Network Standby, Sleep, Off, On, Standby Power On for serial; additional HDBaseT Standby for LAN.

Input terminal hex codes vary across models; the appendix provides common values but some codes differ (e.g., COMPUTER3 is 1Ah or 03h, HDMI is A1h or 1Ah).

<!-- UNRESOLVED: LAN authentication mechanism not documented; no password or login procedure in source -->
<!-- UNRESOLVED: precise input terminal hex codes vary by model - appendix lists common values only -->
<!-- UNRESOLVED: standby mode requirements vary by model - specific requirements not enumerated -->
<!-- UNRESOLVED: DATA01-DATA12 field semantics for ERROR STATUS REQUEST sourced from bit table but mapping to exact model behavior unverified -->
<!-- UNRESOLVED: information request commands return reserved/undefined bytes; practical usage unclear -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: nec_p462_avt_r_series_serial.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-26T21:18:37.678Z
retrieved_at: 2026-04-26T21:18:37.678Z
last_checked_at: 2026-04-26T21:18:37.678Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-26T21:18:37.678Z
matched_actions: 46
action_count: 46
confidence: high
summary: "All 46 spec actions have literal one-to-one matches in source commands; transport parameters verified; source command set fully represented."
```

## Known Gaps

```yaml
[]
```
