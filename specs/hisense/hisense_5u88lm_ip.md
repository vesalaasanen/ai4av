---
spec_id: admin/hisense-5u88lm
schema_version: ai4av-public-spec-v1
revision: 1
title: "HiSense 5U88LM Control Spec"
manufacturer: HiSense
model_family: 5U88LM
aliases: []
compatible_with:
  manufacturers:
    - HiSense
  models:
    - 5U88LM
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - hisense-b2b.com
  - assets.hisense-usa.com
source_urls:
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=5"
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
retrieved_at: 2026-04-30T04:31:43.572Z
last_checked_at: 2026-05-14T18:17:16.358Z
generated_at: 2026-05-14T18:17:16.358Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:16.358Z
  matched_actions: 74
  action_count: 87
  confidence: high
  summary: "All 74 spec actions matched to distinct source RS-232 commands with correct transport parameters (9600 baud, 8N1, no flow control)."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-04
---

# HiSense 5U88LM Control Spec

## Summary
Prosumer TV supporting RS-232 serial control at 9600 baud, 8N1, no flow control. ASCII command protocol with fixed-length frame format (CLIENT ID + COMMAND + DATA + CHECKSUM + CR). No authentication required. IR discrete codes also documented but excluded from this spec.

<!-- UNRESOLVED: TCP/IP control not documented in source — only RS-232 -->

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
  type: none
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
- id: power_on
  label: Power On
  kind: action
  params: []

- id: power_off
  label: Power Off (Standby)
  kind: action
  params: []

- id: set_input
  label: Set Input Source
  kind: action
  params:
    - name: source
      type: enum
      values:
        - tv
        - av
        - component
        - hdmi1
        - hdmi2
        - hdmi3
        - hdmi4
        - vga

- id: set_picture_mode
  label: Set Picture Mode
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - standard
        - vivid
        - energy_saving
        - theater
        - game
        - sport

- id: set_brightness
  label: Set Brightness
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]

- id: set_contrast
  label: Set Contrast
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]

- id: set_color_saturation
  label: Set Color Saturation
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]

- id: set_tint
  label: Set Tint
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]

- id: set_sharpness
  label: Set Sharpness
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 20]

- id: set_aspect_ratio
  label: Set Aspect Ratio
  kind: action
  params:
    - name: ratio
      type: enum
      values:
        - auto
        - normal
        - zoom
        - wide
        - direct
        - 1to1
        - panoramic
        - cinema

- id: set_overscan
  label: Set Overscan
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off]

- id: reset_picture_settings
  label: Reset Picture Settings
  kind: action
  params: []

- id: set_color_temp
  label: Set Color Temperature
  kind: action
  params:
    - name: temp
      type: enum
      values:
        - high
        - middle
        - mid_low
        - low

- id: set_backlight
  label: Set Backlight
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]

- id: set_sound_mode
  label: Set Sound Mode
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - standard
        - theater
        - music
        - speech
        - late_night

- id: set_volume
  label: Set Volume
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]

- id: set_mute
  label: Set Mute
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off]

- id: set_tv_speaker
  label: Set TV Speaker
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off]

- id: reset_audio_settings
  label: Reset Audio Settings
  kind: action
  params: []

- id: set_tuner_mode
  label: Set Tuner Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [antenna, cable]

- id: channel_up
  label: Channel Up
  kind: action
  params: []

- id: channel_down
  label: Channel Down
  kind: action
  params: []

- id: auto_search
  label: Automatic Search
  kind: action
  params: []

- id: set_caption_control
  label: Set Caption Control
  kind: action
  params:
    - name: mode
      type: enum
      values: [off, on, on_when_mute]

- id: restore_factory_settings
  label: Restore Factory Settings
  kind: action
  params: []

- id: set_osd_language
  label: Set OSD Language
  kind: action
  params:
    - name: lang
      type: enum
      values: [english, spanish, french]

- id: set_standby_led
  label: Set Standby LED
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off]

- id: set_volume_lock
  label: Set Volume Control Lock
  kind: action
  params:
    - name: mode
      type: enum
      values: [locked, last_volume, ac_reset, standby_reset]

- id: set_volume_locked_level
  label: Set Volume Locked Level
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]

- id: set_remote_key
  label: Set Remote Key Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [enable, disable, partial]

- id: set_panel_key
  label: Set Panel Key Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [enable, disable]

- id: set_menu_access
  label: Set Menu Access
  kind: action
  params:
    - name: state
      type: enum
      values: [enable, disable]

- id: set_av_setting_menu
  label: Set AV Setting Menu
  kind: action
  params:
    - name: state
      type: enum
      values: [disable, enable]

- id: set_osd_mode
  label: Set OSD Mode
  kind: action
  params:
    - name: state
      type: enum
      values: [enable, disable]

- id: set_input_mode_lock
  label: Set Input Mode Lock
  kind: action
  params:
    - name: mode
      type: enum
      values: [locked, selectable, ac_reset, standby_reset]

