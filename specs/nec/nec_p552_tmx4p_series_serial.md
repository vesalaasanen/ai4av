---
spec_id: admin/nec-p552-tmx4p-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC P552-TMX4P Series Control Spec"
manufacturer: NEC
model_family: P552-TMX4P
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - P552-TMX4P
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-04-26T21:21:50.425Z
generated_at: 2026-04-26T21:21:50.425Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-26T21:21:50.425Z
  matched_actions: 53
  action_count: 53
  confidence: high
  summary: "All 53 spec actions match source commands 1:1; transport parameters verified verbatim."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# NEC P552-TMX4P Series Control Spec

## Summary
NEC professional projector supporting both RS-232C serial and wired TCP/IP control interfaces. The projector accepts structured hex command packets with checksum validation and returns acknowledgements with error codes. Supports power control, input routing, picture/sound muting, lens positioning, and comprehensive status queries.

<!-- UNRESOLVED: HDBaseT, wireless LAN, and extended serial communication protocols not covered in this source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142  # stated: TCP port number for sending and receiving commands
serial:
  baud_rate: 115200  # stated: supports 115200/38400/19200/9600/4800 bps
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not explicitly stated
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred: POWER ON (015) and POWER OFF (016) commands present
- routable        # inferred: INPUT SW CHANGE (018) present
- queryable       # inferred: multiple status/information request commands present
- levelable       # inferred: VOLUME ADJUST (030-2), PICTURE ADJUST (030-1), PICTURE MUTE, SOUND MUTE present
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
    - name: input_terminal
      type: integer
      description: Input terminal hex code (e.g., 01h=COMPUTER, 06h=VIDEO, A1h=HDMI)

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
      description: Adjustment target (00h=brightness, 01h=contrast, 02h=color, 03h=hue, 04h=sharpness)
    - name: mode
      type: integer
      description: "00h=absolute, 01h=relative"
    - name: value
      type: integer
      description: Adjustment value (16-bit, low-order byte first)

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=absolute, 01h=relative"
    - name: value
      type: integer
      description: Adjustment value (16-bit, low-order byte first)

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: aspect_value
      type: integer
      description: Aspect mode hex code (00h=AUTO, 01h=WIDE ZOOM, 02h=16:9, etc.)

- id: lamp_adjust
  label: Lamp/Light Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=absolute, 01h=relative"
    - name: value
      type: integer
      description: Adjustment value (16-bit, low-order byte first)

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: Key code (e.g., 02h=POWER ON, 05h=AUTO, 06h=MENU, 29h=MUTE)

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
      description: "00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=cont+, 81h=cont-, FDh=-0.25s, FEh=-0.5s, FFh=-1s"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: command
      type: integer
      description: "FFh=Stop, otherwise mode+value"
    - name: mode
      type: integer
      description: "00h=absolute, 02h=relative"
    - name: value
      type: integer
      description: Adjustment value (16-bit, low-order byte first)

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

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: Eco mode hex code (00h=OFF, 01h=NORMAL/AUTO, 02h=ECO1, 03h=ECO2, 04h=LONG LIFE, 05h=BOOST, 06h=SILENT)

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  params:
    - name: name
      type: string
      description: Projector name (up to 16 bytes, NUL-terminated)

- id: pip_pbp_set
  label: PIP/Picture-by-Picture Set
  kind: action
  params:
    - name: parameter
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: integer
      description: Setting value for the parameter

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
    - name: input_terminal
      type: integer
      description: Input terminal for audio selection
    - name: source
      type: integer
      description: "00h=HDMI1, 01h=HDMI2, 02h=DisplayPort, 03h=HDBaseT, 04h=USB-A, 05h=USB-B"

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: state
      type: integer
      description: "01h=ON, 02h=OFF"
- id: error_status_request
  label: Error Status Request
  kind: query
  params: []

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

- id: lan_mac_address_request
  label: LAN MAC Address Request
  kind: query
  params: []

- id: pip_picture_by_picture_request
  label: PIP/Picture-by-Picture Status Request
  kind: query
  params: []

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  params: []

- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  params: []

- id: serial_number_request
  label: Serial Number Request
  kind: query
  params: []

- id: basic_information_request
  label: Basic Information Request
  kind: query
  params: []
```

## Feedbacks
```yaml
- id: error_status
  type: object
  description: Error status bits (DATA01-DATA12)
  fields:
    - name: cover_error
      type: boolean
      bit: DATA01.0
    - name: temperature_error_bimetallic
      type: boolean
      bit: DATA01.1
    - name: fan_error_1
      type: boolean
      bit: DATA01.3
    - name: fan_error_2
      type: boolean
      bit: DATA01.4
    - name: power_error
      type: boolean
      bit: DATA01.5
    - name: lamp_or_backlight_off
      type: boolean
      bit: DATA01.6
    - name: lamp_replacement_moratorium
      type: boolean
      bit: DATA01.7
    # Additional bits detailed in source

