---
spec_id: admin/optoma-zh400ust
schema_version: ai4av-public-spec-v1
revision: 1
title: "Optoma ZH400UST Control Spec"
manufacturer: Optoma
model_family: ZH400UST
aliases: []
compatible_with:
  manufacturers:
    - Optoma
  models:
    - ZH400UST
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - region-resource.optoma.com
  - audiogeneral.com
  - optomausa.com
source_urls:
  - https://region-resource.optoma.com/products/import/Documents/ccc78aac-c9a9-40ec-b324-ee0df31ebddf.xls
  - https://region-resource.optoma.com/products/import/Documents/fcc27c8d-3ab3-462f-a7f3-ee35633fdb8c.pdf
  - https://region-resource.optoma.com/products/import/Documents/cf45148a-8c4b-4489-8689-b9b1c8d09d14.pdf
  - https://www.audiogeneral.com/Optoma/w501_rs232.pdf
  - https://www.optomausa.com/product/zh400ust
retrieved_at: 2026-06-16T04:07:50.769Z
last_checked_at: 2026-06-16T07:10:03.512Z
generated_at: 2026-06-16T07:10:03.512Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TCP/IP/HTTP/IR transport not documented in this source — only RS-232 UART."
  - "firmware version compatibility not stated."
  - "no auth/login procedure documented; assumed none."
  - "flow control not stated in source"
  - "source documents no unsolicited notifications from the projector."
  - "source documents no multi-step command sequences."
  - "source contains no safety warnings, interlock procedures, or"
  - "flow_control not stated in source."
  - "TCP/IP/HTTP/UDP/OSC transport not documented in this source."
  - "firmware version compatibility not stated in source."
  - "no auth procedure documented; auth.type:none inferred per Tier 2 policy."
  - "unsolicited events / macros / interlocks not documented in source."
verification:
  verdict: verified
  checked_at: 2026-06-16T07:10:03.512Z
  matched_actions: 42
  action_count: 42
  confidence: medium
  summary: "All 42 spec actions matched literal commands in source table; transport parameters verified; complete bidirectional coverage. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Optoma ZH400UST Control Spec

## Summary
Optoma ZH400UST ultra-short-throw projector controlled via RS-232 serial (UART). ASCII command protocol framed as `[Header][Msg ID][Command][Space][Value]<CR>` with header `~` and a 2-digit message ID `00`. Covers power, source select, picture, screen, settings, volume, and status queries.

<!-- UNRESOLVED: TCP/IP/HTTP/IR transport not documented in this source — only RS-232 UART. -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: no auth/login procedure documented; assumed none. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# - powerable     # inferred: power on/off command (00) present
# - queryable     # inferred: multiple status read commands present
# - levelable     # inferred: brightness/contrast/volume level commands present
traits:
  - powerable
  - queryable
  - levelable
```

## Actions
```yaml
# Command syntax: ~00<cmd> <value><CR>  (ASCII; <CR> = 0x0D)
# Write commands return "P" (pass) or "F" (fail).
# Read commands return Ok<n> / Ok<abbbbccdddee> forms (see Feedbacks).

- id: set_power
  label: Power
  kind: action
  command: "~0000 {value}<CR>"
  params:
    - name: value
      type: integer
      description: "0 : Off, 1 : On"
  notes: "Write; pass P / fail F"

- id: emulate_remote
  label: Emulate Remote
  kind: action
  command: "~0001 {value}<CR>"
  params:
    - name: value
      type: integer
      description: "1:Up 2:Left 3:Right 4:Down 5:Menu 6:Source 7:Keystone+ 8:Keystone- 9:Volume+ 10:Volume-"
  notes: "Write; pass P / fail F"

- id: resync
  label: Resync
  kind: action
  command: "~0002 1<CR>"
  params: []
  notes: "VGA only. Write; pass P / fail F"

- id: set_av_mute
  label: AV Mute (Blank)
  kind: action
  command: "~0003 {value}<CR>"
  params:
    - name: value
      type: integer
      description: "0 : Off, 1 : On"
  notes: "Write; pass P / fail F"

- id: set_freeze
  label: Freeze
  kind: action
  command: "~0004 {value}<CR>"
  params:
    - name: value
      type: integer
      description: "0 : Unfreeze, 1 : Freeze"
  notes: "Write; pass P / fail F"

- id: set_input_source
  label: Input Source
  kind: action
  command: "~0005 {value}<CR>"
  params:
    - name: value
      type: integer
      description: "1:VGA1 2:VGA2 3:HDMI1 4:HDMI2 5:Video 6:Multimedia"
  notes: "Write; pass P / fail F"

