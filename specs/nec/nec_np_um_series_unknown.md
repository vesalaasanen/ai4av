---
spec_id: admin/nec-np_um_series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC NP UM Series Control Spec"
manufacturer: NEC
model_family: "NP UM Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "NP UM Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-27T05:53:06.772Z
last_checked_at: 2026-05-31T06:46:46.907Z
generated_at: 2026-05-31T06:46:46.907Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "wireless LAN unit details not in source"
  - "source documents discrete commands rather than settable variables."
  - "no unsolicited event notifications described in source."
  - "no multi-step macro sequences documented in source."
  - "Appendix \"Supplementary Information by Command\" values not included (input terminal codes, aspect values, eco mode values, sub input values, base model type codes). Source refers to Appendix but Appendix content not present in document."
  - "wireless LAN unit specifications not in source."
  - "specific model code (ID2) varies per model — not stated in source."
  - "authentication credentials or token format — none in source."
verification:
  verdict: verified
  checked_at: 2026-05-31T06:46:46.907Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions map one-to-one to source commands; transport parameters verified; complete coverage. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-27
---

# NEC NP UM Series Control Spec

## Summary
Projector supports RS-232 serial and wired LAN (TCP/IP) control via port 7142. Document BDT140013 Rev 7.1 covers 53 command sets including power, input routing, picture/sound mute, lens control, eco mode, and status queries.

<!-- UNRESOLVED: wireless LAN unit details not in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142  # stated: "Use TCP port number 7142"
serial:
  baud_rate: 115200  # stated: supports 115200/38400/19200/9600/4800 auto
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # power on/off commands present
- routable        # input switch command present
- queryable       # status request commands present
- levelable       # volume, picture adjust, lens position commands present
```

## Actions
```yaml
- id: error_status_request
  label: Error Status Request
  kind: query
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
      description: Input terminal value (see Appendix)

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
      description: "00h=absolute, 01h=relative"
    - name: value
      type: integer
      description: Adjustment value (16-bit signed)

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=absolute, 01h=relative"
    - name: value
      type: integer
      description: Adjustment value (16-bit signed)

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: value
      type: integer
      description: Aspect ratio value (see Appendix)

- id: other_adjust
  label: Other Adjust
  kind: action
  params:
    - name: target
      type: integer
      description: "96h=LAMP ADJUST / LIGHT ADJUST"
    - name: mode
      type: integer
      description: "00h=absolute, 01h=relative"
    - name: value
      type: integer
      description: Adjustment value (16-bit signed)

- id: info_request
  label: Information Request
  kind: query
  params: []

- id: filter_usage_info_request
  label: Filter Usage Information Request
  kind: query
  params: []

- id: lamp_info_request_3
  label: Lamp Information Request 3
  kind: query
  params:
    - name: lamp
      type: integer
      description: "00h=Lamp1, 01h=Lamp2"
    - name: content
      type: integer
      description: "01h=usage time, 04h=remaining life"

- id: carbon_savings_info_request
  label: Carbon Savings Information Request
  kind: query
  params:
    - name: type
      type: integer
      description: "00h=Total, 01h=During operation"

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: Key code (WORD type)

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
      description: "00h=Stop, 01h/02h/03h=plus drives, 7Fh=plus, 81h=minus, FDh/FEh/FFh=minus drives"

- id: lens_control_request
  label: Lens Control Request
  kind: query
  params:
    - name: target
      type: integer
      description: Lens control target

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: stop
      type: integer
      description: "FFh=Stop"
    - name: mode
      type: integer
      description: "00h=absolute, 02h=relative"
    - name: value
      type: integer
      description: Adjustment value (16-bit signed)

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
  kind: query
  params:
    - name: option
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

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

- id: lens_info_request
  label: Lens Information Request
  kind: query
  params: []

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  params:
    - name: profile
      type: integer
      description: "00h=Profile1, 01h=Profile2"

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  params: []

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  params:
    - name: value_name
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

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: state
      type: integer
      description: "01h=On, 02h=Off"

