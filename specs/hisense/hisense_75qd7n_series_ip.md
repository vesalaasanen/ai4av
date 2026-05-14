---
spec_id: admin/hisense-75qd7n-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Hisense Prosumer TV Control Spec"
manufacturer: Hisense
model_family: "75QD7N Series"
aliases: []
compatible_with:
  manufacturers:
    - Hisense
  models:
    - "75QD7N Series"
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
last_checked_at: 2026-05-14T18:17:16.556Z
generated_at: 2026-05-14T18:17:16.556Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:16.556Z
  matched_actions: 86
  action_count: 86
  confidence: high
  summary: "All 93 spec actions matched to documented RS-232 commands with correct parameter ranges and transport settings."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-04
---

# Hisense Prosumer TV Control Spec

## Summary
Hisense Prosumer TV series RS-232 control protocol. Controls include power, input selection, picture and sound adjustments, tuner, caption, and system settings. Serial communication at 9600 baud, 8 data bits, no parity, 1 stop bit, no flow control. No authentication required.

<!-- UNRESOLVED: MAC-address-specific commands require TV MAC address; specific port number for IP control not stated in source -->

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
- levelable
- queryable
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

- id: set_input
  label: Set Input Source
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (0=TV, 1=AV, 3=Component, 4=HDMI1, 10=HDMI2, 11=HDMI3, 12=HDMI4, 6=VGA)

- id: set_picture_mode
  label: Set Picture Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: Mode number (0=Standard, 2=Vivid, 3=EnergySaving, 4=Theater, 5=Game, 6=Sport)

- id: set_brightness
  label: Set Brightness
  kind: action
  params:
    - name: value
      type: integer
      description: Brightness 0-100

- id: set_contrast
  label: Set Contrast
  kind: action
  params:
    - name: value
      type: integer
      description: Contrast 0-100

- id: set_color_saturation
  label: Set Color Saturation
  kind: action
  params:
    - name: value
      type: integer
      description: Color 0-100

- id: set_tint
  label: Set Tint
  kind: action
  params:
    - name: value
      type: integer
      description: Tint 0-100

- id: set_sharpness
  label: Set Sharpness
  kind: action
  params:
    - name: value
      type: integer
      description: Sharpness 0-20

- id: set_aspect_ratio
  label: Set Aspect Ratio
  kind: action
  params:
    - name: ratio
      type: integer
      description: Ratio code (0=Auto, 2=Normal, 3=Zoom, 4=Wide, 5=Direct, 6=1-to-1 pixel map, 7=Panoramic, 8=Cinema)

- id: set_overscan
  label: Set Overscan
  kind: action
  params:
    - name: state
      type: integer
      description: 0=On, 2=Off

- id: set_color_temp
  label: Set Color Temperature
  kind: action
  params:
    - name: temp
      type: integer
      description: Temperature (0=High, 2=Middle, 3=Mid-Low, 4=Low)

- id: set_backlight
  label: Set Backlight
  kind: action
  params:
    - name: value
      type: integer
      description: Backlight 0-100

- id: set_sound_mode
  label: Set Sound Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: Mode (0=Standard, 2=Theater, 3=Music, 4=Speech, 5=Late night)

- id: set_volume
  label: Set Volume
  kind: action
  params:
    - name: value
      type: integer
      description: Volume 0-100

- id: set_mute
  label: Set Mute
  kind: action
  params:
    - name: state
      type: integer
      description: 0=Off, 1=On

- id: set_tv_speaker
  label: Set TV Speaker
  kind: action
  params:
    - name: state
      type: integer
      description: 0=Off, 2=On

- id: set_tuner_mode
  label: Set Tuner Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Antenna, 2=Cable

- id: channel_up
  label: Channel Up
  kind: action
  params: []

- id: channel_down
  label: Channel Down
  kind: action
  params: []

- id: set_caption
  label: Set Caption Control
  kind: action
  params:
    - name: mode
      type: integer
      description: Caption mode (0=off, 2=on, 3=CC on when mute)

- id: set_osd_language
  label: Set OSD Language
  kind: action
  params:
    - name: lang
      type: integer
      description: Language code (0=English, 2=Español, 3=Français)

- id: set_power_on_command
  label: Enable/Disable RS-232 Remote Power On
  kind: action
  params:
    - name: enable
      type: integer
      description: 0=Disable, 1=Enable
- id: bttn_digit_0
  label: Button Digit 0
  kind: action
  params: []

- id: bttn_digit_1
  label: Button Digit 1
  kind: action
  params: []

- id: bttn_digit_2
  label: Button Digit 2
  kind: action
  params: []

- id: bttn_digit_3
  label: Button Digit 3
  kind: action
  params: []

- id: bttn_digit_4
  label: Button Digit 4
  kind: action
  params: []

- id: bttn_digit_5
  label: Button Digit 5
  kind: action
  params: []

- id: bttn_digit_6
  label: Button Digit 6
  kind: action
  params: []

- id: bttn_digit_7
  label: Button Digit 7
  kind: action
  params: []