- id: set_color_mode
  label: Color Mode
  kind: action
  command: "~0010 {value}<CR>"
  params:
    - name: value
      type: integer
      description: "1:Bright 2:PC 3:Movie 4:Game 5:User"
  notes: "Write; pass P / fail F"

- id: set_brightness
  label: Brightness
  kind: action
  command: "~0011 {value}<CR>"
  params:
    - name: value
      type: integer
      description: "0 ~ 100"
  notes: "Write; pass P / fail F"

- id: set_contrast
  label: Contrast
  kind: action
  command: "~0012 {value}<CR>"
  params:
    - name: value
      type: integer
      description: "0 ~ 100"
  notes: "Write; pass P / fail F"

- id: set_sharpness
  label: Sharpness
  kind: action
  command: "~0013 {value}<CR>"
  params:
    - name: value
      type: integer
      description: "0 ~ 31"
  notes: "Video only. Write; pass P / fail F"

- id: set_aspect_ratio
  label: Aspect Ratio
  kind: action
  command: "~0020 {value}<CR>"
  params:
    - name: value
      type: integer
      description: "1:Auto 2:4:3 3:16:9 4:16:10 / Ultra Wide"
  notes: "Write; pass P / fail F"

- id: set_zoom
  label: Zoom
  kind: action
  command: "~0021 {value}<CR>"
  params:
    - name: value
      type: integer
      description: "0:Zoom-, 1:Zoom+"
  notes: "Write; pass P / fail F"

- id: set_keystone
  label: Keystone
  kind: action
  command: "~0022 {value}<CR>"
  params:
    - name: value
      type: integer
      description: "-40 ~ 40"
  notes: "Write; pass P / fail F"

- id: set_ceiling_mount
  label: Ceiling Mount
  kind: action
  command: "~0023 {value}<CR>"
  params:
    - name: value
      type: integer
      description: "1:Front 2:Rear 3:Front Ceiling 4:Rear Ceiling"
  notes: "Write; pass P / fail F"

- id: set_language
  label: Language
  kind: action
  command: "~0030 {value}<CR>"
  params:
    - name: value
      type: integer
      description: "1:English 2:German 3:Swedish 4:French 5:Arabic 6:Dutch 7:Norwegian 8:Danish 9:Simplified Chinese 10:Polish 11:Korean 12:Russian 13:Spanish 14:Traditional Chinese 15:Italian 16:Portuguese 17:Turkish 18:Japanese"
  notes: "Write; pass P / fail F"

- id: set_menu_location
  label: Menu Location
  kind: action
  command: "~0031 {value}<CR>"
  params:
    - name: value
      type: integer
      description: "1:Top Left 2:Top Right 3:Center 4:Bottom Left 5:Bottom Right"
  notes: "Write; pass P / fail F"

- id: reset
  label: Reset
  kind: action
  command: "~0032 1<CR>"
  params: []
  notes: "Write; pass P / fail F"

- id: set_mute
  label: Mute
  kind: action
  command: "~0040 {value}<CR>"
  params:
    - name: value
      type: integer
      description: "0:Off, 1:On"
  notes: "Write; pass P / fail F"

- id: set_volume
  label: Volume
  kind: action
  command: "~0041 {value}<CR>"
  params:
    - name: value
      type: integer
      description: "0 ~ 30"
  notes: "Write; pass P / fail F"

- id: set_microphone_volume
  label: Microphone Volume
  kind: action
  command: "~0042 {value}<CR>"
  params:
    - name: value
      type: integer
      description: "0 ~ 30"
  notes: "Write; pass P / fail F"

- id: volume_inc
  label: Volume Increment
  kind: action
  command: "~0043 1<CR>"
  params: []
  notes: "volume + 1. Write; pass P / fail F"

- id: volume_dec
  label: Volume Decrement
  kind: action
  command: "~0044 1<CR>"
  params: []
  notes: "volume - 1. Write; pass P / fail F"

- id: set_auto_power_off
  label: Auto Power Off (minutes)
  kind: action
  command: "~0050 {value}<CR>"
  params:
    - name: value
      type: integer
      description: "0 ~ 120, step = 5"
  notes: "Write; pass P / fail F"

- id: set_high_altitude
  label: High Altitude
  kind: action
  command: "~0051 {value}<CR>"
  params:
    - name: value
      type: integer
      description: "0:Off, 1:On"
  notes: "Write; pass P / fail F"

