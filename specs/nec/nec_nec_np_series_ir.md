---
spec_id: admin/nec-nec-np-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC NEC NP Series Control Spec"
manufacturer: NEC
model_family: "NEC NP Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "NEC NP Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-07-21T23:52:53.288Z
last_checked_at: 2026-07-22T00:08:32.171Z
generated_at: 2026-07-22T00:08:32.171Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Source does not provide a single model-specific protocol profile; model code and control ID vary by projector model."
  - "no unsolicited notification format documented in source"
  - "no explicit multi-step macro documented in source"
  - "Exact model-specific ID2 values, input-terminal values, aspect values, eco-mode values, PIP/PBP sub-input values, supported parameters, and firmware compatibility are not stated."
verification:
  verdict: verified
  checked_at: 2026-07-22T00:08:32.171Z
  matched_actions: 54
  action_count: 54
  confidence: medium
  summary: "All 54 spec actions match source commands literally; transport parameters verified; one-to-one coverage. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-22
---

# NEC NEC NP Series Control Spec

## Summary
NEC NP Series projectors support RS-232C serial control and TCP control over wired or wireless LAN. This spec covers power, input, mute, picture, volume, lens, projector status, information, eco, edge blending, PIP/PBP, and audio-selection commands.

<!-- UNRESOLVED: Source does not provide a single model-specific protocol profile; model code and control ID vary by projector model. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: rts_cts
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # inferred from power on/off commands
- routable  # inferred from input switching commands
- queryable  # inferred from query commands returning values
- levelable  # inferred from volume and picture adjustment commands
```

## Actions
```yaml
- id: error_status_request
  label: Error Status Request
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

- id: power_on
  label: Power On
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []

- id: input_switch
  label: Input Switch Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h {input} {checksum}"
  params:
    - name: input
      type: byte
      description: Input terminal value specified by model appendix.
    - name: checksum
      type: byte
      description: Low-order byte of sum of preceding bytes.

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []

- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []

- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: picture_adjust
  label: Picture Adjust
  kind: action
  command: "03h 10h 00h 00h 05h {target} FFh {value_mode} {value_low} {value_high} {checksum}"
  params:
    - name: target
      type: byte
      description: "00h brightness, 01h contrast, 02h color, 03h hue, 04h sharpness."
    - name: value_mode
      type: byte
      description: "00h absolute value, 01h relative value."
    - name: value_low
      type: byte
      description: Adjustment value low-order byte.
    - name: value_high
      type: byte
      description: Adjustment value high-order byte.
    - name: checksum
      type: byte
      description: Low-order byte of sum of preceding bytes.

- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {value_mode} {value_low} {value_high} {checksum}"
  params:
    - name: value_mode
      type: byte
      description: "00h absolute value, 01h relative value."
    - name: value_low
      type: byte
      description: Adjustment value low-order byte.
    - name: value_high
      type: byte
      description: Adjustment value high-order byte.
    - name: checksum
      type: byte
      description: Low-order byte of sum of preceding bytes.

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {aspect} 00h {checksum}"
  params:
    - name: aspect
      type: byte
      description: Aspect value specified by model appendix.
    - name: checksum
      type: byte
      description: Low-order byte of sum of preceding bytes.

- id: other_adjust
  label: Other Adjust
  kind: action
  command: "03h 10h 00h 00h 05h {target} {target_value} {value_mode} {value_low} {value_high} {checksum}"
  params:
    - name: target
      type: byte
      description: "96h."
    - name: target_value
      type: byte
      description: "FFh for LAMP ADJUST / LIGHT ADJUST."
    - name: value_mode
      type: byte
      description: "00h absolute value, 01h relative value."
    - name: value_low
      type: byte
      description: Adjustment value low-order byte.
    - name: value_high
      type: byte
      description: Adjustment value high-order byte.
    - name: checksum
      type: byte
      description: Low-order byte of sum of preceding bytes.

- id: information_request
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []

- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []

- id: lamp_information_request
  label: Lamp Information Request
  kind: query
  command: "03h 96h 00h 00h 02h {lamp} {content} {checksum}"
  params:
    - name: lamp
      type: byte
      description: "00h lamp 1, 01h lamp 2; lamp 2 effective only for two-lamp models."
    - name: content
      type: byte
      description: "01h lamp usage time, 04h lamp remaining life."
    - name: checksum
      type: byte
      description: Low-order byte of sum of preceding bytes.

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h {savings_type} {checksum}"
  params:
    - name: savings_type
      type: byte
      description: "00h total carbon savings, 01h carbon savings during operation."
    - name: checksum
      type: byte
      description: Low-order byte of sum of preceding bytes.

- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h {key_low} {key_high} {checksum}"
  params:
    - name: key_low
      type: byte
      description: Key code low-order byte.
    - name: key_high
      type: byte
      description: Key code high-order byte; documented key codes use 00h.
    - name: checksum
      type: byte
      description: Low-order byte of sum of preceding bytes.

- id: shutter_close
  label: Shutter Close
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

- id: shutter_open
  label: Shutter Open
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

- id: lens_control
  label: Lens Control
  kind: action
  command: "02h 18h 00h 00h 02h {target} {operation} {checksum}"
  params:
    - name: target
      type: byte
      description: "06h periphery focus."
    - name: operation
      type: byte
      description: "00h stop, 01h plus 1 second, 02h plus 0.5 second, 03h plus 0.25 second, 7Fh plus continuous, 81h minus continuous, FDh minus 0.25 second, FEh minus 0.5 second, FFh minus 1 second."
    - name: checksum
      type: byte
      description: Low-order byte of sum of preceding bytes.

- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {target} 00h {checksum}"
  params:
    - name: target
      type: byte
      description: Lens adjustment target.
    - name: checksum
      type: byte
      description: Low-order byte of sum of preceding bytes.

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {target} {value_mode} {value_low} {value_high} {checksum}"
  params:
    - name: target
      type: byte
      description: Lens target; FFh stops lens movement.
    - name: value_mode
      type: byte
      description: "00h absolute value, 02h relative value; ignored when target is FFh."
    - name: value_low
      type: byte
      description: Adjustment value low-order byte.
    - name: value_high
      type: byte
      description: Adjustment value high-order byte.
    - name: checksum
      type: byte
      description: Low-order byte of sum of preceding bytes.

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h {operation} {checksum}"
  params:
    - name: operation
      type: byte
      description: "00h move, 01h store, 02h reset."
    - name: checksum
      type: byte
      description: Low-order byte of sum of preceding bytes.

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h {operation} {checksum}"
  params:
    - name: operation
      type: byte
      description: "00h move, 01h store, 02h reset."
    - name: checksum
      type: byte
      description: Low-order byte of sum of preceding bytes.

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h {option} {checksum}"
  params:
    - name: option
      type: byte
      description: "00h load by signal, 01h forced mute."
    - name: checksum
      type: byte
      description: Low-order byte of sum of preceding bytes.

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h {option} {setting} {checksum}"
  params:
    - name: option
      type: byte
      description: "00h load by signal, 01h forced mute."
    - name: setting
      type: byte
      description: "00h off, 01h on."
    - name: checksum
      type: byte
      description: Low-order byte of sum of preceding bytes.

- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h {checksum}"
  params:
    - name: checksum
      type: byte
      description: Low-order byte of sum of preceding bytes.

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h {profile} {checksum}"
  params:
    - name: profile
      type: byte
      description: "00h profile 1, 01h profile 2."
    - name: checksum
      type: byte
      description: Low-order byte of sum of preceding bytes.

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: gain_parameter_request
  label: Gain Parameter Request
  kind: query
  command: "03h 05h 00h 00h 03h {gain} 00h 00h {checksum}"
  params:
    - name: gain
      type: byte
      description: "00h brightness, 01h contrast, 02h color, 03h hue, 04h sharpness, 05h volume, 96h lamp/light adjust."
    - name: checksum
      type: byte
      description: Low-order byte of sum of preceding bytes.

- id: setting_request
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h {checksum}"
  params:
    - name: checksum
      type: byte
      description: Low-order byte of sum of preceding bytes.

- id: running_status_request
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h {checksum}"
  params:
    - name: checksum
      type: byte
      description: Low-order byte of sum of preceding bytes.

- id: input_status_request
  label: Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h {checksum}"
  params:
    - name: checksum
      type: byte
      description: Low-order byte of sum of preceding bytes.

- id: mute_status_request
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h {checksum}"
  params:
    - name: checksum
      type: byte
      description: Low-order byte of sum of preceding bytes.

