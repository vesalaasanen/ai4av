---
spec_id: admin/hisense-prosumer_tv
schema_version: ai4av-public-spec-v1
revision: 1
title: "HiSense Prosumer TV Control Spec"
manufacturer: HiSense
model_family: "HiSense Prosumer TV"
aliases: []
compatible_with:
  manufacturers:
    - HiSense
  models:
    - "HiSense Prosumer TV"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - hisense-b2b.com
  - assets.hisense-usa.com
retrieved_at: 2026-04-30T04:31:43.572Z
last_checked_at: 2026-05-01T07:34:56.676Z
generated_at: 2026-05-01T07:34:56.676Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-01T07:34:56.676Z
  matched_actions: 89
  action_count: 89
  confidence: high
  summary: "All 89 spec actions matched with literal counterparts; transport parameters verified verbatim."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# HiSense Prosumer TV Control Spec

## Summary
Prosumer TV controlled via RS-232C serial (9600 8N1, ASCII protocol) and discrete IR. Supports broadcast (ALL) addressing via MAC address suffix, power on/off from standby, input routing, picture/sound adjustments, aspect ratio, tuner, and panel/remote lock. No authentication required.

<!-- UNRESOLVED: TCP/IP control not present in source — document covers RS-232 and IR only. -->

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
- id: power_on
  label: Power On
  kind: action
  params: []
- id: power_off
  label: Power Off
  kind: action
  params: []
- id: power_standby
  label: Set Standby
  kind: action
  params: []
- id: enable_remote_power_on
  label: Enable RS-232 Remote Power On
  kind: action
  params: []
- id: disable_remote_power_on
  label: Disable RS-232 Remote Power On
  kind: action
  params: []

- id: set_input
  label: Set Input Source
  kind: action
  params:
    - name: source
      type: integer
      description: |
        0 = TV, 1 = AV, 3 = Component, 4 = AV, 6 = VGA, 9 = HDMI1,
        10 = HDMI2, 11 = HDMI3, 12 = HDMI4
- id: cycle_input
  label: Cycle Input
  kind: action
  params: []

- id: set_picture_mode
  label: Set Picture Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: |
        0 = Standard, 2 = Vivid, 3 = EnergySaving, 4 = Theater,
        5 = Game, 6 = Sport
- id: set_brightness
  label: Set Brightness
  kind: action
  params:
    - name: value
      type: integer
      description: 0-100
- id: set_contrast
  label: Set Contrast
  kind: action
  params:
    - name: value
      type: integer
      description: 0-100
- id: set_color_saturation
  label: Set Color Saturation
  kind: action
  params:
    - name: value
      type: integer
      description: 0-100
- id: set_tint
  label: Set Tint
  kind: action
  params:
    - name: value
      type: integer
      description: 0-100
- id: set_sharpness
  label: Set Sharpness
  kind: action
  params:
    name: value
    type: integer
    description: 0-20
- id: set_color_temp
  label: Set Color Temperature
  kind: action
  params:
    - name: temp
      type: integer
      description: 0 = High, 2 = Middle, 3 = Mid-Low, 4 = Low
- id: set_backlight
  label: Set Backlight
  kind: action
  params:
    - name: value
      type: integer
      description: 0-100
- id: reset_picture_settings
  label: Reset Picture Settings
  kind: action
  params: []
- id: set_overscan
  label: Set Overscan
  kind: action
  params:
    - name: state
      type: integer
      description: 0 = On, 2 = Off

- id: set_sound_mode
  label: Set Sound Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: |
        0 = Standard, 2 = Theater, 3 = Music, 4 = Speech, 5 = Late night
- id: set_volume
  label: Set Volume
  kind: action
  params:
    - name: value
      type: integer
      description: 0-100
- id: set_mute
  label: Set Mute
  kind: action
  params:
    - name: state
      type: integer
      description: 0 = Off, 1 = On
- id: set_tv_speaker
  label: Set TV Speaker
  kind: action
  params:
    - name: state
      type: integer
      description: 0 = Off, 2 = On
- id: reset_audio_settings
  label: Reset Audio Settings
  kind: action
  params: []

- id: set_aspect_ratio
  label: Set Aspect Ratio
  kind: action
  params:
    - name: ratio
      type: integer
      description: |
        0 = Auto, 2 = Normal, 3 = Zoom, 4 = Wide, 5 = Direct,
        6 = 1-to-1 pixel map, 7 = Panoramic, 8 = Cinema

- id: channel_up
  label: Channel Up
  kind: action
  params: []
- id: channel_down
  label: Channel Down
  kind: action
  params: []
- id: set_tuner_mode
  label: Set Tuner Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 0 = Antenna, 2 = Cable
- id: auto_search
  label: Automatic Search
  kind: action
  params: []

