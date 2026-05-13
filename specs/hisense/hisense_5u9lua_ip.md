---
spec_id: admin/hisense-5u9lua
schema_version: ai4av-public-spec-v1
revision: 1
title: "Hisense 5U9LUA Control Spec"
manufacturer: Hisense
model_family: 5U9LUA
aliases: []
compatible_with:
  manufacturers:
    - Hisense
  models:
    - 5U9LUA
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - hisense-b2b.com
  - assets.hisense-usa.com
retrieved_at: 2026-04-30T04:31:43.572Z
last_checked_at: 2026-05-04T05:50:45.706Z
generated_at: 2026-05-04T05:50:45.706Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-04T05:50:45.706Z
  matched_actions: 44
  action_count: 44
  confidence: high
  summary: "All 44 spec actions match documented RS-232 commands; transport verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# Hisense 5U9LUA Control Spec

## Summary
Prosumer TV supporting both RS-232 and discrete IR control. Serial protocol uses ASCII encoding over RS-232C at 9600/8/N/1. Client ID for Smart TVs derived from last 3 bytes of Ethernet MAC address. No authentication required.

<!-- UNRESOLVED: IP/TCP control path not documented in source — only RS-232 described -->

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
      description: Mode value (0=Standard, 2=Vivid, 3=EnergySaving, 4=Theater, 5=Game, 6=Sport)

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
      description: Ratio value (0=Auto, 2=Normal, 3=Zoom, 4=Wide, 5=Direct, 6=1-to-1 pixel map, 7=Panoramic, 8=Cinema)

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
      description: Temperature value (0=High, 2=Middle, 3=Mid-Low, 4=Low)

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
      description: Mode value (0=Standard, 2=Theater, 3=Music, 4=Speech, 5=Late night)

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
      description: 0=Antenna, 2=Cable

- id: auto_search
  label: Automatic Search
  kind: action
  params: []

- id: set_caption
  label: Set Caption Control
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Off, 2=On, 3=CC on when mute

- id: set_osd_language
  label: Set OSD Language
  kind: action
  params:
    - name: lang
      type: integer
      description: 0=English, 2=Español, 3=Français

- id: set_standby_led
  label: Set Standby LED
  kind: action
  params:
    - name: state
      type: integer
      description: 0=Off, 2=On

- id: remote_button
  label: Remote Control Button
  kind: action
  params:
    - name: button
      type: string
      description: Button code (e.g. CH+, VOL-, MENU, EXIT, 0-9, etc.)

- id: set_power_off_mode
  label: Set Power Off Control Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=AC ONLY, 1=ALL

- id: set_volume_control
  label: Set Volume Control
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=LOCKED, 1=LAST VOLUME, 2=AC RESET, 3=STANDBY RESET

- id: set_volume_locked_level
  label: Set Volume Locked Level
  kind: action
  params:
    - name: level
      type: integer
      description: Locked level 0-100

- id: set_remote_key_mode
  label: Set Remote Key Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=ENABLE, 1=DISABLE, 2=PARTIAL

- id: set_panel_key
  label: Set Panel Key
  kind: action
  params:
    - name: state
      type: integer
      description: 0=ENABLE, 1=DISABLE

- id: set_menu_access
  label: Set Menu Access
  kind: action
  params:
    - name: state
      type: integer
      description: 0=ENABLE, 1=DISABLE

- id: set_av_setting_menu
  label: Set AV Setting Menu
  kind: action
  params:
    - name: state
      type: integer
      description: 0=DISABLE, 1=ENABLE

- id: set_osd_mode
  label: Set OSD Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=ENABLE, 1=DISABLE

- id: set_input_mode
  label: Set Input Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=LOCKED, 1=SELECTABLE, 2=AC RESET, 3=STANDBY RESET

- id: set_power_on_input
  label: Set Power On Input
  kind: action
  params:
    - name: input
      type: integer
      description: Input selection (0=LAST, 1=Air, 2=AV, 3=Component, ...)

- id: rs232_power_enable
  label: Enable RS-232 Remote Power On
  kind: action
  params:
    - name: state
      type: integer
      description: 0=Disable, 1=Enable

- id: reset_picture_settings
  label: Reset Picture Settings
  kind: action
  params: []

