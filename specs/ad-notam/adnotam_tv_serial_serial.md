---
spec_id: admin/adnotam-cs-101-serial
schema_version: ai4av-public-spec-v1
revision: 1
title: "AdNotam CS-101 Display Frame Unit Control Spec"
manufacturer: "Ad Notam"
model_family: "CS-101 (Display Frame Unit / DFU)"
aliases: []
compatible_with:
  manufacturers:
    - "Ad Notam"
    - AdNotam
  models:
    - "CS-101 (Display Frame Unit / DFU)"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - ad-notam.com
source_urls:
  - https://www.ad-notam.com/download/RS232/ad_notam_RS232_protocol_DFU.pdf
retrieved_at: 2026-08-09T16:55:07.626Z
last_checked_at: 2026-10-01T06:45:24.265Z
generated_at: 2026-10-01T06:45:24.265Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware compatibility and DFU model variants beyond CS-101 are not stated in source."
  - "no direct absolute-level write syntax stated in source."
  - "source documents no named multi-step sequences."
  - "source states no safety warnings, interlocks, or damage-prevention sequences."
  - "firmware version compatibility not stated in source."
  - "DFU model variants beyond CS-101 not enumerated in source."
  - "no absolute-level write syntax documented."
verification:
  verdict: verified
  checked_at: 2026-10-01T06:45:24.265Z
  matched_actions: 112
  action_count: 112
  confidence: medium
  summary: "All 112 spec actions match source command table literally; transport values supported and the source catalogue is fully covered. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-02
---

# AdNotam CS-101 Display Frame Unit Control Spec

## Summary
AdNotam CS-101 Display Frame Unit (DFU) supports remote control through an ASCII-based RS-232 protocol over null-modem serial cable. Spec covers full documented command set: power, boot behavior, signal-loss behavior, sleep timer, keypad and cursor input, volume, mute, media controls, OSD, source selection, picture and audio settings, level controls, and RS-232 acknowledgement control.

<!-- UNRESOLVED: firmware compatibility and DFU model variants beyond CS-101 are not stated in source. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 38400
  supported_baud_rates: [9600, 19200, 38400]
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  connector: "DB9 null-modem; host female, DFU male; pins 2 and 3 crossed, pin 5 straight"
auth:
  type: UNRESOLVED  # source describes no authentication procedure but does not explicitly state that none is required
```

## Traits
```yaml
traits:
  - powerable  # inferred: PWR power commands present
  - queryable  # inferred: status query commands present
  - levelable  # inferred: volume, picture, and audio level commands present
  - routable  # inferred: SRC input-selection commands present
```

## Actions
```yaml
# Commands require trailing CR (0x0D), omitted from command strings below.
# Every complete frame is exactly 9 bytes including CR.

# --- Power (PWR) ---
- id: power_toggle
  label: Power Toggle
  kind: action
  command: "&PWR:TOG"
  params: []
- id: power_on
  label: Power On
  kind: action
  command: "&PWR:ON*"
  params: []
- id: power_off
  label: Power Off
  kind: action
  command: "&PWR:OFF"
  params: []
- id: power_status_query
  label: Get Power Status
  kind: query
  command: "&PWR?***"
  params: []

# --- Boot mode (BOT) ---
- id: boot_set_on
  label: Boot Set to On
  kind: action
  command: "&BOT:ON*"
  params: []
- id: boot_set_standby
  label: Boot Set to Standby
  kind: action
  command: "&BOT:SBY"
  params: []
- id: boot_set_last
  label: Boot Set to Last
  kind: action
  command: "&BOT:LST"
  params: []
- id: boot_status_query
  label: Get Boot Setup
  kind: query
  command: "&BOT?***"
  params: []

# --- Signal loss (SLS) ---
- id: signal_loss_5s
  label: Signal Loss 5 Seconds
  kind: action
  command: "&SLS:05s"
  params: []
- id: signal_loss_10s
  label: Signal Loss 10 Seconds
  kind: action
  command: "&SLS:10s"
  params: []
- id: signal_loss_30s
  label: Signal Loss 30 Seconds
  kind: action
  command: "&SLS:30s"
  params: []
- id: signal_loss_1m
  label: Signal Loss 1 Minute
  kind: action
  command: "&SLS:01m"
  params: []
- id: signal_loss_2m
  label: Signal Loss 2 Minutes
  kind: action
  command: "&SLS:02m"
  params: []
- id: signal_loss_off
  label: Signal Loss Off
  kind: action
  command: "&SLS:OFF"
  params: []
