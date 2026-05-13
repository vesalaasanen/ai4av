---
spec_id: admin/ad_notam-dfu
schema_version: ai4av-public-spec-v1
revision: 1
title: "Ad Notam DFU Control Spec"
manufacturer: "Ad Notam"
model_family: "Ad Notam Display Frame Unit (DFU)"
aliases: []
compatible_with:
  manufacturers:
    - "Ad Notam"
  models:
    - "Ad Notam Display Frame Unit (DFU)"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - cdn.shopify.com
  - applicationmarket.crestron.com
retrieved_at: 2026-04-29T20:56:19.246Z
last_checked_at: 2026-04-27T08:57:41.540Z
generated_at: 2026-04-27T08:57:41.540Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-27T08:57:41.540Z
  matched_actions: 143
  action_count: 143
  confidence: high
  summary: "All 143 spec actions match source commands; transport parameters verified; comprehensive coverage of source command catalogue."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-27
---

# Ad Notam DFU Control Spec

## Summary
Ad Notam Display Frame Unit (DFU) controlled via RS-232 ASCII protocol. 9-byte fixed-length commands prefixed with `&`, acknowledgements prefixed with `%`. Supports power, input selection, audio adjustments, display settings, and OSD control.

<!-- UNRESOLVED: TCP/IP control not documented; only RS-232 described -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 38400  # default; also supports 9600, 19200 (configurable via OSD)
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
  params: []

- id: power_on
  label: Power On
  kind: action
  params: []

- id: power_off
  label: Power Off
  kind: action
  params: []

- id: get_power_status
  label: Get Power Status
  kind: action
  params: []

- id: boot_set_on
  label: Boot Set to ON
  kind: action
  params: []

- id: boot_set_standby
  label: Boot Set to Standby
  kind: action
  params: []

- id: boot_set_last
  label: Boot Set to Last
  kind: action
  params: []

- id: boot_set_instant
  label: Boot Set to Instant
  kind: action
  params: []

- id: get_boot_setup
  label: Get Boot Setup
  kind: action
  params: []

- id: signal_loss_5sec
  label: Signal Loss 5 Sec
  kind: action
  params: []

- id: signal_loss_10sec
  label: Signal Loss 10 Sec
  kind: action
  params: []

- id: signal_loss_30sec
  label: Signal Loss 30 Sec
  kind: action
  params: []

- id: signal_loss_1min
  label: Signal Loss 1 Min
  kind: action
  params: []

- id: signal_loss_2min
  label: Signal Loss 2 Min
  kind: action
  params: []

- id: signal_loss_off
  label: Signal Loss Off
  kind: action
  params: []

- id: get_signal_loss_setup
  label: Get Signal Loss Setup
  kind: action
  params: []

- id: sleep_timer_15min
  label: Sleep Timer 15 Min
  kind: action
  params: []

- id: sleep_timer_30min
  label: Sleep Timer 30 Min
  kind: action
  params: []

- id: sleep_timer_45min
  label: Sleep Timer 45 Min
  kind: action
  params: []

- id: sleep_timer_60min
  label: Sleep Timer 60 Min
  kind: action
  params: []

- id: sleep_timer_90min
  label: Sleep Timer 90 Min
  kind: action
  params: []

- id: sleep_timer_120min
  label: Sleep Timer 120 Min
  kind: action
  params: []

- id: sleep_timer_off
  label: Sleep Timer Off
  kind: action
  params: []

- id: get_sleep_timer_status
  label: Get Sleep Timer Status
  kind: action
  params: []

- id: digit_0
  label: Digit 0
  kind: action
  params: []

- id: digit_1
  label: Digit 1
  kind: action
  params: []

- id: digit_2
  label: Digit 2
  kind: action
  params: []

- id: digit_3
  label: Digit 3
  kind: action
  params: []

- id: digit_4
  label: Digit 4
  kind: action
  params: []

- id: digit_5
  label: Digit 5
  kind: action
  params: []

- id: digit_6
  label: Digit 6
  kind: action
  params: []

- id: digit_7
  label: Digit 7
  kind: action
  params: []

- id: digit_8
  label: Digit 8
  kind: action
  params: []

- id: digit_9
  label: Digit 9
  kind: action
  params: []

- id: text_key
  label: Text Key
  kind: action
  params: []

- id: epg_key
  label: EPG Key
  kind: action
  params: []

- id: tvr_key
  label: TV/R Key
  kind: action
  params: []

- id: menu_key
  label: Menu Key
  kind: action
  params: []

