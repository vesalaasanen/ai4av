---
spec_id: admin/seura-stm3-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Seura STM3 Series Control Spec"
manufacturer: Seura
model_family: "STM3 Series"
aliases: []
compatible_with:
  manufacturers:
    - Seura
  models:
    - "STM3 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - storage.googleapis.com
source_urls:
  - https://storage.googleapis.com/wp-stateless/2019/10/RS232-protocol-entertainment-and-outdoor-tvs.pdf
  - https://storage.googleapis.com/wp-stateless/2019/10/ultra-bright-spec-sheet-1.pdf
retrieved_at: 2026-04-30T12:59:18.770Z
last_checked_at: 2026-10-07T13:09:06.588Z
generated_at: 2026-10-07T13:09:06.588Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source covers Storm, Storm Ultra Bright, and S2 model families alongside STM3; family coverage not fully disambiguated. No firmware version range stated."
  - "confirm whether TV emits asynchronous status messages; source describes only query/response."
  - "source defines no multi-step sequences."
  - "source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
  - "firmware version range not stated; voltage/current draw not stated; no IP/network control documented (RS-232C only); default Unit ID value not stated; specific Storm/Storm Ultra Bright/S2 vs STM3 command support matrix not stated."
verification:
  verdict: verified
  checked_at: 2026-10-07T13:09:06.588Z
  matched_actions: 112
  action_count: 112
  confidence: medium
  summary: "All 112 units match literally (10 *_source_token ids duplicate VOL/CHA/etc. forms); transport ok. Caveat: source never names STM3 and scopes picture commands to Storm/S2. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# Seura STM3 Series Control Spec

## Summary

Seura STM3 Series outdoor/TV displays controlled via RS-232C on a female RJ45 connector (TXD/RXD pins), 9600/8N1, asynchronous. All commands framed with STX [0x02] and ETX [0x03], colon-separated command and 1–5 ASCII char parameter. Acknowledgement is `[0x02]OK[0x03]` or `[0x02]ER[0x03]`. Optional 3-digit unit ID (000–255) precedes the command after a semicolon; ID 000 is global.

<!-- UNRESOLVED: source covers Storm, Storm Ultra Bright, and S2 model families alongside STM3; family coverage not fully disambiguated. No firmware version range stated. -->

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
  connector: RJ45  # TXD = pin 2, RXD = pin 3, GND = pin 5
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits
```yaml
- powerable       # PWD on/off/toggle commands present
- routable        # INP input select commands present
- queryable       # PWD?, INP?, VOL?, CON?, BRT?, SAT?, TIN?, SHA?, TEM?, BLT?, MUT?, CHA? queries present
- levelable       # VOL, CON, BRT, SAT, TIN, SHA level commands present
```

