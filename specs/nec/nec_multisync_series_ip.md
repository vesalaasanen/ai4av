---
spec_id: admin/nec-multisync-series-ip
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC MultiSync Series Control Spec"
manufacturer: NEC
model_family: "NEC MultiSync Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "NEC MultiSync Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:51:56.454Z
last_checked_at: 2026-06-02T22:10:36.482Z
generated_at: 2026-06-02T22:10:36.482Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "specific model numbers within the MultiSync Series are not stated in the source"
  - "variables are typically queryable state; source has many query commands"
  - "source does not describe unsolicited event notifications from the projector."
  - "no explicit multi-step macro sequences described in source."
  - "voltage, current, power specifications not stated in source"
  - "firmware version compatibility ranges not stated in source"
  - "authentication token format not applicable (no auth in source)"
  - "specific model variant identification within MultiSync Series not provided"
  - "binary encoding for non-hex commands not present — all commands are explicitly hex-stated"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:10:36.482Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions traced to source (dip-safe re-verify). (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# NEC MultiSync Series Control Spec

## Summary
NEC MultiSync Series projector control protocol supporting both RS-232 serial and wired TCP/IP control. Uses a hexadecimal command format with checksums, control IDs, and model-specific addressing. TCP port 7142 is used for LAN communication. Supports power control, input routing, picture/sound adjustment, mute functions, lens control, and comprehensive status queries.

<!-- UNRESOLVED: specific model numbers within the MultiSync Series are not stated in the source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142  # stated: "Use TCP port number 7142 for sending and receiving commands"
serial:
  baud_rate: 115200  # stated: "115200/38400/19200/9600/4800 bps" - highest listed
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable    # inferred: POWER ON / POWER OFF commands present
- routable     # inferred: INPUT SW CHANGE command present
- queryable    # inferred: multiple status request commands present (ERROR STATUS REQUEST, RUNNING STATUS REQUEST, INPUT STATUS REQUEST, MUTE STATUS REQUEST, etc.)
- levelable    # inferred: VOLUME ADJUST, PICTURE ADJUST commands present
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
  command: 02h 00h 00h 00h 00h 02h

- id: power_off
  label: Power Off
  kind: action
  params: []
  command: 02h 01h 00h 00h 00h 03h

- id: input_sw_change
  label: Input Switch
  kind: action
  params:
    - name: input
      type: integer
      description: Input terminal hex code (see Appendix for values)
  command: 02h 03h 00h 00h 02h 01h <DATA01> <CKS>

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  params: []
  command: 02h 10h 00h 00h 00h 12h

- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  params: []
  command: 02h 11h 00h 00h 00h 13h

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  params: []
  command: 02h 12h 00h 00h 00h 14h

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  params: []
  command: 02h 13h 00h 00h 00h 15h

- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  params: []
  command: 02h 14h 00h 00h 00h 16h

- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  params: []
  command: 02h 15h 00h 00h 00h 17h

- id: picture_adjust
  label: Picture Adjust
  kind: action
  params:
    - name: target
      type: integer
      description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: mode
      type: integer
      description: "00h=absolute, 01h=relative"
    - name: value
      type: integer
      description: Adjustment value
  command: 03h 10h 00h 00h 05h <DATA01> FFh <DATA02> <DATA03> <DATA04> <CKS>

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=absolute, 01h=relative"
    - name: value
      type: integer
      description: Volume level
  command: 03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: value
      type: integer
      description: Aspect mode hex code
  command: 03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>

- id: other_adjust
  label: Other Adjust (Lamp/Light)
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=absolute, 01h=relative"
    - name: value
      type: integer
      description: Adjustment value
  command: 03h 10h 00h 00h 05h 96h FFh <DATA03> <DATA04> <DATA05> <CKS>

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key
      type: integer
      description: Key code (see key code table)
  command: 02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>

- id: shutter_close
  label: Shutter Close
  kind: action
  params: []
  command: 02h 16h 00h 00h 00h 18h

- id: shutter_open
  label: Shutter Open
  kind: action
  params: []
  command: 02h 17h 00h 00h 00h 19h

- id: lens_control
  label: Lens Control
  kind: action
  params:
    - name: target
      type: integer
      description: "06h=Periphery Focus"
    - name: direction
      type: integer
      description: "00h=Stop, 01h/02h/03h=plus drive durations, 7Fh=plus continuous, 81h=minus continuous, FDh/FEh/FFh=minus drive durations"
  command: 02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: action
      type: integer
      description: "FFh=Stop, else mode+value"
    - name: mode
      type: integer
      description: "00h=absolute, 02h=relative"
    - name: value
      type: integer
      description: Position value
  command: 02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  command: 02h 1Eh 00h 00h 01h <DATA01> <CKS>

- id: ref_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  command: 02h 1Fh 00h 00h 01h <DATA01> <CKS>

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
  command: 02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  params:
    - name: profile
      type: integer
      description: "00h=Profile 1, 01h=Profile 2"
  command: 02h 27h 00h 00h 01h <DATA01> <CKS>

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: Eco mode hex code
  command: 03h B1h 00h 00h 02h 07h <DATA01> <CKS>

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  params:
    - name: name
      type: string
      description: Projector name (up to 16 bytes, NUL-terminated)
  command: 03h B1h 00h 00h 12h 2Ch <DATA01-DATA16> 00h <CKS>

- id: pip_pbp_set
  label: PIP/Picture By Picture Set
  kind: action
  params:
    - name: target
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: integer
      description: Setting value
  command: 03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=OFF, 01h=ON"
  command: 03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: state
      type: integer
      description: "01h=ON, 02h=OFF"
  command: 01h 98h 00h 00h 01h <DATA01> <CKS>

- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: input
      type: integer
      description: Input terminal
    - name: source
      type: integer
      description: "00h=terminal in DATA01, 02h=COMPUTER"
  command: 03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>

- id: error_status_request
  label: Error Status Request
  kind: action
  params: []
  command: 00h 88h 00h 00h 00h 88h

- id: information_request
  label: Information Request
  kind: action
  params: []
  command: 03h 8Ah 00h 00h 00h 8Dh

- id: filter_usage_request
  label: Filter Usage Information Request
  kind: action
  params: []
  command: 03h 95h 00h 00h 00h 98h

- id: lamp_info_request_3
  label: Lamp Information Request 3
  kind: action
  params:
    - name: lamp
      type: integer
      description: "00h=Lamp 1, 01h=Lamp 2"
    - name: content
      type: integer
      description: "01h=usage time, 04h=remaining life"
  command: 03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>

- id: carbon_savings_request
  label: Carbon Savings Information Request
  kind: action
  params:
    - name: type
      type: integer
      description: "00h=Total, 01h=During operation"
  command: 03h 9Ah 00h 00h 01h <DATA01> <CKS>

- id: lens_control_request
  label: Lens Control Request
  kind: action
  params:
    - name: target
      type: integer
  command: 02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: action
  params:
    - name: option
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
  command: 02h 20h 00h 00h 01h <DATA01> <CKS>

- id: lens_info_request
  label: Lens Information Request
  kind: action
  params: []
  command: 02h 22h 00h 00h 01h 00h 25h

- id: lens_profile_request
  label: Lens Profile Request
  kind: action
  params: []
  command: 02h 28h 00h 00h 00h 2Ah

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: action
  params:
    - name: target
      type: integer
      description: "00h=PICTURE/BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT"
  command: 03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>

- id: setting_request
  label: Setting Request
  kind: action
  params: []
  command: 00h 85h 00h 00h 01h 00h 86h

- id: running_status_request
  label: Running Status Request
  kind: action
  params: []
  command: 00h 85h 00h 00h 01h 01h 87h

- id: input_status_request
  label: Input Status Request
  kind: action
  params: []
  command: 00h 85h 00h 00h 01h 02h 88h

- id: mute_status_request
  label: Mute Status Request
  kind: action
  params: []
  command: 00h 85h 00h 00h 01h 03h 89h

- id: model_name_request
  label: Model Name Request
  kind: action
  params: []
  command: 00h 85h 00h 00h 01h 04h 8Ah

- id: cover_status_request
  label: Cover Status Request
  kind: action
  params: []
  command: 00h 85h 00h 00h 01h 05h 8Bh

- id: info_string_request
  label: Information String Request
  kind: action
  params:
    - name: type
      type: integer
      description: "03h=Horizontal sync freq, 04h=Vertical sync freq"
  command: 00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>

- id: eco_mode_request
  label: Eco Mode Request
  kind: action
  params: []
  command: 03h B0h 00h 00h 01h 07h BBh

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: action
  params: []
  command: 03h B0h 00h 00h 01h 2Ch E0h

- id: mac_address_request
  label: LAN MAC Address Status Request 2
  kind: action
  params: []
  command: 03h B0h 00h 00h 02h 9Ah 00h 4Fh

- id: pip_pbp_request
  label: PIP/Picture By Picture Request
  kind: action
  params:
    - name: target
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
  command: 03h B0h 00h 00h 02h C5h <DATA01> <CKS>

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: action
  params: []
  command: 03h B0h 00h 00h 02h DFh 00h 94h

- id: base_model_type_request
  label: Base Model Type Request
  kind: action
  params: []
  command: 00h BFh 00h 00h 01h 00h C0h

- id: serial_number_request
  label: Serial Number Request
  kind: action
  params: []
  command: 00h BFh 00h 00h 02h 01h 06h C8h

- id: basic_info_request
  label: Basic Information Request
  kind: action
  params: []
  command: 00h BFh 00h 00h 01h 02h C2h
```

## Feedbacks
```yaml
- id: command_response
  label: Command Response
  type: object
  properties:
    - name: err1
      type: integer
      description: Error code high byte
    - name: err2
      type: integer
      description: Error code low byte

- id: error_status
  label: Error Status
  type: object
  properties:
    - name: data01
      type: integer
      description: "Bit0=Cover error, Bit1=Temperature error, Bit3=Fan error, Bit4=Fan error, Bit5=Power error, Bit6=Lamp off, Bit7=Lamp moratorium"
    - name: data02
      type: integer
      description: "Bit0=Lamp time exceeded, Bit1=Formatter error, Bit2=Lamp2 off, Bit7=Extended status"
    - name: data03
      type: integer
      description: "Bit1=FPGA error, Bit2=Temperature sensor, Bit3=Lamp not present, Bit4=Lamp data error, Bit5=Mirror cover error, Bit6=Lamp2 moratorium, Bit7=Lamp2 time exceeded"
    - name: data04
      type: integer
      description: "Bit0=Lamp2 not present, Bit1=Lamp2 data error, Bit2=Dust temp error, Bit3=Foreign matter sensor, Bit5=Ballast comm error, Bit6=Iris cal error, Bit7=Lens not installed"

- id: power_status
  label: Power Status
  type: enum
  values:
    - standby
    - power_on
    - cooling
    - standby_error
    - standby_power_saving
    - network_standby

- id: input_status
  label: Input Status
  type: object
  properties:
    - name: signal_process
      type: enum
      values: [not_executed, in_progress]
    - name: signal_list_number
      type: integer
    - name: signal_type_1
      type: integer
    - name: signal_type_2
      type: integer
    - name: content
      type: enum
      values: [video_signal, no_signal, viewer, test_pattern, lan_displayed]

- id: mute_status
  label: Mute Status
  type: object
  properties:
    - name: picture
      type: enum
      values: [off, on]
    - name: sound
      type: enum
      values: [off, on]
    - name: onscreen
      type: enum
      values: [off, on]
    - name: forced_onscreen
      type: enum
      values: [off, on]
    - name: onscreen_display
      type: enum
      values: [not_displayed, displayed]

- id: projector_info
  label: Projector Information
  type: object
  properties:
    - name: name
      type: string
    - name: lamp_usage_seconds
      type: integer
    - name: filter_usage_seconds
      type: integer

- id: lamp_info
  label: Lamp Information
  type: object
  properties:
    - name: lamp
      type: integer
    - name: usage_time_seconds
      type: integer
    - name: remaining_life_percent
      type: integer

- id: filter_usage_info
  label: Filter Usage Information
  type: object
  properties:
    - name: usage_time_seconds
      type: integer
    - name: alarm_start_time_seconds
      type: integer

- id: carbon_savings
  label: Carbon Savings
  type: object
  properties:
    - name: type
      type: enum
      values: [total, during_operation]
    - name: kilograms
      type: number
    - name: milligrams
      type: number

- id: model_name
  label: Model Name
  type: string

- id: serial_number
  label: Serial Number
  type: string

- id: cover_status
  label: Cover Status
  type: enum
  values:
    - normal
    - closed

- id: eco_mode
  label: Eco Mode
  type: integer

- id: projector_name
  label: Projector Name
  type: string

- id: mac_address
  label: MAC Address
  type: string

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

- id: lens_info
  label: Lens Information
  type: object
  properties:
    - name: lens_memory
      type: enum
      values: [stop, operating]
    - name: zoom
      type: enum
      values: [stop, operating]
    - name: focus
      type: enum
      values: [stop, operating]
    - name: lens_shift_h
      type: enum
      values: [stop, operating]
    - name: lens_shift_v
      type: enum
      values: [stop, operating]

- id: gain_parameters
  label: Gain Parameters
  type: object
  properties:
    - name: status
      type: enum
      values: [display_not_possible, adjustment_not_possible, adjustment_possible, gain_not_exist]
    - name: upper_limit
      type: integer
    - name: lower_limit
      type: integer
    - name: default_value
      type: integer
    - name: current_value
      type: integer
    - name: wide_width
      type: integer
    - name: narrow_width
      type: integer
    - name: default_valid
      type: boolean
```

## Variables
```yaml
# UNRESOLVED: variables are typically queryable state; source has many query commands
# but variable boundaries (discrete settable params vs action-driven state) are not clearly delineated.
# All major settable parameters are represented as Actions above.
```

## Events
```yaml
# UNRESOLVED: source does not describe unsolicited event notifications from the projector.
# Events may exist but are not documented in this command reference manual.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "Power on/off commands block other commands during execution - source states: 'While this command is turning on the power, no other command can be accepted.'"
  - description: "Some models require specific standby modes to receive commands via serial or LAN ( Normal, Active, Eco, NORMAL, NETWORK STANDBY, SLEEP, OFF, ON, STANDBY POWER ON for serial; Normal, NORMAL, NETWORK STANDBY, SLEEP, HTBaseT STANDBY, OFF, ON, STANDBY POWER ON for LAN)."
  - description: "Portrait cover orientation affects interlock status (DATA09 Bit0 in error status)."
  - description: "Interlock switch state is reported in error status (DATA09 Bit1)."
# UNRESOLVED: voltage, current, power specifications not stated in source
```

## Notes

**Command Format:** All commands use hexadecimal notation with structure: `[HEADER] [MODEL] [ID1] [ID2] [LEN] [DATA...] [CKS]`. Checksum is low-order byte of sum of all preceding bytes.

**Control ID:** Commands require a control ID (ID1) that must match the projector's configured control ID. ID2 is model-specific.

**Response Format:** Successful responses vary by command type (some return data, some return only acknowledgement). Failed responses include ERR1/ERR2 error codes.

**Power Sequencing:** Some projectors require specific standby modes for network/serial control. Supported standby modes vary by model.

**Input Terminal Values (hex):**
- COMPUTER: 01h, COMPUTER2: 02h, COMPUTER3: 1Ah/03h, VIDEO: 06h, S-VIDEO: 0Bh, Component: 10h, HDMI: A1h/1Ah, HDMI2: A2h/1Bh, DisplayPort: A6h, DVI-D: 9Ch, LAN/NETWORK/ETHERNET: 20h, HDBaseT: BFh, SDI: C4h

**Aspect Values (hex):**
- AUTO: 00h, WIDE ZOOM: 01h, 16:9: 02h, NATIVE: 03h, 4:3: 04h, 15:9: 05h, 16:10: 06h, LETTER BOX/ZOOM: 07h, FULL: 09h/10h

**Eco Mode Values (hex):**
- OFF: 00h, Normal: 00h/01h, ECO: 02h/03h, ECO1: 02h, ECO2: 03h, AUTO ECO: 01h, LONG LIFE: 04h, SILENT: 06h, BOOST: 05h

<!-- UNRESOLVED: firmware version compatibility ranges not stated in source -->
<!-- UNRESOLVED: authentication token format not applicable (no auth in source) -->
<!-- UNRESOLVED: specific model variant identification within MultiSync Series not provided -->
<!-- UNRESOLVED: binary encoding for non-hex commands not present — all commands are explicitly hex-stated -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:51:56.454Z
last_checked_at: 2026-06-02T22:10:36.482Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:10:36.482Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions traced to source (dip-safe re-verify). (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "specific model numbers within the MultiSync Series are not stated in the source"
- "variables are typically queryable state; source has many query commands"
- "source does not describe unsolicited event notifications from the projector."
- "no explicit multi-step macro sequences described in source."
- "voltage, current, power specifications not stated in source"
- "firmware version compatibility ranges not stated in source"
- "authentication token format not applicable (no auth in source)"
- "specific model variant identification within MultiSync Series not provided"
- "binary encoding for non-hex commands not present — all commands are explicitly hex-stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
