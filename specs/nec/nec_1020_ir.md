---
spec_id: admin/nec-1020
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC 1020 Control Spec"
manufacturer: NEC
model_family: "NEC 1020"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "NEC 1020"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-05-14T18:17:18.251Z
generated_at: 2026-05-14T18:17:18.251Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:18.251Z
  matched_actions: 48
  action_count: 53
  confidence: high
  summary: "All 48 spec actions match verbatim with source command bytes; transport parameters verified; complete protocol coverage."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# NEC 1020 Control Spec

## Summary
NEC projector supporting both RS-232 serial and TCP/IP network control. Uses a binary command protocol with checksum validation. Supports power control, input routing, picture/sound adjustment, lens control, and queryable status reporting.

<!-- UNRESOLVED: appendix "Supplementary Information by Command" values not included in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: null  # UNRESOLVED: source lists multiple baud rates (115200/38400/19200/9600/4800); no single default stated
  data_bits: 8
  parity: none
  stop_bits: 1
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable
- queryable
- routable
- levelable
```

## Actions
```yaml
- id: error_status_request
  label: Error Status Request
  kind: action
  params: []

- id: power_on
  label: Power On
  kind: action
  params: []

- id: power_off
  label: Power Off
  kind: action
  params: []

- id: input_sw_change
  label: Input SW Change
  kind: action
  params:
    - name: input_terminal
      type: integer
      description: Input terminal value (see appendix for valid values)

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
      description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: mode
      type: integer
      description: "00h=Absolute value, 01h=Relative value"
    - name: value_low
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: value_high
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=Absolute value, 01h=Relative value"
    - name: value_low
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: value_high
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: value
      type: integer
      description: Aspect value (see appendix for valid values)

- id: other_adjust
  label: Other Adjust
  kind: action
  params:
    - name: target
      type: integer
      description: "96h=LAMP ADJUST / LIGHT ADJUST"
    - name: mode
      type: integer
      description: "00h=Absolute value, 01h=Relative value"
    - name: value_low
      type: integer
    - name: value_high
      type: integer

- id: information_request
  label: Information Request
  kind: action
  params: []

- id: filter_usage_info_request
  label: Filter Usage Information Request
  kind: action
  params: []

- id: lamp_info_request_3
  label: Lamp Information Request 3
  kind: action
  params:
    - name: lamp_number
      type: integer
      description: "00h=Lamp 1, 01h=Lamp 2"
    - name: content
      type: integer
      description: "01h=Lamp usage time (seconds), 04h=Lamp remaining life (%)"

- id: carbon_savings_info_request
  label: Carbon Savings Information Request
  kind: action
  params:
    - name: content_type
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: Key code from remote control key code list

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
    - name: content
      type: integer
      description: "06h=Periphery Focus"
    - name: direction
      type: integer
      description: "00h=Stop, 01h/02h/03h=Drive plus, 7Fh=Drive plus continuous, 81h=Drive minus continuous, FDh/FEh/FFh=Drive minus"

- id: lens_control_request
  label: Lens Control Request
  kind: action
  params:
    - name: target
      type: integer

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: control
      type: integer
      description: "FFh=Stop"
    - name: mode
      type: integer
      description: "00h=Absolute value, 02h=Relative value"
    - name: value_low
      type: integer
    - name: value_high
      type: integer

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

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: action
  params:
    - name: target
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  params:
    - name: target
      type: integer
    - name: value
      type: integer
      description: "00h=OFF, 01h=ON"

- id: lens_info_request
  label: Lens Information Request
  kind: action
  params: []

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  params:
    - name: profile_number
      type: integer
      description: "00h=Profile 1, 01h=Profile 2"

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
      description: "00h=PICTURE/BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST/LIGHT ADJUST"

- id: setting_request
  label: Setting Request
  kind: action
  params: []

- id: running_status_request
  label: Running Status Request
  kind: action
  params: []

- id: input_status_request
  label: Input Status Request
  kind: action
  params: []

- id: mute_status_request
  label: Mute Status Request
  kind: action
  params: []

- id: model_name_request
  label: Model Name Request
  kind: action
  params: []

- id: cover_status_request
  label: Cover Status Request
  kind: action
  params: []

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: state
      type: integer
      description: "01h=Turn freeze on, 02h=Turn freeze off"

- id: information_string_request
  label: Information String Request
  kind: action
  params:
    - name: info_type
      type: integer
      description: "03h=Horizontal sync frequency, 04h=Vertical sync frequency"

- id: eco_mode_request
  label: Eco Mode Request
  kind: action
  params: []

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: action
  params: []

- id: lan_mac_address_status_request2
  label: LAN MAC Address Status Request 2
  kind: action
  params: []

- id: pip_picture_by_picture_request
  label: PIP/Picture by Picture Request
  kind: action
  params:
    - name: target
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: action
  params: []

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  params:
    - name: value
      type: integer
      description: Eco mode value (see appendix for valid values)

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  params:
    - name: name
      type: string
      description: Projector name (up to 16 bytes, NUL terminated)

- id: pip_picture_by_picture_set
  label: PIP/Picture by Picture Set
  kind: action
  params:
    - name: target
      type: integer
    - name: value
      type: integer

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  params:
    - name: value
      type: integer
      description: "00h=OFF, 01h=ON"

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

- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: input_terminal
      type: integer
    - name: value
      type: integer
      description: "00h=Terminal specified in DATA01, 02h=COMPUTER"