- id: set_osd_language
  label: Set OSD Language
  kind: action
  params:
    - name: lang
      type: integer
      description: 0 = English, 2 = Español, 3 = Français
- id: set_caption_control
  label: Set Caption Control
  kind: action
  params:
    - name: mode
      type: integer
      description: 0 = Off, 2 = On, 3 = CC on when mute
- id: set_standby_led
  label: Set Standby LED
  kind: action
  params:
    - name: state
      type: integer
      description: 0 = Off, 2 = On
- id: set_power_off_control_mode
  label: Set Power Off Control Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 0 = AC ONLY, 1 = ALL
- id: set_volume_control
  label: Set Volume Control
  kind: action
  params:
    - name: mode
      type: integer
      description: 0 = Locked, 1 = Last Volume, 2 = AC Reset, 3 = Standby Reset
- id: set_volume_locked_level
  label: Set Volume Locked Level
  kind: action
  params:
    - name: value
      type: integer
      description: 0-100
- id: set_remote_key
  label: Set Remote Key
  kind: action
  params:
    - name: mode
      type: integer
      description: 0 = Enable, 1 = Disable, 2 = Partial
- id: set_panel_key
  label: Set Panel Key
  kind: action
  params:
    - name: state
      type: integer
      description: 0 = Enable, 1 = Disable
- id: set_menu_access
  label: Set Menu Access
  kind: action
  params:
    - name: state
      type: integer
      description: 0 = Enable, 1 = Disable
- id: set_av_setting_menu
  label: Set AV Setting Menu
  kind: action
  params:
    - name: state
      type: integer
      description: 0 = Disable, 1 = Enable
- id: set_osd_mode
  label: Set OSD Mode
  kind: action
  params:
    - name: state
      type: integer
      description: 0 = Enable, 1 = Disable
- id: set_input_mode
  label: Set Input Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: |
        0 = Locked, 1 = Selectable, 2 = AC Reset, 3 = Standby Reset
- id: set_power_on_input
  label: Set Power On Input Select
  kind: action
  params:
    - name: source
      type: integer
      description: |
        0 = Last, 1 = Air, 2 = AV, 3 = Component,
        9 = HDMI1, 10 = HDMI2, 11 = HDMI3, 12 = HDMI4, 13 = VGA
- id: reset_factory_settings
  label: Reset Factory Settings
  kind: action
  params: []

# Remote button simulator (BTTN) - key repeats
- id: btn_ch_up
  label: CH+
  kind: action
  params: []
- id: btn_ch_down
  label: CH-
  kind: action
  params: []
- id: btn_vol_up
  label: VOL+
  kind: action
  params: []
- id: btn_vol_down
  label: VOL-
  kind: action
  params: []
- id: btn_power
  label: POWER button
  kind: action
  params: []
- id: btn_mute
  label: MUTE button
  kind: action
  params: []
- id: btn_input
  label: INPUT button
  kind: action
  params: []
- id: btn_menu
  label: MENU button
  kind: action
  params: []
- id: btn_exit
  label: EXIT button
  kind: action
  params: []
- id: btn_home
  label: HOME button
  kind: action
  params: []
- id: btn_back
  label: BACK button
  kind: action
  params: []
- id: btn_up
  label: UP arrow
  kind: action
  params: []
- id: btn_down
  label: DOWN arrow
  kind: action
  params: []
- id: btn_left
  label: LEFT arrow
  kind: action
  params: []
- id: btn_right
  label: RIGHT arrow
  kind: action
  params: []
- id: btn_ok
  label: OK/ENTER
  kind: action
  params: []
- id: btn_0
  label: Digit 0
  kind: action
  params: []
- id: btn_1
  label: Digit 1
  kind: action
  params: []
- id: btn_2
  label: Digit 2
  kind: action
  params: []
- id: btn_3
  label: Digit 3
  kind: action
  params: []
- id: btn_4
  label: Digit 4
  kind: action
  params: []
- id: btn_5
  label: Digit 5
  kind: action
  params: []
- id: btn_6
  label: Digit 6
  kind: action
  params: []
- id: btn_7
  label: Digit 7
  kind: action
  params: []
- id: btn_8
  label: Digit 8
  kind: action
  params: []
- id: btn_9
  label: Digit 9
  kind: action
  params: []
- id: btn_dash
  label: DASH button
  kind: action
  params: []
- id: btn_play
  label: PLAY
  kind: action
  params: []
- id: btn_pause
  label: PAUSE
  kind: action
  params: []
- id: btn_stop
  label: STOP
  kind: action
  params: []
- id: btn_ffw
  label: FFW >>
  kind: action
  params: []
- id: btn_frw
  label: FRW <<
  kind: action
  params: []
- id: btn_previous
  label: PREVIOUS
  kind: action
  params: []
