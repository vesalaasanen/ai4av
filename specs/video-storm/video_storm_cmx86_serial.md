---
spec_id: admin/video-storm-cmx86
schema_version: ai4av-public-spec-v1
revision: 1
title: "Video Storm CMX86 Control Spec"
manufacturer: "Video Storm"
model_family: "Video Storm CMX86"
aliases: []
compatible_with:
  manufacturers:
    - "Video Storm"
  models:
    - "Video Storm CMX86"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - video-storm.com
  - elanportal.com
source_urls:
  - "https://www.video-storm.com/manuals/CMX%20rs232.pdf"
  - https://www.elanportal.com/supportdocs/catalog/VideoStorm_CMX.pdf
retrieved_at: 2026-07-22T00:47:51.424Z
last_checked_at: 2026-10-07T13:20:36.168Z
generated_at: 2026-10-07T13:20:36.168Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - H01bb
  - "source does not state CMX86-specific supported output types beyond identifying CMX84, CMX86, and CMX88 as device types."
  - "no safety warnings, interlock procedures, or power-on sequencing requirements stated in source"
  - "source does not state firmware compatibility range beyond mentioning firmware versions 1.5 and later for volume extensions."
  - "source does not specify unsolicited status behavior for all status fields."
verification:
  verdict: verified
  checked_at: 2026-10-07T13:20:36.168Z
  matched_actions: 54
  action_count: 54
  confidence: medium
  summary: "All 54 action units match source command literals and shapes; serial transport matches; source catalogue essentially fully covered. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-22
---

# Video Storm CMX86 Control Spec

## Summary
Video Storm CMX86 is an RS-232-controlled matrix switch. Source documents serial settings, routing, configuration, audio gain and processing commands, status queries, acknowledgements, input notifications, and expansion-port forwarding.

<!-- UNRESOLVED: source does not state CMX86-specific supported output types beyond identifying CMX84, CMX86, and CMX88 as device types. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits
```yaml
- powerable  # inferred from CF03 power control
- routable  # inferred from routing commands
- queryable  # inferred from STAT and status responses
- levelable  # inferred from audio gain and processing commands
```

