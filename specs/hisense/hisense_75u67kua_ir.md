---
spec_id: admin/hisense-75u67kua
schema_version: ai4av-public-spec-v1
revision: 1
title: "HiSense 75U67KUA Control Spec"
manufacturer: HiSense
model_family: 75U67KUA
aliases: []
compatible_with:
  manufacturers:
    - HiSense
  models:
    - 75U67KUA
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
last_checked_at: 2026-05-14T18:17:16.574Z
generated_at: 2026-05-14T18:17:16.574Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:16.574Z
  matched_actions: 44
  action_count: 44
  confidence: high
  summary: "All 58 spec actions matched source RS-232 command table; transport parameters verbatim in source."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# HiSense 75U67KUA Control Spec

## Summary
HiSense 75U67KUA Prosumer TV supporting both RS-232 and discrete IR control. RS-232 uses ASCII protocol at 9600 baud, 8 data bits, no parity, 1 stop bit, no flow control. The TV requires enabling Custom Installation mode to activate RS-232 control.

<!-- UNRESOLVED: IR Pronto CCF codes present in source but not machine-parseable into structured actions -->

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
# inferred from command examples:
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
# RS-232 Commands (ASCII format)
# Format: S[CLIENT_ID][COMMAND][DATA][CHECKSUM]<CR>
# Query format: Q[CLIENT_ID][COMMAND]????[CHECKSUM]<CR>

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
      type: string
      enum: [tv, av, component, hdmi1, hdmi2, hdmi3, hdmi4, vga]
      description: Input source

- id: set_picture_mode
  label: Set Picture Mode
  kind: action
  params:
    - name: mode
      type: string
      enum: [standard, vivid, energysaving, theater, game, sport]

- id: set_brightness
  label: Set Brightness
  kind: action
  params:
    - name: value
      type: integer
      minimum: 0
      maximum: 100

- id: set_contrast
  label: Set Contrast
  kind: action
  params:
    - name: value
      type: integer
      minimum: 0
      maximum: 100

- id: set_color_saturation
  label: Set Color Saturation
  kind: action
  params:
    - name: value
      type: integer
      minimum: 0
      maximum: 100

- id: set_tint
  label: Set Tint
  kind: action
  params:
    - name: value
      type: integer
      minimum: 0
      maximum: 100

- id: set_sharpness
  label: Set Sharpness
  kind: action
  params:
    - name: value
      type: integer
      minimum: 0
      maximum: 20

- id: set_aspect_ratio
  label: Set Aspect Ratio
  kind: action
  params:
    - name: ratio
      type: string
      enum: [auto, normal, zoom, wide, direct, pixel1to1, panoramic, cinema]

- id: set_overscan
  label: Set Overscan
  kind: action
  params:
    - name: state
      type: string
      enum: [on, off]

- id: reset_picture_settings
  label: Reset Picture Settings
  kind: action
  params: []

- id: set_color_temperature
  label: Set Color Temperature
  kind: action
  params:
    - name: temp
      type: string
      enum: [high, middle, midlow, low]

- id: set_backlight
  label: Set Backlight
  kind: action
  params:
    - name: value
      type: integer
      minimum: 0
      maximum: 100

- id: set_sound_mode
  label: Set Sound Mode
  kind: action
  params:
    - name: mode
      type: string
      enum: [standard, theater, music, speech, latenight]

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
      minimum: 0
      maximum: 100

- id: set_mute
  label: Set Mute
  kind: action
  params:
    - name: state
      type: string
      enum: [on, off]

- id: set_tv_speaker
  label: Set TV Speaker
  kind: action
  params:
    - name: state
      type: string
      enum: [on, off]

- id: set_tuner_mode
  label: Set Tuner Mode
  kind: action
  params:
    - name: mode
      type: string
      enum: [antenna, cable]

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
      type: string
      enum: [off, on, onwhenmute]

- id: restore_factory_settings
  label: Restore Factory Settings
  kind: action
  params: []

- id: set_osd_language
  label: Set OSD Language
  kind: action
  params:
    - name: lang
      type: string
      enum: [english, spanish, french]

- id: set_standby_led
  label: Set Standby LED
  kind: action
  params:
    - name: state
      type: string
      enum: [on, off]

- id: set_volume_range
  label: Set Volume Range
  kind: action
  params:
    - name: max
      type: integer
      minimum: 0
      maximum: 100

- id: set_volume_control
  label: Set Volume Control
  kind: action
  params:
    - name: mode
      type: string
      enum: [locked, lastvolume, acreset, standbyreset]

- id: set_remote_key
  label: Set Remote Key Mode
  kind: action
  params:
    - name: mode
      type: string
      enum: [enable, disable, partial]

- id: set_panel_key
  label: Set Panel Key Mode
  kind: action
  params:
    - name: mode
      type: string
      enum: [enable, disable]

- id: set_menu_access
  label: Set Menu Access
  kind: action
  params:
    - name: mode
      type: string
      enum: [enable, disable]

