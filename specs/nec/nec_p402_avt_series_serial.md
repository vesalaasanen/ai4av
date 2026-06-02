---
spec_id: admin/nec-p402-avt-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC P402-AVT Series Control Spec"
manufacturer: NEC
model_family: "P402-AVT Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "P402-AVT Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:52:51.998Z
last_checked_at: 2026-06-02T17:26:32.679Z
generated_at: 2026-06-02T17:26:32.679Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "lamp count (single vs dual) not confirmed for this specific model"
  - "source lists 115200/38400/19200/9600/4800 bps as options; specific model default not stated"
  - "RTS/CTS handshaking present in pinout but flow control not explicitly configured"
  - "variables are settable parameters not tied to discrete actions."
  - "no unsolicited event notifications described in source."
  - "no explicit safety warnings or interlock procedures in source."
  - "full input terminal code table not reproduced here (see Appendix of source)"
  - "full aspect mode code table not reproduced here (see Appendix of source)"
  - "eco mode code variants not fully enumerated (source shows multiple equivalent codes)"
  - "standby mode requirements vary by model — some require specific standby mode for serial/LAN control"
verification:
  verdict: verified
  checked_at: 2026-06-02T17:26:32.679Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions map 1-to-1 to the 53 source commands with matching parameters and transport values confirmed. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# NEC P402-AVT Series Control Spec

## Summary
NEC P402-AVT Series professional projector supporting both RS-232C serial and wired LAN (TCP/IP) control. Supports power on/off, input routing, picture/sound/onscreen mute, lens control, eco mode, and comprehensive status querying. No authentication procedure described in source.

<!-- UNRESOLVED: lamp count (single vs dual) not confirmed for this specific model -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142  # LAN TCP port stated in source
serial:
  baud_rate: null  # UNRESOLVED: source lists 115200/38400/19200/9600/4800 bps as options; specific model default not stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: RTS/CTS handshaking present in pinout but flow control not explicitly configured
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # POWER ON/OFF commands present
- routable        # INPUT SW CHANGE command present
- queryable       # INFORMATION REQUEST, STATUS REQUEST, MODEL NAME REQUEST, SERIAL NUMBER REQUEST present
- levelable       # PICTURE ADJUST, VOLUME ADJUST, ASPECT ADJUST present
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
  label: Input Switch Change
  kind: action
  params:
    - name: input
      type: integer
      description: Input terminal hex code (see Appendix)

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
      description: "00h=Absolute, 01h=Relative"
    - name: value
      type: integer
      description: 16-bit signed adjustment value

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=Absolute, 01h=Relative"
    - name: value
      type: integer
      description: 16-bit signed adjustment value

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: value
      type: integer
      description: Aspect mode hex code

- id: other_adjust
  label: Other Adjust
  kind: action
  params:
    - name: target
      type: integer
      description: "96h=Lamp/Light Adjust"
    - name: mode
      type: integer
      description: "00h=Absolute, 01h=Relative"
    - name: value
      type: integer
      description: 16-bit signed adjustment value

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: keycode
      type: integer
      description: 16-bit key code (see key code table)

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
      description: "00h=Stop, 01h/02h/03h=Drive plus 1/0.5/0.25s, 7Fh=Drive plus, 81h=Drive minus, FDh/FEh/FFh=Drive minus 0.25/0.5/1s"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: stop
      type: integer
      description: "FFh=Stop (others ignored)"
    - name: mode
      type: integer
      description: "00h=Absolute, 02h=Relative"
    - name: value
      type: integer
      description: 16-bit position value

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
      description: Eco mode hex code

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  params:
    - name: name
      type: string
      description: Up to 16-byte projector name

- id: pip_picture_by_picture_set
  label: PIP/Picture by Picture Set
  kind: action
  params:
    - name: target
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: integer
      description: Setting value

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
    - name: state
      type: integer
      description: "01h=On, 02h=Off"

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
- id: information_request
  label: Information Request
  kind: query
  params: []

- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  params: []

- id: lamp_information_request
  label: Lamp Information Request 3
  kind: query
  params:
    - name: lamp_number
      type: integer
      description: "00h=Lamp 1, 01h=Lamp 2"
    - name: content
      type: integer
      description: "01h=Lamp usage time (seconds), 04h=Lamp remaining life (%)"

- id: carbon_savings_information_request
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
      description: Lens axis target code

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  params:
    - name: option
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_information_request
  label: Lens Information Request
  kind: query
  params: []

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  params: []

