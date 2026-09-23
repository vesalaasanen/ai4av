---
spec_id: admin/seura-strm-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Seura STRM Series Control Spec"
manufacturer: Seura
model_family: STRM
aliases: []
compatible_with:
  manufacturers:
    - Seura
  models:
    - STRM
    - "STRM Ultra Bright"
    - S2
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - storage.googleapis.com
source_urls:
  - https://storage.googleapis.com/wp-stateless/2019/10/RS232-protocol-entertainment-and-outdoor-tvs.pdf
retrieved_at: 2026-07-16T08:51:27.584Z
last_checked_at: 2026-09-19T22:17:27.139Z
generated_at: 2026-09-19T22:17:27.139Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "command list reflects the refined source excerpts; some response rows were corrupted in the source (e.g. KEY:27 response uses [0z02])"
  - "source does not document unsolicited event messages from the device"
  - "no multi-step sequences described in source"
  - "no safety warnings, interlocks, or power-on sequencing requirements stated in source."
  - "firmware version compatibility not stated in source"
verification:
  verdict: verified
  checked_at: 2026-09-19T22:17:27.139Z
  matched_actions: 91
  action_count: 91
  confidence: medium
  summary: "All 91 spec actions match the source command table; transport parameters verified verbatim; coverage 91/91. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# Seura STRM Series Control Spec

## Summary
The Seura STRM Series covers Storm, Storm Ultra Bright, and S2 outdoor/TV display products. This spec covers the RS-232 serial control protocol exposed via an RJ45 service port (pins 2/3 for TX/RX). Commands are ASCII framed by STX (0x02) and ETX (0x03) with an optional 3-digit unit ID prefix and a colon-separated parameter.

<!-- UNRESOLVED: command list reflects the refined source excerpts; some response rows were corrupted in the source (e.g. KEY:27 response uses [0z02]) -->

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
  # Start bits stated in source as 1
  start_bits: 1
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# powerable   - PWD on/off/toggle commands present
# routable    - INP input select commands present
# queryable   - ?, PWD, INP, MUT, VOL, CHA, CON, BRT, SAT, TIN, SHA, TEM queries present
# levelable   - VOL set/increment present
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
- id: power_off
  label: Power Off
  kind: action
  command: "STX PWD:0 ETX"
  params: []
- id: power_on
  label: Power On
  kind: action
  command: "STX PWD:1 ETX"
  params: []
- id: power_toggle
  label: Power Toggle
  kind: action
  command: "STX PWD:3 ETX"
  params: []
- id: power_status_query
  label: Power Status Query
  kind: query
  command: "STX PWD:? ETX"
  params: []
- id: input_vga
  label: Select Input VGA
  kind: action
  command: "STX INP:0 ETX"
  params: []
- id: input_hdmi1
  label: Select Input HDMI 1
  kind: action
  command: "STX INP:1 ETX"
  params: []
- id: input_tuner
  label: Select Input Tuner
  kind: action
  command: "STX INP:2 ETX"
  params: []
- id: input_av1
  label: Select Input AV1
  kind: action
  command: "STX INP:3 ETX"
  params: []
- id: input_av2
  label: Select Input AV2
  kind: action
  command: "STX INP:4 ETX"
  params: []
- id: input_hdmi2
  label: Select Input HDMI 2
  kind: action
  command: "STX INP:6 ETX"
  params: []
- id: input_component
  label: Select Input Component
  kind: action
  command: "STX INP:7 ETX"
  params: []
- id: input_hdmi3
  label: Select Input HDMI 3
  kind: action
  command: "STX INP:9 ETX"
  params: []
- id: input_usb
  label: Select Input USB
  kind: action
  command: "STX INP:12 ETX"
  params: []
- id: input_query
  label: Input Query
  kind: query
  command: "STX INP:? ETX"
  params: []
- id: mute_on
  label: Mute On
  kind: action
  command: "STX MUT:1 ETX"
  params: []
- id: mute_off
  label: Mute Off
  kind: action
  command: "STX MUT:0 ETX"
  params: []
- id: mute_query
  label: Mute Query
  kind: query
  command: "STX MUT:? ETX"
  params: []
- id: channel_set
  label: Channel Set
  kind: action
  command: "STX CHA:xxx.x ETX"
  params:
    - name: channel
      type: string
      description: Channel value, e.g. xxx.x (e.g. 005.1 for ATSC sub-channel)