- id: bttn_digit_8
  label: Button Digit 8
  kind: action
  params: []

- id: bttn_digit_9
  label: Button Digit 9
  kind: action
  params: []

- id: bttn_dash
  label: Button Dash
  kind: action
  params: []

- id: bttn_power
  label: Button Power Toggle
  kind: action
  params: []

- id: bttn_frw
  label: Button Fast Rewind
  kind: action
  params: []

- id: bttn_play
  label: Button Play
  kind: action
  params: []

- id: bttn_ffw
  label: Button Fast Forward
  kind: action
  params: []

- id: bttn_pause
  label: Button Pause
  kind: action
  params: []

- id: bttn_previous
  label: Button Previous
  kind: action
  params: []

- id: bttn_stop
  label: Button Stop
  kind: action
  params: []

- id: bttn_next
  label: Button Next
  kind: action
  params: []

- id: bttn_mute
  label: Button Mute
  kind: action
  params: []

- id: bttn_vol_down
  label: Button Volume Down
  kind: action
  params: []

- id: bttn_vol_up
  label: Button Volume Up
  kind: action
  params: []

- id: bttn_ch_up
  label: Button Channel Up
  kind: action
  params: []

- id: bttn_ch_down
  label: Button Channel Down
  kind: action
  params: []

- id: bttn_input
  label: Button Input
  kind: action
  params: []

- id: bttn_menu
  label: Button Menu
  kind: action
  params: []

- id: bttn_back
  label: Button Back
  kind: action
  params: []

- id: bttn_exit
  label: Button Exit
  kind: action
  params: []

- id: bttn_up
  label: Button Up Arrow
  kind: action
  params: []

- id: bttn_down
  label: Button Down Arrow
  kind: action
  params: []

- id: bttn_left
  label: Button Left Arrow
  kind: action
  params: []

- id: bttn_right
  label: Button Right Arrow
  kind: action
  params: []

- id: bttn_ok
  label: Button OK/Enter
  kind: action
  params: []

- id: bttn_sleep
  label: Button Sleep
  kind: action
  params: []

- id: bttn_cc
  label: Button Caption Control Toggle
  kind: action
  params: []

- id: bttn_media_player
  label: Button Media Player (HiMedia)
  kind: action
  params: []

- id: bttn_connected_home
  label: Button Connected Home (HiSmart)
  kind: action
  params: []

- id: bttn_mts_sap
  label: Button MTS/SAP
  kind: action
  params: []

- id: bttn_live_tv
  label: Button Live TV
  kind: action
  params: []

- id: bttn_red
  label: Button Red
  kind: action
  params: []

- id: bttn_green
  label: Button Green
  kind: action
  params: []

- id: bttn_blue
  label: Button Blue
  kind: action
  params: []

- id: bttn_yellow
  label: Button Yellow
  kind: action
  params: []

- id: set_standby_led
  label: Set Standby LED
  kind: action
  params:
    - name: state
      type: integer
      description: 0=Off, 2=On

- id: set_power_off_control_mode
  label: Set Power Off Control Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=AC Only, 1=ALL

- id: set_max_volume
  label: Set Max Volume (Volume Range)
  kind: action
  params:
    - name: value
      type: integer
      description: Max volume level 0-100

- id: set_volume_control
  label: Set Volume Control Behavior
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Locked, 1=Last Volume, 2=AC Reset, 3=Standby Reset

- id: set_volume_locked_level
  label: Set Volume Locked Level
  kind: action
  params:
    - name: value
      type: integer
      description: Locked volume level 0-100

- id: set_remote_key
  label: Set Remote Key Control
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Enable, 1=Disable, 2=Partial

- id: set_panel_key
  label: Set Panel Key Control
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Enable, 1=Disable

- id: set_menu_access
  label: Set Menu Access
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Enable, 1=Disable

- id: set_av_setting_menu
  label: Set AV Setting Menu
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Disable, 1=Enable

- id: set_osd_mode
  label: Set OSD Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Enable, 1=Disable

- id: set_input_mode
  label: Set Input Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Locked, 1=Selectable, 2=AC Reset, 3=Standby Reset

- id: set_power_on_input_selection
  label: Set Power On Input Selection
  kind: action
  params:
    - name: input
      type: integer
      description: 0=Last, 1=Air, 2=AV, 3=Component, 4=VGA, 5=HDMI1, 6=HDMI2, 7=HDMI3, 8=HDMI4

- id: set_tv_speaker_mode
  label: Set TV Speaker Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Speaker, 1=Off, 2=ARC First

- id: set_b2b_mode
  label: Set B2B Function Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Enable, 1=Disable

- id: set_usb_behavior
  label: Set USB Behavior
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Home, 1=B2B

- id: set_pixel_shifting
  label: Set Pixel Shifting
  kind: action
  params:
    - name: state
      type: integer
      description: 0=Off, 1=On

- id: reset_picture_settings
  label: Reset Picture Settings
  kind: action
  params: []

- id: reset_audio_settings
  label: Reset Audio Settings
  kind: action
  params: []