## Actions
```yaml
- id: power_off
  label: Power Off
  kind: action
  command: "[0x02]PWD:0[0x03]"
  params: []

- id: power_on
  label: Power On
  kind: action
  command: "[0x02]PWD:1[0x03]"
  params: []

- id: power_toggle
  label: Power Toggle
  kind: action
  command: "[0x02]PWD:3[0x03]"
  params: []

- id: power_status_query
  label: Power Status Query
  kind: query
  command: "[0x02]PWD:?[0x03]"
  params: []

- id: input_vga
  label: Select Input VGA
  kind: action
  command: "[0x02]INP:0[0x03]"
  params: []

- id: input_hdmi1
  label: Select Input HDMI 1
  kind: action
  command: "[0x02]INP:1[0x03]"
  params: []

- id: input_tuner
  label: Select Input Tuner
  kind: action
  command: "[0x02]INP:2[0x03]"
  params: []

- id: input_av1
  label: Select Input AV1
  kind: action
  command: "[0x02]INP:3[0x03]"
  params: []

- id: input_av2
  label: Select Input AV2
  kind: action
  command: "[0x02]INP:4[0x03]"
  params: []

- id: input_hdmi2
  label: Select Input HDMI 2
  kind: action
  command: "[0x02]INP:6[0x03]"
  params: []

- id: input_component
  label: Select Input Component
  kind: action
  command: "[0x02]INP:7[0x03]"
  params: []

- id: input_hdmi3
  label: Select Input HDMI 3
  kind: action
  command: "[0x02]INP:9[0x03]"
  params: []

- id: input_usb
  label: Select Input USB
  kind: action
  command: "[0x02]INP:12[0x03]"
  params: []

- id: input_status_query
  label: Input Status Query
  kind: query
  command: "[0x02]INP:?[0x03]"
  params: []

- id: mute_on
  label: Mute
  kind: action
  command: "[0x02]MUT:1[0x03]"
  params: []

- id: mute_off
  label: Unmute
  kind: action
  command: "[0x02]MUT:0[0x03]"
  params: []

- id: mute_status_query
  label: Mute Status Query
  kind: query
  command: "[0x02]MUT:?[0x03]"
  params: []

- id: volume_set
  label: Set Volume
  kind: action
  command: "[0x02]VOL:{level}[0x03]"
  params:
    - name: level
      type: integer
      description: Volume value 000-100

- id: volume_query
  label: Volume Query
  kind: query
  command: "[0x02]VOL:?[0x03]"
  params: []

- id: channel_set
  label: Set Channel
  kind: action
  command: "[0x02]CHA:{channel}[0x03]"
  params:
    - name: channel
      type: string
      description: Channel value, format xxx.x (e.g. 005.1)

- id: channel_query
  label: Channel Query
  kind: query
  command: "[0x02]CHA:?[0x03]"
  params: []

- id: format_4_3
  label: Aspect Ratio 4:3
  kind: action
  command: "[0x02]FOR:0[0x03]"
  params: []

- id: format_16_9
  label: Aspect Ratio 16:9
  kind: action
  command: "[0x02]FOR:1[0x03]"
  params: []

- id: format_zoom
  label: Aspect Ratio Zoom
  kind: action
  command: "[0x02]FOR:3[0x03]"
  params: []

- id: format_1_1
  label: Aspect Ratio 1:1
  kind: action
  command: "[0x02]FOR:5[0x03]"
  params: []

- id: format_screen_off
  label: Screen Off (Audio Only)
  kind: action
  command: "[0x02]FOR:6[0x03]"
  params: []

- id: contrast_increment
  label: Contrast Increment
  kind: action
  command: "[0x02]CON:+[0x03]"
  params: []

- id: contrast_decrement
  label: Contrast Decrement
  kind: action
  command: "[0x02]CON:-[0x03]"
  params: []

- id: contrast_set
  label: Set Contrast
  kind: action
  command: "[0x02]CON:{value}[0x03]"
  params:
    - name: value
      type: integer
      description: Contrast value 000-100

- id: contrast_query
  label: Contrast Query
  kind: query
  command: "[0x02]CON:?[0x03]"
  params: []

- id: brightness_increment
  label: Brightness Increment
  kind: action
  command: "[0x02]BRT:+[0x03]"
  params: []

- id: brightness_decrement
  label: Brightness Decrement
  kind: action
  command: "[0x02]BRT:-[0x03]"
  params: []

- id: brightness_set
  label: Set Brightness
  kind: action
  command: "[0x02]BRT:{value}[0x03]"
  params:
    - name: value
      type: integer
      description: Brightness value 000-100

- id: brightness_query
  label: Brightness Query
  kind: query
  command: "[0x02]BRT:?[0x03]"
  params: []

- id: saturation_increment
  label: Color Saturation Increment
  kind: action
  command: "[0x02]SAT:+[0x03]"
  params: []

- id: saturation_decrement
  label: Color Saturation Decrement
  kind: action
  command: "[0x02]SAT:-[0x03]"
  params: []

- id: saturation_set
  label: Set Color Saturation
  kind: action
  command: "[0x02]SAT:{value}[0x03]"
  params:
    - name: value
      type: integer
      description: Color saturation value 000-100

- id: saturation_query
  label: Color Saturation Query
  kind: query
  command: "[0x02]SAT:?[0x03]"
  params: []

- id: tint_increment
  label: Tint Increment
  kind: action
  command: "[0x02]TIN:+[0x03]"
  params: []

- id: tint_decrement
  label: Tint Decrement
  kind: action
  command: "[0x02]TIN:-[0x03]"
  params: []

- id: tint_set
  label: Set Tint
  kind: action
  command: "[0x02]TIN:{value}[0x03]"
  params:
    - name: value
      type: integer
      description: Tint value 000-100

- id: tint_query
  label: Tint Query
  kind: query
  command: "[0x02]TIN:?[0x03]"
  params: []

- id: sharpness_increment
  label: Sharpness Increment
  kind: action
  command: "[0x02]SHA:+[0x03]"
  params: []

- id: sharpness_decrement
  label: Sharpness Decrement
  kind: action
  command: "[0x02]SHA:-[0x03]"
  params: []

- id: sharpness_set
  label: Set Sharpness
  kind: action
  command: "[0x02]SHA:{value}[0x03]"
  params:
    - name: value
      type: integer
      description: Sharpness value 000-100

- id: sharpness_query
  label: Sharpness Query
  kind: query
  command: "[0x02]SHA:?[0x03]"
  params: []

- id: color_temp_set
  label: Set Color Temperature
  kind: action
  command: "[0x02]TEM:{value}[0x03]"
  params:
    - name: value
      type: integer
      description: "Color temperature: 0=Warm, 1=Normal, 2=Cool"

- id: color_temp_query
  label: Color Temperature Query
  kind: query
  command: "[0x02]TEM:?[0x03]"
  params: []

- id: backlight_set
  label: Set Backlight Mode
  kind: action
  command: "[0x02]BLT:{value}[0x03]"
  params:
    - name: value
      type: integer
      description: "Backlight mode: 0=Day, 1=Night, 2=Auto"

- id: backlight_query
  label: Backlight Mode Query
  kind: query
  command: "[0x02]BLT:?[0x03]"
  params: []

- id: game_mode_set
  label: Set Game Mode
  kind: action
  command: "[0x02]GAM:{value}[0x03]"
  params:
    - name: value
      type: integer
      description: "Game mode: 0=Off, 1=On"

- id: key_digit_0
  label: Key Digit 0
  kind: action
  command: "[0x02]KEY:0[0x03]"
  params: []

- id: key_digit_1
  label: Key Digit 1
  kind: action
  command: "[0x02]KEY:1[0x03]"
  params: []

- id: key_digit_2
  label: Key Digit 2
  kind: action
  command: "[0x02]KEY:2[0x03]"
  params: []

- id: key_digit_3
  label: Key Digit 3
  kind: action
  command: "[0x02]KEY:3[0x03]"
  params: []

- id: key_digit_4
  label: Key Digit 4
  kind: action
  command: "[0x02]KEY:4[0x03]"
  params: []

- id: key_digit_5
  label: Key Digit 5
  kind: action
  command: "[0x02]KEY:5[0x03]"
  params: []

- id: key_digit_6
  label: Key Digit 6
  kind: action
  command: "[0x02]KEY:6[0x03]"
  params: []

- id: key_digit_7
  label: Key Digit 7
  kind: action
  command: "[0x02]KEY:7[0x03]"
  params: []

- id: key_digit_8
  label: Key Digit 8
  kind: action
  command: "[0x02]KEY:8[0x03]"
  params: []

- id: key_digit_9
  label: Key Digit 9
  kind: action
  command: "[0x02]KEY:9[0x03]"
  params: []

- id: key_sleep
  label: Key Sleep
  kind: action
  command: "[0x02]KEY:11[0x03]"
  params: []

- id: key_cc
  label: Key Closed Caption
  kind: action
  command: "[0x02]KEY:12[0x03]"
  params: []

- id: key_menu_toggle
  label: Key Menu Toggle
  kind: action
  command: "[0x02]KEY:21[0x03]"
  params: []

- id: key_display_toggle
  label: Key Display Toggle
  kind: action
  command: "[0x02]KEY:22[0x03]"
  params: []

- id: key_vol_up
  label: Key Volume Up (Navigate Right)
  kind: action
  command: "[0x02]KEY:23[0x03]"
  params: []

- id: key_vol_down
  label: Key Volume Down (Navigate Left)
  kind: action
  command: "[0x02]KEY:24[0x03]"
  params: []

- id: key_ch_up
  label: Key Channel Up (Navigate Up)
  kind: action
  command: "[0x02]KEY:25[0x03]"
  params: []

- id: key_ch_down
  label: Key Channel Down (Navigate Down)
  kind: action
  command: "[0x02]KEY:26[0x03]"
  params: []

- id: key_picture_standard
  label: Key Picture Mode Standard
  kind: action
  command: "[0x02]KEY:27[0x03]"
  params: []

- id: key_picture_dynamic
  label: Key Picture Mode Dynamic
  kind: action
  command: "[0x02]KEY:28[0x03]"
  params: []

- id: key_picture_theater
  label: Key Picture Mode Theater
  kind: action
  command: "[0x02]KEY:29[0x03]"
  params: []

- id: key_picture_personal
  label: Key Picture Mode Personal
  kind: action
  command: "[0x02]KEY:30[0x03]"
  params: []

- id: key_play
  label: Key Play
  kind: action
  command: "[0x02]KEY:115[0x03]"
  params: []

- id: key_pause
  label: Key Pause
  kind: action
  command: "[0x02]KEY:116[0x03]"
  params: []

- id: key_stop
  label: Key Stop
  kind: action
  command: "[0x02]KEY:117[0x03]"
  params: []

- id: key_skip_forward
  label: Key Skip Forward / Chapter +
  kind: action
  command: "[0x02]KEY:118[0x03]"
  params: []

- id: key_previous_channel
  label: Key Previous Channel
  kind: action
  command: "[0x02]KEY:35[0x03]"
  params: []

- id: key_enter
  label: Key Enter
  kind: action
  command: "[0x02]KEY:36[0x03]"
  params: []

- id: key_ok
  label: Key OK
  kind: action
  command: "[0x02]KEY:37[0x03]"
  params: []

- id: key_input_toggle
  label: Key Input Select Toggle
  kind: action
  command: "[0x02]KEY:38[0x03]"
  params: []

- id: key_skip_backward
  label: Key Skip Backward / Chapter -
  kind: action
  command: "[0x02]KEY:19[0x03]"
  params: []

- id: key_fast_forward
  label: Key Fast Forward
  kind: action
  command: "[0x02]KEY:109[0x03]"
  params: []

- id: key_fast_backward
  label: Key Fast Backward
  kind: action
  command: "[0x02]KEY:112[0x03]"
  params: []

- id: key_exit
  label: Key Exit
  kind: action
  command: "[0x02]KEY:110[0x03]"
  params: []

- id: key_digit_dot
  label: Key Digit Dot (ATSC Sub-Channel)
  kind: action
  command: "[0x02]KEY:104[0x03]"
  params: []

- id: key_guide_toggle
  label: Key Guide Toggle
  kind: action
  command: "[0x02]KEY:105[0x03]"
  params: []

- id: key_red
  label: Key Red
  kind: action
  command: "[0x02]KEY:32[0x03]"
  params: []

- id: key_green
  label: Key Green
  kind: action
  command: "[0x02]KEY:114[0x03]"
  params: []

- id: key_yellow
  label: Key Yellow
  kind: action
  command: "[0x02]KEY:111[0x03]"
  params: []

- id: key_blue
  label: Key Blue
  kind: action
  command: "[0x02]KEY:113[0x03]"
  params: []

- id: volume_set_source_token
  label: Set Volume (Source Command Form)
  kind: action
  command: "[0x02]VOL:xxx[0x03]"
  params:
    - name: level
      type: integer
      description: Volume value 000 -100

- id: channel_set_source_token
  label: Set Channel (Source Command Form)
  kind: action
  command: "[0x02]CHA:xxx.x[0x03]"
  params:
    - name: channel
      type: string
      description: Channel value formatted xxx.x

- id: brightness_set_source_token
  label: Set Brightness (Source Command Form)
  kind: action
  command: "[0x02]BRT:xxx[0x03]"
  params:
    - name: value
      type: integer
      description: Brightness value 000-100

- id: saturation_set_source_token
  label: Set Color Saturation (Source Command Form)
  kind: action
  command: "[0x02]SAT:xxx[0x03]"
  params:
    - name: value
      type: integer
      description: Color Saturation value 000-100

- id: tint_set_source_token
  label: Set Tint (Source Command Form)
  kind: action
  command: "[0x02]TIN:xxx[0x03]"
  params:
    - name: value
      type: integer
      description: Tint value 000 - 100

- id: sharpness_set_source_token
  label: Set Sharpness (Source Command Form)
  kind: action
  command: "[0x02]SHA:xxx[0x03]"
  params:
    - name: value
      type: integer
      description: Sharpness value 000 - 100

- id: color_temp_set_source_token
  label: Set Color Temperature (Source Command Form)
  kind: action
  command: "[0x02]TEM:x[0x03]"
  params:
    - name: value
      type: integer
      description: "Color Temp value 0-2; 0 = WARM; 1 = NORMAL; 2 = COOL"

- id: backlight_set_source_token
  label: Set Backlight Mode (Source Command Form)
  kind: action
  command: "[0xo2]BLT:x[0x03]"
  params:
    - name: value
      type: integer
      description: "Backlight mode: 0 = Day; 1 = Night; 2 = Auto"

- id: game_mode_set_source_token
  label: Set Game Mode (Source Command Form)
  kind: action
  command: "[0x02]GAM:x[0x03]"
  params:
    - name: value
      type: integer
      description: "Game Mode status; 0 = OFF; 1 = ON"
```