- id: channel_query
  label: Channel Query
  kind: query
  command: "STX CHA:? ETX"
  params: []
- id: volume_set
  label: Volume Set
  kind: action
  command: "STX VOL:xxx ETX"
  params:
    - name: level
      type: integer
      description: Volume value 000-100
- id: volume_query
  label: Volume Query
  kind: query
  command: "STX VOL:? ETX"
  params: []
- id: format_4_3
  label: Aspect Ratio 4:3
  kind: action
  command: "STX FOR:0 ETX"
  params: []
- id: format_16_9
  label: Aspect Ratio 16:9
  kind: action
  command: "STX FOR:1 ETX"
  params: []
- id: format_zoom
  label: Aspect Ratio Zoom
  kind: action
  command: "STX FOR:3 ETX"
  params: []
- id: format_1_1
  label: Aspect Ratio 1:1
  kind: action
  command: "STX FOR:5 ETX"
  params: []
- id: format_screen_off
  label: Aspect Ratio Screen Off (Audio Only)
  kind: action
  command: "STX FOR:6 ETX"
  params: []
- id: contrast_increment
  label: Contrast Increment
  kind: action
  command: "STX CON:+ ETX"
  params: []
- id: contrast_decrement
  label: Contrast Decrement
  kind: action
  command: "STX CON:- ETX"
  params: []
- id: contrast_set
  label: Contrast Set
  kind: action
  command: "STX CON:xxx ETX"
  params:
    - name: value
      type: integer
      description: Contrast value 000-100
- id: contrast_query
  label: Contrast Query
  kind: query
  command: "STX CON:? ETX"
  params: []
- id: brightness_increment
  label: Brightness Increment
  kind: action
  command: "STX BRT:+ ETX"
  params: []
- id: brightness_decrement
  label: Brightness Decrement
  kind: action
  command: "STX BRT:- ETX"
  params: []
- id: brightness_set
  label: Brightness Set
  kind: action
  command: "STX BRT:xxx ETX"
  params:
    - name: value
      type: integer
      description: Brightness value 000-100
- id: brightness_query
  label: Brightness Query
  kind: query
  command: "STX BRT:? ETX"
  params: []
- id: saturation_increment
  label: Color Saturation Increment
  kind: action
  command: "STX SAT:+ ETX"
  params: []
- id: saturation_decrement
  label: Color Saturation Decrement
  kind: action
  command: "STX SAT:- ETX"
  params: []
- id: saturation_set
  label: Color Saturation Set
  kind: action
  command: "STX SAT:xxx ETX"
  params:
    - name: value
      type: integer
      description: Color Saturation value 000-100
- id: saturation_query
  label: Color Saturation Query
  kind: query
  command: "STX SAT:? ETX"
  params: []
- id: tint_increment
  label: Tint Increment
  kind: action
  command: "STX TIN:+ ETX"
  params: []
- id: tint_decrement
  label: Tint Decrement
  kind: action
  command: "STX TIN:- ETX"
  params: []
- id: tint_set
  label: Tint Set
  kind: action
  command: "STX TIN:xxx ETX"
  params:
    - name: value
      type: integer
      description: Tint value 000-100
- id: tint_query
  label: Tint Query
  kind: query
  command: "STX TIN:? ETX"
  params: []
- id: sharpness_increment
  label: Sharpness Increment
  kind: action
  command: "STX SHA:+ ETX"
  params: []
- id: sharpness_decrement
  label: Sharpness Decrement
  kind: action
  command: "STX SHA:- ETX"
  params: []
- id: sharpness_set
  label: Sharpness Set
  kind: action
  command: "STX SHA:xxx ETX"
  params:
    - name: value
      type: integer
      description: Sharpness value 000-100
- id: sharpness_query
  label: Sharpness Query
  kind: query
  command: "STX SHA:? ETX"
  params: []
- id: color_temp_set
  label: Color Temperature Set
  kind: action
  command: "STX TEM:x ETX"
  params:
    - name: value
      type: integer
      description: "0=Warm, 1=Normal, 2=Cool"
- id: color_temp_query
  label: Color Temperature Query
  kind: query
  command: "STX TEM:? ETX"
  params: []
- id: backlight_mode_set
  label: Backlight Mode Set
  kind: action
  command: "STX BLT:x ETX"
  params:
    - name: value
      type: integer
      description: "0=Day, 1=Night, 2=Auto"
