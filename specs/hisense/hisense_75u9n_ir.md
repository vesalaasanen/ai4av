---
spec_id: admin/hisense-prosumer-tv
schema_version: ai4av-public-spec-v1
revision: 1
title: "Hisense Prosumer TV Control Spec"
manufacturer: Hisense
model_family: "hisense 75u9n"
aliases: []
compatible_with:
  manufacturers:
    - Hisense
  models: []
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
last_checked_at: 2026-04-26T13:12:43.803Z
generated_at: 2026-04-26T13:12:43.803Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-26T13:12:43.803Z
  matched_actions: 44
  action_count: 44
  confidence: high
  summary: "All 44 spec actions matched source commands; all 8 extra_in_source tokens from prior verdict now covered."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# Hisense Prosumer TV Control Spec

## Summary
Hisense Prosumer TV series RS-232 + Discrete IR control document. RS-232 interface: DB9 female, 9600/8/N/1, ASCII protocol, no authentication. Supports power, input routing, picture/sound settings, queries, and panel/remote lock controls. Discrete IR codes provided for Pronto CCF format.

<!-- UNRESOLVED: specific model names not enumerated in source; 75U9N compatibility inferred from family scope only -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

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
  label: Standby
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
- id: select_input
  label: Set Input Source
  kind: action
  params:
    - name: input
      type: integer
      description: |
        0 = cycle signal, 1 = TV, 3 = Component, 4 = AV, 6 = VGA, 9 = HDMI1,
        10 = HDMI2, 11 = HDMI3, 12 = HDMI4
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
      description: Range 0-100
- id: set_contrast
  label: Set Contrast
  kind: action
  params:
    - name: value
      type: integer
      description: Range 0-100
- id: set_color_saturation
  label: Set Color Saturation
  kind: action
  params:
    - name: value
      type: integer
      description: Range 0-100
- id: set_tint
  label: Set Tint
  kind: action
  params:
    - name: value
      type: integer
      description: Range 0-100
- id: set_sharpness
  label: Set Sharpness
  kind: action
  params:
    - name: value
      type: integer
      description: Range 0-20
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
      description: Range 0-100
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
      description: Range 0-100
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
- id: set_osd_language
  label: Set OSD Language
  kind: action
  params:
    - name: lang
      type: integer
      description: 0=English, 2=Español, 3=Français
- id: set_caption_control
  label: Set Caption Control
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Off, 2=On, 3=CC on when mute
- id: set_power_off_control
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
      description: 0=Locked, 1=Last Volume, 2=AC Reset, 3=Standby Reset
- id: set_volume_locked_level
  label: Set Volume Locked Level
  kind: action
  params:
    - name: value
      type: integer
      description: Range 0-100
- id: set_remote_key
  label: Set Remote Key
  kind: action
  params:
    - name: state
      type: integer
      description: 0=Enable, 1=Disable, 2=Partial
- id: set_panel_key
  label: Set Panel Key
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
  label: Set Power On Input
  kind: action
  params:
    - name: source
      type: integer
      description: 0=Last, 1=Air, 2=AV, 3=Component, others (HDMI sources as listed in select_input)
- id: restore_factory_settings
  label: Restore Factory Settings
  kind: action
  params: []
- id: automatic_channel_scan
  label: Automatic Channel Scan
  kind: action
  params: []
- id: set_channel
  label: Set Channel Direction
  kind: action
  params:
    - name: direction
      type: integer
      description: 0=Channel Down, 1=Channel Up
- id: simulate_remote_button
  label: Simulate Remote Control Button
  kind: action
  params:
    - name: button_code
      type: integer
      description: 1000-1009=digits 0-9, 1012=POWER, 1015=FRW, 1016=PLAY, 1017=FFW, 1018=PAUSE, 1031=MUTE, 1032=VOL-, 1033=VOL+, 1034=CH+, 1035=CH-, 1036=INPUT, 1038=MENU, 1040=OK/ENTER, 1041=UP, 1042=DOWN, 1043=LEFT, 1044=RIGHT, 1045=BACK, 1046=EXIT
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
- id: set_standby_led
  label: Set Standby LED
  kind: action
  params:
    - name: state
      type: integer
      description: 0=Off, 2=On
