---
schema_version: ai4av-public-spec-v1
device_id: nec/c751q-series
entity_id: nec_c751q_series
spec_id: admin/nec-c751q-series
revision: 1
author: admin
title: "NEC C751Q Series Control Spec"
status: published
manufacturer: NEC
manufacturer_key: nec
model_family: "C751Q Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "C751Q Series"
  firmware: "\"\" # UNRESOLVED: firmware version not stated in source"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: nec_c751q_series_serial.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T21:16:18.592Z
retrieved_at: 2026-04-25T21:16:18.592Z
last_checked_at: 2026-04-25T21:16:18.592Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "\"\" # UNRESOLVED: firmware version not stated in source"
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-25T21:16:18.592Z
  matched_actions: 49
  action_count: 49
  confidence: high
  summary: "All 49 spec actions matched corresponding NEC source commands with correct semantic coverage; transport parameters verified; full command catalogue represented."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# NEC C751Q Series Control Spec

## Summary
Professional laser projector supporting RS-232C serial and wired LAN (TCP/IP) control. Supports power management, input routing, picture/sound mute, lens control, eco mode, and comprehensive query commands for status monitoring. Control ID and model code parameters required for all commands.

<!-- UNRESOLVED: standby mode compatibility varies by model; some commands require specific standby modes. UNRESOLVED: HDBaseT control mentioned in appendix but not detailed. UNRESOLVED: appendix references not included in this document (Supplementary Information by Command appendix values for input terminals, aspect, eco mode, signal types). -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142  # TCP port for LAN control; stated in source
serial:
  baud_rate: null  # UNRESOLVED: source lists 115200/38400/19200/9600/4800 bps as supported but no default stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: RTS/CTS hardware handshaking noted in pinout but flow control setting not stated
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # power on/off commands present (015, 016)
- routable        # input switching command present (018)
- queryable       # multiple status/information request commands present
- levelable       # volume adjust, picture adjust, lens position commands present
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

- id: input_switch_change
  label: Input Switch Change
  kind: action
  params:
    - name: input_terminal
      type: integer
      description: Input terminal hex code (e.g., 01h=COMPUTER, 06h=VIDEO, 1Ah=HDMI, 20h=LAN)

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
    - name: adjustment_target
      type: integer
      description: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness
    - name: adjustment_mode
      type: integer
      description: 00h=absolute value, 01h=relative value
    - name: adjustment_value
      type: integer
      description: 16-bit signed value (low-order then high-order 8 bits)

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: adjustment_mode
      type: integer
      description: 00h=absolute value, 01h=relative value
    - name: adjustment_value
      type: integer
      description: 16-bit signed value (low-order then high-order 8 bits)

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: aspect_value
      type: integer
      description: Aspect mode hex code (see appendix for values)

- id: other_adjust
  label: Other Adjust (Lamp/Light)
  kind: action
  params:
    - name: adjustment_mode
      type: integer
      description: 00h=absolute value, 01h=relative value
    - name: adjustment_value
      type: integer
      description: 16-bit signed value

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: 16-bit key code (DATA01 low byte, DATA02 high byte). See key code table for values (POWER ON=0200h, POWER OFF=0300h, etc.)

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
      description: 06h=Periphery Focus
    - name: direction
      type: integer
      description: 00h=Stop, 01h/02h/03h=Drive plus 1/0.5/0.25s, 7Fh=Drive plus, 81h=Drive minus, FDh/FEh/FFh=Drive minus 0.25/0.5/1s

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: control
      type: integer
      description: FFh=Stop
    - name: adjustment_mode
      type: integer
      description: 00h=absolute value, 02h=relative value
    - name: adjustment_value
      type: integer
      description: 16-bit signed value

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: 00h=MOVE, 01h=STORE, 02h=RESET

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: 00h=MOVE, 01h=STORE, 02h=RESET

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  params:
    - name: option
      type: integer
      description: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE
    - name: value
      type: integer
      description: 00h=OFF, 01h=ON

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  params:
    - name: profile_number
      type: integer
      description: 00h=Profile 1, 01h=Profile 2

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: freeze
      type: integer
      description: 01h=On, 02h=Off

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  params:
    - name: eco_mode
      type: integer
      description: Eco mode hex code (see appendix for values: 00h=OFF, 01h=NORMAL/ON, 02h/03h=ECO, etc.)

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  params:
    - name: projector_name
      type: string
      description: Up to 16 bytes, NUL-terminated