## Feedbacks
```yaml
- id: ack_ok
  type: enum
  values: [ok]
  description: Successful command acknowledgement [0x02]OK[0x03]

- id: ack_error
  type: enum
  values: [error]
  description: Error acknowledgement [0x02]ER[0x03], may be followed by colon + parameter

- id: ack_invalid
  type: enum
  values: [invalid]
  description: Command not supported by TV [0x02]INVALID[0x03]

- id: power_state
  type: enum
  values: [off, on]
  description: Response to PWD? - 0=off, 1=on
  query_command: "[0x02]PWD:?[0x03]"

- id: input_state
  type: integer
  description: "Response to INP?: 0=VGA, 1=HDMI1, 2=Tuner, 3=AV1, 4=AV2, 6=HDMI2, 7=Component, 9=HDMI3, 12=USB"
  query_command: "[0x02]INP:?[0x03]"

- id: mute_state
  type: enum
  values: [unmuted, muted]
  description: Response to MUT? - 0=unmuted, 1=muted
  query_command: "[0x02]MUT:?[0x03]"

- id: volume_state
  type: integer
  description: Response to VOL? - 000-100
  query_command: "[0x02]VOL:?[0x03]"

- id: channel_state
  type: string
  description: Response to CHA? - channel value formatted xxx.x
  query_command: "[0x02]CHA:?[0x03]"

- id: contrast_state
  type: integer
  description: Response to CON? - 000-100
  query_command: "[0x02]CON:?[0x03]"

- id: brightness_state
  type: integer
  description: Response to BRT? - 000-100
  query_command: "[0x02]BRT:?[0x03]"

- id: saturation_state
  type: integer
  description: Response to SAT? - 000-100
  query_command: "[0x02]SAT:?[0x03]"

- id: tint_state
  type: integer
  description: Response to TIN? - 000-100
  query_command: "[0x02]TIN:?[0x03]"

- id: sharpness_state
  type: integer
  description: Response to SHA? - 000-100
  query_command: "[0X02]SHA:?[0x03]"

- id: color_temp_state
  type: enum
  values: [warm, normal, cool]
  description: "Response to TEM?: 0=Warm, 1=Normal, 2=Cool"
  query_command: "[0x02]TEM:?[0x03]"

- id: backlight_state
  type: enum
  values: [day, night, auto]
  description: "Response to BLT?: 0=Day, 1=Night, 2=Auto"
  query_command: "[0x02]BLT:?[0x03]"
```

