---
spec_id: admin/hisense-5u88km
schema_version: ai4av-public-spec-v1
revision: 1
title: "HiSense 5U88KM Control Spec"
manufacturer: HiSense
model_family: 5U88KM
aliases: []
compatible_with:
  manufacturers:
    - HiSense
  models:
    - 5U88KM
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
last_checked_at: 2026-04-23T08:04:32.295Z
generated_at: 2026-04-23T08:04:32.295Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - TSCN
  - CHAN
  - BTTN
  - MENU
  - AVMN
  - "OSD#"
  - INPM
  - POIS
  - SPKM
  - B2BM
  - USBM
  - PSHF
verification:
  verdict: verified
  checked_at: 2026-04-23T08:04:32.295Z
  matched_actions: 32
  action_count: 32
  confidence: high
  summary: "All 32 spec actions matched literally in source with correct parameter ranges and opcodes; transport fully verified against protocol documentation."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-23
---

# HiSense 5U88KM Control Spec

## Summary
Hisense Prosumer TV supporting RS-232 serial control and discrete IR control. Protocol is ASCII-based over RS-232 at 9600 baud, 8N1. No login/auth required. Source is the Hisense RS-232/IR Protocol document covering E/M/WR series commercial TVs.

<!-- UNRESOLVED: IP control section not present in source — only RS-232 and IR documented -->

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
- id: power_toggle
  label: Power Toggle
  kind: action
  params: []
- id: set_input
  label: Set Input Source
  kind: action
  params:
    - name: source
      type: integer
      description: |
        Input number:
        0 = TV, 1 = TV, 3 = Component, 4 = AV, 6 = VGA, 9 = HDMI1,
        10 = HDMI2, 11 = HDMI3, 12 = HDMI4
- id: set_picture_mode
  label: Set Picture Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: |
        0 = Standard, 2 = Vivid, 3 = EnergySaving, 4 = Theater, 5 = Game, 6 = Sport
- id: set_brightness
  label: Set Brightness
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100"
- id: set_contrast
  label: Set Contrast
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100"
- id: set_color_saturation
  label: Set Color Saturation
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100"
- id: set_tint
  label: Set Tint
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100"
- id: set_sharpness
  label: Set Sharpness
  kind: action
  params:
    - name: value
      type: integer
      description: "0-20"
- id: set_aspect_ratio
  label: Set Aspect Ratio
  kind: action
  params:
    - name: ratio
      type: integer
      description: |
        0 = Auto, 2 = Normal, 3 = Zoom, 4 = Wide, 5 = Direct,
        6 = 1-to-1 Pixel Map, 7 = Panoramic, 8 = Cinema
- id: set_overscan
  label: Set Overscan
  kind: action
  params:
    - name: state
      type: integer
      description: "0 = On, 2 = Off"
- id: set_color_temp
  label: Set Color Temperature
  kind: action
  params:
    - name: temp
      type: integer
      description: "0 = High, 2 = Middle, 3 = Mid-Low, 4 = Low"
- id: set_backlight
  label: Set Backlight
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100"
- id: set_sound_mode
  label: Set Sound Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0 = Standard, 2 = Theater, 3 = Music, 4 = Speech, 5 = Late Night"
- id: set_volume
  label: Set Volume
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100"
- id: set_mute
  label: Set Mute
  kind: action
  params:
    - name: state
      type: integer
      description: "0 = Off, 1 = On"
- id: set_tv_speaker
  label: Set TV Speaker
  kind: action
  params:
    - name: state
      type: integer
      description: "0 = Off, 2 = On"
- id: set_tuner_mode
  label: Set Tuner Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0 = Antenna, 2 = Cable"
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
      description: "0 = Off, 2 = On, 3 = CC On When Mute"
- id: set_osd_language
  label: Set OSD Language
  kind: action
  params:
    - name: lang
      type: integer
      description: "0 = English, 2 = Español, 3 = Français"
- id: set_power_on_command
  label: Enable/Disable RS-232 Remote Power On
  kind: action
  params:
    - name: state
      type: integer
      description: "0 = Disable, 1 = Enable"
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
- id: set_volume_lock
  label: Set Volume Control Lock
  kind: action
  params:
    - name: mode
      type: integer
      description: "0 = Locked, 1 = Last Volume, 2 = AC Reset, 3 = Standby Reset"
- id: set_standby_led
  label: Set Standby LED
  kind: action
  params:
    - name: state
      type: integer
      description: "0 = Off, 2 = On"
- id: set_remote_key_mode
  label: Set Remote Key Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0 = Enable, 1 = Disable, 2 = Partial"
- id: set_panel_key
  label: Set Panel Key
  kind: action
  params:
    - name: state
      type: integer
      description: "0 = Enable, 1 = Disable"