- id: model_name_request
  label: Model Name Request
  kind: query
  command: "00h 85h 00h 00h 01h 04h {checksum}"
  params:
    - name: checksum
      type: byte
      description: Low-order byte of sum of preceding bytes.

- id: cover_status_request
  label: Cover Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 05h {checksum}"
  params:
    - name: checksum
      type: byte
      description: Low-order byte of sum of preceding bytes.

- id: freeze_on
  label: Freeze On
  kind: action
  command: "01h 98h 00h 00h 01h 01h {checksum}"
  params:
    - name: checksum
      type: byte
      description: Low-order byte of sum of preceding bytes.

- id: freeze_off
  label: Freeze Off
  kind: action
  command: "01h 98h 00h 00h 01h 02h {checksum}"
  params:
    - name: checksum
      type: byte
      description: Low-order byte of sum of preceding bytes.

- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h {information_type} 01h {checksum}"
  params:
    - name: information_type
      type: byte
      description: "03h horizontal synchronous frequency, 04h vertical synchronous frequency."
    - name: checksum
      type: byte
      description: Low-order byte of sum of preceding bytes.

- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  command: "03h B0h 00h 00h 01h 07h {checksum}"
  params:
    - name: checksum
      type: byte
      description: Low-order byte of sum of preceding bytes.

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch {checksum}"
  params:
    - name: checksum
      type: byte
      description: Low-order byte of sum of preceding bytes.

- id: lan_mac_address_request
  label: LAN MAC Address Request
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h {checksum}"
  params:
    - name: checksum
      type: byte
      description: Low-order byte of sum of preceding bytes.

- id: pip_pbp_request
  label: PIP/PBP Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h {parameter} {checksum}"
  params:
    - name: parameter
      type: byte
      description: "00h mode, 01h start position, 02h sub input 1, 09h sub input 2, 0Ah sub input 3."
    - name: checksum
      type: byte
      description: Low-order byte of sum of preceding bytes.

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h {checksum}"
  params:
    - name: checksum
      type: byte
      description: Low-order byte of sum of preceding bytes.

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h {value} {checksum}"
  params:
    - name: value
      type: byte
      description: Eco mode value; source does not enumerate values in this section.
    - name: checksum
      type: byte
      description: Low-order byte of sum of preceding bytes.

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {name_bytes} 00h {checksum}"
  params:
    - name: name_bytes
      type: bytes
      description: Projector name, up to 16 bytes.
    - name: checksum
      type: byte
      description: Low-order byte of sum of preceding bytes.

- id: pip_pbp_set
  label: PIP/PBP Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {parameter} {value} {checksum}"
  params:
    - name: parameter
      type: byte
      description: "00h mode, 01h start position, 02h sub input 1, 09h sub input 2, 0Ah sub input 3."
    - name: value
      type: byte
      description: Setting value defined by parameter.
    - name: checksum
      type: byte
      description: Low-order byte of sum of preceding bytes.

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {value} {checksum}"
  params:
    - name: value
      type: byte
      description: "00h off, 01h on."
    - name: checksum
      type: byte
      description: Low-order byte of sum of preceding bytes.

- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  command: "00h BFh 00h 00h 01h 00h {checksum}"
  params:
    - name: checksum
      type: byte
      description: Low-order byte of sum of preceding bytes.

- id: serial_number_request
  label: Serial Number Request
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h {checksum}"
  params:
    - name: checksum
      type: byte
      description: Low-order byte of sum of preceding bytes.

- id: basic_information_request
  label: Basic Information Request
  kind: query
  command: "00h BFh 00h 00h 01h 02h {checksum}"
  params:
    - name: checksum
      type: byte
      description: Low-order byte of sum of preceding bytes.

- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h {input} {audio_source} {checksum}"
  params:
    - name: input
      type: byte
      description: Input terminal value specified by model appendix.
    - name: audio_source
      type: byte
      description: "00h terminal specified in input, 01h BNC, 02h COMPUTER."
    - name: checksum
      type: byte
      description: Low-order byte of sum of preceding bytes.
```

## Feedbacks
```yaml
- id: error_status
  type: bitfield
  description: Error information DATA01-DATA04 and extended status DATA09 from error status response.

- id: projector_information
  type: object
  description: Projector name, lamp usage time, and filter usage time.

- id: filter_usage
  type: object
  description: Filter usage time and filter alarm start time; -1 returned when no time is defined.

