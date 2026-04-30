---
schema_version: ai4av-public-spec-v1
device_id: nec/p551-r-series
entity_id: nec_p551_r_series
spec_id: admin/nec-p551-r-series
revision: 1
author: admin
title: "NEC P551-R Series Control Spec"
status: published
manufacturer: NEC
manufacturer_key: nec
model_family: "P551-R Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "P551-R Series"
  firmware: ""  # UNRESOLVED: firmware version not stated in source
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: nec_p551_r_series_serial.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T21:31:09.078Z
retrieved_at: 2026-04-25T21:31:09.078Z
last_checked_at: 2026-04-25T21:31:09.078Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: ""  # UNRESOLVED: firmware version not stated in source
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-25T21:31:09.078Z
  matched_actions: 53
  action_count: 53
  confidence: high
  summary: "All 53 spec actions map to distinct source command identifiers; transport parameters (port 7142, baud 115200, 8N1) verified verbatim; source command catalogue fully represented."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# NEC P551-R Series Control Spec

## Summary
Professional laser projector supporting both RS-232C serial and wired TCP/IP control interfaces. Uses a custom hexadecimal command protocol with checksum validation. Supports power control, input routing, picture/sound muting, lens adjustment, eco modes, and comprehensive status queries.

<!-- UNRESOLVED: input terminal value table references an Appendix with model-specific values not included in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142  # TCP port for LAN control
serial:
  baud_rate: 115200  # also supports: 38400, 19200, 9600, 4800
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable    # inferred: POWER ON/OFF commands present
- routable     # inferred: INPUT SW CHANGE command present
- queryable    # inferred: multiple status request commands present (ERROR STATUS, RUNNING STATUS, INPUT STATUS, MUTE STATUS, etc.)
- levelable    # inferred: VOLUME ADJUST, PICTURE ADJUST commands present
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
  label: Input Switch
  kind: action
  params:
    - name: input
      type: integer
      description: Input terminal hex code (e.g., 06h for VIDEO, A1h for HDMI)

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
      description: Adjustment value (16-bit, low then high byte)

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=Absolute value, 01h=Relative value"
    - name: value
      type: integer
      description: Volume level (16-bit, low then high byte)

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: aspect
      type: integer
      description: "Aspect mode hex code: 00h=AUTO, 01h=WIDE ZOOM, 02h=16:9, 03h=NATIVE, 04h=4:3, etc."

- id: other_adjust
  label: Other Adjust
  kind: action
  params:
    - name: target
      type: integer
      description: "96h=FFh=LAMP ADJUST/LIGHT ADJUST"
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
      description: "Key code to send (e.g., 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 0Ah=LEFT, etc.)"

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
      description: "00h=Stop, 01h=Drive+1s, 02h=Drive+0.5s, 03h=Drive+0.25s, 7Fh=Drive+, 81h=Drive-, FDh=Drive-0.25s, FEh=Drive-0.5s, FFh=Drive-1s"

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
      description: Position value (16-bit)

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  params:
    - name: action
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: ref_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  params:
    - name: action
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  params:
    - name: target
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
      description: "Eco mode hex code: 00h=OFF, 01h=NORMAL/ON, 02h=ECO1, 03h=ECO2, 04h=LONG LIFE, 05h=BOOST, 06h=SILENT"

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
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: integer
      description: Setting value depends on target

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=OFF, 01h=ON"

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: action
      type: integer
      description: "01h=Freeze ON, 02h=Freeze OFF"

- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: input
      type: integer
      description: Input terminal hex code
    - name: source
      type: integer
      description: "00h=Terminal in DATA01, 01h=BNC, 02h=COMPUTER"

- id: error_status_request
  label: Error Status Request
  kind: query
  params: []

- id: information_request
  label: Information Request
  kind: query
  params: []

- id: filter_usage_request
  label: Filter Usage Information Request
  kind: query
  params: []

- id: lamp_info_request
  label: Lamp Information Request 3
  kind: query
  params:
    - name: lamp
      type: integer
      description: "00h=Lamp 1, 01h=Lamp 2"
    - name: content
      type: integer
      description: "01h=Usage time (seconds), 04h=Remaining life (%)"

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
    - name: target
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  params: []

- id: lens_info_request
  label: Lens Information Request
  kind: query
  params: []

- id: gain_parameter_request
  label: Gain Parameter Request 3
  kind: query
  params:
    - name: target
      type: integer
      description: "00h=PICTURE/BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST"

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

- id: info_string_request
  label: Information String Request
  kind: query
  params:
    - name: type
      type: integer
      description: "03h=Horizontal sync frequency, 04h=Vertical sync frequency"

- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  params: []

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  params: []

- id: lan_mac_address_request
  label: LAN MAC Address Request 2
  kind: query
  params: []

- id: pip_pbp_request
  label: PIP/Picture by Picture Request
  kind: query
  params:
    - name: target
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: edge_blending_request
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

- id: basic_info_request
  label: Basic Information Request
  kind: query
  params: []
```

## Feedbacks
```yaml
- id: command_response
  type: object
  properties:
    - name: err1
      type: integer
      description: Error code high byte (see error code table)
    - name: err2
      type: integer
      description: Error code low byte (see error code table)
  values: []
  notes: "Response format: A2h 00h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS> for power commands, A3h for data commands, A0h for info requests"

