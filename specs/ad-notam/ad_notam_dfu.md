---
spec_id: admin/ad-notam-dfu
schema_version: ai4av-public-spec-v1
revision: 1
title: "ad notam DFU Control Spec"
manufacturer: "ad notam"
model_family: "Display Frame Unit (DFU)"
aliases: []
compatible_with:
  manufacturers:
    - "ad notam"
  models:
    - "Display Frame Unit (DFU)"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - cdn.shopify.com
  - applicationmarket.crestron.com
source_urls:
  - https://cdn.shopify.com/s/files/1/0793/9768/3467/files/TD_DFU_RS232-Protocol_v5.2_ASCII_Format_20200504.pdf
  - https://applicationmarket.crestron.com/ad-notam-dfu/
retrieved_at: 2026-04-29T20:56:19.246Z
last_checked_at: 2026-06-02T21:39:35.860Z
generated_at: 2026-06-02T21:39:35.860Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "which 5V/12V out, Z3P, and Zoom features are enabled on which DFU variants not fully specified"
  - "unit not stated; source expresses as 000-100 integer"
  - "source contains no safety warnings, interlock procedures, or power-on sequencing requirements beyond the timing constraints below."
  - "which model variants enable 5V/12V out, Zoom 3, and ASP:ZM3 not specified in source beyond the 24VDC Zoom 3 note"
verification:
  verdict: verified
  checked_at: 2026-06-02T21:39:35.860Z
  matched_actions: 161
  action_count: 161
  confidence: medium
  summary: "All 161 spec action commands match verbatim in source; transport parameters verified; spec represents full source command catalogue. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# ad notam DFU Control Spec

## Summary
ASCII-based RS-232 control protocol for the ad notam Display Frame Unit (DFU). Commands are 9-byte frames terminated by `<CR>` (0x0D) with optional acknowledgement responses.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: which 5V/12V out, Z3P, and Zoom features are enabled on which DFU variants not fully specified -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 38400  # default per source; configurable to 9600 or 19200 via OSD service menu
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable   # inferred from PWR commands
- routable    # inferred from SRC input select commands
- queryable   # inferred from `?` query commands
- levelable   # inferred from VOL/BRT/CON/STR/SRP/BLT/BAS/TRB/BAL level commands
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

- id: boot_set_on
  label: Boot set to ON
  kind: action
  command: "&BOT:ON*<CR>"
  params: []

- id: boot_set_standby
  label: Boot set to Standby
  kind: action
  command: "&BOT:SBY<CR>"
  params: []

- id: boot_set_last
  label: Boot set to Last
  kind: action
  command: "&BOT:LST<CR>"
  params: []

- id: boot_set_instant
  label: Boot set to Instant
  kind: action
  command: "&BOT:INS<CR>"
  params: []

- id: boot_status_query
  label: Get Boot Setup
  kind: query
  command: "&BOT?***<CR>"
  params: []

- id: signal_loss_5s
  label: Signal Loss 5s
  kind: action
  command: "&SLS:05s<CR>"
  params: []

- id: signal_loss_10s
  label: Signal Loss 10s
  kind: action
  command: "&SLS:10s<CR>"
  params: []

- id: signal_loss_30s
  label: Signal Loss 30s
  kind: action
  command: "&SLS:30s<CR>"
  params: []

- id: signal_loss_1min
  label: Signal Loss 1min
  kind: action
  command: "&SLS:001<CR>"
  params: []

- id: signal_loss_2min
  label: Signal Loss 2min
  kind: action
  command: "&SLS:002<CR>"
  params: []

- id: signal_loss_off
  label: Signal Loss OFF
  kind: action
  command: "&SLS:OFF<CR>"
  params: []

- id: signal_loss_query
  label: Get Signal Loss Setup
  kind: query
  command: "&SLS?***<CR>"
  params: []

- id: sleep_timer_15
  label: Sleep Timer 15min
  kind: action
  command: "&SLP:015<CR>"
  params: []

- id: sleep_timer_30
  label: Sleep Timer 30min
  kind: action
  command: "&SLP:030<CR>"
  params: []

- id: sleep_timer_45
  label: Sleep Timer 45min
  kind: action
  command: "&SLP:045<CR>"
  params: []

- id: sleep_timer_60
  label: Sleep Timer 60min
  kind: action
  command: "&SLP:060<CR>"
  params: []

- id: sleep_timer_90
  label: Sleep Timer 90min
  kind: action
  command: "&SLP:090<CR>"
  params: []

