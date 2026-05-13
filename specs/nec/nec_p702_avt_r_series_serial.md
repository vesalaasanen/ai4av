---
spec_id: admin/nec-p702-avt-r-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC P702-AVT-R Series Control Spec"
manufacturer: NEC
model_family: "P702-AVT-R Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "P702-AVT-R Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-04-25T21:32:24.909Z
generated_at: 2026-04-25T21:32:24.909Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-25T21:32:24.909Z
  matched_actions: 53
  action_count: 53
  confidence: high
  summary: "All 53 spec actions match source commands one-to-one with correct parameters and transport values fully supported."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# NEC P702-AVT-R Series Control Spec

## Summary
NEC P702-AVT-R Series is a professional projector supporting both RS-232C serial and wired TCP/IP control. The document covers full command set including power control, input routing, picture/sound adjustment, lens control, mute functions, Eco mode, and queryable status variables.

<!-- UNRESOLVED: LAN port number TCP 7142 stated for wired LAN control; serial baud rate is selectable (115200/38400/19200/9600/4800) — default not stated. UNRESOLVED: standby mode requirements vary by model — not enumerated in source. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142  # LAN TCP port stated in source
serial:
  baud_rate: null  # UNRESOLVED: selectable 115200/38400/19200/9600/4800 - default not stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # inferred: POWER ON/OFF commands present
- routable  # inferred: INPUT SW CHANGE command present
- queryable  # inferred: status/information request commands present
- levelable  # inferred: VOLUME ADJUST, PICTURE ADJUST commands present
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
      description: Input terminal hex code (e.g., 06h=VIDEO, 01h=COMPUTER, A1h=HDMI)

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
      description: "00h=absolute value, 01h=relative value"
    - name: value
      type: integer
      description: 16-bit signed adjustment value

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=absolute value, 01h=relative value"
    - name: value
      type: integer
      description: 16-bit signed adjustment value

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: aspect
      type: integer
      description: "00h=AUTO, 01h=WIDE ZOOM, 02h=16:9, 03h=NATIVE, 04h=4:3, 05h=15:9, 06h=16:10, 07h=LETTER BOX, 08h=ZOOM, 09h=FULL, 0Ah=FULL"

- id: other_adjust
  label: Other Adjust
  kind: action
  params:
    - name: target
      type: integer
      description: "96h FFh=LAMP ADJUST/LIGHT ADJUST"
    - name: mode
      type: integer
      description: "00h=absolute value, 01h=relative value"
    - name: value
      type: integer
      description: 16-bit signed adjustment value

- id: information_request
  label: Information Request
  kind: query
  params: []
  response:
    projector_name: string
    lamp_usage_time: integer  # seconds
    filter_usage_time: integer  # seconds

- id: filter_usage_info_request
  label: Filter Usage Info Request
  kind: query
  params: []
  response:
    filter_usage_time: integer  # seconds
    filter_alarm_start_time: integer  # seconds, -1 if undefined

- id: lamp_info_request_3
  label: Lamp Info Request 3
  kind: query
  params:
    - name: lamp
      type: integer
      description: "00h=Lamp1, 01h=Lamp2"
    - name: content
      type: integer
      description: "01h=usage time (seconds), 04h=remaining life (%)"
  response:
    lamp_usage_time: integer
    lamp_remaining_life: integer

- id: carbon_savings_request
  label: Carbon Savings Request
  kind: query
  params:
    - name: type
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
  response:
    carbon_savings_kg: float
    carbon_savings_mg: float

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: Hex key code from remote control key code table

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
      description: "00h=Stop, 01h/02h/03h=Drive plus 1s/0.5s/0.25s, 7Fh=Drive plus, 81h=Drive minus, FDh/FEh/FFh=Drive minus 0.25s/0.5s/1s"

- id: lens_control_request
  label: Lens Control Request
  kind: query
  params:
    - name: target
      type: integer
      description: "06h=Periphery Focus"
  response:
    upper_limit: integer
    lower_limit: integer
    current_value: integer

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: command
      type: integer
      description: "FFh=Stop"
    - name: mode
      type: integer
      description: "00h=absolute value, 02h=relative value"
    - name: value
      type: integer
      description: 16-bit adjustment value

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
  response:
    value: integer  # "00h=OFF, 01h=ON"

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
  label: Lens Info Request
  kind: query
  params: []
  response:
    lens_memory: integer  # bitmask
    zoom: integer
    focus: integer
    lens_shift_h: integer
    lens_shift_v: integer

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  params:
    - name: profile
      type: integer
      description: "00h=Profile 1, 01h=Profile 2"

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  params: []
  response:
    profile: integer

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  params:
    - name: adjusted_value_name
      type: integer
      description: "00h=PICTURE/BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST"
  response:
    adjustment_status: integer
    upper_limit: integer
    lower_limit: integer
    default_value: integer
    current_value: integer
    wide_adjustment_width: integer
    narrow_adjustment_width: integer
    default_valid: integer