- id: gain_parameter_request
  label: Gain Parameter Request 3
  kind: query
  params:
    - name: gain_name
      type: integer
      description: "00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"

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
  label: LAN MAC Address Status Request2
  kind: query
  params: []

- id: pip_picture_by_picture_request
  label: PIP/Picture by Picture Request
  kind: query
  params:
    - name: target
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

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
- id: error_status
  type: bitfield
  values:
    - bit0: Cover error
    - bit1: Temperature error (bi-metallic strip)
    - bit3: Fan error
    - bit4: Fan error
    - bit5: Power error
    - bit6: Lamp off or backlight off
    - bit7: Lamp in replacement moratorium
    # (see full bitfield table in source section 3.1)

- id: power_state
  type: enum
  values:
    - "00h: Standby"
    - "01h: Power on"
    - "05h: Cooling"
    - "06h: Standby (error)"
    - "0Fh: Standby (Power saving)"
    - "10h: Network standby"

- id: mute_status
  type: struct
  fields:
    - name: picture_mute
      type: enum
      values: ["00h=Off", "01h=On"]
    - name: sound_mute
      type: enum
      values: ["00h=Off", "01h=On"]
    - name: onscreen_mute
      type: enum
      values: ["00h=Off", "01h=On"]
    - name: forced_onscreen_mute
      type: enum
      values: ["00h=Off", "01h=On"]

- id: projector_info
  type: struct
  fields:
    - name: name
      type: string
      description: Up to 49 characters
    - name: lamp_usage_time
      type: integer
      description: Seconds (updated at 1-minute intervals)
    - name: filter_usage_time
      type: integer
      description: Seconds

- id: lamp_info
  type: struct
  fields:
    - name: lamp_number
      type: integer
      description: "00h=Lamp 1, 01h=Lamp 2"
    - name: usage_time
      type: integer
      description: Seconds
    - name: remaining_life
      type: integer
      description: Percentage (negative if deadline exceeded)

- id: filter_usage_info
  type: struct
  fields:
    - name: usage_time
      type: integer
      description: Seconds
    - name: alarm_start_time
      type: integer
      description: Seconds (-1 if undefined)

- id: carbon_savings
  type: struct
  fields:
    - name: type
      type: enum
      values: ["00h=Total", "01h=During operation"]
    - name: kilograms
      type: integer
      description: Maximum 99999 kg
    - name: milligrams
      type: integer
      description: Maximum 999999 mg

- id: model_name
  type: string
  description: Up to 32 characters

- id: serial_number
  type: string
  description: Up to 16 characters

- id: base_model_type
  type: string
  description: Model type code

- id: running_status
  type: struct
  fields:
    - name: power_status
      type: enum
      values: ["00h=Standby", "01h=Power on"]
    - name: cooling_status
      type: enum
      values: ["00h=Not executed", "01h=During execution"]
    - name: operation_status
      type: enum
      values: ["00h=Standby(Sleep)", "04h=Power on", "05h=Cooling", "06h=Standby(error)", "0Fh=Standby(Power saving)", "10h=Network standby"]

- id: input_status
  type: struct
  fields:
    - name: signal_switch_process
      type: enum
      values: ["00h=Not executed", "01h=During execution"]
    - name: signal_list_number
      type: integer
    - name: signal_type_1
      type: integer
    - name: signal_type_2
      type: integer
    - name: content_displayed
      type: enum
      values: ["00h=Video signal", "01h=No signal", "02h=Viewer", "03h=Test pattern", "04h=LAN"]

- id: cover_status
  type: enum
  values: ["00h=Normal (opened)", "01h=Cover closed"]

- id: lens_position
  type: struct
  fields:
    - name: upper_limit
      type: integer
    - name: lower_limit
      type: integer
    - name: current_value
      type: integer

- id: lens_info
  type: bitfield
  description: Lens operation status bits

- id: lens_memory_option
  type: struct
  fields:
    - name: option
      type: enum
      values: ["00h=LOAD BY SIGNAL", "01h=FORCED MUTE"]
    - name: value
      type: enum
      values: ["00h=OFF", "01h=ON"]

- id: lens_profile
  type: enum
  values: ["00h=Profile 1", "01h=Profile 2"]

- id: eco_mode
  type: integer
  description: Eco mode hex code

