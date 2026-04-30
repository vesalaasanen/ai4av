---
schema_version: ai4av-public-spec-v1
device_id: nec/x461s-avt-series
entity_id: nec_x461s_avt_series
spec_id: admin/nec-x461s-avt-series
revision: 1
author: admin
title: "NEC X461S-AVT Series Control Spec"
status: published
manufacturer: NEC
manufacturer_key: nec
model_family: "X461S-AVT Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "X461S-AVT Series"
  firmware: ""  # UNRESOLVED: firmware version not stated in source
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: nec_x461s_avt_series_serial.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T21:34:43.411Z
retrieved_at: 2026-04-25T21:34:43.411Z
last_checked_at: 2026-04-25T21:34:43.411Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: ""  # UNRESOLVED: firmware version not stated in source
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-25T21:34:43.411Z
  matched_actions: 53
  action_count: 53
  confidence: high
  summary: "All 53 spec actions map cleanly to source commands with matching semantics; transport parameters verified; full catalogue coverage."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# NEC X461S-AVT Series Control Spec

## Summary
NEC X461S-AVT Series professional projector supporting both RS-232C serial and wired LAN (TCP/IP) control. The serial interface uses RS-232C at configurable baud rates up to 115200 bps. The LAN interface uses TCP port 7142. Comprehensive command set includes power control, input routing, picture/sound muting, lens positioning, ECO mode, and extensive query commands for status monitoring.

<!-- UNRESOLVED: Some command parameters reference an Appendix "Supplementary Information by Command" that is not included in this source document -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # highest listed; source shows: 115200/38400/19200/9600/4800 bps
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not specified in source
addressing:
  port: 7142  # TCP port for LAN control, stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # POWER ON/OFF commands present
- routable        # INPUT SW CHANGE command present
- queryable       # INFORMATION REQUEST, STATUS REQUEST commands present
- levelable       # VOLUME ADJUST, PICTURE ADJUST commands present
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
  description: Turns on the projector power. No other command accepted during power-on sequence.

- id: power_off
  label: Power Off
  kind: action
  params: []
  description: Turns off the projector power. No other command accepted during cooling time.

- id: input_sw_change
  label: Input Switch Change
  kind: action
  params:
    - name: input
      type: string
      description: Input terminal hex code (e.g., 01h=COMPUTER, 06h=VIDEO, A1h=HDMI)

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  params: []
  description: Turns picture mute on. Automatically cleared by input/signal switch.

- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  params: []

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  params: []
  description: Turns sound mute on. Automatically cleared by input/signal switch or volume adjustment.

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  params: []

- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  params: []
  description: Turns onscreen mute on. Automatically cleared by input/signal switch.

- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  params: []

- id: picture_adjust
  label: Picture Adjust
  kind: action
  params:
    - name: target
      type: string
      description: Adjustment target (00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness)
    - name: mode
      type: string
      description: "00h=Absolute value, 01h=Relative value"
    - name: value
      type: integer
      description: Adjustment value (16-bit, low-order byte first)

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: string
      description: "00h=Absolute value, 01h=Relative value"
    - name: value
      type: integer
      description: Adjustment value (16-bit, low-order byte first)

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: value
      type: string
      description: Aspect mode hex code (see appendix; 00h=AUTO, 01h=WIDE ZOOM, etc.)

- id: lamp_adjust
  label: Lamp/Light Adjust
  kind: action
  params:
    - name: mode
      type: string
      description: "00h=Absolute value, 01h=Relative value"
    - name: value
      type: integer
      description: Adjustment value (16-bit, low-order byte first)

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: string
      description: Key code hex value (e.g., 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU)

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
      type: string
      description: "06h=Periphery Focus"
    - name: direction
      type: string
      description: "00h=Stop, 01h/02h/03h=Drive plus, 7Fh=Drive plus continuous, 81h=Drive minus continuous, FDh/FEh/FFh=Drive minus"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: action
      type: string
      description: "FFh=Stop, otherwise adjustment command"
    - name: mode
      type: string
      description: "00h=Absolute value, 02h=Relative value"
    - name: value
      type: integer
      description: Adjustment value (16-bit)

- id: lens_memory_move
  label: Lens Memory Move
  kind: action
  params: []