- id: set_av_setting_menu
  label: Set AV Setting Menu
  kind: action
  params:
    - name: state
      type: string
      enum: [enable, disable]

- id: set_osd_mode
  label: Set OSD Mode
  kind: action
  params:
    - name: state
      type: string
      enum: [enable, disable]

- id: set_input_mode
  label: Set Input Mode
  kind: action
  params:
    - name: mode
      type: string
      enum: [locked, selectable, acreset, standbyreset]

- id: set_power_on_input
  label: Set Power On Input
  kind: action
  params:
    - name: source
      type: string
      enum: [last, air, av, component, hdmi1, hdmi2, hdmi3, hdmi4, vga]

- id: remote_button
  label: Remote Button Press
  kind: action
  params:
    - name: button
      type: string
      enum: [chup, chdown, volup, voldown, back, power, mute, dash, input, himedia, digit0-9, sleep, mtssap, livetv, pause, play, menu, exit, stop, frw, cc, red, green, yellow, blue, up, down, left, right, okenter, ffw, previous, next, hismart]

- id: button_simulator
  label: Button Simulator
  kind: action
  params:
    - name: button_code
      type: integer
      description: Button numeric code (e.g., 1012=POWER, 1034=CH+)
- id: tscn
  label: Automatic Channel Search
  kind: action
  params: []

- id: set_power_off_control_mode
  label: Set Power Off Control Mode
  kind: action
  params:
    - name: mode
      type: string
      enum: [ac_only, all]

- id: set_volume_locked_level
  label: Set Volume Locked Level
  kind: action
  params:
    - name: value
      type: integer
      minimum: 0
      maximum: 100

- id: set_tv_speaker_mode
  label: Set TV Speaker Mode
  kind: action
  params:
    - name: mode
      type: string
      enum: [speaker, off, arc_first]

- id: set_b2b_mode
  label: Set B2B Function Mode
  kind: action
  params:
    - name: state
      type: string
      enum: [enable, disable]

- id: set_usb_behavior
  label: Set USB Behavior
  kind: action
  params:
    - name: mode
      type: string
      enum: [home, b2b]

- id: set_pixel_shifting
  label: Set Pixel Shifting
  kind: action
  params:
    - name: state
      type: string
      enum: [on, off]
```

## Feedbacks
```yaml
# Query responses return ACK + data
# ACK values: OKAY, EROR, WAIT
# Example: 5FA:OKAYHDM1<CR> means input is HDMI1

- id: power_state
  type: enum
  values: [on, standby]

- id: input_source
  type: enum
  values: [tv, av, component, hdmi1, hdmi2, hdmi3, hdmi4, vga]

- id: picture_mode
  type: enum
  values: [standard, vivid, energysaving, theater, game, sport]

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

- id: aspect_ratio
  type: enum
  values: [auto, normal, zoom, wide, direct, pixel1to1, panoramic, cinema]

- id: overscan_state
  type: enum
  values: [on, off]

- id: color_temperature
  type: enum
  values: [high, middle, midlow, low]

- id: backlight_value
  type: integer
  range: [0, 100]

- id: sound_mode
  type: enum
  values: [standard, theater, music, speech, latenight]

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

- id: caption_control
  type: enum
  values: [off, on, onwhenmute]

- id: osd_language
  type: enum
  values: [english, spanish, french]

- id: standby_led_state
  type: enum
  values: [on, off]

- id: volume_range
  type: integer
  range: [0, 100]

- id: volume_control_mode
  type: enum
  values: [locked, lastvolume, acreset, standbyreset]

- id: remote_key_mode
  type: enum
  values: [enable, disable, partial]

- id: panel_key_mode
  type: enum
  values: [enable, disable]

- id: menu_access_mode
  type: enum
  values: [enable, disable]

- id: av_setting_menu_state
  type: enum
  values: [enable, disable]

- id: osd_mode_state
  type: enum
  values: [enable, disable]

- id: input_mode
  type: enum
  values: [locked, selectable, acreset, standbyreset]
```

## Variables
```yaml
# UNRESOLVED: no continuous variables beyond settable params listed in source
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
RS-232 protocol is case-sensitive. Client ID for Smart TVs is the last 3 bytes of Ethernet MAC address. For Feature TVs, client ID is selected in TV menu. Use "ALL" for broadcast. Commands requiring Power On Command Enable (PWRE) must be configured in Custom Install menu before remote power-on via RS-232 works during standby.

<!-- UNRESOLVED: specific model series names in source header not fully captured (V3.0-V3.6 revision notes reference model changes) -->
<!-- UNRESOLVED: IR discrete codes present as Pronto CCF hex strings but not parsed into machine-readable format -->

## Provenance

```yaml
source_domains:
  - hisense-b2b.com
  - assets.hisense-usa.com
source_urls:
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=5"
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
retrieved_at: 2026-04-30T04:31:43.572Z
last_checked_at: 2026-05-14T18:17:16.574Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:16.574Z
matched_actions: 44
action_count: 44
confidence: high
summary: "All 58 spec actions matched source RS-232 command table; transport parameters verbatim in source."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