- id: reset_audio_settings
  label: Reset Audio Settings
  kind: action
  params: []

- id: factory_reset
  label: Restore Factory Settings
  kind: action
  params: []

- id: set_sleep_timer
  label: Set Sleep Timer
  kind: action
  params:
    - name: minutes
      type: integer
      description: Sleep timer minutes
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, standby]

- id: input_source
  type: enum
  values: [TV, AV, Component, HDMI1, HDMI2, HDMI3, HDMI4, VGA]

- id: picture_mode
  type: enum
  values: [Standard, Vivid, EnergySaving, Theater, Game, Sport]

- id: brightness
  type: integer
  range: [0, 100]

- id: contrast
  type: integer
  range: [0, 100]

- id: color_saturation
  type: integer
  range: [0, 100]

- id: tint
  type: integer
  range: [0, 100]

- id: sharpness
  type: integer
  range: [0, 20]

- id: aspect_ratio
  type: enum
  values: [Auto, Normal, Zoom, Wide, Direct, "1-to-1pixelmap", Panoramic, Cinema]

- id: overscan_state
  type: enum
  values: [on, off]

- id: color_temp
  type: enum
  values: [High, Middle, Mid-Low, Low]

- id: backlight
  type: integer
  range: [0, 100]

- id: sound_mode
  type: enum
  values: [Standard, Theater, Music, Speech, LateNight]

- id: volume
  type: integer
  range: [0, 100]

- id: mute_state
  type: enum
  values: [off, on]

- id: tv_speaker_state
  type: enum
  values: [off, on]

- id: tuner_mode
  type: enum
  values: [Antenna, Cable]

- id: caption_state
  type: enum
  values: [off, on, CCOnWhenMute]

- id: osd_language
  type: enum
  values: [English, Español, Français]

- id: standby_led
  type: enum
  values: [off, on]

- id: power_off_mode
  type: enum
  values: [ACONLY, ALL]

- id: volume_control_mode
  type: enum
  values: [LOCKED, LASTVOLUME, ACRESET, STANDBYRESET]

- id: volume_locked_level
  type: integer
  range: [0, 100]

- id: remote_key_mode
  type: enum
  values: [ENABLE, DISABLE, PARTIAL]

- id: panel_key_state
  type: enum
  values: [ENABLE, DISABLE]

- id: menu_access_state
  type: enum
  values: [ENABLE, DISABLE]

- id: av_setting_menu_state
  type: enum
  values: [DISABLE, ENABLE]

- id: osd_mode_state
  type: enum
  values: [ENABLE, DISABLE]

- id: input_mode_state
  type: enum
  values: [LOCKED, SELECTABLE, ACRESET, STANDBYRESET]

- id: rs232_power_enabled
  type: enum
  values: [disabled, enabled]

- id: command_ack
  type: enum
  values: [OKAY, EROR, WAIT]
  description: ACK responses from TV
```

## Variables
```yaml
# UNRESOLVED: no standalone variable parameters beyond what Actions/Feedbacks cover
```

## Events
```yaml
# UNRESOLVED: no unsolicited event messages documented in source
```

## Macros
```yaml
# No explicit multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - To enable RS-232 control while TV is in standby, set "Power On Command" to Enable in Custom Install menu (access: Quick Settings > 7310)
# UNRESOLVED: no safety warnings or interlock sequences beyond configuration note
```

## Notes
RS-232 protocol is case-sensitive. Commands terminated with carriage return (0x0D). Client ID for Smart TVs uses last 3 bytes of Ethernet MAC address. Generic broadcast client ID "ALL" (0x41 0x4C 0x4C) supported for multi-TV control. Checksum is 8-bit ensuring command string sums to zero. No login or password required.
<!-- UNRESOLVED: TCP/IP control path not found in source — only RS-232 serial documented -->

## Provenance

```yaml
source_domains:
  - hisense-b2b.com
  - assets.hisense-usa.com
retrieved_at: 2026-04-30T04:31:43.572Z
last_checked_at: 2026-05-04T05:50:45.706Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-04T05:50:45.706Z
matched_actions: 44
action_count: 44
confidence: high
summary: "All 44 spec actions match documented RS-232 commands; transport verified."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