- id: signal_loss_query
  label: Get Signal Loss Setup
  kind: query
  command: "&SLS?***"
  params: []

# --- Sleep timer (SLP) ---
- id: sleep_15min
  label: Sleep Timer 15 Minutes
  kind: action
  command: "&SLP:015"
  params: []
- id: sleep_30min
  label: Sleep Timer 30 Minutes
  kind: action
  command: "&SLP:030"
  params: []
- id: sleep_45min
  label: Sleep Timer 45 Minutes
  kind: action
  command: "&SLP:045"
  params: []
- id: sleep_60min
  label: Sleep Timer 60 Minutes
  kind: action
  command: "&SLP:060"
  params: []
- id: sleep_90min
  label: Sleep Timer 90 Minutes
  kind: action
  command: "&SLP:090"
  params: []
- id: sleep_120min
  label: Sleep Timer 120 Minutes
  kind: action
  command: "&SLP:120"
  params: []
- id: sleep_off
  label: Sleep Timer Off
  kind: action
  command: "&SLP:OFF"
  params: []
- id: sleep_status_query
  label: Get Sleep Timer Status
  kind: query
  command: "&SLP?***"
  params: []

# --- Numeric keypad (NUM) ---
- id: digit_1
  label: Digit 1
  kind: action
  command: "&NUM:001"
  params: []
- id: digit_2
  label: Digit 2
  kind: action
  command: "&NUM:002"
  params: []
- id: digit_3
  label: Digit 3
  kind: action
  command: "&NUM:003"
  params: []
- id: digit_4
  label: Digit 4
  kind: action
  command: "&NUM:004"
  params: []
- id: digit_5
  label: Digit 5
  kind: action
  command: "&NUM:005"
  params: []
- id: digit_6
  label: Digit 6
  kind: action
  command: "&NUM:006"
  params: []
- id: digit_7
  label: Digit 7
  kind: action
  command: "&NUM:007"
  params: []
- id: digit_8
  label: Digit 8
  kind: action
  command: "&NUM:008"
  params: []
- id: digit_9
  label: Digit 9
  kind: action
  command: "&NUM:009"
  params: []
- id: digit_0
  label: Digit 0
  kind: action
  command: "&NUM:000"
  params: []

# --- Cursor / OK (CRS) ---
- id: cursor_ok
  label: OK
  kind: action
  command: "&CRS:OK*"
  params: []
- id: cursor_up
  label: Up
  kind: action
  command: "&CRS:UP*"
  params: []
- id: cursor_down
  label: Down
  kind: action
  command: "&CRS:DN*"
  params: []
- id: cursor_left
  label: Left
  kind: action
  command: "&CRS:LT*"
  params: []
- id: cursor_right
  label: Right
  kind: action
  command: "&CRS:RT*"
  params: []

# --- Volume (VOL) ---
- id: volume_up
  label: Volume +
  kind: action
  command: "&VOL:UP*"
  params: []
- id: volume_down
  label: Volume -
  kind: action
  command: "&VOL:DN*"
  params: []
- id: volume_query
  label: Get Volume Level
  kind: query
  command: "&VOL?***"
  params: []

# --- Mute (MUT) ---
- id: mute_toggle
  label: Mute Toggle
  kind: action
  command: "&MUT:TOG"
  params: []
- id: mute_on
  label: Mute On
  kind: action
  command: "&MUT:ON*"
  params: []
- id: mute_off
  label: Mute Off
  kind: action
  command: "&MUT:OFF"
  params: []
- id: mute_status_query
  label: Get Mute Status
  kind: query
  command: "&MUT?***"
  params: []

# --- Media function (FNC) ---
- id: func_play
  label: Play
  kind: action
  command: "&FNC:PLY"
  params: []
- id: func_pause
  label: Pause
  kind: action
  command: "&FNC:PSE"
  params: []
- id: func_stop
  label: Stop
  kind: action
  command: "&FNC:STP"
  params: []
- id: func_skip_forward
  label: Skip Forward / Chapter +
  kind: action
  command: "&FNC:NXT"
  params: []
- id: func_skip_backward
  label: Skip Backward / Chapter -
  kind: action
  command: "&FNC:PRV"
  params: []
- id: func_fast_forward
  label: Fast Forward
  kind: action
  command: "&FNC:FWD"
  params: []
- id: func_fast_backward
  label: Fast Backward
  kind: action
  command: "&FNC:RWD"
  params: []

# --- Exit (EXT) ---
- id: exit
  label: Exit
  kind: action
  command: "&EXT:***"
  params: []

