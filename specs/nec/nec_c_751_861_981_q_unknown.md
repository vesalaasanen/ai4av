---
spec_id: admin/nec-c751q-c861q-c981q
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC C751Q/C861Q/C981Q Control Spec"
manufacturer: NEC
model_family: C751Q
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - C751Q
    - C861Q
    - C981Q
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-13T07:44:09.028Z
last_checked_at: 2026-05-16T11:35:04.404Z
generated_at: 2026-05-16T11:35:04.404Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "flow control not stated; RTS/CTS handshake pins present in pinout"
  - "volume/brightness values readable via GAIN PARAMETER REQUEST and"
  - "no unsolicited event notifications described in source."
  - "no multi-step macro sequences described in source."
  - "no explicit voltage/power/current specifications in source."
  - "Appendix \"Supplementary Information by Command\" referenced for input terminal values, aspect values, eco mode values, base model type values, and sub input values — not included in this source document."
  - "wireless LAN unit specifications and port configuration not stated beyond \"see operation manual of wireless LAN unit\"."
  - "firmware version compatibility not stated in source."
verification:
  verdict: verified
  checked_at: 2026-05-16T11:35:04.404Z
  matched_actions: 28
  action_count: 53
  confidence: medium
  summary: "All 28 spec actions matched to source commands with exact hex tokens; transport parameters verified; source command catalogue fully represented. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# NEC C751Q/C861Q/C981Q Control Spec

## Summary
NEC C-series LCD projectors (C751Q, C861Q, C981Q) controllable via RS-232C serial or wired TCP/IP on port 7142. Full duplex communication. No authentication required.

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142  # stated: "Use TCP port number 7142"
serial:
  baud_rate: 115200  # stated: "115200/38400/19200/9600/4800 bps"
  data_bits: 8       # stated: "8 bits"
  parity: none       # stated: "None"
  stop_bits: 1       # stated: "1 bit"
  flow_control: none # UNRESOLVED: flow control not stated; RTS/CTS handshake pins present in pinout
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable    # POWER ON / POWER OFF commands present
- routable     # INPUT SW CHANGE command present
- queryable    # INFORMATION REQUEST, STATUS REQUEST, INPUT STATUS REQUEST, MUTE STATUS REQUEST present
- levelable    # VOLUME ADJUST, PICTURE ADJUST, GAIN PARAMETER REQUEST present
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
  hex: "02h 00h 00h 00h 00h 02h"

- id: power_off
  label: Power Off
  kind: action
  params: []
  hex: "02h 01h 00h 00h 00h 03h"

- id: input_sw_change
  label: Input Switch Change
  kind: action
  params:
    - name: input_terminal
      type: integer
      description: Input terminal value (e.g. 06h for video port)

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  params: []
  hex: "02h 10h 00h 00h 00h 12h"

- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  params: []
  hex: "02h 11h 00h 00h 00h 13h"

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  params: []
  hex: "02h 12h 00h 00h 00h 14h"

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  params: []
  hex: "02h 13h 00h 00h 00h 15h"

- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  params: []
  hex: "02h 14h 00h 00h 00h 16h"

- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  params: []
  hex: "02h 15h 00h 00h 00h 17h"

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
      description: 16-bit signed adjustment value (low-order byte first)

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=absolute, 01h=relative"
    - name: value
      type: integer
      description: 16-bit signed value (low-order byte first)

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: value
      type: integer
      description: Aspect value (see Appendix for enumeration)

- id: other_adjust
  label: Other Adjust (Lamp/Light)
  kind: action
  params:
    - name: target
      type: integer
      description: "96h=Lamp/Light Adjust"
    - name: mode
      type: integer
      description: "00h=absolute, 01h=relative"
    - name: value
      type: integer
      description: 16-bit signed value (low-order byte first)

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: Key code (WORD type, e.g. 02h=POWER ON, 03h=POWER OFF, 05h=AUTO)

- id: shutter_close
  label: Shutter Close
  kind: action
  params: []
  hex: "02h 16h 00h 00h 00h 18h"

