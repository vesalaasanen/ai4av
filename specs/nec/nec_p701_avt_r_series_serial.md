---
spec_id: admin/nec-p701-avt-r-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC P701-AVT-R Series Control Spec"
manufacturer: NEC
model_family: "P701-AVT-R Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "P701-AVT-R Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-04-25T21:32:22.396Z
generated_at: 2026-04-25T21:32:22.396Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-25T21:32:22.396Z
  matched_actions: 53
  action_count: 53
  confidence: high
  summary: "All 53 spec actions matched to source commands; transport parameters verified in source; full coverage of documented command catalogue."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# NEC P701-AVT-R Series Control Spec

## Summary
Commercial projector supporting both RS-232C serial and wired LAN (TCP/IP) control. The projector exposes power control, input routing, picture/sound adjustment, lens control, mute functions, and comprehensive status queries via a hex-based binary protocol with checksum verification. Both control interfaces share the same command set.

<!-- UNRESOLVED: HDBaseT control mentioned in standby modes but not documented in command reference -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # 115200/38400/19200/9600/4800 bps supported
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 7142  # TCP port for LAN control (explicitly stated)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # POWER ON (015) / POWER OFF (016) commands present
- queryable       # INFORMATION REQUEST (037), STATUS REQUEST (078), ERROR STATUS REQUEST (009) present
- levelable       # VOLUME ADJUST (030-2), PICTURE ADJUST (030-1), LAMP/LIGHT ADJUST (030-15) present
- routable        # INPUT SW CHANGE (018) present
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
  notes: "While turning on, no other command can be accepted."

- id: power_off
  label: Power Off
  kind: action
  params: []
  notes: "While turning off (including cooling time), no other command can be accepted."

- id: input_sw_change
  label: Input Switch
  kind: action
  params:
    - name: input
      type: integer
      description: Input terminal hex code (e.g., 06h=VIDEO, A1h=HDMI, 01h=COMPUTER, 20h=LAN)

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  params: []
  notes: "Turned off by input terminal switch or video signal switch."

- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  params: []

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  params: []
  notes: "Turned off by input switch, video signal switch, or volume adjustment."

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  params: []

- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  params: []
  notes: "Turned off by input terminal switch or video signal switch."

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
      description: "16-bit signed adjustment value"

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=Absolute value, 01h=Relative value"
    - name: value
      type: integer
      description: "16-bit signed adjustment value"

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: value
      type: integer
      description: "Aspect mode hex code: 00h=AUTO, 01h=WIDE ZOOM, 02h=16:9, 03h=NATIVE, 04h=4:3, etc."

- id: lamp_adjust
  label: Lamp/Light Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=Absolute value, 01h=Relative value"
    - name: value
      type: integer
      description: "16-bit signed adjustment value"

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: "Key code from key code list (e.g., 02h=POWER ON, 03h=POWER OFF, 0Dh=MUTE, 4Fh=VIDEO1)"

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
      description: "00h=Stop, 01h/02h/03h=Drive plus direction, 7Fh=Drive plus continuous, 81h=Drive minus continuous, FDh/FEh/FFh=Drive minus"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: command
      type: integer
      description: "FFh=Stop"
    - name: mode
      type: integer
      description: "00h=Absolute value, 02h=Relative value"
    - name: value
      type: integer
      description: "16-bit adjustment value"

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

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: "Eco mode hex code: 00h=OFF, 01h=ON/AUTO ECO, 02h=ECO1, 03h=ECO2, 04h=LONG LIFE, 05h=BOOST, 06h=SILENT"

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  params:
    - name: name
      type: string
      description: "Projector name (up to 16 bytes, NUL-terminated)"

- id: pip_picture_by_picture_set
  label: PIP/Picture by Picture Set
  kind: action
  params:
    - name: target
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: integer
      description: "Varies by target; MODE: 00h=PIP, 01h=PICTURE BY PICTURE; POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT"

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  params:
    - name: value
      type: integer
      description: "00h=OFF, 01h=ON"

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: state
      type: integer
      description: "01h=Turn freeze on, 02h=Turn freeze off"

- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: input
      type: integer
      description: "Input terminal hex code"
    - name: source
      type: integer
      description: "00h=Terminal in DATA01, 01h=BNC, 02h=COMPUTER"

- id: error_status_request
  label: Error Status Request
  kind: query
  params: []
  notes: "Returns 12 bytes of bitmapped error status data"

- id: information_request
  label: Information Request
  kind: query
  params: []
  notes: "Returns projector name, lamp usage time (seconds), filter usage time (seconds)"