# --- OSD access (OSA) ---
- id: osd_access_on
  label: OSD Access On
  kind: action
  command: "&OSA:ON*"
  params: []
- id: osd_access_off
  label: OSD Access Off
  kind: action
  command: "&OSA:OFF"
  params: []
- id: osd_access_query
  label: Get OSD Access Status
  kind: query
  command: "&OSA?***"
  params: []

# --- OSD menu (OSD) ---
- id: osd_toggle
  label: OSD Toggle (Open/Close)
  kind: action
  command: "&OSD:TOG"
  params: []
- id: osd_on
  label: OSD On (Open)
  kind: action
  command: "&OSD:ON*"
  params: []
- id: osd_off
  label: OSD Off (Close)
  kind: action
  command: "&OSD:OFF"
  params: []
- id: osd_status_query
  label: Get OSD Status
  kind: query
  command: "&OSD?***"
  params: []

# --- Input source (SRC) ---
- id: input_hdmi_1
  label: Input HDMI 1
  kind: action
  command: "&SRC:HD1"
  params: []
- id: input_hdmi_2
  label: Input HDMI 2
  kind: action
  command: "&SRC:HD2"
  params: []
- id: input_hdmi_3
  label: Input HDMI 3
  kind: action
  command: "&SRC:HD3"
  params: []
- id: input_component
  label: Input Component
  kind: action
  command: "&SRC:RGB"
  params: []
- id: input_usb_dmp
  label: Input USB / DMP
  kind: action
  command: "&SRC:USB"
  params: []
- id: input_status_query
  label: Get Input Status
  kind: query
  command: "&SRC?***"
  params: []

# --- Aspect ratio (ASP) ---
- id: aspect_16_9
  label: "Aspect 16:9"
  kind: action
  command: "&ASP:169"
  params: []
- id: aspect_4_3
  label: "Aspect 4:3"
  kind: action
  command: "&ASP:043"
  params: []
- id: aspect_zoom_1
  label: Zoom 1
  kind: action
  command: "&ASP:ZM1"
  params: []
- id: aspect_zoom_2
  label: Zoom 2
  kind: action
  command: "&ASP:ZM2"
  params: []
- id: aspect_status_query
  label: Get Aspect Status
  kind: query
  command: "&ASP?***"
  params: []

# --- Picture mode / color temperature (PCT) ---
- id: picture_mode_standard
  label: Picture Mode Standard
  kind: action
  command: "&PCT:STD"
  params: []
- id: picture_mode_user
  label: Picture Mode User
  kind: action
  command: "&PCT:USR"
  params: []
- id: picture_mode_dynamic
  label: Picture Mode Dynamic
  kind: action
  command: "&PCT:DYN"
  params: []
- id: picture_mode_mild
  label: Picture Mode Mild
  kind: action
  command: "&PCT:MLD"
  params: []
- id: picture_temp_cool
  label: Picture Temperature Cool
  kind: action
  command: "&PCT:COL"
  params: []
- id: picture_temp_medium
  label: Picture Temperature Medium
  kind: action
  command: "&PCT:MED"
  params: []
- id: picture_temp_warm
  label: Picture Temperature Warm
  kind: action
  command: "&PCT:WRM"
  params: []

# --- Brightness (BRT) ---
- id: brightness_up
  label: Brightness +
  kind: action
  command: "&BRT:UP*"
  params: []
- id: brightness_down
  label: Brightness -
  kind: action
  command: "&BRT:DN*"
  params: []
- id: brightness_query
  label: Get Brightness Level
  kind: query
  command: "&BRT?***"
  params: []

# --- Contrast (CON) ---
- id: contrast_up
  label: Contrast +
  kind: action
  command: "&CON:UP*"
  params: []
- id: contrast_down
  label: Contrast -
  kind: action
  command: "&CON:DN*"
  params: []
- id: contrast_query
  label: Get Contrast Level
  kind: query
  command: "&CON?***"
  params: []

# --- Saturation (STR) ---
- id: saturation_up
  label: Saturation +
  kind: action
  command: "&STR:UP*"
  params: []
- id: saturation_down
  label: Saturation -
  kind: action
  command: "&STR:DN*"
  params: []
- id: saturation_query
  label: Get Saturation Level
  kind: query
  command: "&STR?***"
  params: []

# --- Sharpness (SRP) ---
- id: sharpness_up
  label: Sharpness +
  kind: action
  command: "&SRP:UP*"
  params: []
- id: sharpness_down
  label: Sharpness -
  kind: action
  command: "&SRP:DN*"
  params: []
- id: sharpness_query
  label: Get Sharpness Level
  kind: query
  command: "&SRP?***"
  params: []