- id: sleep_timer_120
  label: Sleep Timer 120min
  kind: action
  command: "&SLP:120<CR>"
  params: []

- id: sleep_timer_off
  label: Sleep Timer OFF
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

- id: key_text
  label: TEXT
  kind: action
  command: "&KEY:TXT<CR>"
  params: []

- id: key_epg
  label: EPG
  kind: action
  command: "&KEY:EPG<CR>"
  params: []

- id: key_tvr
  label: TV/R
  kind: action
  command: "&KEY:TVR<CR>"
  params: []

- id: key_menu
  label: MENU
  kind: action
  command: "&KEY:MNU<CR>"
  params: []

- id: key_goto
  label: GOTO
  kind: action
  command: "&KEY:GTO<CR>"
  params: []

- id: key_fav
  label: FAV
  kind: action
  command: "&KEY:FAV<CR>"
  params: []

- id: key_back
  label: BACK
  kind: action
  command: "&KEY:BCK<CR>"
  params: []

- id: key_info
  label: INFO
  kind: action
  command: "&KEY:NFO<CR>"
  params: []

- id: cursor_ok
  label: OK
  kind: action
  command: "&CRS:OK*<CR>"
  params: []

- id: cursor_up
  label: UP
  kind: action
  command: "&CRS:UP*<CR>"
  params: []

- id: cursor_down
  label: DOWN
  kind: action
  command: "&CRS:DN*<CR>"
  params: []

- id: cursor_left
  label: LEFT
  kind: action
  command: "&CRS:LT*<CR>"
  params: []

- id: cursor_right
  label: RIGHT
  kind: action
  command: "&CRS:RT*<CR>"
  params: []

- id: color_red
  label: RED
  kind: action
  command: "&CLR:RED<CR>"
  params: []

- id: color_green
  label: GREEN
  kind: action
  command: "&CLR:GRN<CR>"
  params: []

- id: color_blue
  label: BLUE
  kind: action
  command: "&CLR:BLU<CR>"
  params: []

- id: color_yellow
  label: YELLOW
  kind: action
  command: "&CLR:YLO<CR>"
  params: []

- id: volume_up
  label: Volume Up
  kind: action
  command: "&VOL:UP*<CR>"
  params: []

- id: volume_down
  label: Volume Down
  kind: action
  command: "&VOL:DN*<CR>"
  params: []

- id: set_volume
  label: Set Volume Level
  kind: action
  command: "&VOL:{level}<CR>"
  params:
    - name: level
      type: integer
      description: Volume level, 000-100, right-padded with `*` to 3 bytes

- id: volume_query
  label: Get Volume Level
  kind: query
  command: "&VOL?***<CR>"
  params: []

- id: set_volume_limit
  label: Set Volume Limit
  kind: action
  command: "&VLM:{limit}<CR>"
  params:
    - name: limit
      type: integer
      description: Volume limit, 000-100

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

- id: mute_status_query
  label: Get Mute Status
  kind: query
  command: "&MUT?***<CR>"
  params: []

- id: channel_up
  label: CH+
  kind: action
  command: "&CHN:UP*<CR>"
  params: []

- id: channel_down
  label: CH-
  kind: action
  command: "&CHN:DN*<CR>"
  params: []

- id: function_play
  label: PLAY
  kind: action
  command: "&FNC:PLY<CR>"
  params: []

- id: function_pause
  label: PAUSE
  kind: action
  command: "&FNC:PSE<CR>"
  params: []

- id: function_stop
  label: STOP
  kind: action
  command: "&FNC:STP<CR>"
  params: []

- id: function_record
  label: RECORD
  kind: action
  command: "&FNC:RCD<CR>"
  params: []

- id: function_skip_next
  label: SKIP NEXT
  kind: action
  command: "&FNC:NXT<CR>"
  params: []

- id: function_skip_back
  label: SKIP BACK
  kind: action
  command: "&FNC:PRV<CR>"
  params: []

- id: function_fast_forward
  label: Fast Forward
  kind: action
  command: "&FNC:FWD<CR>"
  params: []

- id: function_fast_backward
  label: Fast Backward
  kind: action
  command: "&FNC:RWD<CR>"
  params: []

- id: exit
  label: EXIT
  kind: action
  command: "&EXT:***<CR>"
  params: []

- id: osd_access_on
  label: OSD Access ON
  kind: action
  command: "&OSA:ON*<CR>"
  params: []

