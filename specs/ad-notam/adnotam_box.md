---
spec_id: admin/adnotam-cs-101
schema_version: ai4av-public-spec-v1
revision: 1
title: "Ad Notam CS-101 Control Spec"
manufacturer: "Ad Notam"
model_family: CS-101
aliases: []
compatible_with:
  manufacturers:
    - "Ad Notam"
  models:
    - CS-101
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - ad-notam.com
source_urls:
  - https://www.ad-notam.com/download/RS232/ad_notam_RS232_protocol_DFU.pdf
  - https://www.ad-notam.com/attachment/741/download/td_dfu_rs232-protocol_v4-1_ascii-format_20150901.pdf
retrieved_at: 2026-05-04T15:17:36.583Z
last_checked_at: 2026-06-02T21:39:34.282Z
generated_at: 2026-06-02T21:39:34.282Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no directly-settable numeric variables documented - levels are mutated only via UP/DN actions in the source."
  - "source documents only solicited acknowledgements (`%...`) and error replies (`!ERR:...`); no unsolicited notifications described."
  - "no multi-step macro sequences described in source."
  - "source contains no safety warnings, interlock procedures, or power-on sequencing beyond timing constraints (see Notes)."
  - "firmware version compatibility not stated in source."
  - "physical / electrical specs (voltage, current, port pinout beyond Rx/Tx/GND) not in source."
verification:
  verdict: verified
  checked_at: 2026-06-02T21:39:34.282Z
  matched_actions: 112
  action_count: 112
  confidence: medium
  summary: "All 112 spec actions matched literally in source command table; transport parameters (38400 baud default + 9600/19200/38400 options, 8 data bits, no parity, 1 stop bit, no flow control) all verified; source command inventory fully represented. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Ad Notam CS-101 Control Spec

## Summary
Ad Notam Display Frame Unit (DFU) controlled by ASCII RS-232 protocol. Commands always 9 bytes including CR: header (`&` for command, `%` for ack), 3-byte identifier, optional `:` or `?` separator, 3-byte value (`*` padding), `<CR>` terminator. Error responses prefixed with `!`. Default baud 38400; 9600/19200/38400 configurable via OSD service menu.

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 38400  # default per source; 9600/19200/38400 configurable
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable     # inferred from power command examples
- routable      # inferred from input routing commands
- queryable     # inferred from query command examples
- levelable     # volume / bass / treble / brightness / contrast / saturation / sharpness / backlight / balance / boot volume present
```

## Actions
```yaml
- id: power_toggle
  label: Power Toggle
  kind: action
  command: "&PWR:TOG<CR>"
  params: []

- id: power_on
  label: Power On
  kind: action
  command: "&PWR:ON*<CR>"
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "&PWR:OFF<CR>"
  params: []

- id: power_status_query
  label: Get Power Status
  kind: query
  command: "&PWR?***<CR>"
  params: []

- id: boot_on
  label: Boot Set To On
  kind: action
  command: "&BOT:ON*<CR>"
  params: []

- id: boot_standby
  label: Boot Set To Standby
  kind: action
  command: "&BOT:SBY<CR>"
  params: []

- id: boot_last
  label: Boot Set To Last
  kind: action
  command: "&BOT:LST<CR>"
  params: []

- id: boot_setup_query
  label: Get Boot Setup
  kind: query
  command: "&BOT?***<CR>"
  params: []

- id: signal_loss_5s
  label: Signal Loss 5 Seconds
  kind: action
  command: "&SLS:05s<CR>"
  params: []

- id: signal_loss_10s
  label: Signal Loss 10 Seconds
  kind: action
  command: "&SLS:10s<CR>"
  params: []

- id: signal_loss_30s
  label: Signal Loss 30 Seconds
  kind: action
  command: "&SLS:30s<CR>"
  params: []

- id: signal_loss_1m
  label: Signal Loss 1 Minute
  kind: action
  command: "&SLS:01m<CR>"
  params: []

- id: signal_loss_2m
  label: Signal Loss 2 Minutes
  kind: action
  command: "&SLS:02m<CR>"
  params: []

- id: signal_loss_off
  label: Signal Loss Off
  kind: action
  command: "&SLS:OFF<CR>"
  params: []

- id: signal_loss_query
  label: Get Signal Loss Setup
  kind: query
  command: "&SLS?***<CR>"
  params: []