- id: filter_usage_request
  label: Filter Usage Information Request
  kind: query
  params: []

- id: lamp_information_request
  label: Lamp Information Request 3
  kind: query
  params:
    - name: lamp
      type: integer
      description: "00h=Lamp 1, 01h=Lamp 2"
    - name: content
      type: integer
      description: "01h=Lamp usage time (seconds), 04h=Lamp remaining life (%)"

- id: carbon_savings_request
  label: Carbon Savings Information Request
  kind: query
  params:
    - name: type
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: lens_control_request
  label: Lens Control Request
  kind: query
  params:
    - name: target
      type: integer
      description: "06h=Periphery Focus"

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  params:
    - name: option
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  params: []

- id: lens_information_request
  label: Lens Information Request
  kind: query
  params: []
  notes: "Returns bitmapped lens operation status (memory, zoom, focus, lens shift)"

- id: gain_parameter_request
  label: Gain Parameter Request 3
  kind: query
  params:
    - name: parameter
      type: integer
      description: "00h=PICTURE/BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST"

- id: setting_request
  label: Setting Request
  kind: query
  params: []
  notes: "Returns base model type, sound function availability, clock/sleep timer availability"

- id: running_status_request
  label: Running Status Request
  kind: query
  params: []
  notes: "Returns power status, cooling process status, power on/off process status, operation status"

- id: input_status_request
  label: Input Status Request
  kind: query
  params: []
  notes: "Returns signal switch process, signal list number, selection signal types, test pattern display status, content displayed"

- id: mute_status_request
  label: Mute Status Request
  kind: query
  params: []
  notes: "Returns picture mute, sound mute, onscreen mute, forced onscreen mute, onscreen display status"

- id: model_name_request
  label: Model Name Request
  kind: query
  params: []
  notes: "Returns model name string"

- id: cover_status_request
  label: Cover Status Request
  kind: query
  params: []
  notes: "Returns mirror cover/lens cover status"

- id: information_string_request
  label: Information String Request
  kind: query
  params:
    - name: type
      type: integer
      description: "03h=Horizontal synchronous frequency, 04h=Vertical synchronous frequency"

- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  params: []

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  params: []

- id: lan_mac_address_request
  label: LAN MAC Address Status Request 2
  kind: query
  params: []

- id: pip_picture_by_picture_request
  label: PIP/Picture by Picture Request
  kind: query
  params:
    - name: target
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

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
  notes: "Returns operation status, content displayed, signal types, mute statuses, freeze status"
```

## Feedbacks
```yaml
# All commands return a response with ERR1/ERR2 status bytes.
# ERR1=00h, ERR2=00h indicates success.
# Non-zero ERR1/ERR2 indicates error per error code list.

- id: error_status
  label: Error Status Response
  type: bitmap
  values:
    DATA01:
      Bit0: Cover error
      Bit1: Temperature error (bi-metallic strip)
      Bit3: Fan error
      Bit4: Fan error
      Bit5: Power error
      Bit6: Lamp (or lamp 1) off or backlight off
      Bit7: Lamp (or lamp 1) in replacement moratorium
    DATA02:
      Bit0: Lamp usage time exceeded limit
      Bit1: Formatter error
      Bit2: Lamp 2 off
      Bit7: Extended status
    DATA03:
      Bit1: FPGA error
      Bit2: Temperature error (temperature sensor)
      Bit3: Lamp not present
      Bit4: Lamp data error
      Bit5: Mirror cover error
      Bit6: Lamp 2 in replacement moratorium
      Bit7: Lamp 2 usage time exceeded limit
    DATA04:
      Bit1: Lamp 2 data error
      Bit2: Temperature error due to dust
      Bit3: Foreign matter sensor error
      Bit7: Lens not installed properly
    DATA09:
      Bit0: Portrait cover side up
      Bit1: Interlock switch open
      Bit2: System error (Slave CPU)
      Bit3: System error (Formatter)

- id: power_state
  label: Power State
  type: enum
  values:
    - standby
    - power_on
    - cooling

- id: mute_status
  label: Mute Status
  type: object
  properties:
    picture_mute: [off, on]
    sound_mute: [off, on]
    onscreen_mute: [off, on]
    forced_onscreen_mute: [off, on]

- id: lamp_usage_time
  label: Lamp Usage Time
  type: integer
  unit: seconds
  notes: "Updated at 1-minute intervals"

- id: lamp_remaining_life
  label: Lamp Remaining Life
  type: integer
  unit: percent
  notes: "Returns negative value if replacement deadline exceeded"