- id: set_power_off_mode
  label: Set Power Off Control Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0 = AC Only, 1 = All"
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, off]
- id: current_input
  type: integer
  values_description: "0=TV, 1=TV, 3=Component, 4=AV, 6=VGA, 9=HDMI1, 10=HDMI2, 11=HDMI3, 12=HDMI4"
- id: current_picture_mode
  type: integer
  values_description: "0=Standard, 2=Vivid, 3=EnergySaving, 4=Theater, 5=Game, 6=Sport"
- id: current_brightness
  type: integer
  range: [0, 100]
- id: current_contrast
  type: integer
  range: [0, 100]
- id: current_color_saturation
  type: integer
  range: [0, 100]
- id: current_tint
  type: integer
  range: [0, 100]
- id: current_sharpness
  type: integer
  range: [0, 20]
- id: current_aspect_ratio
  type: integer
  values_description: "0=Auto, 2=Normal, 3=Zoom, 4=Wide, 5=Direct, 6=1-to-1, 7=Panoramic, 8=Cinema"
- id: current_overscan
  type: integer
  values_description: "0=On, 2=Off"
- id: current_color_temp
  type: integer
  values_description: "0=High, 2=Middle, 3=Mid-Low, 4=Low"
- id: current_backlight
  type: integer
  range: [0, 100]
- id: current_sound_mode
  type: integer
  values_description: "0=Standard, 2=Theater, 3=Music, 4=Speech, 5=Late Night"
- id: current_volume
  type: integer
  range: [0, 100]
- id: mute_state
  type: integer
  values_description: "0=Not Mute, 1=Muted"
- id: tv_speaker_state
  type: integer
  values_description: "0=Off, 2=On"
- id: current_tuner_mode
  type: integer
  values_description: "0=Antenna, 2=Cable"
- id: caption_state
  type: integer
  values_description: "0=Off, 2=On, 3=CC On When Mute"
- id: osd_language
  type: integer
  values_description: "0=English, 2=Español, 3=Français"
- id: standby_led_state
  type: integer
  values_description: "0=Off, 2=On"
- id: volume_lock_mode
  type: integer
  values_description: "0=Locked, 1=Last Volume, 2=AC Reset, 3=Standby Reset"
- id: power_on_command_state
  type: integer
  values_description: "0=Disable, 1=Enable"
- id: power_off_mode
  type: integer
  values_description: "0=AC Only, 1=All"
- id: remote_key_mode
  type: integer
  values_description: "0=Enable, 1=Disable, 2=Partial"
- id: panel_key_state
  type: integer
  values_description: "0=Enable, 1=Disable"
```

## Variables
```yaml
# All settable parameters are exposed via Actions/Feedbacks pairs.
# No additional Variables section needed.
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "To enable RS-232 control while in standby, set Power On Command to Enable in the Custom Install menu (access: Quick Settings > 7-3-1-0)"
  # UNRESOLVED: no additional safety warnings or interlock procedures stated in source
```

## Notes
- Command format: `[S|Q][CLIENT_ID][COMMAND][DATA][CHECKSUM][CR]` — e.g., `S5FA POWER0001####[0x05][0x0D]`
- CLIENT_ID for Smart TV = last 3 bytes of MAC address; for Feature TV = menu-selected value; `ALL` = broadcast
- Query acknowledgement format: `[CLIENT_ID]:OKAY[DATA4Bytes][CHECKSUM][CR]`
- Common ACKs: OKAY, EROR, WAIT
- Protocol is case-sensitive
- Termination: carriage return (0x0D)
- Serial config: 9600 baud, 8 data bits, no parity, 1 stop bit, no flow control, ASCII code
- This spec covers serial RS-232 control only — no IP control commands found in source
<!-- UNRESOLVED: IP control commands not present in source; entity marked TCP/IP by user but source is RS-232 only -->
<!-- UNRESOLVED: 5U88KM model not explicitly listed in source document model list — generic commercial display protocol applied -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Provenance

```yaml
source_domains:
  - hisense-b2b.com
  - assets.hisense-usa.com
source_urls:
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=5"
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
retrieved_at: 2026-04-30T04:31:43.572Z
last_checked_at: 2026-04-23T08:04:32.295Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T08:04:32.295Z
matched_actions: 32
action_count: 32
confidence: high
summary: "All 32 spec actions matched literally in source with correct parameter ranges and opcodes; transport fully verified against protocol documentation."
```

## Known Gaps

```yaml
- TSCN
- CHAN
- BTTN
- MENU
- AVMN
- "OSD#"
- INPM
- POIS
- SPKM
- B2BM
- USBM
- PSHF
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