- id: query_blank_state
  label: Get Blank State
  kind: query
  command: "~00103 1<CR>"
  params: []
  notes: "Read; returns Okn, n:0/1 = Off/On"

- id: query_color_mode
  label: Color Mode Read
  kind: query
  command: "~00110 1<CR>"
  params: []
  notes: "Read; returns Okn, n:1/2/3/4/5 = Bright/PC/Movie/Game/User"

- id: query_brightness
  label: Brightness Read
  kind: query
  command: "~00111 1<CR>"
  params: []
  notes: "Read; returns Okn, n:0~100"

- id: query_contrast
  label: Contrast Read
  kind: query
  command: "~00112 1<CR>"
  params: []
  notes: "Read; returns Okn, n:0~100"

- id: query_aspect_ratio
  label: Aspect Ratio Read
  kind: query
  command: "~00120 1<CR>"
  params: []
  notes: "Read; returns Okn, n:1/2/3/4 = Auto/4:3/16:9/16:10 (Ultra Wide)"

- id: query_keystone
  label: V. Keystone Read
  kind: query
  command: "~00122 1<CR>"
  params: []
  notes: "Read; returns Okn, n:-40~40"

- id: query_ceiling_mount
  label: Ceiling Mount Read
  kind: query
  command: "~00123 1<CR>"
  params: []
  notes: "Read; returns Okn, n:1/2/3/4 = Front/Rear/Front Ceiling/Rear Ceiling"

- id: query_language
  label: Current Language Read
  kind: query
  command: "~00130 1<CR>"
  params: []
  notes: "Read; returns Okn, n:1..18 (see set_language)"

- id: query_mute_state
  label: Get Mute State
  kind: query
  command: "~00140 1<CR>"
  params: []
  notes: "Read; returns Okn, n:0/1 = Off/On"

- id: query_volume
  label: Volume Read
  kind: query
  command: "~00141 1<CR>"
  params: []
  notes: "Read; returns Okn, n:0~30"

- id: query_microphone_volume
  label: Microphone Volume Read
  kind: query
  command: "~00142 1<CR>"
  params: []
  notes: "Read; returns Okn, n:0~30"

- id: query_auto_power_off
  label: Read Auto Power Off
  kind: query
  command: "~00150 1<CR>"
  params: []
  notes: "Read; returns Okn, n:0~120"

- id: query_input_source
  label: Input Source (current)
  kind: query
  command: "~00160 1<CR>"
  params: []
  notes: "Read; returns Okn, n:0/1/2/3/4/5/6 = None/VGA1/VGA2/HDMI1/HDMI2/Video/Multimedia"

- id: query_software_version
  label: Software Version
  kind: query
  command: "~00161 1<CR>"
  params: []
  notes: "Read; returns Okddd, ddd:FW version"

- id: query_information
  label: Information
  kind: query
  command: "~00162 1<CR>"
  params: []
  notes: "Read; returns Okabbbbccdddee: a=Power Status, b=LD Hour, c=Input Source, d=Firmware Version, e=Color mode"

- id: query_lamp_hours
  label: Read Lamp-Hours
  kind: query
  command: "~00163 1<CR>"
  params: []
  notes: "Read; returns Okn, n:0~65535"

- id: query_operating_hours
  label: Read Operating Hours
  kind: query
  command: "~00164 1<CR>"
  params: []
  notes: "Read; returns Okn, n:0~65535"

- id: query_system_status
  label: Read System Status
  kind: query
  command: "~00165 1<CR>"
  params: []
  notes: "Read; returns Okn, n:0/1/2/3 = Standby/Warm Up/Lamp On/Cooling"
```

## Feedbacks
```yaml
- id: write_ack
  type: enum
  values: [P, F]
  description: "Pass / Fail acknowledgement for write commands"

- id: query_blank_state_response
  type: enum
  values: ["0", "1"]
  description: "Okn response to ~00103; n:0/1 = Off/On"

- id: query_color_mode_response
  type: enum
  values: ["1", "2", "3", "4", "5"]
  description: "Okn response to ~00110; Bright/PC/Movie/Game/User"

- id: query_brightness_response
  type: integer
  range: [0, 100]
  description: "Okn response to ~00111"

- id: query_contrast_response
  type: integer
  range: [0, 100]
  description: "Okn response to ~00112"

- id: query_aspect_ratio_response
  type: enum
  values: ["1", "2", "3", "4"]
  description: "Okn response to ~00120; Auto/4:3/16:9/16:10"

- id: query_keystone_response
  type: integer
  range: [-40, 40]
  description: "Okn response to ~00122"

