---
schema_version: ai4av-public-spec-v1
device_id: nec/nec-flat-panel-display
entity_id: nec_nec_flat_panel_display
spec_id: admin/nec-nec-flat-panel-display
revision: 1
author: admin
title: "NEC NEC Flat Panel Display Control Spec"
status: published
manufacturer: NEC
manufacturer_key: nec
model_family: "NEC Flat Panel Display"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "NEC Flat Panel Display"
  firmware: ""  # UNRESOLVED: firmware version not stated in source
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: nec_nec_flat_panel_display_ip.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T21:18:48.712Z
retrieved_at: 2026-04-25T21:18:48.712Z
last_checked_at: 2026-04-25T21:18:48.712Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: ""  # UNRESOLVED: firmware version not stated in source
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-25T21:18:48.712Z
  matched_actions: 53
  action_count: 53
  confidence: high
  summary: "All 53 spec commands matched literal source codes; transport parameters verified; bidirectional coverage complete."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# NEC NEC Flat Panel Display Control Spec

## Summary
NEC projector supporting both RS-232C serial and wired LAN (TCP/IP) control. Uses proprietary binary command protocol over TCP port 7142 or serial RS-232C with configurable baud rates up to 115200 bps. Supports power control, input routing, picture/sound adjustments, mute functions, lens control, eco mode, and comprehensive query commands.

<!-- UNRESOLVED: device is described as "Flat Panel Display" in entity but manual title is "Projector Control Command Reference Manual" — model number BDT140013 Rev 7.1 may indicate a projector, not a flat panel display -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142  # stated: "Use TCP port number '7142' for sending and receiving commands"
serial:
  baud_rate: 115200  # stated: supports 115200/38400/19200/9600/4800 bps
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: no flow control settings in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # POWER ON (015), POWER OFF (016) commands present
- routable        # INPUT SW CHANGE (018) command present
- queryable       # INFORMATION REQUEST (037), RUNNING STATUS REQUEST (078-2), INPUT STATUS REQUEST (078-3), etc.
- levelable       # PICTURE ADJUST (030-1), VOLUME ADJUST (030-2), ASPECT ADJUST (030-12)
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
  command_code: "015"
  description: Turns on the power. No other commands accepted during power-on sequence.

- id: power_off
  label: Power Off
  kind: action
  params: []
  command_code: "016"
  description: Turns off the power. No other commands accepted during cooling.

- id: input_sw_change
  label: Input Switch
  kind: action
  params:
    - name: input
      type: integer
      description: Input terminal hex code (e.g., 01h=COMPUTER, 06h=VIDEO, A1h=HDMI)
  command_code: "018"

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  params: []
  command_code: "020"

- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  params: []
  command_code: "021"

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  params: []
  command_code: "022"

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  params: []
  command_code: "023"

- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  params: []
  command_code: "024"

- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  params: []
  command_code: "025"

- id: picture_adjust
  label: Picture Adjust
  kind: action
  params:
    - name: target
      type: integer
      description: Adjustment target (00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness)
    - name: mode
      type: integer
      description: "00h=absolute value, 01h=relative value"
    - name: value
      type: integer
      description: Adjustment value (16-bit)
  command_code: "030-1"

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=absolute value, 01h=relative value"
    - name: value
      type: integer
      description: Adjustment value (16-bit)
  command_code: "030-2"

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: value
      type: integer
      description: Aspect mode hex code
  command_code: "030-12"

- id: other_adjust
  label: Other Adjust
  kind: action
  params:
    - name: target
      type: integer
      description: "96h=Light Adjust"
    - name: mode
      type: integer
      description: "00h=absolute, 01h=relative"
    - name: value
      type: integer
      description: Adjustment value (16-bit)
  command_code: "030-15"

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: Key code from key code list (e.g., 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, etc.)
  command_code: "050"

- id: shutter_close
  label: Shutter Close
  kind: action
  params: []
  command_code: "051"

- id: shutter_open
  label: Shutter Open
  kind: action
  params: []
  command_code: "052"

- id: lens_control
  label: Lens Control
  kind: action
  params:
    - name: target
      type: integer
      description: "06h=Periphery Focus"
    - name: direction
      type: integer
      description: "00h=Stop, 01h/02h/03h=Drive plus, 7Fh=Drive plus cont., 81h=Drive minus cont., FDh/FEh/FFh=Drive minus"
  command_code: "053"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: action
      type: integer
      description: "FFh=Stop"
    - name: mode
      type: integer
      description: "00h=absolute, 02h=relative"
    - name: value
      type: integer
      description: Adjustment value (16-bit)
  command_code: "053-2"

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  command_code: "053-3"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  command_code: "053-4"

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
  command_code: "053-6"

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  params:
    - name: profile
      type: integer
      description: "00h=Profile 1, 01h=Profile 2"
  command_code: "053-10"

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: Eco mode hex code (00h=OFF, 01h-03h=ECO modes, 04h=LONG LIFE, 05h=BOOST, 06h=SILENT)
  command_code: "098-8"

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  params:
    - name: name
      type: string
      description: Projector name (up to 16 bytes)
  command_code: "098-45"