- id: filter_usage_time
  label: Filter Usage Time
  type: integer
  unit: seconds
  notes: "Returns -1 if no time defined"

- id: carbon_savings
  label: Carbon Savings
  type: object
  properties:
    kilograms: integer
    milligrams: integer

- id: projector_name
  label: Projector Name
  type: string

- id: model_name
  label: Model Name
  type: string

- id: serial_number
  label: Serial Number
  type: string

- id: mac_address
  label: MAC Address
  type: string
  format: "hex-bytes"

- id: input_status
  label: Input Status
  type: object
  properties:
    signal_type_1: [1, 2, 3, 4, 5]
    signal_type_2: [COMPUTER, VIDEO, S-VIDEO, COMPONENT, DVI-D, HDMI, DisplayPort, VIEWER, NETWORK, SDI, HDBaseT]
    content_displayed: [video_signal, no_signal, viewer_displayed, test_pattern, lan_displayed]

- id: operation_status
  label: Operation Status
  type: enum
  values:
    - standby_sleep
    - power_on
    - cooling
    - standby_error
    - standby_power_saving
    - network_standby

- id: eco_mode
  label: Eco Mode
  type: enum
  values: [off, on, auto_eco, eco1, eco2, long_life, boost, silent]

- id: pip_mode
  label: PIP/Picture by Picture Mode
  type: enum
  values: [pip, picture_by_picture]

- id: pip_position
  label: PIP Position
  type: enum
  values: [top_left, top_right, bottom_left, bottom_right]

- id: edge_blending
  label: Edge Blending Mode
  type: enum
  values: [off, on]

- id: freeze_state
  label: Freeze State
  type: enum
  values: [off, on]

- id: lens_status
  label: Lens Status
  type: bitmap
  notes: "Bitmapped: lens memory, zoom, focus, lens shift H/V operation status"

- id: gain_parameters
  label: Gain Parameters
  type: object
  properties:
    status: [display_not_possible, adjustment_not_possible, adjustment_possible, gain_not_exists]
    upper_limit: integer
    lower_limit: integer
    default_value: integer
    current_value: integer
    wide_adjustment_width: integer
    narrow_adjustment_width: integer
    default_valid: [invalid, valid]

- id: information_string
  label: Information String
  type: string
  notes: "Horizontal or vertical synchronous frequency string"
```

## Variables
```yaml
# No standalone settable parameters beyond the action commands above.
# UNRESOLVED: projector name, eco mode, PIP mode, edge blending are settable via
# actions but have no separate Variables section for direct get/set of persistent state.
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented. Device only responds
# to commands; no push-style status updates described.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety warnings, interlock procedures, or power-on
# sequencing requirements in source. Command descriptions note power on/off
# commands block other commands during execution, but no safety-critical
# procedures are stated.
```

## Notes

**Command Protocol Structure:**
- All commands use 8-bit hexadecimal notation
- Each command includes ID1 (control ID), ID2 (model code), and CKS (checksum = low-order byte of sum of preceding bytes)
- Commands that request data use LEN byte to indicate data length
- Responses include ERR1/ERR2 for error indication

**Supported Baud Rates:**
- 115200, 38400, 19200, 9600, 4800 bps (negotiable)

**TCP Port:**
- Port 7142 for LAN control

**Standby Mode Requirements:**
- Some models require specific standby modes to receive commands via serial or LAN
- Serial supported standby modes: Normal, Active, Eco, NORMAL, NETWORK STANDBY, SLEEP, OFF, ON, STANDBY POWER ON
- LAN supported standby modes: Normal, NORMAL, NETWORK STANDBY, SLEEP, HTBaseT STANDBY, OFF, ON, STANDBY POWER ON
- Supported modes vary by model

<!-- UNRESOLVED: Full input terminal hex code table appendix not included in source (referenced as external appendix "Supplementary Information by Command") -->
<!-- UNRESOLVED: Base model type code values not provided in source (referenced as external appendix) -->
<!-- UNRESOLVED: Sub input setting values for PIP/PICTURE BY PICTURE not fully documented (referenced as external appendix) -->
<!-- UNRESOLVED: HDBaseT control functionality not documented in command reference, only mentioned in standby mode notes -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: specific error recovery sequences not documented -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-04-25T21:32:22.396Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T21:32:22.396Z
matched_actions: 53
action_count: 53
confidence: high
summary: "All 53 spec actions matched to source commands; transport parameters verified in source; full coverage of documented command catalogue."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