- id: sleep_timer_15
  label: Sleep Timer 15 Minutes
  kind: action
  command: "&SLP:015<CR>"
  params: []

- id: sleep_timer_30
  label: Sleep Timer 30 Minutes
  kind: action
  command: "&SLP:030<CR>"
  params: []

- id: sleep_timer_45
  label: Sleep Timer 45 Minutes
  kind: action
  command: "&SLP:045<CR>"
  params: []

- id: sleep_timer_60
  label: Sleep Timer 60 Minutes
  kind: action
  command: "&SLP:060<CR>"
  params: []

- id: sleep_timer_90
  label: Sleep Timer 90 Minutes
  kind: action
  command: "&SLP:090<CR>"
  params: []

- id: sleep_timer_120
  label: Sleep Timer 120 Minutes
  kind: action
  command: "&SLP:120<CR>"
  params: []

- id: sleep_timer_off
  label: Sleep Timer Off
  kind: action
  command: "&SLP:OFF<CR>"
  params: []

- id: sleep_timer_query
  label: Get Sleep Timer Status
  kind: query
  command: "&SLP?***<CR>"
  params: []

- id: digit_0
  label: Digit 0
  kind: action
  command: "&NUM:000<CR>"
  params: []

- id: digit_1
  label: Digit 1
  kind: action
  command: "&NUM:001<CR>"
  params: []

- id: digit_2
  label: Digit 2
  kind: action
  command: "&NUM:002<CR>"
  params: []

- id: digit_3
  label: Digit 3
  kind: action
  command: "&NUM:003<CR>"
  params: []

- id: digit_4
  label: Digit 4
  kind: action
  command: "&NUM:004<CR>"
  params: []

- id: digit_5
  label: Digit 5
  kind: action
  command: "&NUM:005<CR>"
  params: []

- id: digit_6
  label: Digit 6
  kind: action
  command: "&NUM:006<CR>"
  params: []

- id: digit_7
  label: Digit 7
  kind: action
  command: "&NUM:007<CR>"
  params: []

- id: digit_8
  label: Digit 8
  kind: action
  command: "&NUM:008<CR>"
  params: []

- id: digit_9
  label: Digit 9
  kind: action
  command: "&NUM:009<CR>"
  params: []

- id: cursor_ok
  label: Cursor OK
  kind: action
  command: "&CRS:OK*<CR>"
  params: []

- id: cursor_up
  label: Cursor Up
  kind: action
  command: "&CRS:UP*<CR>"
  params: []

- id: cursor_down
  label: Cursor Down
  kind: action
  command: "&CRS:DN*<CR>"
  params: []

- id: cursor_left
  label: Cursor Left
  kind: action
  command: "&CRS:LT*<CR>"
  params: []

- id: cursor_right
  label: Cursor Right
  kind: action
  command: "&CRS:RT*<CR>"
  params: []

- id: volume_up
  label: Volume +
  kind: action
  command: "&VOL:UP*<CR>"
  params: []

- id: volume_down
  label: Volume -
  kind: action
  command: "&VOL:DN*<CR>"
  params: []

- id: volume_query
  label: Get Volume Level
  kind: query
  command: "&VOL?***<CR>"
  params: []

- id: mute_toggle
  label: Mute Toggle
  kind: action
  command: "&MUT:TOG<CR>"
  params: []

- id: mute_on
  label: Mute On
  kind: action
  command: "&MUT:ON*<CR>"
  params: []

- id: mute_off
  label: Mute Off
  kind: action
  command: "&MUT:OFF<CR>"
  params: []

- id: mute_query
  label: Get Mute Status
  kind: query
  command: "&MUT?***<CR>"
  params: []

- id: play
  label: Play
  kind: action
  command: "&FNC:PLY<CR>"
  params: []

- id: pause
  label: Pause
  kind: action
  command: "&FNC:PSE<CR>"
  params: []

- id: stop
  label: Stop
  kind: action
  command: "&FNC:STP<CR>"
  params: []

- id: skip_forward
  label: Skip Forward / Chapter +
  kind: action
  command: "&FNC:NXT<CR>"
  params: []

- id: skip_backward
  label: Skip Backward / Chapter -
  kind: action
  command: "&FNC:PRV<CR>"
  params: []

