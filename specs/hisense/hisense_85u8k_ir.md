---
spec_id: admin/hisense-85u8k
schema_version: ai4av-public-spec-v1
revision: 1
title: "Hisense 85U8K Control Spec"
manufacturer: Hisense
model_family: 85U8K
aliases: []
compatible_with:
  manufacturers:
    - Hisense
  models:
    - 85U8K
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - hisense-b2b.com
  - assets.hisense-usa.com
retrieved_at: 2026-04-30T04:31:43.572Z
last_checked_at: 2026-05-04T07:04:24.777Z
generated_at: 2026-05-04T07:04:24.777Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-04T07:04:24.777Z
  matched_actions: 42
  action_count: 42
  confidence: high
  summary: "All 42 spec actions have literal matches in the RS-232 command table; transport parameters verified in source documentation."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# Hisense 85U8K Control Spec

## Summary
Hisense 85U8K Prosumer TV supporting both Discrete IR and RS-232 serial control. The TV requires enabling the RS-232 port via the Custom Install menu (code 7310). Serial communication is ASCII-based at 9600 baud, 8N1, with no flow control. No authentication required.

<!-- UNRESOLVED: IR carrier frequency not stated in source -->

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
- id: set_power
  label: Set Power State
  kind: action
  params:
    - name: state
      type: integer
      description: 0=standby, 1=power on
- id: enable_remote_power
  label: Enable RS-232 Remote Power On
  kind: action
  params: []
- id: disable_remote_power
  label: Disable RS-232 Remote Power On
  kind: action
  params: []
- id: select_input
  label: Select Input Source
  kind: action
  params:
    - name: input
      type: integer
      description: 0=toggle, 1=TV, 3=Component, 4=AV, 6=VGA, 9=HDMI1, 10=HDMI2, 11=HDMI3, 12=HDMI4
- id: set_picture_mode
  label: Set Picture Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Standard, 2=Vivid, 3=EnergySaving, 4=Theater, 5=Game, 6=Sport
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
    - name: value
      type: integer
      description: 0-20
- id: set_aspect_ratio
  label: Set Aspect Ratio
  kind: action
  params:
    - name: ratio
      type: integer
      description: 0=Auto, 2=Normal, 3=Zoom, 4=Wide, 5=Direct, 6=1-to-1 pixel map, 7=Panoramic, 8=Cinema
- id: set_overscan
  label: Set Overscan
  kind: action
  params:
    - name: state
      type: integer
      description: 0=on, 2=off
- id: reset_picture_settings
  label: Reset Picture Settings
  kind: action
  params: []
- id: set_color_temp
  label: Set Color Temperature
  kind: action
  params:
    - name: temp
      type: integer
      description: 0=High, 2=Middle, 3=Mid-Low, 4=Low
- id: set_backlight
  label: Set Backlight
  kind: action
  params:
    - name: value
      type: integer
      description: 0-100
- id: set_sound_mode
  label: Set Sound Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Standard, 2=Theater, 3=Music, 4=Speech, 5=Late night
- id: reset_audio_settings
  label: Reset Audio Settings
  kind: action
  params: []
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
      description: 0=off, 1=on
- id: set_tv_speaker
  label: Set TV Speaker
  kind: action
  params:
    - name: state
      type: integer
      description: 0=off, 2=on
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
- id: set_caption_control
  label: Set Caption Control
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=off, 2=on, 3=CC on when mute
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
      description: 0=off, 2=on
- id: remote_button
  label: Remote Control Button Simulator
  kind: action
  params:
    - name: button
      type: string
      description: Button code (e.g. POWER, MUTE, VOL+, CH+, 0-9, etc.)
- id: set_power_off_mode
  label: Set Power Off Control Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=AC only, 1=ALL
- id: set_volume_lock
  label: Set Volume Control Lock
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Locked, 1=Last Volume, 2=AC Reset, 3=Standby Reset
- id: set_remote_lock
  label: Set Remote Key Lock
  kind: action
  params:
    - name: state
      type: integer
      description: 0=Enable, 1=Disable, 2=Partial
- id: set_panel_key
  label: Set Panel Key Lock
  kind: action
  params:
    - name: state
      type: integer
      description: 0=Enable, 1=Disable
- id: set_menu_access
  label: Set Menu Access
  kind: action
  params:
    - name: state
      type: integer
      description: 0=Enable, 1=Disable
- id: restore_factory_settings
  label: Restore Factory Settings
  kind: action
  params: []
- id: set_scan_channel
  label: Automatic Channel Scan
  kind: action
  params:
    - name: mode
      type: integer
      description: 1=Automatic Search
- id: set_volume_range
  label: Set Volume Range
  kind: action
  params:
    - name: value
      type: integer
      description: 0-100
- id: set_volume_locked_level
  label: Set Volume Locked Level
  kind: action
  params:
    - name: value
      type: integer
      description: 0-100
- id: set_av_setting_menu
  label: Set AV Setting Menu
  kind: action
  params:
    - name: state
      type: integer
      description: 0=Disable, 1=Enable
