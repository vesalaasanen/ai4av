---
spec_id: admin/hisense-65u78nm
schema_version: ai4av-public-spec-v1
revision: 1
title: "HiSense 65U78NM Control Spec"
manufacturer: HiSense
model_family: 65U78NM
aliases: []
compatible_with:
  manufacturers:
    - HiSense
  models:
    - 65U78NM
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - hisense-b2b.com
  - assets.hisense-usa.com
retrieved_at: 2026-04-30T04:31:43.572Z
last_checked_at: 2026-04-23T06:55:01.063Z
generated_at: 2026-04-23T06:55:01.063Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-23T06:55:01.063Z
  matched_actions: 40
  action_count: 40
  confidence: high
  summary: "All 40 spec actions matched with source commands; transport parameters verified against RS-232 protocol section."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# HiSense 65U78NM Control Spec

## Summary
HiSense Prosumer TV (65U78NM) controllable via RS-232 (discrete IR also documented). Serial protocol: 9600/8/N/1, ASCII-coded commands with checksum, client ID via MAC address last 3 digits.

<!-- UNRESOLVED: RS-232 port number not stated — DB9 female chassis connector described -->

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
- routable
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
    - name: source
      type: integer
      description: 0=TV, 1=TV, 3=Component, 4=AV, 6=VGA, 9=HDMI1, 10=HDMI2, 11=HDMI3, 12=HDMI4
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
      type: integer
      description: 0=Auto, 2=Normal, 3=Zoom, 4=Wide, 5=Direct, 6=1-to-1 pixel map, 7=Panoramic, 8=Cinema
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
      description: 0=High, 2=Middle, 3=Mid-Low, 4=Low
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
      type: integer
      description: 0=Standard, 2=Theater, 3=Music, 4=Speech, 5=Late night
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
- id: set_caption_control
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
- id: enable_rs232_power_on
  label: Enable RS-232 Remote Power On
  kind: action
  params: []
- id: disable_rs232_power_on
  label: Disable RS-232 Remote Power On
  kind: action
  params: []
- id: set_power_off_control_mode
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
      range: [0, 100]
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
    - name: source
      type: integer
- id: automatic_search
  label: Automatic Search
  kind: action
  params: []
- id: simulate_remote_button
  label: Simulate Remote Button
  kind: action
  params:
    - name: button
      type: string
      description: Button code e.g. POWER, MUTE, VOL+, CH+, 0-9, etc.
```

## Feedbacks
```yaml
- id: power_state
  label: Power State
  type: enum
  values: [standby, on]
- id: input_source
  label: Input Source
  type: enum
  values: [TV, AV, Component, HDMI1, HDMI2, HDMI3, HDMI4, VGA]
- id: picture_mode
  label: Picture Mode
  type: enum
  values: [Standard, Vivid, EnergySaving, Theater, Game, Sport]
- id: brightness
  label: Brightness
  type: integer
  range: [0, 100]
- id: contrast
  label: Contrast
  type: integer
  range: [0, 100]
- id: color_saturation
  label: Color Saturation
  type: integer
  range: [0, 100]
- id: tint
  label: Tint
  type: integer
  range: [0, 100]
- id: sharpness
  label: Sharpness
  type: integer
  range: [0, 20]
- id: aspect_ratio
  label: Aspect Ratio
  type: enum
  values: [Auto, Normal, Zoom, Wide, Direct, "1-to-1 pixel map", Panoramic, Cinema]
- id: overscan
  label: Overscan
  type: enum
  values: [on, off]
- id: color_temp
  label: Color Temperature
  type: enum
  values: [High, Middle, Mid-Low, Low]
- id: backlight
  label: Backlight
  type: integer
  range: [0, 100]
- id: sound_mode
  label: Sound Mode
  type: enum
  values: [Standard, Theater, Music, Speech, Late night]
- id: volume
  label: Volume
  type: integer
  range: [0, 100]
- id: mute_state
  label: Mute State
  type: enum
  values: [off, on]
- id: tv_speaker
  label: TV Speaker
  type: enum
  values: [off, on]
- id: tuner_mode
  label: Tuner Mode
  type: enum
  values: [Antenna, Cable]
- id: caption_control
  label: Caption Control
  type: enum
  values: [off, on, "CC on when mute"]
- id: osd_language
  label: OSD Language
  type: enum
  values: [English, Español, Français]
- id: standby_led
  label: Standby LED
  type: enum
  values: [off, on]
- id: power_off_control_mode
  label: Power Off Control Mode
  type: enum
  values: [AC ONLY, ALL]
- id: volume_control_mode
  label: Volume Control Mode
  type: enum
  values: [LOCKED, LAST VOLUME, AC RESET, STANDBY RESET]
- id: volume_locked_level
  label: Volume Locked Level
  type: integer
  range: [0, 100]
- id: remote_key_mode
  label: Remote Key Mode
  type: enum
  values: [ENABLE, DISABLE, PARTIAL]
- id: panel_key
  label: Panel Key
  type: enum
  values: [ENABLE, DISABLE]
- id: menu_access
  label: Menu Access
  type: enum
  values: [ENABLE, DISABLE]
- id: av_setting_menu
  label: AV Setting Menu
  type: enum
  values: [DISABLE, ENABLE]
- id: osd_mode
  label: OSD Mode
  type: enum
  values: [ENABLE, DISABLE]
- id: input_mode
  label: Input Mode
  type: enum
  values: [LOCKED, SELECTABLE, AC RESET, STANDBY RESET]
```

## Variables
```yaml
# UNRESOLVED: all settable parameters are covered via Actions + Feedbacks;
# no additional non-discrete variables identified
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented
```

## Macros
```yaml
# UNRESOLVED: no multi-step macros documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Serial protocol is case-sensitive. Commands use MAC address last 3 digits as client ID (or ALL for broadcast). Each command includes a checksum byte that makes the whole sequence sum to zero. Termination is CR (0x0D). Acknowledgements: OKAY, EROR, WAIT.
<!-- UNRESOLVED: IR discrete codes documented separately; Pronto CCF hex codes present but not machine-parseable here -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Provenance

```yaml
source_domains:
  - hisense-b2b.com
  - assets.hisense-usa.com
retrieved_at: 2026-04-30T04:31:43.572Z
last_checked_at: 2026-04-23T06:55:01.063Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T06:55:01.063Z
matched_actions: 40
action_count: 40
confidence: high
summary: "All 40 spec actions matched with source commands; transport parameters verified against RS-232 protocol section."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