- id: fast_forward
  label: Fast Forward
  kind: action
  command: "&FNC:FWD<CR>"
  params: []

- id: fast_backward
  label: Fast Backward
  kind: action
  command: "&FNC:RWD<CR>"
  params: []

- id: exit
  label: Exit
  kind: action
  command: "&EXT:***<CR>"
  params: []

- id: osd_access_on
  label: OSD Access On
  kind: action
  command: "&OSA:ON*<CR>"
  params: []

- id: osd_access_off
  label: OSD Access Off
  kind: action
  command: "&OSA:OFF<CR>"
  params: []

- id: osd_access_query
  label: Get OSD Access Status
  kind: query
  command: "&OSA?***<CR>"
  params: []

- id: osd_toggle
  label: OSD Toggle
  kind: action
  command: "&OSD:TOG<CR>"
  params: []

- id: osd_on
  label: OSD On
  kind: action
  command: "&OSD:ON*<CR>"
  params: []

- id: osd_off
  label: OSD Off
  kind: action
  command: "&OSD:OFF<CR>"
  params: []

- id: osd_query
  label: Get OSD Status
  kind: query
  command: "&OSD?***<CR>"
  params: []

- id: input_hdmi1
  label: Input HDMI 1
  kind: action
  command: "&SRC:HD1<CR>"
  params: []

- id: input_hdmi2
  label: Input HDMI 2
  kind: action
  command: "&SRC:HD2<CR>"
  params: []

- id: input_hdmi3
  label: Input HDMI 3
  kind: action
  command: "&SRC:HD3<CR>"
  params: []

- id: input_component
  label: Input Component
  kind: action
  command: "&SRC:RGB<CR>"
  params: []

- id: input_usb_dmp
  label: Input USB / DMP
  kind: action
  command: "&SRC:USB<CR>"
  params: []

- id: input_query
  label: Get Input Status
  kind: query
  command: "&SRC?***<CR>"
  params: []

- id: aspect_16_9
  label: Aspect 16:9
  kind: action
  command: "&ASP:169<CR>"
  params: []

- id: aspect_4_3
  label: Aspect 4:3
  kind: action
  command: "&ASP:043<CR>"
  params: []

- id: aspect_zoom1
  label: Aspect Zoom 1
  kind: action
  command: "&ASP:ZM1<CR>"
  params: []

- id: aspect_zoom2
  label: Aspect Zoom 2
  kind: action
  command: "&ASP:ZM2<CR>"
  params: []

- id: aspect_query
  label: Get Aspect Status
  kind: query
  command: "&ASP?***<CR>"
  params: []

- id: picture_mode_standard
  label: Picture Mode Standard
  kind: action
  command: "&PCT:STD<CR>"
  params: []

- id: picture_mode_user
  label: Picture Mode User
  kind: action
  command: "&PCT:USR<CR>"
  params: []

- id: picture_mode_dynamic
  label: Picture Mode Dynamic
  kind: action
  command: "&PCT:DYN<CR>"
  params: []

- id: picture_mode_mild
  label: Picture Mode Mild
  kind: action
  command: "&PCT:MLD<CR>"
  params: []

- id: picture_temp_cool
  label: Picture Temperature Cool
  kind: action
  command: "&PCT:COL<CR>"
  params: []

- id: picture_temp_medium
  label: Picture Temperature Medium
  kind: action
  command: "&PCT:MED<CR>"
  params: []

- id: picture_temp_warm
  label: Picture Temperature Warm
  kind: action
  command: "&PCT:WRM<CR>"
  params: []

- id: brightness_up
  label: Brightness +
  kind: action
  command: "&BRT:UP*<CR>"
  params: []

- id: brightness_down
  label: Brightness -
  kind: action
  command: "&BRT:DN*<CR>"
  params: []

- id: brightness_query
  label: Get Brightness Level
  kind: query
  command: "&BRT?***<CR>"
  params: []

- id: contrast_up
  label: Contrast +
  kind: action
  command: "&CON:UP*<CR>"
  params: []

- id: contrast_down
  label: Contrast -
  kind: action
  command: "&CON:DN*<CR>"
  params: []

- id: contrast_query
  label: Get Contrast Level
  kind: query
  command: "&CON?***<CR>"
  params: []

- id: saturation_up
  label: Saturation +
  kind: action
  command: "&STR:UP*<CR>"
  params: []