- id: set_osd_mode
  label: Set OSD Mode
  kind: action
  params:
    - name: state
      type: integer
      description: 0=Enable, 1=Disable
- id: set_input_mode
  label: Set Input Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Locked, 1=Selectable, 2=AC Reset, 3=Standby Reset
- id: set_power_on_input
  label: Set Power On Input Selection
  kind: action
  params:
    - name: input
      type: integer
      description: 0=Last, 1=Air, 2=AV, 3=Component, 4=VGA, 5=HDMI1, 6=HDMI2, 7=HDMI3, 8=HDMI4
- id: set_speaker_mode
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
    - name: state
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
```

## Feedbacks
```yaml
- id: ack
  label: Command Acknowledgement
  type: object
  properties:
    - name: status
      type: string
      description: OKAY, EROR, or WAIT
    - name: data
      type: string
      description: 4-character return data
  description: All commands return an acknowledgement in format [CLIENT_ID]:[STATUS][DATA][CHECKSUM][CR]
```

## Variables
```yaml
- id: input_source
  type: integer
  values:
    - 1: TV
    - 3: Component
    - 4: AV
    - 6: VGA
    - 9: HDMI1
    - 10: HDMI2
    - 11: HDMI3
    - 12: HDMI4
- id: picture_mode
  type: integer
  values:
    - 0: Standard
    - 2: Vivid
    - 3: EnergySaving
    - 4: Theater
    - 5: Game
    - 6: Sport
- id: brightness
  type: integer
  range: 0-100
- id: contrast
  type: integer
  range: 0-100
- id: color_saturation
  type: integer
  range: 0-100
- id: tint
  type: integer
  range: 0-100
- id: sharpness
  type: integer
  range: 0-20
- id: aspect_ratio
  type: integer
  values:
    - 0: Auto
    - 2: Normal
    - 3: Zoom
    - 4: Wide
    - 5: Direct
    - 6: 1-to-1 pixel map
    - 7: Panoramic
    - 8: Cinema
- id: overscan
  type: integer
  values:
    - 0: on
    - 2: off
- id: color_temp
  type: integer
  values:
    - 0: High
    - 2: Middle
    - 3: Mid-Low
    - 4: Low
- id: backlight
  type: integer
  range: 0-100
- id: sound_mode
  type: integer
  values:
    - 0: Standard
    - 2: Theater
    - 3: Music
    - 4: Speech
    - 5: Late night
- id: volume
  type: integer
  range: 0-100
- id: mute_status
  type: integer
  values:
    - 0: not muted
    - 1: muted
- id: tv_speaker
  type: integer
  values:
    - 0: off
    - 2: on
- id: tuner_mode
  type: integer
  values:
    - 0: Antenna
    - 2: Cable
- id: caption_control
  type: integer
  values:
    - 0: off
    - 2: on
    - 3: CC on when mute
- id: osd_language
  type: integer
  values:
    - 0: English
    - 2: Español
    - 3: Français
- id: standby_led
  type: integer
  values:
    - 0: off
    - 2: on
- id: power_off_mode
  type: integer
  values:
    - 0: AC only
    - 1: ALL
- id: volume_lock
  type: integer
  values:
    - 0: Locked
    - 1: Last Volume
    - 2: AC Reset
    - 3: Standby Reset
- id: remote_lock
  type: integer
  values:
    - 0: Enable
    - 1: Disable
    - 2: Partial
- id: panel_key_lock
  type: integer
  values:
    - 0: Enable
    - 1: Disable
- id: menu_access
  type: integer
  values:
    - 0: Enable
    - 1: Disable
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
interlocks:
  - To enable RS-232 control, the TV must be powered on and the Custom Install menu accessed by pressing Quick Settings Menu then entering 7310. RS-232 port must be set to Enable.
  - If RS-232 power-on is required while the TV is in standby, the Power On Command setting must be set to Enable in the Custom Install menu before exiting.
```

## Notes
The protocol is case-sensitive. Client ID for Smart TVs is the last 3 bytes of the Ethernet MAC address (hex). For Feature TVs it is selected in the TV menu. "ALL" means broadcast. Commands with data parameters use 4-character ASCII fields padded with zeros. The generic HEX command applies to all TVs; TV-specific commands target a particular MAC address suffix.
<!-- UNRESOLVED: IR carrier frequency not stated in source -->
<!-- UNRESOLVED: TCP/IP control not mentioned in source; serial-only device -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: error recovery sequences not described in source -->

## Provenance

```yaml
source_domains:
  - hisense-b2b.com
  - assets.hisense-usa.com
retrieved_at: 2026-04-30T04:31:43.572Z
last_checked_at: 2026-05-04T07:04:24.777Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-04T07:04:24.777Z
matched_actions: 42
action_count: 42
confidence: high
summary: "All 42 spec actions have literal matches in the RS-232 command table; transport parameters verified in source documentation."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