- id: backlight_mode_query
  label: Backlight Mode Query
  kind: query
  command: "STX BLT:? ETX"
  params: []
- id: game_mode_set
  label: Game Mode Set
  kind: action
  command: "STX GAM:x ETX"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On"
- id: key_digit_0
  label: IR Key Digit 0
  kind: action
  command: "STX KEY:0 ETX"
  params: []
- id: key_digit_1
  label: IR Key Digit 1
  kind: action
  command: "STX KEY:1 ETX"
  params: []
- id: key_digit_2
  label: IR Key Digit 2
  kind: action
  command: "STX KEY:2 ETX"
  params: []
- id: key_digit_3
  label: IR Key Digit 3
  kind: action
  command: "STX KEY:3 ETX"
  params: []
- id: key_digit_4
  label: IR Key Digit 4
  kind: action
  command: "STX KEY:4 ETX"
  params: []
- id: key_digit_5
  label: IR Key Digit 5
  kind: action
  command: "STX KEY:5 ETX"
  params: []
- id: key_digit_6
  label: IR Key Digit 6
  kind: action
  command: "STX KEY:6 ETX"
  params: []
- id: key_digit_7
  label: IR Key Digit 7
  kind: action
  command: "STX KEY:7 ETX"
  params: []
- id: key_digit_8
  label: IR Key Digit 8
  kind: action
  command: "STX KEY:8 ETX"
  params: []
- id: key_digit_9
  label: IR Key Digit 9
  kind: action
  command: "STX KEY:9 ETX"
  params: []
- id: key_sleep
  label: IR Key Sleep
  kind: action
  command: "STX KEY:11 ETX"
  params: []
- id: key_cc
  label: IR Key Closed Caption
  kind: action
  command: "STX KEY:12 ETX"
  params: []
- id: key_menu
  label: IR Key Menu Toggle
  kind: action
  command: "STX KEY:21 ETX"
  params: []
- id: key_display
  label: IR Key Display Toggle
  kind: action
  command: "STX KEY:22 ETX"
  params: []
- id: key_vol_up
  label: IR Key Volume Up (Navigate Right)
  kind: action
  command: "STX KEY:23 ETX"
  params: []
- id: key_vol_down
  label: IR Key Volume Down (Navigate Left)
  kind: action
  command: "STX KEY:24 ETX"
  params: []
- id: key_ch_up
  label: IR Key Channel Up (Navigate Up)
  kind: action
  command: "STX KEY:25 ETX"
  params: []
- id: key_ch_down
  label: IR Key Channel Down (Navigate Down)
  kind: action
  command: "STX KEY:26 ETX"
  params: []
- id: key_pic_standard
  label: IR Key Picture Mode Standard
  kind: action
  command: "STX KEY:27 ETX"
  params: []
- id: key_pic_dynamic
  label: IR Key Picture Mode Dynamic
  kind: action
  command: "STX KEY:28 ETX"
  params: []
- id: key_pic_theater
  label: IR Key Picture Mode Theater
  kind: action
  command: "STX KEY:29 ETX"
  params: []
- id: key_pic_personal
  label: IR Key Picture Mode Personal
  kind: action
  command: "STX KEY:30 ETX"
  params: []
- id: key_play
  label: IR Key Play
  kind: action
  command: "STX KEY:115 ETX"
  params: []
- id: key_pause
  label: IR Key Pause
  kind: action
  command: "STX KEY:116 ETX"
  params: []
- id: key_stop
  label: IR Key Stop
  kind: action
  command: "STX KEY:117 ETX"
  params: []
- id: key_skip_forward
  label: IR Key Skip Forward / Chapter +
  kind: action
  command: "STX KEY:118 ETX"
  params: []
- id: key_prev_channel
  label: IR Key Previous Channel
  kind: action
  command: "STX KEY:35 ETX"
  params: []
- id: key_enter
  label: IR Key Enter
  kind: action
  command: "STX KEY:36 ETX"
  params: []
- id: key_ok
  label: IR Key OK
  kind: action
  command: "STX KEY:37 ETX"
  params: []
- id: key_input_select
  label: IR Key Input Select Toggle
  kind: action
  command: "STX KEY:38 ETX"
  params: []
- id: key_skip_back
  label: IR Key Skip Backward / Chapter -
  kind: action
  command: "STX KEY:19 ETX"
  params: []
- id: key_fast_forward
  label: IR Key Fast Forward
  kind: action
  command: "STX KEY:109 ETX"
  params: []