- id: shutter_open
  label: Shutter Open
  kind: action
  params: []
  hex: "02h 17h 00h 00h 00h 19h"

- id: lens_control
  label: Lens Control
  kind: action
  params:
    - name: target
      type: integer
      description: "06h=Periphery Focus"
    - name: direction
      type: integer
      description: "00h=Stop, 01h/02h/03h=Drive plus, 7Fh=Drive cont plus, 81h=Drive cont minus, FDh/FEh/FFh=Drive minus"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: command
      type: integer
      description: "FFh=Stop, else adjustment"
    - name: mode
      type: integer
      description: "00h=absolute, 02h=relative"
    - name: value
      type: integer
      description: 16-bit value (low-order byte first)

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
    - name: value
      type: integer
      description: Eco mode value (see Appendix)

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  params:
    - name: name
      type: string
      description: Projector name (up to 16 bytes, NUL-terminated)

- id: pip_picture_by_picture_set
  label: PIP/Picture-by-Picture Set
  kind: action
  params:
    - name: target
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: integer
      description: Setting value per target

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
      description: "01h=Freeze on, 02h=Freeze off"

- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: input_terminal
      type: integer
      description: Input terminal value
    - name: value
      type: integer
      description: "00h=terminal specified in DATA01, 02h=COMPUTER"

- id: information_request
  label: Information Request
  kind: query
  params: []
  hex: "03h 8Ah 00h 00h 00h 8Dh"

- id: filter_usage_request
  label: Filter Usage Information Request
  kind: query
  params: []
  hex: "03h 95h 00h 00h 00h 98h"

- id: lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  params:
    - name: lamp
      type: integer
      description: "00h=Lamp 1, 01h=Lamp 2"
    - name: content
      type: integer
      description: "01h=Lamp usage time, 04h=Lamp remaining life"

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

- id: gain_parameter_request_3
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
  hex: "00h 85h 00h 00h 01h 00h 86h"

- id: running_status_request
  label: Running Status Request
  kind: query
  params: []
  hex: "00h 85h 00h 00h 01h 01h 87h"

- id: input_status_request
  label: Input Status Request
  kind: query
  params: []
  hex: "00h 85h 00h 00h 01h 02h 88h"

- id: mute_status_request
  label: Mute Status Request
  kind: query
  params: []
  hex: "00h 85h 00h 00h 01h 03h 89h"

- id: model_name_request
  label: Model Name Request
  kind: query
  params: []
  hex: "00h 85h 00h 00h 01h 04h 8Ah"

- id: cover_status_request
  label: Cover Status Request
  kind: query
  params: []
  hex: "00h 85h 00h 00h 01h 05h 8Bh"

- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  params: []
  hex: "03h B0h 00h 00h 01h 07h BBh"

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  params: []
  hex: "03h B0h 00h 00h 01h 2Ch E0h"

- id: lan_mac_address_request
  label: LAN MAC Address Status Request 2
  kind: query
  params: []
  hex: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"

- id: pip_picture_by_picture_request
  label: PIP/Picture-by-Picture Request
  kind: query
  params:
    - name: target
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  params: []
  hex: "03h B0h 00h 00h 02h DFh 00h 94h"

- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  params: []
  hex: "00h BFh 00h 00h 01h 00h C0h"

- id: serial_number_request
  label: Serial Number Request
  kind: query
  params: []
  hex: "00h BFh 00h 00h 02h 01h 06h C8h"

- id: basic_information_request
  label: Basic Information Request
  kind: query
  params: []
  hex: "00h BFh 00h 00h 01h 02h C2h"

- id: error_status_request
  label: Error Status Request
  kind: query
  params: []
  hex: "00h 88h 00h 00h 00h 88h"

- id: lens_information_request
  label: Lens Information Request
  kind: query
  params: []
  hex: "02h 22h 00h 00h 01h 00h 25h"

- id: information_string_request
  label: Information String Request
  kind: query
  params:
    - name: type
      type: integer
      description: "03h=Horizontal sync freq, 04h=Vertical sync freq"