- id: gain_parameter
  type: struct
  fields:
    - name: status
      type: enum
      values: ["00h=Display not possible", "01h=Adjustment not possible", "02h=Adjustment possible", "FFh=Gain does not exist"]
    - name: upper_limit
      type: integer
    - name: lower_limit
      type: integer
    - name: default_value
      type: integer
    - name: current_value
      type: integer

- id: pip_picture_by_picture
  type: struct
  fields:
    - name: mode
      type: enum
      values: ["00h=PIP", "01h=PICTURE BY PICTURE"]
    - name: start_position
      type: enum
      values: ["00h=TOP-LEFT", "01h=TOP-RIGHT", "02h=BOTTOM-LEFT", "03h=BOTTOM-RIGHT"]

- id: edge_blending_mode
  type: enum
  values: ["00h=OFF", "01h=ON"]

- id: lan_projector_name
  type: string
  description: Up to 17 characters

- id: lan_mac_address
  type: string
  description: 6-byte MAC address

- id: basic_information
  type: struct
  fields:
    - name: operation_status
      type: enum
      values: ["00h=Standby(Sleep)", "04h=Power on", "05h=Cooling", "06h=Standby(error)", "0Fh=Standby(Power saving)", "10h=Network standby"]
    - name: content_displayed
      type: enum
      values: ["00h=Video signal", "01h=No signal", "02h=Viewer", "03h=Test pattern", "04h=LAN", "05h=Test pattern(user)", "10h=Signal being switched"]
    - name: signal_type_1
      type: integer
    - name: signal_type_2
      type: integer
    - name: display_signal_type
      type: integer
    - name: video_mute
      type: enum
      values: ["00h=Off", "01h=On"]
    - name: sound_mute
      type: enum
      values: ["00h=Off", "01h=On"]
    - name: onscreen_mute
      type: enum
      values: ["00h=Off", "01h=On"]
    - name: freeze_status
      type: enum
      values: ["00h=Off", "01h=On"]

- id: information_string
  type: struct
  fields:
    - name: type
      type: enum
      values: ["03h=Horizontal sync frequency", "04h=Vertical sync frequency"]
    - name: string
      type: string

- id: command_response
  type: enum
  values: ["00h=Success", "FFh=Error"]
  description: Generic command response with ERR1/ERR2 error codes
```

## Variables
```yaml
# UNRESOLVED: variables are settable parameters not tied to discrete actions.
# The following are settable but documented as action params rather than separate variables:
# - Eco mode (097-8 request / 098-8 set)
# - LAN projector name (097-45 request / 098-45 set)
# - PIP/Picture by Picture (097-198 request / 098-198 set)
# - Edge blending mode (097-243-1 request / 098-243-1 set)
# - Audio select (319-10 set only)
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source.
# All communication appears to be command/response (poll-based).
```

## Macros
```yaml
# No explicit multi-step macros described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety warnings or interlock procedures in source.
# Note: POWER ON command blocks other commands during execution.
# Note: POWER OFF command blocks during cooling time.
```

## Notes
Command checksum (CKS) is low-order byte of sum of all preceding bytes. Control ID (ID1) and Model Code (ID2) are required parameters set on the projector. The source documents a companion LAN interface using TCP port 7142; this spec covers the serial protocol. Input terminal and aspect hex codes are provided in the Appendix of the source document.
<!-- UNRESOLVED: full input terminal code table not reproduced here (see Appendix of source) -->
<!-- UNRESOLVED: full aspect mode code table not reproduced here (see Appendix of source) -->
<!-- UNRESOLVED: eco mode code variants not fully enumerated (source shows multiple equivalent codes) -->
<!-- UNRESOLVED: standby mode requirements vary by model — some require specific standby mode for serial/LAN control -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:52:51.998Z
last_checked_at: 2026-06-02T17:26:32.679Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:26:32.679Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions map 1-to-1 to the 53 source commands with matching parameters and transport values confirmed. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "lamp count (single vs dual) not confirmed for this specific model"
- "source lists 115200/38400/19200/9600/4800 bps as options; specific model default not stated"
- "RTS/CTS handshaking present in pinout but flow control not explicitly configured"
- "variables are settable parameters not tied to discrete actions."
- "no unsolicited event notifications described in source."
- "no explicit safety warnings or interlock procedures in source."
- "full input terminal code table not reproduced here (see Appendix of source)"
- "full aspect mode code table not reproduced here (see Appendix of source)"
- "eco mode code variants not fully enumerated (source shows multiple equivalent codes)"
- "standby mode requirements vary by model — some require specific standby mode for serial/LAN control"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
