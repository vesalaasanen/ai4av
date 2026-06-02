---
spec_id: admin/ad-notam-dtv
schema_version: ai4av-public-spec-v1
revision: 1
title: "Ad Notam DTV (DFU) RS-232 Control Spec"
manufacturer: "Ad Notam"
model_family: "Display Frame Unit (DFU)"
aliases: []
compatible_with:
  manufacturers:
    - "Ad Notam"
  models:
    - "Display Frame Unit (DFU)"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - cdn.shopify.com
source_urls:
  - "https://cdn.shopify.com/s/files/1/0793/9768/3467/files/TD_DFU_RS232-Protocol_v5.2_ASCII_Format_20200504.pdf?v=1741266010"
retrieved_at: 2026-04-29T21:04:16.985Z
last_checked_at: 2026-06-02T21:39:36.608Z
generated_at: 2026-06-02T21:39:36.608Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware compatibility range not stated in source"
  - "source defines no continuous settable parameters beyond command-encoded"
  - "no multi-step sequences defined in source."
  - "no explicit safety warnings, interlocks, or power-on sequencing"
  - "Zoom 3 commands and Z3P position commands apply only to 24VDC DFU models; source marks these as model-dependent."
verification:
  verdict: verified
  checked_at: 2026-06-02T21:39:36.608Z
  matched_actions: 161
  action_count: 161
  confidence: medium
  summary: "All 161 spec actions match literally in source command table; transport parameters verified; complete bidirectional coverage. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Ad Notam DTV (DFU) RS-232 Control Spec

## Summary
RS-232 ASCII protocol for Ad Notam Display Frame Unit (DFU). 9-byte framed commands: `&` header + 3-byte identifier + 1-byte separator + 3-byte value + `<CR>`. DFU acks with `%` header same shape; errors with `!ERR:NNN`. Crossed DB9 cable, 8N1. IR remote activity on the DFU emits matching ACK frames on the RS-232 bus.

<!-- UNRESOLVED: firmware compatibility range not stated in source -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 38400  # default; source also states 9600 and 19200 are configurable from OSD service menu
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
- id: power_toggle
  label: Power Toggle
  kind: action
  command: "&PWR:TOG\r"
  params: []

- id: power_on
  label: Power ON
  kind: action
  command: "&PWR:ON*\r"
  params: []

- id: power_off
  label: Power OFF
  kind: action
  command: "&PWR:OFF\r"
  params: []

- id: power_status_query
  label: Get Power Status
  kind: query
  command: "&PWR?***\r"
  params: []

- id: boot_on
  label: Boot set to ON
  kind: action
  command: "&BOT:ON*\r"
  params: []

- id: boot_standby
  label: Boot set to Standby
  kind: action
  command: "&BOT:SBY\r"
  params: []

- id: boot_last
  label: Boot set to Last
  kind: action
  command: "&BOT:LST\r"
  params: []

- id: boot_instant
  label: Boot set to Instant
  kind: action
  command: "&BOT:INS\r"
  params: []

- id: boot_status_query
  label: Get Boot Setup
  kind: query
  command: "&BOT?***\r"
  params: []

- id: signal_loss_5s
  label: Signal Loss 5 Sec
  kind: action
  command: "&SLS:05s\r"
  params: []

- id: signal_loss_10s
  label: Signal Loss 10 Sec
  kind: action
  command: "&SLS:10s\r"
  params: []

- id: signal_loss_30s
  label: Signal Loss 30 Sec
  kind: action
  command: "&SLS:30s\r"
  params: []

- id: signal_loss_1min
  label: Signal Loss 1 min
  kind: action
  command: "&SLS:001\r"
  params: []

- id: signal_loss_2min
  label: Signal Loss 2 min
  kind: action
  command: "&SLS:002\r"
  params: []

- id: signal_loss_off
  label: Signal Loss OFF
  kind: action
  command: "&SLS:OFF\r"
  params: []

- id: signal_loss_status_query
  label: Get Signal Loss Setup
  kind: query
  command: "&SLS?***\r"
  params: []

- id: sleep_15
  label: Sleep Timer 15 min
  kind: action
  command: "&SLP:015\r"
  params: []

- id: sleep_30
  label: Sleep Timer 30 min
  kind: action
  command: "&SLP:030\r"
  params: []

- id: sleep_45
  label: Sleep Timer 45 min
  kind: action
  command: "&SLP:045\r"
  params: []

