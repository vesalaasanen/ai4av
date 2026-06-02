---
spec_id: admin/nec-p402-r-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC P402-R Series Control Spec"
manufacturer: NEC
model_family: "P402-R Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "P402-R Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:52:53.842Z
last_checked_at: 2026-06-02T22:11:22.421Z
generated_at: 2026-06-02T22:11:22.421Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TCP authentication type not stated in source"
  - "flow control configuration not stated in source"
  - "default serial baud rate not explicitly stated (multiple rates supported)"
  - "no standalone settable parameters found; all parameters are command-specific"
  - "no unsolicited event notifications described in source"
  - "no multi-step macros described in source"
  - "no explicit safety warnings or interlock procedures beyond command timing notes"
  - "complete list of key codes not provided (reference to external table)"
  - "aspect value codes reference external appendix"
  - "ECO mode values vary by model (some models use different hex codes)"
  - "HDBaseT standby mode mentioned but details vary by model"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:11:22.421Z
  matched_actions: 28
  action_count: 28
  confidence: medium
  summary: "All 28 spec actions traced to source (dip-safe re-verify). (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# NEC P402-R Series Control Spec

## Summary
NEC P402-R Series professional projector supporting RS-232C serial and TCP/IP control interfaces. Serial communication at 115200/38400/19200/9600/4800 bps, 8N1. TCP control via port 7142. Comprehensive command set including power control, input routing, picture/sound mute, volume, lens control, ECO mode, and extensive status queries.

<!-- UNRESOLVED: TCP authentication type not stated in source -->
<!-- UNRESOLVED: flow control configuration not stated in source -->
<!-- UNRESOLVED: default serial baud rate not explicitly stated (multiple rates supported) -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]
  data_bits: 8
  parity: none
  stop_bits: 1
addressing:
  port: 7142
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

- id: input_sw_change
  label: Input Switch
  kind: action
  params:
    - name: input
      type: integer
      description: Input terminal hex code (e.g., 01h=COMPUTER, 06h=VIDEO, 20h=LAN)

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
      description: Adjustment value (16-bit)

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=Absolute, 01h=Relative"
    - name: value
      type: integer
      description: Adjustment value (16-bit)

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: value
      type: integer
      description: Aspect mode hex code

- id: lamp_adjust
  label: Lamp/Light Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=Absolute, 01h=Relative"
    - name: value
      type: integer
      description: Adjustment value (16-bit)

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: Key code (e.g., 02h=POWER ON, 03h=POWER OFF, 0Dh=MENU)

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
      description: "00h=Stop, 01h/02h/03h=Plus, 7Fh=Drive Plus, 81h=Drive Minus, FDh/FEh/FFh=Minus"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: control
      type: integer
      description: "FFh=Stop"
    - name: mode
      type: integer
      description: "00h=Absolute, 02h=Relative"
    - name: value
      type: integer
      description: Adjustment value (16-bit)

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

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: state
      type: integer
      description: "01h=On, 02h=Off"

- id: eco_mode_set
  label: ECO Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=OFF, 01h=ON/NORMAL, 02h=ECO1, 03h=ECO2, 04h=LONG LIFE, 05h=BOOST, 06h=SILENT"

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
    - name: item
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

- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: input
      type: integer
      description: Input terminal hex code
    - name: source
      type: integer
      description: "00h=HDMI1, 01h=HDMI2, 02h=DisplayPort, 03h=HDBaseT, 04h=USB-A, 05h=USB-B"
```

## Feedbacks
```yaml
- id: error_status
  label: Error Status Request
  type: bitfield
  description: Returns error information in DATA01-DATA12 (cover, fan, temperature, lamp, power errors)

- id: command_response
  label: Command Response
  type: enum
  values: [success, error]
  description: Standard response format. Success may include data. Error returns ERR1 and ERR2 codes.

- id: running_status
  label: Running Status
  type: object
  properties:
    - power_status: enum [Standby, Power on]
    - cooling_process: enum [Not executed, During execution]
    - power_on_off_process: enum [Not executed, During execution]
    - operation_status: enum [Standby (Sleep), Power on, Cooling, Standby (error), Standby (Power saving), Network standby]

- id: input_status
  label: Input Status
  type: object
  properties:
    - signal_switch_process: enum [Not executed, During execution]
    - signal_list_number: integer
    - selection_signal_type_1: integer
    - selection_signal_type_2: integer
    - test_pattern_display: enum [Not displayed, Displayed]
    - content_displayed: enum [Video signal, No signal, Viewer, Test pattern, LAN]

- id: mute_status
  label: Mute Status
  type: object
  properties:
    - picture_mute: enum [Off, On]
    - sound_mute: enum [Off, On]
    - onscreen_mute: enum [Off, On]
    - forced_onscreen_mute: enum [Off, On]
    - onscreen_display: enum [Not displayed, Displayed]

- id: model_name
  label: Model Name Request
  type: string

- id: cover_status
  label: Cover Status
  type: enum
  values: [Normal (opened), Cover closed]

- id: information_request
  label: Information Request
  type: object
  properties:
    - projector_name: string
    - lamp_usage_time: integer (seconds)
    - filter_usage_time: integer (seconds)

- id: filter_usage_info
  label: Filter Usage Information
  type: object
  properties:
    - filter_usage_time: integer (seconds)
    - filter_alarm_start_time: integer (seconds)

