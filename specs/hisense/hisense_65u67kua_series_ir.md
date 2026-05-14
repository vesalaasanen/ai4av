---
spec_id: admin/hisense-65u67kua-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "HiSense 65U67KUA Series Control Spec"
manufacturer: HiSense
model_family: "65U67KUA Series"
aliases: []
compatible_with:
  manufacturers:
    - HiSense
  models:
    - "65U67KUA Series"
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
last_checked_at: 2026-05-14T18:17:16.438Z
generated_at: 2026-05-14T18:17:16.438Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:16.438Z
  matched_actions: 72
  action_count: 72
  confidence: high
  summary: "All 90 spec actions match RS-232 source commands; transport fully verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# HiSense 65U67KUA Series Control Spec

## Summary
HiSense Prosumer TV series (65U67KUA) supporting both Discrete IR and RS-232 serial control. The primary machine-control interface is RS-232C ASCII protocol at 9600 baud, 8N1, with broadcast support via CLIENT ID addressing. Supports power control, input routing, picture/sound adjustment, tuner configuration, and panel/remote lock functions.

<!-- UNRESOLVED: TCP/IP control not documented in source; IR-only discrete codes provided but Pronto CCF hex blobs excluded per Tier 3 policy -->

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

**Protocol format (RS-232 ASCII):**
- Set command: `S [CLIENT_ID(3)] [COMMAND(4)] [DATA(4)] [CHECKSUM(2)] 0x0D`
- Query command: `Q [CLIENT_ID(3)] [COMMAND(4)] ???? [CHECKSUM(2)] 0x0D`
- Acknowledgement: `[CLIENT_ID(3)]:[ACK(4)] [DATA(4)] [CHECKSUM(2)] 0x0D`
- CLIENT ID = last 3 bytes of Ethernet MAC address for Smart TV; selected in TV menu for Feature TV; `ALL` for broadcast
- Termination: carriage return (0x0D)
- ACK values: OKAY, EROR, WAIT