- id: lens_memory_store
  label: Lens Memory Store
  kind: action
  params: []

- id: lens_memory_reset
  label: Lens Memory Reset
  kind: action
  params: []

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  params:
    - name: profile
      type: integer
      description: "0=Profile 1, 1=Profile 2"

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: state
      type: string
      description: "01h=Freeze on, 02h=Freeze off"

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  params:
    - name: mode
      type: string
      description: Eco mode hex code (see appendix; 00h=OFF, 01h=NORMAL, 02h/03h=ECO, etc.)

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
      type: string
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: string
      description: Setting value hex code

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  params:
    - name: mode
      type: string
      description: "00h=OFF, 01h=ON"

- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: input
      type: string
      description: Input terminal hex code
    - name: source
      type: string
      description: "00h=Terminal in DATA01, 01h=BNC, 02h=COMPUTER"

- id: error_status_request
  label: Error Status Request
  kind: query
  params: []
  description: Gets error information. Response contains bitmapped error status in DATA01-DATA12.

- id: information_request
  label: Information Request
  kind: query
  params: []
  description: Gets projector info including name (DATA01-49), lamp usage time (DATA83-86), filter usage time (DATA87-90).

- id: filter_usage_request
  label: Filter Usage Information Request
  kind: query
  params: []
  description: Gets filter usage time (DATA01-04) and alarm start time (DATA05-08) in seconds.

- id: lamp_information_request
  label: Lamp Information Request 3
  kind: query
  params:
    - name: lamp
      type: string
      description: "00h=Lamp 1, 01h=Lamp 2"
    - name: content
      type: string
      description: "01h=Lamp usage time, 04h=Lamp remaining life (%)"

- id: carbon_savings_request
  label: Carbon Savings Information Request
  kind: query
  params:
    - name: type
      type: string
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: lens_control_request
  label: Lens Control Request
  kind: query
  params:
    - name: target
      type: string
      description: "06h=Periphery Focus"
  description: Gets adjusted values of lens position (upper/lower limits, current value).

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  params:
    - name: option
      type: string
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
  description: Gets lens memory setting value.

- id: lens_information_request
  label: Lens Information Request
  kind: query
  params: []
  description: Gets lens operation status (memory, zoom, focus, lens shift H/V).

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  params: []
  description: Gets selected profile number of reference lens memory.

- id: gain_parameter_request
  label: Gain Parameter Request 3
  kind: query
  params:
    - name: target
      type: string
      description: "00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST"
  description: Gets adjusted values with range limits and current value.

- id: setting_request
  label: Setting Request
  kind: query
  params: []
  description: Gets projector settings including sound function, clock/sleep timer availability.

- id: running_status_request
  label: Running Status Request
  kind: query
  params: []
  description: Gets operation status: power status (DATA03), cooling process (DATA04), power on/off process (DATA05), operation status (DATA06).

- id: input_status_request
  label: Input Status Request
  kind: query
  params: []
  description: Gets input signal status including signal switch process, signal list number, signal types.

- id: mute_status_request
  label: Mute Status Request
  kind: query
  params: []
  description: Gets picture mute, sound mute, onscreen mute, forced onscreen mute status.

- id: model_name_request
  label: Model Name Request
  kind: query
  params: []
  description: Gets model name as NUL-terminated string.

- id: cover_status_request
  label: Cover Status Request
  kind: query
  params: []
  description: Gets mirror/lens cover status (00h=Normal, 01h=Cover closed).

- id: information_string_request
  label: Information String Request
  kind: query
  params:
    - name: type
      type: string
      description: "03h=Horizontal sync frequency, 04h=Vertical sync frequency"

- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  params: []
  description: Gets current eco mode setting.

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  params: []
  description: Gets projector name.

- id: lan_mac_address_request
  label: LAN MAC Address Status Request 2
  kind: query
  params: []
  description: Gets MAC address.

- id: pip_picture_by_picture_request
  label: PIP/Picture by Picture Request
  kind: query
  params:
    - name: target
      type: string
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  params: []
  description: Gets edge blending setting (00h=OFF, 01h=ON).

- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  params: []
  description: Gets base model type and model name.