# --- Backlight (BLT) ---
- id: backlight_up
  label: Backlight +
  kind: action
  command: "&BLT:UP*"
  params: []
- id: backlight_down
  label: Backlight -
  kind: action
  command: "&BLT:DN*"
  params: []
- id: backlight_query
  label: Get Backlight Level
  kind: query
  command: "&BLT?***"
  params: []

# --- Audio mode (AUD) ---
- id: audio_mode_standard
  label: Audio Mode Standard
  kind: action
  command: "&AUD:STD"
  params: []
- id: audio_mode_user
  label: Audio Mode User
  kind: action
  command: "&AUD:USR"
  params: []
- id: audio_mode_music
  label: Audio Mode Music
  kind: action
  command: "&AUD:MUS"
  params: []
- id: audio_mode_movie
  label: Audio Mode Movie
  kind: action
  command: "&AUD:MOV"
  params: []
- id: audio_mode_sports
  label: Audio Mode Sports
  kind: action
  command: "&AUD:SPR"
  params: []

# --- Bass (BAS) ---
- id: bass_up
  label: Bass +
  kind: action
  command: "&BAS:UP*"
  params: []
- id: bass_down
  label: Bass -
  kind: action
  command: "&BAS:DN*"
  params: []
- id: bass_query
  label: Get Bass Level
  kind: query
  command: "&BAS?***"
  params: []

# --- Treble (TRB) ---
- id: treble_up
  label: Treble +
  kind: action
  command: "&TRB:UP*"
  params: []
- id: treble_down
  label: Treble -
  kind: action
  command: "&TRB:DN*"
  params: []
- id: treble_query
  label: Get Treble Level
  kind: query
  command: "&TRB?***"
  params: []

# --- Balance (BAL) ---
- id: balance_left
  label: Balance Left
  kind: action
  command: "&BAL:LT*"
  params: []
- id: balance_right
  label: Balance Right
  kind: action
  command: "&BAL:RT*"
  params: []
- id: balance_query
  label: Get Balance Level  # source table labels this row 'Get bass level'; likely source typo, BAL is the balance command
  description: "Source table labels this command 'Get bass level' (likely a typo: identifier BAL is Balance, the BAL set commands are 'Balance left/right', and the ack is %BAL:XXX in range -50 to +50; bass query is &BAS?***)."
  kind: query
  command: "&BAL?***"
  params: []

# --- Boot volume (BVL) ---
- id: boot_volume_up
  label: Boot Volume Level +
  kind: action
  command: "&BVL:UP*"
  params: []
- id: boot_volume_down
  label: Boot Volume Level -
  kind: action
  command: "&BVL:DN*"
  params: []
- id: boot_volume_query
  label: Get Boot Volume Level
  kind: query
  command: "&BVL?***"
  params: []

# --- RS-232 acknowledgement enable (ECO) ---
- id: echo_on
  label: Set RS-232 Echo On
  kind: action
  command: "&ECO:ON*"
  params: []
- id: echo_off
  label: Set RS-232 Echo Off
  kind: action
  command: "&ECO:OFF"
  params: []
```

## Feedbacks
```yaml
# Successful acknowledgements begin with '%' and end with CR (0x0D).
# Acknowledgement is enabled by default and controlled by ECO commands.
- id: command_acknowledgement
  type: frame
  header: "%"
  terminator: "0x0D"
  length_bytes: 9
  description: "Identifier and value reflect acknowledged command or resulting value."

- id: power_state
  type: enum
  values: ["ON*", "OFF"]
  response_template: "%PWR:{value}"
  on_query: power_status_query
- id: boot_mode
  type: enum
  values: ["ON*", "SBY", "LST"]
  response_template: "%BOT:{value}"
  on_query: boot_status_query
- id: signal_loss_mode
  type: enum
  values: ["05s", "10s", "30s", "01m", "02m", "OFF"]
  response_template: "%SLS:{value}"
  on_query: signal_loss_query
- id: sleep_timer_state
  type: enum
  values: ["015", "030", "045", "060", "090", "120", "OFF"]
  response_template: "%SLP:{value}"
  on_query: sleep_status_query
- id: volume_level
  type: integer
  range: [0, 100]
  format: "%03d"
  response_template: "%VOL:{value}"
  on_query: volume_query
- id: mute_state
  type: enum
  values: ["ON*", "OFF"]
  response_template: "%MUT:{value}"
  on_query: mute_status_query
- id: osd_access_state
  type: enum
  values: ["ON*", "OFF"]
  response_template: "%OSA:{value}"
  on_query: osd_access_query
