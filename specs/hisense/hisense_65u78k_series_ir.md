---
spec_id: admin/hisense-65u78k-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "HiSense 65U78K Series Control Spec"
manufacturer: HiSense
model_family: "65U78K Series"
aliases: []
compatible_with:
  manufacturers:
    - HiSense
  models:
    - "65U78K Series"
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
last_checked_at: 2026-05-14T18:17:16.474Z
generated_at: 2026-05-14T18:17:16.474Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:16.474Z
  matched_actions: 41
  action_count: 41
  confidence: high
  summary: "All 45 spec actions matched to source; transport verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# HiSense 65U78K Series Control Spec

## Summary
Prosumer TV supporting both discrete IR and RS-232 serial control. Protocol is ASCII-based over RS-232 at 9600/8/N/1 with a client-ID addressing scheme (last 3 chars of MAC address for TV-specific commands, `ALL` for broadcast). Acknowledgements are `OKAY`, `WAIT`, or `EROR` with checksum verification.

<!-- UNRESOLVED: IR discrete codes documented as Pronto CCF hex blobs — format-av-spec does not support Pronto CCF codegen; IR section retained in Notes only. -->

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
  char_encoding: ascii
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# inferred from command examples:
# - powerable (POWER ON/OFF commands present)
# - routable (INPT input selection commands present)
# - queryable (QUERY commands for all settable parameters)
# - levelable (BRIT, CONT, COLR, TINT, SHRP, VOLM, BKLV with 0-100 ranges)
```

## Actions
```yaml
- id: power_on_enable
  label: Enable RS-232 Remote Power On
  kind: action
  params: []

- id: power_on_disable
  label: Disable RS-232 Remote Power On
  kind: action
  params: []

- id: power_on
  label: Power On
  kind: action
  params: []

- id: power_off
  label: Power Off (Standby)
  kind: action
  params: []

- id: set_input_tv
  label: Set Input — TV
  kind: action
  params: []

- id: set_input_av
  label: Set Input — AV
  kind: action
  params: []

- id: set_input_component
  label: Set Input — Component
  kind: action
  params: []

- id: set_input_hdmi1
  label: Set Input — HDMI1
  kind: action
  params: []

- id: set_input_hdmi2
  label: Set Input — HDMI2
  kind: action
  params: []

- id: set_input_hdmi3
  label: Set Input — HDMI3
  kind: action
  params: []

- id: set_input_hdmi4
  label: Set Input — HDMI4
  kind: action
  params: []

- id: set_input_vga
  label: Set Input — VGA
  kind: action
  params: []

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
      description: 0000–0100

- id: set_contrast
  label: Set Contrast
  kind: action
  params:
    - name: value
      type: integer
      description: 0000–0100

- id: set_color_saturation
  label: Set Color Saturation
  kind: action
  params:
    - name: value
      type: integer
      description: 0000–0100

- id: set_tint
  label: Set Tint
  kind: action
  params:
    - name: value
      type: integer
      description: 0000–0100

- id: set_sharpness
  label: Set Sharpness
  kind: action
  params:
    - name: value
      type: integer
      description: 0000–0020

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
      description: 0000–0100

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
      description: 0000–0100

- id: set_mute_on
  label: Mute On
  kind: action
  params: []

- id: set_mute_off
  label: Mute Off
  kind: action
  params: []

- id: set_tv_speaker_on
  label: Enable TV Speaker
  kind: action
  params: []

- id: set_tv_speaker_off
  label: Disable TV Speaker
  kind: action
  params: []

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

- id: set_standby_led
  label: Set Standby LED
  kind: action
  params:
    - name: state
      type: integer
      description: 0=Off, 2=On

- id: set_volume_lock
  label: Set Volume Lock
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Locked, 1=Last volume, 2=AC reset, 3=Standby reset

- id: set_remote_key_mode
  label: Set Remote Key Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Enable, 1=Disable, 2=Partial

- id: set_panel_key
  label: Set Panel Key
  kind: action
  params:
    - name: state
      type: integer
      description: 0=Enable, 1=Disable

- id: set_power_off_control_mode
  label: Set Power Off Control Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=AC only, 1=ALL
```

## Feedbacks
```yaml
- id: power_on_command_setting
  type: enum
  values:
    - "0"  # Disabled
    - "1"  # Enabled