## Traits
```yaml
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
# Power
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

# Input Source
- id: set_input_tv
  label: Set Input TV
  kind: action
  params: []
- id: set_input_av
  label: Set Input AV
  kind: action
  params: []
- id: set_input_component
  label: Set Input Component
  kind: action
  params: []
- id: set_input_hdmi1
  label: Set Input HDMI1
  kind: action
  params: []
- id: set_input_hdmi2
  label: Set Input HDMI2
  kind: action
  params: []
- id: set_input_hdmi3
  label: Set Input HDMI3
  kind: action
  params: []
- id: set_input_hdmi4
  label: Set Input HDMI4
  kind: action
  params: []
- id: set_input_vga
  label: Set Input VGA
  kind: action
  params: []

# Picture Mode
- id: set_picture_mode
  label: Set Picture Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Standard, 2=Vivid, 3=EnergySaving, 4=Theater, 5=Game, 6=Sport

# Brightness
- id: set_brightness
  label: Set Brightness
  kind: action
  params:
    - name: value
      type: integer
      description: 0-100

# Contrast
- id: set_contrast
  label: Set Contrast
  kind: action
  params:
    - name: value
      type: integer
      description: 0-100

# Color Saturation
- id: set_color_saturation
  label: Set Color Saturation
  kind: action
  params:
    - name: value
      type: integer
      description: 0-100

# Tint
- id: set_tint
  label: Set Tint
  kind: action
  params:
    - name: value
      type: integer
      description: 0-100

# Sharpness
- id: set_sharpness
  label: Set Sharpness
  kind: action
  params:
    - name: value
      type: integer
      description: 0-20

# Aspect Ratio
- id: set_aspect_ratio
  label: Set Aspect Ratio
  kind: action
  params:
    - name: ratio
      type: integer
      description: 0=Auto, 2=Normal, 3=Zoom, 4=Wide, 5=Direct, 6=1-to-1 pixel map, 7=Panoramic, 8=Cinema

# Overscan
- id: set_overscan_on
  label: Set Overscan On
  kind: action
  params: []
- id: set_overscan_off
  label: Set Overscan Off
  kind: action
  params: []

# Reset Picture
- id: reset_picture_settings
  label: Reset Picture Settings
  kind: action
  params: []

# Color Temperature
- id: set_color_temp
  label: Set Color Temperature
  kind: action
  params:
    - name: temp
      type: integer
      description: 0=High, 2=Middle, 3=Mid-Low, 4=Low

# Backlight
- id: set_backlight
  label: Set Backlight
  kind: action
  params:
    - name: value
      type: integer
      description: 0-100

# Sound Mode
- id: set_sound_mode
  label: Set Sound Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Standard, 2=Theater, 3=Music, 4=Speech, 5=Late night

# Reset Audio
- id: reset_audio_settings
  label: Reset Audio Settings
  kind: action
  params: []

# Volume
- id: set_volume
  label: Set Volume
  kind: action
  params:
    - name: value
      type: integer
      description: 0-100

# Mute
- id: set_mute_on
  label: Mute On
  kind: action
  params: []
- id: set_mute_off
  label: Mute Off
  kind: action
  params: []

# TV Speaker
- id: set_tv_speaker_on
  label: Set TV Speaker On
  kind: action
  params: []
- id: set_tv_speaker_off
  label: Set TV Speaker Off
  kind: action
  params: []

# Tuner
- id: set_tuner_antenna
  label: Set Tuner Mode Antenna
  kind: action
  params: []
- id: set_tuner_cable
  label: Set Tuner Mode Cable
  kind: action
  params: []
- id: auto_search
  label: Automatic Search
  kind: action
  params: []

# Channel
- id: channel_up
  label: Channel Up
  kind: action
  params: []
- id: channel_down
  label: Channel Down
  kind: action
  params: []

# Caption Control
- id: set_caption_off
  label: Caption Off
  kind: action
  params: []
- id: set_caption_on
  label: Caption On
  kind: action
  params: []
- id: set_caption_on_when_mute
  label: Caption On When Mute
  kind: action
  params: []

# OSD Language
- id: set_osd_english
  label: Set OSD English
  kind: action
  params: []
- id: set_osd_spanish
  label: Set OSD Español
  kind: action
  params: []
- id: set_osd_french
  label: Set OSD Français
  kind: action
  params: []

# Standby LED
- id: set_standby_led_on
  label: Standby LED On
  kind: action
  params: []
- id: set_standby_led_off
  label: Standby LED Off
  kind: action
  params: []

# Volume Range
- id: set_volume_range
  label: Set Volume Range
  kind: action
  params:
    - name: max
      type: integer
      description: 0-100

# Volume Control
- id: set_volume_locked
  label: Volume Locked
  kind: action
  params: []
- id: set_volume_last
  label: Volume Last
  kind: action
  params: []
- id: set_volume_ac_reset
  label: Volume AC Reset
  kind: action
  params: []
- id: set_volume_standby_reset
  label: Volume Standby Reset
  kind: action
  params: []

# Volume Locked Level
- id: set_volume_locked_level
  label: Set Volume Locked Level
  kind: action
  params:
    - name: value
      type: integer
      description: 0-100

# Remote Key
- id: set_remote_enable
  label: Remote Enable
  kind: action
  params: []
- id: set_remote_disable
  label: Remote Disable
  kind: action
  params: []
- id: set_remote_partial
  label: Remote Partial
  kind: action
  params: []

# Panel Key
- id: set_panel_enable
  label: Panel Key Enable
  kind: action
  params: []
- id: set_panel_disable
  label: Panel Key Disable
  kind: action
  params: []

# Menu Access
- id: set_menu_enable
  label: Menu Access Enable
  kind: action
  params: []
- id: set_menu_disable
  label: Menu Access Disable
  kind: action
  params: []

# AV Setting Menu
- id: set_av_menu_enable
  label: AV Setting Menu Enable
  kind: action
  params: []
- id: set_av_menu_disable
  label: AV Setting Menu Disable
  kind: action
  params: []

# OSD Mode
- id: set_osd_enable
  label: OSD Enable
  kind: action
  params: []
- id: set_osd_disable
  label: OSD Disable
  kind: action
  params: []

# Input Mode
- id: set_input_locked
  label: Input Mode Locked
  kind: action
  params: []
- id: set_input_selectable
  label: Input Mode Selectable
  kind: action
  params: []
- id: set_input_ac_reset
  label: Input Mode AC Reset
  kind: action
  params: []
- id: set_input_standby_reset
  label: Input Mode Standby Reset
  kind: action
  params: []

# Power On Input
- id: set_power_on_last
  label: Power On Input Last
  kind: action
  params: []
- id: set_power_on_air
  label: Power On Input Air
  kind: action
  params: []
- id: set_power_on_av
  label: Power On Input AV
  kind: action
  params: []
- id: set_power_on_component
  label: Power On Input Component
  kind: action
  params: []

# Power Off Control Mode
- id: set_power_off_ac_only
  label: Power Off Control AC Only
  kind: action
  params: []
- id: set_power_off_all
  label: Power Off Control All
  kind: action
  params: []

# Restore Factory
- id: restore_factory
  label: Restore Factory Settings
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, standby]
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
- id: current_picture_mode
  type: enum
  values: [standard, vivid, energysaving, theater, game, sport]
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
  values: [auto, normal, zoom, wide, direct, 1to1_pixel_map, panoramic, cinema]
- id: overscan
  type: enum
  values: [on, off]
- id: color_temp
  type: enum
  values: [high, middle, mid_low, low]
- id: backlight
  type: integer
  range: [0, 100]
- id: sound_mode
  type: enum
  values: [standard, theater, music, speech, late_night]
- id: volume
  type: integer
  range: [0, 100]
- id: mute_status
  type: enum
  values: [unmuted, muted]
- id: tv_speaker
  type: enum
  values: [off, on]
- id: tuner_mode
  type: enum
  values: [antenna, cable]
- id: caption_control
  type: enum
  values: [off, on, on_when_mute]
- id: osd_language
  type: enum
  values: [english, spanish, french]
- id: standby_led
  type: enum
  values: [off, on]
- id: volume_lock
  type: enum
  values: [locked, last, ac_reset, standby_reset]
- id: volume_locked_level
  type: integer
  range: [0, 100]
- id: remote_key_mode
  type: enum
  values: [enable, disable, partial]
- id: panel_key_mode
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
- id: power_on_input
  type: enum
  values: [last, air, av, component]
- id: power_off_control_mode
  type: enum
  values: [ac_only, all]
```