- id: lamp_information
  type: object
  description: Lamp usage time or remaining life for selected lamp.

- id: carbon_savings
  type: object
  description: Carbon savings in kilograms and milligrams.

- id: lens_position
  type: object
  description: Lens adjustment limits and current value.

- id: lens_information
  type: bitfield
  description: Lens memory, zoom, focus, horizontal lens shift, and vertical lens shift operation status.

- id: lens_memory_option
  type: object
  description: Load-by-signal and forced-mute settings.

- id: lens_profile
  type: enum
  values: [profile_1, profile_2]

- id: projector_settings
  type: object
  description: Base model type, sound function, and clock/sleep-timer profile information.

- id: running_status
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]

- id: input_status
  type: object
  description: Signal switching, signal list, input type, signal list type, test-pattern, and displayed content status.

- id: mute_status
  type: object
  description: Picture, sound, onscreen, forced onscreen, and onscreen-display status.

- id: model_name
  type: string
  description: NUL-terminated model name.

- id: cover_status
  type: enum
  values: [cover_opened, cover_closed]

- id: information_string
  type: string
  description: Horizontal or vertical synchronous frequency information string.

- id: eco_mode
  type: byte
  description: Eco mode value; source does not enumerate all values.

- id: lan_projector_name
  type: string
  description: NUL-terminated projector name.

- id: mac_address
  type: string
  description: Six-byte MAC address.

- id: pip_pbp
  type: object
  description: PIP/PBP mode, start position, and sub-input settings.

- id: edge_blending_mode
  type: enum
  values: [off, on]

- id: base_model_type
  type: object
  description: Base model type and model name.

- id: serial_number
  type: string
  description: NUL-terminated projector serial number.

- id: basic_information
  type: object
  description: Operation, display, input, video, mute, and freeze status.

- id: command_error
  type: object
  description: ERR1 and ERR2 response error codes and documented causes.
```

## Variables
```yaml
- id: picture_adjustment
  type: integer
  description: Brightness, contrast, color, hue, or sharpness adjustment value.

- id: volume
  type: integer
  description: Absolute or relative sound volume value.

- id: aspect
  type: byte
  description: Aspect setting value specified by model appendix.

- id: lamp_light_adjustment
  type: integer
  description: Absolute or relative lamp/light adjustment value.

- id: eco_mode
  type: byte
  description: Eco mode setting value; source does not enumerate all values.

- id: projector_name
  type: string
  description: Projector name, up to 16 bytes.

- id: pip_pbp_setting
  type: byte
  description: PIP/PBP parameter setting value.

- id: edge_blending
  type: enum
  values: [off, on]

- id: audio_selection
  type: byte
  description: Audio source selection for specified input terminal.
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification format documented in source
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - condition: power_on_or_power_off_in_progress
    behavior: No other command can be accepted during power-on, power-off, or cooling time.
  - condition: lens_continuous_drive
    behavior: Lens continuous movement stops when lens control command sends DATA02 00h.
  - condition: picture_mute_active
    behavior: Input-terminal or video-signal switch turns picture mute off.
  - condition: sound_mute_active
    behavior: Input-terminal switch, video-signal switch, or sound-volume adjustment turns sound mute off.
  - condition: onscreen_mute_active
    behavior: Input-terminal or video-signal switch turns onscreen mute off.
```

## Notes
Commands use hexadecimal byte sequences. Source defines `ID1` as configured control ID, `ID2` as model-dependent code, `LEN` as data length, and `CKS` as low-order byte of the sum of preceding bytes.

<!-- UNRESOLVED: Exact model-specific ID2 values, input-terminal values, aspect values, eco-mode values, PIP/PBP sub-input values, supported parameters, and firmware compatibility are not stated. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-07-21T23:52:53.288Z
last_checked_at: 2026-07-22T00:08:32.171Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T00:08:32.171Z
matched_actions: 54
action_count: 54
confidence: medium
summary: "All 54 spec actions match source commands literally; transport parameters verified; one-to-one coverage. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Source does not provide a single model-specific protocol profile; model code and control ID vary by projector model."
- "no unsolicited notification format documented in source"
- "no explicit multi-step macro documented in source"
- "Exact model-specific ID2 values, input-terminal values, aspect values, eco-mode values, PIP/PBP sub-input values, supported parameters, and firmware compatibility are not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