## Variables
```yaml
# Source documents no settable parameters beyond per-action ranges; section retained for schema completeness.
```

## Events
```yaml
# Source documents no unsolicited notifications.
# UNRESOLVED: confirm whether TV emits asynchronous status messages; source describes only query/response.
```

## Macros
```yaml
# UNRESOLVED: source defines no multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or power-on sequencing requirements.
```

## Notes

Frame format: every command framed `[0x02]CMD[:param][;unitid][0x03]`. STX/ETX sent as hex bytes; everything between as ASCII. Brackets `[ ]` in source are notation only — never transmitted. Unit ID (000–255) set in Factory Menu; ID 000 = global broadcast. Default Unit ID not stated in source.

Acknowledgement rules: most commands reply `[0x02]OK[0x03]`. Errors reply `[0x02]ER[0x03]` (optionally with detail after colon). Unsupported commands reply `[0x02]INVALID[0x03]`. Queries return bare value (e.g. `[0x02]50[0x03]`) — no `OK` prefix.

Source explicitly notes: AMX programmers may need 100ms delays between parameters in commands (timing hint only).

Source listed model families: Storm, Storm Ultra Bright, S2, plus STM3 (subject of this spec). Per-command availability across families not disambiguated in source — CHANNEL marked with footnote `¹` (possibly tuner-only) and Key commands 35/104/105 similarly footnoted. Treat those as conditionally supported.

