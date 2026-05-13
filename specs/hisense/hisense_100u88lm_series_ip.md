---
spec_id: admin/hisense-100u88lm-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "HiSense 100U88LM Series Control Spec"
manufacturer: HiSense
model_family: 100U88LM
aliases: []
compatible_with:
  manufacturers:
    - HiSense
  models:
    - 100U88LM
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - hisense-b2b.com
  - assets.hisense-usa.com
retrieved_at: 2026-04-30T04:31:43.572Z
last_checked_at: 2026-05-10T11:33:39.690Z
generated_at: 2026-05-10T11:33:39.690Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-10T11:33:39.690Z
  matched_actions: 45
  action_count: 45
  confidence: high
  summary: "All 45 spec actions found in source; baud rate, frame format, and command mnemonics verified as accurate."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-07
---

# HiSense 100U88LM Series Control Spec

## Summary
Prosumer TV supporting both RS-232 serial and discrete IR control. Serial protocol uses ASCII commands over RS-232C at 9600/8/N/1. IR section provides discrete hex codes for each input and function. Control supports power, input selection, picture/sound adjustment, aspect ratio, channel control, and mute. No authentication required for serial control.

<!-- UNRESOLVED: IP control protocol not documented in this source — this document covers only RS-232 and IR -->

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

# UNRESOLVED: TCP/IP control protocol not present in this source document
```

## Traits
```yaml
# inferred from command set:
# - powerable: POWER ON/OFF, STANDBY commands present
# - routable: INPT input selection, POIS power-on input select present
# - queryable: QUERY commands for all major parameters present
# - levelable: BRIT, CONT, COLR, TINT, SHRP, VOLM, BKLV present
```

## Actions
```yaml
# Power control
- id: power_on
  label: Power On
  kind: action
  params: []

- id: power_off
  label: Power Off (Standby)
  kind: action
  params: []

- id: power_on_command_enable
  label: Enable RS-232 Remote Power On
  kind: action
  params: []

- id: power_on_command_disable
  label: Disable RS-232 Remote Power On
  kind: action
  params: []

# Input selection
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

# Picture mode
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

# Picture adjustments
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

- id: set_backlight
  label: Set Backlight
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]

# Aspect ratio
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
        - pixel_map_1to1
        - panoramic
        - cinema

# Overscan
- id: set_overscan
  label: Set Overscan
  kind: action
  params:
    - name: state
      type: enum
      values:
        - on
        - off

# Color temperature
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

# Audio
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
      values:
        - on
        - off

- id: set_tv_speaker
  label: Set TV Speaker
  kind: action
  params:
    - name: state
      type: enum
      values:
        - on
        - off

# Channel control
- id: channel_up
  label: Channel Up
  kind: action
  params: []

- id: channel_down
  label: Channel Down
  kind: action
  params: []

# Caption control
- id: set_caption_mode
  label: Set Caption Mode
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - off
        - on
        - on_when_mute

# Reset
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

# OSD language
- id: set_osd_language
  label: Set OSD Language
  kind: action
  params:
    - name: lang
      type: enum
      values:
        - english
        - espanol
        - francais

# Tuner mode
- id: set_tuner_mode
  label: Set Tuner Mode
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - antenna
        - cable

# Tuner auto search
- id: automatic_search
  label: Automatic Search
  kind: action
  params: []

# Standby LED
- id: set_standby_led
  label: Set Standby LED
  kind: action
  params:
    - name: state
      type: enum
      values:
        - on
        - off

# Volume control lock
- id: set_volume_control
  label: Set Volume Control
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - locked
        - last_volume
        - ac_reset
        - standby_reset

# Remote key control
- id: set_remote_key_mode
  label: Set Remote Key Mode
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - enable
        - disable
        - partial

# Panel key control
- id: set_panel_key
  label: Set Panel Key
  kind: action
  params:
    - name: state
      type: enum
      values:
        - enable
        - disable

# Menu access
- id: set_menu_access
  label: Set Menu Access
  kind: action
  params:
    - name: state
      type: enum
      values:
        - enable
        - disable

# AV setting menu
- id: set_av_setting_menu
  label: Set AV Setting Menu
  kind: action
  params:
    - name: state
      type: enum
      values:
        - enable
        - disable

# OSD mode
- id: set_osd_mode
  label: Set OSD Mode
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - enable
        - disable

# Input mode (lock behavior at power-on)
- id: set_input_mode
  label: Set Input Mode
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - locked
        - selectable
        - ac_reset
        - standby_reset

# Power-on input selection
- id: set_power_on_input
  label: Set Power-On Input
  kind: action
  params:
    - name: source
      type: enum
      values:
        - last
        - air
        - av
        - component
        # additional inputs follow same pattern as set_input

# Power off control mode
- id: set_power_off_control_mode
  label: Set Power Off Control Mode
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - ac_only
        - all

# Volume locked level
- id: set_volume_locked_level
  label: Set Volume Locked Level
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 100]
# Remote control button simulator
- id: simulate_button
  label: Simulate Remote Button
  kind: action
  params:
    - name: button
      type: enum
      values:
        - ch_up
        - ch_down
        - vol_down
        - vol_up
        - back
        - power
        - mute
        - dash
        - input
        - media_player
        - digit_0
        - digit_1
        - digit_2
        - digit_3
        - digit_4
        - digit_5
        - digit_6
        - digit_7
        - digit_8
        - digit_9
        - sleep
        - mts_sap
        - live_tv
        - pause
        - play
        - menu
        - exit
        - stop
        - frw
        - cc
        - red
        - green
        - yellow
        - blue
        - up
        - down
        - left
        - right
        - ok_enter
        - ffw
        - previous
        - next
        - connected_home

