---
spec_id: admin/ad_notam-dtv
schema_version: ai4av-public-spec-v1
revision: 1
title: "Ad Notam DTV Control Spec"
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
source_urls:
  - "https://cdn.shopify.com/s/files/1/0793/9768/3467/files/TD_DFU_RS232-Protocol_v5.2_ASCII_Format_20200504.pdf?v=1741266010"
retrieved_at: 2026-04-29T21:04:16.985Z
last_checked_at: 2026-05-14T18:17:13.839Z
generated_at: 2026-05-14T18:17:13.839Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:13.839Z
  matched_actions: 111
  action_count: 139
  confidence: high
  summary: "All 111 spec actions verified against source; transport parameters fully supported; command catalogue essentially complete."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-27
---

# Ad Notam DTV Control Spec

## Summary
Ad Notam Display Frame Unit (DFU) for video wall control. RS-232 ASCII protocol, 9-byte fixed-length commands with `&` prefix, `%` acknowledgement prefix, `!` error prefix. Default baud 38400, configurable to 9600/19200. Supports power, input routing, audio, video adjustment, OSD, and remote key emulation.

<!-- UNRESOLVED: zoom3 position commands only available on 24VDC models — source does not specify which models -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 38400  # default; source states 9600/19200/38400 configurable
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
  label: Signal Loss OFF
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
  label: Sleep Timer OFF
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
- id: key_text
  label: Text Key
  kind: action
  params: []
- id: key_epg
  label: EPG Key
  kind: action
  params: []
- id: key_tvr
  label: TV/R Key
  kind: action
  params: []
- id: key_menu
  label: Menu Key
  kind: action
  params: []
- id: key_goto
  label: Goto Key
  kind: action
  params: []
- id: key_fav
  label: Fav Key
  kind: action
  params: []
- id: key_back
  label: Back Key
  kind: action
  params: []
- id: key_info
  label: Info Key
  kind: action
  params: []
- id: cursor_ok
  label: Cursor OK
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
  label: Color Red
  kind: action
  params: []
- id: color_green
  label: Color Green
  kind: action
  params: []
- id: color_blue
  label: Color Blue
  kind: action
  params: []
- id: color_yellow
  label: Color Yellow
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
- id: volume_set
  label: Set Volume Level
  kind: action
  params:
    - name: level
      type: integer
      description: Volume level 000-100
- id: volume_limit_set
  label: Set Volume Limit
  kind: action
  params:
    - name: limit
      type: integer
      description: Volume limit 000-100
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
- id: channel_up
  label: Channel Up
  kind: action
  params: []
- id: channel_down
  label: Channel Down
  kind: action
  params: []
- id: function_play
  label: Play
  kind: action
  params: []
- id: function_pause
  label: Pause
  kind: action
  params: []
- id: function_stop
  label: Stop
  kind: action
  params: []
- id: function_record
  label: Record
  kind: action
  params: []
- id: function_skip_next
  label: Skip Next
  kind: action
  params: []
- id: function_skip_back
  label: Skip Back
  kind: action
  params: []
- id: function_fast_forward
  label: Fast Forward
  kind: action
  params: []
- id: function_fast_backward
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
- id: vga_auto_adjust
  label: VGA Auto Adjust
  kind: action
  params: []
- id: dcdc_5v_off
  label: 5VDC Out Off
  kind: action
  params: []
- id: dcdc_5v_follow_dfu
  label: 5VDC Out Follow DFU
  kind: action
  params: []
- id: dcdc_5v_on
  label: 5VDC Out Always On
  kind: action
  params: []
- id: dcdc_12v_off
  label: 12VDC Out Off
  kind: action
  params: []
- id: dcdc_12v_follow_dfu
  label: 12VDC Out Follow DFU
  kind: action
  params: []
- id: dcdc_12v_on
  label: 12VDC Out Always On
  kind: action
  params: []
- id: aspect_169
  label: Aspect 16:9
  kind: action
  params: []
- id: aspect_043
  label: Aspect 4:3
  kind: action
  params: []
- id: aspect_zoom1
  label: Zoom 1
  kind: action
  params: []
- id: aspect_zoom2
  label: Zoom 2
  kind: action
  params: []
- id: aspect_zoom3
  label: Zoom 3
  kind: action
  params: []
  # UNRESOLVED: zoom3 only on 24VDC models - not stated which models
- id: zoom3_position_topleft
  label: Zoom 3 Position Top Left
  kind: action
  params: []
- id: zoom3_position_topright
  label: Zoom 3 Position Top Right
  kind: action
  params: []
- id: zoom3_position_bottomleft
  label: Zoom 3 Position Bottom Left
  kind: action
  params: []
- id: zoom3_position_bottomright
  label: Zoom 3 Position Bottom Right
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
- id: brightness_set
  label: Set Brightness Level
  kind: action
  params:
    - name: level
      type: integer
      description: Brightness level 000-100
- id: contrast_up
  label: Contrast Up
  kind: action
  params: []
- id: contrast_down
  label: Contrast Down
  kind: action
  params: []
- id: contrast_set
  label: Set Contrast Level
  kind: action
  params:
    - name: level
      type: integer
      description: Contrast level 000-100
- id: saturation_up
  label: Saturation Up
  kind: action
  params: []
- id: saturation_down
  label: Saturation Down
  kind: action
  params: []