## Actions
```yaml
- id: config_control
  label: Config Control
  kind: action
  command: "CF##<cr>"
  params:
    - name: control
      type: integer
      description: "Control number: 1-6"
    - name: state
      type: enum
      values: [F, T]
      description: "F turns control off; T turns control on"

- id: clear_zerokey_ir_codes
  label: Clear ZeroKey IR Codes and Config Bits
  kind: action
  command: "CF1T<cr>"
  params: []

- id: led_off
  label: LED Off
  kind: action
  command: "CF2T<cr>"
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "CF3T<cr>"
  params: []

- id: advanced_scheme_enable
  label: Advanced Scheme Enable
  kind: action
  command: "CF4T<cr>"
  params: []

- id: debug_control_1
  label: Debug Control 1
  kind: action
  command: "CF5F<cr>"
  params: []

- id: debug_control_2
  label: Debug Control 2
  kind: action
  command: "CF6F<cr>"
  params: []

- id: request_device_status
  label: Request Device Status
  kind: query
  command: "STAT<cr>"
  params: []

- id: request_audio_dsp_status
  label: Request Audio DSP Settings Status
  kind: query
  command: "STATL<cr>"
  params: []

- id: request_formatted_audio_status
  label: Request Formatted Audio Settings Status
  kind: query
  command: "STATAUDIO<cr>"
  params: []

- id: flash_mode_control
  label: Flash Modes Control
  kind: action
  command: "F{slot}{operation}<cr>"
  params:
    - name: slot
      type: integer
      description: "Flash slot, 01-08"
    - name: operation
      type: enum
      values: [S, R]
      description: "S saves current config; R recalls saved config"

- id: zone_restriction_control
  label: Zone Restriction Control
  kind: action
  command: "Z{zone}{zone_mask}<cr>"
  params:
    - name: zone
      type: integer
      description: "Zone, 01-16"
    - name: zone_mask
      type: string
      description: "Four-digit hexadecimal zone mask"

- id: basic_output_control
  label: Basic Mode Output Control
  kind: action
  command: "V{output}{input}{digital_type}<cr>"
  params:
    - name: output
      type: integer
      description: "Output, 1-8"
    - name: input
      type: integer
      description: "Input, 0-8; 00 disables selected output"
    - name: digital_type
      type: enum
      values: [D, O]
      description: "D selects digital coax; O selects digital toslink"

- id: component_video_output_control
  label: Component Video Output Control
  kind: action
  command: "V{output}{input}<cr>"
  params:
    - name: output
      type: integer
      description: "Output, 01-16"
    - name: input
      type: integer
      description: "Input, 00-16; 00 disables selected output"

- id: audio_output_control
  label: Audio Output Control
  kind: action
  command: "A{output}{input}<cr>"
  params:
    - name: output
      type: integer
      description: "Output, 01-16"
    - name: input
      type: integer
      description: "Input, 00-16; 00 disables selected output"

- id: composite_video_output_control
  label: Composite Video Output Control
  kind: action
  command: "P{output}{input}<cr>"
  params:
    - name: output
      type: integer
      description: "Output, 01-16"
    - name: input
      type: integer
      description: "Input, 00-16; 00 disables selected output"

- id: digital_coax_output_control
  label: Digital Audio Coax Output Control
  kind: action
  command: "C{output}{input}{digital_type}<cr>"
  params:
    - name: output
      type: integer
      description: "Output, 1-8"
    - name: input
      type: integer
      description: "Input, 0-8; 0 disables selected output"
    - name: digital_type
      type: enum
      values: [D, O]
      description: "D selects digital coax; O selects digital toslink"

- id: digital_toslink_output_control
  label: Digital Audio Toslink Output Control
  kind: action
  command: "O{output}{input}{digital_type}<cr>"
  params:
    - name: output
      type: integer
      description: "Output, 1-6"
    - name: input
      type: integer
      description: "Input, 0-8; 0 disables selected output"
    - name: digital_type
      type: enum
      values: [D, O]
      description: "D selects digital coax; O selects digital toslink"

- id: cmx3838a2_digital_coax_output_control
  label: CMX3838A2 Digital Audio Coax Output Control
  kind: action
  command: "C{output}{input}<cr>"
  params:
    - name: output
      type: integer
      description: "Output, 01-16"
    - name: input
      type: integer
      description: "Input, 0-38; 00 disables selected output"

- id: cmx3838a2_digital_toslink_output_control
  label: CMX3838A2 Digital Audio Toslink Output Control
  kind: action
  command: "O{output}{input}<cr>"
  params:
    - name: output
      type: integer
      description: "Output, 01-06"
    - name: input
      type: integer
      description: "Input, 0-38; 00 disables selected output"

- id: network_audio_switch_control
  label: Network Audio Switch Control
  kind: action
  command: "N{output}{input}<cr>"
  params:
    - name: output
      type: integer
      description: "Output, 01-08"
    - name: input
      type: integer
      description: "Input, 0-38; 00 disables selected output"

- id: audio_output_gain_control
  label: Audio Output Gain Control
  kind: action
  command: "G{output}{gain}<cr>"
  params:
    - name: output
      type: integer
      description: "Output, 01-16"
    - name: gain
      type: string
      description: "Numeric gain value 000-255, or U, D, MT, MF, or M on firmware 1.5 and later"

- id: audio_input_gain_control
  label: Audio Input Gain Control
  kind: action
  command: "E{zone}{gain}<cr>"
  params:
    - name: zone
      type: string
      description: "Input zone, 01-MAX"
    - name: gain
      type: integer
      description: "Gain value, 00-255; 128 nominal"

- id: audio_output_balance_control
  label: Audio Output Balance Control
  kind: action
  command: "M{zone}{balance}<cr>"
  params:
    - name: zone
      type: string
      description: "Input zone, 01-MAX"
    - name: balance
      type: integer
      description: "Balance value, 00-255; 128 nominal"

- id: audio_bass_control
  label: Audio Bass Control
  kind: action
  command: "B{zone}{level}<cr>"
  params:
    - name: zone
      type: string
      description: "Input zone, 01-MAX"
    - name: level
      type: integer
      description: "Bass value, 00-255; 128 nominal"

- id: audio_treble_control
  label: Audio Treble Control
  kind: action
  command: "T{zone}{level}<cr>"
  params:
    - name: zone
      type: string
      description: "Input zone, 01-MAX"
    - name: level
      type: integer
      description: "Treble value, 00-255; 128 nominal"

- id: audio_input_delay_control
  label: Audio Input Delay Control
  kind: action
  command: "X{input}{delay}<cr>"
  params:
    - name: input
      type: integer
      description: "Input, 01-16"
    - name: delay
      type: string
      description: "Delay value, 00-255, U, or D; each numeric step is 0.25 video frames at 60 Hz, or 4.1666 ms"

- id: audio_output_delay_control
  label: Audio Output Delay Control
  kind: action
  command: "D{output}{delay}<cr>"
  params:
    - name: output
      type: integer
      description: "Output, 01-16"
    - name: delay
      type: string
      description: "Delay value, 00-255, U, or D; each numeric step is 0.25 video frames at 60 Hz, or 4.1666 ms"

- id: audio_bass_pole_frequency
  label: Audio Bass Pole Frequency
  kind: action
  command: "BPF{frequency}<cr>"
  params:
    - name: frequency
      type: integer
      description: "Value, 00-255; 128 nominal"

- id: audio_internal_ramp_speed
  label: Audio Internal Ramp Speed
  kind: action
  command: "RT{speed}<cr>"
  params:
    - name: speed
      type: integer
      description: "Speed, 00-06; 00 slowest and 06 fastest"

- id: forward_command
  label: Forward Command To Expansion Port
  kind: action
  command: "/F{command}<cr>"
  params:
    - name: command
      type: string
      description: "Normal command; repeat /F prefix for each downstream device"

- id: forward_command_device_2
  label: Forward Command To Second Downstream Device
  kind: action
  command: "/F/F{command}<cr>"
  params:
    - name: command
      type: string
      description: "Normal command"

- id: forward_command_device_3
  label: Forward Command To Third Downstream Device
  kind: action
  command: "/F/F/F{command}<cr>"
  params:
    - name: command
      type: string
      description: "Normal command"

- id: flash_modes_control_source_notation
  label: Flash Modes Control Source Notation
  kind: action
  command: "Faab<cr>"
  params:
    - name: slot
      type: integer
      description: "01-08"
    - name: operation
      type: enum
      values: [S, R]
      description: "S saves current config, R recalls saved config"

- id: zone_restriction_control_source_notation
  label: Zone Restriction Control Source Notation
  kind: action
  command: "Zaahhhh<cr>"
  params:
    - name: zone
      type: integer
      description: "01-16"
    - name: zone_mask
      type: string
      description: "4 digit hexadecimal number corresponding to the ZONE MASK"

- id: audio_input_gain_control_source_notation
  label: Audio Input Gain Control Source Notation
  kind: action
  command: "Eaabbb<cr>"
  params:
    - name: zone
      type: string
      description: "01-MAX"
    - name: gain
      type: integer
      description: "00-255"

- id: audio_output_balance_control_source_notation
  label: Audio Output Balance Control Source Notation
  kind: action
  command: "Maabbb<cr>"
  params:
    - name: zone
      type: string
      description: "01-MAX"
    - name: balance
      type: integer
      description: "00-255"

- id: audio_bass_control_source_notation
  label: Audio Bass Control Source Notation
  kind: action
  command: "Baabbb<cr>"
  params:
    - name: zone
      type: string
      description: "01-MAX"
    - name: level
      type: integer
      description: "00-255"

- id: audio_treble_control_source_notation
  label: Audio Treble Control Source Notation
  kind: action
  command: "Taabbb<cr>"
  params:
    - name: zone
      type: string
      description: "01-MAX"
    - name: level
      type: integer
      description: "00-255"

- id: audio_input_delay_control_source_notation
  label: Audio Input Delay Control Source Notation
  kind: action
  command: "Xaabbb<cr>"
  params:
    - name: input
      type: integer
      description: "01-16"
    - name: delay
      type: string
      description: "00-255, U, or D; each delay step is 0.25 video frames (60Hz), or 4.1666ms"

- id: audio_output_delay_control_source_notation
  label: Audio Output Delay Control Source Notation
  kind: action
  command: "Daabbb<cr>"
  params:
    - name: output
      type: integer
      description: "01-16"
    - name: delay
      type: string
      description: "00-255, U, or D; each delay step is 0.25 video frames (60Hz), or 4.1666ms"

- id: audio_bass_pole_frequency_source_notation
  label: Audio Bass Pole Frequency Source Notation
  kind: action
  command: "BPFbbb<cr>"
  params:
    - name: frequency
      type: integer
      description: "00-255; 128 nominal"

- id: audio_internal_ramp_speed_source_notation
  label: Audio Internal Ramp Speed Source Notation
  kind: action
  command: "RTaa<cr>"
  params:
    - name: speed
      type: integer
      description: "00-06; 00 is the slowest and 06 is the fastest"
```