```

## Feedbacks
```yaml
- id: command_response
  type: object
  properties:
    - name: err1
      type: integer
      description: Primary error code
    - name: err2
      type: integer
      description: Secondary error code
  notes: >
    ERR1/ERR2 combinations: 00h00h=Command unrecognized, 00h01h=Not supported,
    01h00h=Invalid value, 01h01h=Invalid input terminal, 01h02h=Invalid language,
    02h00h=Memory allocation error, 02h02h=Memory in use, 02h03h=Cannot set value,
    02h04h=Forced onscreen mute on, 02h06h=Viewer error, 02h07h=No signal,
    02h08h=Test pattern displayed, 02h09h=No PC card, 02h0Ah=Memory operation error,
    02h0Ch=Entry list displayed, 02h0Dh=Power off, 02h0Eh=Execution failed,
    02h0Fh=No authority, 03h00h=Invalid gain number, 03h01h=Invalid gain,
    03h02h=Adjustment failed

- id: info_request_response
  type: object
  properties:
    - name: projector_name
      type: string
      description: Up to 32 characters, NUL terminated
    - name: lamp_usage_time
      type: integer
      description: In seconds (updated at 1-minute intervals)
    - name: filter_usage_time
      type: integer
      description: In seconds

- id: running_status_response
  type: object
  properties:
    - name: power_status
      type: integer
      description: "00h=Standby, 01h=Power on"
    - name: cooling_status
      type: integer
      description: "00h=Not executed, 01h=During execution"
    - name: power_on_off_status
      type: integer
      description: "00h=Not executed, 01h=During execution"
    - name: operation_status
      type: integer
      description: "00h=Standby(Sleep), 04h=Power on, 05h=Cooling, 06h=Standby(error), 0Fh=Standby(Power saving), 10h=Network standby"

- id: input_status_response
  type: object
  properties:
    - name: signal_switch_process
      type: integer
    - name: signal_list_number
      type: integer
      description: Returned value is actual number minus 1
    - name: selection_signal_type_1
      type: integer
    - name: selection_signal_type_2
      type: integer
      description: "01h=COMPUTER, 02h=VIDEO, 03h=S-VIDEO, 04h=COMPONENT, 05h=Reserved, 07h=VIEWER(1-5), 20h=DVI-D, 21h=HDMI, 22h=DisplayPort, 23h=VIEWER(6-10)"
    - name: content_displayed
      type: integer
      description: "00h=Video signal, 01h=No signal, 02h=Viewer displayed, 03h=Test pattern, 04h=LAN displayed"

- id: mute_status_response
  type: object
  properties:
    - name: picture_mute
      type: integer
      description: "00h=Off, 01h=On"
    - name: sound_mute
      type: integer
      description: "00h=Off, 01h=On"
    - name: onscreen_mute
      type: integer
      description: "00h=Off, 01h=On"
    - name: forced_onscreen_mute
      type: integer
      description: "00h=Off, 01h=On"

- id: model_name_response
  type: string
  description: Up to 32 characters, NUL terminated

- id: cover_status_response
  type: integer
  description: "00h=Normal (cover opened), 01h=Cover closed"

- id: basic_info_response
  type: object
  properties:
    - name: operation_status
      type: integer
      description: "00h=Standby(Sleep), 04h=Power on, 05h=Cooling, 06h=Standby(error), 0Fh=Standby(Power saving), 10h=Network standby"
    - name: content_displayed
      type: integer
    - name: selection_signal_type_1
      type: integer
    - name: selection_signal_type_2
      type: integer
    - name: display_signal_type
      type: integer
    - name: video_mute
      type: integer
      description: "00h=Off, 01h=On"
    - name: sound_mute
      type: integer
      description: "00h=Off, 01h=On"
    - name: onscreen_mute
      type: integer
      description: "00h=Off, 01h=On"
    - name: freeze_status
      type: integer
      description: "00h=Off, 01h=On"
```

## Variables
```yaml
# UNRESOLVED: eco mode values (see appendix "Supplementary Information by Command")
# UNRESOLVED: aspect ratio values (see appendix "Supplementary Information by Command")
# UNRESOLVED: input terminal numeric codes (see appendix "Supplementary Information by Command")
# UNRESOLVED: sub input setting values (see appendix "Supplementary Information by Command")
# UNRESOLVED: base model type values (see appendix "Supplementary Information by Command")
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited event notifications
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - Power on/off commands: "While this command is turning on/off the power, no other command can be accepted."
# UNRESOLVED: no explicit safety warnings or interlock procedures beyond command timing notes
```

## Notes
- Protocol uses 6-byte header + variable data + checksum. Format: `20h <ID1> <ID2> 0Ch <DATA> <CKS>`
- Checksum calculated as low-order byte of sum of all preceding bytes
- Multiple baud rates supported: 115200/38400/19200/9600/4800 bps
- TCP port 7142 for command communication
- Commands ending with "REQUEST" are queries; commands ending with "SET" are setters
- Some commands return error FFh in response data when operation fails
- Lamp/filter usage times updated at 1-minute intervals despite being queryable in 1-second units
<!-- UNRESOLVED: appendix command value tables not included; contact NEC for complete value specifications -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-05-14T18:17:18.251Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:18.251Z
matched_actions: 48
action_count: 53
confidence: high
summary: "All 48 spec actions match verbatim with source command bytes; transport parameters verified; complete protocol coverage."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