- id: serial_number_request
  label: Serial Number Request
  kind: query
  params: []
  description: Gets serial number as NUL-terminated string.

- id: basic_information_request
  label: Basic Information Request
  kind: query
  params: []
  description: Gets comprehensive operation status including power, signal, mute, freeze states.
```

## Feedbacks
```yaml
# All commands return error codes in ERR1/ERR2 format:
# 00h/00h = Command not recognized
# 00h/01h = Command not supported by model
# 01h/00h = Invalid specified value
# 01h/01h = Invalid input terminal
# 01h/02h = Invalid language
# 02h/00h = Memory allocation error
# 02h/02h = Memory in use
# 02h/03h = Value cannot be set
# 02h/04h = Forced onscreen mute on
# 02h/06h = Viewer error
# 02h/07h = No signal
# 02h/08h = Test pattern or filter displayed
# 02h/09h = No PC card inserted
# 02h/0Ah = Memory operation error
# 02h/0Ch = Entry list displayed
# 02h/0Dh = Command cannot be accepted (power off)
# 02h/0Eh = Command execution failed
# 02h/0Fh = No authority for operation
# 03h/00h = Incorrect gain number
# 03h/01h = Invalid gain
# 03h/02h = Adjustment failed

- id: power_state
  type: enum
  values: [standby, power_on, cooling]
  description: From RUNNING STATUS REQUEST DATA06

- id: picture_mute_state
  type: enum
  values: [on, off]

- id: sound_mute_state
  type: enum
  values: [on, off]

- id: onscreen_mute_state
  type: enum
  values: [on, off]

- id: input_status
  type: object
  properties:
    - signal_switch_process
    - signal_list_number
    - signal_type_1
    - signal_type_2
    - content_displayed

- id: lamp_usage_hours
  type: integer
  description: Lamp usage time in hours (seconds / 3600)

- id: filter_usage_hours
  type: integer
  description: Filter usage time in hours (seconds / 3600)
```

## Variables
```yaml
# UNRESOLVED: Variables that can be set and queried independently of discrete actions
# are documented as SET/REQUEST pairs. Full parameter enum mappings for eco mode,
# aspect, PIP, audio select, and input terminals reference an appendix not included
# in this source document.
```

## Events
```yaml
# UNRESOLVED: No unsolicited event/notification format described in source.
# The projector appears to only respond to commands (polling architecture).
```

## Macros
```yaml
# UNRESOLVED: No explicit multi-step macros described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: Some models require specific standby modes to receive commands via serial or LAN. Serial cable connection standby modes: Normal, Active, Eco, NORMAL, NETWORK STANDBY, SLEEP, OFF, ON, STANDBY POWER ON. Wired LAN standby modes: Normal, NORMAL, NETWORK STANDBY, SLEEP, HTBaseT STANDBY, OFF, ON, STANDBY POWER ON. Supported modes vary by model.
  # UNRESOLVED: Specific standby mode requirements per model not detailed in source
  confirmation_required_for: []
```

## Notes
- Command format: `[HEADER][ID1][ID2][LEN][DATA...][CKS]` where CKS is low-order byte of sum of all preceding bytes
- Response format differs by command type: `2xh` prefix for actions, `3xh` for picture adjustments, `0xh` for information requests
- Error responses include ERR1/ERR2 codes; successful responses vary
- Some commands (POWER ON, POWER OFF) block other commands during execution
- Input terminal, aspect, and eco mode value tables reference an appendix not included in this source document
- Lens commands support both continuous drive and timed drive modes
- ECO mode affects lamp information readings
- <!-- UNRESOLVED: Baud rate selection method ( DIP switch / menu setting ) not described in source -->
- <!-- UNRESOLVED: Control ID configuration method not described in source -->
- <!-- UNRESOLVED: Model code (ID2) values not enumerated in source -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: nec_x461s_avt_series_serial.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T21:34:43.411Z
retrieved_at: 2026-04-25T21:34:43.411Z
last_checked_at: 2026-04-25T21:34:43.411Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T21:34:43.411Z
matched_actions: 53
action_count: 53
confidence: high
summary: "All 53 spec actions map cleanly to source commands with matching semantics; transport parameters verified; full catalogue coverage."
```

## Known Gaps

```yaml
[]
```