- id: sleep_60
  label: Sleep Timer 60 min
  kind: action
  command: "&SLP:060\r"
  params: []

- id: sleep_90
  label: Sleep Timer 90 min
  kind: action
  command: "&SLP:090\r"
  params: []

- id: sleep_120
  label: Sleep Timer 120 min
  kind: action
  command: "&SLP:120\r"
  params: []

- id: sleep_off
  label: Sleep Timer OFF
  kind: action
  command: "&SLP:OFF\r"
  params: []

- id: sleep_status_query
  label: Get Sleep Timer Status
  kind: query
  command: "&SLP?***\r"
  params: []

- id: digit_1
  label: Digit 1
  kind: action
  command: "&NUM:001\r"
  params: []

- id: digit_2
  label: Digit 2
  kind: action
  command: "&NUM:002\r"
  params: []

- id: digit_3
  label: Digit 3
  kind: action
  command: "&NUM:003\r"
  params: []

- id: digit_4
  label: Digit 4
  kind: action
  command: "&NUM:004\r"
  params: []

- id: digit_5
  label: Digit 5
  kind: action
  command: "&NUM:005\r"
  params: []

- id: digit_6
  label: Digit 6
  kind: action
  command: "&NUM:006\r"
  params: []

- id: digit_7
  label: Digit 7
  kind: action
  command: "&NUM:007\r"
  params: []

- id: digit_8
  label: Digit 8
  kind: action
  command: "&NUM:008\r"
  params: []

- id: digit_9
  label: Digit 9
  kind: action
  command: "&NUM:009\r"
  params: []

- id: digit_0
  label: Digit 0
  kind: action
  command: "&NUM:000\r"
  params: []

- id: key_text
  label: TEXT
  kind: action
  command: "&KEY:TXT\r"
  params: []

- id: key_epg
  label: EPG
  kind: action
  command: "&KEY:EPG\r"
  params: []

- id: key_tvr
  label: TV/R
  kind: action
  command: "&KEY:TVR\r"
  params: []

- id: key_menu
  label: MENU
  kind: action
  command: "&KEY:MNU\r"
  params: []

- id: key_goto
  label: GOTO
  kind: action
  command: "&KEY:GTO\r"
  params: []

- id: key_fav
  label: FAV
  kind: action
  command: "&KEY:FAV\r"
  params: []

- id: key_back
  label: BACK
  kind: action
  command: "&KEY:BCK\r"
  params: []

- id: key_info
  label: INFO
  kind: action
  command: "&KEY:NFO\r"
  params: []

- id: cursor_ok
  label: OK
  kind: action
  command: "&CRS:OK*\r"
  params: []

- id: cursor_up
  label: UP
  kind: action
  command: "&CRS:UP*\r"
  params: []

- id: cursor_down
  label: DOWN
  kind: action
  command: "&CRS:DN*\r"
  params: []

- id: cursor_left
  label: LEFT
  kind: action
  command: "&CRS:LT*\r"
  params: []

- id: cursor_right
  label: RIGHT
  kind: action
  command: "&CRS:RT*\r"
  params: []

- id: color_red
  label: RED
  kind: action
  command: "&CLR:RED\r"
  params: []

- id: color_green
  label: GREEN
  kind: action
  command: "&CLR:GRN\r"
  params: []

- id: color_blue
  label: BLUE
  kind: action
  command: "&CLR:BLU\r"
  params: []

- id: color_yellow
  label: YELLOW
  kind: action
  command: "&CLR:YLO\r"
  params: []

- id: volume_up
  label: Volume +
  kind: action
  command: "&VOL:UP*\r"
  params: []

- id: volume_down
  label: Volume -
  kind: action
  command: "&VOL:DN*\r"
  params: []

- id: volume_set
  label: Set Volume Level
  kind: action
  command: "&VOL:{level}\r"
  params:
    - name: level
      type: integer
      description: Volume level 000-100

- id: volume_status_query
  label: Get Volume Level
  kind: query
  command: "&VOL?***\r"
  params: []

- id: volume_limit
  label: Set Volume Limit
  kind: action
  command: "&VLM:{level}\r"
  params:
    - name: level
      type: integer
      description: Volume limit 000-100

- id: mute_toggle
  label: Mute Toggle
  kind: action
  command: "&MUT:TOG\r"
  params: []

- id: mute_on
  label: Mute On
  kind: action
  command: "&MUT:ON*\r"
  params: []