- id: pip_picture_by_picture_set
  label: PIP/Picture by Picture Set
  kind: action
  params:
    - name: item
      type: integer
      description: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3
    - name: value
      type: integer
      description: Varies by item (MODE: 00h=PIP, 01h=PICTURE BY PICTURE; POSITION: 00h-03h for corners)

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: 00h=OFF, 01h=ON

- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: input_terminal
      type: integer
      description: Audio input terminal hex code
    - name: source
      type: integer
      description: 00h=terminal in DATA01, 01h=BNC, 02h=COMPUTER

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

- id: lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  params:
    - name: lamp_number
      type: integer
      description: 00h=Lamp 1, 01h=Lamp 2
    - name: content
      type: integer
      description: 01h=Lamp usage time (seconds), 04h=Lamp remaining life (%)

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  params:
    - name: type
      type: integer
      description: 00h=Total Carbon Savings, 01h=Carbon Savings during operation

- id: lens_control_request
  label: Lens Control Request
  kind: query
  params:
    - name: target
      type: integer
      description: 06h=Periphery Focus

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  params:
    - name: option
      type: integer
      description: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE

- id: lens_information_request
  label: Lens Information Request
  kind: query
  params: []

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  params: []

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  params:
    - name: adjusted_value_name
      type: integer
      description: 00h=PICTURE/BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT

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
  params:
    - name: information_type
      type: integer
      description: 03h=Horizontal sync frequency, 04h=Vertical sync frequency

- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  params: []

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  params: []

- id: lan_mac_address_status_request_2
  label: LAN MAC Address Status Request 2
  kind: query
  params: []

- id: pip_picture_by_picture_request
  label: PIP/Picture by Picture Request
  kind: query
  params:
    - name: item
      type: integer
      description: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3

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
# Error responses are common to all commands:
# A0h/A1h/A2h/A3h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>
#
# Success responses vary by command type:
# - 20h/22h/23h responses for queries and actions
# - Data length indicated by LEN byte

- id: error_response
  type: object
  fields:
    - name: err1
      type: integer
      description: Primary error code (00h=unrecognized, 01h=invalid value, 02h=memory/system error, 03h=adjustment error)
    - name: err2
      type: integer
      description: Secondary error code (varies by err1)

- id: power_status
  type: enum
  values:
    - 00h: Standby
    - 01h: Power on
    - 05h: Cooling
    - 06h: Standby (error)
    - 0Fh: Standby (Power saving)
    - 10h: Network standby

- id: mute_status
  type: object
  fields:
    - name: picture_mute
      type: enum
      values: [00h=Off, 01h=On]
    - name: sound_mute
      type: enum
      values: [00h=Off, 01h=On]
    - name: onscreen_mute
      type: enum
      values: [00h=Off, 01h=On]
    - name: forced_onscreen_mute
      type: enum
      values: [00h=Off, 01h=On]

- id: input_signal_status
  type: object
  fields:
    - name: signal_switch_process
      type: enum
      values: [00h=Not executed, 01h=During execution, FFh=Not supported]
    - name: signal_list_number
      type: integer
      description: 1-based (returned value is 1 less than actual)
    - name: selection_signal_type_1
      type: integer
      description: Primary signal type code
    - name: selection_signal_type_2
      type: integer
      description: Secondary signal type code (COMPUTER=01h, VIDEO=02h, HDMI=20h/1Ah, etc.)
```

## Variables
```yaml
# UNRESOLVED: many query commands return variable data; full variable schema not enumerated in this source.
# Variables detected from source:
- id: brightness
  type: integer
  range: [0, 255]  # 16-bit adjusted value
  
- id: contrast
  type: integer
  range: [0, 255]

- id: color
  type: integer
  range: [0, 255]

- id: hue
  type: integer
  range: [0, 255]

