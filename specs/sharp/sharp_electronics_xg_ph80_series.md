---
spec_id: admin/sharp_electronics-xg_ph80_series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp Electronics XG-PH80 Series Control Spec"
manufacturer: Sharp
model_family: "XG-PH80 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sharp
    - "Sharp Electronics"
  models:
    - "XG-PH80 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - business.sharpusa.com
  - applicationmarket.crestron.com
source_urls:
  - https://business.sharpusa.com/portals/0/downloads/manuals/sharp-pj-control-command-codes.pdf
  - https://applicationmarket.crestron.com/sharp-electronics-xg-ph80x-n/
  - https://applicationmarket.crestron.com/sharp-electronics-xg-ph80w-n/
retrieved_at: 2026-05-14T18:17:20.289Z
last_checked_at: 2026-05-14T18:17:20.289Z
generated_at: 2026-05-14T18:17:20.289Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "LAN wireless not documented; Appendix referenced but not included"
  - "source lists 115200/38400/19200/9600/4800 selectable; default not stated"
  - "Appendix referenced but not included; input terminal values, aspect values,"
  - "no unsolicited event messages documented in source"
  - "no multi-step macro sequences documented in source"
  - "Appendix \"Supplementary Information by Command\" referenced but not included in source; input terminal values, aspect ratio values, light mode values, signal type values, base model type values not populated"
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:20.289Z
  matched_actions: 49
  action_count: 50
  confidence: medium
  summary: "All 49 spec actions match documented source commands; transport parameters verbatim in source; full command catalogue represented. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-26
---

# Sharp Electronics XG-PH80 Series Control Spec

## Summary
Sharp Electronics XG-PH80 Series projector. RS-232C serial and wired TCP/IP control. No authentication required. Commands sent as hexadecimal packets with checksum.

<!-- UNRESOLVED: LAN wireless not documented; Appendix referenced but not included -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142
serial:
  baud_rate: null  # UNRESOLVED: source lists 115200/38400/19200/9600/4800 selectable; default not stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable
- routable
- queryable
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
    - name: input
      type: integer
      description: Input terminal value (see Appendix for valid values)

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
      description: "0=Brightness, 1=Contrast, 2=Color, 3=Hue, 4=Sharpness"
    - name: mode
      type: integer
      description: "0=Absolute, 1=Relative"
    - name: value
      type: integer
      description: Signed 16-bit adjustment value

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Absolute, 1=Relative"
    - name: value
      type: integer
      description: Signed 16-bit adjustment value

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: value
      type: integer
      description: Aspect ratio value (see Appendix for valid values)

- id: other_adjust
  label: Other Adjust
  kind: action
  params:
    - name: target
      type: integer
      description: "96h=LIGHT ADJUST"
    - name: mode
      type: integer
      description: "0=Absolute, 1=Relative"
    - name: value
      type: integer
      description: Signed 16-bit adjustment value

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: Key code (see key code table for values)

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
    - name: direction
      type: integer
      description: "00h=Stop, 01h/02h/03h=Drive plus, 7Fh=Drive plus continuous, 81h=Drive minus, FDh/FEh/FFh=Drive minus"

- id: lens_control_request
  label: Lens Control Request
  kind: action
  params:
    - name: target
      type: integer
      description: Lens target

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: command
      type: integer
      description: "FFh=Stop"
    - name: mode
      type: integer
      description: "0=Absolute, 2=Relative"
    - name: value
      type: integer
      description: Signed 16-bit adjustment value

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
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: value
      type: integer
      description: "00h=OFF, 01h=ON"

- id: lens_information_request
  label: Lens Information Request
  kind: action
  params: []

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  params:
    - name: profile
      type: integer
      description: "00h=Profile 1, 01h=Profile 2"

- id: lens_profile_request
  label: Lens Profile Request
  kind: action
  params: []

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: state
      type: integer
      description: "01h=On, 02h=Off"

- id: light_mode_set
  label: Light Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: Light mode value (see Appendix)

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  params:
    - name: name
      type: string
      description: Projector name (up to 16 bytes)

- id: pip_picture_by_picture_set
  label: PIP/Picture by Picture Set
  kind: action
  params:
    - name: target
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h/09h/0Ah=SUB INPUT"
    - name: value
      type: integer
      description: Setting value (see Appendix)

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  params:
    - name: value
      type: integer
      description: "00h=OFF, 01h=ON"