- id: mute_off
  label: Mute Off
  kind: action
  command: "&MUT:OFF\r"
  params: []

- id: mute_status_query
  label: Get Mute Status
  kind: query
  command: "&MUT?***\r"
  params: []

- id: channel_up
  label: CH+
  kind: action
  command: "&CHN:UP*\r"
  params: []

- id: channel_down
  label: CH-
  kind: action
  command: "&CHN:DN*\r"
  params: []

- id: function_play
  label: PLAY
  kind: action
  command: "&FNC:PLY\r"
  params: []

- id: function_pause
  label: PAUSE
  kind: action
  command: "&FNC:PSE\r"
  params: []

- id: function_stop
  label: STOP
  kind: action
  command: "&FNC:STP\r"
  params: []

- id: function_record
  label: RECORD
  kind: action
  command: "&FNC:RCD\r"
  params: []

- id: function_skip_next
  label: SKIP NEXT
  kind: action
  command: "&FNC:NXT\r"
  params: []

- id: function_skip_back
  label: SKIP BACK
  kind: action
  command: "&FNC:PRV\r"
  params: []

- id: function_fast_forward
  label: Fast Forward
  kind: action
  command: "&FNC:FWD\r"
  params: []

- id: function_fast_rewind
  label: Fast Rewind
  kind: action
  command: "&FNC:RWD\r"
  params: []

- id: exit
  label: EXIT
  kind: action
  command: "&EXT:***\r"
  params: []

- id: osd_access_on
  label: OSD Access ON
  kind: action
  command: "&OSA:ON*\r"
  params: []

- id: osd_access_off
  label: OSD Access OFF
  kind: action
  command: "&OSA:OFF\r"
  params: []

- id: osd_access_status_query
  label: Get OSD Access Status
  kind: query
  command: "&OSA?***\r"
  params: []

- id: osd_toggle
  label: SETUP (open/close)
  kind: action
  command: "&OSD:TOG\r"
  params: []

- id: osd_on
  label: OSD ON (open)
  kind: action
  command: "&OSD:ON*\r"
  params: []

- id: osd_off
  label: OSD OFF (close)
  kind: action
  command: "&OSD:OFF\r"
  params: []

- id: osd_status_query
  label: Get OSD Status
  kind: query
  command: "&OSD?***\r"
  params: []

- id: input_hdmi1
  label: Input HDMI 1
  kind: action
  command: "&SRC:HD1\r"
  params: []

- id: input_hdmi2
  label: Input HDMI 2
  kind: action
  command: "&SRC:HD2\r"
  params: []

- id: input_hdmi3
  label: Input HDMI 3
  kind: action
  command: "&SRC:HD3\r"
  params: []

- id: input_component
  label: Input Component
  kind: action
  command: "&SRC:RGB\r"
  params: []

- id: input_usb
  label: Input USB / DMP
  kind: action
  command: "&SRC:USB\r"
  params: []

- id: input_vga
  label: Input VGA
  kind: action
  command: "&SRC:VGA\r"
  params: []

- id: input_status_query
  label: Get Input Status
  kind: query
  command: "&SRC?***\r"
  params: []

- id: vga_auto_adjust
  label: VGA Auto Adjust
  kind: action
  command: "&VGA:ADJ\r"
  params: []

- id: dc5_off
  label: 5VDC Out OFF
  kind: action
  command: "&05V:OFF\r"
  params: []

- id: dc5_follow_dfu
  label: 5VDC Out Follow DFU
  kind: action
  command: "&05V:DFU\r"
  params: []

- id: dc5_on
  label: 5VDC Out Always ON
  kind: action
  command: "&05V:ON*\r"
  params: []

- id: dc5_status_query
  label: Get 5VDC Out Status
  kind: query
  command: "&05V?***\r"
  params: []

- id: dc12_off
  label: 12VDC Out OFF
  kind: action
  command: "&12V:OFF\r"
  params: []

- id: dc12_follow_dfu
  label: 12VDC Out Follow DFU
  kind: action
  command: "&12V:DFU\r"
  params: []

- id: dc12_on
  label: 12VDC Out Always ON
  kind: action
  command: "&12V:ON*\r"
  params: []

- id: dc12_status_query
  label: Get 12VDC Out Status
  kind: query
  command: "&12V?***\r"
  params: []

- id: aspect_169
  label: Aspect 16:9
  kind: action
  command: "&ASP:169\r"
  params: []

- id: aspect_43
  label: Aspect 4:3
  kind: action
  command: "&ASP:043\r"
  params: []

