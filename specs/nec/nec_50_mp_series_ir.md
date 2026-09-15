---
spec_id: admin/nec-50-mp-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC 50-MP Series Control Spec"
manufacturer: NEC
model_family: "NEC 50-MP Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "NEC 50-MP Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - archive.org
source_urls:
  - https://archive.org/download/manualsbase-id-142119/142119.pdf
retrieved_at: 2026-09-03T14:04:12.011Z
last_checked_at: 2026-09-14T22:17:19.864Z
generated_at: 2026-09-14T22:17:19.864Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Firmware compatibility not stated. Model-specific command support varies; exact input, aspect, eco-mode, sub-input, and base-model values require the source appendix."
  - "source documents responses to commands but no unsolicited notification payloads."
  - "source does not define multi-step command macros."
  - "Firmware compatibility not stated. Exact input terminal values, aspect values, eco-mode values, sub-input values, base model types, and command support by model require supplementary appendix not present here."
verification:
  verdict: verified
  checked_at: 2026-09-14T22:17:19.864Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions match source verbatim hex sequences; all 53 source commands represented1:1; transport parameters literal in source. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-03
---

# NEC 50-MP Series Control Spec

## Summary
NEC projector control reference covering RS-232C serial and TCP network control. It documents power, input, picture, sound, lens, information, and status commands using framed hexadecimal payloads.

<!-- UNRESOLVED: Firmware compatibility not stated. Model-specific command support varies; exact input, aspect, eco-mode, sub-input, and base-model values require the source appendix. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142
serial:
  baud_rate:
    - 115200
    - 38400
    - 19200
    - 9600
    - 4800
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # inferred from power commands
- routable  # inferred from input switching and audio routing commands
- queryable  # inferred from request commands
- levelable  # inferred from picture, volume, and gain adjustment commands
```

## Actions
```yaml
- id: error_status_request
  label: Error Status Request
  kind: query
  command: "00h  88h  00h  00h  00h  88h"
  params: []

- id: power_on
  label: Power On
  kind: action
  command: "02h  00h  00h  00h  00h  02h"
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "02h  01h  00h  00h  00h  03h"
  params: []

- id: input_switch
  label: Input Switch
  kind: action
  command: "02h  03h  00h  00h  02h  01h  <DATA01> <CKS>"
  params:
    - name: input
      type: byte
      description: Input terminal value; see supplementary information.

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  command: "02h  10h  00h  00h  00h  12h"
  params: []

- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  command: "02h  11h  00h  00h  00h  13h"
  params: []

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  command: "02h  12h  00h  00h  00h  14h"
  params: []

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  command: "02h  13h  00h  00h  00h  15h"
  params: []

- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  command: "02h  14h  00h  00h  00h  16h"
  params: []

- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  command: "02h  15h  00h  00h  00h  17h"
  params: []

- id: picture_adjust
  label: Picture Adjust
  kind: action
  command: "03h  10h  00h  00h  05h  <DATA01>  FFh  <DATA02> - <DATA04> <CKS>"
  params:
    - name: target
      type: enum
      description: "00h brightness, 01h contrast, 02h color, 03h hue, 04h sharpness."
    - name: mode
      type: enum
      description: "00h absolute, 01h relative."
    - name: value
      type: word
      description: Adjustment value, low-order byte followed by high-order byte.

- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h  10h  00h  00h  05h  05h  00h  <DATA01> - <DATA03> <CKS>"
  params:
    - name: mode
      type: enum
      description: "00h absolute, 01h relative."
    - name: value
      type: word
      description: Adjustment value, low-order byte followed by high-order byte.

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h  10h  00h  00h  05h  18h  00h  00h  <DATA01> 00h <CKS>"
  params:
    - name: aspect
      type: byte
      description: Aspect value; see supplementary information.

- id: other_adjust
  label: Lamp or Light Adjust
  kind: action
  command: "03h  10h  00h  00h  05h  <DATA01> - <DATA05> <CKS>"
  params:
    - name: target
      type: byte
      description: DATA01 and DATA02 form adjustment target.
    - name: mode
      type: enum
      description: "00h absolute, 01h relative."
    - name: value
      type: word
      description: Adjustment value, low-order byte followed by high-order byte.

- id: information_request
  label: Information Request
  kind: query
  command: "03h  8Ah  00h  00h  00h  8Dh"
  params: []

- id: filter_usage_request
  label: Filter Usage Information Request
  kind: query
  command: "03h  95h  00h  00h  00h  98h"
  params: []

- id: lamp_information_request
  label: Lamp Information Request
  kind: query
  command: "03h  96h  00h  00h  02h  <DATA01> <DATA02> <CKS>"
  params:
    - name: lamp
      type: enum
      description: "00h lamp 1, 01h lamp 2; lamp 2 only for two-lamp models."
    - name: content
      type: enum
      description: "01h usage time, 04h remaining life percentage."

