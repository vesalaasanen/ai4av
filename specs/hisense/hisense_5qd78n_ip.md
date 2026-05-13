---
spec_id: admin/hisense-5qd78n
schema_version: ai4av-public-spec-v1
revision: 1
title: "HiSense 5QD78N Control Spec"
manufacturer: HiSense
model_family: 5QD78N
aliases: []
compatible_with:
  manufacturers:
    - HiSense
  models:
    - 5QD78N
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - hisense-b2b.com
  - assets.hisense-usa.com
retrieved_at: 2026-04-30T04:31:43.572Z
last_checked_at: 2026-04-26T12:51:17.288Z
generated_at: 2026-04-26T12:51:17.288Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-26T12:51:17.288Z
  matched_actions: 72
  action_count: 72
  confidence: high
  summary: "All 72 spec actions match source commands; transport parameters verified; covers all 39 distinct source command families comprehensively."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-23
---

# HiSense 5QD78N Control Spec

## Summary
Hisense Prosumer TV supporting RS-232 serial control and discrete IR. Protocol is case-sensitive ASCII over RS-232 at 9600/8/N/1. Client ID for Smart TVs is the last 3 bytes of the Ethernet MAC address.

<!-- UNRESOLVED: TCP/IP control not documented in source — only RS-232 and discrete IR -->

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
- queryable
- levelable
- routable
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

- id: select_input
  label: Select Input
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (0=TV, 1=TV, 3=Component, 4=AV, 6=VGA, 9=HDMI1, 10=HDMI2, 11=HDMI3, 12=HDMI4)

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
      description: 0=On, 2=Off

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
      description: 0=Off, 2=On, 3=CC on when mute

- id: restore_factory_settings
  label: Restore Factory Settings
  kind: action
  params: []

- id: set_osd_language
  label: Set OSD Language
  kind: action
  params:
    - name: lang
      type: integer
      description: 0=English, 2=Español, 3=Français

- id: set_power_on_command
  label: Enable/Disable RS-232 Remote Power On
  kind: action
  params:
    - name: state
      type: integer
      description: 0=Disable, 1=Enable

- id: set_standby_led
  label: Set Standby LED
  kind: action
  params:
    - name: state
      type: integer
      description: 0=Off, 2=On

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
    - name: value
      type: integer
      description: 0-100

- id: set_remote_key
  label: Set Remote Key
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
    - name: state
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
    - name: source
      type: integer
      description: 0=LAST, 1=Air, 2=AV, 3=Component, 9=HDMI1, 10=HDMI2, 11=HDMI3, 12=HDMI4

- id: send_button
  label: Send Remote Button Code
  kind: action
  params:
    - name: button
      type: string
      description: Button code (e.g. BTTN1034 for CH+, BTTN1012 for POWER)
- id: scan_channels
  label: Automatic Channel Scan
  kind: action
  params:
    - name: mode
      type: integer
      description: 1=Automatic Search

- id: set_speaker_mode
  label: Set TV Speaker Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=SPEAKER, 1=OFF, 2=ARC FIRST

- id: set_max_volume
  label: Set Volume Range (Max Volume)
  kind: action
  params:
    - name: value
      type: integer
      description: 0-100

- id: set_b2b_mode
  label: Set B2B Function Mode
  kind: action
  params:
    - name: state
      type: integer
      description: 0=ENABLE, 1=DISABLE

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
- id: power_state
  type: enum
  values: [standby, on]

- id: current_input
  type: enum
  values: [TV, AV, Component, HDMI1, HDMI2, HDMI3, HDMI4, VGA]

- id: current_picture_mode
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

- id: current_aspect_ratio
  type: enum
  values: [Auto, Normal, Zoom, Wide, Direct, "1-to-1 pixel map", Panoramic, Cinema]

- id: overscan_state
  type: enum
  values: [on, off]

- id: color_temp
  type: enum
  values: [High, Middle, Mid-Low, Low]

- id: backlight_value
  type: integer
  range: [0, 100]

- id: current_sound_mode
  type: enum
  values: [Standard, Theater, Music, Speech, "Late night"]

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

- id: caption_mode
  type: enum
  values: [off, on, "CC on when mute"]

- id: standby_led_state
  type: enum
  values: [off, on]

- id: power_off_mode
  type: enum
  values: ["AC ONLY", ALL]

- id: volume_control_mode
  type: enum
  values: [LOCKED, "LAST VOLUME", "AC RESET", "STANDBY RESET"]

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
  values: [LOCKED, SELECTABLE, "AC RESET", "STANDBY RESET"]
```

## Variables
```yaml
# UNRESOLVED: no standalone Variables section in source - discrete settable parameters captured in Actions/Feedbacks
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
The protocol frame uses MAC address last 3 bytes as client ID for Smart TVs. Generic broadcast uses ALL. Command format: `[S|Q][CLIENT_ID][COMMAND][DATA][CHECKSUM][CR]`. ACK responses: OKAY, EROR, WAIT. The `POWR` command sets standby vs power on; the `PWRE` command enables RS-232 remote boot which must be set before the TV can be powered on via RS-232 while in standby. Protocol is case-sensitive — commands must be uppercase.
<!-- UNRESOLVED: TCP/IP port number not stated in source -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: whether 5QD78N is in the supported model list for this RS-232 protocol doc — model list in source document appears empty -->

## Provenance

```yaml
source_domains:
  - hisense-b2b.com
  - assets.hisense-usa.com
retrieved_at: 2026-04-30T04:31:43.572Z
last_checked_at: 2026-04-26T12:51:17.288Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-26T12:51:17.288Z
matched_actions: 72
action_count: 72
confidence: high
summary: "All 72 spec actions match source commands; transport parameters verified; covers all 39 distinct source command families comprehensively."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
