---
spec_id: admin/nec-exx7q-unknown-family
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC EXX7Q Control Spec"
manufacturer: NEC
model_family: EXX7Q
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - EXX7Q
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-13T07:57:58.041Z
last_checked_at: 2026-06-03T07:29:13.697Z
generated_at: 2026-06-03T07:29:13.697Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "wireless LAN control not documented beyond mention of external unit"
  - "actual range not stated in source"
  - "valid values in Appendix, not in source"
  - "no unsolicited notification mechanism described in source."
  - "no explicit multi-step sequences described in source."
  - "power on/off commands block other commands during execution"
  - "input terminal value mappings (Appendix referenced but not in source)"
  - "aspect, eco mode, sub input setting values (Appendix referenced but not in source)"
  - "firmware version compatibility"
  - "wireless LAN control commands"
verification:
  verdict: verified
  checked_at: 2026-06-03T07:29:13.697Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "Spec completely verified (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# NEC EXX7Q Control Spec

## Summary
Projector supports RS-232 serial and wired TCP/IP control. Serial: RS-232C, configurable baud (115200/38400/19200/9600/4800), 8N1. TCP: port 7142, no authentication required. Binary command format with checksum, variable-length payload.

<!-- UNRESOLVED: wireless LAN control not documented beyond mention of external unit -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142
serial:
  baud_rate: 115200  # auto-switchable: 115200/38400/19200/9600/4800
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
- id: power_on
  label: Power On
  kind: action
  params: []

- id: power_off
  label: Power Off
  kind: action
  params: []

- id: input_switch_change
  label: Input Switch Change
  kind: action
  params:
    - name: input_terminal
      type: integer
      description: Input terminal value (see Appendix for values)

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
      description: "0=brightness, 1=contrast, 2=color, 3=hue, 4=sharpness"
    - name: mode
      type: integer
      description: "0=absolute, 1=relative"
    - name: value
      type: integer
      description: 16-bit signed adjustment value (low then high byte)

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=absolute, 1=relative"
    - name: value
      type: integer
      description: 16-bit signed adjustment value (low then high byte)

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: value
      type: integer
      description: Aspect setting value (see Appendix)

- id: other_adjust
  label: Other Adjust
  kind: action
  params:
    - name: target
      type: integer
      description: "96h=LAMP ADJUST/LIGHT ADJUST"
    - name: mode
      type: integer
      description: "0=absolute, 1=relative"
    - name: value
      type: integer
      description: 16-bit signed adjustment value (low then high byte)

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: Key code (16-bit word). See key code table for mappings.

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
      description: "0=stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=continuous+, 81h=continuous-, Fdh=-0.25s, FEh=-0.5s, FFh=-1s"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: action
      type: integer
      description: "FFh=stop, else adjustment"
    - name: mode
      type: integer
      description: "0=absolute, 2=relative"
    - name: value
      type: integer
      description: 16-bit signed adjustment value (low then high byte)

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: "0=MOVE, 1=STORE, 2=RESET"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: "0=MOVE, 1=STORE, 2=RESET"

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  params:
    - name: option
      type: integer
      description: "0=LOAD BY SIGNAL, 1=FORCED MUTE"
    - name: value
      type: integer
      description: "0=OFF, 1=ON"

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  params:
    - name: profile_number
      type: integer
      description: "0=Profile 1, 1=Profile 2"

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  params:
    - name: value
      type: integer
      description: Eco mode setting value (see Appendix)

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  params:
    - name: name
      type: string
      description: Projector name (up to 16 bytes, NUL-terminated)

- id: pip_picture_by_picture_set
  label: PIP/Picture By Picture Set
  kind: action
  params:
    - name: target
      type: integer
      description: "0=MODE, 1=START POSITION, 2=SUB INPUT, 9=SUB INPUT 2, A=SUB INPUT 3"
    - name: value
      type: integer
      description: Setting value depends on target (see spec)

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ON"

- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: input_terminal
      type: integer
      description: Input terminal value
    - name: value
      type: integer
      description: "0=terminal specified in DATA01, 2=COMPUTER"

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: action
      type: integer
      description: "1=freeze on, 2=freeze off"

- id: error_status_request
  label: Error Status Request
  kind: query
  params: []

- id: information_request
  label: Information Request
  kind: query
  params: []

- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  params: []

- id: lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  params:
    - name: lamp
      type: integer
      description: "0=lamp 1, 1=lamp 2"
    - name: content
      type: integer
      description: "1=usage time (seconds), 4=remaining life (%)"

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  params:
    - name: type
      type: integer
      description: "0=Total Carbon Savings, 1=Carbon Savings during operation"

- id: lens_control_request
  label: Lens Control Request
  kind: query
  params:
    - name: content
      type: integer
      description: "06h=Periphery Focus"

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  params:
    - name: option
      type: integer
      description: "0=LOAD BY SIGNAL, 1=FORCED MUTE"

- id: lens_information_request
  label: Lens Information Request
  kind: query
  params: []

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
      description: "0=PICTURE/BRIGHTNESS, 1=CONTRAST, 2=COLOR, 3=HUE, 4=SHARPNESS, 5=VOLUME, 96h=LAMP ADJUST"

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
      description: "3=horizontal sync frequency, 4=vertical sync frequency"

- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  params: []

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  params: []

- id: lan_mac_address_status_request2
  label: LAN MAC Address Status Request 2
  kind: query
  params: []

- id: pip_picture_by_picture_request
  label: PIP/Picture By Picture Request
  kind: query
  params:
    - name: target
      type: integer
      description: "0=MODE, 1=START POSITION, 2=SUB INPUT, 9=SUB INPUT 2, A=SUB INPUT 3"

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
# Error codes (ERR1/ERR2 pairs):
# 00h/00h = unrecognized command
# 00h/01h = command not supported
# 01h/00h = invalid value
# 01h/01h = invalid input terminal
# 01h/02h = invalid language
# 02h/00h = memory allocation error
# 02h/02h = memory in use
# 02h/03h = value cannot be set
# 02h/04h = forced onscreen mute on
# 02h/06h = viewer error
# 02h/07h = no signal
# 02h/08h = test pattern or filter displayed
# 02h/09h = no PC card inserted
# 02h/0Ah = memory operation error
# 02h/0Ch = entry list displayed
# 02h/0Dh = power is off
# 02h/0Eh = command execution failed
# 02h/0Fh = no authority
# 03h/00h = incorrect gain number
# 03h/01h = invalid gain
# 03h/02h = adjustment failed

# Query responses include:
# - Error status bitfield (12 bytes): cover error, temp error, fan error, power error, lamp off, lamp usage exceeded, formatter error, lamp 2 off, FPGA error, mirror cover error, dust temp error, foreign matter sensor, lens not installed, ballast comm error, iris calibration error
# - Projector info: name, lamp usage time, filter usage time
# - Lamp info: usage time (seconds), remaining life (%)
# - Carbon savings: kg + mg
# - Mute status: picture/sound/onscreen/forced onscreen mute
# - Input status: signal switch process, signal list number, signal type 1/2
# - Lens position: upper/lower limits, current value
# - Model name, serial number, base model type
# - ECO mode, projector name, MAC address
```

## Variables
```yaml
# Adjustable parameters (read/write via 030-1, 030-2, 030-12, 030-15):
- id: brightness
  type: integer
  range: [low, high]  # UNRESOLVED: actual range not stated in source
- id: contrast
  type: integer
  range: [low, high]  # UNRESOLVED
- id: color
  type: integer
  range: [low, high]  # UNRESOLVED
- id: hue
  type: integer
  range: [low, high]  # UNRESOLVED
- id: sharpness
  type: integer
  range: [low, high]  # UNRESOLVED
- id: volume
  type: integer
  range: [low, high]  # UNRESOLVED
- id: lamp_adjust_light_adjust
  type: integer
  range: [low, high]  # UNRESOLVED
- id: aspect
  type: integer  # UNRESOLVED: valid values in Appendix, not in source
- id: eco_mode
  type: integer  # UNRESOLVED: valid values in Appendix, not in source
- id: pip_mode
  type: integer
  values: [0, 1]  # 0=PIP, 1=PICTURE BY PICTURE
- id: pip_start_position
  type: integer
  values: [0, 1, 2, 3]  # 0=TOP-LEFT, 1=TOP-RIGHT, 2=BOTTOM-LEFT, 3=BOTTOM-RIGHT
- id: edge_blending_mode
  type: integer
  values: [0, 1]  # 0=OFF, 1=ON
- id: freeze
  type: boolean
- id: lens_memory_option
  type: object
  fields:
    - name: load_by_signal
      type: boolean
    - name: forced_mute
      type: boolean
- id: lens_profile
  type: integer
  values: [0, 1]  # 0=Profile 1, 1=Profile 2
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification mechanism described in source.
# Device does not initiate communication - all control is poll/response.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: power on/off commands block other commands during execution
# (no other safety warnings or interlock procedures stated in source)
```

## Notes
Serial and TCP both supported. Command format: `[HEADER][ID1][ID2][LEN][DATA...][CKS]` — 6-byte minimum, variable data length, checksum is low-order byte of sum of preceding bytes. Responses follow same structure with different header byte (A0h/A2h/A3h). Power-on blocks all other commands until complete. Power-off blocks during cooling. Input switch mute auto-clears on terminal/signal change. Lens continuous drive stops on 00h send. Lamp usage time updated at 1-minute intervals despite 1-second resolution.
<!-- UNRESOLVED: input terminal value mappings (Appendix referenced but not in source) -->
<!-- UNRESOLVED: aspect, eco mode, sub input setting values (Appendix referenced but not in source) -->
<!-- UNRESOLVED: firmware version compatibility -->
<!-- UNRESOLVED: wireless LAN control commands -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-13T07:57:58.041Z
last_checked_at: 2026-06-03T07:29:13.697Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-03T07:29:13.697Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "Spec completely verified (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "wireless LAN control not documented beyond mention of external unit"
- "actual range not stated in source"
- "valid values in Appendix, not in source"
- "no unsolicited notification mechanism described in source."
- "no explicit multi-step sequences described in source."
- "power on/off commands block other commands during execution"
- "input terminal value mappings (Appendix referenced but not in source)"
- "aspect, eco mode, sub input setting values (Appendix referenced but not in source)"
- "firmware version compatibility"
- "wireless LAN control commands"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