- id: carbon_savings_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h  9Ah  00h  00h  01h  <DATA01> <CKS>"
  params:
    - name: type
      type: enum
      description: "00h total, 01h during operation."

- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h  0Fh  00h  00h  02h  <DATA01> <DATA02> <CKS>"
  params:
    - name: key
      type: enum
      description: "02 POWER ON, 03 POWER OFF, 05 AUTO, 06 MENU, 07 UP, 08 DOWN, 09 RIGHT, 0A LEFT, 0B ENTER, 0C EXIT, 0D HELP, 0F MAGNIFY UP, 10 MAGNIFY DOWN, 13 MUTE, 29 PICTURE, 4B COMPUTER1, 4C COMPUTER2, 4F VIDEO1, 51 S-VIDEO1, 84 VOLUME UP, 85 VOLUME DOWN, 8A FREEZE, A3 ASPECT, D7 SOURCE, EE LAMP MODE/ECO."

- id: shutter_close
  label: Shutter Close
  kind: action
  command: "02h  16h  00h  00h  00h  18h"
  params: []

- id: shutter_open
  label: Shutter Open
  kind: action
  command: "02h  17h  00h  00h  00h  19h"
  params: []

- id: lens_control
  label: Lens Control
  kind: action
  command: "02h  18h  00h  00h  02h  <DATA01> <DATA02> <CKS>"
  params:
    - name: target
      type: byte
      description: "06h periphery focus."
    - name: movement
      type: enum
      description: "00h stop, 01h plus 1 second, 02h plus 0.5 second, 03h plus 0.25 second, 7Fh plus continuous, 81h minus continuous, FDh minus 0.25 second, FEh minus 0.5 second, FFh minus 1 second."

- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h  1Ch  00h  00h  02h  <DATA01> 00h <CKS>"
  params:
    - name: target
      type: byte
      description: Lens adjustment target.

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h  1Dh  00h  00h  04h  <DATA01> - <DATA04> <CKS>"
  params:
    - name: target
      type: enum
      description: "FFh stop; other values identify adjustment target."
    - name: mode
      type: enum
      description: "00h absolute, 02h relative."
    - name: value
      type: word
      description: Adjustment value, low-order byte followed by high-order byte.

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h  1Eh  00h  00h  01h  <DATA01> <CKS>"
  params:
    - name: operation
      type: enum
      description: "00h move, 01h store, 02h reset."

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h  1Fh  00h  00h  01h  <DATA01> <CKS>"
  params:
    - name: operation
      type: enum
      description: "00h move, 01h store, 02h reset."

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h  20h  00h  00h  01h  <DATA01> <CKS>"
  params:
    - name: option
      type: enum
      description: "00h load by signal, 01h forced mute."

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h  21h  00h  00h  02h  <DATA01> <DATA02> <CKS>"
  params:
    - name: option
      type: enum
      description: "00h load by signal, 01h forced mute."
    - name: setting
      type: enum
      description: "00h off, 01h on."

- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h  22h  00h  00h  01h  00h  25h"
  params: []

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h  27h  00h  00h  01h  <DATA01> <CKS>"
  params:
    - name: profile
      type: enum
      description: "00h profile 1, 01h profile 2."

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02h  28h  00h  00h  00h  2Ah"
  params: []

- id: gain_parameter_request
  label: Gain Parameter Request
  kind: query
  command: "03h  05h  00h  00h  03h  <DATA01> 00h 00h <CKS>"
  params:
    - name: adjusted_value
      type: enum
      description: "00h picture brightness, 01h picture contrast, 02h picture color, 03h picture hue, 04h picture sharpness, 05h volume, 96h lamp or light adjust."

- id: setting_request
  label: Setting Request
  kind: query
  command: "00h  85h  00h  00h  01h  00h  86h"
  params: []

- id: running_status_request
  label: Running Status Request
  kind: query
  command: "00h  85h  00h  00h  01h  01h  87h"
  params: []

- id: input_status_request
  label: Input Status Request
  kind: query
  command: "00h  85h  00h  00h  01h  02h  88h"
  params: []

- id: mute_status_request
  label: Mute Status Request
  kind: query
  command: "00h  85h  00h  00h  01h  03h  89h"
  params: []

- id: model_name_request
  label: Model Name Request
  kind: query
  command: "00h  85h  00h  00h  01h  04h  8Ah"
  params: []

- id: cover_status_request
  label: Cover Status Request
  kind: query
  command: "00h  85h  00h  00h  01h  05h  8Bh"
  params: []

- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01h  98h  00h  00h  01h  <DATA01> <CKS>"
  params:
    - name: setting
      type: enum
      description: "01h on, 02h off."

- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h  D0h  00h  00h  03h  00h  <DATA01> 01h <CKS>"
  params:
    - name: information_type
      type: enum
      description: "03h horizontal synchronous frequency, 04h vertical synchronous frequency."

- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  command: "03h  B0h  00h  00h  01h  07h  BBh"
  params: []

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  command: "03h  B0h  00h  00h  01h  2Ch  E0h"
  params: []

- id: lan_mac_address_request
  label: LAN MAC Address Request
  kind: query
  command: "03h  B0h  00h  00h  02h  9Ah  00h  4Fh"
  params: []

- id: pip_pbp_request
  label: PIP or Picture by Picture Request
  kind: query
  command: "03h  B0h  00h  00h  02h  C5h  <DATA01> <CKS>"
  params:
    - name: setting
      type: enum
      description: "00h mode, 01h start position, 02h sub input 1, 09h sub input 2, 0Ah sub input 3."

- id: edge_blending_request
  label: Edge Blending Request
  kind: query
  command: "03h  B0h  00h  00h  02h  DFh  00h  94h"
  params: []

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h  B1h  00h  00h  02h  07h  <DATA01> <CKS>"
  params:
    - name: value
      type: byte
      description: Eco-mode value; see supplementary information.

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h  B1h  00h  00h  12h  2Ch  <DATA01> - <DATA16> 00h <CKS>"
  params:
    - name: name
      type: string
      description: Projector name up to 16 bytes.

- id: pip_pbp_set
  label: PIP or Picture by Picture Set
  kind: action
  command: "03h  B1h  00h  00h  03h  C5h  <DATA01> <DATA02> <CKS>"
  params:
    - name: setting
      type: enum
      description: "00h mode, 01h start position, 02h sub input 1, 09h sub input 2, 0Ah sub input 3."
    - name: value
      type: byte
      description: Setting value; sub-input values require supplementary information.

- id: edge_blending_set
  label: Edge Blending Set
  kind: action
  command: "03h  B1h  00h  00h  03h  DFh  00h  <DATA01> <CKS>"
  params:
    - name: setting
      type: enum
      description: "00h off, 01h on."

- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  command: "00h  BFh  00h  00h  01h  00h  C0h"
  params: []

- id: serial_number_request
  label: Serial Number Request
  kind: query
  command: "00h  BFh  00h  00h  02h  01h  06h  C8h"
  params: []

- id: basic_information_request
  label: Basic Information Request
  kind: query
  command: "00h  BFh  00h  00h  01h  02h  C2h"
  params: []

- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h  C9h  00h  00h  03h  09h  <DATA01> <DATA02> <CKS>"
  params:
    - name: input
      type: byte
      description: Input terminal; see supplementary information.
    - name: audio_source
      type: enum
      description: "00h specified input terminal, 01h BNC, 02h COMPUTER."
```

## Feedbacks
```yaml
- id: command_error
  type: bytes
  response: "A2h/A3h  <ID1> <ID2> 02h  <ERR1> <ERR2> <CKS>"
  values: "00h 00h command not recognized; 00h 01h unsupported; 01h 00h invalid value; 01h 01h invalid input; 01h 02h invalid language; 02h 00h memory allocation; 02h 02h memory in use; 02h 03h value cannot be set; 02h 04h forced onscreen mute; 02h 06h viewer; 02h 07h no signal; 02h 08h test pattern or filter displayed; 02h 09h no PC card; 02h 0Ah memory operation; 02h 0Ch entry list displayed; 02h 0Dh power off; 02h 0Eh execution failed; 02h 0Fh no authority; 03h 00h incorrect gain number; 03h 01h invalid gain; 03h 02h adjustment failed"

- id: error_status
  type: bitfield
  command: "00h  88h  00h  00h  00h  88h"
  values: "DATA01 cover, temperature, fan, power, lamp/backlight; DATA02 lamp 1 timing, formatter, lamp 2, extended status; DATA03 lamp data, FPGA, temperature, lamp presence, lamp 2 status; DATA04 lens installation, dust temperature, ballast, iris, and related faults"

- id: power_state
  type: enum
  values: "standby, power_on"
  source: running status or basic information

- id: picture_mute_state
  type: enum
  values: "off, on"
  source: mute status or basic information

- id: sound_mute_state
  type: enum
  values: "off, on"
  source: mute status or basic information

- id: onscreen_mute_state
  type: enum
  values: "off, on"
  source: mute status or basic information

- id: freeze_state
  type: enum
  values: "off, on"
  source: basic information

- id: cover_state
  type: enum
  values: "normal_cover_opened, cover_closed"
  source: cover status

- id: projector_name
  type: string
  source: information request or LAN projector name request

- id: model_name
  type: string
  source: model name request

- id: serial_number
  type: string
  source: serial number request

- id: filter_usage_time
  type: seconds
  source: filter usage information request

- id: lamp_usage_time
  type: seconds
  source: information request or lamp information request