Source typo noted: PICTURE MODE STANDARD row shows response `[0z02]OK[0x03]` — treated as `[0x02]OK[0x03]` per protocol convention. GAM has no query — action-only.

<!-- UNRESOLVED: firmware version range not stated; voltage/current draw not stated; no IP/network control documented (RS-232C only); default Unit ID value not stated; specific Storm/Storm Ultra Bright/S2 vs STM3 command support matrix not stated. -->

## Provenance

```yaml
source_domains:
  - storage.googleapis.com
source_urls:
  - https://storage.googleapis.com/wp-stateless/2019/10/RS232-protocol-entertainment-and-outdoor-tvs.pdf
  - https://storage.googleapis.com/wp-stateless/2019/10/ultra-bright-spec-sheet-1.pdf
retrieved_at: 2026-04-30T12:59:18.770Z
last_checked_at: 2026-10-07T13:09:06.588Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T13:09:06.588Z
matched_actions: 112
action_count: 112
confidence: medium
summary: "All 112 units match literally (10 *_source_token ids duplicate VOL/CHA/etc. forms); transport ok. Caveat: source never names STM3 and scopes picture commands to Storm/S2. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source covers Storm, Storm Ultra Bright, and S2 model families alongside STM3; family coverage not fully disambiguated. No firmware version range stated."
- "confirm whether TV emits asynchronous status messages; source describes only query/response."
- "source defines no multi-step sequences."
- "source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
- "firmware version range not stated; voltage/current draw not stated; no IP/network control documented (RS-232C only); default Unit ID value not stated; specific Storm/Storm Ultra Bright/S2 vs STM3 command support matrix not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