- id: error_status
  type: object
  properties:
    - name: data01
      type: integer
      description: "Bit0=Cover error, Bit1=Temperature error, Bit3=Fan error, Bit4=Fan error, Bit5=Power error, Bit6=Lamp off, Bit7=Lamp moratorium"
    - name: data02
      type: integer
      description: "Bit0=Lamp time exceeded, Bit1=Formatter error, Bit2=Lamp 2 off, Bit7=Extended status"
    - name: data03
      type: integer
      description: "Bit1=FPGA error, Bit2=Temperature sensor error, Bit3=Lamp not present, Bit4=Lamp data error, Bit5=Mirror cover error, Bit6=Lamp 2 moratorium, Bit7=Lamp 2 time exceeded"
    - name: data04
      type: integer
      description: "Bit0=Lamp 2 not present, Bit1=Lamp 2 data error, Bit2=Dust temperature error, Bit3=Foreign matter sensor, Bit7=Lens not installed"
    - name: data09
      type: integer
      description: "Bit0=Portrait cover side up, Bit1=Interlock switch open, Bit2=System error (Slave CPU), Bit3=System error (Formatter)"

- id: running_status
  type: object
  properties:
    - name: power_status
      type: enum
      values: [standby, power_on]
      description: "00h=Standby, 01h=Power on"
    - name: cooling
      type: enum
      values: [not_executing, executing]
      description: "00h=Not executed, 01h=During execution"
    - name: power_process
      type: enum
      values: [not_executing, executing]
      description: "00h=Not executed, 01h=During execution"
    - name: operation_status
      type: enum
      values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]

- id: power_state
  type: enum
  values: [on, off, cooling, standby]

- id: mute_state
  type: object
  properties:
    - name: picture
      type: enum
      values: [on, off]
    - name: sound
      type: enum
      values: [on, off]
    - name: onscreen
      type: enum
      values: [on, off]

- id: input_status
  type: object
  properties:
    - name: signal_type_1
      type: integer
      description: Signal type code
    - name: signal_type_2
      type: enum
      values: [COMPUTER, VIDEO, S-VIDEO, COMPONENT, HDMI, DVI-D, DisplayPort, VIEWER, NETWORK, HDBaseT, SDI]

- id: projector_info
  type: object
  properties:
    - name: name
      type: string
      description: Projector name (NUL-terminated string, up to 49 chars)
    - name: lamp_time
      type: integer
      description: Lamp usage time in seconds
    - name: filter_time
      type: integer
      description: Filter usage time in seconds

- id: lamp_info
  type: object
  properties:
    - name: usage_time
      type: integer
      description: Lamp usage time in seconds
    - name: remaining_life
      type: integer
      description: Remaining life percentage (negative if deadline exceeded)

- id: volume_level
  type: integer
  description: Current volume level (16-bit value)

- id: picture_settings
  type: object
  properties:
    - name: brightness
      type: integer
    - name: contrast
      type: integer
    - name: color
      type: integer
    - name: hue
      type: integer
    - name: sharpness
      type: integer
```

## Variables
```yaml
# UNRESOLVED: The source documents SET commands for some parameters but does not describe
# discrete variable read/write cycles separate from action/feedback patterns.
# Variables with SET actions: eco_mode, lan_projector_name, pip_pbp, edge_blending,
# audio_select, lens_memory_option, lens_profile, volume, picture settings
```

## Events
```yaml
# UNRESOLVED: The source does not document unsolicited event notifications from the projector.
# All communication appears to be command-response (polling pattern).
```

## Macros
```yaml
# UNRESOLVED: No explicit macro or multi-step sequence documentation found in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
notes: >
  POWER ON command (015): While turning on, no other command can be accepted.
  POWER OFF command (016): While turning off (including cooling time), no other command can be accepted.
  Some models require specific standby modes to receive commands via serial or LAN.
  Supported standby modes vary by model for LAN vs serial control.
```

## Notes
- Commands use hexadecimal notation with checksum (CKS) calculated as low-order byte of sum of preceding bytes
- All commands require Control ID (ID1) and Model code (ID2) parameters
- Serial and TCP transports share the same command protocol; TCP uses port 7142
- Error codes ERR1/ERR2: 00h/01h=unsupported command, 01h/00h-01h/02h=invalid parameter, 02h/00h-03h/02h=execution errors
- Standby mode configuration may be required before commands can be received (varies by model)
<!-- UNRESOLVED: Full input terminal value table for command 018 requires Appendix which contains model-specific values -->
<!-- UNRESOLVED: Aspect value table has variant codes (e.g., ZOOM=07h or 08h) indicating model-specific differences -->
<!-- UNRESOLVED: Eco mode value table has variant codes (e.g., NORMAL=00h or 01h) indicating model-specific differences -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: nec_p551_r_series_serial.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T21:31:09.078Z
retrieved_at: 2026-04-25T21:31:09.078Z
last_checked_at: 2026-04-25T21:31:09.078Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T21:31:09.078Z
matched_actions: 53
action_count: 53
confidence: high
summary: "All 53 spec actions map to distinct source command identifiers; transport parameters (port 7142, baud 115200, 8N1) verified verbatim; source command catalogue fully represented."
```

## Known Gaps

```yaml
[]
```