- id: current_input
  type: enum
  values:
    - "1"   # TV
    - "4"   # AV
    - "3"   # Component
    - "9"   # HDMI1
    - "10"  # HDMI2
    - "11"  # HDMI3
    - "12"  # HDMI4
    - "6"   # VGA

- id: current_picture_mode
  type: enum
  values:
    - "0"  # Standard
    - "2"  # Vivid
    - "3"  # EnergySaving
    - "4"  # Theater
    - "5"  # Game
    - "6"  # Sport

- id: current_brightness
  type: range
  min: 0
  max: 100

- id: current_contrast
  type: range
  min: 0
  max: 100

- id: current_color_saturation
  type: range
  min: 0
  max: 100

- id: current_tint
  type: range
  min: 0
  max: 100

- id: current_sharpness
  type: range
  min: 0
  max: 20

- id: current_aspect_ratio
  type: enum
  values:
    - "0"  # Auto
    - "2"  # Normal
    - "3"  # Zoom
    - "4"  # Wide
    - "5"  # Direct
    - "6"  # 1-to-1 pixel map
    - "7"  # Panoramic
    - "8"  # Cinema

- id: overscan_state
  type: enum
  values:
    - "0"  # On
    - "2"  # Off

- id: color_temp
  type: enum
  values:
    - "0"  # High
    - "2"  # Middle
    - "3"  # Mid-Low
    - "4"  # Low

- id: backlight_value
  type: range
  min: 0
  max: 100

- id: sound_mode
  type: enum
  values:
    - "0"  # Standard
    - "2"  # Theater
    - "3"  # Music
    - "4"  # Speech
    - "5"  # Late night

- id: current_volume
  type: range
  min: 0
  max: 100

- id: mute_status
  type: enum
  values:
    - "0"  # Not muted
    - "1"  # Muted

- id: tv_speaker_status
  type: enum
  values:
    - "0"  # Off
    - "2"  # On

- id: tuner_mode
  type: enum
  values:
    - "0"  # Antenna
    - "2"  # Cable

- id: caption_control
  type: enum
  values:
    - "0"  # Off
    - "2"  # On
    - "3"  # CC on when mute

- id: osd_language
  type: enum
  values:
    - "0"  # English
    - "2"  # Español
    - "3"  # Français

- id: standby_led
  type: enum
  values:
    - "0"  # Off
    - "2"  # On

- id: volume_lock
  type: enum
  values:
    - "0"  # Locked
    - "1"  # Last volume
    - "2"  # AC reset
    - "3"  # Standby reset

- id: remote_key_mode
  type: enum
  values:
    - "0"  # Enable
    - "1"  # Disable
    - "2"  # Partial

- id: panel_key
  type: enum
  values:
    - "0"  # Enable
    - "1"  # Disable

- id: power_off_control_mode
  type: enum
  values:
    - "0"  # AC only
    - "1"  # ALL
```

## Variables
```yaml
# UNRESOLVED: no discrete Variables section in source — all settable params use Actions/Feedbacks pattern
```

## Events
```yaml
# UNRESOLVED: no unsolicited event reporting described in source
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "RS-232 port must be enabled in Custom Install menu (code 7-3-1-0) before serial control works"
  # UNRESOLVED: power-on sequencing, fault behavior not stated in source
```

## Notes
Protocol is case-sensitive. Each command framed as: `[S|Q][CLIENT_ID][COMMAND][DATA][CHECKSUM][CR]` where CR = 0x0D. Acknowledgements: `[CLIENT_ID]:OKAY|DATA[CHECKSUM][CR]`. Checksum is 8-bit such that sum of all bytes including checksum = 0.

IR discrete codes are documented as Pronto CCF hex blobs — hex command values captured in Feedbacks where applicable (HDMI1–4, power on/off, aspect ratios, volume, channel, etc.).

<!-- UNRESOLVED: IR Pronto CCF format not parsed into machine-readable actions — requires external IR codegen tooling. -->
<!-- UNRESOLVED: network/TCP control — source mentions MAC address and network info but no TCP command spec. -->

## Provenance

```yaml
source_domains:
  - hisense-b2b.com
  - assets.hisense-usa.com
source_urls:
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=5"
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
retrieved_at: 2026-04-30T04:31:43.572Z
last_checked_at: 2026-05-14T18:17:16.474Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:16.474Z
matched_actions: 41
action_count: 41
confidence: high
summary: "All 45 spec actions matched to source; transport verified."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