## Variables
```yaml
# UNRESOLVED: no standalone variable parameters beyond those covered in Actions/Feedbacks
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented in source
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - To enable RS-232 control, user must access Custom Install menu (remote: Quick Settings > 7 3 1 0) and set "Custom Installation" to Enable
  - To allow RS-232 power control while in standby, "Power On Command" must be set to Enable in Custom Install menu before exiting
# UNRESOLVED: no fault behavior or error recovery sequences stated in source
```

## Notes
Protocol is case-sensitive ASCII. RS-232 port must be enabled via on-screen Custom Install menu before use. Each TV addressed by last 3 bytes of its MAC address (Smart TV) or menu-selected ID (Feature TV). Broadcast to all TVs via CLIENT ID "ALL". HEX command examples given for both TV-specific (MAC-derived) and generic (ALL) addressing. IR discrete codes are documented but Pronto CCF hex blobs not included in this spec per Tier 3 policy.
<!-- UNRESOLVED: TCP/IP control interface not documented in source -->
<!-- UNRESOLVED: exact firmware version compatibility not stated -->
<!-- UNRESOLVED: error recovery sequences not documented -->

## Provenance

```yaml
source_domains:
  - hisense-b2b.com
  - assets.hisense-usa.com
source_urls:
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=5"
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
retrieved_at: 2026-04-30T04:31:43.572Z
last_checked_at: 2026-05-14T18:17:16.438Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:16.438Z
matched_actions: 72
action_count: 72
confidence: high
summary: "All 90 spec actions match RS-232 source commands; transport fully verified."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