- id: osd_access_off
  label: OSD Access OFF
  kind: action
  command: "&OSA:OFF<CR>"
  params: []

- id: osd_access_query
  label: Get OSD Access Status
  kind: query
  command: "&OSA?***<CR>"
  params: []

- id: osd_toggle
  label: SETUP (open/close)
  kind: action
  command: "&OSD:TOG<CR>"
  params: []

- id: osd_on
  label: OSD ON (open)
  kind: action
  command: "&OSD:ON*<CR>"
  params: []

- id: osd_off
  label: OSD OFF (close)
  kind: action
  command: "&OSD:OFF<CR>"
  params: []

- id: osd_status_query
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

- id: input_usb
  label: Input USB / DMP
  kind: action
  command: "&SRC:USB<CR>"
  params: []

- id: input_vga
  label: Input VGA
  kind: action
  command: "&SRC:VGA<CR>"
  params: []

- id: input_query
  label: Get Input Status
  kind: query
  command: "&SRC?***<CR>"
  params: []

- id: vga_auto_adjust
  label: VGA Auto Adjust
  kind: action
  command: "&VGA:ADJ<CR>"
  params: []

- id: out_5v_off
  label: 5VDC Out OFF
  kind: action
  command: "&05V:OFF<CR>"
  params: []

- id: out_5v_follow_dfu
  label: 5VDC Out Follow DFU
  kind: action
  command: "&05V:DFU<CR>"
  params: []

- id: out_5v_on
  label: 5VDC Out Always ON
  kind: action
  command: "&05V:ON*<CR>"
  params: []

- id: out_5v_query
  label: Get 5VDC Out Status
  kind: query
  command: "&05V?***<CR>"
  params: []

- id: out_12v_off
  label: 12VDC Out OFF
  kind: action
  command: "&12V:OFF<CR>"
  params: []

- id: out_12v_follow_dfu
  label: 12VDC Out Follow DFU
  kind: action
  command: "&12V:DFU<CR>"
  params: []

- id: out_12v_on
  label: 12VDC Out Always ON
  kind: action
  command: "&12V:ON*<CR>"
  params: []

- id: out_12v_query
  label: Get 12VDC Out Status
  kind: query
  command: "&12V?***<CR>"
  params: []

- id: aspect_169
  label: Aspect 16:9
  kind: action
  command: "&ASP:169<CR>"
  params: []

- id: aspect_43
  label: Aspect 4:3
  kind: action
  command: "&ASP:043<CR>"
  params: []

- id: aspect_zoom1
  label: Zoom 1
  kind: action
  command: "&ASP:ZM1<CR>"
  params: []

- id: aspect_zoom2
  label: Zoom 2
  kind: action
  command: "&ASP:ZM2<CR>"
  params: []

- id: aspect_zoom3
  label: Zoom 3 (24VDC models)
  kind: action
  command: "&ASP:ZM3<CR>"
  params: []

- id: aspect_query
  label: Get Aspect Status
  kind: query
  command: "&ASP?***<CR>"
  params: []

- id: zoom3_top_left
  label: Zoom 3 position Top Left (24VDC models)
  kind: action
  command: "&Z3P:TLF<CR>"
  params: []

- id: zoom3_top_right
  label: Zoom 3 position Top Right (24VDC models)
  kind: action
  command: "&Z3P:TRT<CR>"
  params: []

- id: zoom3_bottom_left
  label: Zoom 3 position Bottom Left (24VDC models)
  kind: action
  command: "&Z3P:BLF<CR>"
  params: []

- id: zoom3_bottom_right
  label: Zoom 3 position Bottom Right (24VDC models)
  kind: action
  command: "&Z3P:BRT<CR>"
  params: []

- id: zoom3_position_query
  label: Get Zoom 3 position (24VDC models)
  kind: query
  command: "&Z3P?***<CR>"
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
  label: Picture Temp Cool
  kind: action
  command: "&PCT:COL<CR>"
  params: []

- id: picture_temp_medium
  label: Picture Temp Medium
  kind: action
  command: "&PCT:MED<CR>"
  params: []

- id: picture_temp_warm
  label: Picture Temp Warm
  kind: action
  command: "&PCT:WRM<CR>"
  params: []

- id: picture_mute_on
  label: Picture Mute On (backlight off)
  kind: action
  command: "&PCT:MUT<CR>"
  params: []