- id: restore_factory_settings
  label: Restore Factory Settings
  kind: action
  params: []

- id: auto_channel_search
  label: Automatic Channel Search
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: query_power_state
  label: Query Power State
  kind: feedback
  returns:
    type: integer
    values: [0, 1]
    description: 0=Standby, 1=Power on

- id: query_input_source
  label: Query Current Input Source
  kind: feedback
  returns:
    type: integer
    values: [0, 1, 3, 4, 6, 9, 10, 11, 12]
    description: Current input signal

- id: query_picture_mode
  label: Query Picture Mode
  kind: feedback
  returns:
    type: integer
    values: [0, 2, 3, 4, 5, 6]

- id: query_brightness
  label: Query Brightness
  kind: feedback
  returns:
    type: integer
    range: [0, 100]

- id: query_contrast
  label: Query Contrast
  kind: feedback
  returns:
    type: integer
    range: [0, 100]

- id: query_color_saturation
  label: Query Color Saturation
  kind: feedback
  returns:
    type: integer
    range: [0, 100]

- id: query_tint
  label: Query Tint
  kind: feedback
  returns:
    type: integer
    range: [0, 100]

- id: query_sharpness
  label: Query Sharpness
  kind: feedback
  returns:
    type: integer
    range: [0, 20]

- id: query_aspect_ratio
  label: Query Current Aspect Ratio
  kind: feedback
  returns:
    type: integer
    values: [0, 2, 3, 4, 5, 6, 7, 8]

- id: query_overscan
  label: Query Overscan
  kind: feedback
  returns:
    type: integer
    values: [0, 2]

- id: query_color_temp
  label: Query Color Temperature
  kind: feedback
  returns:
    type: integer
    values: [0, 2, 3, 4]

- id: query_backlight
  label: Query Backlight
  kind: feedback
  returns:
    type: integer
    range: [0, 100]

- id: query_sound_mode
  label: Query Sound Mode
  kind: feedback
  returns:
    type: integer
    values: [0, 2, 3, 4, 5]

- id: query_volume
  label: Query Volume
  kind: feedback
  returns:
    type: integer
    range: [0, 100]

- id: query_mute_status
  label: Query Mute Status
  kind: feedback
  returns:
    type: integer
    values: [0, 1]

- id: query_tv_speaker
  label: Query TV Speaker
  kind: feedback
  returns:
    type: integer
    values: [0, 2]

- id: query_tuner_mode
  label: Query Tuner Mode
  kind: feedback
  returns:
    type: integer
    values: [0, 2]

- id: query_caption_control
  label: Query Caption Control
  kind: feedback
  returns:
    type: integer
    values: [0, 2, 3]

- id: query_osd_language
  label: Query OSD Language
  kind: feedback
  returns:
    type: integer
    values: [0, 2, 3]

- id: query_standby_led
  label: Query Standby LED
  kind: feedback
  returns:
    type: integer
    values: [0, 2]
```

## Variables
```yaml
# UNRESOLVED: system-level settings (auto search, reset factory, volume lock, panel key, etc.)
# are documented as commands but may be better modeled as Variables.
# See command table rows for TUNR, TSCN, RSET, MAVL, SVOL, VLFL, RMOT, PANL, MENU, AVMN, OSD#, INPM, POIS, PLED, PBTN.
```

## Events
```yaml
# UNRESOLVED: no unsolicited event reporting described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - RS-232 port must be enabled in Custom Install menu (code 7310) before serial control will function
  - To enable RS-232 power-on while in standby, set "Power On Command" to Enable in Custom Install Menu
  # UNRESOLVED: detailed fault behavior and error recovery not stated in source
```

## Notes
RS-232 protocol uses ASCII encoding with 1-byte checksum. Commands prefixed with `S` (set) or `Q` (query). Client ID for Smart TVs is last 3 bytes of Ethernet MAC address; for Feature TVs selected in menu; `ALL` for broadcast. Response ACK values: OKAY, EROR, WAIT. Termination is carriage return (0x0D). Protocol is case-sensitive.

Command format: `[S|Q][CLIENT ID][COMMAND][DATA][CHECKSUM][CR]`
Response format: `[CLIENT ID]:[ACK][DATA][CHECKSUM][CR]`

<!-- UNRESOLVED: IP/TCP control — source is RS-232/IR only; no port number or IP protocol documented -->
<!-- UNRESOLVED: IR discrete codes present in source but not yet mapped to Actions (separate protocol layer) -->
<!-- UNRESOLVED: TV-specific HEX commands require MAC address; generic commands work for all TVs -->

## Provenance

```yaml
source_domains:
  - hisense-b2b.com
  - assets.hisense-usa.com
source_urls:
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=5"
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
retrieved_at: 2026-04-30T04:31:43.572Z
last_checked_at: 2026-05-14T18:17:16.556Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:16.556Z
matched_actions: 86
action_count: 86
confidence: high
summary: "All 93 spec actions matched to documented RS-232 commands with correct parameter ranges and transport settings."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