## Feedbacks
```yaml
- id: acknowledge
  type: string
  pattern: "OK<cr>"

- id: negative_acknowledge
  type: string
  pattern: "NAK<CR>"

- id: volume_acknowledge
  type: string
  pattern: "OK:###(M):##<cr>"

- id: device_status
  type: string
  pattern: "Video Storm LLC CMX##### switch (with HDMI##-##)<cr>"
  query_command: "STAT<cr>"

- id: firmware_version
  type: string
  pattern: "Version 1.X<cr>"
  query_command: "STAT<cr>"

- id: component_video_status
  type: string
  pattern: "V{output}{input}<cr>"
  query_command: "STAT<cr>"

- id: analog_audio_status
  type: string
  pattern: "A{output}{input}<cr>"
  query_command: "STAT<cr>"

- id: composite_video_status
  type: string
  pattern: "P{output}{input}<cr>"
  query_command: "STAT<cr>"

- id: digital_coax_status
  type: string
  pattern: "C{output}{digital_type}<cr>"
  query_command: "STAT<cr>"

- id: digital_toslink_status
  type: string
  pattern: "O{output}{digital_type}<cr>"
  query_command: "STAT<cr>"

- id: audio_gain_status
  type: string
  pattern: "G{output}{gain}(M)<cr>"
  query_command: "STATL<cr>"

- id: audio_equalizer_status
  type: string
  pattern: "E{input}{gain}<cr>"
  query_command: "STATL<cr>"

- id: config_status
  type: string
  pattern: "CF{control}{state}<cr>"
  query_command: "STAT<cr>"

- id: input_status_notification
  type: string
  pattern: "IS{input_state}<cr>"
  description: "Six hexadecimal strings; 1 indicates locked/present and 0 indicates no signal"
  query_command: "STAT<cr>"
```