- id: key_fast_backward
  label: IR Key Fast Backward
  kind: action
  command: "STX KEY:112 ETX"
  params: []
- id: key_exit
  label: IR Key Exit
  kind: action
  command: "STX KEY:110 ETX"
  params: []
- id: key_dot
  label: IR Key Digit Dot (ATSC Sub-Channel)
  kind: action
  command: "STX KEY:104 ETX"
  params: []
- id: key_guide
  label: IR Key Guide Toggle
  kind: action
  command: "STX KEY:105 ETX"
  params: []
- id: key_red
  label: IR Key Red
  kind: action
  command: "STX KEY:32 ETX"
  params: []
- id: key_green
  label: IR Key Green
  kind: action
  command: "STX KEY:114 ETX"
  params: []
- id: key_yellow
  label: IR Key Yellow
  kind: action
  command: "STX KEY:111 ETX"
  params: []
- id: key_blue
  label: IR Key Blue
  kind: action
  command: "STX KEY:113 ETX"
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, off]
- id: mute_state
  type: enum
  values: [muted, unmuted]
- id: input
  type: enum
  values: [vga, hdmi1, tuner, av1, av2, hdmi2, component, hdmi3, usb]
- id: volume
  type: integer
  range: [0, 100]
- id: channel
  type: string
  description: e.g. 005.1 for ATSC sub-channels
- id: contrast
  type: integer
  range: [0, 100]
- id: brightness
  type: integer
  range: [0, 100]
- id: color_saturation
  type: integer
  range: [0, 100]
- id: tint
  type: integer
  range: [0, 100]
- id: sharpness
  type: integer
  range: [0, 100]
- id: color_temp
  type: enum
  values: [warm, normal, cool]
- id: backlight_mode
  type: enum
  values: [day, night, auto]
- id: ack
  type: enum
  values: [ok, error, invalid]
```

## Variables
```yaml
- id: unit_id
  type: integer
  range: [0, 255]
  description: "Optional 3-digit ASCII prefix (000-255) separated from command by semicolon. 000 = global/broadcast."
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited event messages from the device
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlocks, or power-on sequencing requirements stated in source.
# Note: source includes a non-safety physical warning - RJ45 service port is NOT Ethernet; do not connect to a network. Captured in Notes.
```

## Notes
- All commands are framed: `STX (0x02)` + optional `NNN;` unit ID + `CMD:param` + `ETX (0x03)`. STX and ETX are sent as raw hex bytes; the command and parameter are ASCII.
- Acknowledgment is `STX OK ETX` for most commands; `STX ER ETX` (optionally with a colon-separated detail) on error; `STX INVALID ETX` when a command is not supported by the device variant.
- Queries use `?` as the parameter and return the raw current value, e.g. `STX VOL:? ETX` → `STX 50 ETX`. No `OK` is returned after a query.
- Three-digit unit ID 000 is a global/broadcast command. Unit ID is set in the Service Menu (not documented here).
- AMX programmers may need 100ms delays between parameters in commands.
- The RJ45 service port shares pins with IR I/O. Pin 1/4 IR in, pin 6/7 IR out, pin 2 RS-232 TXD (from TV), pin 3 RS-232 RXD (to TV), pin 5 GND, pin 8 +5VDC @ 100mA output. Do not connect to Ethernet.
- Source contains a typo in the KEY:27 row: response is printed as `[0z02]OK[0x03]` (should be `[0x02]OK[0x03]`).
- Channel set uses format `xxx.x` to support ATSC sub-channels.
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Provenance

```yaml
source_domains:
  - storage.googleapis.com
source_urls:
  - https://storage.googleapis.com/wp-stateless/2019/10/RS232-protocol-entertainment-and-outdoor-tvs.pdf
retrieved_at: 2026-07-16T08:51:27.584Z
last_checked_at: 2026-09-19T22:17:27.139Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-19T22:17:27.139Z
matched_actions: 91
action_count: 91
confidence: medium
summary: "All 91 spec actions match the source command table; transport parameters verified verbatim; coverage 91/91. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "command list reflects the refined source excerpts; some response rows were corrupted in the source (e.g. KEY:27 response uses [0z02])"
- "source does not document unsolicited event messages from the device"
- "no multi-step sequences described in source"
- "no safety warnings, interlocks, or power-on sequencing requirements stated in source."
- "firmware version compatibility not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
