---
schema_version: ai4av-public-spec-v1
device_id: nec/c651q-avt2-series
entity_id: nec_c651q_avt2_series
spec_id: admin/nec-c651q-avt2-series
revision: 1
author: admin
title: "NEC C651Q-AVT2 Series Control Spec"
status: published
manufacturer: NEC
manufacturer_key: nec
model_family: "C651Q-AVT2 Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "C651Q-AVT2 Series"
  firmware: ""  # UNRESOLVED: firmware version not stated in source
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: nec_c651q_avt2_series_serial.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T21:15:13.045Z
retrieved_at: 2026-04-25T21:15:13.045Z
last_checked_at: 2026-04-25T21:15:13.045Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: ""  # UNRESOLVED: firmware version not stated in source
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-25T21:15:13.045Z
  matched_actions: 53
  action_count: 53
  confidence: high
  summary: "All 53 spec actions map to literal wire-level commands in source with exact opcode matches; transport parameters (port 7142, RS-232C) verified verbatim."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# NEC C651Q-AVT2 Series Control Spec

## Summary
NEC C651Q-AVT2 Series professional projector supporting both RS-232C serial and wired LAN (TCP/IP) control interfaces. The serial interface supports multiple baud rates (115200/38400/19200/9600/4800 bps), 8 data bits, no parity, 1 stop bit. The LAN interface uses TCP port 7142. No authentication procedure is described in the source.

<!-- UNRESOLVED: complete list of compatible models within the C651Q-AVT2 Series not enumerated in source -->
<!-- UNRESOLVED: HDBaseT standby mode requirements not fully specified -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: null  # UNRESOLVED: multiple rates supported (115200/38400/19200/9600/4800); no default stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not documented
addressing:
  port: 7142  # TCP port for LAN control
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # POWER ON (015), POWER OFF (016) commands present
- routable        # INPUT SW CHANGE (018) command present
- queryable       # INFORMATION REQUEST (037), STATUS REQUEST (078-x) commands present
- levelable       # VOLUME ADJUST (030-2), PICTURE ADJUST (030-1), GAIN PARAMETER REQUEST (060-1) present
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
  description: Turns on projector power. No other commands accepted during power-on sequence.
  command_hex: "02h 00h 00h 00h 00h 02h"
  response_hex: "A2h 00h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"

- id: power_off
  label: Power Off
  kind: action
  params: []
  description: Turns off projector power. No other commands accepted during cooling period.
  command_hex: "02h 01h 00h 00h 00h 03h"
  response_hex: "A2h 01h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"

- id: input_sw_change
  label: Input Switch Change
  kind: action
  params:
    - name: input_terminal
      type: integer
      description: Input terminal hex code (e.g., 01h=COMPUTER, 06h=VIDEO, A1h=HDMI, 20h=LAN)
  command_hex: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  params: []
  description: Turns picture mute on. Automatically cleared on input/signal switch.
  command_hex: "02h 10h 00h 00h 00h 12h"

- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  params: []

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  params: []
  description: Turns sound mute on. Automatically cleared on input/signal switch or volume adjustment.
  command_hex: "02h 12h 00h 00h 00h 14h"

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  params: []

- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  params: []
  command_hex: "02h 14h 00h 00h 00h 16h"

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
      description: 00h=Absolute value, 01h=Relative value
    - name: adjustment_value
      type: integer
      description: 16-bit signed value (low-order byte first)

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: adjustment_mode
      type: integer
      description: 00h=Absolute value, 01h=Relative value
    - name: adjustment_value
      type: integer
      description: 16-bit signed value (low-order byte first)

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: aspect_value
      type: integer
      description: 00h=Auto, 01h=Wide Zoom, 02h=16:9, 03h=Native, 04h=4:3, etc.

- id: other_adjust_lamp
  label: Lamp/Light Adjust
  kind: action
  params:
    - name: adjustment_mode
      type: integer
      description: 00h=Absolute value, 01h=Relative value
    - name: adjustment_value
      type: integer
      description: 16-bit signed value

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: Key code (e.g., 02h=POWER ON, 03h=POWER OFF, 0Dh=MUTE, 85h=VOLUME UP, 86h=VOLUME DOWN)