- id: zoom_1
  label: Zoom 1
  kind: action
  command: "&ASP:ZM1\r"
  params: []

- id: zoom_2
  label: Zoom 2
  kind: action
  command: "&ASP:ZM2\r"
  params: []

- id: zoom_3
  label: Zoom 3 (24VDC models only)
  kind: action
  command: "&ASP:ZM3\r"
  params: []

- id: aspect_status_query
  label: Get Aspect Status
  kind: query
  command: "&ASP?***\r"
  params: []

- id: zoom3_topleft
  label: Zoom 3 position Top Left (24VDC models only)
  kind: action
  command: "&Z3P:TLF\r"
  params: []

- id: zoom3_topright
  label: Zoom 3 position Top Right (24VDC models only)
  kind: action
  command: "&Z3P:TRT\r"
  params: []

- id: zoom3_bottomleft
  label: Zoom 3 position Bottom Left (24VDC models only)
  kind: action
  command: "&Z3P:BLF\r"
  params: []

- id: zoom3_bottomright
  label: Zoom 3 position Bottom Right (24VDC models only)
  kind: action
  command: "&Z3P:BRT\r"
  params: []

- id: zoom3_position_query
  label: Get Zoom 3 position (24VDC models only)
  kind: query
  command: "&Z3P?***\r"
  params: []

- id: picture_mode_standard
  label: Picture Mode Standard
  kind: action
  command: "&PCT:STD\r"
  params: []

- id: picture_mode_user
  label: Picture Mode User
  kind: action
  command: "&PCT:USR\r"
  params: []

- id: picture_mode_dynamic
  label: Picture Mode Dynamic
  kind: action
  command: "&PCT:DYN\r"
  params: []

- id: picture_mode_mild
  label: Picture Mode Mild
  kind: action
  command: "&PCT:MLD\r"
  params: []

- id: picture_temp_cool
  label: Picture Temp Cool
  kind: action
  command: "&PCT:COL\r"
  params: []

- id: picture_temp_medium
  label: Picture Temp Medium
  kind: action
  command: "&PCT:MED\r"
  params: []

- id: picture_temp_warm
  label: Picture Temp Warm
  kind: action
  command: "&PCT:WRM\r"
  params: []

- id: picture_mute_on
  label: Picture Mute On (backlight off)
  kind: action
  command: "&PCT:MUT\r"
  params: []

- id: picture_mute_off
  label: Picture Mute Off (backlight on)
  kind: action
  command: "&PCT:UMT\r"
  params: []

- id: brightness_up
  label: Brightness +
  kind: action
  command: "&BRT:UP*\r"
  params: []

- id: brightness_down
  label: Brightness -
  kind: action
  command: "&BRT:DN*\r"
  params: []

- id: brightness_set
  label: Set Brightness Level
  kind: action
  command: "&BRT:{level}\r"
  params:
    - name: level
      type: integer
      description: Brightness 000-100

- id: brightness_query
  label: Get Brightness Level
  kind: query
  command: "&BRT?***\r"
  params: []

- id: contrast_up
  label: Contrast +
  kind: action
  command: "&CON:UP*\r"
  params: []

- id: contrast_down
  label: Contrast -
  kind: action
  command: "&CON:DN*\r"
  params: []

- id: contrast_set
  label: Set Contrast Level
  kind: action
  command: "&CON:{level}\r"
  params:
    - name: level
      type: integer
      description: Contrast 000-100

- id: contrast_query
  label: Get Contrast Level
  kind: query
  command: "&CON?***\r"
  params: []

- id: saturation_up
  label: Saturation +
  kind: action
  command: "&STR:UP*\r"
  params: []

- id: saturation_down
  label: Saturation -
  kind: action
  command: "&STR:DN*\r"
  params: []

- id: saturation_set
  label: Set Saturation Level
  kind: action
  command: "&STR:{level}\r"
  params:
    - name: level
      type: integer
      description: Saturation 000-100

- id: saturation_query
  label: Get Saturation Level
  kind: query
  command: "&STR?***\r"
  params: []

- id: sharpness_up
  label: Sharpness +
  kind: action
  command: "&SRP:UP*\r"
  params: []

- id: sharpness_down
  label: Sharpness -
  kind: action
  command: "&SRP:DN*\r"
  params: []

- id: sharpness_set
  label: Set Sharpness Level
  kind: action
  command: "&SRP:{level}\r"
  params:
    - name: level
      type: integer
      description: Sharpness 000-100