# B2B function mode
- id: set_b2b_mode
  label: Set B2B Function Mode
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - enable
        - disable

# USB behavior
- id: set_usb_behavior
  label: Set USB Behavior
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - home
        - b2b

# Pixel shifting
- id: set_pixel_shifting
  label: Set Pixel Shifting
  kind: action
  params:
    - name: state
      type: enum
      values:
        - off
        - on

# Volume range (maximum volume limit)
- id: set_volume_range
  label: Set Volume Range
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 100]

# TV speaker output mode (SPEAKER / OFF / ARC FIRST)
- id: set_tv_speaker_mode
  label: Set TV Speaker Mode
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - speaker
        - off
        - arc_first
```

## Feedbacks
```yaml
# Query responses for power state
- id: power_state
  type: enum
  values: [on, off, standby]

# Query responses for current input
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

# Query responses for picture mode
- id: picture_mode
  type: enum
  values:
    - standard
    - vivid
    - energy_saving
    - theater
    - game
    - sport

# Query responses for brightness, contrast, color, tint, sharpness, volume, backlight
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

- id: backlight_value
  type: integer
  range: [0, 100]

- id: volume_value
  type: integer
  range: [0, 100]

# Query responses for mute
- id: mute_state
  type: enum
  values: [on, off]

# Query responses for TV speaker
- id: tv_speaker_state
  type: enum
  values: [on, off]

# Query responses for aspect ratio
- id: current_aspect_ratio
  type: enum
  values:
    - auto
    - normal
    - zoom
    - wide
    - direct
    - pixel_map_1to1
    - panoramic
    - cinema

# Query responses for overscan
- id: overscan_state
  type: enum
  values: [on, off]

# Query responses for color temp
- id: color_temp
  type: enum
  values: [high, middle, mid_low, low]

# Query responses for sound mode
- id: sound_mode
  type: enum
  values:
    - standard
    - theater
    - music
    - speech
    - late_night

# Query responses for tuner mode
- id: tuner_mode
  type: enum
  values: [antenna, cable]

# Query responses for caption mode
- id: caption_mode
  type: enum
  values: [off, on, on_when_mute]

# Query responses for standby LED
- id: standby_led_state
  type: enum
  values: [on, off]

# Query responses for remote key mode
- id: remote_key_mode
  type: enum
  values: [enable, disable, partial]

# Query responses for panel key
- id: panel_key_state
  type: enum
  values: [enable, disable]

# Query responses for menu access
- id: menu_access_state
  type: enum
  values: [enable, disable]

# Query responses for AV setting menu
- id: av_setting_menu_state
  type: enum
  values: [enable, disable]

# Query responses for OSD mode
- id: osd_mode_state
  type: enum
  values: [enable, disable]

# Query responses for input mode
- id: input_mode
  type: enum
  values: [locked, selectable, ac_reset, standby_reset]

# Query responses for power off control mode
- id: power_off_control_mode
  type: enum
  values: [ac_only, all]

# Query responses for volume control
- id: volume_control_mode
  type: enum
  values: [locked, last_volume, ac_reset, standby_reset]

# Query responses for volume locked level
- id: volume_locked_level
  type: integer
  range: [0, 100]

# Query responses for volume range
- id: volume_range
  type: enum
  values: [0-100]
```

## Variables
```yaml
# Client ID: 3 hex bytes for MAC address suffix (smart TV) or menu-selected value (feature TV)
# Generic broadcast: "ALL" selects all TVs on the network
```

## Events
```yaml
# UNRESOLVED: no unsolicited event descriptions found in source
# Serial protocol is strictly poll/response - TV does not initiate frames
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros documented
# Multi-TV broadcast uses "ALL" client ID across the serial bus
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
# Note: RS-232 port must be enabled in Custom Install menu (code 7310)
# Note: Power-on RS-232 control requires explicit enable in Custom Install menu
# Note: RS-232 port can be active in standby mode only if Power On Command is set to Enable
```

## Notes
Serial protocol is case-sensitive ASCII with fixed 14-byte command frames and 13-byte acknowledgement frames. Client ID is the last 3 hex digits of the TV's Ethernet MAC address for smart TVs, or a menu-selected value for feature TVs. Use "ALL" as client ID to broadcast to all TVs on a shared RS-232 bus. Checksum is 8-bit modulo-256 sum of all bytes including the checksum byte itself — the total must equal zero. Termination is ASCII carriage return (0x0D). Acknowledgements include OKAY, WAIT, and EROR. Generic HEX commands (rightmost column in source tables) work across all TVs; TV-specific commands (left column) are for MAC-suffix 465 as example.

<!-- UNRESOLVED: IP control protocol not documented in this source -->
<!-- UNRESOLVED: firmware compatibility range not stated -->
<!-- UNRESOLVED: UDP transport not documented -->
<!-- UNRESOLVED: error recovery sequences not documented -->

## Provenance

```yaml
source_domains:
  - hisense-b2b.com
  - assets.hisense-usa.com
retrieved_at: 2026-04-30T04:31:43.572Z
last_checked_at: 2026-05-10T11:33:39.690Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-10T11:33:39.690Z
matched_actions: 45
action_count: 45
confidence: high
summary: "All 45 spec actions found in source; baud rate, frame format, and command mnemonics verified as accurate."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