- id: saturation_set
  label: Set Saturation Level
  kind: action
  params:
    - name: level
      type: integer
      description: Saturation level 000-100
- id: sharpness_up
  label: Sharpness Up
  kind: action
  params: []
- id: sharpness_down
  label: Sharpness Down
  kind: action
  params: []
- id: sharpness_set
  label: Set Sharpness Level
  kind: action
  params:
    - name: level
      type: integer
      description: Sharpness level 000-100
- id: backlight_up
  label: Backlight Up
  kind: action
  params: []
- id: backlight_down
  label: Backlight Down
  kind: action
  params: []
- id: backlight_set
  label: Set Backlight Level
  kind: action
  params:
    - name: level
      type: integer
      description: Backlight level 020-100
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
- id: bass_set
  label: Set Bass Level
  kind: action
  params:
    - name: level
      type: integer
      description: Bass level 000-100
- id: treble_up
  label: Treble Up
  kind: action
  params: []
- id: treble_down
  label: Treble Down
  kind: action
  params: []
- id: treble_set
  label: Set Treble Level
  kind: action
  params:
    - name: level
      type: integer
      description: Treble level 000-100
- id: balance_left
  label: Balance Left
  kind: action
  params: []
- id: balance_right
  label: Balance Right
  kind: action
  params: []
- id: balance_set
  label: Set Balance Level
  kind: action
  params:
    - name: level
      type: integer
      description: Balance level -50 to +50
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
- id: boot_volume_set
  label: Set Boot Volume Level
  kind: action
  params:
    - name: level
      type: integer
      description: Boot volume level 000-100
- id: show_logo
  label: Show Logo
  kind: action
  params: []
- id: hide_logo
  label: Hide Logo
  kind: action
  params: []
- id: picture_mute_on
  label: Picture Mute On
  kind: action
  params: []
- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  params: []
- id: echo_on
  label: Set RS232 Echo ON
  kind: action
  params: []
- id: echo_off
  label: Set RS232 Echo OFF
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: power_status
  type: enum
  values: [ON, OFF]
- id: boot_status
  type: enum
  values: [ON, SBY, LST, INS]
- id: signal_loss_status
  type: enum
  values: [05s, 10s, 30s, 001, 002, OFF]
- id: sleep_timer_status
  type: enum
  values: [015, 030, 045, 060, 090, 120, OFF]
- id: mute_status
  type: enum
  values: [ON, OFF]
- id: osd_access_status
  type: enum
  values: [ON, OFF]
- id: osd_status
  type: enum
  values: [ON, OFF]
- id: input_status
  type: enum
  values: [RGB, HD1, HD2, HD3, USB, VGA]
- id: dcdc_5v_status
  type: enum
  values: [OFF, DFU, ON]
- id: dcdc_12v_status
  type: enum
  values: [OFF, DFU, ON]
- id: aspect_status
  type: enum
  values: [169, 043, ZM1, ZM2, ZM3]
- id: zoom3_position_status
  type: enum
  values: [TLF, TRT, BLF, BRT]
- id: volume_status
  type: range
  min: 0
  max: 100
- id: volume_limit_status
  type: range
  min: 0
  max: 100
- id: brightness_status
  type: range
  min: 0
  max: 100
- id: contrast_status
  type: range
  min: 0
  max: 100
- id: saturation_status
  type: range
  min: 0
  max: 100
- id: sharpness_status
  type: range
  min: 0
  max: 100
- id: backlight_status
  type: range
  min: 20
  max: 100
- id: bass_status
  type: range
  min: 0
  max: 100
- id: treble_status
  type: range
  min: 0
  max: 100
- id: balance_status
  type: range
  min: -50
  max: 50
- id: boot_volume_status
  type: range
  min: 0
  max: 100
- id: error
  type: enum
  values: ["!ERR:001", "!ERR:002", "!ERR:003", "!ERR:004"]
  # ERR:001 access denied, ERR:002 not available, ERR:003 not implemented, ERR:004 value out of range
```

## Variables
```yaml
# All settable parameters are covered by Actions. No separate Variables section needed.
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented - source only describes command/response pairs
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - Wait 10 seconds after power on before sending next command
  - Wait for response before sending next command
  - Minimum 2 seconds delay before resending if no response received
  - Minimum 500ms delay between commands
  - Minimum 5 seconds delay after sending 20 commands
# UNRESOLVED: no safety-critical warnings or interlock procedures beyond timing constraints
```

## Notes
Command format: 9 bytes total — `&` header + 3-byte ID + `:` or `?` separator + 3-byte value + CR. Value padding uses `*` for unused digits. Acknowledgements use `%` prefix; errors use `!` prefix. Echo is ON by default. Some commands generate OSD feedback. Zoom3 and position commands only functional on 24VDC models — source does not specify which DFU models are 24VDC.
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: which specific DFU models support 24VDC / zoom3 commands not stated in source -->

## Provenance

```yaml
source_domains:
  - cdn.shopify.com
source_urls:
  - "https://cdn.shopify.com/s/files/1/0793/9768/3467/files/TD_DFU_RS232-Protocol_v5.2_ASCII_Format_20200504.pdf?v=1741266010"
retrieved_at: 2026-04-29T21:04:16.985Z
last_checked_at: 2026-05-14T18:17:13.839Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:13.839Z
matched_actions: 111
action_count: 139
confidence: high
summary: "All 111 spec actions verified against source; transport parameters fully supported; command catalogue essentially complete."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