- id: picture_mute_off
  label: Picture Mute Off (backlight on)
  kind: action
  command: "&PCT:UMT<CR>"
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

- id: set_brightness
  label: Set Brightness Level
  kind: action
  command: "&BRT:{level}<CR>"
  params:
    - name: level
      type: integer
      description: Brightness 000-100

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

- id: set_contrast
  label: Set Contrast Level
  kind: action
  command: "&CON:{level}<CR>"
  params:
    - name: level
      type: integer
      description: Contrast 000-100

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

- id: set_saturation
  label: Set Saturation Level
  kind: action
  command: "&STR:{level}<CR>"
  params:
    - name: level
      type: integer
      description: Saturation 000-100

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

- id: set_sharpness
  label: Set Sharpness Level
  kind: action
  command: "&SRP:{level}<CR>"
  params:
    - name: level
      type: integer
      description: Sharpness 000-100

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

- id: set_backlight
  label: Set Backlight Level
  kind: action
  command: "&BLT:{level}<CR>"
  params:
    - name: level
      type: integer
      description: Backlight 020-100

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

- id: audio_mode_user
  label: Audio Mode User
  kind: action
  command: "&AUD:USR<CR>"
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

- id: set_bass
  label: Set Bass Level
  kind: action
  command: "&BAS:{level}<CR>"
  params:
    - name: level
      type: integer
      description: Bass 000-100

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

- id: set_treble
  label: Set Treble Level
  kind: action
  command: "&TRB:{level}<CR>"
  params:
    - name: level
      type: integer
      description: Treble 000-100

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

- id: set_balance
  label: Set Balance Level
  kind: action
  command: "&BAL:{level}<CR>"
  params:
    - name: level
      type: string
      description: Balance -50 to +50, signed with leading `-` or `+`

- id: balance_query
  label: Get Balance Level
  kind: query
  command: "&BAL?***<CR>"
  params: []

- id: boot_volume_last
  label: Boot Volume Last
  kind: action
  command: "&BVL:LST<CR>"
  params: []

- id: boot_volume_user
  label: Boot Volume User
  kind: action
  command: "&BVL:USR<CR>"
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

- id: set_boot_volume
  label: Set Boot Volume Level
  kind: action
  command: "&BVL:{level}<CR>"
  params:
    - name: level
      type: integer
      description: Boot volume 000-100

- id: boot_volume_query
  label: Get Boot Volume Level
  kind: query
  command: "&BVL?***<CR>"
  params: []

- id: show_logo
  label: Show Logo
  kind: action
  command: "&LGO:ON*<CR>"
  params: []

- id: hide_logo
  label: Hide Logo
  kind: action
  command: "&LGO:OFF<CR>"
  params: []

- id: echo_on
  label: Set RS232 Echo ON
  kind: action
  command: "&ECO:ON*<CR>"
  params: []

- id: echo_off
  label: Set RS232 Echo OFF
  kind: action
  command: "&ECO:OFF<CR>"
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [ON, OFF]
  ack_template: "%PWR:{value}<CR>"

- id: boot_state
  type: enum
  values: [ON, SBY, LST, INS]
  ack_template: "%BOT:{value}<CR>"

- id: signal_loss_state
  type: enum
  values: ["05s", "10s", "30s", "001", "002", OFF]
  ack_template: "%SLS:{value}<CR>"

- id: sleep_timer_state
  type: enum
  values: ["015", "030", "045", "060", "090", "120", OFF]
  ack_template: "%SLP:{value}<CR>"

- id: input_state
  type: enum
  values: [RGB, HD1, HD2, HD3, USB, VGA]
  ack_template: "%SRC:{value}<CR>"

- id: out_5v_state
  type: enum
  values: [OFF, DFU, ON]
  ack_template: "%05V:{value}<CR>"

- id: out_12v_state
  type: enum
  values: [OFF, DFU, ON]
  ack_template: "%12V:{value}<CR>"

- id: aspect_state
  type: enum
  values: ["169", "043", ZM1, ZM2, ZM3]
  ack_template: "%ASP:{value}<CR>"

- id: zoom3_position_state
  type: enum
  values: [TLF, TRT, BLF, BRT]
  ack_template: "%Z3P:{value}<CR>"

- id: mute_state
  type: enum
  values: [ON, OFF]
  ack_template: "%MUT:{value}<CR>"

- id: osd_state
  type: enum
  values: [ON, OFF]
  ack_template: "%OSD:{value}<CR>"