- id: shutter_close
  label: Shutter Close
  kind: action
  params: []
  description: Closes lens shutter
  command_hex: "02h 16h 00h 00h 00h 18h"

- id: shutter_open
  label: Shutter Open
  kind: action
  params: []
  description: Opens lens shutter
  command_hex: "02h 17h 00h 00h 00h 19h"

- id: lens_control
  label: Lens Control
  kind: action
  params:
    - name: control_target
      type: integer
      description: 06h=Periphery Focus
    - name: control_action
      type: integer
      description: 00h=Stop, 01h/02h/03h=Drive plus 1/0.5/0.25s, 7Fh=Drive plus, 81h=Drive minus, FDh/FEh/FFh=Drive minus 0.25/0.5/1s

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: control_action
      type: integer
      description: FFh=Stop
    - name: adjustment_mode
      type: integer
      description: 00h=Absolute value, 02h=Relative value
    - name: adjustment_value
      type: integer
      description: 16-bit value

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
    - name: freeze_state
      type: integer
      description: 01h=On, 02h=Off

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  params:
    - name: eco_mode
      type: integer
      description: 00h=OFF, 01h=ON/AUTO ECO, 02h/03h=ECO1/ECO2, 04h=LONG LIFE, 05h=BOOST, 06h=SILENT

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
    - name: setting_type
      type: integer
      description: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3
    - name: setting_value
      type: integer
      description: Varies by setting_type

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  params:
    - name: edge_blending
      type: integer
      description: 00h=OFF, 01h=ON

- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: input_terminal
      type: integer
      description: Audio input terminal
    - name: audio_source
      type: integer
      description: 00h=specified terminal, 01h=BNC, 02h=COMPUTER

- id: error_status_request
  label: Error Status Request
  kind: action
  params: []
  description: Gets error information. Returns 12 bytes of bitmapped error status.
  command_hex: "00h 88h 00h 00h 00h 88h"

- id: information_request
  label: Information Request
  kind: action
  params: []
  description: Gets projector info including name (DATA01-49), lamp time (DATA83-86), filter time (DATA87-90)
  command_hex: "03h 8Ah 00h 00h 00h 8Dh"

- id: filter_usage_info_request
  label: Filter Usage Information Request
  kind: action
  params: []
  command_hex: "03h 95h 00h 00h 00h 98h"

- id: lamp_info_request_3
  label: Lamp Information Request 3
  kind: action
  params:
    - name: lamp_number
      type: integer
      description: 00h=Lamp 1, 01h=Lamp 2
    - name: content
      type: integer
      description: 01h=Usage time (seconds), 04h=Remaining life (%)

- id: carbon_savings_request
  label: Carbon Savings Information Request
  kind: action
  params:
    - name: savings_type
      type: integer
      description: 00h=Total Carbon Savings, 01h=Carbon Savings during operation

- id: lens_control_request
  label: Lens Control Request
  kind: action
  params:
    - name: control_target
      type: integer
      description: 06h=Periphery Focus

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: action
  params:
    - name: option
      type: integer
      description: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE

- id: lens_info_request
  label: Lens Information Request
  kind: action
  params: []

- id: lens_profile_request
  label: Lens Profile Request
  kind: action
  params: []

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: action
  params:
    - name: adjusted_value_name
      type: integer
      description: 00h=PICTURE/BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST

- id: setting_request
  label: Setting Request
  kind: action
  params: []
  description: Gets base model type, sound function, profile number, clock/sleep timer function

- id: running_status_request
  label: Running Status Request
  kind: action
  params: []
  description: Gets power status, cooling process, operation status

- id: input_status_request
  label: Input Status Request
  kind: action
  params: []
  description: Gets signal switch process, signal list number, signal types

- id: mute_status_request
  label: Mute Status Request
  kind: action
  params: []
  description: Gets picture mute, sound mute, onscreen mute, forced onscreen mute status