- id: btn_next
  label: NEXT >>
  kind: action
  params: []
- id: btn_cc
  label: CC button
  kind: action
  params: []
- id: btn_sleep
  label: SLEEP
  kind: action
  params: []
- id: btn_info
  label: INFO/DISPLAY
  kind: action
  params: []
- id: btn_guide
  label: Guide
  kind: action
  params: []
- id: btn_freeze
  label: Freeze
  kind: action
  params: []
- id: btn_pip
  label: PIP toggle
  kind: action
  params: []
- id: btn_pip_input
  label: PIP INPUT
  kind: action
  params: []
- id: btn_pip_swap
  label: PIP SWAP
  kind: action
  params: []
- id: btn_pip_position
  label: PIP POSITION
  kind: action
  params: []
- id: btn_pip_size
  label: PIP SIZE
  kind: action
  params: []
- id: btn_channel_list
  label: Channel List
  kind: action
  params: []
- id: btn_fav_channel
  label: Fav Channel
  kind: action
  params: []
- id: btn_red
  label: Red button
  kind: action
  params: []
- id: btn_green
  label: Green button
  kind: action
  params: []
- id: btn_yellow
  label: Yellow button
  kind: action
  params: []
- id: btn_blue
  label: Blue button
  kind: action
  params: []
- id: btn_tools
  label: Tools (Second Menu)
  kind: action
  params: []
- id: btn_picture_mode
  label: Picture Mode toggle
  kind: action
  params: []
- id: btn_sound_mode
  label: Sound Mode toggle
  kind: action
  params: []
- id: btn_aspect_ratio_wide
  label: Aspect Ratio 16:9
  kind: action
  params: []
- id: btn_aspect_ratio_normal
  label: Aspect Ratio 4:3
  kind: action
  params: []
- id: btn_aspect_ratio_cinema
  label: Aspect Ratio Cinema
  kind: action
  params: []
- id: btn_aspect_ratio_panorama
  label: Aspect Ratio Panorama
  kind: action
  params: []
- id: btn_aspect_ratio_zoom
  label: Aspect Ratio Zoom
  kind: action
  params: []
- id: btn_mts_sap
  label: MTS/SAP
  kind: action
  params: []
- id: btn_live_tv
  label: Live TV
  kind: action
  params: []
- id: btn_media_player
  label: Media Player
  kind: action
  params: []
- id: btn_connected_home
  label: Connected Home
  kind: action
  params: []
- id: set_speaker_mode
  label: Set TV Speaker Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 0 = Speaker, 1 = Off, 2 = ARC First
- id: set_b2b_mode
  label: Set B2B Function Mode
  kind: action
  params:
    - name: state
      type: integer
      description: 0 = Enable, 1 = Disable
- id: set_usb_behavior
  label: Set USB Behavior
  kind: action
  params:
    - name: mode
      type: integer
      description: 0 = Home, 1 = B2B
- id: set_pixel_shifting
  label: Set Pixel Shifting
  kind: action
  params:
    - name: state
      type: integer
      description: 0 = Off, 1 = On
- id: set_max_volume
  label: Set Volume Range (Max Volume Level)
  kind: action
  params:
    - name: value
      type: integer
      description: 0-100
```

## Feedbacks
```yaml
# Responses: ColonACKDATA4BytesChecksumCr
# ColonACK is one of: OKAY, EROR, WAIT
# OKAY example: 5FA:OKAY####[0x4A][0x0D]
# WAIT example: 5FA:WAIT####[0x49][0x0D]
# EROR example: [document does not give explicit EROR example]

- id: ack
  type: enum
  values:
    - OKAY
    - WAIT
    - EROR
  description: Acknowledgement response from TV

- id: power_state
  type: enum
  values:
    - "0"
    - "1"
  description: "0 = Standby, 1 = Power on"

- id: current_input
  type: integer
  description: |
    0 = TV, 1 = AV, 3 = Component, 4 = AV, 6 = VGA,
    9 = HDMI1, 10 = HDMI2, 11 = HDMI3, 12 = HDMI4

- id: picture_mode
  type: integer
  description: |
    0 = Standard, 2 = Vivid, 3 = EnergySaving, 4 = Theater,
    5 = Game, 6 = Sport

- id: brightness_value
  type: integer
  description: 0-100

- id: contrast_value
  type: integer
  description: 0-100

- id: color_saturation_value
  type: integer
  description: 0-100

- id: tint_value
  type: integer
  description: 0-100

- id: sharpness_value
  type: integer
  description: 0-20

- id: color_temp
  type: integer
  description: 0 = High, 2 = Middle, 3 = Mid-Low, 4 = Low

- id: backlight_value
  type: integer
  description: 0-100