- id: saturation_down
  label: Saturation -
  kind: action
  command: "&STR:DN*<CR>"
  params: []

- id: saturation_query
  label: Get Saturation Level
  kind: query
  command: "&STR?***<CR>"
  params: []

- id: sharpness_up
  label: Sharpness +
  kind: action
  command: "&SRP:UP*<CR>"
  params: []

- id: sharpness_down
  label: Sharpness -
  kind: action
  command: "&SRP:DN*<CR>"
  params: []

- id: sharpness_query
  label: Get Sharpness Level
  kind: query
  command: "&SRP?***<CR>"
  params: []

- id: backlight_up
  label: Backlight +
  kind: action
  command: "&BLT:UP*<CR>"
  params: []

- id: backlight_down
  label: Backlight -
  kind: action
  command: "&BLT:DN*<CR>"
  params: []

- id: backlight_query
  label: Get Backlight Level
  kind: query
  command: "&BLT?***<CR>"
  params: []

- id: audio_mode_standard
  label: Audio Mode Standard
  kind: action
  command: "&AUD:STD<CR>"
  params: []

- id: audio_mode_user
  label: Audio Mode User
  kind: action
  command: "&AUD:USR<CR>"
  params: []

- id: audio_mode_music
  label: Audio Mode Music
  kind: action
  command: "&AUD:MUS<CR>"
  params: []

- id: audio_mode_movie
  label: Audio Mode Movie
  kind: action
  command: "&AUD:MOV<CR>"
  params: []

- id: audio_mode_sports
  label: Audio Mode Sports
  kind: action
  command: "&AUD:SPR<CR>"
  params: []

- id: bass_up
  label: Bass +
  kind: action
  command: "&BAS:UP*<CR>"
  params: []

- id: bass_down
  label: Bass -
  kind: action
  command: "&BAS:DN*<CR>"
  params: []

- id: bass_query
  label: Get Bass Level
  kind: query
  command: "&BAS?***<CR>"
  params: []

- id: treble_up
  label: Treble +
  kind: action
  command: "&TRB:UP*<CR>"
  params: []

- id: treble_down
  label: Treble -
  kind: action
  command: "&TRB:DN*<CR>"
  params: []

- id: treble_query
  label: Get Treble Level
  kind: query
  command: "&TRB?***<CR>"
  params: []

- id: balance_left
  label: Balance Left
  kind: action
  command: "&BAL:LT*<CR>"
  params: []

- id: balance_right
  label: Balance Right
  kind: action
  command: "&BAL:RT*<CR>"
  params: []

- id: balance_query
  label: Get Balance Level
  kind: query
  command: "&BAL?***<CR>"
  params: []

- id: boot_volume_up
  label: Boot Volume Level +
  kind: action
  command: "&BVL:UP*<CR>"
  params: []

- id: boot_volume_down
  label: Boot Volume Level -
  kind: action
  command: "&BVL:DN*<CR>"
  params: []

- id: boot_volume_query
  label: Get Boot Volume Level
  kind: query
  command: "&BVL?***<CR>"
  params: []

- id: echo_on
  label: Set RS232 Echo On
  kind: action
  command: "&ECO:ON*<CR>"
  params: []

- id: echo_off
  label: Set RS232 Echo Off
  kind: action
  command: "&ECO:OFF<CR>"
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [ON*, OFF]
  response_template: "%PWR:XXX<CR>"

- id: boot_setup_state
  type: enum
  values: [ON*, SBY, LST]
  response_template: "%BOT:XXX<CR>"

- id: signal_loss_state
  type: enum
  values: [05s, 10s, 30s, 01m, 02m, OFF]
  response_template: "%SLS:XXX<CR>"

- id: sleep_timer_state
  type: enum
  values: [015, 030, 045, 060, 090, 120, OFF]
  response_template: "%SLP:XXX<CR>"

- id: volume_level
  type: integer
  range: [0, 100]
  response_template: "%VOL:XXX<CR>"

- id: mute_state
  type: enum
  values: [ON*, OFF]
  response_template: "%MUT:XXX<CR>"

- id: osd_access_state
  type: enum
  values: [ON*, OFF]
  response_template: "%OSA:XXX<CR>"

- id: osd_state
  type: enum
  values: [ON*, OFF]
  response_template: "%OSD:XXX<CR>"