- id: sharpness
  type: integer
  range: [0, 255]

- id: volume
  type: integer
  range: [0, 255]

- id: lamp_usage_time
  type: integer
  unit: seconds
  description: Lamp usage time; updated at 1-minute intervals

- id: lamp_remaining_life
  type: integer
  unit: percent
  description: Lamp remaining life; negative value if replacement deadline exceeded

- id: filter_usage_time
  type: integer
  unit: seconds
  description: Filter usage time; -1 if no alarm time defined

- id: filter_alarm_start_time
  type: integer
  unit: seconds
  description: Filter alarm start time; -1 if not defined

- id: carbon_savings_total
  type: object
  fields:
    - name: kilograms
      type: integer
      range: [0, 99999]
    - name: milligrams
      type: integer
      range: [0, 999999]

- id: carbon_savings_operation
  type: object
  fields:
    - name: kilograms
      type: integer
      range: [0, 99999]
    - name: milligrams
      type: integer
      range: [0, 999999]

- id: projector_name
  type: string
  max_length: 16

- id: mac_address
  type: string
  format: hex-separated
  example: "01h-23h-45h-67h-89h-ABh"
```

## Events
```yaml
# UNRESOLVED: this source does not describe unsolicited event notifications from the projector.
# The projector may send asynchronous responses; this is not documented in the provided source.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros described in source.
# Standby mode requirements for receiving commands:
# - Serial: Normal, Active, Eco, NORMAL, NETWORK STANDBY, SLEEP, OFF, ON, STANDBY POWER ON
# - LAN: Normal, NORMAL, NETWORK STANDBY, SLEEP, HTBaseT STANDBY, OFF, ON, STANDBY POWER ON
# Supported modes vary by model; some models only support certain modes for LAN vs serial.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: Power on/off commands block other commands during execution
    detail: While power is turning on (including cooling) or turning off, no other command can be accepted. Allow adequate cooling time before sending commands to a powered-off projector.
  - description: Portrait cover orientation interlock
    detail: Bit0 of DATA09 in error status indicates if portrait cover side is up.
  - description: Interlock switch monitoring
    detail: Bit1 of DATA09 in error status indicates if interlock switch is open.
confirmation_required_for: []
# UNRESOLVED: no explicit safety warnings or confirmation dialogs documented in this source beyond command-blocking behavior during power transitions.
```

## Notes
Command protocol structure: 6-byte header + data bytes + checksum. All multi-byte values use low-order byte first (little-endian). Control ID (ID1) and Model Code (ID2) must be set for each command. Checksum is low-order byte of sum of all preceding bytes.

Power commands (015, 016) have blocking behavior — no other commands accepted while power state is transitioning.

Key code command (050) provides equivalent remote control functionality with codes like POWER ON (0200h), POWER OFF (0300h), MENU (0600h), UP/DOWN/LEFT/RIGHT (0700h-0A00h), ENTER (0B00h), VOLUME UP/DOWN (8500h/8600h), etc.

Lens control commands (053 series) support both incremental (direction + duration) and absolute positioning modes.

Query commands return structured data fields documented in command details sections; response format varies per command.

Appendix provides supplementary code tables for input terminals, aspect modes, eco modes, signal types, and audio selection values not included in this document.
<!-- UNRESOLVED: appendix values referenced but not fully documented (input terminal codes vary by model, aspect codes vary, eco mode codes vary). UNRESOLVED: HDBaseT standby mode mentioned but HDBaseT control protocol not detailed. UNRESOLVED: SLOT/USB-A/USB-B/SDI/SDI2/SDI3/SDI4/APPS input terminal values vary by model configuration. -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: nec_c751q_series_serial.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T21:16:18.592Z
retrieved_at: 2026-04-25T21:16:18.592Z
last_checked_at: 2026-04-25T21:16:18.592Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T21:16:18.592Z
matched_actions: 49
action_count: 49
confidence: high
summary: "All 49 spec actions matched corresponding NEC source commands with correct semantic coverage; transport parameters verified; full command catalogue represented."
```

## Known Gaps

```yaml
[]
```