- id: goto_key
  label: Goto Key
  kind: action
  params: []

- id: fav_key
  label: FAV Key
  kind: action
  params: []

- id: back_key
  label: Back Key
  kind: action
  params: []

- id: ok_key
  label: OK Key
  kind: action
  params: []

- id: cursor_up
  label: Cursor Up
  kind: action
  params: []

- id: cursor_down
  label: Cursor Down
  kind: action
  params: []

- id: cursor_left
  label: Cursor Left
  kind: action
  params: []

- id: cursor_right
  label: Cursor Right
  kind: action
  params: []

- id: color_red
  label: Red
  kind: action
  params: []

- id: color_green
  label: Green
  kind: action
  params: []

- id: color_blue
  label: Blue
  kind: action
  params: []

- id: color_yellow
  label: Yellow
  kind: action
  params: []

- id: volume_up
  label: Volume Up
  kind: action
  params: []

- id: volume_down
  label: Volume Down
  kind: action
  params: []

- id: mute_toggle
  label: Mute Toggle
  kind: action
  params: []

- id: mute_on
  label: Mute On
  kind: action
  params: []

- id: mute_off
  label: Mute Off
  kind: action
  params: []

- id: get_mute_status
  label: Get Mute Status
  kind: action
  params: []

- id: info_key
  label: Info Key
  kind: action
  params: []

- id: channel_up
  label: Channel Up
  kind: action
  params: []

- id: channel_down
  label: Channel Down
  kind: action
  params: []

- id: func_play
  label: Play
  kind: action
  params: []

- id: func_pause
  label: Pause
  kind: action
  params: []

- id: func_stop
  label: Stop
  kind: action
  params: []

- id: func_record
  label: Record
  kind: action
  params: []

- id: func_skip_next
  label: Skip Next
  kind: action
  params: []

- id: func_skip_back
  label: Skip Back
  kind: action
  params: []

- id: func_fast_forward
  label: Fast Forward
  kind: action
  params: []

- id: func_rewind
  label: Fast Backward
  kind: action
  params: []

- id: exit
  label: Exit
  kind: action
  params: []

- id: osd_access_on
  label: OSD Access On
  kind: action
  params: []

- id: osd_access_off
  label: OSD Access Off
  kind: action
  params: []

- id: get_osd_access_status
  label: Get OSD Access Status
  kind: action
  params: []

- id: osd_toggle
  label: OSD Toggle
  kind: action
  params: []

- id: osd_on
  label: OSD On
  kind: action
  params: []

- id: osd_off
  label: OSD Off
  kind: action
  params: []

- id: get_osd_status
  label: Get OSD Status
  kind: action
  params: []

- id: input_hdmi1
  label: Input HDMI 1
  kind: action
  params: []

- id: input_hdmi2
  label: Input HDMI 2
  kind: action
  params: []

- id: input_hdmi3
  label: Input HDMI 3
  kind: action
  params: []

- id: input_component
  label: Input Component
  kind: action
  params: []

- id: input_usb
  label: Input USB / DMP
  kind: action
  params: []

- id: input_vga
  label: Input VGA
  kind: action
  params: []

- id: get_input_status
  label: Get Input Status
  kind: action
  params: []

- id: vga_auto_adjust
  label: VGA Auto Adjust
  kind: action
  params: []

- id: out_5v_off
  label: 5VDC Out Off
  kind: action
  params: []

- id: out_5v_follow_dfu
  label: 5VDC Out Follow DFU
  kind: action
  params: []

- id: out_5v_on
  label: 5VDC Out Always On
  kind: action
  params: []

- id: get_5v_out_status
  label: Get 5VDC Out Status
  kind: action
  params: []

- id: out_12v_off
  label: 12VDC Out Off
  kind: action
  params: []

- id: out_12v_follow_dfu
  label: 12VDC Out Follow DFU
  kind: action
  params: []

- id: out_12v_on
  label: 12VDC Out Always On
  kind: action
  params: []

- id: get_12v_out_status
  label: Get 12VDC Out Status
  kind: action
  params: []

- id: aspect_16_9
  label: Aspect 16:9
  kind: action
  params: []

- id: aspect_4_3
  label: Aspect 4:3
  kind: action
  params: []

- id: zoom_1
  label: Zoom 1
  kind: action
  params: []

- id: zoom_2
  label: Zoom 2
  kind: action
  params: []

- id: zoom_3
  label: Zoom 3
  kind: action
  params: []

- id: get_aspect_status
  label: Get Aspect Status
  kind: action
  params: []