- id: pip_picture_by_picture_set
  label: PIP/Picture By Picture Set
  kind: action
  params:
    - name: target
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: integer
      description: Setting value
  command_code: "098-198"

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=OFF, 01h=ON"
  command_code: "098-243-1"

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: action
      type: integer
      description: "01h=Turn freeze on, 02h=Turn freeze off"
  command_code: "079"

- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: input
      type: integer
      description: Input terminal hex code
    - name: value
      type: integer
      description: Audio select value (00h=HDMI1, 01h=HDMI2, 02h=DisplayPort, 03h=HDBaseT, etc.)
  command_code: "319-10"
```

## Feedbacks
```yaml
- id: error_status
  label: Error Status Request
  kind: query
  response_type: bitfield
  command_code: "009"
  description: Returns error information in 12 data bytes. Bit-level status for cover, temperature, fan, power, lamp, and other errors.

- id: information_request
  label: Information Request
  kind: query
  response_fields:
    - name: projector_name
      type: string
      offset: "DATA01-49"
    - name: lamp_usage_time
      type: integer
      offset: "DATA83-86"
      unit: seconds
    - name: filter_usage_time
      type: integer
      offset: "DATA87-90"
      unit: seconds
  command_code: "037"

- id: filter_usage_information
  label: Filter Usage Information Request
  kind: query
  response_fields:
    - name: filter_usage_time
      type: integer
      offset: "DATA01-04"
      unit: seconds
    - name: filter_alarm_start_time
      type: integer
      offset: "DATA05-08"
      unit: seconds
  command_code: "037-3"

- id: lamp_information_3
  label: Lamp Information Request 3
  kind: query
  response_fields:
    - name: lamp_number
      type: integer
      description: "00h=Lamp 1, 01h=Lamp 2"
    - name: content
      type: integer
      description: "01h=Lamp usage time, 04h=Lamp remaining life"
    - name: value
      type: integer
      description: Usage time in seconds or remaining life in percent
  command_code: "037-4"

- id: carbon_savings_information
  label: Carbon Savings Information Request
  kind: query
  response_fields:
    - name: carbon_savings_kg
      type: float
      description: Carbon savings in kg (max 99999)
    - name: carbon_savings_mg
      type: float
      description: Carbon savings in mg (max 999999)
  command_code: "037-6"

- id: lens_control_request
  label: Lens Control Request
  kind: query
  response_fields:
    - name: upper_limit
      type: integer
      description: Upper limit of adjustment range
    - name: lower_limit
      type: integer
      description: Lower limit of adjustment range
    - name: current_value
      type: integer
      description: Current lens position value
  command_code: "053-1"

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  response_fields:
    - name: option
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: value
      type: integer
      description: "00h=OFF, 01h=ON"
  command_code: "053-5"

- id: lens_information_request
  label: Lens Information Request
  kind: query
  response_fields:
    - name: lens_memory_status
      type: bitfield
      description: Bit-level status for lens memory, zoom, focus, lens shift
  command_code: "053-7"

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  response_fields:
    - name: profile
      type: integer
      description: "00h=Profile 1, 01h=Profile 2"
  command_code: "053-11"

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  response_fields:
    - name: status
      type: integer
      description: "00h=Display not possible, 01h=Adjustment not possible, 02h=Adjustment possible, FFh=Gain does not exist"
    - name: upper_limit
      type: integer
    - name: lower_limit
      type: integer
    - name: default_value
      type: integer
    - name: current_value
      type: integer
  command_code: "060-1"

- id: setting_request
  label: Setting Request
  kind: query
  response_fields:
    - name: base_model_type
      type: string
      offset: "DATA01-03"
    - name: sound_function
      type: enum
      values: ["not available", "available"]
    - name: profile_number
      type: integer
      description: Clock/sleep timer configuration
  command_code: "078-1"

- id: running_status_request
  label: Running Status Request
  kind: query
  response_fields:
    - name: power_status
      type: enum
      values: ["Standby", "Power on"]
    - name: cooling_status
      type: enum
      values: ["Not executed", "During execution"]
    - name: power_on_off_status
      type: enum
      values: ["Not executed", "During execution"]
    - name: operation_status
      type: enum
      values: ["Standby (Sleep)", "Power on", "Cooling", "Standby (error)", "Standby (Power saving)", "Network standby"]
  command_code: "078-2"

- id: input_status_request
  label: Input Status Request
  kind: query
  response_fields:
    - name: signal_switch_status
      type: enum
      values: ["Not executed", "During execution"]
    - name: signal_list_number
      type: integer
    - name: selection_signal_type_1
      type: integer
    - name: selection_signal_type_2
      type: string
      description: Signal type (COMPUTER, VIDEO, HDMI, DVI-D, etc.)
    - name: content_displayed
      type: enum
      values: ["Video signal displayed", "No signal", "Viewer displayed", "Test pattern displayed", "LAN displayed"]
  command_code: "078-3"