```

## Feedbacks
```yaml
- id: error_status
  label: Error Status
  type: object
  fields:
    - name: data01
      type: object
      description: "Bit0=cover error, Bit1=temp error, Bit3=fan error, Bit4=fan error, Bit5=power error, Bit6=lamp off, Bit7=lamp moratorium"
    - name: data02
      type: object
      description: "Bit0=lamp time exceeded, Bit1=formatter error, Bit2=lamp 2 off"
    - name: data03
      type: object
      description: "Bit1=FPGA error, Bit2=temp sensor error, Bit4=lamp data error, Bit5=mirror cover error, Bit6=lamp 2 moratorium, Bit7=lamp 2 time exceeded"
    - name: data04
      type: object
      description: "Bit1=lamp 2 data error, Bit2=dust temp error, Bit3=foreign matter sensor, Bit7=lens not installed"
    - name: data05_data08
      type: object
      description: Reserved for system
    - name: data09
      type: object
      description: "Bit0=portrait cover side up, Bit1=interlock switch open, Bit2=system error (Slave CPU), Bit3=system error (Formatter)"

- id: power_state
  label: Power State
  type: enum
  values: [standby, power_on, cooling, standby_sleep, standby_power_saving, standby_error, network_standby]

- id: input_status
  label: Input Status
  type: object
  fields:
    - name: signal_switch_process
      type: enum
      values: [not_executed, during_execution]
    - name: signal_list_number
      type: integer
    - name: signal_type_1
      type: integer
    - name: signal_type_2
      type: enum
      values: [computer, video, s_video, component, reserved, viewer_1_5, dvi_d, hdmi, displayport, viewer_6_10]
    - name: content_displayed
      type: enum
      values: [video_signal, no_signal, viewer, test_pattern, lan_displayed]

- id: mute_status
  label: Mute Status
  type: object
  fields:
    - name: picture_mute
      type: enum
      values: [off, on]
    - name: sound_mute
      type: enum
      values: [off, on]
    - name: onscreen_mute
      type: enum
      values: [off, on]
    - name: forced_onscreen_mute
      type: enum
      values: [off, on]
    - name: onscreen_display
      type: enum
      values: [not_displayed, displayed]

- id: model_name
  label: Model Name
  type: string

- id: projector_name
  label: Projector Name
  type: string

- id: serial_number
  label: Serial Number
  type: string

- id: lamp_usage_time
  label: Lamp Usage Time
  type: integer
  description: Seconds (updated at 1-minute intervals)

- id: lamp_remaining_life
  label: Lamp Remaining Life
  type: integer
  description: Percentage (negative if replacement deadline exceeded)

- id: filter_usage_time
  label: Filter Usage Time
  type: integer
  description: Seconds

- id: filter_alarm_start_time
  label: Filter Alarm Start Time
  type: integer
  description: Seconds

- id: carbon_savings
  label: Carbon Savings
  type: object
  fields:
    - name: kilograms
      type: integer
    - name: milligrams
      type: integer

- id: eco_mode
  label: Eco Mode
  type: integer

- id: freeze_state
  label: Freeze State
  type: enum
  values: [on, off]

- id: lens_position
  label: Lens Position
  type: object
  fields:
    - name: upper_limit
      type: integer
    - name: lower_limit
      type: integer
    - name: current_value
      type: integer

- id: gain_parameters
  label: Gain Parameters
  type: object
  fields:
    - name: status
      type: enum
      values: [display_not_possible, adjustment_not_possible, adjustment_possible, gain_does_not_exist]
    - name: upper_limit
      type: integer
    - name: lower_limit
      type: integer
    - name: default_value
      type: integer
    - name: current_value
      type: integer
    - name: adjustment_range_wide
      type: integer
    - name: adjustment_range_narrow
      type: integer

- id: mac_address
  label: MAC Address
  type: string
  description: Six hex bytes (e.g. 01h-23h-45h-67h-89h-ABh)