- id: setting_request
  label: Setting Request
  kind: query
  params: []
  response:
    base_model_type: integer
    sound_function: integer  # "00h=not available, 01h=available"
    profile_number: integer  # "00h=not available, 01h=clock function, 02h=sleep timer, 03h=both"

- id: running_status_request
  label: Running Status Request
  kind: query
  params: []
  response:
    power_status: integer  # "00h=Standby, 01h=Power on"
    cooling_process: integer  # "00h=not executed, 01h=during execution"
    power_on_off_process: integer  # "00h=not executed, 01h=during execution"
    operation_status: integer  # "00h=Standby(Sleep), 04h=Power on, 05h=Cooling, 06h=Standby(error), 0Fh=Standby(power saving), 10h=Network standby"

- id: input_status_request
  label: Input Status Request
  kind: query
  params: []
  response:
    signal_switch_process: integer
    signal_list_number: integer  # actual = returned + 1
    selection_signal_type_1: integer
    selection_signal_type_2: integer
    signal_list_type: integer
    test_pattern_display: integer
    content_displayed: integer  # "00h=Video signal, 01h=No signal, 02h=Viewer, 03h=Test pattern, 04h=LAN"

- id: mute_status_request
  label: Mute Status Request
  kind: query
  params: []
  response:
    picture_mute: integer  # "00h=Off, 01h=On"
    sound_mute: integer
    onscreen_mute: integer
    forced_onscreen_mute: integer
    onscreen_display: integer

- id: model_name_request
  label: Model Name Request
  kind: query
  params: []
  response:
    model_name: string

- id: cover_status_request
  label: Cover Status Request
  kind: query
  params: []
  response:
    status: integer  # "00h=Normal (opened), 01h=Cover closed"

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: freeze
      type: integer
      description: "01h=Turn freeze on, 02h=Turn freeze off"

- id: info_string_request
  label: Info String Request
  kind: query
  params:
    - name: type
      type: integer
      description: "03h=Horizontal sync freq, 04h=Vertical sync freq"
  response:
    label: string
    value: string

- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  params: []
  response:
    eco_mode: integer  # varies by model

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  params: []
  response:
    projector_name: string

- id: lan_mac_address_request2
  label: LAN MAC Address Request 2
  kind: query
  params: []
  response:
    mac_address: string  # hex format

- id: pip_pbp_request
  label: PIP/PBP Request
  kind: query
  params:
    - name: query_type
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
  response:
    value: integer

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  params: []
  response:
    mode: integer  # "00h=OFF, 01h=ON"

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: Eco mode value varies by model

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  params:
    - name: name
      type: string
      description: Projector name (up to 16 bytes, NUL-terminated)

- id: pip_pbp_set
  label: PIP/PBP Set
  kind: action
  params:
    - name: type
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: integer

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=OFF, 01h=ON"

- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  params: []
  response:
    base_model_type: integer
    model_name: string

- id: serial_number_request
  label: Serial Number Request
  kind: query
  params: []
  response:
    serial_number: string

- id: basic_info_request
  label: Basic Info Request
  kind: query
  params: []
  response:
    operation_status: integer
    content_displayed: integer
    selection_signal_type_1: integer
    selection_signal_type_2: integer
    display_signal_type: integer
    video_mute: integer
    sound_mute: integer
    onscreen_mute: integer
    freeze_status: integer

- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: terminal
      type: integer
      description: Input terminal hex code
    - name: value
      type: integer
      description: "00h=specified terminal, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# Command responses use common format: A0h/A1h/A2h/A3h <ID1> <ID2> <LEN> <DATA...> <CKS>
# Error codes: ERR1/ERR2 combinations documented
# Success: 0000h in result fields
# Failure: FFh in command responses, error codes in ERR1/ERR2
```

## Variables
```yaml
# Parameters persist across commands:
# - ID1: Control ID (set for projector)
# - ID2: Model code (varies by model)
# - CKS: Checksum = low-order byte of sum of all preceding bytes
# - LEN: Data length of variable DATA portion
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented in source
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - Power commands block other commands during execution (POWER ON blocks during power-on; POWER OFF blocks during cooling)
# UNRESOLVED: no explicit safety warnings, voltage/power specs, or interlock procedures stated in source
```

## Notes
- Command format: `[PREAMBLE] [MODEL] <ID1> <ID2> [LEN] [DATA...] [CKS]` — all hex notation
- Checksum calculation: sum all bytes preceding CKS, take low-order 8 bits
- During power-on or power-off (including cooling), no other command is accepted
- Response format varies: A0h/A1h/A2h/A3h prefix with ERR1/ERR2 on error
- Input terminal values vary by model; common codes listed in appendix
- Standby mode requirements for accepting commands vary by model
- lamp/filter usage times update at 1-minute intervals despite 1-second resolution
<!-- UNRESOLVED: serial default baud rate not stated. UNRESOLVED: specific standby mode required for serial vs LAN control not enumerated per model. UNRESOLVED: firmware version compatibility not stated. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-04-25T21:32:24.909Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T21:32:24.909Z
matched_actions: 53
action_count: 53
confidence: high
summary: "All 53 spec actions match source commands one-to-one with correct parameters and transport values fully supported."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