- id: information_request
  label: Information Request
  kind: query
  params: []

- id: light_information_request_3
  label: Light Information Request 3
  kind: query
  params:
    - name: target
      type: integer
      description: "00h=Light"
    - name: content
      type: integer
      description: "01h=Light usage time (seconds)"

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  params:
    - name: type
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  params:
    - name: gain
      type: integer
      description: "00h=PICTURE/BRIGHTNESS, 01h=PICTURE/CONTRAST, 02h=PICTURE/COLOR, 03h=PICTURE/HUE, 04h=PICTURE/SHARPNESS, 05h=VOLUME, 96h=LIGHT ADJUST"

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

- id: information_string_request
  label: Information String Request
  kind: query
  params:
    - name: type
      type: integer
      description: "03h=Horizontal synchronous frequency, 04h=Vertical synchronous frequency"

- id: light_mode_request
  label: Light Mode Request
  kind: query
  params: []

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  params: []

- id: lan_mac_address_status_request2
  label: LAN MAC Address Status Request2
  kind: query
  params: []

- id: pip_picture_by_picture_request
  label: PIP/Picture by Picture Request
  kind: query
  params:
    - name: target
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

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
- id: error_status_response
  label: Error Status Response
  type: object
  properties:
    - name: data01_12
      type: string
      description: Bitmapped error info (see error code list)

- id: command_response
  label: Command Response (success)
  type: object
  properties:
    - name: err1
      type: integer
      description: Error code high
    - name: err2
      type: integer
      description: Error code low
  values:
    - 0000h

- id: command_response_error
  label: Command Response (error)
  type: object
  properties:
    - name: err1
      type: integer
      description: Error code high
    - name: err2
      type: integer
      description: Error code low
  values:
    - 0001h: Invalid specified value
    - 0101h: Invalid input terminal
    - 0102h: Invalid language
    - 0203h: Value cannot be set
    - 020Dh: Power is off
    - 020Eh: Command execution failed
    - 0300h: Incorrect gain number
    - 0301h: Invalid gain
    - 0302h: Adjustment failed

- id: input_sw_change_response
  label: Input SW Change Response
  type: object
  properties:
    - name: data01
      type: integer
      description: "FFh=Error"
```

## Variables
```yaml
# UNRESOLVED: Appendix referenced but not included; input terminal values, aspect values,
# and signal type values cannot be populated without source
```

## Events
```yaml
# UNRESOLVED: no unsolicited event messages documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - msg: "POWER ON command: no other command accepted while power is turning on"
  - msg: "POWER OFF command: no other command accepted during cooling time"
```

## Notes
Serial supports selectable baud rates (115200/38400/19200/9600/4800). Source does not specify which rate is default. TCP port 7142 stated. All commands use 6-byte header + variable data + 1-byte checksum. No login or authentication described.
<!-- UNRESOLVED: Appendix "Supplementary Information by Command" referenced but not included in source; input terminal values, aspect ratio values, light mode values, signal type values, base model type values not populated -->

## Provenance

```yaml
source_domains:
  - business.sharpusa.com
  - applicationmarket.crestron.com
source_urls:
  - https://business.sharpusa.com/portals/0/downloads/manuals/sharp-pj-control-command-codes.pdf
  - https://applicationmarket.crestron.com/sharp-electronics-xg-ph80x-n/
  - https://applicationmarket.crestron.com/sharp-electronics-xg-ph80w-n/
retrieved_at: 2026-05-14T18:17:20.289Z
last_checked_at: 2026-05-14T18:17:20.289Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:20.289Z
matched_actions: 49
action_count: 50
confidence: medium
summary: "All 49 spec actions match documented source commands; transport parameters verbatim in source; full command catalogue represented. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "LAN wireless not documented; Appendix referenced but not included"
- "source lists 115200/38400/19200/9600/4800 selectable; default not stated"
- "Appendix referenced but not included; input terminal values, aspect values,"
- "no unsolicited event messages documented in source"
- "no multi-step macro sequences documented in source"
- "Appendix \"Supplementary Information by Command\" referenced but not included in source; input terminal values, aspect ratio values, light mode values, signal type values, base model type values not populated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