- id: input_state
  type: enum
  values: [HD1, HD2, HD3, RGB, USB]
  response_template: "%SRC:XXX<CR>"

- id: aspect_state
  type: enum
  values: [169, "043", ZM1, ZM2]
  response_template: "%ASP:XXX<CR>"

- id: brightness_level
  type: integer
  range: [0, 100]
  response_template: "%BRT:XXX<CR>"

- id: contrast_level
  type: integer
  range: [0, 100]
  response_template: "%CON:XXX<CR>"

- id: saturation_level
  type: integer
  range: [0, 100]
  response_template: "%STR:XXX<CR>"

- id: sharpness_level
  type: integer
  range: [0, 100]
  response_template: "%SRP:XXX<CR>"

- id: backlight_level
  type: integer
  range: [0, 100]
  response_template: "%BLT:XXX<CR>"

- id: bass_level
  type: integer
  range: [0, 100]
  response_template: "%BAS:XXX<CR>"

- id: treble_level
  type: integer
  range: [0, 100]
  response_template: "%TRB:XXX<CR>"

- id: balance_level
  type: integer
  range: [-50, 50]
  response_template: "%BAL:XXX<CR>"

- id: boot_volume_level
  type: integer
  range: [0, 100]
  response_template: "%BVL:XXX<CR>"

- id: error_response
  type: enum
  values: ["!ERR:001", "!ERR:002", "!ERR:003", "!ERR:004"]
  description: >
    Error response prefixed with `!`. 001=Access denied (command disabled by unit settings);
    002=Not available (command currently not available); 003=Not implemented;
    004=Value out of range.
```

## Variables
```yaml
# UNRESOLVED: no directly-settable numeric variables documented - levels are mutated only via UP/DN actions in the source.
```

## Events
```yaml
# UNRESOLVED: source documents only solicited acknowledgements (`%...`) and error replies (`!ERR:...`); no unsolicited notifications described.
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or power-on sequencing beyond timing constraints (see Notes).
```

## Notes
- Command framing: every command is exactly 9 bytes including the trailing `<CR>` (0x0D). Header is `&` for commands and `%` for acknowledgements. Identifier is 3 ASCII bytes, case sensitive. Separator is `:` (set) or `?` (query). Value field is 3 bytes; short values are right-padded with `*`.
- Acknowledgement is ON by default and can be toggled with `&ECO:ON*` / `&ECO:OFF`.
- Error replies start with `!` and follow the same length rules; see `error_response` feedback.
- Timing constraints from source: wait 10 s after power-on before first command; wait for response before next command; minimum 2 s before resending if no response; minimum 500 ms between commands; minimum 5 s pause after every 20 commands.
- Baud rate is configurable in the OSD service menu among 9600 / 19200 / 38400; spec lists the documented default of 38400.
- Wiring (null-modem DE-9): host pin 2↔DFU pin 3, host pin 3↔DFU pin 2, host pin 5↔DFU pin 5.
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: physical / electrical specs (voltage, current, port pinout beyond Rx/Tx/GND) not in source. -->

## Provenance

```yaml
source_domains:
  - ad-notam.com
source_urls:
  - https://www.ad-notam.com/download/RS232/ad_notam_RS232_protocol_DFU.pdf
  - https://www.ad-notam.com/attachment/741/download/td_dfu_rs232-protocol_v4-1_ascii-format_20150901.pdf
retrieved_at: 2026-05-04T15:17:36.583Z
last_checked_at: 2026-06-02T21:39:34.282Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T21:39:34.282Z
matched_actions: 112
action_count: 112
confidence: medium
summary: "All 112 spec actions matched literally in source command table; transport parameters (38400 baud default + 9600/19200/38400 options, 8 data bits, no parity, 1 stop bit, no flow control) all verified; source command inventory fully represented. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no directly-settable numeric variables documented - levels are mutated only via UP/DN actions in the source."
- "source documents only solicited acknowledgements (`%...`) and error replies (`!ERR:...`); no unsolicited notifications described."
- "no multi-step macro sequences described in source."
- "source contains no safety warnings, interlock procedures, or power-on sequencing beyond timing constraints (see Notes)."
- "firmware version compatibility not stated in source."
- "physical / electrical specs (voltage, current, port pinout beyond Rx/Tx/GND) not in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