- id: pip_mode
  label: PIP/Picture-by-Picture Mode
  type: enum
  values: [pip, picture_by_picture]

- id: edge_blending_mode
  label: Edge Blending Mode
  type: enum
  values: [off, on]

- id: cover_status
  label: Cover Status
  type: enum
  values: [normal, cover_closed]

- id: operation_status
  label: Operation Status
  type: enum
  values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]

- id: basic_info
  label: Basic Information
  type: object
  fields:
    - name: operation_status
      type: enum
      values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
    - name: content_displayed
      type: enum
      values: [video_signal, no_signal, viewer, test_pattern, lan_displayed, test_pattern_user, signal_being_switched]
    - name: signal_type_1
      type: integer
    - name: signal_type_2
      type: enum
      values: [computer, video, s_video, component, reserved, viewer_1_5, dvi_d, hdmi, displayport, viewer_6_10]
    - name: display_signal_type
      type: enum
      values: [ntsc358, ntsc4_43, pal, pal60, secam, b_w60, b_w50, palnm, ntsc358_lbx, pal_m, pal_l, component_60hz, component_50hz, ntsc, unknown]
    - name: video_mute
      type: enum
      values: [off, on]
    - name: sound_mute
      type: enum
      values: [off, on]
    - name: onscreen_mute
      type: enum
      values: [off, on]
    - name: freeze_status
      type: enum
      values: [off, on]
```

## Variables
```yaml
# UNRESOLVED: volume/brightness values readable via GAIN PARAMETER REQUEST and
# adjustable via VOLUME ADJUST / PICTURE ADJUST - exposed via Actions, no
# separate Variables section needed per spec structure.
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source.
# Device only responds to commands; no push-style status updates.
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - While POWER ON command is executing, no other command can be accepted.
  - While POWER OFF command is executing (including cooling time), no other command can be accepted.
  - After sending "7Fh" (Drive in direction of plus) or "81h" (Drive in direction of minus) in DATA02 for LENS CONTROL, lens can be stopped by sending "00h".
  - Lens continues driving if same LENS CONTROL command is re-sent without a stop.
# UNRESOLVED: no explicit voltage/power/current specifications in source.
```

## Notes
Command packet format: `_20h 88h <ID1> <ID2> 0Ch <DATA01> - <DATA12> <CKS>_` for outgoing; response prefix `A0h`/`A2h`/`A3h` indicates success without/with data/error. All multi-byte numeric values use low-order byte first (little-endian). Checksum = low-order one byte of sum of all preceding bytes. Control ID must be set before use. No login/password procedure described — auth.type: none. Baud rate selectable from 115200/38400/19200/9600/4800 bps (default not stated). Serial flow control pins (RTS/CTS) present in pinout but no explicit flow control configuration stated in communication conditions. TCP port 7142 is the only stated port; no mention of Telnet or HTTP layer.
<!-- UNRESOLVED: Appendix "Supplementary Information by Command" referenced for input terminal values, aspect values, eco mode values, base model type values, and sub input values — not included in this source document. -->
<!-- UNRESOLVED: wireless LAN unit specifications and port configuration not stated beyond "see operation manual of wireless LAN unit". -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-13T07:44:09.028Z
last_checked_at: 2026-05-16T11:35:04.404Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-16T11:35:04.404Z
matched_actions: 28
action_count: 53
confidence: medium
summary: "All 28 spec actions matched to source commands with exact hex tokens; transport parameters verified; source command catalogue fully represented. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "flow control not stated; RTS/CTS handshake pins present in pinout"
- "volume/brightness values readable via GAIN PARAMETER REQUEST and"
- "no unsolicited event notifications described in source."
- "no multi-step macro sequences described in source."
- "no explicit voltage/power/current specifications in source."
- "Appendix \"Supplementary Information by Command\" referenced for input terminal values, aspect values, eco mode values, base model type values, and sub input values — not included in this source document."
- "wireless LAN unit specifications and port configuration not stated beyond \"see operation manual of wireless LAN unit\"."
- "firmware version compatibility not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