- id: model_name_request
  label: Model Name Request
  kind: action
  params: []
  description: Gets model name as NUL-terminated string

- id: cover_status_request
  label: Cover Status Request
  kind: action
  params: []
  description: Gets mirror/lens cover status

- id: information_string_request
  label: Information String Request
  kind: action
  params:
    - name: info_type
      type: integer
      description: 03h=Horizontal sync frequency, 04h=Vertical sync frequency

- id: eco_mode_request
  label: Eco Mode Request
  kind: action
  params: []

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: action
  params: []

- id: lan_mac_address_request
  label: LAN MAC Address Status Request 2
  kind: action
  params: []

- id: pip_picture_by_picture_request
  label: PIP/Picture by Picture Request
  kind: action
  params:
    - name: setting_type
      type: integer
      description: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: action
  params: []

- id: base_model_type_request
  label: Base Model Type Request
  kind: action
  params: []

- id: serial_number_request
  label: Serial Number Request
  kind: action
  params: []

- id: basic_info_request
  label: Basic Information Request
  kind: action
  params: []
  description: Gets operation status, content displayed, signal types, video/sound mute, freeze status
```

## Feedbacks
```yaml
- id: error_status
  type: object
  description: Bitmapped error status returned by ERROR STATUS REQUEST
  properties:
    DATA01: Error status 1 (Bit0=cover, Bit1=temp, Bit3-4=fan, Bit5=power, Bit6=lamp)
    DATA02: Error status 2 (Bit0=lamp time exceeded, Bit1=formatter, Bit2=lamp2 off)
    DATA03: Error status 3 (Bit1=FPGA, Bit2=temp sensor, Bit3=lamp not present)
    DATA04: Error status 4 (Bit1=lamp2 data, Bit2=temp dust, Bit3=foreign matter, Bit7=lens)
    DATA09: Extended status (Bit0=portrait, Bit1=interlock switch, Bit2-3=system errors)

- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
  description: From RUNNING STATUS REQUEST DATA03

- id: running_status
  type: object
  description: Running status response
  properties:
    power_status: Standby/Power on
    cooling_process: Not executed/During execution
    power_on_off_process: Not executed/During execution
    operation_status: enum values

- id: input_status
  type: object
  properties:
    signal_switch_process: [not_executed, during_execution]
    signal_list_number: integer
    signal_type_1: [1-5, etc.]
    signal_type_2: [COMPUTER, VIDEO, HDMI, DVI-D, etc.]
    test_pattern_display: [not_displayed, displayed]
    content_displayed: [video_signal, no_signal, viewer, test_pattern, lan]

- id: mute_status
  type: object
  properties:
    picture_mute: [off, on]
    sound_mute: [off, on]
    onscreen_mute: [off, on]
    forced_onscreen_mute: [off, on]

- id: projector_info
  type: object
  properties:
    projector_name: string
    lamp_usage_time: integer (seconds)
    filter_usage_time: integer (seconds)

- id: lamp_info
  type: object
  properties:
    lamp_number: [lamp_1, lamp_2]
    usage_time: integer (seconds)
    remaining_life: integer (%) # negative if deadline exceeded

- id: filter_info
  type: object
  properties:
    filter_usage_time: integer (seconds)
    filter_alarm_start_time: integer (seconds, -1 if undefined)

- id: carbon_savings
  type: object
  properties:
    savings_type: [total, during_operation]
    kilograms: integer (max 99999)
    milligrams: integer (max 999999)

- id: gain_parameters
  type: object
  properties:
    adjusted_value_name: integer
    adjustment_status: [display_not_possible, adjustment_not_possible, adjustment_possible, gain_not_exist]
    upper_limit: integer (16-bit)
    lower_limit: integer (16-bit)
    default_value: integer (16-bit)
    current_value: integer (16-bit)

- id: eco_mode
  type: enum
  values: [off, on, auto_eco, eco1, eco2, long_life, boost, silent]
  # UNRESOLVED: exact mapping of hex values varies by model

- id: model_name
  type: string

- id: serial_number
  type: string

- id: mac_address
  type: string (hex format XXh-XXh-XXh-XXh-XXh-XXh)