- id: set_power_on_input
  label: Set Power On Input
  kind: action
  params:
    - name: source
      type: enum
      values:
        - last
        - air
        - av
        - component
        - hdmi1
        - hdmi2
        - hdmi3
        - hdmi4
        - vga

- id: enable_remote_power_on
  label: Enable RS-232 Remote Power On
  kind: action
  params: []

- id: disable_remote_power_on
  label: Disable RS-232 Remote Power On
  kind: action
  params: []

- id: set_power_off_control_mode
  label: Set Power Off Control Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [ac_only, all]
- id: bttn_digit_0
  label: Button Simulate BTTN1000 Digit 0
  kind: action
  params: []

- id: bttn_digit_1
  label: Button Simulate BTTN1001 Digit 1
  kind: action
  params: []

- id: bttn_digit_2
  label: Button Simulate BTTN1002 Digit 2
  kind: action
  params: []

- id: bttn_digit_3
  label: Button Simulate BTTN1003 Digit 3
  kind: action
  params: []

- id: bttn_digit_4
  label: Button Simulate BTTN1004 Digit 4
  kind: action
  params: []

- id: bttn_digit_5
  label: Button Simulate BTTN1005 Digit 5
  kind: action
  params: []

- id: bttn_digit_6
  label: Button Simulate BTTN1006 Digit 6
  kind: action
  params: []

- id: bttn_digit_7
  label: Button Simulate BTTN1007 Digit 7
  kind: action
  params: []

- id: bttn_digit_8
  label: Button Simulate BTTN1008 Digit 8
  kind: action
  params: []

- id: bttn_digit_9
  label: Button Simulate BTTN1009 Digit 9
  kind: action
  params: []

- id: bttn_dash
  label: Button Simulate BTTN1010 Dash
  kind: action
  params: []

- id: bttn_power
  label: Button Simulate BTTN1012 Power
  kind: action
  params: []

- id: bttn_frw
  label: Button Simulate BTTN1015 FRW
  kind: action
  params: []

- id: bttn_play
  label: Button Simulate BTTN1016 Play
  kind: action
  params: []

- id: bttn_ffw
  label: Button Simulate BTTN1017 FFW
  kind: action
  params: []

- id: bttn_pause
  label: Button Simulate BTTN1018 Pause
  kind: action
  params: []

- id: bttn_previous
  label: Button Simulate BTTN1019 Previous
  kind: action
  params: []

- id: bttn_stop
  label: Button Simulate BTTN1020 Stop
  kind: action
  params: []

- id: bttn_next
  label: Button Simulate BTTN1021 Next
  kind: action
  params: []

- id: bttn_himedia
  label: Button Simulate BTTN1023 HiMedia Media Player
  kind: action
  params: []

- id: bttn_sleep
  label: Button Simulate BTTN1024 Sleep
  kind: action
  params: []

- id: bttn_cc
  label: Button Simulate BTTN1027 CC
  kind: action
  params: []

- id: bttn_mute
  label: Button Simulate BTTN1031 Mute
  kind: action
  params: []

- id: bttn_vol_down
  label: Button Simulate BTTN1032 Volume Down
  kind: action
  params: []

- id: bttn_vol_up
  label: Button Simulate BTTN1033 Volume Up
  kind: action
  params: []

- id: bttn_ch_up
  label: Button Simulate BTTN1034 Channel Up
  kind: action
  params: []

- id: bttn_ch_down
  label: Button Simulate BTTN1035 Channel Down
  kind: action
  params: []

- id: bttn_input
  label: Button Simulate BTTN1036 Input
  kind: action
  params: []

- id: bttn_menu
  label: Button Simulate BTTN1038 Menu
  kind: action
  params: []

- id: bttn_hismart
  label: Button Simulate BTTN1039 Connected Home HiSmart
  kind: action
  params: []

- id: bttn_ok
  label: Button Simulate BTTN1040 OK Enter
  kind: action
  params: []

- id: bttn_up
  label: Button Simulate BTTN1041 Up Arrow
  kind: action
  params: []

- id: bttn_down
  label: Button Simulate BTTN1042 Down Arrow
  kind: action
  params: []

- id: bttn_left
  label: Button Simulate BTTN1043 Left Arrow
  kind: action
  params: []

- id: bttn_right
  label: Button Simulate BTTN1044 Right Arrow
  kind: action
  params: []

- id: bttn_back
  label: Button Simulate BTTN1045 Back
  kind: action
  params: []

- id: bttn_exit
  label: Button Simulate BTTN1046 Exit
  kind: action
  params: []

- id: bttn_red
  label: Button Simulate BTTN1050 Red Button
  kind: action
  params: []

- id: bttn_green
  label: Button Simulate BTTN1051 Green Button
  kind: action
  params: []

- id: bttn_blue
  label: Button Simulate BTTN1052 Blue Button
  kind: action
  params: []