- id: lamp_remaining_life
  type: percent
  source: lamp information request

- id: carbon_savings
  type: bytes
  source: carbon savings information request
  values: "kilograms and milligrams; maximum 99999 kg and 999999 mg"

- id: lens_position
  type: bytes
  source: lens control request

- id: lens_memory_option
  type: enum
  values: "load_by_signal, forced_mute"
  source: lens memory option request

- id: lens_memory_state
  type: enum
  values: "move, store, reset"
  source: lens memory control

- id: lens_profile
  type: enum
  values: "profile_1, profile_2"
  source: lens profile request

- id: eco_mode
  type: byte
  source: eco mode request

- id: pip_pbp_mode
  type: enum
  values: "pip, picture_by_picture"
  source: PIP/PBP request

- id: pip_pbp_position
  type: enum
  values: "top_left, top_right, bottom_left, bottom_right"
  source: PIP/PBP request

- id: edge_blending_mode
  type: enum
  values: "off, on"
  source: edge blending request

- id: base_model_type
  type: bytes
  source: base model type request
```

## Variables
```yaml
- id: picture_adjustment
  type: byte
  command_template: "03h  10h  00h  00h  05h  <DATA01> FFh <DATA02> - <DATA04> <CKS>"
  values: "target, mode, and signed adjustment value"

- id: volume
  type: byte
  command_template: "03h  10h  00h  00h  05h 05h 00h <DATA01> - <DATA03> <CKS>"
  values: "absolute or relative mode; low-order and high-order value bytes"

- id: aspect
  type: byte
  command_template: "03h  10h  00h  00h  05h 18h 00h 00h <DATA01> 00h <CKS>"

- id: lamp_or_light_adjust
  type: byte
  command_template: "03h  10h  00h  00h  05h <DATA01> - <DATA05> <CKS>"

- id: lens_position_adjustment
  type: byte
  command_template: "02h  1Dh  00h  00h  04h <DATA01> - <DATA04> <CKS>"

- id: eco_mode
  type: byte
  command_template: "03h  B1h  00h  00h  02h 07h <DATA01> <CKS>"

- id: projector_name
  type: string
  command_template: "03h  B1h  00h  00h  12h 2Ch <DATA01> - <DATA16> 00h <CKS>"

- id: pip_pbp_setting
  type: byte
  command_template: "03h  B1h  00h  00h  03h C5h <DATA01> <DATA02> <CKS>"

- id: edge_blending
  type: enum
  command_template: "03h  B1h  00h  00h  03h DFh 00h <DATA01> <CKS>"
  values: "00h off, 01h on"

- id: audio_select
  type: enum
  command_template: "03h  C9h  00h  00h  03h 09h <DATA01> <DATA02> <CKS>"
  values: "00h specified input terminal, 01h BNC, 02h COMPUTER"
```

## Events
```yaml
# UNRESOLVED: source documents responses to commands but no unsolicited notification payloads.
```

## Macros
```yaml
# UNRESOLVED: source does not define multi-step command macros.
```

## Safety
```yaml
confirmation_required_for:
  - "power_on"
  - "power_off"
interlocks:
  - "While power is turning on, no other command can be accepted."
  - "While power is turning off, including cooling time, no other command can be accepted."
  - "Commands may be rejected with error 02h 0Dh when power is off."
  - "Lens movement values 7Fh or 81h require a subsequent stop command using 00h."
  - "PICTURE MUTE and SOUND MUTE are turned off by input switching, video signal switching, or sound volume adjustment as documented."
```

## Notes
Commands use hexadecimal frames. Fields shown in angle brackets require model-specific values or computation; replace them before transmission. Checksum is low-order one byte of sum of all preceding bytes. Serial settings support 115200, 38400, 19200, 9600, and 4800 bps, 8 data bits, no parity, 1 stop bit, full duplex. TCP commands use port 7142.

<!-- UNRESOLVED: Firmware compatibility not stated. Exact input terminal values, aspect values, eco-mode values, sub-input values, base model types, and command support by model require supplementary appendix not present here. -->

## Provenance

```yaml
source_domains:
  - archive.org
source_urls:
  - https://archive.org/download/manualsbase-id-142119/142119.pdf
retrieved_at: 2026-09-03T14:04:12.011Z
last_checked_at: 2026-09-14T22:17:19.864Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-14T22:17:19.864Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions match source verbatim hex sequences; all 53 source commands represented1:1; transport parameters literal in source. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Firmware compatibility not stated. Model-specific command support varies; exact input, aspect, eco-mode, sub-input, and base-model values require the source appendix."
- "source documents responses to commands but no unsolicited notification payloads."
- "source does not define multi-step command macros."
- "Firmware compatibility not stated. Exact input terminal values, aspect values, eco-mode values, sub-input values, base model types, and command support by model require supplementary appendix not present here."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