- id: cover_status
  type: enum
  values: [normal_open, closed]

- id: freeze_status
  type: enum
  values: [off, on]

- id: lens_info
  type: object
  properties:
    lens_memory: [stop, operating]
    zoom: [stop, operating]
    focus: [stop, operating]
    lens_shift_h: [stop, operating]
    lens_shift_v: [stop, operating]

- id: lens_position
  type: object
  properties:
    upper_limit: integer (16-bit)
    lower_limit: integer (16-bit)
    current_value: integer (16-bit)

- id: lens_profile
  type: enum
  values: [profile_1, profile_2]

- id: pip_mode
  type: enum
  values: [pip, picture_by_picture]

- id: pip_position
  type: enum
  values: [top_left, top_right, bottom_left, bottom_right]

- id: edge_blending_mode
  type: enum
  values: [off, on]

- id: aspect_ratio
  type: enum
  values: [auto, wide_zoom, 16x9, native, 4x3, 15x9, 16x10, letter_box, zoom, full]

- id: volume
  type: integer (16-bit)

- id: brightness
  type: integer (16-bit)

- id: contrast
  type: integer (16-bit)
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters beyond action commands; all parameters
# are passed via action commands. Remove section if not applicable.
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented; device only responds
# to commands. Remove section if not applicable.
```

## Macros
```yaml
# No explicit multi-step macros described in source.
# UNRESOLVED: power on/off sequences with cooling periods may require delays between commands.
```

## Safety
```yaml
confirmation_required_for:
  - power_off  # Document states projector cannot accept commands during cooling period
interlocks:
  - Some models require specific standby modes to receive commands via serial or LAN
  - Supported standby modes vary by model (Normal, Active, Eco, Network Standby, Sleep, etc.)
  - Some models only support certain standby modes for LAN vs serial control
  # UNRESOLVED: exact standby mode requirements per model not fully documented
```

## Notes

**Command Format:** All commands use hex notation with the following structure:
`20h <ID1> <ID2> 0Ch <DATA...> <CKS>`

Checksum (CKS) is calculated as low-order byte of sum of all preceding bytes.

**Common Parameters:**
- `ID1`: Control ID (set for projector)
- `ID2`: Model code (varies by model)
- `ERR1/ERR2`: Error code combination (00h 00h = success)

**Response Format:**
- Success without data: `A2h <ID1> <ID2> 00h <CKS>`
- Success with data: `23h/22h/20h <ID1> <ID2> <LEN> <DATA...> <CKS>`
- Error: `A3h/A2h/A0h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>`

**Serial Baud Rates:** The projector supports 115200/38400/19200/9600/4800 bps but the source does not specify a default or selectable rate mechanism.

**LAN Control:** TCP port 7142 is used for sending/receiving commands. The device also supports wired LAN at 10/100 Mbps with Auto-Negotiation.

**Input Terminal Codes (hex):** COMPUTER=01h, COMPUTER2=02h, VIDEO=06h, S-VIDEO=0Bh, HDMI=A1h, HDMI2=A2h, DVI-D=9Ch, DisplayPort=A6h, LAN/NETWORK=20h, HDBaseT=BFh

<!-- UNRESOLVED: complete model list for C651Q-AVT2 Series not enumerated -->
<!-- UNRESOLVED: standby mode requirements per specific model not fully documented -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: HDBaseT control details and standby mode specifics -->
<!-- UNRESOLVED: flow control (RTS/CTS) configuration not documented -->
<!-- UNRESOLVED: TCP connection keepalive or timeout behavior not documented -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: nec_c651q_avt2_series_serial.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T21:15:13.045Z
retrieved_at: 2026-04-25T21:15:13.045Z
last_checked_at: 2026-04-25T21:15:13.045Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T21:15:13.045Z
matched_actions: 53
action_count: 53
confidence: high
summary: "All 53 spec actions map to literal wire-level commands in source with exact opcode matches; transport parameters (port 7142, RS-232C) verified verbatim."
```

## Known Gaps

```yaml
[]
```