- id: command_response
  type: enum
  values:
    - success
    - error
  description: Standard command acknowledgement with ERR1/ERR2 codes

- id: power_status
  type: enum
  values:
    - standby
    - power_on
    - cooling
    - network_standby
  # UNRESOLVED: detailed power state mapping requires further reference

- id: mute_status
  type: object
  fields:
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

- id: input_status
  type: object
  fields:
    - name: signal_switch_process
      type: enum
      values: [not_executed, in_progress]
    - name: signal_list_number
      type: integer
    - name: signal_type
      type: enum
      values: [computer, video, s_video, component, hdmi, dvi_d, displayport, viewer, lan, hdbaset, sdi]
    - name: content_displayed
      type: enum
      values: [video_signal, no_signal, viewer, test_pattern, lan_displayed]

- id: projector_info
  type: object
  description: Information request response (037)
  fields:
    - name: projector_name
      type: string
    - name: lamp_usage_time
      type: integer
      description: Seconds
    - name: filter_usage_time
      type: integer
      description: Seconds

- id: lamp_info
  type: object
  description: Lamp information response (037-4)
  fields:
    - name: lamp_number
      type: integer
      description: "00h=Lamp 1, 01h=Lamp 2"
    - name: usage_time
      type: integer
      description: Seconds
    - name: remaining_life
      type: integer
      description: Percentage

- id: filter_info
  type: object
  description: Filter usage information (037-3)
  fields:
    - name: usage_time
      type: integer
      description: Seconds
    - name: alarm_start_time
      type: integer
      description: Seconds, -1 if undefined

- id: carbon_savings
  type: object
  description: Carbon savings information (037-6)
  fields:
    - name: type
      type: enum
      values: [total, during_operation]
    - name: kg
      type: number
      description: Kilograms (max 99999)
    - name: mg
      type: number
      description: Milligrams (max 999999)

- id: model_name
  type: string
  description: Model name from 078-5

- id: serial_number
  type: string
  description: Serial number from 305-2

- id: mac_address
  type: string
  description: MAC address (hex) from 097-155

- id: eco_mode
  type: enum
  values: [off, normal, eco1, eco2, auto_eco, long_life, boost, silent]

- id: lens_position
  type: object
  description: Lens position from 053-1
  fields:
    - name: upper_limit
      type: integer
    - name: lower_limit
      type: integer
    - name: current_value
      type: integer

- id: lens_memory_option
  type: object
  description: Lens memory option from 053-5
  fields:
    - name: load_by_signal
      type: boolean
    - name: forced_mute
      type: boolean

- id: lens_profile
  type: integer
  description: Selected profile number (053-11)

- id: pip_pbp
  type: object
  description: PIP/PBP settings (097-198)
  fields:
    - name: mode
      type: enum
      values: [pip, picture_by_picture]
    - name: start_position
      type: enum
      values: [top_left, top_right, bottom_left, bottom_right]

- id: edge_blending_mode
  type: boolean

- id: basic_info
  type: object
  description: Basic information from 305-3
  fields:
    - name: operation_status
      type: enum
    - name: content_displayed
      type: enum
    - name: signal_type_1
      type: enum
    - name: signal_type_2
      type: enum
    - name: video_mute
      type: boolean
    - name: sound_mute
      type: boolean
    - name: onscreen_mute
      type: boolean
    - name: freeze_status
      type: boolean
```

## Variables
```yaml
# UNRESOLVED: variable parameters not explicitly separated from actions in source
# Many settable parameters are implemented as action commands (eco mode set, projector name set, etc.)
```

## Events
```yaml
# UNRESOLVED: no unsolicited event descriptions found in source
# The projector appears to be command-response only (polled, not push)
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "While POWER ON command (015) is executing, no other command can be accepted."
  - description: "While POWER OFF command (016) is executing (including cooling time), no other command can be accepted."
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing requirements stated beyond command blocking notes
```

## Notes
Command packet format: `20h <ID1> <ID2> 0Ch <DATA01>-<DATA12> <CKS>` — all values in hexadecimal. Checksum (CKS) is low-order byte of sum of all preceding bytes.

Response format for errors includes ERR1 and ERR2 codes (see error code table in source).

Serial cable wiring: RxD on pin 2, TxD on pin 3, GND on pin 5, RTS/CTS on pins 7/8 (full duplex).

Supported standby modes for receiving commands vary by model — some models require specific standby mode (Normal, Active, Eco, Network Standby, Sleep, etc.) to be set before serial or LAN control will function.

<!-- UNRESOLVED: HDBaseT standby mode and wireless LAN control not documented in source -->
<!-- UNRESOLVED: extended serial communication protocol not covered -->
<!-- UNRESOLVED: firmware version compatibility not stated -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-04-26T21:21:50.425Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-26T21:21:50.425Z
matched_actions: 53
action_count: 53
confidence: high
summary: "All 53 spec actions match source commands 1:1; transport parameters verified verbatim."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