- id: zoom3_pos_top_left
  label: Zoom 3 Position Top Left
  kind: action
  params: []

- id: zoom3_pos_top_right
  label: Zoom 3 Position Top Right
  kind: action
  params: []

- id: zoom3_pos_bottom_left
  label: Zoom 3 Position Bottom Left
  kind: action
  params: []

- id: zoom3_pos_bottom_right
  label: Zoom 3 Position Bottom Right
  kind: action
  params: []

- id: get_zoom3_position
  label: Get Zoom 3 Position
  kind: action
  params: []

- id: picture_mode_standard
  label: Picture Mode Standard
  kind: action
  params: []

- id: picture_mode_user
  label: Picture Mode User
  kind: action
  params: []

- id: picture_mode_dynamic
  label: Picture Mode Dynamic
  kind: action
  params: []

- id: picture_mode_mild
  label: Picture Mode Mild
  kind: action
  params: []

- id: picture_temp_cool
  label: Picture Temp Cool
  kind: action
  params: []

- id: picture_temp_medium
  label: Picture Temp Medium
  kind: action
  params: []

- id: picture_temp_warm
  label: Picture Temp Warm
  kind: action
  params: []

- id: brightness_up
  label: Brightness Up
  kind: action
  params: []

- id: brightness_down
  label: Brightness Down
  kind: action
  params: []

- id: contrast_up
  label: Contrast Up
  kind: action
  params: []

- id: contrast_down
  label: Contrast Down
  kind: action
  params: []

- id: saturation_up
  label: Saturation Up
  kind: action
  params: []

- id: saturation_down
  label: Saturation Down
  kind: action
  params: []

- id: sharpness_up
  label: Sharpness Up
  kind: action
  params: []

- id: sharpness_down
  label: Sharpness Down
  kind: action
  params: []

- id: backlight_up
  label: Backlight Up
  kind: action
  params: []

- id: backlight_down
  label: Backlight Down
  kind: action
  params: []

- id: audio_mode_standard
  label: Audio Mode Standard
  kind: action
  params: []

- id: audio_mode_music
  label: Audio Mode Music
  kind: action
  params: []

- id: audio_mode_movie
  label: Audio Mode Movie
  kind: action
  params: []

- id: audio_mode_sports
  label: Audio Mode Sports
  kind: action
  params: []

- id: audio_mode_user
  label: Audio Mode User
  kind: action
  params: []

- id: bass_up
  label: Bass Up
  kind: action
  params: []

- id: bass_down
  label: Bass Down
  kind: action
  params: []

- id: treble_up
  label: Treble Up
  kind: action
  params: []

- id: treble_down
  label: Treble Down
  kind: action
  params: []

- id: balance_left
  label: Balance Left
  kind: action
  params: []

- id: balance_right
  label: Balance Right
  kind: action
  params: []

- id: boot_volume_last
  label: Boot Volume Last
  kind: action
  params: []

- id: boot_volume_user
  label: Boot Volume User
  kind: action
  params: []

- id: boot_volume_up
  label: Boot Volume Up
  kind: action
  params: []

- id: boot_volume_down
  label: Boot Volume Down
  kind: action
  params: []

- id: show_logo
  label: Show Logo
  kind: action
  params: []

- id: hide_logo
  label: Hide Logo
  kind: action
  params: []

- id: picture_mute_on
  label: Picture Mute On (backlight off)
  kind: action
  params: []

- id: picture_mute_off
  label: Picture Mute Off (backlight on)
  kind: action
  params: []

- id: echo_on
  label: Set RS232 Echo On
  kind: action
  params: []

- id: echo_off
  label: Set RS232 Echo Off
  kind: action
  params: []

- id: set_volume
  label: Set Volume Level
  kind: action
  params:
    - name: level
      type: integer
      description: Volume level 000-100

- id: set_brightness
  label: Set Brightness Level
  kind: action
  params:
    - name: level
      type: integer
      description: Brightness level 000-100

- id: set_contrast
  label: Set Contrast Level
  kind: action
  params:
    - name: level
      type: integer
      description: Contrast level 000-100

- id: set_saturation
  label: Set Saturation Level
  kind: action
  params:
    - name: level
      type: integer
      description: Saturation level 000-100

- id: set_sharpness
  label: Set Sharpness Level
  kind: action
  params:
    - name: level
      type: integer
      description: Sharpness level 000-100

- id: set_backlight
  label: Set Backlight Level
  kind: action
  params:
    - name: level
      type: integer
      description: Backlight level 020-100

- id: set_bass
  label: Set Bass Level
  kind: action
  params:
    - name: level
      type: integer
      description: Bass level 000-100