- id: mute_status_request
  label: Mute Status Request
  kind: query
  response_fields:
    - name: picture_mute
      type: enum
      values: ["Off", "On"]
    - name: sound_mute
      type: enum
      values: ["Off", "On"]
    - name: onscreen_mute
      type: enum
      values: ["Off", "On"]
    - name: forced_onscreen_mute
      type: enum
      values: ["Off", "On"]
  command_code: "078-4"

- id: model_name_request
  label: Model Name Request
  kind: query
  response_fields:
    - name: model_name
      type: string
      description: Up to 32 characters
  command_code: "078-5"

- id: cover_status_request
  label: Cover Status Request
  kind: query
  response_fields:
    - name: cover_status
      type: enum
      values: ["Normal (opened)", "Cover closed"]
  command_code: "078-6"

- id: information_string_request
  label: Information String Request
  kind: query
  response_fields:
    - name: horizontal_sync_frequency
      type: string
    - name: vertical_sync_frequency
      type: string
  command_code: "084"

- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  response_fields:
    - name: eco_mode
      type: integer
      description: Eco mode hex code
  command_code: "097-8"

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  response_fields:
    - name: projector_name
      type: string
  command_code: "097-45"

- id: lan_mac_address_status_request2
  label: LAN MAC Address Status Request 2
  kind: query
  response_fields:
    - name: mac_address
      type: string
      description: MAC address in hex format
  command_code: "097-155"

- id: pip_picture_by_picture_request
  label: PIP/Picture By Picture Request
  kind: query
  response_fields:
    - name: mode
      type: enum
      values: ["PIP", "PICTURE BY PICTURE"]
    - name: start_position
      type: enum
      values: ["TOP-LEFT", "TOP-RIGHT", "BOTTOM-LEFT", "BOTTOM-RIGHT"]
  command_code: "097-198"

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  response_fields:
    - name: mode
      type: enum
      values: ["OFF", "ON"]
  command_code: "097-243-1"

- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  response_fields:
    - name: base_model_type
      type: string
    - name: model_name
      type: string
  command_code: "305-1"

- id: serial_number_request
  label: Serial Number Request
  kind: query
  response_fields:
    - name: serial_number
      type: string
  command_code: "305-2"

- id: basic_information_request
  label: Basic Information Request
  kind: query
  response_fields:
    - name: operation_status
      type: enum
      values: ["Standby (Sleep)", "Power on", "Cooling", "Standby (error)", "Standby (Power saving)", "Network standby"]
    - name: content_displayed
      type: enum
    - name: selection_signal_type
      type: string
    - name: display_signal_type
      type: string
    - name: video_mute
      type: enum
      values: ["Off", "On"]
    - name: sound_mute
      type: enum
      values: ["Off", "On"]
    - name: onscreen_mute
      type: enum
      values: ["Off", "On"]
    - name: freeze_status
      type: enum
      values: ["Off", "On"]
  command_code: "305-3"
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters documented separately from action commands
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented — device only responds to commands
```

## Macros
```yaml
# No explicit multi-step macros documented in source
```

## Safety
```yaml
confirmation_required_for:
  - power_on   # "While this command is turning on the power, no other command can be accepted"
  - power_off   # "While this command is turning off the power (including the cooling time), no other command can be accepted"
interlocks:
  - "Some models require specific standby modes to receive commands via serial or LAN. Serial supported modes: Normal, Active, Eco, NORMAL, NETWORK STANDBY, SLEEP, OFF, ON, STANDBY POWER ON. LAN supported modes: Normal, NORMAL, NETWORK STANDBY, SLEEP, HTBaseT STANDBY, OFF, ON, STANDBY POWER ON. Supported modes vary by model."
```

## Notes
- Commands are binary hexadecimal format: `[HEADER] [MODEL] [ID1] [ID2] [LEN] [DATA...] [CKS]`
- Checksum (CKS) calculated as low-order byte of sum of all preceding bytes
- Response format: `[RESPONSE_HEADER] [MODEL] [ID1] [ID2] [LEN] [DATA/ERR] [CKS]`
- Error responses include ERR1/ERR2 codes with descriptions in section 2.4
- Input terminal values and aspect ratios have model-specific variations documented in appendix
- <!-- UNRESOLVED: command timing/latency requirements not stated in source -->
- <!-- UNRESOLVED: maximum concurrent connections or connection limits not stated in source -->
- <!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: nec_nec_flat_panel_display_ip.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T21:18:48.712Z
retrieved_at: 2026-04-25T21:18:48.712Z
last_checked_at: 2026-04-25T21:18:48.712Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T21:18:48.712Z
matched_actions: 53
action_count: 53
confidence: high
summary: "All 53 spec commands matched literal source codes; transport parameters verified; bidirectional coverage complete."
```

## Known Gaps

```yaml
[]
```