- id: osd_state
  type: enum
  values: ["ON*", "OFF"]
  response_template: "%OSD:{value}"
  on_query: osd_status_query
- id: input_source
  type: enum
  values: ["HD1", "HD2", "HD3", "RGB", "USB"]
  response_template: "%SRC:{value}"
  on_query: input_status_query
- id: aspect_mode
  type: enum
  values: ["169", "043", "ZM1", "ZM2"]
  response_template: "%ASP:{value}"
  on_query: aspect_status_query
- id: brightness_level
  type: integer
  range: [0, 100]
  format: "%03d"
  response_template: "%BRT:{value}"
  on_query: brightness_query
- id: contrast_level
  type: integer
  range: [0, 100]
  format: "%03d"
  response_template: "%CON:{value}"
  on_query: contrast_query
- id: saturation_level
  type: integer
  range: [0, 100]
  format: "%03d"
  response_template: "%STR:{value}"
  on_query: saturation_query
- id: sharpness_level
  type: integer
  range: [0, 100]
  format: "%03d"
  response_template: "%SRP:{value}"
  on_query: sharpness_query
- id: backlight_level
  type: integer
  range: [0, 100]
  format: "%03d"
  response_template: "%BLT:{value}"
  on_query: backlight_query
- id: bass_level
  type: integer
  range: [0, 100]
  format: "%03d"
  response_template: "%BAS:{value}"
  on_query: bass_query
- id: treble_level
  type: integer
  range: [0, 100]
  format: "%03d"
  response_template: "%TRB:{value}"
  on_query: treble_query
- id: balance_level
  type: integer
  range: [-50, 50]
  response_template: "%BAL:{value}"
  on_query: balance_query
- id: boot_volume_level
  type: integer
  range: [0, 100]
  format: "%03d"
  response_template: "%BVL:{value}"
  on_query: boot_volume_query
```

## Variables
```yaml
# Source documents relative level adjustment only; no absolute-value set syntax.
# UNRESOLVED: no direct absolute-level write syntax stated in source.
```

## Events
```yaml
- id: error_message
  description: "Returned instead of normal '%' acknowledgement when command is invalid or unavailable. Frame begins with '!' and ends with CR."
  codes:
    "!ERR:001":
      meaning: "Access denied"
      description: "Command disabled by unit settings"
    "!ERR:002":
      meaning: "Not available"
      description: "Command currently not available"
    "!ERR:003":
      meaning: "Not implemented"
      description: "Command not implemented in this model"
    "!ERR:004":
      meaning: "Value out of range"
      description: "Supplied value is outside accepted range"
```

## Macros
```yaml
# UNRESOLVED: source documents no named multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source states no safety warnings, interlocks, or damage-prevention sequences.
```

## Notes
- Command frame: `&` header, three-byte case-sensitive identifier, optional `:` or `?` separator, optional three-byte value, and CR (`0x0D`).
- Command and acknowledgement frames are always nine bytes including CR. Spaces are prohibited.
- Values shorter than three bytes are right-padded with `*`.
- Successful acknowledgement uses `%` header. Invalid or unavailable command response uses `!` header.
- Wait 10 seconds after power-on before sending next command.
- Wait for response before sending next command.
- Wait at least 2 seconds before resending when no response arrives.
- Wait at least 500 ms between commands.
- Wait at least 5 seconds after sending 20 commands.
- Default baud rate is 38400. Baud rate is selectable through OSD service menu from 9600, 19200, and 38400.
- `&EXT:***` contains three literal asterisks.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: DFU model variants beyond CS-101 not enumerated in source. -->
<!-- UNRESOLVED: no absolute-level write syntax documented. -->

## Provenance

```yaml
source_domains:
  - ad-notam.com
source_urls:
  - https://www.ad-notam.com/download/RS232/ad_notam_RS232_protocol_DFU.pdf
retrieved_at: 2026-08-09T16:55:07.626Z
last_checked_at: 2026-10-01T06:45:24.265Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-01T06:45:24.265Z
matched_actions: 112
action_count: 112
confidence: medium
summary: "All 112 spec actions match source command table literally; transport values supported and the source catalogue is fully covered. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware compatibility and DFU model variants beyond CS-101 are not stated in source."
- "no direct absolute-level write syntax stated in source."
- "source documents no named multi-step sequences."
- "source states no safety warnings, interlocks, or damage-prevention sequences."
- "firmware version compatibility not stated in source."
- "DFU model variants beyond CS-101 not enumerated in source."
- "no absolute-level write syntax documented."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