- id: info_string_request
  label: Information String Request
  kind: query
  params:
    - name: info_type
      type: integer
      description: "03h=Horizontal sync freq, 04h=Vertical sync freq"

- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  params: []

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  params: []

- id: lan_mac_address_request2
  label: LAN MAC Address Status Request 2
  kind: query
  params: []

- id: pip_pbp_request
  label: PIP/Picture by Picture Request
  kind: query
  params:
    - name: item
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  params: []

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  params:
    - name: value
      type: integer
      description: Eco mode value (see Appendix)

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  params:
    - name: name
      type: string
      description: Projector name (up to 16 bytes, NUL terminated)

- id: pip_pbp_set
  label: PIP/Picture by Picture Set
  kind: action
  params:
    - name: item
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
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

- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: input_terminal
      type: integer
      description: Input terminal value
    - name: value
      type: integer
      description: "00h=terminal in DATA01, 02h=COMPUTER"
```

## Feedbacks
```yaml
- id: command_result
  type: enum
  values: [success, error]
  description: "ERR1/ERR2 error code combination returned with each response. 0000h=success."

- id: error_status_response
  type: object
  description: 12-byte error information bitfield

- id: power_state_response
  type: enum
  values: [standby, power_on, cooling, network_standby, standby_error, standby_power_saving]

- id: input_status_response
  type: object
  description: Input signal status including signal type, list number, display state

- id: mute_status_response
  type: object
  description: Picture/sound/onscreen/forced onscreen mute states

- id: lamp_info_response
  type: object
  description: Lamp usage time (seconds) or remaining life (%)

- id: filter_info_response
  type: object
  description: Filter usage time and alarm start time (seconds)

- id: carbon_savings_response
  type: object
  description: Carbon savings in kg (max 99999) and mg (max 999999)

- id: projector_name_response
  type: string
  description: Projector name string (NUL terminated)

- id: mac_address_response
  type: string
  description: MAC address (hex)

- id: model_name_response
  type: string
  description: Model name (NUL terminated)

- id: lens_position_response
  type: object
  description: Upper/lower limits and current lens position values

- id: gain_parameter_response
  type: object
  description: Adjustment range, default value, current value, adjustment width

- id: info_string_response
  type: string
  description: Information string (NUL terminated)
```

## Variables
```yaml
# UNRESOLVED: source documents discrete commands rather than settable variables.
# All parameters are command-embedded; no standalone parameter store found.
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source.
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - id: power_cooling_lock
    description: "While power on/off command is executing (including cooling time), no other command can be accepted."
  - id: interlock_switch
    description: "DATA01 Bit1 in extended status indicates interlock switch open."
```

## Notes
Serial cable: cross cable required. PC CONTROL port (D-SUB 9P) used for RS-232. LAN port: RJ-45 8-pin. Checksum: sum all preceding bytes, low-order byte of result. Power on/off blocks all other commands during execution. Lens drive commands can be re-issued without stop to continue driving. Lamp/filter usage time updated at 1-minute intervals despite 1-second resolution.
<!-- UNRESOLVED: Appendix "Supplementary Information by Command" values not included (input terminal codes, aspect values, eco mode values, sub input values, base model type codes). Source refers to Appendix but Appendix content not present in document. -->
<!-- UNRESOLVED: wireless LAN unit specifications not in source. -->
<!-- UNRESOLVED: specific model code (ID2) varies per model — not stated in source. -->
<!-- UNRESOLVED: authentication credentials or token format — none in source. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-27T05:53:06.772Z
last_checked_at: 2026-05-31T06:46:46.907Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T06:46:46.907Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions map one-to-one to source commands; transport parameters verified; complete coverage. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "wireless LAN unit details not in source"
- "source documents discrete commands rather than settable variables."
- "no unsolicited event notifications described in source."
- "no multi-step macro sequences documented in source."
- "Appendix \"Supplementary Information by Command\" values not included (input terminal codes, aspect values, eco mode values, sub input values, base model type codes). Source refers to Appendix but Appendix content not present in document."
- "wireless LAN unit specifications not in source."
- "specific model code (ID2) varies per model — not stated in source."
- "authentication credentials or token format — none in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