- id: bttn_yellow
  label: Button Simulate BTTN1053 Yellow Button
  kind: action
  params: []

- id: bttn_mts_sap
  label: Button Simulate BTTN1054 MTS SAP
  kind: action
  params: []

- id: bttn_live_tv
  label: Button Simulate BTTN1055 Live TV
  kind: action
  params: []

- id: set_tv_speaker_mode
  label: Set TV Speaker Mode SPKM
  kind: action
  params:
    - name: mode
      type: enum
      values: [speaker, off, arc_first]

- id: set_b2b_mode
  label: Set B2B Function Mode B2BM
  kind: action
  params:
    - name: state
      type: enum
      values: [enable, disable]

- id: set_usb_behavior
  label: Set USB Behavior USBM
  kind: action
  params:
    - name: mode
      type: enum
      values: [home, b2b]

- id: set_pixel_shifting
  label: Set Pixel Shifting PSHF
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off]

- id: set_max_volume_level
  label: Set Volume Range MAVL
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, standby]

- id: current_input
  type: enum
  values:
    - tv
    - av
    - component
    - hdmi1
    - hdmi2
    - hdmi3
    - hdmi4
    - vga

- id: current_picture_mode
  type: enum
  values:
    - standard
    - vivid
    - energy_saving
    - theater
    - game
    - sport

- id: brightness_value
  type: integer
  range: [0, 100]

- id: contrast_value
  type: integer
  range: [0, 100]

- id: color_saturation_value
  type: integer
  range: [0, 100]

- id: tint_value
  type: integer
  range: [0, 100]

- id: sharpness_value
  type: integer
  range: [0, 20]

- id: current_aspect_ratio
  type: enum
  values:
    - auto
    - normal
    - zoom
    - wide
    - direct
    - 1to1
    - panoramic
    - cinema

- id: overscan_state
  type: enum
  values: [on, off]

- id: current_color_temp
  type: enum
  values:
    - high
    - middle
    - mid_low
    - low

- id: backlight_value
  type: integer
  range: [0, 100]

- id: current_sound_mode
  type: enum
  values:
    - standard
    - theater
    - music
    - speech
    - late_night

- id: volume_value
  type: integer
  range: [0, 100]

- id: mute_state
  type: enum
  values: [on, off]

- id: tv_speaker_state
  type: enum
  values: [on, off]

- id: tuner_mode
  type: enum
  values: [antenna, cable]

- id: caption_control_mode
  type: enum
  values: [off, on, on_when_mute]

- id: osd_language
  type: enum
  values: [english, spanish, french]

- id: standby_led_state
  type: enum
  values: [on, off]

- id: volume_control_mode
  type: enum
  values: [locked, last_volume, ac_reset, standby_reset]

- id: volume_locked_level
  type: integer
  range: [0, 100]

- id: remote_key_mode
  type: enum
  values: [enable, disable, partial]

- id: panel_key_mode
  type: enum
  values: [enable, disable]

- id: menu_access_state
  type: enum
  values: [enable, disable]

- id: av_setting_menu_state
  type: enum
  values: [disable, enable]

- id: osd_mode_state
  type: enum
  values: [enable, disable]

- id: input_mode_lock_mode
  type: enum
  values: [locked, selectable, ac_reset, standby_reset]

- id: power_on_input_source
  type: enum
  values:
    - last
    - air
    - av
    - component
    - hdmi1
    - hdmi2
    - hdmi3
    - hdmi4
    - vga

- id: remote_power_on_enabled
  type: boolean

- id: power_off_control_mode
  type: enum
  values: [ac_only, all]
```

## Variables
```yaml
volume_range:
  type: integer
  range: [0, 100]
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```
<!-- UNRESOLVED: power-on sequencing via RS-232 requires RS-232 Remote Power On setting to be enabled in Custom Install menu; source does not specify voltage/current/power specs -->

## Notes
Protocol is case-sensitive ASCII. Command frame: `[S|Q][CLIENT ID][COMMAND][DATA][CHECKSUM][CR]`. Client ID for Smart TV is last 3 bytes of Ethernet MAC address; broadcast uses `ALL`. Acknowledgements: `OKAY`, `EROR`, `WAIT`. Checksum is 8-bit ensuring full frame sums to zero. RS-232 port must be enabled via Custom Install menu (7-3-1-0 remote code sequence) before serial control works. Power-on via RS-232 requires `Power On Command` setting enabled in the same menu. No authentication, no login required.

## Provenance

```yaml
source_domains:
  - hisense-b2b.com
  - assets.hisense-usa.com
source_urls:
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=5"
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
retrieved_at: 2026-04-30T04:31:43.572Z
last_checked_at: 2026-05-14T18:17:16.358Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:16.358Z
matched_actions: 74
action_count: 87
confidence: high
summary: "All 74 spec actions matched to distinct source RS-232 commands with correct transport parameters (9600 baud, 8N1, no flow control)."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