- id: sharpness_query
  label: Get Sharpness Level
  kind: query
  command: "&SRP?***\r"
  params: []

- id: backlight_up
  label: Backlight +
  kind: action
  command: "&BLT:UP*\r"
  params: []

- id: backlight_down
  label: Backlight -
  kind: action
  command: "&BLT:DN*\r"
  params: []

- id: backlight_set
  label: Set Backlight Level
  kind: action
  command: "&BLT:{level}\r"
  params:
    - name: level
      type: integer
      description: Backlight 020-100

- id: backlight_query
  label: Get Backlight Level
  kind: query
  command: "&BLT?***\r"
  params: []

- id: audio_mode_standard
  label: Audio Mode Standard
  kind: action
  command: "&AUD:STD\r"
  params: []

- id: audio_mode_music
  label: Audio Mode Music
  kind: action
  command: "&AUD:MUS\r"
  params: []

- id: audio_mode_movie
  label: Audio Mode Movie
  kind: action
  command: "&AUD:MOV\r"
  params: []

- id: audio_mode_sports
  label: Audio Mode Sports
  kind: action
  command: "&AUD:SPR\r"
  params: []

- id: audio_mode_user
  label: Audio Mode User
  kind: action
  command: "&AUD:USR\r"
  params: []

- id: bass_up
  label: Bass +
  kind: action
  command: "&BAS:UP*\r"
  params: []

- id: bass_down
  label: Bass -
  kind: action
  command: "&BAS:DN*\r"
  params: []

- id: bass_set
  label: Set Bass Level
  kind: action
  command: "&BAS:{level}\r"
  params:
    - name: level
      type: integer
      description: Bass 000-100

- id: bass_query
  label: Get Bass Level
  kind: query
  command: "&BAS?***\r"
  params: []

- id: treble_up
  label: Treble +
  kind: action
  command: "&TRB:UP*\r"
  params: []

- id: treble_down
  label: Treble -
  kind: action
  command: "&TRB:DN*\r"
  params: []

- id: treble_set
  label: Set Treble Level
  kind: action
  command: "&TRB:{level}\r"
  params:
    - name: level
      type: integer
      description: Treble 000-100

- id: treble_query
  label: Get Treble Level
  kind: query
  command: "&TRB?***\r"
  params: []

- id: balance_left
  label: Balance Left
  kind: action
  command: "&BAL:LT*\r"
  params: []

- id: balance_right
  label: Balance Right
  kind: action
  command: "&BAL:RT*\r"
  params: []

- id: balance_set
  label: Set Balance Level
  kind: action
  command: "&BAL:{level}\r"
  params:
    - name: level
      type: integer
      description: Balance -50 to +50

- id: balance_query
  label: Get Balance Level
  kind: query
  command: "&BAL?***\r"
  params: []

- id: boot_volume_last
  label: Boot Volume Last
  kind: action
  command: "&BVL:LST\r"
  params: []

- id: boot_volume_user
  label: Boot Volume User
  kind: action
  command: "&BVL:USR\r"
  params: []

- id: boot_volume_up
  label: Boot Volume Level +
  kind: action
  command: "&BVL:UP*\r"
  params: []

- id: boot_volume_down
  label: Boot Volume Level -
  kind: action
  command: "&BVL:DN*\r"
  params: []

- id: boot_volume_set
  label: Set Boot Volume Level
  kind: action
  command: "&BVL:{level}\r"
  params:
    - name: level
      type: integer
      description: Boot volume 000-100

- id: boot_volume_query
  label: Get Boot Volume Level
  kind: query
  command: "&BVL?***\r"
  params: []

- id: logo_show
  label: Show Logo
  kind: action
  command: "&LGO:ON*\r"
  params: []

- id: logo_hide
  label: Hide Logo
  kind: action
  command: "&LGO:OFF\r"
  params: []

- id: echo_on
  label: Set RS232 Echo ON
  kind: action
  command: "&ECO:ON*\r"
  params: []

- id: echo_off
  label: Set RS232 Echo OFF
  kind: action
  command: "&ECO:OFF\r"
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, off]

- id: boot_state
  type: enum
  values: [on, standby, last, instant]

- id: signal_loss_state
  type: enum
  values: ["5s", "10s", "30s", "1min", "2min", off]

- id: sleep_state
  type: enum
  values: ["15min", "30min", "45min", "60min", "90min", "120min", off]