- id: set_volume_range
  label: Set Volume Range
  kind: action
  params:
    - name: value
      type: integer
      description: Range 0-100
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, on]
- id: input_source
  type: enum
  values: [tv, component, av, vga, hdmi1, hdmi2, hdmi3, hdmi4]
- id: picture_mode
  type: enum
  values: [standard, vivid, energysaving, theater, game, sport]
- id: brightness
  type: integer
  values: [0, 100]
- id: contrast
  type: integer
  values: [0, 100]
- id: color_saturation
  type: integer
  values: [0, 100]
- id: tint
  type: integer
  values: [0, 100]
- id: sharpness
  type: integer
  values: [0, 20]
- id: aspect_ratio
  type: enum
  values: [auto, normal, zoom, wide, direct, 1to1_pixel_map, panoramic, cinema]
- id: overscan
  type: enum
  values: [on, off]
- id: color_temp
  type: enum
  values: [high, middle, midlow, low]
- id: backlight
  type: integer
  values: [0, 100]
- id: sound_mode
  type: enum
  values: [standard, theater, music, speech, latenight]
- id: volume
  type: integer
  values: [0, 100]
- id: mute_state
  type: enum
  values: [off, on]
- id: tv_speaker
  type: enum
  values: [off, on]
- id: tuner_mode
  type: enum
  values: [antenna, cable]
- id: caption_control
  type: enum
  values: [off, on, cc_on_when_mute]
- id: power_off_control_mode
  type: enum
  values: [ac_only, all]
- id: volume_control
  type: enum
  values: [locked, last_volume, ac_reset, standby_reset]
- id: volume_locked_level
  type: integer
  values: [0, 100]
- id: remote_key
  type: enum
  values: [enable, disable, partial]
- id: panel_key
  type: enum
  values: [enable, disable]
- id: menu_access
  type: enum
  values: [enable, disable]
- id: av_setting_menu
  type: enum
  values: [disable, enable]
- id: osd_mode
  type: enum
  values: [enable, disable]
- id: input_mode
  type: enum
  values: [locked, selectable, ac_reset, standby_reset]
- id: standby_led
  type: enum
  values: [off, on]
```

## Variables
```yaml
# All settable parameters also queryable via Q command — see Feedbacks for enum ranges.
# No separate Variables section needed; feedback entries cover queryable state.
```

## Events
```yaml
# UNRESOLVED: no unsolicited event/notification format described in source;
# protocol is query/response only
```

## Macros
```yaml
# No explicit multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
RS-232 command protocol: `[S|Q][CLIENT_ID][COMMAND][DATA][CHECKSUM][CR]`
- CLIENT_ID = last 3 bytes of TV MAC address (Smart TV) or menu-selected value (Feature TV); "ALL" = broadcast
- ACK responses: OKAY, EROR, WAIT
- Checksum: 8-bit XOR ensuring whole-string checksum equals zero
- Termination: 0x0D (CR)
- IR Discrete codes use Pronto CCF hex format (prefix 0000 006C 0022...)
- RS-232 port must be enabled via Custom Install menu (code 7-3-1-0 on remote); enabling in standby requires POWEON command
- Remote key / panel key lock controls allow disabling local physical control
- Protocol is case-sensitive

## Provenance

```yaml
source_domains:
  - hisense-b2b.com
  - assets.hisense-usa.com
source_urls:
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=5"
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
retrieved_at: 2026-04-30T04:31:43.572Z
last_checked_at: 2026-04-26T13:12:43.803Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-26T13:12:43.803Z
matched_actions: 44
action_count: 44
confidence: high
summary: "All 44 spec actions matched source commands; all 8 extra_in_source tokens from prior verdict now covered."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