- id: lamp_information
  label: Lamp Information Request 3
  type: object
  properties:
    - lamp: enum [Lamp 1, Lamp 2]
    - content: enum [Lamp usage time, Lamp remaining life]
    - value: integer

- id: carbon_savings_info
  label: Carbon Savings Information
  type: object
  properties:
    - type: enum [Total, During operation]
    - kilograms: integer (max 99999)
    - milligrams: integer (max 999999)

- id: gain_parameter
  label: Gain Parameter Request 3
  type: object
  properties:
    - adjusted_value_name: integer
    - adjustment_status: enum [Display not possible, Adjustment not possible, Adjustment possible]
    - upper_limit: integer (16-bit)
    - lower_limit: integer (16-bit)
    - default_value: integer (16-bit)
    - current_value: integer (16-bit)

- id: lens_control_request
  label: Lens Control Request
  type: object
  properties:
    - upper_limit: integer (16-bit)
    - lower_limit: integer (16-bit)
    - current_value: integer (16-bit)

- id: lens_memory_option_request
  label: Lens Memory Option Request
  type: object
  properties:
    - option: enum [LOAD BY SIGNAL, FORCED MUTE]
    - setting_value: enum [OFF, ON]

- id: lens_profile_request
  label: Lens Profile Request
  type: object
  properties:
    - profile: enum [Profile 1, Profile 2]

- id: eco_mode_request
  label: ECO Mode Request
  type: integer

- id: lan_projector_name_request
  label: LAN Projector Name Request
  type: string

- id: lan_mac_address
  label: LAN MAC Address Status Request 2
  type: string (MAC address)

- id: pip_picture_by_picture_request
  label: PIP/Picture by Picture Request
  type: object
  properties:
    - item: integer
    - setting_value: integer

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  type: enum
  values: [OFF, ON]

- id: information_string
  label: Information String Request
  type: object
  properties:
    - type: enum [Horizontal sync frequency, Vertical sync frequency]
    - string: string

- id: base_model_type
  label: Base Model Type Request
  type: string

- id: serial_number
  label: Serial Number Request
  type: string

- id: basic_information
  label: Basic Information Request
  type: object
  properties:
    - operation_status: enum
    - content_displayed: enum
    - selection_signal_type_1: integer
    - selection_signal_type_2: integer
    - display_signal_type: integer
    - video_mute: enum [Off, On]
    - sound_mute: enum [Off, On]
    - onscreen_mute: enum [Off, On]
    - freeze_status: enum [Off, On]
```

## Variables
```yaml
# UNRESOLVED: no standalone settable parameters found; all parameters are command-specific
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: While power on command is executing, no other command can be accepted
  - description: While power off command is executing (including cooling time), no other command can be accepted
  - description: Some models require specific standby modes to receive commands via serial or LAN (varies by model)
# UNRESOLVED: no explicit safety warnings or interlock procedures beyond command timing notes
```

## Notes

**Command Protocol Structure:**
Commands use hex notation with format: `[HEADER] [ADDR] [ID1] [ID2] [LEN] [DATA...] [CKS]`
- ID1: Control ID (set for projector)
- ID2: Model code (varies by model)
- CKS: Checksum = low-order byte of sum of all preceding bytes
- Responses include ERR1/ERR2 error codes on failure

**Input Terminal Codes (partial):**
- 01h = COMPUTER, 02h = COMPUTER2, 06h = VIDEO, 0Bh = S-VIDEO
- 10h = Component, 20h/1Ah = HDMI, A1h = HDMI2
- 20h = LAN/ETHERNET/NETWORK, A6h = DisplayPort
- BAh = HDBaseT, C4h = SDI

**Standby Mode Requirements:**
Some models require specific standby modes (Normal, Active, Eco, Network Standby, Sleep, etc.) to receive serial or LAN commands. Supported modes vary by model.

**Error Codes:**
- 00h/00h: Unrecognized command
- 00h/01h: Command not supported
- 01h/00h: Invalid value
- 01h/01h: Invalid input terminal
- 01h/02h: Invalid language
- 02h/0Dh: Command cannot be accepted because power is off
- 02h/0Eh: Command execution failed

<!-- UNRESOLVED: TCP authentication type not stated in source -->
<!-- UNRESOLVED: complete list of key codes not provided (reference to external table) -->
<!-- UNRESOLVED: aspect value codes reference external appendix -->
<!-- UNRESOLVED: ECO mode values vary by model (some models use different hex codes) -->
<!-- UNRESOLVED: HDBaseT standby mode mentioned but details vary by model -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:52:53.842Z
last_checked_at: 2026-06-02T22:11:22.421Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:11:22.421Z
matched_actions: 28
action_count: 28
confidence: medium
summary: "All 28 spec actions traced to source (dip-safe re-verify). (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TCP authentication type not stated in source"
- "flow control configuration not stated in source"
- "default serial baud rate not explicitly stated (multiple rates supported)"
- "no standalone settable parameters found; all parameters are command-specific"
- "no unsolicited event notifications described in source"
- "no multi-step macros described in source"
- "no explicit safety warnings or interlock procedures beyond command timing notes"
- "complete list of key codes not provided (reference to external table)"
- "aspect value codes reference external appendix"
- "ECO mode values vary by model (some models use different hex codes)"
- "HDBaseT standby mode mentioned but details vary by model"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