- id: query_ceiling_mount_response
  type: enum
  values: ["1", "2", "3", "4"]
  description: "Okn response to ~00123; Front/Rear/Front Ceiling/Rear Ceiling"

- id: query_language_response
  type: integer
  range: [1, 18]
  description: "Okn response to ~00130"

- id: query_mute_state_response
  type: enum
  values: ["0", "1"]
  description: "Okn response to ~00140"

- id: query_volume_response
  type: integer
  range: [0, 30]
  description: "Okn response to ~00141"

- id: query_microphone_volume_response
  type: integer
  range: [0, 30]
  description: "Okn response to ~00142"

- id: query_auto_power_off_response
  type: integer
  range: [0, 120]
  description: "Okn response to ~00150"

- id: query_input_source_response
  type: enum
  values: ["0", "1", "2", "3", "4", "5", "6"]
  description: "Okn response to ~00160; None/VGA1/VGA2/HDMI1/HDMI2/Video/Multimedia"

- id: query_software_version_response
  type: string
  description: "Okddd response to ~00161; ddd = FW version"

- id: query_information_response
  type: string
  description: "Okabbbbccdddee response to ~00162"

- id: query_lamp_hours_response
  type: integer
  range: [0, 65535]
  description: "Okn response to ~00163"

- id: query_operating_hours_response
  type: integer
  range: [0, 65535]
  description: "Okn response to ~00164"

- id: query_system_status_response
  type: enum
  values: ["0", "1", "2", "3"]
  description: "Okn response to ~00165; Standby/Warm Up/Lamp On/Cooling"
```

## Variables
```yaml
# All settable parameters are captured as parameterized Actions above.
# No additional settable variables beyond those enumerated.
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited notifications from the projector.
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step command sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements. Never infer - only populate from explicit source text.
```

## Notes
- Serial config: 9600 8N1, no flow control stated.
- All commands terminated by `<CR>` (ASCII 0x0D). ASCII example for Power On: `~0000 1` = hex `7E 30 30 30 30 20 31 0D`.
- Read commands documented use Msg ID `00` and the listed 3-digit command codes; they are framed identically to writes (header + msg id + cmd + space + value, where read value is the literal `1`).
- Sharpness applies to Video source only; Resync applies to VGA only.

<!-- UNRESOLVED: flow_control not stated in source. -->
<!-- UNRESOLVED: TCP/IP/HTTP/UDP/OSC transport not documented in this source. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: no auth procedure documented; auth.type:none inferred per Tier 2 policy. -->
<!-- UNRESOLVED: unsolicited events / macros / interlocks not documented in source. -->
```

Spec done. 23 write actions + 18 queries = 41 total. All cmd rows enumerated, payloads verbatim with `<CR>` suffix. Serial 9600 8N1 direct from source; flow_control UNRESOLVED. Transport TCP/HTTP/UDP absent → omitted per template rule.

## Provenance

```yaml
source_domains:
  - region-resource.optoma.com
  - audiogeneral.com
  - optomausa.com
source_urls:
  - https://region-resource.optoma.com/products/import/Documents/ccc78aac-c9a9-40ec-b324-ee0df31ebddf.xls
  - https://region-resource.optoma.com/products/import/Documents/fcc27c8d-3ab3-462f-a7f3-ee35633fdb8c.pdf
  - https://region-resource.optoma.com/products/import/Documents/cf45148a-8c4b-4489-8689-b9b1c8d09d14.pdf
  - https://www.audiogeneral.com/Optoma/w501_rs232.pdf
  - https://www.optomausa.com/product/zh400ust
retrieved_at: 2026-06-16T04:07:50.769Z
last_checked_at: 2026-06-16T07:10:03.512Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-16T07:10:03.512Z
matched_actions: 42
action_count: 42
confidence: medium
summary: "All 42 spec actions matched literal commands in source table; transport parameters verified; complete bidirectional coverage. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TCP/IP/HTTP/IR transport not documented in this source — only RS-232 UART."
- "firmware version compatibility not stated."
- "no auth/login procedure documented; assumed none."
- "flow control not stated in source"
- "source documents no unsolicited notifications from the projector."
- "source documents no multi-step command sequences."
- "source contains no safety warnings, interlock procedures, or"
- "flow_control not stated in source."
- "TCP/IP/HTTP/UDP/OSC transport not documented in this source."
- "firmware version compatibility not stated in source."
- "no auth procedure documented; auth.type:none inferred per Tier 2 policy."
- "unsolicited events / macros / interlocks not documented in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