- id: set_treble
  label: Set Treble Level
  kind: action
  params:
    - name: level
      type: integer
      description: Treble level 000-100

- id: set_balance
  label: Set Balance Level
  kind: action
  params:
    - name: level
      type: integer
      description: Balance level -50 to +50

- id: set_boot_volume
  label: Set Boot Volume Level
  kind: action
  params:
    - name: level
      type: integer
      description: Boot volume level 000-100

- id: set_volume_limit
  label: Set Volume Limit
  kind: action
  params:
    - name: level
      type: integer
      description: Volume limit 000-100

- id: get_volume_level
  label: Get Volume Level
  kind: action
  params: []

- id: get_brightness_level
  label: Get Brightness Level
  kind: action
  params: []

- id: get_contrast_level
  label: Get Contrast Level
  kind: action
  params: []

- id: get_saturation_level
  label: Get Saturation Level
  kind: action
  params: []

- id: get_sharpness_level
  label: Get Sharpness Level
  kind: action
  params: []

- id: get_backlight_level
  label: Get Backlight Level
  kind: action
  params: []

- id: get_bass_level
  label: Get Bass Level
  kind: action
  params: []

- id: get_treble_level
  label: Get Treble Level
  kind: action
  params: []

- id: get_balance_level
  label: Get Balance Level
  kind: action
  params: []

- id: get_boot_volume_level
  label: Get Boot Volume Level
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: power_status
  type: enum
  values:
    - "ON*"
    - OFF

- id: boot_status
  type: enum
  values:
    - "ON*"
    - SBY
    - LST
    - INS

- id: signal_loss_status
  type: enum
  values:
    - "05s"
    - "10s"
    - "30s"
    - "001"
    - "002"
    - OFF

- id: sleep_timer_status
  type: enum
  values:
    - "015"
    - "030"
    - "045"
    - "060"
    - "090"
    - "120"
    - OFF

- id: volume_level
  type: integer
  range: [0, 100]

- id: mute_status
  type: enum
  values:
    - "ON*"
    - OFF

- id: osd_access_status
  type: enum
  values:
    - "ON*"
    - OFF

- id: osd_status
  type: enum
  values:
    - "ON*"
    - OFF

- id: input_status
  type: enum
  values:
    - RGB
    - HD1
    - HD2
    - HD3
    - USB
    - VGA

- id: out5v_status
  type: enum
  values:
    - OFF
    - DFU
    - "ON*"

- id: out12v_status
  type: enum
  values:
    - OFF
    - DFU
    - "ON*"

- id: aspect_status
  type: enum
  values:
    - "169"
    - "043"
    - ZM1
    - ZM2
    - ZM3

- id: zoom3_position
  type: enum
  values:
    - TLF
    - TRT
    - BLF
    - BRT

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

- id: volume_limit
  type: integer
  range: [0, 100]

- id: error_ack
  type: enum
  values:
    - "!ERR:001"
    - "!ERR:002"
    - "!ERR:003"
    - "!ERR:004"
```

## Variables
```yaml
# UNRESOLVED: all settable parameters exposed via actions; Variables section N/A
```

## Events
```yaml
# UNRESOLVED: no unsolicited event descriptions in source - device sends ACKs only (not polled)
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
RS-232 command format: 9 bytes fixed, `&` prefix, 3-char identifier, `:` separator for set, `?` separator for get, 3-char value padded with `*`, CR terminator (0x0D). Acknowledgements: `%` prefix, same 9-byte format. Errors: `!ERR:001`–`!ERR:004`.

Timing constraints: wait 10s after power-on before sending commands; minimum 500ms between commands; minimum 2s before retry if no response; pause 5s after every 20 commands.

Zoom 3 commands (Z3P) and aspect zoom modes are for 24VDC models only.

Baud rate default is 38400, configurable from OSD service menu to 9600 or 19200.

Some commands generate OSD feedback on the display.

IR remote commands generate RS-232 ACK messages.
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: TCP/IP control not documented — serial only -->
<!-- UNRESOLVED: error recovery sequences not documented -->

## Provenance

```yaml
source_domains:
  - cdn.shopify.com
  - applicationmarket.crestron.com
retrieved_at: 2026-04-29T20:56:19.246Z
last_checked_at: 2026-04-27T08:57:41.540Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-27T08:57:41.540Z
matched_actions: 143
action_count: 143
confidence: high
summary: "All 143 spec actions match source commands; transport parameters verified; comprehensive coverage of source command catalogue."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