- id: volume_level
  type: integer
  range: [0, 100]

- id: volume_limit_level
  type: integer
  range: [0, 100]

- id: mute_state
  type: enum
  values: [on, off]

- id: input_state
  type: enum
  values: [component, hdmi1, hdmi2, hdmi3, usb, vga]

- id: osd_access_state
  type: enum
  values: [on, off]

- id: osd_state
  type: enum
  values: [on, off]

- id: dc5_state
  type: enum
  values: [off, follow_dfu, on]

- id: dc12_state
  type: enum
  values: [off, follow_dfu, on]

- id: aspect_state
  type: enum
  values: ["16:9", "4:3", "zoom1", "zoom2", "zoom3"]

- id: zoom3_position
  type: enum
  values: [top_left, top_right, bottom_left, bottom_right]

- id: brightness_level
  type: integer
  range: [0, 100]

- id: contrast_level
  type: integer
  range: [0, 100]

- id: saturation_level
  type: integer
  range: [0, 100]

- id: sharpness_level
  type: integer
  range: [0, 100]

- id: backlight_level
  type: integer
  range: [20, 100]

- id: bass_level
  type: integer
  range: [0, 100]

- id: treble_level
  type: integer
  range: [0, 100]

- id: balance_level
  type: integer
  range: [-50, 50]

- id: boot_volume_level
  type: integer
  range: [0, 100]

- id: error_code
  type: enum
  values: [access_denied, not_available, not_implemented, value_out_of_range]
  # Source: !ERR:001 access_denied; !ERR:002 not_available; !ERR:003 not_implemented; !ERR:004 value_out_of_range
```

## Variables
```yaml
# UNRESOLVED: source defines no continuous settable parameters beyond command-encoded
# numeric ranges (volume, brightness, etc.); these are exposed via set/query actions
# above rather than as standalone Variables.
```

## Events
```yaml
- id: ir_remote_ack
  description: >
    When DFU receives an IR remote command, it emits a matching RS-232 ACK
    frame (%XXX:YYY<CR>) on the bus, unsolicited from the controller's
    perspective. Same 9-byte ACK frame shape as command-driven acks. Only fires
    while echo is enabled (&ECO:ON*). Note: not all IR commands have an
    equivalent RS-232 command, but they still emit an ACK if mapped.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences defined in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety warnings, interlocks, or power-on sequencing
# requirements stated in source.
```

## Notes
Cable: crossed (null-modem) DB9 — pin2↔pin3, pin5↔pin5. DFU end is male DB9 (2=RXD, 3=TXD, 5=GND). Baud rate default 38400; 9600 and 19200 also supported (OSD service menu configurable, not via RS-232 command). Frame: 9 bytes incl. CR (0x0D). Value field <3 bytes padded with `*`. Acknowledgement is auto-sent by default; disable via `&ECO:OFF` / re-enable with `&ECO:ON*`. IR remote activity emits equivalent ACKs on the bus even when IR command not exposed via RS-232. Error responses use `!ERR:001` (access denied), `!ERR:002` (not available), `!ERR:003` (not implemented), `!ERR:004` (value out of range). Volume limit (`&VLM:XXX`) is set-only — source documents no `&VLM?***` query. Timing: wait 10s after power-on, ≥500ms between commands, ≥2s resend timeout, ≥5s pause after every 20 commands; wait-for-response between commands.

<!-- UNRESOLVED: Zoom 3 commands and Z3P position commands apply only to 24VDC DFU models; source marks these as model-dependent. -->

## Provenance

```yaml
source_domains:
  - cdn.shopify.com
source_urls:
  - "https://cdn.shopify.com/s/files/1/0793/9768/3467/files/TD_DFU_RS232-Protocol_v5.2_ASCII_Format_20200504.pdf?v=1741266010"
retrieved_at: 2026-04-29T21:04:16.985Z
last_checked_at: 2026-06-02T21:39:36.608Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T21:39:36.608Z
matched_actions: 161
action_count: 161
confidence: medium
summary: "All 161 spec actions match literally in source command table; transport parameters verified; complete bidirectional coverage. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware compatibility range not stated in source"
- "source defines no continuous settable parameters beyond command-encoded"
- "no multi-step sequences defined in source."
- "no explicit safety warnings, interlocks, or power-on sequencing"
- "Zoom 3 commands and Z3P position commands apply only to 24VDC DFU models; source marks these as model-dependent."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