## Variables
```yaml
- id: output_gain
  name: Output Gain
  type: integer
  range: [0, 255]
  description: "000 mutes output; otherwise gain(dB) = 31.5 - [0.5 * (255 - value)]"

- id: input_gain
  name: Input Gain
  type: integer
  range: [0, 255]
  description: "128 nominal; signal = signal * value / 128 otherwise"

- id: output_balance
  name: Output Balance
  type: integer
  range: [0, 255]
  description: "128 nominal; channel scaling depends on value relative to 128"

- id: bass
  name: Bass
  type: integer
  range: [0, 255]
  description: "128 nominal"

- id: treble
  name: Treble
  type: integer
  range: [0, 255]
  description: "128 nominal"

- id: input_delay
  name: Input Delay
  type: integer
  range: [0, 255]
  description: "Each step is 0.25 video frames at 60 Hz, or 4.1666 ms"

- id: output_delay
  name: Output Delay
  type: integer
  range: [0, 255]
  description: "Each step is 0.25 video frames at 60 Hz, or 4.1666 ms"

- id: bass_pole_frequency
  name: Bass Pole Frequency
  type: integer
  range: [0, 255]
  description: "128 nominal"

- id: internal_ramp_speed
  name: Internal Ramp Speed
  type: integer
  range: [0, 6]
  description: "00 slowest and 06 fastest"
```

## Events
```yaml
- id: input_status_changed
  description: "Sent whenever input status changes"
  payload: "IS{input_state}<cr>"
```

## Macros
```yaml
- id: discover_expansion_network
  label: Discover Expansion Network
  steps:
    - "Send repeat('/F', index) + 'STAT<CR>'"
    - "Inspect returned status first line"
    - "Continue until no status response"
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing requirements stated in source
```

## Notes
Commands terminate with one ASCII carriage return character, code 0xD. CMX echoes all received characters and does not append line feed after carriage return. Selecting input `00` disables selected output. Expansion forwarding uses `/F` prefixes immediately after a carriage return. Source identifies CMX86 in network discovery but does not provide a CMX86-only command subset.

<!-- UNRESOLVED: source does not state firmware compatibility range beyond mentioning firmware versions 1.5 and later for volume extensions. -->
<!-- UNRESOLVED: source does not specify unsolicited status behavior for all status fields. -->

## Provenance

```yaml
source_domains:
  - video-storm.com
  - elanportal.com
source_urls:
  - "https://www.video-storm.com/manuals/CMX%20rs232.pdf"
  - https://www.elanportal.com/supportdocs/catalog/VideoStorm_CMX.pdf
retrieved_at: 2026-07-22T00:47:51.424Z
last_checked_at: 2026-10-07T13:20:36.168Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T13:20:36.168Z
matched_actions: 54
action_count: 54
confidence: medium
summary: "All 54 action units match source command literals and shapes; serial transport matches; source catalogue essentially fully covered. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- H01bb
- "source does not state CMX86-specific supported output types beyond identifying CMX84, CMX86, and CMX88 as device types."
- "no safety warnings, interlock procedures, or power-on sequencing requirements stated in source"
- "source does not state firmware compatibility range beyond mentioning firmware versions 1.5 and later for volume extensions."
- "source does not specify unsolicited status behavior for all status fields."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