- id: osd_access_state
  type: enum
  values: [ON, OFF]
  ack_template: "%OSA:{value}<CR>"

- id: error
  type: enum
  values:
    - "!ERR:001"  # Access denied
    - "!ERR:002"  # Not available
    - "!ERR:003"  # Not implemented
    - "!ERR:004"  # Value out of range
```

## Variables
```yaml
- id: volume
  type: integer
  range: [0, 100]
  unit: ""  # UNRESOLVED: unit not stated; source expresses as 000-100 integer
  set_command: "&VOL:{level}<CR>"
  get_command: "&VOL?***<CR>"

- id: volume_limit
  type: integer
  range: [0, 100]
  set_command: "&VLM:{limit}<CR>"

- id: brightness
  type: integer
  range: [0, 100]
  set_command: "&BRT:{level}<CR>"
  get_command: "&BRT?***<CR>"

- id: contrast
  type: integer
  range: [0, 100]
  set_command: "&CON:{level}<CR>"
  get_command: "&CON?***<CR>"

- id: saturation
  type: integer
  range: [0, 100]
  set_command: "&STR:{level}<CR>"
  get_command: "&STR?***<CR>"

- id: sharpness
  type: integer
  range: [0, 100]
  set_command: "&SRP:{level}<CR>"
  get_command: "&SRP?***<CR>"

- id: backlight
  type: integer
  range: [20, 100]
  set_command: "&BLT:{level}<CR>"
  get_command: "&BLT?***<CR>"

- id: bass
  type: integer
  range: [0, 100]
  set_command: "&BAS:{level}<CR>"
  get_command: "&BAS?***<CR>"

- id: treble
  type: integer
  range: [0, 100]
  set_command: "&TRB:{level}<CR>"
  get_command: "&TRB?***<CR>"

- id: balance
  type: integer
  range: [-50, 50]
  set_command: "&BAL:{level}<CR>"
  get_command: "&BAL?***<CR>"

- id: boot_volume
  type: integer
  range: [0, 100]
  set_command: "&BVL:{level}<CR>"
  get_command: "&BVL?***<CR>"
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or power-on sequencing requirements beyond the timing constraints below.
```

## Notes
- 9-byte command frame: `&` + 3-byte identifier + 1-byte separator (`:` for set, `?` for query) + 3-byte value (right-padded with `*`) + `<CR>` (0x0D).
- Acknowledgement frame: `%` + 3-byte identifier + `:` + 3-byte value + `<CR>`.
- Error frame: `!ERR:NNN<CR>` where NNN is 001-004.
- Timing: wait 10s after power on before first command; wait for response before next command; 2s resend delay; 500ms minimum between commands; 5s cooldown after 20 commands.
- Default baud 38400 (configurable to 9600/19200 via OSD service menu).
- Crossed (null-modem) serial cable: host DB9 female ↔ projector DB9 male; pin 2↔3, 5↔5.
- ECHO (ECO) toggles RS-232 acknowledgements on/off; default ON.
- Zoom 3 / Zoom 3 position commands apply only to 24VDC models; subject to enablement.
- IR remote control commands generate matching RS-232 ACKs, but not all RS-232 commands have an IR equivalent.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: which model variants enable 5V/12V out, Zoom 3, and ASP:ZM3 not specified in source beyond the 24VDC Zoom 3 note -->

## Provenance

```yaml
source_domains:
  - cdn.shopify.com
  - applicationmarket.crestron.com
source_urls:
  - https://cdn.shopify.com/s/files/1/0793/9768/3467/files/TD_DFU_RS232-Protocol_v5.2_ASCII_Format_20200504.pdf
  - https://applicationmarket.crestron.com/ad-notam-dfu/
retrieved_at: 2026-04-29T20:56:19.246Z
last_checked_at: 2026-06-02T21:39:35.860Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T21:39:35.860Z
matched_actions: 161
action_count: 161
confidence: medium
summary: "All 161 spec action commands match verbatim in source; transport parameters verified; spec represents full source command catalogue. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "which 5V/12V out, Z3P, and Zoom features are enabled on which DFU variants not fully specified"
- "unit not stated; source expresses as 000-100 integer"
- "source contains no safety warnings, interlock procedures, or power-on sequencing requirements beyond the timing constraints below."
- "which model variants enable 5V/12V out, Zoom 3, and ASP:ZM3 not specified in source beyond the 24VDC Zoom 3 note"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