- id: overscan_state
  type: integer
  description: 0 = On, 2 = Off

- id: aspect_ratio
  type: integer
  description: |
    0 = Auto, 2 = Normal, 3 = Zoom, 4 = Wide, 5 = Direct,
    6 = 1-to-1 pixel map, 7 = Panoramic, 8 = Cinema

- id: sound_mode
  type: integer
  description: |
    0 = Standard, 2 = Theater, 3 = Music, 4 = Speech, 5 = Late night

- id: volume_value
  type: integer
  description: 0-100

- id: mute_state
  type: integer
  description: 0 = Not muted, 1 = Muted

- id: tv_speaker_state
  type: integer
  description: 0 = Off, 2 = On

- id: tuner_mode
  type: integer
  description: 0 = Antenna, 2 = Cable

- id: osd_language
  type: integer
  description: 0 = English, 2 = Español, 3 = Français

- id: caption_control
  type: integer
  description: 0 = Off, 2 = On, 3 = CC on when mute

- id: standby_led_state
  type: integer
  description: 0 = Off, 2 = On

- id: power_off_control_mode
  type: integer
  description: 0 = AC ONLY, 1 = ALL

- id: volume_control_mode
  type: integer
  description: 0 = Locked, 1 = Last Volume, 2 = AC Reset, 3 = Standby Reset

- id: volume_locked_level
  type: integer
  description: 0-100

- id: remote_key_mode
  type: integer
  description: 0 = Enable, 1 = Disable, 2 = Partial

- id: panel_key_state
  type: integer
  description: 0 = Enable, 1 = Disable

- id: menu_access_state
  type: integer
  description: 0 = Enable, 1 = Disable

- id: av_setting_menu_state
  type: integer
  description: 0 = Disable, 1 = Enable

- id: osd_mode_state
  type: integer
  description: 0 = Enable, 1 = Disable

- id: input_mode
  type: integer
  description: 0 = Locked, 1 = Selectable, 2 = AC Reset, 3 = Standby Reset

- id: power_on_input_source
  type: integer
  description: |
    0 = Last, 1 = Air, 2 = AV, 3 = Component,
    9 = HDMI1, 10 = HDMI2, 11 = HDMI3, 12 = HDMI4, 13 = VGA

- id: volume_range
  type: integer
  description: 0-100

- id: remote_power_on_setting
  type: integer
  description: 0 = Disable RS-232 Remote Power On, 1 = Enable RS-232 Remote Power On
```

## Variables
```yaml
# All settable values are queryable - see Feedbacks section.
# UNRESOLVED: no standalone variables beyond the queryable states listed above
```

## Events
```yaml
# UNRESOLVED: document does not describe unsolicited event notifications from the TV.
# The TV only responds to commands; it does not主动上报状态.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: |
      RS-232 port must be enabled in Custom Install menu
      (access via Quick Settings > 7 3 1 0).
      Menu path: Quick Settings > 7 3 1 0 > Custom Installation > Enable.
  - description: |
      Power On Command setting must be set to Enable in Custom Install Menu
      if RS-232 power-on control from standby is required.
  - description: |
      POWRON command is not available when TV is in STANDBY mode -
      enabling it first allows power-on from standby via RS-232.
```

## Notes
Protocol is case-sensitive ASCII over RS-232C. Command format: `S[CLIENT_ID][COMMAND][DATA][CHECKSUM][CR]` (set) or `Q[CLIENT_ID][COMMAND]????[CHECKSUM][CR]` (query). Response: `[CLIENT_ID]:[ACK][DATA][CHECKSUM][CR]`. CLIENT_ID for Smart TV is last 3 bytes of Ethernet MAC; for Feature TV selected in TV menu; `ALL` for broadcast.

Generic HEX commands (53 41 4C 4C...) work on all TVs regardless of MAC. TV-specific commands use the last 3 MAC bytes as CLIENT_ID.

Checksum is 8-bit, computed so entire command string (including checksum byte) sums to zero.

IR discrete codes use Pronto CCF format; IR section lists complete hex codes per function.

<!-- UNRESOLVED: TCP/IP control — no such protocol in source document. -->
<!-- UNRESOLVED: specific model 5A53HUA not named in document — document covers Hisense Prosumer TV series broadly. -->
<!-- UNRESOLVED: firmware version not stated. -->
<!-- UNRESOLVED: no unsolicited event notifications described. -->

## Provenance

```yaml
source_domains:
  - hisense-b2b.com
  - assets.hisense-usa.com
retrieved_at: 2026-04-30T04:31:43.572Z
last_checked_at: 2026-05-01T07:34:56.676Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-01T07:34:56.676Z
matched_actions: 89
action_count: 89
confidence: high
summary: "All 89 spec actions matched with literal counterparts; transport parameters verified verbatim."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
